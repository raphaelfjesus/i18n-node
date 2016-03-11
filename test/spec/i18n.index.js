'use strict';

/**
 * Libraries.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var i18n = require('../../index');

const URL_TEMPLATE = './test/locales/{locale}.json';

describe('I18n()', function() {
  
  describe('should return the translated text using the language set in the user request when is', function() {
    it('subdomain', function(done) {
      let app = express();
      app.use(i18n({
        // preferred: 'en-US', // Default value
        urlTemplate: URL_TEMPLATE,
        localeFrom: 'subdomain' 
      }));
      
      app.get('/your-route', function (req, res) {
        res.send(req.i18n.get('usage', 'Subdomain'));
      });
    
      request(app)
      .get('/your-route')
      .set('Accept', 'application/json')
      .set('Host', 'en-us.domain.com')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.text).to.equal('See how easy it is to detect the locale from the user request (Subdomain).');
        
        done();
      });
    });
    
    it('query', function(done) {
      let app = express();
      app.use(i18n({
        // preferred: 'en-US', // Default value
        urlTemplate: URL_TEMPLATE,
        localeFrom: 'query' 
      }));
      
      app.get('/your-route', function (req, res) {
        res.send(req.i18n.get('usage', 'Query'));
      });
    
      request(app)
      .get('/your-route?lang=pt-BR')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.text).to.equal('Veja como é fácil detectar o locale a partir da requisição do usuário (Query).');
        
        done();
      });
    });
    
    it('cookie', function(done) {
      let app = express();
      app.use(cookieParser());
      app.use(i18n({
        // preferred: 'en-US', // Default value
        urlTemplate: URL_TEMPLATE,
        localeFrom: 'cookie' 
      }));
      
      app.get('/your-route', function (req, res) {
        res.send(req.i18n.get('usage', 'Cookie'));
      });

      request(app)
      .get('/your-route')
      .set('Accept', 'application/json')
      .set('Cookie', 'i18nLocale=es-ES')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.text).to.equal('Vea lo fácil que es para detectar el lenguaje de la solicitud del usuario (Cookie).');
        
        done();
      });
    });
    
    it('session', function(done) {
      // TODO
      
      done();
    });
    
    it('header', function(done) {
      let app = express();
      app.use(i18n({
        // preferred: 'en-US', // Default value
        urlTemplate: URL_TEMPLATE,
        localeFrom: 'header' 
      }));
      
      app.get('/your-route', function (req, res) {
        res.send(req.i18n.get('usage', 'Header[accept-language]'));
      });

      request(app)
      .get('/your-route')
      .set('Accept', 'application/json')
      .set('Accept-Language', 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.text).to.equal('Veja como é fácil detectar o locale a partir da requisição do usuário (Header[accept-language]).');
        
        done();
      });
    });
  });

});