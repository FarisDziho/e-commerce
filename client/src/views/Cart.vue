<template>
    <div class="wrapper">
        <span v-if="!cartItems.length">You have no items in cart</span>
        <div  v-for="item in cartItems" :key="item.id">
            <CartItem v-bind:item="item"/>
        </div>
        <div class="underCart">
            <div v-if="cartItems.length" class="checkoutButton" v-on:click="proceedToCheckout">
                Proceed to checkout
            </div>
            <div class="totalCost">
                <h4 v-if="totalCost > 0">Total cost: <span> {{totalCost}}$</span></h4>
            </div> 
        </div>
    </div>
</template>

<script>
import CartItem from '../components/CartItem'
import {PROCEED_TO_CHECKOUT} from '../store/actions/cart'
export default {
    name:'Cart',
    components:{
        CartItem
    },
    computed:{
        cartItems(){
            return this.$store.getters.getCartItems;
        },
        totalCost(){
            return this.$store.getters.getTotalCost 
        }
    },
    methods:{
        proceedToCheckout(){
            this.$store.dispatch(PROCEED_TO_CHECKOUT);
        }
    }
    

}

</script>

<style scoped>
.wrapper{
    padding:20px;
}
.underCart{
    display: flex;
    justify-content: space-between;
    margin-top:10px;
}
.totalCost span{
    color:red;
}
.checkoutButton{
    display: inline-block;
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