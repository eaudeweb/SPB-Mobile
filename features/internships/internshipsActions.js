import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'
const STUDENT_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/me/jobs'
const GET_APPLICATION_URL = (companyId, jobId, applicationType) => `https://staging.stagiipebune.ro/api/v1/companies/${companyId}/jobs/${jobId}/${applicationType}`

const sortInternshipsByDate = (internships) => internships.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
const getSortedInternships = (internships) => {
  //internships are sorted from old to new, grouped by company
  const internshipsByDate = sortInternshipsByDate(internships)

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
  const response = await axios.get(ALL_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  const studentInternships = response.data.filter(internship => internship.can_apply === 'already_applied')
  return {
    internships: response.data,
    sortedInternships: getSortedInternships(response.data),
    studentInternships: getSortedInternships(studentInternships)
  }
}

const getInternshipsBySearch = async (params) => {
  //?company=5&categories=1&location=bucuresti&search=clatite
  const { company, category, location } = params
  const companyParam = company.name ? `&company=${company.id}` : ''
  const categoryParam = category.name ? `&categories=${category.id}` : ''
  const locationParam = location.name ? `&location=${location.slug}` : ''
  const searchParam = params.search ? `&search=${params.search}` : ''
  const URL = ALL_INTERNSHIPS_URL + '?' + companyParam + categoryParam + locationParam + searchParam

  console.log(URL)
  const response = await axios.get(URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return getSortedInternships(response.data)
}

const getStudentInternships = async () => {
  const response = await axios.get(STUDENT_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response
}

const applyToInternship = async (companyId, jobId) => {
  const response = await axios.post(GET_APPLICATION_URL(companyId, jobId, 'apply'), {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    }
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
  getStudentInternships,
  getInternshipsBySearch
}

export default internshipsService
