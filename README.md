# SEA Salon Reservation System

## Description
SEA Salon Reservation System is a full-stack web application designed to manage reservations for a multi-branch salon business. It allows customers to book appointments at different branches, selecting from various services with different durations. The system includes both a React frontend and an Express.js backend with a PostgreSQL database.

## Features
- User authentication (login/register)
- Multi-branch support
- Service management per branch
- Advanced reservation system
- Admin dashboard for managing reservations, services, and branches
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

https://github.com/okkyPratama/sea-salon/blob/main/erd%20sea_salon.png?raw=true

The application uses the following database tables:

1. `users`: Stores user information
2. `branch`: Stores information about salon branches
3. `services`: Stores available services
4. `branch_services`: Links branches with their offered services
5. `reservations`: Stores customer reservations
6. `review`: Stores customer reviews