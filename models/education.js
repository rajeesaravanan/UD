import mongoose from "mongoose"

const educationSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["category", "details"],
        required: true
    },
    p_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
        default: null
    }
}, {timestamps: true})

educationSchema.index({ name: 1, type: 1, p_id: 1 }, { unique: true })


const Education = mongoose.model("Education", educationSchema)
export default Education