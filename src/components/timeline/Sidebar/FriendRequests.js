import React from "react"
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import Grid from '@mui/material/Grid'
import { theme } from "../../../assets/theme"
import SimpleSnackbar from '../../Snackbar'
import Skeleton from "@mui/material/Skeleton"
import { getRequests, useAcceptRequest, useRejectFriendRequest } from "./apiCalls"
import Request from "./Request";
import { useQuery } from 'react-query'


export default function FriendRequest({ openSnackbar, snackbarMessage, clickSnackbar, closeSnackbar }) {
    
    const requests = useQuery('request', getRequests)
    
    const { mutate:acceptARequest } = useAcceptRequest()

    const { mutate:rejectARequest } = useRejectFriendRequest()
    

    const acceptRequest = async(id) => {
        await acceptARequest(id)
        await clickSnackbar('Request Aceepted')
    }

    const rejectFriendsRequest = async(id) =>{
        await rejectARequest(id)
        await clickSnackbar('Request Rejected')
    }   
    return(
        <>
            <SimpleSnackbar
                openSnackbar={openSnackbar} 
                message={snackbarMessage}
                clickSnackbar={clickSnackbar}
                closeSnackbar={closeSnackbar}            
            />
            {
                requests?.isLoading
                ?
                    <Box 
                        sx={{ 
                            padding:'1rem',
                            background:theme.palette.fifth.main, 
                        }}
                    >                         
                        <Typography variant='h6' marginBottom='1.5rem'>People you might know</Typography>
                        <Box display='flex' gap='.5rem' marginBottom='1rem'>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                        </Box>
                        <Box display='flex' gap='.5rem' marginBottom='1rem'>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                        </Box>                                               
                    </Box>                
                :
                    <Box 
                        sx={{ 
                            padding:'1rem',
                            background:theme.palette.fifth.main, 
                        }}
                    >
                    {
                        requests?.data?.user?.length < 1 
                        ?
                        <Typography variant="p">No Friend Requests</Typography>
                        :
                        <>
                        <Typography variant='h6' marginBottom={2}>Friend Request</Typography>
                            {
                                requests?.data?.user?.map((friend) => {
                                    return <Grid 
                                        container 
                                        direction='column' 
                                        spacing={2} 
                                        key={friend._id}
                                    >
                                        <Request                                             
                                            friend={friend} 
                                            acceptRequest={acceptRequest} 
                                            rejectFriendsRequest={rejectFriendsRequest} 
                                        />                                    
                                    </Grid> 
                                })
                            }
                        </>
                    }


                    </Box>

            }
            {/* {
                !requests?.isLoading
                ?
                <>
                    <Box 
                        sx={{ 
                            padding:'1rem',
                            background:theme.palette.fifth.main, 
                        }}
                    >                         
                        <Typography variant='h6' marginBottom='1.5rem'>People you might know</Typography>
                        <Box display='flex' gap='.5rem' marginBottom='1rem'>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                        </Box>
                        <Box display='flex' gap='.5rem' marginBottom='1rem'>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                        </Box>                                               
                    </Box>                    
                </>
                :
                <Box 
                    sx={{ 
                        padding:'1rem',
                        background:theme.palette.fifth.main, 
                    }}
                >
                    {
                        requests?.data?.user?.length < 1 
                        ? 
                        <Typography variant="p">No Friend Requests</Typography>
                        :
                        <>
                        <Typography variant='h6' marginBottom={2}>Friend Request</Typography>
                            {
                                requests?.map((friend) => {
                                    return <Grid container direction='column' spacing={2} key={friend._id}>
                                        <Request                                             
                                            friend={friend} 
                                            acceptRequest={acceptRequest} 
                                            rejectFriendsRequest={rejectFriendsRequest} 
                                        />                                    
                                    </Grid> 
                                })
                            }
                        </>
                    }
                </Box> 
            } */}
        </>
    )
}