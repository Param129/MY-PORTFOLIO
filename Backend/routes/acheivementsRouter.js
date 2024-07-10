import express from "express";
import {
  addNewAcheivement,
  deleteAcheivement,
  getAllAcheivements,
  updateAcheivement,
} from "../controller/AcheivementController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewAcheivement);
router.delete("/delete/:id", isAuthenticated, deleteAcheivement);
router.put("/update/:id", isAuthenticated, updateAcheivement);
router.get("/getall", getAllAcheivements);

export default router;