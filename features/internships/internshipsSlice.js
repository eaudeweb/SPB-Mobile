import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit"
import internshipsService from "./internshipsActions"

const initialState = {
  internships: [],
  sortedInternships: [],
  studentInternships: [],
  application: {
    isLoading: false,
    isSuccess: false,
    isApplySuccess: false,
    isWithdrawSuccess: false,
    isError: false,
    message: null
  },
  isLoading: false,
  isError: false,
  message: '',
  internshipsAppliedTo: []
}

export const getAllInternships = createAsyncThunk('internships/getAll', async (internships, thunkAPI) => {
  try {
    return await internshipsService.getAllInternships()
  } catch (error) {
    getIntersnshipsBySearch
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getStudentInternships = createAsyncThunk('studentInternships/get', async (internships, thunkAPI) => {
  try {
    return await internshipsService.getStudentInternships()
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

export const applyToInternship = createAsyncThunk('internship/apply', async (payload, thunkAPI) => {
  const { companyId, jobId } = payload
  try {
    return await internshipsService.applyToInternship(companyId, jobId)
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

export const withdrawFromInternship = createAsyncThunk('internship/withdraw', async (payload, thunkAPI) => {
  const { companyId, jobId } = payload
  try {
    return await internshipsService.withdrawFromInternship(companyId, jobId)
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

export const getInternshipsBySearch = createAsyncThunk('studentInternships/search', async (params, thunkAPI) => {
  try {
    return await internshipsService.getInternshipsBySearch(params)
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
  const internshipsSlice = createSlice({
    name: 'internships',
    initialState,
    reducers: {
      resetFilters: (state) => {
        state.internships = internships
      },
      resetApplicationStatus: (state) => {
        state.application.isApplySuccess = false
        state.application.isWithdrawSuccess = false
        state.application.isError = false
        state.application.message = null
      },
      getInternshipsByCompany: (state, { payload }) => {
        const filterInternships = internships.filter(internships => internships.company.name === payload)

        state.internships = filterInternships
      },
      // applyToInternship: (state, { payload }) => {
      //   const newArr = state.internshipsAppliedTo
      //   if (newArr.find(internship => internship.id === payload.id)) return
      //   newArr.push({ ...payload, acceptedStatus: false, interviewStatus: false })

      //   state.internshipsAppliedTo = newArr
      // },
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
      updateLocalInternshipApplied: (state, { payload }) => {
        const companyIndex = current(state.internships).map(obj => obj.companyName).indexOf(payload.company.name)
        const internshipIndex = current(state.internships)[companyIndex].internships.findIndex(internship => internship.id == payload.id)
        state.internships = [...state.internships, state.internships[companyIndex].internships[internshipIndex].can_apply = 'already_applied']
      },
      updateLocalInternshipWithdrew: (state, { payload }) => {
        const companyIndex = current(state.internships).map(obj => obj.companyName).indexOf(payload.company.name)
        const internshipIndex = current(state.internships)[companyIndex].internships.findIndex(internship => internship.id == payload.id)
        state.internships = [...state.internships, state.internships[companyIndex].internships[internshipIndex].can_apply = true]
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllInternships.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllInternships.fulfilled, (state, action) => {
          state.isLoading = false
          state.internships = action.payload.internships
          state.sortedInternships = action.payload.sortedInternships
          state.studentInternships = action.payload.studentInternships
        })
        .addCase(getAllInternships.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(applyToInternship.pending, (state) => {
          state.application.isLoading = true
        })
        .addCase(applyToInternship.fulfilled, (state, action) => {
          state.application.isLoading = false
          state.application.isApplySuccess = true
        })
        .addCase(applyToInternship.rejected, (state, action) => {
          state.application.isLoading = false
          state.application.isError = true
          state.application.message = action.payload
        })
        .addCase(withdrawFromInternship.pending, (state) => {
          state.application.isLoading = true
        })
        .addCase(withdrawFromInternship.fulfilled, (state, action) => {
          state.application.isLoading = false
          state.application.isWithdrawSuccess = true
        })
        .addCase(withdrawFromInternship.rejected, (state, action) => {
          state.application.isLoading = false
          state.application.isError = true
          state.application.message = action.payload
        })
        .addCase(getStudentInternships.pending, (state) => {
          state.studentInternships = []
        })
        .addCase(getStudentInternships.fulfilled, (state, action) => {
          state.studentInternships = action.payload
        })
        .addCase(getStudentInternships.rejected, (state, action) => {
        })
        .addCase(getInternshipsBySearch.pending, (state) => {
          state.isLoading = true
          // state.studentInternships = []
        })
        .addCase(getInternshipsBySearch.fulfilled, (state, action) => {
          // state.studentInternships = action.payload
          state.isLoading = false
        })
        .addCase(getInternshipsBySearch.rejected, (state, action) => {
          state.isLoading = false

        })

    }
  })

export const internshipsActions = internshipsSlice.actions
export const { resetFilters, resetApplicationStatus, getInternshipsByCompany, updateLocalInternshipApplied, updateLocalInternshipWithdrew } = internshipsSlice.actions
export default internshipsSlice.reducer
