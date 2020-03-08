<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scrollar",
        props:{ //定义两个用于父子通信的属性handleToScroll和handleToTouchEnd
            handleToScroll :{
                type: Function,
                default: function () {}
            },
            handleToTouchEnd :{
                type: Function,
                default: function () {}
            }
        },
        mounted() {
            var scroll = new BScroll(this.$refs.wrapper,{
                tap: true,
                probeType: 1, // 滚动的时候会派发scroll事件，会截流
            });

            this.scroll = scroll; //因为scroll是一个对象，把他变成一个属性，让toScrollTop方法可以找到它

            scroll.on('scroll',(pos)=>{ //回调函数
                this.handleToScroll(pos); //把pos回调出去
            });

            scroll.on('touchEnd',(pos)=>{
                this.handleToTouchEnd(pos);
            })
        },
        methods:{
            //定义一个方法
            toScrollTop:function (y) {
                //scrollTo为better-scroll提供的一个方法，意思是跳转到某处，
                // 我们只在y轴上移动，x轴就定义为0
                this.scroll.scrollTo(0,y);
            }
        }
    }
</script>

<style scoped>
.wrapper{height: 100%;}
</style>