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

  return {
    getFiles (query) {
      const files = [];
      const hits  = searcher.search('*' + query + '*', numHits).getHits();

      while (hits.hasNext()) {
        const hit = hits.next();
        const nodeInfo = nodeInfoUtil.getFileInfoFromSearchHit(hit);

        files.push({
          title: hit.getFieldEscaped('name'),
          id: hit.getField('nodeid'),
          editUrl: nodeInfo.editUrl,
          slug: nodeInfo.slug,
          i18nKey: nodeInfo.i18nKey
        });
      }

      return files;
    }
  };
});
