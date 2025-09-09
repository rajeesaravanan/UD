import mongoose from "mongoose"

const centerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: String
}, {timestamps: true})

const Center = mongoose.model("Center", centerSchema)
export default Center