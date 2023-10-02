import React from 'react'
import {Grid, Stack, Box}  from '@mui/material'

const AdminUsersPage = () => {
  return (
    <>
        <Grid container paddingTop={10}>
            <Grid item md={3}>
            <Box sx={{background:'whiteSmoke', border:'2px solid cyan', padding:'5px'}}>
                <h5>{"User 1"}</h5>
                <hr />
                <p>{"Address Line 1"}</p>
            </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default AdminUsersPage