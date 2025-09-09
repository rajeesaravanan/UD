import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ["country", "state", "district", "city", "area", "pincode"],
        required: true
    },
    p_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Location",
        default: null
    }
}, {timestamps: true})

// locationSchema.index({ name: 1, type: 1, p_id: 1 }, { unique: true })


const Location = mongoose.model("Location", locationSchema)
export default Location