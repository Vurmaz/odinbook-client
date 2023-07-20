import React, { useState } from "react"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {styled } from '@mui/material/styles';
import SimpleDialog from "../Dialog"
import { getCookie } from "../../api"

export default function Intro({ userInfo }) {
 
    
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const isUsersProfile = (getCookie(' u') === userInfo?.data?.data?.user?._id)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <>
            <Grid
                item
                container
                spacing={2}
                sx={{
                    padding:'1rem',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    
                }}
            >
                <AvatarHolder 
                    item 
                    xs={4}

                >
                    <Avatar 
                        src={userInfo?.data?.data?.user?.profilePhoto}
                        onClick={isUsersProfile ? ()=>handleClickOpen() : null}
                        sx={{
                            '&:hover':{
                                opacity:isUsersProfile ? 0 : 1
                            }
                        }}
                        
                    />       
                    <SimpleDialog                         
                        open={open}
                        onClose={handleClose}
                        value={value}
                        setValue={setValue}
                    />                    
                </AvatarHolder>
                <Grid 
                    item 
                    xs={5}
                    sx={{
                        display:'flex',
                        alignItems:'flex-end',
                        justifyContent:'center',
                    }}
                >
                    <Typography variant="h2">{userInfo?.data?.data?.user?.username}</Typography>
                </Grid>                
            </Grid>
        </>
    )
}

export const Avatar = styled('img')(({ theme }) => ({
    width:'250px',
    height:'250px',
    objectFit:'cover',
    borderRadius:'50%',    
    marginInline:'auto',  
    position:'relative',
    border:'1px solid black', 
    cursor:'pointer',
    transition:'opacity 500ms ease-in-out 300ms',

}))

export const AvatarHolder = styled(Grid)(({ theme }) => ({
    width:'100%',
    height:'auto%',
    display:'flex',
    justifyContent:'center' ,
    alignItems:'center',                        
    positon:'relative',                                
    '&::before': {
        content: '"Change Photo"',
        display: 'block',
        color:theme.palette.primary.main,
        position:'absolute',
        margin:'auto',
        opacity:0, 
        transition:'opacity 700ms ease-in-out 300ms',                                                                                
    },
    '&:hover::before':{
        opacity:1
    }
}))