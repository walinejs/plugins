const API_PATH = '/api/plugin/easy-storage';
const MODEL_NAME = 'config';

module.exports = function(options = {}) {
  return {
    middlewares: [
      // GET /api/plugin/easy-storage
      async (ctx, next) => {
        if (ctx.path.toLowerCase() !== API_PATH || ctx.method.toUpperCase() !== 'GET') {
          return next();
        }

        const tokenController = think.app.controllers.token;
        const getModel = tokenController.prototype.getModel.bind(ctx);
        const configModel = getModel(MODEL_NAME);
        const key = ctx.query.key;
        if (!key) {
          ctx.throw(400, 'Missing key parameter');
          return;
        }

        try {
          const config = await configModel.select({ key });
          const value = think.isEmpty(config) ? {} : JSON.parse(config[0].value);

          ctx.success(value);
        } catch (err) {
          console.error(err);
          ctx.throw(500, 'Internal server error');
        }
        
        next();
      },
      // POST /api/plugin/easy-storage
      async (ctx, next) => {
        if (ctx.path.toLowerCase() !== API_PATH || ctx.method.toUpperCase() !== 'POST') {
          return next();
        }


        const tokenLogic = think.app.logics.token;
        const logic = new tokenLogic(ctx);
        await logic.__before();

        if (ctx.state?.userInfo?.type !== 'administrator') {
          ctx.throw(403, 'Forbidden');
          return;
        }


        const tokenController = think.app.controllers.token;
        const getModel = tokenController.prototype.getModel.bind(ctx);
        const configModel = getModel(MODEL_NAME);
        const { key, value } = ctx.post('key,value');

        if (!key || !value) {
          ctx.throw(400, 'Missing key or value parameter');
          return;
        }

        try {
          const existingConfig = await configModel.select({ key });
          if (think.isEmpty(existingConfig)) {
            await configModel.add({ key, value: JSON.stringify(value) });
          } else {
            await configModel.update({ key, value: JSON.stringify(value) }, { key });
          }

          ctx.success({});
        } catch (err) {
          console.error(err);
          ctx.throw(500, 'Internal server error');
        }

        return next();
      }
    ],
  };
};