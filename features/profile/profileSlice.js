import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit"
import profileService from "./profileActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: ''
}

export const getProfileData = createAsyncThunk('profile/get', async (internships, thunkAPI) => {
  try {
    return await profileService.getProfileData()
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

export
  const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      resetProfile: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.data = ''
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfileData.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProfileData.fulfilled, (state, action) => {
          state.isLoading = false
          state.data = action.payload
        })
        .addCase(getProfileData.rejected, (state, action) => {
          state.isLoading = false
        })

    }
  })

export const profileActions = profileSlice.actions
export default profileSlice.reducer
