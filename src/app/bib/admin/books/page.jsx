"use client"

import { useEffect, useState } from 'react';
import { Grid, Button, Stack, TextField } from '@mui/material'
import CardComponent from '@/components/Card/CardComponent';
import FormDialogComponent from '@/components/FormDialog/FormDialogComponent'

import axios from '@/axios';
function page() {

    const [dialogState, setDialogState] = useState(false);

    const closeDialogState = () => {
        setDialogState(false);
    }

    const [books, setBooks] = useState([]);

    useEffect(() => {

        axios.get('/admin/get-books').then((response) => {
            if(response.status != 200) {
                window.alert(response.statusText);
                return;
            }

            setBooks(response.data.books);
        }).catch((err) => {
            console.log(err.response)
        })

    }, [])

    const createBookFnCall = (data)=>{
       
        axios.post('/admin/create-book',data).then((response)=>{
            window.alert(response.data.message);
         
        }).catch((err) => {
            console.log(err.response)
            
        })

    }

    const changeStatusFnCall = (bookId,status) =>{

        console.log(bookId,status)
        axios.post('/admin/change-book-status',{bookId:bookId,status:status}).then((response)=>{
            window.alert(response.data.message);
            
            setBooks(prevItems => {
                return prevItems.map(item => {
                  if (item._id === bookId) {
                    // Update the status of the matching item
                    return { ...item, status: status };
                  }
                  // Keep the other items unchanged
                  return item;
                });
              });
         
        }).catch((err) => {
            console.log(err.response)
            
        })

    }


    return (
        <>
            <FormDialogComponent closeFunction={closeDialogState} openStatus={dialogState} createBookFnCall={createBookFnCall} />
            <Grid container paddingTop={10}>
                {/* <Grid item md={12}>
                    <Stack margin={5} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Button variant='contained' size='large' onClick={() => setDialogState(true)}>Add New</Button>
                    </Stack>
                </Grid> */}
                {books.map((book) => {
                    return <Grid item md={3} sx={{padding:'5px'}}>
                        <CardComponent bookId={book._id} name={book.name} author={book.author} image={book.image} description={book.description} price={book.price} bookStatus={book.status} adminPage bookStatusTag  changeStatusFnCall={changeStatusFnCall} />
                    </Grid>
                })}
            </Grid>


        </>
    )
}

export default page




