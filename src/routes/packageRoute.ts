import {Router} from "express";
import packageController from "../controllers/packageControllers";
const router = Router();

//Package
router.post("/", packageController.savePackage);

router.get("/search/:id", packageController. packageByIdAndDelivery);

router.get("/:id", packageController.onePackage);

router.get("/", packageController.allPackage);

router.put("/:id", packageController.updatePackage);

router.delete("/:id", packageController.deletePackage);



export default router;