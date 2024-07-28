import { Context } from "hono";
import { createUserService, deleteUserService, getAllUsersService, getOneUserService, updateUserService } from "./users.service";
import { UUID } from "../types/types"

export const getAllUsers = async(c: Context)=>{
    try {
        const params = c.req.param()
        const limit = params.limit || 0
        const detailed = params.detailed || false
        const results = getAllUsersService(Boolean(detailed),Number(limit))
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error':'cannot get all users'})
    }
}

export const getOneUser = async(c: Context)=>{
    try {
        const params = c.req.param()
        const id: UUID = params.id
        const detailed = params.detailed || false
        const result = await getOneUserService(Boolean(detailed),id)
        return c.json({'result': result})
    } catch (error: any) {
        return c.json({'error':'cannot get one user'})
    }
}

export const createUser = async(c: Context)=>{
    try {
        const newUser = await c.req.json()
        const result = await createUserService(newUser)
        return c.json({'result': result})
    } catch (error: any) {
        return c.json({'error':'cannot create user'})
    }
}

export const updateUser = async(c: Context)=>{
    try {
        const params = c.req.param()
        const id: UUID = params.id
        const updatedUser = await c.req.json()
        const result = await updateUserService(id,updatedUser)
        return c.json({'result': result})
    } catch (error: any) {
        return c.json({'error':'cannot update user'})
    }
}

export const deleteUser = async(c: Context)=>{
    try {
        const id: UUID = c.req.param('id')
        const results = await deleteUserService(id)
        return c.json({'result': results})
    } catch (error: any) {
        return c.json({'error':'cannot delete user'})
    }
}