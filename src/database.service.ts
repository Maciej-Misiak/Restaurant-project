import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

export const DataList:{
    Restauracje?:mongoDB.Collection;
    Pracownik?:mongoDB.Collection;
    Stolik?:mongoDB.Collection;
    Rezerwacja?:mongoDB.Collection;
    Produkt?:mongoDB.Collection;
    Danie?:mongoDB.Collection;
    Zamowienie?:mongoDB.Collection;
}={};

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME || '');

    const RestauracjaLista:mongoDB.Collection=db.collection(process.env.RESTAURACJE_COLLECTION_NAME || '')
    DataList.Restauracje=RestauracjaLista

    const PracownikLista:mongoDB.Collection=db.collection(process.env.PRACOWNIK_COLLECTION_NAME || '')
    DataList.Pracownik=PracownikLista

    const StolikLista:mongoDB.Collection=db.collection(process.env.STOLIK_COLLECTION_NAME || '')
    DataList.Stolik=StolikLista

    const RezerwacjaLista:mongoDB.Collection=db.collection(process.env.REZERWACJA_COLLECTION_NAME || '')
    DataList.Rezerwacja=RezerwacjaLista

    const ProduktLista:mongoDB.Collection=db.collection(process.env.PRODUKT_COLLECTION_NAME || '')
    DataList.Produkt=ProduktLista

    const DanieLista:mongoDB.Collection=db.collection(process.env.DANIE_COLLECTION_NAME || '')
    DataList.Danie=DanieLista

    const ZamowienieLista:mongoDB.Collection=db.collection(process.env.ZAMOWIENIE_COLLECTION_NAME || '')
    DataList.Zamowienie=ZamowienieLista
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection:`);
 }