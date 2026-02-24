"use client";

import { useState } from "react";
import { OrderBilling } from "@/lib/types";

interface ShippingFormProps {
  onSubmit: (billing: OrderBilling) => void;
  loading: boolean;
}

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full border border-brand-beige px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="first_name"
          placeholder="Prenom"
          value={form.first_name}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="last_name"
          placeholder="Nom"
          value={form.last_name}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Telephone"
        value={form.phone}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <input
        name="address_1"
        placeholder="Adresse"
        value={form.address_1}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          placeholder="Ville"
          value={form.city}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="postcode"
          placeholder="Code postal"
          value={form.postcode}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Traitement..." : "Confirmer la commande"}
      </button>
    </form>
  );
}
