import { Hono ,Context} from "hono";
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from "./users.control";

export const usersRoute = new Hono()


usersRoute.get('/users',getAllUsers);
usersRoute.get('/users/:id',getOneUser);
usersRoute.delete('/users/:id',deleteUser);
usersRoute.post('/users',createUser);
usersRoute.put('/users/:id',updateUser);
