import { Router } from "express";
import { getProducts,saveProduct,updateProduct,deleteProduct } from "../controllers/productsController";
import { uploadImage } from "../middlewares/storage";


const routes = Router();


const cors = require('cors');
app.use(cors({ origin: '*' }));

routes.get("/products", getProducts);
routes.get("/products/:id", getProducts);
routes.post("/products",uploadImage.single("image") ,saveProduct);
routes.put("/products/:id",uploadImage.single("image") ,updateProduct);
routes.delete("/products/:id", deleteProduct);


export default routes;