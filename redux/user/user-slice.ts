import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserSlice {
    is_logged: boolean
}

const initialState: UserSlice = {
    is_logged: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state) {
            return {
                ...state,
                is_logged: true
            }
        },
        logout(state) {
            return {
                ...state,
                is_logged: false
            }
        }
    }
});

export const { login, logout } = userSlice.actions
export default userSlice.reducer