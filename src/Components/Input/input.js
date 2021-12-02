import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        boton: {
            main: "#7879F1",
            contrastText: "#fff",
        },
        white:{
            main: "#fff",
            contrastText: "#fff"
        }
    },
});

export default function CustomizedInputBase(props) {
  
  const [body, setBody] = useState({ code: "" });
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
        
    setLoading(true);

    console.log("body: ",body);

    await axios.post('https://api-nobias.herokuapp.com/code', body).then((res) => {  
        
        const { message } = res.data;
        console.log("message: ", message);

        if(message === "OK"){
            setStart(true);
        }
    
    }).catch(err => {
        console.log("Error code",err);
    }).then(() => {
        setLoading(false);
    });


  };

  const handleChange = e => {

    setBody({
        ...body,
        [e.target.name] : e.target.value
    })

  };

  return (
      <ThemeProvider theme={theme}>
        <Typography color="#fff" variant="h6" sx={{alignItems:"flex-start"}}>¿Vienes de una empresa? </Typography>
        <Paper
        component="form"
        color="primary"
        sx={{ p: '0px 0px', display: 'flex', alignItems: 'center', width: 500 , backgroundColor:"#7879F1", justifyContent:"center"}}
        
        >

        {!start ? 
            <>
                <InputBase
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1, color:"#fff"}}
                    placeholder="Codigo de Empresa"
                    name="code"
                    inputProps={{ 'aria-label': 'codigo' }}
                />
                <IconButton onClick={onSubmit} sx={{ p: '10px' }} aria-label="search">
                    <SendIcon color="white" />
                </IconButton>
            </>
            :
            (<Link to={`/ChatbotEMP/${body.code}`} key={body.code}>  <Button variant="outlined" color="white" size="large" sx={{ml:1,width: 490, bordercolor:"#7879F1"}} >Iniciar Test - Empresa</Button> </Link>)
        }   
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    </ThemeProvider>
  );
}
