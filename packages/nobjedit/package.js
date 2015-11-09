Package.describe({
  name: 'automenta:nobjedit',
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
    'lib/client/nobjedit.js',
    'lib/client/nobjedit.map.css',
    'lib/client/nobjedit.map.js',

    'lib/client/templates.html',
    'lib/client/templates.js',

    'lib/client/autoform-summernote.js'
  ], 'client');



  api.addFiles([
    'lib/leaflet/leaflet.css',
    'lib/leaflet/leaflet.js'
  ], 'client');

  api.addAssets([
    'lib/leaflet/images/layers-2x.png',
    'lib/leaflet/images/layers.png',
    'lib/leaflet/images/marker-icon-2x.png',
    'lib/leaflet/images/marker-icon.png',
    'lib/leaflet/images/marker-shadow.png'
  ],'client');
});
