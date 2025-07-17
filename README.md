# 🎯 Event Management API

A modern, RESTful API for managing events, users, and registrations — built using **TypeScript**, **Express.js**, and **Prisma ORM**. This backend service enables event creation, user registration, and attendance tracking with full validation and pagination support.

## 🚀 Features

- Full CRUD for users and events
- Upcoming events with pagination
- Request validation via Zod
- Register/Cancel for events
- Pagination, error handling, and clean architecture
- Built using TypeScript, Express, Prisma, and PostgreSQL

## 🧰 Tech Stack

- **Language**: _TypeScript_
- **Framework**: _Express.js_
- **ORM**: _Prisma_
- **DataBase**: _PostgreSQL_
- **Validation**: _Zod_
- **Dev Tools** _:Nodemon, tsx, dotenv_

## 📁 Project Structure

```ini
src/                 # Root source
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
├── utilities/       # Reusable helper functions
├── validators/      # Schema validators
└── index.ts         # Application entry point
```

## 🧪 Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MohammadAsad-Weber/event-management-api.git
   cd event-management-api
   ```

2. **Install Dependencies**

   ```bash
    npm install
   ```

3. **Setup Environment Variables**

   _Create a `.env` file at the root with the following variables:_

   ```ini
   PORT=YOUR_PORT
   ENVIRONMENT=YOUR_ENVIRONMENT
   DATABASE_URL=YOUR_DATABASE_URL
   ```

4. **Migrate & Seed the Database**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Server**

   ```bash
   npm run dev
   ```

   **To Build:**

   ```bash
    npm run build
    npm run start
   ```

   _The server will be accessible at `http://localhost:3000` or at the port defined in the `.env` configuration file._

## 📚 API Documentation

### User Routes (`/api/users`)

| **Method** | **Endpoint** | **Description**       |
| ---------- | ------------ | --------------------- |
| GET        | `/`          | Get all users         |
| GET        | `/:id`       | Get single user by ID |
| POST       | `/`          | Create new user       |
| PUT        | `/:id`       | Update user by ID     |
| DELETE     | `/:id`       | Delete user by ID     |

### Event Routes (`/api/events`)

| **Method** | **Endpoint** | **Description**       |
| ---------- | ------------ | --------------------- |
| GET        | `/`          | Get all events        |
| GET        | `/upcoming`  | Get upcoming events   |
| GET        | `/:id`       | Get event by ID       |
| POST       | `/`          | Create a new event    |
| PUT        | `/:id`       | Update an event by ID |
| DELETE     | `/:id`       | Delete an event by ID |

### Registration Routes (`/api/register`)

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| POST   | `/`      | Register user for an event |
| DELETE | `/`      | Cancel user's registration |

### Open Collection in Postman

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/43160558-af475ddd-f3be-44f4-baed-711c7a0d0a42?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D43160558-af475ddd-f3be-44f4-baed-711c7a0d0a42%26entityType%3Dcollection%26workspaceId%3D1afb1a8a-77df-4a38-a0b6-91d05da2021a)

> All inputs are validated using **Zod** schemas.

## 🧠 Author

Mohammad Asad — [@MohammadAsad-Weber](https://github.com/MohammadAsad-Weber)
