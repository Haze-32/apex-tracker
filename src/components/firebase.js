import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCdh0RLwwSCZ6E_OJoI5kgxLr8famY3fzo",
    authDomain: "apextracker-d0c39.firebaseapp.com",
    projectId: "apextracker-d0c39",
    storageBucket: "apextracker-d0c39.appspot.com",
    messagingSenderId: "457727840375",
    appId: "1:457727840375:web:1daa354243fb479d303672",
    measurementId: "G-E22SYVTS1M"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(); // Exporting auth method
export const firestore = firebase.firestore(); // Exporting firestore method

export default firebase;
