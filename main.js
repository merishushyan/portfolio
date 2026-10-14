/* =========================================================
   Meri Shushyan — Portfolio
   Shared behavior. Every module checks for its own elements
   before running, so this one file works across all 4 pages.
   ========================================================= */
(function(){

  /* ===================== NAV — mobile toggle ===================== */
  var hamburger = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-nav-mobile]');
  if(hamburger && mobileNav){
    hamburger.addEventListener('click', function(){
      mobileNav.classList.toggle('is-open');
    });
  }

  /* ===================== WORK — HOVER IMAGE REVEAL ===================== */
  var workStage = document.getElementById('workStage');
  if(workStage){
    var preview = document.getElementById('preview');
    var track = document.getElementById('previewTrack');
    var rows = Array.prototype.slice.call(workStage.querySelectorAll('.row'));

    var frames = rows.map(function(row, i){
      var src = row.getAttribute('data-preview');
      var f = document.createElement('div');
      f.className = 'preview__frame';
      f.dataset.index = i;
      var img = document.createElement('img');
      img.src = src;
      img.alt = '';
      f.appendChild(img);
      track.appendChild(f);
      return f;
    });

    var hovered = null;
    var raw = { x: 0, y: 0 };
    var pos = { x: 0, y: 0 };
    var STIFFNESS = 0.16;
    var OFFSET_X = 26, OFFSET_Y = -26;

    function updateFrames(){
      frames.forEach(function(f, i){
        f.classList.remove('is-current', 'is-prev', 'is-next');
        if(hovered === null){ f.style.transform = 'translateY(100%)'; return; }
        f.style.transform = '';
        if(i === hovered) f.classList.add('is-current');
        else if(i < hovered) f.classList.add('is-prev');
        else f.classList.add('is-next');
      });
    }

    function previewLoop(){
      pos.x += (raw.x - pos.x) * STIFFNESS;
      pos.y += (raw.y - pos.y) * STIFFNESS;
      preview.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
      requestAnimationFrame(previewLoop);
    }
    requestAnimationFrame(previewLoop);

    workStage.addEventListener('mousemove', function(e){
      var rect = workStage.getBoundingClientRect();
      raw.x = e.clientX - rect.left + OFFSET_X;
      raw.y = e.clientY - rect.top + OFFSET_Y;
    });

    rows.forEach(function(row, idx){
      row.addEventListener('mouseenter', function(){
        hovered = idx;
        preview.classList.add('is-active');
        updateFrames();
        rows.forEach(function(r){
          if(r !== row) r.classList.add('is-dim'); else r.classList.remove('is-dim');
          r.classList.toggle('is-hover', r === row);
        });
      });
    });

    workStage.addEventListener('mouseleave', function(){
      hovered = null;
      preview.classList.remove('is-active');
      rows.forEach(function(r){ r.classList.remove('is-dim'); r.classList.remove('is-hover'); });
    });
  }

  /* ===================== ABOUT — BLOCK TEXT REVEAL ===================== */
  var aboutCopy = document.getElementById('aboutCopy');
  if(aboutCopy){
    var aboutWords = JSON.parse(aboutCopy.getAttribute('data-words'));

    aboutWords.forEach(function(w, i){
      var space = document.createTextNode(' ');
      var wrap = document.createElement('span');
      wrap.className = 'a-word' + (w.type ? ' a-word--block' : '');
      var delay = i * 0.045;
      if(w.type){
        var bg = document.createElement('span');
        bg.className = 'highlight-bg';
        bg.style.transitionDelay = (delay + 0.16).toFixed(3) + 's';
        wrap.appendChild(bg);
      }
      var inner = document.createElement('span');
      inner.className = 'a-word__inner';
      inner.textContent = w.t;
      inner.style.transitionDelay = delay.toFixed(3) + 's';
      wrap.appendChild(inner);
      aboutCopy.appendChild(wrap);
      if(i < aboutWords.length - 1) aboutCopy.appendChild(space);
    });

    var aboutSection = document.getElementById('aboutBio');
    var aboutRun = false;
    var aboutIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !aboutRun){
          aboutRun = true;
          aboutSection.classList.add('is-visible');
        }
      });
    }, { threshold: 0.3 });
    aboutIO.observe(aboutSection);
  }

  /* ===================== SKILLS — TEXT CAROUSEL ===================== */
  function makeCarousel(badgeId, contentId, texts, rotationMs){
    var DURATION = 420, STAGGER = 26, EASE = 'cubic-bezier(.22,1,.36,1)';
    var badge = document.getElementById(badgeId);
    var content = document.getElementById(contentId);
    if(!badge || !content) return;
    var index = 0, animating = false;

    function splitChars(text){ return Array.from(text); }
    function buildWord(text){
      var word = document.createElement('span');
      word.className = 'badge__word';
      splitChars(text).forEach(function(ch){
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? ' ' : ch;
        word.appendChild(span);
      });
      return word;
    }
    function measure(text){
      var probe = document.createElement('span');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      probe.style.whiteSpace = 'nowrap';
      probe.style.font = window.getComputedStyle(badge).font;
      probe.style.padding = window.getComputedStyle(badge).padding;
      probe.textContent = text;
      document.body.appendChild(probe);
      var w = probe.getBoundingClientRect().width;
      document.body.removeChild(probe);
      return w;
    }
    function setInitial(){
      var word = buildWord(texts[index]);
      content.appendChild(word);
      badge.style.width = measure(texts[index]) + 'px';
    }
    function next(){
      if(animating) return;
      animating = true;
      var nextIndex = (index + 1) % texts.length;
      var outWord = content.querySelector('.badge__word');
      var outChars = outWord ? outWord.querySelectorAll('.char') : [];
      outChars.forEach(function(ch, i){
        ch.style.transition = 'transform ' + DURATION + 'ms ' + EASE + ', opacity ' + DURATION + 'ms ' + EASE;
        ch.style.transitionDelay = (i * STAGGER) + 'ms';
        ch.style.transform = 'translateY(-120%)';
        ch.style.opacity = '0';
      });
      var outTotal = DURATION + outChars.length * STAGGER;
      setTimeout(function(){
        content.innerHTML = '';
        var newWord = buildWord(texts[nextIndex]);
        var newChars = newWord.querySelectorAll('.char');
        newChars.forEach(function(ch){ ch.style.transform = 'translateY(120%)'; ch.style.opacity = '0'; });
        content.appendChild(newWord);
        badge.style.width = measure(texts[nextIndex]) + 'px';
        void content.offsetWidth;
        requestAnimationFrame(function(){
          newChars.forEach(function(ch, i){
            ch.style.transition = 'transform ' + DURATION + 'ms ' + EASE + ', opacity ' + DURATION + 'ms ' + EASE;
            ch.style.transitionDelay = (i * STAGGER) + 'ms';
            ch.style.transform = 'translateY(0%)';
            ch.style.opacity = '1';
          });
        });
        index = nextIndex;
        setTimeout(function(){ animating = false; }, DURATION + newChars.length * STAGGER);
      }, outTotal);
    }
    setInitial();
    setInterval(next, rotationMs);
  }

  var badgeA = document.getElementById('badgeA');
  if(badgeA){
    var industriesData = JSON.parse(badgeA.getAttribute('data-texts'));
    makeCarousel('badgeA', 'badgeContentA', industriesData, 2600);
  }
  var badgeB = document.getElementById('badgeB');
  if(badgeB){
    var toolsData = JSON.parse(badgeB.getAttribute('data-texts'));
    makeCarousel('badgeB', 'badgeContentB', toolsData, 2200);
  }

  /* ===================== IMPACT — ODOMETER STATS ===================== */
  var impact = document.getElementById('impact');
  if(impact){
    var statEls = Array.prototype.slice.call(impact.querySelectorAll('.stat__num'));

    statEls.forEach(function(el){
      var value = el.getAttribute('data-num');
      Array.from(value).forEach(function(ch, i){
        if(/[0-9]/.test(ch)){
          var target = parseInt(ch, 10);
          var mask = document.createElement('span');
          mask.className = 'digit-mask';
          var strip = document.createElement('span');
          strip.className = 'digit-strip';
          for(var d = 0; d <= 9; d++){
            var s = document.createElement('span');
            s.textContent = d;
            strip.appendChild(s);
          }
          strip.dataset.target = target;
          strip.style.transitionDelay = (i * 0.08) + 's';
          mask.appendChild(strip);
          el.appendChild(mask);
        } else {
          var pc = document.createElement('span');
          pc.className = 'plain-char';
          pc.textContent = ch;
          pc.style.transitionDelay = (i * 0.08) + 's';
          el.appendChild(pc);
        }
      });
    });

    var impactRun = false;
    var impactIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !impactRun){
          impactRun = true;
          impact.classList.add('is-visible');
          document.querySelectorAll('.digit-strip').forEach(function(strip){
            var target = parseInt(strip.dataset.target, 10);
            strip.style.transform = 'translateY(-' + (target * 10) + '%)';
          });
        }
      });
    }, { threshold: 0.35 });
    impactIO.observe(impact);
  }


  (function(){
  /* ---- intro loader (once per visit) ---- */
  var intro = document.getElementById('intro');
  if(intro){
    var seen = false;
    try{ seen = sessionStorage.getItem('introSeen') === '1'; }catch(e){}
    var done = function(){
      intro.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      try{ sessionStorage.setItem('introSeen','1'); }catch(e){}
    };
    if(seen){ intro.style.display='none'; document.body.classList.remove('is-loading'); }
    else {
      var loader = document.getElementById('loader');
      var ROWS=5, COLS=40, CW=13, BW=4;
      for(var r=0;r<ROWS;r++){ var row=document.createElement('div'); row.className='loader-row'; row.textContent='.'.repeat(COLS); loader.appendChild(row); }
      var block=document.createElement('div'); block.className='loader-block'; loader.appendChild(block);
      var pos=0, dir=1, steps=0, total=(COLS-BW)*2;
      block.style.width=(BW*CW)+'px';
      var iv=setInterval(function(){
        pos+=dir;
        if(pos>=COLS-BW) dir=-1;
        if(pos<=0) dir=1;
        block.style.left=(pos*CW)+'px';
        if(++steps>=total){ clearInterval(iv); setTimeout(done,120); }
      },16);
    }
  }
  })();

  (function(){
  /* ---- blur-in text (hero) ---- */
  document.querySelectorAll('[data-blur], [data-blur-words]').forEach(function(el){
    var words = el.hasAttribute('data-blur-words');
    var parts = words ? el.textContent.trim().split(' ') : el.textContent.trim().split('');
    var step = words ? 110 : 90, base = words ? 500 : 0;
    if(el.hasAttribute('data-blur') && el.nextElementSibling === null){}
    el.textContent = '';
    parts.forEach(function(p, i){
      var sp = document.createElement('span');
      sp.className = 'blur-seg';
      sp.textContent = p + (words && i < parts.length - 1 ? '\u00A0' : '');
      sp.style.transitionDelay = (base + i * step) + 'ms';
      el.appendChild(sp);
    });
  });
  })();

  (function(){
  /* ---- hero: moving name marquee + cursor parallax ---- */
  var hx = document.getElementById('heroCut');
  if(hx){
    var rows = Array.prototype.slice.call(hx.querySelectorAll('.hx__row'));
    var cut = document.getElementById('hxCutout');
    var states = rows.map(function(row, idx){
      var track = row.querySelector('.hx__track');
      var txt = idx === 0 ? 'MERI SHUSHYAN' : 'UX RESEARCH / PRODUCT DESIGN';
      for(var k=0;k<6;k++){ var it=document.createElement('span'); it.className='hx__item'; it.textContent=txt; track.appendChild(it); }
      return { track:track, dir:parseInt(row.dataset.dir,10), x:0, speed: idx===0 ? 55 : 80, half:0 };
    });
    function measure(){ states.forEach(function(st){ st.half = st.track.scrollWidth / 6; if(st.dir>0) st.x = -st.half; }); }
    measure(); window.addEventListener('resize', measure);
    var mx=0,my=0,cx=0,cy=0,lastT=0;
    hx.addEventListener('mousemove', function(e){ mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2; });
    var boost = 0;
    window.addEventListener('wheel', function(e){ boost = Math.max(-400, Math.min(400, boost + e.deltaY*0.6)); }, {passive:true});
    function loop(now){
      var dt = lastT ? Math.min((now-lastT)/1000, .1) : 0; lastT = now;
      boost *= 0.92;
      states.forEach(function(st){
        st.x += st.dir * (st.speed + Math.abs(boost)) * dt;
        if(st.dir < 0 && st.x <= -st.half) st.x += st.half;
        if(st.dir > 0 && st.x >= 0) st.x -= st.half;
        st.track.style.transform = 'translate3d(' + st.x + 'px,0,0)';
      });
      cx += (mx-cx)*0.06; cy += (my-cy)*0.06;
      if(cut) cut.style.transform = 'translateX(-50%) translate3d(' + (cx*14) + 'px,' + (cy*8) + 'px,0)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  })();


(function(){

(function(){
  var data = [
    {
      date: "2018 — 2020",
      title: "MSc, Economics",
      org: "University of Jena",
      desc: "Foundational studies before moving into product and design — where the analytical, evidence-first approach that still shapes how I work started."
    },
    {
      date: "2021",
      title: "Associate Product Owner",
      org: "Draper Walled Garden",
      desc: "First hands-on product role — working directly with prioritization, requirements, and cross-functional teams before shifting fully into design."
    },
    {
      date: "2021 — 2022",
      title: "UI/UX Designer",
      org: "Locator CJSC · Yerevan",
      desc: "Ran 8+ research sessions and a survey with paramedics and dispatchers, then designed the full 25+ screen ambulance app — now used by Armenia's national ambulance service."
    },
    {
      date: "2022 — 2025",
      title: "MA, International Marketing",
      org: "TH Nürnberg",
      desc: "Comparative usability study (N=15, 3 prototype conditions): AI-generated vs. human-made, measured with task metrics, UEQ+ and moderated tests in Lookback."
    },
    {
      date: "2023 — 2025",
      title: "UI/UX Designer (Working Student)",
      org: "Visable Labs · Berlin",
      desc: "Designed 20+ B2B landing pages for 10+ EU markets in 4 languages — then read the A/B test data after launch and iterated."
    }
  ];

  var rail = document.getElementById('rail');
  if(!rail) return;
  var pDate = document.getElementById('pDate');
  var pTitle = document.getElementById('pTitle');
  var pOrg = document.getElementById('pOrg');
  var pDesc = document.getElementById('pDesc');

  var ticks = data.map(function(item, i){
    var tick = document.createElement('div');
    tick.className = 'tick';
    tick.dataset.index = i;
    var year = document.createElement('span');
    year.className = 'tick__year';
    year.textContent = item.date.split(' ')[0];
    tick.appendChild(year);
    rail.appendChild(tick);
    return tick;
  });

  var activeIndex = 2; // default focus: the ambulance app role

  function render(index){
    var item = data[index];
    pDate.textContent = item.date;
    pTitle.textContent = item.title;
    pOrg.textContent = item.org;
    pDesc.textContent = item.desc;
    ticks.forEach(function(t, i){
      t.classList.toggle('is-active', i === index);
    });
    positionCard(index);
  }

  // put the card (and the dot on the divider) on the same line as the active tick
  var panel = document.getElementById('panel');
  var card = document.getElementById('previewCard');
  var dot = document.getElementById('pDot');
  function positionCard(index){
    var panelRect = panel.getBoundingClientRect();
    var tRect = ticks[index].getBoundingClientRect();
    var center = tRect.top + tRect.height / 2 - panelRect.top;
    var top = center - card.offsetHeight / 2;
    top = Math.max(0, Math.min(top, panelRect.height - card.offsetHeight));
    card.style.top = top + 'px';
    dot.style.top = center + 'px';
  }
  window.addEventListener('resize', function(){ positionCard(activeIndex); });
  window.addEventListener('load', function(){ positionCard(activeIndex); });

  function applyMagnify(hoverY){
    var railRect = rail.getBoundingClientRect();
    ticks.forEach(function(t, i){
      var tRect = t.getBoundingClientRect();
      var tCenter = tRect.top + tRect.height/2 - railRect.top;
      var dist = hoverY === null ? 9999 : Math.abs(hoverY - tCenter);
      var sigma = 34;
      var strength = hoverY === null ? 0 : Math.exp(-(dist*dist)/(2*sigma*sigma));
      var width = 20 + strength * 40;
      t.style.width = width + 'px';
      t.classList.toggle('is-near', strength > 0.35);
    });
  }

  applyMagnify(null);
  render(activeIndex);

  // the whole row (rail + text) is the hover zone, so moving over the text scrubs too
  var zone = document.querySelector('.scrubber');

  zone.addEventListener('mousemove', function(e){
    var railRect = rail.getBoundingClientRect();
    var y = e.clientY - railRect.top;
    applyMagnify(y);

    var nearestIdx = 0, nearestDist = Infinity;
    ticks.forEach(function(t, i){
      var tRect = t.getBoundingClientRect();
      var tCenter = tRect.top + tRect.height/2 - railRect.top;
      var d = Math.abs(y - tCenter);
      if(d < nearestDist){ nearestDist = d; nearestIdx = i; }
    });
    if(nearestIdx !== activeIndex){
      activeIndex = nearestIdx;
      render(activeIndex);
    }
  });

  zone.addEventListener('mouseleave', function(){
    applyMagnify(null);
  });

  rail.addEventListener('keydown', function(e){
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      activeIndex = Math.min(data.length - 1, activeIndex + 1);
      render(activeIndex);
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      activeIndex = Math.max(0, activeIndex - 1);
      render(activeIndex);
    } else if(e.key === 'Home'){
      e.preventDefault();
      activeIndex = 0;
      render(activeIndex);
    } else if(e.key === 'End'){
      e.preventDefault();
      activeIndex = data.length - 1;
      render(activeIndex);
    }
  });
})();

(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var map = [['top','#top'],['work','#work'],['about','#about'],['contact','#contact']];
  if(!('IntersectionObserver' in window)) return;
  var cur = null;
  function setActive(h){ if(cur===h) return; cur=h; links.forEach(function(l){ l.classList.toggle('is-active', l.getAttribute('href')===h); }); }
  window.addEventListener('scroll', function(){
    var y = window.scrollY + window.innerHeight*0.4, act = '#top';
    map.forEach(function(m){ var el=document.getElementById(m[0]); if(el && el.getBoundingClientRect().top + window.scrollY <= y) act=m[1]; });
    var sk=document.getElementById('skillsAnchor'); 
    setActive(act);
  }, {passive:true});
})();

})();


(function(){
  var root=document.getElementById('skillHover'); if(!root) return;
  var rows=root.querySelectorAll('.sh__row'), panels=root.querySelectorAll('.sh__items');
  function act(i){ rows.forEach(function(r){ r.classList.toggle('is-active', r.dataset.i==i); }); panels.forEach(function(p){ p.classList.toggle('is-active', p.dataset.i==i); }); }
  rows.forEach(function(r){ r.addEventListener('mouseenter', function(){ act(r.dataset.i); }); r.addEventListener('focus', function(){ act(r.dataset.i); }); r.addEventListener('click', function(){ act(r.dataset.i); }); });
})();

})();
