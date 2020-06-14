define((require) => {

  const nodeTypeUtil = require('NodeTypeUtil');
  const resourceLocatorUtil = require('ResourceLocatorUtil');
  const pathsUtil = require('/module/server/pathsUtil');
  const Type = require('/module/server/types/Type');

  const FILE_INDEX_TYPE = 'file';

  class LocalFileType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');

      // Is not a file.
      if (!hitTypes.contains(FILE_INDEX_TYPE)) {
        return false;
      }

      const repoId = pathsUtil.getRepositoryIdFromPaths(searchHit.getFields('path').toArray());
      const repo = resourceLocatorUtil.getNodeByIdentifier(repoId);

      return nodeTypeUtil.isType(repo, nodeTypeUtil.LOCAL_FILE_REPOSITORY_TYPE);
    }

    static _getFileInfo (searchHit) {
      const paths = searchHit.getFields('path').toArray();
      const repoId = pathsUtil.getRepositoryIdFromPaths(paths);
      const nodeId = pathsUtil.getClosestOfTypeFromPath(paths, repoId, pathsUtil.PAGE_NODE_ID_TYPE); // TODO, support article ids. And more?

      return {
        editUrl: `/edit/${nodeId}/properties/pageFiles`
      };
    }
  };

  return LocalFileType;
});
