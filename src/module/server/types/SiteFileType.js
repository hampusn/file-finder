define((require) => {

  const nodeTypeUtil = require('NodeTypeUtil');
  const resourceLocatorUtil = require('ResourceLocatorUtil');
  const pathsUtil = require('/module/server/pathsUtil');
  const Type = require('/module/server/types/Type');

  const FILE_RESOURCE_INDEX_TYPE = 'fileresource';

  class SiteFileType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');

      // Is not a file.
      if (!hitTypes.contains(FILE_RESOURCE_INDEX_TYPE)) {
        return false;
      }

      const repoId = pathsUtil.getRepositoryIdFromPaths(searchHit.getFields('path').toArray());
      const repo = resourceLocatorUtil.getNodeByIdentifier(repoId);

      return nodeTypeUtil.isType(repo, nodeTypeUtil.FILE_REPOSITORY_TYPE);
    }

    static _getFileInfo (searchHit) {
      const siteId = searchHit.getField('site');
      const nodeId = searchHit.getField('nodeid');

      return {
        editUrl: `/edit/${siteId}/file/${nodeId}`
      };
    }
  };

  return SiteFileType;
});
