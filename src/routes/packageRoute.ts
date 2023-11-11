import {Router} from "express";
import packageController from "../controllers/packageControllers";
const router = Router();

//Delivery
router.post("/", packageController.savePackage);

router.get("/:id", packageController.onePackage);

router.get("/", packageController.allPackage);

router.put("/:id", packageController.updatePackage);

router.delete("/:id", packageController.deletePackage);



export default router;