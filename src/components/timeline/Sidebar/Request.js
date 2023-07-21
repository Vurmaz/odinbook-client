import React from "react"
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function Request({ friend, acceptRequest, rejectFriendsRequest }) {    
    
    return(
        <>
            <Grid container spacing={2} item xs={12}  paddingInline={1} paddingBottom={3} >
                <Grid 
                    container
                    item 
                    xs={12}
                    sx={{ 
                        display:'flex', 
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Grid item xs={2.5}>
                        <Link
                            component={RouterLink}
                            to={`/profile/${friend._id}`}
                        >
                            <Avatar 
                                src={friend.profilePhoto}   
                                sx={{
                                    cursor:'pointer',
                                    '&:hover':{
                                        scale:'1.2'
                                    },
                                    transition:'scale 300ms ease'                                
                                }}
                            />                            
                        </Link>

                    </Grid>
                    <Grid item xs={6}>
                        <Link
                            component={RouterLink}
                            to={`/profile/${friend._id}`}
                            sx={{
                                color:'black',
                                textDecoration:'none'
                            }}                            
                        >
                            <Typography 
                                variant='p'                                
                                sx={{
                                    cursor:'pointer',
                                    '&:hover':{
                                        textDecoration:'underline'
                                    }
                                }}
                            >
                                {friend.username}
                            </Typography>                              
                        </Link>

                    </Grid>
                    <Grid item xs={3.5} sx={{display:'flex', gap:'0.1rem'}}>
                        <Tooltip title='ACCEPT'>
                            <StayledButton onClick={()=>acceptRequest(friend._id)} >
                                <CheckIcon color='success' />
                            </StayledButton>                            
                        </Tooltip>
                        <Tooltip title='REJECT'>
                            <StayledButton onClick={()=>rejectFriendsRequest(friend._id)}>
                                <HighlightOffIcon variant='contained' color='error' size="small" />
                            </StayledButton>                            
                        </Tooltip>

                    </Grid>               
                </Grid>                                      
            </Grid>
        </>
    )
}

const StayledButton = styled(Button)(({ theme }) => ({
  fontSize:'0.5rem',
  minWidth:'30px',
  padding:'0.5rem',
  borderRadius:'4px',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));