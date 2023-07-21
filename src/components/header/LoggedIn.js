import React from "react"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../../api";
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function LoggedIn({ isScreenSmall, isMenuOpen, setIsMenuOpen, logout }) {

    const isScreenBiggerThan1100px = useMediaQuery('(min-width:1100px)') 
    const navigate = useNavigate()

    return(
        <>
            {
                isScreenSmall
                ?
                    <Button onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                        {
                            isMenuOpen
                            ?
                            <MenuOpenIcon
                                sx={{
                                    fontSize:isScreenSmall ? '2rem' : '3rem', 
                                    color:'white',
                                                                                    
                                }} 
                            />                                                 
                            :
                            <MenuIcon
                                sx={{
                                    fontSize:isScreenSmall ? '2rem' : '3rem', 
                                    color:'white',                                                    
                                }} 
                            />                                                
                        }
                    </Button>                
                :
                <Grid
                    container
                    spacing={1} 
                    sx={{
                        color:'white',
                        display:'flex',
                        alignItems:'center',
                        
                    }}
                >
                    <Grid item xs={2}>

                    </Grid>
                    {/* Item 1 */}
                    <Grid 
                        item 
                        xs={2.5} 
                    >
                        <Link 
                            component={RouterLink} 
                            to='/timeline'                            
                            sx={{ 
                                cursor:'pointer', 
                                display:'flex', 
                                alignItems:'center', 
                                gap:'0.2rem',
                                color:'white',
                                '&:hover':{
                                    textDecoration:'none'
                                }                                
                            }}                            
                        >
                            <HomeIcon />
                            <Typography variant={isScreenBiggerThan1100px ? 'p' : 'caption'}>HOME</Typography>                            
                        </Link>

                    </Grid>
                    {/* Item 2 */}
                    <Grid 
                        item 
                        xs={2.5} 
                    >
                        <Link
                            component={RouterLink} 
                            to={`/friends/${getCookie(' u')}`}                          
                            sx={{ 
                                cursor:'pointer', 
                                display:'flex', 
                                alignItems:'center', 
                                gap:'0.2rem',
                                color:'white',
                                '&:hover':{
                                    textDecoration:'none'
                                }                                
                            }}                            
                        >
                            <PeopleIcon />
                            <Typography variant={isScreenBiggerThan1100px ? 'p' : 'caption'}>FRIENDS</Typography>                            
                        </Link>

                    </Grid>  
                    {/* Item 3 */}   
                    <Grid 
                        item 
                        xs={2.5}                         
                    >
                        <Link
                            component={RouterLink} 
                            to={`/profile/${getCookie(' u')}`}                          
                            sx={{ 
                                cursor:'pointer', 
                                display:'flex', 
                                alignItems:'center', 
                                gap:'0.2rem',
                                color:'white',
                                '&:hover':{
                                    textDecoration:'none'
                                }                                
                            }}                         
                        >
                            <AccountBoxIcon />
                            <Typography variant={isScreenBiggerThan1100px ? 'p' : 'caption'}>PROFILE</Typography>                            
                        </Link>

                    </Grid> 
                    {/* Item 4 */}
                    <Grid 
                        item 
                        xs={2.5} 
                        onClick={logout}
                        sx={{ 
                            cursor:'pointer', 
                            display:'flex', 
                            alignItems:'center', 
                            gap:'0.1rem' 
                        }}
                    >
                        <LogoutIcon />
                        <Typography variant={isScreenBiggerThan1100px ? 'p' : 'caption'}>LOGOUT</Typography>
                    </Grid>      
                                                     
                </Grid>
            }             
        </>
    )
}