"use client";

import { useState } from "react";
import { OrderBilling } from "@/lib/types";

interface ShippingFormProps {
  onSubmit: (billing: OrderBilling) => void;
  loading: boolean;
}

const fields = [
  { name: "first_name", label: "Prenom", type: "text", half: true },
  { name: "last_name", label: "Nom", type: "text", half: true },
  { name: "email", label: "Email", type: "email", half: false },
  { name: "phone", label: "Telephone", type: "tel", half: false },
  { name: "address_1", label: "Adresse", type: "text", half: false },
  { name: "city", label: "Ville", type: "text", half: true },
  { name: "postcode", label: "Code postal", type: "text", half: true },
] as const;

export function ShippingForm({ onSubmit, loading }: ShippingFormProps) {
  const [form, setForm] = useState<OrderBilling>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    city: "",
    postcode: "",
    country: "FR",
  });

  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((field) => {
          const isFocused = focused === field.name;
          const hasValue = form[field.name as keyof OrderBilling] !== "";
          return (
            <div
              key={field.name}
              className={field.half ? "" : "sm:col-span-2"}
            >
              <div className="relative">
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof OrderBilling]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder=" "
                  className={`peer w-full rounded-xl border bg-brand-cream/30 px-4 pt-6 pb-2 text-sm text-brand-green outline-none transition-all duration-300 ${
                    isFocused
                      ? "border-brand-gold/50 shadow-[0_0_0_3px_rgba(198,168,107,0.1)]"
                      : "border-brand-beige/60 hover:border-brand-beige"
                  }`}
                />
                <label
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    isFocused || hasValue
                      ? "top-2 text-[10px] tracking-[0.15em] uppercase text-brand-gold font-semibold"
                      : "top-1/2 -translate-y-1/2 text-sm text-brand-black/30"
                  }`}
                >
                  {field.label}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full mt-4 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Traitement en cours...
            </>
          ) : (
            <>
              Confirmer la commande
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </span>
        {!loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
      </button>
    </form>
  );
}
