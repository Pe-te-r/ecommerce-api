import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { productInsertT, productTable } from "../drizzle/schema"
import { UUID } from "../types/types"

export const getAllProductServices=async(detailed: boolean ,limit: number)=>{
    if(detailed && limit > 0){
        return await db.query.productTable.findMany({
            limit: limit,
            with:{
                users:true,
                orders:true,
                category:true,
                reviews:true,
            }
        })
    }else if(!detailed && limit > 0) {
        return await db.query.productTable.findMany({
            limit: limit
        })
    }else if(limit > 0) {
        return await db.query.productTable.findMany({
            limit: limit,
            with:{
                users:true,
                orders:true,
                category:true,
                reviews:true,
            }
        })
    }else{
        return await db.query.productTable.findMany()
    }
}

export const getOneProductService = async(detailed: boolean,id: UUID)=>{
    if(detailed){
        return await db.query.productTable.findFirst(
            {
                where:eq(productTable.id,id),
                with:{
                    users:{
                        with:{
                            location:{
                                columns:{
                                    name:true,
                                    plot:true
                                }
                            }
                        }
                    },
                    orders:true,
                    category:true,
                    reviews:true,
                }
            }
        )
    }
    return await db.query.productTable.findFirst({
        where:eq(productTable.id,id)
    })
}


export const updateProductService = async(id: UUID,updateDetails: Partial<productInsertT>)=>{
    await db.update(productTable).set(updateDetails).where(eq(productTable.id,id))
    return'success'
}

export const deleteProductService = async(id: UUID)=>{
    await db.delete(productTable).where(eq(productTable.id,id))
    return 'success'
}

export const createProductService = async(newProduct: productInsertT): Promise< string | null>=>{
    const id= await db.insert(productTable).values(newProduct).returning({'id': productTable.id}).execute()
    return id[0].id
}