'use strict';

var I18n = require('./lib/i18n-node');

module.exports = function i18n(options) {
  return function(req, res, next) {
    req.i18n = new I18n(options);
    req.i18n.setLocaleFromRequest(req);
    
    next();
  };
};

module.exports.I18n = I18n;