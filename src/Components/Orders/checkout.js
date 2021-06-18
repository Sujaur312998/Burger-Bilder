import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap'
import axios from 'axios'
import Spinner from '../Spinner/spinner';
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {restIngredient} from '../redux/Order/orderAction'


const Checkout = (props) => {
    const [values, setValues] = useState({
        deliveryAddress: "",
        phone: "",
        paymentType: "Cash of Delivery",
    });
    const [isLoading, setIsLoading] = useState(false);

    const stores = useSelector(state => state.orderReducer)

    const dispatch = useDispatch()

    const goBack = () => {
        props.history.goBack("/")
    }

    const inputChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: [e.target.value]
        })
    }
    const submit = (e) => {

        e.preventDefault()

        setIsLoading(true)
        const orders = {
            ...stores,
            ...values,
            orderTime: new Date()
        }

        axios.post("https://burger-builder-1344e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", orders)
            .then(response => {
                if (response.status === 200) {
                    setIsLoading(false)
                    store.addNotification({
                        title: "Burger Order",
                        message: "Order Succresfully Placed!!!",
                        type: "success",
                        insert: "top",
                        container: "top-left",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                } else setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                store.addNotification({
                    title: "Burger Order",
                    message: 'Something Wrong!!! Please order again...',
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
                console.log(err)
            })



        dispatch(restIngredient(orders.purchasable))


        setValues({
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash of Delivery"
        })
        
    }

    let form = (<div className="container">
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px"
        }}> <strong>Price: {stores.totalPrice} BDT</strong>  </div>
        <form action="POST" style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px"
        }} >
            <textarea
                name='deliveryAddress'
                value={values.deliveryAddress}
                className='form-control'
                placeholder='Please enter your address...'
                onChange={inputChangeHandler}    >
            </textarea> <br />
            <input
                name='phone'
                className='form-control'
                value={values.phone}
                placeholder="Phone Number..."
                onChange={inputChangeHandler}
            />  <br />
            <select
                name="paymentType"
                className="form-control"
                value={values.paymentType}
                onChange={inputChangeHandler} >
                <option value='Cash on Delivery'>Cash on Delivery</option>
                <option value="Bkash">Bkash</option>
            </select> <br />
            <Button
                style={{ backgroundColor: "#D70F64" }}
                className="mr-auto"
                onClick={submit}
                disabled={stores.purchasable}>
                Place Order</Button>
            <Button color="secondary" className="ml-auto" onClick={goBack}>Cancel</Button>


        </form>
    </div>)
    return (
        <div>
            <ReactNotification />
            {isLoading ? <Spinner /> : form}
        </div>

    )
}

export default Checkout
