"use client"

import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTables/DataTable'
import {  Grid } from '@mui/material'
import axios from '@/axios';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
const {formatTheData} = require('@/utils/commonFns')

export default function AdminOrderPage() {

    const [orders, setOrders] = useState([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false)
    const userFromRedux = useSelector((state) => state.user);
    const router = useRouter();


    useEffect(() => {

        if (!userFromRedux.user._id)
            router.push('/bib/signin')

        

        axios.get(`/admin/get-orders?userId=${'admin'}`).then((response) => {
         
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
      
      const renderStatusCell = ({status,orderId}) => {
        const [orderStatusState, setStatus] = useState(status);
      
        // Define the list of status options
        const statusOptions = ['ordered', 'shipped', 'delivered'];
      
        const handleStatusChange = (event) => {
         
          // Update the status when the dropdown value changes
          setStatus(event.target.value);
          axios.post('/admin/change-order-status',{
            status:event.target.value,
            orderId:orderId,
          }).then((response) => {window.alert(response.data.message)}).catch((error) => {window.alert(error.response.data.message)})
        };
      
        return (
          <select value={orderStatusState} onChange={handleStatusChange}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      };

    const tableHead = [
        { field: 'orderId', headerName: 'OrderID', width: 150 },
        { field: 'user', headerName: 'User', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'book', headerName: 'Product', width: 250 },
        { field: 'price', headerName: 'Price', width: 150 },
         { field:'status', headerName:'Status',width: 150, renderCell:(params)=>renderStatusCell(params.row) },
    ];


    return (
        <>
            <Grid container spacing={2} paddingTop={8}>
                <Grid item xs={12} sm={12} md={12}>

                { orders.length >0 ? <DataTable columns={tableHead} rows={formatTheData(orders)} uniqueId='orderId' />:<DataTable columns={tableHead} rows={[]} uniqueId='orderId' /> }
                
                </Grid>
            </Grid>
        </>
    )
}

