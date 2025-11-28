import express from "express";
import * as controllers from "../controllers/vacunas.api.controller.js";

import { vacunasValidate } from "../../middleware/vacunasValidate.js";
import { vacunasValidatePatch } from "../../middleware/vacunasValidatePatch.js";

const route = express.Router();

// LISTADO GENERAL
route.get("/", controllers.getVacunas);

// DETALLE
route.get("/:id", controllers.getVacunasById);

// CREAR VACUNA
route.post("/", vacunasValidate, controllers.crearVacuna);

// REEMPLAZAR
route.put("/:id", vacunasValidate, controllers.reemplazarVacuna);

// EDITAR PARCIAL
route.patch("/:id", vacunasValidatePatch, controllers.editarVacunaParcial);

// ELIMINAR
route.delete("/:id", controllers.deleteVacunaLogico);

export default route;
