define((require) => {
  'use strict';

  const Component = require('Component');
  const requester = require('requester');
  const router = require('router');
  const app = require('app');
  const template = require('/template/main');
  const store = require('store');

  return Component.extend({
    template,

    events: {
      dom: {
        'submit form': 'handleSearch'
      },
      router: {
        'query:changed': 'getFiles'
      }
    },

    dispatchResults (files = [], query = '', contentType = '') {
      store.dispatch({
        type: 'SET_FILES',
        files,
        query,
        contentType
      });
    },

    getFiles (options) {
      const { query = '', type = '' } = options.queryParams;

      // Prevent unnecessary ajax.
      if (!query) {
        this.dispatchResults();

        return;
      }

      requester.doGet({
        url: options.url,
        context: this
      }).done((response) => {
        this.dispatchResults(response.files, query, type);
      });
    },

    handleSearch (event) {
      event.preventDefault();

      router.navigate(event.currentTarget.action, {
        queryParams: {
          query: this.$('input[name=query]').val(),
          type: this.$('input[name="type"]:checked').val()
        }
      });
    },

    templateFunctions () {
      return {
        pathParamaterName: `sv.${app.portletId}.route`,
        portletId: app.portletId,
        checked (condition = false) {
          return condition ? 'checked' : '';
        }
      };
    },

    filterState (state) {
      return { ...state };
    }
  });
});
