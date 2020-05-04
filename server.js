const express =require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app= express()
const cors =require('cors')
app.get('/',(req,res)=>{
	res.send('hello world')
})
//处理跨域
// app.use((req,res,next)=>{
// 	res.set()
// 	next()
// })
app.use(cors())
//提供代理
app.use('/test',createProxyMiddleware({
	//目标i地址只写主机
	target: 'http://manhua.weibo.cn',
	changeOrigin: true,
	pathRewrite: {
		'^/test': ''
	}
}))

app.listen(9090,()=>{
	console.log('server is listening')
})