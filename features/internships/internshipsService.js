import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'
const getToken = async () => {
  const result = await SecureStore.getItemAsync('authToken')
  return result
}

const getAllInternships = async () => {
  const response = axios.get(ALL_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": getToken(),
    },
  })
  const result = await response
  // 
  const internshipsByDate = result.data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
  const internshipsByCompany = () => {
    const companies = [...new Set(internshipsByDate.map(internship => internship.company.name))]; // [ 'A', 'B']
    const internships = []
    companies.map(company => {
      const companyInternships = internshipsByDate.filter(internship => internship.company.name === company)
      internships.push({
        companyName: company,
        internships: companyInternships
      })
    })
    return internships
  }

  return internshipsByCompany()
}


const internshipsService = {
  getAllInternships
}

export default internshipsService