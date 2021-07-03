import React from 'react';
import { Typography, AppBar, Paper, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import VideoCallPlayer from '../components/VideoCallPlayer';
import Option from '../components/Option';
import Notifications from '../components/Notifications';

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
            <Paper className={classes.container}>
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
            </Paper>
        </div>
    )
};

export default LoginPage;