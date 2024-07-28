import { Hono } from "hono";
import { addLocation, deleteLocation, getAllLocations, getOneLocation, updateLocation } from "./locations.control";

export const locationsRoute = new Hono()

locationsRoute.get('/locations',getAllLocations)
locationsRoute.get('/locations/:id',getOneLocation)
locationsRoute.put('/locations/:id',updateLocation)
locationsRoute.post('/locations',addLocation)
locationsRoute.delete('/locations/:id',deleteLocation)