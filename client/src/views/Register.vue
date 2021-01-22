<template>
  <form class="form" @submit.prevent="submit">
    <h3>Register</h3>
    <div class="pair">
      <label for="name">Your name:</label>
      <input required v-model="user.name" type="text" name="name" />
    </div>
    <div class="pair">
      <label for="mail">Email: <span>{{errors.email}}</span></label>
      <input required @input="onChange" v-model="user.email" type="text" name="email" />
    </div>
    <div class="pair">
      <label for="password">Password: <span>{{errors.password}}</span></label>
      <input required @input="onChange" v-model="user.password" type="password" name="password" />
    </div>
    <input type="submit" id="submit"/>
    <span>{{errors.registrationError}}</span>
  </form>
</template>

<script>
import { reactive,computed,onBeforeMount} from "vue";
import { useStore } from "vuex";
import {PERFORM_REGISTER,SET_ERRORS} from '../store/actions/register' 


export default {
  el: "#Login",
  setup() {
    const user = reactive({
      name: "",
      email: "",
      password: ""
    });
    const formErrors = reactive({
      errors: {}
    });
    const errors = computed(() => {
        return Object.assign({},store.getters.registerErrors,formErrors.errors);
    })
    function onChange() {
      store.dispatch(SET_ERRORS,{});
      handleFormErrors();
    }
    function handleFormErrors() {
      const errors = {};
      if (user.email && !user.email.includes("@")) {
        errors["email"] = "invalid email";
      }
      if (user.password && user.password.length < 8) {
        errors["password"] = "password needs to be at least 8 characters";
      }
      formErrors.errors = errors;
    }
    onBeforeMount(()=> store.dispatch(SET_ERRORS,{}))


    const store = useStore();
    // const router = useRouter();
    const submit = () => {
        store.dispatch(PERFORM_REGISTER,user);
    };

    return {
      user,
      submit,
      onChange,
      errors,

    };
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid black;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pair {
  margin: 20px 0;
}

input {
  width: 100%;
  margin-top: 10px;
  padding: 10px 10px;
  border: 1px solid lightgrey;
}
span{
  color:red;
}
#submit{
  margin-bottom: 10px;
}
</style>