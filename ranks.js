// Young Marines rank ladder. Insignia descriptions and "how-to" guidance are
// supplemental YM360 summaries — always confirm the exact insignia and
// advancement requirements in your guidebook and with your commander.
// Rank numbers (YM1–YM9) follow the standard Young Marines enlisted ladder.
export const ranks = [
  {
    id: "ym1", name: "Young Marine Private", abbr: "YM1", level: "Recruit",
    insignia: "One chevron (single rocker pointing up).",
    howTo: "Earned on graduation from recruit training. Complete every Performance Objective in the recruit cycle and pass your final inspection and PFT.",
    serves: "Every Young Marine starts here. Learn the Obligation, Creed, drill basics and unit culture.",
  },
  {
    id: "ym2", name: "Young Marine Private First Class", abbr: "YM2", level: "Junior",
    insignia: "One chevron with crossed rifles.",
    howTo: "Complete the Junior Guidebook Performance Objectives, pass your board, and meet attendance and conduct standards set by your unit.",
    serves: "Build the study and drill habits you'll use for every rank after this.",
  },
  {
    id: "ym3", name: "Young Marine Lance Corporal", abbr: "YM3", level: "Junior",
    insignia: "One chevron pointing up.",
    howTo: "Continue through the Junior Guidebook, demonstrate instructor-ready knowledge of basic subjects, and pass your promotion board.",
    serves: "A junior leader — begin helping newer Young Marines with basics.",
  },
  {
    id: "ym4", name: "Young Marine Corporal", abbr: "YM4", level: "Junior",
    insignia: "Two chevrons pointing up.",
    howTo: "Advance through the Basic Guidebook, show you can guide a small group, and pass your board.",
    serves: "First true small-unit leader; you may assist with teaching recruits.",
  },
  {
    id: "ym5", name: "Young Marine Sergeant", abbr: "YM5", level: "Senior",
    insignia: "Three chevrons pointing up.",
    howTo: "Work through the Senior Guidebook, demonstrate drill and instruction ability, and pass your board.",
    serves: "Lead a squad; eligible to begin Senior-level billets.",
  },
  {
    id: "ym6", name: "Young Marine Staff Sergeant", abbr: "YM6", level: "Senior",
    insignia: "Three chevrons up with one rocker down.",
    howTo: "Continue the Senior Guidebook, take on staff-style responsibilities, and pass your board.",
    serves: "Staff-level work; assist adult staff billets.",
  },
  {
    id: "ym7", name: "Young Marine Gunnery Sergeant", abbr: "YM7", level: "Advanced",
    insignia: "Three chevrons up with two rockers down.",
    howTo: "Move into the Advanced Guidebook, demonstrate advanced drill and instruction, and pass your board.",
    serves: "Eligible for unit Training, Supply and other advanced billets.",
  },
  {
    id: "ym8", name: "Young Marine Master Sergeant", abbr: "YM8", level: "Advanced",
    insignia: "Three chevrons up with three rockers down and a bursting bomb device.",
    howTo: "Complete Advanced Guidebook objectives, hold a staff billet, and pass your board.",
    serves: "Senior staff; eligible for First Sergeant and many assistant billets.",
  },
  {
    id: "ym9", name: "Young Marine Master Gunnery Sergeant", abbr: "YM9", level: "Advanced",
    insignia: "Three chevrons up with four rockers down and a bursting bomb device.",
    howTo: "The top enlisted rank. Complete advanced objectives and distinguished service; the Sergeant Major and First Sergeant billets are held from this rank.",
    serves: "Top enlisted leader of the unit; eligible for Sergeant Major and First Sergeant tours.",
  },
];