/* Lead Self: worked examples, line matching, and decision consequences. */
const bi = (en, ar) => ({en, ar});
const localText = value => typeof value === 'string' ? value : value[lang];
const shuffleEI = items => {
 const result = [...items];
 for (let i=result.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
 return result;
};

const DISTORTIONS = [
 {id:'mind',label:bi('Mind Reading','قراءة الأفكار'),statement:bi('The QA reviewer asked for evidence. She must think I am incompetent.','طلبت مراجعة الجودة دليلاً. لا بد أنها تعتقد أنني غير كفؤ.'),why:bi('The reviewer requested evidence; her opinion of you is unknown.','طلبت المراجعة دليلاً؛ أما رأيها بك فغير معروف.'),reframe:bi('What evidence is needed to complete this review?','ما الدليل المطلوب لإكمال هذه المراجعة؟')},
 {id:'fortune',label:bi('Fortune Telling','التنبؤ بالمستقبل'),statement:bi('The doctor has not replied. My next clinic visit will definitely fail.','لم يرد الطبيب. زيارتي القادمة للعيادة ستفشل بالتأكيد.'),why:bi('A future visit is being treated as a certain failure without evidence.','يُعامل حدث مستقبلي كفشل مؤكد دون دليل.'),reframe:bi('I can prepare a relevant opening and confirm an appropriate visit time.','أستطيع تجهيز افتتاحية مناسبة والتأكد من وقت ملائم للزيارة.')},
 {id:'label',label:bi('Labeling','وضع التسميات'),statement:bi('The engineer missed one handover detail. He is an irresponsible person.','نسي المهندس تفصيلاً في التسليم. إنه شخص غير مسؤول.'),why:bi('A specific omission has become a judgment about the whole person.','تحول نقص محدد إلى حكم على الشخص بالكامل.'),reframe:bi('Which handover detail was missed, and how can we prevent recurrence?','ما التفصيل الناقص في التسليم وكيف نمنع تكراره؟')},
 {id:'should',label:bi('Harsh Should','توقعات يجب الصارمة'),statement:bi('I should resolve every supply delay perfectly without asking anyone for support.','يجب أن أحل كل تأخير توريد بإتقان دون طلب دعم من أحد.'),why:bi('An absolute demand replaces a realistic expectation of shared problem solving.','حل مطلب مطلق محل توقع واقعي لحل المشكلة بالتعاون.'),reframe:bi('I am responsible for coordinating the response and asking for support when needed.','مسؤوليتي تنسيق الاستجابة وطلب الدعم عند الحاجة.')},
 {id:'catastrophe',label:bi('Catastrophizing','التهويل'),statement:bi('This packaging delay will destroy the customer relationship and ruin our business.','هذا التأخير في التعبئة سيدمر علاقتنا بالعميل ويقضي على أعمالنا.'),why:bi('A delay is being magnified into an extreme chain of disastrous consequences.','تم تضخيم التأخير إلى سلسلة متطرفة من النتائج الكارثية.'),reframe:bi('What is the confirmed impact, and which actions can reduce it now?','ما الأثر المؤكد وما الإجراءات التي تخففه الآن؟')},
 {id:'general',label:bi('Overgeneralizing','التعميم المفرط'),statement:bi('One batch review took longer today. Our reviews are always late and never reliable.','استغرقت مراجعة تشغيلة اليوم وقتاً أطول. مراجعاتنا دائماً متأخرة ولا يمكن الاعتماد عليها أبداً.'),why:bi('One occurrence is being extended into an always/never pattern.','تم تحويل واقعة واحدة إلى نمط دائم باستخدام دائماً وأبداً.'),reframe:bi('Is this one delay or a repeated pattern? Let us check the review data.','هل هذا تأخير واحد أم نمط متكرر؟ لنراجع البيانات.')}
];
let matchGame;
function initMatchGame() {
 matchGame={left:shuffleEI(DISTORTIONS.map(x=>x.id)),right:shuffleEI(DISTORTIONS.map(x=>x.id)),pairs:{},selected:null,checked:false,attempts:0};
}
const originalPracticeEI=renderEIPractice;
renderEIPractice=function(id) { return id===2 ? renderMatchGame() : originalPracticeEI(id); };
function renderMatchGame() {
 if(!matchGame)initMatchGame();
 const g=matchGame,correct=DISTORTIONS.filter(x=>g.pairs[x.id]===x.id).length;
 const card=(id,side)=>{
  const d=DISTORTIONS.find(x=>x.id===id),linked=side==='left'?g.pairs[id]:Object.values(g.pairs).includes(id);
  const bad=g.checked&&(side==='left'?g.pairs[id]!==id:Object.entries(g.pairs).some(([a,b])=>b===id&&a!==b));
  const n=side==='left'?Object.keys(g.pairs).indexOf(id)+1:Object.values(g.pairs).indexOf(id)+1;
  return `<button class="match-card ${linked?'linked':''} ${g.selected===id&&side==='left'?'picked':''} ${bad?'needs-retry':''}" data-match-${side}="${id}" aria-pressed="${side==='left'&&g.selected===id}" onclick="chooseMatch('${side}','${id}')"><span>${localText(side==='left'?d.statement:d.label)}</span>${linked?`<span class="match-number">${n}</span>`:''}</button>`;
 };
 requestAnimationFrame(drawMatchLines);
 return `<section class="eipanel match-game"><span class="ribbon">${localText(bi('THOUGHT DETECTIVE','محقق الأفكار'))}</span><h3>${localText(bi('Connect the thought to its thinking trap','صل الفكرة بنمط التفكير'))}</h3><p>${localText(bi('Select a statement, then select its thinking pattern. A line connects your pair. Select a statement again to change its connection. Match all six, then check your board.','اختر عبارة ثم اختر نمط التفكير لتظهر وصلة بينهما. اختر العبارة مجدداً لتغيير وصلتها. صل العبارات الست ثم تحقق من اللوحة.'))}</p><div class="match-status" role="status" aria-live="polite">${g.checked?`${correct}/6 ${localText(bi('correct','صحيح'))}`:`${Object.keys(g.pairs).length}/6 ${localText(bi('connected','تم توصيلها'))}`}</div><div id="match-board" class="match-board"><svg id="match-lines" aria-hidden="true"></svg><div class="match-column">${g.left.map(id=>card(id,'left')).join('')}</div><div class="match-column">${g.right.map(id=>card(id,'right')).join('')}</div></div><div class="match-actions"><button class="next" ${Object.keys(g.pairs).length===6?'':'disabled'} onclick="checkMatches()">${localText(bi('Check My Connections','تحقق من التوصيلات'))}</button><button class="secondary" onclick="initMatchGame();renderEI()">${localText(bi('Shuffle & Play Again','اخلط والعب مجدداً'))}</button></div>${g.checked?`<div class="insight" role="status"><b>${localText(correct===6?bi('All six connected. Now challenge the thought.','وصلت الأنماط الستة. الآن اختبر الفكرة.'):bi('Review the highlighted connections and try again.','راجع التوصيلات المميزة وحاول مجدداً.'))}</b></div>${DISTORTIONS.filter(d=>g.pairs[d.id]===d.id).map(d=>`<details class="worked"><summary>${localText(d.label)}</summary><p>${localText(d.why)}</p><p><b>${localText(bi('A more useful question:','سؤال أكثر فائدة:'))}</b> ${localText(d.reframe)}</p></details>`).join('')}`:''}</section>`;
}
function chooseMatch(side,id) {
 const g=matchGame;
 if(side==='left')g.selected=g.selected===id?null:id;
 else if(g.selected) {
  Object.keys(g.pairs).forEach(k=>{if(g.pairs[k]===id)delete g.pairs[k];});
  g.pairs[g.selected]=id;g.selected=null;g.checked=false;
 }
 renderEI();
}
function checkMatches() {
 if(Object.keys(matchGame.pairs).length!==6)return;
 matchGame.checked=true;matchGame.attempts++;
 if(DISTORTIONS.every(x=>matchGame.pairs[x.id]===x.id)) {
  EI_STATE.practice.distortionMatchDone=true;
  EI_STATE.practice.distortionMatchAttempts=matchGame.attempts;
  updateEICompletion();
 }
 renderEI();
}
function drawMatchLines() {
 const board=document.getElementById('match-board'),svg=document.getElementById('match-lines');
 if(!board||!svg||!matchGame)return;
 const bounds=board.getBoundingClientRect(); svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);svg.replaceChildren();
 Object.entries(matchGame.pairs).forEach(([a,b],i)=>{
  const left=board.querySelector(`[data-match-left="${a}"]`).getBoundingClientRect(),right=board.querySelector(`[data-match-right="${b}"]`).getBoundingClientRect();
  const ltr=left.left<right.left,x1=(ltr?left.right:left.left)-bounds.left,x2=(ltr?right.left:right.right)-bounds.left,y1=left.top+left.height/2-bounds.top,y2=right.top+right.height/2-bounds.top;
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d',`M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`);
  path.setAttribute('stroke',matchGame.checked?(a===b?'#19815e':'#d74646'):['#1264a3','#6b4f9b','#127c77','#a66b1f','#a03d71','#45689b'][i]);
  svg.appendChild(path);
 });
}
window.addEventListener('resize',drawMatchLines);
const originalCompletionEI=updateEICompletion;
updateEICompletion=function() {
 originalCompletionEI();
 EI_STATE.modules[2]=!!(EI_STATE.checks[2]?.done&&EI_STATE.practice.distortionMatchDone);
 saveEIState();
};

const originalTabEI=renderEITab;
renderEITab=function(m) {
 if(eiTab!=='slides')return originalTabEI(m);
 const starts={1:7,2:28,3:48};
 return `<section class="eipanel"><h3>${localText(bi('Original Lead Self Slides','شرائح قيادة الذات الأصلية'))}</h3><p>${localText(bi('The complete 69-page source deck is connected below. Open the PDF to jump directly to this module.','تم ربط العرض الأصلي الكامل المكون من 69 صفحة أدناه. افتح PDF للانتقال مباشرة إلى هذه الوحدة.'))}</p><p><a class="next" href="assets/lead-self.pdf#page=${starts[m.id]}" target="_blank" rel="noopener">${localText(bi('Open Module Slides','افتح شرائح الوحدة'))}</a> <a class="secondary" href="assets/lead-self.pdf" download="Lead_Self.pdf">${localText(bi('Download PDF','تنزيل PDF'))}</a></p><iframe class="source-pdf" src="assets/lead-self.pdf#page=${starts[m.id]}" title="${localText(bi('Lead Self source slides','شرائح قيادة الذات'))}"></iframe><p>${localText(bi('If your device does not show the embedded viewer, use Open Module Slides.','إذا لم يظهر العارض على جهازك، استخدم زر فتح شرائح الوحدة.'))}</p></section>`;
};

// Each lesson has a worked example, a short application sequence, and usable language.
const WORKED_EI={
1:[
 ['Quality · A challenged review','الجودة · مراجعة محل نقاش',
  'Production asks why you returned a batch record. You hear: “Quality always slows us down.” Your first story is that your contribution is not respected.','يسأل الإنتاج لماذا أعدت سجل التشغيلة ويقول: الجودة تؤخرنا دائماً. تفسيرك الأول أن مساهمتك غير محترمة.',
  ['Name the event: a colleague challenged the review, not your personal worth.','Notice the story and the anger it creates before replying.','Ask which deadline is affected and explain the specific evidence still required.','Agree a review checkpoint; keep the release decision with the authorized process.'],
  ['سم الحدث: زميل ناقش المراجعة، وليس قيمتك الشخصية.','لاحظ التفسير والغضب الذي ولده قبل الرد.','اسأل عن الموعد المتأثر ووضح الدليل المحدد الذي ما زال مطلوباً.','اتفق على نقطة متابعة والتزم بعملية الإفراج المعتمدة.'],
  '“I hear the timing concern. Let us identify the missing evidence and agree when we can review it.”','أفهم القلق بشأن الوقت. لنحدد الدليل الناقص ونتفق متى يمكن مراجعته.',
  'A defensive reply can create another argument; a factual reply makes the next event a shared review task.','قد يخلق الرد الدفاعي جدالاً جديداً؛ أما الرد المبني على الحقائق فيحول الحدث التالي إلى مهمة مراجعة مشتركة.'],
 ['Supply Chain · A late reply','سلسلة التوريد · رد متأخر',
  'A supplier has not replied to a delivery query. You think they are ignoring you, although their reason is unknown.','لم يرد المورد على استفسار التسليم. تعتقد أنه يتجاهلك رغم أنك لا تعرف السبب.',
  ['Write the observable fact mentally: no reply by the agreed checkpoint.','Identify the assumption: they do not care about our deadline.','Consider alternatives: missing information, an approval delay, or an unavailable contact.','Request the confirmed status and use the agreed escalation route if the deadline is reached.'],
  ['حدد الحقيقة ذهنياً: لم يصل الرد في موعد المتابعة.','حدد الافتراض: لا يهتم المورد بموعدنا.','فكر ببدائل: معلومات ناقصة أو تأخر موافقة أو غياب مسؤول التواصل.','اطلب الحالة المؤكدة واستخدم مسار التصعيد المتفق عليه عند بلوغ الموعد.'],
  '“We have not received confirmation. Who can verify the dispatch status by our next checkpoint?”','لم يصلنا تأكيد. من يستطيع التحقق من حالة الشحن قبل نقطة المتابعة القادمة؟',
  'You can act firmly on a missed commitment without claiming to know the supplier’s intent.','يمكنك التعامل بحزم مع التزام لم يتحقق دون ادعاء معرفة نية المورد.'],
 ['Manufacturing · Choosing the response','التصنيع · اختيار الاستجابة',
  'An operator reports a stoppage while the shift target is under pressure. You feel the urge to criticize the team in front of everyone.','يبلغ المشغل عن توقف الخط تحت ضغط هدف الوردية. تشعر برغبة في انتقاد الفريق أمام الجميع.',
  ['Notice your physical warning sign: a raised voice or tense jaw.','Pause briefly while maintaining immediate safety and containment actions.','Ask for the current equipment status and the authorized next step.','Discuss performance privately after facts are established.'],
  ['لاحظ علامة الإنذار الجسدية: ارتفاع الصوت أو شد الفك.','توقف لحظة مع استمرار إجراءات السلامة والاحتواء الفورية.','اسأل عن حالة المعدات والخطوة التالية المعتمدة.','ناقش الأداء بشكل منفرد بعد التحقق من الحقائق.'],
  '“First confirm the line is safe. Then walk me through the last confirmed observation.”','أكد أولاً أن الخط آمن، ثم اشرح لي آخر ملاحظة مؤكدة.',
  'Regulation changes your tone and questions; it does not postpone urgent safety responsibilities.','يغير تنظيم المشاعر نبرتك وأسئلتك، ولا يؤجل مسؤوليات السلامة العاجلة.'],
 ['Engineering · Attention during handover','الهندسة · الانتباه أثناء التسليم',
  'During a maintenance handover you answer messages and miss a pending verification step. Later you cannot tell whether the equipment is ready.','تجيب عن رسائل خلال تسليم الصيانة فتفوتك خطوة تحقق معلقة. لاحقاً لا تعرف هل المعدات جاهزة.',
  ['Stop the competing task before receiving the handover.','Ask the technician to state completed work, remaining checks, and restrictions.','Repeat the critical status in your own words.','Record the owner and next checkpoint before switching tasks.'],
  ['أوقف المهمة المنافسة قبل استلام التسليم.','اطلب توضيح العمل المنجز والفحوص المتبقية والقيود.','أعد صياغة الحالة الحرجة بكلماتك.','سجل المسؤول ونقطة المتابعة قبل الانتقال لمهمة أخرى.'],
  '“Before I return to messages, confirm what remains open and who authorizes the next step.”','قبل العودة للرسائل، أكد ما الذي ما زال مفتوحاً ومن يعتمد الخطوة التالية.',
  'Protected attention reduces missed information and gives the technician a clear opportunity to raise concerns.','يقلل الانتباه المركز فقدان المعلومات ويتيح للفني فرصة واضحة لطرح المخاوف.'],
 ['Sales · Arriving fully present','المبيعات · الحضور الكامل',
  'After a difficult clinic visit, you enter the next appointment still replaying the previous conversation.','بعد زيارة عيادة صعبة تدخل الموعد التالي وأنت تستعيد الحوار السابق.',
  ['Pause before entering and notice one breath without forcing it.','Name what is present: frustration from the previous visit.','Return attention to the purpose of this visit and the person in front of you.','Listen to the opening response before choosing your next question.'],
  ['توقف قبل الدخول ولاحظ نفساً واحداً دون إجباره.','سم الشعور الحالي: إحباط من الزيارة السابقة.','أعد الانتباه لهدف الزيارة الحالية والشخص أمامك.','استمع للرد الأول قبل اختيار سؤالك التالي.'],
  '“What is most relevant for your practice today?”','ما الموضوع الأكثر ارتباطاً بعملك اليوم؟',
  'Presence helps you avoid carrying one interaction’s emotional tone into the next.','يساعدك الحضور على عدم نقل النبرة العاطفية من تفاعل إلى آخر.']
],
2:[
 ['Quality · Fact versus story','الجودة · الحقيقة والتفسير',
  'A reviewer requests your supporting calculation. You interpret the request as a personal challenge to your competence.','يطلب المراجع الحساب الداعم. تفسر الطلب كتحد شخصي لكفاءتك.',
  ['State the fact: a supporting calculation was requested.','Separate the story: the reviewer thinks I cannot do my job.','Check what information the review actually requires.','Respond with evidence or clarify what needs to be completed.'],
  ['حدد الحقيقة: طُلب الحساب الداعم.','افصل التفسير: المراجع يعتقد أنني لا أجيد عملي.','تحقق من المعلومات التي تحتاجها المراجعة فعلياً.','استجب بالدليل أو وضح ما يحتاج إلى استكمال.'],
  '“Which part of the calculation needs clarification?”','أي جزء من الحساب يحتاج إلى توضيح؟',
  'The request can be handled as a review requirement rather than a verdict on your ability.','يمكن التعامل مع الطلب كمتطلب مراجعة بدلاً من اعتباره حكماً على قدرتك.'],
 ['Engineering · From defence to curiosity','الهندسة · من الدفاع إلى الفضول',
  'Manufacturing questions your maintenance recommendation. You want to prove that your technical judgment is superior.','يشكك التصنيع بتوصية الصيانة. ترغب في إثبات تفوق حكمك الفني.',
  ['Notice the need to win the exchange.','Reconnect with the shared goal: reliable equipment within approved requirements.','Ask what operational concern the other team sees.','Compare evidence and agree who will verify the remaining uncertainty.'],
  ['لاحظ رغبتك في كسب النقاش.','عد إلى الهدف المشترك: معدات موثوقة ضمن المتطلبات المعتمدة.','اسأل عن القلق التشغيلي الذي يراه الفريق الآخر.','قارن الأدلة واتفق على مسؤول التحقق من المعلومة غير المؤكدة.'],
  '“What operating condition might my recommendation have missed?”','ما ظرف التشغيل الذي ربما لم تأخذه توصيتي بالحسبان؟',
  'Curiosity allows you to stay accountable without making disagreement a contest over status.','يتيح الفضول المحافظة على المساءلة دون تحويل الاختلاف إلى منافسة على المكانة.'],
 ['Supply Chain · Reading emotional information','سلسلة التوريد · فهم المعلومات العاطفية',
  'A planner repeatedly asks for delivery updates. You feel irritated; the planner may be anxious about a campaign deadline.','يكرر المخطط طلب تحديثات التسليم. تشعر بالانزعاج، وقد يكون قلقاً بشأن موعد الحملة.',
  ['Identify your emotion and its trigger.','Treat the other person’s emotion as a possibility to check, not a fact to assume.','Ask which decision depends on the update.','Agree one update time and clarify what will be confirmed then.'],
  ['حدد شعورك ومحفزه.','اعتبر شعور الطرف الآخر احتمالاً للتحقق وليس حقيقة مفترضة.','اسأل عن القرار الذي يعتمد على التحديث.','اتفق على موعد تحديث واحد وما يمكن تأكيده حينها.'],
  '“Which planning decision do you need to make, and by when?”','ما قرار التخطيط الذي تحتاج لاتخاذه، وبأي موعد؟',
  'Self-awareness and social awareness lead to an intentional communication agreement.','يقود الوعي بالذات وبالآخرين إلى اتفاق تواصل مقصود.'],
 ['Manufacturing · Challenge a thinking trap','التصنيع · اختبار نمط تفكير',
  'One review takes longer than expected. You think: our reviews are always late and the campaign will be a disaster.','تستغرق مراجعة واحدة وقتاً أطول من المتوقع. تفكر: مراجعاتنا دائماً متأخرة وستكون الحملة كارثة.',
  ['Identify overgeneralizing in “always late”.','Identify catastrophizing in the prediction of disaster.','Check the actual review history and the current impact.','Replace the conclusion with a specific question about the remaining review step.'],
  ['حدد التعميم في عبارة دائماً متأخرة.','حدد التهويل في توقع الكارثة.','تحقق من سجل المراجعات والأثر الحالي.','استبدل الحكم بسؤال محدد عن خطوة المراجعة المتبقية.'],
  '“What remains open on this review, and what does the timing data actually show?”','ما الذي ما زال مفتوحاً في هذه المراجعة وماذا تظهر بيانات التوقيت فعلياً؟',
  'Several distortions may occur together. In the game, choose the dominant pattern in each statement.','قد تظهر عدة أنماط معاً. في اللعبة اختر النمط الأبرز في كل عبارة.'],
 ['Sales · Map the emotional zone','المبيعات · تحديد المنطقة العاطفية',
  'After missing a target, you notice low energy and embarrassment. A colleague feels tense and angry about the same result.','بعد عدم تحقيق هدف تلاحظ انخفاض الطاقة والإحراج. زميلك متوتر وغاضب من النتيجة نفسها.',
  ['Name your emotion without labeling yourself as weak.','Notice energy: withdrawn and low, or agitated and high.','Choose a regulating action: reconnect with one manageable task or slow the pace before speaking.','Review the performance facts and agree a controllable next action.'],
  ['سم شعورك دون وصف نفسك بالضعف.','لاحظ الطاقة: انسحاب وانخفاض أم توتر وارتفاع.','اختر إجراء تنظيم مناسباً: مهمة صغيرة قابلة للإنجاز أو إبطاء الإيقاع قبل الحديث.','راجع حقائق الأداء واتفق على خطوة ضمن سيطرتك.'],
  '“I am disappointed. Let us identify one action I can take before the next review.”','أشعر بخيبة أمل. لنحدد خطوة واحدة أستطيع تنفيذها قبل المراجعة القادمة.',
  'The same event can require different regulation strategies depending on emotional energy.','قد يتطلب الحدث نفسه أساليب تنظيم مختلفة بحسب مستوى الطاقة العاطفية.']
],
3:[
 ['Quality · Stay steady under release pressure','الجودة · الثبات تحت ضغط الإفراج',
  'Supply Chain requests a release time before the documentation issue is resolved. You feel cornered and want to promise a deadline.','تطلب سلسلة التوريد وقت الإفراج قبل حل مشكلة التوثيق. تشعر بالضغط وتريد أن تعد بموعد.',
  ['Name the pressure and the urge to reassure.','Separate your emotional discomfort from the authorized release decision.','State the confirmed status and the unresolved requirement.','Commit to the next update, not an unverified release promise.'],
  ['سم الضغط والرغبة في طمأنة الآخرين.','افصل انزعاجك العاطفي عن قرار الإفراج المعتمد.','وضح الحالة المؤكدة والمتطلب غير المحسوم.','التزم بالتحديث القادم وليس بوعد إفراج غير مؤكد.'],
  '“The review is still open. I can confirm the next status update after the evidence check.”','المراجعة ما زالت مفتوحة. أستطيع تأكيد التحديث القادم بعد فحص الدليل.',
  'Emotional strength supports a clear boundary while keeping communication constructive.','تدعم القوة العاطفية وضع حد واضح مع المحافظة على تواصل بناء.'],
 ['Manufacturing · Anger after a missed handover','التصنيع · الغضب بعد تسليم ناقص',
  'A shift handover omits a pending check. You feel angry and assume the previous shift did not care.','أغفل تسليم الوردية فحصاً معلقاً. تغضب وتفترض أن الوردية السابقة لم تهتم.',
  ['Pause before making a judgment about intent.','Confirm the current status and any immediate containment needed.','Ask whether the handover expectation was clear and understood.','Agree the correction, owner, and next handover confirmation.'],
  ['توقف قبل الحكم على النية.','أكد الحالة الحالية وأي احتواء فوري مطلوب.','اسأل هل كان توقع التسليم واضحاً ومفهوماً.','اتفق على التصحيح والمسؤول وتأكيد التسليم القادم.'],
  '“This check is missing from the handover. Help me understand what happened and what remains open.”','هذا الفحص غير مذكور في التسليم. ساعدني أفهم ما حدث وما الذي ما زال مفتوحاً.',
  'You address the gap without using anger to define the other team’s character.','تعالج الفجوة دون استخدام الغضب للحكم على شخصية الفريق الآخر.'],
 ['Supply Chain · Fear of a shortage','سلسلة التوريد · الخوف من النقص',
  'A material is delayed five days. You imagine all production stopping, although usable inventory has not yet been checked.','تتأخر مادة خمسة أيام. تتخيل توقف الإنتاج بالكامل رغم عدم التحقق من المخزون القابل للاستخدام.',
  ['Label the feared outcome as a possibility, not a confirmed event.','Verify inventory status, consumption timing, and the supplier’s confirmed dispatch information.','Identify approved alternatives with the responsible functions.','Provide a range based on evidence and schedule the next verification.'],
  ['سم النتيجة المخيفة احتمالاً وليس حدثاً مؤكداً.','تحقق من حالة المخزون وموعد الاستهلاك ومعلومات الشحن المؤكدة.','حدد البدائل المعتمدة مع الوظائف المسؤولة.','قدم تقديراً مبنياً على الأدلة وحدد موعد التحقق القادم.'],
  '“Before changing the campaign, let us verify the usable stock and the actual material need date.”','قبل تغيير الحملة، لنتحقق من المخزون القابل للاستخدام وموعد الاحتياج الفعلي.',
  'Fear becomes a prompt to verify and prepare rather than an instruction to announce the worst case.','يتحول الخوف إلى دافع للتحقق والاستعداد بدلاً من إعلان أسوأ احتمال.'],
 ['Engineering · Repair after a mistake','الهندسة · الإصلاح بعد الخطأ',
  'You discover that your maintenance handover omitted a test reference. You feel ashamed and want to avoid the next meeting.','تكتشف أن تسليم الصيانة الذي أعددته أغفل مرجع فحص. تشعر بالخجل وتريد تجنب الاجتماع القادم.',
  ['Describe the specific omission without turning it into “I am a failure”.','Raise the issue promptly through the appropriate process.','Clarify the verified equipment status and the required correction.','Own the follow-up and attend the review with evidence.'],
  ['صف النقص المحدد دون تحويله إلى أنا فاشل.','أبلغ عن المسألة سريعاً عبر العملية المناسبة.','وضح حالة المعدات المؤكدة والتصحيح المطلوب.','تحمل مسؤولية المتابعة واحضر المراجعة بالدليل.'],
  '“I missed the reference in my handover. Here is the confirmed status and the correction I am coordinating.”','أغفلت المرجع في التسليم. هذه الحالة المؤكدة وهذا التصحيح الذي أنسقه.',
  'Guilt can guide repair; a global judgment about yourself can lead to withdrawal.','قد يدفع الذنب إلى الإصلاح؛ أما الحكم الشامل على ذاتك فقد يقود للانسحاب.'],
 ['Sales · Envy after a colleague’s recognition','المبيعات · الحسد بعد تقدير زميل',
  'A colleague is selected for a regional meeting. You feel overlooked and consider withdrawing from shared projects.','يُختار زميل لاجتماع إقليمي. تشعر بالتجاهل وتفكر بالانسحاب من المشاريع المشتركة.',
  ['Name the disappointment and comparison privately.','Ask what capability the opportunity required.','Identify one skill you can learn from the selected colleague.','Agree a development action and a future review with your manager.'],
  ['سم خيبة الأمل والمقارنة بينك وبين نفسك.','اسأل عن القدرة التي تطلبتها الفرصة.','حدد مهارة واحدة تستطيع تعلمها من الزميل المختار.','اتفق مع مديرك على خطوة تطوير ومراجعة لاحقة.'],
  '“What can I build to be ready for a similar opportunity, and how can I practise it?”','ما الذي أستطيع تطويره للاستعداد لفرصة مشابهة وكيف أتدرب عليه؟',
  'Another person’s success becomes information for your development rather than a measure of your worth.','يصبح نجاح الآخر معلومة لتطويرك بدلاً من مقياس لقيمتك.'],
 ['Across functions · Apply STOP','عبر الوظائف · تطبيق STOP',
  'During a line stoppage, Production, Engineering, and Supply Chain ask for different commitments. You cannot control all their expectations.','خلال توقف الخط تطلب أقسام الإنتاج والهندسة والتوريد التزامات مختلفة. لا يمكنك التحكم بجميع توقعاتهم.',
  ['Step Back: lower your pace and notice the urge to promise too much.','Think Again: replace “everyone blames me” with “they need a reliable status”.','Organize: separate confirmed facts, assumptions, owners, and required approvals.','Proceed: communicate one agreed next action and checkpoint while urgent controls continue.'],
  ['تراجع خطوة: أبطئ الإيقاع ولاحظ الرغبة في تقديم وعود زائدة.','أعد التفكير: استبدل الجميع يلومني بعبارة يحتاجون حالة موثوقة.','نظم: افصل الحقائق المؤكدة والافتراضات والمسؤولين والموافقات المطلوبة.','تقدم: أبلغ بخطوة تالية ونقطة متابعة متفق عليهما مع استمرار الضوابط العاجلة.'],
  '“Here is what is confirmed, what remains unknown, and who will verify it before the next update.”','هذا ما تأكد، وهذا ما لم يتأكد بعد، وهذا مسؤول التحقق قبل التحديث القادم.',
  'You control preparation, tone, questions, and follow-through; you coordinate the rest with the accountable functions.','تتحكم باستعدادك ونبرتك وأسئلتك ومتابعتك، وتنسق الباقي مع الوظائف المسؤولة.']
]};
const originalLearnEI=renderDetailedLearn;
renderDetailedLearn=function(m) {
 return m.detail[lang].map((lesson,i)=>{
  const source=originalLearnEI({detail:{[lang]:[lesson]}}).replace(/(LESSON|الدرس) 1/,`$1 ${i+1}`);
  const w=WORKED_EI[m.id][i],ar=lang==='ar',steps=w[ar?5:4];
  const done=!!EI_STATE.lessons?.[m.id]?.[i];
  return source+`<section class="eipanel pharma-example ${done?'lesson-done':''}"><span class="ribbon">${localText(bi('WORKED PHARMA EXAMPLE','مثال دوائي محلول'))}</span><h3>${w[ar?1:0]}</h3><p>${w[ar?3:2]}</p><h4>${localText(bi('Apply it step by step','التطبيق خطوة بخطوة'))}</h4><ol>${steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="insight"><b>${localText(bi('Words you can use','عبارة يمكنك استخدامها'))}</b><p>${w[ar?7:6]}</p></div><p><b>${localText(bi('Why this helps:','لماذا يفيد ذلك:'))}</b> ${w[ar?9:8]}</p><button class="next lesson-completion" data-lesson="${m.id}-${i}" ${done?'disabled':''} onclick="completeEILesson(${m.id},${i})">${done?localText(bi('✓ Completed','✓ مكتمل')):localText(bi('Mark Lesson Complete','تحديد الدرس كمكتمل'))}</button></section>`;
 }).join('');
};

const SCENE_EI={
 quality:{
  actor:bi('the QA reviewer','مراجع الجودة'),peer:bi('the Production supervisor','مشرف الإنتاج'),owner:bi('the Quality manager','مدير الجودة'),
  subject:bi('the batch-record discrepancy','التباين في سجل التشغيلة'),evidence:bi('the original entry and its supporting record','القيد الأصلي والسجل الداعم'),
  next:[bi('Supply Chain now needs a shipment update, but the batch review remains open.','تحتاج سلسلة التوريد الآن تحديثاً للشحن، لكن مراجعة التشغيلة ما زالت مفتوحة.'),bi('A second page contains a different time entry; its source has not yet been checked.','تحتوي صفحة ثانية وقتاً مختلفاً ولم يتم التحقق من مصدره بعد.'),bi('The source check is now available. The authorized reviewer still needs to decide the disposition and document the rationale.','أصبحت نتيجة التحقق من المصدر متاحة. ما زال المراجع المخول بحاجة لتحديد القرار وتوثيق مبرراته.'),bi('The review owner has your final update; any release remains subject to the authorized quality process.','وصل التحديث النهائي لمسؤول المراجعة، ويبقى أي إفراج خاضعاً لعملية الجودة المعتمدة.')],
  extra:bi('Supply Chain is circulating a shipment time that the reviewer has not confirmed. You must reconcile that expectation as well as the record issue.','تتداول سلسلة التوريد موعد شحن لم يؤكده المراجع. عليك معالجة هذا التوقع إلى جانب مشكلة السجل.')},
 manufacturing:{
  actor:bi('the line engineer','مهندس الخط'),peer:bi('the shift supervisor','مشرف الوردية'),owner:bi('the Manufacturing manager','مدير التصنيع'),
  subject:bi('the packaging-line stoppage','توقف خط التعبئة'),evidence:bi('the fault log and confirmed equipment status','سجل العطل وحالة المعدات المؤكدة'),
  next:[bi('Planning asks whether the next shift can use the line; Engineering has not yet confirmed readiness.','يسأل التخطيط هل تستطيع الوردية التالية استخدام الخط، ولم تؤكد الهندسة الجاهزية بعد.'),bi('A technician reports a possible sensor issue, but the diagnostic check is incomplete.','يبلغ فني عن احتمال وجود مشكلة حساس، لكن الفحص التشخيصي غير مكتمل.'),bi('The diagnostic result is available. Authorized checks and restart clearance still need to be confirmed.','أصبحت نتيجة التشخيص متاحة، وما زال مطلوباً تأكيد الفحوص والتصريح المعتمد بإعادة التشغيل.'),bi('The shift team receives the final status; the line remains governed by the approved restart requirements.','يستلم فريق الوردية الحالة النهائية، ويبقى تشغيل الخط خاضعاً لمتطلبات إعادة التشغيل المعتمدة.')],
  extra:bi('Planning has already reassigned operators using an unconfirmed restart time. You now also need to correct the staffing assumption.','أعاد التخطيط توزيع المشغلين بناءً على وقت تشغيل غير مؤكد. عليك الآن أيضاً تصحيح افتراض توزيع الموظفين.')},
 supply:{
  actor:bi('the supplier coordinator','منسق المورد'),peer:bi('the production planner','مخطط الإنتاج'),owner:bi('the Supply Chain manager','مدير سلسلة التوريد'),
  subject:bi('the delayed critical material','المادة الحرجة المتأخرة'),evidence:bi('usable inventory, demand timing, and dispatch confirmation','المخزون القابل للاستخدام وموعد الاحتياج وتأكيد الشحن'),
  next:[bi('Manufacturing needs a campaign decision today, while the supplier has not confirmed dispatch.','يحتاج التصنيع قراراً بشأن الحملة اليوم، بينما لم يؤكد المورد الشحن.'),bi('A warehouse message mentions stock, but its usable status and allocation are not yet verified.','تذكر رسالة المستودع وجود مخزون، لكن صلاحيته للاستخدام وتخصيصه لم يتم التحقق منهما.'),bi('The inventory check is available. Planning still needs an agreed schedule based on usable stock and confirmed commitments.','أصبح فحص المخزون متاحاً. ما زال التخطيط يحتاج جدولاً متفقاً عليه يعتمد على المخزون القابل للاستخدام والالتزامات المؤكدة.'),bi('Planning receives the final supply update; any alternative material still follows the required approvals.','يستلم التخطيط التحديث النهائي للتوريد، وتبقى أي مادة بديلة خاضعة للموافقات المطلوبة.')],
  extra:bi('Two departments are now working from different delivery dates. You must reconcile their plans before another commitment is made.','يعمل قسمان الآن وفق موعدي تسليم مختلفين. عليك توحيد الخطط قبل تقديم التزام جديد.')},
 sales:{
  actor:bi('the selected colleague','الزميل المختار'),peer:bi('the team supervisor','مشرف الفريق'),owner:bi('the Sales manager','مدير المبيعات'),
  subject:bi('the regional-meeting selection','اختيار ممثل الاجتماع الإقليمي'),evidence:bi('the selection criteria and required presentation capability','معايير الاختيار وقدرة العرض المطلوبة'),
  next:[bi('Your colleague asks for help preparing the regional presentation while you are still disappointed.','يطلب زميلك مساعدتك في تجهيز العرض الإقليمي بينما ما زلت تشعر بخيبة الأمل.'),bi('You hear that another opportunity may open next quarter, but its requirements have not been announced.','تسمع أن فرصة أخرى قد تتاح في الربع القادم، لكن متطلباتها لم تعلن.'),bi('Your manager has explained the criteria. The next step is to agree how you will practise the relevant capability.','شرح مديرك المعايير. الخطوة القادمة هي الاتفاق على كيفية التدريب على القدرة المطلوبة.'),bi('The team has your final response; future selection still depends on the announced criteria and demonstrated readiness.','وصل ردك النهائي للفريق، ويبقى الاختيار القادم معتمداً على المعايير المعلنة والجاهزية المثبتة.')],
  extra:bi('A colleague has repeated your concerns as a complaint about favoritism. You must clarify what you actually know and rebuild the working conversation.','نقل زميل مخاوفك كشكوى عن المحاباة. عليك توضيح ما تعرفه فعلياً وإعادة بناء الحوار المهني.')},
 engineering:{
  actor:bi('the maintenance technician','فني الصيانة'),peer:bi('the Manufacturing supervisor','مشرف التصنيع'),owner:bi('the Engineering manager','مدير الهندسة'),
  subject:bi('the breakdown after maintenance','العطل بعد الصيانة'),evidence:bi('the maintenance record and current failure evidence','سجل الصيانة وأدلة العطل الحالي'),
  next:[bi('Manufacturing requests a recovery time and asks whether the maintenance checks were completed.','يطلب التصنيع وقت الاستعادة ويسأل هل اكتملت فحوص الصيانة.'),bi('A technician finds a possible mismatch between a test reference and the handover record; it is not yet verified.','يجد الفني اختلافاً محتملاً بين مرجع فحص وسجل التسليم، ولم يتم التحقق منه بعد.'),bi('The record check is available. The responsible functions still need to confirm corrective work and equipment readiness.','أصبح فحص السجل متاحاً. ما زالت الوظائف المسؤولة بحاجة لتأكيد العمل التصحيحي وجاهزية المعدات.'),bi('Manufacturing receives your final handover; equipment use remains subject to the required readiness checks and authorization.','يستلم التصنيع التسليم النهائي، ويبقى استخدام المعدات خاضعاً لفحوص الجاهزية والتصريح المطلوبين.')],
  extra:bi('Manufacturing and Engineering are keeping separate accounts of what happened. You now need to reconcile the evidence before either account becomes the accepted explanation.','يحتفظ التصنيع والهندسة بروايتين منفصلتين لما حدث. عليك الآن توحيد الأدلة قبل اعتماد أي رواية كتفسير نهائي.')}
};
function simConsequence(key,stage,choice,pressure) {
 const s=SCENE_EI[key],a=localText(s.actor),p=localText(s.peer),o=localText(s.owner),t=localText(s.subject),e=localText(s.evidence),ar=lang==='ar';
 const outcomes=[
  [bi(`${a} shares ${e}. ${p} now asks which fact will determine the next action.`,`${a} يشارك ${e}. يسأل ${p} الآن عن الحقيقة التي ستحدد الخطوة التالية.`),
   bi(`${a} stops explaining the sequence and starts defending their work. ${p} asks for the same evidence again; the account of ${t} is still incomplete.`,`${a} يتوقف عن شرح التسلسل ويبدأ بالدفاع عن عمله. يطلب ${p} الأدلة مجدداً، وما زالت رواية ${t} غير مكتملة.`),
   bi(`The team starts preparing an action on ${t} before checking ${e}. ${p} asks who verified the basis for that action.`, `يبدأ الفريق تجهيز إجراء بشأن ${t} قبل فحص ${e}. يسأل ${p} من تحقق من أساس هذا الإجراء.`),
   bi(`${p} asks ${a} to justify their part in ${t}. The conversation moves to responsibility while ${e} is still missing.`,`${p} يطلب من ${a} تبرير دوره في ${t}. ينتقل الحوار إلى المسؤولية بينما ما زال ${e} ناقصاً.`)],
  [bi(`${p} agrees to use one verified status for ${t}. ${a} identifies the remaining check and asks when to return with its result.`,`${p} يوافق على استخدام حالة مؤكدة واحدة بشأن ${t}. يحدد ${a} الفحص المتبقي ويسأل عن موعد تقديم نتيجته.`),
   bi(`${p} challenges your explanation of ${t}. ${a} waits while you defend your position; nobody has yet taken ownership of the remaining check.`,`${p} يناقش تفسيرك بشأن ${t}. ينتظر ${a} بينما تدافع عن موقفك، ولم يتحمل أحد مسؤولية الفحص المتبقي بعد.`),
   bi(`${a} starts planning a quick solution for ${t}. ${p} asks whether ${e} supports it; the team now has a proposed action and an unanswered verification question.`,`${a} يبدأ التخطيط لحل سريع بشأن ${t}. يسأل ${p} هل يدعمه ${e}؛ أصبح لدى الفريق إجراء مقترح وسؤال تحقق دون إجابة.`),
   bi(`${o} joins and requests a factual summary of ${t}. ${a} and ${p} each provide a different account, so you must establish a shared timeline first.`,`${o} ينضم ويطلب ملخصاً واقعياً بشأن ${t}. يقدم ${a} و${p} روايتين مختلفتين، وعليك تثبيت تسلسل زمني مشترك أولاً.`)],
  [bi(`${a} separates the confirmed part of ${e} from the unverified report. ${p} agrees to wait for the named verification checkpoint before revising the plan.`,`${a} يفصل الجزء المؤكد من ${e} عن البلاغ غير المتحقق منه. يوافق ${p} على انتظار نقطة التحقق المحددة قبل تعديل الخطة.`),
   bi(`${p} revises a plan using your interpretation of ${t}. ${a} then says the new information is still unverified; a second correction may now be needed.`,`${p} يعدل خطة باستخدام تفسيرك بشأن ${t}. يوضح ${a} لاحقاً أن المعلومة الجديدة غير مؤكدة؛ وقد أصبح تصحيح ثان مطلوباً.`),
   bi(`Your interpretation of ${t} reaches ${o} as a confirmed explanation. ${a} cannot yet support it with ${e}; you must correct the message and coordinate the check.`, `يصل تفسيرك بشأن ${t} إلى ${o} كتفسير مؤكد. لا يستطيع ${a} دعمه حتى الآن بواسطة ${e}؛ وعليك تصحيح الرسالة وتنسيق الفحص.`),
   bi(`${p} receives no update about ${t} and starts making their own assumptions. ${o} requests an interim status, even though the full check is not complete.`,`${p} لا يتلقى تحديثاً بشأن ${t} ويبدأ بوضع افتراضاته. يطلب ${o} حالة مؤقتة رغم عدم اكتمال الفحص الشامل.`)],
  [bi(`${o} receives the confirmed facts, your controllable gap, and a named follow-up owner for ${t}. ${p} can now work from the same documented status.`,`${o} يتلقى الحقائق المؤكدة والفجوة ضمن سيطرتك ومسؤول متابعة محدداً بشأن ${t}. يستطيع ${p} الآن العمل وفق الحالة الموثقة نفسها.`),
   bi(`${o} hears the external reasons for ${t}, but asks again what you will own. ${p} leaves without a clear follow-up owner.`,`${o} يسمع الأسباب الخارجية بشأن ${t} لكنه يسأل مجدداً عما ستتحمل مسؤوليته. يغادر ${p} دون وضوح مسؤول المتابعة.`),
   bi(`${p} closes the immediate discussion about ${t}. ${o} asks for a review date and owner, but neither has been agreed yet.`,`${p} ينهي النقاش الفوري بشأن ${t}. يطلب ${o} موعد مراجعة ومسؤولاً عنها، لكن لم يتم الاتفاق على أي منهما بعد.`),
   bi(`${o} asks what “stronger control” will mean for ${t}. ${a} and ${p} have no specific action or checkpoint to follow.`,`${o} يسأل عما تعنيه سيطرة أقوى بشأن ${t}. لا يملك ${a} و${p} إجراء محدداً أو نقطة متابعة للعمل وفقها.`)]
 ];
 let complication='';
 if(pressure>=2) {
  if(stage<2)complication=localText(s.extra);
  else if(stage===2)complication=localText(bi(`${o} now requests a joint update with ${p}; separate explanations about ${t} will no longer be sufficient.`,`${o} يطلب الآن تحديثاً مشتركاً مع ${p}؛ لم تعد التفسيرات المنفصلة بشأن ${t} كافية.`));
  else complication=localText(bi(`${o} schedules another review of ${t} because the earlier conflicting commitments still need reconciliation.`,`${o} يحدد مراجعة إضافية بشأن ${t} لأن الالتزامات المتعارضة السابقة ما زالت تحتاج إلى توحيد.`));
 }
 const salesOpening=[
  bi('Your manager explains that the meeting requires a particular presentation capability. Your colleague asks for your help preparing a section you know well.','يوضح مديرك أن الاجتماع يتطلب قدرة عرض محددة. يطلب زميلك مساعدتك بتجهيز جزء تعرفه جيداً.'),
  bi('You keep comparing your results with your colleague’s and miss part of their preparation request. They repeat the request, unsure whether you are willing to help.','تستمر بمقارنة نتائجك بنتائج زميلك وتفوتك بعض تفاصيل طلب التحضير. يعيد الزميل الطلب وهو غير متأكد من رغبتك بالمساعدة.'),
  bi('You step back from the shared preparation task. Your supervisor asks who will cover your contribution, and the presentation now has an unassigned section.','تنسحب من مهمة التحضير المشتركة. يسأل مشرفك عمن سيغطي مساهمتك، وأصبح في العرض جزء دون مسؤول.'),
  bi('Colleagues begin speculating about the selection. The selected colleague hears that you questioned it, and asks whether your concern is about their capability or the selection process.','يبدأ الزملاء بالتكهن بسبب الاختيار. يسمع الزميل المختار أنك ناقشته ويسأل هل قلقك متعلق بقدرته أم بعملية الاختيار.')
 ];
 const outcome=key==='sales'&&stage===0?salesOpening[choice]:outcomes[stage][choice];
 const result=localText(outcome)+' '+localText(s.next[stage])+(complication?' '+complication:'');
 return ar?result:result.replace(/(^|[.!?]\s+)([a-z])/g,(_,prefix,letter)=>prefix+letter.toUpperCase());
}
const simExplanationEI=[
 bi('Pause and check the story before treating another person’s intent as fact. Ask for evidence while preserving immediate safety and quality controls.','توقف واختبر التفسير قبل اعتبار نية الآخر حقيقة. اطلب الدليل مع المحافظة على ضوابط السلامة والجودة الفورية.'),
 bi('Organize the discussion around a shared fact, an owner, and a checkpoint. Escalation can be appropriate when required; using it only to transfer blame leaves the decision gap unresolved.','نظم الحوار حول حقيقة مشتركة ومسؤول ونقطة متابعة. قد يكون التصعيد مطلوباً، لكن استخدامه لنقل اللوم فقط يبقي فجوة القرار دون حل.'),
 bi('Separate verified information from assumptions. An interim update can state what is known, what is unknown, and when verification is due.','افصل المعلومات المؤكدة عن الافتراضات. يمكن للتحديث المؤقت توضيح المعروف وغير المعروف وموعد التحقق.'),
 bi('Proceed with a specific commitment you control. Name the follow-up action, owner, and checkpoint instead of offering general reassurance or focusing only on external causes.','تقدم بالتزام محدد ضمن سيطرتك. حدد إجراء المتابعة ومسؤوله ونقطة مراجعته بدلاً من طمأنة عامة أو التركيز فقط على الأسباب الخارجية.')
];
startSim=function(key) {
 sim={key,i:0,pressure:0,score:0,choices:[],history:[],orders:SIMQ.map(()=>shuffleEI([0,1,2,3])),done:false,show:false};
 renderEI();
};
pickSim=function(displayIndex) {
 const choice=sim.orders[sim.i][displayIndex],stage=sim.i;
 if(choice===SIMQ[stage].best){sim.score++;sim.pressure=Math.max(0,sim.pressure-1);}else sim.pressure++;
 sim.choices.push(choice);sim.history.push({stage,choice,pressure:sim.pressure});sim.i++;
 if(sim.i>=SIMQ.length){sim.done=true;recordEISimulationCompletion();}
 renderEI();
};
const originalSimEI=renderSim;
renderSim=function() {
 if(!sim)return originalSimEI();
 if(sim.done)return renderReport(SIMS[sim.key]);
 const s=SIMS[sim.key],q=SIMQ[sim.i],opts=(q.opts[sim.key]||q.opts.all)[lang],last=sim.history.at(-1);
 const event=last?simConsequence(sim.key,last.stage,last.choice,last.pressure):s.intro[lang];
 const branch=sim.i===1?bi('The next stakeholder needs a response. What do you do now?','يحتاج صاحب المصلحة التالي استجابة. ماذا تفعل الآن؟'):sim.i===2?bi('The new information is incomplete. How will you handle the next update?','المعلومة الجديدة غير مكتملة. كيف تتعامل مع التحديث القادم؟'):sim.i===3?bi('How do you close your update and agree the follow-up?','كيف تنهي تحديثك وتتفق على المتابعة؟'):q.q;
 return `<section class="simcard"><span class="ribbon">${s.lab[lang]}</span><h3>${s.title[lang]}</h3><p>${localText(bi('Decision','قرار'))} ${sim.i+1}/4</p><div class="simevent">${event}</div><h3>${localText(branch)}</h3>${sim.orders[sim.i].map((canonical,i)=>`<button class="simopt" onclick="pickSim(${i})">${String.fromCharCode(65+i)}. ${opts[canonical]}</button>`).join('')}</section>`;
};
renderReport=function(s) {
 const last=sim.history.at(-1),end=simConsequence(sim.key,last.stage,last.choice,last.pressure);
 if(!sim.show)return `<section class="simcard"><span class="ribbon">${localText(bi('SIMULATION COMPLETE','اكتملت المحاكاة'))}</span><h3>${s.title[lang]}</h3><div class="simevent">${end}</div><p>${localText(bi('Your decisions shaped the situation. Open your report to review the full journey.','شكلت قراراتك تطور الموقف. افتح تقريرك لمراجعة الرحلة كاملة.'))}</p><button class="next" onclick="sim.show=true;renderEI()">${localText(bi('Get My Simulation Report','احصل على تقرير المحاكاة'))}</button></section>`;
 EI_STATE.simDone=true;updateEICompletion();
 const pct=Math.round(sim.score/4*100);
 return `<section class="simcard"><span class="ribbon">${localText(bi('YOUR SIMULATION REPORT','تقرير المحاكاة'))}</span><h3>${s.title[lang]}</h3><div class="reportgrid"><div class="metric">${localText(bi('Decision Quality','جودة القرار'))}<b>${pct}%</b></div><div class="metric">${localText(bi('Pressure at Close','الضغط عند النهاية'))}<b>${Math.min(100,25+sim.pressure*20)}%</b></div></div><p>${localText(bi('This practice result describes this attempt, not a diagnosis or a fixed personality type.','تصف نتيجة التدريب هذه المحاولة، وليست تشخيصاً أو نمط شخصية ثابتاً.'))}</p>${sim.history.map(h=>{const q=SIMQ[h.stage],opts=(q.opts[sim.key]||q.opts.all)[lang];return `<div class="decision"><h4>${localText(bi('Decision','قرار'))} ${h.stage+1}</h4><p><b>${localText(bi('Your choice:','اختيارك:'))}</b> ${opts[h.choice]}</p><p><b>${localText(bi('What happened next:','ما حدث بعد ذلك:'))}</b> ${simConsequence(sim.key,h.stage,h.choice,h.pressure)}</p><p><b>${localText(bi('Recommended response:','الاستجابة الموصى بها:'))}</b> ${opts[q.best]}</p><div class="insight">${localText(simExplanationEI[h.stage])}</div></div>`;}).join('')}<div class="match-actions"><button class="next" onclick="startSim('${sim.key}')">${localText(bi('Repeat This Situation','أعد نفس الموقف'))}</button><button class="secondary" onclick="sim=null;renderEI()">${localText(bi('Try Another Situation','جرّب موقفاً آخر'))}</button><button class="secondary" onclick="window.print()">${localText(bi('Print / Save Report','طباعة / حفظ التقرير'))}</button></div></section>`;
};

// Preserve completed work from previous versions while tracking individual lessons.
if(!EI_STATE.completionV4) {
 EI_STATE.lessons=EI_STATE.lessons||{};
 EI_STATE.legacyCompletedModules={};
 for(const m of EI_MODS)if(EI_STATE.modules[m.id]) {
  EI_STATE.legacyCompletedModules[m.id]=true;
  EI_STATE.lessons[m.id]=Object.fromEntries(m.detail.en.map((_,i)=>[i,true]));
 }
 EI_STATE.completionV4=true;saveEIState();
}
function eiModuleTasks(id) {
 const m=EI_MODS.find(x=>x.id===id),legacy=EI_STATE.legacyCompletedModules?.[id];
 const learned=m.detail.en.filter((_,i)=>EI_STATE.lessons?.[id]?.[i]).length;
 const practice=id===1?EI_STATE.practice.m1a!==undefined&&EI_STATE.practice.m1b!==undefined:id===2?!!EI_STATE.practice.distortionMatchDone:!!EI_STATE.simDone;
 return {learned,total:m.detail.en.length,learn:learned===m.detail.en.length,check:!!(legacy||EI_STATE.checks[id]?.done),practice:!!(legacy||practice)};
}
const completionWithPracticeEI=updateEICompletion;
updateEICompletion=function() {
 completionWithPracticeEI();
 for(const m of EI_MODS) {
  const t=eiModuleTasks(m.id);
  EI_STATE.modules[m.id]=!!(EI_STATE.legacyCompletedModules?.[m.id]||(t.learn&&t.check&&t.practice));
 }
 saveEIState();
};
function completeEILesson(id,index) {
 const m=EI_MODS.find(x=>x.id===id);
 if(!m||!Number.isInteger(index)||index<0||index>=m.detail.en.length)return;
 EI_STATE.lessons=EI_STATE.lessons||{};EI_STATE.lessons[id]=EI_STATE.lessons[id]||{};
 EI_STATE.lessons[id][index]=true;updateEICompletion();renderEI();
 const next=document.querySelector(`[data-lesson="${id}-${index}"]`);
 if(next)next.focus();
}
function renderEIPreCard() {
 const done=EI_STATE.preDone;
 return `<section class="eipanel assessment-progress ${done?'completed-card':''}"><span class="completion-badge">${localText(done?bi('✓ Completed','✓ مكتمل'):bi('Not Started','لم يبدأ'))}</span><h3>${localText(bi('Pre-Assessment','التقييم القبلي'))}</h3><p>${localText(done?bi('Your first completed result is saved as your baseline.','تم حفظ نتيجة محاولتك الأولى المكتملة كخط أساس.'):bi('Complete this once to establish your learning baseline.','أكمل هذا التقييم مرة واحدة لتحديد خط أساس التعلم.'))}</p>${done?`<p class="baseline-score">${EI_STATE.preScore??'—'}%</p><button class="secondary" onclick="showEIResults()">${localText(bi('View Results','عرض النتائج'))}</button>`:`<button class="next" onclick="startEIAssess('pre')">${localText(bi('Start Pre-Assessment','ابدأ التقييم القبلي'))}</button>`}</section>`;
}
function renderEIProgressCard(m) {
 const t=eiModuleTasks(m.id),done=EI_STATE.modules[m.id],started=t.learned>0||t.check||t.practice;
 return `<button type="button" class="eimod ei-progress-card ${done?'completed-card':started?'started-card':''}" onclick="eiModule=${m.id};eiTab='learn';renderEI()"><span class="completion-badge">${localText(done?bi('✓ Completed','✓ مكتمل'):started?bi('In Progress','قيد التقدم'):bi('Not Started','لم يبدأ'))}</span><span class="ribbon">${localText(bi('MODULE','الوحدة'))} ${m.id}</span><h3>${m.t[lang]}</h3><p>${m.c[lang]}</p><p>${localText(t.learn?bi('✓ Learn completed','✓ الشرح مكتمل'):bi('Learn not completed','الشرح غير مكتمل'))}</p><div class="module-progress-track" aria-hidden="true"><span style="width:${Math.round((t.learned+Number(t.check)+Number(t.practice))/(t.total+2)*100)}%"></span></div><span class="module-open">${localText(done?bi('Review Module','مراجعة الوحدة'):bi('Continue Module','متابعة الوحدة'))}</span></button>`;
}
const originalModuleProgressEI=renderEIModule;
renderEIModule=function() {
 const t=eiModuleTasks(eiModule),done=EI_STATE.modules[eiModule];
 const badge=`<span class="completion-badge">${localText(done?bi('✓ Completed','✓ مكتمل'):bi('In Progress','قيد التقدم'))}</span>`;
 const result=originalModuleProgressEI().replace('<section class="eihero">',`<section class="eihero ${done?'completed-hero':''}">${badge}`);
 const tasks=[{ok:t.learn,label:bi('Learn','التعلّم'),tab:'learn'},{ok:t.check,label:bi('Knowledge Check','اختبار الفهم'),tab:'check'},{ok:t.practice,label:eiModule===3?bi('Decision Simulation','محاكاة القرار'):bi('Practice Activity','نشاط التطبيق'),tab:eiModule===3?'simulation':'practice'}];
 return result+`<section class="eipanel completion-checklist ${done?'completed-card':''}" aria-live="polite"><h3>${localText(done?bi('✓ Module Completed','✓ الموديول مكتمل'):bi('Your Module Progress','تقدمك في الموديول'))}</h3><div class="completion-tasks">${tasks.map(x=>`<button class="secondary ${x.ok?'task-done':''}" onclick="eiTab='${x.tab}';renderEI()">${x.ok?'✓':'○'} ${localText(x.label)}</button>`).join('')}</div><p>${localText(done?bi('Your completion is saved. You can return to review this module anytime.','تم حفظ الإكمال. يمكنك العودة لمراجعة الموديول في أي وقت.'):bi('Complete Learn, the Knowledge Check, and the practice activity to complete this module.','أكمل الشرح واختبار الفهم ونشاط التطبيق لإكمال الموديول.'))}</p><button class="next" onclick="eiModule=null;renderEI()">${localText(bi('Back to Course','العودة للكورس'))}</button></section>`;
};
updateEICompletion();

function recordEISimulationCompletion() {
 if(!sim?.done||!SIMS[sim.key])return;
 EI_STATE.completedSimulations=EI_STATE.completedSimulations||{};
 EI_STATE.completedSimulations[sim.key]=true;
 EI_STATE.simDone=true;updateEICompletion();
}
const simulationWithConsequencesEI=renderSim;
renderSim=function() {
 if(sim)return simulationWithConsequencesEI();
 const done=!!EI_STATE.simDone;
 return `<section class="eipanel ${done?'completed-card':''}"><span class="ribbon">${localText(bi('DECISION SIMULATION','محاكاة القرار'))}</span>${done?` <span class="completion-badge" role="status">${localText(bi('✓ Completed','✓ مكتمل'))}</span>`:''}<h3>${localText(bi('Lead Yourself Under Pressure','قد نفسك تحت الضغط'))}</h3><p>${localText(bi('Choose a pharma situation. No feedback appears while you decide. Poor choices silently increase pressure and make the next stage harder. One consolidated report appears only at the end.','اختر موقفاً دوائياً. لن تظهر تغذية راجعة أثناء القرار. الاختيارات الأضعف تزيد الضغط بصمت وتجعل المرحلة التالية أصعب. يظهر تقرير واحد فقط في النهاية.'))}</p>${done?`<p>${localText(bi('Your completion is saved. Repeat a completed situation or try another.','تم حفظ إكمالك. يمكنك إعادة موقف مكتمل أو تجربة موقف آخر.'))}</p>`:''}<div class="simchoices">${Object.keys(SIMS).map(key=>{const completed=!!EI_STATE.completedSimulations?.[key];return `<button class="${completed?'completed-card':''}" onclick="startSim('${key}')">${SIMS[key].lab[lang]}${completed?`<br><span>${localText(bi('✓ Completed','✓ مكتمل'))}</span>`:''}</button>`;}).join('')}</div></section>`;
};
const reportWithConsequencesEI=renderReport;
renderReport=function(s) {
 recordEISimulationCompletion();
 return reportWithConsequencesEI(s).replace('<span class="ribbon">',`<span class="completion-badge" role="status">${localText(bi('✓ Completed','✓ مكتمل'))}</span> <span class="ribbon">`);
};
const simulationTabNameEI=tabName;
tabName=function(tab){return (tab==='simulation'&&EI_STATE.simDone?'✓ ':'')+simulationTabNameEI(tab);};
