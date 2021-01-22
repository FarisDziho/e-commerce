import {
   SELECTED_ITEM,
   LOAD_ITEMS,
   SET_LOADING_FALSE,
   SET_LOADING_TRUE,
   SET_CATEGORY,
   SET_SEARCH,
   RESET_SEARCH,
} from '../actions/items';
// import {items} from '../../dummy'
import { reactive } from 'vue';
// import {ref} from 'vue'
const state = reactive({
   selectedItemId: 0,
   pager: {},
   items: [],
   loadingAsync: false,
   category: '',
   search: '',
});
const getters = {
   getSelectedItems: (state) => {
      if (state.selectedItemId === 0) return false;
      const list = state.items.filter(
         (item) => item.id === state.selectedItemId
      );
      return list[0];
   },
   getAllItems: (state) => state.items,
   getPager: (state) => state.pager,
   getCategory: (state) => state.category,
};

const actions = {
   [SELECTED_ITEM]: ({ commit }, id) => {
      return new Promise((resolve) => {
         commit(SELECTED_ITEM, id);
         resolve(id);
      });
   },
   [LOAD_ITEMS]: async ({ commit, state }, page) => {
      const search = state.search;
      const category = state.category;
      commit(SET_LOADING_TRUE);
      await fetch(
         `http://localhost:5000/items/paginate?page=${page}&category=${category}&search=${search}`
      )
         .then(async (res) => await res.json())
         .then(({ pager, items }) => {
            const { rows } = items;
            commit(LOAD_ITEMS, { pager, rows });
            commit(SET_LOADING_FALSE);
            // location.reload();
            window.scroll({
               top: 0,
               left: 0,
               behavior: 'smooth',
            });
         });
   },
   [SET_CATEGORY]: async ({ commit }, category) => {
      // console.log("set category" , category)
      commit(RESET_SEARCH);
      commit(SET_CATEGORY, category);
   },
   [SET_SEARCH]: async ({ commit }, search) => {
      commit(SET_SEARCH, search);
   },
};

const mutations = {
   [SELECTED_ITEM]: (state, id) => {
      state.selectedItemId = id;
   },
   [LOAD_ITEMS]: (state, { pager, rows }) => {
      state.pager = pager;
      state.items = rows;
   },
   [SET_LOADING_FALSE]: (state) => {
      state.loadingAsync = false;
   },
   [SET_LOADING_TRUE]: (state) => {
      state.loadingAsync = true;
   },
   [SET_CATEGORY]: (state, category) => {
      state.category = category;
      //   console.log(state)
   },
   [SET_SEARCH]: (state, search) => {
      state.search = search;
   },
   [RESET_SEARCH]: (state) => {
      state.search = '';
   },
};
export default {
   state,
   getters,
   actions,
   mutations,
};
