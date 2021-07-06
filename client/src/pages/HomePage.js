import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoCallPlayer from '../components/VideoCallPlayer';
import Option from '../components/Option';
import Notifications from '../components/Notifications';
import Chats from '../components/Chats';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}));

const HomePage = () => {
    const classes = useStyles();
    return (
        <>
            {/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Call App</Typography>
            </AppBar>
            <VideoCallPlayer />
            <Option>
                <Notifications />
            </Option> */}
            <Chats />
        </>
    )
};

export default HomePage;