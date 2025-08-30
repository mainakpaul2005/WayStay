# WayStay 🏨

WayStay is a full-stack web application where users can register, book hotels, and share community blogs.  
It is built as a resume project for showcasing full-stack development skills with Spring Boot, MySQL, React, Tailwind, and JWT authentication.

---

## 🚀 Project Goal
The aim of WayStay is to deliver a working, deployed web app that demonstrates:
- Secure REST API design
- Database integration with MySQL
- Authentication & authorization using JWT
- CRUD operations with relationships (users, hotels, bookings, blogs)
- Protected routes and state management on the frontend
- Deployment + documentation

---

## 🧩 Core Features
### 1. User Authentication
- Register, login, and JWT-based authentication
- Profile management and protected routes

### 2. Hotels & Bookings
- Browse hotels and view hotel details
- Make bookings linked to users
- View user’s personal bookings

### 3. Blog
- Create, edit, delete, and view community blog posts
- Blog posts linked to users (author only edit/delete)

---

## 📂 Project Structure
waystay/
│── backend/                 # Spring Boot project
│   ├── controller/          # REST Controllers
│   ├── model/               # Entities (User, Hotel, Booking, Blog)
│   ├── repository/          # JPA Repositories
│   ├── security/            # JWT, filters, config
│   ├── service/             # Business logic
│   ├── resources/           # application.properties (DB + JWT config)
│   └── pom.xml              # Maven dependencies

│── frontend/                # React project
│   ├── components/          # Reusable UI components
│   ├── context/             # AuthContext for global state
│   ├── pages/               # Register, Login, Home, Hotels, Bookings, Blog
│   ├── services/            # API calls
│   └── App.jsx              # Routing + Protected Routes

│── README.md
│── .gitignore

---

## 🛠️ Tech Stack
- Backend: Spring Boot, Spring Security, JWT, JPA/Hibernate
- Frontend: React, Tailwind CSS, Context API
- Database: MySQL
- Deployment: Netlify (frontend), Render/Fly.io (backend)

---

## 🗓️ Roadmap
### Phase 1: Setup & Authentication (Weeks 1–3)
- Setup backend and frontend projects
- Implement user authentication with JWT
- Frontend login/register + protected routes

### Phase 2: Hotels & Bookings (Weeks 4–6)
- Implement hotels listing and booking flow
- Create user bookings page

### Phase 3: Blog + Deployment (Weeks 7–10)
- Implement blog CRUD
- UI polish, responsiveness, and deployment
- Finalize documentation with live demo links

---

## 📌 Extras (Optional)
- Search/filter for hotels
- Pagination for blogs
- Image uploads (Cloudinary/S3)
- Unit testing (JUnit, React Testing Library)

---

## ⚡ Getting Started
### Prerequisites
- Java 17+
- Maven
- Node.js + npm
- MySQL

### Backend Setup
cd backend
mvn spring-boot:run

### Frontend Setup
cd frontend
npm install
npm run dev

---

## 📸 Screenshots
(To be added after implementation)

---

## 🌐 Live Demo
- Backend: Coming Soon
- Frontend: Coming Soon

---

## 👨‍💻 Author
Made by **Mainak Paul** as a full-stack learning project.
