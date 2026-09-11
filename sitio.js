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
