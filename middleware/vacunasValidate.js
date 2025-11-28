// import { vacunaSchema } from "../schemas/vacuna.js";

// export const vacunasValidate = (req, res, next) => {
//     console.log("Validating vacuna data...");
//     vacunaSchema
//     .validate(req.body, { 
//         abortEarly: false,
//         stripUnknown: true
//     })
//         .then(() => next())
//         .catch((err) => res.status(400).json({ message: err.errors }));
// };
import { vacunaSchema } from "../schemas/vacuna.js";

export const vacunasValidate = (req, res, next) => {
  console.log("Validating vacuna data...");
  console.log("BODY RECIBIDO:", req.body); // 👈 Esto lo necesitamos

  vacunaSchema
    .validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })
    .then(() => next())
    .catch((err) => {
      console.log("❌ ERROR DE VALIDACIÓN:", err.errors); // 👈 Esto muestra por qué falla
      return res.status(400).json({ message: err.errors });
    });
};