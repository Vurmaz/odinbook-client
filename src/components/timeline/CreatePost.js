import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Avatar from "@mui/material/Avatar"
import { getCookie } from '../../api'
import { theme } from "../../assets/theme";
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import { getUserAvatar, useCreatePost } from "./apiCalls";
import { useQuery } from 'react-query'

export default function CreatePost() {

    const isScreenSmall = useMediaQuery('(max-width:700px)')
    
    const [post, setPost] = useState('')
    const [isImgOpen, setIsImgOpen] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [errorText, setErrorText] = useState('')

    const navigate = useNavigate()

    const avatarURL = useQuery('avatarURL', getUserAvatar)
    
    const { mutate : createAPost, error } = useCreatePost()
    
    const createPost = () => {
        if(post === '' && imgUrl === ''){
            setErrorText('Please Provide Content')
            return
        }
        createAPost({ post, imgUrl })
    }

    const resetErrorText = async() => {
        setTimeout(()=>{
            setErrorText('')
        }, 30000)
            
    }
    
    useEffect(()=>{
        resetErrorText()
    }, [errorText])

    return(
        <>
            <Grid 
                container 
                sx={{
                    marginTop:isScreenSmall ? '0rem' : '1rem' ,
                    padding:'1rem',
                    paddingInline:'0.5rem',
                    display:'flex',
                    flexDirection:'column',
                    background:theme.palette.fifth.main,
                    justifyContent:'center',

                }}
            >
                <Grid 
                    container
                    spacing={1}
                    item
                    xs={12}
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        
                    }}
                >
                <Grid 
                    item 
                    xs={2.5}
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}
                >
                    <Avatar 
                        src={avatarURL?.data?.user?.profilePhoto} 
                        onClick={()=> navigate(`/profile/${getCookie(' u')}`)}
                        sx={{ 
                            minWidth:65,
                            minHeight:65,
                            [theme.breakpoints.up('sm')]:{
                                width:100,
                                height:100
                            },
                            '&:hover':{
                                border:'2px solid black'
                            },
                            transition:'border 700ms ease',
                            cursor:'pointer'
                        }} 
                        
                    />
                </Grid>
                <Grid 
                    container
                    item
                    xs={8}
                    spacing={2} 
                    sx={{ display:'flex', justifyContent:'center', flexDirection:'column' }}
                >
                    <Grid item>
                        <TextField
                            type='text'
                            id='post'
                            name='post'
                            label='What is in your mind'
                            value={post}
                            onChange={(event) => setPost(event.target.value)}
                            fullWidth
                            variant="filled"
                            size="small"
                            sx={{
                                borderRadius:'4px'
                            }}
                        />                        
                    </Grid>
                    <Grid item sx={{ marginInline:'auto' }}>
                        {
                            isImgOpen 
                            ?
                            <TextField 
                                type='text'
                                id='image'
                                name='image'
                                label='Image URL'
                                fullWidth
                                size="small"
                                variant="filled"
                                value={imgUrl}
                                onChange={(event) => setImgUrl(event.target.value)}

                            />                             
                            :                             
                            <Button variant="contained" onClick={()=>setIsImgOpen(!isImgOpen)}>ADD IMAGE</Button>
                        }

                    </Grid>

                </Grid>
                <Grid 
                    item
                    xs={1.5}
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}                    
                >
                    <Tooltip title='SEND'>
                        <SendIcon 
                            fontSize='large' 
                            onClick={createPost}
                            sx={{ cursor:'pointer' }}
                        />                        
                    </Tooltip>
                </Grid>            
                </Grid>
                    <Typography 
                        color='red' 
                        marginTop='1rem' 
                        textAlign='center'
                        variant="p"
                        className='fadeAnimation'
                    >{errorText === 'Please Provide Content' ? errorText : error?.response?.data?.msg}</Typography>  
            </Grid>
        </>
    )
}