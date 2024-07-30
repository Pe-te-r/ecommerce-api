import { Hono } from "hono";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./products.control";

export const productRoute = new Hono()

productRoute.get('/products',getAllProducts)
productRoute.get('/products/:id',getOneProduct)
productRoute.put('/products/:id',updateProduct)
productRoute.delete('/products/:id',deleteProduct)
productRoute.post('/products',createProduct)