import express from "express";
import { create, deleteProduct, fetch, fetchUserOrders, update } from "../controller/orderController.js";

const route = express.Router();

route.get("/getallorders", fetch);
route.get("/user/:email", fetchUserOrders); // Новый маршрут
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProduct);

export default route;