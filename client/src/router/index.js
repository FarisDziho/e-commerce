import { createWebHistory, createRouter } from 'vue-router';
import Items from '../components/Items';
import Login from '../views/Login';
import ItemDetails from '../components/ItemDetails'
import Profile from '../components/Profile'
import Register from '../views/Register'
// import store from '../store/store'
const routes = [
   {
      path: '/',
      name: 'Items',
      component: Items,
      query:'',
      
   },
   {
      path: '/Login',
      name: 'Login',
      component: Login,
   },
   {
      path: '/ItemDetails/:id',
      name: 'ItemDetails',
      component: ItemDetails,
   },
   {
      path: '/Account',
      name: 'Account',
      component: Profile,
   },
   {
      path: '/Register',
      name: 'Register',
      component: Register,
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});



export default router;
