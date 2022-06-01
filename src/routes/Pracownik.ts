import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import pracownik from "../models/pracownik"

const app=express.Router();

export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const prac = (await DataList?.Pracownik?.find({}).toArray()) as unknown as pracownik[];

       res.status(200).send(prac);
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
       const prac = (await DataList?.Pracownik?.findOne(query)) as unknown as pracownik;

       if (prac) {
           res.status(200).send(prac);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newPrac = req.body as pracownik;
       const result = await DataList?.Pracownik?.insertOne(newPrac);

       result
           ? res.status(201).send(`Successfully created a new employee with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new employee.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedPrac: pracownik = req.body as pracownik ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Pracownik?.updateOne(query, { $set: updatedPrac });

       result
           ? res.status(200).send(`Successfully updated employee with id ${id}`)
           : res.status(304).send(`Employee with id: ${id} not updated`);
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
       const result = await DataList?.Pracownik?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed employee with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove employee with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Employee with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


