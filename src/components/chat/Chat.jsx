import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../model/Message";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';

export const Chat = () => {

    const ENTER_KEY_CODE = 13;

    const scrollBottomRef = useRef(null);
    const webSocket = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('Opening WebSocket');
        webSocket.current = new WebSocket('wss://socketsbay.com/wss/v2/2/demo/');
        const openWebSocket = () => {
            webSocket.current.onopen = (event) => {
                console.log('Open:', event);
            }
            webSocket.current.onclose = (event) => {
                console.log('Close:', event);
            }
        }
        openWebSocket();
        return () => {
            console.log('Closing WebSocket');
            webSocket.current.close();
        }
    }, []);

    useEffect(() => {
        webSocket.current.onmessage = (event) => {
            const chatMessage = JSON.parse(event.data);
            console.log('Message:', chatMessage);
            setChatMessages([...chatMessages, {
                user: chatMessage.user,
                message: chatMessage.message
            }]);
            if(scrollBottomRef.current) {
                scrollBottomRef.current.scrollIntoView({ behavior: 'smooth'});
            }
        }
    }, [chatMessages]);

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleEnterKey = (event) => {
        if(event.keyCode === ENTER_KEY_CODE){
            sendMessage();
        }
    }

    const sendMessage = () => {
        if(user && message) {
            console.log('Send!');
            webSocket.current.send(
                JSON.stringify(new ChatMessage(user, message))
            );
            setMessage('');
        }
    };

    const listChatMessages = chatMessages.map((chatMessage, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${chatMessage.user}: ${chatMessage.message}`}/>
        </ListItem>
    );

    return (
        <Fragment>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant="h5" gutterBottom>
                            Общайтесь с наслаждением:)
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            <Grid id="chat-window" xs={12} item>
                                <List id="chat-window-messages">
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef}></ListItem>
                                </List>
                            </Grid>
                            <Grid xs={2} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleUserChange}
                                               value={user}
                                               label="Ник"
                                               variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <Grid xs={9} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleMessageChange} onKeyDown={handleEnterKey}
                                               value={message}
                                               label="Введите сообщение"
                                               variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <Grid xs={1} item>
                                <IconButton onClick={sendMessage}
                                            aria-label="send"
                                            color="primary">
                                    <SendIcon />
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );
}
