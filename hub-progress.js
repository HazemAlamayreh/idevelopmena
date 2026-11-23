/* Course-specific progress and explicit reset controls on the main Learning Hub. */
const HUB_COURSES={management:bi('Management Fundamentals','أساسيات الإدارة'),ei:bi('Emotional Intelligence — Lead Self','الذكاء العاطفي — قيادة الذات')};
function getHubCourseStatus(key) {
 if(key==='management') {
  const doneModules=DATA.modules.filter(m=>m.id===2?getModule2Progress().completed:!!state.moduleScores?.[m.id]).length;
  const total=DATA.modules.length+2,steps=doneModules+Number(!!state.pre)+Number(!!state.post);
  const started=steps>0||Object.keys(state.visits||{}).length>0||Object.keys(state.moduleScores||{}).length>0||Object.keys(state.caseResponses||{}).length>0||Object.keys(state.caseSubmitted||{}).length>0;
  return {started,done:steps===total,pct:Math.round(steps/total*100),doneModules,totalModules:DATA.modules.length,pre:state.pre?.total??null,post:state.post?.total??null};
 }
 if(key!=='ei')return null;
 const tasks=EI_MODS.map(m=>eiModuleTasks(m.id));
 const total=tasks.reduce((n,t)=>n+t.total+2,2);
 const steps=tasks.reduce((n,t)=>n+t.learned+Number(t.check)+Number(t.practice),Number(EI_STATE.preDone)+Number(EI_STATE.postDone));
 const doneModules=EI_MODS.filter(m=>EI_STATE.modules[m.id]).length;
 const started=steps>0||Object.keys(EI_STATE.practice||{}).length>0||Object.values(EI_STATE.checks||{}).some(c=>c.i>0||c.done)||Object.values(EI_STATE.situationAnswers||{}).some(module=>Object.values(module).some(answers=>Object.keys(answers).length>0));
 return {started,done:doneModules===EI_MODS.length&&EI_STATE.preDone&&EI_STATE.postDone,pct:Math.round(steps/total*100),doneModules,totalModules:EI_MODS.length,pre:EI_STATE.preDone?EI_STATE.preScore:null,post:EI_STATE.postDone?EI_STATE.postScore:null};
}
function hubCourseProgressHtml(key) {
 const p=getHubCourseStatus(key),status=p.done?bi('✓ Completed','✓ مكتمل'):p.started?bi('In Progress','قيد التقدم'):bi('Not Started','لم يبدأ');
 const score=n=>n===null?'—':n+'%';
 return `<section class="hub-course-progress ${p.done?'completed-card':''}" aria-label="${localText(bi('Course progress','تقدم الكورس'))}"><div class="hub-progress-top"><span class="completion-badge ${p.started?'hub-started':''}">${localText(status)}</span><strong>${p.pct}%</strong></div><div class="module-progress-track" role="progressbar" aria-label="${localText(bi('Completion progress','نسبة الإكمال'))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p.pct}"><span style="width:${p.pct}%"></span></div><div class="hub-course-stats"><div><span>${localText(bi('Modules completed','الموديولات المكتملة'))}</span><b>${p.doneModules}/${p.totalModules}</b></div><div><span>${localText(bi('Pre-Assessment','التقييم القبلي'))}</span><b>${score(p.pre)}</b></div><div><span>${localText(bi('Post-Assessment','التقييم البعدي'))}</span><b>${score(p.post)}</b></div></div></section>`;
}
const hubWithoutProgress=renderHub;
renderHub=function() {
 hubWithoutProgress();
 const cards=document.querySelectorAll('#learningHub .coursecard');
 ['management','ei'].forEach((key,i)=>{
  const card=cards[i];if(!card)return;card.dataset.course=key;
  const open=card.querySelector('button.next');
  open.insertAdjacentHTML('beforebegin',hubCourseProgressHtml(key));
  const actions=document.createElement('div');actions.className='hub-course-actions';
  open.before(actions);actions.append(open);
  const reset=document.createElement('button');reset.type='button';reset.className='secondary hub-reset';
  reset.textContent=localText(bi('Reset Results','تصفير النتائج'));
  reset.addEventListener('click',()=>requestCourseReset(key));actions.append(reset);
 });
}
let pendingResetCourse=null;
function requestCourseReset(key) {
 if(!HUB_COURSES[key])return;
 let dialog=document.getElementById('course-reset-dialog');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='course-reset-dialog';dialog.className='hub-reset-dialog';dialog.setAttribute('aria-labelledby','course-reset-title');dialog.addEventListener('close',()=>{pendingResetCourse=null;});document.body.append(dialog);}
 pendingResetCourse=key;
 dialog.innerHTML=`<h3 id="course-reset-title">${localText(bi('Reset course results?','تصفير نتائج الكورس؟'))}</h3><p><b>${localText(HUB_COURSES[key])}</b></p><p>${localText(bi('This clears this course’s assessment results and lesson, activity, and completion progress on this browser. Your other course will keep its results.','سيؤدي هذا إلى تصفير نتائج التقييمات وتقدم الدروس والأنشطة والإكمال لهذا الكورس على هذا المتصفح. تبقى نتائج الكورس الآخر محفوظة.'))}</p>${key==='ei'?`<p>${localText(bi('The saved Pre-Assessment baseline will also be cleared, allowing a new first attempt.','سيتم أيضاً تصفير نتيجة التقييم القبلي المحفوظة، للسماح بمحاولة أولى جديدة.'))}</p>`:''}<div class="hub-course-actions"><button class="secondary" autofocus onclick="document.getElementById('course-reset-dialog').close()">${localText(bi('Cancel','إلغاء'))}</button><button class="next red" onclick="confirmCourseReset()">${localText(bi('Reset This Course','تصفير هذا الكورس'))}</button></div>`;
 dialog.showModal();
}
function confirmCourseReset() {
 const dialog=document.getElementById('course-reset-dialog'),key=pendingResetCourse;
 if(!dialog?.open||!HUB_COURSES[key])return;
 dialog.close();applyCourseReset(key);renderHub();
 document.querySelector(`[data-course="${key}"] .next`)?.focus();
}
function applyCourseReset(key) {
 if(!HUB_COURSES[key])return;
 stopTimer();
 if(key==='management') {
  state={moduleScores:{},visits:{}};save();
  view='home';currentModuleId=null;currentTab='learn';currentSub=0;slideIndex=0;
  qi=0;qscore=0;answered=false;wrong=[];assessType=null;ai=0;aAnswers=[];selected=null;
  window.caseAnswerVisible=null;window.quizOrder=[];window.assessOrder=[];
 }else{
  EI_STATE={preDone:false,postDone:false,preScore:null,postScore:null,preDomains:{},postDomains:{},modules:{},checks:{},practice:{},simDone:false,lessons:{},completedSimulations:{},situationAnswers:{},situationOrders:{},completionV4:true,legacyCompletedModules:{},learnRead:{},combinedChecks:{},learnLayoutV2:true};
  EI_CHECK_STATE=EI_STATE.checks;EI_PRACTICE=EI_STATE.practice;EI_ASSESS=null;
  sim=null;matchGame=undefined;eiModule=null;eiTab='learn';
  updateEICompletion();
 }
}
eiCourseProgress=function(){return getHubCourseStatus('ei').pct;};
renderHub();
