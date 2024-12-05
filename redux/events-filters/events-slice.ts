import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface filtersEvents {
    busqueda: string | null
    fecha_inicio: string | null
    fecha_fin: string | null
    carreras: number[] | null
}

const initialState: filtersEvents = {
    busqueda: null,
    fecha_inicio: null,
    fecha_fin: null,
    carreras: null
}

export const filtersEventsSlice = createSlice({
    name: "eventsFilters",
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<filtersEvents>>) {
            return {
                ...state,
                ...action.payload
            }
        },
        resetFilters() {
            return initialState
        }
    }
});

export const { setFilters, resetFilters } = filtersEventsSlice.actions
export default filtersEventsSlice.reducer