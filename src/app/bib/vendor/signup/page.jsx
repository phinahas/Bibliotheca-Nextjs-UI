"use client";

import React, { useState } from 'react'
import { Stack, Grid, TextField, Button, Box } from '@mui/material'
import axios from '@/axios'
import Link from 'next/link'
function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const RegisterUser = ()=>{
  
    axios.post('/create-user', {name:name, password:password,email:email,role:'vendor'}).then((response)=>{
    
      window.alert(response.data.message);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>

      <Grid container sx={{ height: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item md={5}  >
          <Box sx={{ padding: '10px', border: '1px solid cyan' }}>
            <TextField placeholder='Name' onChange={(e)=>setName(e.target.value)}/><br />
            <TextField placeholder='Email' sx={{ marginTop: '5px' }} onChange={(e)=>setEmail(e.target.value)}/> <br />
            <TextField placeholder='password' sx={{ marginTop: '5px' }} onChange={(e)=>setPassword(e.target.value)}/> <br />
            <Button variant='contained' sx={{ marginTop: '5px', marginBottom:'10px' }} onClick={RegisterUser}>Register</Button>
            <br />
            <Link href='/bib/signin'>Have account</Link>

          </Box>

        </Grid>
      </Grid>

    </>
  )
}

export default SignupPage