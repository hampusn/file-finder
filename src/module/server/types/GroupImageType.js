define((require) => {

  const Type = require('/module/server/types/Type');

  const GROUP_RESOURCE_INDEX_TYPE = 'groupresource';
  const IMAGE_INDEX_TYPE = 'image';

  class GroupImageType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');
      return hitTypes.contains(GROUP_RESOURCE_INDEX_TYPE) && hitTypes.contains(IMAGE_INDEX_TYPE);
    }

    static _getFileInfo (searchHit) {
      return {
        editUrl: searchHit.getField('uri')
      };
    }
  };

  return GroupImageType;
});
