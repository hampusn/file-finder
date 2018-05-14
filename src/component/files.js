define(function (require) {
  'use strict';

  var Component     = require('Component');
  var filesTemplate = require('/template/files');
  var _             = require('underscore');

  return Component.extend({
    template: filesTemplate,
    filterState: function(state) {
      return _.extend({}, {files: state.files, showId: state.showId});
    }
  });
});
