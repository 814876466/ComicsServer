const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const cors = require('cors')
const userRouter = require('./router/loginRouter')

// 静态资源托管处理
app.use(express.static("./public"));
// app.get('/', (req, res) => {
// 	res.send('hello world')
// })
//处理跨域
// app.use((req,res,next)=>{
// 	res.set()
// 	next()
// })
app.use(cors())

// req.body 中间件处理
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 调用路由文件，并设置好前缀
app.use(userRouter);

// 统一错误处理
app.use((err, req, res, next) => {
	// 可以将错误信息写入到某个文件中，方便后续去查看文件
	// fs 模块  fs.writeFile
	//     不能使用 fs.writeFile 要用 fs.appendFile
	console.error(err);
	res.status(500).send(err.message);
});


//提供代理
app.use('/test', createProxyMiddleware({
	//目标i地址只写主机
	target: 'http://manhua.weibo.cn',
	changeOrigin: true,
	pathRewrite: {
		'^/test': ''
	}
}))

app.listen(9090, () => {
	console.log('server is listening')
})
