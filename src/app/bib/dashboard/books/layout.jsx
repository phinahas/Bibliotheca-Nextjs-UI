"use client"
import React, { useState, useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import axios from '@/axios'

import SideFilterBarComponent from '@/components/SideFilterBar/SideFilterBarComponent'

const layoutBooks = ({ children }) => {
    const [searchedBooks, setbooks] = useState([]);
    useEffect(() => {

        axios.get('/get-books').then((response) => {
            if (response.status != 200) {
                window.alert(response.statusText);
                return;
            }
            setbooks(response.data.books);
        }).catch((err) => {
            console.log(err.response)
        })

    }, [])



    const getKeyWord = (word) => {

        if (word.length > 2) {

            axios.get(`/get-searched-book?${word}`).then((response) => {
                if (response.status != 200) {
                    window.alert(response.statusText);
                    return;
                }
                setbooks(response.data.books)

            }).catch((error) => {
                console.error(error);
                window.alert(error);
            });

        }

    }

    return (
        <>

            {children}

        </>

    )
}

export default layoutBooks