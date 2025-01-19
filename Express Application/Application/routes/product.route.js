import express from "express";
import {addProductPage , addProductAction, viewProduct, removeData , edit, updateAction} from "../controller/product.controller.js";
const router = express.Router();

router.get("/add-product" , addProductPage);
router.post("/add-product" , addProductAction)
router.get("/view-product" , viewProduct)
router.get("/delete/:productId", removeData)
router.get("/edit/:productId" , edit);
router.post("/update/:productId" , updateAction)
export default router;