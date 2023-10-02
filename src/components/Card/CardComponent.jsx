import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ bookId, name, description, image, price, author, adminPage = false, buyFunction, addToCartFunction, remvoeFromCartFunction, bookStatus, bookStatusTag, changeStatusFnCall }) {
  console.log(bookStatus)
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={name}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <p ><span>Author:&nbsp;</span> <span style={{ fontStyle: 'italic' }}>{author}</span> </p>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <br />
        <span>
          <span>Price &nbsp;:&nbsp;</span>
          <span style={{ color: 'green', padding: '5px', fontStyle: 'bold', borderRadius: '4px' }}> {price}</span>
        </span>
      </CardContent>
      {adminPage ? null : <CardActions>
        {buyFunction ? <Button size="small" onClick={() => { buyFunction(bookId) }}>Buy</Button> : null}
        {addToCartFunction ? <Button size="small" onClick={() => { addToCartFunction(bookId) }}>Add to cart</Button> : null}
        {remvoeFromCartFunction ? <Button size="small" onClick={() => { remvoeFromCartFunction(bookId) }}>Remove from cart</Button> : null}
      </CardActions>}
      {bookStatusTag ? <CardActions>
        <span style={{ color: bookStatus ? 'green' : 'red' }}>{bookStatus ? 'available' : 'hidden'}</span>&nbsp;
        <span>  <Button variant='contained' onClick={()=>{changeStatusFnCall(bookId,!bookStatus)}}>change to : {!bookStatus ? 'available' : 'hidden' } </Button>  </span>
      </CardActions> : null}



    </Card>
  );
}