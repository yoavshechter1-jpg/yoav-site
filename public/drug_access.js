const TA_DATA = [
  { id:'rheum',  he:'ראומטולוגיה', en:'Rheumatology', eu:2.0, fda:3.0, pts:782, color:'c1', partial:0.40, full:0.60 },
  { id:'hema',   he:'המטולוגיה', en:'Hematology', eu:5.0, fda:7.0, pts:329, color:'c2', partial:0.32, full:0.68 },
  { id:'psy',    he:'פסיכיאטריה', en:'Psychiatry', eu:7.5, fda:6.6, pts:30, color:'c3', partial:0.43, full:0.57 },
  { id:'neuro',  he:'נוירולוגיה', en:'Neurology', eu:8.0, fda:9.0, pts:27361, color:'c4', partial:0.51, full:0.49 },
  { id:'cardio', he:'קרדיולוגיה', en:'Cardiology', eu:8.0, fda:9.0, pts:35600, color:'c9', partial:0.79, full:0.21 },
  { id:'diab',   he:'סוכרת', en:'Diabetes', eu:7.0, fda:7.0, pts:85276, color:'c7', partial:0.55, full:0.45 },
  { id:'pulm',   he:'פולמונולוגיה', en:'Pulmonology', eu:8.0, fda:9.0, pts:57020, color:'c6', partial:0.50, full:0.50 },
  { id:'onco',   he:'אונקולוגיה (גידולים מוצקים)', en:'Oncology', eu:2.4, fda:3.1, pts:3604, color:'c5', partial:0.20, full:0.80 },
  { id:'hemo',   he:'המטו-אונקולוגיה', en:'Hemato-Oncology', eu:3.8, fda:4.4, pts:3853, color:'c8', partial:0.23, full:0.77 },
  { id:'gastro', he:'גסטרואנטרולוגיה', en:'Gastroenterology', eu:3.4, fda:2.7, pts:3853, color:'c11', partial:0.28, full:0.72 },
  { id:'hiv',    he:'HIV / זיהומיות', en:'HIV + Infectious', eu:2.4, fda:3.3, pts:16023, color:'c10', partial:0.14, full:0.86 },
  { id:'vacc',   he:'חיסונים', en:'Vaccines', eu:2.9, fda:3.3, pts:318620, color:'c12', partial:0.33, full:0.67 }
];

const YEARLY = {
  rheum:{2021:[1,5],2022:[1,2],2023:[3,3],2024:[null,null],2025:[4,4]},
  hema:{2021:[2.7,10],2022:[9.8,10.8],2023:[4.2,4.3],2024:[null,null],2025:[3,3]},
  psy:{2021:[null,null],2022:[null,null],2023:[6,8],2024:[9,9],2025:[null,2.7]},
  neuro:{2021:[8,9],2022:[9,9],2023:[3,3],2024:[9,11],2025:[2,3]},
  cardio:{2021:[1,2],2022:[1,1],2023:[9,9],2024:[3,3],2025:[4,4]},
  diab:{2021:[7,7],2022:[6,10],2023:[9,8],2024:[4,4],2025:[8,6]},
  pulm:{2021:[5,6],2022:[7,7],2023:[4,4],2024:[7,8],2025:[6,6]},
  onco:{2021:[2.4,3],2022:[2,3],2023:[2.2,3],2024:[2.7,3.2],2025:[3,3.4]},
  hemo:{2021:[3.6,4.3],2022:[5.5,6],2023:[3.6,4.3],2024:[3.6,4.3],2025:[3,3.2]},
  gastro:{2021:[6.5,null],2022:[6,6],2023:[1,1],2024:[2,2],2025:[1.5,2]},
  hiv:{2021:[null,null],2022:[3.75,7],2023:[1,1],2024:[2,3],2025:[3,2]},
  vacc:{2021:[0,0],2022:[7,8],2023:[1,2],2024:[0,0],2025:[6.5,6.5]}
};

const DRUGS = [
  {ta:'ראומטולוגיה',taKey:'rheum',year:2021,drug:'Actemra',ind:'טיפול בדלקת פרקים מסוג systemic juvenile idiopathic arthritis - הרחבת מסגרת ההכללה בסל',ema:2018,fda:2011,dEU:3,dFDA:7,full:false,partial:true,pts:'42'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2021,drug:'Kineret',ind:'טיפול ב-Familial Mediterranean fever',ema:2021,fda:'NA',dEU:0,dFDA:'—',full:false,partial:true,pts:'—'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2021,drug:'Otezla',ind:"טיפול בכיבים בחלל הפה בחולי בכצ'ט כקו שני אחרי קולכיצין",ema:2020,fda:2019,dEU:1,dFDA:2,full:true,partial:false,pts:'280'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2022,drug:'Rinvoq',ind:'טיפול ב-Psoriatic Arthritis כקו שני לאחר כישלון במעכבי TNF',ema:2021,fda:2021,dEU:1,dFDA:'—',full:false,partial:true,pts:'ללא תוספת'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2022,drug:'Saphnelo',ind:'טיפול בזאבת אדמנתית מערכתית (SLE) במבוגרים',ema:2022,fda:2021,dEU:0,dFDA:1,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2022,drug:'Benlysta',ind:'SLE - הרחבת מסגרת ההכללה בסל עבור ילדים',ema:2019,fda:2019,dEU:3,dFDA:'—',full:true,partial:false,pts:'25'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2022,drug:'Benlysta',ind:'טיפול ב-lupus nephritis פעילה',ema:2021,fda:2020,dEU:1,dFDA:2,full:true,partial:false,pts:'90'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2023,drug:'Xeljanz',ind:'Ankylosing spondylitis כקו שני אחרי חוסמי TNF',ema:2021,fda:2021,dEU:2,dFDA:2,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2023,drug:'Evenity',ind:'אוסטיאופורוזיס - הרחבת מסגרת ההכללה בסל',ema:2019,fda:2019,dEU:4,dFDA:4,full:false,partial:true,pts:'313'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2025,drug:'Bimzelx',ind:'Psoriatic arthritis - שמיצו טיפול ב-DMARDs',ema:2023,fda:2023,dEU:2,dFDA:2,full:false,partial:true,pts:'ללא תוספת'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2025,drug:'Bimzelx',ind:'Ankylosing spondylitis פעילה',ema:2023,fda:2024,dEU:2,dFDA:1,full:false,partial:true,pts:'ללא תוספת'},
  {ta:'ראומטולוגיה',taKey:'rheum',year:2025,drug:'Ilaris',ind:'Systemic juvenile idiopathic arthritis - כקו טיפול ראשון',ema:2013,fda:2013,dEU:8,dFDA:8,full:false,partial:true,pts:'32'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Cablivi',ind:'aTTP נרכשת בשילוב עם טיפול אימונוסופרסיבי ו-PEX',ema:2018,fda:2019,dEU:2,dFDA:3,full:true,partial:false,pts:'28'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Ultomiris',ind:'מיאלופיברוזיס בדרגת סיכון intermediate 2 או high',ema:2021,fda:2019,dEU:0,dFDA:2,full:true,partial:false,pts:'99'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Calquence',ind:'CLL/SLL - קו טיפול ראשון',ema:2020,fda:2019,dEU:1,dFDA:2,full:true,partial:false,pts:'100'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Lenalidomide-Teva',ind:'לימפומה פוליקולרית כקו טיפול מתקדם',ema:2020,fda:2019,dEU:1,dFDA:2,full:false,partial:true,pts:'102'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Xpovio',ind:'DLBCL חוזרת או רפרקטורית',ema:'NA',fda:2020,dEU:'—',dFDA:1,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Calquence',ind:'Mantle cell lymphoma - קו טיפול מתקדם',ema:'NA',fda:2017,dEU:'—',dFDA:4,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Brukinsa',ind:'Mantle cell lymphoma - קו טיפול מתקדם',ema:2021,fda:2019,dEU:0,dFDA:3,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Lenalidomide-Teva',ind:'מיאלומה נפוצה כקו ראשון לחולים מועמדים להשתלה',ema:2019,fda:2006,dEU:2,dFDA:14,full:false,partial:true,pts:'200'},
  {ta:'המטולוגיה',taKey:'hema',year:2021,drug:'Kyprolis',ind:'מיאלומה נפוצה - קו מתקדם, משלב Kd 56',ema:2015,fda:2015,dEU:6,dFDA:6,full:false,partial:true,pts:'ללא תוספת'},
  {ta:'המטולוגיה',taKey:'hema',year:2022,drug:'Revolade',ind:'ITP כרונית/פרסיסטנטית, אחרי סטרואידים',ema:2010,fda:2008,dEU:12,dFDA:14,full:false,partial:true,pts:'227'},
  {ta:'המטולוגיה',taKey:'hema',year:2022,drug:'Nplate',ind:'טיפול ב-ITP',ema:2009,fda:2008,dEU:13,dFDA:14,full:false,partial:true,pts:'—'},
  {ta:'המטולוגיה',taKey:'hema',year:2022,drug:'Alprolix',ind:'טיפול בהמופיליה B',ema:2016,fda:2014,dEU:6,dFDA:8,full:true,partial:false,pts:'50'},
  {ta:'המטולוגיה',taKey:'hema',year:2022,drug:'Nuwiq',ind:'טיפול בהמופיליה A',ema:2014,fda:2015,dEU:8,dFDA:7,full:true,partial:false,pts:'ללא תוספת'},
  {ta:'המטולוגיה',taKey:'hema',year:2022,drug:'Elocta',ind:'טיפול בהמופיליה A',ema:2015,fda:2014,dEU:7,dFDA:8,full:true,partial:false,pts:'ללא תוספת'}
];

const TA_COLORS = {rheum:'#4f9cf9',hema:'#a78bfa',psy:'#34d399',neuro:'#f97316',cardio:'#ef4444',diab:'#f59e0b',pulm:'#06b6d4',onco:'#ec4899',hemo:'#8b5cf6',gastro:'#14b8a6',hiv:'#22c55e',vacc:'#eab308'};

function fmtNum(n){if(n===null||n===undefined||n==='—')return '—';if(typeof n==='string')return n;return n.toLocaleString('en-US');}

document.querySelectorAll('nav button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('view-' + btn.dataset.view).classList.add('active');
  setTimeout(() => Object.values(window.__charts || {}).forEach(c => c && c.resize()), 50);
}));

window.__charts = {};

if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = "'Heebo', 'Assistant', sans-serif";
  Chart.defaults.color = '#b8d0e8';

  window.__charts.taOverview = new Chart(document.getElementById('chartTAOverview'), {
    type:'bar',
    data:{labels:TA_DATA.map(d=>d.he),datasets:[
      {label:'∆ EMA (שנים)',data:TA_DATA.map(d=>d.eu),backgroundColor:'rgba(79,156,249,0.85)',borderRadius:6},
      {label:'∆ FDA (שנים)',data:TA_DATA.map(d=>d.fda),backgroundColor:'rgba(249,115,22,0.85)',borderRadius:6}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{boxWidth:14,font:{size:12}}},tooltip:{backgroundColor:'#0f1a2e',borderColor:'rgba(255,255,255,0.12)',borderWidth:1,padding:10}},scales:{x:{grid:{display:false},ticks:{font:{size:11},maxRotation:45,minRotation:30}},y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{stepSize:2},title:{display:true,text:'שנים',color:'#8faac8'}}}}
  });

  window.__charts.patients = new Chart(document.getElementById('chartPatients'), {
    type:'doughnut',
    data:{labels:TA_DATA.map(d=>d.he),datasets:[{data:TA_DATA.map(d=>d.pts),backgroundColor:['#4f9cf9','#a78bfa','#34d399','#f97316','#ef4444','#f59e0b','#06b6d4','#ec4899','#8b5cf6','#14b8a6','#22c55e','#eab308'],borderColor:'#0f1a2e',borderWidth:2}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:11},boxWidth:10}},tooltip:{callbacks:{label:ctx=>ctx.label+': '+fmtNum(ctx.parsed)+' מטופלים'}}}}
  });

  const totPartial = TA_DATA.reduce((s,d)=>s+d.partial,0)/TA_DATA.length;
  window.__charts.approvalDoughnut = new Chart(document.getElementById('chartApprovalDoughnut'), {
    type:'doughnut',
    data:{labels:['אישור מלא','אישור חלקי'],datasets:[{data:[Math.round((1-totPartial)*100),Math.round(totPartial*100)],backgroundColor:['#34d399','#f59e0b'],borderColor:'#0f1a2e',borderWidth:3}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{font:{size:13},boxWidth:14}},tooltip:{callbacks:{label:ctx=>ctx.label+': '+ctx.parsed+'%'}}}}
  });

  window.__charts.approvalStacked = new Chart(document.getElementById('chartApprovalStacked'), {
    type:'bar',
    data:{labels:TA_DATA.map(d=>d.he),datasets:[
      {label:'אושר במלואו',data:TA_DATA.map(d=>Math.round(d.full*100)),backgroundColor:'#34d399',borderRadius:4,stack:'a'},
      {label:'אושר חלקית',data:TA_DATA.map(d=>Math.round(d.partial*100)),backgroundColor:'#f59e0b',borderRadius:4,stack:'a'}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{boxWidth:14,font:{size:12}}},tooltip:{callbacks:{label:ctx=>ctx.dataset.label+': '+ctx.parsed.y+'%'}}},scales:{x:{stacked:true,grid:{display:false},ticks:{maxRotation:45,minRotation:30}},y:{stacked:true,max:100,grid:{color:'rgba(255,255,255,0.05)'},ticks:{callback:v=>v+'%'}}}}
  });
}

const taGrid = document.getElementById('taGrid');
TA_DATA.forEach(d => {
  const card = document.createElement('div');
  card.className = 'ta-card ' + d.color;
  card.innerHTML = '<div class="ta-name">'+d.he+'</div><div class="ta-name-en">'+d.en+'</div><div class="ta-stats"><div class="ta-stat-mini"><div class="lab">∆ EU AVG</div><div class="val">'+d.eu+'<span class="unit">y</span></div></div><div class="ta-stat-mini"><div class="lab">∆ FDA AVG</div><div class="val">'+d.fda+'<span class="unit">y</span></div></div></div><div class="ta-patients"><div class="lab">מטופלים מושפעים</div><div class="val">'+fmtNum(d.pts)+'</div></div><div style="display:flex; gap:0.5rem; margin-top:0.7rem;"><div style="flex:'+(d.full*100)+'; height:6px; background:var(--strength); border-radius:3px;"></div><div style="flex:'+(d.partial*100)+'; height:6px; background:var(--gold); border-radius:3px;"></div></div><div style="display:flex; justify-content:space-between; margin-top:0.4rem; font-size:0.7rem;"><span style="color:var(--strength);">מלא '+Math.round(d.full*100)+'%</span><span style="color:var(--gold);">חלקי '+Math.round(d.partial*100)+'%</span></div>';
  taGrid.appendChild(card);
});

const trendChips = document.getElementById('trendChips');
const trendState = { selected: TA_DATA.slice(0,5).map(d => d.id) };
TA_DATA.forEach(d => {
  const chip = document.createElement('div');
  chip.className = 'filter-chip' + (trendState.selected.includes(d.id) ? ' active' : '');
  chip.textContent = d.he;
  chip.addEventListener('click', () => {
    if (trendState.selected.includes(d.id)) { trendState.selected = trendState.selected.filter(x=>x!==d.id); chip.classList.remove('active'); }
    else { trendState.selected.push(d.id); chip.classList.add('active'); }
    renderTrend();
  });
  trendChips.appendChild(chip);
});

function renderTrend(){
  if (typeof Chart === 'undefined') return;
  const years = [2021,2022,2023,2024,2025];
  const datasets = trendState.selected.map(taId => {
    const ta = TA_DATA.find(t => t.id === taId);
    return {label:ta.he, data:years.map(y=>YEARLY[taId][y][0]), borderColor:TA_COLORS[taId], backgroundColor:TA_COLORS[taId]+'33', tension:0.35, borderWidth:2.5, pointRadius:4, pointHoverRadius:6, spanGaps:true};
  });
  if (window.__charts.trends) window.__charts.trends.destroy();
  window.__charts.trends = new Chart(document.getElementById('chartTrends'), {
    type:'line', data:{labels:years, datasets},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{boxWidth:14,font:{size:12}}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'}},y:{grid:{color:'rgba(255,255,255,0.05)'},beginAtZero:true,title:{display:true,text:'∆ EU (שנים)'}}}}
  });
}
renderTrend();

const heatmap = document.getElementById('heatmap');
function renderHeatmap(){
  const years = [2021,2022,2023,2024,2025];
  let html = '<div style="overflow-x:auto;"><table style="width:100%; border-collapse:separate; border-spacing:3px;">';
  html += '<tr><th style="padding:0.5rem; text-align:right; font-size:0.78rem; color:var(--text-muted); font-weight:500;">תחום</th>';
  years.forEach(y => html += '<th style="padding:0.5rem; text-align:center; font-family:DM Mono,monospace; font-size:0.78rem; color:var(--text-muted); font-weight:500;">'+y+'</th>');
  html += '<th style="padding:0.5rem; text-align:center; font-size:0.78rem; color:var(--text-muted); font-weight:500;">ממוצע</th></tr>';
  TA_DATA.forEach(t => {
    html += '<tr><td style="padding:0.4rem 0.6rem; font-size:0.84rem; font-weight:600; color:white;">'+t.he+'</td>';
    years.forEach(y => {
      const v = YEARLY[t.id][y][0];
      const intensity = v === null ? 0 : Math.min(v/12, 1);
      const bg = v === null ? 'rgba(255,255,255,0.03)' : 'rgba(239,68,68,'+(0.1+intensity*0.55)+')';
      const txt = v === null ? '—' : v;
      const color = v === null ? 'var(--text-muted)' : (intensity > 0.45 ? '#fff' : 'var(--text-dim)');
      html += '<td style="background:'+bg+'; padding:0.65rem; text-align:center; border-radius:6px; font-family:DM Mono,monospace; font-size:0.82rem; font-weight:600; color:'+color+';">'+txt+'</td>';
    });
    html += '<td style="padding:0.65rem; text-align:center; font-family:DM Mono,monospace; font-size:0.84rem; font-weight:700; color:var(--accent);">'+t.eu+'</td></tr>';
  });
  html += '</table></div>';
  heatmap.innerHTML = html;
}
renderHeatmap();

const taFilterChips = document.getElementById('taFilterChips');
const taIds = ['__all__'];
DRUGS.forEach(d => { if (!taIds.includes(d.taKey)) taIds.push(d.taKey); });
let activeTAFilter = '__all__';
taIds.forEach(id => {
  const chip = document.createElement('div');
  chip.className = 'filter-chip' + (id === '__all__' ? ' active' : '');
  chip.textContent = id === '__all__' ? 'הכל' : TA_DATA.find(t => t.id === id).he;
  chip.addEventListener('click', () => {
    document.querySelectorAll('#taFilterChips .filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeTAFilter = id;
    renderDetail();
  });
  taFilterChips.appendChild(chip);
});

function renderDetail(){
  const body = document.getElementById('detailBody');
  body.innerHTML = '';
  const rows = activeTAFilter === '__all__' ? DRUGS : DRUGS.filter(d => d.taKey === activeTAFilter);
  rows.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td><span class="ta-tag" style="background:'+TA_COLORS[d.taKey]+'33; color:'+TA_COLORS[d.taKey]+';">'+d.ta+'</span></td><td class="num">'+d.year+'</td><td class="drug">'+d.drug+'</td><td class="indication">'+d.ind+'</td><td class="num">'+d.ema+'</td><td class="num">'+d.fda+'</td><td class="num">'+d.dEU+'</td><td class="num">'+d.dFDA+'</td><td class="check '+(d.full?'full':'')+'">'+(d.full?'✓':'')+'</td><td class="check '+(d.partial?'partial':'')+'">'+(d.partial?'✓':'')+'</td><td class="num">'+d.pts+'</td>';
    body.appendChild(tr);
  });
}
renderDetail();
