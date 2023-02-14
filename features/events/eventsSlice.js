import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import eventsService from "./eventsActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  events: [],
  booking: {
    isLoading: false,
    isBookingSuccessful: false,
    isCancelSuccesful: false,
    isError: false,
    message: null
  },
}

export const getEvents = createAsyncThunk('events/get', async (_, thunkAPI) => {
  try {
    return await eventsService.getEvents()
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const bookEventSeat = createAsyncThunk('events/bookSeat', async (eventId, thunkAPI) => {
  try {
    return await eventsService.bookEventSeat(eventId)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const unbookEventSeat = createAsyncThunk('events/unbookSeat', async (eventId, thunkAPI) => {
  try {
    return await eventsService.unbookEventSeat(eventId)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetBookingStatus: (state) => {
      state.booking.isLoading = false
      state.booking.isBookingSuccessful = false
      state.booking.isCancelSuccesful = false
      state.booking.isError = false
      state.booking.message = null
    },
    updateLocalEvents: (state, { payload }) => {
      console.log(payload)
      const { id, newQueue } = payload
      console.log(newQueue)
      const newEventArr = state.events
      const getEventIndex = (eventId, arr) => arr.findIndex(event => event.id == eventId)
      if (newQueue === 'upcoming') {
        const index = getEventIndex(id, newEventArr.reserved)
        const event = newEventArr.reserved[index]
        event.reg_state = 'cancelled'
        newEventArr.upcoming.push(event)
        newEventArr.reserved.splice(index, 1)
        state.events = newEventArr
      } else {
        const index = getEventIndex(id, newEventArr.upcoming)
        const event = newEventArr.upcoming[index]
        event.reg_state = 'accepted'
        newEventArr.reserved.push(event)
        newEventArr.upcoming.splice(index, 1)
        state.events = newEventArr
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(bookEventSeat.pending, (state) => {
        state.booking.isLoading = true
      })
      .addCase(bookEventSeat.fulfilled, (state, action) => {
        state.isBookingSuccessful = true
        state.booking.isLoading = false

      })
      .addCase(bookEventSeat.rejected, (state, action) => {
        state.booking.isLoading = false
        state.booking.isError = true
        state.booking.message = action.payload
      })
      .addCase(unbookEventSeat.pending, (state) => {
        state.booking.isLoading = true
      })
      .addCase(unbookEventSeat.fulfilled, (state, action) => {
        state.booking.isCancelSuccesful = true
        state.booking.isLoading = false
      })
      .addCase(unbookEventSeat.rejected, (state, action) => {
        state.booking.isLoading = false
        state.booking.isError = true
        state.booking.message = action.payload
      })

  }
})

export const eventsActions = eventsSlice.actions
export default eventsSlice.reducer
