import React, { useState } from 'react'
import { Input, Button, Alert } from 'reactstrap'
import { Formik } from 'formik'
import { auth } from '../redux/Auth/authAction'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner/spinner'


const Auth = () => {
    const [mode, setMode] = useState('Sign up');
    const state = useSelector(state => state.orderReducer)
    const handlemode = () => {
        setMode(mode === "Sign up" ? "Login" : "Sign up")

    }

    //console.log(state);
    const dispatch = useDispatch()

    let err = null
    if (state.authFaildMsg !== null) {
        err = (<Alert color='danger'>{state.authFaildMsg}</Alert>)
    }

    let form = null
    if (state.authLoading) {
        form = <Spinner />
    } else {
        form = (
            <Formik initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
            }}

                onSubmit={
                    (values, { resetForm }) => {
                        //console.log(values);
                        dispatch(auth(values.email, values.password, mode))
                        resetForm()
                    }
                }
                validate={
                    (values) => {
                        const errors = {}

                        if (!values.email) {
                            errors.email = "Required"
                        } else if (!/^[A-Z0-9._%+_]+@[A-Z0-9._]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalide email address'
                        }

                        if (!values.password) {
                            errors.password = "Required"
                        } else if (values.password.length < 6) {
                            errors.password = "Password must be 6 characters!!!"
                        }

                        if (mode === "Sign up") {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Required'
                            } else if (values.password !== values.confirmPassword) {
                                errors.confirmPassword = " Password filed does not match!!!"
                            }
                        }
                        //    console.log(errors);
                        return errors
                    }
                }
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <div className='container' style={{
                        border: "1px solid grey",
                        margin: "15px",
                        padding: "25px",
                        borderRadius: "5px"
                    }}>
                        <form action="POST" onSubmit={handleSubmit}>
                            <Button className='btn btn-lg' type='button'
                                style={{
                                    width: '100%',
                                    backgroundColor: "#D70F64",
                                    marginBottom: "25px",
                                    color: 'white',
                                    cursor: "pointer"
                                }}
                                onClick={handlemode}
                            >Swithch to {mode === "Sign up" ? "Login" : "Sign up"}</Button>

                            <Input
                                name="email"
                                placeholder="Enter Your Email"
                                className='form-control'
                                values={values.email}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <span style={{ color: 'red', fontSize: "10px" }}>{errors.email}</span>
                            <br />
                            <Input
                                name="password"
                                type='password'
                                placeholder="password"
                                className='form-control'
                                values={values.password}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <span style={{ color: 'red', fontSize: "10px" }}>{errors.password}</span>
                            <br />
                            {mode === "Sign up" ? <div>
                                <Input
                                    type='password'
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className='form-control'
                                    values={values.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <span style={{ color: 'red', fontSize: "10px" }}>{errors.confirmPassword}</span>
                                <br />
                            </div> : null}

                            <Button type="submit" className='btn btn-success'>{mode}</Button>
                        </form>
                    </div>
                )}
            </Formik>
        )
    }


    return (
        <div className='container'>
            {err}
            {form}
        </div>
    )
}

export default Auth
