import express from "express"
import { create, deleteProduct, fetch, fetch2, update } from "../controller/productController.js";

const route = express.Router();

route.get("/getallproducts", fetch)
route.get("/getproduct/:id", fetch2)
route.post ("/create",create)
route.put("/update/:id", update)
route.delete("/delete/:id",deleteProduct)

export default route;