'use strict';

module.exports = function() {
  return {
    "parser": "babel-eslint",
    "globals": {
      "Promise": true
    },
    "env": {
      "browser": true,
      "node": true
    },
    "plugins": [],
    "rules": {
      "arrow-parens": [2, "as-needed"],
      "no-extra-semi": 2,
      "no-undef": 2,
      "no-unused-vars": 2,
      "no-var": 2,
      "semi": [2, "always"]
    }
  };
};

module.exports.react = function() {
  var config = module.exports();

  config.plugins = config.plugins.concat("react");
  config.rules = Object.assign(config.rules, {
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2
  });

  return config;
};
