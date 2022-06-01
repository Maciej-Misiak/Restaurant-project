import express from "express";
import { connectToDatabase } from "./database.service";
import restauracje from "./routes/RestauracjeRoute";
import danie from "./routes/Danie";
import pracownik from "./routes/Pracownik";
import produkt from "./routes/Produkt";
import rezerwacja from "./routes/Rezerwacja";
import stolik from "./routes/stolik";
import zamowienie from "./routes/Zamowienie";

const app = express();
app.use(express.json());
const PORT = 3000;

connectToDatabase().then(()=>{
    app.use("/restauracje",restauracje)
    app.use("/danie",danie)
    app.use("/pracownik",pracownik)
    app.use("/produkt",produkt)
    app.use("/rezerwacja",rezerwacja)
    app.use("/stolik",stolik)
    app.use("/zamowienie",zamowienie)
    app.listen(PORT,()=>{
        console.log("Connected")
    })
}).catch((error:Error)=>{
    console.error("DataBase connection fail",error)
    process.exit()
})