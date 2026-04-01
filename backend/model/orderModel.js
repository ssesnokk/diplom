import mongoose from "mongoose";

var createdAt = function(){
    const now = new Date();
    const formattedDate = now.toISOString();
    return formattedDate;
};


const orderSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required : true,
    }, lastName : { 
        type : String, 
        required : true,
    }, email: {
        type: String,
        required : true,
    }, phone : {
        type: Number,
        required : true,
    }, company: {
        type: String,
    }, address : {
        type: String,
        required : true,
        
    }, region: {
        type: String,
        required : true,

    }, city : {
        type: String,
        required : true,

    }, postCode : {
        type: String,
        required : true,
    }, products: {
        type: Object,
        required : true,
    }, status : {
        type: Object,
        required : true,
    }, price : {
        type: Number,
        required : true,
    }, createdAt: {
        type: String,
        default: createdAt
    },
})

export default mongoose.model("order",orderSchema)