import React from "react"
import Grid from '@mui/material/Grid'
import { useParams } from "react-router-dom"
import Intro from "../components/profile/Intro"
import { getCookie } from "../api"
import { theme } from "../assets/theme"
import CreatePost from "../components/timeline/CreatePost"
import UserPosts from '../components/profile/UserPosts'
import useMediaQuery from '@mui/material/useMediaQuery'
import ProfileFriends from "../components/profile/ProfileFriends"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { getUserInfo } from "../components/profile/apiCalls"
import Header from "../components/header/Header"

export default function Profile() {
    const params = useParams()
    const navigate = useNavigate()
     
    const userInfo = useQuery('user', ()=> getUserInfo(params))
      
    const isScreenSmall = useMediaQuery('(max-width:700px)')  
    
    return(
        <>
        <Header />
            <Grid container spacing={2} marginBottom='2rem'>
                <Grid
                    item
                    xs={12}
                    sm={11}
                    md={6}
                    sx={{
                        marginInline:'auto',
                        marginTop:'2rem',
                        boxShadow:'0px 0px 5px 0px rgba(0,0,0,0.75)',
                        borderRadius:'8px', 
                        backgroundColor:theme.palette.fifth.main                       
                    }}
                >
                    <Intro userInfo={userInfo} />
                </Grid>
                <Grid
                    item
                    container
                    xs={11.5}
                    sm={12}
                    md={11}
                    sx={{
                        marginInline:'auto',
                        marginTop:'1rem',   
                        justifyContent:'center'                  
                    }}   
                    gap={1}                
                >
                    <Grid 
                        item 
                        xs={12}
                        sm={7} 
                        md={7}                        
                        sx={{
                            border:'1px solid',
                            borderRadius:'8px',
                            backgroundColor:`${theme.palette.fifth.main}`,
                            boxShadow:'0px 0px 5px 0px rgba(0,0,0,0.75)',                                                        
                        }}    
                    >   
                        {
                            userInfo?.data?.data?.user._id === getCookie(' u')
                            ?
                            <>
                                <CreatePost />
                                <hr color="black" />                                
                            </>
                            :
                            null
                        }                                                
                        <UserPosts params={params} />
                    </Grid>
                    {
                        isScreenSmall 
                        ? 
                        null
                        :
                        <Grid 
                            container
                            item 
                            xs={4.5}
                            sm={4.5}
                            sx={{
                                border:'1px solid',
                                borderRadius:'8px',
                                backgroundColor:`${theme.palette.fifth.main}`,
                                height:'fit-content',
                                boxShadow:' 0px 0px 5px 0px rgba(0,0,0,0.75)'
                            }}                         
                        >
                            <Typography 
                                variant="h4"
                                onClick={()=>navigate(`/friends/${params.id}`)}
                                sx={{
                                    marginLeft:'0.5rem',
                                    marginTop:'0.5rem',
                                    cursor:'pointer',
                                    '&:hover':{
                                        textDecoration:'underline'
                                    }                                    
                                }}
                            >
                                Friends
                            </Typography>    
                            <ProfileFriends params={params} />
                        </Grid>                        
                    }
                </Grid>
            </Grid>
        </>
    )
}