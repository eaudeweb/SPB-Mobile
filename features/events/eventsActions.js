import axios from "axios";
import tokenLogic from "../../utils/tokenLogic";

const EVENTS_URL = 'https://staging.stagiipebune.ro/api/v1/webinars/'

const getEvents = async () => {
  const response = await axios.get(`${EVENTS_URL}students`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  return response.data
}

const bookEventSeat = async (eventId) => {
  const URL = `${EVENTS_URL}${eventId}/register`;
  const response = await axios.post(URL, {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  return response.data
}

const unbookEventSeat = async (eventId) => {
  const URL = `${EVENTS_URL}${eventId}/unregister`;
  const response = await axios.post(URL, {
    headers: {
      "X-CSRFToken": await tokenLogic.getToken(),
    }
  })
  return response.data
}

const eventsService = {
  getEvents,
  bookEventSeat,
  unbookEventSeat
}

export default eventsService