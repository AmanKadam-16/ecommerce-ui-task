# Exclusive E-Commerce Frontend

Frontend implementation for the **Exclusive** e-commerce UI challenge. The project translates the provided Figma customer storefront and admin dashboard designs into a responsive React application with mock data, local state, and routed pages.

## Submission Links

- Live demo: todo
- GitHub repository: todo

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router
- Zustand
- React Hook Form
- Lucide React

## Features

### Customer Side

- Home page with categories, flash sales, product sections, banner, and service highlights
- Login and sign-up pages
- Product detail page
- Cart and checkout flow
- Wishlist page
- Account/profile page
- About and contact pages
- 404 page
- Shared announcement bar, header, footer, breadcrumbs, product cards, ratings, and countdown timer

### Admin Dashboard

- Analytics dashboard overview
- Order management
- Customer management
- Customer detail view
- Categories management
- Transactions page
- Add product page
- Admin role/profile page

Admin controls include searchable/filterable tables, tabs, dropdown actions, pagination state, editable forms, toggles, selectable colors, password visibility controls, copy feedback, and chart tooltip interaction.

## Project Structure

```text
ecommerce-ui-task/
|-- exclusive-store/                 # React app
|   |-- src/
|   |   |-- components/
|   |   |   |-- admin/               # Admin layout and reusable admin UI
|   |   |   |-- layout/              # Customer layout pieces
|   |   |   `-- ui/                  # Shared customer UI components
|   |   |-- data/                    # Mock products and admin data
|   |   |-- pages/                   # Customer pages
|   |   |-- pages/admin/             # Admin dashboard pages
|   |   |-- store/                   # Zustand store
|   |   `-- types/                   # Shared TypeScript types
|   `-- package.json
|-- figma_images/                    # Reference screenshots
`-- README.md
```

## Routes

### Customer Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/login` | Login |
| `/signup` | Sign Up |
| `/about` | About |
| `/contact` | Contact |
| `/account` | Account |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/wishlist` | Wishlist |
| `/product/:id` | Product Detail |
| `*` | 404 |

### Admin Routes

| Route | Page |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/orders` | Order Management |
| `/admin/customers` | Customers |
| `/admin/customers/:customerId` | Customer Detail |
| `/admin/categories` | Categories |
| `/admin/transactions` | Transactions |
| `/admin/add-product` | Add Product |
| `/admin/profile` | Admin Role/Profile |

## Getting Started

```bash
cd exclusive-store
npm install
npm run dev
```

The development server runs at:

```text
http://localhost:5173
```

Open the admin dashboard at:

```text
http://localhost:5173/admin
```

## Build

```bash
cd exclusive-store
npm run build
```

This runs TypeScript project build checks and creates the production bundle in `exclusive-store/dist`.

## Preview Production Build

```bash
cd exclusive-store
npm run preview
```

## Notes

- This is a frontend-only challenge implementation.
- Product, customer, order, transaction, and category data are mocked locally.
- Authentication and payment flows are UI simulations only.
- The design uses the corrected green brand color `#4EA674` and footer color `#266E46`.
