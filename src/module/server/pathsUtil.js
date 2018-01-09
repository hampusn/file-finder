/**
 * Contains helper functions for SearchHit's indexed path values.
 */
define(function (require) {
  'use strict';

  var REPOSITORY_ID_TYPE = '15.';
  var PAGE_NODE_ID_TYPE = '4.';

  /**
   * Creates a filter callback which determines if a path
   * is of a specific node type in a crude way.
   *
   * @param  {String} type
   * @return {Function}
   * @private
   */
  function getTypeFilter (type) {
    return function (path) {
      return path.indexOf(type) === 0;
    };
  }

  /**
   * Returns the first repository ID found in the array with paths.
   *
   * @param  {Array}          paths An array of paths
   * @return {String}               Returns the ID on success, empty string otherwise.
   * @public
   */
  function getRepositoryIdFromPaths (paths) {
    var filtered = paths.filter(getTypeFilter(REPOSITORY_ID_TYPE));
    if (filtered.length) {
      return filtered[0] + '';
    }
    return '';
  }

  function getClosestOfTypeFromPath (paths, path, type) {
    var filtered = paths.slice(paths.indexOf(path) + 1).filter(getTypeFilter(type));
    if (filtered.length) {
      return filtered[0] + '';
    }
    return '';
  }

  return {
    "getRepositoryIdFromPaths": getRepositoryIdFromPaths,
    "getClosestOfTypeFromPath": getClosestOfTypeFromPath,
    "REPOSITORY_ID_TYPE": REPOSITORY_ID_TYPE,
    "PAGE_NODE_ID_TYPE": PAGE_NODE_ID_TYPE
  };
});
