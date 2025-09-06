import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    center_name: String,
    course_name: String,
    center: {
        name: String,
        code: String
    },
    batch: {
        name: String,
        start_date: Date,
        end_date: Date,
        college: String,
        month_year_of_graduation_for_pursuing_degree: String,
        trainers: String
    },
    student: {
        admission_number: {
            type: String,
            unique: true
        },
        name: String,
        gender: String,
        full_address: String,
        email: String,
        mobile_no: String,
        marital_status: String,
        dob: Date,
        guardian_name: String,
        fathers_name: String,
        mothers_name: String,
        profile_id: Number,
        education_category: String,
        education_details: String,
        address: {
            id: Number,
            gid: Number,
            address_line_1: String,
            area: String,
            city: String,
            district: String,
            state: String,
            country: String,
            pin_code: String,
            addressable_id: Number,
            addressable_type: String,
            location_id: String,
            created_at: Date,
            updated_at: Date,
            post_office: String,
            location_master_id: String,
            sub_district: String,
            constituency: String
        }
    }
})


export default mongoose.model("Student", studentSchema)