"use client"

import { useEffect, useState } from 'react';
import { Grid, Button, Stack, TextField } from '@mui/material'
import CardComponent from '@/components/Card/CardComponent';
import FormDialogComponent from '@/components/FormDialog/FormDialogComponent'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'


import SalesCardComponent from '@/components/Card/SalesCardComponent'



import axios from '@/axios';
function VendorDashboard() {
  const router = useRouter();
  const userFromRedux = useSelector((state) => state.user);
  if (userFromRedux.user.role != 'vendor') {
    router.push('/bib/signin')
  }

  const [dialogState, setDialogState] = useState(false);
  const [salesCount, setSalesCount] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeDialogState = () => {
    setDialogState(false);
  }

  const [books, setBooks] = useState([]);

  useEffect(() => {

    axios.get(`/vendor/get-books?vendorId=${userFromRedux.user._id}`).then((response) => {
      if (response.status != 200) {
        window.alert(response.statusText);
        return;
      }


      setBooks(response.data.books);
    }).catch((err) => {
      console.log(err.response)
    })

    setLoading(true)
    axios.get(`/vendor/get-sales-report?vendorId=${userFromRedux.user._id}`).then((response) => {
      console.log(response.data.sales[0])
      setSalesCount(response.data.sales);
      setLoading(false)




    }).catch((err) => {

      window.alert(err.errorMessage);
      console.log(err.response);
     


    })

  }, [])

  const createBookFnCall = (data) => {
    data.vendor = userFromRedux.user._id;

    axios.post('/vendor/create-book', data).then((response) => {
      window.alert(response.data.message);

    }).catch((err) => {
      console.log(err.response)

    })
  }


  return (
    <>
      <FormDialogComponent closeFunction={closeDialogState} openStatus={dialogState} createBookFnCall={createBookFnCall} />
      <Grid container paddingTop={10} sx={{ background: 'white' }}>

        <Stack alignItems={"space-evenly"} justifyContent={'space-evenly'} direction={'row'} display={'flex'} sx={{ width: '100%' }}>

        {!loading && Array.isArray(salesCount) && salesCount.length > 0 && (
  <>
    <Grid item md={3}>
      <SalesCardComponent cardTitle='New orders' backgroundColour='#5CD2E6' value={salesCount[0].ordered ? salesCount[0].ordered : 0} />
    </Grid>
    <Grid item md={3}>
      <SalesCardComponent cardTitle='Shipped' backgroundColour='#B0D9B1' value={salesCount[0].shipped ? salesCount[0].shipped : 0} />
    </Grid>
    <Grid item md={3}>
      <SalesCardComponent cardTitle='Delivered' backgroundColour='#79AC78' value={salesCount[0].delivered ? salesCount[0].delivered : 0} />
    </Grid>
  </>
)}





        </Stack>

      </Grid>


    </>
  )
}

export default VendorDashboard




