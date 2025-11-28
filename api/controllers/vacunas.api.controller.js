// import * as service from "../../services/vacunas.services.js";

// export function getVacunas(req, res) {
//   const query = { ...req.query };

//   if (query.obligatoria !== undefined) {
//     query.obligatoria = query.obligatoria === "true";
//   }

//   service
//     .getVacunas(query)
//     .then((vacunas) => res.status(200).json(vacunas))
//     .catch(() => res.status(500).json({ error: "Error interno" }));
// }

// export function getVacunasById(req, res) {
//   const id = req.params.id;
//   service
//     .getVacunasById(id)
//     .then((vacuna) => {
//       if (vacuna) {
//         res.status(200).json(vacuna);
//       } else {
//         res.status(404).json({ error: "Vacuna no encontrada" });
//       }
//     })
//     .catch(() => res.status(500).json({ error: "Error interno" }));
// }

// export function crearVacuna(req, res) {
//   const vacuna = {
//     nombre: req.body.nombre,
//     previene: req.body.previene,
//     edad_aplicacion: req.body.edad_aplicacion,
//     dosis: req.body.dosis,
//     grupo: req.body.grupo,
//     obligatoria: req.body.obligatoria,
//     emailUsuario: req.body.emailUsuario,
//     fecha_colocacion: req.body.fecha_colocacion,  // 👈 AGREGAR ESTO
//   };

//   service
//     .guardarVacuna(vacuna)
//     .then((vacunaGuardada) => res.status(201).json(vacunaGuardada))
//     .catch(() => res.status(500).json({ error: "Error interno" }));
// }

// export function deleteVacunaLogico(req, res) {
//   const id = req.params.id;
//   service
//     .eliminarVacunaLogico(id)
//     .then(() =>
//       res.status(202).json({ message: `Vacuna con id ${id} eliminada` })
//     )
//     .catch(() => res.status(500).json({ error: "Error interno" }));
// }
// export function reemplazarVacuna(req, res) {
//   const id = req.params.id;
//   const userId = req.query.userId;

//   if (!userId) {
//     return res.status(400).json({ error: "Falta userId en la petición" });
//   }

//   const vacuna = {
//     nombre: req.body.nombre,
//     previene: req.body.previene,
//     edad_aplicacion: req.body.edad_aplicacion,
//     dosis: req.body.dosis,
//     grupo: req.body.grupo,
//     obligatoria: req.body.obligatoria,
//   };

//   service
//     .editarVacunaPorUsuario(id, userId, vacuna)
//     .then((vacunaEditada) => {
//       if (!vacunaEditada) {
//         return res.status(404).json({
//           error: "Vacuna no encontrada o no pertenece al usuario",
//         });
//       }
//       res.status(202).json(vacunaEditada);
//     })
//     .catch(() =>
//       res.status(500).json({ error: "No se pudo editar la vacuna" })
//     );
// }

// export function editarVacunaParcial(req, res) {
//   const id = req.params.id;
//   service
//     .editarVacunaParcial(id, req.body)
//     .then((vacunaEditada) => {
//       if (vacunaEditada) {
//         res.status(200).json(vacunaEditada);
//       } else {
//         res.status(404).json({ error: "Vacuna no encontrada" });
//       }
//     })
//     .catch(() => res.status(500).json({ error: "Error interno" }));
// }




import * as service from "../../services/vacunas.services.js";

export async function getVacunas(req, res) {
  try {
    const query = { ...req.query };
    const vacunas = await service.getVacunas(query);
    res.json(vacunas);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function getVacunasById(req, res) {
  try {
    const id = req.params.id;
    const userId = req.query.userId;

    const vacuna = await service.getVacunasById(id, userId);
    if (!vacuna) return res.status(404).json({ error: "No encontrada" });

    res.json(vacuna);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function crearVacuna(req, res) {
  try {
    const vacuna = {
      ...req.body,
      userId: req.body.userId,
      fecha_colocacion: req.body.fecha_colocacion || null,
    };

    const nueva = await service.guardarVacuna(vacuna);
    res.status(201).json(nueva);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function reemplazarVacuna(req, res) {
  try {
    const id = req.params.id;
    const userId = req.query.userId;
    const vacuna = {
      nombre: req.body.nombre,
      previene: req.body.previene,
      edad_aplicacion: req.body.edad_aplicacion,
      dosis: req.body.dosis,
      grupo: req.body.grupo,
      obligatoria: req.body.obligatoria,
      userId
    };

    const editada = await service.editarVacuna(vacuna, id, userId);
    res.json(editada);
  } catch {
    res.status(500).json({ error: "No se pudo editar" });
  }
}

export async function editarVacunaParcial(req, res) {
  try {
    const id = req.params.id;
    const userId = req.query.userId;

    const editada = await service.editarVacunaParcial(id, userId, req.body);
    res.json(editada);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function deleteVacunaLogico(req, res) {
  try {
    const id = req.params.id;
    const userId = req.query.userId;

    await service.eliminarVacunaLogico(id, userId);
    res.json({ message: "Eliminada" });
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}