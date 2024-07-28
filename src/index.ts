import { Context, Hono } from "hono"
import { serve } from '@hono/node-server'
import { csrf } from "hono/csrf"
import { trimTrailingSlash } from "hono/trailing-slash"
import { usersRoute } from "./users/users.route"
import { locationsRoute } from "./locations/locations.route"


const app = new Hono().basePath('/api')
app.use(csrf())
app.use(trimTrailingSlash())


app.get('/',(c: Context)=>{
    return c.json({'results':'The server is running📢😏😏😏!'})
})

app.route('/',usersRoute)
app.route('/',locationsRoute)

const port = 3000 || Number(process.env.PORT)

serve({
    fetch: app.fetch,
    port
  })

console.log(`Server is running on port ${port}`)