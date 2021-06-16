import React from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/burgerBuilder'
import Orders from './Orders/orders'
import Checkout from './Orders/checkout'

import { Route } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Header />
            <div className='container'>
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route  path="/" exact component={BurgerBuilder} />
            </div>

        </div>
    )
}

export default Main
