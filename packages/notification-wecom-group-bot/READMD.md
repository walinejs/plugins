# notification-wecom-group-bot

A Waline plugin that provide wecome group bot notification spport.


## How to install
```shell
npm install @waline-plugins/notification-wecom-group-bot
```

## How to use

Edit your Waline File:

indes.js
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
Add "@waline-plugins/notification-wecom-group-bot": "latest" into package.json dependencies.


## Environment Variables

- `WECOM_GROUP_WEBHOOK`: Wecom group bot webhook URL. e.g. `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b55f4f3c-478c-4256-8ba9-cf217f288987`
- `SITE_NAME`: Your site name, used for display in notification message.
- `SITE_URL`: Your site URL, used for display in notification message.
- `WECOM_TEMPLATE`: (optional) Your custom notification template, please refer [this document](https://waline.js.org/en/guide/features/notification.html#notification-template).


You need **redeploy** after change environment variables.
