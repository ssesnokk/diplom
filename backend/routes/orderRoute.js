import express from "express"
import { create, deleteProduct, fetch, fetch2, fetch3, update } from "../controller/orderController.js";

const route = express.Router();

route.get("/getallorders", fetch)
route.get("/getactiveorders", fetch2)
route.get("/getarchivedorders", fetch3)
route.post ("/create",create)
route.put("/update/:id", update)
route.delete("/delete/:id",deleteProduct)

export default route;