import Order from "../model/orderModel.js"
import sendEmail from "../function/createCheque.js"

export const create = async(req, res)=>{
    try {
        const orderData = new Order( req.body);
        const {createdAt} = orderData;
        const orderExist = await Order.findOne({createdAt})
        if (orderExist){
            return res.status(400).json({message : "Order already exist."})
        }
        
        sendEmail(orderData)
        const savedOrder = await orderData.save();
        res.status(200).json(savedOrder)
        
    } catch (error) {   
        console.log(error);
        
        res.status(500).json({error : "Internal Server Error. "})
    }
}

export const fetch = async (req, res)=>{
    try {
        const orders = await Order.find();
        if(orders.length === 0 ){
            return res.status(404).json({message : "Order not Found."})
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}
export const fetch2 = async (req, res)=>{
    try {
        const orders = await Order.find();
        if(orders.length === 0 ){
            return res.status(404).json({message : "Order not Found."})
        }
        const filteredData = orders.filter((order) => {
            return !Object.keys(order.status).some(key => key === "Заказ вручен! Спасибо за покупку");
          });
        res.status(200).json(filteredData);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error : " Internal Server Error. "})
    }
}
export const fetch3 = async (req, res)=>{
    try {
        const orders = await Order.find();
        if(orders.length === 0 ){
            return res.status(404).json({message : "Order not Found."})
        }
        const filteredData = orders.filter((order) => {
            return Object.keys(order.status).some(key => key === "Заказ вручен! Спасибо за покупку");
          });
        res.status(200).json(filteredData);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const update = async (req, res)=>{
    try {
        const id = req.params.id;
        const orderExist = await Order.findOne({_id:id})
        if (!orderExist){
            return res.status(404).json({message : "Order not found."})
        }
        const updateOrder = await Order.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(updateOrder);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const deleteProduct = async (req, res)=>{
    try {
        const id = req.params.id;
        const orderExist = await Order.findOne({_id:id})
        if (!orderExist){
            return res.status(404).json({message : " Order Not Found. "})
        }
        await Order.findByIdAndDelete(id);
        res.status(201).json({message : " Order deleted Successfully."})
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}