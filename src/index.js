(function () {
  'use strict';

  const router = require('router');
  const appData = require('appData');
  const fileSearcher = require('/module/server/fileSearcher');
  const showId = !!appData.get('showId');

  router.get('/', (req, res) => {
    const { query = '', type = '' } = req.params;
    const files = query ? fileSearcher.getFiles(query, type) : [];

    if (req.xhr) {
      res.json({ files });
    } else {
      res.render('/', {
        files,
        query,
        type,
        showId
      });
    }
  });
}());
