import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Nosotros from '../views/Nosotros.vue'
import Articulos from '../views/Articulos.vue'
import Fruta from '../views/Fruta.vue'
import NotFound from '../views/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: Nosotros
  },
  {
    path: '/articulos',
    name: 'Articulos',
    component: Articulos
  },
  {
    path: '/articulos/:id',
    name: 'Fruta',
    component: Fruta,
    props: true
  },
  {
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component:NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
