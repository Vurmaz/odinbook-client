import Grid from "@mui/material/Grid"
import React from "react"
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function Reccomend({ person, sendRequest }) {

    const navigate = useNavigate()
    
    return(
        <>
            <Grid 
                container 
                spacing={2} 
                item 
                xs={12} 
                paddingInline={1} 
                paddingBottom={3}
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Grid item xs={3}>
                    <Link
                        component={RouterLink}
                        to={`/profile/${person._id}`}
                    >
                        <Avatar 
                            src={person.profilePhoto}                             
                            sx={{ 
                                width:50, 
                                height:50,
                                cursor:'pointer',
                                '&:hover':{
                                    scale:'1.2'
                                },
                                transition:'scale 300ms ease'
                            }}
                        />                        
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Link
                        component={RouterLink}
                        to={`/profile/${person._id}`}
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
                                },
                                transition:'all 300ms ease'
                            }}
                        >
                            {person.username}
                        </Typography>                        
                    </Link>

                </Grid>
                <Grid item xs={3}>
                    <Tooltip title='SEND REQUEST'>
                        <Button onClick={() => sendRequest(person._id)}>
                            <AddCircleOutlineIcon fontSize="large" sx={{ color:'green' }} />   
                        </Button>                        
                    </Tooltip>
                    
                </Grid>
            </Grid>
        </>
    )
}