import React from "react"
import Box from '@mui/material/Box'

export default function ImageComponent({ params, image }) {
    
    return(
        <>
            <Box
                sx={{
                    top:'0',
                    left:'0',
                    right:'0',
                    bottom:'0',
                    zIndex:'2',
                    width:'100%',
                    height:'100%',
                    position:'fixed',
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    display:'flex',
                    justifyContent:'center'
                }}
            >
                <Box sx={{
                    width:'auto',
                    height:'100%',
                }}>
                    <img src={image} alt='post'></img>
                </Box>
                
            </Box>
            
        </>
    )
}