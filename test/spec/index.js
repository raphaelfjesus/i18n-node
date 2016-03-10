'use strict';

/**
 * Libraries.
 */
var chai = require('chai');
var expect = chai.expect;
var i18n = require('../index');

/**
 * Unit tests.
 */
describe('I18n for Node.JS', function () {
  
  describe('I18n', function() {
    
    describe('#translate()', function() {
      
      describe('when not present', function() {
        it('should throw exception', function(done) {
          expect(true).to.true; // Step baby
            
          done();
        });
      });
      
      describe('when present', function() {
        
        it('when present', function(done) {
          expect(true).to.true; // Step baby
            
          done();
        });
      
      });
    
      
      
      it('when present', function(done) {
        expect(true).to.true; // Step baby
          
        done();
      });
    });
    
    describe('#get()', function() {
      
    });
    
    describe('#text()', function() {
      
    });
    
    describe('#success()', function() {
      
    });
    
    describe('#warn()', function() {
      
    });
    
    describe('#error()', function() {
      
    });
    
  });
  
  
  
  // ANGULAR-TRANSLATE
  
  /*
  Example of use:
    I18n.translate('TRANSLATION_ID', { firstname: 'Raphael', lastname: 'Freitas' });
    // or
    I18n.translate('TRANSLATION_ID', 'Raphael', 'Freitas');
  */
  describe('#translate()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.preferredLanguage('pt-BR');
    // or
    I18n.preferredLanguage('pt_BR');
    // or
    I18n.preferredLanguage('pt', 'BR');
  */
  describe('#preferredLanguage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.determinePreferredLanguage();
    // or
    I18n.determinePreferredLanguage(function () {
      // custom logic
      return preferredLanguage; // en-US
    });
  */
  describe('#determinePreferredLanguage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.changeLanguage('es');
  */
  describe('#changeLanguage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.fallbackLanguage('es');
    // or
    I18n.fallbackLanguage(['fr', 'pt-PT']);
    // or
    I18n.fallbackLanguage('pt-BR', 'de');
  */
  describe('#fallbackLanguage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.registerAvailableLanguage('es');
    // or
    I18n.registerAvailableLanguage(['fr', 'pt-PT']);
    // or
    I18n.registerAvailableLanguage('pt-BR', 'de');
  */
  describe('#registerAvailableLanguage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useCookieStorage();
  */
  describe('#useCookieStorage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useLocalStorage();
  */
  describe('#useLocalStorage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useStorage(function() {
      // logic
      return customStorage;
    });
  */
  describe('#useStorage()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useUrlLoader('foo/bar.json');
  */
  describe('#useUrlLoader()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useStaticFilesLoader({
      prefix: 'locale-',
      suffix: '.json' 
    });
    // or
    I18n.useStaticFilesLoader({
      files: [{
        prefix: 'locale-',
        suffix: '.json'
      }, {
        prefix: '/absolute/path/to/locale-',
        suffix: '.json' 
      }, { 
        prefix: 'another/path/to/locales/', 
        suffix: '' 
      }]
    });
  */
  describe('#useStaticFilesLoader()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useLoader({
      urlTemplate: '/i18n/{part}/{lang}.json',
      loadFailureHandler: 'MyErrorHandler' 
    });
  */
  describe('#useLoader()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('PartialLoader#addPart()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  // translatePartialLoaderStructureChanged
  describe('#refresh()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Example of use:
    I18n.useLoaderCache(true);
    // or
    I18n.useLoaderCache(yourSpecialCacheService);
  */
  describe('#useLoaderCache()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('#forceAsyncReload()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('#useInterpolation()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('#addInterpolation()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('#useMissingTranslationHandlerLog()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  describe('#useSanitizeValueStrategy()', function() {
    it('should execute without error', function(done) {
      expect(true).to.true; // Step baby
        
      done();
    });
  });
  
  /*
  Events:
  translateChangeStart
  translateChangeSuccess
  translateChangeError
  translateChangeEnd
  translateLoadingStart
  translateLoadingSuccess
  translateLoadingError
  translateLoadingEnd
  translatePartialLoaderStructureChanged
  */
    
});
