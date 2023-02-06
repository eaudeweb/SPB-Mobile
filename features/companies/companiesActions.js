import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const COMPANIES_URL = 'https://staging.stagiipebune.ro/api/v1/companies/all-companies/'


const getAllPartnerCompanies = async () => {
  token = await tokenLogic.getToken()
  const mainPartners = await axios.get(COMPANIES_URL + '?partnerships=2', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": token,
    }
  })
  const partners = await axios.get(COMPANIES_URL + '?partnerships=1', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": token
    }
  })
  // const companies = [[...mainPartners.data]]
  // console.log('token')
  const companies = [...mainPartners.data, ...partners.data]
  return companies
}


const companiesService = {
  getAllPartnerCompanies,
}

export default companiesService
