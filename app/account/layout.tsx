"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

const navItems = [
  {
    href: "/account",
    label: "Tableau de bord",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    href: "/account/orders",
    label: "Mes commandes",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    href: "/account/profile",
    label: "Mon profil",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/account/addresses",
    label: "Mes adresses",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
          <p className="text-brand-black/40 text-xs tracking-[0.2em] uppercase font-bold">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero - green gradient with grain */}
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">
              Mon Compte
            </p>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
            Bonjour,{" "}
            <span className="text-gradient-gold">
              {user?.firstName ?? ""}
            </span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Mobile nav: horizontal scrollable */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mt-1">
        <nav className="flex gap-2 px-4 py-3 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-bold whitespace-nowrap transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-brand-green text-brand-cream"
                  : "bg-white text-brand-green/60 border border-brand-beige/30 hover:border-brand-green/20"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop: sidebar + content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block">
            <nav className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-3 sticky top-28">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-brand-green/5 text-brand-green"
                      : "text-brand-black/40 hover:text-brand-green hover:bg-brand-cream/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-brand-beige/30 my-2" />

              {/* Logout button */}
              <button
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[11px] tracking-[0.15em] uppercase font-bold text-brand-black/40 hover:text-red-500 hover:bg-red-50/50 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                <span>Se déconnecter</span>
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
