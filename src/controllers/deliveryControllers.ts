import { Request, Response } from "express";
import Delivery from "../models/deliveryModel";
import Joi, { string } from "joi";

export default class DeliveryController{ 

    static saveDelivery(req:Request, resp: Response){}

    static getOneDelivery(req: Request, resp: Response): void{}

    static getAllDelivery(req: Request, resp: Response){}

    static updateDelivery(req: Request, resp: Response){}

    static deleteDelivery(req: Request, resp: Response){}
}