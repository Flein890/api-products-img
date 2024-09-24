import { error } from "console";
import * as fs from "fs"

export const validateProduct = async(name:string, price:number, image:any, description:string) =>{
    let errors:any = [];
    if(name == undefined || name.trim() == "") errors.push("Name is required");
    if(description == undefined || description.trim() == "") errors.push("Description is required");
    if(price == undefined || name.trim() == "" || isNaN(price)) errors.push("Price is required and must be numeric");
    if(image == undefined) {
        errors.push("Image must be Jpeg, Png or Jpg")
        fs.unlinkSync('/public/uploads/'+image.filename);
        console.log(errors)
    }else{
        if(errors != ''){
            fs.unlinkSync('./public/uploads/'+image.filename);
        }
    };
    return errors
}