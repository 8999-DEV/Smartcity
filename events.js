// Events: horizontal scroll + active glow
(function(){
  const timeline = document.getElementById('timeline');
  if(!timeline) return;
  timeline.addEventListener('wheel', (e)=>{
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      e.preventDefault();
      timeline.scrollLeft += e.deltaY;
    }
  }, {passive:false});

  const cards = Array.from(timeline.querySelectorAll('.event'));
  function update(){
    let mid = timeline.scrollLeft + timeline.clientWidth/2;
    let best=null, bestDist=Infinity;
    cards.forEach(c=>{
      const r = c.getBoundingClientRect();
      const center = r.left + r.width/2;
      const dist = Math.abs(window.innerWidth/2 - center);
      if(dist<bestDist){bestDist=dist; best=c;}
      c.classList.remove('active');
    });
    if(best) best.classList.add('active');
    requestAnimationFrame(update);
  }
  update();
})();

// FAQ accordion toggle (events page)
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
        if(content){ content.style.transition = 'max-height .35s ease'; }
      });
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupAccordion);
  }else{ setupAccordion(); }
})();

