import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from 'redux-devtools-extension';
import animationsReducer from "../features/animations/animationsSlice"
import companiesReducer from "../features/companies/companiesSlice"
import internshipsReducer from "../features/internships/internshipsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import eventsReducer from "../features/events/eventsSlice";
import profileReducer from "../features/profile/profileSlice";
import loginReducer from "../features/login/loginSlice";
import newsReducer from "../features/news/newsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    animations: animationsReducer,
    companies: companiesReducer,
    internships: internshipsReducer,
    filters: filtersReducer,
    events: eventsReducer,
    profile: profileReducer,
    news: newsReducer
  },
},
  composeWithDevTools()
)
