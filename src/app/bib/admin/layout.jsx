"use client"
import React, { useEffect, useState } from 'react'
import AppBarComponent from '@/components/AppBar/AppBarComponent'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, setLoginState } from '@/Redux/UserSlice';
import axios from '@/axios';

function AdminLayout({ children }) {

  const dispatch = useDispatch();
  const router = useRouter();
  let tokenFromLS;
  if (typeof window !== 'undefined') {
     tokenFromLS = localStorage.getItem('tokenBS');
  }
  
 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.post('/getUser', { token: tokenFromLS });
        dispatch(setLoginState(true));
        dispatch(addUser(response.data.user));
      
        if (response.data.user.role != 'admin') {
       
           router.push('/bib/dashboard/books');
        } 
        setIsLoading(false);

      } catch (error) {
        console.log(error.response);
        setIsLoading(false)
        router.push('/bib/signin');
      }
    }

    if (tokenFromLS) {
      fetchData();
    } else {
      router.push('/bib/signin');
    }
  }, [dispatch, router, tokenFromLS]);


  // const userFromRedux = useSelector((state) => state.user);
  // if (userFromRedux.user.role != 'admin') {
  //   router.push('/signin');
  //   return null;
  // }


  const adminNavs = [
    {
      title: 'Books',
      path: '/bib/admin/books'
    },
    {
      title: 'Users',
      path: '/bib/admin/users'
    },
    {
      title: 'Orders',
      path: '/bib/admin/orders'
    },
    {
      title: 'Vendors',
      path: '/bib/admin/vendors'
    }
  ]

  return (
    <>
      {
        isLoading ? null : <>
          <AppBarComponent barColor='red' pages={adminNavs} isAdmin />
          {children}</>
      }

    </>
  )
}

export default AdminLayout;

// here is the admin layout for the admin component. 
// can update the code/layout accordingly. This code or component will update accordingly.


