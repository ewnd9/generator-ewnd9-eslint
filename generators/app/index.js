'use strict';

const yeoman = require('yeoman-generator');
const sortedObject = require('sorted-object');

const TYPE_DEFAULT = 'Default';
const TYPE_REACT = 'React';

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    const done = this.async();
    const prompts = [{
      type: 'list',
      name: 'type',
      message: 'Select Type',
      choices: [
        TYPE_DEFAULT, TYPE_REACT
      ]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: function() {
    const creator = require('./create-config');
    const isDefault = this.props.type === TYPE_DEFAULT;
    const config = isDefault ? creator() : creator.react();

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), config);

    const override = (path, cb) => {
      const dest = this.destinationPath(path);
      const data = this.fs.readJSON(dest) || {};
      cb(data);

      this.fs.writeJSON(path, data);
    };

    override('package.json', data => {
      const assign = (property, values) => {
        data[property] = sortedObject(Object.assign(data[property] || {}, values));
      };

      assign('scripts', {
        'lint': "eslint 'src/**/*.js'",
        'precommit': 'npm run lint && npm test'
      });

      assign('devDependencies', {
        'eslint': '^3.0.0',
        'babel-eslint': '^6.0.0',
        'husky': '^0.11.6'
      });

      if (this.props.type === TYPE_REACT) {
        assign('devDependencies', {
          'eslint-plugin-react': '^6.1.0'
        });
      }
    });
  }
});
