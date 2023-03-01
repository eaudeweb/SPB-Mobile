import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const COMPANIES_URL = 'https://stagiipebune.ro/api/v1/companies/all-companies/'


const getAllPartnerCompanies = async () => {
  token = await tokenLogic.getToken()
  const getMainPartners = await axios.get(COMPANIES_URL + '?partnerships=2', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": token,
    }
  })
  const getPartners = await axios.get(COMPANIES_URL + '?partnerships=0', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": token
    }
  })
  return { mainPartners: getMainPartners.data, partners: getPartners.data }
}


const companiesService = {
  getAllPartnerCompanies,
}

export default companiesService
