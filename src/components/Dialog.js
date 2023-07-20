import React from "react"
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent  from "@mui/material/DialogContent";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useUpdateProfilePhoto } from "../components/profile/apiCalls"


export default function SimpleDialog({ open, onClose, value, setValue }) {

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const { mutate: updateAProfilePhoto } = useUpdateProfilePhoto()

    const handleClick = async() =>{
        await updateAProfilePhoto(value)
        await document.location.reload()
    }
    
    return(
        <>
            <Dialog onClose={onClose} open={open} maxWidth='sm' fullWidth>
                <DialogTitle>
                    Change Profile Photo
                </DialogTitle>
                <DialogContent
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'0.5rem',                        
                    }}
                >
                    <TextField
                        id='ProfilePhoto'
                        name='ProfilePhoto'
                        type='text'
                        label='URL'
                        value={value}
                        variant='filled'
                        size="small"
                        onChange={handleChange}
                    />
                    <Button 
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            width:'80%',
                            marginInline:'auto'
                        }}
                    > 
                        Update
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}