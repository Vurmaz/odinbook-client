import React from "react"
import Grid from '@mui/material/Grid'
import Posts from "../components/timeline/Posts"
import CreatePost from '../components/timeline/CreatePost'
import Sidebar from "../components/timeline/Sidebar/Sidebar"
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../components/header/Header"

export default function TimelinePage() {

    const isScreenSmall = useMediaQuery('(max-width:700px)')
    
    return(
        <>
            <Header />
            <Grid 
                container 
                spacing={3} 
                sx={{ 
                    display:'flex', 
                    justifyContent:'center' 
                }}
            >            
                <>
                {
                    isScreenSmall
                    ?
                    <>
                        <Grid item xs={12} >   
                            <Sidebar />                     
                            <CreatePost />
                            <Posts /> 
                        </Grid>                        
                    </>                    
                    :
                    <>
                        <Grid item xs={12} sm={isScreenSmall ? 12 : 7.8}>                        
                            <CreatePost />
                            <Posts /> 
                        </Grid>
                        <Grid item xs={12} sm={isScreenSmall ? 12 : 4} lg={isScreenSmall ? 12 : 3}>
                            <Sidebar />
                        </Grid>                         
                    </>
                }                   
                </>
            </Grid>
 
        </>
    )
}