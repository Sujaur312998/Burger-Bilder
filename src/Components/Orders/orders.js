import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../redux/Order/orderAction'
import Order from './order'
import Spinner from '../Spinner/spinner'

const Orders = () => {

    const state = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders(state.token,state.userId))
    }, []);

    let order = null
    if (state.orderERR) {
        order = <p>Sorry Failed to Load Orders!!!</p>
    } else {
        if (state.order.length === 0) {
            order = <p>You have no Orders!!!</p>
        } else {
            order = state.order.map(item => {
                return (
                    <Order key={item.id} order={item} />
                )
            })
        }

    }

    return (
        <div>
            {state.orderLoading ? <Spinner /> : order}
        </div>
    )
}

export default Orders
