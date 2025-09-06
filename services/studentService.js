import axios from "axios";
import Student from "../models/Student.js";

export const fetchStudentsFromAPI = async () => {
  const response = await axios.get(process.env.API_URL);
  return response.data;
};

export const saveStudentsToDB = async (studentsData) => {
  let insertedCount = 0;

  for (const data of studentsData) {
    if (!data.student || !data.student.admission_number) {
      console.warn("Skipping record because student/admission_number is missing:", data);
      continue;
    }

    await Student.updateOne(
      { "student.admission_number": data.student.admission_number }, 
      { $set: data }, 
      { upsert: true } 
    );

    insertedCount++;
  }

  return insertedCount;
};
