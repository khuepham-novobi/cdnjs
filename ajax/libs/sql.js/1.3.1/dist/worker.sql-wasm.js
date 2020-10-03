
// We are modularizing this manually because the current modularize setting in Emscripten has some issues:
// https://github.com/kripken/emscripten/issues/5820
// In addition, When you use emcc's modularization, it still expects to export a global object called `Module`,
// which is able to be used/called before the WASM is loaded.
// The modularization below exports a promise that loads and resolves to the actual sql.js module.
// That way, this module can't be used before the WASM is finished loading.

// We are going to define a function that a user will call to start loading initializing our Sql.js library
// However, that function might be called multiple times, and on subsequent calls, we don't actually want it to instantiate a new instance of the Module
// Instead, we want to return the previously loaded module

// TODO: Make this not declare a global if used in the browser
var initSqlJsPromise = undefined;

var initSqlJs = function (moduleConfig) {

    if (initSqlJsPromise){
      return initSqlJsPromise;
    }
    // If we're here, we've never called this function before
    initSqlJsPromise = new Promise(function (resolveModule, reject) {

        // We are modularizing this manually because the current modularize setting in Emscripten has some issues:
        // https://github.com/kripken/emscripten/issues/5820

        // The way to affect the loading of emcc compiled modules is to create a variable called `Module` and add
        // properties to it, like `preRun`, `postRun`, etc
        // We are using that to get notified when the WASM has finished loading.
        // Only then will we return our promise

        // If they passed in a moduleConfig object, use that
        // Otherwise, initialize Module to the empty object
        var Module = typeof moduleConfig !== 'undefined' ? moduleConfig : {};

        // EMCC only allows for a single onAbort function (not an array of functions)
        // So if the user defined their own onAbort function, we remember it and call it
        var originalOnAbortFunction = Module['onAbort'];
        Module['onAbort'] = function (errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction){
              originalOnAbortFunction(errorThatCausedAbort);
            }
        };

        Module['postRun'] = Module['postRun'] || [];
        Module['postRun'].push(function () {
            // When Emscripted calls postRun, this promise resolves with the built Module
            resolveModule(Module);
        });

        // There is a section of code in the emcc-generated code below that looks like this:
        // (Note that this is lowercase `module`)
        // if (typeof module !== 'undefined') {
        //     module['exports'] = Module;
        // }
        // When that runs, it's going to overwrite our own modularization export efforts in shell-post.js!
        // The only way to tell emcc not to emit it is to pass the MODULARIZE=1 or MODULARIZE_INSTANCE=1 flags,
        // but that carries with it additional unnecessary baggage/bugs we don't want either.
        // So, we have three options:
        // 1) We undefine `module`
        // 2) We remember what `module['exports']` was at the beginning of this function and we restore it later
        // 3) We write a script to remove those lines of code as part of the Make process.
        //
        // Since those are the only lines of code that care about module, we will undefine it. It's the most straightforward
        // of the options, and has the side effect of reducing emcc's efforts to modify the module if its output were to change in the future.
        // That's a nice side effect since we're handling the modularization efforts ourselves
        module = undefined;

        // The emcc-generated code and shell-post.js code goes below,
        // meaning that all of it runs inside of this promise. If anything throws an exception, our promise will abort

var e;e||(e=typeof Module !== 'undefined' ? Module : {});null;
e.onRuntimeInitialized=function(){function a(h,l){this.Oa=h;this.db=l;this.Na=1;this.fb=[]}function b(h){this.filename="dbfile_"+(4294967295*Math.random()>>>0);if(null!=h){var l=this.filename,r=l?k("//"+l):"/";l=aa(!0,!0);r=ba(r,(void 0!==l?l:438)&4095|32768,0);if(h){if("string"===typeof h){for(var q=Array(h.length),A=0,fa=h.length;A<fa;++A)q[A]=h.charCodeAt(A);h=q}ca(r,l|146);q=m(r,"w");da(q,h,0,h.length,0,void 0);ea(q);ca(r,l)}}this.handleError(f(this.filename,c));this.db=p(c,"i32");rc(this.db);
this.cb={};this.Ua={}}var c=u(4),d=e.cwrap,f=d("sqlite3_open","number",["string","number"]),g=d("sqlite3_close_v2","number",["number"]),n=d("sqlite3_exec","number",["number","string","number","number","number"]),t=d("sqlite3_changes","number",["number"]),w=d("sqlite3_prepare_v2","number",["number","string","number","number","number"]),v=d("sqlite3_prepare_v2","number",["number","number","number","number","number"]),B=d("sqlite3_bind_text","number",["number","number","number","number","number"]),H=
d("sqlite3_bind_blob","number",["number","number","number","number","number"]),ha=d("sqlite3_bind_double","number",["number","number","number"]),sc=d("sqlite3_bind_int","number",["number","number","number"]),tc=d("sqlite3_bind_parameter_index","number",["number","string"]),uc=d("sqlite3_step","number",["number"]),vc=d("sqlite3_errmsg","string",["number"]),wc=d("sqlite3_column_count","number",["number"]),xc=d("sqlite3_data_count","number",["number"]),yc=d("sqlite3_column_double","number",["number",
"number"]),zc=d("sqlite3_column_text","string",["number","number"]),Ac=d("sqlite3_column_blob","number",["number","number"]),Bc=d("sqlite3_column_bytes","number",["number","number"]),Cc=d("sqlite3_column_type","number",["number","number"]),Dc=d("sqlite3_column_name","string",["number","number"]),Ec=d("sqlite3_reset","number",["number"]),Fc=d("sqlite3_clear_bindings","number",["number"]),Gc=d("sqlite3_finalize","number",["number"]),Hc=d("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),
Ic=d("sqlite3_value_type","number",["number"]),Jc=d("sqlite3_value_bytes","number",["number"]),Kc=d("sqlite3_value_text","string",["number"]),Lc=d("sqlite3_value_blob","number",["number"]),Mc=d("sqlite3_value_double","number",["number"]),Nc=d("sqlite3_result_double","",["number","number"]),ub=d("sqlite3_result_null","",["number"]),Oc=d("sqlite3_result_text","",["number","string","number","number"]),Pc=d("sqlite3_result_blob","",["number","number","number","number"]),Qc=d("sqlite3_result_int","",["number",
"number"]),vb=d("sqlite3_result_error","",["number","string","number"]),rc=d("RegisterExtensionFunctions","number",["number"]);a.prototype.bind=function(h){if(!this.Oa)throw"Statement closed";this.reset();return Array.isArray(h)?this.tb(h):null!=h&&"object"===typeof h?this.ub(h):!0};a.prototype.step=function(){if(!this.Oa)throw"Statement closed";this.Na=1;var h=uc(this.Oa);switch(h){case 100:return!0;case 101:return!1;default:throw this.db.handleError(h);}};a.prototype.Ab=function(h){null==h&&(h=
this.Na,this.Na+=1);return yc(this.Oa,h)};a.prototype.Bb=function(h){null==h&&(h=this.Na,this.Na+=1);return zc(this.Oa,h)};a.prototype.getBlob=function(h){null==h&&(h=this.Na,this.Na+=1);var l=Bc(this.Oa,h);h=Ac(this.Oa,h);for(var r=new Uint8Array(l),q=0;q<l;)r[q]=x[h+q],q+=1;return r};a.prototype.get=function(h){null!=h&&this.bind(h)&&this.step();h=[];for(var l=0,r=xc(this.Oa);l<r;){switch(Cc(this.Oa,l)){case 1:case 2:h.push(this.Ab(l));break;case 3:h.push(this.Bb(l));break;case 4:h.push(this.getBlob(l));
break;default:h.push(null)}l+=1}return h};a.prototype.getColumnNames=function(){for(var h=[],l=0,r=wc(this.Oa);l<r;)h.push(Dc(this.Oa,l)),l+=1;return h};a.prototype.getAsObject=function(h){h=this.get(h);for(var l=this.getColumnNames(),r={},q=0,A=l.length;q<A;)r[l[q]]=h[q],q+=1;return r};a.prototype.run=function(h){null!=h&&this.bind(h);this.step();return this.reset()};a.prototype.xb=function(h,l){null==l&&(l=this.Na,this.Na+=1);h=ka(h);var r=la(h);this.fb.push(r);this.db.handleError(B(this.Oa,l,r,
h.length-1,0))};a.prototype.sb=function(h,l){null==l&&(l=this.Na,this.Na+=1);var r=la(h);this.fb.push(r);this.db.handleError(H(this.Oa,l,r,h.length,0))};a.prototype.wb=function(h,l){null==l&&(l=this.Na,this.Na+=1);this.db.handleError((h===(h|0)?sc:ha)(this.Oa,l,h))};a.prototype.vb=function(h){null==h&&(h=this.Na,this.Na+=1);H(this.Oa,h,0,0,0)};a.prototype.lb=function(h,l){null==l&&(l=this.Na,this.Na+=1);switch(typeof h){case "string":this.xb(h,l);return;case "number":case "boolean":this.wb(h+0,l);
return;case "object":if(null===h){this.vb(l);return}if(null!=h.length){this.sb(h,l);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+h+").";};a.prototype.ub=function(h){var l=this;Object.keys(h).forEach(function(r){var q=tc(l.Oa,r);0!==q&&l.lb(h[r],q)});return!0};a.prototype.tb=function(h){for(var l=0;l<h.length;)this.lb(h[l],l+1),l+=1;return!0};a.prototype.reset=function(){return 0===Fc(this.Oa)&&0===Ec(this.Oa)};a.prototype.freemem=function(){for(var h;void 0!==(h=this.fb.pop());)ma(h)};
a.prototype.free=function(){var h=0===Gc(this.Oa);delete this.db.cb[this.Oa];this.Oa=0;return h};b.prototype.run=function(h,l){if(!this.db)throw"Database closed";if(l){h=this.prepare(h,l);try{h.step()}finally{h.free()}}else this.handleError(n(this.db,h,0,0,c));return this};b.prototype.exec=function(h,l){if(!this.db)throw"Database closed";var r=na(),q=null;try{var A=oa(h)+1,fa=u(A);y(h,x,fa,A);var D=fa;var ia=u(4);for(h=[];0!==p(D,"i8");){pa(c);pa(ia);this.handleError(v(this.db,D,-1,c,ia));var ja=
p(c,"i32");D=p(ia,"i32");if(0!==ja){A=null;q=new a(ja,this);for(null!=l&&q.bind(l);q.step();)null===A&&(A={columns:q.getColumnNames(),values:[]},h.push(A)),A.values.push(q.get());q.free()}}return h}catch(E){throw q&&q.free(),E;}finally{qa(r)}};b.prototype.each=function(h,l,r,q){"function"===typeof l&&(q=r,r=l,l=void 0);h=this.prepare(h,l);try{for(;h.step();)r(h.getAsObject())}finally{h.free()}if("function"===typeof q)return q()};b.prototype.prepare=function(h,l){pa(c);this.handleError(w(this.db,h,
-1,c,0));h=p(c,"i32");if(0===h)throw"Nothing to prepare";var r=new a(h,this);null!=l&&r.bind(l);return this.cb[h]=r};b.prototype["export"]=function(){Object.values(this.cb).forEach(function(l){l.free()});Object.values(this.Ua).forEach(ra);this.Ua={};this.handleError(g(this.db));var h=sa(this.filename);this.handleError(f(this.filename,c));this.db=p(c,"i32");return h};b.prototype.close=function(){null!==this.db&&(Object.values(this.cb).forEach(function(h){h.free()}),Object.values(this.Ua).forEach(ra),
this.Ua={},this.handleError(g(this.db)),ta("/"+this.filename),this.db=null)};b.prototype.handleError=function(h){if(0===h)return null;h=vc(this.db);throw Error(h);};b.prototype.getRowsModified=function(){return t(this.db)};b.prototype.create_function=function(h,l){Object.prototype.hasOwnProperty.call(this.Ua,h)&&(ua(this.Ua[h]),delete this.Ua[h]);var r=va(function(q,A,fa){for(var D,ia=[],ja=0;ja<A;ja+=1){var E=p(fa+4*ja,"i32"),P=Ic(E);if(1===P||2===P)E=Mc(E);else if(3===P)E=Kc(E);else if(4===P){P=
E;E=Jc(P);P=Lc(P);for(var Ab=new Uint8Array(E),Ca=0;Ca<E;Ca+=1)Ab[Ca]=x[P+Ca];E=Ab}else E=null;ia.push(E)}try{D=l.apply(null,ia)}catch(Tc){vb(q,Tc,-1);return}switch(typeof D){case "boolean":Qc(q,D?1:0);break;case "number":Nc(q,D);break;case "string":Oc(q,D,-1,-1);break;case "object":null===D?ub(q):null!=D.length?(A=la(D),Pc(q,A,D.length,-1),ma(A)):vb(q,"Wrong API use : tried to return a value of an unknown type ("+D+").",-1);break;default:ub(q)}});this.Ua[h]=r;this.handleError(Hc(this.db,h,l.length,
1,0,r,0,0,0));return this};e.Database=b};var wa={},z;for(z in e)e.hasOwnProperty(z)&&(wa[z]=e[z]);var xa="./this.program",ya=!1,C=!1,za=!1,Aa=!1;ya="object"===typeof window;C="function"===typeof importScripts;za="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node;Aa=!ya&&!za&&!C;var F="",Ba,Da,Ea,Fa;
if(za)F=C?require("path").dirname(F)+"/":__dirname+"/",Ba=function(a,b){Ea||(Ea=require("fs"));Fa||(Fa=require("path"));a=Fa.normalize(a);return Ea.readFileSync(a,b?null:"utf8")},Da=function(a){a=Ba(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a},1<process.argv.length&&(xa=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),"undefined"!==typeof module&&(module.exports=e),e.inspect=function(){return"[Emscripten Module object]"};else if(Aa)"undefined"!=typeof read&&(Ba=function(a){return read(a)}),
Da=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");assert("object"===typeof a);return a},"undefined"!==typeof print&&("undefined"===typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!==typeof printErr?printErr:print);else if(ya||C)C?F=self.location.href:document.currentScript&&(F=document.currentScript.src),F=0!==F.indexOf("blob:")?F.substr(0,F.lastIndexOf("/")+1):"",Ba=function(a){var b=new XMLHttpRequest;b.open("GET",
a,!1);b.send(null);return b.responseText},C&&(Da=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});var Ga=e.print||console.log.bind(console),G=e.printErr||console.warn.bind(console);for(z in wa)wa.hasOwnProperty(z)&&(e[z]=wa[z]);wa=null;e.thisProgram&&(xa=e.thisProgram);function Ha(a){var b=I[Ia>>2];I[Ia>>2]=b+a+15&-16;return b}var Ja=[],Ka;function ua(a){Ka.delete(J.get(a));Ja.push(a)}
function va(a){if(!Ka){Ka=new WeakMap;for(var b=0;b<J.length;b++){var c=J.get(b);c&&Ka.set(c,b)}}if(Ka.has(a))a=Ka.get(a);else{if(Ja.length)b=Ja.pop();else{b=J.length;try{J.grow(1)}catch(g){if(!(g instanceof RangeError))throw g;throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";}}try{J.set(b,a)}catch(g){if(!(g instanceof TypeError))throw g;if("function"===typeof WebAssembly.Function){var d={i:"i32",j:"i64",f:"f32",d:"f64"},f={parameters:[],results:[]};for(c=1;4>c;++c)f.parameters.push(d["viii"[c]]);
c=new WebAssembly.Function(f,a)}else{d=[1,0,1,96];f={i:127,j:126,f:125,d:124};d.push(3);for(c=0;3>c;++c)d.push(f["iii"[c]]);d.push(0);d[1]=d.length-2;c=new Uint8Array([0,97,115,109,1,0,0,0].concat(d,[2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0]));c=new WebAssembly.Module(c);c=(new WebAssembly.Instance(c,{e:{f:a}})).exports.f}J.set(b,c)}Ka.set(a,b);a=b}return a}function ra(a){ua(a)}var La;e.wasmBinary&&(La=e.wasmBinary);var noExitRuntime;e.noExitRuntime&&(noExitRuntime=e.noExitRuntime);
"object"!==typeof WebAssembly&&K("no native wasm support detected");
function pa(a){var b="i32";"*"===b.charAt(b.length-1)&&(b="i32");switch(b){case "i1":x[a>>0]=0;break;case "i8":x[a>>0]=0;break;case "i16":Ma[a>>1]=0;break;case "i32":I[a>>2]=0;break;case "i64":L=[0,(M=0,1<=+Na(M)?0<M?(Oa(+Pa(M/4294967296),4294967295)|0)>>>0:~~+Qa((M-+(~~M>>>0))/4294967296)>>>0:0)];I[a>>2]=L[0];I[a+4>>2]=L[1];break;case "float":Ra[a>>2]=0;break;case "double":Sa[a>>3]=0;break;default:K("invalid type for setValue: "+b)}}
function p(a,b){b=b||"i8";"*"===b.charAt(b.length-1)&&(b="i32");switch(b){case "i1":return x[a>>0];case "i8":return x[a>>0];case "i16":return Ma[a>>1];case "i32":return I[a>>2];case "i64":return I[a>>2];case "float":return Ra[a>>2];case "double":return Sa[a>>3];default:K("invalid type for getValue: "+b)}return null}var Ta,J=new WebAssembly.Table({initial:390,element:"anyfunc"}),Ua=!1;function assert(a,b){a||K("Assertion failed: "+b)}
function Va(a){var b=e["_"+a];assert(b,"Cannot call unknown function "+a+", make sure it is exported");return b}
function Wa(a,b,c,d){var f={string:function(v){var B=0;if(null!==v&&void 0!==v&&0!==v){var H=(v.length<<2)+1;B=u(H);y(v,N,B,H)}return B},array:function(v){var B=u(v.length);x.set(v,B);return B}},g=Va(a),n=[];a=0;if(d)for(var t=0;t<d.length;t++){var w=f[c[t]];w?(0===a&&(a=na()),n[t]=w(d[t])):n[t]=d[t]}c=g.apply(null,n);c=function(v){return"string"===b?O(v):"boolean"===b?!!v:v}(c);0!==a&&qa(a);return c}var Xa=0,Ya=3;
function la(a){var b=Xa;if("number"===typeof a){var c=!0;var d=a}else c=!1,d=a.length;var f;b==Ya?f=g:f=[Za,u,Ha][b](Math.max(d,1));if(c){var g=f;assert(0==(f&3));for(a=f+(d&-4);g<a;g+=4)I[g>>2]=0;for(a=f+d;g<a;)x[g++>>0]=0;return f}a.subarray||a.slice?N.set(a,f):N.set(new Uint8Array(a),f);return f}var $a="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function ab(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&$a)return $a.decode(a.subarray(b,c));for(d="";b<c;){var f=a[b++];if(f&128){var g=a[b++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|g);else{var n=a[b++]&63;f=224==(f&240)?(f&15)<<12|g<<6|n:(f&7)<<18|g<<12|n<<6|a[b++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d}function O(a){return a?ab(N,a,void 0):""}
function y(a,b,c,d){if(!(0<d))return 0;var f=c;d=c+d-1;for(var g=0;g<a.length;++g){var n=a.charCodeAt(g);if(55296<=n&&57343>=n){var t=a.charCodeAt(++g);n=65536+((n&1023)<<10)|t&1023}if(127>=n){if(c>=d)break;b[c++]=n}else{if(2047>=n){if(c+1>=d)break;b[c++]=192|n>>6}else{if(65535>=n){if(c+2>=d)break;b[c++]=224|n>>12}else{if(c+3>=d)break;b[c++]=240|n>>18;b[c++]=128|n>>12&63}b[c++]=128|n>>6&63}b[c++]=128|n&63}}b[c]=0;return c-f}
function oa(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}function bb(a){var b=oa(a)+1,c=Za(b);c&&y(a,x,c,b);return c}var cb,x,N,Ma,I,Ra,Sa;
function db(a){cb=a;e.HEAP8=x=new Int8Array(a);e.HEAP16=Ma=new Int16Array(a);e.HEAP32=I=new Int32Array(a);e.HEAPU8=N=new Uint8Array(a);e.HEAPU16=new Uint16Array(a);e.HEAPU32=new Uint32Array(a);e.HEAPF32=Ra=new Float32Array(a);e.HEAPF64=Sa=new Float64Array(a)}var Ia=63376,eb=e.INITIAL_MEMORY||16777216;e.wasmMemory?Ta=e.wasmMemory:Ta=new WebAssembly.Memory({initial:eb/65536,maximum:32768});Ta&&(cb=Ta.buffer);eb=cb.byteLength;db(cb);I[Ia>>2]=5306416;
function fb(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(e);else{var c=b.zb;"number"===typeof c?void 0===b.gb?e.dynCall_v(c):e.dynCall_vi(c,b.gb):c(void 0===b.gb?null:b.gb)}}}var gb=[],hb=[],ib=[],jb=[];function kb(){var a=e.preRun.shift();gb.unshift(a)}var Na=Math.abs,Qa=Math.ceil,Pa=Math.floor,Oa=Math.min,lb=0,mb=null,nb=null;e.preloadedImages={};e.preloadedAudios={};
function K(a){if(e.onAbort)e.onAbort(a);G(a);Ua=!0;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}function ob(a){var b=pb;return String.prototype.startsWith?b.startsWith(a):0===b.indexOf(a)}function qb(){return ob("data:application/octet-stream;base64,")}var pb="sql-wasm.wasm";if(!qb()){var rb=pb;pb=e.locateFile?e.locateFile(rb,F):F+rb}
function sb(){try{if(La)return new Uint8Array(La);if(Da)return Da(pb);throw"both async and sync fetching of the wasm failed";}catch(a){K(a)}}function tb(){return La||!ya&&!C||"function"!==typeof fetch||ob("file://")?new Promise(function(a){a(sb())}):fetch(pb,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+pb+"'";return a.arrayBuffer()}).catch(function(){return sb()})}var M,L;hb.push({zb:function(){wb()}});
function xb(a){return a.replace(/\b_Z[\w\d_]+/g,function(b){return b===b?b:b+" ["+b+"]"})}function yb(a,b){for(var c=0,d=a.length-1;0<=d;d--){var f=a[d];"."===f?a.splice(d,1):".."===f?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a}function k(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=yb(a.split("/").filter(function(d){return!!d}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a}
function zb(a){var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b}function Bb(a){if("/"===a)return"/";var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)}function Cb(a){I[Db()>>2]=a}
function Eb(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!==typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=yb(a.split("/").filter(function(d){return!!d}),!b).join("/");return(b?"/":"")+a||"."}var Fb=[];function Gb(a,b){Fb[a]={input:[],output:[],Za:b};Hb(a,Ib)}
var Ib={open:function(a){var b=Fb[a.node.rdev];if(!b)throw new Q(43);a.tty=b;a.seekable=!1},close:function(a){a.tty.Za.flush(a.tty)},flush:function(a){a.tty.Za.flush(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.Za.pb)throw new Q(60);for(var f=0,g=0;g<d;g++){try{var n=a.tty.Za.pb(a.tty)}catch(t){throw new Q(29);}if(void 0===n&&0===f)throw new Q(6);if(null===n||void 0===n)break;f++;b[c+g]=n}f&&(a.node.timestamp=Date.now());return f},write:function(a,b,c,d){if(!a.tty||!a.tty.Za.ib)throw new Q(60);
try{for(var f=0;f<d;f++)a.tty.Za.ib(a.tty,b[c+f])}catch(g){throw new Q(29);}d&&(a.node.timestamp=Date.now());return f}},Jb={pb:function(a){if(!a.input.length){var b=null;if(za){var c=Buffer.rb?Buffer.rb(256):new Buffer(256),d=0;try{d=Ea.readSync(process.stdin.fd,c,0,256,null)}catch(f){if(-1!=f.toString().indexOf("EOF"))d=0;else throw f;}0<d?b=c.slice(0,d).toString("utf-8"):b=null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==
typeof readline&&(b=readline(),null!==b&&(b+="\n"));if(!b)return null;a.input=ka(b,!0)}return a.input.shift()},ib:function(a,b){null===b||10===b?(Ga(ab(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(Ga(ab(a.output,0)),a.output=[])}},Kb={ib:function(a,b){null===b||10===b?(G(ab(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(G(ab(a.output,0)),a.output=[])}},R={Sa:null,Ta:function(){return R.createNode(null,
"/",16895,0)},createNode:function(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new Q(63);R.Sa||(R.Sa={dir:{node:{Ra:R.Ka.Ra,Qa:R.Ka.Qa,lookup:R.Ka.lookup,$a:R.Ka.$a,rename:R.Ka.rename,unlink:R.Ka.unlink,rmdir:R.Ka.rmdir,readdir:R.Ka.readdir,symlink:R.Ka.symlink},stream:{Wa:R.La.Wa}},file:{node:{Ra:R.Ka.Ra,Qa:R.Ka.Qa},stream:{Wa:R.La.Wa,read:R.La.read,write:R.La.write,kb:R.La.kb,ab:R.La.ab,bb:R.La.bb}},link:{node:{Ra:R.Ka.Ra,Qa:R.Ka.Qa,readlink:R.Ka.readlink},stream:{}},mb:{node:{Ra:R.Ka.Ra,
Qa:R.Ka.Qa},stream:Lb}});c=Mb(a,b,c,d);S(c.mode)?(c.Ka=R.Sa.dir.node,c.La=R.Sa.dir.stream,c.Ja={}):32768===(c.mode&61440)?(c.Ka=R.Sa.file.node,c.La=R.Sa.file.stream,c.Pa=0,c.Ja=null):40960===(c.mode&61440)?(c.Ka=R.Sa.link.node,c.La=R.Sa.link.stream):8192===(c.mode&61440)&&(c.Ka=R.Sa.mb.node,c.La=R.Sa.mb.stream);c.timestamp=Date.now();a&&(a.Ja[b]=c);return c},Kb:function(a){if(a.Ja&&a.Ja.subarray){for(var b=[],c=0;c<a.Pa;++c)b.push(a.Ja[c]);return b}return a.Ja},Lb:function(a){return a.Ja?a.Ja.subarray?
a.Ja.subarray(0,a.Pa):new Uint8Array(a.Ja):new Uint8Array(0)},nb:function(a,b){var c=a.Ja?a.Ja.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>0),0!=c&&(b=Math.max(b,256)),c=a.Ja,a.Ja=new Uint8Array(b),0<a.Pa&&a.Ja.set(c.subarray(0,a.Pa),0))},Hb:function(a,b){if(a.Pa!=b)if(0==b)a.Ja=null,a.Pa=0;else{if(!a.Ja||a.Ja.subarray){var c=a.Ja;a.Ja=new Uint8Array(b);c&&a.Ja.set(c.subarray(0,Math.min(b,a.Pa)))}else if(a.Ja||(a.Ja=[]),a.Ja.length>b)a.Ja.length=b;else for(;a.Ja.length<b;)a.Ja.push(0);a.Pa=
b}},Ka:{Ra:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;S(a.mode)?b.size=4096:32768===(a.mode&61440)?b.size=a.Pa:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.yb=4096;b.blocks=Math.ceil(b.size/b.yb);return b},Qa:function(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);void 0!==b.size&&R.Hb(a,
b.size)},lookup:function(){throw Nb[44];},$a:function(a,b,c,d){return R.createNode(a,b,c,d)},rename:function(a,b,c){if(S(a.mode)){try{var d=Ob(b,c)}catch(g){}if(d)for(var f in d.Ja)throw new Q(55);}delete a.parent.Ja[a.name];a.name=c;b.Ja[c]=a;a.parent=b},unlink:function(a,b){delete a.Ja[b]},rmdir:function(a,b){var c=Ob(a,b),d;for(d in c.Ja)throw new Q(55);delete a.Ja[b]},readdir:function(a){var b=[".",".."],c;for(c in a.Ja)a.Ja.hasOwnProperty(c)&&b.push(c);return b},symlink:function(a,b,c){a=R.createNode(a,
b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new Q(28);return a.link}},La:{read:function(a,b,c,d,f){var g=a.node.Ja;if(f>=a.node.Pa)return 0;a=Math.min(a.node.Pa-f,d);if(8<a&&g.subarray)b.set(g.subarray(f,f+a),c);else for(d=0;d<a;d++)b[c+d]=g[f+d];return a},write:function(a,b,c,d,f,g){b.buffer===x.buffer&&(g=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.Ja||a.Ja.subarray)){if(g)return a.Ja=b.subarray(c,c+d),a.Pa=d;if(0===a.Pa&&0===f)return a.Ja=
b.slice(c,c+d),a.Pa=d;if(f+d<=a.Pa)return a.Ja.set(b.subarray(c,c+d),f),d}R.nb(a,f+d);if(a.Ja.subarray&&b.subarray)a.Ja.set(b.subarray(c,c+d),f);else for(g=0;g<d;g++)a.Ja[f+g]=b[c+g];a.Pa=Math.max(a.Pa,f+d);return d},Wa:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.Pa);if(0>b)throw new Q(28);return b},kb:function(a,b,c){R.nb(a.node,b+c);a.node.Pa=Math.max(a.node.Pa,b+c)},ab:function(a,b,c,d,f,g){assert(0===b);if(32768!==(a.node.mode&61440))throw new Q(43);a=a.node.Ja;
if(g&2||a.buffer!==cb){if(0<d||d+c<a.length)a.subarray?a=a.subarray(d,d+c):a=Array.prototype.slice.call(a,d,d+c);d=!0;g=16384*Math.ceil(c/16384);for(b=Za(g);c<g;)x[b+c++]=0;c=b;if(!c)throw new Q(48);x.set(a,c)}else d=!1,c=a.byteOffset;return{Gb:c,eb:d}},bb:function(a,b,c,d,f){if(32768!==(a.node.mode&61440))throw new Q(43);if(f&2)return 0;R.La.write(a,b,0,d,c,!1);return 0}}},Pb=null,Qb={},T=[],Rb=1,U=null,Sb=!0,V={},Q=null,Nb={};
function W(a,b){a=Eb("/",a);b=b||{};if(!a)return{path:"",node:null};var c={ob:!0,jb:0},d;for(d in c)void 0===b[d]&&(b[d]=c[d]);if(8<b.jb)throw new Q(32);a=yb(a.split("/").filter(function(n){return!!n}),!1);var f=Pb;c="/";for(d=0;d<a.length;d++){var g=d===a.length-1;if(g&&b.parent)break;f=Ob(f,a[d]);c=k(c+"/"+a[d]);f.Xa&&(!g||g&&b.ob)&&(f=f.Xa.root);if(!g||b.Va)for(g=0;40960===(f.mode&61440);)if(f=Tb(c),c=Eb(zb(c),f),f=W(c,{jb:b.jb}).node,40<g++)throw new Q(32);}return{path:c,node:f}}
function Ub(a){for(var b;;){if(a===a.parent)return a=a.Ta.qb,b?"/"!==a[a.length-1]?a+"/"+b:a+b:a;b=b?a.name+"/"+b:a.name;a=a.parent}}function Vb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%U.length}function Wb(a){var b=Vb(a.parent.id,a.name);if(U[b]===a)U[b]=a.Ya;else for(b=U[b];b;){if(b.Ya===a){b.Ya=a.Ya;break}b=b.Ya}}
function Ob(a,b){var c;if(c=(c=Xb(a,"x"))?c:a.Ka.lookup?0:2)throw new Q(c,a);for(c=U[Vb(a.id,b)];c;c=c.Ya){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.Ka.lookup(a,b)}function Mb(a,b,c,d){a=new Yb(a,b,c,d);b=Vb(a.parent.id,a.name);a.Ya=U[b];return U[b]=a}function S(a){return 16384===(a&61440)}var Zb={r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218};
function $b(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function Xb(a,b){if(Sb)return 0;if(-1===b.indexOf("r")||a.mode&292){if(-1!==b.indexOf("w")&&!(a.mode&146)||-1!==b.indexOf("x")&&!(a.mode&73))return 2}else return 2;return 0}function ac(a,b){try{return Ob(a,b),20}catch(c){}return Xb(a,"wx")}function bc(a,b,c){try{var d=Ob(a,b)}catch(f){return f.Ma}if(a=Xb(a,"wx"))return a;if(c){if(!S(d.mode))return 54;if(d===d.parent||"/"===Ub(d))return 10}else if(S(d.mode))return 31;return 0}
function cc(a){var b=4096;for(a=a||0;a<=b;a++)if(!T[a])return a;throw new Q(33);}function dc(a,b){ec||(ec=function(){},ec.prototype={});var c=new ec,d;for(d in a)c[d]=a[d];a=c;b=cc(b);a.fd=b;return T[b]=a}var Lb={open:function(a){a.La=Qb[a.node.rdev].La;a.La.open&&a.La.open(a)},Wa:function(){throw new Q(70);}};function Hb(a,b){Qb[a]={La:b}}
function fc(a,b){var c="/"===b,d=!b;if(c&&Pb)throw new Q(10);if(!c&&!d){var f=W(b,{ob:!1});b=f.path;f=f.node;if(f.Xa)throw new Q(10);if(!S(f.mode))throw new Q(54);}b={type:a,Mb:{},qb:b,Eb:[]};a=a.Ta(b);a.Ta=b;b.root=a;c?Pb=a:f&&(f.Xa=b,f.Ta&&f.Ta.Eb.push(b))}function ba(a,b,c){var d=W(a,{parent:!0}).node;a=Bb(a);if(!a||"."===a||".."===a)throw new Q(28);var f=ac(d,a);if(f)throw new Q(f);if(!d.Ka.$a)throw new Q(63);return d.Ka.$a(d,a,b,c)}function X(a,b){ba(a,(void 0!==b?b:511)&1023|16384,0)}
function hc(a,b,c){"undefined"===typeof c&&(c=b,b=438);ba(a,b|8192,c)}function ic(a,b){if(!Eb(a))throw new Q(44);var c=W(b,{parent:!0}).node;if(!c)throw new Q(44);b=Bb(b);var d=ac(c,b);if(d)throw new Q(d);if(!c.Ka.symlink)throw new Q(63);c.Ka.symlink(c,b,a)}
function ta(a){var b=W(a,{parent:!0}).node,c=Bb(a),d=Ob(b,c),f=bc(b,c,!1);if(f)throw new Q(f);if(!b.Ka.unlink)throw new Q(63);if(d.Xa)throw new Q(10);try{V.willDeletePath&&V.willDeletePath(a)}catch(g){G("FS.trackingDelegate['willDeletePath']('"+a+"') threw an exception: "+g.message)}b.Ka.unlink(b,c);Wb(d);try{if(V.onDeletePath)V.onDeletePath(a)}catch(g){G("FS.trackingDelegate['onDeletePath']('"+a+"') threw an exception: "+g.message)}}
function Tb(a){a=W(a).node;if(!a)throw new Q(44);if(!a.Ka.readlink)throw new Q(28);return Eb(Ub(a.parent),a.Ka.readlink(a))}function jc(a,b){a=W(a,{Va:!b}).node;if(!a)throw new Q(44);if(!a.Ka.Ra)throw new Q(63);return a.Ka.Ra(a)}function kc(a){return jc(a,!0)}function ca(a,b){var c;"string"===typeof a?c=W(a,{Va:!0}).node:c=a;if(!c.Ka.Qa)throw new Q(63);c.Ka.Qa(c,{mode:b&4095|c.mode&-4096,timestamp:Date.now()})}
function lc(a){var b;"string"===typeof a?b=W(a,{Va:!0}).node:b=a;if(!b.Ka.Qa)throw new Q(63);b.Ka.Qa(b,{timestamp:Date.now()})}function mc(a,b){if(0>b)throw new Q(28);var c;"string"===typeof a?c=W(a,{Va:!0}).node:c=a;if(!c.Ka.Qa)throw new Q(63);if(S(c.mode))throw new Q(31);if(32768!==(c.mode&61440))throw new Q(28);if(a=Xb(c,"w"))throw new Q(a);c.Ka.Qa(c,{size:b,timestamp:Date.now()})}
function m(a,b,c,d){if(""===a)throw new Q(44);if("string"===typeof b){var f=Zb[b];if("undefined"===typeof f)throw Error("Unknown file open mode: "+b);b=f}c=b&64?("undefined"===typeof c?438:c)&4095|32768:0;if("object"===typeof a)var g=a;else{a=k(a);try{g=W(a,{Va:!(b&131072)}).node}catch(n){}}f=!1;if(b&64)if(g){if(b&128)throw new Q(20);}else g=ba(a,c,0),f=!0;if(!g)throw new Q(44);8192===(g.mode&61440)&&(b&=-513);if(b&65536&&!S(g.mode))throw new Q(54);if(!f&&(c=g?40960===(g.mode&61440)?32:S(g.mode)&&
("r"!==$b(b)||b&512)?31:Xb(g,$b(b)):44))throw new Q(c);b&512&&mc(g,0);b&=-131713;d=dc({node:g,path:Ub(g),flags:b,seekable:!0,position:0,La:g.La,Jb:[],error:!1},d);d.La.open&&d.La.open(d);!e.logReadFiles||b&1||(nc||(nc={}),a in nc||(nc[a]=1,G("FS.trackingDelegate error on read file: "+a)));try{V.onOpenFile&&(g=0,1!==(b&2097155)&&(g|=1),0!==(b&2097155)&&(g|=2),V.onOpenFile(a,g))}catch(n){G("FS.trackingDelegate['onOpenFile']('"+a+"', flags) threw an exception: "+n.message)}return d}
function ea(a){if(null===a.fd)throw new Q(8);a.hb&&(a.hb=null);try{a.La.close&&a.La.close(a)}catch(b){throw b;}finally{T[a.fd]=null}a.fd=null}function oc(a,b,c){if(null===a.fd)throw new Q(8);if(!a.seekable||!a.La.Wa)throw new Q(70);if(0!=c&&1!=c&&2!=c)throw new Q(28);a.position=a.La.Wa(a,b,c);a.Jb=[]}
function pc(a,b,c,d,f){if(0>d||0>f)throw new Q(28);if(null===a.fd)throw new Q(8);if(1===(a.flags&2097155))throw new Q(8);if(S(a.node.mode))throw new Q(31);if(!a.La.read)throw new Q(28);var g="undefined"!==typeof f;if(!g)f=a.position;else if(!a.seekable)throw new Q(70);b=a.La.read(a,b,c,d,f);g||(a.position+=b);return b}
function da(a,b,c,d,f,g){if(0>d||0>f)throw new Q(28);if(null===a.fd)throw new Q(8);if(0===(a.flags&2097155))throw new Q(8);if(S(a.node.mode))throw new Q(31);if(!a.La.write)throw new Q(28);a.seekable&&a.flags&1024&&oc(a,0,2);var n="undefined"!==typeof f;if(!n)f=a.position;else if(!a.seekable)throw new Q(70);b=a.La.write(a,b,c,d,f,g);n||(a.position+=b);try{if(a.path&&V.onWriteToFile)V.onWriteToFile(a.path)}catch(t){G("FS.trackingDelegate['onWriteToFile']('"+a.path+"') threw an exception: "+t.message)}return b}
function sa(a){var b={encoding:"binary"};b=b||{};b.flags=b.flags||"r";b.encoding=b.encoding||"binary";if("utf8"!==b.encoding&&"binary"!==b.encoding)throw Error('Invalid encoding type "'+b.encoding+'"');var c,d=m(a,b.flags);a=jc(a).size;var f=new Uint8Array(a);pc(d,f,0,a,0);"utf8"===b.encoding?c=ab(f,0):"binary"===b.encoding&&(c=f);ea(d);return c}
function qc(){Q||(Q=function(a,b){this.node=b;this.Ib=function(c){this.Ma=c};this.Ib(a);this.message="FS error"},Q.prototype=Error(),Q.prototype.constructor=Q,[44].forEach(function(a){Nb[a]=new Q(a);Nb[a].stack="<generic error, no stack>"}))}var Rc;function aa(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
function Sc(a,b,c){a=k("/dev/"+a);var d=aa(!!b,!!c);Uc||(Uc=64);var f=Uc++<<8|0;Hb(f,{open:function(g){g.seekable=!1},close:function(){c&&c.buffer&&c.buffer.length&&c(10)},read:function(g,n,t,w){for(var v=0,B=0;B<w;B++){try{var H=b()}catch(ha){throw new Q(29);}if(void 0===H&&0===v)throw new Q(6);if(null===H||void 0===H)break;v++;n[t+B]=H}v&&(g.node.timestamp=Date.now());return v},write:function(g,n,t,w){for(var v=0;v<w;v++)try{c(n[t+v])}catch(B){throw new Q(29);}w&&(g.node.timestamp=Date.now());return v}});
hc(a,d,f)}var Uc,Y={},ec,nc,Vc={};
function Wc(a,b,c){try{var d=a(b)}catch(f){if(f&&f.node&&k(b)!==k(Ub(f.node)))return-54;throw f;}I[c>>2]=d.dev;I[c+4>>2]=0;I[c+8>>2]=d.ino;I[c+12>>2]=d.mode;I[c+16>>2]=d.nlink;I[c+20>>2]=d.uid;I[c+24>>2]=d.gid;I[c+28>>2]=d.rdev;I[c+32>>2]=0;L=[d.size>>>0,(M=d.size,1<=+Na(M)?0<M?(Oa(+Pa(M/4294967296),4294967295)|0)>>>0:~~+Qa((M-+(~~M>>>0))/4294967296)>>>0:0)];I[c+40>>2]=L[0];I[c+44>>2]=L[1];I[c+48>>2]=4096;I[c+52>>2]=d.blocks;I[c+56>>2]=d.atime.getTime()/1E3|0;I[c+60>>2]=0;I[c+64>>2]=d.mtime.getTime()/
1E3|0;I[c+68>>2]=0;I[c+72>>2]=d.ctime.getTime()/1E3|0;I[c+76>>2]=0;L=[d.ino>>>0,(M=d.ino,1<=+Na(M)?0<M?(Oa(+Pa(M/4294967296),4294967295)|0)>>>0:~~+Qa((M-+(~~M>>>0))/4294967296)>>>0:0)];I[c+80>>2]=L[0];I[c+84>>2]=L[1];return 0}var Xc=void 0;function Yc(){Xc+=4;return I[Xc-4>>2]}function Z(a){a=T[a];if(!a)throw new Q(8);return a}var Zc={};
function $c(){if(!ad){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"===typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:xa||"./this.program"},b;for(b in Zc)a[b]=Zc[b];var c=[];for(b in a)c.push(b+"="+a[b]);ad=c}return ad}var ad;y("GMT",N,63440,4);
function bd(){function a(g){return(g=g.toTimeString().match(/\(([A-Za-z ]+)\)$/))?g[1]:"GMT"}if(!cd){cd=!0;I[dd()>>2]=60*(new Date).getTimezoneOffset();var b=(new Date).getFullYear(),c=new Date(b,0,1);b=new Date(b,6,1);I[ed()>>2]=Number(c.getTimezoneOffset()!=b.getTimezoneOffset());var d=a(c),f=a(b);d=bb(d);f=bb(f);b.getTimezoneOffset()<c.getTimezoneOffset()?(I[fd()>>2]=d,I[fd()+4>>2]=f):(I[fd()>>2]=f,I[fd()+4>>2]=d)}}var cd,gd;
za?gd=function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:"undefined"!==typeof dateNow?gd=dateNow:gd=function(){return performance.now()};function hd(a){for(var b=gd();gd()-b<a/1E3;);}e._usleep=hd;function Yb(a,b,c,d){a||(a=this);this.parent=a;this.Ta=a.Ta;this.Xa=null;this.id=Rb++;this.name=b;this.mode=c;this.Ka={};this.La={};this.rdev=d}
Object.defineProperties(Yb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}});qc();U=Array(4096);fc(R,"/");X("/tmp");X("/home");X("/home/web_user");
(function(){X("/dev");Hb(259,{read:function(){return 0},write:function(d,f,g,n){return n}});hc("/dev/null",259);Gb(1280,Jb);Gb(1536,Kb);hc("/dev/tty",1280);hc("/dev/tty1",1536);if("object"===typeof crypto&&"function"===typeof crypto.getRandomValues){var a=new Uint8Array(1);var b=function(){crypto.getRandomValues(a);return a[0]}}else if(za)try{var c=require("crypto");b=function(){return c.randomBytes(1)[0]}}catch(d){}b||(b=function(){K("random_device")});Sc("random",b);Sc("urandom",b);X("/dev/shm");
X("/dev/shm/tmp")})();X("/proc");X("/proc/self");X("/proc/self/fd");fc({Ta:function(){var a=Mb("/proc/self","fd",16895,73);a.Ka={lookup:function(b,c){var d=T[+c];if(!d)throw new Q(8);b={parent:null,Ta:{qb:"fake"},Ka:{readlink:function(){return d.path}}};return b.parent=b}};return a}},"/proc/self/fd");function ka(a,b){var c=Array(oa(a)+1);a=y(a,c,0,c.length);b&&(c.length=a);return c}
var kd={a:function(a,b,c,d){K("Assertion failed: "+O(a)+", at: "+[b?O(b):"unknown filename",c,d?O(d):"unknown function"])},H:function(a,b){try{a=O(a);if(b&-8)var c=-28;else{var d;(d=W(a,{Va:!0}).node)?(a="",b&4&&(a+="r"),b&2&&(a+="w"),b&1&&(a+="x"),c=a&&Xb(d,a)?-2:0):c=-44}return c}catch(f){return"undefined"!==typeof Y&&f instanceof Q||K(f),-f.Ma}},s:function(a,b){try{return a=O(a),ca(a,b),0}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),-c.Ma}},y:function(a){try{return a=O(a),lc(a),
0}catch(b){return"undefined"!==typeof Y&&b instanceof Q||K(b),-b.Ma}},t:function(a,b){try{var c=T[a];if(!c)throw new Q(8);ca(c.node,b);return 0}catch(d){return"undefined"!==typeof Y&&d instanceof Q||K(d),-d.Ma}},z:function(a){try{var b=T[a];if(!b)throw new Q(8);lc(b.node);return 0}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),-c.Ma}},b:function(a,b,c){Xc=c;try{var d=Z(a);switch(b){case 0:var f=Yc();return 0>f?-28:m(d.path,d.flags,0,f).fd;case 1:case 2:return 0;case 3:return d.flags;
case 4:return f=Yc(),d.flags|=f,0;case 12:return f=Yc(),Ma[f+0>>1]=2,0;case 13:case 14:return 0;case 16:case 8:return-28;case 9:return Cb(28),-1;default:return-28}}catch(g){return"undefined"!==typeof Y&&g instanceof Q||K(g),-g.Ma}},v:function(a,b){try{var c=Z(a);return Wc(jc,c.path,b)}catch(d){return"undefined"!==typeof Y&&d instanceof Q||K(d),-d.Ma}},E:function(a,b,c){try{var d=T[a];if(!d)throw new Q(8);if(0===(d.flags&2097155))throw new Q(28);mc(d.node,c);return 0}catch(f){return"undefined"!==typeof Y&&
f instanceof Q||K(f),-f.Ma}},I:function(a,b){try{if(0===b)return-28;if(b<oa("/")+1)return-68;y("/",N,a,b);return a}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),-c.Ma}},C:function(){return 0},d:function(){return 42},u:function(a,b){try{return a=O(a),Wc(kc,a,b)}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),-c.Ma}},q:function(a,b){try{return a=O(a),a=k(a),"/"===a[a.length-1]&&(a=a.substr(0,a.length-1)),X(a,b),0}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),
-c.Ma}},i:function(a,b,c,d,f,g){try{a:{g<<=12;var n=!1;if(0!==(d&16)&&0!==a%16384)var t=-28;else{if(0!==(d&32)){var w=id(16384,b);if(!w){t=-48;break a}jd(w,0,b);n=!0}else{var v=T[f];if(!v){t=-8;break a}var B=g;if(0!==(c&2)&&0===(d&2)&&2!==(v.flags&2097155))throw new Q(2);if(1===(v.flags&2097155))throw new Q(2);if(!v.La.ab)throw new Q(43);var H=v.La.ab(v,a,b,B,c,d);w=H.Gb;n=H.eb}Vc[w]={Db:w,Cb:b,eb:n,fd:f,Fb:c,flags:d,offset:g};t=w}}return t}catch(ha){return"undefined"!==typeof Y&&ha instanceof Q||
K(ha),-ha.Ma}},j:function(a,b){try{if(-1===(a|0)||0===b)var c=-28;else{var d=Vc[a];if(d&&b===d.Cb){var f=T[d.fd];if(d.Fb&2){var g=d.flags,n=d.offset,t=N.slice(a,a+b);f&&f.La.bb&&f.La.bb(f,t,n,b,g)}Vc[a]=null;d.eb&&ma(d.Db)}c=0}return c}catch(w){return"undefined"!==typeof Y&&w instanceof Q||K(w),-w.Ma}},h:function(a,b,c){Xc=c;try{var d=O(a),f=Yc();return m(d,b,f).fd}catch(g){return"undefined"!==typeof Y&&g instanceof Q||K(g),-g.Ma}},w:function(a,b,c){try{var d=Z(a);return pc(d,x,b,c)}catch(f){return"undefined"!==
typeof Y&&f instanceof Q||K(f),-f.Ma}},B:function(a,b,c){try{a=O(a);if(0>=c)var d=-28;else{var f=Tb(a),g=Math.min(c,oa(f)),n=x[b+g];y(f,N,b,c+1);x[b+g]=n;d=g}return d}catch(t){return"undefined"!==typeof Y&&t instanceof Q||K(t),-t.Ma}},G:function(a){try{a=O(a);var b=W(a,{parent:!0}).node,c=Bb(a),d=Ob(b,c),f=bc(b,c,!0);if(f)throw new Q(f);if(!b.Ka.rmdir)throw new Q(63);if(d.Xa)throw new Q(10);try{V.willDeletePath&&V.willDeletePath(a)}catch(g){G("FS.trackingDelegate['willDeletePath']('"+a+"') threw an exception: "+
g.message)}b.Ka.rmdir(b,c);Wb(d);try{if(V.onDeletePath)V.onDeletePath(a)}catch(g){G("FS.trackingDelegate['onDeletePath']('"+a+"') threw an exception: "+g.message)}return 0}catch(g){return"undefined"!==typeof Y&&g instanceof Q||K(g),-g.Ma}},e:function(a,b){try{return a=O(a),Wc(jc,a,b)}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),-c.Ma}},F:function(a){try{return a=O(a),ta(a),0}catch(b){return"undefined"!==typeof Y&&b instanceof Q||K(b),-b.Ma}},m:function(a,b,c){N.copyWithin(a,b,b+c)},
c:function(a){a>>>=0;var b=N.length;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);d=Math.max(16777216,a,d);0<d%65536&&(d+=65536-d%65536);a:{try{Ta.grow(Math.min(2147483648,d)-cb.byteLength+65535>>>16);db(Ta.buffer);var f=1;break a}catch(g){}f=void 0}if(f)return!0}return!1},o:function(a,b){var c=0;$c().forEach(function(d,f){var g=b+c;f=I[a+4*f>>2]=g;for(g=0;g<d.length;++g)x[f++>>0]=d.charCodeAt(g);x[f>>0]=0;c+=d.length+1});return 0},p:function(a,b){var c=
$c();I[a>>2]=c.length;var d=0;c.forEach(function(f){d+=f.length+1});I[b>>2]=d;return 0},f:function(a){try{var b=Z(a);ea(b);return 0}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),c.Ma}},n:function(a,b){try{var c=Z(a);x[b>>0]=c.tty?2:S(c.mode)?3:40960===(c.mode&61440)?7:4;return 0}catch(d){return"undefined"!==typeof Y&&d instanceof Q||K(d),d.Ma}},l:function(a,b,c,d,f){try{var g=Z(a);a=4294967296*c+(b>>>0);if(-9007199254740992>=a||9007199254740992<=a)return-61;oc(g,a,d);L=[g.position>>>
0,(M=g.position,1<=+Na(M)?0<M?(Oa(+Pa(M/4294967296),4294967295)|0)>>>0:~~+Qa((M-+(~~M>>>0))/4294967296)>>>0:0)];I[f>>2]=L[0];I[f+4>>2]=L[1];g.hb&&0===a&&0===d&&(g.hb=null);return 0}catch(n){return"undefined"!==typeof Y&&n instanceof Q||K(n),n.Ma}},D:function(a){try{var b=Z(a);return b.La&&b.La.fsync?-b.La.fsync(b):0}catch(c){return"undefined"!==typeof Y&&c instanceof Q||K(c),c.Ma}},x:function(a,b,c,d){try{a:{for(var f=Z(a),g=a=0;g<c;g++){var n=da(f,x,I[b+8*g>>2],I[b+(8*g+4)>>2],void 0);if(0>n){var t=
-1;break a}a+=n}t=a}I[d>>2]=t;return 0}catch(w){return"undefined"!==typeof Y&&w instanceof Q||K(w),w.Ma}},g:function(a){var b=Date.now();I[a>>2]=b/1E3|0;I[a+4>>2]=b%1E3*1E3|0;return 0},k:function(a){bd();a=new Date(1E3*I[a>>2]);I[15848]=a.getSeconds();I[15849]=a.getMinutes();I[15850]=a.getHours();I[15851]=a.getDate();I[15852]=a.getMonth();I[15853]=a.getFullYear()-1900;I[15854]=a.getDay();var b=new Date(a.getFullYear(),0,1);I[15855]=(a.getTime()-b.getTime())/864E5|0;I[15857]=-(60*a.getTimezoneOffset());
var c=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();b=b.getTimezoneOffset();a=(c!=b&&a.getTimezoneOffset()==Math.min(b,c))|0;I[15856]=a;a=I[fd()+(a?4:0)>>2];I[15858]=a;return 63392},memory:Ta,J:function(a,b){if(0===a)return Cb(28),-1;var c=I[a>>2];a=I[a+4>>2];if(0>a||999999999<a||0>c)return Cb(28),-1;0!==b&&(I[b>>2]=0,I[b+4>>2]=0);return hd(1E6*c+a/1E3)},A:function(a){switch(a){case 30:return 16384;case 85:return 131072;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:case 79:return 200809;
case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;
case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1E3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:return"object"===typeof navigator?navigator.hardwareConcurrency||1:1}Cb(28);return-1},
table:J,K:function(a){var b=Date.now()/1E3|0;a&&(I[a>>2]=b);return b},r:function(a,b){if(b){var c=1E3*I[b+8>>2];c+=I[b+12>>2]/1E3}else c=Date.now();a=O(a);try{b=c;var d=W(a,{Va:!0}).node;d.Ka.Qa(d,{timestamp:Math.max(b,c)});return 0}catch(f){a=f;if(!(a instanceof Q)){a+=" : ";a:{d=Error();if(!d.stack){try{throw Error();}catch(g){d=g}if(!d.stack){d="(no stack trace available)";break a}}d=d.stack.toString()}e.extraStackTrace&&(d+="\n"+e.extraStackTrace());d=xb(d);throw a+d;}Cb(a.Ma);return-1}}};
(function(){function a(f){e.asm=f.exports;lb--;e.monitorRunDependencies&&e.monitorRunDependencies(lb);0==lb&&(null!==mb&&(clearInterval(mb),mb=null),nb&&(f=nb,nb=null,f()))}function b(f){a(f.instance)}function c(f){return tb().then(function(g){return WebAssembly.instantiate(g,d)}).then(f,function(g){G("failed to asynchronously prepare wasm: "+g);K(g)})}var d={a:kd};lb++;e.monitorRunDependencies&&e.monitorRunDependencies(lb);if(e.instantiateWasm)try{return e.instantiateWasm(d,a)}catch(f){return G("Module.instantiateWasm callback failed with error: "+
f),!1}(function(){if(La||"function"!==typeof WebAssembly.instantiateStreaming||qb()||ob("file://")||"function"!==typeof fetch)return c(b);fetch(pb,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,d).then(b,function(g){G("wasm streaming compile failed: "+g);G("falling back to ArrayBuffer instantiation");return c(b)})})})();return{}})();
var wb=e.___wasm_call_ctors=function(){return(wb=e.___wasm_call_ctors=e.asm.L).apply(null,arguments)},jd=e._memset=function(){return(jd=e._memset=e.asm.M).apply(null,arguments)};e._sqlite3_free=function(){return(e._sqlite3_free=e.asm.N).apply(null,arguments)};var Db=e.___errno_location=function(){return(Db=e.___errno_location=e.asm.O).apply(null,arguments)};e._sqlite3_finalize=function(){return(e._sqlite3_finalize=e.asm.P).apply(null,arguments)};
e._sqlite3_reset=function(){return(e._sqlite3_reset=e.asm.Q).apply(null,arguments)};e._sqlite3_clear_bindings=function(){return(e._sqlite3_clear_bindings=e.asm.R).apply(null,arguments)};e._sqlite3_value_blob=function(){return(e._sqlite3_value_blob=e.asm.S).apply(null,arguments)};e._sqlite3_value_text=function(){return(e._sqlite3_value_text=e.asm.T).apply(null,arguments)};e._sqlite3_value_bytes=function(){return(e._sqlite3_value_bytes=e.asm.U).apply(null,arguments)};
e._sqlite3_value_double=function(){return(e._sqlite3_value_double=e.asm.V).apply(null,arguments)};e._sqlite3_value_int=function(){return(e._sqlite3_value_int=e.asm.W).apply(null,arguments)};e._sqlite3_value_type=function(){return(e._sqlite3_value_type=e.asm.X).apply(null,arguments)};e._sqlite3_result_blob=function(){return(e._sqlite3_result_blob=e.asm.Y).apply(null,arguments)};e._sqlite3_result_double=function(){return(e._sqlite3_result_double=e.asm.Z).apply(null,arguments)};
e._sqlite3_result_error=function(){return(e._sqlite3_result_error=e.asm._).apply(null,arguments)};e._sqlite3_result_int=function(){return(e._sqlite3_result_int=e.asm.$).apply(null,arguments)};e._sqlite3_result_int64=function(){return(e._sqlite3_result_int64=e.asm.aa).apply(null,arguments)};e._sqlite3_result_null=function(){return(e._sqlite3_result_null=e.asm.ba).apply(null,arguments)};e._sqlite3_result_text=function(){return(e._sqlite3_result_text=e.asm.ca).apply(null,arguments)};
e._sqlite3_step=function(){return(e._sqlite3_step=e.asm.da).apply(null,arguments)};e._sqlite3_column_count=function(){return(e._sqlite3_column_count=e.asm.ea).apply(null,arguments)};e._sqlite3_data_count=function(){return(e._sqlite3_data_count=e.asm.fa).apply(null,arguments)};e._sqlite3_column_blob=function(){return(e._sqlite3_column_blob=e.asm.ga).apply(null,arguments)};e._sqlite3_column_bytes=function(){return(e._sqlite3_column_bytes=e.asm.ha).apply(null,arguments)};
e._sqlite3_column_double=function(){return(e._sqlite3_column_double=e.asm.ia).apply(null,arguments)};e._sqlite3_column_text=function(){return(e._sqlite3_column_text=e.asm.ja).apply(null,arguments)};e._sqlite3_column_type=function(){return(e._sqlite3_column_type=e.asm.ka).apply(null,arguments)};e._sqlite3_column_name=function(){return(e._sqlite3_column_name=e.asm.la).apply(null,arguments)};e._sqlite3_bind_blob=function(){return(e._sqlite3_bind_blob=e.asm.ma).apply(null,arguments)};
e._sqlite3_bind_double=function(){return(e._sqlite3_bind_double=e.asm.na).apply(null,arguments)};e._sqlite3_bind_int=function(){return(e._sqlite3_bind_int=e.asm.oa).apply(null,arguments)};e._sqlite3_bind_text=function(){return(e._sqlite3_bind_text=e.asm.pa).apply(null,arguments)};e._sqlite3_bind_parameter_index=function(){return(e._sqlite3_bind_parameter_index=e.asm.qa).apply(null,arguments)};e._sqlite3_errmsg=function(){return(e._sqlite3_errmsg=e.asm.ra).apply(null,arguments)};
e._sqlite3_exec=function(){return(e._sqlite3_exec=e.asm.sa).apply(null,arguments)};e._sqlite3_prepare_v2=function(){return(e._sqlite3_prepare_v2=e.asm.ta).apply(null,arguments)};e._sqlite3_changes=function(){return(e._sqlite3_changes=e.asm.ua).apply(null,arguments)};e._sqlite3_close_v2=function(){return(e._sqlite3_close_v2=e.asm.va).apply(null,arguments)};e._sqlite3_create_function_v2=function(){return(e._sqlite3_create_function_v2=e.asm.wa).apply(null,arguments)};
e._sqlite3_open=function(){return(e._sqlite3_open=e.asm.xa).apply(null,arguments)};var Za=e._malloc=function(){return(Za=e._malloc=e.asm.ya).apply(null,arguments)},ma=e._free=function(){return(ma=e._free=e.asm.za).apply(null,arguments)};e._RegisterExtensionFunctions=function(){return(e._RegisterExtensionFunctions=e.asm.Aa).apply(null,arguments)};
var fd=e.__get_tzname=function(){return(fd=e.__get_tzname=e.asm.Ba).apply(null,arguments)},ed=e.__get_daylight=function(){return(ed=e.__get_daylight=e.asm.Ca).apply(null,arguments)},dd=e.__get_timezone=function(){return(dd=e.__get_timezone=e.asm.Da).apply(null,arguments)},na=e.stackSave=function(){return(na=e.stackSave=e.asm.Ea).apply(null,arguments)},qa=e.stackRestore=function(){return(qa=e.stackRestore=e.asm.Fa).apply(null,arguments)},u=e.stackAlloc=function(){return(u=e.stackAlloc=e.asm.Ga).apply(null,
arguments)},id=e._memalign=function(){return(id=e._memalign=e.asm.Ha).apply(null,arguments)};e.dynCall_vi=function(){return(e.dynCall_vi=e.asm.Ia).apply(null,arguments)};e.cwrap=function(a,b,c,d){c=c||[];var f=c.every(function(g){return"number"===g});return"string"!==b&&f&&!d?Va(a):function(){return Wa(a,b,c,arguments)}};e.stackSave=na;e.stackRestore=qa;e.stackAlloc=u;var ld;nb=function md(){ld||nd();ld||(nb=md)};
function nd(){function a(){if(!ld&&(ld=!0,e.calledRun=!0,!Ua)){e.noFSInit||Rc||(Rc=!0,qc(),e.stdin=e.stdin,e.stdout=e.stdout,e.stderr=e.stderr,e.stdin?Sc("stdin",e.stdin):ic("/dev/tty","/dev/stdin"),e.stdout?Sc("stdout",null,e.stdout):ic("/dev/tty","/dev/stdout"),e.stderr?Sc("stderr",null,e.stderr):ic("/dev/tty1","/dev/stderr"),m("/dev/stdin","r"),m("/dev/stdout","w"),m("/dev/stderr","w"));fb(hb);Sb=!1;fb(ib);if(e.onRuntimeInitialized)e.onRuntimeInitialized();if(e.postRun)for("function"==typeof e.postRun&&
(e.postRun=[e.postRun]);e.postRun.length;){var b=e.postRun.shift();jb.unshift(b)}fb(jb)}}if(!(0<lb)){if(e.preRun)for("function"==typeof e.preRun&&(e.preRun=[e.preRun]);e.preRun.length;)kb();fb(gb);0<lb||(e.setStatus?(e.setStatus("Running..."),setTimeout(function(){setTimeout(function(){e.setStatus("")},1);a()},1)):a())}}e.run=nd;if(e.preInit)for("function"==typeof e.preInit&&(e.preInit=[e.preInit]);0<e.preInit.length;)e.preInit.pop()();noExitRuntime=!0;nd();


        // The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initSqlJsPromise;
} // The end of our initSqlJs function

// This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// However, we don't want to use the emcc modularization. See shell-pre.js
if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = initSqlJs;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initSqlJs;
}
else if (typeof define === 'function' && define['amd']) {
    define([], function() { return initSqlJs; });
}
else if (typeof exports === 'object'){
    exports["Module"] = initSqlJs;
}
/* global initSqlJs */
/* eslint-env worker */
/* eslint no-restricted-globals: ["error"] */

"use strict";

var db;

function onModuleReady(SQL) {
    function createDb(data) {
        if (db != null) db.close();
        db = new SQL.Database(data);
        return db;
    }

    var buff; var data; var result;
    data = this["data"];
    switch (data && data["action"]) {
        case "open":
            buff = data["buffer"];
            createDb(buff && new Uint8Array(buff));
            return postMessage({
                id: data["id"],
                ready: true
            });
        case "exec":
            if (db === null) {
                createDb();
            }
            if (!data["sql"]) {
                throw "exec: Missing query string";
            }
            return postMessage({
                id: data["id"],
                results: db.exec(data["sql"], data["params"])
            });
        case "each":
            if (db === null) {
                createDb();
            }
            var callback = function callback(row) {
                return postMessage({
                    id: data["id"],
                    row: row,
                    finished: false
                });
            };
            var done = function done() {
                return postMessage({
                    id: data["id"],
                    finished: true
                });
            };
            return db.each(data["sql"], data["params"], callback, done);
        case "export":
            buff = db["export"]();
            result = {
                id: data["id"],
                buffer: buff
            };
            try {
                return postMessage(result, [result]);
            } catch (error) {
                return postMessage(result);
            }
        case "close":
            if (db) {
                db.close();
            }
            return postMessage({
                id: data["id"]
            });
        default:
            throw new Error("Invalid action : " + (data && data["action"]));
    }
}

function onError(err) {
    return postMessage({
        id: this["data"]["id"],
        error: err["message"]
    });
}

if (typeof importScripts === "function") {
    db = null;
    var sqlModuleReady = initSqlJs();
    self.onmessage = function onmessage(event) {
        return sqlModuleReady
            .then(onModuleReady.bind(event))
            .catch(onError.bind(event));
    };
}
