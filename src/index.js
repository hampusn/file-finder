(function () {
  'use strict';

  const router = require('router');
  const appData = require('appData');
  const fileSearcher = require('/module/server/fileSearcher');
  const showId = !!appData.get('showId');

  router.get('/', (req, res) => {
    const { query = '' } = req.params;
    const files = query ? fileSearcher.getFiles(query) : [];

    if (req.xhr) {
      res.json({ files });
    } else {
      res.render('/', {
        files,
        query,
        showId
      });
    }
  });
}());
