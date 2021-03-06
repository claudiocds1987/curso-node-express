// ESTE ARCHIVO TIENE TODAS LAS CONFIGURACIONES A MONGODB
// npm i -S mongodb para conecectar a mongodb
const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config"); // Obtengo los datos de configuracion de la carpeta "config"

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
//const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error);
        }

        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

// class MongoLib {
//   constructor() {
//     // console.log('MONGO URI: ' + MONGO_URI);
//     this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     this.dbName = DB_NAME;
//   }

//   connect() {
//     return new Promise((resolve, reject) => {
//       this.client.connect(error => {
//         if (error) {
//           reject(error);
//         }

//         console.log("Connected succesfully to mongo");
//         resolve(this.client.db(this.dbName));
//       });
//     });
//   }

//   getAll(collection, query) {
//     return this.connect().then(db => {
//       return db
//         .collection(collection)
//         .find(query)
//         .toArray();
//     });
//   }
// }

// Exporto la clase para que otros archivos puedan utilizarla
module.exports = MongoLib;
