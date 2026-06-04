/* cs-flow.js — shared sticky-scroll product flow initializer */
/* Usage: initFlow(STEPS_ARRAY) after DOM is ready             */

function initFlow(STEPS) {
  var elNumber = document.getElementById('activeStepNumber');
  var elTitle  = document.getElementById('activeStepTitle');
  var elCopy   = document.getElementById('activeStepCopy');
  var elList   = document.getElementById('stepList');
  var stage    = document.getElementById('screenStage');
  var trigBox  = document.getElementById('triggers');

  var images    = [];
  var listItems = [];

  STEPS.forEach(function(step, i) {
    /* Screen image */
    var img = document.createElement('img');
    img.className = 'cs-screen-img';
    img.src = step.image;
    img.alt = step.title;
    img.loading = i === 0 ? 'eager' : 'lazy';
    stage.appendChild(img);
    images.push(img);

    /* Step nav item */
    var li = document.createElement('li');
    li.textContent = step.number + ' · ' + step.title;
    elList.appendChild(li);
    listItems.push(li);

    /* Scroll trigger */
    var trig = document.createElement('div');
    trig.className = 'cs-trigger';
    trig.dataset.index = i;
    trigBox.appendChild(trig);

    li.addEventListener('click', function() {
      trig.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  function setActive(index) {
    var step = STEPS[index];
    if (!step) return;
    elNumber.textContent = 'Step ' + step.number;
    elTitle.textContent  = step.title;
    elCopy.textContent   = step.copy;
    images.forEach(function(img, i)   { img.classList.toggle('active', i === index); });
    listItems.forEach(function(li, i) { li.classList.toggle('active', i === index); });
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.cs-trigger').forEach(function(el) { observer.observe(el); });
  setActive(0);
}
