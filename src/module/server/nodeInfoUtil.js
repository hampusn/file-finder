/**
 * Contains helper functions for getting information about nodes and repositories.
 */
define(function (require) {
  'use strict';

  var resourceLocatorUtil = require('ResourceLocatorUtil');
  var nodeTypeUtil        = require('NodeTypeUtil');
  var propertyUtil        = require('PropertyUtil');
  var scriptUtil          = require('ScriptUtil');
  var logUtil             = require('LogUtil');
  var pathsUtil           = require('/module/server/pathsUtil');

  var infoTypes = (function () {
    var types = {};

    return {
      add: function (typeName, slug, i18nKey, editUrlPattern) {
        types[typeName] = {
          "slug": slug,
          "i18nKey": i18nKey,
          "editUrlPattern": editUrlPattern
        };
      },
      get: function (typeName) {
        return types[typeName];
      }
    };
  })();

  infoTypes.add(nodeTypeUtil.FILE_REPOSITORY_TYPE, 'site-file', 'fileArchiveHitLabel', "/edit/{0}/file/{1}");
  infoTypes.add(nodeTypeUtil.IMAGE_REPOSITORY_TYPE, 'site-image', 'imageArchiveHitLabel', "/edit/{0}/image/{1}");
  infoTypes.add(nodeTypeUtil.LOCAL_FILE_REPOSITORY_TYPE, 'local-file', 'localFileHitLabel', "/edit/{2}/properties/pageFiles");
  infoTypes.add(nodeTypeUtil.LOCAL_IMAGE_REPOSITORY_TYPE, 'local-image', 'localImageHitLabel', "/edit/{2}/properties/pageImages");

  /**
   * Build an edit-URI for a file based on the type of repository the file belongs to.
   *
   * @param  {String} type
   * @param  {Array}  args
   * @return {String}
   * @private
   */
  function getEditUrlForInfoType (type, args) {
    try {
      return scriptUtil.messageFormat(infoTypes.get(type).editUrlPattern, args);
    } catch (e) {
      logUtil.debug('Could not generate edit url for info type: ' + type);
    }
    return '';
  }

  function getI18nKeyForInfoType (type) {
    try {
      return infoTypes.get(type).i18nKey;
    } catch (e) {
      logUtil.debug('Could not get i18n key for type: ' + type);
    }
    return '';
  }

  function getSlugForInfoType (type) {
    try {
      return infoTypes.get(type).slug;
    } catch (e) {
      logUtil.debug('Could not get slug for type: ' + type);
    }
    return '';
  }

  function getFileInfoFromSearchHit (hit) {
    var siteId   = hit.getField('site');
    var fileId   = hit.getField('id');
    var paths    = hit.getFields('path').toArray();
    var repoId   = pathsUtil.getRepositoryIdFromPaths(paths);
    var repo     = resourceLocatorUtil.getNodeByIdentifier(repoId);
    var repoType = propertyUtil.getString(repo, 'jcr:primaryType', '');

    var args = [siteId, fileId];

    if (nodeTypeUtil.isTypeOf(repo, [nodeTypeUtil.LOCAL_FILE_REPOSITORY_TYPE, nodeTypeUtil.LOCAL_IMAGE_REPOSITORY_TYPE])) {
      args.push(pathsUtil.getClosestOfTypeFromPath(paths, repoId, pathsUtil.PAGE_NODE_ID_TYPE));
    }

    return {
      "editUrl": getEditUrlForInfoType(repoType, args),
      "repoType": repoType,
      "i18nKey": getI18nKeyForInfoType(repoType),
      "slug": getSlugForInfoType(repoType)
    };
  }

  return {
    "getFileInfoFromSearchHit": getFileInfoFromSearchHit
  };
});
