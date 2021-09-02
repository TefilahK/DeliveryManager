import React from 'react';
import clsx from 'clsx';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Home,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import {
  Avatar,
  Button,
  Hidden,
} from '@material-ui/core';
import { Link as RouterLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chat from '@material-ui/icons/Chat';
import InputIcon from '@material-ui/icons/Input';
import Reports from './sideBar/Reports';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Switch,Route} from 'react-router-dom';
import Map from './sideBar/Map';
import VolunteersList from './sideBar/VolunteersList';
import HomePage from './sideBar/Home';
import Blog from './sideBar/Blog';
import ListPackages from './sideBar/ListPackages';
import MainListItems /*, secondaryListItems*/ from "./listItems";
import {ProtectedRoute} from './Protect_Route'
import ManagerCalendar from './Calendar'
import MyChat from './Chat';
import PieChart  from './reports/pieChart'
import BarChart  from './reports/barChart'
import LineChart  from './reports/lineChart'
import DonutChart  from './reports/donutChart'
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import $ from 'jquery';
import Scheduler from './sideBar/Scheduler';
import Footer from './Footer';
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    height:"68px",
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
 
    backgroundColor:"#6272a8"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontFamily: "Cursive",
    fontWeight: "bold",
    fontSize: "2rem",
    padding:"10px",
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

}));
// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };



export default function Dashboard() {
  let userName=sessionStorage.getItem("userEmail");
  // console.log(userName);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [unreadMessages, setUnreadMessages] = React.useState(0);
  const [user, setUser] = React.useState([]);
  const history=useHistory()
  let userId=sessionStorage.getItem("id")
  useEffect(() => {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/messages/findUnreadMessages",
      data:{userId: userId}
    
    }).done(function(unreadMessages) {
      setUnreadMessages(unreadMessages.data.length);
      })
      .fail(function(jqXhr) {
        console.log("cant get unread messages !!");
    }) 
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/users/getUserById",
      data: {id:userId},
    
    }).done(function(user) {
      setUser(user.user)
      })
      .fail(function(jqXhr) {
        console.log("cant find user by Id !!");
    }) 

  },[])
  const theme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        "&$selected": {
          backgroundColor: 'red'
        }
      },
  }
  })
  const handleExitApp=()=>{
    history.push('/Login')
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onClickChat=()=>{
    history.push("/Chat");
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const location = useLocation();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar  position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
  
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <img src="../../logo.png" style={{height:"65px",width:"65px",padding:"5px"}}></img>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Deliver4You
          </Typography>
      

          {/* <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <div style={{fontSize:"1.2rem"}}>{user.name}</div>
          <IconButton color="inherit" >
            <Avatar src={user.img} style={{height:theme.spacing(4), width: theme.spacing(4)}}></Avatar>
          </IconButton>
          <IconButton color="inherit">
          <Badge badgeContent={unreadMessages} color="error">
            <Badge badgeContent={unreadMessages} color="error">
              <Chat onClick={onClickChat}/>
              </Badge>
              </Badge>
            </IconButton>
          <IconButton color="inherit" >
            <ExitToAppIcon
            onClick={handleExitApp}
             />
          </IconButton>
          
            
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          backgroundColor:"lightgray"
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List ><MainListItems/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {Chart }
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Reports />
              </Paper>
            </Grid>
            { Recent Deposits }
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> }
              </Paper>
            </Grid>
            {/* Recent Orders }
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> }
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container> */}
        <Container className={classes.container}>
        <Switch>
           <ProtectedRoute
            exact
            path="/Home"
            component={HomePage }
          />:
          <ProtectedRoute
            exact
            path="/Volunteers"
            component={VolunteersList }
          />
          <ProtectedRoute 
           exact 
           path="/Reports" 
           component={Reports } />
          <ProtectedRoute
            exact
            path="/Map"
            component={Map }
          />
          <ProtectedRoute
            exact
            path="/Blog"
            component= {Blog}
          />
          <ProtectedRoute
            exact
            path="/ListPackages"
            component={ListPackages}
          />
          <ProtectedRoute
            exact
            path="/Scheduler"
            component={Scheduler}
          />
          <ProtectedRoute
            exact
            path="/Calendar"
            component={ManagerCalendar}
          />
          <ProtectedRoute
            exact
            path="/Chat"
            component={MyChat}
          />
           <ProtectedRoute
            exact
            path="/PieChart"
            component={PieChart }
          />:
          <ProtectedRoute
            exact
            path="/BarChart"
            component={BarChart }
          />
          <ProtectedRoute 
           exact 
           path="/LineChart" 
           component={LineChart } />
          <ProtectedRoute
            exact
            path="/DonutChart"
            component={DonutChart}
          />
          
        </Switch>
      </Container>
      <Footer />
      </main>
     
    </div>
  );
}