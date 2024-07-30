import { Context } from "hono";
import * as bcrypt from "bcrypt";
import { createUserService, getOneUserService } from "../users/users.service";
import { storePasswordService } from "./auth.service";
import { UUID } from "../types/types";
//  register
export const registerController=async(c: Context)=>{
    try {
        const data = await c.req.json()
        const password = data.password
        const hashedPassword = await bcrypt.hash(password,10)
        delete data.password
        const id: UUID = await createUserService(data)
        if(id !== null){
            const storePasswordResults = await storePasswordService({id:id,password:hashedPassword})
            return c.json({'results':storePasswordResults})
        }
        return c.json({'error':'User creation failed'})
        
    } catch (error: any) {
        return c.json({'error': error?.message})        
    }

}


// login
export const loginController=async(c: Context)=>{
    try {
        const data = await c.req.json()
        const {id, password} = data
        const user = await getOneUserService(false,id)

        if(user){
            const valid = await bcrypt.compare(password, String(user?.password))
            if(valid){
                return c.json({'results':'Login successful'})
            }
            return c.json({'error':'Invalid password'})
        }
        return c.json({'error':'User not found'})
    } catch (error: any) {
        return c.json({'error': error?.message})        
    }
}