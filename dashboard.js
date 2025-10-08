// Dashboard: animate counters and simple bar charts
(function(){
  // Counter animation
  document.querySelectorAll('.stat .value').forEach(el=>{
    const target = parseFloat(el.dataset.value || '0');
    const isFloat = target % 1 !== 0;
    let current = 0;
    const duration = 1200;
    const start = performance.now();
    function tick(t){
      const p = Math.min(1, (t - start)/duration);
      const val = target * p;
      el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Bars
  function makeBars(id, values){
    const wrap = document.getElementById(id);
    if(!wrap) return;
    values.forEach(v=>{
      const b = document.createElement('div');
      b.className='bar';
      b.style.height='0px';
      wrap.appendChild(b);
      requestAnimationFrame(()=>{
        b.style.height = (30 + v*1.4) + 'px';
      });
    });
  }
  makeBars('barsA', [20,45,30,55,35,60,40]);
  makeBars('barsB', [50,40,55,25,60,45,52]);
})();
