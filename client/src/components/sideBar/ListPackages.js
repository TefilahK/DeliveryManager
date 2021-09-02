// import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import React, { useEffect, useState } from 'react';
import $ from "jquery";
import MaterialTable from 'material-table';
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight"
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import KeyboardDatePicker from '@material-ui/pickers'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Select from '@material-ui/core/Select';
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'
import {YOUR_ACCESS_TOKEN} from "../../keys"


const email=sessionStorage.getItem("userEmail");
const admin=sessionStorage.getItem("permissionType");

//for admin
export default function EnhancedTable () {
  const useStyles = makeStyles((theme) => ({
    title:{
      fontSize:"50px",
      fontFamily:"cursive",
      marginRight: theme.spacing(10),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      height:200,
    },
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
  React.useEffect(() => {
    async function fetchPackages() {
      let isadmin=sessionStorage.getItem("permissionType")=="admin"?true:false;
       $.ajax({
        type: "POST",
        url: "http://localhost:8080/packages/listPackages", 
        data: {email:email,admin:isadmin }     
      }).done(function(fetchData) {
        console.log("hello");
        console.log(fetchData);
        setData(fetchData.packages)
        })
        .fail(function(jqXhr) {
          console.log(jqXhr)
        })
        console.log("bye");
    }
    fetchPackages();
  }, []);

  
   // Submit form via jQuery/AJAX
   let products={'food':'food','medicine':'medicine','clothes':'clothes'}

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Products", field: "products",validate: rowData => Boolean(rowData.products),lookup:products },
    { title: "Address", field: "address", validate: rowData => Boolean(rowData.address)},
    { title: "Date", field: "arrivalDate",id:"date",
    label:"Birthday",
    type:"date",
    dateSetting: { locale: "nl-NL"},
    className:classes.textField,
    InputLabelProps:{shrink: true }, 
    icon:{CalendarTodayIcon},
    validate: rowData => Boolean(rowData.arrivalDate) },
    { title: "Is Sent", field: 'isSent', lookup:{"true":"true","false":"false"}},
    { title: "Volunteer Id", field: 'volunteerId',editable: true },
  ]
  // sessionStorage.getItem("permissionType")=="admin" && columns.push({title: "Repeat",field: 'repeat', lookup:{24:'Day',720:'Month',8760:'Year'}})
  const onClickSelect=(evt, newdata) =>{
    console.log(newdata)
      newdata.forEach(el=>{
        console.log(el)
        if(el.isSent=="false"){
          el.isSent=true;
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/packages/sentPackage", 
          data: {id:el.id, isSent:true }  
        }).done(function(fetchData) {
          console.log(fetchData)
          })
          .fail(function(jqXhr) {
            console.log(jqXhr)
          })
        }
        el.tableData.checked=false
      })
      console.log(newdata)
      console.log(data)
      setData([...data]) 

  }

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#6272a8',
        light: '#6272a8',
        dark: '#6272a8',
      }
    },
  });

  const funcEditable={
    onRowAdd: (newRow) => new Promise((resolve, reject) => {
      let updatedRows = [...data, { id: Math.floor(Math.random() * 10000), ...newRow }]
      console.log(updatedRows)
      let SEARCH_STRING=newRow.address
      console.log(newRow);/////
      $.ajax({
          type: "GET",
          url: 'https://us1.locationiq.com/v1/search.php?key='+YOUR_ACCESS_TOKEN+'&q='+SEARCH_STRING+'&format=json',  
      }).done(function(fetchData) {
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/packages/addPackage",
          data: { id: Math.floor(Math.random() * 10000), ...newRow,lat:fetchData[0].lat,lon:fetchData[0].lon },
        
        }).done(function(fetchData) {
          console.log(fetchData)
          if(fetchData.status==200){
            let date=new Date(fetchData.packages.arrivalDate);
            fetchData.packages.arrivalDate=date.toLocaleDateString('nl-NL');
            updatedRows=[fetchData.packages]
          }else{
            console.log("cant add package!!");
          }
          })
          .fail(function(jqXhr) {
            console.log("cant add package!!");
          })
          setTimeout(() => {
            console.log(updatedRows)
            setData([...data, ...updatedRows])
            resolve()
          }, 2000)
          
        })
        .fail(function(jqXhr) {
        console.log(jqXhr)
        })
      // if(newRow.repeat!==null){
      //   updateRepeat(newRow)
      // }
    }),
    onRowDelete: selectedRow => new Promise((resolve, reject) => {
      const index = selectedRow.tableData.id;
      console.log(selectedRow)
      const updatedRows = [...data]
      updatedRows.splice(index, 1)
      $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/packages/deletePackage",
        data: selectedRow,
      
      }).done(function(fetchData) {
        console.log(fetchData)
        })
        .fail(function(jqXhr) {
          console.log("cant delete package!!");
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
      console.log(updatedRow)
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/packages/updatePackage",
        data: updatedRow,
      
      }).done(function(fetchData) {
        console.log(fetchData)
        // setData(fetchData.packages)
        })
        .fail(function(jqXhr) {
          console.log("cant update package!!");
        })
      setTimeout(() => {
        setData(updatedRows)
        resolve()
      }, 2000)
      // if(newRow.repeat!==null){
      //   updateRepeat(newRow)
      // }
    })

  }
//repeat
  // let IntervalId=0;
//   const 
//    = setInterval(fname, 10000);
// /* later */
// clearInterval(refreshIntervalId);
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <h1 align="center" className={classes.title}>Package List</h1>
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
            fontWeight: "bold",
          },
        }}
        editable={ sessionStorage.getItem("permissionType")=="admin"? funcEditable:{}}
        actions={[
          {
            tooltip: 'package was send Today:'+new Date(),
            icon: 'check',
            onClick: onClickSelect