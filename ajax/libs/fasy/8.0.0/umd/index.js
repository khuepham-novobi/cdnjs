/*! fasy.js
	v8.0.0 (c) 2020 Kyle Simpson
	MIT License: http://getify.mit-license.org
*/

!function UMD(e,n,r,t){"function"==typeof define&&define.amd?(r=Object.keys(r).map((e=>e.replace(/^\.\//,""))),define(e,r,t)):"undefined"!=typeof module&&module.exports?(r=Object.keys(r).map((e=>require(e))),module.exports=t(...r)):(r=Object.values(r).map((e=>n[e])),n[e]=t(...r))}("FA","undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")(),{"./concurrent.js":"FA_Concurrent","./serial.js":"FA_Serial","./transducers.js":"FA_Transducers"},(function DEF(e,n,r){"use strict";var t=e,s=n,o=r;let u={};return u={concurrent:t,serial:s,transducers:o},u.concurrent=t,u.serial=s,u.transducers=o,u}));