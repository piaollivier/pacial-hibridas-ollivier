import * as service from "../../services/userApp.services.js";

export function createUserApp(req, res) {
  service.createUserApp(req.body)
    .then((userApp) => res.status(201).json(userApp))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export function login(req, res) {
  console.log("BODY LOGIN >>>", req.body);
  service.login(req.body)
    .then((userApp) => res.status(200).json(userApp))
    .catch((err) => res.status(400).json({ error: err.message }));
}
