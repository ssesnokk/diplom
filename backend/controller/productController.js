import Product from "../model/productModel.js";

// Получить все товары
export const fetch = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Fetch products error:", error);
        res.status(500).json({ message: "Ошибка при получении товаров", error: error.message });
    }
};

// Получить один товар по ID
export const fetch2 = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Товар не найден" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};

// Создать товар
export const create = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Ошибка создания товара", error: error.message });
    }
};

// Обновить товар
export const update = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Товар не найден" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Ошибка обновления товара", error: error.message });
    }
};

// Удалить товар
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Товар не найден" });
        res.status(200).json({ message: "Товар удален успешно" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка удаления товара", error: error.message });
    }
};