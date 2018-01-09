define(function (require) {
  'use strict';

  var Component = require('Component');
  var filesTemplate = require('/template/files');

  return Component.extend({
    template: filesTemplate
  });
});
