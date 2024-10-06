import { Schema,Model,model } from "mongoose";
import { ObjectId } from "mongoose";

 export interface IProduct {
    id: String,
    name: String,
    price: Number,
    image: String,
    description: String
};

const ProductSchema = new Schema <IProduct>({
    id:{
        type:String,
    },
    name:{
        type:String,
    },
    price:{
        type:Number,
    },
   
    image:{
        type:String,
    },
    description:{
        type:String,
    }
})

//usando el metodo toJSON de mongoose convertimos los datos a un json desestructurando del this.toObject();
//Con este método podemos enviar los datos al usuario filtrando lo que elijamos. En este caso, no le enviamos al usuario el __V, _id .

ProductSchema.methods.toJSON = function(){
    //desestructuramos las variables que no queremos enviar al user y luego lo convertimos a objeto
    const {__v,_id,...product} = this.toObject();
    //al desestructurar  __v,__id,  son quitadas del objeto user el cual es retornado
    return product
}


//Definimos el Modelo

export const ProductModel:Model<IProduct> = model("products", ProductSchema);
