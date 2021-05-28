const mongoose = require('mongoose');
const ProductModel = require('../models/productModel');

async function createProduct(data){

    console.log("Creating a product with attributes:", data);

    let porductSearchInstance = await ProductModel.findOne(data);
    let createdProduct = null;
    
    
    if(!porductSearchInstance){
        let productInstanceData = new ProductModel(data);
        createdProduct = await productInstanceData.save();
    }

    return createdProduct;
}

async function getProduct(id){
    return await ProductModel.findOne({_id: id});
}

async function getAllProducts(){
    return await ProductModel.find({});
}

async function deleteProduct(id){
    await ProductModel.deleteOne({_id: id});
}

async function updateProduct(id, data){
    let porductSearchInstance = await ProductModel.findOne({_id: id});
    
    if(porductSearchInstance){
        await ProductModel.updateOne({_id: id}, data);
        return true;
    }
    return false;
}

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
};