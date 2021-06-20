import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import { logout } from '../redux/Auth/authAction'
import { useDispatch } from 'react-redux';

const AuthLogout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logout())
    },[]);
    return (
        <Redirect to='/' />
    )
}

export default AuthLogout
