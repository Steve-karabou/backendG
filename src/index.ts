import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import deliveryRoute from "./routes/deliveryRoute"
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Gozem').then(() =>console.log("Mongoose Data base connected successfuly"))
.catch((err)=> console.error(err));

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/delivery", deliveryRoute);

app.listen(5000, ()=>console.log(`Server is listening on port`));
