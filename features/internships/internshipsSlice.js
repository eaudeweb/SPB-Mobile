import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createIconSet } from "react-native-vector-icons"
import internships from "../../utils/internshipsTestJson"


const initialState = {
  internships: internships,
  internshipsAppliedTo: []
}

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
  }
})

export const internshipsActions = internshipsSlice.actions
export const { resetFilters, getInternshipsByCompany, applyToInternship } = internshipsSlice.actions
export default internshipsSlice.reducer
