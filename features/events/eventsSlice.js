import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import events from "../../utils/eventsJson"
const initialState = {
  events: events.events,
  webinars: events.webinars
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
  }
})

export const eventsActions = eventsSlice.actions
export default eventsSlice.reducer
