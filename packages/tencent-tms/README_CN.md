# @waline-plugins/tencent-tms

A Waline plugin that add tencent cloud TMS audit service for Waline when post a new comment.

## 如何安装

```
npm i @waline-plugins/tencent-tms
```

## 如何使用

```js
// index.js
const Waline = require('@waline/vercel');
const TencentTMS = require('@waline-plugins/tencent-tms');

module.exports = Waline({
  plugins: [
    TencentTMS({
      secretId: 'xxx',
      secretKey: 'xxx',
      region: 'ap-beijing',
    })
  ]
});
```