define(function(require) {
  'use strict';

  var _ = require('underscore');

  var reducer = function(state, action) {
    switch (action.type) {
      case 'SET_FILES':
        return _.extend({}, state, {query: action.query, files: action.files});
      default:
        return state;
    }
  }

  return reducer;
});
