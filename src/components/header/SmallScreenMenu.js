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
                            onClick={()=>navigate('/timeline')}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            
                        >
                            <HomeIcon />
                            <Typography>Home</Typography>
                        </Grid>
                        <Grid
                            item 
                            xs={3}
                            onClick={()=>navigate(`/friends/${getCookie(' u')}`)}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <PeopleIcon />
                            <Typography>Friends</Typography>
                        </Grid>
                        <Grid
                            item 
                            xs={3}
                            onClick={()=>navigate('/profile')}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center'
                            }}                            
                        >
                            <AccountBoxIcon />
                            <Typography>Profile</Typography>
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