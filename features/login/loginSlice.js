import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit"
import loginService from "./loginActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  response: '',
  notificationToken: ''
}

export const login = createAsyncThunk('login/log-in', async (loginForm, thunkAPI) => {

  try {
    return await loginService.login(loginForm)
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

export const addNotificationToken = createAsyncThunk('login/addNotificationToken', async (tokenData, thunkAPI) => {
  try {
    return await loginService.addNotificationToken(tokenData)
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

export const deleteNotificationToken = createAsyncThunk('login/deleteNotificationToken', async (id, thunkAPI) => {
  try {
    return await loginService.deleteNotificationToken(id)
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

export const deleteAllNotificationTokens = createAsyncThunk('login/deleteAllNotificationTokens', async (id, thunkAPI) => {
  try {
    return await loginService.deleteAllNotificationTokens()
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
  const loginSlice = createSlice({
    name: 'internships',
    initialState,
    reducers: {
      resetLogin: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.response = ''
        state.notificationToken = ''
      },
      updateNotificationToken: (state, { payload }) => {
        state.notificationToken = payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.response = action.payload
          state.isSuccess = true
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(addNotificationToken.pending, (state) => {
        })
        .addCase(addNotificationToken.fulfilled, (state, action) => {
          state.notificationToken = action.payload
        })
        .addCase(addNotificationToken.rejected, (state, action) => {

        })
        .addCase(deleteNotificationToken.pending, (state) => {
        })
        .addCase(deleteNotificationToken.fulfilled, (state, action) => {
          state.notificationToken = ''
        })
        .addCase(deleteNotificationToken.rejected, (state, action) => {
        })
    }
  })

export const loginActions = loginSlice.actions
export const { resetLoginInfo } = loginSlice.actions
export default loginSlice.reducer
