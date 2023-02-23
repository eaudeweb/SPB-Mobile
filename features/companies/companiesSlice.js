import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import companies from "../../utils/companiesJson"
import companiesService from './companiesActions'

const initialState = {
  companies: [],
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getAllPartnerCompanies = createAsyncThunk('companies/getAllPartners', async (_, thunkAPI) => {
  try {
    return await companiesService.getAllPartnerCompanies()
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

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    resetCompanies: (state) => {
      state.companies = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPartnerCompanies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPartnerCompanies.fulfilled, (state, action) => {
        state.isLoading = false
        state.companies = action.payload
      })
      .addCase(getAllPartnerCompanies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const companiesActions = companiesSlice.actions
export default companiesSlice.reducer
