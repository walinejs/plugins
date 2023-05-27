module.exports = {
  hooks: {
    preSave(comment) {
      console.log('debug info:', comment);
    },
  },
  middlewares: [
    (ctx, next) => {
      console.log(`debug info: [${ctx.method}] ${ctx.url}`);
      next();
    }
  ],
};
