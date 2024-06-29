# SEA Salon Reservation System

## Description
SEA Salon Reservation System is a full-stack web application designed to manage reservations for a multi-branch salon business. It allows customers to book appointments at different branches, selecting from various services with different durations. The system includes both a React frontend and an Express.js backend with a PostgreSQL database.

## Features
- User authentication (login/register)
- Multi-branch support
- Service management per branch
- Advanced reservation system
- Admin dashboard for managing services and branches
- Responsive design for mobile and desktop views

## Technologies Used
- Frontend: React 18, TypeScript, Tailwind CSS, Vite
- Backend: Express.js, Node.js, TypeScript
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT), bcrypt

## Prerequisites
- Node.js (version 18.x or higher recommended)
- npm (version 8.x or higher)
- PostgreSQL (version 12.x or higher)

## Database Schema

![alt text](https://github.com/okkyPratama/sea-salon/blob/main/erd%20sea_salon.png?raw=true)

The application uses the following database tables:

1. `users`: Stores user information
2. `branch`: Stores information about salon branches
3. `services`: Stores available services
4. `branch_services`: Links branches with their offered services
5. `reservations`: Stores customer reservations
6. `review`: Stores customer reviews

## API Endpoints

- `POST /register`: Register a new user
- `POST /login`: Authenticate a user
- `GET /branches-services`: Get all branches with their services
- `POST /reservations`: Create a new reservation
- `GET /reservations`: Get all reservations for a user
- `POST /reviews`: Create a new review
- `GET /reviews`: Get all reviews

## Installation

### Frontend

1. Clone the repository:
```
https://github.com/okkyPratama/sea-salon.git
```

2. Install dependencies in frontend:
```
npm install
``

3. Install dependencies in backend directory:
```
cd backend
npm install
```

4. Set up environment variables in the backend:
Here is my `.env` file in the backend directory:
```
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=admin
DB_PORT=5432
PORT=5000
JWT_TOKEN=IGXMO5GDcAUNPuUXh2fAt7X97c1SwgkF8jFNP96jOGo
```
5. Set up the database:
- Create a PostgreSQL database named `sea_salon`
- Run the SQL commands provided in the `schema.sql` or look from the given erd image create the necessary tables and initial data seeder 

6. Start the development server in the backend first:
```
npm run dev

```
7. Navigate to frontend and start the development server:
```
cd ../
npm run dev;
```

## Contact
Okky Pratama - okkypratama.dev@gmail.com


