module.exports = function({whiteList, blackList, interceptorTemplate}) {
  return {
    middlewares: [
      async (ctx, next) => {
        if (ctx.path.toLowerCase() !== '/api/comment' || ctx.method.toUpperCase() !== 'GET') {
          return next();
        }

        const type = ctx.param('type');
        if (type === 'count' || type === 'list') {
          return next();
        }

        function isValidUrl(url) {
          const host = (new URL(url)).host;
          if (host === ctx.host) {
            return true;
          }

          const inBlackList = Array.isArray(blackList) ? blackList.find(blackList => blackList.toLowerCase() === host) : false;
          const inWhiteList = Array.isArray(whiteList) ? whiteList.find(whiteHost => whiteHost.toLowerCase() === host) : false;
          return !inBlackList || inWhiteList;
        }
      
        function replaceUrl(text, redirectUrl = `${ctx.protocol}://${ctx.host}/api/redirect`) {
          return text.replace(/href\=\"([^"#]+)\"/g, (originText, url) => {
            if (isValidUrl(url)) {
              return originText;
            }

            return `href="${redirectUrl}?url=${encodeURIComponent(url)}"`; 
          });
        }

        const _oldSuccess = ctx.success;
        const newSuccess = function(data) {
          (Array.isArray(data) ? data : data.data).forEach(comment => {
            comment.comment = replaceUrl(comment.comment);
            if (Array.isArray(comment.children) && comment.children.length) {
              comment.children.forEach(cmt => {
                cmt.comment = replaceUrl(cmt.comment);
              });
            }
          });

          _oldSuccess.call(ctx, data);
        }
        ctx.success = newSuccess;
        await next();
      },
      async (ctx, next) => {
        function outputHtml(url) {
          const template = interceptorTemplate || `<!DOCTYPE html><html lang="zh-CN"><head><title>Redirect to third party website</title></head><body data-url="__URL__"><p>Redirecting to __URL__</p><script>location.href = document.body.getAttribute('data-url');</script></body></html>`;
          return template.replace(/__URL__/g, () => url);
        }

        if (ctx.path.toLowerCase() !== '/api/redirect' || ctx.method.toUpperCase() !== 'GET') {
          return next();
        }

        const url = ctx.param('url');
        try {
          // not standard url then exit to avoid xss
          new URL(url);
          ctx.body = outputHtml(url);
        } catch(e) {
          ctx.body = url;
          console.log(e);
        }
      }
    ]
  }
};
