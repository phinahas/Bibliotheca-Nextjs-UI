"use client"

import { useEffect, useState } from 'react';
import CardComponent from '@/components/Card/CardComponent';
import { Stack, Grid } from '@mui/material'
import axios from '@/axios';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import SideFilterBarComponent from '@/components/SideFilterBar/SideFilterBarComponent'


export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [paginationLoading,setPaginationLoading] = useState(false);
    const [pageNumber,setPageNumber] = useState(1);
    const [limit,setLimit] = useState(5);
    const [hasMoreData,setHasMoreData] = useState(true);

    const handleScroll = () => {
        if (!loading && hasMoreData && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
          setPageNumber(pageNumber + 1);
        }
      };
      
      useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [pageNumber, paginationLoading, hasMoreData]);


    useEffect(() => {

       if(pageNumber == 1) {setLoading(true);}
        setPaginationLoading(true)
        axios.get(`/get-books?page=${pageNumber}&limit=${limit}`).then((response) => {
            if (response.status != 200) {
                setLoading(false)
                setPaginationLoading(false)
                setHasMoreData(false);
                if(pageNumber == 1){
                    window.alert(response.statusText);
                    setBooks([]);
                    return;

                }
                return;
            }
            setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
            setLoading(false);
            setPaginationLoading(false)


        }).catch((err) => {
            window.alert(err.response);
            setLoading(false);
            setPaginationLoading(false)


        })

    }, [pageNumber])


    const userFromRedux = useSelector((state) => state.user);
    const router = useRouter();

    const addToCartFunction = (bookId) => {
        if (!userFromRedux.user._id)
            router.push('/bib/signin')

        axios.post('/add-to-cart', {
            bookId: bookId,
            userId: userFromRedux.user._id
        }).then((response) => {
            window.alert(response.data.message);
        }).catch((error) => {
            console.log(error);
            window.alert(error.response.data.message);
        });
    }

    const getKeyWord = (keyword) => {

        console.log(keyword);

        
        setLoading(true);

            axios.get(`/get-searched-book?keyword=${keyword}`).then((response) => {
                if (response.status != 200) {
                setLoading(false)
                    window.alert("no content");
                    return;
                }
                console.log(response.data.book);
                setBooks(response.data.book)
                setLoading(false)


            }).catch((error) => {
                console.error(error);
                window.alert(error);
            setLoading(false)

            });

    

    }


    const buyProduct = (bookId) => {
        axios.post('/buy-product', {
            productId: bookId,
            userId: userFromRedux.user._id
        }).then((response) => {
            window.alert(response.data.message);
        }).catch((error) => {
            console.log(error);
            window.alert(error.response.data.message);
        });
    }

    return (
        <>
            <Grid container >
                <Grid item md={2}>
                    <SideFilterBarComponent onChangeFn={getKeyWord} />
                </Grid>
                <Grid item md={10} >
                    <Grid container spacing={2} marginTop={8}>
                        {loading ? <h2>LOADING....Please wait..</h2>:<>{books.map((book) => (
                            <Grid item md={3} key={book._id}>
                                <CardComponent
                                    bookId={book._id}
                                    name={book.name}
                                    author={book.author}
                                    image={book.image}
                                    description={book.description}
                                    price={book.price}
                                    addToCartFunction={addToCartFunction}
                                    buyFunction={buyProduct}
                                />
                            </Grid>
                        ))}</>}
                        {paginationLoading ? <><h3>Loading...</h3></>:null}                  
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


// In this page pagination is added. using the concept of infienity scrolling.
// the concept of pagination is gainned by 