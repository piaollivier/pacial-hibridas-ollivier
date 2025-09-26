import express from "express"
import * as controllers from "../controllers/vacunas.api.controller.js"

const route = express.Router()

route.get("/", controllers.getVacunas)
route.get("/:id", controllers.getVacunasById)
route.post("/:usuarioId", controllers.crearVacuna)
route.delete("/:id", controllers.deleteVacunaLogico)
route.put("/:id", controllers.reemplazarVacuna)
route.patch("/:id", controllers.editarVacunaParcial)

export default route