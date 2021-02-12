<template>
    <div class="container">
        <div class="imgContainer">
            <img v-bind:src="item.image" alt={{item.title}}>
        </div>
        <div class="infoContainer">
            <p>{{item.title}}</p>
            <h4>{{item.price}}</h4>
        </div>
        <div class="buttonContainer">
            <div class="removeButton" v-on:click="removeFromCart">
                <span>Remove</span>
            </div>
        </div>
    </div>
</template>

<script>
import {REMOVE_FROM_CART} from '../store/actions/cart'
export default {
    props:{
        item:{
            type:Object
        }
    },
    methods:{
        removeFromCart(){
            this.$store.dispatch(REMOVE_FROM_CART,this.item);
        }
    }
}
</script>

<style scoped>
.container{
    display:flex;
    height:100px;
    padding:5px;
    border:1px solid lightgray;
    margin-bottom: 10px;

}
.imgContainer{
    width:10%;
    height:100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
.imgContainer img{
    
    max-height: 100%;
    max-width: 100%;
}
.infoContainer{
    display:flex;
    flex-direction: column;
    width: 80%;
}
.infoContainer p{
    font-size: 23px;
    font-family: Roboto;
}
.infoContainer h4{
    margin-top:20px;
}

.buttonContainer{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.removeButton{
    padding:10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px solid lightgray; 
    color:red;
    cursor: pointer;



}
</style>