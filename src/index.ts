import express from "express"
import { connectToDatabase } from "./database.service"

const app = express();
app.use(express.json());
const PORT = 3000;

connectToDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connected")
    })
}).catch((error:Error)=>{
    console.error("DataBase connection fail",error)
    process.exit()
})