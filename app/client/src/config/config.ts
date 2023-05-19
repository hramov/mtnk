import {ConfigRouterItem, ConfigRouterItemChildren} from "../router";

export const AppBarItems: Array<ConfigRouterItem> = [
    {
        id: 1,
        title: 'Администрирование',
        name: 'admin',
        children: [
            {
                id: 1,
                title: 'Блоки',
                url: '/blocks',
                name: 'blocks',
                component: 'Blocks'
            },
            {
                id: 2,
                title: 'Подразделения',
                url: '/depts',
                name: 'depts',
                component: 'Depts'
            },
            {
                id: 3,
                title: 'Профили',
                name: 'profiles',
                url: '/profiles',
                component: 'Profiles'
            },
            {
                id: 4,
                title: 'Пользователи',
                url: '/users',
                name: 'users',
                component: 'Users',
                divider: true,
            },
            {
                id: 5,
                title: 'Экспорт ТНК',
                url: '/users',
                name: 'users',
                component: 'Users'
            },

            {
                id: 6,
                title: 'Импорт ТНК',
                url: '/users',
                name: 'users',
                component: 'Users'
            },
            {
                id: 7,
                title: 'Импорт справочников',
                url: '/users',
                name: 'users',
                component: 'Users'
            },
        ]
    },
    {
        id: 2,
        title: 'ТНК',
        name: 'tnk',
        children: [
            {
                id: 1,
                title: 'ТНК технологического блока',
                url: '/tnk',
                name: 'tnk',
                component: 'Tnk'
            },
            {
                id: 1,
                title: 'ТНК инженерного блока',
                url: '/autoTnk',
                name: 'autoTnk',
                component: 'AutoTnk',
                divider: true,
            },
            {
                id: 2,
                title: 'ТНК мне на согласование',
                url: '/tnk-to-approve',
                name: 'tnkToApprove',
                component: 'TnkToApprove'
            },
            {
                id: 3,
                title: 'Выбранная ТНК',
                url: '/tnk/:id',
                name: 'singleTnk',
                component: 'SingleTnk',
                onlyRouter: true,
            }
        ]
    },
    {
        id: 3,
        title: 'Справочник',
        name: 'dictionary',
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
            },
            {
                id: 3,
                title: 'Операции',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList',
                divider: true,
            },
            {
                id: 4,
                title: 'Исполнитель операции',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList'
            },
            {
                id: 5,
                title: 'Единица измерения операции',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList'
            },
            {
                id: 6,
                title: 'Источник операции',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList'
            },
            {
                id: 7,
                title: 'Вид ТНК',
                url: '/subprocess',
                name: 'subprocess',
                component: 'SubprocessList'
            },
            {
                id: 8,
                title: 'Причина деактивации',
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
            {
                id: 2,
                title: 'Последние изменения',
                url: '/changes',
                name: 'changes',
                component: 'Changes'
            },
        ]
    },
];

export function getChildrenForDisplay(children: Array<ConfigRouterItemChildren>) {
    return children.filter((ch) => !ch.onlyRouter)
}

export const enum AlertTypes {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info',
    Light = 'light',
    Dark = 'dark'
}

export type ToastColor = 'green' | 'yellow' | 'red' | 'blue';
export type ToastType = 'success' | 'warning' | 'error' | 'info'
export type ToastTitle = {
    title: string;
    color: ToastColor;
}

export type MessageTypes = {
    [key: string]: ToastTitle
}

export const MESSAGE_TYPES: MessageTypes = {
    'success': {
        title: 'Успешно!',
        color: 'green'
    },
    'warning': {
        title: 'Предупреждение...',
        color: 'yellow'
    },
    'error': {
        title: 'Ошибка!',
        color: 'red'
    },
    'info': {
        title: 'Информация',
        color: 'blue'
    },
}

export type Filters<T> = {
    [key in keyof T]?: T[key];
}