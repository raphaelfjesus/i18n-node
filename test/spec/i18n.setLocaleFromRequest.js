'use strict';

/**
 * Libraries.
 */
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var I18n = require('../../index').I18n;

describe('I18n#setLocaleFromRequest()', function() {
  var i18n = new I18n({
    preferred: 'en-US',
    locales: [ 'pt-BR', 'en-US', 'es-ES' ] 
  });
  
  describe('should set the locale from the user request using the', function() {
    it('subdomain', function(done) {
      i18n.configure({ localeFrom: 'subdomain' });
      
      let req = { headers: { host: 'en-us.domain.com' } };
      let locale = i18n.setLocaleFromRequest(req);
      
      expect(locale).to.equal('en-US');
      
      done();
    });
    
    it('query', function(done) {
      i18n.configure({ localeFrom: 'query' });
      
      let req = { query: { lang: 'pt-BR' } };
      let locale = i18n.setLocaleFromRequest(req);
      
      expect(locale).to.equal('pt-BR');
      
      done();
    });
    
    it('cookie', function(done) {
      i18n.configure({ localeFrom: 'cookie' });
      
      let req = { cookies: { [i18n.cookieName]: 'es-ES' } };
      let locale = i18n.setLocaleFromRequest(req);
      
      expect(locale).to.equal('es-ES');
      
      done();
    });
    
    it('session', function(done) {
      i18n.configure({ localeFrom: 'session' });
      
      let req = { session: { [i18n.sessionName]: 'pt-BR' } };
      let locale = i18n.setLocaleFromRequest(req);
      
      expect(locale).to.equal('pt-BR');
      
      done();
    });
    
    it('header', function(done) {
      i18n.configure({ localeFrom: 'header' });
      
      let req = { headers: { 'accept-language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0' } };
      let locale = i18n.setLocaleFromRequest(req);
      
      expect(locale).to.equal('pt-BR');
      
      done();
    });
  });
  
  it('should use the preferred locale when not found in the user request', function(done) {
    i18n.configure({ localeFrom: 'subdomain query cookie session header' });
    
    let req = {};
    let locale = i18n.setLocaleFromRequest(req);
    
    expect(locale).to.equal('en-US');
    
    done();
  });
  
  it('should set the locale using the first detection option (left to right) when multiple options', function(done) {
    let req = { 
      headers: { host: 'en-us.domain.com', 'accept-language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4' }, 
      query: { lang: 'pt-BR' }, 
      cookies: { [i18n.cookieName]: 'es-ES' }, 
      session: { [i18n.sessionName]: 'pt-BR' } 
    };
    let locale = i18n.setLocaleFromRequest(req);
    
    let fn = function() { i18n.configure({ localeFrom: 'session subdomain query cookie header' }); return i18n.setLocaleFromRequest(req); };
    expect(fn()).to.equal('pt-BR');
    
    let fn2 = function() { i18n.configure({ localeFrom: 'cookie session subdomain query header' }); return i18n.setLocaleFromRequest(req); };
    expect(fn2()).to.equal('es-ES');
    
    done();
  });

});