import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const LOCATIONS_URL = 'https://staging.stagiipebune.ro/api/v1/public/locations/'
const CATEGORIES_URL = 'https://staging.stagiipebune.ro/api/v1/public/categories/'

const getLocations = async () => {
  const response = await axios.get(LOCATIONS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}
const getCategories = async () => {
  const response = await axios.get(CATEGORIES_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}

const filterService = {
  getLocations,
  getCategories
}

export default filterService
