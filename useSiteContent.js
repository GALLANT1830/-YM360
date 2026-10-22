import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// Loads all SiteContent records into a map keyed by `key`.
export function useSiteContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.SiteContent.filter({}, { limit: 200, sort: "order" })
      .then(({ items }) => {
        if (!active) return;
        const map = {};
        items.forEach((it) => { map[it.key] = it; });
        setContent(map);
      })
      .catch(() => active && setContent({}))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return { content, loading };
}