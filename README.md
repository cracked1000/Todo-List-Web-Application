# 📝 TODO List Application

A full-stack TODO List application with task management, statistics tracking, and Dockerized deployment.

## 📦 Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React + Vite              |
| Backend   | Spring Boot + Spring Data JPA |
| Database  | MySQL |
| Container | Docker + Docker Compose   |
| Testing   | Jest + React Testing Library + JaCoCo |

---

## 🚀 Features

- ✅ Create tasks with title and description  
- ✏️ Update/Edit existing tasks  
- ✅ Mark tasks as completed  
- ❌ Delete tasks  
- 📊 View task statistics (total, completed, deleted)  
- 🔄 Reset statistics counters  
- 🧪 Comprehensive test coverage  
- 🐳 Fully containerized deployment  

---

## 🗂️ Project Structure

```
Todo-List-Web-Application/
├── backend/
│   └── ToDoList/
│       ├── src/
│       │   ├── main/java/com/example/ToDoList/
│       │   │   ├── Model/           # Task entity
│       │   │   ├── Controller/      # REST API endpoints
│       │   │   ├── Service/         # Business logic
│       │   │   └── Repository/      # Data access layer
│       │   └── test/                # Backend test cases
│       ├── target/                  # Build output & JaCoCo reports
│       ├── pom.xml                  # Maven dependencies
│       ├── Dockerfile               # Backend Docker setup
│       └── mvnw                     # Maven wrapper
├── Frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── css/                     # Component styles
│   │   └── tests/                   # Frontend test cases
│   ├── public/                      # Static files
│   ├── package.json                 # NPM dependencies
│   ├── jest.config.js               # Jest configuration
│   ├── babel.config.cjs             # Babel configuration
│   ├── vite.config.js               # Vite config
│   ├── nginx.conf                   # Nginx config for frontend
│   └── Dockerfile                   # Frontend Docker setup
├── docker-compose.yml               # Multi-container orchestration
└── README.md                        # Project documentation
```

---

## 🐳 Dockerized Setup

1. **Clone the repository**

```bash
git clone https://github.com/cracked1000/Todo-List-Web-Application.git
cd Todo-List-Web-Application
```

2. **Run Docker / start Docker**

3. **Build and start containers**

```bash
docker-compose up --build
```

4. **Visit the app**

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:8080/tasks](http://localhost:8080/tasks)

---

### ⚠️ Common Issue: Container Name Conflict

If you see an error like:

```
Error response from daemon: Conflict. The container name "/todo-db" is already in use...
```

That means an old container is still present.  
You can fix it easily by running:

```bash
docker container prune -f
```

Then re-run:

```bash
docker-compose up --build
```

---

## 🧪 Running Tests

### Frontend Tests

```bash
cd Frontend
npm install
npm test
```

**Test Coverage:**
- ✅ TaskCard Component (rendering, buttons, delete confirmation)
- ✅ NavBar Component (stats display, reset functionality)
- ✅ TaskList Component (empty state, task rendering)
- ✅ TaskForm Component (form validation, submission)
- ✅ App Component (integration tests)

**Test Results:**
```
Test Suites: 5 passed, 5 total
Tests:       22 passed, 22 total
```

### Backend Tests

**Run tests locally with Docker MySQL**

```bash
# Start MySQL container
docker-compose up -d db

# Wait a few seconds for MySQL to initialize, then run tests
cd backend/ToDoList
./mvnw clean test jacoco:report
```

View coverage report:  
`backend/ToDoList/target/site/jacoco/index.html`

**Test Coverage:**
- ✅ Task Service (business logic, CRUD operations)
- ✅ Task Controller (REST endpoints, HTTP responses)
- ✅ Integration tests with Spring Boot context

**Configuration:**
- Docker tests connect to MySQL container via `db:3306`

---

## 🛠 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update an existing task |
| PUT | `/tasks/complete/{id}` | Mark task as completed |
| DELETE | `/tasks/{id}` | Delete a task |
| GET | `/tasks/stats` | Get task statistics |
| POST | `/tasks/stats/reset` | Reset statistics |

---

## 🔄 Docker Commands

### Start the application
```bash
docker-compose up
```

### Stop the application
```bash
docker-compose down
```

### Rebuild after code changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### View logs
```bash
docker-compose logs -f
```

---

## 🎥 Demo Preview

https://github.com/user-attachments/assets/6d5b74d2-8d0e-4820-ba57-bf8ca974d32c

---

## ✅ Project Features

- [x] Full CRUD operations for tasks  
- [x] RESTful API with Spring Boot  
- [x] Responsive React UI  
- [x] Task statistics tracking  
- [x] Comprehensive frontend testing (22 tests)  
- [x] Backend testing with JaCoCo coverage  
- [x] Automated testing in Docker builds  
- [x] Docker containerization  
- [x] Persistent SQL database  
- [x] Dual environment support (local & Docker)  

---

## 📄 License

MIT © 2025 [Shahul Hameed](https://github.com/cracked1000)
