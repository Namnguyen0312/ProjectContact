import { createWebHistory, createRouter } from "vue-router";
import pinia from '../stores/defineStore';
import { useAccountStore } from '../stores/account';
const accountStore = useAccountStore(pinia);

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: () => import('@/views/ContactBook.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true 
    },
    {
        path: '/CreateContact/',
        name: 'contact.add',
        component: ()=> import('@/views/ContactAdd.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: ()=> import('@/views/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('@/views/Login.vue'),
    },
    {
        path: '/EditProfile',
        name: 'profile',
        component: ()=> import('@/views/Profile.vue'),
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, _from, next) => {
    await accountStore.getAccount();
    console.log(accountStore.account._id);
    const empty = accountStore.checkAccount();
    if (!empty && !(to.name === 'login') && !(to.name === 'register')) {
        next({ name: 'login' });
    } else if (empty && to.name === 'login') next({ name: 'contactbook' });
    else next();
});
export default router;