const tencentcloud = require("tencentcloud-sdk-nodejs-tms");
const TmsClient = tencentcloud.tms.v20201229.Client;


module.exports = function({secretId, secretKey, region}) {
  if (!secretId || !secretKey || !region) {
    return {};
  }

  const clientConfig = {
    credential: {
      secretId,
      secretKey,
    },
    region,
    profile: {
      httpProfile: {
        endpoint: "tms.tencentcloudapi.com",
      },
    },
  };
  
  return {
    hooks: {
      async preSave(data) {
        const { userInfo } = this.ctx.state;
        const isAdmin = userInfo.type === 'administrator';
        // ignore admin comment
        if (isAdmin) {
          return;
        }

        const client = new TmsClient(clientConfig);

        // encode comment as Base64 in UTF-8 format
        const encodedComment = Buffer.from(data.comment, 'utf8').toString('base64');

        try {
          const resp = await client.TextModeration({ Content: encodedComment });
          if (!resp.Suggestion) {
            throw new Error('Suggestion is empty. Tencent Cloud TMS info:', resp);
          }

          switch(resp.Suggestion) {
            case 'Pass':
              data.status = 'approved';
              break;
            case 'Block':
              data.status = 'spam';
              break;
              case 'Review':
              default:
                data.status = 'waiting';
                break;
          }
        } catch(e) {
          console.log(e);
          data.status = 'waiting';
        }
      },
    },
  };
}