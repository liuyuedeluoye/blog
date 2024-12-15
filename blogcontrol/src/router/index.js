import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
    {
        path: '/',
        name: 'AdminDashboard',
        component: AdminDashboard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;