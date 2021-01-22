<template>
  <div class="nav">
    <ul>
      <!-- <li>
        <router-link :to="{query :{category : all}}">Home</router-link>
      </li> -->
      <li>
        <router-link :to="{ query: { category:menClothing }}">men clothing</router-link>
      </li>
      <li>
        <router-link :to="{ query: { category:jewelery }}">jewelery</router-link>
      </li>
      <li>
        <router-link :to="{ query: { category: electronics }}">electronics</router-link>
      </li>
      <li>
        <router-link :to="{ query: { category: womenClothing }}">women clothing</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {LOAD_ITEMS,SET_CATEGORY} from '../store/actions/items';
import { watch , ref } from "vue";
import {useRoute,useRouter} from 'vue-router'
export default {

    setup(){
        const store = useStore();
        const router=useRouter();

        const menClothing=ref('men clothing');
        const jewelery=ref('jewelery');
        const electronics=ref('electronics');
        const womenClothing=ref('women clothing');
        // const all=ref('all');
        const route=useRoute();
        watch(() => route.query.category, async (category) => {
        if(category)
            store.dispatch(SET_CATEGORY,category)
            console.log(store.state);
            await store.dispatch(LOAD_ITEMS)
            router.push({name:'Items'})
        })


        return{
            menClothing,
            womenClothing,
            jewelery,
            electronics,
            // all
        }
    }
};
</script>

<style scoped>
.nav{
     position: sticky;
    top:30px;
}
ul{
    display:flex;
    flex-direction: column;
    list-style-type: none;
    position: sticky;
    top:0;
}
ul li{
    display: flex;
    justify-content: center;
    margin-bottom:20px;
    padding:10px 0;
}
ul li:hover{
    background-color: rgb(205, 205, 206);
}
ul li a{
    text-decoration: none;
    color:black;
}
</style>