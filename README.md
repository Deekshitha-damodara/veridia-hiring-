# 🌟 Veridia Hiring App

A MERN Stack (MongoDB, Express, React, Node.js) based hiring management platform designed for candidate registration, job application submission, and admin dashboard for managing applicants.

## 🧠 Overview
The Veridia Hiring App simplifies the recruitment process by allowing candidates to register, log in, and submit application forms with educational and skill details. The admin can view all submissions, update statuses (shortlisted/rejected/hired), and manage applicants efficiently.

## ⚙️ Tech Stack
### Frontend:
- React.js (with React Router)
- Axios for API calls
- TailwindCSS / Custom CSS for styling

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)

### Database:
- MongoDB Atlas (Cloud-hosted)

### Other Tools:
- JWT Authentication
- bcrypt for password encryption
- CORS for secure communication

## 🚀 Features Implemented
✅ User Registration & Login
- Register with name, email, and password
- Login authentication using JWT

✅ Application Form
- Add personal, educational, and skill details
- Upload resume (.pdf, .docx, .jpg formats)
- Add website links (LinkedIn/GitHub)
- Multi-language selection
- Required fields validation

✅ Admin Dashboard
- View all candidate applications
- Filter by application status
- Update status: Pending, Shortlisted, Rejected, Hired
- Delete or modify candidate entries

✅ Responsive Design
- Mobile and desktop friendly
- Neatly centered form layouts

## 🧩 Folder Structure
veridia-hiring-app/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── ApplicationForm.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│
├── README.md
└── package.json

## ⚡ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/yourusername/veridia-hiring-app.git
cd veridia-hiring-app

2️⃣ Install dependencies
For backend:
cd backend
npm install

For frontend:
cd frontend
npm install

3️⃣ Create .env file in backend
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Run the backend server
node server.js

5️⃣ Run the frontend
npm start

## 🔐 Authentication Flow
User registers → Data stored in MongoDB (password hashed)
Login → JWT token generated
Token used for accessing protected routes
Admin verifies applications via dashboard

## 🧱 Future Enhancements
✅ Role-based access control
✅ Email notifications
✅ Resume viewer for admin
✅ Applicant analytics dashboard
