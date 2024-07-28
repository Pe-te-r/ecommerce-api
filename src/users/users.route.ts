import { Hono ,Context} from "hono";
import db from "../drizzle/db";
import { locationsTable, usersTable } from "../drizzle/schema";

export const usersRoute = new Hono()


usersRoute.get('/users', async (c: Context) => {
    const newLocation= {
        name:'ngomongo',
        plot:'next to paddy view'
    }
    const result =await db.query.locationsTable.findMany({limit:1})
    // if(result.length > 0) {

    //     const user={
    //         first_name:'John',
    //         last_name:'Doe',
    //         userName:'johndoe',
    //         phone:'08123456789',
    //         email:'johndoe@example.com',
    //         verified:false,
    //         location_id:result[0].id
    //     }
    //     const s =await db.insert(usersTable).values(user)
    // }
    const users = await db.query.usersTable.findMany({with:{
        password:{columns:{password:true}}
    }})
    console.log('here 1')
    console.log(users)
    console.log('here 2')
    return c.json({'results': users});
});
