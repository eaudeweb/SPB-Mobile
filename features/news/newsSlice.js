import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import newsService from "./newsActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  news: [],
}

export const getNews = createAsyncThunk('news/getNews', async (thunkAPI) => {
  try {
    return await newsService.getNews()
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

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.news = action.payload
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const newsActions = newsSlice.actions
export default newsSlice.reducer
