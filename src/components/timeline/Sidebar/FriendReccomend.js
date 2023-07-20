import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Reccomend from './Reccomend'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import SimpleSnackbar from '../../Snackbar'
import { getReccomends, useSendRequest } from './apiCalls'
import { useQuery } from 'react-query'

export default function FriendReccomend({ openSnackbar, snackbarMessage, clickSnackbar, closeSnackbar }) {
    
    const people = useQuery('people', getReccomends)

    const { mutate:sendARequest } = useSendRequest()

    const sendRequest = async(id) =>{
        await sendARequest(id)
        await clickSnackbar('Request Sended')
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
            people?.isLoading
            ?
            <>
                <Typography variant='h6' marginBottom='1.5rem'>People you might know</Typography>
                <Box display='flex' gap='.5rem' marginBottom='1rem'>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                </Box>
                <Box display='flex' gap='.5rem' marginBottom='1rem'>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width:'12rem' }} />                    
                </Box>
            </>
            :
            <>
               <Typography variant='h6' marginBottom='1.5rem'>People you might know</Typography>
                {
                    people?.data?.users?.length < 1 
                    ?
                    <Typography>No user found to friend with you</Typography>
                    :
                    <>
                        {
                            people?.data?.users?.map((person) => {
                                return <Grid 
                                    key={person._id} 
                                    container 
                                    spacing={2} 
                                    direction='column'
                                >
                                    <Reccomend 
                                        person={person} 
                                        sendRequest={sendRequest}
                                    />
                                </Grid>
                            }) 
                        }                        
                    </>
                }
            </>

            }
  
        </>
    )
}