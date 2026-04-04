import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tc: { 
    type: String, 
    default: "" // Необязательное поле для ТЦ
    },
    city: {
        type: String,
        required: true,
        trim: true,
        index: true // Индекс для быстрого поиска по городу
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    hours: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model("Store", storeSchema);