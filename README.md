# Attached docker-compose to run mongodb locally

# Backend:

## 🚀 Features

- JWT-based Authentication
- MongoDB Integration with Mongoose
- Swagger API Documentation
- Pino Logger
- Protected Routes with Auth Guards
- Global Interceptors for Logging/Response Transformation

## 🛠️ Tech Stack

### NestJS
### MongoDB
### Mongoose
### JWT Auth
### Pino
### Swagger


## ⚙️ Setup

### npm install

## Start in dev mode
### npm run start:dev

## Build
### npm run build

## env variables
### MONGO_URI=mongodb://localhost:27017/ecommerce
### JWT_SECRET=yourSecretKey

## swagger
### http://localhost:3000/api

# Frontend

A modern frontend e-commerce web application built with React and TypeScript, consuming the backend NestJS APIs.

## ✨ Features

### User Login & JWT Auth
### Product Listing
### Axios-based API integration
### Form Validation

## ⚙️ Setup

### npm install

### npm run dev

## env variables
### VITE_API_URL="http://localhost:3000"