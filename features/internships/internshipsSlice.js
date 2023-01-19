import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import internshipsService from "./internshipsService"

const initialState = {
  internships: [],
  isLoading: false,
  isError: false,
  message: '',
  internshipsAppliedTo: []
}

export const getAllInternships = createAsyncThunk('internships/getAll', async (internships, thunkAPI) => {
  try {
    return await internshipsService.getAllInternships()
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

const internshipsSlice = createSlice({
  name: 'internships',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.internships = internships
    },
    getInternshipsByCompany: (state, { payload }) => {
      const filterInternships = internships.filter(internships => internships.company.name === payload)

      state.internships = filterInternships
    },
    applyToInternship: (state, { payload }) => {
      const newArr = state.internshipsAppliedTo
      if (newArr.find(internship => internship.id === payload.id)) return
      newArr.push({ ...payload, acceptedStatus: false, interviewStatus: false })

      state.internshipsAppliedTo = newArr
    },
    toggleAcceptedStatus: (state, { payload }) => {
      const newArr = state.internshipsAppliedTo
      const internshipIndex = newArr.findIndex(internship => internship.id === payload.id)
      if (newArr[internshipIndex].acceptedStatus) {
        newArr[internshipIndex].acceptedStatus = false
      } else {
        newArr[internshipIndex].acceptedStatus = true
        newArr[internshipIndex].interviewStatus = false

      }
      state.internshipsAppliedTo = newArr

    },
    toggleInterviewStatus: (state, { payload }) => {
      const newArr = state.internshipsAppliedTo
      const internshipIndex = newArr.findIndex(internship => internship.id === payload.id)
      if (newArr[internshipIndex].interviewStatus) {
        newArr[internshipIndex].interviewStatus = false
      } else {
        newArr[internshipIndex].interviewStatus = true
        newArr[internshipIndex].acceptedStatus = false
      }
      state.internshipsAppliedTo = newArr
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInternships.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllInternships.fulfilled, (state, action) => {
        state.isLoading = false
        state.internships = action.payload
      })
      .addCase(getAllInternships.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const internshipsActions = internshipsSlice.actions
export const { resetFilters, getInternshipsByCompany, applyToInternship } = internshipsSlice.actions
export default internshipsSlice.reducer
