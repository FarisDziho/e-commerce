<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="submit">
      <h3>Log in</h3>
      <div class="pair">
        <label for="email">
          email:
          <span>{{errors.email}}</span>
        </label>
        <input required @input="onChange" v-model="user.email" type="text" name="email" />
      </div>
      <div class="pair">
        <label for="password">
          password:
          <span>{{errors.password}}</span>
        </label>
        <input required @input="onChange" v-model="user.password" type="password" name="password" />
      </div>
      <input type="submit" class="submit"/>
      <span>{{errors.loginErrors}}</span>
    </form>
    <div class="register">
      <p>New here?</p>
      <hr class="line" />
      <router-link to="/Register" class="register-link">
        <button>Create your account</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive , computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { AUTH_REQUEST, SET_ERRORS } from "../../src/store/actions/auth";
// function validateInput(user) {
//   if (!user.email || !user.password) return false;
//   else return true;
// }

export default {
  el: "#Login",
  setup() {
    const user = reactive({
      email: "",
      password: ""
    });
    const formErrors = reactive({
      errors: {}
    });
    const errors = computed(() => {
       return Object.assign({},store.getters.loginErrors,formErrors.errors);
        
    })

    const store = useStore();
    // const router = useRouter();
    function onChange() {
      
      handleFormErrors();
      store.dispatch(SET_ERRORS,{});
    }
    const submit =  () => {
       store.dispatch(AUTH_REQUEST, user);
    };

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
    // onBeforeMount(()=> store.dispatch(SET_ERRORS,""))
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
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid black;
  width: 400px;
}
.pair {
  margin: 20px 0;
}
.line {
  height: 1px solid black;
  width: 100%;
  color: #ddd;
}
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: space-evenly;
  padding: 30px;
}
.register .register-link {
  width: 100%;
}
.register button {
  width: 100%;
  padding: 5px 0;
}

input {
  width: 100%;
  margin-top: 10px;
  padding: 7px 10px;
  border: 1px solid lightgrey;
}
span{
  color:red;
  font-size:14px;
}
.submit{
  margin-bottom:10px;
}
</style>