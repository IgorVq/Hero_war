import { createRouter, createWebHistory } from 'vue-router'
import SelectView from '../views/SelectView.vue'
import BattleView from '../views/BattleView.vue'
import BestHeroesView from '../views/BestHeroesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/select' },
    { path: '/select', name: 'select', component: SelectView },
    { path: '/battle', name: 'battle', component: BattleView },
    { path: '/best-heroes', name: 'best-heroes', component: BestHeroesView },
  ],
})

export default router
