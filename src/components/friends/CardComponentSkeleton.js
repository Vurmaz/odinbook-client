import React from "react"
import Grid from '@mui/material/Grid'
import Skeleton from "@mui/material/Skeleton";

export default function CardComponentSkeleton() {
    return(
        <>
            <Grid 
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'2rem',
                    marginInline:'auto'
                }}
            >
                <Skeleton variant="rectangular" width={330} height='90%' />
                <Skeleton variant="rectangular" width={330} height='90%' />                        
            </Grid>            
        </>
    )
}