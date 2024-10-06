import { Request, Response } from "express";
import {ProductModel} from "../../models/product";
import {IProduct} from "../../models/product";

import { Model } from 'mongoose';

// Función para buscar productos por nombre
async function getProductsById(id: string,req: Request, res: Response): Promise<IProduct[]> {
  try {
   let {id} = req.params;
   if(id === undefined){
    const products = await ProductModel.find();
    return products;
   }
   else{
    // Utilizamos una expresión regular para hacer la búsqueda más flexible
    const products = await ProductModel.find({ id});
    return products;
  }
    
  
  } catch (error) {
    console.error('Error buscando productos por nombre:', error);
    throw error;
  }
}



// // Ejemplo de uso
// (async () => {
//   const productos = await findProductosPorNombre('laptop');
//   console.log('Productos encontrados:', productos);
// })();

