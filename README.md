# LifeSecure — Life Insurance Management Platform

A full-featured **MERN** stack life insurance management platform with role-based dashboards for **Admin**, **Agent**, and **Customer**. It supports policy management, secure payments, JWT-based auth via HttpOnly cookies, customer applications, blog system, reviews, analytics, and more.

---

## Live Website

🔗 [https://life-insurance-app-client.vercel.app/](/[)](https://life-insurance-app-client.vercel.app/)

### Screenshots

> (Live site screenshots)

<div style="display: flex; overflow-x: auto; gap: 10px;">
  <img src="https://i.ibb.co/Wv9Rb5hH/Screenshot-2025-10-26-203423.png" width="400">
  <img src="https://i.ibb.co/dszkQZdv/Screenshot-2025-10-26-203542.png" width="400">
  <img src="https://i.ibb.co/b5MQ8gqm/Screenshot-2025-10-26-203752.png" width="400">
  <img src="https://i.ibb.co.com/5WL6X3Jm/Screenshot-3.png" width="400">
</div>

---

## Demo Admin Login

* **Email**: `bijoy@dl`
* **Password**: `1234Bijoy`

> **Security note:** These demo credentials are for development/demo only. Change or remove them in production (Firebase/Auth and/or MongoDB).

---

## Tech Stack

* **Frontend:** React, React Router, Tailwind CSS, DaisyUI, Axios, React Hook Form, React Query (Tanstack Query), React Icons
* **Backend:** Node.js, Express.js, MongoDB
* **Authentication:** Firebase Auth with JWT (HttpOnly cookies)
* **Payments:** Stripe
* **Deployment:** Firebase Hosting (Frontend), Vercel (Backend)

---

## Key Features

* Role-based access: **Admin | Agent | Customer**
* **Admin Dashboard:** manage users, policies, transactions, approve/reject applications, earnings analytics, export PDF
* **Agent Dashboard:** add & manage policies, manage agent blogs
* **Customer Dashboard:** apply for policies, track application & payment status, make payments via Stripe, write reviews/testimonials
* Secure Stripe integration with payment tracking
* Blog system with role-based posting
* Application form including personal, nominee, and health information
* Protected routes using JWT verification (HttpOnly cookies)
* Downloadable PDF documents
* Case-insensitive search, filters, and pagination
* Real-time dashboard statistics using MongoDB aggregation
* Custom Forbidden and Error pages
* Fully responsive and production-ready

---

## Installation & Setup

### 1. Clone the repositories

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Bijoydas2
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-Bijoydas2
```

### 2. Frontend setup

```bash
cd b11a12-client-side-Bijoydas2
npm install
# create .env.local with required Firebase, API base URL and Stripe keys
npm run build # or npm start for dev
```

### 3. Backend setup

```bash
cd b11a12-server-side-Bijoydas2
npm install
# create .env with MONGODB_URI, JWT_SECRET, FIREBASE_SERVICE_ACCOUNT (if used), STRIPE_SECRET_KEY
npm run start:dev
```

### 4. Environment variables (example keys to add)

* `MONGODB_URI` — MongoDB connection string
* `JWT_SECRET` — secret used for signing JWTs
* `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc. — Firebase config for the frontend
* `FIREBASE_SERVICE_ACCOUNT` — (optional) service account credentials for server-side Firebase operations
* `STRIPE_SECRET_KEY` — server-side Stripe secret key
* `CLIENT_ORIGIN` — allowed frontend origin for CORS

---

## Notes & Recommendations

* Use **HttpOnly cookies** for JWTs to protect against XSS.
* For production, rotate demo credentials and set secure cookie flags (`Secure`, `SameSite=Strict` where appropriate).
* Restrict CORS origins on the server to production domains only.
* Use strong validation and rate limiting on public endpoints (e.g. login, application submission).
* Back up MongoDB and configure proper indexes for analytics queries.

---

## Contribution

PRs and issues are welcome. For feature requests, open an issue describing the feature and intended users (Admin/Agent/Customer).

---

## License

Specify your license here (e.g. MIT).

---

*Generated README — edit as needed.*
