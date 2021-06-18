import React from 'react'

const Order = (props) => {
    //console.log(props.order.ingredient);
    const ingredients = props.order.ingredient.map((item, index) => {
        return (
            <span key={index} style={{
                border: "1px solid gray",
                padding: '5px',
                marginRight: '5px',
                borderRadius: '5px',
                backgroundColor: "#ccc"
            }}>
                <span>{item.amount} x {item.type}</span>
            </span>
        )
    })
    return (
        <div style={{
            border: "1px solid gray",
            padding: '20px',
            margin: '20px',
            borderRadius: '5px',
            backgroundColor: "#cccfff"
        }}>
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Address: {props.order.deliveryAddress}</p>
            <hr />
            {ingredients}
            <hr />
            <h4>Price: {props.order.totalPrice}</h4>
        </div>
    )
}

export default Order
