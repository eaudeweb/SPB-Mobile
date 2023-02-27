import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const LOGIN_URL = 'https://staging.stagiipebune.ro/api/v1/token/general_auth'
const NOTIFICATION_TOKEN_URL = "https://staging.stagiipebune.ro/api/v1/me/profile/mobile-tokens/"

const login = async (loginForm) => {
  const { email, password } = loginForm
  let response
  try {
    await fetch(
      LOGIN_URL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      }
    ).then(response => response.json())
      .then((responseJson) => {
        response = responseJson
      });
  } catch (error) {
    console.error(error);
  }
  return response
}

const addNotificationToken = async (tokenData) => {
  let response
  try {
    await fetch(
      NOTIFICATION_TOKEN_URL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "X-CSRFToken": await tokenLogic.getToken(),
        },
        body: JSON.stringify(await tokenData)
      }
    ).then(response => response.json())
      .then((responseJson) => {
        response = responseJson
      });
  } catch (error) {
    console.error(error);
  }
  return response
}

const deleteNotificationToken = async (id) => {
  const response = await axios.delete(`${NOTIFICATION_TOKEN_URL}${id}/`, {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    },
  })
  return response.data
}
const deleteAllNotificationTokens = async (id) => {
  const response = await axios.delete(NOTIFICATION_TOKEN_URL, {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  return response.data
}

const loginService = {
  login,
  addNotificationToken,
  deleteNotificationToken,
  deleteAllNotificationTokens
}

export default loginService
