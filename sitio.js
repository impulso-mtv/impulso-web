(function(){
  const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.textContent=open?'✕':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));}
  const key='impulso_privacy_notice_v1';
  if(!localStorage.getItem(key)){
    const box=document.createElement('aside'); box.className='privacy-notice'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','Aviso de privacidad');
    box.innerHTML='<div><strong>Tu privacidad importa.</strong><p>Impulso utiliza almacenamiento local para recordar preferencias y el progreso del reto. Consulta nuestra <a href="cookies.html">política de cookies</a> y <a href="privacidad.html">política de privacidad</a>.</p></div><button type="button">Entendido</button>';
    box.querySelector('button').addEventListener('click',()=>{localStorage.setItem(key,'1');box.remove();}); document.body.appendChild(box);
  }
})();


(function(){
  document.querySelectorAll('.mind-node').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.mind-node').forEach(x=>x.classList.remove('active'));btn.classList.add('active');w.querySelector('.iv-detail').textContent=btn.dataset.ivText||'';}));
  document.querySelectorAll('.step-tab').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.step-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=JSON.parse(w.dataset.steps||'[]')[Number(btn.dataset.step)];if(d)w.querySelector('.step-panel').innerHTML='<strong>'+d[0]+'</strong><p>'+d[1]+'</p>';}));
  document.querySelectorAll('.choice-card').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.choice-card').forEach(x=>x.classList.remove('active'));btn.classList.add('active');w.querySelector('.choice-result').textContent=btn.dataset.choice||'';}));
  document.querySelectorAll('.cycle-item').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.cycle-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');w.querySelector('.cycle-detail').textContent=btn.dataset.cycle||'';}));
  document.querySelectorAll('.ladder-rung').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.ladder-rung').forEach(x=>x.classList.remove('active'));btn.classList.add('active');w.querySelector('.ladder-detail').textContent=btn.dataset.rung||'';}));
  document.querySelectorAll('.matrix-cell').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.matrix-cell').forEach(x=>x.classList.remove('active'));btn.classList.add('active');w.querySelector('.matrix-detail').textContent=btn.dataset.matrix||'';}));
  document.querySelectorAll('.compare-tab').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.closest('.interactive-visual');w.querySelectorAll('.compare-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const p=w.querySelector('.compare-panel');p.textContent=p.dataset[btn.dataset.side]||'';}));
  document.querySelectorAll('.accordion-row').forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('open')));
  document.querySelectorAll('.timer-start').forEach(start=>{const w=start.closest('.interactive-visual'),display=w.querySelector('[data-timer]'),reset=w.querySelector('.timer-reset');let interval=null,remaining=300;function render(){display.textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0')}start.addEventListener('click',()=>{if(interval)return;start.textContent='EN MARCHA';interval=setInterval(()=>{remaining--;render();if(remaining<=0){clearInterval(interval);interval=null;start.textContent='TERMINADO'}},1000)});reset.addEventListener('click',()=>{clearInterval(interval);interval=null;remaining=300;render();start.textContent='EMPEZAR'})});
})();


/* Árbol de Vida V6 */
(function(){
  const builders=document.querySelectorAll('[data-tree-builder]');
  builders.forEach(builder=>{
    const stage=builder.querySelector('[data-tree-stage]'), art=builder.querySelector('[data-tree-art]'), pool=builder.querySelector('[data-tag-pool]'), input=builder.querySelector('[data-custom-input]'), status=builder.querySelector('[data-tree-status]'), quote=builder.querySelector('[data-tree-quote]'), quoteCount=builder.querySelector('[data-quote-count]');
    const zones=[...builder.querySelectorAll('[data-zone]')], storageKey='impulso_tree_v2';
    const state={style:'classic',bg:'mountains',leaf:'green',leaves:true,particles:true,night:false,quote:''};
    let dragging=null;
    function refreshZone(zone){
      const count=zone.querySelectorAll('.placed-tag').length;
      zone.classList.toggle('has-tags',count>0);
      zone.classList.toggle('compact',count===0);
    }
    function placed(value,zone){
      const wrap=document.createElement('span');wrap.className='placed-tag';wrap.dataset.value=value;
      const label=document.createElement('span');label.textContent=value;wrap.appendChild(label);
      const del=document.createElement('button');del.type='button';del.textContent='×';del.setAttribute('aria-label','Quitar '+value);del.addEventListener('click',()=>{wrap.remove();refreshZone(zone);save();});wrap.appendChild(del);
      zone.querySelector('.placed-tags').appendChild(wrap);refreshZone(zone);
    }
    function snapshot(){const zonesData={};zones.forEach(z=>zonesData[z.dataset.zone]=[...z.querySelectorAll('.placed-tag')].map(x=>x.dataset.value));return {...state,zones:zonesData};}
    function save(msg){try{localStorage.setItem(storageKey,JSON.stringify(snapshot()));status.textContent=msg||'Guardado en este dispositivo · '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}catch(e){status.textContent='No se pudo guardar en este dispositivo.';}}
    function applyState(){stage.className='tree-stage tree-stage-v6 bg-'+state.bg+(state.night?' is-night':'');art.className='tree-art tree-art-v6 style-'+state.style+' leaf-'+state.leaf+(state.leaves?' has-motion':'');stage.classList.toggle('no-leaves',!state.leaves);stage.classList.toggle('no-particles',!state.particles);stage.classList.toggle('cycle-night',state.night);quote.value=state.quote||'';if(quoteCount)quoteCount.textContent=(state.quote||'').length+'/150';
      builder.querySelectorAll('[data-style]').forEach(b=>b.classList.toggle('active',b.dataset.style===state.style));
      builder.querySelectorAll('[data-bg]').forEach(b=>b.classList.toggle('active',b.dataset.bg===state.bg));
      builder.querySelectorAll('[data-leaf]').forEach(b=>b.classList.toggle('active',b.dataset.leaf===state.leaf));
      const tl=builder.querySelector('[data-toggle-leaves]'),tp=builder.querySelector('[data-toggle-particles]'),tn=builder.querySelector('[data-toggle-night]');if(tl)tl.checked=state.leaves;if(tp)tp.checked=state.particles;if(tn)tn.checked=state.night;
    }
    function bindTag(tag){tag.addEventListener('pointerdown',e=>{e.preventDefault();dragging=tag.cloneNode(true);dragging.classList.add('dragging');dragging.style.left=(e.clientX-30)+'px';dragging.style.top=(e.clientY-18)+'px';document.body.appendChild(dragging);const move=ev=>{if(!dragging)return;dragging.style.left=(ev.clientX-30)+'px';dragging.style.top=(ev.clientY-18)+'px';zones.forEach(z=>{const r=z.getBoundingClientRect();z.classList.toggle('is-over',ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom);});};const up=ev=>{zones.forEach(z=>z.classList.remove('is-over'));if(dragging){const z=zones.find(z=>{const r=z.getBoundingClientRect();return ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom;});const value=tag.dataset.tag||tag.textContent.trim();dragging.remove();dragging=null;if(z)placed(value,z);save('Etiqueta añadida · '+value);}window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up,{once:true});});}
    pool.querySelectorAll('.tree-tag').forEach(bindTag);
    builder.querySelector('[data-add-tag]')?.addEventListener('click',()=>{const v=input.value.trim();if(!v||v.length>32)return;const b=document.createElement('button');b.type='button';b.className='tree-tag tag-orange';b.dataset.tag=v;b.dataset.category='personal';b.innerHTML='✦ <span>'+v.replace(/[&<>"']/g,'')+'</span>';pool.appendChild(b);bindTag(b);input.value='';save('Etiqueta personalizada creada.');});
    input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();builder.querySelector('[data-add-tag]')?.click();}});
    builder.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{builder.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;pool.querySelectorAll('.tree-tag').forEach(t=>{t.style.display=(f==='all'||t.dataset.category===f)?'inline-flex':'none';})}));
    builder.querySelector('[data-tag-search]')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();pool.querySelectorAll('.tree-tag').forEach(t=>{t.style.display=t.textContent.toLowerCase().includes(q)?'inline-flex':'none';});});
    builder.querySelectorAll('[data-style]').forEach(b=>b.addEventListener('click',()=>{state.style=b.dataset.style;applyState();save('Estilo de árbol actualizado.');}));
    builder.querySelectorAll('[data-bg]').forEach(b=>b.addEventListener('click',()=>{state.bg=b.dataset.bg;applyState();save('Fondo actualizado.');}));
    builder.querySelectorAll('[data-leaf]').forEach(b=>b.addEventListener('click',()=>{state.leaf=b.dataset.leaf;applyState();save('Color de hojas actualizado.');}));
    builder.querySelector('[data-toggle-leaves]')?.addEventListener('change',e=>{state.leaves=e.target.checked;applyState();save();});
    builder.querySelector('[data-toggle-particles]')?.addEventListener('change',e=>{state.particles=e.target.checked;applyState();save();});
    builder.querySelector('[data-toggle-night]')?.addEventListener('change',e=>{state.night=e.target.checked;applyState();save();});
    quote?.addEventListener('input',e=>{state.quote=e.target.value;quoteCount.textContent=state.quote.length+'/150';save();});
    builder.querySelector('[data-save-tree]')?.addEventListener('click',()=>save('✓ Tu árbol quedó guardado en este dispositivo.'));
    builder.querySelectorAll('[data-clear-tree]').forEach(btn=>btn.addEventListener('click',()=>{zones.forEach(z=>{z.querySelector('.placed-tags').replaceChildren();refreshZone(z);});state.quote='';quote.value='';state.style='classic';state.bg='mountains';state.leaf='green';state.leaves=true;state.particles=true;state.night=false;applyState();save('Árbol limpiado. Puedes empezar de nuevo.');}));
    builder.querySelector('[data-tree-reset-style]')?.addEventListener('click',()=>{state.style='classic';state.bg='mountains';state.leaf='green';state.leaves=true;state.particles=true;state.night=false;applyState();save('Apariencia restablecida.');});
    async function captureTree(){
      if(!window.html2canvas){status.textContent='No se pudo cargar el exportador. Comprueba tu conexión e inténtalo de nuevo.';return null;}
      stage.classList.add('exporting');
      try{
        const canvas=await html2canvas(stage,{backgroundColor:null,scale:2,useCORS:true,logging:false,removeContainer:true});
        return canvas;
      }catch(err){status.textContent='No se pudo preparar la imagen. Inténtalo de nuevo.';return null;}
      finally{stage.classList.remove('exporting');}
    }
    function downloadCanvas(canvas,name){
      const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=name;document.body.appendChild(a);a.click();a.remove();
    }
    builder.querySelector('[data-download-tree]')?.addEventListener('click',async()=>{
      status.textContent='Preparando tu árbol…';
      const canvas=await captureTree();
      if(canvas){downloadCanvas(canvas,'mi-arbol-de-vida-impulso.png');status.textContent='✓ Tu árbol se descargó conservando su apariencia y personalización.';}
    });
    builder.querySelector('[data-download-poster]')?.addEventListener('click',async()=>{
      status.textContent='Creando tu póster…';
      const treeCanvas=await captureTree();
      if(!treeCanvas)return;
      const poster=document.createElement('canvas');poster.width=1800;poster.height=1400;const ctx=poster.getContext('2d');
      const bgMap={mountains:['#0c1118','#7b432e'],forest:['#06120d','#1f4b31'],sunset:['#160d19','#b85f46'],night:['#050916','#162f63'],dawn:['#171b2c','#bd8064'],minimal:['#17191f','#303542']};
      const colors=bgMap[state.bg]||bgMap.mountains;const g=ctx.createLinearGradient(0,0,0,poster.height);g.addColorStop(0,colors[0]);g.addColorStop(1,colors[1]);ctx.fillStyle=g;ctx.fillRect(0,0,poster.width,poster.height);
      ctx.fillStyle='rgba(255,77,0,.12)';ctx.beginPath();ctx.arc(900,500,500,0,Math.PI*2);ctx.fill();
      ctx.textAlign='center';ctx.fillStyle='#ff4d00';ctx.font='900 52px Arial';ctx.fillText('IMPULSO',900,90);ctx.fillStyle='#ffffff';ctx.font='800 40px Arial';ctx.fillText('MI ÁRBOL DE VIDA',900,145);
      const maxW=1600,maxH=1030,scale=Math.min(maxW/treeCanvas.width,maxH/treeCanvas.height);const w=treeCanvas.width*scale,h=treeCanvas.height*scale;const x=(poster.width-w)/2,y=175+(maxH-h)/2;ctx.drawImage(treeCanvas,x,y,w,h);
      if(state.quote){ctx.fillStyle='rgba(5,7,10,.72)';roundRect(ctx,210,1220,1380,88,20);ctx.fill();ctx.fillStyle='#f1f2f4';ctx.font='italic 24px Arial';ctx.fillText('“'+state.quote+'”',900,1274);}
      ctx.fillStyle='rgba(255,255,255,.55)';ctx.font='18px Arial';ctx.fillText('Creado en impulso.living',900,1360);
      downloadCanvas(poster,'mi-arbol-de-vida-impulso-poster.png');status.textContent='✓ Póster creado con tu árbol personalizado.';
    });
    function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
    try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved){Object.assign(state,saved);zones.forEach(z=>(saved.zones?.[z.dataset.zone]||[]).forEach(v=>placed(v,z)));status.textContent='Tu último árbol fue recuperado automáticamente.';}}catch(e){}
    zones.forEach(refreshZone);
    applyState();
  });
})();

(function(){
  document.querySelectorAll('[data-quiz]').forEach(quiz=>{
    const questions=[...quiz.querySelectorAll('.quiz-question')],progress=quiz.querySelector('[data-quiz-progress]'),result=quiz.querySelector('[data-quiz-result]'),scoreEl=quiz.querySelector('[data-quiz-score]');
    function update(){const answered=questions.filter(q=>q.dataset.selected!==undefined).length;if(progress)progress.style.width=(answered/questions.length*100)+'%';}
    questions.forEach(q=>q.querySelectorAll('.quiz-option').forEach(btn=>btn.addEventListener('click',()=>{q.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');q.dataset.selected=btn.dataset.option;q.classList.add('answered');update();})));
    quiz.querySelector('[data-quiz-check]')?.addEventListener('click',()=>{let score=0;questions.forEach(q=>{if(Number(q.dataset.selected)===Number(q.dataset.answer))score++;});result.classList.add('show');scoreEl.textContent=`${score}/${questions.length} respuestas alineadas con las ideas del artículo. Más importante que la puntuación: piensa cuál de estas ideas puedes llevar a tu vida.`;result.scrollIntoView({behavior:'smooth',block:'nearest'});});
    quiz.querySelector('[data-quiz-reset]')?.addEventListener('click',()=>{questions.forEach(q=>{delete q.dataset.selected;q.classList.remove('answered');q.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('selected'));});result.classList.remove('show');update();});
  });
})();


/* =========================================================
   IMPULSO V12 — MAPA PERSONAL
   ========================================================= */
(function(){
  const root=document.querySelector('[data-personal-map]');
  if(!root)return;

  const canvas=root.querySelector('[data-map-canvas]');
  const palette=root.querySelector('[data-map-palette]');
  const search=root.querySelector('[data-map-search]');
  const filters=root.querySelector('[data-map-filters]');
  const custom=root.querySelector('[data-map-custom-input]');
  const addCustom=root.querySelector('[data-map-add-custom]');
  const centerInput=root.querySelector('[data-map-center-input]');
  const connections=root.querySelector('[data-map-connections]');
  const status=root.querySelector('[data-map-status]');
  const key='impulsoMapaPersonalV12';

  let nodes=[];
  let activeFilter='all';
  let nodeDrag=null;
  let paletteDrag=null;
  let suppressPaletteClick=false;

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g,m=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    }[m]));
  }

  function save(message){
    try{
      localStorage.setItem(key,JSON.stringify({
        center:centerInput.value,
        nodes
      }));
      if(message)status.textContent=message;
    }catch(e){}
  }

  function refreshConnections(){
    connections.innerHTML='';
    const cr=canvas.getBoundingClientRect();
    const center=canvas.querySelector('[data-map-center]');
    if(!center)return;

    const rr=center.getBoundingClientRect();
    const cx=rr.left-cr.left+rr.width/2;
    const cy=rr.top-cr.top+rr.height/2;

    nodes.forEach(n=>{
      const el=canvas.querySelector(`[data-node-id="${n.id}"]`);
      if(!el)return;

      const r=el.getBoundingClientRect();
      const x=r.left-cr.left+r.width/2;
      const y=r.top-cr.top+r.height/2;

      const line=document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1',cx);
      line.setAttribute('y1',cy);
      line.setAttribute('x2',x);
      line.setAttribute('y2',y);
      line.setAttribute('stroke','rgba(255,120,55,.30)');
      line.setAttribute('stroke-width','1.5');
      line.setAttribute('stroke-dasharray','4 6');
      connections.appendChild(line);
    });
  }

  function hasLabel(label){
    return nodes.some(n=>n.label.toLowerCase()===label.toLowerCase());
  }

  function positionForNewNode(){
    const count=nodes.length;
    const angle=(count*137.508)*Math.PI/180;
    const radius=count<6?30:38;
    return {
      x:50+Math.cos(angle)*radius,
      y:50+Math.sin(angle)*radius*.68
    };
  }

  function addNode(label,group='custom',position=null){
    label=String(label||'').trim().slice(0,32);
    if(!label)return null;

    if(hasLabel(label)){
      status.textContent='Esa etiqueta ya está en tu mapa.';
      return null;
    }

    const pos=position||positionForNewNode();
    const n={
      id:'n'+Date.now()+Math.random().toString(16).slice(2),
      label,
      group,
      x:Math.max(4,Math.min(92,pos.x)),
      y:Math.max(7,Math.min(88,pos.y))
    };

    nodes.push(n);
    makeNode(n);
    refreshConnections();
    save('Etiqueta añadida.');
    return n;
  }

  function pointInCanvas(clientX,clientY){
    const r=canvas.getBoundingClientRect();
    if(clientX<r.left||clientX>r.right||clientY<r.top||clientY>r.bottom)return null;
    return {
      x:((clientX-r.left)/r.width)*100,
      y:((clientY-r.top)/r.height)*100
    };
  }

  function makeNode(n){
    const el=document.createElement('div');
    el.className='map-node';
    el.dataset.nodeId=n.id;
    el.style.left=n.x+'%';
    el.style.top=n.y+'%';
    el.innerHTML=`<div class="map-node-label">
      <span class="map-node-dot"></span>
      <span>${escapeHtml(n.label)}</span>
      <button class="map-node-remove" type="button" aria-label="Eliminar ${escapeHtml(n.label)}">×</button>
    </div>`;

    const remove=el.querySelector('.map-node-remove');

    remove.addEventListener('pointerdown',e=>e.stopPropagation());
    remove.addEventListener('click',e=>{
      e.stopPropagation();
      nodes=nodes.filter(x=>x.id!==n.id);
      el.remove();
      refreshConnections();
      save('Etiqueta eliminada.');
    });

    el.addEventListener('pointerdown',e=>{
      if(e.target.closest('button'))return;
      e.preventDefault();

      const cr=canvas.getBoundingClientRect();
      nodeDrag={
        el,
        n,
        pointerId:e.pointerId,
        offsetX:(e.clientX-cr.left)-(n.x/100*cr.width),
        offsetY:(e.clientY-cr.top)-(n.y/100*cr.height)
      };

      el.setPointerCapture?.(e.pointerId);
      el.classList.add('dragging');
    });

    el.addEventListener('pointermove',e=>{
      if(!nodeDrag||nodeDrag.el!==el)return;

      const cr=canvas.getBoundingClientRect();
      let px=((e.clientX-cr.left-nodeDrag.offsetX)/cr.width)*100;
      let py=((e.clientY-cr.top-nodeDrag.offsetY)/cr.height)*100;

      px=Math.max(2,Math.min(92,px));
      py=Math.max(7,Math.min(88,py));

      n.x=px;
      n.y=py;
      el.style.left=px+'%';
      el.style.top=py+'%';
      refreshConnections();
    });

    const finishNodeDrag=()=>{
      if(!nodeDrag||nodeDrag.el!==el)return;
      el.classList.remove('dragging');
      nodeDrag=null;
      save('Posición guardada.');
    };

    el.addEventListener('pointerup',finishNodeDrag);
    el.addEventListener('pointercancel',finishNodeDrag);

    canvas.appendChild(el);
    return el;
  }

  /*
   * Paleta: clic = añade en una posición limpia.
   * Arrastre = permite soltar exactamente donde el usuario quiera.
   */
  function bindPaletteTag(tag){
    tag.style.touchAction='none';

    tag.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.button!==0)return;

      paletteDrag={
        tag,
        pointerId:e.pointerId,
        startX:e.clientX,
        startY:e.clientY,
        moved:false,
        ghost:null
      };

      tag.setPointerCapture?.(e.pointerId);
    });

    tag.addEventListener('pointermove',e=>{
      if(!paletteDrag||paletteDrag.tag!==tag)return;

      const dx=e.clientX-paletteDrag.startX;
      const dy=e.clientY-paletteDrag.startY;

      if(!paletteDrag.moved && Math.hypot(dx,dy)<7)return;

      if(!paletteDrag.moved){
        paletteDrag.moved=true;
        suppressPaletteClick=true;

        const ghost=tag.cloneNode(true);
        ghost.classList.add('map-drag-ghost');
        ghost.style.position='fixed';
        ghost.style.zIndex='99999';
        ghost.style.pointerEvents='none';
        ghost.style.width=Math.min(175,Math.max(115,tag.getBoundingClientRect().width))+'px';
        document.body.appendChild(ghost);
        paletteDrag.ghost=ghost;
      }

      const g=paletteDrag.ghost;
      if(g){
        g.style.left=(e.clientX+12)+'px';
        g.style.top=(e.clientY+12)+'px';
      }

      const point=pointInCanvas(e.clientX,e.clientY);
      canvas.classList.toggle('map-drop-active',!!point);
    });

    tag.addEventListener('pointerup',e=>{
      if(!paletteDrag||paletteDrag.tag!==tag)return;

      const dragState=paletteDrag;
      paletteDrag=null;
      canvas.classList.remove('map-drop-active');

      if(dragState.ghost)dragState.ghost.remove();

      if(dragState.moved){
        const point=pointInCanvas(e.clientX,e.clientY);
        if(point){
          addNode(tag.dataset.label,tag.dataset.group,point);
          status.textContent='Etiqueta colocada. Puedes moverla cuando quieras.';
        }else{
          status.textContent='Suelta la etiqueta dentro del lienzo.';
        }
      }
    });

    tag.addEventListener('pointercancel',()=>{
      if(!paletteDrag||paletteDrag.tag!==tag)return;
      if(paletteDrag.ghost)paletteDrag.ghost.remove();
      paletteDrag=null;
      canvas.classList.remove('map-drop-active');
    });
  }

  palette.querySelectorAll('.map-tag-option').forEach(bindPaletteTag);

  palette.addEventListener('click',e=>{
    const b=e.target.closest('.map-tag-option');
    if(!b)return;

    if(suppressPaletteClick){
      suppressPaletteClick=false;
      e.preventDefault();
      return;
    }

    addNode(b.dataset.label,b.dataset.group);
  });

  filters.addEventListener('click',e=>{
    const b=e.target.closest('[data-filter]');
    if(!b)return;

    activeFilter=b.dataset.filter;
    filters.querySelectorAll('.map-filter').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyFilter();
  });

  function applyFilter(){
    const q=(search.value||'').toLowerCase().trim();

    palette.querySelectorAll('.map-tag-option').forEach(b=>{
      const matchGroup=activeFilter==='all'||b.dataset.group===activeFilter;
      const matchText=!q||b.dataset.label.toLowerCase().includes(q);
      b.style.display=matchGroup&&matchText?'':'none';
    });
  }

  search.addEventListener('input',applyFilter);

  addCustom.addEventListener('click',()=>{
    const value=custom.value.trim();
    if(value){
      addNode(value,'custom');
      custom.value='';
    }
  });

  custom.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      e.preventDefault();
      addCustom.click();
    }
  });

  centerInput.addEventListener('input',()=>save());

  root.querySelector('[data-map-clear]').addEventListener('click',()=>{
    nodes=[];
    canvas.querySelectorAll('.map-node').forEach(n=>n.remove());
    refreshConnections();
    save('Mapa limpiado.');
  });

  root.querySelector('[data-map-save]').addEventListener('click',()=>{
    save('Mapa guardado correctamente.');
  });

  function restore(){
    try{
      const raw=localStorage.getItem(key);
      if(!raw)return;

      const data=JSON.parse(raw);

      if(data.center)centerInput.value=data.center;

      if(Array.isArray(data.nodes)){
        nodes=data.nodes.filter(n=>n&&n.label);
        nodes.forEach(makeNode);
        refreshConnections();
      }
    }catch(e){}
  }

  async function exportMap(){
    canvas.classList.add('exporting');

    try{
      if(window.html2canvas){
        refreshConnections();

        const shot=await window.html2canvas(canvas,{
          backgroundColor:null,
          scale:2,
          useCORS:true
        });

        const a=document.createElement('a');
        a.download='impulso-mapa-personal.png';
        a.href=shot.toDataURL('image/png');
        a.click();
      }else{
        alert('La vista está lista para conservarse. Si el navegador no permite la descarga automática, usa una captura de pantalla del lienzo.');
      }
    }catch(e){
      console.error(e);
    }finally{
      canvas.classList.remove('exporting');
    }
  }

  root.querySelector('[data-map-download]').addEventListener('click',exportMap);
  root.querySelector('[data-map-poster]').addEventListener('click',exportMap);

  window.addEventListener('resize',refreshConnections);

  restore();
  applyFilter();
  refreshConnections();
})();

