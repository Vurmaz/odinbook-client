import React, { useState } from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Avatar from "@mui/material/Avatar"
import { useCreateComment } from "./apiCalls"

export default function CreateComment({ postId, author, profilePhoto }) {

    const [commentText, setCommentText] = useState([])
    
    const { mutate : createAComment } = useCreateComment()

    const createComment = () => {
        createAComment({commentText, author, postId})
    }
    
    return(
        <>
        <Box 
            sx={{
                padding:'1rem',
                display:'flex',
                flexDirection:'row',
                gap:'0.5rem',
                marginTop:'0.5rem'
            }}
        >
            <Avatar src={profilePhoto} />
            <TextField 
                name="comment"
                label='Comment'
                type='text'
                id='comment'
                size="small"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}

            />
            <Button 
                onClick={createComment} 
                size="small" 
                variant='contained'
            >
                comment
            </Button>
        </Box>


        </>
    )
}