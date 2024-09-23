import { ProductModel } from "../../models/product"
import * as fs from "fs";

export const deleteImg = async(id:string) =>{
const product = await ProductModel.findById(id);
const img:string | null | undefined = product?.image;
fs.unlinkSync('./public/'+img)
}