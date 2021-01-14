/*! Monio: nothing.mjs
    v0.13.1 (c) 2021 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
var brand={};export default Object.assign(Nothing,{of:Nothing,pure:Nothing,unit:Nothing,is:is,isEmpty:isEmpty});function Nothing(){var n={map:noop,chain:noop,flatMap:noop,bind:noop,ap:noop,concat:noop,_inspect:function _inspect(){return`${n[Symbol.toStringTag]}()`},_is:function _is(n){return n===brand},[Symbol.toStringTag]:"Nothing"};return n;function noop(){return n}}function is(n){return n&&"function"==typeof n._is&&n._is(brand)}function isEmpty(n){return null==n}