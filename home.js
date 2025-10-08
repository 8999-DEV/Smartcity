// 3D rotating globe/city using Three.js
(function(){
  const canvas = document.getElementById('cityCanvas');
  if(!canvas) return;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const rect = canvas.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, rect.width/rect.height, 0.1, 1000);
  camera.position.set(0,0,6);

  const light = new THREE.PointLight(0x00e5ff, 1.2);
  light.position.set(5,5,5);
  scene.add(light);

  // Globe
  const globeGeo = new THREE.SphereGeometry(2, 48, 48);
  const globeMat = new THREE.MeshPhongMaterial({color:0x0b1022, emissive:0x0b1022, shininess:10, wireframe:false});
  const globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // Neon wireframe city grid arcs
  const wireMat = new THREE.MeshBasicMaterial({color:0x00e5ff, wireframe:true, transparent:true, opacity:0.25});
  const wire = new THREE.Mesh(new THREE.SphereGeometry(2.02, 24, 24), wireMat);
  scene.add(wire);

  // City spikes
  const spikeGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.4, 6);
  const spikeMat = new THREE.MeshBasicMaterial({color:0x8a5bff});
  for(let i=0;i<200;i++){
    const spike = new THREE.Mesh(spikeGeo, spikeMat);
    const phi = Math.acos(2*Math.random()-1);
    const theta = 2*Math.PI*Math.random();
    const r = 2.02;
    spike.position.set(
      r*Math.sin(phi)*Math.cos(theta),
      r*Math.cos(phi),
      r*Math.sin(phi)*Math.sin(theta)
    );
    spike.lookAt(new THREE.Vector3(0,0,0));
    scene.add(spike);
  }

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableZoom=false;controls.enablePan=false;controls.autoRotate=true;controls.autoRotateSpeed=0.8;

  function onResize(){
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width/r.height; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  function animate(){
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0015;
    wire.rotation.y -= 0.001;
    renderer.render(scene, camera);
  }
  animate();
})();

// Enhance header glow on scroll by toggling a class on the root element
(function(){
  const root = document.documentElement;
  function onScroll(){
    root.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', onScroll);
  onScroll();
})();
