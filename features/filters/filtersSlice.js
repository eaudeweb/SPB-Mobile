import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import filterCategories from "../../utils/FilterCategoriesJson"

const { categories, locations } = filterCategories

const initialState = {
  categories: categories,
  locations: locations
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // completeSwipeableDemo: (state) => {
    //   state.swipeableDemo = true
    // }
  }
})

export const filtersActions = filtersSlice.actions
// export const { completeSwipeableDemo } = companiesSlice.actions  <<<- action
export default filtersSlice.reducer
