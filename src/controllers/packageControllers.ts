import Joi from "joi";
import { Request, Response } from "express";
import ClientError from "../exceptions/clientError";
import PackageService from "../services/packageService";

export default class PackageController {

    static async savePackage(req:Request, resp: Response){
        const schema = Joi.object({
            description: Joi.string().required().label("description"),
            weight : Joi.number().required().label("weight"),
            width : Joi.number().required().label("width"),
            height: Joi.number().required().label("height"),
            depth: Joi.number().required().label("depth"),
            from_name : Joi.string().required().label("from name "),
            from_address : Joi.string().required().label("from address "),
            from_location_lat: Joi.number().required().label(" from location lat"),
            from_location_lng: Joi.number().required().label(" from location lng"),
            to_name : Joi.string().required().label("name"),
            to_address: Joi.string().required().label("address"),
            to_location_lat: Joi.number().required().label(" to location lat"),
            to_location_lng: Joi.number().required().label(" to location lng"),
         });
        
        const {value, error} = schema.validate(req.body);

        try{

            if(error) {
              throw new ClientError(""+error?.details[0].message);
            }
            
            const result = await PackageService.newPackage(value);
            resp.status(result.status).json({message: result.message});
         
        }catch(err){
          if(err instanceof ClientError){
             resp.status(400).json(`${error?.details[0].message}`);
            }else{
             console.log(err);
            }
                       
        }
    }

    static async updatePackage(req: Request, resp: Response){

        const schema = Joi.object({
            description: Joi.string().required().label("description"),
            weight : Joi.number().required().label("weight"),
            width : Joi.number().required().label("width"),
            height: Joi.number().required().label("height"),
            depth: Joi.number().required().label("depth"),
            from_name : Joi.string().required().label("from name "),
            from_address : Joi.string().required().label("from address "),
            from_location_lat: Joi.number().required().label(" from location lat"),
            from_location_lng: Joi.number().required().label(" from location lng"),
            to_name : Joi.string().required().label("name"),
            to_address: Joi.string().required().label("address"),
            to_location_lat: Joi.number().required().label(" to location lat"),
            to_location_lng: Joi.number().required().label(" to location lng"),
         });

        const {value, error} = schema.validate(req.body);

        try{

            if(error) {
              throw new ClientError(`${error?.details[0].message}`);
            }

            const result = await PackageService.updateOnePackage(req.params.id, value);
            resp.status(200).json({message: "updated succeslully"});
         
        }catch(err){
          if(err instanceof ClientError){
             resp.status(400).json(`${error?.details[0].message}`);
            }else{
             console.log(err);
            }
                       
        }

    }

    static async onePackage(req: Request, resp: Response){

        try{
            const package1 = await PackageService.getOnePackage(req.params.id);
            resp.status(200).json(package1);
        } catch(err){
          console.log(err)
        }

    }
    
    static async allPackage(req: Request, resp: Response){
        try{
            const deliverys = await PackageService.getAllPackage();
            resp.status(200).json(deliverys);

        } catch(err) {
          console.log(err)
        }
    }

    static deletePackage(req: Request, resp: Response){
        try{
         const result = PackageService.deleteOnePackage(req.params.id)
         resp.status(200).json("Delete succeslully")
        }catch(err){
            console.log(err)
        }
    }
}