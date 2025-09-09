import mongoose from "mongoose"

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start_date: Date,
    end_date: Date,
    month_year_of_graduatin_for_pursuing_degree: String,
    trainers: String
}, {timestamps: true})

// batchSchema.index({ name: 1 }, { unique: true })

const Batch = mongoose.model("Batch", batchSchema)
export default  Batch