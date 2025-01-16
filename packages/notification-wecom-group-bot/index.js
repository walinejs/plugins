const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

module.exports = {
  hooks: {
    async postSave(comment, parent) {
      const { WECOM_GROUP_WEBHOOK, SITE_NAME, SITE_URL ,WECOM_TEMPLATE} = process.env;

      if (!WECOM_GROUP_WEBHOOK) {
        return false;
      }

      comment.comment = comment.comment.replace(/(<([^>]+)>)/gi, '');

      const data = {
        self: comment,
        parent,
        site: {
          name: SITE_NAME,
          url: SITE_URL,
          postUrl: SITE_URL + comment.url + '#' + comment.objectId,
        },
      };

      const template = WECOM_TEMPLATE || `{{site.name|safe}}有新评论啦
【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}`;

      const content = nunjucks.renderString(template,data);

      const msg = {
        msgtype: 'text',
        text: {
          content: `${content}`,
        },
      };

      try {
        const resp = await fetch(WECOM_GROUP_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(msg),
        }).then((resp) => resp.json());

        if (resp.errcode !== 0) {
          console.log('Wecom group bot notification FAILED:', JSON.stringify(resp));
        } else {
          console.log('Wecom group bot notification SUCCESS:', JSON.stringify(resp));
        }
      } catch (error) {
        console.error('Send wecom group bot notification ERROR:', error);
      }
    },
  },
};
