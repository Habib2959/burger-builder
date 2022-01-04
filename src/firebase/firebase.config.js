import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDIgmhAzBBS50b5Ii_9sg12WfSzP-viIZE",
    authDomain: "burger-builder-4c440.firebaseapp.com",
    databaseURL: "https://burger-builder-4c440-default-rtdb.firebaseio.com",
    projectId: "burger-builder-4c440",
    storageBucket: "burger-builder-4c440.appspot.com",
    messagingSenderId: "772407199633",
    appId: "1:772407199633:web:68af49aad5c2ffc5b73c30",
    measurementId: "G-P85ZGS1EBG"
};

export const CreateUserInformation = async (userId, displayName) => {
    let userRef = firestore.doc(`users/${userId}`);
    let snapShot = await userRef.get();
    if (!snapShot.exists) {
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                createdAt
            })
        } catch (error) {
            console.log('error creating user in firestore', error.message);
        }
    }
}
 
try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    
}


const firestore = firebase.firestore();

export default firestore;
