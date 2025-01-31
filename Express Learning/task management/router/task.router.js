import express from "express";
import { header , create , createAction , viewTask , filterTask} from "../controller/task.control.js";
const router  = express.Router();

router.get("/header" , header );
router.get("/create" , create);
router.post("/create" , createAction);
router.get("/view-task" , viewTask);
router.get("/load-task/:id" , filterTask);
export default router;