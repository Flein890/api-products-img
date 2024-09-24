import { Router } from "express";
import { getProducts,saveProduct,updateProduct,deleteProduct } from "../controllers/productsController";
import { uploadImage } from "../middlewares/storage";


const routes = Router();

routes.get("/products", getProducts);
routes.get("/products/:id", getProducts);
routes.post("/products",uploadImage.single("image") ,saveProduct);
routes.put("/products/:id",uploadImage.single("image") ,updateProduct);
routes.delete("/products/:id", deleteProduct);

//revisar todo lo relacionado con el put

export default routes;