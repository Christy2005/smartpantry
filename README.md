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
  <img width="1920" height="968" alt="Screenshot (508)" src="https://github.com/user-attachments/assets/df66f106-042f-4460-b495-2444e287429c" />

- Register page
  <img width="1913" height="977" alt="Screenshot (509)" src="https://github.com/user-attachments/assets/eea5da39-8d8e-4e79-8099-439883b9d481" />


- Dashboard
  <img width="1920" height="955" alt="Screenshot (510)" src="https://github.com/user-attachments/assets/11e76e45-b82a-4a57-a889-d595d84921a0" />

- Recipe Search
  <img width="1920" height="972" alt="Screenshot (512)" src="https://github.com/user-attachments/assets/acf8e79d-22e4-405f-acfb-089fcca827ea" />
  
  <img width="1920" height="960" alt="Screenshot (513)" src="https://github.com/user-attachments/assets/036c0a5e-ad21-46a2-a76e-1057994150f0" />


- Image Upload
  <img width="1920" height="963" alt="Screenshot (511)" src="https://github.com/user-attachments/assets/acd712f8-60dd-40c2-bab7-8511fafc366d" />

- Saved Recipes
  <img width="1920" height="961" alt="Screenshot (515)" src="https://github.com/user-attachments/assets/78dc31ee-96f0-47b7-ae1f-d2be70161926" />


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
