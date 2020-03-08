const state = {
    nm : window.localStorage.getItem('nowNm') || '北京', //初始的城市北京
    id : window.localStorage.getItem('nowId') || 1
};

const actions = {

};

const mutations = {
    //修改状态的方法,约定：名字最好大写
    CITY_INFO(state, payload){ //payload是传过来的载荷
        //修改
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

export default { //暴露出去
    namespaced : true, //定义命名空间
    state,
    actions,
    mutations
}