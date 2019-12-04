### Vvjs,一个很优秀的koa项目脚手架

### 安装启动

1. cp .env.example .env
2. npm install
3. npm start -o

~~~
启动：node src/server.js
~~~
### 框架简介
1. ☑ group 路由功能 ,支持添加指定路由中间件
2. ☑ 支持跨域
3. ☑ .env 配置支持
4. ☑ 中间件支持
5. ☐ log日志支持
6. ☑ model orm 支持 [相关文档](https://github.com/demopark/sequelize-docs-Zh-CN)
7. ☐ event 支持
8. ☑ migrate 支持 [相关文档](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/migrations.md)

### 相关说明：

#### 数据迁移--[查看相关文档](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/migrations.md)
1.创建迁移文件，同时生成model
~~~
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
~~~
2.运行迁移/撤消迁移
~~~
npx sequelize-cli db:migrate 
==or==
npx sequelize-cli db:migrate:undo
~~~

