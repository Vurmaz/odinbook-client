import React from "react"
import { CardHolder, CardHolderText } from "../../pages/Friends";
import CardComponent from "./CardComponent";
import CardComponentSkeleton from "./CardComponentSkeleton";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'

export default function MyFriends({ allFriends, btn1Action, btn2Action, usernameAction, isAllFriendsLoading }) {
    
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
            <CardHolderText variant="p" className="fade">FRIENDS</CardHolderText> 
            {
                isAllFriendsLoading
                ?   
                    <CardComponentSkeleton />
                :
                    allFriends?.length < 1 
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
                        <SentimentVeryDissatisfiedIcon sx={{ fontSize:'12rem'}} />
                        <Typography>You have 0 friend find SOME!!!</Typography>
                    </Box>
                    :                 
                        allFriends?.map((friend) => {
                            return(                            
                                <CardComponent 
                                    key={friend._id} 
                                    data={friend} 
                                    btn1='visit' 
                                    btn1Action={() => btn1Action(friend)}
                                    btn2='delete' 
                                    btn2Action={() => btn2Action(friend)}
                                    usernameAction={()=>usernameAction(friend)}
                                />
                            )
                        })                
            }                           
            </CardHolder>
        </>
    )
}