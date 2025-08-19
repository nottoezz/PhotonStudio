# 🛍️ React Online Store

A lightweight online store built with **React + Vite**, featuring **React Router** navigation, **Formik** forms with validation, and a simple cart with a floating total. Dark, modern UI powered by CSS variables.

<p align="center">
  <a href="https://nodejs.org/en">Node</a> ·
  <a href="https://vitejs.dev/">Vite</a> ·
  <a href="https://react.dev/">React</a> ·
  <a href="https://reactrouter.com/">React Router</a> ·
  <a href="https://formik.org/">Formik</a>
</p>

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-0ea5e9?style=for-the-badge&logo=github)](archive/refs/heads/main.zip)

---

## ✨ Features

- **Product catalogue**
  - Grid of products with image, title, description, price
  - Color/variant select per product
  - “Buy” button updates a floating **Total Price** widget
- **Auth**
  - **Register** (first name, surname, email, strong password, confirm)
  - **Login** (email + password)
  - Client-side validation with Formik
  - Demo persistence via `localStorage` (no backend)
- **Navigation**
  - Pages: `Home`, `Products`, `About`, `Login`, `Register`
  - Nav reflects auth state (Login/Register ↔ Welcome/Logout)
- **Styling**
  - Dark theme with CSS variables (tokens)
  - Glass cards, subtle shadows, responsive layout

---

## 📦 Get the Code

**Download ZIP (GitHub default branch)**  
[Download the latest source as ZIP](archive/refs/heads/main.zip)

**Degit (no git history)**
```bash
npx degit YOUR_USERNAME/REPO my-store
cd my-store
npm install
```

**Git clone**
```bash
git clone https://github.com/YOUR_USERNAME/REPO.git
cd REPO
npm install
```

> Replace `YOUR_USERNAME/REPO` with your GitHub handle and repo name. If your default branch is `master`, change links accordingly.

---

## 🛠️ Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build locally
```

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# open http://localhost:5173
```

1) Register a new account (valid email, strong password).  
2) Login with the same credentials.  
3) Browse **Products** and click **Buy** — the floating **Total Price** will appear.  
4) Logout anytime from the navbar.

---

## 📁 Project Structure

```
src/
├─ components/
│  └─ TotalPrice.jsx
├─ context/
│  ├─ AuthProvider.jsx
│  ├─ CartProvider.jsx
│  └─ useAuth.js / useCart.js
├─ pages/
│  ├─ Home.jsx
│  ├─ Products.jsx
│  ├─ About.jsx
│  ├─ Login.jsx
│  └─ Register.jsx
├─ routes/
│  └─ Layout.jsx
├─ index.css
└─ main.jsx
```

---

## 🔐 Notes

- This project is **demo-only**. Auth uses `localStorage`; there’s **no server** or real encryption.
- Do not use as-is for production. For real apps, add a backend, proper auth, and secure storage.

---

## 🧩 Tech Stack

- **React 18**, **Vite**
- **React Router v6**
- **Formik** (form state/validation)
- CSS variables (theme tokens) + custom components