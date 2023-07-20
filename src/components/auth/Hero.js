import React from "react"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function Hero() {
    return(
        <Box 
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:'1rem',
                marginTop:'2rem'
            }}>
            <Typography textAlign='center' variant='h3'>ODİNBOOK</Typography>
            <Typography textAlign='center' variant='h6'>CONNECT WITH YOUR FRIENDS</Typography>
        </Box>
    )
}