import express from "express"
import { fetchAndSaveSeekers } from "../controllers/seekerController.js"

const router = express.Router()

router.post("/fetch-and-save", fetchAndSaveSeekers)



export default router