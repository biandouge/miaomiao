<template>
    <div class="main">
        <Header title="喵喵电影" />
        <div id="content">
            <!--二级导航-->
            <div class="movie_menu">
                <router-link tag="div" to="/move/city" class="city_name">
                    <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <div class="hot_swtich">
                    <router-link tag="div" to="/move/nowPlaying" class="hot_item">正在热映</router-link>
                    <router-link tag="div" to="/move/comingSoon" class="hot_item">即将上映</router-link>
                </div>
                <router-link tag="div" to="/move/search" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <!--二级路由渲染并缓存-->
            <keep-alive>
                <router-view />
            </keep-alive>

        </div>
        <TabBar />
<!--        <MessageBox />-->
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import TabBar from "@/components/TabBar";
    //import MessageBox from "@/components/JS/MessageBox";
    import { messageBox } from "@/components/JS";

    export default {
        name: "Move",
        components: {
            Header,
            TabBar,
        },
        mounted() {
            //延迟打开定位信息，用户打开三秒钟之后打开定位信息
            setTimeout(()=>{

                this.axios.get('/api/getLocation').then((res)=>{
                    console.log(res);
                    let msg = res.data.msg;

                    if(msg === 'ok'){
                        let nm = res.data.data.nm; //获取到的定位信息
                        let id = res.data.data.id;

                        //console.log(this.$store.state.city.id,id);
                        //如果已经切换到当前城市，弹窗提示就没有意义了，
                        // 当我们获取的当前城市id和vuex状态管理的城市id相同时，我们就不弹窗了
                        //因为状态管理里面得到的id是字符串类型，而请求的id为数字类型，使用===三个等号不是绝对相等
                        //解决办法1、使用两个等号==，自动进行类型转换
                        //2、使用Number或者parseInt方法转换一下
                        if (Number(this.$store.state.city.id) === id){ return; }

                        //不等的时候才弹窗
                        messageBox({
                            title : '定位',
                            content : nm,
                            cancel : '取消',
                            ok : '切换定位',
                            handleCancel(){
                                console.log(1)
                            },
                            handleOk(){
                                //重新改变本地存储的名字和id
                                window.localStorage.setItem('nowNm',nm);
                                window.localStorage.setItem('nowId',id);
                                window.location.reload(); //改变之后刷新页面
                            }
                        });
                    }
                });

            },3000);


        }
    }
</script>

<style scoped>
    #content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;
        position: fixed;}
    .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
    .movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
    .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
    .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
    .movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry i{  font-size:24px; color:red;}
</style>