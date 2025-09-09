import mongoose from "mongoose"

const seekerDetailsSchema = new mongoose.Schema ({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seeker",
        required: true
    },
    batch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },
    center_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Centre",
        required: true
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
    location: {
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        area: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        pincode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        }
    },
    education: {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Education",
            required: true
        },
        details: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Education",
            required: true
        }
    }
}, {timestamps: true})

const SeekerDetails = mongoose.model("SeekerDetails", seekerDetailsSchema)
export default SeekerDetails