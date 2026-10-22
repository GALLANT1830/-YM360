import { LOGO_URL } from "@/components/brand/Logo";

// Editable copy and image blocks. `default` is used until an admin saves a value.
export const CONTENT_BLOCKS = [
  { key: "home_hero_title", section: "Home — Hero", label: "Hero title", type: "text", default: "Learn. Lead. Serve. Become More." },
  { key: "home_hero_subtitle", section: "Home — Hero", label: "Hero subtitle", type: "longtext", default: "Prepare for the responsibilities you have today and the leader you may become tomorrow." },
  { key: "home_hero_image", section: "Home — Hero", label: "Hero image", type: "image", default: LOGO_URL },
  { key: "about_intro", section: "About", label: "About intro paragraph", type: "longtext", default: "A learning and leadership platform created independently by a Young Marine, to help Young Marines learn, prepare, lead and serve." },
];

// Toggleable, reorderable dashboard sections on the Home page.
export const HOME_SECTIONS = [
  { key: "next_step", label: "Recommended next step" },
  { key: "daily_challenge", label: "Daily challenge" },
  { key: "quick_actions", label: "Quick actions" },
  { key: "weak_topics", label: "Topics requiring more study" },
  { key: "goals", label: "Personal goals" },
  { key: "saved", label: "Saved resources" },
  { key: "activity", label: "Recent activity" },
  { key: "lesson", label: "Lesson of the week" },
];

export const DEFAULT_CONTENT = {};
CONTENT_BLOCKS.forEach((b) => { DEFAULT_CONTENT[b.key] = b.default; });

// Resolve a content value from the loaded map with fallback to default.
export function resolveContent(map, key) {
  const rec = map?.[key];
  if (!rec) return DEFAULT_CONTENT[key];
  if (rec.type === "image") return rec.image_url || DEFAULT_CONTENT[key];
  return rec.value ?? DEFAULT_CONTENT[key];
}

// Build the ordered, enabled home-section list from site content + defaults.
export function resolveHomeSections(map) {
  return HOME_SECTIONS.map((s, i) => {
    const rec = map?.[`home_section_${s.key}`];
    return {
      key: s.key,
      label: s.label,
      enabled: rec ? rec.enabled !== false : true,
      order: rec?.order ?? i,
    };
  }).sort((a, b) => a.order - b.order);
}