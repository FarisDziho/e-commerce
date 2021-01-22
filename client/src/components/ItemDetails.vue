<template>
  <div class="container">
    <div class="imgContainer">
      <img class="img" v-bind:src="item.image" />
    </div>
    <div class="infoContainer">
      <div class="itemTitle">
        <h1 class="title">{{item.title}}</h1>
      </div>
      <div class="itemDesc">
        <p class="desc">{{item.description}}</p>
      </div>
      <div class="itemPrice">
        <p>price:&nbsp;&nbsp;</p>
        <h3 class="price">{{item.price}}$</h3>
      </div>
      <div class="addToCart">
          <button class="btnAddToCart" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {computed} from 'vue';
import { useRouter } from 'vue-router';
import {TRIGGER_ANIMATION} from '../store/actions/cart'

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const item = store.getters.getSelectedItems;

    let isLoggedIn = computed(() => {
      // console.log(store.getters.isAccountLoaded);
      return store.getters.isAccountLoaded;
    });
    // console.log(item);
    const addToCart = () => {
        if(!isLoggedIn.value)
            router.push({name:'Login',query:{redirect:router.currentRoute.value.fullPath}});
        // console.log(router.currentRoute.value);
        store.dispatch(TRIGGER_ANIMATION)
    }
   

    return {
      item,
      addToCart
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 30px;
}

.imgContainer img {
  max-height: 500px;
  height: 100%;
  object-fit: contain;
}
.infoContainer {
  padding: 0 40px 0 100px;
  display: flex;
  flex-direction: column;
}
.infoContainer *{
    margin-bottom: 40px;
}
.title{
    font-size: 30px;
}
.itemPrice {
  display: flex;
}
.itemPrice *{
    font-size:20px;
}
.btnAddToCart{
    padding:8px 22px;
    background-color: rgb(14, 117, 117);
    color:white;
}
</style>