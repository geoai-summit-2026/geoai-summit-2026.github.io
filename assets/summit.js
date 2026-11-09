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
const PUBLIC_MATERIALS = Object.freeze({"keynote-01":{"href":"./downloads/keynote-01-5d65ae195540293f.pdf","filename":"1_기조강연_이경일_국가안보에서 AI와 공간정보.pdf","size":8604168},"session-01":{"href":"./downloads/session-01-fc307a807d8f1dcc.pdf","filename":"2_전문세션01_박일웅_공간정보 R&D 사업 추진 전략.pdf","size":2291653},"session-02":{"href":"./downloads/session-02-43fb961d8a3b4678.pdf","filename":"3_전문세션02_오형직_위성과 국토정보를 연결하는 공간정보 AI.pdf","size":12172441},"session-03":{"href":"./downloads/session-03-cdd62de04d55339e.pdf","filename":"4_전문세션03_한근혁_국공유지 변화탐지 무단점유 분석 AI 플랫폼.pdf","size":2804085},"session-04":{"href":"./downloads/session-04-2641b967e5f8e244.pdf","filename":"5_전문세션04_홍순범_AI 변화탐지 기반 무인도서 해양쓰레기 예측 및 관리 체계 구축.pdf","size":6333587},"session-05":{"href":"./downloads/session-05-309e302b977ad708.pdf","filename":"6_전문세션05_김태훈_팔란티어 전쟁에서의 공간정보.pdf","size":15566228}});
const PUBLIC_ZIP = Object.freeze({"href":"./downloads/GeoAI_Summit_2026_individual-3a8fbd6d536dcdfa.zip","filename":"\ucd5c\uc2e0_PDF_1109.zip","size":40534530,"sha256":"3a8fbd6d536dcdfa5bca1a5445bc84d765b306e258fcc32ad27d62e5e70ce5eb","storage":"pages","combined_pdf":{"href":"./downloads/GeoAI_Summit_2026_combined-6b82e066a3583479.pdf","filename":"GeoAISummit2026_\ud589\uc0ac\ud654\uba74_\ubc1c\ud45c\uc790\ub8cc_\ud1b5\ud569\ubcf8.pdf","size":49984160,"sha256":"6b82e066a358347975b6d271b246120a1d7000ea44d6d619f04e041b061d2cf1"}});
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
  const primary=PUBLIC_ZIP.combined_pdf||PUBLIC_ZIP;
  setButtonState(all,count>0,primary.href,'');
  if(count>0)all.download=primary.filename;
  if(PUBLIC_ZIP.combined_pdf){
    all.innerHTML=downloadIcon+'<span>통합 PDF 다운로드</span>';
    all.setAttribute('aria-label',count>0?'발표자료 통합 PDF 다운로드':'등록된 발표자료 없음');
    const zip=document.createElement('a');
    zip.id='allZipDown';
    zip.className='all';
    zip.setAttribute('style','box-sizing:border-box;display:flex;width:max-content;max-width:100%;margin:10px 0 18px auto;padding:8px 14px;font-size:13px;line-height:1.5;text-align:center;white-space:normal;');
    setButtonState(zip,count>0,PUBLIC_ZIP.href,'');
    zip.innerHTML=downloadIcon+'<span>개별 자료 ZIP 다운로드</span>';
    zip.download=PUBLIC_ZIP.filename;
    zip.setAttribute('aria-label','발표별 PDF '+count+'개를 포함한 ZIP 다운로드');
    document.querySelector('.top').insertAdjacentElement('afterend',zip);
  }else{
    all.setAttribute('aria-label',count>0?'현재 등록된 발표자료 '+count+'개 ZIP 다운로드':'등록된 발표자료 없음');
  }
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
