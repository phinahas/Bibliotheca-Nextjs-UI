"use client"

import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTables/DataTable'
import {  Grid, Button } from '@mui/material'
import axios from '@/axios';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function AdminVendorsPage() {

    const [vendors, setVendors] = useState([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false)
    const userFromRedux = useSelector((state) => state.user);
    const router = useRouter();


    useEffect(() => {

        if (!userFromRedux.user._id)
            router.push('/bib/signin')

        

        axios.get(`/admin/get-all-vendors?userId=${'admin'}`).then((response) => {
         
            if (response.status != 200) {
                window.alert(response.statusText);
                setVendors([]);

                return;
            }
            setVendors(response.data.vendors);
        }).catch((err) => {
            console.log(err);
            console.log(err.response)
            setVendors([]);

        })

    }, [useEffectRefresh])


      const vendorActionCell = ({vendorStatus,_id})=>{

        console.log(vendorStatus, _id);
        const fnCall = ()=>{
          axios.post('/admin/change-vendor-status',{
            status:!vendorStatus,
            vendorId:_id,
          }).then((response) => 
          {
            window.alert(response.data.message);
            setVendors(prevItems => {
              return prevItems.map(item => {
                console.log(_id,item._id)
                if (item._id === _id) {
                  // Update the status of the matching item
                  return { ...item, vendorStatus: !vendorStatus };
                }
                // Keep the other items unchanged
                return item;
              });
            });
          })
          .catch((error) => {window.alert(error.response.data.message)})
        }
        return (<>
        <Button variant='contained' onClick={fnCall}>{vendorStatus ? "Decline":"Approve"} Vendor</Button>
        </>)

      }

    const tableHead = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field:'action', headerName:'Action',width: 150, renderCell:(params)=>vendorActionCell(params.row) },
    ];


    return (
        <>
            <Grid container spacing={2} paddingTop={8}>
                <Grid item xs={12} sm={12} md={12}>

                { vendors.length >0 ? <DataTable columns={tableHead} rows={vendors} uniqueId='_id' />:<DataTable columns={tableHead} rows={[]} uniqueId='orderId' /> }
                
                </Grid>
            </Grid>
        </>
    )
}

