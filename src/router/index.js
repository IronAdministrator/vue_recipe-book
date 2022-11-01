import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'
import AddRecipe from '../views/AddRecipe.vue'
import EditRecipe from '../views/EditRecipe.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/recipes/:id',
    name: 'DetailsView',
    component: DetailsView,
    props: true
  },
  {
    path: '/add',
    name: 'AddRecipe',
    component: AddRecipe,
  },
  {
    path: '/edit-recipe/:id',
    name: 'EditRecipe',
    component: EditRecipe,
    props: true,
  },
  // catchAll404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
