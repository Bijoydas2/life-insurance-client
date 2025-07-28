# LifeSecure - Life Insurance Management Platform

A full-featured MERN stack life insurance management platform with role-based dashboards for Admin, Agent, and Customer. It supports policy management, secure payments, JWT-based auth via HttpOnly cookies, customer applications, blog system, reviews, analytics, and more.

---

##  Live Website

🔗 [https://lifesecure.web.app](https://lifesecure.web.app)

---

##  Admin Login (for demo)

- **Email**: `bijoy@dl`  
- **Password**: `1234Bijoy`  
>  Change credentials in Firebase/Auth or MongoDB in production.

---

##  Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, DaisyUI, Axios, React Hook Form, Tanstrack Query , React Icons  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: Firebase Auth with JWT (HttpOnly Cookies)  
- **Payments**: Stripe  
- **Deployment**: firebase host (Frontend), vercel (Backend)  


---

##  Key Features

- <span title="Access Control"><i class="fa fa-user-shield"></i></span> Role-based access control: Admin | Agent | Customer  
- <span title="Admin Dashboard"><i class="fa fa-tachometer-alt"></i></span> Admin Dashboard:
  - Manage users, policies, and transactions  
  - Approve or reject applications  
  - Analytics and income reports (with PDF export)  
  - Blog/article management  
- <span title="Agent Dashboard"><i class="fa fa-user-tie"></i></span> Agent Dashboard:
  - Add and manage policies  
  - Post and manage personal blogs  
- <span title="Customer Dashboard"><i class="fa fa-users"></i></span> Customer Dashboard:
  - Apply for insurance policies  
  - Track application and payment statuses  
  - Write reviews and testimonials  
- <span title="Payment"><i class="fa fa-credit-card"></i></span> Stripe integration for secure payments  
- <span title="Blog System"><i class="fa fa-blog"></i></span> Role-based blog system with post count  
- <span title="Application"><i class="fa fa-file-signature"></i></span> Application form with personal, nominee, and health info  
- <span title="Protected Routes"><i class="fa fa-lock"></i></span> Protected routes using JWT and HttpOnly cookies  
- <span title="PDF"><i class="fa fa-file-pdf"></i></span> PDF download support for applications and reports  
- <span title="Search"><i class="fa fa-search"></i></span> Case-insensitive search, filters, and pagination  
- <span title="Analytics"><i class="fa fa-chart-line"></i></span> Real-time dashboard analytics with MongoDB aggregation  
- <span title="Errors"><i class="fa fa-exclamation-triangle"></i></span> Custom Forbidden and 404 Error pages  
- <span title="Responsive"><i class="fa fa-mobile-alt"></i></span> Fully responsive and mobile-ready


---

##  Installation & Setup

### 1. Clone the Repos

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Bijoydas2
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-Bijoydas2
