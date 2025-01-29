import express from "express";
import { header , create , createAction , display} from "../controller/task.control.js";
const router  = express.Router();

router.get("/header" , header );
router.get("/create" , create);
router.post("/create" , createAction);
router.get("/display" , display);
export default router;