"use client"

import { useEffect, useState } from 'react';
import CardComponent from '@/components/Card/CardComponent';
import DataTable from '@/components/DataTables/DataTable'
import {  Grid } from '@mui/material'
import axios from '@/axios';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
const {formatTheData} = require('@/utils/commonFns')

export default function OrderPage() {

    const [orders, setOrders] = useState([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false)
    const userFromRedux = useSelector((state) => state.user);
    const router = useRouter();


    useEffect(() => {

        if (!userFromRedux.user._id)
            router.push('/signin')

        

        axios.get(`/get-orders?userId=${userFromRedux.user._id}`).then((response) => {
         
            if (response.status != 200) {
                window.alert(response.statusText);
                setOrders([]);
                return;
            }
            setOrders(response.data.orders);
        }).catch((err) => {
            console.log(err);
            console.log(err.response)
            setOrders([]);

        })

    }, [useEffectRefresh])


    const statusColors = {
        ordered: 'blue',
        shipped: 'orange',
        delivered: 'green',
      };
      
      const renderStatusCell = (status) => {
        // Use the status to look up the corresponding color from the dictionary
        const backgroundColor = statusColors[status] || 'white'; // Default to white if status is not found
      
        return (
          <p style={{ padding: '10px', background: backgroundColor, color:'white', width:'70px' }}>{status}</p>
        );
      };

    const tableHead = [
        { field: 'orderId', headerName: 'OrderID', width: 150 },
        { field: 'book', headerName: 'Product', width: 250 },
        { field: 'price', headerName: 'Price', width: 150 },
         { field:'status', headerName:'Status',width: 150, renderCell:(params)=>renderStatusCell(params.row.status) },
    ];


    return (
        <>
            <Grid container spacing={2} marginTop={8}>
                <Grid item xs={12} sm={12} md={12}>

                { orders.length >0 ? <DataTable columns={tableHead} rows={formatTheData(orders)} uniqueId='orderId' />:<DataTable columns={tableHead} rows={[]} uniqueId='orderId' /> }
                
                </Grid>
            </Grid>
        </>
    )
}

