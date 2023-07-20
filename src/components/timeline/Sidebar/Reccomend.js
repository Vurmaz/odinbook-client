import Grid from "@mui/material/Grid"
import React from "react"
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

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
                    <Avatar 
                        src={person.profilePhoto} 
                        onClick={()=>navigate(`/profile/${person._id}`)}
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
                </Grid>
                <Grid item xs={5}>
                    <Typography 
                        variant='p'
                        onClick={()=>navigate(`/profile/${person._id}`)}
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