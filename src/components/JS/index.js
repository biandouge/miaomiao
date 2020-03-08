import Vue from 'vue';
import MessageBox from './MessageBox';

//做一个对外的接口，用export而不是用export default
//因为有很多方法要用，所以我们做一个闭包出来
export let messageBox = (function () {  //创建一个闭包

    let defaults = { //默认值，在闭包当中做一些defaults默认值
        title : '', //弹窗的标题
        content : '', //弹窗的内容
        cancel : '',   //弹窗的关闭按钮
        ok : '',    //弹窗的确定按钮
        handleCancel : null, //取消按钮被点击后做什么事的一个方法，默认为null或是空函数就是不做任何事
        handleOk : null //确定按钮被点击后做什么事的一个方法，默认为null就是不做任何事
    };

    //然后我们怎么让js跟它自带的.vue文件进行结合呢
    // 用vue下自带的extend方法结合，extend可以结合MessageBox，
    // extend获得MessageBox里面的东西，并返回一个类
    let MyComponent = Vue.extend(MessageBox);

    //初始值我们定义好了之后
    //返回具体我们调用这个弹窗时候的function
    //function当中接受我们具体的配置参数opts
    return function ( opts ) {  //配置参数
        //首先，配置对默认进行一个覆盖
        for(let attr in opts){
            //把defaults的attr对opts的attr进行覆盖，
            // 这样我们就拿到了配置参数，defaults就有了配置参数
            defaults[attr] = opts[attr];
        }

        let vm = new MyComponent({
           el : document.createElement('div'), //不用担心多出来的一个容器，最后会整体删掉的
           data : {
               title : defaults.title,
               content : defaults.content,
               cancel : defaults.cancel,
               ok : defaults.ok
           },
            methods : {
                handleCancel(){
                    //通过call绑定，调用到方法，改变this指向，让handelCancel可以拿到vm
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    //点击按钮的时候把弹窗删掉
                    document.body.removeChild( vm.$el  );
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el  );
                }
            }

        });
        //添加到哪里
        document.body.appendChild( vm.$el );

    }
})()