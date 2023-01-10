import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import companies from "../../utils/companiesJson"

const initialState = {
  companies: companies
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    // completeSwipeableDemo: (state) => {
    //   state.swipeableDemo = true
    // }
  }
})

export const companiesActions = companiesSlice.actions
// export const { completeSwipeableDemo } = companiesSlice.actions  <<<- action
export default companiesSlice.reducer
