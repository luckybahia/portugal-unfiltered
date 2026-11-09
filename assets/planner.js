(function () {
  'use strict';
  // The scores only sort research starting points; they are not objective quality ratings.
  const places = [
    {id:'lisbon', name:'Lisbon', area:'Greater Lisbon', note:'A larger city to compare for urban services, international connections and different neighbourhoods.', watch:'Investigate current housing prices, commute times and neighbourhood-by-neighbourhood differences.', settings:['city'], priorities:['services'], concerns:['transport','community'], noCar:2, family:0, jobs:2, budget:'higher'},
    {id:'porto', name:'Porto', area:'North', note:'City culture, transport options and a different urban rhythm from Lisbon.', watch:'Check winter damp, building insulation, hills and real door-to-door travel times.', settings:['city'], priorities:['services'], concerns:['transport','community'], noCar:2, family:1, jobs:2, budget:'higher'},
    {id:'braga', name:'Braga', area:'Minho · North', note:'An established northern city to compare for everyday amenities, residential areas and family routines.', watch:'Check the exact neighbourhood, schools or healthcare access and the transport you would use.', settings:['city','town'], priorities:['services'], concerns:['schools','health','community'], noCar:1, family:2, jobs:1, budget:'middle'},
    {id:'guimaraes', name:'Guimarães', area:'Minho · North', note:'A historic smaller city worth considering if you prefer a calmer setting with urban essentials nearby.', watch:'Test access to services and connections from the specific home or neighbourhood, not just the centre.', settings:['town','city'], priorities:['space'], concerns:['community','schools'], noCar:0, family:2, jobs:0, budget:'middle'},
    {id:'coimbra', name:'Coimbra', area:'Central Portugal', note:'A university city that offers a useful middle-ground comparison between the two largest metros and smaller towns.', watch:'Verify the hills, local transport, neighbourhood accessibility and access to the services you need.', settings:['city','town'], priorities:['services'], concerns:['health','schools','community'], noCar:1, family:2, jobs:1, budget:'middle'},
    {id:'aveiro', name:'Aveiro', area:'Central coast', note:'A central city with a canal-side setting and opportunities to compare nearby coastal and urban life.', watch:'Compare housing in the city against nearby towns; do not assume the beach is part of every daily routine.', settings:['city','coast'], priorities:['outdoors','services'], concerns:['community'], noCar:1, family:1, jobs:0, budget:'middle'},
    {id:'algarve', name:'Algarve towns', area:'South', note:'Compare towns such as Faro, Tavira or Lagos for sun, coastal routines and international communities.', watch:'Seasonal housing, transport and services differ significantly by town and by time of year.', settings:['coast'], priorities:['outdoors'], concerns:['community'], noCar:0, family:0, jobs:0, budget:'higher'},
    {id:'viseu', name:'Viseu', area:'Central interior', note:'A smaller inland city to research for a different pace without choosing a remote village.', watch:'Check car reliance, local routes, healthcare access and the exact location of housing.', settings:['town'], priorities:['space','services'], concerns:['health','schools'], noCar:-1, family:2, jobs:0, budget:'lower'},
    {id:'inland', name:'Smaller inland towns', area:'Across Portugal', note:'Compare town centres rather than assuming every rural area offers the same services or costs.', watch:'A car, specialist care, winter housing comfort and reliable internet can be crucial.', settings:['town'], priorities:['space','outdoors'], concerns:['community'], noCar:-2, family:1, jobs:0, budget:'lower'}
  ];

  function getRecommendations(a) {
    const income=Array.isArray(a.income)?a.income:[];
    const isFamily=a.household==='children'||a.household==='extended';
    const isRetired=income.includes('retired');
    const isRemote=income.includes('remote')||income.includes('business');
    const wantsJob=income.includes('local');
    const hasPassive=income.includes('passive');
    const scored=places.map(place=>{
      let score=0;
      if(a.setting==='unsure') score+=1;
      else if(place.settings.includes(a.setting))score+=5;
      if(place.priorities.includes(a.priority))score+=3;
      if(a.car==='no')score+=place.noCar*2;
      else if(a.car==='yes' && place.noCar<0)score+=2;
      if(isFamily)score+=place.family*2;
      if(wantsJob)score+=place.jobs*2;
      if(isRetired && ['coimbra','viseu','braga','algarve'].includes(place.id))score+=2;
      if(hasPassive && ['algarve','coimbra','viseu','guimaraes'].includes(place.id))score+=1;
      if(isRemote && ['braga','coimbra','aveiro','guimaraes'].includes(place.id))score+=2;
      if(a.concern && place.concerns.includes(a.concern))score+=2;
      if(a.housing!=='unsure' && a.housing===place.budget)score+=2;
      return { ...place, score };
    });
    scored.sort((a,b)=>b.score-a.score||places.findIndex(p=>p.id===a.id)-places.findIndex(p=>p.id===b.id));
    // Tie-breaking uses original order; result remains an exploration list, not financial or relocation advice.
    const shortlist=scored.slice(0,4);
    const questions=[];
    if(isFamily)questions.push('For each shortlisted city, check actual school availability, enrollment rules, childcare, commute and family health services.');
    else if(a.household==='alone')questions.push('What social activities, transport links and support network would make daily life comfortable on your own?');
    else if(a.household==='couple')questions.push('Do the location and housing work for both people’s daily routines and priorities?');
    else questions.push('Check space, transport, healthcare and accessibility for every member of your household.');
    if(isRetired)questions.push('How convenient are everyday services and healthcare for your needs, including when driving is difficult?');
    if(isRemote)questions.push('Test fibre/mobile internet at the exact property, a backup connection, workspace comfort and time-zone differences.');
    if(hasPassive)questions.push('Verify with a qualified tax/immigration professional how your specific income would be treated; passive income alone does not guarantee residence eligibility.');
    if(wantsJob)questions.push('Research real vacancies, Portuguese language expectations and your legal right to work before choosing a city.');
    if(!income.length||income.includes('unsure'))questions.push('Work out how you would support yourself and check the appropriate immigration and tax requirements with official sources.');
    if(a.car==='no')questions.push('Check actual public transport services for the address, including weekends and late evenings.');
    else if(a.car==='yes')questions.push('Budget for parking, insurance, tolls, fuel and maintenance alongside the property costs.');
    else questions.push('Would the location still work if you did not have a car for the first few months?');
    if(a.concern==='schools'&&!isFamily)questions.push('Check school catchment areas and enrollment directly with the relevant schools and authorities.');
    if(a.concern==='health')questions.push('Check local healthcare registration, coverage, specialist access and travel time to care.');
    if(a.concern==='internet'&&!isRemote)questions.push('Check internet availability at the actual address, not just a general coverage map.');
    if(a.concern==='transport'&&a.car!=='no')questions.push('Try the door-to-door journey from candidate neighbourhoods at the times you will actually travel.');
    if(a.concern==='community')questions.push('Visit beyond tourist areas and ask about local activities, language learning and year-round community.');
    if(a.priority==='space')questions.push('Check damp, heating, insulation, accessibility and upkeep before choosing a larger home.');
    if(a.priority==='outdoors')questions.push('Compare what outdoor life feels like outside the summer season.');
    if(a.housing==='lower')questions.push('Search recent live listings and verify deposits and total housing costs; under €900 cannot be assumed in any shortlisted city.');
    else if(a.housing==='middle'||a.housing==='higher')questions.push('Compare live listings for the household size you need, including utilities, deposits and commuting costs.');
    else questions.push('Set a realistic total monthly budget before narrowing down neighbourhoods.');
    if(a.timing==='soon')questions.push('Before a move within six months, verify deadlines, documents and current official requirements independently.');
    if(a.timing==='exploring')questions.push('Plan short research stays in contrasting cities before committing to a property.');
    const title=a.setting==='coast'?'Your coastal and city shortlist':a.setting==='town'?'Your quieter-life shortlist':a.setting==='city'?'Your city-life shortlist':'Your Portugal comparison shortlist';
    return {title, intro:'Based on your lifestyle answers, these are four places to investigate first—not a ranking, eligibility check or guarantee of affordability.', shortlist, questions:questions.slice(0,8)};
  }
  if(typeof module!=='undefined' && module.exports){module.exports={getRecommendations,places};}
  if(typeof document==='undefined')return;
  const form = document.querySelector('#lifestyle-form');
  const result = document.querySelector('#lifestyle-result');
  if (form && result) {
    const populate=(id,arr)=>{const el=document.getElementById(id);if(!el)return;el.replaceChildren(...arr.map(x=>{const li=document.createElement('li');if(typeof x==='string'){li.textContent=x;}else{const name=document.createElement('strong');name.textContent=x.name+' · '+x.area;const note=document.createElement('span');note.textContent=x.note;const watch=document.createElement('small');watch.textContent='Reality check: '+x.watch;li.className='place-result';li.append(name,note,watch);}return li;}));};
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.reportValidity())return;
      const data = new FormData(form);
      const answers={household:data.get('household'),income:data.getAll('income'),setting:data.get('setting'),car:data.get('car'),priority:data.get('priority'),housing:data.get('housing'),concern:data.get('concern'),timing:data.get('timing')};
      const info=getRecommendations(answers);
      document.getElementById('result-title').textContent=info.title;
      document.getElementById('result-intro').textContent=info.intro;
      populate('result-areas',info.shortlist);populate('result-questions',info.questions);
      result.hidden=false;
      result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
    form.addEventListener('reset',()=>{result.hidden=true;});
  }
  // Preserve existing saved checklist data across V2 -> V3 upgrades.
  const boxes = Array.from(document.querySelectorAll('#checklist-groups input[type="checkbox"][data-check]'));
  if (boxes.length) {
    const storageKey='pu:move-checklist:v1';
    const text=document.getElementById('checklist-progress-text');
    const bar=document.getElementById('checklist-progress-fill');
    const progress=document.getElementById('checklist-progress');
    try {const saved=JSON.parse(localStorage.getItem(storageKey)||'[]'); if(Array.isArray(saved))boxes.forEach(b=>{b.checked=saved.includes(b.dataset.check)});}catch(e){/* Local storage may be unavailable. */}
    const update=()=>{
      const checked=boxes.filter(b=>b.checked).map(b=>b.dataset.check);
      const pct=Math.round((checked.length/boxes.length)*100);
      text.textContent=`${checked.length} of ${boxes.length} items completed`;
      bar.style.width=pct+'%';
      progress.setAttribute('aria-valuemax',String(boxes.length));
      progress.setAttribute('aria-valuenow',String(checked.length));
      try{localStorage.setItem(storageKey,JSON.stringify(checked));}catch(e){/* The checklist continues without persistence. */}
    };
    boxes.forEach(b=>b.addEventListener('change',update));
    document.getElementById('reset-checklist')?.addEventListener('click',()=>{if(window.confirm('Clear all checklist ticks on this device?')){boxes.forEach(b=>b.checked=false);update();}});
    document.getElementById('print-checklist')?.addEventListener('click',()=>window.print());
    update();
  }
})();
