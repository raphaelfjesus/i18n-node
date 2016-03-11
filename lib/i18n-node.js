'use strict';

/*
 * Libraries.
 */
var fs = require('fs');
var path = require('path');
var I18n = require('i18n-js-simple').I18n;

class I18nNode extends I18n {
  
  constructor(options) {
    super(options);
    this.configure(options);
  }
  
  configure(options) {
    //super.configure(options);
    options = options || {};
    
    this.urlTemplate = path.resolve(options.urlTemplate || this.urlTemplate || './locales/{locale}.json');
    this.localeFrom = options.localeFrom && typeof options.localeFrom === 'string' ? options.localeFrom.split(' ') : [ 'query', 'header' ];
    this.queryName = options.queryName || 'lang';
    this.cookieName = options.cookieName || 'i18nLocale';
    this.sessionName = options.sessionName || 'i18nLocale';
    this.load = function(url) {
      return require(url);
    };
    this.locales = options.locales || (this.locales && this.locales.length > 0 ? this.locales : undefined) || getLocales(this.urlTemplate);
  }

  setLocaleFromRequest(req) {
    var fromSubdomain = (req) => {
      return req && req.headers && req.headers.host && /^([^.]+)/.test(req.headers.host) ? RegExp.$1 : null;
    };
    
    var fromQuery = (req, queryName) => {
      return req && req.query ? req.query[queryName] : null;
    };
    
    var fromCookie = (req, cookieName) => {
      return req && req.cookies ? req.cookies[cookieName] : null;
    };
    
    var fromSession = (req, sessionName) => {
      return req && req.session ? req.session[sessionName] : null;
    };
    
    var fromHeader = (req) => {
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
    };
    
    var locale = null;
    for(let from of this.localeFrom) {
      switch(from) {
        case 'subdomain':
          locale = fromSubdomain(req);
          break;
        case 'query':
          locale = fromQuery(req, this.queryName);
          break;
        case 'cookie':
          locale = fromCookie(req, this.cookieName);
          break;
        case 'session':
          locale = fromSession(req, this.sessionName);
          break;
        case 'header':
          locale = fromHeader(req);
          break;
      }

      if(locale) {
        break;
      }
    }
    
    this.setLocale(locale || this.preferred);
    return this.locale;
  }

}

module.exports = I18nNode;

function getLocales(urlTemplate) {
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

  return read(urlTemplate.split(/\{locale\}/g)[0].split(/\{part\}/g)[0], /(^([a-z]{2}|[a-z]{2}[-|_][a-z]{2})(\.(json|js))?$)/i);
}