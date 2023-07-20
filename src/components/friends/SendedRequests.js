import React from "react"
import Typography from '@mui/material/Typography'
import { CardHolder, CardHolderText } from "../../pages/Friends";
import CardComponent from "./CardComponent";
import CardComponentSkeleton from "./CardComponentSkeleton";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box'

export default function SendedRequests({ sendedRequests, btn1Action, btn2Action, usernameAction, isSendedRequestsLoading }) {
    return(
        <>
            <CardHolder
                container
                item
                spacing={1}
                xs={10}
                className='custom-slider fade'
                marginBottom='2rem'
            >
            <CardHolderText variant="p" className="fade">Sended Request</CardHolderText>
            {
                isSendedRequestsLoading
                ?
                    <CardComponentSkeleton />
                :
                    sendedRequests?.length < 1 
                    ?
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            gap:'1rem',
                            width:'100%'
                        }}
                    >
                        <PeopleAltIcon sx={{ fontSize:'12rem' }} />
                        <Typography>Find a Friend!!!</Typography>
                    </Box> 
                    :
                        sendedRequests?.map((request) => {
                            return(                            
                                <CardComponent 
                                    key={request._id} 
                                    data={request} 
                                    btn1='visit' 
                                    btn1Action={() => btn1Action(request)}
                                    btn2='Undo Request' 
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