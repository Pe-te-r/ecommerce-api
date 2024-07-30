import { Context, Hono } from "hono"
import { serve } from '@hono/node-server'
import { csrf } from "hono/csrf"
import { trimTrailingSlash } from "hono/trailing-slash"
import { usersRoute } from "./users/users.route"
import { locationsRoute } from "./locations/locations.route"
import { profileRoute } from "./profile/profile.route"
import { categoryRoute } from "./category/category.route"
import { productRoute } from "./products/products.route"
import { authRoute } from "./auth/auth.route"


const app = new Hono().basePath('/api')
app.use(csrf())
app.use(trimTrailingSlash())


app.get('/',(c: Context)=>{
    return c.json({'results':'The server is running📢😏😏😏!'})
})

app.route('/',usersRoute)
app.route('/',locationsRoute)
app.route('/',profileRoute)
app.route('/',categoryRoute)
app.route('/',productRoute)
app.route('/',authRoute)

const port = 3000 || Number(process.env.PORT)

serve({
    fetch: app.fetch,
    port
  })

console.log(`Server is running on port ${port}`)