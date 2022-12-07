import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  swipeableDemo: false
}

const animationsSlice = createSlice({
  name: 'animations',
  initialState,
  reducers: {
    completeSwipeableDemo: (state) => {
      state.swipeableDemo = true
    }
  }
})

export const animationsActions = animationsSlice.actions
export const { completeSwipeableDemo } = animationsSlice.actions
export default animationsSlice.reducer
