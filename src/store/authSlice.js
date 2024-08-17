import {createSlice} from '@reduxjs/toolkit';

// for tracking the user authentication i will ask to store that user is authenticated or not.
const initialState = {
    status: false,
    userData: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;

        },
        
        logout:(state, action) => {
            state.status = false;
            state.userData = null;
        }
    }
})
export const {login,logout} = authSlice.actions;

export default authSlice.reducer;