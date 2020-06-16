define((require) => {
  'use strict';

  const searcherBuilder = require('SearcherBuilder');
  const parserBuilder = require('ExtendedDismaxParserBuilder');
  const filterBuilder = require('FilterBuilder');
  const nodeInfoUtil = require('/module/server/nodeInfoUtil');
  const appData = require('appData');
  const numHits = appData.get('numHits') != '' ? parseInt(appData.get('numHits')) : 100;

  const ALLOWED_TYPES = [ 'fileresource', 'file', 'image' ];
  const DEFAULT_TYPE = 'fileresource';

  parserBuilder
    .clearQueryFields()
    .addQueryField('nodeid')
    .addQueryField('name.analyzed')
    .addQueryField('title.analyzed')
    .addQueryField('url');

  searcherBuilder.setParser(parserBuilder.build());

  const ensureString = (mixed) => new String(mixed || '');
  const ensureAllowedType = (type) => ALLOWED_TYPES.includes(type) ? type : DEFAULT_TYPE;

  return {
    getFiles (query, type) {
      const files = [];

      query = ensureString(query);
      query = query.includes('*') ? query : `*${query}*`;

      type = ensureAllowedType(type);
      filterBuilder
        .clearFilterQueries()
        .addFilterQuery(`+svtype:${type}`);

      const searcher = searcherBuilder
        .setFilter(filterBuilder.build())
        .build();

      const hits = searcher.search(query, numHits).getHits();

      while (hits.hasNext()) {
        const hit = hits.next();
        
        files.push(nodeInfoUtil.getFileInfoFromSearchHit(hit));
      }

      return files;
    }
  };
});
