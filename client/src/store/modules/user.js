import {
   USER_REQUEST,
   USER_SUCCSES,
   USER_ERROR,
   USER_LOGOUT,
   CHECK_BALANCE,
   MAKE_A_TRANSACTION,
} from '../actions/user';
import { REMOVE_ALL_FROM_CART } from '../actions/cart';
import { AUTH_LOGOUT } from '../actions/auth';
import { reactive } from 'vue';

// function initialState(){
//    return{
//    status:'',
//    account:null
//    }
// }

const state = reactive({
   status: '',
   account: null,
});

const getters = {
   isAccountLoaded: (state) => !!state.account,
   account: (state) => state.account,
};

const actions = {
   [USER_REQUEST]: async ({ commit, dispatch }) => {
      commit(USER_REQUEST);
      const token = localStorage.getItem('token');
      fetch('http://localhost:5000/users/login', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer ' + token,
         },
      })
         .then((res) => res.json())
         .then((user) => {
            commit(USER_SUCCSES, user);
         })
         .catch(() => {
            console.log('failed to fetch user');
            commit(USER_ERROR);
            dispatch(AUTH_LOGOUT);
         });
   },
   [USER_LOGOUT]: async ({ dispatch, commit }) => {
      dispatch(REMOVE_ALL_FROM_CART);
      commit(USER_LOGOUT);
   },
   [CHECK_BALANCE]: async ({ state }, purchaseCost) => {
      console.log(state.account.balance);
      return state.account.balance > purchaseCost ? true : false;
   },
   [MAKE_A_TRANSACTION]:async({commit},purchaseCost) =>{
      console.log(purchaseCost)
      commit(MAKE_A_TRANSACTION,purchaseCost);
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/user/transaction', {
         method: 'PUT',
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({purchaseCost}),
      })
      .then(() => console.log("uspjeh"))
   },
};
const mutations = {
   [USER_REQUEST]: (state) => {
      state.status = 'loading';
   },
   [USER_SUCCSES]: (state, user) => {
      state.status = 'succses';
      state.account = user;
   },
   [USER_ERROR]: (state) => {
      state.status = 'error';
   },
   [USER_LOGOUT]: (state) => {
      (state.status = ''), (state.account = null);
   },
   [MAKE_A_TRANSACTION]:(state,purchaseCost)=>{
      state.account.balance-=purchaseCost;
   }
};
export default {
   state,
   getters,
   mutations,
   actions,
};
