import { configureStore } from "@reduxjs/toolkit";
import { filtersEventsSlice } from "./events-filters/events-slice";

export const store = configureStore({
    reducer: {
        eventsFilters: filtersEventsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 