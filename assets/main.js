(function(){
  'use strict';
  // Set these after you have accounts. An empty endpoint keeps the website in safe DEMO mode.
  const CONFIG = { formEndpoint: '', bookingUrl: '', paymentLinks: { clarity: '', area: '', roadmap: '' }};
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  if(menu&&nav){menu.addEventListener('click',()=>{let open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));}
  const regions={
    lisbon:{name:'Lisbon & surrounding area',desc:'Energy, international networks and services—alongside higher housing pressure, neighborhood-by-neighborhood differences and a competitive rental market.',fit:'City life & international access',watch:'Housing budget and rental terms'},
    porto:{name:'Porto & Northern coast',desc:'A distinctive cultural scene and strong city life. Consider winter rain, older building conditions, slopes and what daily transport looks like outside the center.',fit:'City culture & cooler weather',watch:'Damp, insulation and transit'},
    braga:{name:'Braga',desc:'Historic Minho city with an active urban centre. Compare neighbourhoods carefully: family routines, healthcare access and getting around can feel very different by address.',fit:'Northern city life & everyday amenities',watch:'Housing, neighbourhood transport and services'},
    guimaraes:{name:'Guimarães',desc:'A historic smaller city in the North. Consider its local pace, regular journeys to surrounding towns and how the setting feels in the winter months.',fit:'Historic character & smaller-city rhythm',watch:'Travel options and location of essentials'},
    coimbra:{name:'Coimbra',desc:'A university city in central Portugal with academic history and varied residential neighbourhoods. Evaluate the hills, accessible routes and what daily errands actually require.',fit:'University city & central-Portugal lifestyle',watch:'Hills, transport and neighbourhood choice'},
    aveiro:{name:'Aveiro',desc:'A central Portuguese city known for canals and a nearby coastal region. Compare the city and surrounding communities rather than assuming every address has beach access.',fit:'Urban and nearby coastal options',watch:'Neighbourhood costs and commute patterns'},
    viseu:{name:'Viseu',desc:'An inland city offering a contrasting pace from larger coastal metros. Check specific healthcare, transport, job and housing needs before narrowing your search.',fit:'Smaller inland-city routines',watch:'Car use and access to services'},
    algarve:{name:'The Algarve',desc:'Coastal lifestyle can feel effortless on a visit; year-round living varies by town. Think carefully about tourism seasonality, car dependence and long-term rentals.',fit:'Sunshine & outdoor life',watch:'Seasonality and transport'},
    inland:{name:'Inland Portugal & smaller towns',desc:'Space and a slower pace can be appealing, but convenience varies. Check healthcare access, transportation, schools, local jobs and the actual community before committing.',fit:'Space & local community',watch:'Car needs and access to services'}
  };
  document.querySelectorAll('.region-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.region-tab').forEach(b=>b.setAttribute('aria-selected',String(b===btn)));const r=regions[btn.dataset.region];if(!r)return;['name','desc','fit','watch'].forEach(k=>{const el=document.querySelector('[data-region-output="'+k+'"]');if(el)el.textContent=r[k];});}));
  const params=new URLSearchParams(window.location.search);const pack=params.get('package');
  const packSelect=document.querySelector('#package');if(pack&&packSelect&&Array.from(packSelect.options).some(o=>o.value===pack))packSelect.value=pack;
  document.querySelectorAll('[data-booking-link]').forEach(button=>{if(CONFIG.bookingUrl){button.href=CONFIG.bookingUrl;button.target='_blank';button.rel='noopener noreferrer';}});
  const form=document.querySelector('#enquiry-form');
  const result=document.querySelector('#enquiry-result');
  if(form&&result){
    form.addEventListener('submit',async ev=>{
      ev.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form);
      const message='PORTUGAL UNFILTERED — ENQUIRY\n\n'+Array.from(data.entries()).filter(([k])=>k!=='website').map(([k,v])=>k.replaceAll('_',' ').toUpperCase()+': '+v).join('\n')+'\n\nThis enquiry has NOT been submitted. Send it only using a verified business contact channel once available.';
      if(data.get('website'))return;
      const status=result.querySelector('[data-status]');
      if(CONFIG.formEndpoint){
        try{const resp=await fetch(CONFIG.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});if(!resp.ok)throw Error('Unable to submit');status.textContent='Your enquiry was sent. We will be in touch using your email address.';result.classList.add('show');result.querySelector('[data-demo-actions]').hidden=true;return;}catch(e){status.textContent='Online submission was unavailable. You can save your enquiry below.';}
      }else{status.textContent='Demo mode: your enquiry has been prepared but NOT sent. Your details are not stored on this site. Save the message below; after email is connected, the form can send it directly.';}
      result.classList.add('show');result.querySelector('[data-demo-actions]').hidden=false;
      const copy=result.querySelector('[data-copy]');const download=result.querySelector('[data-download]');
      copy.onclick=async()=>{try{await navigator.clipboard.writeText(message);copy.textContent='Copied!';}catch(e){const textarea=document.createElement('textarea');textarea.value=message;document.body.append(textarea);textarea.select();document.execCommand('copy');textarea.remove();copy.textContent='Copied!';}};
      download.onclick=()=>{const blob=new Blob([message],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='portugal-unfiltered-enquiry.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)};
      result.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }
})();
