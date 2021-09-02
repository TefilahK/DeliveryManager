import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import Card from '@material-ui/core/Card';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css'; 
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'


const AutoplaySlider = withAutoplay(AwesomeSlider);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
    backgroundColor: "rgb(255, 230, 230)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,

  },
  pos: {
    marginBottom: 12,
  },

  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url("https://files.pitchbook.com/website/images/ar/featured/b/2x/fulldelivery_vEu.png")`,
    backgroundSize: "cover",
    width:"1300px",
    height:"900px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // opacity: "0.",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },

  galary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleGalary: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
const theme = createMuiTheme({
})

export default function HomePage() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} />
        <Grid item xs={12} />
        <Grid item xs={12} />
      </Grid>
      <br />
      <Paper className={classes.mainFeaturedPost}>
        {/* Increase the priority of the hero background image */}

        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography variant="h3" color="inherit" style={{color:"white", fontWeight:"bold" , fontfamily:"cursive"}}>
                Delivery4You
              </Typography>
              <br />
              <Typography variant="h4" color="inherit" style={{color:"white", fontWeight:"bold", fontfamily:"cursive"}} paragraph>
                WHAT WE DO?
              </Typography>
              <Typography variant="h5" color="inherit" style={{color:"white", fontWeight:"bold",fontfamily:"cursive" }} paragraph>
               Delivery4You is a orginization which helps those in need or those who cannot afford basic necessities.
              </Typography>
              <Typography variant="h4" color="inherit" style={{color:"white", fontWeight:"bold",fontfamily:"cursive"}} paragraph>
                WHAT WE BELIVE IN?
              </Typography>
              <Typography variant="h5" color="inherit" style={{color:"white", fontWeight:"bold",fontfamily:"cursive" }}paragraph>
                In Delivery4You we belive in helping others giving and sharing. 
                Our volunteers do not get paid and they come from all over the country to be part of something bigger.
              </Typography>
              
            </div>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Typography variant="h3" color="inherit" align="center">
        Our Team 
      </Typography>
      <br/>
       <AutoplaySlider
        animation="cubeAnimation"
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={2000}
        style={{"--slider-height-percentage": "53%", "--slider-transition-duration": "200ms"}}
      >
    
        <div >
          <img src="https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg" style={{
              backgroundSize: 'cover',
            }}>
            </img>
        </div>
        <div >
          <img src="https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?size=626&ext=jpg" style={{
            backgroundSize: 'cover',
            }}></img>
        </div>
        <div >
          <img src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg" style={{
            backgroundSize: 'cover',
            }}></img>
        </div>
        <div >
          <img src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg" style={{
            backgroundSize: 'cover',
            width:"60%",
            height:"60%",
            marginLeft:theme.spacing(30),
            }}></img>
        </div>
        </AutoplaySlider>
     
      <br />
    </div>
  );
}




 
