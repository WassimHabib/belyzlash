"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useAuth } from "@/components/auth/auth-provider";

const fields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Mot de passe", type: "password" },
] as const;

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "recover">("login");
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);
  const [recoverLoading, setRecoverLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRecover(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setRecoverLoading(true);
    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoverEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecoverSent(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi.");
    } finally {
      setRecoverLoading(false);
    }
  }

  if (mode === "recover") {
    return (
      <div className="space-y-5">
        {recoverSent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-green/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-sm text-brand-green font-medium mb-1">Email envoye !</p>
            <p className="text-xs text-brand-black/40">
              Si un compte existe avec cette adresse, vous recevrez un lien pour reinitialiser votre mot de passe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRecover} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <p className="text-sm text-brand-black/50">
              Entrez votre adresse email pour recevoir un lien de reinitialisation.
            </p>

            <div className="relative">
              <input
                name="recoverEmail"
                type="email"
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
                onFocus={() => setFocused("recoverEmail")}
                onBlur={() => setFocused(null)}
                required
                placeholder=" "
                className={`peer w-full rounded-xl border bg-brand-cream/30 px-4 pt-6 pb-2 text-sm text-brand-green outline-none transition-all duration-300 ${
                  focused === "recoverEmail"
                    ? "border-brand-gold/50 shadow-[0_0_0_3px_rgba(198,168,107,0.1)]"
                    : "border-brand-beige/60 hover:border-brand-beige"
                }`}
              />
              <label
                className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                  focused === "recoverEmail" || recoverEmail
                    ? "top-2 text-[10px] tracking-[0.15em] uppercase text-brand-gold font-semibold"
                    : "top-1/2 -translate-y-1/2 text-sm text-brand-black/30"
                }`}
              >
                Email
              </label>
            </div>

            <button
              type="submit"
              disabled={recoverLoading}
              className="group relative w-full mt-2 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {recoverLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi...
                  </>
                ) : (
                  "Envoyer le lien"
                )}
              </span>
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => { setMode("login"); setError(""); setRecoverSent(false); }}
          className="w-full text-center text-sm text-brand-green font-semibold hover:text-brand-gold transition-colors duration-300 pt-2"
        >
          Retour a la connexion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {fields.map((field) => {
        const isFocused = focused === field.name;
        const hasValue = form[field.name] !== "";
        return (
          <div key={field.name}>
            <div className="relative">
              <input
                name={field.name}
                type={field.type}
                value={form[field.name]}
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
            {field.name === "password" && (
              <button
                type="button"
                onClick={() => { setMode("recover"); setError(""); setRecoverEmail(form.email); }}
                className="mt-2 text-xs text-brand-black/40 hover:text-brand-gold transition-colors duration-300"
              >
                Mot de passe oublie ?
              </button>
            )}
          </div>
        );
      })}

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
              Connexion...
            </>
          ) : (
            <>
              Se connecter
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
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-brand-green font-semibold hover:text-brand-gold transition-colors duration-300">
          Creer un compte
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
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
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">Connexion</p>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
            Mon <span className="text-gradient-gold">Compte</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Form card */}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
