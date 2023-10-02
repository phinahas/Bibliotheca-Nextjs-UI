// sx={{ position: 'absolute', bottom: 16, right: 16 }}
"use client"

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material'

export default function BasicMenu({onChangeFn}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 395, left: 16, height: '100px', border: '1px solid black', background: 'white' }}>
            <h2>Search books 🔎</h2>
            <input type="text" onChange={(e)=>{onChangeFn(e.target.value)}} />
        </Box>
    );
}