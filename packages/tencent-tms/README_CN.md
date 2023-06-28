# @waline-plugins/tencent-tms

在发布评论的时候，为 Waline 增加腾讯云内容审核插件。

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