import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import {ProtectedRoute} from '../Protect_Route';
import {Switch,Route} from 'react-router-dom';
import PieChart  from '../reports/pieChart'
import BarChart  from '../reports/barChart'
import LineChart  from '../reports/lineChart'
import DonutChart  from '../reports/donutChart'
import { Paper } from '@material-ui/core';
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    marginLeft:40,
    flexDirection:"column",
   
  },
  image: {
    position: 'relative',
    margin: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
      
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  title:{
    fontSize:"50px",
    marginRight:theme.spacing(8),
    fontFamily:"cursive",
    // fontWeight:"bold",
        outlineWidth: "thin",
        border: "1px solid black",
        outlineStyle: "solid",
  },
  
}));

export default function Reports() {
  const history=useHistory();
  const handleBarChart=()=>{
    history.push("/BarChart")
  }
  const handlePieChart=()=>{
    history.push("/PieChart")
  }
  const handleLineChart=()=>{
    history.push("/LineChart")
  }
  const handleDonutChart=()=>{
    history.push("/DonutChart")
  }
const images = [
  {
    url: 'https://media.istockphoto.com/vectors/bar-chart-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1152899468?k=6&m=1152899468&s=612x612&w=0&h=vhpFMyUQzPgxPv0pL94npANkEsgVAhW_xmEXMel7AVw=',
    title: 'BarChart',
    width: '45%',
    height: '45%',
    onclick:handleBarChart,
    
  },
  {
    url: 'https://soesbefinancial.com/wp-content/uploads/2020/09/colored-pie-chart-hi.png',
    title: 'PieChart',
    width: '45%',
    height: '45%',
    onclick:handlePieChart,
    
  },
];
const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      "&$selected": {
        backgroundColor: 'red'
      }
    },
 }
})

  const classes = useStyles();
  return (
    <Paper style={{width:"1100px",height:"600px", marginLeft:theme.spacing(10)}}>
    <div className={classes.root}>
      <div>
        <br/>
       <h1 align="center" className={classes.title}>Reports</h1>
       </div>
       <br/>
       <div>
      {images.map((image) => (
        <ButtonBase onClick={image.onclick}
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            height:"350px"
            // height:image.height,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        
      ))}
      </div>
    </div>
    </Paper>
  );
}
