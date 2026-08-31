"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import { trackParcelEvent } from "../_lib/analytics";
import type { AuditPlacement } from "./AuditIntakeProvider";

type FormValues = {
  name: string;
  workContact: string;
  organization: string;
  carrier: "" | "UPS" | "FedEx" | "Both";
  volume: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Props = {
  open: boolean;
  placement: AuditPlacement;
  onClose: () => void;
};

const emptyValues: FormValues = {
  name: "",
  workContact: "",
  organization: "",
  carrier: "",
  volume: "",
};

export function AuditIntakeDialog({ open, placement, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [started, setStarted] = useState(false);
  const [handoff, setHandoff] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => dialog.querySelector<HTMLInputElement>("#parcel-audit-name")?.focus(), 0);
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function close() {
    dialogRef.current?.close();
  }

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    if (!started) {
      setStarted(true);
      trackParcelEvent("parcel_intake_started", { placement });
    }
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!values.workContact.trim()) next.workContact = "Enter your work email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.workContact)) next.workContact = "Enter a valid work email.";
    if (!values.organization.trim()) next.organization = "Enter your company.";
    if (!values.carrier) next.carrier = "Choose a carrier.";
    if (!values.volume) next.volume = "Choose an approximate shipment volume.";
    return next;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof FormValues | undefined;
    if (firstError) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      });
      return;
    }

    const subject = `Zettel Parcel free audit — ${values.organization.trim()}`;
    const body = [
      "I'd like to start a Zettel Parcel free audit.",
      "",
      `Name: ${values.name.trim()}`,
      `Work email: ${values.workContact.trim()}`,
      `Company: ${values.organization.trim()}`,
      `Carrier: ${values.carrier}`,
      `Approximate shipments per month: ${values.volume}`,
      "",
      "Please send me the next step for sharing one recent invoice securely.",
    ].join("\n");

    trackParcelEvent("parcel_intake_handoff", { placement, carrier: values.carrier || undefined });
    setHandoff(true);
    window.location.href = `mailto:zettel.ops@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="parcel-audit-title"
      aria-describedby="parcel-audit-description"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        setErrors({});
        setHandoff(false);
        if (open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-auto w-[min(94vw,42rem)] max-h-[90dvh] overflow-y-auto border border-outline-variant bg-background p-0 text-on-background shadow-2xl backdrop:bg-black/45"
    >
      <div className="border-b border-outline-variant px-6 py-5 sm:px-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Free audit request</p>
            <h2 id="parcel-audit-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Start with a few details.
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close free audit request"
            onClick={close}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-outline-variant text-on-surface-variant transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span aria-hidden="true" className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p id="parcel-audit-description" className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
          We’ll request one recent invoice in the follow-up. This page does not upload carrier files or ask for your carrier password.
        </p>
      </div>

      <form ref={formRef} noValidate onSubmit={submit} className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="parcel-audit-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-2 h-12 w-full border border-outline-variant bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-fixed"
          />
        </Field>

        <Field label="Work email" name="workContact" error={errors.workContact}>
          <input
            id="parcel-audit-work-contact"
            name="workContact"
            type="email"
            autoComplete="email"
            value={values.workContact}
            onChange={(event) => update("workContact", event.target.value)}
            aria-invalid={Boolean(errors.workContact)}
            aria-describedby={errors.workContact ? "workContact-error" : undefined}
            className="mt-2 h-12 w-full border border-outline-variant bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-fixed"
          />
        </Field>

        <Field label="Company" name="organization" error={errors.organization}>
          <input
            id="parcel-audit-organization"
            name="organization"
            autoComplete="organization"
            value={values.organization}
            onChange={(event) => update("organization", event.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            className="mt-2 h-12 w-full border border-outline-variant bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-fixed"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Carrier" name="carrier" error={errors.carrier}>
            <select
              id="parcel-audit-carrier"
              name="carrier"
              value={values.carrier}
              onChange={(event) => {
                const carrier = event.target.value as FormValues["carrier"];
                update("carrier", carrier);
                if (carrier) trackParcelEvent("parcel_carrier_selected", { carrier });
              }}
              aria-invalid={Boolean(errors.carrier)}
              aria-describedby={errors.carrier ? "carrier-error" : undefined}
              className="mt-2 h-12 w-full cursor-pointer border border-outline-variant bg-white px-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed"
            >
              <option value="">Choose one</option>
              <option value="UPS">UPS</option>
              <option value="FedEx">FedEx</option>
              <option value="Both">Both</option>
            </select>
          </Field>

          <Field label="Approximate shipments per month" name="volume" error={errors.volume}>
            <select
              id="parcel-audit-volume"
              name="volume"
              value={values.volume}
              onChange={(event) => update("volume", event.target.value)}
              aria-invalid={Boolean(errors.volume)}
              aria-describedby={errors.volume ? "volume-error" : undefined}
              className="mt-2 h-12 w-full cursor-pointer border border-outline-variant bg-white px-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed"
            >
              <option value="">Choose a range</option>
              <option value="Under 100">Under 100</option>
              <option value="100–499">100–499</option>
              <option value="500–1,999">500–1,999</option>
              <option value="2,000–9,999">2,000–9,999</option>
              <option value="10,000+">10,000+</option>
            </select>
          </Field>
        </div>

        <div className="border-t border-outline-variant pt-5">
          <button
            type="submit"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          >
            Continue in email
          </button>
          <p className="mt-3 text-xs leading-5 text-on-surface-variant">
            This opens a pre-filled message to zettel.ops@gmail.com so you can review exactly what is sent.
          </p>
          {handoff && (
            <p role="status" className="mt-3 text-sm font-medium text-primary">
              Your mail app should open with the audit request. No invoice was uploaded from this page.
            </p>
          )}
        </div>
      </form>
    </dialog>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: keyof FormValues;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`parcel-audit-${name}`} className="text-sm font-semibold text-on-background">
        {label}
      </label>
      {children}
      <div className="min-h-5 pt-1">
        {error && (
          <p id={`${name}-error`} className="text-sm text-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
