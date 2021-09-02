import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit">Deliver4You by Moriya Maor & Tefilah Katz</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    //flexDirection: "column",
    //minHeight: "30vh",
  },
  main: {
    //marginTop: theme.spacing(8),
    //marginBottom: theme.spacing(2),
  },
  footer: {
    // padding: theme.spacing(3, 2),
    //marginTop: "auto",
    textAlign: "center",
    width: "1500",
    backgroundColor:"transparent"
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <footer className={classes.footer}>
        <br />
        <Copyright />
        <br />
      </footer>
    </div>
  );
}
