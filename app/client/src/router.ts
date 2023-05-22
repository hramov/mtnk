import {createRouter, createWebHistory, RouteLocationRaw} from 'vue-router';
import Home from './ui/views/Home.vue'
import Login from './ui/views/Login.vue'
import Logout from './ui/views/Logout.vue'
import Account from './ui/views/user/Account.vue'
import {AppBarItems} from "./config/config";
import {flatten} from 'lodash';
import { useUserStore } from './store/user.store';

export class ConfigRouterItem {
    id: number;
    title: string;
    name: string;
    children: Array<ConfigRouterItemChildren>
}

export class ConfigRouterItemChildren {
    id: number;
    title: string;
    url: string;
    name: string;
    component: string;
    divider?: boolean;
    onlyRouter?: boolean;
}

export interface VueRouterItem {
    path: string,
    name: string,
    component: () => Promise<any>,
}

export async function openLink(link: RouteLocationRaw) {
    return router.push(link)
}

function makeRoutersFromGroup(items: Array<ConfigRouterItem>): Array<VueRouterItem> {
    return flatten(items.map((item: ConfigRouterItem) => item.children.map((child: ConfigRouterItemChildren) => ({
        path: child.url,
        name: child.name,
        component: () => import(`./ui/views/${item.name}/${child.component}.vue`),
        })
    )))
}

const homeItems = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    }
]

const routes = [
        ...homeItems,
    ...makeRoutersFromGroup(AppBarItems),
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const userStore = useUserStore();
    if (to.path !== '/login') {
        if (!userStore.user.id) {
            router.push('/login');
        }
    }
});

export default router;