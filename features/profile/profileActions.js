import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const PROFILE_URL = 'https://staging.stagiipebune.ro/api/v1/me/profile/'

const getProfileData = async () => {
  const response = await axios.get(PROFILE_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}

const profileService = {
  getProfileData
}

export default profileService
