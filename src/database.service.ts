import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

export const DataList:{
    Restauracje?:mongoDB.Collection;
}={};

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME || '');

    const RestauracjaLista:mongoDB.Collection=db.collection(process.env.RESTAURACJE_COLLECTION_NAME || '')
    DataList.Restauracje=RestauracjaLista
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection:`);
 }