<template>
    <div class="wrapper">
        <span v-if="!cartItems.length">You have no items in cart</span>
        <div  v-for="item in cartItems" :key="item.id">
            <CartItem v-bind:item="item"/>
        </div>
        <div v-if="cartItems.length" class="checkoutButton">
            Proceed to checkout
        </div>
    </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
    name:'Cart',
    components:{
        CartItem
    },
    computed:{
        cartItems(){
            return this.$store.getters.getCartItems;
        }
    },
    

}

</script>

<style>
.wrapper{
    padding:20px;
}
.checkoutButton{
    display: inline-block;
    margin-top:20px;
    background-color:rgb(2, 98, 116);
    color:white;
    padding:20px 20px;
    font-size: 20px;
    text-justify: center;
    cursor: pointer;
}
.checkoutButton:hover{
    background-color:rgb(2, 71, 83);

}
</style>