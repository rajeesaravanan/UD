import axios from "axios"
import Seeker from "../models/seeker.js"
import Batch from "../models/batch.js"
import Center from "../models/center.js"
import College from "../models/college.js"
import Location from "../models/location.js"
import Education from "../models/education.js"
import SeekerDetail from "../models/seekerDetails.js"

export const fetchStudentsFromAPI = async () => {
  const response = await axios.get(process.env.API_URL)
  return response.data
}

const findOrCreateWithp_id = async (Model, filter, data) => {
  const normalizedFilter = {}

  for (let key in filter) {
    if (key === "name" || key === "type" || key === "p_id") {
      normalizedFilter[key] = filter[key] !== undefined ? filter[key] : null
    } else if (typeof filter[key] === "string") {
      normalizedFilter[key] = new RegExp(`^${filter[key].trim()}$`, 'i')
    } else {
      normalizedFilter[key] = filter[key] !== undefined ? filter[key] : null
    }
  }

  let doc = await Model.findOne(normalizedFilter)

  if (!doc) {
    try {
      doc = await Model.create(data)
    } catch (err) {
      if (err.code === 11000) {
        doc = await Model.findOne(normalizedFilter)
      } else {
        throw err
      }
    }
  } else {
    if ((doc.p_id?.toString() || null) !== (data.p_id?.toString() || null)) {
      doc.p_id = data.p_id || null
      await doc.save()
    }
  }

  return doc
}


const handleLocation = async (address) => {
  const countryName = address.country || "India"
  const stateName = address.state || "Unknown State"
  const districtName = address.district || address.city || "Unknown District"
  const cityName = address.city || "Unknown City"
  const areaName = address.area || "Unknown Area"
  const pincodeName = address.pin_code || "000000"

  const country = await findOrCreateWithp_id(Location,
    { name: countryName, type: "country" },
    { name: countryName, type: "country", p_id: null }
  )

  const state = await findOrCreateWithp_id(Location,
    { name: stateName, type: "state" },
    { name: stateName, type: "state", p_id: country._id }
  )

  const district = await findOrCreateWithp_id(Location,
    { name: districtName, type: "district" },
    { name: districtName, type: "district", p_id: state._id }
  )

  const city = await findOrCreateWithp_id(Location,
    { name: cityName, type: "city" },
    { name: cityName, type: "city", p_id: district._id }
  )

  const area = await findOrCreateWithp_id(Location,
    { name: areaName, type: "area" },
    { name: areaName, type: "area", p_id: city._id }
  )

  const pincode = await findOrCreateWithp_id(Location,
    { name: pincodeName, type: "pincode" },
    { name: pincodeName, type: "pincode", p_id: area._id }
  )

  return { country, state, district, city, area, pincode }
}

const handleEducation = async (student) => {
  const categoryName = student.education_category?.trim() || "Unknown Category"
  const detailsName = student.education_details?.trim() || "Unknown Details"

  const category = await findOrCreateWithp_id(
    Education,
    { name: categoryName, type: "category", p_id: null },
    { name: categoryName, type: "category", p_id: null }
  )

  const details = await findOrCreateWithp_id(
    Education,
    { name: detailsName, type: "details", p_id: category._id },
    { name: detailsName, type: "details", p_id: category._id }
  )

  return { category, details }
}



export const createSeekerDetails = async () => {
  const studentsData = await fetchStudentsFromAPI()
  let count = 0

  for (const data of studentsData) {
    const seeker = await Seeker.findOne({ admission_number: data.student.admission_number })
    if (!seeker) continue 

    const collegeDoc = await findOrCreateWithp_id(College,
      { name: data.batch.college },
      { name: data.batch.college }
    )

    const batch = await findOrCreateWithp_id(Batch,
      { name: data.batch.name },
      {
        name: data.batch.name,
        start_date: data.batch.start_date,
        end_date: data.batch.end_date,
        trainers: data.batch.trainers,
        college: collegeDoc._id
      }
    )

    const center = await findOrCreateWithp_id(Center,
      { name: data.center.name },
      { name: data.center.name, code: data.center.code }
    )

    const location = await handleLocation(data.student.address)
    const education = await handleEducation(data.student)

    const existing = await SeekerDetail.findOne({ student_id: seeker._id })
    if (!existing) {
      await SeekerDetail.create({
        student_id: seeker._id,
        batch_id: batch._id,
        center_id: center._id,
        college_id: collegeDoc._id,
        location: {
          country: location.country._id,
          state: location.state._id,
          district: location.district._id,
          city: location.city._id,
          area: location.area._id,
          pincode: location.pincode._id
        },
        education: {
          category: education.category._id,
          details: education.details._id
        }
      })
      count++
    }
  }

  return count
}
