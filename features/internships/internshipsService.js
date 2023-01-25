import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";
import * as SecureStore from 'expo-secure-store';

const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'

const getToken = async () => {
  const result = await SecureStore.getItemAsync('authToken')
  return result
}
const getRefreshedToken = async () => {
  try {
    const response = await fetch(
      "https://staging.stagiipebune.ro/api/v1/token/refresh/",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: await getToken() })
      }
    ).then((response) => response.json())
    return response.token
  } catch (error) {
    console.error(error);
  } finally { }
}

const getAllInternships = async () => {
  const response = axios.get(ALL_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getRefreshedToken(),
    },
  })

  const result = await response
  console.log(result)
  const internshipsByDate = result.data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
  const getInternshipsByCompany = () => {
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
  return getInternshipsByCompany()
}


const internshipsService = {
  getAllInternships
}

export default internshipsService