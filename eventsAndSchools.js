export const events = [
  {
    id: "encampment", name: "Unit encampment & field exercises",
    overview: "Advanced Young Marines plan, execute and supervise encampments and field exercises with their commander’s permission.",
    verified: [
      "Plan What, Who and How. Use FLAMET for logistics: Fees, Lodging, Activities, Meals, other Expenses, Transportation (Advanced Guidebook AYM-4-2).",
      "Delegate only to people who can do the task, and give complete instructions (AYM-4-1).",
      "Safety first. Youngest Young Marines get the first or last fire watch; never shame a Young Marine for bedwetting; don’t assume illness is homesickness; arrange for religious practice without imposing; schedule free time; welcome parents when camping locally (AYM-4-4).",
      "After the event collect after action reports from subordinates and adults and an after action review from the unit commander. AAR format: topic, issue, discussion, recommendation (AYM-4-5).",
      "Young Marine Encampment ribbon: battalion, regiment, division or national encampment; must be outdoors, not a hotel (Awards Manual p. 78).",
      "PQR: a unit encampment of at least three days and two nights (AYM-4-7).",
    ],
    prep: ["Get your commander’s permission", "Meet with staff to assign classes and duties", "Confirm the FLAMET plan with the paymaster and training officer", "Plan for age differences and free time"],
  },
  {
    id: "unit-trip", name: "Organized unit trip",
    overview: "A unit activity involving an overnight stay.",
    verified: [
      "Participate in two unit activities, each at least two days and one night, away from home, the normal drill site and the local community (Awards Manual p. 79).",
      "Not held with a higher headquarters encampment or school.",
      "Recommended: a trip aboard a military installation that is not a normal drill site, unit encampments, or a field trip to a state or national capital if it meets the criteria.",
    ],
    prep: ["Confirm the dates and overnight arrangements with your commander", "List the adult supervisors"],
  },
  {
    id: "drill", name: "Drill team, color guard & competition",
    overview: "Close order drill is used to instill discipline through precision and automatic response to orders.",
    verified: [
      "Drill Team ribbon: member of the unit drill team; at least 3 events and one public function (Awards Manual p. 77).",
      "Color Guard ribbon: one year or five public functions (p. 44).",
      "Drill Competition ribbon: marching member of a drill team or color guard competing against others, judged by other officials (p. 40).",
      "Battalion drill commands and the troop-the-line procedure are in Advanced Guidebook PO 1.",
      "The complete drill manual with color guard and guidon drill is in the Training Officers Manual (AYM-1-1). The Marine Corps drill manual (MCO 5060.20) is a Marine Corps publication, not a Young Marines manual.",
    ],
    prep: ["Review PO 1 in the Guidebook Center", "Confirm the drill reference your unit uses with your training officer"],
  },
  {
    id: "service", name: "Community & veterans service projects",
    overview: "Service projects can also support awards such as the Community Service and Veterans Appreciation ribbons.",
    verified: [
      "Community Service ribbon: 50 certified hours within 12 months (Awards Manual p. 57).",
      "Veterans Appreciation ribbon: participate in listed national veteran-related events and complete activities within 12 months (p. 46).",
      "When choosing a project consider: who is impacted, written community support, media coverage, assistance and labor, legal issues, liability and future maintenance (DOM project guidance, p. 9).",
      "After completion: submit an after action review with before and after photos and send thank-you notes (p. 9).",
    ],
    prep: ["Write your project goal in one sentence", "List approvals and permits needed", "Plan the after action review"],
  },
  {
    id: "map-compass", name: "Map & compass competition (orienteering)",
    overview: "Held after courses are complete, at a time chosen by the unit commander.",
    verified: [
      "Plan, set up and oversee the competition with your instructors; your commander explains purpose, intent and the how-to (AYM-5-4).",
      "Record team scores and recommend ribbon awards for the first-place team; submit an after action report (AYM-5-6).",
      "Orienteering ribbon requirements are on Awards Manual p. 72.",
    ],
    prep: ["Confirm the course distances are accurate", "Check weather and safety plans"],
  },
  {
    id: "leadership-school", name: "Leadership schools (JLS, SLS, ALS)",
    overview: "See the Leadership Schools section for verified ribbon criteria.",
    verified: ["School requirements come from the school director and Headquarters Young Marines. YM360 does not publish schedules or packing lists."],
    prep: ["Use the Leadership Schools checklist"],
  },
];

export const schools = [
  {
    id: "jls", name: "Junior Leadership School (JLS)", ribbon: "Junior Leadership Ribbon", pg: 56,
    summary: "A one-week National Junior Leadership School or a nationally certified local school.",
    verified: [
      "Pass the Physical Fitness Test.",
      "Demonstrate the ability to drill a Young Marine squad.",
      "Carry out assigned leadership duties in a satisfactory manner.",
      "Serve as a positive student leader and team member to peers.",
      "Meet all performance and conduct standards established by the school director.",
      "Complete a one-week Junior Leadership School.",
    ],
    extra: "Regiment-level Young Marine Staff ribbon requires being a JLS graduate (Awards Manual p. 43). Honor Graduate device: silver J.",
  },
  {
    id: "sls", name: "Senior Leadership School (SLS)", ribbon: "Senior Leadership Ribbon", pg: 55,
    summary: "A one-week National Senior Leadership School or a nationally certified local school.",
    verified: [
      "Pass the Physical Fitness Test.",
      "Demonstrate the ability to drill a Young Marine platoon.",
      "Demonstrate the ability to instruct.",
      "Carry out assigned leadership positions in a satisfactory manner.",
      "Serve as a positive student leader and team member to peers.",
      "Meet all performance and conduct standards established by the school director.",
      "Complete a one-week Senior Leadership School.",
    ],
    extra: "Division-level Young Marine Staff ribbon requires being an SLS graduate (p. 43). Honor Graduate device: silver S.",
  },
  {
    id: "als", name: "Advanced Leadership School (ALS)", ribbon: "Advanced Leadership Ribbon", pg: 54,
    summary: "The two-week National Advanced Leadership School.",
    verified: [
      "Pass the Physical Fitness Test.",
      "Demonstrate the ability to drill a Young Marine platoon.",
      "Demonstrate the ability to instruct.",
      "Carry out assigned duties in a satisfactory manner.",
      "Serve as a positive leader and role model to senior and junior leaders.",
      "Meet all performance and conduct standards established by the school director.",
      "Complete the two-week Advanced Leadership School.",
    ],
    extra: "Gold Roman numeral X is awarded to the top 10 ALS graduates. National-level Young Marine Staff ribbon requires being an ALS graduate (p. 43). Honor Graduate device: gold A.",
  },
];