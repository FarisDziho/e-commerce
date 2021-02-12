import { ref } from 'vue'
import {TRIGGER_ANIMATION,ADD_TO_CART,REMOVE_FROM_CART,REMOVE_ALL_FROM_CART} from '../actions/cart'
const state={
    animate:ref(false),
    cartItems:[],
}
const getters={
    isAnimated: (state) => state.animate,
    getCartItems:(state) => state.cartItems

}
const actions = {
    [ADD_TO_CART]:async ({dispatch,commit},obj)=>{
        var dateTime = new Date().getMilliseconds();
        const item = {...obj,['dateTime']:dateTime};
        commit(ADD_TO_CART,item);
        dispatch(TRIGGER_ANIMATION);
    },
    [REMOVE_FROM_CART]:async({commit},item)=>{
        commit(REMOVE_FROM_CART,item);
    },
    [REMOVE_ALL_FROM_CART]:async({commit})=>{
        commit(REMOVE_ALL_FROM_CART);
    },
    // [GET_CART_ITEMS]:async()=>{
    //     const token = localStorage.getItem('token');
    //     await fetch('http://localhost:5000/user/cart', {
    //        headers: {
    //             Authorization: 'Bearer ' + token,
    //        }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })

    // },
    [TRIGGER_ANIMATION]: ({commit}) => {
        commit(TRIGGER_ANIMATION)
        setTimeout(() => {
            commit(TRIGGER_ANIMATION)

        },200)

    }
}
const mutations = {
    [TRIGGER_ANIMATION]:(state) => {
        state.animate = !state.animate;
    },
    [ADD_TO_CART]:(state,item)=>{
        state.cartItems.push(item);
    },
    [REMOVE_FROM_CART]:(state,item)=>{
        state.cartItems=state.cartItems.filter(items => (items.id!=item.id || items.dateTime!=item.dateTime));
    },
    [REMOVE_ALL_FROM_CART]:(state)=>{
        state.cartItems=[];
    },
}

export default {
    state,getters,actions,mutations
}