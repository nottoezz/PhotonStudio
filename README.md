# React Online Store

A lightweight demo storefront built with **React + Vite**, featuring client-side routing, form validation, and a simple cart with a floating total. The interface uses a dark theme driven by CSS variables.

<p align="center">
  <a href="https://nodejs.org/en">Node</a> ·
  <a href="https://vitejs.dev/">Vite</a> ·
  <a href="https://react.dev/">React</a> ·
  <a href="https://reactrouter.com/">React Router</a> ·
  <a href="https://formik.org/">Formik</a>
</p>

---

## Features

- **Catalogue**
  - Grid of products with image, title, description, and price
  - Per-item color/variant selection
  - “Buy” updates a floating **Total Price** widget
- **Authentication (Demo)**
  - Registration: first name, surname, email, password + confirmation
  - Login: email + password
  - Client-side validation with Formik
  - Demo persistence via `localStorage` (no backend)
- **Navigation**
  - Pages: `Home`, `Products`, `About`, `Login`, `Register`
  - Navbar reflects auth state (Login/Register ↔ Welcome/Logout)
- **Styling**
  - Dark theme using CSS variables (design tokens)
  - Glass-style cards, subtle shadows, responsive layout

---

## Getting Started (Local)

> Requires **Node 18+**

```bash
npm install
npm run dev
# then open http://localhost:5173
```

---

## Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

---

## Project Structure

```
src/
├─ components/
│  └─ TotalPrice.jsx
├─ context/
│  ├─ AuthProvider.jsx
│  ├─ CartProvider.jsx
│  └─ useAuth.js / useCart.js
├─ layout/
│  └─ Layout.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ Products.jsx
│  ├─ About.jsx
│  ├─ Login.jsx
│  └─ Register.jsx
├─ index.css
└─ main.jsx
```

---

## Routing & Hosting Notes

- The app uses **React Router**. For static hosting (e.g., GitHub Pages), use a hash-based router (e.g., `createHashRouter`) or configure a SPA fallback to avoid 404s on refresh.
- All data is in-memory or `localStorage`; there is no server API.

---

## Security & Limitations

- This project is **for demonstration purposes**. Authentication is purely client-side with `localStorage`; do not use it as-is for production.
- For real applications, add a secure backend, proper authentication/authorization, server-side validation, and encrypted storage.

---

## Tech Stack

- **React 19**, **Vite 7**
- **React Router v7**
- **Formik** for form state and validation
- CSS variables for theming and custom components
