"use client";

import React, { useState } from 'react'
import { Stack, Grid, TextField, Button, Box } from '@mui/material'
import { useDispatch } from 'react-redux';
import { addUser, setLoginState } from '@/Redux/UserSlice'
import axios from '@/axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


function SigninPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = () => {

    axios.post('/signin', { password: password, email: email }).then((response) => {
   
      dispatch(addUser((response.data.user)));
      dispatch(setLoginState());
      if(typeof window !== 'undefined'){

        localStorage.setItem('tokenBS', response.data.token);
      }
      
      if (response.data.user.role === 'admin') {
       
        router.push('/bib/admin');
        return;
      }
      if (response.data.user.role === 'vendor') {
       
        router.push('/bib/vendor/dashboard');
        return;
      }
      router.push('/bib/dashboard/books');
      window.alert("login success");
    }).catch((err) => {
      console.log(err);
      window.alert(err.response.data.message);
    })
  }

  return (
    <>

      <Grid container sx={{ height: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item md={5}  >
          <Box sx={{ padding: '10px', border: '1px solid cyan' }}>
            <TextField placeholder='Email' sx={{ marginTop: '5px' }} onChange={(e) => setEmail(e.target.value)} /> <br />
            <TextField placeholder='password' sx={{ marginTop: '5px' }} onChange={(e) => setPassword(e.target.value)} /> <br />
            <Button variant='contained' sx={{ marginTop: '5px', marginBottom: '10px' }} onClick={LoginUser}>Login</Button>
            <br />
            <Link href="/bib/signup">Don't have Account ?</Link>
            <br />
            <Link href="/bib/vendor/signup">Register as vendor</Link>
            <br />

          </Box>
        </Grid>
      </Grid>

    </>
  )
}

export default SigninPage