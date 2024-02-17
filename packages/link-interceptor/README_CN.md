# @waline-plugins/link-interceptor

拦截评论内容的链接跳转，为 Waline 评论链接跳转增加中间页。

## 如何安装

```
npm i @waline-plugins/link-interceptor
```

## 如何使用

```js
// index.js
const Waline = require('@waline/vercel');
const LinkInterceptor = require('@waline-plugins/link-interceptor');

module.exports = Waline({
  plugins: [
    LinkInterceptor({
      whiteList: [
        'waline.js.org',
      ],
      blackList: [
        'baidu.com'
      ],
      // interceptorTemplate: `redirect to __URL`
    });
  ]
});
```