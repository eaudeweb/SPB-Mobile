import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const ALL_INTERNSHIPS_URL = 'https://staging.stagiipebune.ro/api/v1/students/jobs/'
const getToken = async () => {
  const result = await SecureStore.getItemAsync('authToken')
  return result
}

const getAllInternships = async () => {
  const response = axios.get(ALL_INTERNSHIPS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": getToken(),
    },
  })
  const result = await response

  return result.data
}


const internshipsService = {
  getAllInternships
}

export default internshipsService