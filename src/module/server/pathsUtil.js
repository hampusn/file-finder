/**
 * Contains helper functions for SearchHit's indexed path values.
 */
define(() => {
  'use strict';

  const REPOSITORY_ID_TYPE = '15.';
  const PAGE_NODE_ID_TYPE  = '4.';

  /**
   * Creates a filter callback which determines if a path
   * is of a specific node type in a crude way.
   *
   * @param  {String} type
   * @return {Function}
   * @private
   */
  function getTypeFilter (type) {
    return (path) => path.includes(type);
  }

  /**
   * Returns the first repository ID found in the array with paths.
   *
   * @param  {Array}          paths An array of paths
   * @return {String}               Returns the ID on success, empty string otherwise.
   * @public
   */
  function getRepositoryIdFromPaths (paths) {
    const filtered = paths.filter(getTypeFilter(REPOSITORY_ID_TYPE));
    if (filtered.length) {
      return filtered[0] + '';
    }
    return '';
  }

  function getClosestOfTypeFromPath (paths, path, type) {
    const filtered = paths.slice(paths.indexOf(path) + 1).filter(getTypeFilter(type));
    if (filtered.length) {
      return filtered[0] + '';
    }
    return '';
  }

  return {
    getRepositoryIdFromPaths,
    getClosestOfTypeFromPath,
    REPOSITORY_ID_TYPE,
    PAGE_NODE_ID_TYPE
  };
});
