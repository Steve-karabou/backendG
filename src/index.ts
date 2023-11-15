import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import deliveryRoute from "./routes/deliveryRoute";
import packageRoute from "./routes/packageRoute";
const app = express();

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const iO = new Server(httpServer);


mongoose.connect('mongodb://127.0.0.1:27017/Gozem').then(() =>console.log("Mongoose Data base connected successfuly"))
.catch((err)=> console.error(err));

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/delivery", deliveryRoute);
app.use("/api/package", packageRoute);

// app.get('/socket.io/*', (req, res) => {
//   console.log("karabou")
//   // Logique de gestion ici si nécessaire
// });

//socket.io
// Configurer Socket.io
// io.on('connection', (socket: any) => {

//   //location changed and emit delivery updated 
//   socket.on('location_changed', async (data: any)=> { 
//     await deliveryService.updateOneDelivery(data.id, data.location);
//     const dataDelivery = await deliveryService.getOneDelivery(data.id)
//     io.emit('broadcast', dataDelivery);
//    });
  
//    //status changed and emit delivery updated 
//    socket.on('status_changed', async (data: any)=> { 
//     console.log("Status:", data)
//     // if(data.status === "picked-up"){
//     //   data.pickup_time = Date.now;
//     // }else if(data.status === "in-transit"){
//     //   data.start_time = Date.now;
//     // }else if(data.status === "delivered"){
//     //   data.end_time = Date.now;
//     // }else if(data.status === "failed"){
//     //   data.end_time = Date.now;
//     // }else{  }

//     // await deliveryService.updateOneDelivery(data.id, data);
//     // const dataDelivery = await deliveryService.getOneDelivery(data.id)
//     // io.emit('broadcast', dataDelivery);
//    });
     
//   socket.on('disconnect', () => { console.log("disconnect") });
// });

app.listen(3000, ()=>console.log(`Server is listening on port`));
