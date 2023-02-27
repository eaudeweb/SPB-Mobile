import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const PROFILE_URL = 'https://staging.stagiipebune.ro/api/v1/me/profile/'
const NOTIFICATION_URL = 'https://staging.stagiipebune.ro/api/v1/me/account/notifications'

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

const updateMobileNotifications = async (option) => {
  const data = JSON.stringify({
    "mobile_notifications": option
  });
  let response
  await fetch(
    NOTIFICATION_URL,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-CSRFToken": await tokenLogic.getToken(),
      },
      body: data
    }
  ).then(response => response.json())
    .then((responseJson) => {
      response = responseJson
    });
}

const profileService = {
  getProfileData,
  updateMobileNotifications
}

export default profileService
