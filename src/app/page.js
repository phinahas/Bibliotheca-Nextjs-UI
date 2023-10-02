"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, setLoginState } from '@/Redux/UserSlice';
import axios from '@/axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  let tokenFromLS;
  if(typeof window !== 'undefined'){

     tokenFromLS = localStorage.getItem('tokenBS');
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await axios.post('/getUser', { token: tokenFromLS });
     
        dispatch(setLoginState(true));
        dispatch(addUser(response.data.user));
        if (response.data.user.role === 'admin') {
          router.push('/bib/admin');
        } else {
          router.push('/bib/dashboard/books');
        }
        setIsLoading(false)

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

  return (

    <div>
      {isLoading ? null:null}
    </div>
  );
}
