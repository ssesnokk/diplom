import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Нужно будет установить: npm install bcryptjs

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Убедитесь, что поле называется name, а не firstName/lastName
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Обязательно должно быть
    phone: { type: String },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

// Метод для сравнения паролей
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);