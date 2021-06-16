import * as actionType from './orderActionType'

const INGREDIENT_PRICE = {
    salad: 10,
    cheess: 30,
    meat: 80
}

const initialState = {
    ingredient: [
        { type: "salad", amount: 0 },
        { type: "cheess", amount: 0 },
        { type: "meat", amount: 0 },
    ],
    totalPrice: 80,
    purchasable: true
}

export const orderReducer = (state = initialState, action) => {
    const addIngredient = [...state.ingredient]
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            for (let item of addIngredient) {
                if (item.type === action.payload) {
                    item.amount++
                }
            } return {
                ...state,
                ingredient: addIngredient,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
            }
        case actionType.REMOVE_INGREDIENT:
            for (let item of addIngredient) {
                if (item.type === action.payload) {
                    item.amount--
                }
            } return {
                ...state,
                ingredient: addIngredient,
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
            }
        case actionType.UPDATE_PURCHASABLE:
            const sumary = state.ingredient.reduce((sum, element) => {
                return sum + element.amount
            }, 0)
            return {
                ...state,
                purchasable: sumary < 0
            }

        default:
            return state
    }
}


export const ingredientPrice = (state = INGREDIENT_PRICE, action) => {
    switch (action.type) {
        case actionType.UPDATE_INGREDIENT_PRICE:
            return
        default: return state
    }
}