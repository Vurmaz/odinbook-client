import React, { Fragment, useEffect, useState } from "react"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from "@mui/material/Avatar"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { theme } from '../../assets/theme'
import Comment from "./Comment"
import CreateComment from "./CreateComment"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate, useParams } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';
import { useQuery, useInfiniteQuery } from "react-query"
import { getComments, isPostLikedFunc, useLikePost, useDeletePost, getUserAvatar } from "./apiCalls"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getCookie } from "../../api"
import { styled } from '@mui/material/styles';
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function Post({ post }) {
    
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)    
    const [isPostLiked, setIsPostLiked] = useState('')
    const [postLikeCount, setPostLikeCount] = useState('')
    const param = useParams()
    
    let lastPage = false   

    const navigate = useNavigate()

    const userAvatar = useQuery(['userAvatar'], getUserAvatar)

    const { data:commentData, refetch, fetchNextPage } = useInfiniteQuery(
        ['commentData', 'infinite'], 
        ({ pageParam = 1 }) => getComments(post, pageParam), 
        { 
            enabled : false,
            getNextPageParam: (_pageParam, allPages) => allPages.length + 1 
        }
    )

    const isLiked = useQuery(
        ['isLiked', post._id], 
        () => isPostLikedFunc(post), 
        { 
            onSuccess: (data) => {
                if(data.data.msg === 'LIKED'){
                    setIsPostLiked(true)
                }
                else if(data.data.msg === 'DISLIKED'){
                    setIsPostLiked(false)
                }                
            }
        }
    )

    const { mutate: likeAPost } = useLikePost(setIsPostLiked, setPostLikeCount)

    const likePost = async() => {
        await likeAPost(post)
        await isLiked.refetch()
    }

    const { mutate: deleteAPost } = useDeletePost()

    const deletePost = async(post) => {
        await deleteAPost(post)
    }
    
    const openCommentSection = async() => {
        await refetch()
        await setIsCommentsOpen((prev) => !prev)
        
        if(commentData?.length > 0) {
            return
        }       
    }

    commentData?.pages?.forEach((page)=>{
        if(page.data.comments.length < 1){
            lastPage = true
        }
    })

    useEffect(() => {
        setPostLikeCount(post.likes.length)
    }, [])
    
    return(
        <Box 
            sx={{ 
                background:'#F0E9FF', 
                padding:'0.5rem',
            }}
        >
                <Grid 
                    container 
                    spacing={1}
                >
                    <Grid                         
                        item 
                        xs={12} 
                        sx={{
                            display:'flex', 
                            flexDirection:'row', 
                            gap:'1rem', 
                            alignItems:'center', 
                            marginTop:'0.5rem'
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to={`/profile/${post.author._id}`}
                        >
                            <Avatar  
                                src={post.authorPhoto}                                
                                sx={{ 
                                    width:45, 
                                    height:45, 
                                    marginLeft:'0.3rem',
                                    cursor:'pointer',
                                    '&:hover':{
                                        scale:'1.2'
                                    },
                                    transition:'scale 300ms ease'
                                }}                            
                            >                            
                            </Avatar>                            
                        </Link>
                        <Link
                            component={RouterLink}
                            to={`/profile/${post.author._id}`}
                            sx={{
                                textDecoration:'none'
                            }}
                        >
                            <Typography 
                                variant="h4"                                
                                sx={{
                                    cursor:'pointer',
                                    '&:hover':{
                                        textDecoration:'underline'
                                    }
                                }}
                            >
                                {post?.author?.username}
                            </Typography>                            
                        </Link>

                        <Typography variant="caption">{formatDistanceToNowStrict(new Date(post.createdAt))+' ago'}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'1rem' }}>
                        <Typography marginLeft='1rem' variant="h6">{post.content}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ width:'100%' }}>
                        <Box
                            paddingInline='1rem'
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                padding:post.image ? '0.5rem' : '' 
                            }}
                        >
                            <img
                                src={post.image} 
                                height={post.image ? 'auto' : 0 } 
                                                                
                                className='pointer post-img' 
                                onClick={()=>navigate(`/image/${post._id}`)}    
                                loading='lazy'  
                                alt='post'                                                 
                            />
                        </Box>                        
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        sx={{ 
                            marginLeft:'1rem', 
                            display:'flex', 
                            gap:'0.5rem', 
                            flexDirection:'row' 
                        }}
                    > 
                        <Tooltip title={isPostLiked ? 'DISLIKE' : 'LIKE' }>
                            <StyledButtonBox onClick={likePost}>                            
                                <ThumbUpIcon                                 
                                    sx={{
                                        color:isPostLiked ? theme.palette.primary.main : theme.palette.cream.main, 
                                        fontSize:'1.5rem'
                                    }}                                 
                                />
                                <Typography variant='p'>{postLikeCount}</Typography>                             
                            </StyledButtonBox>                             
                        </Tooltip>                      
                        <StyledButtonBox onClick={openCommentSection}>
                            <CommentIcon sx={{ color:'black', fontSize:'1.5rem' }} />
                            <Typography variant="caption">Comments</Typography>  
                        </StyledButtonBox>   
                        {
                            (param.id === getCookie(' u'))
                            ?
                            <Tooltip title='Delete'> 
                                <StyledButtonBox onClick={()=>deletePost(post)}>
                                    <DeleteForeverIcon />                                
                                </StyledButtonBox>                                
                            </Tooltip>
                            :
                            null                                                            
                        }                                             
                    </Grid>
                </Grid>
                {
                    isCommentsOpen 
                    ?
                    <>
                        <CreateComment postId={post._id} author={userAvatar?.data?.user?._id} profilePhoto={userAvatar?.data?.user?.profilePhoto} />
                        {
                            commentData?.pages.map((group, index) => {
                                return <Fragment key={index}>
                                    {
                                        group?.data?.comments?.map((comment) => {
                                            return <Comment key={comment._id} comment={comment}></Comment>
                                        })
                                    }
                                </Fragment>
                            })
                        }               
                        <Button 
                            variant='contained'
                            disabled={lastPage}
                            onClick={fetchNextPage}
                            sx={{
                                marginTop:'1rem',
                                marginLeft:'4rem'
                            }} 
                        >
                            More Comments
                        </Button>         
                        <KeyboardArrowUpIcon
                            fontSize="large"
                            sx={{
                                display:'flex',
                                marginInline:'auto',
                                cursor:'pointer'
                            }}
                            onClick={()=>setIsCommentsOpen(false)}
                        />                        
                    </> 
                    : null
                }
        </Box>
    )
}

const StyledButtonBox = styled(Box)(({ theme }) => ({
    display:'flex',
    alignItems:'center',
    gap:'0.5rem',
    transition:'all 500ms ease-in-out',
    padding:'0.5rem',
    cursor:'pointer',
    '&:hover':{
        boxShadow:'0px 0px 5px 0px rgba(0,0,0,0.75)'
    },

}))