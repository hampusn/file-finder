define((require) => {
  'use strict';

  const Component = require('Component');
  const template = require('/template/files');

  return Component.extend({
    template,
    
    filterState ({ files, showId }) {
      return { files, showId };
    }
  });
});
