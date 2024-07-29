import { Context } from "hono";
import { createCategoryService, deleteCategoryService, getAllCatgoryService, getOneCategoryService, updateCategoryService } from "./category.service";
import { UUID } from "../types/types";

export const getAllCategory =async(c: Context)=>{
    try {
        const detailed = Boolean(c.req.query()['detailed']) || false
        const limit = parseInt(c.req.query()['limit']) || 0
        const results = await getAllCatgoryService(detailed,limit)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot get all categories'})
    }
}

export const getOneCategory = async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed = Boolean(queries['detailed']) || false
        const id: UUID = c.req.param('id')
        const results = await getOneCategoryService(id,detailed)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot get one category'})
    }
}

export const deleteCategory = async(c: Context) => {
    try {
        const id: UUID = c.req.param('id')
        const results = await deleteCategoryService(id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot delete category'})
    }
}

export const updateCatgeory = async(c: Context)=>{
    try {
        const id: UUID = c.req.param('id')
        const updatedCategory = await c.req.json()
        const results = await updateCategoryService(id,updatedCategory)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot update category'})
    }
}

export const createCategory = async(c: Context)=>{
    try {
        const data = await c.req.json()
        const result = await createCategoryService(data)
        c.json({'results': result})
    } catch (error: any) {
        return c.json({'error':'cannot create category'})
    }
}