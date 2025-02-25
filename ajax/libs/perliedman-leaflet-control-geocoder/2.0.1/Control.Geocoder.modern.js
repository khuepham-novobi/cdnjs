import { Util, latLng as latLng$1, latLngBounds, geoJSON, circleMarker, GeoJSON, Control, Evented, DomUtil, DomEvent, Browser, Marker } from 'leaflet';

/**
 * @internal
 */

function geocodingParams(options, params) {
  return Util.extend(params, options.geocodingQueryParams);
}
/**
 * @internal
 */

function reverseParams(options, params) {
  return Util.extend(params, options.reverseQueryParams);
}

/**
 * @internal
 */

let lastCallbackId = 0; // Adapted from handlebars.js
// https://github.com/wycats/handlebars.js/

/**
 * @internal
 */

const badChars = /[&<>"'`]/g;
/**
 * @internal
 */

const possible = /[&<>"'`]/;
/**
 * @internal
 */

const escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
/**
 * @internal
 */

function escapeChar(chr) {
  return escape[chr];
}
/**
 * @internal
 */


function htmlEscape(string) {
  if (string == null) {
    return '';
  } else if (!string) {
    return string + '';
  } // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.


  string = '' + string;

  if (!possible.test(string)) {
    return string;
  }

  return string.replace(badChars, escapeChar);
}
/**
 * @internal
 */

function jsonp(url, params, callback, context, jsonpParam) {
  const callbackId = '_l_geocoder_' + lastCallbackId++;
  params[jsonpParam || 'callback'] = callbackId;
  window[callbackId] = Util.bind(callback, context);
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url + getParamString(params);
  script.id = callbackId;
  document.getElementsByTagName('head')[0].appendChild(script);
}
/**
 * @internal
 */

function getJSON(url, params, callback) {
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState !== 4) {
      return;
    }

    let message;

    if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
      message = '';
    } else if (typeof xmlHttp.response === 'string') {
      // IE doesn't parse JSON responses even with responseType: 'json'.
      try {
        message = JSON.parse(xmlHttp.response);
      } catch (e) {
        // Not a JSON response
        message = xmlHttp.response;
      }
    } else {
      message = xmlHttp.response;
    }

    callback(message);
  };

  xmlHttp.open('GET', url + getParamString(params), true);
  xmlHttp.responseType = 'json';
  xmlHttp.setRequestHeader('Accept', 'application/json');
  xmlHttp.send(null);
}
/**
 * @internal
 */

function template(str, data) {
  return str.replace(/\{ *([\w_]+) *\}/g, (str, key) => {
    let value = data[key];

    if (value === undefined) {
      value = '';
    } else if (typeof value === 'function') {
      value = value(data);
    }

    return htmlEscape(value);
  });
}
/**
 * @internal
 */

function getParamString(obj, existingUrl, uppercase) {
  const params = [];

  for (const i in obj) {
    const key = encodeURIComponent(uppercase ? i.toUpperCase() : i);
    const value = obj[i];

    if (!Array.isArray(value)) {
      params.push(key + '=' + encodeURIComponent(String(value)));
    } else {
      for (let j = 0; j < value.length; j++) {
        params.push(key + '=' + encodeURIComponent(value[j]));
      }
    }
  }

  return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
}

/**
 * Implementation of the [ArcGIS geocoder](https://developers.arcgis.com/features/geocoding/)
 */

class ArcGis {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
      apiKey: ''
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      token: this.options.apiKey,
      SingleLine: query,
      outFields: 'Addr_Type',
      forStorage: false,
      maxLocations: 10,
      f: 'json'
    });
    getJSON(this.options.serviceUrl + '/findAddressCandidates', params, data => {
      const results = [];

      if (data.candidates && data.candidates.length) {
        for (let i = 0; i <= data.candidates.length - 1; i++) {
          const loc = data.candidates[i];
          const latLng = latLng$1(loc.location.y, loc.location.x);
          const latLngBounds$1 = latLngBounds(latLng$1(loc.extent.ymax, loc.extent.xmax), latLng$1(loc.extent.ymin, loc.extent.xmin));
          results[i] = {
            name: loc.address,
            bbox: latLngBounds$1,
            center: latLng
          };
        }
      }

      cb.call(context, results);
    });
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      location: encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat),
      distance: 100,
      f: 'json'
    });
    getJSON(this.options.serviceUrl + '/reverseGeocode', params, data => {
      const result = [];

      if (data && !data.error) {
        const center = latLng$1(data.location.y, data.location.x);
        const bbox = latLngBounds(center, center);
        result.push({
          name: data.address.Match_addr,
          center: center,
          bbox: bbox
        });
      }

      cb.call(context, result);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link ArcGis}
 * @param options the options
 */

function arcgis(options) {
  return new ArcGis(options);
}

/**
 * Implementation of the [Bing Locations API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/)
 */

class Bing {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://dev.virtualearth.net/REST/v1/Locations'
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      query: query,
      key: this.options.apiKey
    });
    jsonp(this.options.apiKey, params, data => {
      const results = [];

      if (data.resourceSets.length > 0) {
        for (let i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
          const resource = data.resourceSets[0].resources[i],
                bbox = resource.bbox;
          results[i] = {
            name: resource.name,
            bbox: latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
            center: latLng$1(resource.point.coordinates)
          };
        }
      }

      cb.call(context, results);
    }, this, 'jsonp');
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      key: this.options.apiKey
    });
    jsonp(this.options.serviceUrl + location.lat + ',' + location.lng, params, data => {
      const results = [];

      for (let i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
        const resource = data.resourceSets[0].resources[i],
              bbox = resource.bbox;
        results[i] = {
          name: resource.name,
          bbox: latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
          center: latLng$1(resource.point.coordinates)
        };
      }

      cb.call(context, results);
    }, this, 'jsonp');
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Bing}
 * @param options the options
 */

function bing(options) {
  return new Bing(options);
}

class Google {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      key: this.options.apiKey,
      address: query
    });
    getJSON(this.options.serviceUrl, params, data => {
      const results = [];

      if (data.results && data.results.length) {
        for (let i = 0; i <= data.results.length - 1; i++) {
          const loc = data.results[i];
          const latLng = latLng$1(loc.geometry.location);
          const latLngBounds$1 = latLngBounds(latLng$1(loc.geometry.viewport.northeast), latLng$1(loc.geometry.viewport.southwest));
          results[i] = {
            name: loc.formatted_address,
            bbox: latLngBounds$1,
            center: latLng,
            properties: loc.address_components
          };
        }
      }

      cb.call(context, results);
    });
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      key: this.options.apiKey,
      latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
    });
    getJSON(this.options.serviceUrl, params, data => {
      const results = [];

      if (data.results && data.results.length) {
        for (let i = 0; i <= data.results.length - 1; i++) {
          const loc = data.results[i];
          const center = latLng$1(loc.geometry.location);
          const bbox = latLngBounds(latLng$1(loc.geometry.viewport.northeast), latLng$1(loc.geometry.viewport.southwest));
          results[i] = {
            name: loc.formatted_address,
            bbox: bbox,
            center: center,
            properties: loc.address_components
          };
        }
      }

      cb.call(context, results);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Google}
 * @param options the options
 */

function google(options) {
  return new Google(options);
}

/**
 * Implementation of the [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/introduction.html)
 */

class HERE {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://geocoder.api.here.com/6.2/',
      app_id: '',
      app_code: '',
      reverseGeocodeProxRadius: null
    };
    Util.setOptions(this, options);
    if (options.apiKey) throw Error('apiKey is not supported, use app_id/app_code instead!');
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      searchtext: query,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1
    });
    this.getJSON(this.options.serviceUrl + 'geocode.json', params, cb, context);
  }

  reverse(location, scale, cb, context) {
    const _proxRadius = this.options.reverseGeocodeProxRadius ? this.options.reverseGeocodeProxRadius : null;

    const proxRadius = _proxRadius ? ',' + encodeURIComponent(_proxRadius) : '';
    const params = reverseParams(this.options, {
      prox: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng) + proxRadius,
      mode: 'retrieveAddresses',
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      gen: 9,
      jsonattributes: 1
    });
    this.getJSON(this.options.serviceUrl + 'reversegeocode.json', params, cb, context);
  }

  getJSON(url, params, cb, context) {
    getJSON(url, params, data => {
      const results = [];

      if (data.response.view && data.response.view.length) {
        for (let i = 0; i <= data.response.view[0].result.length - 1; i++) {
          const loc = data.response.view[0].result[i].location;
          const center = latLng$1(loc.displayPosition.latitude, loc.displayPosition.longitude);
          const bbox = latLngBounds(latLng$1(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude), latLng$1(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude));
          results[i] = {
            name: loc.address.label,
            properties: loc.address,
            bbox: bbox,
            center: center
          };
        }
      }

      cb.call(context, results);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link HERE}
 * @param options the options
 */

function here(options) {
  return new HERE(options);
}

/**
 * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
 * @param query the latitude/longitude string to parse
 * @returns the parsed latitude/longitude
 */

function parseLatLng(query) {
  let match; // regex from https://github.com/openstreetmap/openstreetmap-website/blob/master/app/controllers/geocoder_controller.rb

  if (match = query.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/)) {
    // [NSEW] decimal degrees
    return latLng$1((/N/i.test(match[1]) ? 1 : -1) * parseFloat(match[2]), (/E/i.test(match[3]) ? 1 : -1) * parseFloat(match[4]));
  } else if (match = query.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/)) {
    // decimal degrees [NSEW]
    return latLng$1((/N/i.test(match[2]) ? 1 : -1) * parseFloat(match[1]), (/E/i.test(match[4]) ? 1 : -1) * parseFloat(match[3]));
  } else if (match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/)) {
    // [NSEW] degrees, decimal minutes
    return latLng$1((/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3]) / 60), (/E/i.test(match[4]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6]) / 60));
  } else if (match = query.match(/^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/)) {
    // degrees, decimal minutes [NSEW]
    return latLng$1((/N/i.test(match[3]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2]) / 60), (/E/i.test(match[6]) ? 1 : -1) * (parseFloat(match[4]) + parseFloat(match[5]) / 60));
  } else if (match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/)) {
    // [NSEW] degrees, minutes, decimal seconds
    return latLng$1((/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3]) / 60 + parseFloat(match[4]) / 3600), (/E/i.test(match[5]) ? 1 : -1) * (parseFloat(match[6]) + parseFloat(match[7]) / 60 + parseFloat(match[8]) / 3600));
  } else if (match = query.match(/^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/)) {
    // degrees, minutes, decimal seconds [NSEW]
    return latLng$1((/N/i.test(match[4]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2]) / 60 + parseFloat(match[3]) / 3600), (/E/i.test(match[8]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6]) / 60 + parseFloat(match[7]) / 3600));
  } else if (match = query.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/)) {
    return latLng$1(parseFloat(match[1]), parseFloat(match[2]));
  }
}
/**
 * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
 */

class LatLng {
  constructor(options) {
    this.options = {
      next: undefined,
      sizeInMeters: 10000
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const center = parseLatLng(query);

    if (center) {
      const results = [{
        name: query,
        center: center,
        bbox: center.toBounds(this.options.sizeInMeters)
      }];
      cb.call(context, results);
    } else if (this.options.next) {
      this.options.next.geocode(query, cb, context);
    }
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link LatLng}
 * @param options the options
 */

function latLng(options) {
  return new LatLng(options);
}

/**
 * Implementation of the [Mapbox Geocoding](https://www.mapbox.com/api-documentation/#geocoding)
 */

class Mapbox {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    };
    Util.setOptions(this, options);
  }

  _getProperties(loc) {
    const properties = {
      text: loc.text,
      address: loc.address
    };

    for (let j = 0; j < (loc.context || []).length; j++) {
      const id = loc.context[j].id.split('.')[0];
      properties[id] = loc.context[j].text; // Get country code when available

      if (loc.context[j].short_code) {
        properties['countryShortCode'] = loc.context[j].short_code;
      }
    }

    return properties;
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      access_token: this.options.apiKey
    });

    if (params.proximity !== undefined && params.proximity.lat !== undefined && params.proximity.lng !== undefined) {
      params.proximity = params.proximity.lng + ',' + params.proximity.lat;
    }

    getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, data => {
      const results = [];

      if (data.features && data.features.length) {
        for (let i = 0; i <= data.features.length - 1; i++) {
          const loc = data.features[i];
          const center = latLng$1(loc.center.reverse());
          let bbox;

          if (loc.bbox) {
            bbox = latLngBounds(latLng$1(loc.bbox.slice(0, 2).reverse()), latLng$1(loc.bbox.slice(2, 4).reverse()));
          } else {
            bbox = latLngBounds(center, center);
          }

          results[i] = {
            name: loc.place_name,
            bbox: bbox,
            center: center,
            properties: this._getProperties(loc)
          };
        }
      }

      cb.call(context, results);
    });
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  }

  reverse(location, scale, cb, context) {
    const param = reverseParams(this.options, {
      access_token: this.options.apiKey
    });
    getJSON(this.options.serviceUrl + encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat) + '.json', param, data => {
      const results = [];

      if (data.features && data.features.length) {
        for (let i = 0; i <= data.features.length - 1; i++) {
          const loc = data.features[i];
          const center = latLng$1(loc.center.reverse());
          let bbox;

          if (loc.bbox) {
            bbox = latLngBounds(latLng$1(loc.bbox.slice(0, 2).reverse()), latLng$1(loc.bbox.slice(2, 4).reverse()));
          } else {
            bbox = latLngBounds(center, center);
          }

          results[i] = {
            name: loc.place_name,
            bbox: bbox,
            center: center,
            properties: this._getProperties(loc)
          };
        }
      }

      cb.call(context, results);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Mapbox}
 * @param options the options
 */

function mapbox(options) {
  return new Mapbox(options);
}

/**
 * Implementation of the [MapQuest Geocoding API](http://developer.mapquest.com/web/products/dev-services/geocoding-ws)
 */

class MapQuest {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
    };
    Util.setOptions(this, options); // MapQuest seems to provide URI encoded API keys,
    // so to avoid encoding them twice, we decode them here

    this.options.apiKey = decodeURIComponent(this.options.apiKey);
  }

  _formatName(...parts) {
    return parts.filter(s => !!s).join(', ');
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      key: this.options.apiKey,
      location: query,
      limit: 5,
      outFormat: 'json'
    });
    getJSON(this.options.serviceUrl + '/address', params, Util.bind(function (data) {
      const results = [];

      if (data.results && data.results[0].locations) {
        for (let i = data.results[0].locations.length - 1; i >= 0; i--) {
          const loc = data.results[0].locations[i];
          const center = latLng$1(loc.latLng);
          results[i] = {
            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
            bbox: latLngBounds(center, center),
            center: center
          };
        }
      }

      cb.call(context, results);
    }, this));
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      key: this.options.apiKey,
      location: location.lat + ',' + location.lng,
      outputFormat: 'json'
    });
    getJSON(this.options.serviceUrl + '/reverse', params, Util.bind(function (data) {
      const results = [];

      if (data.results && data.results[0].locations) {
        for (let i = data.results[0].locations.length - 1; i >= 0; i--) {
          const loc = data.results[0].locations[i];
          const center = latLng$1(loc.latLng);
          results[i] = {
            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
            bbox: latLngBounds(center, center),
            center: center
          };
        }
      }

      cb.call(context, results);
    }, this));
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link MapQuest}
 * @param options the options
 */

function mapQuest(options) {
  return new MapQuest(options);
}

/**
 * Implementation of the [Neutrino API](https://www.neutrinoapi.com/api/geocode-address/)
 */

class Neutrino {
  constructor(options) {
    this.options = {
      userId: undefined,
      apiKey: undefined,
      serviceUrl: 'https://neutrinoapi.com/'
    };
    Util.setOptions(this, options);
  } // https://www.neutrinoapi.com/api/geocode-address/


  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      //get three words and make a dot based string
      address: query.split(/\s+/).join('.')
    });
    getJSON(this.options.serviceUrl + 'geocode-address', params, data => {
      const results = [];

      if (data.locations) {
        data.geometry = data.locations[0];
        const center = latLng$1(data.geometry['latitude'], data.geometry['longitude']);
        const bbox = latLngBounds(center, center);
        results[0] = {
          name: data.geometry.address,
          bbox: bbox,
          center: center
        };
      }

      cb.call(context, results);
    });
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  } // https://www.neutrinoapi.com/api/geocode-reverse/


  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      latitude: location.lat,
      longitude: location.lng
    });
    getJSON(this.options.serviceUrl + 'geocode-reverse', params, data => {
      const results = [];

      if (data.status.status == 200 && data.found) {
        const center = latLng$1(location.lat, location.lng);
        const bbox = latLngBounds(center, center);
        results[0] = {
          name: data.address,
          bbox: bbox,
          center: center
        };
      }

      cb.call(context, results);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Neutrino}
 * @param options the options
 */

function neutrino(options) {
  return new Neutrino(options);
}

/**
 * Implementation of the [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) geocoder.
 *
 * This is the default geocoding service used by the control, unless otherwise specified in the options.
 *
 * Unless using your own Nominatim installation, please refer to the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).
 */

class Nominatim {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://nominatim.openstreetmap.org/',
      htmlTemplate: function (r) {
        const address = r.address;
        let className;
        const parts = [];

        if (address.road || address.building) {
          parts.push('{building} {road} {house_number}');
        }

        if (address.city || address.town || address.village || address.hamlet) {
          className = parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '';
          parts.push('<span class="' + className + '">{postcode} {city} {town} {village} {hamlet}</span>');
        }

        if (address.state || address.country) {
          className = parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '';
          parts.push('<span class="' + className + '">{state} {country}</span>');
        }

        return template(parts.join('<br/>'), address);
      }
    };
    Util.setOptions(this, options || {});
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      q: query,
      limit: 5,
      format: 'json',
      addressdetails: 1
    });
    getJSON(this.options.serviceUrl + 'search', params, data => {
      const results = [];

      for (let i = data.length - 1; i >= 0; i--) {
        const bbox = data[i].boundingbox;

        for (let j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);

        results[i] = {
          icon: data[i].icon,
          name: data[i].display_name,
          html: this.options.htmlTemplate ? this.options.htmlTemplate(data[i]) : undefined,
          bbox: latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
          center: latLng$1(data[i].lat, data[i].lon),
          properties: data[i]
        };
      }

      cb.call(context, results);
    });
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      lat: location.lat,
      lon: location.lng,
      zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
      addressdetails: 1,
      format: 'json'
    });
    getJSON(this.options.serviceUrl + 'reverse', params, data => {
      const result = [];

      if (data && data.lat && data.lon) {
        const center = latLng$1(data.lat, data.lon);
        const bbox = latLngBounds(center, center);
        result.push({
          name: data.display_name,
          html: this.options.htmlTemplate ? this.options.htmlTemplate(data) : undefined,
          center: center,
          bbox: bbox,
          properties: data
        });
      }

      cb.call(context, result);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Nominatim}
 * @param options the options
 */

function nominatim(options) {
  return new Nominatim(options);
}

/**
 * Implementation of the [Plus codes](https://plus.codes/) (formerly OpenLocationCode) (requires [open-location-code](https://www.npmjs.com/package/open-location-code))
 */

class OpenLocationCode {
  constructor(options) {
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    try {
      const decoded = this.options.OpenLocationCode.decode(query);
      const result = {
        name: query,
        center: latLng$1(decoded.latitudeCenter, decoded.longitudeCenter),
        bbox: latLngBounds(latLng$1(decoded.latitudeLo, decoded.longitudeLo), latLng$1(decoded.latitudeHi, decoded.longitudeHi))
      };
      cb.call(context, [result]);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console

      cb.call(context, []);
    }
  }

  reverse(location, scale, cb, context) {
    try {
      const code = this.options.OpenLocationCode.encode(location.lat, location.lng, this.options.codeLength);
      const result = {
        name: code,
        center: latLng$1(location.lat, location.lng),
        bbox: latLngBounds(latLng$1(location.lat, location.lng), latLng$1(location.lat, location.lng))
      };
      cb.call(context, [result]);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console

      cb.call(context, []);
    }
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link OpenLocationCode}
 * @param options the options
 */

function openLocationCode(options) {
  return new OpenLocationCode(options);
}

/**
 * Implementation of the [OpenCage Data API](https://opencagedata.com/)
 */

class OpenCage {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://api.opencagedata.com/geocode/v1/json'
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      key: this.options.apiKey,
      q: query
    });
    getJSON(this.options.serviceUrl, params, data => {
      const results = [];

      if (data.results && data.results.length) {
        for (let i = 0; i < data.results.length; i++) {
          const loc = data.results[i];
          const center = latLng$1(loc.geometry);
          let bbox;

          if (loc.annotations && loc.annotations.bounds) {
            bbox = latLngBounds(latLng$1(loc.annotations.bounds.northeast), latLng$1(loc.annotations.bounds.southwest));
          } else {
            bbox = latLngBounds(center, center);
          }

          results.push({
            name: loc.formatted,
            bbox: bbox,
            center: center
          });
        }
      }

      cb.call(context, results);
    });
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      key: this.options.apiKey,
      q: [location.lat, location.lng].join(',')
    });
    getJSON(this.options.serviceUrl, params, data => {
      const results = [];

      if (data.results && data.results.length) {
        for (let i = 0; i < data.results.length; i++) {
          const loc = data.results[i];
          const center = latLng$1(loc.geometry);
          let bbox;

          if (loc.annotations && loc.annotations.bounds) {
            bbox = latLngBounds(latLng$1(loc.annotations.bounds.northeast), latLng$1(loc.annotations.bounds.southwest));
          } else {
            bbox = latLngBounds(center, center);
          }

          results.push({
            name: loc.formatted,
            bbox: bbox,
            center: center
          });
        }
      }

      cb.call(context, results);
    });
  }

}
function opencage(options) {
  return new OpenCage(options);
}

/**
 * Implementation of the [Pelias](https://pelias.io/), [geocode.earth](https://geocode.earth/) geocoder (formerly Mapzen Search)
 */

class Pelias {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://api.geocode.earth/v1'
    };
    this._lastSuggest = 0;
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      api_key: this.options.apiKey,
      text: query
    });
    getJSON(this.options.serviceUrl + '/search', params, data => {
      cb.call(context, this._parseResults(data, 'bbox'));
    });
  }

  suggest(query, cb, context) {
    const params = geocodingParams(this.options, {
      api_key: this.options.apiKey,
      text: query
    });
    getJSON(this.options.serviceUrl + '/autocomplete', params, data => {
      if (data.geocoding.timestamp > this._lastSuggest) {
        this._lastSuggest = data.geocoding.timestamp;
        cb.call(context, this._parseResults(data, 'bbox'));
      }
    });
  }

  reverse(location, scale, cb, context) {
    const params = reverseParams(this.options, {
      api_key: this.options.apiKey,
      'point.lat': location.lat,
      'point.lon': location.lng
    });
    getJSON(this.options.serviceUrl + '/reverse', params, data => {
      cb.call(context, this._parseResults(data, 'bounds'));
    });
  }

  _parseResults(data, bboxname) {
    const results = [];
    geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return circleMarker(latlng);
      },
      onEachFeature: function (feature, layer) {
        const result = {};
        let bbox;
        let center;

        if (layer.getBounds) {
          bbox = layer.getBounds();
          center = bbox.getCenter();
        } else if (layer.feature.bbox) {
          center = layer.getLatLng();
          bbox = latLngBounds(GeoJSON.coordsToLatLng(layer.feature.bbox.slice(0, 2)), GeoJSON.coordsToLatLng(layer.feature.bbox.slice(2, 4)));
        } else {
          center = layer.getLatLng();
          bbox = latLngBounds(center, center);
        }

        result.name = layer.feature.properties.label;
        result.center = center;
        result[bboxname] = bbox;
        result.properties = layer.feature.properties;
        results.push(result);
      }
    });
    return results;
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Pelias}
 * @param options the options
 */

function pelias(options) {
  return new Pelias(options);
}
const GeocodeEarth = Pelias;
const geocodeEarth = pelias;
/**
 * r.i.p.
 * @deprecated
 */

const Mapzen = Pelias;
/**
 * r.i.p.
 * @deprecated
 */

const mapzen = pelias;
/**
 * Implementation of the [Openrouteservice](https://openrouteservice.org/dev/#/api-docs/geocode) geocoder
 */

class Openrouteservice extends Pelias {
  constructor(options) {
    super(Util.extend({
      serviceUrl: 'https://api.openrouteservice.org/geocode'
    }, options));
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Openrouteservice}
 * @param options the options
 */

function openrouteservice(options) {
  return new Openrouteservice(options);
}

/**
 * Implementation of the [Photon](http://photon.komoot.de/) geocoder
 */

class Photon {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://photon.komoot.io/api/',
      reverseUrl: 'https://photon.komoot.io/reverse/',
      nameProperties: ['name', 'street', 'suburb', 'hamlet', 'town', 'city', 'state', 'country']
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    const params = geocodingParams(this.options, {
      q: query
    });
    getJSON(this.options.serviceUrl, params, Util.bind(function (data) {
      cb.call(context, this._decodeFeatures(data));
    }, this));
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  }

  reverse(latLng, scale, cb, context) {
    const params = reverseParams(this.options, {
      lat: latLng.lat,
      lon: latLng.lng
    });
    getJSON(this.options.reverseUrl, params, Util.bind(function (data) {
      cb.call(context, this._decodeFeatures(data));
    }, this));
  }

  _decodeFeatures(data) {
    const results = [];

    if (data && data.features) {
      for (let i = 0; i < data.features.length; i++) {
        const f = data.features[i];
        const c = f.geometry.coordinates;
        const center = latLng$1(c[1], c[0]);
        const extent = f.properties.extent;
        const bbox = extent ? latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]) : latLngBounds(center, center);
        results.push({
          name: this._decodeFeatureName(f),
          html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : undefined,
          center: center,
          bbox: bbox,
          properties: f.properties
        });
      }
    }

    return results;
  }

  _decodeFeatureName(f) {
    return (this.options.nameProperties || []).map(p => {
      return f.properties[p];
    }).filter(v => {
      return !!v;
    }).join(', ');
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Photon}
 * @param options the options
 */

function photon(options) {
  return new Photon(options);
}

/**
 * Implementation of the What3Words service
 */

class What3Words {
  constructor(options) {
    this.options = {
      serviceUrl: 'https://api.what3words.com/v2/'
    };
    Util.setOptions(this, options);
  }

  geocode(query, cb, context) {
    //get three words and make a dot based string
    getJSON(this.options.serviceUrl + 'forward', geocodingParams(this.options, {
      key: this.options.apiKey,
      addr: query.split(/\s+/).join('.')
    }), data => {
      const results = [];

      if (data.geometry) {
        const latLng = latLng$1(data.geometry['lat'], data.geometry['lng']);
        const latLngBounds$1 = latLngBounds(latLng, latLng);
        results[0] = {
          name: data.words,
          bbox: latLngBounds$1,
          center: latLng
        };
      }

      cb.call(context, results);
    });
  }

  suggest(query, cb, context) {
    return this.geocode(query, cb, context);
  }

  reverse(location, scale, cb, context) {
    getJSON(this.options.serviceUrl + 'reverse', reverseParams(this.options, {
      key: this.options.apiKey,
      coords: [location.lat, location.lng].join(',')
    }), data => {
      const results = [];

      if (data.status.status == 200) {
        const center = latLng$1(data.geometry['lat'], data.geometry['lng']);
        const bbox = latLngBounds(center, center);
        results[0] = {
          name: data.words,
          bbox: bbox,
          center: center
        };
      }

      cb.call(context, results);
    });
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link What3Words}
 * @param options the options
 */

function what3words(options) {
  return new What3Words(options);
}



var geocoders = {
  __proto__: null,
  geocodingParams: geocodingParams,
  reverseParams: reverseParams,
  ArcGis: ArcGis,
  arcgis: arcgis,
  Bing: Bing,
  bing: bing,
  Google: Google,
  google: google,
  HERE: HERE,
  here: here,
  parseLatLng: parseLatLng,
  LatLng: LatLng,
  latLng: latLng,
  Mapbox: Mapbox,
  mapbox: mapbox,
  MapQuest: MapQuest,
  mapQuest: mapQuest,
  Neutrino: Neutrino,
  neutrino: neutrino,
  Nominatim: Nominatim,
  nominatim: nominatim,
  OpenLocationCode: OpenLocationCode,
  openLocationCode: openLocationCode,
  OpenCage: OpenCage,
  opencage: opencage,
  Pelias: Pelias,
  pelias: pelias,
  GeocodeEarth: GeocodeEarth,
  geocodeEarth: geocodeEarth,
  Mapzen: Mapzen,
  mapzen: mapzen,
  Openrouteservice: Openrouteservice,
  openrouteservice: openrouteservice,
  Photon: Photon,
  photon: photon,
  What3Words: What3Words,
  what3words: what3words
};

/**
 * Leaflet mixins https://leafletjs.com/reference-1.7.1.html#class-includes
 * for TypeScript https://www.typescriptlang.org/docs/handbook/mixins.html
 * @internal
 */

class EventedControl {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...args) {// empty
  }

}

Util.extend(EventedControl.prototype, Control.prototype);
Util.extend(EventedControl.prototype, Evented.prototype);
/**
 * This is the geocoder control. It works like any other [Leaflet control](https://leafletjs.com/reference.html#control), and is added to the map.
 */

class GeocoderControl extends EventedControl {
  /**
   * Instantiates a geocoder control (to be invoked using `new`)
   * @param options the options
   */
  constructor(options) {
    super(options);
    this.options = {
      showUniqueResult: true,
      showResultIcons: false,
      collapsed: true,
      expand: 'touch',
      position: 'topright',
      placeholder: 'Search...',
      errorMessage: 'Nothing found.',
      iconLabel: 'Initiate a new search',
      query: '',
      queryMinLength: 1,
      suggestMinLength: 3,
      suggestTimeout: 250,
      defaultMarkGeocode: true
    };
    this._requestCount = 0;
    Util.setOptions(this, options);

    if (!this.options.geocoder) {
      this.options.geocoder = new Nominatim();
    }
  }

  addThrobberClass() {
    DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
  }

  removeThrobberClass() {
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
  }
  /**
   * Returns the container DOM element for the control and add listeners on relevant map events.
   * @param map the map instance
   * @see https://leafletjs.com/reference.html#control-onadd
   */


  onAdd(map) {
    const className = 'leaflet-control-geocoder';
    const container = DomUtil.create('div', className + ' leaflet-bar');
    const icon = DomUtil.create('button', className + '-icon', container);
    const form = this._form = DomUtil.create('div', className + '-form', container);
    this._map = map;
    this._container = container;
    icon.innerHTML = '&nbsp;';
    icon.type = 'button';
    icon.setAttribute('aria-label', this.options.iconLabel);
    const input = this._input = DomUtil.create('input', '', form);
    input.type = 'text';
    input.value = this.options.query;
    input.placeholder = this.options.placeholder;
    DomEvent.disableClickPropagation(input);
    this._errorElement = DomUtil.create('div', className + '-form-no-error', container);
    this._errorElement.innerHTML = this.options.errorMessage;
    this._alts = DomUtil.create('ul', className + '-alternatives leaflet-control-geocoder-alternatives-minimized', container);
    DomEvent.disableClickPropagation(this._alts);
    DomEvent.addListener(input, 'keydown', this._keydown, this);

    if (this.options.geocoder.suggest) {
      DomEvent.addListener(input, 'input', this._change, this);
    }

    DomEvent.addListener(input, 'blur', () => {
      if (this.options.collapsed && !this._preventBlurCollapse) {
        this._collapse();
      }

      this._preventBlurCollapse = false;
    });

    if (this.options.collapsed) {
      if (this.options.expand === 'click') {
        DomEvent.addListener(container, 'click', e => {
          if (e.button === 0 && e.detail !== 2) {
            this._toggle();
          }
        });
      } else if (this.options.expand === 'touch') {
        DomEvent.addListener(container, Browser.touch ? 'touchstart mousedown' : 'mousedown', e => {
          this._toggle();

          e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses

          e.stopPropagation();
        }, this);
      } else {
        DomEvent.addListener(container, 'mouseover', this._expand, this);
        DomEvent.addListener(container, 'mouseout', this._collapse, this);

        this._map.on('movestart', this._collapse, this);
      }
    } else {
      this._expand();

      if (Browser.touch) {
        DomEvent.addListener(container, 'touchstart', () => this._geocode());
      } else {
        DomEvent.addListener(container, 'click', () => this._geocode());
      }
    }

    if (this.options.defaultMarkGeocode) {
      this.on('markgeocode', this.markGeocode, this);
    }

    this.on('startgeocode', this.addThrobberClass, this);
    this.on('finishgeocode', this.removeThrobberClass, this);
    this.on('startsuggest', this.addThrobberClass, this);
    this.on('finishsuggest', this.removeThrobberClass, this);
    DomEvent.disableClickPropagation(container);
    return container;
  }
  /**
   * Sets the query string on the text input
   * @param string the query string
   */


  setQuery(string) {
    this._input.value = string;
    return this;
  }

  _geocodeResult(results, suggest) {
    if (!suggest && this.options.showUniqueResult && results.length === 1) {
      this._geocodeResultSelected(results[0]);
    } else if (results.length > 0) {
      this._alts.innerHTML = '';
      this._results = results;
      DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-open');

      for (let i = 0; i < results.length; i++) {
        this._alts.appendChild(this._createAlt(results[i], i));
      }
    } else {
      DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-error');
      DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
    }
  }
  /**
   * Marks a geocoding result on the map
   * @param result the geocoding result
   */


  markGeocode(result) {
    result = result.geocode || result;

    this._map.fitBounds(result.bbox);

    if (this._geocodeMarker) {
      this._map.removeLayer(this._geocodeMarker);
    }

    this._geocodeMarker = new Marker(result.center).bindPopup(result.html || result.name).addTo(this._map).openPopup();
    return this;
  }

  _geocode(suggest) {
    const value = this._input.value;

    if (!suggest && value.length < this.options.queryMinLength) {
      return;
    }

    const requestCount = ++this._requestCount;

    const cb = results => {
      if (requestCount === this._requestCount) {
        this.fire(suggest ? 'finishsuggest' : 'finishgeocode', {
          input: value,
          results
        });

        this._geocodeResult(results, suggest);
      }
    };

    this._lastGeocode = value;

    if (!suggest) {
      this._clearResults();
    }

    this.fire(suggest ? 'startsuggest' : 'startgeocode', {
      input: value
    });

    if (suggest) {
      this.options.geocoder.suggest(value, cb);
    } else {
      this.options.geocoder.geocode(value, cb);
    }
  }

  _geocodeResultSelected(result) {
    this.fire('markgeocode', {
      geocode: result
    });
  }

  _toggle() {
    if (DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
      this._collapse();
    } else {
      this._expand();
    }
  }

  _expand() {
    DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');

    this._input.select();

    this.fire('expand');
  }

  _collapse() {
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
    DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
    DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');

    this._input.blur(); // mobile: keyboard shouldn't stay expanded


    this.fire('collapse');
  }

  _clearResults() {
    DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
    this._selection = null;
    DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
    DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
  }

  _createAlt(result, index) {
    const li = DomUtil.create('li', ''),
          a = DomUtil.create('a', '', li),
          icon = this.options.showResultIcons && result.icon ? DomUtil.create('img', '', a) : null,
          text = result.html ? undefined : document.createTextNode(result.name),
          mouseDownHandler = e => {
      // In some browsers, a click will fire on the map if the control is
      // collapsed directly after mousedown. To work around this, we
      // wait until the click is completed, and _then_ collapse the
      // control. Messy, but this is the workaround I could come up with
      // for #142.
      this._preventBlurCollapse = true;
      DomEvent.stop(e);

      this._geocodeResultSelected(result);

      DomEvent.on(li, 'click touchend', () => {
        if (this.options.collapsed) {
          this._collapse();
        } else {
          this._clearResults();
        }
      });
    };

    if (icon) {
      icon.src = result.icon;
    }

    li.setAttribute('data-result-index', String(index));

    if (result.html) {
      a.innerHTML = a.innerHTML + result.html;
    } else if (text) {
      a.appendChild(text);
    } // Use mousedown and not click, since click will fire _after_ blur,
    // causing the control to have collapsed and removed the items
    // before the click can fire.


    DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);
    return li;
  }

  _keydown(e) {
    const select = dir => {
      if (this._selection) {
        DomUtil.removeClass(this._selection, 'leaflet-control-geocoder-selected');
        this._selection = this._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
      }

      if (!this._selection) {
        this._selection = this._alts[dir > 0 ? 'firstChild' : 'lastChild'];
      }

      if (this._selection) {
        DomUtil.addClass(this._selection, 'leaflet-control-geocoder-selected');
      }
    };

    switch (e.keyCode) {
      // Escape
      case 27:
        if (this.options.collapsed) {
          this._collapse();
        } else {
          this._clearResults();
        }

        break;
      // Up

      case 38:
        select(-1);
        break;
      // Up

      case 40:
        select(1);
        break;
      // Enter

      case 13:
        if (this._selection) {
          const index = parseInt(this._selection.getAttribute('data-result-index'), 10);

          this._geocodeResultSelected(this._results[index]);

          this._clearResults();
        } else {
          this._geocode();
        }

        break;

      default:
        return;
    }

    DomEvent.preventDefault(e);
  }

  _change() {
    const v = this._input.value;

    if (v !== this._lastGeocode) {
      clearTimeout(this._suggestTimeout);

      if (v.length >= this.options.suggestMinLength) {
        this._suggestTimeout = setTimeout(() => this._geocode(true), this.options.suggestTimeout);
      } else {
        this._clearResults();
      }
    }
  }

}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link GeocoderControl}
 * @param options the options
 */

function geocoder(options) {
  return new GeocoderControl(options);
}

/* @preserve
 * Leaflet Control Geocoder
 * https://github.com/perliedman/leaflet-control-geocoder
 *
 * Copyright (c) 2012 sa3m (https://github.com/sa3m)
 * Copyright (c) 2018 Per Liedman
 * All rights reserved.
 */
Util.extend(GeocoderControl, geocoders);
Util.extend(Control, {
  Geocoder: GeocoderControl,
  geocoder: geocoder
});

export default GeocoderControl;
//# sourceMappingURL=Control.Geocoder.modern.js.map
