# 🩸 AidEx – Blood Donation & Funding Platform

![AidEx Banner](https://img.shields.io/badge/AidEx-Blood%20Donation%20Platform-%23f87898)

🌍 **AidEx** is a full‑stack web platform designed to connect blood donors with recipients and allow users to financially support life‑saving causes through secure online funding.

---

## 🚀 Live Website
🔗 **Frontend (Live):** https://aidex-by-biswanath.netlify.app/

---

## 📦 Repositories

- 🎨 **Frontend Repository:**  
  https://github.com/BiswanathBD/AidEx-Frontend

- 🛠 **Backend Repository:**  
  https://github.com/BiswanathBD/AidEx-Backend

- 👨‍💻 **GitHub Profile:**  
  https://github.com/BiswanathBD

---

## ✨ Key Features

### 🩸 Blood Donation System
- Create blood donation requests
- Search donors by **blood group, district & upazila**
- Donors can accept requests
- Track request status (Pending → In Progress → Done)

### 💰 Funding & Donation
- Secure **Stripe prebuilt checkout** integration
- Donors can give funds easily
- Payment success & error handling pages
- Funding history with pagination

### 🔐 Authentication & Security
- Firebase Authentication
- JWT protected API routes
- Role‑based access control
  - Admin
  - Volunteer
  - Donor

### 🧑‍💼 Admin & Volunteer Panel
- Manage users (role & status)
- View all donation requests
- View statistics:
  - Total donors
  - Total requests
  - Total funds collected

---

## 🛠️ Technologies Used

### Frontend
- ⚛️ React
- 🧭 React Router
- 🎨 Tailwind CSS
- 🎞 Framer Motion
- 🔐 Firebase Auth
- 🌐 Axios (Custom hook with token)

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 🔐 Firebase Admin SDK
- 💳 Stripe Checkout API

### Deployment
- 🌐 Netlify (Frontend)
- ☁️ Vercel / Render (Backend)

---

## 📂 Project Structure (Frontend)
```
src/
├── Components
├── Pages
├── Hooks
├── Auth
├── Layouts
└── Routes
```

---

## 🧪 Payment Flow (Stripe)
1. User enters donation amount
2. Redirects to Stripe Checkout
3. Payment success → `PaymentSuccess` page
4. Transaction verified using session ID
5. Donation data saved securely in database

---

## 📸 Screens & UI Highlights
- Clean & responsive design
- Smooth animations using Framer Motion
- Mobile & desktop friendly layout

---

## 🎯 Future Improvements
- Email notifications
- Donor leaderboard
- Campaign‑based fundraising
- PDF donation receipt

---

## 🙌 Author

**Biswanath Sarker**  
Web Developer (MERN Stack)

🔗 GitHub: https://github.com/BiswanathBD

---

## ⭐ Support
If you like this project, don’t forget to **star ⭐ the repository** and share it!

> *“Small acts of kindness can save lives.”* 💖



<!-- demo.user@gmail.com
pass: user@gmail.com

demo.volunteer@gmail.com
pass: volunteer@gmail.com

demo.admin@gmail.com
pass: admin@gmail.com -->