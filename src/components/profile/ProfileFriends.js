import React from "react"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useQuery } from "react-query"
import { getAllFriends } from "./apiCalls"
import { getCookie } from '../../api'
import { useDeleteFriend } from '../friends/apiCalls'



export default function ProfileFriends({ params }) {
    const loadingArray = [0, 1, 2]
    
    const navigateProfile = (data) => {
        window.location.href = `https://localhost:3000/profile/${data._id}`
    }

    const allFriends = useQuery('allFriends', () => getAllFriends(params))

    const { mutate : deleteAFriend } = useDeleteFriend()

    const deleteFriend = async(data) =>{
        await deleteAFriend(data)
    }
    
    
    return(
        <>  
            <Grid 
                container 
                spacing={2}
                sx={{
                    marginTop:'0.5rem',
                    marginBottom:'0.5rem',                    
                }}
            >
            {
                allFriends?.isAllFriendsLoading
                ?
                <Box sx={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                    {
                        loadingArray?.map((item)=>{
                            return(
                                <Box key={item} sx={{ display:'flex', flexDirection:'row', marginLeft:'2rem', gap:'0.5rem' }}>
                                    <Skeleton variant="circular" sx={{ width:45, height:45, marginInline:'auto' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width:'15rem' }} />
                                </Box>                        )
                        })                        
                    }                                                      
                </Box>
                :
                allFriends?.data?.data?.friends?.length < 1 
                ?
                <Typography marginLeft={4} variant='h6'>You have 0 friends</Typography>
                :
                allFriends?.data?.data?.friends?.map((friend) => {
                    return(
                        <Grid 
                            item 
                            key={friend._id}
                            container
                            gap={1}
                            xs={12}
                            padding={1}                            
                        > 
                            <Grid 
                                item 
                                xs={3}
                                sx={{
                                    display:'flex',
                                    justifyContent:'flex-start',
                                    marginLeft:'1rem',                                   
                                }}
                            >
                                <Avatar 
                                    src={friend.profilePhoto}
                                    onClick={()=> navigateProfile(friend)}
                                    sx={{ 
                                        width:60, 
                                        height:60,
                                        cursor:'pointer',
                                        '&:hover':{
                                            scale:'1.2'
                                        },
                                        transition:'scale 300ms ease'
                                    }}                                    
                                />
                            </Grid>
                            <Grid 
                                item 
                                xs={5}
                                sx={{
                                    display:'flex',
                                    alignItems:'center'
                                }}
                            >
                                <Typography 
                                    variant="h6"
                                    onClick={()=> navigateProfile(friend)}
                                    sx={{ 
                                        cursor:'pointer',
                                        '&:hover':{
                                            textDecoration:'underline'
                                        },                                        
                                    }}                                    
                                >
                                    {friend.username}
                                </Typography>
                            </Grid>
                            {
                                getCookie(' u') === params.id
                                ?
                                <Grid
                                    item 
                                    xs={2}
                                    sx={{
                                        display:'flex',
                                        justifyContent:'flex-start',
                                        alignItems:'center'                                   
                                    }}                            
                                >
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => deleteFriend(friend)}>
                                            <DeleteForeverIcon /> 
                                        </IconButton>
                                    </Tooltip>
                                    
                                </Grid>                                
                                :
                                null
                            }

                        </Grid>                        
                    ) 
                })                 
            }                
            </Grid>
        </>
    )
}