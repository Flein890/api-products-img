import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
},{versionKey:false});

export const ProductModel = mongoose.model("products", ProductSchema);