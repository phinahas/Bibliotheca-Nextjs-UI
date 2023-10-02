"use client"
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {addClientId,addWs} from '@/Redux/SocketSlice'

const useSetClient = () => {

    const dispatch = useDispatch();
    useEffect(() => {

        const newWs = new WebSocket('ws://10.0.0.11:3001/');
        console.log(newWs)
        console.log("socket connected");
        dispatch(addWs(newWs)); 
        newWs.onmessage = (event) => {
            let x = JSON.parse(event.data);
            console.log(x.id,"This is the ID for the socket connected, from the server at port ")
            if (x.type === 'id') {
              console.log(x);
              dispatch(addClientId(x.id));
            }
          };     
    }, [])
    
}

export default useSetClient