/* ═══════════════════════════════════════════════
   3D MODEL VIEWER — Three.js GLB Loader
   ═══════════════════════════════════════════════ */
(function() {
  'use strict';

  const CONTAINERS = document.querySelectorAll('.model-3d-container');

  if (!CONTAINERS.length) return;

  // Load Three.js and OrbitControls dynamically
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      // Use ES module import for Three.js
      import(url).then(mod => resolve(mod)).catch(reject);
    });
  }

  async function initViewer(container) {
    const glbSrc = container.dataset.src;
    if (!glbSrc) return;

    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
      const { OrbitControls } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js');
      const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0A0B0E);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(1.5, 0.8, 1.5);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 3;
      controls.minDistance = 0.5;
      controls.maxDistance = 10;
      controls.target.set(0, 0, 0);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404060, 0.8);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(2, 3, 4);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x8888ff, 0.5);
      fillLight.position.set(-2, 1, -1);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xff8844, 0.3);
      rimLight.position.set(0, -1, -2);
      scene.add(rimLight);

      // Load GLB
      const loader = new GLTFLoader();
      loader.load(
        glbSrc,
        function(gltf) {
          const model = gltf.scene;
          
          // Auto-center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          model.position.sub(center);
          
          // Scale if too big or too small
          const maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0) {
            const scale = 2 / maxDim;
            model.scale.set(scale, scale, scale);
          }

          scene.add(model);
          renderer.render(scene, camera);
        },
        undefined,
        function(error) {
          console.warn('[3D] Failed to load', glbSrc, error);
          container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6B7280;font-family:monospace;font-size:0.6rem;">Failed to load model</div>';
        }
      );

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      // Handle resize
      function onResize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener('resize', onResize);

    } catch(err) {
      console.warn('[3D] Viewer error:', err);
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6B7280;font-family:monospace;font-size:0.6rem;">3D viewer unavailable</div>';
    }
  }

  // Initialize all viewers
  CONTAINERS.forEach(function(c) { initViewer(c); });

  console.log('[3D] Viewer initialized for', CONTAINERS.length, 'models');
})();
