import { Request, Response } from "express";
import Joi from "joi";
import ClientError from "../exceptions/clientError";
import DeliveryService from "../services/deliveryService";


export default class DeliveryController { 

    static async saveDelivery(req:Request, resp: Response){
        
        const schema = Joi.object({
            pickup_time: Joi.date().required().label("pickup time"),
            start_time: Joi.date().required().label("start time"),
            location_lat: Joi.number().required().label("location lat"),
            location_lng: Joi.number().required().label("location lng"),
            status: Joi.string().required().label("status"),
            package_id: Joi.string().required().label("Package Id"),
         });
        
        const {value, error} = schema.validate(req.body);

        try{

            if(error) {
              throw new ClientError(""+error?.details[0].message);
            }
            
            const result = await DeliveryService.newDelivery(value);
            resp.status(result.status).json({message: result.message});
         
        }catch(err){
          if(err instanceof ClientError){
             resp.status(400).json(`${error?.details[0].message}`);
            }else{
             console.log(err);
            }
                       
        }
    }

    static async oneDelivery(req: Request, resp: Response){

        try{
            const delivery = await DeliveryService.getOneDelivery(req.params.id);
            resp.status(200).json(delivery);
        } catch(err){
          console.log(err)
        }

    }

    static async allDelivery(req: Request, resp: Response){
        try{
            const deliverys = await DeliveryService.getAllDelivery();
            resp.status(200).json(deliverys);

        } catch(err) {
          console.log(err)
        }
    }

    static async updateDelivery(req: Request, resp: Response){

        const schema = Joi.object({
            pickup_time: Joi.date().required().label("pickup time"),
            start_time: Joi.date().required().label("start time"),
            location_lat: Joi.number().required().label("location lat"),
            location_lng: Joi.number().required().label("location lng"),
            status: Joi.string().required().label("status")
         });

        const {value, error} = schema.validate(req.body);

        try{

            if(error) {
              throw new ClientError(`${error?.details[0].message}`);
            }

            const result = await DeliveryService.updateOneDelivery(req.params.id, value);
            resp.status(200).json({message: "updated succeslully"});
         
        }catch(err){
          if(err instanceof ClientError){
             resp.status(400).json(`${error?.details[0].message}`);
            }else{
             console.log(err);
            }
                       
        }

    }

    static deleteDelivery(req: Request, resp: Response){
        try{
         const result = DeliveryService.deleteOneDelivery(req.params.id)
         resp.status(200).json("Delete deleted succeslully")
        }catch(err){
            console.log(err)
        }
    }

    static async deliveryByIdAndPackage(req: Request, resp: Response){
        try{
            const result = await DeliveryService.getDeliveryByIdAndPackage(req.params.id)
            resp.status(200).json(result)
           }catch(err){
               console.log(err)
           }
    }


}