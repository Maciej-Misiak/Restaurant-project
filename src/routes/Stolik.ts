import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import stolik from "../models/stolik"

const app=express.Router();

export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const sto = (await DataList?.Stolik?.find({}).toArray()) as unknown as stolik[];

       res.status(200).send(sto);
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
       const sto = (await DataList?.Stolik?.findOne(query)) as unknown as stolik;

       if (sto) {
           res.status(200).send(sto);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newSto = req.body as stolik;
       const result = await DataList?.Stolik?.insertOne(newSto);

       result
           ? res.status(201).send(`Successfully created a new table with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new table.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedSto: stolik = req.body as stolik ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Stolik?.updateOne(query, { $set: updatedSto });

       result
           ? res.status(200).send(`Successfully updated table with id ${id}`)
           : res.status(304).send(`Table with id: ${id} not updated`);
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
       const result = await DataList?.Stolik?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed table with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove table with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Table with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


