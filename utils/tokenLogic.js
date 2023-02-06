import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
const saveToken = async (value) => {

  const result = await SecureStore.setItemAsync('authToken', value)
  return result
}

const deleteToken = () => {
  SecureStore.deleteItemAsync('authToken')
}

const getToken = async () => {
  const result = await SecureStore.getItemAsync('authToken')
  const currentTime = new Date().getTime() / 1000 //unix time in seconds
  const isExpired = currentTime > jwtDecode(result).exp //compare the current time to the exp time 

  if (isExpired) {
    // awaitdeleteToken()
    return false
  } else {
    return result
  }
}

const getRefreshedToken = async () => {
  try {
    const response = await fetch(
      "https://staging.stagiipebune.ro/api/v1/token/refresh/",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: await getToken() })

      }
    ).then((response) => response.json())
    return response.token
  } catch (error) {
    console.error(error);
  } finally { }
}

const tokenLogic = {
  saveToken,
  deleteToken,
  getToken,
  getRefreshedToken
}

export default tokenLogic