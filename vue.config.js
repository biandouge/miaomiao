/*
//es6的写法
export default { //先提供一个对外接口
    devServer : { //表示我们开发环境的一个配置
        proxy : {  //我们反向代理的字段
            '/api' : {  //我们反向代理的字段
                target : 'http://39.97.33.178', //反向代理的目标
                changeOrigin: true, //反向代理的时候是否要改变地址
            }
        }
    }
}*/
const config = {
    devServer : { //表示我们开发环境的一个配置
        proxy : {  //我们反向代理的字段
            '/api' : {  //我们反向代理的字段
                target : 'http://39.97.33.178', //反向代理的目标
                changeOrigin: true, //反向代理的时候是否要改变地址
            }
        }
    }
}
module.exports = config