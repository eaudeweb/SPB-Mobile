import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const NEWS_URL = 'https://staging.stagiipebune.ro/api/v1/public/news/'

const getNews = async () => {
  const response = await axios.get(NEWS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  return response.data
}
const newService = {
  getNews
}

export default newService