define((require) => {
  'use strict';

  const Component = require('Component');
  const requester = require('requester');
  const router = require('router');
  const template = require('/template/main');
  const store = require('store');

  return Component.extend({
    template,

    events: {
      dom: {
        'submit form': 'handleSearch'
      },
      router: {
        'query:changed:query': 'getFiles'
      },
      self: {
        'state:changed': 'render'
      },
      store: 'handleStoreChange'
    },

    getFiles (options) {
      const { query = '' } = options.queryParams;

      // Prevent unnecessary ajax.
      if (!query) {
        store.dispatch({
          type: 'SET_FILES',
          files: [],
          query: ''
        });

        return;
      }

      requester.doGet({
        url: options.url,
        context: this
      }).done((response) => {
        store.dispatch({
          type: 'SET_FILES',
          files: response.files,
          query
        });
      });
    },

    handleSearch (event) {
      event.preventDefault();

      router.navigate(event.currentTarget.action, {
        queryParams: {
          query: this.$('input[name=query]').val()
        }
      });
    },
    
    handleStoreChange (newState) {
      this.setState(newState);
    },

    filterState (state) {
      return { ...state };
    }
  });
});
