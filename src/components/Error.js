import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Header from './header/Header'

export default function Error() {
    return(
        <>
            <Header />
            <Box
                sx={{
                    margin:'2rem'
                }}
            >
                <Typography variant='h4'>Oops! You seem to be lost.</Typography>
                <Link to='/timeline'>Home</Link>                
            </Box>


        </>
    )
}