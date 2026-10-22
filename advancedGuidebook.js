// Source: supplied "Young Marines Advanced Guidebook" PDF (undated in the file).
// Page references use the guidebook's own printed page labels (e.g. AYM-2-4).
export const ADV_PDF =
  "https://media.base44.com/files/public/6ad80d1336b2de75e224bfbd/21c812be6_GuideBook_Advanced_FullBook.pdf";

const START = { 1: 7, 2: 11, 3: 18, 4: 30, 5: 37, 6: 43, 7: 52, 8: 56, 9: 61, 10: 66 };

const mc = (q, o, a, x) => ({ t: "mc", q, o, a, x });
const tf = (q, a, x) => ({ t: "tf", q, a, x });
const sa = (q, a, x) => ({ t: "sa", q, a, x });

const raw = [
  {
    po: 1,
    title: "Close Order Drill",
    intro:
      "Battalion-level drill uses commands to subordinate leaders and supplementary commands. The full drill manual lives in the Training Officers Manual (TOM) on youngmarines.com.",
    eos: [
      {
        eo: 1, pg: 2, title: "Receive reports during a battalion formation",
        sum: "As the battalion sergeant major you command “Report” and receive each platoon sergeant’s report, starting from your left, while you stay at attention.",
        facts: [
          ["Which platoon do you receive a report from first?", "The platoon on your left — always receive reports starting from your left."],
          ["How do you stand while receiving reports?", "At the position of attention, without looking at the platoon sergeant giving the report."],
        ],
        qs: [mc("When receiving reports in a battalion formation, where do you begin?", ["The right-most platoon", "The platoon on your left", "The center platoon", "Whichever platoon is ready"], 1, "Reports are always received starting from your left (AYM-1-2).")],
      },
      {
        eo: 2, pg: 2, title: "Pass information to subordinate leaders in a battalion formation",
        sum: "To brief only the platoon sergeants, you call them to the center, give your information, then send them back with “post.”",
        facts: [
          ["What command brings the platoon sergeants to you?", "“Platoon sergeants, center… march.” Pause after the preparatory command so they can face inboard."],
          ["What command sends them back?", "“Post” — they about face and return to their platoons."],
        ],
        qs: [mc("What command returns platoon sergeants to their platoons after you pass information?", ["Fall out", "Post", "Dismissed", "Center, march"], 1, "After passing information, you give the command “post” (AYM-1-2).")],
      },
      {
        eo: 3, pg: 2, title: "Command the drill movements of a battalion",
        sum: "Battalion commands use a preparatory command such as “battalion” (platoon sergeants echo “company”) and a command of execution. When a unit acts separately, it uses supplementary commands.",
        facts: [
          ["What do platoon sergeants call out when you say “Battalion”?", "“Company” — then you give the command of execution (e.g., “attention”)."],
          ["During “column left” while marching, what does the second platoon’s sergeant say on hearing the preparatory command?", "“Continue to march,” and gives the movement later so the platoon turns at about the same spot as the unit before it."],
        ],
        qs: [mc("While marching in battalion formation “column left” is given. The second platoon’s sergeant should…", ["Turn immediately", "Halt the platoon", "Call “continue to march” and turn at the same location", "Fall out"], 2, "Supplementary commands let each platoon execute at about the same location (AYM-1-1).")],
      },
      {
        eo: 4, pg: 3, title: "Perform a “troop” of the ranks",
        sum: "Troop the line is a slow observation of each platoon in front of the formation. You take mental notes and correct later — you do not stop to make corrections.",
        facts: [
          ["Where do you position yourself when starting the troop?", "At the first platoon guide, no closer to the platoon than the platoon sergeant."],
          ["What do you do with problems you notice while trooping?", "Make mental notes and save them for the platoon sergeants after formation. Do not stop or ask questions."],
        ],
        qs: [tf("While trooping the line you should stop immediately to correct any problems you see.", false, "Do not stop to make corrections; note them and relay them afterward (AYM-1-3).")],
      },
    ],
  },
  {
    po: 2,
    title: "Essential Subjects",
    intro: "Skills for succeeding in life and in leadership: conflict resolution, recognizing abuse, child development and counseling. Young Marine-to-Young Marine counseling is only for Young Marine related issues.",
    eos: [
      {
        eo: 1, pg: 1, title: "Understand conflict resolution methods",
        sum: "A good negotiator sees conflict as an opportunity, focuses on the issue rather than the people, finds common ground and settles things fairly. You are meant to be part of the solution.",
        facts: [
          ["What should you focus on when resolving a conflict?", "The issue, not the individuals involved."],
          ["When should you be aggressive or assertive?", "Only when the situation calls for it, and only as a last resort. Don’t get in the middle of everyone else’s problems."],
        ],
        qs: [mc("Which approach does the guidebook recommend when resolving a conflict?", ["Take the side of the senior person", "Focus on the issue, not the individuals", "Stay out of every disagreement", "Settle it as quickly as possible, fairness aside"], 1, "Focus on the issue and find common ground (AYM-2-1).")],
      },
      {
        eo: 2, pg: 1, title: "Recognize signs of abuse",
        sum: "Abuse takes several forms, and certain signs may indicate it. If you suspect abuse, report it to the appropriate authority — do not handle it yourself.",
        facts: [
          ["Name forms of abuse listed in the guidebook.", "A deceitful act or corrupt practice; improper use or treatment; abusive language; physical maltreatment."],
          ["What should you do if you suspect abuse in the Young Marines?", "Report it immediately to your unit commander or another adult you trust. Let the professionals handle it."],
        ],
        qs: [mc("If you suspect abuse in the Young Marines, you should…", ["Investigate it yourself first", "Wait to see if it continues", "Report it immediately to your unit commander or a trusted adult", "Confront the person privately"], 2, "Do not attempt to handle it yourself (AYM-2-2).")],
      },
      {
        eo: 3, pg: 2, title: "Understand child psychology in the Young Marines",
        sum: "The guidebook gives general descriptions of behavior for ages 8 to 18. They are for orientation only; every child develops at their own rate, and all respond well to sincere encouragement and praise.",
        facts: [
          ["What two principles apply to every age group?", "Each child develops at their own rate, and all children respond well to sincere encouragement and praise."],
          ["What age range do the descriptions cover?", "Ages 8 to 18, as a general depiction of an average child."],
        ],
        qs: [tf("Every child will fit the age descriptions in the guidebook exactly.", false, "They are general; each child develops at their own rate (AYM-2-2).")],
      },
      {
        eo: 4, pg: 4, title: "Understand how to counsel fellow Young Marines",
        sum: "Counseling is two-way communication between a senior and a junior Young Marine to help the junior reach their highest performance. Initial sessions set expectations and goals; sessions close with a summary and a positive note, and personal notes help track progress.",
        facts: [
          ["Name objectives of an initial counseling session.", "Make expectations clear, ensure they’re understood, set goals and plans, convey interest and concern, explain leadership style, motivate, and explain the unit mission and duties."],
          ["Counseling practices listed.", "Target setting, problem solving, planning for improvement; and questioning, giving feedback, active listening."],
        ],
        qs: [sa("Name two objectives of an initial counseling session.", "Any two: make expectations clear; ensure the junior understands them; set goals/targets and plans; convey interest and concern; help them understand your leadership style; motivate them; ensure they understand the unit mission and their duties.", "See AYM-2-4.")],
      },
    ],
  },
  {
    po: 3,
    title: "Life Skills",
    intro: "Personal finance, scholarships, resumes, consumer awareness and job searching.",
    eos: [
      {
        eo: 1, pg: 1, title: "Personal finance",
        sum: "Learn the difference between gross and net pay, how bills and obligations come out of a paycheck, how a budget works, and how interest raises the cost of credit and loans.",
        facts: [
          ["Gross pay vs. net pay?", "Gross pay is total earnings before anything is taken out; net pay is what remains after taxes and deductions."],
          ["What is a budget?", "A plan that shows where your money comes from and where it should go."],
        ],
        qs: [mc("Net pay is…", ["Total pay before deductions", "Pay after taxes and other deductions", "Only overtime pay", "Savings interest"], 1, "Net pay is the paycheck after deductions (AYM-3-1).")],
      },
      {
        eo: 2, pg: 3, title: "Understand the Young Marine Scholarship Program",
        sum: "There are two scholarships: the Young Marines National Scholarship and the Jimmy Trimble Scholarship. Details and deadlines are on the National Headquarters website and may change.",
        facts: [
          ["Name the two scholarships.", "The Young Marines National Scholarship and the Jimmy Trimble Scholarship."],
          ["Where do you find application details and deadlines?", "On the National Headquarters website — check it occasionally because information can change."],
        ],
        qs: [mc("The Jimmy Trimble Scholarship is presented in memory of…", ["A Young Marines founder", "Jimmy Trimble, killed in action in World War II on Iwo Jima", "A Marine Corps commandant", "A former National Executive Director"], 1, "AYM-3-4.")],
      },
      {
        eo: 3, pg: 4, title: "Create an effective work resume",
        sum: "A resume is a short account of one’s career and qualifications. It starts with name, address and phone, then education, job history, volunteer work and references. Keep it up to date.",
        facts: [
          ["Ideal resume length and format?", "One page and typewritten."],
          ["Why keep a resume up to date?", "So you can submit it on a moment’s notice, and so your employer knows about new qualifications."],
        ],
        qs: [tf("According to the guidebook, the best resumes are one page long and typewritten.", true, "AYM-3-5.")],
      },
      {
        eo: 4, pg: 7, title: "Understand consumer affairs and apply them in shopping",
        sum: "Compare unit prices, read labels (ingredients are listed largest amount first), follow directions, watch for allergens, and consider generic and store brands, season and scams.",
        facts: [
          ["How are ingredients ordered on a label?", "By amount: the largest amount first and the least last."],
          ["Why compare unit price?", "Cost per ounce, pound or liter shows the best value for your money."],
        ],
        qs: [mc("An ingredient listed second on a label means…", ["It’s the second-smallest amount", "It’s the second-largest amount", "It was added last", "It is optional"], 1, "Ingredients are listed by amount, largest first (AYM-3-7).")],
      },
      {
        eo: 5, pg: 11, title: "Search for a job through the newspaper and job service",
        sum: "Use newspaper ads, government employment agencies (free), private agencies (avoid any that charge up front) and word of mouth. Don’t sit at home — people who are working have a better chance at a new job.",
        facts: [
          ["Government vs. private employment agencies?", "Government agencies are free; private agencies charge, usually after finding you a job. Avoid those asking for money up front."],
          ["Why not just wait at home for a better job?", "Those currently working have a better opportunity at a new job than those not working."],
        ],
        qs: [mc("Which employment agency charge should you be suspicious of?", ["A fee after you’re placed in a job", "No fee", "Money required up front", "A government agency"], 2, "Agencies wanting money up front may not be honest (AYM-3-11).")],
      },
    ],
  },
  {
    po: 4,
    title: "Field Skills",
    intro: "At this stage you plan, execute and supervise encampments and field exercises.",
    eos: [
      {
        eo: 1, pg: 1, title: "Planning and leadership",
        sum: "Plan with What, Who and How. Use FLAMET for logistics, delegate carefully, lead by example and remember the seven P’s.",
        facts: [
          ["What does FLAMET stand for?", "Fees, Lodging, Activities, Meals, other Expenses, Transportation."],
          ["Seven P’s?", "Proper prior planning precludes the possibility of poor performance."],
        ],
        qs: [sa("What does FLAMET stand for?", "Fees, Lodging, Activities, Meals, other Expenses, Transportation.", "AYM-4-2/4-3.")],
      },
      {
        eo: 2, pg: 3, title: "Supervising field exercises",
        sum: "As a Master Sergeant or Master Gunnery Sergeant your primary field function is to supervise and observe subordinates, guide instructors, meet with staff beforehand and look for a suitable replacement.",
        facts: [
          ["Primary field function at this rank?", "Supervise and observe subordinates in class work, field skills and leadership."],
          ["Why meet with your staff before a field exercise?", "To decide who teaches what, assign special duties and make sure they know what they’re doing — if they look bad, you look bad."],
        ],
        qs: [tf("At this stage of your career your primary field function is to supervise and observe subordinate Young Marines.", true, "AYM-4-3.")],
      },
      {
        eo: 3, pg: 4, title: "Special considerations",
        sum: "Safety first. Consider age differences (youngest on first or last watch), treat bedwetting as a medical matter without shame, don’t assume illness is homesickness, provide for spiritual life without imposing, schedule free time and welcome parents.",
        facts: [
          ["Which fire-watch shifts should the youngest Young Marines get?", "The first or last watches, so they get unbroken sleep."],
          ["How should bedwetting (enuresis) be handled?", "With understanding and support; never shame or embarrass the Young Marine, and treat them equally."],
        ],
        qs: [mc("Which approach does the guidebook give for a Young Marine who wets the bed at an encampment?", ["Send them home", "Quietly tease them to encourage change", "Be understanding and supportive; they are treated equally", "Assign them to the last tent"], 2, "Never shame or embarrass; it’s often a medical issue (AYM-4-4).")],
      },
      {
        eo: 4, pg: 5, title: "Plan and execute a unit encampment",
        sum: "With your unit commander’s permission, plan and run an encampment, then collect after action reports from your subordinate billet holders and adults and an after action review from your commander for your Record Book.",
        facts: [
          ["AAR format?", "Topic, issue, discussion, recommendation — one item per topic."],
          ["Who provides what after the encampment?", "After action reports from subordinates and adults; an after action review from the unit commander."],
        ],
        qs: [mc("The guidebook’s After Action Report plan is…", ["Who, what, when, where", "Topic, issue, discussion, recommendation", "Situation, mission, execution", "Strengths, weaknesses, grade"], 1, "AYM-4-5.")],
      },
    ],
  },
  {
    po: 5,
    title: "Map and Compass",
    intro: "You assign and supervise instructors for map and compass training and run a competition.",
    eos: [
      {
        eo: 1, pg: 1, title: "Assign and supervise a map reading class",
        sum: "Select a capable instructor, set a date, review their training plan, supervise without interfering, then produce an after action review and review it with them.",
        facts: [
          ["How do you supervise an instructor?", "Supervise but do not interfere; take notes on their knowledge and training aids."],
          ["What follows the class?", "Discuss it with the instructor, produce an after action review, review the reports, and assign more training if needed."],
        ],
        qs: [tf("When supervising a Young Marine instructor, you should step in and correct them during the class.", false, "Supervise but do not interfere (AYM-5-1).")],
      },
      {
        eo: 2, pg: 2, title: "Assign and supervise a map reading course",
        sum: "The map reading course is the outdoor practical phase after the class. You perform the course yourself to judge how well it was planned.",
        facts: [
          ["Blocks of instruction listed.", "Map scales, conventional signs, map terms, legend and marginal information, orienting a map without a compass, four- and six-digit grid coordinates, using a protractor."],
          ["Why take the course yourself?", "To see how well it was thought out and put together."],
        ],
        qs: [mc("Which is one of the listed blocks of map instruction?", ["Dead reckoning at sea", "Locating a point with four- and six-digit grid coordinates", "Radio procedures", "Firing positions"], 1, "AYM-5-2.")],
      },
      {
        eo: 3, pg: 2, title: "Assign and supervise a compass class",
        sum: "Same process as the map class: pick an instructor based on compass skills, approve a training plan, supervise, request an after action report and review it.",
        facts: [
          ["First step?", "Select a Young Marine based on their compass skills."],
          ["Where can the class be held?", "In a classroom or the field — but dry and comfortable so students can concentrate."],
        ],
        qs: [sa("What do you request from the instructor before a compass class?", "A training plan, which you review and either approve or have changed.", "AYM-5-2.")],
      },
      {
        eo: 4, pg: 3, title: "Assign and supervise a pace count course",
        sum: "The pace count course is run in the field. Make sure the course distance is known and accurate.",
        facts: [
          ["Where is the pace count course held?", "In a field environment."],
          ["What must you ensure about the course?", "That the distance of the course is known and accurate."],
        ],
        qs: [tf("A pace count course should have a known, accurate distance.", true, "AYM-5-3.")],
      },
      {
        eo: 5, pg: 4, title: "Assign and supervise a compass course",
        sum: "Held outdoors in manageable weather; the instructor plans, sets up, teaches and runs it, and you take the course yourself and gather student feedback.",
        facts: [
          ["Weather condition for the compass course?", "Manageable weather conditions."],
          ["How do you evaluate it?", "Perform it yourself, watch students participate and ask for their assessment."],
        ],
        qs: [mc("A compass course should be held…", ["Indoors only", "Outdoors in manageable weather", "At night only", "Only in the rain"], 1, "AYM-5-4.")],
      },
      {
        eo: 6, pg: 4, title: "Create and run a map and compass competition (orienteering)",
        sum: "After courses are complete, you and your instructors plan, set up and oversee a competition at a time of the unit commander’s choosing; your commander explains the purpose, intent and how to run it.",
        facts: [
          ["Who sets the time of the competition?", "The unit commander."],
          ["Competition PQR items include…", "Planning and running it with your instructors, recording team scores, recommending ribbons for the first-place team, and submitting an after action report."],
        ],
        qs: [mc("The map and compass competition is also called…", ["Land drill", "Orienteering", "Field meet", "Pace derby"], 1, "AYM-5-4.")],
      },
    ],
  },
  {
    po: 6,
    title: "Drug Resistance / Personal Safety",
    intro: "You are expected to mentor subordinates on drugs, alcohol and tobacco and to model personal safety. If you ever suspect a safety concern, involve a trusted adult.",
    eos: [
      {
        eo: 1, pg: 1, title: "Set the example for a drug-free lifestyle",
        sum: "Younger Young Marines look up to you. You are expected to be the trusted older friend and the first line of defense who reinforces program values and helps them say no.",
        facts: [
          ["Why does your example matter?", "Younger Young Marines trust older friends; you can be the one they come to for help saying no to peer pressure."],
          ["Role described for you?", "The first line of defense for these young people."],
        ],
        qs: [mc("The guidebook says a senior Young Marine should be…", ["A strict enforcer only", "The older friend and first line of defense", "Uninvolved in personal topics", "The unit counselor for all personal issues"], 1, "AYM-6-1.")],
      },
      {
        eo: 2, pg: 2, title: "Hold informal discussions about drugs, alcohol and tobacco",
        sum: "Use breaks and downtime to talk. Ask about the impact in schools and neighborhoods, never joke about drugs and never put off a discussion.",
        facts: [
          ["Never do what about drug discussions?", "Never joke about drugs, and never put off a discussion — set a time and place to continue if needed."],
          ["Why ask about their schools and neighborhoods?", "To learn the impact drugs have there and tailor your mentoring."],
        ],
        qs: [tf("It is acceptable to joke about drugs to make younger Young Marines comfortable.", false, "Never joke about drugs and other abuses (AYM-6-2).")],
      },
      {
        eo: 3, pg: 2, title: "Relate your own peer-pressure experiences and how to say no",
        sum: "Sharing your own experiences with peer pressure builds trust, and juniors apply the same techniques.",
        facts: [
          ["Why share your experiences?", "Young Marines who trust you will listen and apply the same technique in similar situations."],
          ["Tools used to build trust?", "Leadership, setting the example and mentoring."],
        ],
        qs: [sa("Why does the guidebook want you to share your own experiences with peer pressure?", "Juniors who trust you will listen and use the same techniques when they face similar situations.", "AYM-6-2.")],
      },
      {
        eo: 4, pg: 2, title: "Defensive driving",
        sum: "A car is a machine that needs maintenance. Defensive driving means staying alert for dangers.",
        facts: [
          ["Four defensive driving skills listed.", "Never joy ride; keep windows and mirrors clean; drive the posted speed limit; drive with both hands on the wheel and buckle up."],
          ["Closing line?", "Cars don’t kill… drivers of cars do."],
        ],
        qs: [mc("Which is a listed defensive driving skill?", ["Keep up with the flow of traffic", "Drive the posted speed limit", "Use one hand on the wheel", "Skip regular maintenance"], 1, "AYM-6-3.")],
      },
      {
        eo: 5, pg: 3, title: "Dating",
        sum: "Dating can be fulfilling but has risks. Know the person, let your family meet them and be cautious.",
        facts: [
          ["Safety hints listed.", "Don’t date alone until you really know the person; go to familiar places with others; don’t accept food or drinks from someone you don’t know well; tell parents/friends where you’ll be."],
          ["Never be…", "Alone with someone you do not know or trust well."],
        ],
        qs: [tf("The guidebook advises accepting food or drinks only from someone you know well.", true, "AYM-6-3.")],
      },
      {
        eo: 6, pg: 4, title: "Juggling school, job, dating and family",
        sum: "Set priorities: family first, then school. Every new commitment takes time from something else.",
        facts: [
          ["Top two priorities?", "Family and school."],
          ["Warning about taking on more?", "Don’t spread yourself so thin that family and school suffer."],
        ],
        qs: [mc("According to the guidebook your top priorities should be…", ["Job and dating", "Family and school", "School sports and job", "Young Marines and job"], 1, "AYM-6-4.")],
      },
      {
        eo: 7, pg: 4, title: "Computer safety",
        sum: "Be careful with e-mail, chat, web cams and downloads, protect personal information and talk to your parents first.",
        facts: [
          ["E-mail rule?", "Never open an e-mail unless you know and trust the sender."],
          ["Chat rule?", "Never agree to meet someone you don’t know and never send personal information to them."],
        ],
        qs: [tf("It is safe to share your e-mail address with someone you only know from an online chat.", false, "Do not give your e-mail address to someone you do not know (AYM-6-5).")],
      },
      {
        eo: 8, pg: 5, title: "Safeguarding self, property and others",
        sum: "Lock doors, ask for identification, store valuables out of sight, keep your locker locked and use established routes — never walk alone.",
        facts: [
          ["Someone in a uniform or suit wants to enter?", "Ask for identification; don’t assume they are who they say."],
          ["Valuables in a car?", "Store them in the trunk, out of sight."],
        ],
        qs: [mc("If a person at your door says they work for the utility company, you should…", ["Let them in at once", "Ask for identification", "Ignore the knock", "Give them a key"], 1, "AYM-6-5.")],
      },
      {
        eo: 9, pg: 6, title: "Gangs",
        sum: "Stay clear of gangs and gang activity, avoid their hangouts and talk to your subordinates about the harm gangs cause.",
        facts: [
          ["What should you do if you know where gangs gather?", "Don’t go near there."],
          ["What does the PQR expect?", "That you don’t associate with gangs and talk to subordinates about their negative effects."],
        ],
        qs: [tf("If you know where gangs hang out you should steer clear of those areas.", true, "AYM-6-6.")],
      },
    ],
  },
  {
    po: 7,
    title: "Public Speaking",
    intro: "Key points for becoming an effective speaker.",
    eos: [
      {
        eo: 1, pg: 1, title: "Use good body language",
        sum: "Stand relaxed in one spot, use hand gestures only to emphasize key points, keep hands out of pockets and don’t lean on a podium.",
        facts: [
          ["Stance?", "Stand in one spot unless you have to move, but be relaxed."],
          ["Podium?", "Rest your hands on it if you like, but don’t lean; stand erect."],
        ],
        qs: [tf("Constantly walking back and forth helps keep an audience’s attention.", false, "Move only when you have to (AYM-7-1).")],
      },
      {
        eo: 2, pg: 1, title: "Use proper grammar and breathing",
        sum: "Rehearse out loud, don’t use words you don’t understand, define confusing words and breathe at the end of sentences.",
        facts: [
          ["How should you prepare?", "Rehearse, ideally recording yourself or practicing in front of a mirror."],
          ["When to take a breath?", "At the conclusion of a sentence — don’t run everything together."],
        ],
        qs: [mc("What should you do if you must use a word that may confuse the group?", ["Use it quickly", "Offer a definition", "Whisper it", "Skip the sentence"], 1, "AYM-7-1.")],
      },
      {
        eo: 3, pg: 2, title: "Effective oral communication",
        sum: "Avoid “umm” and “ahh,” project to the last row, don’t end sentences with “ok?” and keep eye contact.",
        facts: [
          ["Instead of “umm”?", "Take a breath and continue on."],
          ["Why avoid ending with “ok?”", "It sounds like you’re asking for approval; have confidence in what you say."],
        ],
        qs: [sa("Why shouldn’t you end sentences with “ok?”", "It makes it seem you’re soliciting the audience’s approval; know your subject and speak with confidence.", "AYM-7-2.")],
      },
      {
        eo: 4, pg: 2, title: "Reach everyone you are speaking to",
        sum: "Know your audience and speak at their level. Avoid Marine jargon and never use acronyms without defining them.",
        facts: [
          ["Jargon example?", "Terms like “grinder,” “ladder” or “pogey bait” confuse a civilian audience."],
          ["Acronym rule?", "Never use an acronym without defining what it means."],
        ],
        qs: [mc("Presenting to a local civic group, you should…", ["Use Marine jargon to sound credible", "Speak at the audience’s level and define acronyms", "Avoid eye contact", "Talk only to the adults"], 1, "AYM-7-3.")],
      },
    ],
  },
  {
    po: 8,
    title: "Leadership",
    intro: "Duties of the Young Marine First Sergeant, Sergeant Major and the adult-billet assistants.",
    eos: [
      {
        eo: 1, pg: 1, title: "Duties of the YM Master Sergeant / YM First Sergeant",
        sum: "There is one unit Young Marine First Sergeant. Duties: retention, arranging promotions and sitting on promotion boards (with the unit XO). Other billets: Recruit Instructor, Parade Commander, Administration.",
        facts: [
          ["Three duties of the unit YM First Sergeant?", "Retention, promotions, and promotion boards."],
          ["Retention duty in practice?", "Sit with a Young Marine thinking of leaving and find out what is driving the decision — it may be fixable."],
        ],
        qs: [mc("Which is a listed duty of the unit Young Marine First Sergeant?", ["Signing unit checks", "Retention", "Entering record book data", "Ordering unit equipment"], 1, "AYM-8-1.")],
      },
      {
        eo: 2, pg: 1, title: "Duties of the YM Master Gunnery Sergeant / Sergeant Major",
        sum: "One Sergeant Major per unit works with the commander, assists with inspections, looks after Young Marines, and handles awards and certificates. The tour lasts 3 to 6 months and must include service at an approved event.",
        facts: [
          ["Length of tour as unit SgtMaj?", "3 to 6 months, then you revert to the Master Gunnery Sergeant insignia."],
          ["Required event service?", "SgtMaj at a battalion/regiment/division encampment, an A/S/J leadership school hosted by National HQ, or an approved SPACES program."],
        ],
        qs: [sa("Name an event where you may serve to earn credit as a Young Marine Sergeant Major.", "A battalion, regiment or division encampment; Advanced, Senior or Junior Leadership School hosted by National HQ; or an approved SPACES program.", "AYM-8-2.")],
      },
      {
        eo: 3, pg: 3, title: "Filling adult billets as Young Marines",
        sum: "Senior Young Marines may assist in adult billets with an adult overseeing on a “correction only” basis. Some tasks are off limits: assistants cannot make record-book entries or sign checks, and a registered adult must be present.",
        facts: [
          ["Which rank groups may assist?", "SgtMaj and XO assistant: YM9; Adjutant and Paymaster assistants: YM8/YM9; Training and Supply assistants: YM7/YM8/YM9."],
          ["What can’t assistants do?", "Adjutant assistants can’t make record book entries; paymaster assistants can’t sign checks; a registered adult must be present."],
        ],
        qs: [tf("A Unit Paymaster Assistant may sign unit checks.", false, "Signing checks is an adult responsibility (AYM-8-4).")],
      },
    ],
  },
  {
    po: 9,
    title: "Citizenship",
    intro: "Local government, citizen responsibilities and community service.",
    eos: [
      {
        eo: 1, pg: 1, title: "The levels of government",
        sum: "Government exists at many levels — home, school, town or city, county, state and federal — and in each, people are elected to serve the interests of those concerned.",
        facts: [
          ["Three branches?", "Legislative (makes laws), Executive (administers and enforces), Judicial (interprets law and applies it to cases)."],
          ["Citizen duty regarding government?", "Know your form of government and support it by voting regularly or getting involved."],
        ],
        qs: [mc("Which branch makes the laws?", ["Executive", "Judicial", "Legislative", "Administrative"], 2, "AYM-9-1.")],
      },
      {
        eo: 2, pg: 2, title: "Responsibilities of citizens",
        sum: "Act on neighborhood problems before they grow, attend meetings, follow local news and vote.",
        facts: [
          ["Examples of acting on problems?", "Call the health department about trash, organize a clean-up, report a missing stop sign to police."],
          ["Voting?", "It’s not only a right but a duty of citizenship."],
        ],
        qs: [tf("The guidebook describes voting as both a right and a duty.", true, "AYM-9-3.")],
      },
      {
        eo: 3, pg: 3, title: "Community service",
        sum: "Community service reaches beyond ribbons: neighborhood clean-ups to government service. Adult volunteers, veterans’ organizations and volunteer fire departments are examples.",
        facts: [
          ["Why serve?", "To help neighbors, provide a safe community and ensure future generations enjoy a safe, friendly, clean environment."],
          ["PQR items include…", "Interviewing a community service provider and reporting a planned project to local government."],
        ],
        qs: [sa("Give two examples of community service from the guidebook.", "Any two: adult volunteers mentoring youth, veterans’ organizations donating to hospitals/libraries, volunteer fire departments, neighborhood clean-ups, government service.", "AYM-9-4.")],
      },
    ],
  },
  {
    po: 10,
    title: "Physical Fitness, Health and First Aid",
    intro: "Printed page labels in this chapter read “BYM-10-x”; the table of contents calls them AYM-10-x. YM360 uses AYM-10-x.",
    eos: [
      {
        eo: 1, pg: 1, title: "Healthy bodies the Young Marine way",
        sum: "Exercise more than at weekly meetings — school sports, leagues, yard work, hikes — and do it vigorously. Ensure your unit does PT weekly and at all encampments.",
        facts: [
          ["Examples of PT outside meetings?", "School sports, youth leagues, yard work, walks or hikes, playing with a dog."],
          ["Your unit responsibility?", "Ensure PT is performed weekly and at all encampments."],
        ],
        qs: [tf("Physical training should only happen at Young Marine meetings.", false, "Exercise more than once a week and outside functions (AYM-10-1).")],
      },
      {
        eo: 2, pg: 2, title: "Keeping your Young Marines physically fit",
        sum: "Put PT in every meeting and encampment, vary activities, encourage a home program and make it fun.",
        facts: [
          ["Activity ideas listed.", "Relay races, a good hike, organized athletics, squad/platoon/unit competitions."],
          ["Tone of PT?", "Make it fun — don’t make it something they regret."],
        ],
        qs: [mc("The guidebook says a good PT plan should be…", ["Punishing", "Fun and varied", "Silent", "Optional"], 1, "AYM-10-2.")],
      },
      {
        eo: 3, pg: 2, title: "Eating for fitness and health",
        sum: "Food is fuel. Drink about 8 glasses of water daily, eat some fat but not too much, limit sugar and watch salt, and eat 2½ cups of vegetables and 2 cups of fruit daily.",
        facts: [
          ["Food vs. water?", "A person can live about 60 days without food but only about ten without water."],
          ["Daily fruit and vegetables?", "2½ cups of vegetables and 2 cups of fruit."],
        ],
        qs: [mc("How many cups of fruit does the guidebook recommend per day?", ["1", "2", "3", "4"], 1, "AYM-10-3.")],
      },
      {
        eo: 4, pg: 3, title: "Re-qualify in CPR",
        sum: "A senior Young Marine must re-qualify in CPR and place the certificate in the Record Book because safety is the number one priority. (See the Source Notes about which rank this applies to.)",
        facts: [
          ["Where does the certificate go?", "In your Young Marine Record Book."],
          ["Why re-qualify?", "Your responsibility, and the number of Young Marines you’re responsible for, has increased — safety is the number one priority."],
        ],
        qs: [tf("The CPR certificate of completion should be kept in your Record Book.", true, "AYM-10-3.")],
      },
    ],
  },
];

export const advancedPOs = raw;

export const allEOs = raw.flatMap((p) =>
  p.eos.map((e) => ({
    ...e,
    po: p.po,
    poTitle: p.title,
    id: `AYM-PO${p.po}-EO${e.eo}`,
    ref: `AYM-${p.po}-${e.pg}`,
    pdf: `${ADV_PDF}#page=${START[p.po] + e.pg - 1}`,
  }))
);

// Discrepancies / unclear items found while reading the supplied files.
export const sourceNotes = [
  {
    title: "Performance Objective 8 lists an Enabling Objective 4 that is not in the text",
    detail:
      "The PO 8 opening page (AYM-8-1) lists “4. Prepare documentation for an award,” but the table of contents, body text and Performance Qualification Review contain only EO 1–3. YM360 does not invent objective 4. Verify with program leadership.",
  },
  {
    title: "Which rank must re-qualify in CPR?",
    detail:
      "PO 10 EO 4 is titled “…to be eligible for MGySgt,” but its review row says “Master Sergeants must be re-qualified,” and the Awards Manual (p. 59) says Headquarters requires re-certification before promotion to YM/MSgt. Confirm the correct rank with program leadership.",
  },
  {
    title: "Page labels in PO 10",
    detail: "The table of contents uses AYM-10-x while the printed pages read BYM-10-x.",
  },
  {
    title: "FLAME vs. FLAMET",
    detail: "The text introduces FLAME and says to add a “T” for transportation; the review row calls it FLAMET. They describe the same checklist.",
  },
];