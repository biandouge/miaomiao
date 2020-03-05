<template>
    <div class="cinema_body">
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
    </div>
</template>

<script>
    export default {
        name: "CiList",
        data(){
            return{
                cinemaList: [
                    {
                        'id' : 17158,
                        'mark' : 0,
                        'nm' : 'JIA嘉莱影城九城店',
                        'sellPrice' : '34',
                        'addr' : '松江区地铁九号线九城站',
                        'distance' : '1071km',
                        'tag' : {
                            'allowRefund' : 1,
                            'buyout' : 0,
                            'cityCardTag' : 0,
                            'deal' : 0,
                            'endorse' : 1,
                            'hallTypeVOList' :[],
                            'sell' : 1,
                            'snack' :1,
                            'vipTag': '折扣卡'
                        }
                    },
                    {
                        'id' : 17159,
                        'mark' : 0,
                        'nm' : '中影星美国际影城水城店',
                        'sellPrice' : '46',
                        'addr' : '宏福苑水城广场4-5楼',
                        'distance' : '171km',
                        'tag' : {
                            'allowRefund' : 1,
                            'buyout' : 0,
                            'cityCardTag' : 0,
                            'deal' : 0,
                            'endorse' : 1,
                            'hallTypeVOList' :[],
                            'sell' : 1,
                            'snack' :1,
                            'vipTag': '折扣卡'
                        }
                    },
                    {
                        'id' : 17160,
                        'mark' : 0,
                        'nm' : '奥斯卡影院',
                        'sellPrice' : '18',
                        'addr' : '中关村北大街187号',
                        'distance' : '11km',
                        'tag' : {
                            'allowRefund' : 1,
                            'buyout' : 0,
                            'cityCardTag' : 0,
                            'deal' : 0,
                            'endorse' : 1,
                            'hallTypeVOList' :[],
                            'sell' : 1,
                            'snack' :1,
                            'vipTag': '折扣卡'
                        }
                    },

                ],

            }
        },
        mounted() {
            this.axios.get('/api/cinemaList?cityId=10').then((res)=>{
                console.log(res);
                let msg = res.data.msg;
                if(msg === 'ok'){
                    //this.cinemaList = res.data.data.cinemas; //把数据存储到data
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
    #content .cinema_body{ flex:1; overflow:auto;}
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