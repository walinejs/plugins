const GitHub = require('./services/github');
const updateContent = require('./utils/update');

/**
 * {
	"startMeta": {
		"parentTagName": "P",
		"parentIndex": 0,
		"textOffset": 27
	},
	"endMeta": {
		"parentTagName": "P",
		"parentIndex": 0,
		"textOffset": 29
	},
	"text": "公举",
	"id": "80b5005f-ff5b-45e0-b0b4-b22d277358c2",
	"__isHighlightSource": {},
	"extra": {
		"cmtId": "1234"
	}
}
 */
async function hyperMiddleware(ctx, next) {
  if (ctx.method !== 'POST' || ctx.url !== '/api/hyper-comment' || !process.env.GITHUB_TOKEN) {
    return next();
  }

  if (think.isEmpty(ctx.state.userInfo)) {
    return next();
  }

  const data = ctx.post();

  const github = new GitHub({ repo: data.repo, token: process.env.GITHUB_TOKEN });
  
  const { content, sha } = await github.get(data.filename);
  const newContent = updateContent(content, data);
  await github.set({ content: newContent, sha }, data.filename);
  
  ctx.type = 'application/json';
  ctx.body = JSON.stringify({content: newContent});

  return next();
}

module.exports = function() {
  return {
    middlewares: [ hyperMiddleware ]
  }
}

