import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { API, eraseCookie, getCookie } from "../../api";
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import SmallScreenMenu from "./SmallScreenMenu";
import LoggedIn from "./LoggedIn";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function Header() {
    
    const isScreenSmall = useMediaQuery('(max-width:700px)')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const logout = async() => {
        eraseCookie(' u')
        eraseCookie(' ah')
        await axios.get(`${API}/auth/logout`, { withCredentials:true })
        window.location.href='/login'
    }

    useEffect(() => {
        if(!isScreenSmall){
            setIsMenuOpen(false)
        }
    }, [isScreenSmall])
    
    return(
        <CssBaseline>
            <Box sx={{ flexGrow:1 }}>
                <AppBar position="static" sx={{ paddingTop:'0.7rem', paddingBottom:'0.7rem' }}>
                    <Toolbar>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Box
                                    sx={{
                                        display:'flex',
                                        flexDirection:'row',
                                        alignItems:'flex-end',
                                        gap:'0.5rem',                                        
                                    }}
                                >
                                    <PublicIcon                                                                       
                                        sx={{
                                            fontSize:isScreenSmall ? '2rem' : '3rem',
                                            cursor:'pointer'
                                        }}                                    
                                    />
                                    <Link 
                                        textAlign={isScreenSmall ? 'center' : 'none'} 
                                        variant={isScreenSmall ? 'h5' : 'h4'}
                                        component={RouterLink}                                        
                                        to='/timeline'
                                        sx={{
                                            cursor:'pointer',
                                            color:'white',
                                            '&:hover':{
                                                textDecoration:'none'
                                            }
                                        }}
                                    >   ODINBOOK
                                    </Link>
                                </Box> 
                            </Grid>
                            <Grid 
                                item 
                                xs={8}
                                sx={{
                                    display:'flex',
                                    justifyContent:'flex-end'
                                }}
                            >
                                {
                                    getCookie(' u')
                                    ?                            
                                    <LoggedIn 
                                        isScreenSmall={isScreenSmall} 
                                        isMenuOpen={isMenuOpen} 
                                        setIsMenuOpen={setIsMenuOpen}
                                        logout={logout} 
                                    />                                                                                   
                                    :
                                    null
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>                
            </Box> 
            <SmallScreenMenu isMenuOpen={isMenuOpen} logout={logout} />            
        </CssBaseline>
    )
}