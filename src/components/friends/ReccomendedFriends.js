import React from "react"
import { CardHolder, CardHolderText } from "../../pages/Friends";
import CardComponent from "./CardComponent";
import CardComponentSkeleton from "./CardComponentSkeleton";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function ReccomendedFriends({ reccomends, btn1Action, btn2Action, usernameAction, isReccomendsLoading }) {
    
    return(
        <>
            <CardHolder
                container
                item
                spacing={1}
                xs={10}
                marginBottom='2rem'
                className='custom-slider'
            >
            <CardHolderText variant="p">Reccomendations</CardHolderText>
            {
                isReccomendsLoading 
                ?
                    <CardComponentSkeleton />
                :
                reccomends?.length < 1 
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
                    <SentimentSatisfiedAltIcon sx={{ fontSize:'12rem' }} />
                    <Typography>Everyone is your friend!!!</Typography>
                </Box>              
                :
                    reccomends?.map((reccomend) => {
                        return(                            
                            <CardComponent 
                                key={reccomend._id} 
                                data={reccomend} 
                                btn1='Send request'
                                btn1Action={() => btn1Action(reccomend)}                 
                                btn2='Visit'
                                btn2Action={() => btn2Action(reccomend)}
                                usernameAction={()=>usernameAction(reccomend)}
                            />                    
                        )
                    })                
            }
            </CardHolder>
        </>
    )
}