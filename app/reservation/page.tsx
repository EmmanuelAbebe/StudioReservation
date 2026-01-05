// src/app/book/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type FieldErrors = Partial<Record<keyof FormState, string>>;

type FormState = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  addBackdrop: boolean;
  addLights: boolean;
  addAssistant: boolean;
};

function formatLocal(dtIso: string) {
  const d = new Date(dtIso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function minutesBetween(aIso: string, bIso: string) {
  const a = new Date(aIso);
  const b = new Date(bIso);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000));
}

const PRICING = {
  hour: 60,
  twoHours: 110,
  fourHours: 200,
  backdrop: 15,
  lights: 20,
  assistant: 35,
};

function basePrice(durationMins: number) {
  if (durationMins <= 60) return PRICING.hour;
  if (durationMins <= 120) return PRICING.twoHours;
  if (durationMins <= 240) return PRICING.fourHours;
  // extra hours beyond 4h: linear
  const extraHours = Math.ceil((durationMins - 240) / 60);
  return PRICING.fourHours + extraHours * 50;
}

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function Reservation() {
  const sp = useSearchParams();
  const startAt = sp.get("startAt") ?? "";
  const endAt = sp.get("endAt") ?? "";

  const durationMins = useMemo(
    () => minutesBetween(startAt, endAt),
    [startAt, endAt]
  );

  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    addBackdrop: false,
    addLights: false,
    addAssistant: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  const pricing = useMemo(() => {
    const base = basePrice(durationMins);
    const addons =
      (state.addBackdrop ? PRICING.backdrop : 0) +
      (state.addLights ? PRICING.lights : 0) +
      (state.addAssistant ? PRICING.assistant : 0);
    return {
      base,
      addons,
      total: base + addons,
    };
  }, [durationMins, state.addBackdrop, state.addLights, state.addAssistant]);

  function validate(next: FormState) {
    const e: FieldErrors = {};
    if (!next.name.trim() || next.name.trim().length < 2)
      e.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim()))
      e.email = "Enter a valid email.";
    // phone optional, but if provided require basic length
    if (next.phone.trim() && next.phone.trim().replace(/\D/g, "").length < 10)
      e.phone = "Enter a valid phone number.";
    return e;
  }

  function onBlur<K extends keyof FormState>(k: K) {
    setTouched((p) => ({ ...p, [k]: true }));
    const e = validate(state);
    setErrors(e);
  }

  function onChange<K extends keyof FormState>(k: K, v: FormState[K]) {
    const next = { ...state, [k]: v };
    setState(next);
    if (touched[k as string]) setErrors(validate(next));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const e2 = validate(state);
    setErrors(e2);
    setTouched({ name: true, email: true, phone: true, notes: true });
    if (Object.keys(e2).length) return;

    // UI-only: no API call yet.
    // Later: POST /api/reservations with startAt/endAt + state fields.
    alert("UI-only. Hook POST /api/reservations next.");
  }

  const hasSlot = Boolean(startAt && endAt && durationMins > 0);

  return (
    <div
    // className="min-h-screen bg-[#f3f3f3] text-[#2e2c27]"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Form */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)] border border-black/10">
              <div className="p-6 sm:p-8">
                <h1 className="font-serif text-2xl sm:text-3xl leading-tight">
                  Reserve the studio
                </h1>
                <p className="mt-2 text-sm text-black/60 max-w-prose">
                  Provide your details. You’ll review the time and total before
                  confirming.
                </p>

                {!hasSlot && (
                  <div className="mt-6 rounded-xl border border-black/10 bg-[#dcd2c6] p-4">
                    <div className="text-sm font-medium">No time selected</div>
                    <div className="mt-1 text-sm text-black/70">
                      Go back to Availability and choose a time slot first.
                    </div>
                  </div>
                )}

                <form className="mt-6 space-y-6" onSubmit={onSubmit}>
                  {/* Contact */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      placeholder="Jane Doe"
                      value={state.name}
                      onChange={(v) => onChange("name", v)}
                      onBlur={() => onBlur("name")}
                      error={touched.name ? errors.name : undefined}
                      disabled={!hasSlot}
                    />
                    <Field
                      label="Email"
                      placeholder="jane@email.com"
                      value={state.email}
                      onChange={(v) => onChange("email", v)}
                      onBlur={() => onBlur("email")}
                      error={touched.email ? errors.email : undefined}
                      disabled={!hasSlot}
                    />
                    <Field
                      label="Phone (optional)"
                      placeholder="(555) 555-5555"
                      value={state.phone}
                      onChange={(v) => onChange("phone", v)}
                      onBlur={() => onBlur("phone")}
                      error={touched.phone ? errors.phone : undefined}
                      disabled={!hasSlot}
                    />
                    <div className="sm:col-span-2">
                      <Label>Notes (optional)</Label>
                      <textarea
                        className={classNames(
                          "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
                          "border-black/10 focus:border-black/30 focus:ring-4 focus:ring-[#9f8265]/20",
                          !hasSlot && "opacity-60 cursor-not-allowed"
                        )}
                        rows={4}
                        placeholder="What are you shooting/recording? Any setup notes?"
                        value={state.notes}
                        onChange={(e) => onChange("notes", e.target.value)}
                        onBlur={() => onBlur("notes")}
                        disabled={!hasSlot}
                      />
                      <HelperText>
                        Keep it short. You can add details later.
                      </HelperText>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Add-ons</div>
                        <div className="mt-1 text-sm text-black/60">
                          Optional upgrades for your session.
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-[#dcd2c6] px-3 py-1 text-xs font-medium">
                        curated
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3">
                      <AddonRow
                        title="Backdrop"
                        subtitle="Seamless paper backdrop"
                        price={`$${PRICING.backdrop}`}
                        checked={state.addBackdrop}
                        onChange={(v) => onChange("addBackdrop", v)}
                        disabled={!hasSlot}
                      />
                      <AddonRow
                        title="Extra lights"
                        subtitle="Additional softboxes / modifiers"
                        price={`$${PRICING.lights}`}
                        checked={state.addLights}
                        onChange={(v) => onChange("addLights", v)}
                        disabled={!hasSlot}
                      />
                      <AddonRow
                        title="Assistant"
                        subtitle="On-site help with setup"
                        price={`$${PRICING.assistant}`}
                        checked={state.addAssistant}
                        onChange={(v) => onChange("addAssistant", v)}
                        disabled={!hasSlot}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!hasSlot}
                      className={classNames(
                        "w-full rounded-2xl bg-[#2e2c27] px-5 py-3 text-sm font-medium text-white",
                        "shadow-[0_10px_30px_rgba(0,0,0,.10)]",
                        "hover:opacity-95 active:opacity-90",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      Continue to confirmation
                    </button>

                    <div className="mt-3 text-xs text-black/50">
                      Cancellation policy: free changes up to 24 hours before
                      start.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Right: Summary */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-[#dcd2c6] border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,.08)] overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs tracking-wide text-black/60 uppercase">
                      Booking summary
                    </div>
                    <div className="mt-2 font-serif text-xl leading-snug">
                      Studio Session
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-black/70">
                    pending
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <SummaryRow
                    label="Start"
                    value={startAt ? formatLocal(startAt) : "—"}
                  />
                  <SummaryRow
                    label="End"
                    value={endAt ? formatLocal(endAt) : "—"}
                  />
                  <SummaryRow
                    label="Duration"
                    value={durationMins ? `${durationMins} minutes` : "—"}
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-white/60 p-5 border border-black/10">
                  <div className="text-sm font-medium">Pricing</div>
                  <div className="mt-3 space-y-2 text-sm">
                    <LineItem label="Base" value={`$${pricing.base}`} />
                    <LineItem label="Add-ons" value={`$${pricing.addons}`} />
                    <div className="my-2 h-px bg-black/10" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Total</div>
                      <div className="text-sm font-semibold">
                        ${pricing.total}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-black/60 leading-relaxed">
                  Arrival window: 10 minutes before start. Quiet hours
                  respected. Track lighting and accent lighting available on
                  request.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 text-xs text-black/50">{children}</div>;
}

function Field(props: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}) {
  const { label, placeholder, value, onChange, onBlur, error, disabled } =
    props;
  return (
    <div>
      <Label>{label}</Label>
      <input
        className={classNames(
          "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
          error
            ? "border-red-500/60 focus:ring-4 focus:ring-red-500/10"
            : "border-black/10 focus:border-black/30 focus:ring-4 focus:ring-[#9f8265]/20",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error ? <div className="mt-2 text-xs text-red-600">{error}</div> : null}
    </div>
  );
}

function AddonRow(props: {
  title: string;
  subtitle: string;
  price: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const { title, subtitle, price, checked, onChange, disabled } = props;
  return (
    <label
      className={classNames(
        "flex items-start justify-between gap-4 rounded-2xl border border-black/10 bg-white px-4 py-4",
        "shadow-[0_6px_18px_rgba(0,0,0,.06)]",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-1 text-sm text-black/60">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm font-medium">{price}</div>
        <input
          type="checkbox"
          className="h-5 w-5 accent-[#2e2c27]"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
      </div>
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="text-xs uppercase tracking-wide text-black/60">
        {label}
      </div>
      <div className="text-sm font-medium text-right">{value}</div>
    </div>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-black/70">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
