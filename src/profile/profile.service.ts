import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { profileInsertT, profileSelectT, profileTable } from "../drizzle/schema"
import { UUID } from "../types/types"

export const getAllProfileService = async(detailed: boolean,limit: number)=>{
    if(detailed && limit > 0){
        return await db.query.profileTable.findMany({
            limit: limit,
            with:{
                users:true,
            }
        })
    }else if(!detailed && limit > 0){
        return await db.query.profileTable.findMany({
            limit: limit
        })
    }else if(detailed){
        return await db.query.profileTable.findMany({
            with:{
                users:true,
            }
        })
    }
}

export const getOneProfileService = async(id: UUID, detailed: boolean): Promise<profileSelectT | undefined>=>{
    if(detailed){
        return await db.query.profileTable.findFirst(
            {
                where:eq(profileTable.id,id),
                with:{
                    users:true,
                }
                
            }
        )
    }
    return await db.query.profileTable.findFirst({
        where:eq(profileTable.id,id)
    })
}


export const createProfileService = async(newProfile: profileInsertT): Promise<string | null>=>{
    const id= await db.insert(profileTable).values(newProfile).returning({'id': profileTable.id}).execute()
    return id[0].id
}

export const updateProfileService = async(id: UUID, updatedProfile: Partial<profileInsertT>): Promise<string>=>{
    await db.update(profileTable).set(updatedProfile).where(eq(profileTable.id,id))
    return 'success';
}

export const deleteProfileService = async(id: UUID): Promise<string>=>{
    await db.delete(profileTable).where(eq(profileTable.id,id))
    return 'success';
}