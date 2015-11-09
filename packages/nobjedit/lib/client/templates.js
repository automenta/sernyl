//https://fortawesome.github.io/Font-Awesome/icons/

//http://leafletjs.com/plugins.html


Template.afSummernote.created = function () {
  this.value = new ReactiveVar(this.data.value);

};

Template.afSummernote.pluginsAdded = false;

Template.afSummernote.ensurePluginsLoaded = function () {

  if (Template.afSummernote.pluginsAdded) {
    return;
  }

  Template.afSummernote.pluginsAdded = true;


  var tmpl = $.summernote.renderer.getTemplate();

  $.summernote.addPlugin({
    // plugin's name
    name: 'hello',

    init: function (layoutInfo) { // run init method when summernote was initialized
      // layoutInfo.holder() is current summernote's jquery instance.
      //var $note = layoutInfo.holder();

      //// you can use jquery custom event.
      //$note.on('summernote.update', function (customEvent, nativeEvent) {
      //  var $boldButton = $(this).summernote('toolbar.get', 'bold');
      //  $boldButton.toggleClass('active').css({
      //    color: 'red'
      //  });
      //});
      //
      //$note.on('summernote.blur', function (customEvent, nativeEvent) {
      //  var $boldButton = $(this).summernote('toolbar.get', 'bold');
      //  $boldButton.removeClass('active').css({
      //    color: 'inherit'
      //  });
      //});
      //$note.summernote('insertText', 'plugin start.');
    },

    buttons: { // define button that be added in the toolbar
      // "hello" button (key is a button's name)
      hello: function () {

        // create button template
        return tmpl.iconButton('fa fa-header', {
          // set event's name to used as callback when this button is clicked
          // add data-event='hello' in button element
          event: 'hello',
          title: 'hello',
          hide: true
        });
      }
    },

    events: { // events
      // run callback when hello button is clicked
      hello: function (event, editor, layoutInfo, value) {
        // Get current editable node
        var $editable = layoutInfo.editable();

        // Call insertText with 'hello'
        editor.insertText($editable, 'hello ');

        // or
        layoutInfo.holder().summernote("insertText", "Hello");
      }
    }
  });

  $.summernote.addPlugin({
    // plugin's name
    name: 'map',

    init: function (layoutInfo) { // run init method when summernote was initialized
    },

    buttons: { // define button that be added in the toolbar
      // "hello" button (key is a button's name)
      map: function () {

        // create button template
        return tmpl.iconButton('fa fa-map-marker', {
          // set event's name to used as callback when this button is clicked
          // add data-event='hello' in button element
          event: 'map',
          title: 'map',
          hide: true
        });
      }
    },

    events: { // events
      // run callback when hello button is clicked
      map: function (event, editor, layoutInfo, value) {

        var $editable = layoutInfo.editable();

        editor.insertNode($editable,
          Template.nobjedit.expand(
            $("<p> <nobject type='map'/> </p>") )[0]
        );
      }
    }
  });


};

Template.afSummernote.rendered = function () {
  var self = this;
  var $editor = $(this.firstNode);

  var options = this.data.atts.settings || {};

  var onblur = options.onblur;
  options.onblur = function (e) {
    $editor.change();
    if (typeof onblur === 'function') {
      onblur.apply(this, arguments);
    }
  };

  Template.afSummernote.ensurePluginsLoaded();


  options.airMode = false;

  options.toolbar = [
    //...
    ['group', [ 'map']],
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
    //...
  ];


  $editor.summernote(options);

  this.autorun(function () {
    $editor.code(self.value.get());
  });

  $editor.closest('form').on('reset', function () {
    $editor.code('');
  });
};

Template.afSummernote.helpers({
  atts: function () {
    var self = this;

    /**
     * This is bit hacky but created and rendered callback sometimes
     * (or always?) get empty value. This helper gets called multiple
     * times so we intercept and save the value once it is not empty.
     */
    Tracker.nonreactive(function () {
      var t = Template.instance();
      if (t.value.get() !== self.value) {
        t.value.set(self.value);
      }
    });

    return _.omit(this.atts, 'settings');
  }
});
