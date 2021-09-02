

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import SignUpDialog from "./SignUpDialog";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import $ from "jquery";
import { useHistory } from "react-router-dom";
// import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random/?delivery)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  let history = useHistory();
  const [email, setEmail] = React.useState(localStorage.getItem("userEmail"));
  const [password, setPassword] = React.useState(
    localStorage.getItem("password")
  );
  const [checkedRemember, setChecked] = React.useState(
    JSON.parse(localStorage.getItem("checked"))
  );
  const classes = useStyles();

  useEffect(() => {
    fetch("/LogOut").then(()=>{sessionStorage.setItem("userEmail", "");sessionStorage.setItem("permissionType", "");});
  });

  const responseFacebook = (response) => {
    console.log(response);
  };

  const onSuccessGoogle = (response) => {
    // console.log(response.profileObj.googleId)
    var data = {
      emailAddress: response.profileObj.email,
      googleId: response.profileObj.googleId,
    };

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/login/google",
      data: data,
    
    }).done(function(data) {
      if(data.status==200){
        console.log(data.type)
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("permissionType", data.type?'admin':'volunteer');
        let isadmin;
        if(data.type){
          isadmin=true
        }else{
          isadmin=false
        }
        history.push({
          pathname: '/DashBoard',
          state: { admin: isadmin }
        });
        if (checkedRemember) {
          localStorage.setItem("password", password);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("checked", "true");
        } else {
          localStorage.setItem("password", "");
          localStorage.setItem("userEmail", "");
          localStorage.setItem("checked", "false");
        }
        //this.props.history.push("/Market");
      }
      })
      .fail(function(jqXhr) {
        console.log(jqXhr)
      })
  };
  const onFailureGoogle = (response) => {
    console.log(response);
  };

  const onChangeEmailHandler = (e) => setEmail(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };
  function submitHandler(e) {
    e.preventDefault();
    var data = {
      emailAddress: email,
      password: password,
    };

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/login",
      data: data,
    
    }).done(function(data) {
      if(data.status==200){
        console.log(data.type)
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("permissionType", data.type?'admin':'volunteer');
        sessionStorage.setItem("id", data.id);
        let isadmin;
        if(data.type){
          isadmin=true
        }else{
          isadmin=false
        }
        history.push({
          pathname: '/Home',
          state: { admin: isadmin }
        });
        if (checkedRemember) {
          localStorage.setItem("password", password);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("checked", "true");
        } else {
          localStorage.setItem("password", "");
          localStorage.setItem("userEmail", "");
          localStorage.setItem("checked", "false");
        }
        //this.props.history.push("/Market");
      }
      })
      .fail(function(jqXhr) {
        console.log(jqXhr)
      })
      
  }

  // function redirectSignUp(e) {
  //   //e.preventDefault();
  //   history.push("/SignUp");
  // }

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
        {/* <BrowserRouter> */}
          {/* <Switch> */}
            <Route
              exact
              from="/Login"
              render={(props) => (
                <div className={classes.paper}>
                  <br />
                  <br />
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <form
                    className={classes.form}
                    onSubmit={submitHandler}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={onChangeEmailHandler}
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      value={password}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={onChangePasswordHandler}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          checked={checkedRemember}
                          onChange={handleCheckChange}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                    >
                     Login
                    </Button>
                    {/* <GoogleLogin
                      clientId="89937054961-pjirtcn32cn53prhutk1u8n60p547vvo.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={onSuccessGoogle}
                      onFailure={onFailureGoogle}
                    /> */}
                    <br />
                    <Grid container>
                      {/* <Grid item xs>
                        <Link>Forgot password?</Link>
                      </Grid> */}
                      {/* <Grid item>
                        <Link onClick={redirectSignUp}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid> */}
                    </Grid>
                  </form>
                </div>
              )}
            />
          {/* </Switch> */}
          {/* </BrowserRouter> */}
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </div>
  );
}

// export default withRouter(Login);
