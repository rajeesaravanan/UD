import Seeker from "../models/seeker.js"
import { mapApiResponseToSeeker }  from "../utils/mapper.js"

export const createSeeker = async (studentsData)=>{
    let insertedCount = 0

    for (const data of studentsData){
        const seeker = mapApiResponseToSeeker(data)

        await Seeker.updateOne(
            { admission_number: seeker.admission_number },
            { $set: seeker },
            { upsert: true }
        )
        insertedCount++
    }

    return insertedCount
}



