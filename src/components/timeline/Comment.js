import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from "@mui/material/Avatar"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getCookie } from '../../api'
import { formatDistanceToNowStrict } from 'date-fns'
import { theme } from "../../assets/theme";
import { useNavigate } from "react-router-dom";
import { useLikeComment, isCommentLikedFunc, useDeleteComment } from "./apiCalls";
import { useQuery } from "react-query";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Comment({ comment }) {
    
    const navigate = useNavigate()
    const [isCommentLiked, setIsCommentLiked] = useState(false)
    const [commentLikeCount, setCommentCount] = useState('')

    const { mutate : likeAComment } = useLikeComment(setIsCommentLiked, setCommentCount)
    const { mutate : deleteAComment } = useDeleteComment()

    const likeComment = () => {
        likeAComment(comment)
    }   

    const deleteComment = () => {
        deleteAComment(comment)
    }
    
    const isLiked = useQuery(
        ['isCommentLiked', comment._id], 
        () => isCommentLikedFunc(comment), 
        { 
            onSuccess: (data) => {
                if(data.data.msg === 'LIKED'){
                    setIsCommentLiked(true)
                }
                else if(data.data.msg === 'DISLIKED'){
                    setIsCommentLiked(false)
                }                
            }
        }
    )    

    useEffect(() => {
        setCommentCount(comment.likes.length)
    }, [])
   
    return(
        <>
            <Box 
                key={comment._id}
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'1rem',
                    gap:'1rem',
                    
                }}
            >
                <Avatar 
                    src={comment.author.profilePhoto} 
                    onClick={()=>navigate(`/profile/${comment.author._id}`)}
                    sx={{
                        '&:hover':{
                            scale:'1.1'
                        },
                        transition:'scale 300ms ease',
                        cursor:'pointer'
                    }}
                />
                <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'0.5rem',
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            gap:'1rem'
                        }}
                    >
                        <Typography 
                            variant="h6"
                            onClick={()=>navigate(`/profile/${comment.author._id}`)} 
                            sx={{
                                '&:hover':{
                                    textDecoration:'underline'   
                                },
                                cursor:'pointer'
                                
                            }}
                        >
                            {comment.author.username}
                        </Typography>
                        <Typography variant='caption'>{formatDistanceToNowStrict(new Date(comment.createdAt))+' ago'}</Typography>                                    
                    </Box>
                    <Typography variant='p'>{comment.content}</Typography>
                    <Box
                        sx={{
                            display:'flex',
                            gap:'1.5rem'
                        }}
                    >
                        <Box 
                            sx={{
                                display:'flex',
                                gap:'0.3rem',
                                marginTop:'0.5rem',
                            }}
                            onClick={()=>likeComment()}
                        >
                            <ThumbUpIcon 
                                sx={{
                                    color:isCommentLiked ? theme.palette.primary.main : theme.palette.cream.main,
                                    cursor:'pointer'
                                }} 
                            />  
                            <Typography variant='p'>{commentLikeCount}</Typography>                                                           
                        </Box>
                        {
                            getCookie(' u') === comment?.author._id
                            ?
                            <Box
                                onClick={()=>deleteComment()}
                                sx={{
                                    display:'flex',
                                    gap:'0.3rem',
                                    marginTop:'0.5rem',
                                    cursor:'pointer'
                                }}                    
                            >
                                <DeleteForeverIcon />
                            </Box>                            
                            :
                            null
                        }

                    </Box>

                </Box>                    
            </Box>                                    
        </>
    )
}