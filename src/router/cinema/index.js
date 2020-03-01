export  default {
    path: '/cinema',
    component : () => import('@/views/Cinema'), //按需加载组件，异步加载
}
