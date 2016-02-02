'use strict';

module.exports = function() {
  return {
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true
    },
    "plugins": [],
    "rules": {
      "no-undef": 2,
      "no-unused-vars": 2,
      "no-var": 2
    }
  };
};

module.exports.react = function() {
  var config = module.exports.default();
  config.plugins = config.plugins.concat("react");
  config.rules = Object.assign(config.rules, {
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2
  });

  return config;
};
