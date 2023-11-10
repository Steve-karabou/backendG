import {Router} from "express";
import deliveryController from "../controllers/deliveryControllers";
const router = Router();

//Delivery
router.post("/", deliveryController.saveDelivery);

router.get("/:id", deliveryController.getOneDelivery);

router.get("/", deliveryController.getAllDelivery);

router.put("/:id", deliveryController.updateDelivery);

router.delete("/:id", deliveryController.deleteDelivery);



export default router;