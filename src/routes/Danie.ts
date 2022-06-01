import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import danie from "../models/danie"

const app=express.Router();

export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const dan = (await DataList?.Danie?.find({}).toArray()) as unknown as danie[];

       res.status(200).send(dan);
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
       const dan = (await DataList?.Restauracje?.findOne(query)) as unknown as danie;

       if (dan) {
           res.status(200).send(dan);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newDan = req.body as danie;
       const result = await DataList?.Danie?.insertOne(newDan);

       result
           ? res.status(201).send(`Successfully created a new dish with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new dish.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedDan: danie = req.body as danie ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Danie?.updateOne(query, { $set: updatedDan });

       result
           ? res.status(200).send(`Successfully updated dish with id ${id}`)
           : res.status(304).send(`Dish with id: ${id} not updated`);
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
       const result = await DataList?.Danie?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed dish with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove dish with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Dish with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


