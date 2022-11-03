import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailsView from '@/views/DetailsView.vue'
import NotFound from '@/views/NotFound.vue'
import AddEditForm from "@/views/AddEditForm";

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
    name: 'AddForm',
    component: AddEditForm,
  },
  {
    path: '/edit/:id',
    name: 'EditForm',
    component: AddEditForm,
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
