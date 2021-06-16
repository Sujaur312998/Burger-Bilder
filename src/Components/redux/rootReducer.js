import { combineReducers } from "redux";
import { orderReducer,ingredientPrice } from './Order/orderReducer'

const rootReducer = combineReducers({
    orderReducer,ingredientPrice
})

export default rootReducer