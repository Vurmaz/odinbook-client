import React, { useState } from "react";
import Grid from '@mui/material/Grid'
import FriendRequest from "./FriendRequests";
import FriendReccomend from "./FriendReccomend";
import useMediaQuery from '@mui/material/useMediaQuery'
import { theme } from "../../../assets/theme";
import SmallScreenReccomens from "./SmallScreenReccomends";

export default function Sidebar() {

    const isScreenSmall = useMediaQuery('(max-width:700px)')  

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const clickSnackbar = (message) => {
      setSnackbarMessage(message)
      setOpenSnackbar(true)
    }
    
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarMessage('')
        setOpenSnackbar(false)
    }

    return(
        <>
            <Grid 
                container
                spacing={2}
                direction='column'
                sx={{
                    marginTop:'1rem',
                    gap:'1rem',
                    marginBottom:'1rem'
                }}
            >            
            {
                isScreenSmall
                ?
                <SmallScreenReccomens />
                :
                <>
                    <Grid 
                        item 
                        xs={6}
                        sx={{
                            bgcolor:theme.palette.fifth.main
                        }}
                    >
                        <FriendReccomend 
                            openSnackbar={openSnackbar}
                            snackbarMessage={snackbarMessage}
                            clickSnackbar={clickSnackbar} 
                            closeSnackbar={closeSnackbar}
                        />
                    </Grid>  
                </>
            }
                {
                    isScreenSmall 
                    ?
                    null 
                    :
                    <>                                                
                        <Grid item xs={6} className='padding-0'>
                            <FriendRequest
                                openSnackbar={openSnackbar}
                                snackbarMessage={snackbarMessage}
                                clickSnackbar={clickSnackbar} 
                                closeSnackbar={closeSnackbar}
                            />                   
                        </Grid>                        
                    </>

                }
            </Grid>
        </>
    )
}