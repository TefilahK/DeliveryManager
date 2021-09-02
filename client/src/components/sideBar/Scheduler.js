import { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { fontSize } from "@material-ui/system";
import $ from "jquery";
import { alpha } from '@material-ui/core/styles'
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'
import { Button, Divider } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function Scheduler(){
    const [workingUsers, setWorkingUsers] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const history=useHistory();
    let location=useLocation();
    const theme = createMuiTheme({
      overrides: {
        MuiTableRow: {
          "&$selected": {
            backgroundColor: 'red'
          }
        },
     }
    })
    React.useEffect(() => {
      async function fetchVolunteers() {
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/users/listUsers",      
        }).done(function(fetchData) {
          let working=[];
          fetchData.users.forEach(el=>{
            console.log(el.workingToday)
            if(el.workingToday){
              working.push(el)
            }
          })
          console.log(working)
          setWorkingUsers(working)
          })
          .fail(function(jqXhr) {
            console.log(jqXhr)
          })
        }
      
      fetchVolunteers();
    }, []);
    function generate(user) {
    return (
        <div>
      <ListItem style={{width:"300px"}}>
        <ListItemAvatar>
          <Avatar
          src={user.img}
          style={{height:theme.spacing(7), width: theme.spacing(7)}}
          />
        </ListItemAvatar>
        <br/>
        <ListItemText style={{fontFamily:"cursive",padding:"10px"}}
          primary={user.name}
          secondary={ user.address }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={(evt,data)=>{
               //database
            console.log(user)
            $.ajax({
              type: "POSt",
              url: "http://localhost:8080/users/updateWorkingToday",
              data:{...user,workingToday:false},
            
            }).done(function(fetchData) {
              console.log(fetchData)
              })
              .fail(function(jqXhr) {
                console.log("cant delete user!!");
            }) 
            //תצוגה
            const index = workingUsers.indexOf(user);
            let working=[...workingUsers]
            if (index > -1) {
              working.splice(index, 1);
            }
            // working[index].id=false
            setWorkingUsers(working)
         

          }}>
            <DeleteIcon style={{color:"red"}} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider/>
      </div>
    );
    
  }  
  const handleAssignVolunteers=()=>{
    $.ajax({
      type: "POSt",
      url: "http://localhost:8080/map/assignVolunteers",
      data: {...workingUsers, date: new Date()},
    
    }).done(function(fetchData) {
      console.log(fetchData)
      })
      .fail(function(jqXhr) {
        console.log("cant delete user!!");
    }) 
    //go to map
    history.push('/Map');

  }
  const useStyles = makeStyles((theme) => ({
    title:{
      fontSize:"50px",
      fontFamily:"cursive",
      marginRight:theme.spacing(10),
    },
    checkbox:{
      width:100,
      height:100,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    list:{
      marginLeft:theme.spacing(0),
    },
    addButton:{
        // display: "flex",
          justifyContent: "center",
          color:"black",
          backgroundColor:"#bdc4db",
          width:"300px",
          marginLeft:theme.spacing(55),
         
      }
  }))
  const classes = useStyles();


return(
    <div >
    <Grid style={{display:"flex", flexDirection:"column"}}>
    <Snackbar style={{diaplay:"flex" }} open={open} >
      <Alert style={{justifyContent:"center"}} severity="error">user is already working Today!</Alert>
    </Snackbar>
    <h1 align="center" className={classes.title}>Working Today</h1>
    <br/>
    <Grid className={classes.list} item xs={12} md={28}>
        <div className={classes.demo}>
            <List dense={dense}>
            {workingUsers.map(el=>generate(el))}
            </List>
        </div>
    </Grid>
    <br/>
    <br/>
    {/* <Button variant="contained" style={{ }} onClick={handleAssignVolunteers}>Assign Volunteers to packages</Button> */}
    <Button variant="outlined" onClick={handleAssignVolunteers} className={classes.addButton}  >
    Assign Volunteers to Packages
     </Button>
     </Grid>
    </div>
)}