module.exports = {
  hooks: {
    preSave(data) {
      delete data.ua;
      delete data.ip;
    },
  },
};
