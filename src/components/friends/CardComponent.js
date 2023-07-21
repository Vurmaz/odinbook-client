import React from "react"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import { Link as RouterLink }  from "react-router-dom";

export default function CardComponent({ data, btn1, btn1Action, btn2, btn2Action }) {
    
    return(
        <>
            <Grid   
                key={data.id}
                item                    
                className='fade' 
                sx={{ 
                    padding:'1rem', 
                    marginLeft:'0.5rem', 
                    width:'50%' ,
                    maxWidth:'330px',
                    minWidth:'280px',
                    display:'flex',
                    alignItems:'center',
                }}
            >

                <Card
                    sx={{ 
                        bgcolor:'transparent', 
                        color:'black',
                        backgroundColor:'#F0E9FF',
                        boxShadow: '0px 0px 44px -8px rgba(0,0,0,0.75)'
                    }}              
                >
                <Box >
                    <CardContent                         
                        sx={{ 
                            justifyContent:'center',
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to={`/profile/${data._id}`}
                            sx={{
                                color:'black',
                                textDecoration:'none'
                            }}
                        >
                            <Typography 
                                textAlign='center' 
                                variant='h5'
                                
                                sx={{
                                    transition:'all 700ms ease-in-out',
                                    '&:hover':{
                                        textDecoration:'underline',
                                        cursor:'pointer',
                                    }
                                }}
                            > 
                                {data.username}
                            </Typography>                            
                        </Link>

                    </CardContent>
                    <CardMedia 
                        component='img'
                        loading="lazy"
                        src={data.profilePhoto}    
                        height='250px'
                        sx={{
                            width:'256px',
                            transition:'all 700ms ease',                                                        
                        }}
                    />
                </Box>
                    <CardContent 
                        sx={{                             
                            justifyContent:'center',
                            flexDirection:'column',
                            gap:'0.5rem',
                            display:'flex',                                                     
                        }}                        
                    >                    
   
                            {
                                btn1 !== 'visit'
                                ? 
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    onClick={btn1 == 'visit' ? () => null  : btn1Action}
                                    sx={{
                                        color:'white',
                                    }}                            
                                >                                 
                                    {btn1}
                                </Button>                                
                                :     
                                    <Link 
                                        component={RouterLink}
                                        to={`/profile/${data._id}`}
                                        sx={{
                                            color:'white',
                                        }}                                        
                                    >    
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            onClick={btn1 == 'visit' ? () => null  : btn1Action}
                                            fullWidth
                                    
                                        >                                                                                            
                                            {btn1}
                                        </Button> 
                                    </Link>                                
                            }
                            {
                                btn2 !== 'Visit'
                                ? 
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    onClick={btn2 == 'Visit' ? () => null  : btn2Action}
                                    sx={{
                                        color:'white',
                                    }}                            
                                >                                 
                                    {btn2}
                                </Button>                                
                                :     
                                    <Link 
                                        component={RouterLink}
                                        to={`/profile/${data._id}`}
                                        sx={{
                                            color:'white',
                                        }}                                        
                                    >    
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            onClick={btn2 == 'Visit' ? () => null  : btn2Action}
                                            fullWidth                                    
                                        >                                                                                            
                                            {btn2}
                                        </Button> 
                                    </Link>                                
                            }                                                                               
                    </CardContent>                    
                </Card>
            </Grid>               
        </>
    )
}