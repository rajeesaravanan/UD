import dotenv from "dotenv"

import express from "express"
import connectDB from  "./config/db.js"
import studentRoutes from "./routes/studentRoutes.js"
import seekerRoutes from "./routes/seekerRoutes.js"
import seekerDetailRoutes from "./routes/seekerDetailsRoutes.js"

dotenv.config()

const app = express()

connectDB()

app.use(express.json())

app.use("/api/students", studentRoutes)
app.use("/api/seekers", seekerRoutes)
app.use("/api/seeker-details", seekerDetailRoutes)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))