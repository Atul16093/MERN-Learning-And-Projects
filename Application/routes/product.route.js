import express from "express";
import {addProductPage , addProductAction, viewProduct, removeData , edit, updateAction} from "../controller/product.controller.js";
import { verify } from "../middleware/auth.js";
const router = express.Router();

router.get("/add-product" ,verify, addProductPage);
router.post("/add-product" ,verify, addProductAction)
router.get("/view-product" ,verify, viewProduct)
router.get("/delete/:productId",verify, removeData)
router.get("/edit/:productId" ,verify, edit);
router.post("/update/:productId" ,verify, updateAction)
export default router;