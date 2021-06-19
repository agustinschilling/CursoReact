import firebase from 'firebase/app'
import 'firebase/firestore'

// sale de configuracion de proyecto, CDN
const config = {
    apiKey: "AIzaSyA6vB0zyzXijqdn1S8QZpC2BADjArvdmYg",
    authDomain: "autenticacion-react-as.firebaseapp.com",
    projectId: "autenticacion-react-as",
    storageBucket: "autenticacion-react-as.appspot.com",
    messagingSenderId: "993710445161",
    appId: "1:993710445161:web:90d1d694d5466eed59c8f8",
    measurementId: "G-Z9SJM6FY2M"
};

// Initialize Firebase
const fireb = firebase.initializeApp(config);

const store = fireb.firestore() 
// base de datos 

export { store }