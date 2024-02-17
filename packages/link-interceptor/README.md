# @waline-plugins/link-interceptor

A Waline plugin that interceptor comment link redirect with a redirect page.

## How to Install

```
npm i @waline-plugins/link-interceptor
```

## How to Use

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