import React from "react"
import Grid from '@mui/material/Grid'
import Login from "../components/auth/Login"
import Hero from "../components/auth/Hero"
import Header from "../components/header/Header"

export default function LoginPage() {
    return(
        <>
        <Header />
        <Grid 
            sx={{
                display:"flex", 
                justifyContent:'center', 
                alignItems:'center' 
            }} 
            container 
            spacing={2}
        >
            <Grid item xs={12} md={6}>
                <Hero />
            </Grid>
            <Grid item xs={12} md={6} marginBottom='2rem'>
                <Login />
            </Grid>
        </Grid>        
        </>
    )
}