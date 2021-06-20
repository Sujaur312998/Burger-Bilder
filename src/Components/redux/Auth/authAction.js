import * as authActiontype from './authActionType'
import axios from 'axios'

export const authSuccess = (token, userId) => {
    return {
        type: authActiontype.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = (authLoading) => {
    return {
        type: authActiontype.AUTH_LOADING,
        payload: authLoading
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
        //logOut
        dispatch(logout())
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"))
        if (expirationTime <= new Date()) {
            //logout
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return {
        type: authActiontype.AUTH_LOGOUT
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let AUTH = null

    if (mode === "Sign up") {
        AUTH = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    } else {
        AUTH = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }

    const API_KEY = 'AIzaSyAEcssRGDJJU-Zo-kR4wQGNzsnCcAfTMC8'
    axios.post(AUTH + API_KEY, authData)
        .then(response => {
            if (response.status === 200) {
                dispatch(authLoading(false))
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)

                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem("expirationTime", expirationTime)

                dispatch(authSuccess(response.data.idToken, response.data.localId))
            }

        })
        .catch(err => {
            dispatch(authLoading(false))
        //    console.log(err.response.data.error.message);
            dispatch(authFailed(err.response.data.error.message))
        })
}

export const authFailed=(errMsg)=>{
    return{
        type: authActiontype.AUTH_FAILED,
        payload: errMsg
    }
}