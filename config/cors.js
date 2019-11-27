//跨域配置 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
module.exports = {
    //指定了允许访问该资源的外域 URI Access-Control-Allow-Origin
    origin: 'http://example.com',

    //XMLHttpRequest对象的getResponseHeader()方法允许拿到的额外的头部字段 Access-Control-Expose-Headers
    expose: 'X-My-Custom-Header, X-Another-Custom-Header',

    //指定了preflight请求的结果能够被缓存多久 Access-Control-Max-Age
    maxAge: 7 * 24 * 60 * 60,

    //指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容 Access-Control-Allow-Credentials
    credentials: true,

    //指明了实际请求所允许使用的 HTTP 方法 Access-Control-Allow-Methods
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',

    //指明了实际请求中允许携带的首部字段 Access-Control-Allow-Headers
    headers: 'Content-Type, Accept, Authorization'
}