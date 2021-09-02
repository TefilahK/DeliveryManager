
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { io } from "socket.io-client";
import $ from 'jquery'
import { useContext, useEffect, useRef } from "react";
import { MenuItem } from '@material-ui/core';
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'




const useStyles = makeStyles((theme) => ({
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
    overflow:"auto",
    backgroundColor:"#fefcfb"
    
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'scroll',
    // overflowY: "scroll",
    minWidth: 0, minHeight: 0,
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbLauEsjimWluP7tzvqa3hDJI74bsdjvG13bhAVvQQiUYcLTFCWqqOOKUHpjbiUUek-k&usqp=CAU")',
    
  },
  chatBoxTop :{
    height: "100%",
    overflowY: "scroll",
    paddingRight: "10",
  },
  
  chatBoxBottom :{
    marginTop: "5",
    // display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatOnlineBadge :{
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "limegreen",
    position: "absolute",
    top: "2px",
    right: "2px",
  }
}));

const MyChat = () => {
  const classes = useStyles();
  const socket = useRef();
  const scrollRef = useRef();
  const [currentUser,setCurrentUser]=useState([]);
  const [receiverId,setReciverId]=useState([]);
  const [messages,setMessages]=useState([]);
  const [users,setUsers]=useState([]);
  const [arrivalMessage,setArrivalMessage]=useState([]);
  const [newMessage,setNewMessage]=useState([]);
  const [selected,setSelected]=useState([]);
  let userId=sessionStorage.getItem("id")
  
  useEffect(() => {
    let unmounted = false;
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            date: Date.now(),
        });
      return () => { unmounted = true };
    });
    socket.current.emit("addUser", userId);
    socket.current.emit("readMessages");
    socket.current.on("getUsers", (onlineUsers) => {

    });
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/friends/" + userId,
      
      }).done(function(res) {
        console.log(res.data)
        setUsers(res.data);
        handleClickOnUser(res.data[0].id)
        })
        .fail(function(jqXhr) {
          console.log("cant find user by Id !!");
      }) 
    };

    getFriends();
  }, [userId]);

  useEffect(() => {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/users/getUserById",
        data: {id:userId},
      
      }).done(function(user) {
        setCurrentUser(user.user)
        })
        .fail(function(jqXhr) {
          console.log("cant find user by Id !!");
      }) 
  }, [])

  useEffect(() => {
    let unmounted = false;

    arrivalMessage &&
    receiverId==arrivalMessage.sender &&
      setMessages([...messages,arrivalMessage])
    return () => { unmounted = true };
  }, [arrivalMessage, receiverId]);


  const handleClickOnUser=( userId)=> {
      //set reciver id 
      setReciverId(userId)
      setMessages([])
      //get from data base the converstaion!
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/messages/Listmessages",
        data: {receiverId:sessionStorage.getItem("id"), contactId:userId}
      
      }).done(function(fetchData) {
        setMessages(fetchData.data)
        //change color of coponenet
        document.getElementById(userId).style.backgroundColor="gray";
        if(selected.length!=0)
        { selected.style.backgroundColor="#fefcfb"}
        setSelected(document.getElementById(userId));
        })
        .fail(function(jqXhr) {
          console.log("cant get messages !!");
      }) 

  
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      receiver:receiverId,
      text: newMessage,
      date:Date.now(),
    };
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId:receiverId,
      text: newMessage,
    });

    try {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/messages/messages",
        data:message,
      
      }).done(function(res) {
        setMessages([...messages, message]);
        setNewMessage("");
        })
        .fail(function(jqXhr) {
          console.log("cant find user by Id !!");
      }) 
    } catch (err) {
      console.log(err);
    }
  };
  const theme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        "&$selected": {
          backgroundColor: 'red'
        }
      },
   }
  })



  return (
      <div >
        <Grid container >
            <Grid item xs={12} >
                <Typography variant="h5" style={{fontFamily:"cursive", marginLeft:theme.spacing(70), fontSize:"2.8rem"}}>Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                {currentUser !=null && <List>
                    <ListItem button key={currentUser.id} >
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={currentUser.img} style={{height:theme.spacing(6), width: theme.spacing(6)}}/>
                        </ListItemIcon>
                        <ListItemText primary={currentUser.name}></ListItemText>
                    </ListItem>
                </List> }
                <Divider />
                <Divider />
                <List>
                    {users.map(user=>(
                        <List>
                        <ListItem  button key={user.id} id={user.id} onClick={() => handleClickOnUser(user.id)}>
                            <ListItemIcon>
                            <Avatar alt="Remy Sharp" src={user.img} style={{height:theme.spacing(6), width: theme.spacing(6)}} />
                            </ListItemIcon>
                            <ListItemText primary={user.username}></ListItemText>
                            {user.online==true && <div className={classes.chatOnlineBadge}></div>}
                        </ListItem>
                        </List>
                    ))}
                  
                </List>
            </Grid>
            <Grid item xs={9} style={{display:"flex",   flexDirection:"column",minWidth: 0, minHeight: 0}}>
            <List className={classes.messageArea}>
                {messages.map(message=>(
                    <ListItem key={new Date(message.date).toLocaleDateString('en-GB')}  >
                        <Grid container >
                            <Grid item xs={12} >
                                <ListItemText  align={message.sender==currentUser.id?"right":"left"} primary={message.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align={message.sender==currentUser.id?"right":"left"} secondary={new Date(message.date).toLocaleDateString('en-GB')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
              
                // <br/>
                // </div>

             ))}
               </List> 
                <Divider />
                <Grid container style={{padding: '10px',alignContent:"flex-end",justifyContent: "flex-end"}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon onClick={handleSubmit} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default MyChat;



