import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import http from 'http';
import {Server } from "socket.io"
import deliveryRoute from "./routes/deliveryRoute";
import packageRoute from "./routes/packageRoute";
import deliveryService from "./services/deliveryService";
const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {cors: {origin: "*"}});


mongoose.connect('mongodb://127.0.0.1:27017/Gozem').then(() =>console.log("Mongoose Data base connected successfuly"))
.catch((err)=> console.error(err));

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/delivery", deliveryRoute);
app.use("/api/package", packageRoute);




// Configurer Socket.io
io.on('connection', (socket: any) => {
  
  //location changed and emit delivery updated 
  socket.on('location_changed', async (dataSocket: any)=> { 
    console.log("dataSocket:", dataSocket)
    let data: any = new Object();
     data.location = {lat: dataSocket.lat, lng: dataSocket.lng}
    try{
      await deliveryService.updateOneDelivery(dataSocket.id, data);
    }catch(err){
      console.log("Error:", err)
    }
    
    // const dataDelivery = await deliveryService.getOneDelivery(data.id)
    // io.emit('broadcast', dataDelivery);
   });
  
   //status changed delivery updated 
   socket.on('status_changed', async (dataSocket: any)=> {
    let data: any = new Object();
     console.log("DataSocket:", dataSocket)
     if(dataSocket.status === "picked-up"){
         data.pickup_time = Date.now();
      }else if(dataSocket.status === "in-transit"){
         data.start_time = Date.now();
      }else if(dataSocket.status === "delivered"){
         data.end_time = Date.now();
      }else if(dataSocket.status === "failed"){
         data.end_time = Date.now();
      }else{  }
      console.log("Data:", data)
      try{
        const updateSatatus = await deliveryService.updateOneDelivery(dataSocket.id, data);
      }catch(err){
        console.log("Error:", err)
      }
     
    // const dataDelivery = await deliveryService.getOneDelivery(data.id)
    // io.emit('broadcast', dataDelivery);
   });
     
  socket.on('disconnect', () => { console.log("disconnect") });
});

httpServer.listen(3000, ()=>console.log(`Server is listening on port 3000`));