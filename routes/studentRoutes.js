import express from "express"
import { fetchAndSaveStudents } from "../controllers/studentController.js"

const router = express.Router()

router.post("/fetch-and-save", fetchAndSaveStudents)

export default router