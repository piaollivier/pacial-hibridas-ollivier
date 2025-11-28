import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://admin:admin@hibridas.qaozghl.mongodb.net/"
);
const db = client.db("AH20232CP1");
const collection = db.collection("vacunas");

export async function getVacunas(filtro = {}) {
  await client.connect();
  return collection.find(filtro).toArray();
}

export async function getVacunasById(id) {
  await client.connect();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function guardarVacuna(vacuna) {
  await client.connect();
  const result = await collection.insertOne(vacuna);
  return { ...vacuna, _id: result.insertedId };
}

export async function eliminarVacunaLogico(id) {
  await client.connect();
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { deleted: true } }
  );
  return id;
}

export async function editarVacuna(vacuna, id) {
  await client.connect();
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: vacuna }
  );
  return { ...vacuna, _id: id };
}

export async function editarVacunaParcial(id, campos) {
  await client.connect();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: campos },
    { returnDocument: "after" }
  );
  return result.value;
}
