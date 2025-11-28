import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
   palette: {
     mode: 'dark',
    primary: {
      main: '#000', // 主题主色
    },
    secondary: {
      main: '#19857b', // 主题次色
    },
    text:{
      primary:'#FFF'
    }
  },
   components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // 白色字体
          fontSize:'14px',

          '&:hover': {
            backgroundColor: '#333333', // 鼠标悬停时背景色变深，可选
          },
          borderColor:'#FFFFFF77'
        },
      },
    },
    MuiDivider:{
     styleOverrides: {
        root: {
          height:'1px',
          width:'90%',
          marginBottom:'10px',
          backgroundColor:'rgba(255,255,255, 0.3)',
          borderColor:'#fff'
        },
      },
    },
      MuiCheckbox:{
     styleOverrides: {
        root: {
         color: green[100],
         padding:'0px',
          '&.Mui-checked': {
            color: green[600],
          },
          borderRadius:'50%',

        },
      },
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // 字体设置
    h1: {
      fontWeight: 500,
      fontSize: 36, // 标题1的字体大小
    },
    h2: {
      fontWeight: 500,
      fontSize: 24, // 标题2的字体大小
      marginLeft:20,
      padding:'10px 0px'
    },
    body1: {
      fontSize: 16, // 正文字体大小
    },
  },
  spacing: (num:number)=> num*2,
});

export default theme;
