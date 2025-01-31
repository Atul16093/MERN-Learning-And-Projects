import express from "express";
import { header , create , createAction , viewTask , filterTask , removeTask , displayUpdate, update} from "../controller/task.control.js";
const router  = express.Router();

router.get("/header" , header );
router.get("/create" , create);
router.post("/create" , createAction);
router.get("/view-task" , viewTask);
router.get("/load-task/:id" , filterTask);
router.get("/delete/:id" , removeTask)
router.get("/update/:id" , displayUpdate)
router.post("/update/:id" , update)
export default router;