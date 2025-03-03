# Profilers

## Overview
This project consists of a **backend** built with **NestJS** connected to a **Neo4j** database using **Neogma**, and a **frontend** built with **React** and **Vite**.

## Technologies Used

### Backend (NestJS + Neo4j)
- [NestJS](https://nestjs.com/)
- [Neo4j](https://neo4j.com/)
- [Neogma](https://neogma.io/) (Neo4j ORM for Node.js)
- TypeScript
- Node.js
- Docker (for database setup)

### Frontend (React + Vite)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- javaScript
- TailwindCSS (optional, for styling)

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (>=16.x)
- Docker & Docker Compose (for running Neo4j locally)
- Yarn or npm

---

## Backend Setup (NestJS + Neo4j)

### 1. Clone the repository
```bash
git clone https://github.com/mvasquezb99/ProgressiveProfiling.git
cd ProgressiveProfiling/server
```

### 2. Install dependencies
```bash
npm install  # or yarn install
```

### 3. Start Neo4j using Docker
Create a `.env` file in the `server` directory and add the following environment variables:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
```

Then, run:
```bash
docker-compose up -d
```

If you don’t have a `docker-compose.yml` file, create one:

```yaml
version: '3.8'
services:
  neo4j:
    image: neo4j:latest
    container_name: neo4j
    restart: always
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      NEO4J_AUTH: neo4j/password
```

### 4. Start the backend server
```bash
npm run start:dev  # or yarn start:dev
```

By default, the server will run at `http://localhost:3000`.

---

## Frontend Setup (React + Vite)

### 1. Navigate to the frontend folder
```bash
cd ../client
```

### 2. Install dependencies
```bash
npm install  # or yarn install
```

### 3. Start the development server
```bash
npm run dev  # or yarn dev
```

The React app should now be available at `http://localhost:5173`.

---

## API Endpoints (Example)
The backend provides RESTful API endpoints. Example:

- **GET** `/users` - Fetch all users
- **POST** `/users` - Create a new user

You can test the API using **Postman** or **cURL**.

---

## Environment Variables
Ensure the following environment variables are set:

### Backend `.env` file:
```env
PORT=3000
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
```

### Frontend `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

---

## Building for Production
### Backend
```bash
npm run build
npm run start
```

### Frontend
```bash
npm run build
npm run preview
```

---

## Testing
### Backend Tests
```bash
npm run test
```

### Frontend Tests
```bash
npm run test
```


---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## License
This project is licensed under the Apache License. See `LICENSE` for more details.

---

With this setup, your NestJS + Neo4j backend and React + Vite frontend should be fully functional! 🚀

## Contributors
- [Manuel Villegas Michel](https://github.com/VillegasMich)
- [Miguel Vásquez Bojanini](https://github.com/mvasquezb99)
- [Emanuel Patiño Vera](https://github.com/Emanuelpa)
- [Esteban Muriel Roldan](https://github.com/estebanm30)
- [Tomas Pineda Naranjo](https://github.com/TomasPinedaNaranjo)
