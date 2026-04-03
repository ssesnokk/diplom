import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
        unique: true,
    }, subtitle : { 
        type : String, 
        required : true,
        unique: true,
    }, article: {
        type: String,
        required : true,
        unique: true,

    }, brand : {
        type: String,
        required : true,

    }, oldPrice: {
        type: Number,

    }, price : {
        type: Number,
        required: true,
    }, path: {
        type: Array,
        required: true,
    }, specifications: {
        type: Object,
        of: String,
        required : true,
    }, images: {
        type: Array,
        required : true,
    }
})

export default mongoose.model("product",productSchema)