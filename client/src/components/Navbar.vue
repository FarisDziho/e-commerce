<template>
  <div class="nav">
    <ul>
      <li class="home">
        <router-link :to="{query :{category : all}}">Home</router-link>
      </li>
      <li>
        <div class="searchContainer">
          <input
            v-model="searchTerm"
            v-on:keyup.enter="getSearch"
            type="text"
            class="search"
            placeholder="search here..."
          />
          <svg
            v-on:click="getSearch"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </li>
      <li>
        <div class="icons">
          <div class="cartIconWrapper">
            <router-link to="/Cart">
              <svg
                v-if="isLoggedIn"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="cartIcon"
                v-bind:class="{animate: animate}"
              >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            </router-link>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <i class="fa fa-caret-down"></i>
              <p style="display:inline-block" v-if="isLoggedIn">{{user.name}}</p>
            </button>
            <div class="dropdown-content">
              <router-link to="/Login" v-if="!isLoggedIn">Sign in</router-link>
              <router-link to="/" @click="logout" v-else>Sign out</router-link>
              <router-link to="/Account" v-if="isLoggedIn">Profile</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { AUTH_LOGOUT } from "../store/actions/auth";
import { LOAD_ITEMS, SET_CATEGORY, SET_SEARCH } from "../store/actions/items";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import {computed} from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    let isLoggedIn = computed(() => {
      return store.getters.isAccountLoaded;
    });

    const logout = () => {
      store.dispatch(AUTH_LOGOUT);
    };

    const user = computed(() => {
      return store.getters.account;
    });

    const animate = computed(() => {
      return store.getters.isAnimated;
    });

    const all = ref("all");
    const route = useRoute();
    watch(
      () => route.query.category,
      async category => {
        if (category) store.dispatch(SET_CATEGORY, category);
        await store.dispatch(LOAD_ITEMS);
        router.push({ name: "Items" });
      }
    );

    const searchTerm = ref("");
    const getSearch = async () => {
      await store.dispatch(SET_SEARCH, searchTerm);
      await store.dispatch(LOAD_ITEMS);
      router.push({ name: "Items" });
    };

    return {
      searchTerm,
      isLoggedIn,
      logout,
      user,
      animate,
      getSearch,
      all
    };
  }
};
</script>
   
<style scoped>
.nav {
  background: #333;
}
.home {
  display: flex;
  width: 200px;
  justify-content: center;
}
.home a {
  position: relative;
  left: -10px;
}
.searchContainer {
  display: flex;
  align-content: center;
  background-color: white;
  padding: 5px 10px;
}
.search {
  width: 450px;
  border: none;
  outline: none;
}

.nav ul {
  padding: 0 20px;
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
}
.nav ul li > a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.dropdown .dropbtn {
  font-size: 18px;
  padding: 16px 18px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropbtn p {
  margin-left: 3px;
  position: relative;
  top: -3px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}
.icons {
  display: flex;
  justify-items: center;
  align-content: center;
}
.cartIconWrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.cartIcon {
  color: white;
  /* margin-right: 10px;
  position: relative; */
  /* margin: auto 0; */
}

.animate {
  top: -5px;
}

.dropdown-content a {
  font-size: 20px;
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>