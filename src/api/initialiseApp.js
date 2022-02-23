import firebase from 'firebase';
import firebaseApp from 'firebase/app';
import firebaseConfig from './firebaseConfig';

firebaseApp.initializeApp(firebaseConfig);

const firebaseDb = firebase.database();

export default firebaseDb;
