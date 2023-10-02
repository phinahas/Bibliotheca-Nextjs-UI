"use client"

import { useEffect, useState } from 'react';
import { Grid, Button, Stack, TextField } from '@mui/material'
import CardComponent from '@/components/Card/CardComponent';
import FormDialogComponent from '@/components/FormDialog/FormDialogComponent'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'


import axios from '@/axios';
function page() {
    const router = useRouter();
    const userFromRedux = useSelector((state) => state.user);
    if(userFromRedux.user.role != 'vendor'){
        router.push('/signin')
    }

    const [dialogState, setDialogState] = useState(false);

    const closeDialogState = () => {
        setDialogState(false);
    }

    const [books, setBooks] = useState([]);

    useEffect(() => {

        axios.get(`/vendor/get-books?vendorId=${userFromRedux.user._id}`).then((response) => {
            if(response.status != 200){
                window.alert(response.statusText);
                return;
            }
       

            setBooks(response.data.books);
        }).catch((err) => {
            console.log(err.response)
        })

    }, [])

    const createBookFnCall = (data)=>{
       data.vendor = userFromRedux.user._id;
       
        axios.post('/vendor/create-book',data).then((response)=>{
            window.alert(response.data.message);
         
        }).catch((err) => {
            console.log(err.response)
            
        })
    }


    return (
        <>
            <FormDialogComponent closeFunction={closeDialogState} openStatus={dialogState} createBookFnCall={createBookFnCall} />
            <Grid container paddingTop={10}>
                <Grid item md={12}>
                    <Stack margin={5} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Button variant='contained' size='large' onClick={() => setDialogState(true)}>Add New</Button>
                    </Stack>
                </Grid>


                {books.map((book) => {
                    return <Grid item md={3}>
                        <CardComponent name={book.name} author={book.author} image={book.image} description={book.description} price={book.price} adminPage  />
                    </Grid>
                })}
            </Grid>


        </>
    )
}

export default page




