import mongoose from "mongoose";
import Delivery from "../models/deliveryModel";
import Package from "../models/packageModel";

export default class DeliveryService {

    static async newDelivery(value: any):Promise<any> {
       //console.log(value)
      const delivery = new Delivery({
        pickup_time: value.pickup_time,
        start_time: value.start_time,
        package_id: value.package_id,
        location: {
            lat: value.location_lat,
            lng: value.location_lng
         },
        status: value.status  });

        await delivery.save();

      return {message: "Enregistrement réussi", status: 200} ; 

    }

    static async getAllDelivery(){
        return await Delivery.find({},{ "__v": 0});
    }

    static async getOneDelivery(value: string){
        return await Delivery.findById(value);
    }

    static async deleteOneDelivery(value: string){
        return await Delivery.findByIdAndDelete(value)
    }

    static async updateOneDelivery(id: string, value: any):Promise<any>{
        return await Delivery.findByIdAndUpdate(id, value);
    }
   
    static async getDeliveryByIdAndPackage(Id: string){
        console.log("Karabou:", Id)
        return await Delivery.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(Id) } }, 
        { "$lookup" : {
            "from": "packages",
            "localField":"package_id",
            "foreignField":"_id",
            "as": "package",
            // "let": { packageId: '$package_id' },
            //  "pipeline": [
            //             { $match: { $expr: { $eq: ['$$packageId', '$id'] } } },
            //         ],
             }
          },
          
        ])
    
    }
}