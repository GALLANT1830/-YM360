import { useState } from "react";
import { Compass, Shield } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import AgentChat from "@/components/agent/AgentChat";

const AGENTS = [
  {
    id: "platform_navigator",
    name: "Platform Navigator",
    icon: Compass,
    tagline: "Find your way around YM360",
    desc: "Tell the navigator your rank and goal — earning your next rank, prepping for a board, a leadership school, or a billet — and it points you to the right pages, study tools and uploaded resources.",
    placeholder: "e.g. I'm a YM Lance Corporal preparing for my Corporal board — where do I start?",
  },
  {
    id: "leadership_mentor",
    name: "Leadership Mentor",
    icon: Shield,
    tagline: "Coaching for billets, ranks & leadership",
    desc: "A leadership coach that helps you understand what each billet requires, how rank progression works, and the how-to's of leading other Young Marines — drawing on the program's advice library and uploaded resources.",
    placeholder: "e.g. What does a Unit First Sergeant actually do, and how do I prepare for it?",
  },
];

export default function Coach() {
  const [active, setActive] = useState(AGENTS[0].id);
  const agent = AGENTS.find((a) => a.id === active);
  const Icon = agent.icon;

  return (
    <Page>
      <PageHeader
        kicker="AI Coaches"
        title="Your YM360 coaches"
        desc="Two AI guides built into YM360 to help you navigate the platform and grow as a leader. Ask a question any time."
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {AGENTS.map((a) => {
          const AIcon = a.icon;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setActive(a.id)}
              className={`rounded-md border p-4 text-left transition ${active === a.id ? "border-primary bg-primary/5" : "bg-card hover:border-primary/40"}`}
            >
              <div className="flex items-center gap-2">
                <AIcon className="h-5 w-5 text-primary" />
                <span className="font-heading text-sm font-semibold uppercase tracking-wide">{a.name}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{a.tagline}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-md border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold uppercase text-secondary">{agent.name}</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{agent.desc}</p>
        <AgentChat key={agent.id} agentName={agent.id} placeholder={agent.placeholder} />
      </div>

      <Notice className="mt-5" title="A study aid, not the official authority">
        These coaches use the program's uploaded materials and advice library to guide you, but they can make mistakes. Always confirm requirements, duties and deadlines with your commander or unit staff.
      </Notice>
    </Page>
  );
}