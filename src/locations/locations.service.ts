import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { locationInsertT, locationsTable } from "../drizzle/schema"
import { UUID } from "../types/types"

export const getAllLocationsService = async(detailed: boolean,limit: number)=>{
    if(detailed && limit > 0){
        return await db.query.locationsTable.findMany({
            limit:limit,
            with:{
                users:true,
            }
        })
    }else if(!detailed && limit >0){
        return await db.query.locationsTable.findMany({
            limit: limit
        })
    }else if(detailed){
        return await db.query.locationsTable.findMany({
            with:{
                users:true,
            }
        })
    }else{
        return await db.query.locationsTable.findMany()
    }
}

export const getOneLocationService = async(detailed: boolean,id: UUID)=>{
    if(detailed){
        return await db.query.locationsTable.findFirst(
            {
                where:eq(locationsTable.id,id),
                with:{
                    users:true,
                }
            }
        )
    }
    return await db.query.locationsTable.findFirst({
        where:eq(locationsTable.id,id)
    })
}

export const addLocationService = async(newLocationData: locationInsertT): Promise<string | null>=>{
    const newLocation = await db.insert(locationsTable).values(newLocationData).returning({'id': locationsTable.id}).execute()
    return newLocation[0].id ?? null;
}

export const updateLocationService = async(id: UUID,updateLocation: Partial<locationInsertT>): Promise<string>=>{
    await db.update(locationsTable).set(updateLocation).where(eq(locationsTable.id,id))
    return 'success';
}

export const deleteLocationService = async(id: UUID): Promise<string>=>{
    await db.delete(locationsTable).where(eq(locationsTable.id,id))
    return 'success' ?? 'error';
}