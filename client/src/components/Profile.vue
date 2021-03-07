<template>
    <div class="profileWrapper">
        <svg viewBox="0 0 24 24" width="100" height="100" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <div class="name">{{user.name}}</div>
        <div class="email">{{user.email}}</div>
        <div class="country">Bosnia and Herzegovina</div>
        <div class="name">{{user.balance}}</div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed } from 'vue';
export default {
    setup(){
        const store=useStore();
        const user = computed(() =>{
            return store.getters.account;
        })
        return{
            user,
        }
    }
}
</script>

<style scoped>
    .profileWrapper{
        margin:100px;
        border-radius: 15px;
        width:400px;
        padding:30px;
        display: flex;
        flex-direction: column;
        border:1px solid rgb(34, 189, 181);
        align-items: center;
    }
    .profileWrapper > div{
        padding-bottom: 2px;
        width:100%;
        margin:30px 0;
        border-bottom: 1px solid  rgb(34, 189, 181);
    }
    .profileWrapper svg{
        padding:10px;
        border:1px solid grey;
        border-radius: 50%;
    }

</style>