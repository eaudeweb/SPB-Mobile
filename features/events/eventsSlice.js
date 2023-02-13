import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import eventsService from "./eventsActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  events: [],
  booking: {
    isLoading: false,
    isSuccess: false,
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
