import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { DataList } from "../database.service";
import zamowienie from "../models/Zamowienie"

const app=express.Router();
export default app;
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
   try {
      const zam = (await DataList?.Zamowienie?.find({}).toArray()) as unknown as zamowienie[];
       res.status(200).send(zam);
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
       const zam = (await DataList?.Zamowienie?.findOne(query)) as unknown as zamowienie;

       if (zam) {
           res.status(200).send(zam);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.post("/", async (req: Request, res: Response) => {
   try {
       const newZam = req.body as zamowienie;
       const result = await DataList?.Zamowienie?.insertOne(newZam);

       result
           ? res.status(201).send(`Successfully created a new order with id ${result.insertedId}`)
           : res.status(500).send("Failed to create a new order.");
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});

app.put("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const updatedZam: zamowienie = req.body as zamowienie ;
       const query = { _id: new ObjectId(id) };
     
       const result = await DataList?.Zamowienie?.updateOne(query, { $set: updatedZam });

       result
           ? res.status(200).send(`Successfully updated order with id ${id}`)
           : res.status(304).send(`Order with id: ${id} not updated`);
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
       const result = await DataList?.Zamowienie?.deleteOne(query);

       if (result && result.deletedCount) {
           res.status(202).send(`Successfully removed order with id ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove order with id ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Order with id ${id} does not exist`);
       }
   } catch (err: unknown) {
       if (err instanceof Error) {
           res.status(500).send(err.message);  
       }
   }
});


