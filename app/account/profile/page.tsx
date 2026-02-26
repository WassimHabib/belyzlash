"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  // Profile form
  const [profile, setProfile] = useState({ firstName: "", lastName: "", phone: "" });
  const [profileFocused, setProfileFocused] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password form
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
  const [passwordFocused, setPasswordFocused] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Initialize profile from user
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setProfileLoading(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la mise a jour.");
      await refreshUser();
      setProfileSuccess("Profil mis a jour");
    } catch (err: any) {
      setProfileError(err.message || "Erreur lors de la mise a jour.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (passwords.password.length < 5) {
      setPasswordError("Le mot de passe doit contenir au moins 5 caracteres.");
      return;
    }
    if (passwords.password !== passwords.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwords.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors du changement de mot de passe.");
      setPasswordSuccess("Mot de passe modifie");
      setPasswords({ password: "", confirmPassword: "" });
    } catch (err: any) {
      setPasswordError(err.message || "Erreur lors du changement de mot de passe.");
    } finally {
      setPasswordLoading(false);
    }
  }

  const profileFields = [
    { name: "firstName", label: "Prenom", type: "text" },
    { name: "lastName", label: "Nom", type: "text" },
    { name: "phone", label: "Telephone", type: "tel" },
  ] as const;

  const passwordFields = [
    { name: "password", label: "Nouveau mot de passe", type: "password" },
    { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-6">
          Informations personnelles
        </h2>

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          {profileSuccess && (
            <div className="bg-brand-green/5 border border-brand-green/20 text-brand-green text-sm rounded-xl px-4 py-3">
              {profileSuccess}
            </div>
          )}
          {profileError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {profileError}
            </div>
          )}

          {profileFields.map((field) => {
            const isFocused = profileFocused === field.name;
            const hasValue = profile[field.name] !== "";
            return (
              <div key={field.name} className="relative">
                <input
                  name={field.name}
                  type={field.type}
                  value={profile[field.name]}
                  onChange={handleProfileChange}
                  onFocus={() => setProfileFocused(field.name)}
                  onBlur={() => setProfileFocused(null)}
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
            );
          })}

          {/* Email (readonly) */}
          <div className="relative">
            <input
              name="email"
              type="email"
              value={user?.email ?? ""}
              disabled
              placeholder=" "
              className="peer w-full rounded-xl border border-brand-beige/60 bg-brand-cream/30 px-4 pt-6 pb-2 text-sm text-brand-green outline-none opacity-60 cursor-not-allowed"
            />
            <label className="pointer-events-none absolute left-4 top-2 text-[10px] tracking-[0.15em] uppercase text-brand-gold font-semibold">
              Email
            </label>
          </div>

          <button
            type="submit"
            disabled={profileLoading}
            className="group relative w-full mt-2 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {profileLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </span>
            {!profileLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-6">
          Changer le mot de passe
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {passwordSuccess && (
            <div className="bg-brand-green/5 border border-brand-green/20 text-brand-green text-sm rounded-xl px-4 py-3">
              {passwordSuccess}
            </div>
          )}
          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {passwordError}
            </div>
          )}

          {passwordFields.map((field) => {
            const isFocused = passwordFocused === field.name;
            const hasValue = passwords[field.name] !== "";
            return (
              <div key={field.name} className="relative">
                <input
                  name={field.name}
                  type={field.type}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(field.name)}
                  onBlur={() => setPasswordFocused(null)}
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
            );
          })}

          <button
            type="submit"
            disabled={passwordLoading}
            className="group relative w-full mt-2 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {passwordLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Modification...
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </span>
            {!passwordLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
