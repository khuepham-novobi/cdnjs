/*!
  * Routie - A tiny javascript hash router 
  * v0.1.0
  * https://github.com/jgallen23/routie
  * copyright JGA 2012
  * MIT License
  */

(function(w) {

  var routes = [];
  var map = {};

  var Route = function(path) {
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.regex = pathToRegexp(this.path, this.keys, false, false);

    //check against current hash
    var hash = getHash();
    checkRoute(hash, this);
  };

  Route.prototype.addHandler = function(fn) {
    this.fns.push(fn);
  };

  Route.prototype.removeHandler = function(fn) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      var f = this.fns[i];
      if (fn == f) {
        this.fns.splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function(params) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      this.fns[i].apply(this, params);
    }
  };

  Route.prototype.match = function(path, params){
    var m = this.regex.exec(path);
  
    if (!m) return false;

    
    for (var i = 1, len = m.length; i < len; ++i) {
      var key = this.keys[i - 1];

      var val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

      //if (key) {
        //params[key.name] = (undefined !== params[key.name]) ? params[key.name] : val;
      //} else {
      params.push(val);
      //}
    }

    return true;
  };

  var pathToRegexp = function(path, keys, sensitive, strict) {
    if (path instanceof RegExp) return path;
    if (path instanceof Array) path = '(' + path.join('|') + ')';
    path = path
      .concat(strict ? '' : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/\+/g, '__plus__')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
        keys.push({ name: key, optional: !! optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '');
      })
      .replace(/([\/.])/g, '\\$1')
      .replace(/__plus__/g, '(.+)')
      .replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  var addHandler = function(path, fn) {
    if (!map[path]) {
      map[path] = new Route(path);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  }

  var routie = function(path, fn) {
    if (typeof fn == 'function') {
      addHandler(path, fn);
    } else if (typeof path == 'object') {
      for (var p in path) {
        addHandler(p, path[p]);
      }
    } else if (typeof fn === 'undefined') {
      window.location.hash = path;
    }
  }

  routie.remove = function(path, fn) {
    var route = map[path];
    if (!route)
      return;
    route.removeHandler(fn);
  }

  routie.removeAll = function() {
    map = {};
    routes = [];
  }

  var getHash = function() {
    return window.location.hash.substring(1);
  }

  var checkRoute = function(hash, route) {
    var params = [];
    if (route.match(hash, params)) {
      route.run(params);
      return true;
    }
    return false;
  }

  var hashChanged = function() {
    var hash = getHash();
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (checkRoute(hash, route))
        return;
    }
  }

  if (w.addEventListener) {
    w.addEventListener('hashchange', hashChanged);
  } else {
    w.attachEvent('onhashchange', hashChanged);
  }

  w.routie = routie;
})(window);
