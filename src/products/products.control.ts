import { Context } from "hono";
import { createProductService, deleteProductService, getAllProductServices, getOneProductService, updateProductService } from "./products.service";

export const getAllProducts = async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed = Boolean(queries['detailed']) || false
        const limit = parseInt(queries['limit']) || 0
        const results = await getAllProductServices(detailed,limit)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not get all products'})        
    }
}

export const getOneProduct = async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed = Boolean(queries['detailed']) || false
        const id = c.req.param('id')
        const results = await getOneProductService(detailed,id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not get one product'})        
    }
}

export const deleteProduct = async(c: Context)=>{
    try {
        const id = c.req.param('id')
        const results = await deleteProductService(id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not delete product'})        
    }
}

export const updateProduct = async(c: Context)=>{
    try {
        const id = c.req.param('id')
        const updatedProduct = await c.req.json()
        const results = await updateProductService(id,updatedProduct)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not update product'})        
    }
}

export const createProduct = async(c: Context)=>{
    try {
        const newProduct = await c.req.json()
        const results = await createProductService(newProduct)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not create product'})        
    }
}