import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.qaozghl.mongodb.net/")
const db = client.db("AH20232CP1")



export async function getVacunas(filter = {}) {
    const filterMongo = { eliminado: { $ne: true } }

    if (filter.nombre) {
        filterMongo.nombre = { $regex: filter.nombre, $options: 'i' }
    }

    if (filter.obligatoria !== undefined) {
        filterMongo.obligatoria = filter.obligatoria === "true"
    }

    if (filter.grupo) {
        filterMongo.grupo = { $regex: filter.grupo, $options: 'i' }
    }

    if (filter.edad_aplicacion) {
        filterMongo.edad_aplicacion = { $regex: filter.edad_aplicacion, $options: 'i' }
    }

    await client.connect()
    return db.collection("vacunas").find(filterMongo).toArray()
}


export async function getVacunasById(id) {
    await client.connect()
    return db.collection("vacunas").findOne({ _id: new ObjectId(id) })
}

export async function guardarVacuna(vacuna) {
    await client.connect()
    return db.collection("vacunas").insertOne(vacuna)
}


export function editarVacuna(vacuna, id) {
    return db.collection("vacunas").replaceOne({ _id: new ObjectId(id) }, vacuna)
}

export function eliminarVacunaLogico(id) {
    return db.collection("vacunas").updateOne({ _id: new ObjectId(id) }, {
        $set: { eliminado: true }
    })
}

export function editarVacunaParcial(id, vacuna) {
    return db.collection("vacunas").updateOne({ _id: new ObjectId(id) }, { $set: vacuna })
}



