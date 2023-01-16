import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import filterCategories from "../../utils/FilterCategoriesJson"

const { categories, locations } = filterCategories

const initialState = {
  categories: categories,
  locations: locations,
  internshipsFilter: {
    categories: [],
    cities: [],
    companies: ['Lenovo']
  }
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // completeSwipeableDemo: (state) => {
    //   state.swipeableDemo = true
    // }
    updateFilter: (state, { payload }) => {
      console.log(payload)
    }
  }
})

export const filtersActions = filtersSlice.actions
// export const { completeSwipeableDemo } = companiesSlice.actions  <<<- action
export default filtersSlice.reducer
