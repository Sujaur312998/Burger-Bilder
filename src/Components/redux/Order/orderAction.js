import * as actionTypes from './orderActionType'
import axios from 'axios'

export const addIngredient = (igtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    }
}

export const removeIngredient = (igtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const updatepurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE
    }
}

export const restIngredient = (purchasable) => {
    return {
        type: actionTypes.RESET_INGREDIENT,
        payload: purchasable
    }
}

export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const faildLoadOrders = () => {
    return {
        type: actionTypes.FAILED_LOAD_ORDERS,
    }
}

export const fetchOrders = (token,userId) => dispatch => {
    
    const queryPerameters='&orderBy="userId"&equalTo="'+userId+'"'

    axios.get('https://burger-builder-1344e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token+ queryPerameters)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(error => {
            dispatch(faildLoadOrders())
        })
}

