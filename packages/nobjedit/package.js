Package.describe({
  name: 'sernyl:contedit',
  summary: 'NObject Editor',
  version: '0.4.2',
  git: 'https://github.com/mpowaga/meteor-autoform-summernote'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'templating',
    'underscore',
    'reactive-var',
    'aldeed:autoform',
    'summernote:standalone@0.6.10'
  ], 'client');

  api.addFiles([
    'lib/client/nobjedit.css',
    'lib/client/nobjedit.map.css',
    'lib/client/nobjedit.map.js',

    'lib/client/templates.html',
    'lib/client/templates.js',

    'lib/client/autoform-summernote.js'
  ], 'client');
});
