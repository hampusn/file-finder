define((require) => {

  const i18n = require('i18n');
  const Type = require('/module/server/types/Type');

  const GROUP_RESOURCE_INDEX_TYPE = 'groupresource';
  const FILE_INDEX_TYPE = 'file';

  class GroupFileType extends Type {
    static _match (searchHit) {
      const hitTypes = searchHit.getFields('svtype');
      return hitTypes.contains(GROUP_RESOURCE_INDEX_TYPE) && hitTypes.contains(FILE_INDEX_TYPE);
    }

    static _getFileInfo (searchHit) {
      return {
        editUrl: searchHit.getField('uri')
      };
    }
  };

  return GroupFileType;
});
