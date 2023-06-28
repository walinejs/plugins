# @waline-plugins/tencent-tms

在发布评论的时候，为 Waline 增加腾讯云内容审核插件。

## How to Install

```
npm i @waline-plugins/tencent-tms
```

## How to Use

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