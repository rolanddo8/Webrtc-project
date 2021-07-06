import React from 'react';
import { Typography, AppBar, Paper, TextField } from '@material-ui/core';
import { MailOutline, Facebook } from '@material-ui/icons';
import "firebase/app";

import { auth } from '../firebase';
import firebase from 'firebase/app';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    rootLogin: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

}));

const LoginPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.rootLogin}>
            <h2>Welcome to My RTC App!</h2>
            {/* <Paper className={classes.container}>
                <TextField id="filled-basic" label="email" variant="filled" />
                <TextField id="filled-basic" label="password" variant="filled" />
            </Paper> */}
            <div className="login-button google" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}><MailOutline /> Sign In with Google</div>
            <br /> <br />
            <div className="login-button facebook" onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}><Facebook /> Sign In with Facebook</div>
        </div>
    )
};

export default LoginPage;