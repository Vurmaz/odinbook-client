import React from "react";
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { theme } from '../../assets/theme'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../../api";
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function SmallScreenMenu({ isMenuOpen, logout }) {
    
    const navigate = useNavigate()

    return(
        <>
            {
                isMenuOpen 
                ? 
                    <Grid 
                        container
                        spacing={1}
                        className='slideDownAnimation'
                        sx={{
                            minWidth:'100%',
                            height:'100px',
                            background:theme.palette.primary.main,
                            color:'white',
                            padding:'0.3rem',
                        }}
                    >
                        <Grid 
                            item
                            xs={3}
                            
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <Link
                                component={RouterLink} 
                                to='/timeline'                            
                                sx={{ 
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center', 
                                    color:'white',
                                    '&:hover':{
                                        textDecoration:'none'
                                    }                                
                                }}                             
                            >
                                <HomeIcon />
                                <Typography>Home</Typography>                                
                            </Link>

                        </Grid>
                        <Grid
                            item 
                            xs={3}                            
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <Link
                                component={RouterLink} 
                                to={`/friends/${getCookie(' u')}`}                           
                                sx={{ 
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center', 
                                    color:'white',
                                    '&:hover':{
                                        textDecoration:'none'
                                    }                                
                                }}                            
                            >
                                <PeopleIcon />
                                <Typography>Friends</Typography>                                
                            </Link>

                        </Grid>
                        <Grid
                            item 
                            xs={3}                            
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <Link
                                component={RouterLink} 
                                to='/profile'                          
                                sx={{ 
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center', 
                                    color:'white',
                                    '&:hover':{
                                        textDecoration:'none'
                                    }                                
                                }}                            
                            >
                                <AccountBoxIcon />
                                <Typography>Profile</Typography>                                
                            </Link>

                        </Grid>
                        <Grid
                            item 
                            xs={3}
                            onClick={logout}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <LogoutIcon />
                            <Typography>Logout</Typography>
                        </Grid>                                                
                    </Grid>                
                : 
                    null
            }            
        </>
    )
}