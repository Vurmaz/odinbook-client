import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography"
import { alpha, styled } from '@mui/material/styles'
import { theme } from "../../assets/theme"
import { useNavigate } from "react-router-dom"
import { useLogin } from "./apiCalls"


export default function Login() {
    
    const [user, setUser] = useState({ email:"", password:"" })

    const [errorText, setErrorText] = useState('')
    const [isInputsEmpty, setIsInputsEmpty] = useState(true)
    
    const navigate = useNavigate()

    const { mutate: loginUser } = useLogin(setErrorText)

    const faceBookLogin  = async(event) => {
        event.preventDefault()
        window.location.href = 'https://localhost:5000/auth/facebook'
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUser({ ...user, [name] : value })
    } 

    const handleSubmit = async(event) => {
        event.preventDefault()
        if(user.email && user.password !== '') {
            await setIsInputsEmpty(false)
            await loginUser(user)    
            return        
        }
        if(isInputsEmpty) {
            setErrorText('Please fill all fields')
            return
        } 
    }

    const loginAsGuest = async() => {
        await loginUser({
            email:'guest@gmail.com',
            password:'secret'
        })
    }

    const navigateRegister = () => {
        navigate('/register')
    }

    const resetErrorText = () => {
        setTimeout(() => {
            setErrorText('')
        }, 30000)
    }

    useEffect(()=>{
        resetErrorText()
    }, [errorText])

    return(
        <Box component='form'>
            <Grid 
                container 
                spacing={1}
                sx={{
                    width:'70%',
                    marginTop:'4rem',
                    marginInline:'auto',
                    padding:'1rem',
                    backgroundColor:theme.palette.third.main,
                    borderRadius:'4px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.75)',
                    display:'flex',
                    [theme.breakpoints.up('sm')]:{
                        width:'450px'
                    }
                }}
            >
                <Grid item xs={12} sx={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>                    
                   <StayledInput 
                        type='email'
                        id='email'
                        name='email'
                        label='E-mail'
                        fullWidth
                        variant="filled"
                        value={user.email}
                        onChange={handleChange}
                    /> 
                </Grid>
                <Grid item xs={12} sx={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>                    
                   <StayledInput 
                        type='password'
                        id='password'
                        name='password'
                        label='Password'
                        fullWidth
                        variant="filled"
                        value={user.password}
                        onChange={handleChange}
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
                </Box>    
                <Typography marginTop='0.5rem' marginInline='auto' color='white'>{errorText}</Typography>           
                <StayledButton 
                    fullWidth 
                    variant="contained" 
                    type='submit'
                    onClick={handleSubmit}
                >   Sign In
                </StayledButton>
                <StayledButton 
                    fullWidth 
                    variant="contained" 
                    type='button'
                    onClick={navigateRegister}
                >   Create new account
                </StayledButton>
                <StayledButton 
                    fullWidth 
                    variant="contained" 
                    type='button'    
                    onClick={loginAsGuest}            
                >   Guest account
                </StayledButton>
                <StayledButton 
                    fullWidth 
                    variant="contained" 
                    type='button'
                    onClick={faceBookLogin}
                >   Login with Facebook
                </StayledButton>                              
            </Grid>            
        </Box>
    )
}

const StayledInput = styled(TextField)(({ theme }) => ({
  color: theme.palette.cream.main,
  background:theme.palette.cream.main,
  border:`1px solid ${theme.palette.primary.main}`,
  borderRadius:'4px',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}))

const StayledButton = styled(Button)(({ theme }) => ({
    color:'theme.palette.cream.main',
    translate:'all 500ms ease-in-out',
    marginTop:'1rem',  
    marginBottom:'1.rem',                  
    width:'100%',
    marginInline:'auto',
    backgroundColor:theme.palette.secondary.main,
    '&:hover':{
        backgroundColor:theme.palette.primary.main,
        color:'white'
    }
}))
