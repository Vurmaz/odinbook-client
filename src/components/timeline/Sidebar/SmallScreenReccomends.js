import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getReccomends, useSendRequest } from './apiCalls'
import { theme } from '../../../assets/theme'
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";


export default function SmallScreenReccomends() {
    
    const navigate = useNavigate()
    
    const people = useQuery('people', getReccomends)

    const { mutate: sendARequest } = useSendRequest()
    
    const sendRequest = async(id) => {
        await sendARequest(id)
    }
    
    return(
        <>
            {
                people?.data?.users?.length < 1
                ?
                null
                :   
                <Grid
                    item
                    xs={12}
                    sx={{
                        bgcolor:theme.palette.fifth.main,
                        marginBottom:'1rem'
                    }}                    
                >
                    <Typography                 
                        variant='h5' 
                        marginLeft={2} 
                        marginBottom={3}
                        paddingTop={1}
                    >   People you might know
                    </Typography>
                    <Grid 
                        container 
                        spacing={2} 
                        direction='row' 
                        sx={{   
                            maxHeight:'200px', 
                            display:'flex',
                            flexDirection:'column',
                            overflow:'auto',                                                                          
                        }}
                    >
                        <Box 
                            sx={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'space-between',
                                position:'absolute',                                
                            }}
                        >                                     
                        </Box>
                        {
                            people?.data?.users?.map((person) => {
                                return<>
                                    <Grid 
                                        key={person._id}
                                        item 
                                        xs={12} 
                                        sx={{ 
                                            display:'flex', 
                                            alignItems:'center', 
                                            flexDirection:'column' ,
                                            padding:'2rem',
                                            justifyContent:'center',                                            
                                            height:'45%',
                                            width:'45%',
                                            marginLeft:'5%',
                                            gap:'.5rem'  
                                        }}
                                    >
                                        <Link
                                            component={RouterLink}
                                            to={`/profile/${person._id}`}
                                        >
                                            <Avatar 
                                                src={person.profilePhoto}                                                 
                                                sx={{ 
                                                    width:75, 
                                                    height:75,
                                                    cursor:'pointer',
                                                    '&:hover':{
                                                        scale:'1.2'
                                                    },
                                                    transition:'scale 300ms ease'                                         
                                                }}                                         
                                            />                                            
                                        </Link>
                                        <Link
                                            component={RouterLink}
                                            to={`/profile/${person._id}`}
                                            sx={{
                                                color:'black',
                                                'textDecoration':'none'
                                            }}
                                        >
                                            <Typography                                                 
                                                sx={{
                                                    cursor:'pointer',
                                                    '&:hover':{
                                                        textDecoration:'underline'
                                                    }
                                                }}
                                            >
                                                {person.username}
                                            </Typography>                                            
                                        </Link>

                                        <Button
                                            onClick={() => sendRequest(person._id)}
                                        >
                                            <PersonAddIcon />
                                        </Button>
                                    </Grid>
                                </>
                            })
                        }
                    </Grid>                                       
                </Grid>         
                


                    
                }

        </>
    )
}