import mongoose from "mongoose"

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true})

// collegeSchema.index({ name: 1 }, { unique: true })


const College = mongoose.model("College", collegeSchema)
export default College