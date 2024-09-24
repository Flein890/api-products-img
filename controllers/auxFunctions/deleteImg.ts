import { ProductModel } from "../../models/product"
import * as fs from "fs";

export const deleteImg = async(id:string) =>{
const product:any = await ProductModel.findById(id);
const img = product.image;
fs.unlinkSync('./public/'+img)
}