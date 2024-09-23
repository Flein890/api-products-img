import { Request, Response } from "express";
import { ProductModel } from '../models/product';
import { validateProduct } from "./auxFunctions/validationProduct";
import { deleteImg } from "./auxFunctions/deleteImg";


export const getProducts = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const rows = (id === undefined) ? await ProductModel.find() : await ProductModel.findById(id);
        return res.status(200).json({stauts: true, data: rows});
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}


export const saveProduct = async(req:any,res:any) =>{
    try {
        const {name, price, description} = req.body;
        const validate = await validateProduct(name, price, req.file, description);
        console.log(validate)
        //revisar el validate sobre la imagen
        if (validate == ''){
            const newProduct = new ProductModel({
                name: name,
                price: price,
                image: '/uploads/'+req.file.filename,
                description: description
            })
            return await newProduct.save().then(()=>{
                res.status(200).json({status: true, message: 'Product created successfully'});
            });
        }
        else{
            return res.status(400).json({status: false, errors: validate});
        }
    
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}

export const updateProduct = async(req:any,res:any) =>{
    try {
        const {id} = req.params;
        const {name, price, description} = req.body;
        let img = '';
        let values = {name:name,price:price,description:description,img};
        if(req.file != null){
            img = '/uploads/'+req.file.filename;
            values = {name:name,price:price,description:description,img:img};
            await  deleteImg(id)
        }

        const validate = await validateProduct(name, price, req.file, description);
        console.log(validate)
        //revisar el validate sobre la imagen
        if (validate){
            await ProductModel.updateOne({_id:id},{$set: values});
            return res.status(200).json({status: true, message: 'Product updated successfully'});
        }
        else{
            return res.status(400).json({status: false, errors: validate});
        }
    
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}


export const deleteProduct =async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        await  deleteImg(id)
        await ProductModel.deleteOne({_id:id});
        return res.status(200).json({status:true,msg:"Product deleted"})
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}
