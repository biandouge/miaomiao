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
        //配置正在热映跳转到详情页路由
        {
            path: 'detail/1/:movieId', //配置动态路由
            components:{
                //配置默认路由，正在热映页面跳转详情页的时候默认跳转到这个页面
                default : ()=> import('@/components/NowPlaying'),
                //这个detail和路由里的name=detail是对应的关系
                detail : () => import('@/views/Move/detail')
            },
            //路由传参
            // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
            props : {
                detail : true
            }
        },
        //配置即将上映跳转到详情页路由
        {
            path: 'detail/2/:movieId', //配置动态路由
            components:{
                //配置默认路由，正在热映页面跳转详情页的时候默认跳转到这个页面
                default : ()=> import('@/components/ComingSoon'),
                //这个detail和路由里的name=detail是对应的关系
                detail : () => import('@/views/Move/detail')
            },
            //路由传参
            // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
            props : {
                detail : true
            }
        },
        { //配置重定向
            path:'/move',
            redirect: '/move/nowPlaying'
        }
    ]
}
