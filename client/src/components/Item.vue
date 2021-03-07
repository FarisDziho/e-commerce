<template>
    <div class="selectWrapper">
      <div class="container">

          <img v-bind:src="state.item.image"/>
          <h2>{{state.item.title}}</h2>
          <h4>{{state.item.price}}$</h4>
          <button class="itemDetails" @click="showDetails">check details</button>        
          
      </div>
    </div>
</template>

<script>
import {reactive} from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import {SELECTED_ITEM} from '../store/actions/items'
export default {
  props:{
      item:{}
  },
  setup(props)
  {
    const state=reactive({
      item:props.item
    })

    const store=useStore();
    const router=useRouter();

    const  showDetails = () => {
      store.dispatch(SELECTED_ITEM,state.item.id)
      .then((id) => {
        router.push({name:'ItemDetails',params:{id:id}})
      })
    }
    return{
      state,
      showDetails
    }
  }
}
</script>

<style scoped>
.selectWrapper{
  width:100%;
  height:100%;
  /* border-left: solid 1px;
  border-bottom: solid 1px; */
  border:1px solid;
  border-color: #DDD;
  
}
.container {
  width:210px;
  margin:auto;
  position: relative;
  height: 500px;
  display: flex;
  flex-direction: column;
}
.container *{
    margin-bottom: 10px;
}
.container img {
  margin-top:10px;
  height: 60%;
  object-fit: contain;
}
.itemDetails{
  position: absolute;
  bottom:0;
  margin-bottom:15px;
  width:100%;
  padding:5px;
}
</style>