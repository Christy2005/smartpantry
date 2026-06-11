#  Smart Pantry

An AI-powered recipe recommendation platform that helps users discover recipes from available ingredients using text, voice, and image inputs.

##  Live Demo

Frontend: https://smartpantry-wy74.vercel.app/

##  Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### AI Recipe Generation
- Generate recipes using available ingredients
- Meal Type Selection
- Cuisine Selection
- Detailed Cooking Instructions
- Cooking Time Estimation

### Fridge Image Detection
- Upload a fridge image
- AI detects ingredients automatically
- Ingredients are populated into search

### Voice Input
- Speak ingredients using browser speech recognition
- Automatic ingredient entry

### Saved Recipes
- Save favorite recipes
- View saved recipes
- Delete saved recipes

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

### Database
- PostgreSQL
- Neon Database

### AI Services
- Google Gemini API
- Image-based Ingredient Detection

### Deployment
- Vercel (Frontend)
- Render (Backend)

##  Project Structure

```
smart-pantry/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── api.js
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── db.js
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/smart-pantry.git
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run Frontend

```bash
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Run Backend

```bash
npm start
```

##  Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Recipe Search
- Image Upload
- Saved Recipes

## Future Improvements

- Pantry Inventory Management
- Nutrition Information
- Shopping List Generator
- Recipe Sharing
- Mobile Responsive Design
- Dark/Light Theme Toggle

## Author

Christy Denees

Computer Science Engineering Student
