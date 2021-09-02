
import React, { useState  } from "react";
import GoogleMapReact  from "google-map-react";
import "./css/marker.css";
import Paper from "@material-ui/core/Paper";
import { Item, Label } from "semantic-ui-react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { lighten, makeStyles } from '@material-ui/core/styles'
import $ from "jquery";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Fragment } from "react";
import randomColor from 'randomcolor';
import {google_API} from "../../keys"


let markerList = [];
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

const SimpleMap = (props) => {
  const [marker, setMarker] = useState([]);
  const [point, setpoint] = useState([]);
  const [center, setCenter] = useState({ lat: 31.786362, lng: 35.191316 });
  const [zoom, setZoom] = useState(8);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  React.useEffect(()=>{
    setmarkerOnMap(new Date())
  }, []) 
    function setmarkerOnMap(date){
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/map/getMarkermap", 
        data: {date: date ,email:sessionStorage.getItem("userEmail")}
      }).done( function(fetchData) {
        console.log(fetchData.packages)
        let points=[]
        let colors=new Object();
        fetchData.packages.forEach(el=>{
          let color;
          if(el.isSent==true){
            color='black'
          }
          else{
            if(colors[el.volunteerId]==null || colors[el.volunteerId]==undefined){
              color = randomColor();
              colors[el.volunteerId]=color
            }else{
              color=colors[el.volunteerId]
            }
          }
          points.push({lat:el.lat, lng:el.lon, label:el.address,color:color})
        })
        console.log(points)
        setMarker(points)
      })
        .fail(function(jqXhr) {
          console.log(jqXhr)
      })
    }
    
  const useStyle = makeStyles((theme) => ({
    title:{
      fontSize:"50px"
    },
    datePicker:{
      selectColor: '#FF72B1',
    headerColor: '#FF72B1'
    },
    textField: {
      marginLeft: theme.spacing(60),
      marginRight: theme.spacing(1),
      width: 200,
      height:100,
    },
  }))
  const classes = useStyle();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setMarker([]);
    setmarkerOnMap(date)
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} style={{color:"black"}}>
       <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Date"
        format="dd/MM/yyyy"
        value={selectedDate}
        className={classes.textField}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      />
      </MuiPickersUtilsProvider>
      <GoogleMapReact
        bootstrapURLKeys={{ key: google_API }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {marker.map((item) => (
          <Marker
            lat={item.lat}
            lng={item.lng}
            label={Item.label}
            name="My Marker"
            color={item.color}
            key={item.label}
          />
        ))}
      </GoogleMapReact>

      <br />
      <br />
      <br />
      </div>
  
  );
};

export default SimpleMap;