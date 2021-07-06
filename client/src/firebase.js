import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp(
    {
        apiKey: "AIzaSyAsHX7IJ7mg9e8iFfPWVLslmOZDGnv1jIk",
        authDomain: "rtc-app-9a701.firebaseapp.com",
        projectId: "rtc-app-9a701",
        storageBucket: "rtc-app-9a701.appspot.com",
        messagingSenderId: "864728526308",
        appId: "1:864728526308:web:51e017e4b82b0d1e99ebf1",
        measurementId: "G-1DLB2TWL87"
    }).auth();
