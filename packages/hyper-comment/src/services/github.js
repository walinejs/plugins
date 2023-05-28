const path = require('path');

module.exports = class GitHub {
  constructor(options) {
    this.repo = options.repo;
    this.token = options.token;
  }

  async get(filename) {
    const resp = await fetch(
      'https://api.github.com/repos/' +
        path.join(this.repo, 'contents', filename),
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: 'token ' + this.token,
          'user-agent': 'Waline',
        },
      }
    ).then((resp) => resp.json());
  
    return {
      content: Buffer.from(resp.content, 'base64').toString('utf-8'),
      sha: resp.sha,
    };
  }

  async set({content, sha}, filename) {
    return fetch(
      'https://api.github.com/repos/' +
        path.join(this.repo, 'contents', filename),
      {
        method: 'PUT',
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: 'token ' + this.token,
          'user-agent': 'Waline',
        },
        body: JSON.stringify({
          sha,
          message: 'feat(waline): update comment data [skip ci]',
          content: Buffer.from(content, 'utf-8').toString('base64'),
        }),
      }
    ).then(resp => resp.json());
  }
};
