import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'
const STUDENT_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/me/jobs'
const GET_APPLICATION_URL = (companyId, jobId, applicationType) => `https://staging.stagiipebune.ro/api/v1/companies/${companyId}/jobs/${jobId}/${applicationType}`

const getSortedInternships = (internships) => {
  //internships are sorted from old to new, grouped by company
  const internshipsByDate = internships.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
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

const getAllInternships = async () => {
  console.log(await tokenLogic.getToken(),)

  const response = await axios.get(ALL_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  const studentInternships = response.data.filter(internship => internship.can_apply === 'already_applied')
  return {
    allInternships: getSortedInternships(response.data),
    studentInternships: getSortedInternships(studentInternships)
  }
}

const getStudentInternships = async () => {
  const response = await axios.get(STUDENT_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  console.log('response')
  return response
}

const applyToInternship = async (companyId, jobId) => {
  const response = await axios.post(GET_APPLICATION_URL(companyId, jobId, 'apply'), {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}

const withdrawFromInternship = async (companyId, jobId) => {
  const response = await axios.post(GET_APPLICATION_URL(companyId, jobId, 'unapply'), {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}

const internshipsService = {
  getAllInternships,
  applyToInternship,
  withdrawFromInternship,
  getStudentInternships
}

export default internshipsService
