import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import produkt from "../models/produkt"

const app=express.Router();

export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const prod = (await DataList?.Pracownik?.find({}).toArray()) as unknown as produkt[];

       res.status(200).send(prod);
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.get("/:id", async (req: Request, res: Response) => {
   //zadanie wyciagniecia id 
   const id = req?.params?.id;

   try {
       const query = { _id: new ObjectId(id) };
       const produ = (await DataList?.Produkt?.findOne(query)) as unknown as produkt;

       if (produ) {
           res.status(200).send(produ);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newProdu = req.body as produkt;
       const result = await DataList?.Pracownik?.insertOne(newProdu);

       result
           ? res.status(201).send(`Successfully created a new product with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new product.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedProdu: produkt = req.body as produkt ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Produkt?.updateOne(query, { $set: updatedProdu });

       result
           ? res.status(200).send(`Successfully updated product with id ${id}`)
           : res.status(304).send(`Product with id: ${id} not updated`);
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.delete("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const query = { _id: new ObjectId(id) };
       const result = await DataList?.Produkt?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed product with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove product with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Product with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


