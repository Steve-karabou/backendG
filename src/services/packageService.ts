import mongoose from "mongoose";
import Package from "../models/packageModel";

export default class PackageService {

    static async newPackage(value: any):Promise<any> {
       //console.log(value)
      const package1 = new Package({
        description: value.description,
        weight: value.weight,
        width: value.width,
        height: value.height,
        depth: value.depth,
        from_name: value.from_name,
        from_address: value.from_address,
        from_location  : {
            lat: value.from_location_lat,
            lng: value.from_location_lng
         },
        to_name: value.to_name,
        to_address: value.to_address,
        to_location: {
            lat: value.to_location_lat,
            lng: value.to_location_lng
         },
          });

        await package1.save();

      return {message: "Enregistrement réussi", status: 200} ; 

    }

    static async getAllPackage(){
        return await Package.find({},{ "__v": 0});
    }

    static async getOnePackage(value: string){
        return await Package.findById(value);
    }

    static async deleteOnePackage(value: string){
        return await Package.findByIdAndDelete(value)
    }

    static async updateOnePackage(id: string, value: any):Promise<any>{
        return await Package.findByIdAndUpdate(id, value);
    }

    static async getPackageByIdAndDelivery(Id: string){
        console.log("Karabou:", Id)
        return await Package.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(Id) } }, 
        { "$lookup" : {
            "from": "deliveries",
            "localField":"active_delivery_id",
            "foreignField":"_id",
            "as": "delivery",
            // "let": { packageId: '$package_id' },
            //  "pipeline": [
            //             { $match: { $expr: { $eq: ['$$packageId', '$id'] } } },
            //         ],
             }
          },
          
        ])
    
    }
}