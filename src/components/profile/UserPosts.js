import React from "react";
import Post from "../timeline/Post";
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getUserPosts } from "./apiCalls";


export default function UserPosts({ params }) {
    
    const posts = useQuery('posts', () => getUserPosts(params))
    
    return(
        <Grid
            sx={{
                height:'100px'
            }}
        > 
        {
            posts?.isPostsLoading
            ?
            <Grid container spacing={1} flexDirection='column' marginBottom={2}>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                        <Skeleton variant="circular" sx={{ width:50, height:50, marginInline:'auto' }} />
                    </Grid>
                    <Grid item xs={8}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width:'15rem' }} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Skeleton variant="rectangular" sx={{ width:310, height:80, marginLeft:'2rem' }} />
                </Grid>                
            </Grid>   
            : 
            posts?.data?.data?.posts?.length < 1 
            ?
            <Typography variant='h6' textAlign='center' padding={1}>User hasn't posted anything</Typography>
            :
            posts?.data?.data?.posts?.map((post)=> {
                return <Post key={post._id} post={post} />
            })                    
        }
        </Grid>
    )
}