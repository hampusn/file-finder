define(function (require) {
  'use strict';

  var searcherBuilder     = require('SearcherBuilder');
  var parserBuilder       = require('ExtendedDismaxParserBuilder');
  var filterBuilder       = require('FilterBuilder');
  var resourceLocatorUtil = require('ResourceLocatorUtil');
  var propertyUtil        = require('PropertyUtil');
  var nodeInfoUtil        = require('/module/server/nodeInfoUtil');
  var appData             = require('appData');
  var numHits             = appData.get('numHits') != '' ? parseInt(appData.get('numHits')) : 100;

  parserBuilder
    .addQueryField('nodeid')
    .addQueryField('name.analyzed')
    .addQueryField('title.analyzed')
    .addQueryField('url');

  filterBuilder
    .addFilterQuery('+svtype:(image file)');

  var searcher = searcherBuilder
                  .setParser(parserBuilder.build())
                  .setFilter(filterBuilder.build())
                  .build();

  return {
    getFiles: function (query) {
      var files = [];
      var hits  = searcher.search('*' + query + '*', numHits).getHits();
      var hit;
      var nodeInfo;

      while (hits.hasNext()) {
        hit = hits.next();

        nodeInfo = nodeInfoUtil.getFileInfoFromSearchHit(hit);

        files.push({
          "title":   hit.getFieldEscaped('name'),
          "id":      hit.getField('nodeid'),
          "editUrl": nodeInfo.editUrl,
          "slug":    nodeInfo.slug,
          "i18nKey": nodeInfo.i18nKey
        });
      }

      return files;
    }
  };
});
