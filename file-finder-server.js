/**
 * File Finder
 *
 * @author Hampus Nordin <nordin.hampus@gmail.com>
 */

/* globals Java, require */
/* exported context */

/**
 * Contains helper functions for working with
 * the different types of repositories in this script.
 */
var repositoryUtil = (function (exports) {
  var scriptUtil = require('ScriptUtil');

  var editUrlPatterns = {
    "siteFileEdit": "/edit/{0}/file/{1}",
    "siteImageEdit": "/edit/{0}/image/{1}",
    "localFileEdit": "/edit/{0}/properties/pageFiles",
    "localImageEdit": "/edit/{0}/properties/pageImages"
  };

  var prettyTypes = {
    "siteFile": "Filarkivet",
    "siteImage": "Bildarkivet",
    "localFile": "Lokal fil",
    "localImage": "Lokal bild"
  };

  exports.SITE_FILE = 1;
  exports.SITE_IMAGE = 2;
  exports.LOCAL_FILE = 3;
  exports.LOCAL_IMAGE = 4;

  /**
   * Build an edit-URI for a file based on the type of repository the file belongs to.
   *
   * @param  {Integer} type
   * @param  {Array}   args
   * @return {String}
   * @public
   */
  exports.getEditUrlForFile = function getEditUrlForFile (type, args) {
    var pattern;
    if (type === exports.SITE_FILE) {
      pattern = editUrlPatterns.siteFileEdit;
    } else if (type === exports.SITE_IMAGE) {
      pattern = editUrlPatterns.siteImageEdit;
    } else if (type === exports.LOCAL_FILE) {
      pattern = editUrlPatterns.localFileEdit;
    } else if (type === exports.LOCAL_IMAGE) {
      pattern = editUrlPatterns.localImageEdit;
    }

    if (pattern) {
      return scriptUtil.messageFormat(pattern, args) + '';
    }
    return '';
  };

  /**
   * Get a human readable representation of the repository type.
   *
   * @param  {Integer} type
   * @return {String}
   */
  exports.getPrettyType = function getPrettyType (type) {
    var prettyType;
    if (type === exports.SITE_FILE) {
      prettyType = prettyTypes.siteFile;
    } else if (type === exports.SITE_IMAGE) {
      prettyType = prettyTypes.localImage;
    } else if (type === exports.LOCAL_FILE) {
      prettyType = prettyTypes.localFile;
    } else if (type === exports.LOCAL_IMAGE) {
      prettyType = prettyTypes.localImage;
    }

    return prettyType;
  };

  return exports;
})({});

/**
 * Contains helper functions for SearchHit's indexed path values.
 */
var pathsUtil = (function (exports) {

  /**
   * Filter callback which determines if a path
   * is a repository node in a crude way.
   *
   * @param  {String} path
   * @return {Boolean}
   * @private
   */
  function repositoryIdFilter (path) {
    return path.indexOf('15.') === 0;
  }

  /**
   * Returns the first repository ID found in the array with paths.
   *
   * @param  {Array}          paths An array of paths
   * @return {String|Boolean}       Returns the ID on success, false otherwise.
   * @public
   */
  exports.getRepositoryIdFromPaths = function getRepositoryIdFromPaths (paths) {
    var filtered = paths.filter(repositoryIdFilter);
    if (filtered.length) {
      return filtered[0] + '';
    }
    return '';
  };

  return exports;
})({});


/**
 * Contains the main logic for this script module. Places needed
 * variables in a context object accessible in the velocity template.
 * @return {Object}
 */
var context = (function (request) {
  var portletContextUtil  = require('PortletContextUtil');
  var propertyUtil        = require('PropertyUtil');
  var resourceLocatorUtil = require('ResourceLocatorUtil');
  var searchUtil          = require('SearchUtil');
  var nodeTypeUtil        = require('NodeTypeUtil');
  var fileRepoId          = resourceLocatorUtil.getFileRepository().getIdentifier() + '';
  var imageRepoId         = resourceLocatorUtil.getImageRepository().getIdentifier() + '';
  var currentPage         = portletContextUtil.getCurrentPage();
  var ns                  = portletContextUtil.getPortletNamespace('file-finder');

  var searchField = ns + '-search';
  var searchValue = (request.getParameter(searchField) || '') + '';

  var items = [];
  var hit;
  var repoId;
  var repo;
  var type;
  var editUrl;
  var siteId;
  var fileId;
  var repoPageId;

  var query = [
    '+svtype:(image file)'
  ];

  // Add search query if value exist.
  if (searchValue) {
    query.push('+(');
    query.push('nodeid:(' + searchValue + ')');
    query.push('name:(' + searchValue + ')');
    query.push('title:(' + searchValue + ')');
    query.push('url:(' + searchValue + ')');
    query.push('"' + searchValue + '"');
    query.push(')');
  }

  var hitsIterator = searchUtil.search(query.join(' '), null, 0, 100).getHits();

  while (hitsIterator.hasNext()) {
    hit = hitsIterator.next();

    editUrl = '';
    siteId = hit.getFieldEscaped('site');
    fileId = hit.getFieldEscaped('id');
    repoId = pathsUtil.getRepositoryIdFromPaths(Java.from(hit.getFieldsEscaped('path')));

    if (repoId === fileRepoId) {
      type = repositoryUtil.SITE_FILE;
      editUrl = repositoryUtil.getEditUrlForFile(type, [siteId, fileId]);
    } else if (repoId === imageRepoId) {
      type = repositoryUtil.SITE_IMAGE;
      editUrl = repositoryUtil.getEditUrlForFile(type, [siteId, fileId]);
    } else if (repoId) {
      repo = resourceLocatorUtil.getNodeByIdentifier(repoId);
      if (repo) {
        // Repository's parent's parent should be the page.
        repoPageId = repo.getParent().getParent().getIdentifier();

        if (nodeTypeUtil.isType(repo, nodeTypeUtil.LOCAL_FILE_REPOSITORY_TYPE)) {
          type = repositoryUtil.LOCAL_FILE;
          editUrl = repositoryUtil.getEditUrlForFile(type, [repoPageId]);
        } else if (nodeTypeUtil.isType(repo, nodeTypeUtil.LOCAL_IMAGE_REPOSITORY_TYPE)) {
          type = repositoryUtil.LOCAL_IMAGE;
          editUrl = repositoryUtil.getEditUrlForFile(type, [repoPageId]);
        }
      }
    }

    items.push({
      "title": hit.getFieldEscaped('name'),
      "editUrl": editUrl,
      "type": repositoryUtil.getPrettyType(type)
    });
  }

  return {
    "items": items,
    "hasItems": items.length > 0,
    "currentPageUrl": propertyUtil.getStringEscaped(currentPage, 'URI', ''),
    "ns": ns,
    "searchField": searchField,
    "searchValue": searchValue
  };
})(request);
