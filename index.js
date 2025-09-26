import express from "express"
import vacunasRoutes from "./routes/vacunas.routes.js"
import vacunasApiRoute from "./api/routes/vacunas.api.routes.js"
import DashboardRoutes from "./routes/dashboard.routes.js"
import UsuariosApiRoutes from "./api/routes/usuarios.api.routes.js"




const app = express()

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )

app.use("/", DashboardRoutes)
app.use( "/vacunas", vacunasRoutes )
app.use( "/api/vacunas", vacunasApiRoute )
app.use( "/api/usuarios", UsuariosApiRoutes )

app.use( express.static("public") )


app.listen(3333, () => {
    console.log("funcionando")
})