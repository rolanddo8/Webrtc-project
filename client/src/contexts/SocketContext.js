import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [myVideo, setMyVideo] = useState();
    const [name, setName] = useState('');
    const [connectionInfo, setConnectionInfo] = useState({});
    const [myId, setMyId] = useState('');
    const [screenStream, setScreenStream] = useState();
    const [userScreenVideo, setUserScreenVideo] = useState();
    const [incomingStream, setIncomingStream] = useState(false)

    const myVideoRef = useRef();
    const userVideoRef = useRef();
    const connectionRef = useRef();
    const userScreenVideoRef = useRef();
    const myScreenVideoRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                console.log("Context---Before setState")
                setMyVideo(currentStream);
                console.log("Context---After setState")
                myVideoRef.current.srcObject = currentStream;
            }).catch(error => console.log(error));

        socket.on('your id', (id) => setMyId(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setConnectionInfo({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.on('sharingScreen', ({ from, name: callerName, signal }) => {
            setUserScreenVideo({ isSharingScreen: true, from, name: callerName, signal });
        });

    }, []);

    useEffect(() => {
        if (userScreenVideo) {

            const peer = new Peer({ initiator: false, trickle: false });

            peer.on('signal', (data) => {
                socket.emit('acceptStream', { signal: data, to: userScreenVideo.from });
            });


            peer.on('stream', (currentStream) => {
                userScreenVideoRef.current.srcObject = currentStream;
            });

            peer.signal(userScreenVideo.signal);

            connectionRef.current = peer;

            peer.on('close', () => {
                leaveCall();
            });

            peer.on('error', (error) => {
                leaveCall();
            });

            setIncomingStream(true)
        }
    }, [userScreenVideo]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: myVideo });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: connectionInfo.from });
        });

        peer.on('stream', (currentStream) => {
            console.log(userVideoRef)
            userVideoRef.current.srcObject = currentStream;
        });

        peer.on('close', () => {
            leaveCall();
        });

        peer.on('error', (error) => {
            leaveCall();
        });

        peer.signal(connectionInfo.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: myVideo });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: myId, name });
        });

        peer.on('stream', (currentStream) => {
            userVideoRef.current.srcObject = currentStream;
        });

        peer.on('close', () => {
            leaveCall();
        });

        peer.on('error', (error) => {
            leaveCall();
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    const startStream = async (id) => {
        await navigator.mediaDevices.getDisplayMedia({
            cursor: true,
            video: {
                mediaSource: "screen",
                width: { max: '1920' },
                height: { max: '1080' },
                frameRate: { max: '120' }
            }
        }).then((myScreen) => {
            setScreenStream(myScreen);
            myScreenVideoRef.current.srcObject = myScreen;

        }).catch(err => console.log(err));

        const peer = new Peer({ initiator: true, trickle: false, stream: myScreenVideoRef.current.srcObject });


        peer.on('signal', (signal) => {
            socket.emit('sharingScreen', { userToCall: id, signalData: signal, from: myId, name });
        });


        socket.on('streamAccepted', (signal) => {

            peer.signal(signal);
        });

        peer.on('close', () => {
            leaveCall();
        });

        peer.on('error', (error) => {
            leaveCall();
        });

        connectionRef.current = peer;
    };

    return (
        <SocketContext.Provider value={{
            connectionInfo, incomingStream, callAccepted, myVideoRef, userVideoRef, myVideo, name, setName, callEnded, myId, callUser, leaveCall, answerCall, startStream, myScreenVideoRef, screenStream, userScreenVideo, userScreenVideoRef
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };