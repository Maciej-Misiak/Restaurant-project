import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import rezerwacja from "../models/rezerwacja"

const app=express.Router();

export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const reze = (await DataList?.Rezerwacja?.find({}).toArray()) as unknown as rezerwacja[];

       res.status(200).send(reze);
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
       const reze = (await DataList?.Rezerwacja?.findOne(query)) as unknown as rezerwacja;

       if (reze) {
           res.status(200).send(reze);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newReze = req.body as rezerwacja;
       const result = await DataList?.Pracownik?.insertOne(newReze);

       result
           ? res.status(201).send(`Successfully created a new reservation with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new reservation.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedReze: rezerwacja = req.body as rezerwacja ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Pracownik?.updateOne(query, { $set: updatedReze });

       result
           ? res.status(200).send(`Successfully updated reservation with id ${id}`)
           : res.status(304).send(`Reservation with id: ${id} not updated`);
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
       const result = await DataList?.Rezerwacja?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed reservation with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove reservation with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Reservation with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


