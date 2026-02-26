"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";

const fields = [
  { name: "firstName", label: "Prenom", type: "text", half: true },
  { name: "lastName", label: "Nom", type: "text", half: true },
  { name: "email", label: "Email", type: "email", half: false },
  { name: "password", label: "Mot de passe", type: "password", half: false },
] as const;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">Inscription</p>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
            Creer un <span className="text-gradient-gold">Compte</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Form card */}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map((field) => {
                const isFocused = focused === field.name;
                const hasValue = form[field.name as keyof typeof form] !== "";
                return (
                  <div
                    key={field.name}
                    className={field.half ? "" : "sm:col-span-2"}
                  >
                    <div className="relative">
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name as keyof typeof form]}
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
              className="group relative w-full mt-2 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Inscription...
                  </>
                ) : (
                  <>
                    Creer mon compte
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

            <p className="text-center text-sm text-brand-black/40 pt-2">
              Deja un compte ?{" "}
              <Link href="/login" className="text-brand-green font-semibold hover:text-brand-gold transition-colors duration-300">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
