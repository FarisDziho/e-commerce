import { createStore } from 'vuex';
import user from './modules/user'
import auth from './modules/auth'
import items from './modules/items'
import cart from './modules/cart'
import register from './modules/register'
import createPersistedState from 'vuex-persistedstate';

// Create a new store instance.
const store = createStore({
   modules: {
      user,
      auth,
      items,
      cart,
      register,
   },
   plugins: [
      createPersistedState({
         storage: window.sessionStorage,
      }),
   ],
});

export default store;
