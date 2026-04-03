import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: { 
        type: String,
        required: true,
        index: true 
    },
    customerPhone: { // ИСПРАВЛЕНО: было phone, стало customerPhone
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Наличные', 'Карта курьеру', 'Онлайн']
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: false
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: String,
            selectedVariant: Object
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Новый',
        enum: ['Новый', 'В обработке', 'Доставляется', 'Вручен', 'Отменен']
    }
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);