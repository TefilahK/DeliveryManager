import Chart from "react-google-charts";
import { useState } from "react";
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


let dummy=[
  ['City', 'Sent', 'notSent','notyet'],
  ['2014', 1000, 400, 200],
  ['2015', 1170, 460, 250],
  ['2016', 660, 1120, 300],
  ['2017', 1030, 540, 350],
]
export default function BarChart (){
  const timeCombo = [
    { title: 'Day', value: 0 },    
    { title: 'Week', value: 7 },   
    { title: 'Month', value: 30 }]      
const [data,setData]=useState([])
const [time,setTime]=useState(timeCombo[0])
async function fetchPieChart(time) {
  console.log(time)
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/reports/barChart/"+time.value
  
  }).done(function(fetchData) {
      console.log(fetchData)
      setData([['City', 'Sent', 'notSent'],...fetchData.barChart])
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
      <div>
         <h1 style={{fontFamily:"cursive",fontWeight:"bold",fontSize:25, marginLeft: theme.spacing(27) }}>Comapring Send and Not Send Packages between Cities</h1>
          <br/>
          <br/>
          <div style={{marginLeft: theme.spacing(15)}}>
      <Autocomplete
    className={classes.textField}
    onChange={(event, value) =>{ console.log(value);setTime(value);fetchPieChart(value);}} // prints the selected value
    options={timeCombo}
    getOptionLabel={(option) => option.title}
    style={{ width: 300 }}
    value={time}
    renderInput={params => (
        <TextField {...params} label="time" variant="outlined" />
    )}
    />
    </div>
  <div style={{marginLeft: theme.spacing(10)}}>
   <Chart
  width={'1000px'}
  height={"600px"}
  backgroundColor= {'transparent'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={data}
  options={{
    // Material design options
    colors:['blue','orange'],
    backgroundColor: 'transparent',
    // width:1000,
    // height:600,
    fontFamily:"cursive",fontSize:15, marginLeft: theme.spacing(20) ,
    is3D: true,
    marginLeft: theme.spacing(20),
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>
</div>
</div>
)}
