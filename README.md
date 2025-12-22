# Real-time Chat Application

A full-stack real-time chat application built with modern web technologies. This application allows users to communicate in real-time with features like private messaging, group chats, and more.

## Features

- User Authentication (Signup/Login)
- Real-time messaging
- Private and group chats
- Responsive design
- Online/Offline status
- File and image sharing
- Real-time notifications

## Tech Stack

### Frontend
- React.js
- Socket.io Client
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express
- Socket.io for real-time communication
- MongoDB for database
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

## Getting Started

### 1. Clone the repository
```bash
git clone [your-repository-url]
cd Chat-App
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4. Running the Application

#### Start the backend server
```bash
cd backend
npm run dev
```

#### Start the frontend development server
```bash
cd frontend
npm start
```

## Project Structure

```
Chat-App/
├── backend/           # Backend server code
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── socket/       # Socket.io configuration
│   ├── utils/        # Utility functions
│   ├── app.js        # Express app configuration
│   └── server.js     # Server entry point
│
├── frontend/         # Frontend React application
│   ├── public/       # Static files
│   └── src/          # Source code
│       ├── assets/   # Images, fonts, etc.
│       ├── components/ # Reusable components
│       ├── context/  # React context
│       ├── pages/    # Page components
│       ├── services/ # API services
│       └── App.js    # Main App component
│
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


