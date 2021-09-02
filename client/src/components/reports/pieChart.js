import { useState } from "react";
import Chart from "react-google-charts";
import React from 'react';
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { lighten, makeStyles } from '@material-ui/core/styles'
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'




export default function PieChart (){
    const top100Films = [
        { title: 'Day', value: 0 },    
        { title: 'Week', value: 7 },   
        { title: 'Month', value: 30 }]      
    const [data,setData]=useState([])
    const [time,setTime]=useState(top100Films[0])
    async function fetchPieChart(time) {
      console.log(time)
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/reports/pieChart/"+time.value
      
      }).done(function(fetchData) {
          console.log(fetchData)
          setData([['Task', 'Hours per Day'],...fetchData.pieChart])
          console.log(data)
        })
        .fail(function(jqXhr) {
          console.log(jqXhr)
        })
    }
    React.useEffect(() => {
        fetchPieChart(time);
      }, [time]);
      const useStyle = makeStyles((theme) => ({
        title:{
          fontSize:"50px"
        },
        datePicker:{
          selectColor: '#FF72B1',
        headerColor: '#FF72B1'
        },
        textField: {
          marginLeft: theme.spacing(35),
          marginRight: theme.spacing(1),
          position:'center',
        },
      }))
      const classes = useStyle()
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
<h1 style={{fontFamily:"cursive",fontWeight:"bold",fontSize:25, marginLeft: theme.spacing(38) }}>Comapring Send and Not Send Packages</h1>
          <br/>
          <br/>
    <div style={{marginLeft: theme.spacing(15)}}>
    <Autocomplete
    className={classes.textField}
    onChange={(event, value) =>{ console.log(value);setTime(value);fetchPieChart(value);}} // prints the selected value
    options={top100Films}
    getOptionLabel={(option) => option.title}
    style={{ width: 300 }}
    value={time}
    renderInput={params => (
        <TextField {...params} label="time" variant="outlined" />
    )}
/>
</div>
<div style={{marginLeft: theme.spacing(20)}}>
<Chart
// className={classes.textField}
  width={'1000px'}
  height={'600px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={data}
  options={{
    // title: 'All times Packages:',
    // Just add this option
    backgroundColor: 'transparent',
    is3D: true,
    marginLeft: 100,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>
</div>
)} 

