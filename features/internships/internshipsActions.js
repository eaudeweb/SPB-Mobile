import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";
import moment from "moment";
const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'
const STUDENT_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/me/jobs'
const GET_APPLICATION_URL = (companyId, jobId, applicationType) => `https://staging.stagiipebune.ro/api/v1/companies/${companyId}/jobs/${jobId}/${applicationType}`
const GET_STATUS_CHANGE_URL = (jobId, status) => `https://staging.stagiipebune.ro/api/v1/students/${jobId}/jobs/${status}/change_status`

const getSortedInternships = (internships) => {
  //internships are sorted from old to new, grouped by company
  const internshipsByDate = sortInternshipsByDate(internships)

  const getInternshipsByCompany = () => {
    // const companies = [...new Set(internshipsByDate.map(internship => internship.company.name))]; // [ 'A', 'B']
    const getCompanies = () => {
      let companiesObjects = []
      internshipsByDate.forEach(internship => {
        if (companiesObjects.find(company => company.id === internship.company.id)) {
        } else {
          companiesObjects.push(internship.company)

        }
      })
      return companiesObjects
    }
    const companies = getCompanies()
    const internships = []
    companies.map(company => {
      let companyInternships = []
      if (company.affiliated_company) {
        const affiliatedCompany = companies.find(companyListItem => companyListItem.id === company.affiliatedCompany)
        companyInternships = internshipsByDate.filter(internship => internship.company.name === company.name || internship.company.name === affiliatedCompany?.name)
      } else {
        companyInternships = internshipsByDate.filter(internship => internship.company.name === company.name)
      }
      // function above test if company has an affiliated company and add the internships from main comp and affiliated comp in the same arr
      // companyInternships = internshipsByDate.filter(internship => internship.company.name === company.name)

      internships.push({
        companyName: company.name,
        internships: companyInternships
      })
    })
    return internships
  }
  return getInternshipsByCompany()
}

const sortInternshipsByDate = (internships) => {
  const format = "DD/mm/yyyy - hh:mm:ss"
  // return moment(a.createdAt).diff(b.createdAt);

  // console.log(internships.sort((a, b) => moment(a.validated, format) - moment(b.validated, format)))
  return internships.sort((a, b) => moment(a.validated, format).diff(b.validated, format))
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
  const { company, category, location } = params
  const companyParam = company.id ? `&company=${parseInt(company.id)}` : ''
  const categoryParam = category.name ? `&categories=${category.id}` : ''
  const locationParam = location.name ? `&location=${location.slug}` : ''
  const searchParam = params.search ? `&search=${params.search}` : ''
  const URL = ALL_INTERNSHIPS_URL + '?' + companyParam + categoryParam + locationParam + searchParam
  console.log(company)
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

const refreshInternshipsBySearch = async (params) => {
  const { company, category, location } = params
  const companyParam = company.name ? `&company=${company.id}` : ''
  const categoryParam = category.name ? `&categories=${category.id}` : ''
  const locationParam = location.name ? `&location=${location.slug}` : ''
  const searchParam = params.search ? `&search=${params.search}` : ''
  const URL = ALL_INTERNSHIPS_URL + '?' + companyParam + categoryParam + locationParam + searchParam

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
  return response.data
}

const refreshStudentInternships = async () => {
  const response = await axios.get(STUDENT_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}


const applyToInternship = async (companyId, jobId) => {
  const response = await axios.post(GET_APPLICATION_URL(companyId, jobId, 'apply'), {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  console.log(response)
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

const changeInternshipApplicationStatus = async (jobId, newStatus) => {
  const response = await axios.post(GET_STATUS_CHANGE_URL(jobId, newStatus), {
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
  refreshStudentInternships,
  getInternshipsBySearch,
  refreshInternshipsBySearch,
  changeInternshipApplicationStatus
}

export default internshipsService
