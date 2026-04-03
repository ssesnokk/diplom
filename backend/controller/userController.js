import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Регистрация пользователя
export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Заполните все обязательные поля" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        // Хеширование пароля
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            phone: phone || '',
            password: hashedPassword,
            isAdmin: false // По умолчанию обычный пользователь
        });

        const savedUser = await newUser.save();
        
        // Создаем токен
        const token = jwt.sign({ id: savedUser._id, isAdmin: savedUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                isAdmin: savedUser.isAdmin
            },
            token
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Ошибка сервера при регистрации", error: error.message });
    }
};

// Вход пользователя
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Введите email и пароль" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Неверный пароль" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: "Вход выполнен успешно",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            },
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Ошибка сервера при входе", error: error.message });
    }
};

// Получить всех пользователей (для админки)
export const fetch = async (req, res) => {
    try {
        // .select('-password') исключает поле пароля из ответа
        const users = await User.find().select('-password');
        
        if (!users || users.length === 0) {
            return res.status(200).json([]); // Возвращаем пустой массив, а не ошибку 404
        }
        
        res.status(200).json(users);
    } catch (error) {
        console.error("Fetch users error:", error);
        res.status(500).json({ message: "Ошибка при получении списка пользователей", error: error.message });
    }
};

// Обновление пользователя
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        
        if (!userExist) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        // Если пытаются обновить пароль, хешируем его
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "Ошибка при обновлении пользователя", error: error.message });
    }
};

// Удаление пользователя
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        
        if (!userExist) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Пользователь удален успешно" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Ошибка при удалении пользователя", error: error.message });
    }
};