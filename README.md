# 🛍️ E-Commerce App (Next.js 15 + MongoDB)

A modern full-stack **Next.js 15** application for browsing products, adding to cart, placing orders, and managing products as a seller — with secure authentication via **Clerk** and background workflows using **Inngest**.

---
## Vercel Deploy
next-ecommerce-rose-zeta.vercel.app

## 📌 Overview

This application allows users to:
- Browse products with detailed product pages.
- Add items to their cart and view a running total.
- Place orders securely.
- Sign in or sign up using **Clerk** authentication.
- Sellers can create, manage, and list their products.
- Sellers can view orders for their products via a dedicated dashboard.
- Inngest is used for background jobs (e.g., order processing, notifications).

---

## 🚀 Features

### 🛒 Website (User)
- View all products with search and filtering.
- Product detail page with images, price, and description.
- Add products to cart.
- Automatic total calculation in cart.
- Checkout and place orders.
- Clerk authentication for secure sign-in/sign-up.

### 📊 Seller Dashboard
- Accessed via **"Seller Dashboard"** button in the navbar.
- Create new products with images, price, and description.
- View a list of seller’s own products.
- View orders for seller’s products.

### ⚙️ Additional
- MongoDB for fast and scalable product, user, and order storage.
- Inngest for background processing tasks.
- Responsive UI for desktop and mobile.

---

## 🧰 Tech Stack

- **Frontend:** Next.js 15, React, Tailwind CSS
- **Backend:** Next.js API routes
- **Auth:** Clerk
- **Database:** MongoDB + Mongoose
- **Background Jobs:** Inngest
- **State Management:** React hooks / Context API
- **Styling:** Tailwind CSS

---

## 📂 Project Structure

ecommerce-app/
│
├── app/ # Next.js 15 App Router pages
├── components/ # Reusable UI components
├── lib/ # Database, Clerk, and Inngest setup
├── models/ # Mongoose models
├── public/ # Static assets
└── styles/ # Global styles



---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# Public Environment Variables
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Private Environment Variables
CLERK_SECRET_KEY=
MONGODB_URI=''
INNGEST_SIGNING_KEY=''
INNGEST_EVENT_KEY=''
# Cloudinary
CLOUDINARY_CLOUD_NAME =''
CLOUDINARY_API_KEY =''
CLOUDINARY_API_SECRET =''

```

##  📦 Installation
# Clone repository
git clone https://github.com/sohila-nabil/next-ecommerce.git

# Install dependencies
npm install

# Run development server
npm run dev

## ▶️ Usage
1- User Flow

- Visit the homepage to browse products.
- Click on a product to view its details.
- Add product to cart, check total, and proceed to checkout.
- Place an order.

2- Seller Flow
- Sign in and click "Seller Dashboard" in the navbar.
- Create a new product.
- View and manage listed products.
- See orders made for your products.

