import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit"
import internshipsService from "./internshipsActions"

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isRefreshLoading: false,
  message: '',
  internships: [],
  sortedInternships: [],
  studentInternships: [],
  application: {
    isLoading: false,
    isSuccess: false,
    isApplySuccess: false,
    isWithdrawSuccess: false,
    isError: false,
    message: ''
  },
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

export const refreshStudentInternships = createAsyncThunk('studentInternships/refreshApplications', async (internships, thunkAPI) => {
  try {
    return await internshipsService.refreshStudentInternships()
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

export const refreshInternshipsBySearch = createAsyncThunk('studentInternships/refresh', async (params, thunkAPI) => {
  try {
    return await internshipsService.refreshInternshipsBySearch(params)
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

export const changeInternshipApplicationStatus = createAsyncThunk('studentInternships/changeStatus', async (payload, thunkAPI) => {
  const { jobId, status } = payload
  try {
    return await internshipsService.changeInternshipApplicationStatus(jobId, status)
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
        state.application.message = ''
      },
      getInternshipsByCompany: (state, { payload }) => {
        const filterInternships = internships.filter(internships => internships.company.name === payload)

        state.internships = filterInternships
      },

      // ACCEPTED = 3
      // APPLIED = 1
      // INTERVIEW = 2
      toggleAcceptedStatus: (state, { payload }) => {
        const newArr = state.studentInternships
        const internshipIndex = newArr.findIndex(internship => internship.id === payload.id)
        if (newArr[internshipIndex].status === 3) {
          newArr[internshipIndex].status = 1
        } else {
          newArr[internshipIndex].status = 3
        }
        state.studentInternships = newArr
      },
      toggleInterviewStatus: (state, { payload }) => {
        const newArr = state.studentInternships
        const internshipIndex = newArr.findIndex(internship => internship.id === payload.id)
        if (newArr[internshipIndex]?.status === 2) {
          newArr[internshipIndex].status = 1
        } else {
          newArr[internshipIndex].status = 2
        }
        state.studentInternships = newArr
      },
      updateLocalInternshipApplied: (state, { payload }) => {
        const companyIndex = state.sortedInternships.map(obj => obj.companyName).indexOf(payload.company.name)
        const internshipIndex = state.sortedInternships[companyIndex].internships.findIndex(internship => internship.id == payload.id)
        state.sortedInternships = [...state.sortedInternships, state.sortedInternships[companyIndex].internships[internshipIndex].applied = new Date().toString()]
      },
      updateLocalInternshipWithdrew: (state, { payload }) => {
        const companyIndex = current(state.sortedInternships).map(obj => obj.companyName).indexOf(payload.company.name)
        const internshipIndex = current(state.sortedInternships)[companyIndex].internships.findIndex(internship => internship.id == payload.id)
        state.sortedInternships = [...state.sortedInternships, state.sortedInternships[companyIndex].internships[internshipIndex].applied = '']
      },
      updateLocalApplicationsApplied: (state, { payload }) => {
        const internship = {
          ...payload,
          applied: new Date().toString()
        }
        state.studentInternships = [...state.studentInternships, internship]
      },
      updateLocalApplicationsWithdrew: (state, { payload }) => {
        const newJobs = state.studentInternships
        const index = state.studentInternships.findIndex(job => job.id === payload.id)
        newJobs.splice(index, 1)
      },
      resetInternships: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.isRefreshLoading = false
        state.message = ''
        state.internships = []
        state.sortedInternships = []
        state.studentInternships = []
        state.application.isLoading = false
        state.application.isSuccess = false
        state.application.isApplySuccess = false
        state.application.isWithdrawSuccess = false
        state.application.isError = false
        state.application.message = ''
      }
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
          // state.studentInternships = action.payload.studentInternships
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
          state.isLoading = true
        })
        .addCase(getStudentInternships.fulfilled, (state, action) => {
          state.studentInternships = action.payload
          state.isLoading = false
        })
        .addCase(getStudentInternships.rejected, (state, action) => {
          state.isLoading = false
        })
        .addCase(refreshStudentInternships.pending, (state) => {
          state.isLoading = true
          state.isRefreshLoading = true
        })
        .addCase(refreshStudentInternships.fulfilled, (state, action) => {
          state.studentInternships = action.payload
          state.isLoading = false
          state.isRefreshLoading = false
        })
        .addCase(refreshStudentInternships.rejected, (state, action) => {
          state.isLoading = false
          state.isRefreshLoading = false
        })
        .addCase(getInternshipsBySearch.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        .addCase(getInternshipsBySearch.fulfilled, (state, action) => {
          // state.studentInternships = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.sortedInternships = action.payload
        })
        .addCase(getInternshipsBySearch.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
        })
        .addCase(refreshInternshipsBySearch.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
          state.isRefreshLoading = true
        })
        .addCase(refreshInternshipsBySearch.fulfilled, (state, action) => {
          // state.studentInternships = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.sortedInternships = action.payload
          state.isRefreshLoading = false
        })
        .addCase(refreshInternshipsBySearch.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
          state.isRefreshLoading = false
        })
        .addCase(changeInternshipApplicationStatus.pending, (state) => {
          // state.isLoading = true
        })
        .addCase(changeInternshipApplicationStatus.fulfilled, (state, action) => {
          state.application.isSuccess = true
          // state.studentInternships = action.payload
          // state.isLoading = false
          // state.sortedInternships = action.payload
        })
        .addCase(changeInternshipApplicationStatus.rejected, (state, action) => {
          // state.isLoading = false
        })

    }
  })

export const internshipsActions = internshipsSlice.actions
export const { resetFilters,
  resetApplicationStatus,
  getInternshipsByCompany,
  updateLocalInternshipApplied,
  updateLocalInternshipWithdrew,
  updateLocalApplicationsApplied,
  updateLocalApplicationsWithdrew
} = internshipsSlice.actions
export default internshipsSlice.reducer
