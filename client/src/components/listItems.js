import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { IconName } from "react-icons/fa";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MarketIcon from "@material-ui/icons/Storefront";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import BranchesIcon from "@material-ui/icons/Place";
import AboutUsIcon from "@material-ui/icons/Info";
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ContactUsIcon from "@material-ui/icons/ContactSupport";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
 import ListAltIcon from '@material-ui/icons/ListAlt';
import  { FaBoxOpen } from "react-icons/fa";
import  { AiOutlineSchedule } from "react-icons/ai";

import {
  BrowserRouter as Router,
  Switch,
  Route /*, Link*/,
} from "react-router-dom";
import Link from "@material-ui/core/Link";

/*const CustomLink = (
  <div>
    <Link to="/"></Link>
  </div>
);*/

class MainListItems extends React.Component {

  pushHistoryHome = () => {
    const { history } = this.props;
    history.push("/Home");
  };

  pushHistoryVolunteers = () => {
    const { history } = this.props;
    history.push("/Volunteers");
  };

  pushHistoryReports = () => {
    const { history } = this.props;
    history.push("/Reports");
  };

  pushHistoryMap = () => {
    const { history } = this.props;
    history.push("/Map");
  };

  pushHistoryBlog = () => {
    const { history } = this.props;
    history.push("/Blog");
  };

  pushHistoryListPackages = () => {
    const { history } = this.props;
    history.push("/ListPackages");
  };
  pushHistoryManagerCalendar = () => {
    const { history } = this.props;
    history.push("/Calendar");
  };
  pushHistoryManagerScheduler = () => {
    const { history } = this.props;
    history.push("/Scheduler");
  };
  render() {
    let permissionType=sessionStorage.getItem("permissionType");
    return (
      <div>
        <ListItem button onClick={this.pushHistoryHome}>
          <ListItemIcon>
            <HomeIcon  />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {permissionType=="admin" && <ListItem button onClick={this.pushHistoryVolunteers}>
          <ListItemIcon>
            <PeopleIcon size={28}/>
          </ListItemIcon>
          <ListItemText primary="Volunteers" />
        </ListItem>}
        {permissionType=="admin" && <ListItem button onClick={this.pushHistoryManagerScheduler}>
          <ListItemIcon>
            <AiOutlineSchedule size={24}/>
          </ListItemIcon>
          <ListItemText primary="Scheduler" />
        </ListItem>}
        <ListItem button onClick={this.pushHistoryMap}>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItem>
        {permissionType=="admin" &&<ListItem button onClick={this.pushHistoryReports}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>}

        <ListItem button onClick={this.pushHistoryBlog}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryListPackages}>
          <ListItemIcon>
            <FaBoxOpen size={24}/>
          </ListItemIcon>
          <ListItemText primary="Packages" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryManagerCalendar}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </div>
    );
  }
}

export default withRouter(MainListItems);