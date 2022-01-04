import axios from 'axios';
import *as actionType from './actionTypes' ;
import { CreateUserInformation} from '../firebase/firebase.config';
import firestore from '../firebase/firebase.config';

export const authSuccess = (token, userId, userName) => {
    return{
        type: actionType.AUTH_SUCCESS,
        payload:{
            token : token,
            userId : userId,
            userName: userName
        }
    }
}


export const authLoading = isLoading =>{
    return {
        type: actionType.AUTH_LOADING,
        payload: isLoading
    }
}

export const authFailed = errorMessage =>{
    return{
        type: actionType.AUTH_FAILED,
        payload: errorMessage
    }
}



export const auth = (email, password, name, mode) => dispatch => {
    dispatch(authLoading(true))
    const authData ={
        email : email,
        password: password,
        returnSecureToken: true
    }
     let authURL = null;
     if (mode==="Login") {
         authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
     }else{
        authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
     }
    const apiKey = "AIzaSyDIgmhAzBBS50b5Ii_9sg12WfSzP-viIZE";
    axios.post( authURL+ apiKey , authData)
    .then(response => {
        dispatch(authLoading(false))

        localStorage.setItem('userName', name);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('uid', response.data.localId);
        let expirationTime = new Date (new Date().getTime() + response.data.expiresIn *1000);
        localStorage.setItem('expirationTime', expirationTime);


        if (response.data.kind === "identitytoolkit#SignupNewUserResponse") {
            CreateUserInformation(response.data.localId, name);
            localStorage.setItem('userName', name);
            dispatch(authSuccess(response.data.idToken, response.data.localId, name))
        }else{
            let userName = null;
            const getTheUserName = async userId => {
                let userRef = firestore.doc(`users/${userId}`);
                let snapShot = await userRef.get();
                try {
                    userName = snapShot.data().displayName;
                    localStorage.setItem('userName', userName);
                    dispatch(authSuccess(response.data.idToken, response.data.localId, userName))
                } catch (error) {
                    console.log("error form get the username", error.message)
                }
            
            }
            getTheUserName(response.data.localId);
        }

    })
    .catch(error => {
        dispatch(authLoading(false));
        dispatch(authFailed(error.response.data.error.message))
    })
}


export const logout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('uid');
    localStorage.removeItem('userName');
    return{
        type: actionType.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch =>{
    const token = localStorage.getItem('token');
    if (!token) {
        // logout
        dispatch(logout())
    } else {
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime <= new Date()) {
            //logout
            dispatch(logout())
        } else {
            const userID = localStorage.getItem('uid');
            const userName = localStorage.getItem('userName')
            dispatch(authSuccess(token, userID, userName))
        }
    }
}