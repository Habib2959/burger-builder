import *as actionTypes from './actionTypes'


const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 40
}

const initialState = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },
    ],
    orders: [],
    ordersLoading: true,
    orderError: false,
    totalPrice: 80,
    puchaseable: false,
    token:null,
    userId: null,
    userName: '',
    authLoading: false,
    authErrorMessage:false,
}

export const reducer = (state = initialState, action) => {
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.payload];

            for (const items of ingredients) {
                if (items.type === action.payload) {
                    items.amount++;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: updatedPrice
            }
        case actionTypes.REMOVE_INGREDIENTS:
            const updatedReducedPrice = state.totalPrice - INGREDIENT_PRICES[action.payload]

            for (const items of ingredients) {
                if (items.type === action.payload) {
                    if (items.amount <= 0) return;
                    items.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: updatedReducedPrice
            }
        case actionTypes.ORDER_BUTTON_TOGGLE:
            let sum = ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0);
            return {
                ...state,
                puchaseable: sum > 0
            };
        case actionTypes.RESET_STORE:
            return{
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 },
                ],
                totalPrice: 80,
                puchaseable: false
            }

        case actionTypes.ORDERS_LOADED:
            let orders = [];
            for (const key in action.payload) {
                orders.push({...action.payload[key], id:key})
            }
            return{
                ...state,
                ordersLoading: false,
                orders: orders,
            }
        case actionTypes.ORDERS_LOADING_FAILED:
            return{
                ...state,
                ordersLoading: false,
                orderError: true,
            }

            // auth
        case actionTypes.AUTH_LOADING:
            return{
                ...state,
                authLoading: true,
                authErrorMessage:false,
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.payload.token,
                userId: action.payload.userId,
                userName: action.payload.userName,
                authLoading: false,
                authErrorMessage:false,
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId: null,
                userName: null,
                authLoading: false,
                authErrorMessage:false,
            }
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                authLoading: false,
                authErrorMessage:action.payload,
            }
        default:
            return state
    }
}