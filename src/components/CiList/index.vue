<template>
    <div class="cinema_body">
        <Loading v-if="isLoading" />
        <Scroller v-else>
            <ul>
                <li v-for="item in cinemaList" :key="item.id">
                    <div>
                        <span>{{ item.nm }}</span>
                        <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{ item.addr }}</span>
                        <span>{{ item.distance }}</span>
                    </div>
                    <div class="card">
                        <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key | classCard">{{ key | formatCard }}</div>
                    </div>
                </li>

            </ul>
        </Scroller>

    </div>
</template>

<script>
    export default {
        name: "CiList",
        data(){
            return{
                cinemaList: [],
                isLoading : true,
                prevCityId: -1
            }
        },
        activated() {
            let cityId = this.$store.state.city.id; //获取状态里城市ID
            //打个时间差，如果当前城市ID等于上一个城市ID，我们就不执行请求，反之执行，
            // 这样避免了我们在从将要上映返回正在上映的时候重复执行ajax请求，
            // 而我们改变城市的时候是需要执行请求的
            if (this.prevCityId === cityId){ return; };
            console.log('123');

            this.isLoading = false; //重新显示一下加载，让用户能看到loading效果
            this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
                console.log(res);
                let msg = res.data.msg;
                if(msg === 'ok'){
                    this.cinemaList = res.data.data.cinemas; //把数据存储到data
                    this.isLoading = false;
                    this.prevCityId = cityId; //执行请求成功之后改变上个城市prevCityId的值为我们获得的状态值

                }
            })
        },
        //自定义过滤器
        filters : {
            formatCard(key){ //属性格式化过滤器
                //定义一个集合
                var card = [
                    { key : 'allowRefund', value : '改签'},
                    { key : 'endorse', value : '退'},
                    { key : 'sell', value : '折扣卡'},
                    { key : 'snack', value : '小吃'}
                ];
                for (var val of card){ //遍历集合，返回value值
                    if(val.key === key){
                        return val.value;
                    }
                }
                //如果都不符合就返回一个空
                return '';
            },
            classCard(key){ //属性颜色过滤器
                var card = [
                    { key : 'allowRefund', value : 'bl'},
                    { key : 'endorse', value : 'bl'},
                    { key : 'sell', value : 'or'},
                    { key : 'snack', value : 'or'}
                ];
                for (var val of card){ //遍历集合，返回value值
                    if(val.key === key){
                        return val.value;
                    }
                }
                //如果都不符合就返回一个空
                return '';
            }
        }

    }
</script>

<style scoped>
    #content .cinema_body{ flex:1;position: fixed; left:0; top:100px; bottom:50px;height: 80%; width: 100%; box-sizing: border-box}
    .cinema_body ul{ padding:20px;}
    .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
    .cinema_body div{ margin-bottom: 10px;}
    .cinema_body .q{ font-size: 11px; color:#f03d37;}
    .cinema_body .price{ font-size: 18px;}
    .cinema_body .address{ font-size: 13px; color:#666;}
    .cinema_body .address span:nth-of-type(2){ float:right; }
    .cinema_body .card{ display: flex;}
    .cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
    .cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
    .cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>