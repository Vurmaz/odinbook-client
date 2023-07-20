import React, { Fragment } from 'react'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box'
import Post from './Post'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { theme } from '../../assets/theme';
import { useInfiniteQuery } from 'react-query'
import { getTimeline } from './apiCalls';

export default function Posts() {

    let lastPage = false
    
    const { data, isLoading, fetchNextPage } = useInfiniteQuery(
        ['timelineData', 'infinite'], 
        ({ pageParam = 1 }) => getTimeline(pageParam),
        {
            getNextPageParam: (_pageParams, allPages) =>  allPages.length + 1
        }
        
    )
    data?.pages?.forEach((page)=>{
        if(page.data.posts.length < 1){
            lastPage = true
        }
    })
        
    return(
        <>
        <Box 
            className='white-scroll'
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:'1rem',
                marginTop:'1rem',
                marginBottom:'2rem',
                overflowY:'auto',
                height:'auto'
            }}
        >
            {
                isLoading
                ?
                <Box sx={{ width: '100%' }}>
                    <Skeleton variant="circular" width={80} height={80} />
                    <Skeleton variant="rectangular" width='100%' height={100} />
                    <Skeleton variant="circular" width={80} height={80} />
                    <Skeleton variant="rectangular" width='100%' height={100} />                    
                </Box>     
                :           
                data?.pages?.length > 0
                ? 
                <>
                    {
                        data?.pages?.map((group, index) => {
                            return <Fragment key={index}>
                                {
                                    group?.data?.posts?.map((post) => {
                                        return <Post key={post._id} post={post} />
                                    })
                                }
                            </Fragment>                            
                        })                        
                    }
                    <Button
                        disabled={lastPage}
                        onClick={fetchNextPage}
                        sx={{
                            bgcolor:theme.palette.fifth.main,
                            display:lastPage ? 'none' : '' 
                        }}
                    >
                        LOAD MORE
                    </Button>
                    <Typography
                        textAlign='center' 
                        display={lastPage ? 'initial' : 'none'}
                    >
                        Your Friends Haven't Posted Anything
                    </Typography>                    
                </>   
                :
                <Box
                    sx={{
                        backgroundColor:theme.palette.fifth.main,
                        padding:'2rem'
                    }}
                >
                    <Typography variant='h6' textAlign='center'>Your Friends Haven't Posted Anything</Typography>    
                </Box>            
            }
        </Box>
        </>
    )
}