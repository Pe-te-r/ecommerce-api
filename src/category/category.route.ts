import { Hono } from "hono";
import { createCategory, deleteCategory, getAllCategory, getOneCategory, updateCatgeory } from "./category.control";

export const categoryRoute = new Hono()

categoryRoute.get('/categories', getAllCategory)
categoryRoute.get('/categories/:id', getOneCategory)
categoryRoute.delete('/categories/:id', deleteCategory)
categoryRoute.post('/categories', createCategory)
categoryRoute.put('/categories', updateCatgeory)