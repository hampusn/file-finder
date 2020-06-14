/**
 * Contains helper functions for SearchHit's indexed path values.
 */
define(() => {
  'use strict';

  const REPOSITORY_ID_TYPE = '15.';
  const SOCIAL_IMAGE_REPOSITORY_ID_TYPE = '406.';
  const SOCIAL_FILE_REPOSITORY_ID_TYPE = '407.';
  const PAGE_NODE_ID_TYPE  = '4.';

  function compoundOrFilter (filters = []) {
    return (...args) => filters.some((filter) => filter(...args));
  }

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
    const repositoryFilter = compoundOrFilter([
      getTypeFilter(REPOSITORY_ID_TYPE),
      getTypeFilter(SOCIAL_IMAGE_REPOSITORY_ID_TYPE),
      getTypeFilter(SOCIAL_FILE_REPOSITORY_ID_TYPE)
    ]);
    const filtered = paths.filter(repositoryFilter);
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
