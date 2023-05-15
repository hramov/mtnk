import {createRouter, createWebHistory, RouteLocationRaw} from 'vue-router';
import Home from './ui/views/Home.vue'
import Login from './ui/views/Login.vue'
import {AppBarItems} from "./config/config";
import {flatten} from 'lodash';

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
    onlyRouter?: boolean
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

// function makeRoutersFromChildren(items: Array<ConfigRouterItemChildren>) {
//     return flatten(items.map((item: ConfigRouterItemChildren) => ({
//             path: item.url,
//             name: item.name,
//             component: () => import(`./ui/views/${item.name}/${item.component}.vue`),
//         }
//     )));
// }

const homeItems = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
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

export default router;