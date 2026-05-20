/* ═══════════════════════════════════════════════
   3D MODEL VIEWER — Three.js GLB Loader
   ═══════════════════════════════════════════════ */
(function() {
  'use strict';

  var CONTAINERS = document.querySelectorAll('.model-3d-container');
  if (!CONTAINERS.length) return;

  // Wait for THREE to be loaded
  function waitForThree(cb) {
    if (typeof THREE !== 'undefined') { cb(); return; }
    var check = setInterval(function() {
      if (typeof THREE !== 'undefined') { clearInterval(check); cb(); }
    }, 100);
    setTimeout(function() { clearInterval(check); cb(); }, 10000);
  }

  function initViewer(container) {
    var glbSrc = container.getAttribute('data-src');
    if (!glbSrc) return;

    var width = container.clientWidth || 300;
    var height = container.clientHeight || 300;

    try {
      // Scene
      var scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      // Camera
      var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(1.2, 0.6, 1.2);

      // Renderer
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.5;
      container.appendChild(renderer.domElement);

      // Controls
      var controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;
      controls.minDistance = 0.5;
      controls.maxDistance = 8;
      controls.target.set(0, 0, 0);

      // Per-model lighting config
      var lightMode = container.getAttribute('data-lighting') || 'default';

      if (lightMode === 'soft') {
        // Chen Wei — soft, dim
        scene.add(new THREE.AmbientLight(0x666666, 0.6));
        var k = new THREE.DirectionalLight(0xffffff, 0.8);
        k.position.set(2, 3, 4);
        scene.add(k);
        var f = new THREE.DirectionalLight(0x8888ff, 0.3);
        f.position.set(-2, 1, -1);
        scene.add(f);
      } else if (lightMode === 'front') {
        // Rocket — 360° wrap lighting to reveal dark surfaces from every angle
        scene.add(new THREE.AmbientLight(0xaaaaaa, 2.0));
        var positions = [
          [2, 1, 2], [-2, 1, 2], [2, -1, 2], [-2, -1, 2],
          [2, 1, -2], [-2, 1, -2], [0, 2, 0], [0, -2, 0]
        ];
        positions.forEach(function(pos) {
          var l = new THREE.DirectionalLight(0xffffff, 0.6);
          l.position.set(pos[0], pos[1], pos[2]);
          scene.add(l);
        });
      // Background grid for rocket
      var bgMode = container.getAttribute('data-bg') || '';
      if (bgMode === 'grid') {
        scene.background = new THREE.Color(0xE0E0E0);
        var grid = new THREE.GridHelper(5, 20, 0x999999, 0xBBBBBB);
        grid.position.y = -0.6;
        scene.add(grid);
      } else {
        // Default — balanced
        scene.add(new THREE.AmbientLight(0x888888, 1.5));
        var k3 = new THREE.DirectionalLight(0xffffff, 2.0);
        k3.position.set(3, 4, 5);
        scene.add(k3);
        var f3 = new THREE.DirectionalLight(0xccccff, 1.0);
        f3.position.set(-3, 2, -2);
        scene.add(f3);
        var r3 = new THREE.DirectionalLight(0xffffff, 0.8);
        r3.position.set(0, -2, -3);
        scene.add(r3);
      }

      // Loader
      var loader = new THREE.GLTFLoader();
      loader.load(glbSrc, function(gltf) {
        var model = gltf.scene;

        // Center and scale
        var box = new THREE.Box3().setFromObject(model);
        var center = box.getCenter(new THREE.Vector3());
        var size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        var maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0 && maxDim < 10) {
          var s = 1.8 / maxDim;
          model.scale.set(s, s, s);
        }

        scene.add(model);
      }, undefined, function(err) {
        console.warn('[3D] Load error:', glbSrc, err);
      });

      // Animation
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      // Resize
      function onResize() {
        var w = container.clientWidth;
        var h = container.clientHeight;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
      window.addEventListener('resize', onResize);

    } catch(e) {
      console.warn('[3D] Init error:', e.message);
    }
  }

  // Load all when ready
  waitForThree(function() {
    CONTAINERS.forEach(function(c) { initViewer(c); });
    console.log('[3D] Viewer initialized for', CONTAINERS.length, 'models');
  });
})();
