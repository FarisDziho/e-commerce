
<template>
  <div class="wrapper">
    <div class="rowWrapper">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="items">
        <div class="grid">
          <div class="item-container" v-for="item in items" v-bind:key="item">
            <Item v-bind:item="item" />
          </div>
        </div>
        <PaginateMenu />
      </div>
    </div>

    
  </div>
</template>

<script>
// import { items } from "../../src/dummy";
import Sidebar from "./Sidebar.vue";
import Item from "./Item";
import { useStore } from "vuex";
import { computed } from "vue";
import PaginateMenu from "./PaginateMenu";
// import { computed } from 'vue';
export default {
  components: {
    Item,
    PaginateMenu,
    Sidebar
  },
  setup() {
    const store = useStore();
    
    const items = computed(() => store.getters.getAllItems);
    return {
      items
    };
  }
};
</script>

<style scoped>
.wrapper {
  padding: 40px 40px 40px 0;
}
.rowWrapper {
  display: flex;
}
.sidebar {
  width: 250px;
  padding:0 20px;
}
.items{
  width:100%;
}
.grid {
  width: 100%;
  /* border-top: 1px solid;
  border-right: 1px solid; */
  border:1px solid;
  border-color: #ddd;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>