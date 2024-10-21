import { Request, Response } from "express";
import { ProductModel } from '../models/product';
import { validateProduct } from "./auxFunctions/validationProduct";
import { deleteImg } from "./auxFunctions/deleteImg";

//===========================================================================================================================//
////==========================CAMBIAR TODAS LAS FUNCIONES FindByid o similares por otras caseras=============================//
//===========================================================================================================================//

export const getProducts = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const rows = (id === undefined) ? await ProductModel.find() : await ProductModel.find({id});
        return res.status(200).json({stauts: true, data: rows});
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}


export const saveProduct = async(req:any,res:any) =>{
    try {
        const {id,name, price, description} = req.body;
        const validate = await validateProduct(id,name, price, req.file, description);
        // console.log(validate)
        //revisar el validate sobre la imagen
        if (validate == ''){
            const newProduct = new ProductModel({
                id:id,
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
        return res.status(501).json({status: false, errors: error});
    }
}
//_____________________________________________________________________________________===>>>>>

export const updateProduct = async(req:any,res:any) =>{
    try {
        const {id} = req.params;
        const {name, price, description} = req.body;
        let img = '';
        let values:any = {name:name,price:price,description:description};
        console.log("1")
        if(req.file != null){
            img = '/uploads/'+req.file.filename;
            values = {name:name,price:price,description:description,image:img};
            //revisar porque no encuentra la img
            await  deleteImg(id)
        }
        console.log("2")
       

        const validate = await validateProduct(id,name, price, req.file, description);
        console.log(validate)
        console.log("3")
        //revisar el validate sobre la imagen
        if (validate == ''){
    
            // let product = await ProductModel.find({id:id});
            // console.log(product)
            
            await ProductModel.updateOne({id:id},{$set: values});
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
        await ProductModel.deleteOne({id:id});
        // await ProductModel.findOneAndDelete({id:id});
        return res.status(200).json({status:true,msg:"Product deleted"})
    } catch (error) {
        return res.status(500).json({status: false, errors: error});
    }
}
