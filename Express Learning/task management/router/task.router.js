import express from "express";
import { header , create , createAction , viewTask , filterTask , removeTask , displayUpdate, update , assign , completedTask, pendingTask} from "../controller/task.control.js";
import { verify } from "../middleware/auth.js";
const router  = express.Router();

router.get("/header" ,verify, header );
router.get("/create" ,verify, create);
router.post("/create" ,verify, createAction);
router.get("/view-task" ,verify, viewTask);
router.get("/load-task/:id" ,verify, filterTask);
router.get("/delete/:id" ,verify, removeTask)
router.get("/update/:id" ,verify, displayUpdate)
router.post("/update/:id" ,verify, update)
router.post("/assign" ,verify, assign);
router.get("/completed" ,verify, completedTask)
router.get("/pending" , pendingTask);
export default router;