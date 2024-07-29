import { Hono } from "hono";
import { createProfile, deleteProfile, getAllProfile, getOneProfile, updateProfile } from "./profile.controller";

export const profileRoute = new Hono()

profileRoute.get('/profiles',getAllProfile)
profileRoute.get('/profiles/:id',getOneProfile)
profileRoute.delete('/profiles',deleteProfile)
profileRoute.put('/profiles/:id',updateProfile)
profileRoute.post('/profiles',createProfile)