import mongoose from "mongoose"

const seekerSchema = new mongoose.Schema({
    admission_number: {
        type: String,
        unique: true,
        required: true
    },
    name: String, 
    gender: String,
    email: String,
    mobile_no: String,
    dob:Date,
    fathers_name: String,
    mothers_name: String,
    marital_status: String,

}, {timestampls: true})

const Seeker = mongoose.model("Seeker", seekerSchema)
export default Seeker



