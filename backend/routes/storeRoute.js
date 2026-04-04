import express from "express";
import { getAllStores, getCities, createStore, updateStore, deleteStore } from "../controller/storeController.js";

const route = express.Router();

// Публичные маршруты
route.get("/all", getAllStores);
route.get("/cities", getCities);

// Админские маршруты (требуется middleware авторизации, если есть)
route.post("/create", createStore);
route.put("/update/:id", updateStore);
route.delete("/delete/:id", deleteStore);

export default route;