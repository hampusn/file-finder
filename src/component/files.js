define((require) => {
  'use strict';

  const Component = require('Component');
  const template = require('/template/files');

  return Component.extend({
    template,

    events: {
      self: {
        'state:changed': 'render'
      },
      store: 'handleStoreChange'
    },

    handleStoreChange (newState) {
      this.setState(newState);
    },
    
    filterState (state) {
      return { ...state };
    }
  });
});
