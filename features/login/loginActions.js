import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const LOGIN_URL = 'https://staging.stagiipebune.ro/api/v1/token/general_auth/'

const login = async (loginForm) => {
  const { email, password } = loginForm
  let response
  try {
    await fetch(
      "https://staging.stagiipebune.ro/api/v1/token/general_auth",
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

// const handleAuth = async () => {
//   try {
//     const response = await fetch(
//       "https://staging.stagiipebune.ro/api/v1/token/general_auth",
//       {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: formData.email, password: formData.password })
//       }
//     ).then((response) => response.json())
//       .then((responseJson) => {
//         if (responseJson.token) {
//           saveToken(responseJson.token)
//           checkForToken()
//         }
//       });
//   } catch (error) {
//     console.error(error);
//   } finally {
//   }
// }


const loginService = {
  login
}

export default loginService
