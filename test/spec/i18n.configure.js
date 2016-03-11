'use strict';

/**
 * Libraries.
 */
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var I18n = require('../../index').I18n;

describe('I18n#configure()', function() {
  var i18n = new I18n({
    urlTemplate: './test/locales/{locale}.json' 
  });
  
  it('should use the default options when not set', function(done) {
    i18n.configure();
    
    expect(i18n.urlTemplate).to.equal(path.resolve('./test/locales/{locale}.json'));
    expect(i18n.localeFrom).to.eql([ 'query', 'header' ]);
    expect(i18n.queryName).to.equal('lang');
    expect(i18n.cookieName).to.equal('i18nLocale');
    expect(i18n.sessionName).to.equal('i18nLocale');
    expect(i18n.load).to.be.instanceof(Function);
    expect(i18n.locales).to.eql([ 'en-US', 'es-ES', 'pt-BR' ]);
    
    done();
  });

});