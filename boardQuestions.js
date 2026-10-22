// Master board question bank. One record per question; levels are tags (a question is never duplicated).
// "original" questions preserve the exact wording supplied by the site owner. Do not edit their text.

export const LEVELS = [
  { id: "unit", label: "Unit" },
  { id: "regiment", label: "Regiment" },
  { id: "division", label: "Division" },
  { id: "national", label: "National YMOY" },
  { id: "promotion", label: "Promotion" },
  { id: "school", label: "Leadership school" },
  { id: "other", label: "Other leadership board" },
];
const ALL = ["unit", "regiment", "division", "national", "promotion", "school", "other"];
const LEAD = ["unit", "regiment", "division", "national", "promotion", "school"];
const DIV = ["division", "national"];

export const FRAMEWORKS = {
  reflect: { name: "Personal reflection", steps: ["Direct answer", "Explanation", "Real example", "Action or lesson", "Application to the role"] },
  star: { name: "Leadership scenario", steps: ["Situation", "Responsibility", "Action", "Result", "Lesson learned", "Future application"] },
  scenario: { name: "Judgment scenario", steps: ["Assess the situation and any danger", "Name your priority", "Action steps", "Who you involve and why", "Follow-up"] },
  plan: { name: "Leadership plan", steps: ["Goal", "Current situation and likely causes", "Actions", "People and channels you work through", "How you will measure success", "Obstacles and what you would learn"] },
  values: { name: "Values in your own words", steps: ["Define it in your own words", "Why it matters", "A moment you lived it", "How you apply it now"] },
  pitch: { name: "Elevator pitch", steps: ["Hook", "What the program is", "What a young person gains", "Invitation to act"] },
};

export const GENERIC_RUBRIC = [
  "Clear: someone could repeat my main point after one listen.",
  "Relevant: I answered the question that was actually asked.",
  "Organized: my answer had a beginning, middle and end.",
  "Authentic: I used only real experiences and my own words.",
  "Sound judgment: I showed respect for safety, authority and others.",
];

export const SHARED_FOLLOWUPS = [
  "How would you implement that?",
  "How would you measure whether it worked?",
  "What obstacles might you face, and how would you handle them?",
  "What would you do differently next time?",
];

let seq = 0;
const O = (group, topic, levels, text, fw, w, m, f) => {
  seq += 1;
  return { id: `OQ-${String(seq).padStart(3, "0")}`, source: "original", group, topic, levels, text, fw, w, m, f };
};

const P = "Personal reflection";
const D = "Division YMOY motivation & legacy";
const L = "Leadership, mentoring & conflict";
const V = "Division vision & communication";
const K = "Program knowledge & service";

export const originalQuestions = [
  // ---- Personal accomplishments, character, and motivation
  O(0, P, ALL, "Which ribbon are you the most proud of?", "reflect",
    ["Names one real ribbon you earned and what it took", "Explains the effort, time and people behind it, not just how it looks", "Connects it to what you learned or how you serve now"],
    ["Choosing a ribbon only because it ranks highest", "Describing the ribbon without saying why it matters to you"],
    ["What would you tell someone who wants to earn it?", "Which ribbon do you want to earn next, and why?"]),
  O(0, P, ALL, "What’s your biggest ym accomplishment?", "reflect",
    ["Picks one real accomplishment and states the result", "Shows your specific role, not only the team’s", "Shows growth: how it changed the way you lead or serve"],
    ["Listing many accomplishments with no depth", "Taking all the credit or ignoring the team"],
    ["What obstacle came up along the way?", "Who helped you, and how did you recognize them?"]),
  O(0, P, ALL, "What does being a ym mean to you?", "values",
    ["Gives your own meaning, not a slogan", "Backs it with a moment, habit or responsibility from your experience", "Shows what the program asks of you outside of drill"],
    ["Reciting the mission statement word for word", "Staying abstract with no personal example"],
    ["Has that meaning changed since you joined?", "How do you show it at school or at home?"]),
  O(0, P, ALL, "What does ddr mean to you?", "values",
    ["Correctly explains DDR as Drug Demand Reduction, the program’s drug-prevention focus", "Says why it matters in your own words", "Shows personal action: setting the example, speaking up, resisting peer pressure"],
    ["Using the acronym without explaining it", "Only saying “drugs are bad” with no action behind it"],
    ["How have you taken part in DDR efforts?", "How would you help a younger Young Marine who feels peer pressure?"]),
  O(0, P, ALL, "What does each of the three core values mean to you?", "values",
    ["Names the three core values accurately — the Advanced Guidebook lists Honor, Courage and Commitment (AYM page 1)", "Gives each value its own meaning instead of three versions of one idea", "Offers a short example or habit for each"],
    ["Forgetting one of the three", "Defining each value with a dictionary phrase and nothing personal"],
    ["Which value is hardest for you, and why?", "When have you seen someone live one of them?"]),
  O(0, P, ALL, "What is your favorite memory as a Young Marine and why?", "reflect",
    ["A specific, vivid moment with enough detail to picture it", "Explains why it mattered — the people, the challenge or the meaning", "Ties the memory to what keeps you in the program"],
    ["A vague “everything” answer", "A memory that is only about fun, with no link to values"],
    ["Who was with you?", "How would you give a younger Young Marine a moment like that?"]),
  O(0, P, ALL, "What is one act of kindness that you have witnessed that has made an impact on you?", "reflect",
    ["Describes a real act briefly and clearly", "Explains the effect it had on you", "Shows how it changed what you do"],
    ["Choosing a story that sounds impressive but isn’t true", "Telling the story without the impact"],
    ["Did you thank the person?", "How have you passed that kindness on?"]),
  O(0, P, ALL, "What is one act of unselfishness that you have performed in the last 24 hours?", "reflect",
    ["An honest answer — small, true acts count", "Shows you put someone else’s need first", "Sounds natural, not rehearsed or boastful"],
    ["Inventing a dramatic act", "Saying you can’t think of one and stopping there; instead name the most recent real one and what it taught you"],
    ["Why did you choose to act?", "How can you build more unselfish habits?"]),
  O(0, P, ALL, "Do you think you are more hard on yourself or on others? Why or why not?", "reflect",
    ["Honest self-awareness; picks one with reasons", "Shows the effect on you and on the people you lead", "Explains how you balance high standards with encouragement"],
    ["Claiming neither to avoid the question", "Being so self-critical it sounds like a complaint"],
    ["How do you handle a teammate who misses the standard?", "How do you give yourself grace after a mistake?"]),
  O(0, P, ALL, "What’s your greatest weakness and strength as a leader?", "reflect",
    ["Names one real strength and one real weakness", "Gives evidence for each", "Shows concrete steps you take to improve the weakness"],
    ["Disguised strengths (“I just care too much”)", "Naming a weakness with no plan"],
    ["How would your peers describe your leadership?", "What feedback have you acted on?"]),
  O(0, P, ALL, "What was the biggest struggle you’ve had to overcome in the YMs?", "star",
    ["A real challenge described briefly", "Your actions and the support you sought", "The lesson you carry now (share only what you are comfortable sharing)"],
    ["Dwelling on the problem instead of your response", "Blaming others"],
    ["Who helped you?", "Would you handle it differently today?"]),
  O(0, P, ALL, "Tell about a time you have failed in the program and what did you do to grow and learn from that experience?", "star",
    ["Owns the failure without excuses", "Explains what you learned and changed", "Shows resilience and later results"],
    ["Choosing a “failure” that is really a success", "Blaming circumstances"],
    ["What did you change in your routine afterward?", "How do you coach others through a setback?"]),

  // ---- Division YMOY motivation, goals, and legacy
  O(1, D, DIV, "Why do you want to be division ymoy?", "reflect",
    ["A motive centered on service, not status", "Links to your real experience and strengths", "Previews what you would give the division"],
    ["Focusing on the title, honor or ribbons", "A generic “to make a difference” with no specifics"],
    ["What would you do if you weren’t selected?", "What do you hope to learn from the role?"]),
  O(1, D, DIV, "What would be the first thing you do in that role?", "plan",
    ["One clear first action, not a wish list", "A reason: listening before acting is often the strongest start", "How you would involve unit leaders"],
    ["Announcing sweeping changes before learning what units need", "Choosing an action that mostly benefits you"],
    ["Why that first?", "What would you do in the first 30 days?"]),
  O(1, D, DIV, "What goals would you try to accomplish while in that role?", "plan",
    ["Two or three focused goals tied to real division needs", "Each goal has an action and a way to measure it", "Respect for channels and the limits of the role"],
    ["Too many vague goals", "Promising what cannot be done in one term"],
    ["Which goal matters most and why?", "How would you know a goal succeeded?"]),
  O(1, D, DIV, "Why do you deserve Division ymoy?", "reflect",
    ["Evidence of service, growth and conduct", "Humility — does not tear down other candidates", "Connects past actions to the responsibilities of the role"],
    ["Listing awards only", "Comparing yourself with other candidates"],
    ["What would others say about you?", "What are you still working on?"]),
  O(1, D, DIV, "Why you?", "reflect",
    ["A short, confident, evidence-based answer", "Names what you specifically bring", "Ends with service, not self-promotion"],
    ["Rambling", "Arrogance — or false modesty"],
    ["What makes your approach different?", "What can you learn from the other candidates?"]),
  O(1, D, DIV, "Why is being DYMOY important to you?", "values",
    ["A personal reason with a real story", "Shows commitment beyond the title", "Names the Young Marines you want to serve"],
    ["A prestige answer", "Repeating your answer to “Why do you want to be division ymoy?”"],
    ["What could this role let you do that you can’t do now?", "How would you handle the pressure?"]),
  O(1, D, DIV, "Say you get DYMOY, what would you want your legacy to be after you retire?", "plan",
    ["A legacy framed as lasting benefit to Young Marines, not your name", "Concrete, sustainable outcomes: mentors, habits, systems", "A plan to hand off to your successor"],
    ["A legacy about personal recognition", "Unrealistic promises"],
    ["How would you make it last after your term?", "What would you like a young Young Marine to say about you?"]),
  O(1, D, DIV, "If you don’t get YMOY, will you/what steps would you take to execute all of your goals while not being in the YMOY position?", "plan",
    ["Shows your goals do not depend on a title", "Names steps you can take in your unit and regiment", "Works through the proper leaders"],
    ["Sounding like it’s a consolation prize", "Planning to bypass the selected YMOY"],
    ["Which goal would you start first?", "Who would you ask for support?"]),
  O(1, D, DIV, "If you didn’t get YMOY, how would you work with the 2027 D5 YMOY to accomplish both yours and their goals within the division? Would you work with them?", "plan",
    ["Respecting the selection decision", "Continuing to serve without resentment", "Listening to the selected YMOY’s vision before offering your own", "Identifying shared goals", "Offering useful support without competing for credit", "Recognizing the difference between contributing ideas and holding the official position", "Showing that leadership does not depend on a title — and answering “Would you work with them?” directly"],
    ["Answering only “yes” or “no” with no how", "Hinting you would rather be in charge", "Planning to work around the selected YMOY"],
    ["What if you disagree with their approach?", "How would you feel if they received credit for your idea?"]),
  O(1, D, DIV, "If you don’t get YMOY, how will that decision, if at all, affect your growth, effort, view of the program, and execution of the goals you have laid out?", "reflect",
    ["Honest, mature handling of disappointment", "Commitment to effort regardless of title", "Keeps a positive view of the program and your goals"],
    ["Pretending you would feel nothing", "Saying you would slow down or step back"],
    ["How would you act at the first meeting after the decision?", "What would keep you motivated?"]),

  // ---- Leadership, mentoring, and conflict resolution
  O(2, L, LEAD, "If you found out that one of your close friends was doing drugs, what would you do?", "scenario",
    ["Concern for your friend’s safety and well-being", "Refusing to enable harmful behavior", "Approaching the situation with care and honesty", "Seeking help from an appropriate trusted adult or program leader", "Following applicable safety and reporting procedures", "Recognizing that protecting a friend does not mean hiding a serious safety concern"],
    ["Promising to keep it a secret", "Handling it entirely alone or confronting angrily", "Cutting off the friendship instead of helping"],
    ["What if your friend begs you not to tell anyone?", "What would you say in the first conversation?"]),
  O(2, L, LEAD, "If you notice two yms arguing what will you do?", "scenario",
    ["Stays calm and first checks that no one is in danger", "Focuses on the issue, not the individuals, and finds common ground (Advanced Guidebook PO 2, EO 1)", "Listens to both sides and involves an adult leader if it continues or becomes unsafe"],
    ["Taking sides", "Ignoring it, or joining in"],
    ["What if one of them refuses to talk?", "When would you bring in an adult?"]),
  O(2, L, DIV, "How would you mentor your Young Marines on a division level?", "plan",
    ["Mentoring that scales: training unit leaders, sharing tools", "Listening, role-modeling and individual attention", "Working through commanders and existing structure"],
    ["Describing only what you do in your own unit", "Treating mentoring as lecturing"],
    ["How would you reach units you rarely see?", "How would you check that it is working?"]),
  O(2, L, LEAD, "Which is more important to you: being a leader, manager, or mentor?", "reflect",
    ["Picks one and justifies it, while respecting the others", "Backs the choice with a real example", "Shows how the choice serves younger Young Marines"],
    ["Dodging the choice", "Treating the three as the same thing"],
    ["When do you need to act as the other two?", "Who has mentored you?"]),
  O(2, L, LEAD, "Name a young marine whom you have lead or mentored, what are you most proud of about them?", "reflect",
    ["A real person and a real example — nothing invented", "Specific growth you saw and your role in it", "Humility about their effort"],
    ["Sharing private details without their consent", "Taking credit for their growth"],
    ["What did you learn from mentoring them?", "How did you adapt to them?"]),
  O(2, L, LEAD, "If you were in a situation where an Adult Volunteer was in the wrong, how would you let them know/take control of that situation while maintaining professionalism, respect, and avoiding conflict?", "scenario",
    ["Remaining calm and professional", "Assessing whether anyone is in immediate danger and addressing an urgent safety concern appropriately", "Respectfully communicating facts rather than making personal accusations", "Using appropriate reporting and escalation channels", "Understanding that a Young Marine should not assume authority they do not have", "Seeking help from an appropriate trusted adult when necessary"],
    ["Confronting an adult in front of others", "Assuming authority you do not have — “taking control” literally", "Doing nothing when safety is at risk"],
    ["What if the issue is a safety hazard right now?", "Who is the right person to bring a concern to?"]),
  O(2, L, DIV, "How will you work with the unit commanders as well as the unit young marines of the year to accomplish all of your division goals?", "plan",
    ["Respect for the chain of command", "Regular listening and clear communication", "Shared goals and shared credit"],
    ["Treating commanders as obstacles", "Assigning work without understanding unit limits"],
    ["What if a commander disagrees with your plan?", "How would you recognize unit YMOYs’ contributions?"]),

  // ---- Division-level vision, improvement, and communication
  O(3, V, DIV, "What is the biggest problem in our program, and how would you fix it on a division level?", "plan",
    ["Names a problem supported by evidence, not only opinion", "Looks at root causes", "Offers a realistic fix through proper channels"],
    ["Blaming individuals or units", "A solution that needs authority you will not have"],
    ["How do you know this is the biggest problem?", "How would you measure progress?"]),
  O(3, V, DIV, "How would you fix retention in the program across our division?", "plan",
    ["Identifying likely causes rather than assuming every unit has the same problem", "Listening to Young Marines, adult volunteers and unit leadership", "Proposing practical, realistic initiatives", "Accounting for the different needs and distances between units", "Explaining how you would coordinate with unit leaders", "Identifying how you would measure whether retention improved", "Recognizing the limits of a Division YMOY’s authority and working through appropriate leadership channels"],
    ["One-size-fits-all fixes", "Promising to “fix” retention alone", "No way to tell whether it worked"],
    ["What would you do first?", "What if a unit does not want to participate?"]),
  O(3, V, DIV, "If you could instill one rule for everyone to follow in our division, what would that rule be?", "reflect",
    ["A rule you can state in one sentence", "A reason it would improve the division, tied to program values", "How you would model it, not only enforce it"],
    ["A rule that only punishes", "Several rules disguised as one"],
    ["How would you introduce it?", "What would you do when someone doesn’t follow it?"]),
  O(3, V, DIV, "D5 is very spread out, how would you fix the communication between units, regiments, and across all YMs in the division?", "plan",
    ["Accounts for distance and different unit needs", "Proposes simple, dependable routines and clear points of contact", "Includes ways to hear back from units"],
    ["Relying on one platform every unit may not use", "Assuming all units communicate the same way"],
    ["How would you reach a unit that rarely responds?", "How would you protect the privacy of minors in your tools?"]),
  O(3, V, DIV, "Being DYMOY comes with a lot of responsibilities. How will you balance/manage being an advanced leader in your unit and regiment, schoolwork and other extracurricular activities, while fulfilling all of your division duties?", "plan",
    ["A realistic plan: priorities, calendar and delegation", "Honest priorities — the Advanced Guidebook says family and school should be your number one priorities (AYM-6-4)", "Using your team and knowing when to ask for help"],
    ["Saying you will simply “do it all”", "Ignoring school or sleep"],
    ["What would you give up if you had to?", "How would you know you were overloaded?"]),

  // ---- Program knowledge, values, and service
  O(4, K, ALL, "What does the motto, Strengthening the Lives of America’s Youth, mean to you?", "values",
    ["Explains the motto in your own words", "Links it to what the program did for you", "Gives an example of strengthening someone else’s life"],
    ["Repeating the motto back", "Making it only about yourself"],
    ["How have you strengthened another young person’s life?", "What more could the program do?"]),
  O(4, K, ALL, "What does the creed and obligation mean to you?", "values",
    ["Knows the creed and obligation accurately — verify the exact wording in your guidebook", "Explains what they ask of you every day", "Gives an example of living them"],
    ["Reciting without explaining", "Misquoting them"],
    ["Which line is hardest to live by?", "How do you remind younger Young Marines of them?"]),
  O(4, K, ALL, "Why is veterans appreciation a focal point in our program?", "values",
    ["Explains why honoring veterans connects to citizenship and service", "Mentions real activities, such as those behind the Veterans Appreciation ribbon (national veteran-related events, interviews, research)", "Shares a personal experience with veterans"],
    ["Generic patriotism with no example", "Claiming facts about the program you have not verified"],
    ["What have you learned from a veteran?", "How can a unit make veterans feel appreciated?"]),
  O(4, K, ALL, "What does community service mean to you?", "values",
    ["Your own meaning, beyond hours and ribbons", "A real project and what it taught you", "Why service matters to the community"],
    ["Talking only about earning the Community Service ribbon", "No example"],
    ["What project would you want to start?", "How do you stay committed when service isn’t convenient?"]),
  O(4, K, ALL, "What does success in the Young Marines look like to you?", "reflect",
    ["A clear definition that goes beyond rank and ribbons", "Evidence of growth, character and service", "Applies to every Young Marine, not just leaders"],
    ["Defining success as rank only", "Staying abstract"],
    ["How do you measure success for yourself?", "How would you help a struggling member succeed?"]),
  O(4, K, ALL, "What does success as a leader in the YMs look like to you?", "reflect",
    ["Success measured through others’ growth", "Examples of leading by example", "Humility and accountability"],
    ["Defining success as being in charge", "Ignoring the people you lead"],
    ["How would you know you were succeeding?", "What would you do if you failed to meet it?"]),
  O(4, K, ALL, "If someone came up to you asking about the program, what would you say? Give your elevator speech", "pitch",
    ["About thirty seconds, in plain language", "Avoids jargon and undefined acronyms (Advanced Guidebook PO 7, EO 4)", "Speaks from your own experience and invites the person to learn more"],
    ["Reading a memorized script", "Claiming things about the program that you cannot verify"],
    ["How would you answer a worried parent?", "What would you say to a skeptical teenager?"]),
  O(4, K, ALL, "If you had a sign around your neck at all times describing who you are, what would be the single word that’s written on that sign?", "reflect",
    ["One word, explained immediately", "A word that is authentic to you, backed by evidence", "A word that shows character, not a title"],
    ["Choosing a word to impress the board", "Not explaining the word"],
    ["Would your peers choose the same word?", "Which word do you want to earn?"]),
];

// ---- Supplemental YM360 practice questions (NOT real board questions)
let sseq = 0;
const S = (topic, text, fw, w, m, f) => {
  sseq += 1;
  return { id: `SQ-${String(sseq).padStart(3, "0")}`, source: "supplemental", group: 9, topic, levels: LEAD, text, fw, w, m, f };
};

export const supplementalQuestions = [
  S("Accountability", "Describe a time you were responsible for a mistake that affected others. How did you take ownership?", "star",
    ["Names the mistake plainly", "Takes ownership before explaining circumstances", "Shows repair and prevention"], ["Blaming others", "Minimizing the effect"], ["Whom did you tell first?"]),
  S("Ethical decisions", "You learn that a teammate rounded up their community service hours on a form. What do you do?", "scenario",
    ["Values honesty and fairness", "Talks to the teammate respectfully first when appropriate", "Reports to the proper leader if it is not corrected"], ["Ignoring it", "Public accusation"], ["What if the teammate is your close friend?"]),
  S("Leadership under pressure", "Your event starts in ten minutes and the guest speaker has not arrived. How do you lead your team?", "star",
    ["Stays calm and communicates clearly", "Assesses options and assigns roles", "Keeps leaders informed"], ["Panicking", "Doing everything yourself"], ["What backup plan would you have prepared?"]),
  S("Delegation", "You have more tasks than time before a major event. How do you decide what to delegate and to whom?", "plan",
    ["Prioritizes tasks", "Matches tasks to ability and gives clear, complete instructions (Advanced Guidebook PO 4, EO 1)", "Follows up without taking over"], ["Delegating everything", "Giving unclear instructions"], ["How do you handle a task not done on time?"]),
  S("Unit collaboration", "Two units in your region disagree about who should host a joint training. How would you help them reach an agreement?", "plan",
    ["Listens to both sides", "Focuses on shared goals", "Respects commanders’ authority"], ["Taking a side", "Deciding for them"], ["What if they still cannot agree?"]),
  S("Retention and engagement", "A capable Young Marine tells you they are thinking of leaving. What do you do?", "scenario",
    ["Listens first without arguing", "Learns the real reason (the Advanced Guidebook suggests it may be fixable)", "Involves unit leadership when appropriate"], ["Guilt-tripping", "Promising what you cannot deliver"], ["What if the reason is a conflict with another member?"]),
  S("Mentorship", "How would you help a quiet new Young Marine become a confident leader?", "plan",
    ["Starts small with achievable responsibility", "Gives specific, sincere encouragement", "Checks in and adjusts"], ["Pushing too fast", "Comparing them with others"], ["How do you know it is working?"]),
  S("Planning and prioritization", "You have six weeks to plan a service project. Walk through how you would plan and prioritize.", "plan",
    ["Clear goal and approvals", "Timeline with milestones and roles", "Review plan and after action report"], ["Starting without permission", "No timeline"], ["What would you cut if time ran short?"]),
  S("Receiving criticism", "Tell about feedback that was hard to hear. What did you change?", "star",
    ["Listens without defensiveness", "Identifies what was true in the feedback", "Shows a real change"], ["Dismissing the critic", "Choosing trivial feedback"], ["How do you give feedback to others?"]),
  S("Handling failure", "Describe a goal you set but did not reach. What did you learn?", "star",
    ["Honest about the shortfall", "Specific lesson", "Next step"], ["Excuses", "Pretending it was a success"], ["Would you set the goal again?"]),
  S("Communicating a division-wide initiative", "How would you announce and explain a new division-wide initiative so every unit understands it?", "plan",
    ["Clear message and purpose", "Multiple channels suited to different units", "Feedback loop and questions"], ["One long message", "Using unexplained jargon"], ["How would you confirm units understood?"]),
  S("Evaluating a change", "Three months after launching a change, how would you tell whether it worked?", "plan",
    ["Defines success before starting", "Uses simple measures and feedback from people", "Adjusts or stops if needed"], ["Judging by feeling alone", "Never reviewing"], ["What if results are mixed?"]),
  S("Supporting a struggling member", "A Young Marine’s attendance and attitude have dropped. How would you support them?", "scenario",
    ["Checks in privately with care", "Listens for causes", "Involves an adult leader if there is a safety or well-being concern"], ["Public criticism", "Promising confidentiality you cannot keep"], ["When would you involve an adult?"]),
  S("Authority and empathy", "How do you balance holding people to the standard with showing understanding?", "reflect",
    ["Standards stay clear", "Understanding explains how, not whether, the standard is met", "Real example"], ["Choosing only one side", "No example"], ["Describe a time the balance was difficult."]),
  S("Responding to inaccurate information", "A peer is sharing incorrect information about a promotion requirement. How do you respond?", "scenario",
    ["Checks the facts in the official source first", "Corrects respectfully and privately if possible", "Sends people to the right leader for official answers"], ["Correcting from memory", "Embarrassing the peer"], ["What if you are the one who was wrong?"]),
  S("Leading without a title", "Tell about a time you led without holding a particular position or title.", "star",
    ["Real example", "Influence through example and service", "Credit shared"], ["Claiming a title you did not hold", "No concrete action"], ["What did you learn about leadership?"]),
];

export const allBoardQuestions = [...originalQuestions, ...supplementalQuestions];
export const boardTopics = [...new Set(allBoardQuestions.map((q) => q.topic))];
export const getQuestion = (id) => allBoardQuestions.find((q) => q.id === id);
export const BOARD_GROUPS = [P, D, L, V, K];