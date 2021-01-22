<template>
  <div class="wrapper">
      <ul v-if="pager.pages && pager.pages.length" class="pagination">
          <li :class="{'disabled':pager.currentPage === 1}" class="page-item first-item">
                    <router-link :to="{ query: { page: 1 }}" class="page-link">First</router-link>
                </li>
                <li :class="{'disabled':pager.currentPage === 1}" class="page-item previous-item">
                    <router-link :to="{ query: { page: pager.currentPage - 1 }}" class="page-link"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="15 18 9 12 15 6"></polyline></svg></router-link>
                </li>
                <li v-for="page in pager.pages" :key="page" :class="{'active':pager.currentPage === page}" class="page-item number-item">
                    <router-link :to="{ query: { page: page }}" class="page-link">{{page}}</router-link>
                </li>
                <li :class="{'disabled':pager.currentPage === pager.totalPages}" class="page-item next-item">
                    <router-link :to="{ query: { page: pager.currentPage + 1 }}" class="page-link"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg></router-link>
                </li>
                <li :class="{'disabled':pager.currentPage === pager.totalPages}" class="page-item last-item">
                    <router-link :to="{ query: { page: pager.totalPages }}" class="page-link">Last</router-link>
                </li>
      </ul>
  </div>
</template>

<script>
// import {useStore} from 'vuex'
import {LOAD_ITEMS} from '../store/actions/items'
export default {
    computed:{
        pager(){
            return this.$store.getters.getPager;
        }
    },
    watch:{
        '$route.query.page':{
            immediate:true,
            handler(page)
            {
                page=parseInt(page) || 1;
                console.log("paginateMenu");
                // if(page !== this.pager.currentPage)
                    this.$store.dispatch(LOAD_ITEMS,page)
                    
            }

        }
    }
}
</script>

<style>
.pagination{
    list-style-type: none;
    display:flex;
    flex-direction: row;
    justify-content: center;
}
.page-item{
    display: flex;
    justify-items: center;
    align-items: center;
    margin:0 2px;
    border:1px solid rgb(150, 144, 144);
    padding:5px 7px;
    cursor: pointer;
}
.page-link{
    text-decoration: none;
    color:black;
    display: flex;
    justify-items: center;
    align-items: center;
}
.disabled{
    background-color:  rgb(221, 210, 210);
    pointer-events: none;
}
.active{
    background-color:  rgb(33, 143, 187);;
    pointer-events: none;
    color:white;
}
</style>