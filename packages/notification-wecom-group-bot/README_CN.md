# notification-wecom-group-bot

一个Waline插件，提供 **企业微信群机器人** 通知功能。

## 如何安装
```shell
npm install @waline-plugins/notification-wecom-group-bot
```

## 如何使用
编辑你的服务端 Waline 文件:

waline.js
```js
const Application = require('@waline/vercel');
const WecomGroupBot = require('@waline-plugins/notification-wecom-group-bot');

module.exports = Application({
  plugins: [WecomGroupBot],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});
```

### package.json
把 `"@waline-plugins/notification-wecom-group-bot": "latest"` 添加到 package.json 依赖中。


## 环境变量

- `WECOM_GROUP_WEBHOOK`: Wecom group bot webhook URL. e.g. `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b55f4f3c-478c-4256-8ba9-cf217f288987`
- `SITE_NAME`: Your site name, used for display in notification message.
- `SITE_URL`: Your site URL, used for display in notification message.
- `WECOM_TEMPLATE`: (optional) Your custom notification template, please refer [this document](https://waline.js.org/en/guide/features/notification.html#notification-template).


在修改环境变量后，你需要 **重新部署** Waline服务端。
