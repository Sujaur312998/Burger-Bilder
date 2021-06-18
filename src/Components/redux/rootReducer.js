import { combineReducers } from "redux";
import { orderReducer } from './Order/orderReducer'

const rootReducer = combineReducers({
    orderReducer,
    //ingredientPrice
})

export default rootReducer