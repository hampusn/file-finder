(function () {
  'use strict';

  var router       = require('router');
  var appData      = require('appData');
  var fileSearcher = require('/module/server/fileSearcher');
  var showId       = appData.get('showId');

  router.get('/', function (req, res) {
    var context = {
      "files":  [],
      "query":  "",
      "showId": showId
    };

    res.render('/', context);
  });

  router.get('/search', function (req, res) {
    var query = req.params.query;
    var files = fileSearcher.getFiles(query);

    if (req.xhr) {
      res.json({
        "files":  files,
        "showId": showId
      });
    } else {
      res.render('/search', {
        "files":  files,
        "query":  query,
        "showId": showId
      });
    }
  });
}());
