Package.describe({
  name: 'sernyl:contedit',
  summary: 'Extended "contenteditable" input type for AutoForm',
  version: '1.0.3',
  git: 'https://github.com/comerc/meteor-autoform-contenteditable2.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@5.7.1');
  api.addFiles([
    'autoform-contenteditable2.css',
    'autoform-contenteditable2.html',
    'autoform-contenteditable2.js',
    'themes/bootstrap3.css',
  ], 'client');
});
