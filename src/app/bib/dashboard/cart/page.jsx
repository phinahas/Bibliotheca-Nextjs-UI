"use client"

import { useEffect, useState } from 'react';
import CardComponent from '@/components/Card/CardComponent';
import {  Grid } from '@mui/material'
import axios from '@/axios';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function CartPage() {

    const [books, setBooks] = useState([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false)
    const userFromRedux = useSelector((state) => state.user);
    const router = useRouter();


    useEffect(() => {

        if (!userFromRedux.user._id)
            router.push('/signin')

        axios.get(`/get-cart?userId=${userFromRedux.user._id}`).then((response) => {
  
            if (response.status != 200) {
                window.alert(response.statusText);
                setBooks([]);

                return;
            }
       

            setBooks(response.data.cart);
        }).catch((err) => {
            console.log(err);
            console.log(err.response)
            setBooks([]);

        })

    }, [useEffectRefresh])


    const removeFromCart = (cartId) => {
  
        axios.post('/remove-from-cart', { cartId: cartId }).then((response) => {
            window.alert(response.data.message);
            setUseEffectRefresh(!useEffectRefresh);
        }).catch((err) => {
            window.alert(err.response.data.message);
        });
    }

    const buyProduct = (bookId) =>{

        axios.post('/buy-product',{
            productId: bookId,
            userId: userFromRedux.user._id
        }).then((response) => {
          
            window.alert(response.data.message);
        }).catch((error) => {
            console.log(error);
            window.alert(error.response.data.message);
        })

    }

    return (
        <>
            <Grid container spacing={2} marginTop={8}>

                {books.map((book) => {
                    return <Grid item md={3}>
                        <CardComponent bookId={book._id} name={book.book.name} author={book.book.author} image={book.book.image} description={book.book.description} price={book.book.price} remvoeFromCartFunction={removeFromCart}  />
                    </Grid>
                })}


            </Grid>
        </>
    )
}

