# belyzlash — Design Document

## Overview

Boutique en ligne de vetements/mode, positionnement luxe/minimaliste.
Frontend custom Next.js consommant l'API WooCommerce headless.
Paiement via Stripe (gere par le plugin WooCommerce Stripe Gateway).

## Architecture

```
Visiteur (navigateur)
        |
belyzlash (Next.js App Router)
   - Pages SSR/SSG (ISR)
   - Server Components
   - Tailwind CSS
   - Etat local panier (React Context + localStorage)
        |  API REST
WordPress + WooCommerce
   - Produits & categories
   - Commandes
   - Stripe (plugin)
   - Gestion stock/livraison
```

### Principes

- Next.js App Router avec TypeScript
- Tailwind CSS pour le styling minimaliste
- Panier gere cote client (localStorage + React Context)
- Pages produits statiquement generees (ISR) pour performance et SEO
- Checkout cree la commande via API WooCommerce et redirige vers Stripe

## Palette couleurs

| Role              | Couleur       | Hex       |
|-------------------|---------------|-----------|
| Primaire          | Vert profond  | `#1F3A34` |
| Fond principal    | Blanc casse   | `#F4F2EE` |
| Secondaire        | Beige nude    | `#D8CFC6` |
| Texte / Contraste | Noir profond  | `#0E0E0E` |
| Accent luxe       | Or doux       | `#C6A86B` |

### Application

- Header/Footer: fond vert profond, texte blanc casse
- Fond de page: blanc casse
- Texte courant: noir profond
- Boutons CTA: vert profond, hover legerement plus clair
- Accents (prix, badges, separateurs): or doux
- Elements secondaires (fonds de section, bordures, tags): beige nude

### Typographie

- Titres: serif elegante (Playfair Display)
- Body: sans-serif clean (Inter)
- Beaucoup d'espace blanc, images grandes, animations subtiles

## Pages

| Route              | Description                                              | Rendu         |
|--------------------|----------------------------------------------------------|---------------|
| `/`                | Accueil — hero image, produits phares, banniere marque   | SSG + ISR     |
| `/shop`            | Catalogue — grille produits, filtres, tri                | SSG + ISR     |
| `/shop/[slug]`     | Fiche produit — galerie, selecteur variantes, ajout panier | SSG + ISR   |
| `/cart`            | Panier — liste articles, modifier qte, total             | Client        |
| `/checkout`        | Checkout — formulaire adresse, resume, paiement Stripe   | Client + API  |
| `/checkout/success`| Confirmation de commande                                 | Client        |
| `/checkout/cancel` | Annulation de commande                                   | Client        |

## Composants

```
Layout
  Header (logo, nav, icone panier avec badge)
  Footer (liens, reseaux sociaux, copyright)
  MobileMenu (navigation hamburger)

Accueil
  HeroSection (image plein ecran + CTA)
  FeaturedProducts (grille 3-4 produits)
  BrandBanner (texte/image marque)

Catalogue
  ProductGrid (grille responsive)
  ProductCard (image, nom, prix)
  Filters (categorie, taille, prix)

Fiche produit
  ImageGallery (image principale + thumbnails)
  ProductInfo (nom, prix, description)
  VariantSelector (taille, couleur)
  AddToCartButton

Panier
  CartItem (image, nom, variante, qte, prix)
  CartSummary (sous-total, livraison, total)
  CartProvider (React Context + localStorage)

Checkout
  ShippingForm (adresse, ville, code postal)
  OrderSummary (recap commande)
  StripePayment (redirection vers Stripe Checkout)
```

## Couche donnees — Integration WooCommerce

### Endpoints utilises

```
GET  /wp-json/wc/v3/products            -> Catalogue
GET  /wp-json/wc/v3/products/{id}       -> Fiche produit
GET  /wp-json/wc/v3/products/categories  -> Categories/Filtres
POST /wp-json/wc/v3/orders              -> Creer commande
```

Tous les appels API se font cote serveur (Server Components ou Route Handlers).
Les cles API WooCommerce ne sont jamais exposees au navigateur.

### Gestion du panier

- React Context (CartProvider) cote client
- Persistance via localStorage
- Pas de panier cote WooCommerce — tout est local jusqu'au checkout

### Flux de checkout

1. Client remplit le formulaire (adresse, livraison)
2. Next.js Route Handler `POST /api/checkout`
3. Cree la commande via WooCommerce API (`POST /wp-json/wc/v3/orders`)
4. WooCommerce retourne l'order_id
5. Redirection vers Stripe Checkout Session
6. Stripe redirige vers `/checkout/success` ou `/checkout/cancel`
7. WooCommerce met a jour le statut via webhook Stripe

### Cache & performance (ISR)

| Donnee          | Strategie                  | Revalidation |
|-----------------|----------------------------|--------------|
| Liste produits  | ISR (Static + revalidate)  | 60 secondes  |
| Fiche produit   | ISR (Static + revalidate)  | 60 secondes  |
| Categories      | ISR (Static + revalidate)  | 5 minutes    |
| Panier          | Client-side (localStorage) | Temps reel   |
| Checkout        | Dynamique (pas de cache)   | —            |

## Structure du projet

```
belyzlash/
  app/
    layout.tsx              <- Layout global (header, footer, CartProvider)
    page.tsx                <- Accueil
    shop/
      page.tsx              <- Catalogue
      [slug]/
        page.tsx            <- Fiche produit
    cart/
      page.tsx              <- Panier
    checkout/
      page.tsx              <- Checkout
      success/
        page.tsx            <- Confirmation
      cancel/
        page.tsx            <- Annulation
    api/
      checkout/
        route.ts            <- Route Handler (creer commande)
  components/
    layout/                 <- Header, Footer, MobileMenu
    home/                   <- HeroSection, FeaturedProducts, BrandBanner
    shop/                   <- ProductGrid, ProductCard, Filters
    product/                <- ImageGallery, ProductInfo, VariantSelector
    cart/                   <- CartItem, CartSummary, CartProvider
    checkout/               <- ShippingForm, OrderSummary, StripePayment
  lib/
    woocommerce.ts          <- Client API WooCommerce (fetch wrapper)
  tailwind.config.ts        <- Palette belyzlash
  next.config.ts
  package.json
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React Context + localStorage (panier)
- WooCommerce REST API v3
- Stripe (via plugin WooCommerce Stripe Gateway)
