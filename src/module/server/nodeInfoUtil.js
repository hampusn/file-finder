/**
 * Contains helper functions for getting information about nodes and repositories.
 */
define((require) => {
  'use strict';

  const Type = require('/module/server/types/Type');

  const TYPES = [
    require('/module/server/types/GroupFileType'),
    require('/module/server/types/GroupImageType'),
    require('/module/server/types/LocalFileType'),
    require('/module/server/types/LocalImageType'),
    require('/module/server/types/SiteFileType'),
    require('/module/server/types/SiteImageType')
  ];

  function getFileInfoFromSearchHit (hit) {
    for (let i = 0; i < TYPES.length; i++) {
      if (TYPES[i].match(hit)) {
        return TYPES[i].getFileInfo(hit);
      }
    }
    return Type.getFileInfo(hit);
  }

  return {
    getFileInfoFromSearchHit
  };
});
