export const mapApiResponseToSeeker = (data) => {
    return {
        admission_number: data.student.admission_number,
        name: data.student.name,
        gender: data.student.gender,
        email: data.student.email,
        mobile_no: data.student.mobile_no,
        dob: data.student.dob,
        fathers_name: data.student.fathers_name,
        mothers_name: data.student.mothers_name,
        marital_status: data.student.marital_status
    }
} 