import React from "react"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { CardHolder, CardHolderText } from "../../pages/Friends";
import CardComponent from "./CardComponent";
import CardComponentSkeleton from "./CardComponentSkeleton";

export default function IncomingRequests({ requests, btn1Action, btn2Action, usernameAction, isRequestsLoading }) {

    return(
        <>
            <CardHolder
                container
                item
                spacing={1}
                xs={10}
                className='custom-slider'
                marginBottom='2rem'
            >
            <CardHolderText variant="p">Incoming Requests</CardHolderText>  
            {
                isRequestsLoading
                ?
                    <CardComponentSkeleton />
                :
                    requests?.length < 1 
                    ?
                        <Grid 
                            sx={{
                                display:'flex',
                                marginInline:'auto',
                                alignItems:'center'
                            }}
                        >
                            <Typography variant="h3">NO REQUESTS</Typography>
                        </Grid>
                    :
                        requests?.map((request) => {
                            return(                            
                                <CardComponent 
                                    key={request._id} 
                                    data={request} 
                                    btn1='Accept'
                                    btn1Action={() => btn1Action(request)}
                                    btn2='Reject'
                                    btn2Action={() => btn2Action(request)}
                                    usernameAction={()=>usernameAction(request)}
                                />    
                            )
                        })
            }         
            </CardHolder>
        </>
    )
}