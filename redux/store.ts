import { configureStore } from "@reduxjs/toolkit";
import { filtersEventsSlice } from "./events-filters/events-slice";
import { userSlice } from "./user/user-slice";

export const store = configureStore({
    reducer: {
        eventsFilters: filtersEventsSlice.reducer,
        user: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 