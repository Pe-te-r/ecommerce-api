import { Context } from "hono";
import { addLocationService, deleteLocationService, getAllLocationsService, getOneLocationService, updateLocationService } from "./locations.service";
import { UUID } from "../types/types";

export const getAllLocations = async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed =Boolean(queries['detailed']) || false
        const limit = parseInt(queries['limit']) || 0
        const results = await getAllLocationsService(detailed,limit)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not get all locations'})        
    }
}

export const getOneLocation= async(c: Context)=>{
    try {
        const queries = c.req.query()
        const detailed = Boolean(queries['detailed']) || false
        const id: UUID = c.req.param('id')
        const results = await getOneLocationService(detailed,id)
        return c.json({'results': results})
    } catch (error: any) {
        return c.json({'error': 'can not get one location'})        
    }
}


export const updateLocation = async(c: Context)=>{
    try {
        const id: UUID = c.req.param('id')
        const updateLocation =await c.req.json()
        const result = await updateLocationService(id,updateLocation)
        return c.json({'result': result})
    } catch (error:any) {
        return c.json({'error': 'can not update location'})        
    }
}

export const addLocation = async(c: Context)=>{
    try {
        const newLocation = await c.req.json()
        const result = await addLocationService(newLocation)
        return c.json({'result': result})
    } catch (error: any) {
        return c.json({'error': 'can not add location'})        
    }
}


export const deleteLocation = async(c: Context)=>{
    try {
        const id: UUID = c.req.param('id')
        const result = await deleteLocationService(id)
        return c.json({'result': result})
    } catch (error: any) {
        return c.json({'error': 'can not delete location'})        
    }
}