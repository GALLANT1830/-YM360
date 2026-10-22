import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ChevronDown, ChevronRight, CheckCircle2, XCircle, Loader2,
} from "lucide-react";

const STATUS_LABEL = {
  pending: "Pending",
  running: "Running",
  in_progress: "Working",
  completed: "Done",
  success: "Done",
  failed: "Failed",
  error: "Failed",
};

function prettyJson(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function ToolCall({ toolCall }) {
  const [open, setOpen] = useState(false);
  const tc = toolCall || {};
  const status = tc.status || "pending";
  const resultsRaw = typeof tc.results === "string" ? tc.results : tc.results;
  let parsed = tc.results;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      /* keep raw string */
    }
  }
  const failed =
    status === "failed" ||
    status === "error" ||
    (typeof parsed === "object" && parsed && parsed.success === false) ||
    /error|failed/i.test(typeof resultsRaw === "string" ? resultsRaw : "");
  const proj = tc.display_projection || {};
  const hideDetails = proj.hide_details && proj.details_redacted;

  const Icon = failed
    ? <XCircle className="h-3.5 w-3.5 text-destructive" />
    : status === "success" || status === "completed"
      ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
      : <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />;

  const label = failed
    ? proj.error_label || STATUS_LABEL[status]
    : status === "success" || status === "completed"
      ? proj.label || STATUS_LABEL[status]
      : proj.active_label || STATUS_LABEL[status] || "Working";

  return (
    <div className="mt-2 rounded-md border bg-muted/50 px-3 py-2 text-xs">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 font-semibold"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {Icon}
        <span className="capitalize">{(tc.name || "tool").replace(/_/g, " ")}</span>
        <span className="text-muted-foreground">· {label}</span>
      </button>
      {!hideDetails && open && (
        <div className="mt-2 space-y-1">
          {tc.arguments_string && (
            <div>
              <div className="font-semibold text-muted-foreground">Parameters</div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded bg-background/60 p-2">
                {prettyJson(tc.arguments_string)}
              </pre>
            </div>
          )}
          {parsed !== undefined && (
            <div>
              <div className="font-semibold text-muted-foreground">Result</div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded bg-background/60 p-2">
                {prettyJson(parsed)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
            : "max-w-[85%] rounded-lg border bg-background px-3 py-2 text-sm"
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{message.content || ""}</ReactMarkdown>
          </div>
        )}
        {message.tool_calls?.map((tc, i) => <ToolCall key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}