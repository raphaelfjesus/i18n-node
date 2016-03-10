'use strict';

/*
 * Libraries.
 */
var fs = require('fs');
var path = require('path');
var I18n = require('./index').I18n;

module.exports = function i18n(options) {
  options = options || {};
  
  var urlTemplate = options.urlTemplate || './locales/{lang}.json';
  options.urlTemplate = '.' === urlTemplate.charAt(0) ? path.resolve(urlTemplate) : urlTemplate;
  
  var localeFrom = options.localeFrom || 'query header';
  options.localeFrom = typeof localeFrom === 'string' ? localeFrom.split(' ') : localeFrom;
  
  options.queryName = options.queryName || 'lang';
  options.locales = options.locales || getLocales(options);
  options.load = function(url) {
    return require(url);
  };
  
  return function(req, res, next) {
    req.i18n = new I18n(options);

    var locale = getLocale(req, options);
    req.i18n.setLocale(locale);
    
    next();
  };
};

function getLocales(options) {
  var read = (directory, regex) => {
    let locales = [];
    
    let files = fs.readdirSync(directory);
    for(let file of files) {
      let filePath = path.join(directory, file);
      let stat = fs.statSync(filePath);
    
      if(regex.test(file)) { 
        locales.push(file.substr(0, 5));
      
      } else if (stat && stat.isDirectory()) {
        locales.concat(read(filePath, regex));
      }
    }
    
    return locales;
  };

  return read(options.urlTemplate.split(/\{lang\}/g)[0].split(/\{part\}/g)[0], /(^([a-z]{2}|[a-z]{2}[-|_][a-z]{2})(\.(json|js))?$)/i);
}

function getLocale(req, options) {
  var localeFrom = options.localeFrom.split(' ');
  for(let from of localeFrom) {
    let locale = null;
    
    switch(from) {
      case 'subdomain':
        locale = getLocaleFromSubdomain(req);
        break;
      case 'query':
        locale = getLocaleFromQuery(req, options.queryName);
        break;
      case 'cookie':
        locale = getLocaleFromCookie(req, options.cookieName);
        break;
      case 'session':
        locale = getLocaleFromSession(req, options.sessionName);
        break;
      case 'header':
        locale = getLocaleFromHeader(req);
        break;
    }
    
    if(locale) {
      return locale;
    }
  }
}

function getLocaleFromSubdomain(req) {
  return req && req.headers && req.headers.host && /^([^.]+)/.test(req.headers.host) ? RegExp.$1 : null;
}

function getLocaleFromQuery(req, queryName) {
  return req && req.query ? req.query[queryName] : null;
}

function getLocaleFromCookie(req, cookieName) {
  return req && req.cookies ? req.cookies[cookieName] : null;
}

function getLocaleFromSession(req, sessionName) {
  return req && req.session ? req.session[sessionName] : null;
}

function getLocaleFromHeader(req) {
  if(!req || !req.headers || !req.headers['accept-language']) return null;
  var languages = req.headers['accept-language'].split(',');
  var preferences = {};
  
  return languages.map(function parseLanguagePreference(item) {
    let preferenceParts = item.trim().split(';q=');
    if (preferenceParts.length < 2) {
      preferenceParts[1] = 1.0;
    } else {
      let quality = parseFloat(preferenceParts[1]);
      preferenceParts[1] = quality ? quality : 0.0;
    }
    
    preferences[preferenceParts[0]] = preferenceParts[1];

    return preferenceParts[0];
    
  }).filter(function filterLangauges(lang) {
    return preferences[lang] > 0;
    
  }).sort(function sortLanguages(a, b) {
    return preferences[b] - preferences[a];
  });
}