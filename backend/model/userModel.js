import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required : true,
    }, lastName : { 
        type : String, 
        required : true,
    }, email: {
        type: String,
        unique: true,

    }, phone : {
        type: Number,
        unique: true,

    }, address : {
        type: String,
        
    }, region: {
        type: String,

    }, city : {
        type: String,

    }, postCode : {
        type: String,
    }
})

export default mongoose.model("users",userSchema)