define((require) => {
  'use strict';

  const searcherBuilder = require('SearcherBuilder');
  const parserBuilder = require('ExtendedDismaxParserBuilder');
  const filterBuilder = require('FilterBuilder');
  const nodeInfoUtil = require('/module/server/nodeInfoUtil');
  const appData = require('appData');
  const numHits = appData.get('numHits') != '' ? parseInt(appData.get('numHits')) : 100;

  parserBuilder
    .addQueryField('nodeid')
    .addQueryField('name.analyzed')
    .addQueryField('title.analyzed')
    .addQueryField('url');

  filterBuilder
    .addFilterQuery('+svtype:(image file)');

  const searcher = searcherBuilder
    .setParser(parserBuilder.build())
    .setFilter(filterBuilder.build())
    .build();

  const ensureString = (mixed) => new String(mixed || '');

  return {
    getFiles (query) {
      const files = [];

      query = ensureString(query);
      query = query.includes('*') ? query : `*${query}*`;

      const hits = searcher.search(query, numHits).getHits();

      while (hits.hasNext()) {
        const hit = hits.next();
        
        files.push(nodeInfoUtil.getFileInfoFromSearchHit(hit));
      }

      return files;
    }
  };
});
