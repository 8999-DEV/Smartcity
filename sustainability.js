// Sustainability: simple 3D scene with wind turbines and solar panels
(function(){
  const canvas = document.getElementById('ecoScene');
  if(!canvas) return;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const r = canvas.getBoundingClientRect();
  renderer.setSize(r.width, r.height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, r.width/r.height, .1, 100);
  camera.position.set(3,2.2,5);

  const ambient = new THREE.AmbientLight(0x226644, .8);
  const dir = new THREE.DirectionalLight(0x15ff99, 1.2); dir.position.set(5,5,2);
  scene.add(ambient, dir);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10),
    new THREE.MeshPhongMaterial({color:0x0b1f1a, emissive:0x06140f})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Wind turbine factory
  function makeTurbine(x,z){
    const group = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 12), new THREE.MeshPhongMaterial({color:0xffffff}));
    pole.position.y = 0.8;
    group.add(pole);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.08,16,16), new THREE.MeshPhongMaterial({color:0x15ff99}));
    hub.position.set(0,1.6,0);
    group.add(hub);
    const blades = new THREE.Group();
    for(let i=0;i<3;i++){
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.03,0.5,0.1), new THREE.MeshPhongMaterial({color:0x00e5ff}));
      blade.position.y = 1.6 + 0.25;
      blade.rotation.z = i * (2*Math.PI/3);
      blades.add(blade);
    }
    group.add(blades);
    group.position.set(x,0,z);
    scene.add(group);
    return blades;
  }

  const bladesA = makeTurbine(-1.2, -0.8);
  const bladesB = makeTurbine(0.4, -0.5);
  const bladesC = makeTurbine(1.8, -1.2);

  // Solar panel array
  for(let i=0;i<5;i++){
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.4), new THREE.MeshPhongMaterial({color:0x112244, emissive:0x0a1733}));
    panel.position.set(-2.2 + i*0.9, 0.12, 1.0);
    panel.rotation.x = -0.4;
    scene.add(panel);
  }

  function onResize(){
    const rr = canvas.getBoundingClientRect();
    renderer.setSize(rr.width, rr.height, false);
    camera.aspect = rr.width/rr.height; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  function animate(){
    requestAnimationFrame(animate);
    [bladesA,bladesB,bladesC].forEach((b,i)=>{ b.rotation.y += 0.06 + i*0.01; });
    renderer.render(scene, camera);
  }
  animate();
})();

// FAQ accordion toggle
(function(){
  function setupAccordion(){
    document.querySelectorAll('.accordion .accordion-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const item = btn.closest('.accordion-item');
        if(!item) return;
        const content = item.querySelector('.accordion-content');
        const open = item.classList.contains('active');
        // close others
        item.parentElement.querySelectorAll('.accordion-item.active').forEach(i=>{
          if(i!==item){ i.classList.remove('active'); }
        });
        // toggle current
        item.classList.toggle('active', !open);
        // optional: smooth max-height transition kick
        if(content){ content.style.transition = 'max-height .35s ease'; }
      });
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupAccordion);
  }else{ setupAccordion(); }
})();

