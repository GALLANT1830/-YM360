import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "./MessageBubble";

export default function AgentChat({ agentName, placeholder = "Ask anything…" }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true;
    setConversation(null);
    setMessages([]);
    setErr("");
    (async () => {
      try {
        const conv = await base44.agents.createConversation({
          agent_name: agentName,
          metadata: { name: agentName },
        });
        if (!active) return;
        setConversation(conv);
        setMessages(conv.messages || []);
      } catch (e) {
        if (!active) return;
        setErr(e.message || "Could not start the conversation.");
      }
    })();
    return () => {
      active = false;
    };
  }, [agentName]);

  useEffect(() => {
    if (!conversation) return undefined;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      setBusy(false);
    });
    return unsub;
  }, [conversation]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!conversation || !input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    setBusy(true);
    try {
      await base44.agents.addMessage(conversation, { role: "user", content: text });
    } catch (e2) {
      setBusy(false);
      setErr(e2.message || "Could not send the message.");
    }
  };

  if (err && !conversation) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        {err}
      </div>
    );
  }
  if (!conversation) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Starting your coach…
      </div>
    );
  }

  return (
    <div className="flex min-h-[55vh] flex-col rounded-md border bg-card">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full min-h-[30vh] items-center justify-center text-center text-sm text-muted-foreground">
            <span>
              <Sparkles className="mx-auto mb-2 h-5 w-5 text-primary" />
              Send a message to begin.
            </span>
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {busy && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
      </div>
      <form onSubmit={send} className="flex gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit" disabled={busy || !input.trim()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}