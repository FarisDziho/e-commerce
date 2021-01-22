import {PERFORM_REGISTER,SET_ERRORS} from '../actions/register'
import {reactive} from 'vue';
import router from '../../router/index'

    const state = reactive({
        errors:{}
    })
    const getters={
        registerErrors:state => state.errors
    }
    const actions = {
        [PERFORM_REGISTER]:async({commit},user) => {
            const errors = {};
            if(!user.email) errors['email'] = "email is required"
            if (!user.password) errors['password'] = 'password is required';
            if (!user.name) errors['name'] = 'name is required';
            if (user.email && !user.email.includes('@')) {
               errors['email'] = 'invalid email';
            }
            if (user.password && user.password.length < 8) {
               errors['password'] = 'password needs to be at least 8 characters';
            }
            if(Object.keys(errors).length > 0)
            {
                commit(SET_ERRORS,errors);
                return;
            }
            commit(SET_ERRORS,{});
            fetch('http://localhost:5000/users/register', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(data => {
                if(data.error)
                   {
                        const error = {};
                        error['registrationError'] = data.error;
                        commit(SET_ERRORS,error);
                        return;
                   }
                else
                    {
                        router.push({name:'Login'});
                    }
            })
        },
        [SET_ERRORS]:async ({commit}, error) => {
            commit(SET_ERRORS,error);
        }

    } 
    const mutations = {
        [SET_ERRORS] : (state,error) => {
           state.errors=error;
        }
    }
    export default {
        state,getters,actions,mutations
    }