// Contact page: floating neon contact buttons and focus transitions
(function(){
  // Floating buttons bounce
  document.querySelectorAll('.btn').forEach((btn,i)=>{
    btn.animate([
      {transform:'translateY(0)'},
      {transform:'translateY(-3px)'},
      {transform:'translateY(0)'}
    ], {duration:2200+ i*120, iterations:Infinity});
  });

  // Map pins hover tooltip effect
  const map = document.getElementById('contactMap');
  if(map){
    map.addEventListener('mousemove', (e)=>{
      map.style.boxShadow='0 0 0 2px rgba(0,229,255,.2), var(--glow)';
    });
    map.addEventListener('mouseleave', ()=>{
      map.style.boxShadow='none';
    });
  }
})();
