"use client";
import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"User",
    initialState:{
        user:{},
        loginState:false
        
    },
    reducers:{
        addUser(state = initialState,action){

            //state.push(action.payload)
            return { ...state, user: action.payload };

        },
        setLoginState(state = initialState,action){
            return { ...state, loginState:true };
        }
    }
})

export const {addUser, setLoginState} =userSlice.actions;
export default userSlice.reducer;