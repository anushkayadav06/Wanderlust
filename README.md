# 🌍 Wanderlust

**Wanderlust** is a full-stack travel listing web application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can explore, create, edit, and review travel listings with integrated authentication and cloud image storage.

## 🔧 Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: EJS, Bootstrap
- Authentication: Passport.js
- Image Upload: Cloudinary, Multer
- Sessions: Express-Session, connect-mongo
- Deployment: Render

## 🚀 Features

- User Signup/Login with session-based authentication
- CRUD operations on listings
- Add and delete reviews
- Filter and search listings
- Cloud image upload for listings
- Flash messaging & form validations

## 📁 Project Structure

- `/models` – Mongoose models (Listing, User, Review)
- `/routes` – Express route handlers (Listings, Reviews, Users)
- `/controllers` – Business logic for each route
- `/views` – EJS templates for rendering pages
- `/public` – Static files (CSS, JS, images)

## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/anushkayadav06/Wanderlust.git
   cd Wanderlust
