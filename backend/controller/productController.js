import Product from "../model/productModel.js"

export const create = async(req, res)=>{
    try {
        const productData = new Product( req.body);
        const {title} = productData;
        const productExist = await Product.findOne({title})
        if (productExist){
            return res.status(400).json({message : "Product already exist."})
        }
        const savedProduct = await productData.save();
        res.status(200).json(savedProduct)
    } catch (error) {   
        res.status(500).json({error : "Internal Server Error. "})
    }
}

export const fetch = async (req, res)=>{
    try {
        const products = await Product.find();
        if(products.length === 0 ){
            return res.status(404).json({message : "Product not Found."})
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const fetch2 = async (req, res)=>{
    try {
        const id = req.params.id;
        const products = await Product.findOne({_id:id})
        if(products.length === 0 ){
            return res.status(404).json({message : "Product not Found."})
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const update = async (req, res)=>{
    try {
        const id = req.params.id;
        const productExist = await Product.findOne({_id:id})
        if (!productExist){
            return res.status(404).json({message : "Product not found."})
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(updateProduct);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}
export const deleteProduct = async (req, res)=>{
    try {
        const id = req.params.id;
        const productExist = await Product.findOne({_id:id})
        if(!productExist){
            return res.status(404).json({message : " Product Not Found. "})
        }
        await Product.findByIdAndDelete(id);
        res.status(201).json({message : " Product deleted Successfully."})
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}