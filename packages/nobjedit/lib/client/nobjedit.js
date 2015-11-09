"use strict";

/*
 var nidget = {
 id: '',
 fromData: function (json) {

 },
 toData: function (widget) {

 }
 };
 */

//http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
var XFoo = document.registerElement('x-foo', {
  prototype: Object.create(HTMLElement.prototype, {
    bar: {
      get: function () {
        return 5;
      }
    },
    foo: {
      value: function () {
        alert('foo() called');
      }
    }
  })
  /*
   proto.createdCallback = function() {...};
   proto.attachedCallback = function() {...};

   bar: {
   get: function() { return 5; }
   },
   foo: {
   value: function() {
   alert('foo() called');
   }
   }
   })*/

});

var proto = Object.create(HTMLDivElement.prototype);


proto.createdCallback = function () {

  console.log(this, 'creating');

  var j = $(this).text() || {
      center: [51.505, -0.09],
      zoom: 13
    };



  //setTimeout(function () {

    var m = $('<div/>');


    m.css({ width: 500, height: 300});//'map_small');




  var content = this.createShadowRoot();

  $(content).append(
    '<style> @import "packages/automenta_nobjedit/lib/leaflet/leaflet.css"; </style>'
  );

  //setTimeout(function() {



    var viewCenter = j.center;
    var viewZoom = j.zoom;


    var map = L.map(m[0]).setView(viewCenter, viewZoom);
    //m.data('leaflet', map);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

    map.addLayer(osm);

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    //}, 0);

    $(content).append(m);

    map.invalidateSize(false);

    this.map = map;

   console.log(this, map, 'created');
};

proto.attachedCallback = function () {

  console.log(this, 'attached');
    if (this.map) {
      this.map.invalidateSize(false);
    }
};
proto.detachedCallback = function () {
  console.log(this, 'dettached');
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
};

var XFoo = document.registerElement('x-mapmini', {
  prototype: proto
});


//
//var XMapMini = document.registerElement('x-mapmini', {
//  prototype: Object.create(HTMLElement.prototype, {
//    attachedCallback: function () {
//
//    }
//  })
//});

Template.nobjedit = {type: {}};


//
//  toData: function (widget) {
//    //http://leafletjs.com/reference.html#map-get-methods
//    var map = widget.data('leaflet');
//    if (!map) return {};
//    var center = map.getCenter();
//    var zoom = map.getZoom();
//    return {
//      center: [center.lat, center.lng],
//      zoom: zoom
//    };
//  }
//};
