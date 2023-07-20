import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export  let theme = createTheme({
    palette: {
        primary : {
            main : '#38486F',
        },
        secondary : {
            main: '#584F84',
        },
        third: {
          main:'#876A96'
        },
        cream:{
            main:'#D7C1E0'
        },
        fifth:{
          main:'#F0E9FF'
        }
    },
    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})
theme = responsiveFontSizes(theme)