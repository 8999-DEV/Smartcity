// Healthcare micro-animations
(function(){
  // Add heartbeat animation to titles containing 'Heart'
  document.querySelectorAll('h3').forEach(h=>{
    if(/heart/i.test(h.textContent)){
      h.style.position='relative';
      h.style.textShadow='0 0 10px rgba(255,61,242,.6)';
      h.animate([
        {transform:'scale(1)'},
        {transform:'scale(1.05)'},
        {transform:'scale(1)'}
      ], {duration:1200, iterations:Infinity});
    }
  });
})();
