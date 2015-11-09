AutoForm.addInputType('summernote', {
  template: 'afSummernote',
  valueOut: function () {

    var $holder = this.first();                                                                                    // 7245
    if (!$holder.length) {                                                                                         // 7246
      return;                                                                                                      // 7247
    }                                                                                                              // 7248

    var renderer = $.summernote.renderer;
    var layoutInfo = renderer.layoutInfoFromHolder($holder);                                                       // 7250
    var e = layoutInfo && layoutInfo.editable();                                                                                                    // 7249

    var h = '';
    var cc = e.children();
    for (var i = 0; i < cc.length; i++) {
      var ee = $(cc[i]);
      try {
        var vv = $(ee.children()[0]);
        var nobjType =vv.attr('nobjectdata');

        var d = Template.nobjedit.type[nobjType].toData(vv);

        h +=
          "<nobject type='" + nobjType + "'>" +
            JSON.stringify(d) +
          "</nobject>";
      }
      catch (x) {
        h += ee.html();
      }

    }
    return h;


    //e.find('[nobject_data]', console.log);
    //
    ////console.log($(this).find('.nobject'));
    //e.each(function() {
    //
    //  var nt = $(this).attr('nobject_data');
    //  if (nt) {
    //    console.log($(this), nt);
    //  }
    //  else {
    //    console.log($(this).html());
    //  }
    //});
    //return this.code();
  }
});

//
//var code = function (html) {                                                                                            // 7242
//  // get the HTML contents of note                                                                                 // 7243
//  if (html === undefined) {                                                                                        // 7244
//    var $holder = this.first();                                                                                    // 7245
//    if (!$holder.length) {                                                                                         // 7246
//      return;                                                                                                      // 7247
//    }                                                                                                              // 7248
//    // 7249
//    var layoutInfo = renderer.layoutInfoFromHolder($holder);                                                       // 7250
//    var $editable = layoutInfo && layoutInfo.editable();                                                           // 7251
//    // 7252
//    if ($editable && $editable.length) {                                                                           // 7253
//      var isCodeview = eventHandler.invoke('codeview.isActivated', layoutInfo);                                    // 7254
//      eventHandler.invoke('codeview.sync', layoutInfo);                                                            // 7255
//      return isCodeview ? layoutInfo.codable().val() :                                                             // 7256
//        layoutInfo.editable().html();                                                            // 7257
//    }                                                                                                              // 7258
//    return dom.value($holder);                                                                                     // 7259
//  }                                                                                                                // 7260
//  // 7261
//  // set the HTML contents of note                                                                                 // 7262
//  this.each(function (i, holder) {                                                                                 // 7263
//    var layoutInfo = renderer.layoutInfoFromHolder($(holder));                                                     // 7264
//    var $editable = layoutInfo && layoutInfo.editable();                                                           // 7265
//    if ($editable) {                                                                                               // 7266
//      $editable.html(html);                                                                                        // 7267
//    }                                                                                                              // 7268
//  });                                                                                                              // 7269
//  // 7270
//  return this;                                                                                                     // 7271
//};
