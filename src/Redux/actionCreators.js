import axios from 'axios'
import * as actionTypes from './actionTypes'

export const addIngredients = ingredientType => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        payload: ingredientType
    }
}

export const removeIngredients = ingredientType => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        payload: ingredientType
    }
}

export const orderButtonToggle = () => {
    return {
        type: actionTypes.ORDER_BUTTON_TOGGLE,
    }
}

export const resetStore = () => {
    return {
        type: actionTypes.RESET_STORE
    }
}

export const ordersLoaded = orders => {
    return {
        type: actionTypes.ORDERS_LOADED,
        payload: orders
    }
}

export const orderLoadingFailed = () => {
    return {
        type: actionTypes.ORDERS_LOADING_FAILED
    }
}


export const fetchOrders = () => dispatch => {


    axios.get("https://burger-builder-4c440-default-rtdb.firebaseio.com/orders.json")
        .then(response => dispatch(ordersLoaded(response.data)))
        .catch(err => dispatch(orderLoadingFailed()))
}