import React, { Fragment, useState } from "react";

// Material UI
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

// Forms
import CreateAccountFormDialog from "../forms/CreateAccount/CreateAccountFormDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)",
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    textTransform: "none",
  },
}));

// TODO: Add 'Forgot My Password' Feature

function Login() {
  const classes = useStyles();

  const [createAccountFormOpen, setCreateAccountFormOpen] = useState(false);

  return (
    <Fragment>
      <CreateAccountFormDialog open={createAccountFormOpen} close={() => setCreateAccountFormOpen(false)} />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={6} md={7} className={classes.image} />
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              Squad Goals
            </Typography>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Please Sign In
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    color="primary"
                    onClick={() => setCreateAccountFormOpen(true)}
                    className={classes.button}
                    variant="text"
                  >
                    Don't have an account? Sign Up!
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Login;
