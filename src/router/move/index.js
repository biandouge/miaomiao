export  default {
    path: '/move',
    component : () => import('@/views/Move'), //按需加载
    children:[
        {
            path: 'city',
            component : () => import('@/components/City'), //按需加载
        },
        {
            path: 'comingSoon',
            component : () => import('@/components/ComingSoon'), //按需加载
        },
        {
            path: 'nowPlaying',
            component : () => import('@/components/NowPlaying'), //按需加载
        },
        {
            path: 'search',
            component : () => import('@/components/Search'), //按需加载
        },
        {
            path:'/move',
            redirect: '/move/nowPlaying'
        }
    ]
}
