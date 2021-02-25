import React from "react";
// import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import { useForm } from "react-hook-form";
import  SetPersistentMenuForm  from "./messengerSettings/setPersistentMenu";
import SetWhitelistedDomainsForm from "./messengerSettings/setWhitelistedDomains";

const MessengerSettings = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <SetPersistentMenuForm />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <SetWhitelistedDomainsForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default MessengerSettings;

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "80vh",
  },
  form: {
    fontSize: "15px !important",
  },
}));
