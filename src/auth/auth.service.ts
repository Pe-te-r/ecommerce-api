import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { passwordSelectT, passwordTable, usersTable } from "../drizzle/schema"
import { UUID } from "../types/types"

interface InputTypes {
    password:string,
    id:UUID,
}
export const storePasswordService =async(authData: InputTypes): Promise<string | null>=>{
    const user_id= await db.insert(passwordTable).values(authData).returning({id: passwordTable.id}).execute()
    return user_id[0].id
}

export const updatePasswordService = async(newPassword: string,id: UUID): Promise<string>=>{
    await db.update(passwordTable).set({password: newPassword}).where(eq(passwordTable.id,id)).execute()
    return 'success'
}

export const getPasswordService = async(id: UUID): Promise<passwordSelectT | undefined>=>{
    return await db.query.passwordTable.findFirst({where: eq(passwordTable.id,id)})
}

export const checkUserExists =async(email: string): Promise<any>=>{
    return await db.query.usersTable.findFirst({where: eq(usersTable.email,email),
        with:{
            password:{
                columns:{
                    password:true,
                }
            }
        }
    })
}

export const checkUserName = async(userName: string): Promise<boolean> => {
    const user = await db.query.usersTable.findFirst({where: eq(usersTable.userName, userName)})
    return!!user
}