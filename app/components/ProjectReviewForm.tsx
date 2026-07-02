"use client";

import { FormEvent, ReactNode, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

type ProjectReviewPayload = {
  name: string;
  email: string;
  projectName: string;
  projectStage: string;
  projectTypes: string[];
  origin: string;
  uniqueContribution: string;
  artifactIntent: string;
  architecture: string;
  links: string;
  question: string;
  timeline: string;
  company: string;
};

const STAGES = ["Idea", "Prototype", "Messy but real", "Live", "Rebuild?"];

const PROJECT_TYPES = [
  "Idea Direction",
  "Architecture",
  "Tool Choice",
  "Claude Code",
  "Codex",
  "Cursor",
  "Agents",
  "AI Code Cleanup",
  "Open Source",
  "Portfolio / Product",
];

const initialPayload: ProjectReviewPayload = {
  name: "",
  email: "",
  projectName: "",
  projectStage: "",
  projectTypes: [],
  origin: "",
  uniqueContribution: "",
  artifactIntent: "",
  architecture: "",
  links: "",
  question: "",
  timeline: "",
  company: "",
};

export default function ProjectReviewForm() {
  const [payload, setPayload] = useState<ProjectReviewPayload>(initialPayload);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  function updateField<K extends keyof ProjectReviewPayload>(key: K, value: ProjectReviewPayload[K]) {
    setPayload((current) => ({ ...current, [key]: value }));
  }

  function toggleProjectType(type: string) {
    setPayload((current) => {
      const hasType = current.projectTypes.includes(type);
      return {
        ...current,
        projectTypes: hasType
          ? current.projectTypes.filter((item) => item !== type)
          : [...current.projectTypes, type],
      };
    });
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!payload.projectStage) {
      setState("error");
      setMessage("Pick a stage first.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/project-review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Something broke while sending this.");
      }

      setPayload(initialPayload);
      setState("sent");
      setMessage("Got it. I’ll reply by email.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not send this. Email me directly if it keeps failing.");
    }
  }

  return (
    <form
      id="project-review-form"
      onSubmit={submitForm}
      className="grid gap-7 border-y border-[rgba(44,40,35,0.18)] py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <div>
          <div className="kicker mb-4">Send the build</div>
          <p className="m-0 font-serif text-[24px] leading-snug text-ink">
            I care about the story first, then the system.
          </p>
          <p className="m-0 mt-5 text-[15.5px] leading-relaxed text-ink-muted">
            Send AGENTS.md, CLAUDE.md, prompts, diagrams, notes, or code if they
            exist. Mess is fine.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" required>
              <input
                required
                value={payload.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="field-input"
                autoComplete="name"
              />
            </Field>
            <Field label="Email" required>
              <input
                required
                type="email"
                value={payload.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="field-input"
                autoComplete="email"
              />
            </Field>
          </div>

          <Field label="Project name">
            <input
              value={payload.projectName}
              onChange={(event) => updateField("projectName", event.target.value)}
              className="field-input"
            />
          </Field>

          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Stage *
            </legend>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => {
                const selected = payload.projectStage === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateField("projectStage", stage)}
                    className={`min-h-10 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors ${
                      selected
                        ? "border-ink bg-ink text-studio-paper"
                        : "border-[rgba(44,40,35,0.18)] bg-[rgba(248,244,234,0.4)] text-ink-muted hover:border-terracotta hover:text-ink"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              What should I look at?
            </legend>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((type) => {
                const selected = payload.projectTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleProjectType(type)}
                    className={`min-h-10 border px-3 py-2 text-[14px] transition-colors ${
                      selected
                        ? "border-terracotta bg-[rgba(181,106,79,0.12)] text-ink"
                        : "border-[rgba(44,40,35,0.16)] bg-[rgba(248,244,234,0.4)] text-ink-muted hover:border-terracotta hover:text-ink"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Field label="What inspired this?" required>
            <textarea
              required
              value={payload.origin}
              onChange={(event) => updateField("origin", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder="Where did the idea come from? What made you want to build it?"
            />
          </Field>

          <Field label="What makes it yours?" required>
            <textarea
              required
              value={payload.uniqueContribution}
              onChange={(event) => updateField("uniqueContribution", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder="Your taste, obsession, domain knowledge, weird constraint, lived experience, anything a template would miss."
            />
          </Field>

          <Field label="What is it meant to be?" required>
            <textarea
              required
              value={payload.artifactIntent}
              onChange={(event) => updateField("artifactIntent", event.target.value)}
              className="field-input min-h-[92px] resize-y"
              placeholder="Open Source, portfolio piece, product, internal tool, research toy, proof of taste, not sure yet?"
            />
          </Field>

          <Field label="Architecture / tools">
            <textarea
              value={payload.architecture}
              onChange={(event) => updateField("architecture", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder="Agents, memory, evals, database, hosting, Cloudflare vs AWS/GCP, repo structure, AI coding setup."
            />
          </Field>

          <Field label="Links / docs">
            <textarea
              value={payload.links}
              onChange={(event) => updateField("links", event.target.value)}
              className="field-input min-h-[84px] resize-y"
              placeholder="Repo, demo, screenshots, AGENTS.md, CLAUDE.md, README, Loom, diagrams, notes."
            />
          </Field>

          <Field label="What do you want help deciding?" required>
            <textarea
              required
              value={payload.question}
              onChange={(event) => updateField("question", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder="Make it less generic, clean up AI slop, choose tools, rethink the architecture, decide whether it should be a product/Open Source/portfolio piece."
            />
          </Field>

          <Field label="Timeline">
            <input
              value={payload.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
              className="field-input"
              placeholder="This week, flexible, urgent..."
            />
          </Field>

          <label className="hidden">
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              value={payload.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </label>

          <div className="flex flex-col gap-4 border-t border-[rgba(44,40,35,0.16)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-studio-paper transition-colors hover:border-terracotta hover:bg-terracotta disabled:cursor-wait disabled:opacity-60 sm:text-[11px] sm:tracking-[0.18em]"
            >
              {state === "sending" ? "Sending" : "Submit project"}
            </button>
            <p
              aria-live="polite"
              className={`m-0 text-[14.5px] leading-relaxed ${
                state === "error" ? "text-terracotta" : "text-ink-muted"
              }`}
            >
              {message || "First review is free. Follow-up is case by case."}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
