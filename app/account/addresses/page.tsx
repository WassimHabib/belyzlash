"use client";

import { useEffect, useState, useCallback } from "react";
import type { ShopifyMailingAddress } from "@/lib/types";

interface AddressForm {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

const emptyForm: AddressForm = {
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  zip: "",
  country: "",
  phone: "",
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<ShopifyMailingAddress[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [focused, setFocused] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch("/api/account/addresses");
      if (!res.ok) throw new Error("Erreur lors du chargement des adresses.");
      const data = await res.json();
      setAddresses(data.addresses ?? []);
      setDefaultAddressId(data.defaultAddressId ?? null);
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  function startEdit(address: ShopifyMailingAddress) {
    setEditingId(address.id);
    setForm({
      firstName: address.firstName ?? "",
      lastName: address.lastName ?? "",
      company: address.company ?? "",
      address1: address.address1 ?? "",
      address2: address.address2 ?? "",
      city: address.city ?? "",
      province: address.province ?? "",
      zip: address.zip ?? "",
      country: address.country ?? "",
      phone: address.phone ?? "",
    });
    setError("");
  }

  function startNew() {
    setEditingId("new");
    setForm(emptyForm);
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  function updateField(name: keyof AddressForm, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      if (editingId === "new") {
        const res = await fetch("/api/account/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Erreur lors de la creation.");
        }
        const data = await res.json();
        setAddresses((prev) => [...prev, data.address]);
      } else {
        const res = await fetch(`/api/account/addresses/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Erreur lors de la mise a jour.");
        }
        const data = await res.json();
        setAddresses((prev) =>
          prev.map((a) => (a.id === editingId ? data.address : a))
        );
      }
      cancelEdit();
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      const res = await fetch(`/api/account/addresses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur lors de la suppression.");
      }
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (defaultAddressId === id) setDefaultAddressId(null);
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue.");
    }
  }

  async function handleSetDefault(id: string) {
    setError("");
    try {
      const res = await fetch("/api/account/addresses/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressId: id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur lors de la mise a jour.");
      }
      setDefaultAddressId(id);
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue.");
    }
  }

  /* ───── Floating-label input ───── */
  function FloatingInput({
    name,
    label,
    value,
    type = "text",
  }: {
    name: keyof AddressForm;
    label: string;
    value: string;
    type?: string;
  }) {
    return (
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => updateField(name, e.target.value)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          placeholder=" "
          className={`peer w-full rounded-xl border bg-brand-cream/30 px-4 pt-6 pb-2 text-sm text-brand-green outline-none transition-all duration-300 ${
            focused === name
              ? "border-brand-gold/50 shadow-[0_0_0_3px_rgba(198,168,107,0.1)]"
              : "border-brand-beige/60 hover:border-brand-beige"
          }`}
        />
        <label
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
            focused === name || value
              ? "top-2 text-[10px] tracking-[0.15em] uppercase text-brand-gold font-semibold"
              : "top-1/2 -translate-y-1/2 text-sm text-brand-black/30"
          }`}
        >
          {label}
        </label>
      </div>
    );
  }

  /* ───── Loading state ───── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
          <p className="text-brand-black/40 text-xs tracking-[0.2em] uppercase font-bold">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  /* ───── Inline form ───── */
  function renderForm() {
    return (
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-6">
          {editingId === "new" ? "Nouvelle adresse" : "Modifier l'adresse"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput name="firstName" label="Prenom" value={form.firstName} />
          <FloatingInput name="lastName" label="Nom" value={form.lastName} />
          <div className="sm:col-span-2">
            <FloatingInput name="company" label="Entreprise" value={form.company} />
          </div>
          <div className="sm:col-span-2">
            <FloatingInput name="address1" label="Adresse" value={form.address1} />
          </div>
          <div className="sm:col-span-2">
            <FloatingInput name="address2" label="Complement" value={form.address2} />
          </div>
          <FloatingInput name="city" label="Ville" value={form.city} />
          <FloatingInput name="province" label="Province" value={form.province} />
          <FloatingInput name="zip" label="Code postal" value={form.zip} />
          <FloatingInput name="country" label="Pays" value={form.country} />
          <div className="sm:col-span-2">
            <FloatingInput name="phone" label="Telephone" value={form.phone} type="tel" />
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200/60 px-4 py-3">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="relative bg-brand-green text-brand-cream rounded-full px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:shadow-brand-green/20 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-brand-cream/30 border-t-brand-cream rounded-full animate-spin" />
                Enregistrement...
              </span>
            ) : (
              "Enregistrer"
            )}
          </button>
          <button
            onClick={cancelEdit}
            disabled={saving}
            className="border border-brand-beige/60 text-brand-black/50 rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:border-brand-black/20 hover:text-brand-black/70 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  /* ───── Address card ───── */
  function renderAddressCard(address: ShopifyMailingAddress) {
    const isDefault = address.id === defaultAddressId;

    return (
      <div
        key={address.id}
        className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-brand-green">
                {address.firstName} {address.lastName}
              </p>
              {isDefault && (
                <span className="bg-brand-green/10 text-brand-green text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-1 rounded-full">
                  Par defaut
                </span>
              )}
            </div>
            {address.company && (
              <p className="text-xs text-brand-black/50">{address.company}</p>
            )}
          </div>
        </div>

        <div className="space-y-0.5 text-sm text-brand-black/60">
          <p>{address.address1}</p>
          {address.address2 && <p>{address.address2}</p>}
          <p>
            {address.zip} {address.city}
          </p>
          <p>
            {address.province ? `${address.province}, ` : ""}
            {address.country}
          </p>
          {address.phone && (
            <p className="pt-1 text-brand-black/40">{address.phone}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-brand-beige/30">
          <button
            onClick={() => startEdit(address)}
            className="border border-brand-green/20 text-brand-green rounded-full px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-bold hover:bg-brand-green/5 transition-all duration-300"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDelete(address.id)}
            className="border border-red-200/60 text-red-400 rounded-full px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-bold hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            Supprimer
          </button>
          {!isDefault && (
            <button
              onClick={() => handleSetDefault(address.id)}
              className="border border-brand-gold/30 text-brand-gold rounded-full px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-bold hover:bg-brand-gold/5 transition-all duration-300"
            >
              Definir par defaut
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ───── Empty state ───── */
  function renderEmpty() {
    return (
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-10 sm:p-14 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center">
            <svg
              className="w-7 h-7 text-brand-black/20"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-brand-black/40 mb-6">
          Aucune adresse enregistree
        </p>
        <button
          onClick={startNew}
          className="border border-brand-green/20 text-brand-green rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-brand-green/5 transition-all duration-300"
        >
          Ajouter une adresse
        </button>
      </div>
    );
  }

  /* ───── Main render ───── */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-1">
            Carnet d&apos;adresses
          </h2>
          <p className="text-sm text-brand-black/40">
            {addresses.length} adresse{addresses.length !== 1 ? "s" : ""}
          </p>
        </div>
        {editingId === null && addresses.length > 0 && (
          <button
            onClick={startNew}
            className="border border-brand-green/20 text-brand-green rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-brand-green/5 transition-all duration-300"
          >
            Ajouter une adresse
          </button>
        )}
      </div>

      {/* Error (global) */}
      {error && editingId === null && (
        <div className="rounded-xl bg-red-50 border border-red-200/60 px-4 py-3">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Form (inline) */}
      {editingId !== null && renderForm()}

      {/* Address list or empty state */}
      {addresses.length === 0 && editingId === null ? (
        renderEmpty()
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id}>{renderAddressCard(address)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
