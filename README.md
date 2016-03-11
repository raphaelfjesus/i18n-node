# i18n-node

[![Build Status](https://travis-ci.org/raphaelfjesus/i18n-node.svg?branch=master)](http://travis-ci.org/raphaelfjesus/i18n-node)
[![Code Climate](https://codeclimate.com/github/raphaelfjesus/i18n-node/badges/gpa.svg)](https://codeclimate.com/github/raphaelfjesus/i18n-node)
[![Test Coverage](https://codeclimate.com/github/raphaelfjesus/i18n-node/badges/coverage.svg)](https://codeclimate.com/github/raphaelfjesus/i18n-node/coverage)

Library for internationalization of applications developed in Node.JS. (Less than 100 lines of code)

> This library only adds specific features for environments Node.js, for all translation engine, interpolation and pluralization are provided by [I18n JS](https://github.com/raphaelfjesus/i18n-js#readme) library.

## Features

 - Translation
 - Interpolation
 - Pluralization
 - Aliases

## Requirements

 - [NodeJS](https://nodejs.org/en/) >= 4.1

## Installation

```bash
$ npm install i18n-node
```

## Usage

Minimum configuration for use with [Express](http://expressjs.com/):

```javascript
// ./server.js
var express = require('express');
var i18n = require('i18n-node');

var app = express();
app.use(i18n({
  // urlTemplate: './locales/{locale}.json', // Default value
  // locales: true, // Default value (Detects all the locales from urlTemplate)
  // preferred: 'en-US' // Default value
}));

app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('translationId'));
});

app.listen(3000);
```

Before demonstrating the methods of detection locale, create the following translation files:

**./locales/en-us.json**
```json
{
  "usage": "See how easy it is to detect the locale from the user request ({})."
}
```

**./locales/pt-br.json**
```json
{
  "usage": "Veja como é fácil detectar o locale a partir da requisição do usuário ({})."
}
```

**./locales/es-es.json**
```json
{
  "usage": "Vea lo fácil que es para detectar el lenguaje de la solicitud del usuario ({})."
}
```

Now look below the locale detection methods from the user request:

**From subdomain**

```javascript
var express = require('express');
var i18n = require('i18n-node');

var app = express();
app.use(i18n({
  // preferred: 'en-US', // Default value
  localeFrom: 'subdomain' 
}));

// http://en-us.domain.com/your-route
app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('usage', 'Subdomain'));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v http://en-us.domain.com/your-route
```

**From query**

```javascript
var express = require('express');
var i18n = require('i18n-node');

var app = express();
app.use(i18n({
  // preferred: 'en-US', // Default value
  // queryName: 'yourQueryName', // Default value: lang
  localeFrom: 'query' 
}));

// http://localhost:3000/your-route?lang=en-US
app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('usage', 'Query'));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v http://localhost:3000/your-route?lang=pt-BR
```

**From cookie**

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var i18n = require('i18n-node');

var app = express();
app.use(cookieParser());
app.use(i18n({
  // preferred: 'en-US', // Default value
  cookieName: 'yourCookieName', 
  localeFrom: 'cookie'
}));

// http://localhost:3000/your-route
app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('usage', 'Cookie'));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v --cookie "yourCookieName=pt-BR" http://localhost:3000/your-route
```

**From session**

```javascript
var express = require('express');
var session = require('express-session');
var i18n = require('i18n-node');

var app = express();
app.use(session({
    secret: "yourSecret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(i18n({
  // preferred: 'en-US', // Default value
  sessionName: 'yourSessionName', 
  localeFrom: 'session' 
}));

// Simulates the loading of the logged in user profile (language preference)
app.all('*', function(req, res, next) {
    req.session['yourSessionName'] = 'pt-BR';
    next();
});

// http://localhost:3000/your-route
app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('usage', 'Session'));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v http://localhost:3000/your-route
```

**From header**

```javascript
var express = require('express');
var i18n = require('i18n-node');

var app = express();
app.use(i18n({
  // preferred: 'en-US', // Default value
  localeFrom: 'header' 
}));

// http://localhost:3000/your-route
app.get('/your-route', function (req, res) {
  res.send(req.i18n.get('usage', 'Header[accept-language]'));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v --header "Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4" http://localhost:3000/your-route
```

Ready! Now see how easy it is to enable the user locale detection methods and prioritizes them according to your need.

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var i18n = require('i18n-node');

var app = express();
app.use(cookieParser());
app.use(i18n({
  // preferred: 'en-US', // Default value
  cookieName: 'yourCookieName', 
  localeFrom: 'query cookie header' 
}));

app.get('/your-route', function (req, res) {
  var from = req.query.lang ? 'Query' : (req.cookies && req.cookies['yourCookieName'] ? 'Cookie' : (req.headers && req.headers['accept-language'] ? 'Header' : 'Unknown'));
  res.send(req.i18n.get('usage', from));
});

app.listen(3000);
```

response with [curl](https://curl.haxx.se/):

```bash
curl -v --cookie "yourCookieName=es-ES" --header "Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4" http://localhost:3000/your-route?lang=en-US
```

## Configuration

Below is a complete listing of all default configuration options.

```javascript
var i18n = require('i18n-node')(
  // A string containing a standard url (with {locale} and/or {part}) or function (locale, part) that returns a string.
  urlTemplate: './locales/{locale}.json',
  
  // When true detects all the locales from urlTemplate, otherwise, an array of supported locales must be informed
  locales: true,
  
  // Sets the locale preferred by application (immutable), in the absence of a locale the value of this option is used.
  preferred: 'en-US',
  
  // Locales to be used if a translation is not found.
  fallbacks: {},
  
  // Delimiter used for translations namespaced.
  objectDelimiter: '.',
  
  // Stores translations already loaded.
  translations: {},
  
  // Parameter name to retrieve the locale (e.g. http://localhost:3000/?lang=en-US).
  queryName: 'lang',
  
  // Cookie name to retrieve the locale when used automatic detection (localeFrom).
  cookieName: undefined,
  
  // Session name to retrieve the locale when used automatic detection (localeFrom).
  sessionName: undefined,
  
  // It indicates how locale is obtained from the user request, giving priority to the reported order.
  localeFrom: 'query header',
  
  // Current locale, typically set automatically from the user's preferences logged in the application or from HTTP requests. (internal use)
  locale: undefined,
  
  // Stores the parts of loaded translations when the option urlTemplate is set to use the pattern {part}. (internal use)
  parts: new Map(), 
  
  // NNicknames to leave a better semantics in the code when translations keys are based on namespaces, e.g. i18n.error('required') or i18n.get('error.required').
  aliases: { error: 'error', warn: 'warn', success: 'success', info: 'info' },
  
  // Translation missing handler.
  missingHandler: function(translationId, languageKeys) {
    throw new Error('Translation not found.');
  },
  
  // Loader of the translation files, returning an object with the syntax: { locale: { translationId: 'translation'} }
  load: function(url) {
    return require(url);
  },
  
  // Pluralization rules to be used with the default pluralizer
  pluralizationRules: {
    en: function (count) {
      return count === 0 ? 'zero' : (count === 1 ? 'one' : 'other');
    }
  },
  
  // An function(language, translatedText, interpolationParameters) for custom pluralizer, that returns an string.
  pluralizer: undefined,
  
  // An function(translatedText, interpolationParameters) for custom interpolation, that returns an string.
  interpolator: undefined 
);
```

## API Reference

For a better understanding of the syntax and options supported by this library, read this section and see all the possibilities offered in their use:

- [`i18n.get(translationId, [options])`](#i18ngettranslationid-options)
- [`i18n.setLocale(locale)`](#i18nsetlocalelocale)
- [`i18n.alias(name)`](#i18naliasname)

#### `i18n.get(translationId, [options])`

Gets the corresponding translation to translation id.

##### Parameters

| Param                    | Type     | Details
| ------------------------ | -------- | ---------------------------------------------------------------------------------------
| **translationId**        | `String` | A JavaScript string as the translation key.
| **options** *(optional)* | `Object` | If you need to send parameters to translated text interpolation or define how the translation should be done using the properties `$lang`, `$count` or `$gender`.

##### Returns

- **string** - The translated text.

##### Usage

```javascript
var vsprintf = require('sprintf-js').vsprintf;
var i18n = require('i18n-node')({
  // preferred: 'en-US', // Default value
  fallbacks: {
    'ca': 'es-ES',
    'en': [ 'en-US', 'pt-BR' ]
  },
  // Not override the default interpolation
  interpolator: function(translatedText, interpolationParameters) {
    return (/%/).test(translatedText) ? vsprintf(translatedText, interpolationParameters) : translatedText;
  },
  // Only to facilitate the use of the method, add inline translations
  translations: {
    "en-us": {
      "heading": "Demonstration of the use of I18n Node.JS library",
      "text": {
        "selectedRow": {
          "zero": "No selected row",
          "one": "1 selected row",
          "other": "{{count}} selected rows"
        },
        "welcome": "Welcome, {}!",
        "alphabet": "The first 4 letters of the english alphabet are: %s, %s, %s and %s",
        "names": "%2$s, %3$s and %1$s",
        "presentation": "My name is {} and I have {} children.",
        "myName": "My name is {{firstname}}.",
        "myFullname": "My full name is {{firstname}} {{lastname}}.",
        "myDaughter": "My daughter's name is {{name}} and has only {{age}} years old.",
        "myMarried": "My name is {} and I am married to {} lady."
      },
      "entry": {
        "firstname": "Firstname",
        "lastname": "Lastname" 
      },
      "error": {
        "required": "This field is required",
        "length": "Length must be between {} and {}",
        "range": "Must be between {{min}} and {{max}}",
        "maxLength": "Length must be no more than {}",
        "maxPercentage": "Percentage must be no more than {{max}}"
      },
      "warn": {
        "timeout": "Timeout"
      },
      "success": {
        "save": "Successfully saved"
      },
      "info": {
        "changelog": "Changelog"
      }
    },
    "pt-br": {
      "heading": "Demonstração do uso da biblioteca I18n Node.JS",
      "text": {
        "selectedRow": {
          "zero": "Nenhuma linha selecionada",
          "one": "1 linha selecionada",
          "other": "{{count}} linhas selecionadas"
        },
        "welcome": "Seja bem-vindo, {}!",
        "alphabet": "As primeiras 4 letras do alfabeto Inglês são: %s, %s, %s e %s",
        "names": "%2$s, %3$s e %1$s",
        "presentation": "Meu nome é {} e tenho {} filhos.",
        "myName": "Meu nome é {{firstname}}.",
        "myFullname": "Meu nome completo é {{firstname}} {{lastname}}.",
        "myDaughter": "O nome da minha filha é {{name}} e tem apenas {{age}} anos de idade.",
        "myMarried": "Meu nome é {} e sou casado com a senhora {}."
      },
      "entry": {
        "firstname": "Nome",
        "lastname": "Sobrenome" 
      },
      "error": {
        "required": "Este campo é obrigatório",
        "length": "O tamanho para este campo deve estar entre {} e {}",
        "range": "O valor para este campo deve estar entre {{min}} e {{max}}",
        "maxLength": "O tamanho máximo para este campo é {}",
        "maxPercentage": "A porcentagem máxima para este campo é {{max}}"
      },
      "warn": {
        "timeout": "Tempo expirado"
      },
      "success": {
        "save": "Salvo com sucesso"
      },
      "info": {
        "changelog": "Log de alterações"
      }
    },
    "es-es": {
      "heading": "La demostración de la utilización de la biblioteca I18n Node.JS",
      "text": {
        "selectedRow": {
          "zero": "No hay filas seleccionadas",
          "one": "1 fila seleccionada",
          "other": "{{count}} líneas seleccionadas"
        },
        "welcome": "Bienvenido, {{}}!",
        "alphabet": "Las 4 primeras letras del alfabeto inglés son: %s, %s, %s y %s",
        "names": "%2$s, %3$s y %1$s",
        "presentation": "Mi nombre es {} y tengo {} hijos.",
        "myName": "Mi nombre es {{firstname}}.",
        "myFullname": "Mi nombre completo es {{firstname}} {{lastname}}.",
        "myDaughter": "El nombre de mi hija es {{name}} y tiene sólo {{age}} años.",
        "myMarried": "Mi nombre es {} y estoy casada con {} dama."
      },
      "entry": {
        "firstname": "Nombre",
        "lastname": "Apellido" 
      },
      "error": {
        "required": "Este campo es obligatorio",
        "length": "El tamaño de este campo debe estar entre {} y {}",
        "range": "El valor de este campo debe estar entre {{min}} y {{max}}",
        "maxLength": "El tamaño máximo para este campo es {}",
        "maxPercentage": "El porcentaje máximo para este campo es {{max}}"
      },
      "warn": {
        "timeout": "Tiempo transcurrido"
      },
      "success": {
        "save": "Se ha guardado correctamente"
      },
      "info": {
        "changelog": "Cambio de registro"
      }
    }
  }
});
  
// Translation
i18n.get('heading'); // Demonstration of the use of I18n Node.JS library
i18n.get('heading', { $lang: 'pt-BR' }); // Demonstração do uso da biblioteca I18n Node.JS

i18n.get({ $id: 'entry.firstname' }); // Firstname
i18n.get({ $id: 'entry.firstname' }, { $lang: 'pt-BR' }); // Nome

i18n.get([ 'entry.firstname', 'entry.lastname' ]); // { 'entry.firstname': Firstname, 'entry.lastname': Lastname }
i18n.get([ 'entry.firstname', 'entry.lastname' ], { $lang: 'pt-BR' }); // { 'entry.firstname': Nome, 'entry.lastname': Sobrenome }

// Translation fallback
i18n.get('entry.firstname', { $lang: 'ca' }); // Nombre
i18n.get('entry.firstname', { $lang: 'en' }); // Firstname

// Translation with default interpolation
i18n.get('error.maxLength', 255); // Length must be no more than 255
i18n.get('error.maxLength', 255, { $lang: 'pt-BR' }); // O tamanho máximo para este campo é 255
i18n.get('error.length', 1, 255); // Length must be between 1 and 255
i18n.get('error.length', 1, 255, { $lang: 'pt-BR' }); // O tamanho para este campo deve estar entre 1 e 255

i18n.get('error.maxPercentage', { max: 50 }); // Percentage must be no more than 50
i18n.get('error.maxPercentage', { max: 50 }, { $lang: 'pt-BR' }); // A porcentagem máxima para este campo é 50
i18n.get('error.range', { min: 1, max: 999 }); // Must be between 1 and 999
i18n.get('error.range', { min: 1, max: 999 }, { $lang: 'pt-BR' }); // O valor para este campo deve estar entre 1 e 999

i18n.get('text.welcome', 'Raphael'); // Welcome, Raphael!
i18n.get('text.welcome', 'Raphael', { $lang: 'pt-BR' }); // Seja bem-vindo, Raphael!
i18n.get('text.myMarried', 'Raphael', 'Elizabeth'); // My name is Raphael and I am married to Elizabeth lady.
i18n.get('text.myMarried', 'Raphael', 'Elizabeth', { $lang: 'pt-BR' }); // Meu nome é Raphael e sou casado com a senhora Elizabeth.          

i18n.get('text.myName', { firstname: 'Raphael' }); // My name is Raphael.
i18n.get('text.myName', { firstname: 'Raphael' }, { $lang: 'pt-BR' }); // Meu nome é Raphael.
i18n.get('text.myFullname', { firstname: 'Raphael', lastname: 'Freitas' }); // My full name is Raphael Freitas.
i18n.get('text.myFullname', { firstname: 'Raphael', lastname: 'Freitas' }, { $lang: 'pt-BR' }); // Meu nome completo é Raphael Freitas.

i18n.get('text.presentation', 'Raphael', 2); // My name is Raphael and I have 2 children.
i18n.get('text.presentation', 'Raphael', 2, { $lang: 'pt-BR' }); // Meu nome é Raphael e tenho 2 filhos.
i18n.get("text.myDaughter", { name: 'Isabelle', age: 3 }); // My daughter's name is Isabelle and has only 3 years old.
i18n.get("text.myDaughter", { name: 'Isabelle', age: 3 }, { $lang: 'pt-BR' }); // O nome da minha filha é Isabelle e tem apenas 3 anos de idade.    

// Translation with custom interpolation
i18n.get('text.alphabet', 'a', 'b', 'c', 'd'); // The first 4 letters of the english alphabet are: a, b, c and d
i18n.get('text.alphabet', 'a', 'b', 'c', 'd', { $lang: 'pt-BR' }); // As primeiras 4 letras do alfabeto Inglês são: a, b, c e d

i18n.get('text.names', 'Angelina Jolie', 'Megan Fox', 'Beyoncé'); // Megan Fox, Beyoncé and Angelina Jolie
i18n.get('text.names', 'Angelina Jolie', 'Megan Fox', 'Beyoncé', { $lang: 'pt-BR' }); // Megan Fox, Beyoncé e Angelina Jolie          

// Translation with default pluralization (property $count is required)
i18n.get('text.selectedRow', { $count: 0 }); // No selected row
i18n.get('text.selectedRow', { $count: 1 }); // 1 selected row
i18n.get('text.selectedRow', { $count: 10 }); // 10 selected rows

i18n.get('text.selectedRow', { $count: 0, $lang: 'pt-BR' }); // Nenhuma linha selecionada
i18n.get('text.selectedRow', { $count: 1, $lang: 'pt-BR' }); // 1 linha selecionada
i18n.get('text.selectedRow', { $count: 10, $lang: 'pt-BR' }); // 10 linhas selecionadas

// Translation with default aliases => e.g. i18n.error('required') equivalent to i18n.get('error.required')
i18n.error('required'); // This field is required
i18n.error('required', { $lang: 'pt-BR' }); // Este campo é obrigatório

i18n.warn('timeout'); // Timeout
i18n.warn('timeout', { $lang: 'pt-BR' }); // Tempo expirado

i18n.success('save'); // Successfully saved
i18n.success('save', { $lang: 'pt-BR' }); // Salvo com sucesso

i18n.info('changelog'); // Changelog
i18n.info('changelog', { $lang: 'pt-BR' }); // Log de alterações
```

<hr>

#### `i18n.setLocale(locale)`

Sets the locale to be used in translation.

##### Parameters

| Param             | Type              | Details
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------
| **locale**        | `String`          | The locale to be used.

##### Usage

```javascript
i18n.setLocale('es-ES');
```

<hr>

#### `i18n.alias(name)`

Sets an alias for a translation namespace.

##### Parameters

| Param             | Type              | Details
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------
| **name**          | `String | Object` | The alias name to be used.

##### Usage

```javascript
i18n.alias('text');
i18n.text('welcome', 'Raphael'); // Equivalent to i18n.get('text.welcome')

i18n.alias({ label: 'entry' });
i18n.label('firstname'); // Equivalent to i18n.get('entry.firstname')
```

> Default aliases can not be overwritten.
```javascript
i18n.error('required'); // Equivalent to i18n.get('error.required')
i18n.warn('timeout'); // Equivalent to i18n.get('warn.timeout')
i18n.success('save'); // Equivalent to i18n.get('success.save')
i18n.info('changelog'); // Equivalent to i18n.get('info.changelog')
```

## Contributing

1. Fork it ( https://github.com/raphaelfjesus/i18n-node/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Tests

To run the test suite, first install the dependencies, then run npm test:

```bash
$ npm install
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Raphael F. Jesus <raphaelfjesus@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
