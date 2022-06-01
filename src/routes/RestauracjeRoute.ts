 import express, {Request, Response} from "express";
 import { ObjectId } from "mongodb";
 import { DataList } from "../database.service";
 import restauracje from "../models/restauracje"

 const app=express.Router();

 export default app;
 app.use(express.json);

 app.get("/", async (_req: Request, res: Response) => {
    try {
       const rest = (await DataList?.Restauracje?.find({}).toArray()) as unknown as restauracje[];

        res.status(200).send(rest);
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
        const rest = (await DataList?.Restauracje?.findOne(query)) as unknown as restauracje;

        if (rest) {
            res.status(200).send(rest);
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);  
        }
    }
});

app.post("/", async (req: Request, res: Response) => {
    try {
        const newRest = req.body as restauracje;
        const result = await DataList?.Restauracje?.insertOne(newRest);

        result
            ? res.status(201).send(`Successfully created a new restaurant with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new restaurant.");
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);  
        }
    }
});

app.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedRest: restauracje = req.body as restauracje ;
        const query = { _id: new ObjectId(id) };
      
        const result = await DataList?.Restauracje?.updateOne(query, { $set: updatedRest });

        result
            ? res.status(200).send(`Successfully updated restaurant with id ${id}`)
            : res.status(304).send(`Restaurant with id: ${id} not updated`);
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
        const result = await DataList?.Restauracje?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed restaurant with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove restaurant with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Restaurant with id ${id} does not exist`);
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);  
        }
    }
});


