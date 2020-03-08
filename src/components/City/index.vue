<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li  v-for="item in hotList" :key="item.id">{{ item.nm }}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="item in cityList" :key="item.index">
                    <h2>{{ item.index }}</h2>
                    <ul>
                        <li v-for="itemList in item.list" :key="itemList.id">{{ itemList.nm }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <!--handleToIndex(index)的index是索引值，是通过(item,index) in cityList获得的-->
                <!--item.index是字段index，两者是不一样的-->
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)" :class="{ currentIndex:index==current}">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            return{
                cityList: [],
                hotList: [],
                current:0,
            }
        },
        mounted() {
            this.axios.get('/api/cityList').then((res)=>{
                console.log(res);
                let msg = res.data.msg;
                if(msg === 'ok'){
                    let cities = res.data.data.cities;
                    //响应式映射
                    var { cityList,hotList } = this.formatCityList(cities); //记得要加上this
                    this.cityList = cityList;
                    this.hotList = hotList;
                }
            })
        },
        methods : {
            /*格式化列表数据*/
            formatCityList(cities){
                let cityList = []; //先定义一个用于存放索引的空数组
                let hotList = []; //热门

                for(var i=0;i<cities.length;i++){
                    if (cities[i].isHot === 1){
                        hotList.push(cities[i]);
                    }
                }

                // for(var val of cities){
                //     if(val.isHot === 1){
                //         hotList.push(val);
                //     }
                // }
                console.log(hotList);

                for (let i=0;i<cities.length;i++){ //循环所有城市
                    let firstLetter = cities[i].py.substring(0,1).toUpperCase(); //获取每个城市拼音首字母并转化为大写
                    //console.log(firstLetter)

                    if (toCom(firstLetter)){ //比对首字母，如果没有匹配的，则把循环到的城市添加到索引数据列表
                        //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
                        cityList.push({index:firstLetter, list: [{ nm: cities[i].nm, id : cities[i].id }]});
                    }else{ //如果匹配成功，说明索引数组里已经有这个首字母，则累加到现有index的list
                        for(let j=0;j<cityList.length;j++){  //循环索引列表
                            if (cityList[j].index === firstLetter){ //查找索引在列表中的位置
                                cityList[j].list.push({ nm: cities[i].nm, id : cities[i].id }); //添加list数据
                            }
                        }
                    }
                }

                //索引数组进行排序
                cityList.sort((n1,n2)=>{
                    if(n1.index > n2.index){
                        return 1;
                    }else if(n1.index < n2.index){
                        return  -1;
                    }else{
                        return 0;
                    }
                });

                //toCom函数返回布尔值，判断首字母是否已经存在cityList列表里面，
                // 如果首字母已经存在于现有的cityList里面，则返回false，否则返回true
                function toCom(firstLetter) {
                    for (let i=0;i<cityList.length;i++){
                        if (cityList[i].index === firstLetter){ //
                            return false;
                        }
                    }
                    return  true;
                }
                console.log(cityList);
                return {
                    cityList,
                    hotList
                }
            },

            /*点击右侧索引字母切换对应城市*/
            handleToIndex(index){
                this.current=index; //添加当前状态

                let h2 = this.$refs.city_sort.getElementsByTagName('h2');
                //索引的index和列表中h2的index存在着对应关系
                //通过改变h2的父元素，也就是列表的div的offseTop值，
                //就可以显示对应的h2
                this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;

            }

        },


    }
</script>

<style scoped>

    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: fixed; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul{}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort{}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

    .currentIndex{background: #FFF5F0;}
</style>