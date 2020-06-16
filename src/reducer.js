define((require) => {
  'use strict';

  const reducer = function (state, action) {
    switch (action.type) {
      case 'SET_FILES':
        return { ...state, query: action.query, contentType: action.contentType, files: action.files };
      default:
        return state;
    }
  }

  return reducer;
});
