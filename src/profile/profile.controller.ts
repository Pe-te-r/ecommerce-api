import { Context } from "hono";
import { createProfileService, deleteProfileService, getAllProfileService, updateProfileService } from "./profile.service";
import { getOneUserService } from "../users/users.service";

export const getAllProfile=async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed = Boolean(queries['detailed']) || false
        const limit = parseInt(queries['limit']) || 0
        const results = await getAllProfileService(detailed,limit)
        return c.json({'results': results})
    } catch (error: any) {
        console.error(error)
        return c.json({'error':'cannot get all profiles'})
    }
}

export const getOneProfile = async(c: Context)=>{
    try {
        const queries = c.req.query()   
        const detailed = Boolean(queries['detailed']) || false
        const id = c.req.param('id')
        const results = await getOneUserService(detailed,id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot get one profile'})
        
    }
}

export const updateProfile = async(c: Context)=>{
    try {
        const id = c.req.param('id')
        const updatedProfile = await c.req.json()
        const results = await updateProfileService(id,updatedProfile)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot update'})
    }
}

export const createProfile = async(c: Context)=>{
    try {
        const newProfile = await c.req.json()
        const results = await createProfileService(newProfile)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot create'})
        
    }
}

export const deleteProfile = async(c: Context) => {
    try {
        const id = c.req.param('id')
        const results = await deleteProfileService(id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot delete'})
        
    }
}