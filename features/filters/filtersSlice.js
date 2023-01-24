import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import filterCategories from "../../utils/FilterCategoriesJson"

const { categories, locations } = filterCategories

const initialState = {
  categories: categories,
  locations: locations,
  selectedFilter: null,
  internshipsFilter: {
    categories: [],
    cities: [],
    companies: []
  }
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetSelectedFilter: (state) => {
      state.selectedFilter = null
    }
    ,
    updateSelectedFilter: (state, { payload }) => {
      state.selectedFilter = payload
    },
    updateFilterList: (state, { payload }) => {
      const { type, newArr } = payload
      switch (type) {
        case 'categories':
          state.internshipsFilter.categories = newArr;
          break;
        case 'cities':
          state.internshipsFilter.cities = newArr;
          break;
        case 'companies':
          state.internshipsFilter.companies = newArr;
          break;
      }
    }
  }
})
// const onFormChange = (value, inputType) => {
//   setFormData(prevState => ({
//     ...prevState,
//     [inputType]: value
//   }))
// }
export const filtersActions = filtersSlice.actions
// export const { completeSwipeableDemo } = companiesSlice.actions  <<<- action
export default filtersSlice.reducer
