import React, { useState } from "react"
import Typography from '@mui/material/Typography'
import TextField from "@mui/material/TextField"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link } from "react-router-dom"
import { alpha, styled } from '@mui/material/styles'
import { theme } from "../../assets/theme"
import { useRegister } from "./apiCalls"

export default function Register() {
    const [user, setUser] = useState({
        username:'',
        email:'',
        password:'',
        passwordConfirm:''
   })

   const [isInputsEmpty, setIsInputsEmpty] = useState(true)

    const [errorText, setErrorText] = useState() 

    const { mutate:registerUser } = useRegister(setErrorText)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUser({ ...user, [name] : value })
    } 

    const handleSubmit = async(event) => {
        event.preventDefault()        
        if(user.username && user.email && user.password && user.passwordConfirm !== '') {
            setIsInputsEmpty(false)
        }
        
        if(isInputsEmpty) {
            setErrorText('Please fill all fields')
            return
        } else {            
            await registerUser(user)
        }
        
    }

    return(
        <>
            <Box component='form' onSubmit={handleSubmit}>            
                <Grid 
                    container
                    spacing={1}
                    sx={{
                        width:'90%',
                        marginTop:'4rem',                       
                        marginInline:'auto',
                        padding:'1rem',
                        backgroundColor:theme.palette.secondary.main,
                        borderRadius:'4px',
                        boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.75)',
                        display:'flex',
                        [theme.breakpoints.up('sm')]:{
                            width:'450px'
                        }
                    }}
                >
                <Typography marginBottom='1rem' marginInline='auto' color={theme.palette.cream.main} variant='h3'>Sign Up</Typography>
                    <Grid 
                        item 
                        xs={12} 
                        sx={{ 
                            display:'flex', 
                            alignItems:'center', 
                            gap:'0.5rem'
                        }}
                    >                        
                        <StayledInput 
                            type='text'
                            id='username'
                            name='username'
                            label='Username'
                            value={user.username}
                            onChange={handleChange}
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>                        
                        <StayledInput
                            type='email'
                            id='email'
                            name='email'
                            label='Email'
                            value={user.email}
                            onChange={handleChange}
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                        
                        <StayledInput     
                            type='password'
                            id='password'
                            name='password'
                            label='Password'
                            value={user.password}
                            onChange={handleChange}
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                        
                        <StayledInput 
                            type='password'
                            id='passwordConfirm'
                            name='passwordConfirm'
                            label='Confirm password'
                            value={user.passwordConfirm}
                            onChange={handleChange}
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Box 
                        sx={{
                            display:'flex', 
                            gap:'0.5rem', 
                            alignItems:'center', 
                            marginInline:'auto',
                            marginTop:'0.5rem'
                        }}
                    >
                        <Typography color={theme.palette.cream.main} variant="subtitle2">Already have an account?</Typography>
                        <Typography color={theme.palette.cream.main} variant="subtitle1" component={Link} to='/login'> Sign in here.</Typography> 
                    </Box>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        type="submit" 
                        size="large"
                        sx={{
                            marginTop:'1rem',
                            marginBottom:'1.5rem',
                            width:'80%',
                            marginInline:'auto',
                            translate:'all 700ms ease',
                            '&:hover':{
                                color:theme.palette.primary.main,
                                backgroundColor:theme.palette.cream.main,
                                boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.75)'
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                        {
                            errorText &&
                            <Typography color={theme.palette.cream.main} variant="subtitle1" marginInline='auto'>
                                {errorText}
                            </Typography>
                        }
                </Grid>  
            </Box>   
        </>
    )
}

const StayledInput = styled(TextField)(({ theme }) => ({
  color: theme.palette.cream.main,
  background:theme.palette.cream.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}))