import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true }, // Артикул
    brand: { type: String, required: true }, // Бренд
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    // Базовая цена (может использоваться как "от", если есть варианты)
    price: { type: Number, required: true }, 
    discount: { type: Number, default: 0 }, // Скидка в процентах или рублях
    countInStock: { type: Number, required: true, default: 0 },
    
    // Новые поля для модификаций (вес, объем и т.д.)
    variants: [{
        weight: { type: String, required: true }, // Например: "1 кг", "5 л"
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 }
    }]
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;