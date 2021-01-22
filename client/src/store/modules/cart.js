import { ref } from 'vue'
import {TRIGGER_ANIMATION} from '../actions/cart'
const state={
    animate:ref(false)
}
const getters={
    isAnimated: (state) => state.animate
}
const actions = {
    [TRIGGER_ANIMATION]: ({commit}) => {
        commit(TRIGGER_ANIMATION)
        setTimeout(() => {
            commit(TRIGGER_ANIMATION)

        },200)

    }
}
const mutations = {
    [TRIGGER_ANIMATION]:(state) => {
        state.animate = !state.animate;
    }
}

export default {
    state,getters,actions,mutations
}