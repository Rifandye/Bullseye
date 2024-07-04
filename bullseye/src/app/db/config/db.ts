import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("Bullseye_db");
export const getCollection = (collectionName: string) => {
  return database.collection(collectionName);
};
