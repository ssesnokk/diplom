import express from "express";
import { register, login, fetch, update, deleteUser } from "../controller/userController.js";
// import authMiddleware from "../middleware/authMiddleware.js"; // Можно раскомментировать позже для защиты

const route = express.Router();

// Публичные маршруты
route.post("/register", register);
route.post("/login", login);

// Маршруты для администратора (пока без защиты middleware для тестов)
route.get("/getallusers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;