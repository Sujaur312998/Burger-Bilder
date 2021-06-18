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
    order: [],
    orderLoading: true,
    orderERR: false,
    totalPrice: 60,
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
        case actionType.RESET_INGREDIENT:
            return {
                ...state,
                ingredient: [
                    { type: "salad", amount: 0 },
                    { type: "cheess", amount: 0 },
                    { type: "meat", amount: 0 },
                ],
                purchasable: true,
                totalPrice: 60,
            }
        case actionType.LOAD_ORDERS:
        //    console.log(action.payload);
            let orders=[];
            for(let key in action.payload ){
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
//            console.log(orders);
            return ({
                ...state,
                order: orders,
                orderLoading: false
            })
        case actionType.FAILED_LOAD_ORDERS:
            return{
                ...state,
                orderERR:true,
                orderLoading: false
            }

        default:
            return state
    }
}


/* export const ingredientPrice = (state = INGREDIENT_PRICE, action) => {
    switch (action.type) {
        case actionType.UPDATE_INGREDIENT_PRICE:
            return
        default: return state
    }
} */