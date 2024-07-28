import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { usersInsertT, usersSelectT, usersTable } from "../drizzle/schema"
import { UUID } from "../types/types"

export const getAllUsersService =async(detailed:boolean,limit: number):Promise<usersSelectT []| null>=>{
    if(!detailed && limit>0){
        return await db.query.usersTable.findMany({limit: limit})
    }else if(detailed && limit > 0){
        console.log(limit)
        return await db.query.usersTable.findMany({
            limit:limit,
            with:{
                location:true,
                products:true,
                orders:true,
            }
        })
    }else if(detailed ){
        return await db.query.usersTable.findMany({
            with:{
                location:true,
                products:true,
                orders:true,
            }
        })
    }else{
        return await db.query.usersTable.findMany()
    }
}



export const getOneUserService =async(detailed: boolean,id:UUID)=>{
    if(detailed){
        return await db.query.usersTable.findFirst(
            {
                where:eq(usersTable.id,id),
                columns:{
                    location_id:false,
                },
                with:{
                    location:{
                        columns:{
                            id:false,
                        }
                    },
                    payments:{
                        columns:{
                            payment_method:true,
                            payment_status:true,
                            transaction_id:true,
                            amount:true,
                        }
                    },
                    reviews:{
                        columns:{
                            rating:true,
                            comment:true,
                        }
                    },
                    orders:true,
                    products:true,
                    profile:true,
                }
            }
        )
    }
    return await db.query.usersTable.findFirst({
        where:eq(usersTable.id,id)
    })
}


export const createUserService =async(newUser: usersInsertT):Promise<{ id: string }[]>=>{
    return await db.insert(usersTable).values(newUser).returning({'id': usersTable.id}).execute()
}

export const updateUserService =async(id: UUID, updatedUser: Partial<usersSelectT>): Promise<string>=>{
    await db.update(usersTable).set(updatedUser).where(eq(usersTable.id,id))
    return 'success';
}

export const deleteUserService =async(id: UUID): Promise<string>=>{
    await db.delete(usersTable).where(eq(usersTable.id,id))
    return 'success';
}