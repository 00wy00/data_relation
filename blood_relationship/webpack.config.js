'use strict';

module.exports = (env) => {
  const config = {
    dev: require('./script/webpack-dev.config'),
  };

  return config[env];
};
