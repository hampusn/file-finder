define((require) => {

  const nodeTypeUtil = require('NodeTypeUtil');
  const resourceLocatorUtil = require('ResourceLocatorUtil');
  const pathsUtil = require('/module/server/pathsUtil');
  const Type = require('/module/server/types/Type');

  const IMAGE_INDEX_TYPE = 'image';
  const TYPES = [
    pathsUtil.PAGE_NODE_ID_TYPE,
    pathsUtil.ARTICLE_NODE_ID_TYPE,
    pathsUtil.SITE_NODE_ID_TYPE,
    pathsUtil.SOCIAL_GROUP_PAGE_ID_TYPE
  ];

  class LocalImageType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');

      // Is not a file.
      if (!hitTypes.contains(IMAGE_INDEX_TYPE)) {
        return false;
      }

      const repoId = pathsUtil.getRepositoryIdFromPaths(searchHit.getFields('path').toArray());
      const repo = resourceLocatorUtil.getNodeByIdentifier(repoId);

      return nodeTypeUtil.isType(repo, nodeTypeUtil.LOCAL_IMAGE_REPOSITORY_TYPE);
    }

    static _getFileInfo (searchHit) {
      const paths = searchHit.getFields('path').toArray();
      const repoId = pathsUtil.getRepositoryIdFromPaths(paths);
      const nodeId = pathsUtil.getClosestOfTypeFromPath(paths, repoId, TYPES);

      return {
        editUrl: `/edit/${nodeId}/properties/pageImages`
      };
    }
  };

  return LocalImageType;
});
