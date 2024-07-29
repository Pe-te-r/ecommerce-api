import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { UUID } from "../types/types"
import { categoryInsertT, categorySelectT, categoryTable } from "../drizzle/schema"

export const getAllCatgoryService = async(detailed: boolean, limit: number)=>{
    if(detailed && limit > 0){
        return await db.query.categoryTable.findMany({
            limit:limit,
            with:{
                products:true,
            }
        })
    }else if(!detailed && limit > 0){
        return await db.query.categoryTable.findMany({
            limit: limit
        })
    }else if(detailed){
        return await db.query.categoryTable.findMany({
            with:{
                products:true,
            }
        })
    }else{
        return await db.query.categoryTable.findMany()
    }
}


export const getOneCategoryService = async(id: UUID, detailed: boolean): Promise<categorySelectT | undefined> =>{
    if(detailed){
        return await db.query.categoryTable.findFirst(
            {
                where:eq(categoryTable.id,id),
                with:{
                    products:true,
                }
            }
        )
    }
    return await db.query.categoryTable.findFirst({
        where:eq(categoryTable.id,id)
    })
}

export const createCategoryService = async(categoryDetails: categoryInsertT): Promise<string | null>=>{
    const id = await db.insert(categoryTable).values(categoryDetails).returning({'id': categoryTable.id}).execute()
    return id[0].id
}

export const updateCategoryService = async(id: UUID, updatedCategory: Partial<categoryInsertT>): Promise<string>=>{
    await db.update(categoryTable).set(updatedCategory).where(eq(categoryTable.id,id))
    return 'success'
}

export const deleteCategoryService = async(id: UUID)=>{
    await db.delete(categoryTable).where(eq(categoryTable.id,id))
    return 'success'
}