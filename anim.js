(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var K=.28;
  function delayOf(el){ var h=el.closest('.a,.ocard'); var d=h?parseFloat(getComputedStyle(h).getPropertyValue('--d')):0; return (d||0)*1000*K; }
  /* ---------- user flow diagram ---------- */
  var NODES=[
   ['Log in / Sign up',485,253,97,31,'#212d3c','#fff',0],['Home Screen',489,340,88,30,'#4898b7','#fff',1.0],
   ['Calls',326,424,43,31,'#e6f4f8','#4898b7',2.0],['Journal',506,424,55,30,'#e6f4f8','#4898b7',2.15],['Hospital Beds',695,424,89,30,'#e6f4f8','#4898b7',2.3],
   ['Time Schedule',74,562,95,31,'#1697b6','#fff',4.3],['Clarified Data',231,562,89,31,'#1697b6','#fff',4.5],['Call Result',410,563,72,31,'#1697b6','#fff',4.7],['Complaints',575,562,77,31,'#1697b6','#fff',4.9],['Measurements',736,562,95,31,'#1697b6','#fff',5.1],
   ['Urgent Interventions',65,678,124,31,'#1697b6','#fff',6.6],['Provided Assistance',304,678,124,31,'#1697b6','#fff',6.8],['Hospitalization',520,677,95,31,'#1697b6','#fff',7.0],['Medical Workers',704,677,104,31,'#1697b6','#fff',7.2],
   ['Complications',98,785,94,31,'#1697b6','#fff',8.4],['Used Medications',292,785,112,31,'#1697b6','#fff',8.6],['General Information',604,785,122,31,'#1697b6','#fff',8.8]];
  var PATHS=[
   ['M533 284V340',.5,.7],['M534 370V412',1.3,.6],['M349 424V412H735V424',1.6,1.2],['M534 412V424',1.9,.3],
   ['M349 455V470Q349 480 359 480H526Q536 480 536 470V454',2.7,1.2],['M303 463H349',3.0,.5],['M541 463H595',3.0,.5],
   ['M449 480V500',3.2,.4],['M364 500H532',3.5,.6],['M532 500V636',3.7,1.4],['M364 500V640',3.7,1.4],['M449 500V562',3.7,.6],
   ['M119 562V526H779V562',3.8,1.4],['M276 526V562',4.0,.4],['M614 526V562',4.0,.4],
   ['M125 678V640H363V678',5.8,1.0],['M252 640V742',6.2,.7],['M568 677V636H753V677',6.0,1.0],['M664 636V785',6.4,1.0],
   ['M145 785V742H348V785',7.6,1.0]];
  function buildFlow(root){
    var NS='http://www.w3.org/2000/svg',lines=root.querySelector('#flowLines'),nodes=root.querySelector('#flowNodes'),mask=root.querySelector('#flowmask');
    PATHS.forEach(function(p){
      var l=document.createElementNS(NS,'path');l.setAttribute('d',p[0]);l.setAttribute('fill','none');l.setAttribute('stroke','#86c1d8');l.setAttribute('stroke-width','1.3');l.setAttribute('stroke-dasharray','1.6 3');lines.appendChild(l);
      var m=document.createElementNS(NS,'path');m.setAttribute('d',p[0]);m.setAttribute('fill','none');m.setAttribute('stroke','#fff');m.setAttribute('stroke-width','7');m.setAttribute('pathLength','1');m.setAttribute('class','mp');
      m.style.transition='stroke-dashoffset '+(p[2]*.5)+'s ease '+(p[1]*K)+'s';mask.appendChild(m);
    });
    NODES.forEach(function(n){
      var g=document.createElementNS(NS,'g');g.setAttribute('class','nd');g.style.transitionDelay=(n[7]*K)+'s';
      var r=document.createElementNS(NS,'rect');r.setAttribute('x',n[1]);r.setAttribute('y',n[2]);r.setAttribute('width',n[3]);r.setAttribute('height',n[4]);r.setAttribute('rx',8);r.setAttribute('fill',n[5]);
      var t=document.createElementNS(NS,'text');t.setAttribute('x',n[1]+n[3]/2);t.setAttribute('y',n[2]+n[4]/2+4.4);t.setAttribute('text-anchor','middle');t.setAttribute('font-size','11.8');t.setAttribute('font-weight','500');t.setAttribute('fill',n[6]);t.textContent=n[0];
      g.appendChild(r);g.appendChild(t);nodes.appendChild(g);
    });
    [['Departure/Arrival','translate(293 467) rotate(-90)'],['Details','translate(603 464) rotate(90)']].forEach(function(a){
      var t=document.createElementNS(NS,'text');t.setAttribute('transform',a[1]);t.setAttribute('text-anchor','middle');t.setAttribute('font-size','11.5');t.setAttribute('fill','#666');t.setAttribute('class','lb');t.style.transitionDelay=(3*K)+'s';t.textContent=a[0];nodes.appendChild(t);
    });
  }
  /* ---------- count / type ---------- */
  function fmt(el,v){ el.textContent=(el.dataset.pre||'')+Math.round(v)+(el.dataset.suf||''); }
  function counts(root){
    root.querySelectorAll('[data-count]').forEach(function(el){
      var end=parseFloat(el.dataset.count); if(reduce){fmt(el,end);return;}
      fmt(el,0);
      setTimeout(function(){ var t0=null,dur=900; function s(ts){ if(!t0)t0=ts; var t=Math.min((ts-t0)/dur,1); fmt(el,end*(1-Math.pow(1-t,3))); if(t<1)requestAnimationFrame(s); } requestAnimationFrame(s); }, delayOf(el)+250);
    });
    root.querySelectorAll('b.type').forEach(function(el){
      var txt=el.dataset.text; if(reduce){el.textContent=txt;return;}
      el.textContent=''; var i=0;
      setTimeout(function(){ el.classList.add('typing'); var iv=setInterval(function(){ i++; el.textContent=txt.slice(0,i); if(i>=txt.length){clearInterval(iv);el.classList.remove('typing');el.classList.add('done');} },75); }, delayOf(el)+250);
    });
    root.querySelectorAll('b.zero').forEach(function(el){
      var from=parseFloat(el.dataset.from)||40; if(reduce){el.textContent='0';return;}
      el.textContent=String(from);
      setTimeout(function(){ var t0=null,dur=1500; function s(ts){ if(!t0)t0=ts; var t=Math.min((ts-t0)/dur,1); el.textContent=String(Math.round(from*(1-Math.pow(t,.6)))); if(t<1)requestAnimationFrame(s); else el.textContent='0'; } requestAnimationFrame(s); }, delayOf(el)+250);
    });
  }
  /* pre-hide typed text so it never flashes full */
  document.querySelectorAll('b.type').forEach(function(el){ if(!reduce) el.textContent=''; });
  document.querySelectorAll('.flow').forEach(buildFlow);
  var targets=[].slice.call(document.querySelectorAll('.sx'));
  function go(el){ el.classList.add('in'); counts(el); }
  if(!('IntersectionObserver' in window)||reduce){ targets.forEach(go); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); go(e.target); } }); },{threshold:.3});
  targets.forEach(function(t){ io.observe(t); });
})();

(function(){
  var roots=[].slice.call(document.querySelectorAll('.rsx')); if(!roots.length) return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(r){
    r.classList.add('in');
    r.querySelectorAll('b[data-v]').forEach(function(el){
      var end=parseFloat(el.dataset.v),dl=parseFloat(el.style.getPropertyValue('--dl'))||0;
      if(reduce){ el.textContent=end+'%'; return; }
      el.textContent='0%';
      setTimeout(function(){ var t0=null,dur=2800; function s(ts){ if(!t0)t0=ts; var t=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-t,3); el.textContent=Math.round(end*e)+'%'; if(t<1)requestAnimationFrame(s); } requestAnimationFrame(s); }, (dl+.3)*1000);
    });
  }
  roots.forEach(function(r){
    if(reduce||!('IntersectionObserver' in window)){ run(r); return; }
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ io.disconnect(); run(r); } }); },{threshold:.3}); io.observe(r);
  });
})();
(function(){ var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches; if(r) document.querySelectorAll('.lv').forEach(function(v){ v.removeAttribute('autoplay'); v.pause(); }); })();
