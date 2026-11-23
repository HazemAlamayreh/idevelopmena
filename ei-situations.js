/* Concise, situation-led Learn lessons; the three-module structure is unchanged. */
const SQ=(en,ar,options,whyEn,whyAr)=>({q:bi(en,ar),options:options.map(x=>bi(x[0],x[1])),why:bi(whyEn,whyAr),best:0});
const SITUATION_LESSONS={
1:[
 {take:bi('Notice the event, the story you tell yourself, and the reaction it could trigger.','لاحظ الحدث وتفسيرك له ورد الفعل الذي قد ينتج عنه.'),questions:[
 SQ('Which part of this situation is your interpretation?','أي جزء من الموقف يمثل تفسيرك؟',[
  ['They do not respect the value of my contribution.','هم لا يحترمون قيمة مساهمتي.'],
  ['Production asked why the batch record was returned.','سأل الإنتاج عن سبب إعادة سجل التشغيلة.'],
  ['A colleague said the review was slowing their work.','قال زميل إن المراجعة تؤخر عملهم.']],
  'The words were spoken; the intention behind them has not been verified.','الكلمات قيلت فعلاً، لكن النية وراءها لم يتم التحقق منها.'),
 SQ('Your employee now asks a routine question. What do you do?','يسألك موظفك الآن سؤالاً روتينياً. ماذا تفعل؟',[
  ['Notice your irritation, then respond to the actual question.','لاحظ انزعاجك ثم أجب عن السؤال الفعلي.'],
  ['Keep the answer brief so your irritation stays private.','اختصر الرد حتى يبقى انزعاجك أمراً خاصاً.'],
  ['Postpone their question until Production explains its comment.','أجل سؤاله حتى يفسر الإنتاج تعليقه.']],
  'A pause helps prevent one conversation from shaping how you treat the next person.','تساعدك الوقفة على عدم نقل أثر الحوار السابق إلى تعاملك مع الشخص التالي.') ]},
 {take:bi('Separate observable facts from assumed intent before choosing your response.','افصل الحقائق القابلة للملاحظة عن النية المفترضة قبل اختيار استجابتك.'),questions:[
 SQ('The deadline is approaching. What should you establish first?','الموعد يقترب. ما الذي تتحقق منه أولاً؟',[
  ['The dispatch status and the next reliable confirmation time.','حالة الشحن وموعد التأكيد الموثوق القادم.'],
  ['Whether the supplier understands how frustrated you feel.','مدى فهم المورد لشعورك بالإحباط.'],
  ['Whether colleagues agree that the supplier is unreliable.','هل يوافق الزملاء على عدم موثوقية المورد.']],
  'Check the commitment and the evidence before judging the supplier’s intent.','تحقق من الالتزام والدليل قبل الحكم على نية المورد.'),
 SQ('The supplier says an approval is pending. How do you respond?','يقول المورد إن الموافقة معلقة. كيف تستجيب؟',[
  ['Agree a checkpoint and the escalation needed if it is missed.','اتفق على نقطة متابعة والتصعيد المطلوب إذا فاتت.'],
  ['Accept the explanation and wait for the supplier to reconnect.','اقبل التفسير وانتظر أن يعاود المورد التواصل.'],
  ['Ask for a delivery promise before discussing the approval delay.','اطلب وعداً بالتسليم قبل مناقشة تأخر الموافقة.']],
  'Questioning assumptions does not remove accountability or agreed escalation.','اختبار الافتراضات لا يلغي المساءلة أو التصعيد المتفق عليه.') ]},
 {take:bi('Notice the emotion, then choose a response that serves the immediate need.','لاحظ الشعور ثم اختر استجابة تخدم الحاجة الفعلية للموقف.'),questions:[
 SQ('You feel your voice rising. What is the most useful next step?','تلاحظ ارتفاع صوتك. ما الخطوة التالية الأكثر فائدة؟',[
  ['Confirm the line is safe, then ask for verified observations.','أكد سلامة الخط ثم اطلب الملاحظات المتحقق منها.'],
  ['Explain the missed target before asking for the fault details.','اشرح أثر عدم تحقيق الهدف قبل طلب تفاصيل العطل.'],
  ['Leave the team to recover while you compose your response.','اترك الفريق يعالج التوقف بينما تجهز ردك.']],
  'Regulate your tone while immediate safety and containment responsibilities continue.','نظم نبرتك مع استمرار مسؤوليات السلامة والاحتواء الفورية.'),
 SQ('The operator reports a repeated issue. How do you handle accountability?','يبلغ المشغل عن مشكلة متكررة. كيف تتعامل مع المساءلة؟',[
  ['Check the evidence now and arrange a focused follow-up discussion.','تحقق من الأدلة الآن ورتب نقاش متابعة محدداً.'],
  ['Discuss the operator’s past mistakes while the team is gathered.','ناقش أخطاء المشغل السابقة بينما الفريق مجتمع.'],
  ['Avoid discussing responsibility so the operator stays comfortable.','تجنب مناقشة المسؤولية حتى يبقى المشغل مرتاحاً.']],
  'A constructive response addresses the problem without turning frustration into public criticism.','تعالج الاستجابة البناءة المشكلة دون تحويل الإحباط إلى انتقاد علني.') ]},
 {take:bi('Protect your attention during a critical handover; switching tasks can hide important details.','احمِ انتباهك خلال التسليم الحرج؛ فالانتقال بين المهام قد يخفي تفاصيل مهمة.'),questions:[
 SQ('A message arrives during the handover. What do you do?','تصل رسالة خلال التسليم. ماذا تفعل؟',[
  ['Finish the critical status check before reading the message.','أكمل التحقق من الحالة الحرجة قبل قراءة الرسالة.'],
  ['Read the message while the technician lists remaining checks.','اقرأ الرسالة بينما يسرد الفني الفحوص المتبقية.'],
  ['Ask for a written summary and switch to the message.','اطلب ملخصاً مكتوباً وانتقل إلى قراءة الرسالة.']],
  'Give the handover full attention, especially when restrictions or pending checks are discussed.','امنح التسليم انتباهاً كاملاً خصوصاً عند مناقشة القيود أو الفحوص المعلقة.'),
 SQ('You are unsure whether the final check was completed. What now?','لست متأكداً من اكتمال الفحص الأخير. ماذا تفعل؟',[
  ['Repeat the status back and confirm the remaining check and owner.','أعد صياغة الحالة وأكد الفحص المتبقي ومسؤوله.'],
  ['Use the usual handover sequence to infer the current status.','استخدم تسلسل التسليم المعتاد لاستنتاج الحالة الحالية.'],
  ['Ask the next shift to clarify when they need the equipment.','اطلب من الوردية التالية التوضيح عندما تحتاج المعدات.']],
  'A brief confirmation catches missed information before it becomes a working assumption.','يلتقط التأكيد المختصر المعلومة الناقصة قبل تحولها إلى افتراض عملي.') ]},
 {take:bi('Return attention to the conversation in front of you rather than replaying the last one.','أعد انتباهك للحوار الحالي بدلاً من استعادة الحوار السابق.'),questions:[
 SQ('Before entering the next clinic, what helps you become present?','قبل دخول العيادة التالية، ما الذي يساعدك على الحضور؟',[
  ['Notice the frustration and refocus on this visit’s purpose.','لاحظ الإحباط وأعد التركيز على هدف هذه الزيارة.'],
  ['Replay the earlier objection until you have a stronger reply.','استعد الاعتراض السابق حتى تجهز رداً أقوى.'],
  ['Use your usual opening so the visit starts automatically.','استخدم افتتاحيتك المعتادة لتبدأ الزيارة تلقائياً.']],
  'Naming the emotion helps you notice it without letting it direct the next visit.','تسمية الشعور تساعدك على ملاحظته دون أن يقود الزيارة التالية.'),
 SQ('The doctor raises an unexpected concern. What do you do?','يطرح الطبيب ملاحظة غير متوقعة. ماذا تفعل؟',[
  ['Ask a clarifying question and adapt to the concern expressed.','اطرح سؤالاً توضيحياً وتكيف مع الملاحظة المطروحة.'],
  ['Finish your prepared points before exploring the new concern.','أكمل نقاطك المحضرة قبل استكشاف الملاحظة الجديدة.'],
  ['Offer the reply that worked in the previous clinic visit.','قدم الرد الذي نجح في زيارة العيادة السابقة.']],
  'Presence means listening to this person’s situation before selecting a response.','الحضور يعني فهم موقف هذا الشخص قبل اختيار الاستجابة.') ]}
],
2:[
 {take:bi('A request for evidence is an observable event; a judgment about your ability is an interpretation.','طلب الدليل حدث يمكن ملاحظته؛ أما الحكم على قدرتك فهو تفسير.'),questions:[
 SQ('Which statement is a fact you can work with?','أي عبارة تمثل حقيقة يمكنك التعامل معها؟',[
  ['The reviewer requested the calculation supporting this result.','طلب المراجع الحساب الداعم لهذه النتيجة.'],
  ['The reviewer doubts my ability to perform this calculation.','يشك المراجع بقدرتي على إجراء هذا الحساب.'],
  ['The reviewer wants to expose a weakness in my work.','يريد المراجع كشف ضعف في عملي.']],
  'You know what was requested; you do not yet know the reviewer’s personal judgment.','تعرف ما تم طلبه، لكنك لا تعرف حكم المراجع الشخصي.'),
 SQ('How would you open the response to the reviewer?','كيف تبدأ الرد على المراجع؟',[
  ['Which part needs clarification so I can provide the right evidence?','أي جزء يحتاج توضيحاً حتى أقدم الدليل المناسب؟'],
  ['Could you explain why my calculation is being questioned again?','هل توضح لماذا يتم التشكيك في حسابي مجدداً؟'],
  ['Would my experience with similar results address your concern?','هل خبرتي بنتائج مشابهة تجيب عن مخاوفك؟']],
  'A specific clarification keeps the exchange focused on the review requirement.','يحافظ السؤال المحدد على تركيز الحوار حول متطلب المراجعة.') ]},
 {take:bi('Notice the urge to defend your status and choose curiosity about the shared problem.','لاحظ رغبتك في الدفاع عن مكانتك واختر الفضول تجاه المشكلة المشتركة.'),questions:[
 SQ('What is the most useful question to ask Manufacturing?','ما السؤال الأكثر فائدة لطرحه على التصنيع؟',[
  ['What operating condition might this recommendation have missed?','ما ظرف التشغيل الذي ربما أغفلته هذه التوصية؟'],
  ['Which technical qualification supports your objection to this recommendation?','ما المؤهل الفني الذي يدعم اعتراضكم على التوصية؟'],
  ['Can we follow my recommendation before considering other opinions?','هل نتبع توصيتي قبل النظر في الآراء الأخرى؟']],
  'Curiosity tests your recommendation without treating disagreement as a status threat.','يختبر الفضول التوصية دون اعتبار الاختلاف تهديداً للمكانة.'),
 SQ('The concern reveals an operating condition you missed. What next?','تكشف الملاحظة ظرف تشغيل أغفلته. ماذا تفعل؟',[
  ['Acknowledge the new fact and review the recommendation together.','اعترف بالمعلومة الجديدة وراجعوا التوصية معاً.'],
  ['Explain your original reasoning before discussing the new condition.','اشرح مبرراتك الأصلية قبل مناقشة الظرف الجديد.'],
  ['Ask another engineer to defend the original recommendation independently.','اطلب من مهندس آخر الدفاع عن التوصية الأصلية.']],
  'Updating your view when evidence changes supports credibility and collaboration.','تحديث رأيك عند تغير الأدلة يدعم المصداقية والتعاون.') ]},
 {take:bi('Use your own emotion and the other person’s concerns as information—not assumptions about intent.','استخدم شعورك ومخاوف الآخر كمعلومات، لا كافتراضات عن النية.'),questions:[
 SQ('What should you find out before responding to another update request?','ماذا تعرف قبل الرد على طلب تحديث جديد؟',[
  ['Which planning decision depends on this update and by when.','أي قرار تخطيط يعتمد على التحديث وبأي موعد.'],
  ['Why the planner does not trust the information already shared.','لماذا لا يثق المخطط بالمعلومات التي شاركتها.'],
  ['Whether the planner has asked other colleagues the same question.','هل سأل المخطط الزملاء الآخرين السؤال نفسه.']],
  'Check the need behind the repeated question rather than assigning a motive.','تحقق من الحاجة وراء تكرار السؤال بدلاً من افتراض الدافع.'),
 SQ('The planner needs a campaign decision at noon. What do you agree?','يحتاج المخطط قرار الحملة ظهراً. على ماذا تتفق؟',[
  ['One update time, confirmed facts, and remaining uncertainties.','موعد تحديث واحد والحقائق المؤكدة وما بقي غير مؤكد.'],
  ['A firm delivery promise so the planner can stop asking.','وعد تسليم ثابت حتى يتوقف المخطط عن السؤال.'],
  ['A final answer once the supplier resolves every open issue.','إجابة نهائية عندما يحل المورد كل المسائل المفتوحة.']],
  'A useful interim update can support a decision without inventing certainty.','قد يدعم التحديث المؤقت القرار دون ادعاء اليقين.') ]},
 {take:bi('Challenge words such as “always,” “never,” and predictions of disaster by checking the evidence.','اختبر كلمات دائماً وأبداً وتوقعات الكارثة بالرجوع إلى الأدلة.'),questions:[
 SQ('Which thinking trap is clearest in “our reviews are always late”?','ما نمط التفكير الأوضح في عبارة مراجعاتنا دائماً متأخرة؟',[
  ['Overgeneralizing from this review to every review.','التعميم من هذه المراجعة إلى كل المراجعات.'],
  ['Mind reading what the reviewer thinks of the team.','قراءة ما يعتقده المراجع عن الفريق.'],
  ['Labeling one employee instead of describing their action.','وصف موظف بدلاً من وصف تصرفه.']],
  '“Always” turns a single occurrence into a permanent pattern without checking the history.','تحول دائماً واقعة واحدة إلى نمط دائم دون مراجعة السجل.'),
 SQ('A colleague says the whole campaign will be a disaster. What next?','يقول زميل إن الحملة كلها ستكون كارثة. ما الخطوة التالية؟',[
  ['Check the confirmed impact and the next action that reduces it.','تحقق من الأثر المؤكد والخطوة التالية لتخفيفه.'],
  ['Replace that prediction with a promise the campaign will succeed.','استبدل التوقع بوعد أن الحملة ستنجح.'],
  ['Share the worst-case prediction so everyone reacts more quickly.','شارك أسوأ توقع حتى يتحرك الجميع بسرعة.']],
  'Challenge catastrophizing with proportionate evidence and action, not unsupported reassurance.','اختبر التهويل بأدلة وإجراءات مناسبة، لا بطمأنة غير مدعومة.') ]},
 {take:bi('Notice both the emotion and your energy level, then choose a useful regulating action.','لاحظ الشعور ومستوى طاقتك ثم اختر إجراء تنظيم مفيداً.'),questions:[
 SQ('Your low energy is leading you to avoid the review. What helps?','طاقتك المنخفضة تدفعك لتجنب المراجعة. ما الذي يفيد؟',[
  ['Prepare one manageable action and reconnect with the discussion.','جهز خطوة صغيرة قابلة للتنفيذ وعد إلى النقاش.'],
  ['Wait until confidence returns before meeting with the manager.','انتظر عودة الثقة قبل الاجتماع مع المدير.'],
  ['Increase your commitments to prove the result has not affected you.','زد التزاماتك لتثبت أن النتيجة لم تؤثر عليك.']],
  'A manageable next step supports engagement when disappointment drives withdrawal.','تدعم الخطوة الصغيرة الاستمرار عندما تدفع خيبة الأمل للانسحاب.'),
 SQ('Your angry colleague speaks faster and interrupts. What should they try?','زميلك الغاضب يتحدث بسرعة ويقاطع. ماذا يجرب؟',[
  ['Slow the pace, name the concern, and ask one factual question.','يبطئ الإيقاع ويسمي القلق ويطرح سؤالاً واقعياً واحداً.'],
  ['Push through the discussion while the energy is still high.','يواصل النقاش بقوة ما دامت طاقته مرتفعة.'],
  ['Agree with the manager quickly so the discussion ends sooner.','يوافق المدير سريعاً حتى ينتهي النقاش مبكراً.']],
  'High activation calls for slowing the response; low activation may call for re-engagement.','قد تتطلب الطاقة المرتفعة إبطاء الاستجابة، والمنخفضة العودة للمشاركة.') ]}
],
3:[
 {take:bi('Stay clear about the decision boundary even when you feel pressured to reassure others.','حافظ على وضوح حدود القرار حتى تحت ضغط طمأنة الآخرين.'),questions:[
 SQ('Supply Chain asks for a release promise. What can you commit to?','تطلب سلسلة التوريد وعداً بالإفراج. بماذا تستطيع الالتزام؟',[
  ['The next evidence check and a confirmed time for the status update.','فحص الدليل القادم ووقت مؤكد لتحديث الحالة.'],
  ['The expected release time based on how similar reviews usually go.','وقت الإفراج المتوقع بناءً على المراجعات المشابهة.'],
  ['A shipment target so the team has a date to work toward.','هدف شحن حتى يعمل الفريق باتجاه موعد محدد.']],
  'Commit to an action you control while the authorized release decision remains open.','التزم بإجراء ضمن سيطرتك ما دام قرار الإفراج المعتمد مفتوحاً.'),
 SQ('A colleague says your answer is unhelpful. What do you do?','يقول زميل إن إجابتك غير مفيدة. ماذا تفعل؟',[
  ['Acknowledge the timing need and restate the verified next step.','أقر بالحاجة للموعد وأعد توضيح الخطوة المؤكدة التالية.'],
  ['Give a tentative release promise to ease the immediate tension.','قدم وعد إفراج مبدئياً لتخفيف التوتر الفوري.'],
  ['Ask them to direct all further questions to your manager.','اطلب توجيه كل الأسئلة التالية إلى مديرك.']],
  'A calm boundary can remain useful when it includes a clear next action and update.','يبقى الحد الهادئ مفيداً عندما يتضمن خطوة واضحة وتحديثاً قادماً.') ]},
 {take:bi('Before acting from anger, check the expectation, the facts, and the immediate need.','قبل التصرف من الغضب، تحقق من التوقع والحقائق والحاجة الفورية.'),questions:[
 SQ('What should you verify before judging the previous shift?','ماذا تتحقق منه قبل الحكم على الوردية السابقة؟',[
  ['The missing check’s status and how the handover requirement was communicated.','حالة الفحص الناقص وكيف تم توضيح متطلب التسليم.'],
  ['Whether the previous shift has a reputation for weak handovers.','هل للوردية السابقة سمعة بتسليم ضعيف.'],
  ['Which person should explain the gap at the next team meeting.','من يجب أن يفسر الفجوة في اجتماع الفريق القادم.']],
  'Start with the actual gap and immediate controls, not a judgment about intent.','ابدأ بالفجوة الفعلية والضوابط الفورية، لا بالحكم على النية.'),
 SQ('The requirement was unclear to both shifts. What do you do?','كان المتطلب غير واضح للورديتين. ماذا تفعل؟',[
  ['Clarify the handover standard and agree how completion will be confirmed.','وضح معيار التسليم واتفقوا على كيفية تأكيد الإكمال.'],
  ['Ask the previous shift to apologize before changing the handover process.','اطلب اعتذار الوردية السابقة قبل تغيير عملية التسليم.'],
  ['Close the issue because neither shift understood the requirement clearly.','أغلق الموضوع لأن الورديتين لم تفهما المتطلب بوضوح.']],
  'Regulating anger creates room to fix an unclear process while retaining accountability.','يتيح تنظيم الغضب معالجة العملية غير الواضحة مع بقاء المساءلة.') ]},
 {take:bi('Treat feared outcomes as possibilities to evaluate, then focus on verifiable actions.','عامل النتائج المخيفة كاحتمالات للتقييم ثم ركز على إجراءات قابلة للتحقق.'),questions:[
 SQ('What do you need before concluding production will stop?','ماذا تحتاج قبل الاستنتاج أن الإنتاج سيتوقف؟',[
  ['Usable inventory, consumption timing, and confirmed supplier dispatch information.','المخزون القابل للاستخدام وموعد الاستهلاك ومعلومات الشحن المؤكدة.'],
  ['A management view on how serious a five-day delay usually becomes.','رأي الإدارة في خطورة تأخير خمسة أيام عادة.'],
  ['A revised campaign date that assumes no material will be available.','موعد حملة معدل يفترض عدم توفر أي مادة.']],
  'Concern can signal a real risk; evidence helps you assess its actual size.','قد ينبه القلق لخطر حقيقي؛ وتساعد الأدلة على تقييم حجمه الفعلي.'),
 SQ('Some stock may be available, but its status is unknown. What next?','قد يتوفر بعض المخزون لكن حالته غير معروفة. ماذا تفعل؟',[
  ['Verify usable status with the responsible function before changing the plan.','تحقق من حالة الاستخدام مع الجهة المسؤولة قبل تعديل الخطة.'],
  ['Tell Manufacturing the stock should cover the gap while checks continue.','أخبر التصنيع أن المخزون سيغطي النقص بينما يستمر الفحص.'],
  ['Announce a shutdown risk until every supply uncertainty is fully resolved.','أعلن خطر توقف حتى تحل كل شكوك التوريد بالكامل.']],
  'Reduce uncertainty through a specific check rather than promising success or predicting failure.','قلل عدم اليقين بفحص محدد بدلاً من وعد النجاح أو توقع الفشل.') ]},
 {take:bi('Separate a specific mistake from your worth, and stay engaged in reporting and repair.','افصل الخطأ المحدد عن قيمتك، واستمر في الإبلاغ والإصلاح.'),questions:[
 SQ('You feel ashamed about the missing reference. What should happen first?','تشعر بالخجل بسبب المرجع الناقص. ما الذي تفعله أولاً؟',[
  ['Report the omission and coordinate the required correction through the process.','أبلغ عن النقص ونسق التصحيح المطلوب عبر العملية المعتمدة.'],
  ['Gather proof of your past accuracy before raising the current omission.','اجمع أدلة دقتك السابقة قبل الإبلاغ عن النقص الحالي.'],
  ['Wait for the review meeting to see whether anyone needs the reference.','انتظر اجتماع المراجعة لترى هل يحتاج أحد المرجع.']],
  'Self-compassion supports honest repair; it does not replace reporting or accountability.','تدعم الرحمة بالذات الإصلاح الصادق، ولا تحل محل الإبلاغ أو المساءلة.'),
 SQ('How would you explain the issue at the review?','كيف تشرح المسألة خلال المراجعة؟',[
  ['I missed the reference; here is the status and correction owner.','أغفلت المرجع؛ وهذه الحالة ومسؤول التصحيح.'],
  ['I am usually accurate; the workload explains why this happened.','أنا دقيق عادة؛ وضغط العمل يفسر ما حدث.'],
  ['The handover format allowed this; the template needs more attention.','سمح نموذج التسليم بهذا؛ والنموذج يحتاج اهتماماً أكبر.']],
  'Own the specific gap and the next action without turning the mistake into a global self-judgment.','تحمل الفجوة المحددة والخطوة التالية دون تحويل الخطأ إلى حكم شامل على ذاتك.') ]},
 {take:bi('Use comparison to identify a development goal rather than measure your personal worth.','استخدم المقارنة لتحديد هدف تطوير بدلاً من قياس قيمتك الشخصية.'),questions:[
 SQ('What question turns this disappointment into useful information?','ما السؤال الذي يحول خيبة الأمل إلى معلومة مفيدة؟',[
  ['Which capability was needed, and how can I practise it?','ما القدرة المطلوبة وكيف أستطيع التدرب عليها؟'],
  ['Why were my strong results valued less than my colleague’s?','لماذا قُدرت نتائجي القوية أقل من نتائج زميلي؟'],
  ['When will I receive an equivalent opportunity for my contribution?','متى سأحصل على فرصة مكافئة مقابل مساهمتي؟']],
  'Ask about criteria and readiness before assuming what the selection says about your worth.','اسأل عن المعايير والجاهزية قبل افتراض ما يعنيه الاختيار بشأن قيمتك.'),
 SQ('Your colleague asks for preparation help. What do you choose?','يطلب زميلك المساعدة في التحضير. ماذا تختار؟',[
  ['Contribute your expertise and observe a skill you want to develop.','شارك خبرتك ولاحظ مهارة تريد تطويرها.'],
  ['Help after your manager confirms you will get the next opportunity.','ساعد بعد تأكيد مديرك أنك ستحصل على الفرصة التالية.'],
  ['Step back so the colleague gains experience without your involvement.','ابتعد حتى يكتسب الزميل الخبرة دون مشاركتك.']],
  'You can support a colleague and pursue your own development at the same time.','يمكنك دعم زميلك والسعي لتطويرك في الوقت نفسه.') ]},
 {take:bi('Use STOP: Step Back, Think Again, Organize, then Proceed with an action you control.','استخدم STOP: تراجع خطوة، أعد التفكير، نظم، ثم تقدم بإجراء ضمن سيطرتك.'),questions:[
 SQ('Several functions demand different commitments. What should you organize?','تطلب أقسام متعددة التزامات مختلفة. ماذا تنظم؟',[
  ['Confirmed facts, unknowns, accountable owners, and the next verification checkpoint.','الحقائق المؤكدة والمجهول والمسؤولين ونقطة التحقق التالية.'],
  ['Each function’s preferred outcome and the quickest promise you can make.','النتيجة المفضلة لكل قسم وأسرع وعد تستطيع تقديمه.'],
  ['The reasons each function created pressure and who should explain them.','أسباب ضغط كل قسم ومن يجب أن يفسرها.']],
  'Organize separates the decision inputs before you proceed under pressure.','تفصل خطوة التنظيم مدخلات القرار قبل التقدم تحت الضغط.'),
 SQ('What is the most useful commitment to make now?','ما الالتزام الأكثر فائدة الذي تقدمه الآن؟',[
  ['Name the next verification owner and confirm when you will update everyone.','حدد مسؤول التحقق القادم وأكد موعد تحديث الجميع.'],
  ['Promise the outcome each function needs so the discussion can move forward.','عد بالنتيجة التي يحتاجها كل قسم ليتقدم النقاش.'],
  ['Explain that the outcome is outside your control and await instructions.','وضح أن النتيجة خارج سيطرتك وانتظر التعليمات.']],
  'You cannot guarantee every outcome, but you can own a clear action and follow-through.','لا تضمن كل نتيجة، لكن تستطيع تحمل إجراء واضح ومتابعته.') ]}
]};

const MODULE_READING={
1:bi([
 'Mindful leadership starts with noticing how an event becomes a reaction. An external event is followed by an interpretation, an emotional response, and an action. That action can create the next event. When this happens automatically, the first explanation that comes to mind can shape behavior before the facts have been checked.',
 'The first intervention is to separate the observable event from its meaning. An interpretation may be plausible without being confirmed. Recognizing this difference creates room to consider other explanations and check the relevant information before accepting a judgment about someone’s intentions.',
 'The second intervention is between emotion and action. The emotion can be acknowledged without allowing it to choose the tone, words, or next step. A brief pause helps the leader respond deliberately while continuing any immediate safety or operational responsibilities. The aim is a constructive response rather than suppression of feelings.',
 'Attention also affects the quality of a response. Switching between complex tasks can interrupt understanding and increase the chance of missing information. Giving a conversation or critical task full attention supports accurate decisions, clear handovers, and respectful working relationships.',
 'Mindfulness means returning attention to the present task or conversation. Replaying past friction or worrying about uncertain outcomes can draw attention away from information that is available now. Noticing distraction and deliberately refocusing helps the leader act on what is relevant and within their control.'
],[
 'تبدأ القيادة الواعية بملاحظة كيف يتحول الحدث إلى رد فعل. يتبع الحدث الخارجي تفسير، ثم استجابة عاطفية، ثم تصرف قد يخلق حدثاً جديداً. عندما تجري هذه السلسلة تلقائياً، قد يقود التفسير الأول السلوك قبل التحقق من الحقائق.',
 'تكون نقطة التدخل الأولى بالفصل بين الحدث القابل للملاحظة والمعنى الذي نعطيه له. قد يبدو التفسير منطقياً دون أن يكون مؤكداً. يتيح إدراك هذا الفرق النظر في تفسيرات أخرى والتحقق من المعلومات قبل اعتماد حكم عن نية الآخرين.',
 'تأتي نقطة التدخل الثانية بين الشعور والتصرف. يمكن الاعتراف بالشعور دون تركه يحدد النبرة والكلمات والخطوة التالية. تساعد وقفة قصيرة على اختيار استجابة مقصودة مع استمرار مسؤوليات السلامة والعمل العاجلة. الهدف هو الاستجابة البناءة، لا قمع المشاعر.',
 'يؤثر الانتباه أيضاً في جودة الاستجابة. قد يؤدي الانتقال المتكرر بين المهام المعقدة إلى انقطاع الفهم وفقدان معلومات مهمة. يدعم التركيز الكامل في الحوار أو المهمة الحرجة دقة القرار ووضوح التسليم واحترام العلاقة المهنية.',
 'تعني اليقظة إعادة الانتباه إلى المهمة أو الحوار الحالي. قد يسحب استرجاع الخلافات السابقة أو القلق بشأن نتائج غير مؤكدة انتباه القائد من المعلومات المتاحة الآن. تساعد ملاحظة التشتت والعودة المقصودة للتركيز على التصرف فيما هو مهم وضمن السيطرة.'
]),
2:bi([
 'Emotional intelligence combines awareness of emotions with thoughtful action. A leader notices their own feelings, considers the concerns of others, and chooses behavior that serves the situation. Emotional information is useful, but it does not by itself establish another person’s intentions or determine the right decision.',
 'Separating fact from story is a central skill. Facts describe what was observed. Stories are the meanings, motives, or predictions attached to those observations. Testing the story helps prevent an assumption from becoming the basis for a defensive response.',
 'The course uses the Ego Self and Natural Self as reflective lenses. The Ego Self describes a defensive focus on status, comparison, and self-protection. The Natural Self describes a more deliberate stance of curiosity, empathy, and openness to evidence. These labels help notice a response pattern rather than classify a person permanently.',
 'Thinking distortions can strengthen an untested story. Mind reading assumes knowledge of another person’s thoughts. Fortune telling treats a future outcome as certain. Catastrophizing magnifies a difficulty into an extreme outcome. Overgeneralizing turns one event into an enduring pattern. Labeling reduces a person to a judgment. Harsh “should” statements impose rigid, unrealistic expectations.',
 'Recognizing these patterns creates space for a more balanced interpretation. Emotional mapping adds another useful distinction: both how an emotion feels and its level of activation matter. High activation may require slowing the response, while low energy and withdrawal may require a manageable step back into engagement. The purpose is to use awareness to guide action, not to judge emotions as good or bad.'
],[
 'يجمع الذكاء العاطفي بين الوعي بالمشاعر والتصرف المدروس. يلاحظ القائد شعوره، ويأخذ مخاوف الآخرين بالحسبان، ويختار سلوكاً يخدم الموقف. تقدم المشاعر معلومات مفيدة، لكنها لا تثبت وحدها نية شخص آخر ولا تحدد القرار المناسب.',
 'يعد الفصل بين الحقيقة والقصة مهارة أساسية. تصف الحقائق ما تمت ملاحظته، بينما تمثل القصة المعاني والدوافع والتوقعات المرتبطة بتلك الملاحظات. يساعد اختبار القصة على منع الافتراض من التحول إلى أساس لاستجابة دفاعية.',
 'يستخدم الكورس الذات الأنا والذات الطبيعية كعدستين للتأمل. تصف الذات الأنا التركيز الدفاعي على المكانة والمقارنة وحماية النفس. وتصف الذات الطبيعية موقفاً أكثر قصداً يقوم على الفضول والتعاطف والانفتاح على الأدلة. تساعد هذه التسميات على ملاحظة نمط الاستجابة، لا على تصنيف الشخص بشكل دائم.',
 'قد تقوي أنماط التفكير المشوهة قصة غير مختبرة. تفترض قراءة الأفكار معرفة ما يفكر به الآخر. ويعامل التنبؤ بالمستقبل نتيجة قادمة كأنها مؤكدة. ويضخم التهويل الصعوبة إلى نتيجة متطرفة. ويحول التعميم المفرط حدثاً واحداً إلى نمط دائم. وتختزل التسميات الشخص في حكم. أما توقعات يجب الصارمة فتفرض مطالب جامدة وغير واقعية.',
 'يتيح التعرف على هذه الأنماط تفسيراً أكثر توازناً. ويضيف تحديد المنطقة العاطفية تمييزاً مهماً بين طبيعة الشعور ومستوى طاقته. قد تتطلب الطاقة المرتفعة إبطاء الاستجابة، بينما قد يتطلب الانسحاب وانخفاض الطاقة خطوة صغيرة للعودة إلى المشاركة. الهدف هو استخدام الوعي لتوجيه السلوك، لا الحكم على المشاعر بأنها جيدة أو سيئة.'
]),
3:bi([
 'Emotional strength means staying engaged and choosing a constructive response when feelings become difficult. It does not require hiding an emotion or promising an outcome that cannot be guaranteed. Clear communication and appropriate boundaries can continue while pressure is present.',
 'Anger can arise when expectations are unmet or when a judgment is made before the full picture is known. Managing it involves noticing the urge to react, checking the expectation and available evidence, and addressing the specific gap. A calm response can preserve accountability without turning frustration into personal criticism.',
 'Fear can signal a real risk or an uncertain prediction. Managing fear involves separating confirmed information from imagined outcomes and directing attention toward verification, preparation, and actions within control. Realistic planning allows uncertainty to be communicated without presenting either success or failure as inevitable.',
 'Shame can turn a specific mistake into a broad judgment about personal worth. Guilt can draw attention to an action that needs repair. Self-compassion supports honest reporting, correction, and learning; it does not remove responsibility. Remaining involved in the solution is more useful than withdrawing or relying only on explanations of external causes.',
 'Envy can arise through comparison with another person’s recognition or opportunity. It can be redirected toward understanding the relevant capability, recognizing existing strengths, and choosing a development goal. Another person’s success can provide information for learning without becoming a measure of personal value.',
 'Locus of control helps distinguish personal responsibility from outcomes that require coordination with others. Attention, tone, preparation, questions, and follow-through can be managed directly. The STOP tool supports this process: Step Back creates space; Think Again tests the first interpretation; Organize separates facts, assumptions, emotions, and options; Proceed turns that preparation into a clear action and follow-up.'
],[
 'تعني القوة العاطفية الاستمرار في المشاركة واختيار استجابة بناءة عندما تصبح المشاعر صعبة. وهي لا تتطلب إخفاء الشعور أو الوعد بنتيجة لا يمكن ضمانها. يمكن المحافظة على تواصل واضح وحدود مناسبة حتى مع وجود الضغط.',
 'قد يظهر الغضب عند عدم تحقق التوقعات أو إصدار حكم قبل اكتمال الصورة. تتضمن إدارته ملاحظة الرغبة في رد الفعل، والتحقق من التوقع والأدلة، ومعالجة الفجوة المحددة. تحافظ الاستجابة الهادئة على المساءلة دون تحويل الإحباط إلى انتقاد شخصي.',
 'قد ينبه الخوف إلى خطر حقيقي أو يرتبط بتوقع غير مؤكد. تتضمن إدارته فصل المعلومات المؤكدة عن النتائج المتخيلة وتوجيه الانتباه نحو التحقق والاستعداد والإجراءات ضمن السيطرة. يتيح التخطيط الواقعي توضيح عدم اليقين دون تقديم النجاح أو الفشل كنتيجة حتمية.',
 'قد يحول الخجل خطأ محدداً إلى حكم شامل على القيمة الشخصية، بينما قد يلفت الذنب الانتباه إلى تصرف يحتاج إلى إصلاح. تدعم الرحمة بالذات الإبلاغ الصادق والتصحيح والتعلم، ولا تلغي المسؤولية. يبقى الاستمرار في الحل أكثر فائدة من الانسحاب أو الاكتفاء بتفسير الأسباب الخارجية.',
 'قد ينشأ الحسد من مقارنة النفس بتقدير شخص آخر أو فرصته. يمكن توجيهه نحو فهم القدرة المطلوبة، والاعتراف بنقاط القوة الموجودة، واختيار هدف تطوير. يقدم نجاح الآخر معلومة للتعلم دون أن يصبح مقياساً للقيمة الشخصية.',
 'يساعد مركز التحكم على التمييز بين المسؤولية الشخصية والنتائج التي تتطلب التنسيق مع الآخرين. يمكن إدارة الانتباه والنبرة والاستعداد والأسئلة والمتابعة مباشرة. وتدعم أداة STOP هذه العملية: تراجع خطوة لصنع مساحة، وأعد التفكير لاختبار التفسير الأول، ونظم الحقائق والافتراضات والمشاعر والخيارات، ثم تقدم بإجراء واضح ومتابعة محددة.'
])};

function combinedQuestions(id) {
 const original=EI_CHECKS[id].map((q,i)=>({key:`core-${i}`,q:q.q,options:q.o,best:q.a}));
 const moved=SITUATION_LESSONS[id].flatMap((lesson,li)=>lesson.questions.map((q,qi)=>({key:`s-${li}-${qi}`,q:q.q,options:{en:q.options.map(o=>o.en),ar:q.options.map(o=>o.ar)},best:q.best,context:bi(WORKED_EI[id][li][2],WORKED_EI[id][li][3])})));
 return [...original,...moved];
}
function ensureCombinedCheck(id) {
 EI_STATE.combinedChecks=EI_STATE.combinedChecks||{};
 if(!EI_STATE.combinedChecks[id]) {
  const old=EI_STATE.checks[id]||{},count=Math.min(EI_CHECKS[id].length,Math.max(0,old.i||(old.done?EI_CHECKS[id].length:0)));
  const answers={};
  SITUATION_LESSONS[id].forEach((l,li)=>l.questions.forEach((_,qi)=>{const answer=EI_STATE.situationAnswers?.[id]?.[li]?.[qi];if(answer!==undefined)answers[`s-${li}-${qi}`]=answer;}));
  EI_STATE.combinedChecks[id]={answers,orders:{},legacyCoreCount:count,legacyCoreScore:Math.min(count,Math.max(0,old.s||0))};
 }
 return EI_STATE.combinedChecks[id];
}
function combinedCheckSummary(id) {
 const st=ensureCombinedCheck(id),bank=combinedQuestions(id);
 const answered=q=>q.key.startsWith('core-')&&Number(q.key.slice(5))<st.legacyCoreCount||st.answers[q.key]!==undefined;
 const count=bank.filter(answered).length;
 const score=st.legacyCoreScore+bank.filter(q=>st.answers[q.key]!==undefined&&st.answers[q.key]===q.best).length;
 return {st,bank,count,score,done:count===bank.length,next:bank.find(q=>!answered(q))};
}
function syncCombinedCheck(id) {
 const s=combinedCheckSummary(id);
 EI_STATE.checks[id]={i:s.count,s:s.score,done:s.done,bankVersion:'combined-v1'};
 EI_CHECK_STATE=EI_STATE.checks;return s;
}
if(!EI_STATE.learnLayoutV2) {
 EI_STATE.learnRead=EI_STATE.learnRead||{};
 EI_STATE.legacyCompletedModules=EI_STATE.legacyCompletedModules||{};
 for(const m of EI_MODS) {
  if(EI_STATE.modules[m.id])EI_STATE.legacyCompletedModules[m.id]=true;
  if(EI_STATE.legacyCompletedModules[m.id]||m.detail.en.every((_,i)=>EI_STATE.lessons?.[m.id]?.[i]))EI_STATE.learnRead[m.id]=true;
  syncCombinedCheck(m.id);
 }
 EI_STATE.learnLayoutV2=true;saveEIState();
}
eiModuleTasks=function(id) {
 const legacy=EI_STATE.legacyCompletedModules?.[id],read=!!(legacy||EI_STATE.learnRead?.[id]);
 const practice=id===1?EI_STATE.practice.m1a!==undefined&&EI_STATE.practice.m1b!==undefined:id===2?!!EI_STATE.practice.distortionMatchDone:!!EI_STATE.simDone;
 return {learned:Number(read),total:1,learn:read,check:!!(legacy||EI_STATE.checks[id]?.done),practice:!!(legacy||practice)};
};
function completeModuleReading(id) {
 if(!MODULE_READING[id])return;
 EI_STATE.learnRead=EI_STATE.learnRead||{};EI_STATE.learnRead[id]=true;updateEICompletion();renderEI();
}
renderDetailedLearn=function(m) {
 const done=eiModuleTasks(m.id).learn;
 return `<section class="eipanel module-reading"><h3>${m.t[lang]}</h3>${MODULE_READING[m.id][lang].map(p=>`<p>${p}</p>`).join('')}<div class="match-actions"><button class="next lesson-completion" ${done?'disabled':''} onclick="completeModuleReading(${m.id})">${localText(done?bi('✓ Reading Completed','✓ تمت القراءة'):bi('Mark Reading Complete','تحديد الشرح كمكتمل'))}</button><button class="secondary" onclick="eiTab='check';renderEI()">${localText(bi('Knowledge Check','اختبار الفهم'))}</button></div></section>`;
};
renderEICheck=function(id) {
 const s=syncCombinedCheck(id);saveEIState();
 if(s.done)return `<section class="eipanel"><span class="completion-badge">${localText(bi('✓ Completed','✓ مكتمل'))}</span><h3>${localText(bi('Knowledge Check Complete','اكتمل اختبار الفهم'))}</h3><div class="metric"><b>${s.score}/${s.bank.length}</b><span>${Math.round(s.score/s.bank.length*100)}%</span></div><p>${localText(bi('This check includes the original questions and all situational questions previously shown in Learn.','يجمع هذا الاختبار الأسئلة الأصلية وجميع أسئلة المواقف التي كانت ضمن التعلّم.'))}</p><button class="secondary" onclick="resetCombinedCheck(${id})">${localText(bi('Retake Knowledge Check','إعادة اختبار الفهم'))}</button></section>`;
 const q=s.next,st=s.st;
 if(!st.orders[q.key]){st.orders[q.key]=shuffleEI(q.options.en.map((_,i)=>i));saveEIState();}
 return `<section class="eipanel combined-check"><span class="ribbon">${localText(bi('KNOWLEDGE CHECK','اختبار الفهم'))}</span><h3>${localText(bi('Question','السؤال'))} ${s.count+1}/${s.bank.length}</h3><p>${localText(bi('All module questions are collected here.','جميع أسئلة الموديول مجمعة هنا.'))}</p><div class="module-progress-track" role="progressbar" aria-label="${localText(bi('Questions answered','الأسئلة المجابة'))}" aria-valuenow="${s.count}" aria-valuemin="0" aria-valuemax="${s.bank.length}"><span style="width:${s.count/s.bank.length*100}%"></span></div>${q.context?`<div class="simevent knowledge-context">${localText(q.context)}</div>`:''}<h4>${localText(q.q)}</h4>${st.orders[q.key].map((canonical,i)=>`<button class="simopt" onclick="answerCombinedCheck(${id},'${q.key}',${canonical})">${String.fromCharCode(65+i)}. ${q.options[lang][canonical]}</button>`).join('')}</section>`;
};
function answerCombinedCheck(id,key,choice) {
 const s=combinedCheckSummary(id),q=s.next;
 if(!q||q.key!==key||!Number.isInteger(choice)||choice<0||choice>=q.options.en.length)return;
 s.st.answers[key]=choice;syncCombinedCheck(id);updateEICompletion();renderEI();
}
function resetCombinedCheck(id) {
 if(!EI_CHECKS[id])return;
 EI_STATE.combinedChecks[id]={answers:{},orders:{},legacyCoreCount:0,legacyCoreScore:0};
 syncCombinedCheck(id);updateEICompletion();renderEI();
}
updateEICompletion();

