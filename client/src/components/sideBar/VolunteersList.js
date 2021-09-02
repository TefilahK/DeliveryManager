import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { Button } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import {YOUR_ACCESS_TOKEN} from "../../keys";


const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      "&$selected": {
        backgroundColor: 'red'
      }
    },
 }
})

function isValiEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    return false
  }
  return true
}

export default function VolunteersList () {
  const useStyles = makeStyles((theme) => ({
    title:{
      fontSize:"50px",
      fontFamily:"cursive",
      // fontWeight:"bold"
    },
    checkbox:{
      width:100,
      height:100,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    list:{
      marginLeft:theme.spacing(35),
    }
  }))
  const classes = useStyles();
    const tableIcons = {
  Add: () => <AddBox style={{color:"black"}} />,
  Check: () => <Check />,
  Clear: () => <Clear  />,
  Delete: () => <DeleteIcon style={{color:"red"}} />,
  DetailPanel: () => 
    <ChevronRight  />  ,
  Edit: () => <Edit style={{color:"orange"}} />,
  Export: () => <SaveAlt  />,
  Filter: () => <FilterList  />,
  FirstPage: () => <FirstPage  />,
  LastPage: () => <LastPage  />,
  NextPage: () => <ChevronRight  />,
  PreviousPage: () => 
    <ChevronLeft  />  ,
  ResetSearch: () => <Clear  />,
  Search: () => <Search  style={{color:"black"}}/>,
  SortArrow: () => <ArrowDownward  />,
  ThirdStateCheck: () => <Remove  />,
  ViewColumn: () => <ViewColumn  />
};

  const [data, setData] = useState([])
  const [secondary, setSecondary] = React.useState(false);
  const [workingUsers, setWorkingUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false)
  const history=useHistory()
  React.useEffect(() => {
    async function fetchVolunteers() {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/users/listUsers",      
      }).done(function(fetchData) {
        let working=[];
        console.log(fetchData)
        setData(fetchData.users)
        fetchData.users.forEach(el=>{
          console.log(el.workingToday)
          if(el.workingToday){
            working.push(el)
          }
        })
        setWorkingUsers(working)
        })
        .fail(function(jqXhr) {
          console.log("Try again!!");
          console.log(jqXhr)
        })
    }
    fetchVolunteers();
  }, []);

  
   // Submit form via jQuery/AJAX

  const columns = [
    { title: "Img", field: "img",render: item => <Avatar src={item.img} alt="" border="3" style={{height:theme.spacing(7), width: theme.spacing(7)}} />},
    { title: "ID", field: "id", editable: false},
    { title: "Name", field: "name",validate: rowData => Boolean(rowData.name) },
    { title: "Email", field: "email",validate: rowData => Boolean(rowData.email) && isValiEmail(rowData.email) },
    { title: "Phone Number", field: 'phoneNumber',validate: rowData => Boolean(rowData.phoneNumber) },
    { title: "Address", field: "address", validate: rowData => Boolean(rowData.address)},
  ]
  const theme = createMuiTheme({
      palette: {
        secondary: {
          main: '#6272a8',
          light: '#6272a8',
          dark: '#6272a8',
        }
      },
    });
  const onClickSelect=(evt, newdata) =>{
    let working=[]
    let isopen=false
      newdata.forEach(el=>{
        if(!el.workingToday){
        $.ajax({
          type: "POSt",
          url: "http://localhost:8080/users/updateWorkingToday",
          data: {...el,workingToday:true,address:el.address},
        
        }).done(function(fetchData) {
          console.log(fetchData)
          })
          .fail(function(jqXhr) {
            console.log("cant delete user!!");
        }) 
        working.push({name:el.name,id:el.id,img:el.img})
      }
      else{
        isopen=true;
      }
      el.tableData.checked=false
      })
      setWorkingUsers([...workingUsers,...working])
      setData([...data]) 
      console.log(working)
      setTimeout(()=>history.push({ pathname:'/Scheduler',state: { detail: working,isopen:isopen }}) ,1000)
      
  }

  
  return (
    <div className="App">
    <Snackbar open={open}>
      <Alert severity="error">user is already working Today!</Alert>
    </Snackbar>
    <MuiThemeProvider theme={theme}>
      <h1 align="center" className={classes.title}>Volunteers List</h1>
      <br/>
      <MaterialTable
        icons={tableIcons}
        title=""
        data={data}
        columns={columns}
        options={{
          selection: true,
          rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? '#ced3e4' : '' }),
          actionsColumnIndex: -1, addRowPosition: "first",
          headerStyle: {
            backgroundColor: "black",
            color: "#FFF",
            fontWeight: "bold"
          },
        }}
        actions={[
          {
            tooltip: 'Volunteer will work Today:'+new Date(),
            icon: 'check',
            onClick: onClickSelect,
          }
        ]}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 10000), ...newRow }]
            let SEARCH_STRING=newRow.address
            $.ajax({
                type: "GET",
                url: 'https://us1.locationiq.com/v1/search.php?key='+YOUR_ACCESS_TOKEN+'&q='+SEARCH_STRING+'&format=json',  
            }).done(function(fetchData) {
              $.ajax({
                type: "POST",
                url: "http://localhost:8080/users/addUser",
                data: { id: Math.floor(Math.random() * 10000), ...newRow,lat:fetchData[0].lat,lon:fetchData[0].lon },
              
              }).done(function(fetchData) {
                console.log(fetchData)
                if(fetchData.status==200){
                  setData(fetchData.users)
                }else{
                  console.log("cant add user!!");
                }
                })
                .fail(function(jqXhr) {
                  console.log("cant add user!!");
                })
                
              })
              .fail(function(jqXhr) {
              console.log(jqXhr)
              })
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            console.log(selectedRow)
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            $.ajax({
              type: "DELETE",
              url: "http://localhost:8080/users/deleteUser",
              data: selectedRow,
            
            }).done(function(fetchData) {
              console.log(fetchData)
              })
              .fail(function(jqXhr) {
                console.log("cant delete user!!");
              })
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            let SEARCH_STRING=updatedRow.address
            $.ajax({
                type: "GET",
                url: 'https://us1.locationiq.com/v1/search.php?key='+YOUR_ACCESS_TOKEN+'&q='+SEARCH_STRING+'&format=json',  
            }).done(function(fetchData) {
              $.ajax({
                type: "POST",
                url: "http://localhost:8080/users/updateUser",
                data: updatedRow,
              
              }).done(function(fetchData) {
                console.log(fetchData)
                })
                .fail(function(jqXhr) {
                  console.log("cant update user!!");
                })
            })
              .fail(function(jqXhr) {
              console.log(jqXhr)
              })
              .fail(function(jqXhr) {
              console.log(jqXhr)
              })
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),

        }}
      />
    </MuiThemeProvider>
    </div>
  );
}
