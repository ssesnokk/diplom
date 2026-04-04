import Store from "../model/storeModel.js";

// Получить все активные магазины
export const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({ isActive: true }).sort({ city: 1, name: 1 });
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения магазинов", error: error.message });
    }
};

// Получить список уникальных городов
export const getCities = async (req, res) => {
    try {
        const cities = await Store.distinct("city", { isActive: true });
        res.status(200).json(cities.sort());
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения городов", error: error.message });
    }
};

// Создать магазин (Админ)
export const createStore = async (req, res) => {
    try {
        const newStore = new Store(req.body);
        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
    } catch (error) {
        console.error("Create store error:", error);
        res.status(400).json({ message: "Ошибка создания магазина", error: error.message });
    }
};

// Обновить магазин (Админ)
export const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStore = await Store.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedStore) return res.status(404).json({ message: "Магазин не найден" });
        
        res.status(200).json(updatedStore);
    } catch (error) {
        console.error("Update store error:", error);
        res.status(400).json({ message: "Ошибка обновления магазина", error: error.message });
    }
};

// Удалить магазин (Админ) - мягкое удаление
export const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStore = await Store.findByIdAndUpdate(id, { isActive: false }, { new: true });
        
        if (!deletedStore) return res.status(404).json({ message: "Магазин не найден" });
        
        res.status(200).json({ message: "Магазин удален", store: deletedStore });
    } catch (error) {
        console.error("Delete store error:", error);
        res.status(400).json({ message: "Ошибка удаления магазина", error: error.message });
    }
};