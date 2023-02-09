import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import filterCategories from "../../utils/FilterCategoriesJson"
import filterService from "./filtersActions"

const { categories, locations } = filterCategories

const initialState = {
  categories: [],
  locations: [],
  selectedFilter: null,
  internshipsFilter: {
    category: '',
    location: '',
    company: '',
    search: ''
  }
}

export const getCategories = createAsyncThunk('filters/getCategories', async (payload, thunkAPI) => {
  try {
    return await filterService.getCategories()
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

export const getLocations = createAsyncThunk('filters/getLocations', async (payload, thunkAPI) => {
  try {
    return await filterService.getLocations()
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
      state.internshipsFilter = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        // state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        // state.isLoading = false
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        // state.isLoading = false
        // state.isError = true
        // state.message = action.payload
      })
      .addCase(getLocations.pending, (state) => {
        // state.isLoading = true
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        // state.isLoading = false
        state.locations = action.payload
      })
      .addCase(getLocations.rejected, (state, action) => {
        // state.isLoading = false
        // state.isError = true
        // state.message = action.payload
      })
  }
})

export const filtersActions = filtersSlice.actions
// export const { completeSwipeableDemo } = companiesSlice.actions  <<<- action
export default filtersSlice.reducer
