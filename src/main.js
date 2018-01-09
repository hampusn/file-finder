define(function (require) {
  'use strict';

  var Component    = require('Component');
  var requester    = require('requester');
  var router       = require('router');
  var app          = require('app');
  var mainTemplate = require('/template/main');

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
      }
    },

    getFiles: function (options) {
      var query = options.queryParams.query;

      if (!query) {
        this.setState({
          "files": [],
          "query": ''
        });

        return;
      }

      requester.doGet({
        "url":     options.url,
        "context": this
      }).done(function (response) {
        this.setState({
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
    }
  });
});
