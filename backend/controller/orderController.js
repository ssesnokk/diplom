import Order from "../model/orderModel.js";

// Создать заказ
export const create = async (req, res) => {
    try {
        const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
        
        const newOrder = new Order({
            ...req.body,
            orderNumber,
            status: req.body.status || 'Новый'
        });
        
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: "Ошибка создания заказа", error: error.message });
    }
};

// Получить все заказы (для админки)
export const fetch = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения заказов", error: error.message });
    }
};

// Получить заказы пользователя (по email)
export const fetchUserOrders = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ message: "Email обязателен" });
        
        // Ищем строго по полю customerEmail
        const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения заказов пользователя", error: error.message });
    }
};

// Обновить статус заказа
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status) return res.status(400).json({ message: "Статус обязателен" });

        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedOrder) return res.status(404).json({ message: "Заказ не найден" });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Ошибка обновления статуса", error: error.message });
    }
};

// Удалить заказ
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Заказ не найден" });
        res.status(200).json({ message: "Заказ удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка удаления", error: error.message });
    }
};