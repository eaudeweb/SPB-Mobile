import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import internships from "../../utils/internshipsTestJson"


const initialState = {
  internships: internships
}

const internshipsSlice = createSlice({
  name: 'internships',
  initialState,
  reducers: {
    // completeSwipeableDemo: (state) => {
    //   state.swipeableDemo = true
    // }
  }
})

export const internshipsActions = internshipsSlice.actions
// export const { completeSwipeableDemo } = internshipsSlice.actions  <<<- action
export default internshipsSlice.reducer
