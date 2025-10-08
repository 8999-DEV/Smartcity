// Emergency page: animate ticker speed and subtle alert pulse
(function(){
  const track = document.getElementById('tickerTrack');
  if(track){
    // Duplicate content to ensure continuous loop feel
    track.innerHTML = track.innerHTML + track.innerHTML;
    // Subtle pulse
    track.animate([
      {filter:'brightness(1)'},
      {filter:'brightness(1.15)'},
      {filter:'brightness(1)'}
    ], {duration:2800, iterations:Infinity});
  }
})();

// FAQ accordion toggle (emergency page)
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

