import * as service from "../../services/vacunas.services.js"

// export function getVacunas(req, res) {
//     service.getVacunas(req.query)
//         .then(vacunas => res.status(200).json(vacunas))
//         .catch(error => res.status(500).json({ error: "Error interno" })
//         )
// }

export function getVacunas(req, res) {
    const query = { ...req.query }

    if (query.obligatoria !== undefined) {
        query.obligatoria = (query.obligatoria === "true")
    }

    service.getVacunas(query)
        .then(vacunas => res.status(200).json(vacunas))
        .catch(() => res.status(500).json({ error: "Error interno" }))
}


export function getVacunasById(req, res) {
    const id = req.params.id
    service.getVacunasById(id)
        .then(vacuna => {
            if (vacuna) {
                res.status(200).json(vacuna)
            } else {
                res.status(404).json({ error: "Vacuna no encontrada" })
            }
        })
        .catch(error => res.status(500).json({ error: "Error interno" }))   
}


export function crearVacuna(req, res) {
    const vacuna = {
        nombre: req.body.nombre,
        previene: req.body.previene,
        edad_aplicacion: req.body.edad_aplicacion,
        dosis: req.body.dosis,
        grupo: req.body.grupo,
        obligatoria: req.body.obligatoria, 
        usuarioId: req.params.usuarioId
    }
    service.guardarVacuna(vacuna)
        .then(vacunaGuardada => res.status(201).json(vacunaGuardada))
        .catch(error => res.status(500).json({ error: "Error interno" }))
}


export function deleteVacunaLogico(req, res) {
    const id = req.params.id
    service.eliminarVacunaLogico(id)
        .then((id) => res.status(202).json({ message: `Vacuna con id ${id} eliminada` }))
        .catch(error => res.status(500).json({ error: "Error interno" }))
}


export function reemplazarVacuna(req, res) {
    const id = req.params.id
    const vacuna = {
        nombre: req.body.nombre,
        previene: req.body.previene,
        edad_aplicacion: req.body.edad_aplicacion,  
        dosis: req.body.dosis,
        grupo: req.body.grupo,
        obligatoria: req.body.obligatoria
    }
    service.editarVacuna(vacuna, id)
        .then(vacunaEditada => res.status(202).json(vacunaEditada))
        .catch(error => res.status(500).json({ error: "No se pudo editar la vacuna" }))
}


export function editarVacunaParcial(req, res) {
    const id = req.params.id
    service.editarVacunaParcial(id, req.body)
        .then(vacunaEditada => {
            if (vacunaEditada) {
                res.status(200).json(vacunaEditada)
            } else {
                res.status(404).json({ error: "Vacuna no encontrada" })
            }
        })
        .catch(error => res.status(500).json({ error: "Error interno" }))
}