// Single source of truth for Curriculum upload categories, shared by the admin
// uploader, the Resource Library and the SERVE360 portal.
export const CURRICULUM_CATEGORIES = [
  { value: "junior", label: "YM Junior Guidebook", group: "guidebooks" },
  { value: "basic", label: "YM Basic Guidebook", group: "guidebooks" },
  { value: "senior", label: "YM Senior Guidebook", group: "guidebooks" },
  { value: "advanced", label: "YM Advanced Guidebook", group: "guidebooks" },
  { value: "drill", label: "Drill & Ceremonies Manual", group: "guidebooks" },
  { value: "awards", label: "YM Awards Manual", group: "guidebooks" },
  { value: "recruit_cycle", label: "Recruit Cycle Curriculum", group: "serve360" },
  { value: "recruit_instructor", label: "Recruit Instructor Course", group: "serve360" },
  { value: "jls", label: "JLS — Junior Leadership School", group: "serve360" },
  { value: "sls", label: "SLS — Senior Leadership School", group: "serve360" },
  { value: "als", label: "ALS — Advanced Leadership School", group: "serve360" },
  { value: "ym_classes", label: "YM Classes (all ranks)", group: "serve360" },
  { value: "leadership", label: "Leadership", group: "general" },
  { value: "training", label: "Training", group: "general" },
  { value: "forms", label: "Forms", group: "general" },
  { value: "reference", label: "Reference", group: "general" },
  { value: "resource", label: "General resource", group: "general" },
  { value: "other", label: "Other document", group: "general" },
];

export const CATEGORY_LABEL = Object.fromEntries(
  CURRICULUM_CATEGORIES.map((c) => [c.value, c.label])
);

export const CATEGORY_OPTIONS = CURRICULUM_CATEGORIES.map(({ value, label }) => ({ value, label }));