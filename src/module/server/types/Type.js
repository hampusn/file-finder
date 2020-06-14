define((require) => {

  const i18n = require('i18n');

  const DEFAULT_FILE_INFO = {
    title: '',
    id: '',
    editUrl: '',
    slug: '',
    type: ''
  };

  class Type {
    constructor () {}

    static _match (searchHit) {
      return false;
    }

    static match (searchHit) {
      return typeof this._match === 'function' ? this._match(searchHit) : false;
    }

    static _getFileInfo (searchHit) {
      return {};
    }

    static getFileInfo (searchHit) {
      const typeInfo = typeof this._getFileInfo === 'function' ? this._getFileInfo(searchHit) : {};

      return {
        ...DEFAULT_FILE_INFO,
        title: searchHit.getFieldEscaped('name'),
        id: searchHit.getField('nodeid'),
        type: i18n.get(`label${this.name}`),
        slug: (this.name || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
        ...typeInfo
      };
    }
  };

  return Type;
});
