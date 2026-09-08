# MedDocX 🩺

**MedDocX** is a full-stack healthcare clinic platform — a public marketing/booking website paired with a complete admin dashboard for managing doctors, services, appointments, blog content, testimonials, and more.

🔗 **Live Site:** [med-doc-x.vercel.app](https://med-doc-x.vercel.app)
🔗 **API:** [meddocx.onrender.com](https://meddocx.onrender.com)

> **Note:** The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–60 seconds while the server wakes up.

---

## ✨ Features

### Public Website
- Responsive, animated homepage (hero, about, services, specialists, testimonials, blog, FAQ)
- Dark mode / light mode toggle with persisted preference
- Full doctor and service directories with detail pages
- Blog with published/draft workflow and article detail pages
- Appointment booking via modal, with spam protection (honeypot + rate limiting)
- Contact form with the same anti-spam protections
- Newsletter subscription

### Admin Dashboard
- Secure, cookie-based authentication (JWT via httpOnly cookie — no client-side token storage)
- Dashboard overview with live stats (pending appointments, unread messages, totals)
- Full CRUD management for:
  - Doctors (with photo upload)
  - Services
  - Blog articles (with cover image upload, auto-generated slugs)
  - Testimonials (with avatar upload)
  - FAQs
- Appointment management with status filtering (pending / confirmed / cancelled)
- Contact message inbox with read/unread tracking
- Site settings (homepage stats, profile, password management)
- Fully responsive admin interface

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite + TypeScript)
- **Tailwind CSS** — styling, with custom dark/light theme support
- **React Router** — client-side routing
- **TanStack Query (React Query)** — server state management and caching
- **React Hook Form + Zod** — form handling and validation
- **Framer Motion** — animations and micro-interactions
- **Axios** — HTTP client
- **Lucide React** / **React Icons** — iconography

### Backend
- **NestJS** (TypeScript)
- **MongoDB** with **Mongoose**
- **JWT** authentication via httpOnly cookies
- **Cloudinary** — image hosting for doctors, blog covers, and testimonials
- **class-validator** / **class-transformer** — request validation
- **bcrypt** — password hashing
- **@nestjs/throttler** — rate limiting on public endpoints

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Images:** Cloudinary

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB (local instance or a MongoDB Atlas connection string)
- A Cloudinary account (for image uploads)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Authentication

MedDocX uses a single-owner authentication model — there are no patient accounts or staff roles in this version. The site owner logs in through `/admin/login`, and a JWT is issued as an `httpOnly`, `secure`, `sameSite` cookie. No token is ever stored in `localStorage` or exposed to client-side JavaScript.

### Demo admin login

| | |
|---|---|
| **URL** | [/admin/login](https://med-doc-x.vercel.app/admin/login) |
| **Email** | `admin@gmail.com` |
| **Password** | `12345678` |

---

## 📄 License

This project was built as a freelance/portfolio engagement. All rights reserved by the project owner unless otherwise agreed.

---

## 🙋 About This Project

MedDocX was designed and built from a set of UI mockups into a fully functional, production-deployed full-stack application — covering backend architecture and API design, database modeling, authentication, file uploads, spam protection, and a complete responsive frontend with an admin content management system.