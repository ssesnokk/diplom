import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import cors from 'cors'; // 1. Импорт CORS
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js"

const app = express ();

app.use(cors()); // 2. Разрешаем запросы с любого источника (для локальной разработки)
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5001; // Убедись, что порт совпадает с тем, на котором ты запускаешь
const MONGOURL = process.env.MONGO_URI; 

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected Successfully.")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
}).catch(error => console.log(error));

app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
