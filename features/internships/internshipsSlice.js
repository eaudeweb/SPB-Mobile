import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
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
      newArr.push(payload)
      state.internshipsAppliedTo = newArr
    }
  }
})

export const internshipsActions = internshipsSlice.actions
export const { resetFilters, getInternshipsByCompany, applyToInternship } = internshipsSlice.actions
export default internshipsSlice.reducer
