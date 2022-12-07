import { configureStore } from "@reduxjs/toolkit"
import animationsReducer from "../features/animations/animationsSlice"
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
  reducer: {
    animations: animationsReducer
  },
},
  composeWithDevTools()
)
