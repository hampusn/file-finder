define(function (require) {
  'use strict';

  var Component    = require('Component');
  var requester    = require('requester');
  var router       = require('router');
  var app          = require('app');
  var mainTemplate = require('/template/main');
  var _            = require('underscore');
  var store        = require('store');


  return Component.extend({
    "template": mainTemplate,

    "events": {
      "dom": {
        "submit form": "handleSearch",
        "input input": "updateSearch"
      },
      "router": {
        "query:changed:query": "getFiles"
      },
      "self": {
        "state:changed": "render"
      },
      "store": 'handleStoreChange'
    },

    getFiles: function (options) {
      var query = options.queryParams.query;

      if (!query) {
        store.dispatch({
          "type": "SET_FILES",
          "files": [],
          "query": ''
        });

        return;
      }

      requester.doGet({
        "url":     options.url,
        "context": this
      }).done(function (response) {
        store.dispatch({
          "type": "SET_FILES",
          "files": response.files,
          "query": query
        });
      });
    },

    updateSearch: function (e) {
      // console.log(e);
    },

    handleSearch: function (e) {
      e.preventDefault();

      router.navigate(e.currentTarget.action, {
        "queryParams": {
          "query": this.$('input[name=query]').val()
        }
      });
    },
    
    handleStoreChange: function(newState) {
      this.setState(newState);
    },

    filterState: function(state) {
      return _.extend({}, {query: state.query, files: state.files, showId: state.showId});
    }
  });
});
