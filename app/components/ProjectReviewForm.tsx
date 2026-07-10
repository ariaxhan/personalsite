"use client";

import { FormEvent, ReactNode, useState } from "react";
import { PAGE_COPY } from "../utils/siteCopy";

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

const STAGES = [...PAGE_COPY.projectReviewForm.stages];

const PROJECT_TYPES = [...PAGE_COPY.projectReviewForm.projectTypes];

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
      setMessage(PAGE_COPY.projectReviewForm.validation.missingStage);
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
        throw new Error(result?.error || PAGE_COPY.projectReviewForm.validation.sendError);
      }

      setPayload(initialPayload);
      setState("sent");
      setMessage(
        result?.submissionId
          ? `${PAGE_COPY.projectReviewForm.validation.sentWithReference}${result.submissionId}.`
          : PAGE_COPY.projectReviewForm.validation.sent,
      );
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : PAGE_COPY.projectReviewForm.validation.fallbackError);
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
          <div className="kicker mb-4">{PAGE_COPY.projectReviewForm.introLabel}</div>
          <p className="m-0 font-serif text-[24px] leading-snug text-ink">
            {PAGE_COPY.projectReviewForm.introTitle}
          </p>
          <p className="m-0 mt-5 text-[15.5px] leading-relaxed text-ink-muted">
            {PAGE_COPY.projectReviewForm.introNote}
          </p>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={PAGE_COPY.projectReviewForm.fields.name} required>
              <input
                required
                value={payload.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="field-input"
                autoComplete="name"
              />
            </Field>
            <Field label={PAGE_COPY.projectReviewForm.fields.email} required>
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

          <Field label={PAGE_COPY.projectReviewForm.fields.projectName}>
            <input
              value={payload.projectName}
              onChange={(event) => updateField("projectName", event.target.value)}
              className="field-input"
            />
          </Field>

          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              {PAGE_COPY.projectReviewForm.fields.stage} *
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
              {PAGE_COPY.projectReviewForm.fields.lookAt}
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

          <Field label={PAGE_COPY.projectReviewForm.fields.origin} required>
            <textarea
              required
              value={payload.origin}
              onChange={(event) => updateField("origin", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.origin}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.uniqueContribution} required>
            <textarea
              required
              value={payload.uniqueContribution}
              onChange={(event) => updateField("uniqueContribution", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.uniqueContribution}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.artifactIntent} required>
            <textarea
              required
              value={payload.artifactIntent}
              onChange={(event) => updateField("artifactIntent", event.target.value)}
              className="field-input min-h-[92px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.artifactIntent}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.architecture}>
            <textarea
              value={payload.architecture}
              onChange={(event) => updateField("architecture", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.architecture}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.links}>
            <textarea
              value={payload.links}
              onChange={(event) => updateField("links", event.target.value)}
              className="field-input min-h-[84px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.links}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.question} required>
            <textarea
              required
              value={payload.question}
              onChange={(event) => updateField("question", event.target.value)}
              className="field-input min-h-[108px] resize-y"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.question}
            />
          </Field>

          <Field label={PAGE_COPY.projectReviewForm.fields.timeline}>
            <input
              value={payload.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
              className="field-input"
              placeholder={PAGE_COPY.projectReviewForm.placeholders.timeline}
            />
          </Field>

          <label className="hidden">
            {PAGE_COPY.projectReviewForm.fields.company}
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
              {state === "sending" ? PAGE_COPY.projectReviewForm.sending : PAGE_COPY.projectReviewForm.submit}
            </button>
            <p
              aria-live="polite"
              className={`m-0 border px-4 py-3 text-[14.5px] leading-relaxed ${
                state === "sent"
                  ? "border-[rgba(65,96,108,0.28)] bg-[rgba(65,96,108,0.08)] text-ink"
                  : state === "error"
                    ? "border-[rgba(181,106,79,0.28)] bg-[rgba(181,106,79,0.08)] text-terracotta"
                    : "border-transparent text-ink-muted"
              }`}
            >
              {message || PAGE_COPY.projectReviewForm.idle}
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
