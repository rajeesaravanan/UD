import { fetchStudentsFromAPI, saveStudentsToDB } from "../services/studentService.js"

export const fetchAndSaveStudents = async (req, res) => {
    try {
        const studentsData = await fetchStudentsFromAPI()
        const count = await saveStudentsToDB(studentsData)
        res.json({ message: "Students saved successfully", count})
    }catch(err){
        console.error("Error: ", err)
        res.status(500).json({ error: 'Failed to fetch and save students data'})
    }
}