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



Template.nobjedit = { type: { } };

Template.nobjedit.expand = function(node) {
  //search recursively for expandable <nobject> nodes

  node.find('nobject').each(function() {
    var t = $(this);
    var tt = t.attr('type');
    var nt = Template.nobjedit.type[tt];
    if (nt) {
      var ww = nt.toWidget(t.text());
      if (ww) {
        t.replaceWith(ww);
      }
      ww.attr('nobjectdata', tt);
    }
  });

  return node;
};

Template.nobjedit.type.map = {
  id: 'map',

  toWidget: function (j) {

    j = j || {
        center: [51.505, -0.09],
        zoom: 13
    };

    var m = $('<div>'); //map will be inserted here
    m.addClass('map_small');

    var viewCenter = j.center;
    var viewZoom = j.zoom;

    setTimeout(function () {
      var map = L.map(m[0]).setView(viewCenter, viewZoom);
      m.data('leaflet', map);

      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

      map.addLayer(osm);

      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
    }, 0);


    return m;

  },

  toData: function (widget) {
    //http://leafletjs.com/reference.html#map-get-methods
    var map = widget.data('leaflet');
    if (!map) return {};
    var center = map.getCenter();
    var zoom = map.getZoom();
    return {
      center: [center.lat, center.lng],
      zoom: zoom
    };
  }
};
