import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Fab from "@material-ui/core/Fab";
const styles = (theme) => ({
  centerScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "95vh",
  },

  Logo: {
    fontSize: 70,
    position: "fixed",
    top: "39%",
    left: "49.5%",
  },
  progress: {
    position: "fixed",
    top: "30%",
    left: "45%",
  },
});

class Init extends React.Component {
  componentDidMount() {
    this.props.history.push("/Login");
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Init));