import React, { useState } from 'react'
import Burger from './Burger/burger'
import Controls from './Controls/controls'
import Summary from './Summary/summary'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useSelector ,useDispatch} from 'react-redux'
import {addIngredient,removeIngredient,updatepurchasable} from '../redux/Order/orderAction'


const BurgerBuilder = (props) => {

    const [togglebtn, setTogglebtn] = useState(false)

    const ingredient = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()


    const addIngredients = (type) => {
        dispatch(addIngredient(type))
        dispatch(updatepurchasable())
    }
    const removeIngredients = (type) => {
        dispatch(removeIngredient(type))
        dispatch(updatepurchasable())
    }
    const toggleModal = () => {
        setTogglebtn(!togglebtn)
    }

    const handleCheckout = () => {
        props.history.push("/checkout")
    }

    return (
        <div>
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={ingredient} />
                <Controls
                    ingredientAdded={(type) => addIngredients(type)}
                    ingredientRemoved={(type) => removeIngredients(type)}
                    price={ingredient.totalPrice}
                    togglebtn={toggleModal}
                    purchasable={ingredient.purchasable}
                />
            </div>
            <Modal isOpen={togglebtn}>
                <ModalHeader>Your Order Summary</ModalHeader>
                <ModalBody>
                    <Summary
                        ingredient={ingredient}
                    />
                    <h5>Totol Price: {ingredient.totalPrice}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success"style={{backgroundColor:"#D70F64"}} onClick={handleCheckout}>Continue to Checkout</Button>
                    <Button className="btn btn-secondary" onClick={toggleModal} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default BurgerBuilder

