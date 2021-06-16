import * as actionTypes from './orderActionType'

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
