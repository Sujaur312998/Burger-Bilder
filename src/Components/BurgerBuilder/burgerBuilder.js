import React, { useState, createContext } from 'react'
import Burger from './Burger/burger'
import Controls from './Controls/controls'
import Summary from './Summary/summary'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const INGREDIENT_PRICE = {
    salad: 10,
    cheess: 30,
    meat: 80
}
export const amount = createContext()

const BurgerBuilder = () => {
    const [ingredient, setIngredient] = useState({
        ingredient: [
            { type: "salad", amount: 0 },
            { type: "cheess", amount: 0 },
            { type: "meat", amount: 0 },
        ]
    })
    const [togglebtn, setTogglebtn] = useState(false)
    const [totalPrice, setTotalPrice] = useState(60)
    const [purchasable, setPurchasable] = useState(true)


    const updatePurchasable = (addAmount) => {
        const sumary = addAmount.reduce((sum, element) => {
            return sum + element.amount
        }, 0)
        setPurchasable(sumary === 0 ? true : false)
    }

    const addIngredient = (type) => {
        const addAmount = [...ingredient.ingredient]
        const newPrice = totalPrice + INGREDIENT_PRICE[type]
        for (let item of addAmount) {
            if (item.type === type) {
                item.amount++
            }
        }
        setIngredient({ ingredient: addAmount })
        setTotalPrice(newPrice)
        updatePurchasable(addAmount)
    }
    const removeIngredient = (type) => {
        const addAmount = [...ingredient.ingredient]
        const newPrice = totalPrice - INGREDIENT_PRICE[type]
        for (let item of addAmount) {
            if (item.type === type) {
                if (item.amount <= 0) { return null };
                item.amount--
            }
        }
        setIngredient({ ingredient: addAmount })
        setTotalPrice(newPrice)
        updatePurchasable(addAmount)
    }
    const toggleModal = () => {
        setTogglebtn(!togglebtn)
    }

    return (
        <div>
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={ingredient} />
                <Controls
                    ingredientAdded={(type) => addIngredient(type)}
                    ingredientRemoved={(type) => removeIngredient(type)}
                    price={totalPrice}
                    togglebtn={toggleModal}
                    purchasable={purchasable}
                />
            </div>
            <Modal isOpen={togglebtn}>
                <ModalHeader>Your Order Summary</ModalHeader>
                <ModalBody>
                    <Summary
                        ingredient={ingredient}
                    />
                    <h5>Totol Price: {totalPrice}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success">Continue to Checkout</Button>
                    <Button className="btn btn-secondary" onClick={toggleModal} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default BurgerBuilder

