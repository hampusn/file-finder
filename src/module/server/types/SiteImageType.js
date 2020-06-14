define((require) => {

  const nodeTypeUtil = require('NodeTypeUtil');
  const resourceLocatorUtil = require('ResourceLocatorUtil');
  const pathsUtil = require('/module/server/pathsUtil');
  const Type = require('/module/server/types/Type');

  const IMAGE_INDEX_TYPE = 'image';

  class SiteImageType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');

      // Is not a file.
      if (!hitTypes.contains(IMAGE_INDEX_TYPE)) {
        return false;
      }

      const repoId = pathsUtil.getRepositoryIdFromPaths(searchHit.getFields('path').toArray());
      const repo = resourceLocatorUtil.getNodeByIdentifier(repoId);

      return nodeTypeUtil.isType(repo, nodeTypeUtil.IMAGE_REPOSITORY_TYPE);
    }

    static _getFileInfo (searchHit) {
      const siteId = searchHit.getField('site');
      const nodeId = searchHit.getField('nodeid');
      
      return {
        editUrl: `/edit/${siteId}/image/${nodeId}`
      };
    }
  };

  return SiteImageType;
});
