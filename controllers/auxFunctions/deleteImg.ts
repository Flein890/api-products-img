import { ProductModel } from '../../models/product';
import * as fs from "fs";


export const deleteImg = async(id:string) =>{
const product:any = await ProductModel.find({id});
// console.log("abajo productImg")
// console.log(product)
//me lo devuelve como array de productos aunque sea uno, entonces especifido la posicion, sino me tira undefined
const img = product[0].image;
// console.log(product[0].image)
fs.unlinkSync('./public/'+img)
}