"use client"

import  React , {useState}from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function MaxWidthDialog({openStatus, closeFunction, setBookNameFn, setAuthorFn, setDescriptionFn,setImageFn, createBookFnCall}) {
 
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [price, setBookPrice] = useState(0);

const addButton = ()=>{

  let bookObj = {
    bookName:bookName,
    description:bookDescription,
    author:bookAuthor,
    image:bookImage,
    price:price
  }

  createBookFnCall(bookObj);
  

}

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openStatus}
        onClose={closeFunction}
      >
        <DialogTitle>Add new book</DialogTitle>
        <DialogContent>
          
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <TextField placeholder='Book Name' onChange={(e)=>setBookName(e.target.value)} />
            <TextField placeholder='Book Author' onChange={(e)=>setBookAuthor(e.target.value)} sx={{marginTop:'6px'}} />
            <TextField placeholder='Book Description' onChange={(e)=>setBookDescription(e.target.value)} sx={{marginTop:'6px'}} />
            <TextField placeholder='Book Image' onChange={(e)=>setBookImage(e.target.value)} sx={{marginTop:'6px'}} />
            <TextField placeholder='Book Price' onChange={(e)=>setBookPrice(e.target.value)} sx={{marginTop:'6px'}} />

            <Button variant='contained' sx={{marginTop:'10px'}} onClick={addButton}>Add</Button>


          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFunction}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}