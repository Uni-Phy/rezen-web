<template>
  <div class="map-container">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading 3D Map...</p>
    </div>
    
    <!-- Info panel -->
    <div v-if="selectedPoint" class="info-panel">
      <div class="info-content">
        <h3>{{ selectedPoint.name }}</h3>
        <p>{{ selectedPoint.description }}</p>
        <div class="info-stats">
          <div class="stat">
            <span class="stat-label">CO₂ Level:</span>
            <span class="stat-value">{{ selectedPoint.co2 }} ppm</span>
          </div>
          <div class="stat">
            <span class="stat-label">Soil Carbon:</span>
            <span class="stat-value">{{ selectedPoint.soilCarbon }}%</span>
          </div>
          <div class="stat">
            <span class="stat-label">Biomass:</span>
            <span class="stat-value">{{ selectedPoint.biomass }} t/ha</span>
          </div>
        </div>
        <button @click="closeInfoPanel" class="close-btn">×</button>
      </div>
    </div>
    
    <!-- Instructions -->
    <div class="instructions">
      <p>🖱️ Drag to rotate • 🔍 Scroll to zoom • 📍 Click markers for details</p>
    </div>
    
    <!-- Three.js container -->
    <div ref="mapContainer" class="threejs-map"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref, watch } from 'vue';

export default {
  name: 'ThreeDMapView',
  props: {
    nightModeControl: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const mapContainer = ref(null);
    const isLoading = ref(true);
    const nightMode = ref(props.nightModeControl);
    const postProcessing = ref(true);
    const selectedPoint = ref(null);
    
    // Watch for changes in parent nightMode control
    watch(() => props.nightModeControl, (newVal) => {
      if (newVal !== nightMode.value) {
        nightMode.value = newVal;
        if (scene && renderer) {
          toggleNightMode();
        }
      }
    });
    
    let scene, camera, renderer, controls;
    let terrain, markers = [];
    let animationId;
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    
    // Sample data points for agricultural sites
    const dataPoints = [
      { name: 'North Field', description: 'Primary crop cultivation area', position: [2, 0.5, 2], co2: 385, soilCarbon: 3.4, biomass: 125 },
      { name: 'South Pasture', description: 'Rotational grazing zone', position: [-2, 0.3, 1], co2: 372, soilCarbon: 4.1, biomass: 98 },
      { name: 'East Orchard', description: 'Fruit tree cultivation', position: [1.5, 0.4, -2], co2: 368, soilCarbon: 3.8, biomass: 156 },
      { name: 'West Valley', description: 'Experimental plots', position: [-1, 0.2, -1.5], co2: 392, soilCarbon: 2.9, biomass: 87 },
      { name: 'Central Hub', description: 'Research and monitoring station', position: [0, 0.6, 0], co2: 378, soilCarbon: 3.6, biomass: 142 },
    ];
    
    const initScene = () => {
      // Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(nightMode.value ? 0x1a1a2e : 0x87CEEB, 5, 20);
      
      // Camera setup
      const containerElement = mapContainer.value;
      camera = new THREE.PerspectiveCamera(
        75,
        containerElement.clientWidth / containerElement.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 8, 5);
      camera.lookAt(0, 0, 0);
      
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
      renderer.setClearColor(nightMode.value ? 0x0f0f23 : 0x87CEEB, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      containerElement.appendChild(renderer.domElement);
      
      // Mouse controls (simple orbit)
      setupControls();
      
      // Lighting
      setupLighting();
      
      // Create terrain
      createTerrain();
      
      // Create markers
      createMarkers();
      
      // Start animation loop
      animate();
      
      isLoading.value = false;
    };
    
    const setupControls = () => {
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      
      const onMouseDown = (event) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      };
      
      const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        if (isDragging) {
          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
          };
          
          const rotationSpeed = 0.005;
          camera.position.x = camera.position.x * Math.cos(deltaMove.x * rotationSpeed) - camera.position.z * Math.sin(deltaMove.x * rotationSpeed);
          camera.position.z = camera.position.x * Math.sin(deltaMove.x * rotationSpeed) + camera.position.z * Math.cos(deltaMove.x * rotationSpeed);
          
          camera.position.y += deltaMove.y * rotationSpeed;
          camera.position.y = Math.max(2, Math.min(15, camera.position.y));
          
          camera.lookAt(0, 0, 0);
          
          previousMousePosition = { x: event.clientX, y: event.clientY };
        }
      };
      
      const onMouseUp = () => {
        isDragging = false;
      };
      
      const onWheel = (event) => {
        const zoomSpeed = 0.1;
        const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
        const newDistance = distance + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed);
        
        if (newDistance > 3 && newDistance < 20) {
          const direction = camera.position.clone().normalize();
          camera.position.copy(direction.multiplyScalar(newDistance));
        }
        
        event.preventDefault();
      };
      
      const onClick = (event) => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(markers);
        
        if (intersects.length > 0) {
          const clickedMarker = intersects[0].object;
          const pointData = clickedMarker.userData;
          selectedPoint.value = pointData;
        } else {
          selectedPoint.value = null;
        }
      };
      
      renderer.domElement.addEventListener('mousedown', onMouseDown);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('wheel', onWheel);
      renderer.domElement.addEventListener('click', onClick);
    };
    
    const setupLighting = () => {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(
        nightMode.value ? 0x404040 : 0x404040,
        nightMode.value ? 0.3 : 0.6
      );
      scene.add(ambientLight);
      
      // Directional light (sun)
      const directionalLight = new THREE.DirectionalLight(
        nightMode.value ? 0x4169E1 : 0xffffff,
        nightMode.value ? 0.5 : 1
      );
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);
      
      if (nightMode.value) {
        // Add moon light
        const moonLight = new THREE.DirectionalLight(0x9370DB, 0.3);
        moonLight.position.set(-5, 10, -5);
        scene.add(moonLight);
      }
    };
    
    const createTerrain = () => {
      const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
      
      // Create more realistic terrain with multiple noise layers
      const positions = geometry.attributes.position.array;
      const colors = new Float32Array(positions.length);
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        
        // Create rolling hills with multiple octaves of noise
        let height = 0;
        height += Math.sin(x * 0.1) * Math.cos(y * 0.1) * 1.5;
        height += Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.5;
        height += Math.sin(x * 0.8) * Math.cos(y * 0.8) * 0.2;
        height += Math.random() * 0.1; // Add some randomness
        
        positions[i + 2] = height;
        
        // Create vertex colors based on height for natural terrain coloring
        const normalizedHeight = (height + 2) / 4; // Normalize to 0-1
        
        if (normalizedHeight < 0.2) {
          // Water/low areas - darker green/blue
          colors[i] = nightMode.value ? 0.1 : 0.2;     // R
          colors[i + 1] = nightMode.value ? 0.2 : 0.4; // G
          colors[i + 2] = nightMode.value ? 0.3 : 0.3; // B
        } else if (normalizedHeight < 0.5) {
          // Grassland - green
          colors[i] = nightMode.value ? 0.15 : 0.3;    // R
          colors[i + 1] = nightMode.value ? 0.3 : 0.6; // G
          colors[i + 2] = nightMode.value ? 0.1 : 0.2; // B
        } else if (normalizedHeight < 0.8) {
          // Hills - lighter green/brown
          colors[i] = nightMode.value ? 0.2 : 0.4;     // R
          colors[i + 1] = nightMode.value ? 0.25 : 0.5; // G
          colors[i + 2] = nightMode.value ? 0.1 : 0.2; // B
        } else {
          // Peaks - brown/gray
          colors[i] = nightMode.value ? 0.25 : 0.5;    // R
          colors[i + 1] = nightMode.value ? 0.2 : 0.4;  // G
          colors[i + 2] = nightMode.value ? 0.15 : 0.3; // B
        }
      }
      
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      
      const material = new THREE.MeshLambertMaterial({
        vertexColors: true,
        wireframe: false
      });
      
      terrain = new THREE.Mesh(geometry, material);
      terrain.rotation.x = -Math.PI / 2;
      terrain.receiveShadow = true;
      terrain.castShadow = true;
      scene.add(terrain);
      
      // Add water plane for lakes/rivers
      createWater();
      
      // Add some trees and vegetation
      createVegetation();
      
      // Add rocks and natural features
      createRocks();
    };
    
    const createWater = () => {
      const waterGeometry = new THREE.PlaneGeometry(4, 2, 1, 1);
      const waterMaterial = new THREE.MeshPhongMaterial({
        color: nightMode.value ? 0x1a237e : 0x2196F3,
        transparent: true,
        opacity: 0.7,
        shininess: 100
      });
      
      const water = new THREE.Mesh(waterGeometry, waterMaterial);
      water.rotation.x = -Math.PI / 2;
      water.position.set(-3, 0.1, 2);
      scene.add(water);
      
      // Animate water
      water.userData = { originalPosition: water.position.clone() };
      markers.push(water); // Add to markers for animation
    };
    
    const createVegetation = () => {
      // Create various types of trees and bushes
      const treePositions = [
        [1, 0, 1], [3, 0, -2], [-2, 0, -1], [4, 0, 3], [-3, 0, 2],
        [0, 0, -3], [2, 0, 4], [-4, 0, 0], [1, 0, -4], [-1, 0, 3]
      ];
      
      treePositions.forEach((pos, index) => {
        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.6, 8);
        const trunkMaterial = new THREE.MeshLambertMaterial({
          color: nightMode.value ? 0x2d1810 : 0x4a2c17
        });
        
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        const terrainHeight = getTerrainHeight(pos[0], pos[2]);
        trunk.position.set(pos[0], terrainHeight + 0.3, pos[2]);
        trunk.castShadow = true;
        scene.add(trunk);
        
        // Tree foliage
        const foliageGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 8, 6);
        const foliageMaterial = new THREE.MeshLambertMaterial({
          color: nightMode.value ? 0x1b4d1b : 0x2d5a2d
        });
        
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(pos[0], terrainHeight + 0.7 + Math.random() * 0.2, pos[2]);
        foliage.castShadow = true;
        scene.add(foliage);
        
        // Add some bushes around trees
        if (Math.random() > 0.5) {
          const bushGeometry = new THREE.SphereGeometry(0.15, 6, 4);
          const bushMaterial = new THREE.MeshLambertMaterial({
            color: nightMode.value ? 0x1a471a : 0x2e5c2e
          });
          
          const bush = new THREE.Mesh(bushGeometry, bushMaterial);
          bush.position.set(
            pos[0] + (Math.random() - 0.5) * 0.8,
            terrainHeight + 0.1,
            pos[2] + (Math.random() - 0.5) * 0.8
          );
          bush.castShadow = true;
          scene.add(bush);
        }
      });
    };
    
    const createRocks = () => {
      const rockPositions = [
        [2.5, 0, -1.5], [-1.5, 0, 1.5], [0.5, 0, 2.5], [-3.5, 0, -0.5]
      ];
      
      rockPositions.forEach(pos => {
        const rockGeometry = new THREE.SphereGeometry(
          0.1 + Math.random() * 0.15,
          6 + Math.floor(Math.random() * 4),
          4 + Math.floor(Math.random() * 3)
        );
        
        // Slightly deform the rock for more natural look
        const positions = rockGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] *= 1 + (Math.random() - 0.5) * 0.3;
          positions[i + 1] *= 1 + (Math.random() - 0.5) * 0.3;
          positions[i + 2] *= 1 + (Math.random() - 0.5) * 0.3;
        }
        rockGeometry.attributes.position.needsUpdate = true;
        rockGeometry.computeVertexNormals();
        
        const rockMaterial = new THREE.MeshLambertMaterial({
          color: nightMode.value ? 0x2c2c2c : 0x666666
        });
        
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        const terrainHeight = getTerrainHeight(pos[0], pos[2]);
        rock.position.set(pos[0], terrainHeight + 0.1, pos[2]);
        rock.castShadow = true;
        rock.receiveShadow = true;
        scene.add(rock);
      });
    };
    
    const getTerrainHeight = (x, z) => {
      // Calculate terrain height at given x, z coordinates
      // This should match the height calculation in createTerrain
      let height = 0;
      height += Math.sin(x * 0.1) * Math.cos(z * 0.1) * 1.5;
      height += Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.5;
      height += Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.2;
      return height;
    };
    
    const createMarkers = () => {
      dataPoints.forEach((point, index) => {
        const terrainHeight = getTerrainHeight(point.position[0], point.position[2]);
        
        // Create more natural-looking monitoring stations
        // Base structure
        const baseGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.2, 8);
        const baseMaterial = new THREE.MeshPhongMaterial({
          color: nightMode.value ? 0x333333 : 0x666666
        });
        
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(point.position[0], terrainHeight + 0.1, point.position[2]);
        base.castShadow = true;
        base.userData = point;
        scene.add(base);
        
        // Sensor pole
        const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 6);
        const poleMaterial = new THREE.MeshPhongMaterial({
          color: nightMode.value ? 0x444444 : 0x888888
        });
        
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(point.position[0], terrainHeight + 0.5, point.position[2]);
        pole.castShadow = true;
        scene.add(pole);
        
        // Sensor head with status light
        const sensorGeometry = new THREE.SphereGeometry(0.06, 12, 8);
        const sensorMaterial = new THREE.MeshPhongMaterial({
          color: getMarkerColor(point.co2),
          emissive: getMarkerColor(point.co2),
          emissiveIntensity: 0.4
        });
        
        const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
        sensor.position.set(point.position[0], terrainHeight + 0.85, point.position[2]);
        sensor.castShadow = true;
        sensor.userData = point;
        
        // Add pulsing animation to sensor
        sensor.userData.originalScale = sensor.scale.clone();
        sensor.userData.pulsePhase = index * 0.5;
        sensor.userData.originalIntensity = 0.4;
        
        markers.push(sensor);
        scene.add(sensor);
        
        // Add a subtle ground indicator
        const indicatorGeometry = new THREE.RingGeometry(0.2, 0.25, 16);
        const indicatorMaterial = new THREE.MeshBasicMaterial({
          color: getMarkerColor(point.co2),
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        
        const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
        indicator.position.set(point.position[0], terrainHeight + 0.01, point.position[2]);
        indicator.rotation.x = -Math.PI / 2;
        indicator.userData.originalOpacity = 0.3;
        indicator.userData.pulsePhase = index * 0.5;
        
        markers.push(indicator);
        scene.add(indicator);
      });
    };
    
    const getMarkerColor = (co2Level) => {
      if (co2Level < 375) return 0x4CAF50; // Green - good
      if (co2Level < 385) return 0xFFEB3B; // Yellow - moderate
      return 0xF44336; // Red - high
    };
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate markers (pulsing effect)
      markers.forEach((marker) => {
        if (marker.userData.pulsePhase !== undefined) {
          const pulse = Math.sin(time * 2 + marker.userData.pulsePhase) * 0.15 + 1;
          
          if (marker.geometry.type === 'SphereGeometry') {
            // Animate sensor lights
            marker.scale.setScalar(pulse * 0.8 + 0.2);
            if (marker.userData.originalIntensity) {
              marker.material.emissiveIntensity = marker.userData.originalIntensity * pulse;
            }
          } else if (marker.geometry.type === 'RingGeometry') {
            marker.material.opacity = marker.userData.originalOpacity * pulse;
          } else if (marker.geometry.type === 'PlaneGeometry') {
            // Animate water
            marker.position.y = marker.userData.originalPosition.y + Math.sin(time) * 0.02;
            marker.rotation.z = Math.sin(time) * 0.05;
          }
        }
      });
      
      // Add gentle camera sway for more natural feel
      if (camera) {
        const originalDistance = Math.sqrt(
          camera.position.x * camera.position.x + 
          camera.position.z * camera.position.z
        );
        camera.position.y += Math.sin(time * 0.5) * 0.02;
      }
      
      renderer.render(scene, camera);
    };
    
    const toggleNightMode = () => {
      nightMode.value = !nightMode.value;
      
      // Update scene fog and clear color
      scene.fog.color.setHex(nightMode.value ? 0x1a1a2e : 0x87CEEB);
      renderer.setClearColor(nightMode.value ? 0x0f0f23 : 0x87CEEB, 1);
      
      // Recreate terrain with new colors
      if (terrain) {
        scene.remove(terrain);
        createTerrain();
      }
      
      // Recreate lighting
      scene.children = scene.children.filter(child => 
        !(child instanceof THREE.AmbientLight || child instanceof THREE.DirectionalLight)
      );
      setupLighting();
    };
    
    const togglePostProcessing = () => {
      postProcessing.value = !postProcessing.value;
      // Add post-processing effects here if needed
    };
    
    const resetCamera = () => {
      camera.position.set(5, 8, 5);
      camera.lookAt(0, 0, 0);
    };
    
    const closeInfoPanel = () => {
      selectedPoint.value = null;
    };
    
    const handleResize = () => {
      if (camera && renderer && mapContainer.value) {
        const containerElement = mapContainer.value;
        camera.aspect = containerElement.clientWidth / containerElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
      }
    };
    
    onMounted(() => {
      setTimeout(() => {
        initScene();
        window.addEventListener('resize', handleResize);
      }, 100);
    });
    
    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
    });
    
    return {
      mapContainer,
      isLoading,
      nightMode,
      postProcessing,
      selectedPoint,
      toggleNightMode,
      togglePostProcessing,
      resetCamera,
      closeInfoPanel
    };
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.threejs-map {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #333;
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.map-controls {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 100;
}

.control-group {
  display: flex;
  gap: var(--spacing-sm);
}

.control-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(44, 44, 44, 0.9);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-size-small);
  backdrop-filter: blur(10px);
}

.control-btn:hover,
.control-btn.active {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.info-panel {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: rgba(44, 44, 44, 0.95);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  min-width: 300px;
  z-index: 100;
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-primary);
}

.info-content h3 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-heading4);
}

.info-content p {
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-small);
}

.info-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.stat-value {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-small);
}

.close-btn {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--color-primary);
}

.instructions {
  position: absolute;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 44, 44, 0.9);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  backdrop-filter: blur(10px);
  z-index: 100;
}

@media (max-width: 768px) {
  .info-panel {
    min-width: 250px;
    left: var(--spacing-sm);
    right: var(--spacing-sm);
    max-width: none;
  }
  
  .control-group {
    flex-direction: column;
  }
  
  .instructions {
    display: none;
  }
}
</style>

