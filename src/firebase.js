import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const app = firebase.initializeApp({
    apiKey: process.env.API_KEY || "AIzaSyCNlbjiWn8MD-ynsnYz6Ukj84NvkS52JV4",
    authDomain: process.env.AUTH_DOMAIN || "dropbox-tutorial.firebaseapp.com",
    projectId: process.env.PROJECT_ID || "dropbox-tutorial",
    storageBucket: process.env.STORAGE_BUCKET || "dropbox-tutorial.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID || "571065471485",
    appId: process.env.APP_ID || "1:571065471485:web:10c8824a8b38d23af7c994"
});
const firestore = app.firestore();

export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = app.storage();
export const auth = app.auth();
export default app;

