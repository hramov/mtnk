import {ConfigRouterItem, ConfigRouterItemChildren} from "../router";

export const Roles = [
    {
        id: 1,
        title: 'Администратор МТНК'
    },
    {
        id: 2,
        title: 'Администратор блока'
    },
    {
        id: 3,
        title: 'Администратор подразделения'
    }
];

export const LeftMenuItems: Array<ConfigRouterItem> = [
    {
        id: 1,
        title: 'Администрирование',
        name: 'admin',
        children: [
            {
                id: 1,
                title: 'Пользователи',
                url: '/users',
                name: 'users',
                component: 'Users'
            },
            {
                id: 2,
                title: 'Профили',
                name: 'profiles',
                url: '/profiles',
                component: 'Profiles'
            }
        ]
    },
    {
        id: 2,
        title: 'ТНК',
        name: 'tnk',
        children: [
            {
                id: 1,
                title: 'ТНК',
                url: '/tnk',
                name: 'tnk',
                component: 'Tnk'
            },
            {
                id: 2,
                title: 'ТНК на согласование',
                url: '/tnk-to-approve',
                name: 'tnkToApprove',
                component: 'TnkToApprove'
            }
        ]
    },
    {
        id: 3,
        title: 'Справочник',
        name: 'dict',
        children: [
            {
                id: 1,
                title: 'Процессы',
                url: '/process',
                name: 'process',
                component: 'ProcessList'
            },
            {
                id: 2,
                title: 'Подпроцессы',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList'
            }
        ]
    },
    {
        id: 4,
        title: 'Информация',
        name: 'info',
        children: [
            {
                id: 1,
                title: 'О модуле',
                url: '/about',
                name: 'about',
                component: 'About'
            },
        ]
    },
];

export const UserMenuItems: Array<ConfigRouterItemChildren> = [
    {
        id: 1,
        title: 'Аккаунт',
        url: '/account',
        name: 'account',
        component: 'Account',
    },
    {
        id: 2,
        title: 'Выход',
        url: '/logout',
        name: 'logout',
        component: 'Logout',
    }
];