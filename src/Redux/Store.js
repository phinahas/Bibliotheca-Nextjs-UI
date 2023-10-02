import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import  socketReducer  from "./SocketSlice";
const store =configureStore({
    reducer:{
        user:userReducer,
        socket:socketReducer,
    }
})


export default store;