'use strict';
const TALKS = {
  keynote: [
    {id:'keynote-01',no:'01',title:'국가안보에서 AI와 공간정보',speaker:'(주)솔트룩스 이경일\u00a0대표이사',time:'14:00–15:00',dur:'60분'}
  ],
  sessions: [
    {id:'session-01',no:'01',title:'한국형 국토 피지컬 R&D 추진',speaker:'국토정보정책과 박일웅\u00a0사무관\u00a0/ KAIA\u00a0박재선\u00a0PD',time:'15:50–16:10',dur:'20분'},
    {id:'session-02',no:'02',title:'위성과 국토정보를 연결하는 공간정보AI',speaker:'(주)나라스페이스테크놀로지 박재필\u00a0대표이사, 오형직\u00a0운영이사',time:'16:10–16:30',dur:'20분'},
    {id:'session-03',no:'03',title:'국공유지 변화탐지·무단점유 분석 AI 플랫폼',speaker:'(주)지오스토리 한근혁\u00a0이사',time:'16:30–16:50',dur:'20분'},
    {id:'session-04',no:'04',title:'AI 변화탐지 기반 무인도서 해양쓰레기 수거량 예측 및 관리 체계 구축',speaker:'(주)지오랩스 홍순범\u00a0이사',time:'16:50–17:10',dur:'20분'},
    {id:'session-05',no:'05',title:'팔란티어, 전쟁에서의 공간정보',speaker:'(재)공간정보품질관리원 김태훈\u00a0실장',time:'17:10–17:30',dur:'20분'}
  ]
};
const PUBLIC_MATERIALS = Object.freeze({"session-01":{"href":"./downloads/session-01-5a29aa7befbe33a6.pdf","filename":"전문세션01_박일웅_국토정보정책과_공간정보 R&D 사업 추진 전략.pdf","size":1415072},"session-03":{"href":"./downloads/session-03-5f87fb1bcbe86c01.pdf","filename":"전문세션03_한근혁_지오스토리_AI Platform.pdf","size":7434743},"session-05":{"href":"./downloads/session-05-70bb10ce231278b1.pptx","filename":"전문세션05_김태훈_261023_Palantir_전쟁공간정보_품질관문추가본.pptx","size":30391249}});
const PUBLIC_ZIP = Object.freeze({"href":"./downloads/GeoAI_Summit_2026_presentations.zip","filename":"GeoAI_Summit_2026_presentations.zip"});
const downloadIcon = '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v7.2M4.8 6.6 8 9.8l3.2-3.2M3 12.8h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const pendingIcon = '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="3" cy="8" r="1.25" fill="currentColor"/><circle cx="8" cy="8" r="1.25" fill="currentColor"/><circle cx="13" cy="8" r="1.25" fill="currentColor"/></svg>';
function escapeText(value){return String(value).replace(/[&<>"]/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));}
function item(talk){
  const button='<a class="dl" data-material-id="'+talk.id+'" aria-disabled="true" tabindex="-1" aria-label="'+escapeText(talk.title)+' 자료 준비 중"><span>자료 준비 중</span>'+pendingIcon+'</a>';
  return '<div class="it"><div><div class="hd"><span class="nm">'+escapeText(talk.no)+'</span><span class="ti">'+escapeText(talk.title)+'</span></div>'
    +'<div class="sb">'+escapeText(talk.speaker)+'</div></div>'
    +'<div class="rt"><div class="tm"><span>'+escapeText(talk.time)+'</span></div>'+button+'</div></div>';
}
document.querySelectorAll('[data-group]').forEach((element)=>{
  element.innerHTML=(TALKS[element.getAttribute('data-group')]||[]).map(item).join('');
});
function setButtonState(button, available, href, title){
  button.setAttribute('aria-disabled',String(!available));
  if(available){button.href=href;button.removeAttribute('tabindex');}
  else{button.removeAttribute('href');button.setAttribute('tabindex','-1');}
  if(button.id!=='allDown'){
    button.innerHTML=available?downloadIcon+'<span><span class="w">발표자료 </span>다운로드</span>':'<span>자료 준비 중</span>'+pendingIcon;
    button.setAttribute('aria-label',title+(available?' 발표자료 다운로드':' 자료 준비 중'));
  }
}
function applyStaticMaterials(){
  const talks=[...TALKS.keynote,...TALKS.sessions];
  let count=0;
  for(const talk of talks){
    const material=PUBLIC_MATERIALS[talk.id];
    const available=Boolean(material);
    const button=document.querySelector('[data-material-id="'+talk.id+'"]');
    setButtonState(button,available,available?material.href:'',talk.title);
    if(available){button.download=material.filename;count++;}
    else{button.removeAttribute('download');}
  }
  const all=document.getElementById('allDown');
  setButtonState(all,count>0,PUBLIC_ZIP.href,'');
  if(count>0)all.download=PUBLIC_ZIP.filename;
  all.setAttribute('aria-label',count>0?'현재 등록된 발표자료 '+count+'개 ZIP 다운로드':'등록된 발표자료 없음');
  const status=document.getElementById('material-status');
  status.textContent=count===talks.length?'발표자료 '+count+'/'+talks.length+'개 등록 · 통합 다운로드에 모두 포함':count>0?'현재 등록된 발표자료 '+count+'/'+talks.length+'개만 통합 다운로드에 포함':'발표자료 0/'+talks.length+'개 등록 · 자료를 준비하고 있어요.';
  document.getElementById('material-retry').hidden=true;
}
applyStaticMaterials();

/* Original cover/title alignment, retained from the supplied HTML. */
(function(){
  var SUMMIT=0.571,CAP=window.__CAP||0.06;
  function fit(){
    var top=document.querySelector('.top');if(!top)return;
    var im=top.querySelector('.ttl img'),ttl=top.querySelector('.ttl'),sd=top.querySelector('.side'),pg=sd.querySelector('.pg'),k=pg.querySelector('.k'),bt=sd.querySelector('.all');
    if(!im.naturalWidth)return;
    sd.style.gap='';
    var ir=im.getBoundingClientRect(),tr=ttl.getBoundingClientRect();
    var fs=parseFloat(getComputedStyle(k).fontSize);
    var want=tr.bottom-(ir.top+ir.height*SUMMIT)+fs*CAP;
    var g=want-pg.getBoundingClientRect().height-bt.getBoundingClientRect().height-1;
    sd.style.gap=Math.max(3,Math.round(g))+'px';
  }
  var im=document.querySelector('.top .ttl img');
  if(im&&!im.complete)im.addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  window.addEventListener('resize',fit);fit();
})();
