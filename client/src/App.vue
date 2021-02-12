<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
// import Items from './components/Items'
// import Login from './views/Login'
import {useStore} from 'vuex'
import { onBeforeMount } from 'vue'
import {SET_CATEGORY} from './store/actions/items'
export default {
  name: 'App',
  
  components:{
    // Login,
    Navbar
  },
  setup(){
    const store=useStore();
    onBeforeMount(async () => {
      await store.dispatch(SET_CATEGORY,'all');
    })
    return {
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-size: 18px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>
  