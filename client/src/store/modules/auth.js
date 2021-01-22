import {
   AUTH_REQUEST,
   AUTH_SUCCSES,
   AUTH_ERROR,
   AUTH_LOGOUT,
   SET_ERRORS
} from '../actions/auth';
import { USER_REQUEST, USER_LOGOUT } from '../actions/user';
import { reactive } from 'vue';
import router from './../../router'; 


const state = reactive({
   status: '',
   token: localStorage.getItem('token') || '',
   errors:{},
});

const getters = {
   loginErrors : state => state.errors, 
}

const actions = {
   [AUTH_REQUEST]: async ({ commit, dispatch }, user) => {
      const errors={};
       if (!user.email) errors['email'] = 'email is required';
       if (!user.password) errors['password'] = 'password is required';
       if (user.email && !user.email.includes('@')) {
          errors['email'] = 'invalid email';
       }
       if (user.password && user.password.length < 8) {
          errors['password'] = 'password needs to be at least 8 characters';
       }
       if (Object.keys(errors).length > 0) {
          commit(SET_ERRORS, errors);
          return;
       }
      await dispatch(SET_ERRORS, {});
      commit(AUTH_REQUEST);

      await fetch('http://localhost:5000/users/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then(async (data) => {
            if(data.error)
            {
               const errors ={};
               errors['loginErrors']=data.error;
               await dispatch(SET_ERRORS,errors);
               return;
            }
            else{
               
               await dispatch(SET_ERRORS, {});
               commit(AUTH_SUCCSES, data.token);
               await dispatch(USER_REQUEST);
               // if(this.$route.query.redirect)
               router.push(router.currentRoute.value.query.redirect || {name:'Items'});
               
            }
            
         })
         .catch(() => {
            commit(AUTH_ERROR);
            localStorage.removeItem('token');
         });
   },

   [AUTH_LOGOUT]: ({ commit, dispatch }) => {
      return new Promise((resolve) => {
         commit(AUTH_LOGOUT);
         dispatch(USER_LOGOUT);
         resolve();
      });
   },
   [SET_ERRORS]:async({commit},error) => {
      commit(SET_ERRORS,error)
   }

};
const mutations = {
   [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
   },
   [AUTH_SUCCSES]: (state, token) => {
      localStorage.setItem('token', token);
      state.token = token;
      state.status = 'succses';
   },
   [AUTH_ERROR]: (state) => {
      state.status = 'error';
   },
   [AUTH_LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = '';
   },
   [SET_ERRORS]:(state,error) => {
      state.errors=error;
   }
};

export default {
   state,
   getters,
   mutations,
   actions,
};
