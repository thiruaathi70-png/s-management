# 🎓 Student Management System

A **full-stack web application** built with **React.js**, **Spring Boot**, and **MySQL** to manage student records efficiently. This project demonstrates a complete Java full-stack architecture suitable for GitHub portfolios and resumes.

---

## 📸 Screenshots

> _Add screenshots of your application here after running it._

| Dashboard | Student List | Student Details |
|-----------|-------------|-----------------|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## ✨ Features

- 📋 **View All Students** — Searchable and filterable student table
- ➕ **Add Student** — Form with full validation (name, email, phone, DOB, dept, course)
- ✏️ **Edit Student** — Pre-filled update form
- 🔍 **Student Details** — Complete profile card with academic info
- 🗑️ **Delete Student** — With confirmation dialog
- 📊 **Dashboard** — Statistics cards + department breakdown + recent students
- 🔎 **Search** — Real-time client-side search by name, email, dept, course
- ⚠️ **Error Handling** — Global exception handler with meaningful messages
- ✅ **Validation** — Both client-side (React) and server-side (Spring Validation)

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js 18 | UI framework |
| React Router DOM 6 | Client-side routing |
| Axios | HTTP client for API calls |
| React Icons | Icon library |
| Vanilla CSS | Styling with CSS variables |

### Backend
| Technology | Purpose |
|-----------|---------|
| Spring Boot 3.2 | Application framework |
| Spring Data JPA | ORM / data access layer |
| Hibernate | JPA implementation |
| Spring Validation | Bean validation |
| Lombok | Boilerplate code reduction |
| Maven | Build and dependency management |

### Database
| Technology | Purpose |
|-----------|---------|
| MySQL 8+ | Relational database |
| JDBC | Database connectivity |

---

## 📁 Project Structure

```
Student Management Project/
│
├── 📂 backend/                          # Spring Boot Application
│   ├── src/main/java/com/sms/
│   │   ├── StudentManagementApplication.java   # Main entry point
│   │   ├── controller/
│   │   │   └── StudentController.java          # REST endpoints
│   │   ├── service/
│   │   │   ├── StudentService.java             # Service interface
│   │   │   └── impl/StudentServiceImpl.java    # Business logic
│   │   ├── repository/
│   │   │   └── StudentRepository.java          # JPA repository
│   │   ├── entity/
│   │   │   └── Student.java                    # JPA entity
│   │   ├── dto/
│   │   │   └── StudentDTO.java                 # Data transfer object
│   │   └── exception/
│   │       ├── ResourceNotFoundException.java  # Custom 404 exception
│   │       └── GlobalExceptionHandler.java     # @ControllerAdvice
│   ├── src/main/resources/
│   │   └── application.properties              # DB config, server config
│   └── pom.xml                                 # Maven dependencies
│
├── 📂 frontend/                         # React Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js                   # Axios API service
│   │   ├── components/
│   │   │   ├── Navbar.js / Navbar.css          # Top navbar
│   │   │   └── Sidebar.js / Sidebar.css        # Left sidebar navigation
│   │   ├── pages/
│   │   │   ├── Dashboard.js / Dashboard.css    # Overview page
│   │   │   ├── StudentList.js / StudentList.css # All students table
│   │   │   ├── AddStudent.js                   # Add student form
│   │   │   ├── EditStudent.js                  # Edit student form
│   │   │   ├── StudentDetails.js               # Student profile view
│   │   │   └── FormStyles.css                  # Shared form styles
│   │   ├── App.js / App.css                    # Root component + routing
│   │   ├── index.js                            # React DOM render
│   │   └── index.css                           # Global styles + CSS variables
│   └── package.json
│
└── README.md
```

---

## 🌐 REST API Documentation

Base URL: `http://localhost:8080/api/students`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|---------|
| `GET` | `/` | Get all students | None | `200 OK` → `List<StudentDTO>` |
| `GET` | `/{id}` | Get student by ID | None | `200 OK` → `StudentDTO` |
| `POST` | `/` | Create new student | `StudentDTO` (JSON) | `201 Created` → `StudentDTO` |
| `PUT` | `/{id}` | Update student | `StudentDTO` (JSON) | `200 OK` → `StudentDTO` |
| `DELETE` | `/{id}` | Delete student | None | `200 OK` → `{message}` |
| `GET` | `/search?q=keyword` | Search students | None | `200 OK` → `List<StudentDTO>` |
| `GET` | `/stats` | Dashboard statistics | None | `200 OK` → `Map<String, Object>` |

### Sample Request Body (POST /api/students)

```json
{
  "fullName": "Arjun Kumar",
  "email": "arjun@example.com",
  "phoneNumber": "9876543210",
  "department": "Computer Science",
  "course": "B.Tech",
  "dateOfBirth": "2002-05-15"
}
```

### Sample Success Response

```json
{
  "id": 1,
  "fullName": "Arjun Kumar",
  "email": "arjun@example.com",
  "phoneNumber": "9876543210",
  "department": "Computer Science",
  "course": "B.Tech",
  "dateOfBirth": "2002-05-15",
  "createdAt": "2024-01-15 10:30:00",
  "updatedAt": "2024-01-15 10:30:00"
}
```

### Sample Error Response (404)

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with id : '99'"
}
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Java 17+** → [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.8+** → [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** → [Download](https://dev.mysql.com/downloads/mysql/)
- **Node.js 18+** → [Download](https://nodejs.org/)
- **npm** → Comes with Node.js

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management-system.git
cd student-management-system
```

### Step 2: Set Up MySQL Database

1. Open MySQL Workbench or MySQL CLI
2. Create the database:

```sql
CREATE DATABASE sms_db;
```

> ✅ The `students` table will be **automatically created** by Hibernate when you start the backend.

### Step 3: Configure Backend

Open `backend/src/main/resources/application.properties` and update your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sms_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root          # ← Change to your MySQL username
spring.datasource.password=root          # ← Change to your MySQL password
```

### Step 4: Run the Backend

```bash
cd backend
mvn spring-boot:run
```

✅ Backend starts at: **http://localhost:8080**

You should see:
```
=====================================================
  Student Management System is running!
  Backend URL : http://localhost:8080
  API Base    : http://localhost:8080/api/students
=====================================================
```

### Step 5: Run the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

✅ Frontend starts at: **http://localhost:3000**

---

## 🧱 Architecture Overview

```
React Frontend (Port 3000)
        │
        │  HTTP REST API (JSON)
        ▼
Spring Boot Backend (Port 8080)
        │  Controller → Service → Repository
        ▼
MySQL Database (Port 3306)
        │  sms_db → students table
```

### Layered Architecture (Backend)

```
Controller Layer   → Handles HTTP requests, input validation
      ↓
Service Layer      → Business logic, DTO conversion
      ↓
Repository Layer   → Database queries (JPA/Hibernate)
      ↓
Entity Layer       → Maps Java objects to DB tables
```

---

## 🗄️ Database Schema

**Table: `students`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| `full_name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE |
| `phone_number` | VARCHAR(15) | NOT NULL |
| `department` | VARCHAR(100) | NOT NULL |
| `course` | VARCHAR(100) | NOT NULL |
| `date_of_birth` | DATE | NOT NULL |
| `created_at` | DATETIME | Auto-set on insert |
| `updated_at` | DATETIME | Auto-set on update |

---

## 🔒 Validation Rules

| Field | Rules |
|-------|-------|
| Full Name | Required, 2–100 characters |
| Email | Required, valid email format, unique |
| Phone Number | Required, exactly 10 digits |
| Department | Required, selected from list |
| Course | Required, selected from list |
| Date of Birth | Required, must be in the past |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
