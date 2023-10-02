import React from 'react'
import { Grid, Stack } from '@mui/material'



const layoutBooks = ({ children }) => {
    return (
        <>
            <Grid container >

                <Grid item md={12} >
                    {children}
                </Grid>
            </Grid>
        </>

    )
}

export default layoutBooks