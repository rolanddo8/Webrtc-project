import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../contexts/SocketContext';

const Notifications = () => {
    const { answerCall, connectionInfo, callAccepted } = useContext(SocketContext);

    return (
        <>
            {connectionInfo.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{connectionInfo.name} is calling: </h1>
                    <Button variant='contained' color='primary' onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        </>
    )
}

export default Notifications;
