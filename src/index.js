(function () {
  'use strict';

  const router = require('router');
  const appData = require('appData');
  const fileSearcher = require('/module/server/fileSearcher');
  const showId = !!appData.get('showId');

  router.get('/', function (req, res) {
    const context = {
      files: [],
      query: '',
      showId
    };

    res.render('/', context);
  });

  router.get('/search', function (req, res) {
    const { query = '' } = req.params;
    const files = fileSearcher.getFiles(query);

    if (req.xhr) {
      res.json({ files });
    } else {
      res.render('/search', {
        files,
        query,
        showId
      });
    }
  });
}());
