import React, { useEffect } from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/burgerBuilder'
import Orders from './Orders/orders'
import Checkout from './Orders/checkout'
import Auth from './Auth/Auth'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authCheck } from './redux/Auth/authAction'
import { useDispatch } from 'react-redux';
import Logout from './Auth/authLogout'

const Main = () => {
    const state = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

        
    useEffect(() => {
        dispatch(authCheck())
    }, []);

    let routes = null
    if (state.token === null) {
        routes = (
            <Switch >
                <Route path="/login" component={Auth} />
                <Redirect to='/login' />
            </Switch>

        )
    } else {
        routes = (
            <Switch >
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        )

    }
    return (
        <div>
            <Header />
            <div className='container'>
                {routes}
            </div>

        </div>
    )
}

export default Main
