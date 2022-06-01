import express from "express";
import { connectToDatabase } from "./database.service";
import restauracje from "./routes/RestauracjeRoute";


const app = express();
app.use(express.json());
const PORT = 3000;

connectToDatabase().then(()=>{
    app.use("/restauracje",restauracje)
    app.listen(PORT,()=>{
        console.log("Connected")
    })
}).catch((error:Error)=>{
    console.error("DataBase connection fail",error)
    process.exit()
})