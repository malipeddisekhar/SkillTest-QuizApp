# WebDev Quiz Master

A modern, full-stack quiz application built with React and MongoDB featuring CRUD operations for question management.

## Features
- **Quiz System**: Take interactive quizzes with timed questions
- **Admin Panel**: Full CRUD operations to manage questions
- **MongoDB Integration**: Persistent data storage
- **Leaderboard**: Track and display top scores
- **Clean Architecture**: Separate frontend and backend

## Tech Stack
**Frontend:**
- React (JSX)
- Tailwind CSS
- Vite

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- REST API

## Folder Structure
```
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main pages (Home, Quiz, Result, Admin)
│   │   └── services/      # API service layer
│   ├── index.html
│   └── package.json
├── backend/
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   └── server.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or cloud)

### Setup

1. **Install MongoDB** and start the MongoDB server

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on `http://localhost:5000`

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs on `http://localhost:3000`

## API Endpoints

### Questions (CRUD)
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Scores
- `GET /api/scores` - Get leaderboard (top 10)
- `POST /api/scores` - Save quiz result

## Environment Variables

Create a `.env` file in the `backend/` folder:
```
MONGODB_URI=mongodb://localhost:27017/quiz_master_db
PORT=5000
```

## Usage

1. **Take a Quiz**: Enter your name on the home page and start answering questions
2. **Admin Panel**: Access via header to add/manage questions
3. **View Results**: See your score and compare with the leaderboard

## Developer

**Malipeddi Sekhar**
- Contact: 9110573442
- [LinkedIn](https://www.linkedin.com/in/malipeddi-sekhar-08650630b/)
- [GitHub](https://github.com/malipeddisekhar)

---
Built for learning and educational purposes.
