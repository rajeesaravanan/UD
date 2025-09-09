import express from "express"
import { createSeekerDetailsAPI } from "../controllers/seekerDetailsController.js"

const router = express.Router()

router.post("/create", createSeekerDetailsAPI)

export default router
