# 📝 Personal Blogging Platform API

A simple RESTful API for a personal blogging platform built with TypeScript, Express, Prisma, and
PostgreSQL. This project focuses on implementing CRUD operations following REST principles.

## 📌 Features

- Create, read, update and delete blog posts

- Filter posts by search term (title, content, or category)

- Follows RESTful conventions and best practices

- Includes request validation and proper error handling

## 🚀 Tech Stack

- **Language:** TypeScript

- **Framework:** Express.js

- **ORM:** Prisma

- **Database:** PostgreSQL

## 📦 Usage

1. Clone the .env.template file and configure the environment variables.
2. Run `npm install` to install the project dependencies.
3. If you need the database, configure the docker-compose.yml file and run `docker-compose up -d` to start the services.
4. Run `npm run prisma:migrate:dev` to apply the database migrations.
5. Run `npm run prisma:generate` to generate the Prisma client.
6. Run `npm run dev` to start the project in development mode.

## 🔌API Endpoints

### 📚 Get All Blog Posts

GET `/api/posts`

**Response:**

- `200 OK` with an array of blog posts

### 🔍 Search Blog Posts

GET `/api/posts?term=searchTerm`

**Searches** in `title`, `content`, and `category`

**Response:**

- `200 OK` with matching blog posts

### 📑 Get Single Blog Post

GET `/api/posts/:id`

**Response:**

- `200 OK` with the blog post
- `404 Not Found` if not found

### ✅ Create Blog Post

POST `/api/posts`

**Request body:**

```
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**Response:**

- `201 Created` with the new blog post
- `400 Bad Request` if validation fails

### 🛠 Update Blog Post

PUT `/api/posts/:id`

**Request body:**

```
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**Response:**

- `200 OK` with the updated blog post
- `400 Bad Request` if validation fails
- `404 Not Found` if the post doesn't exist

### 🗑️ Delete Blog Post

DELETE `/api/posts/:id`

**Response:**

- `204 No Content` if successfully deleted.
- `400 Bad Request` if id validation fails
- `404 Not Found` if the post doesn't exist

## 🥷Challenge

[Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api)
