define((require) => {
  'use strict';

  const reducer = function (state, action) {
    switch (action.type) {
      case 'SET_FILES':
        return { ...state, query: action.query, files: action.files };
      default:
        return state;
    }
  }

  return reducer;
});
