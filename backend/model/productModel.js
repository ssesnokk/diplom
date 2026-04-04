import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    
    // Базовая цена и скидка для товара без вариантов
    price: { type: Number, required: true }, 
    discount: { type: Number, default: 0 }, 
    
    countInStock: { type: Number, required: true, default: 0 },
    
    // Варианты (фасовки)
    variants: [{
        weight: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 }, // <--- ДОБАВЛЕНО ЭТО ПОЛЕ
        countInStock: { type: Number, required: true, default: 0 }
    }]
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;