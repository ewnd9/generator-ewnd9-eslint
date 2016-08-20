'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-generator').test;

describe('generator-ewnd9-eslint:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.eslintrc.json'
    ]);
  });
});
