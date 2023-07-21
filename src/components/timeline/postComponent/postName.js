import React from "react";
import Grid from '@mui/material/Grid'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from "@mui/material/Avatar"
import Typography from '@mui/material/Typography'
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function PostName({ post }) {
    return(
        <>
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
        </>
    )
}