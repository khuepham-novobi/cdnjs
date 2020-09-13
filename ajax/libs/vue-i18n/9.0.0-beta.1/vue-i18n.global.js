/*!
  * vue-i18n v9.0.0-beta.1
  * (c) 2020 kazuya kawaguchi
  * Released under the MIT License.
  */
var VueI18n = (function (exports, vue) {
  'use strict';

  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
      if (args.length === 1 && isObject(args[0])) {
          args = args[0];
      }
      if (!args || !args.hasOwnProperty) {
          args = {};
      }
      return message.replace(RE_ARGS, (match, identifier) => {
          return args.hasOwnProperty(identifier) ? args[identifier] : '';
      });
  }
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027');
  const isNumber = (val) => typeof val === 'number' && isFinite(val);
  const isDate = (val) => toTypeString(val) === '[object Date]';
  const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
      if (typeof console !== 'undefined') {
          console.warn('[vue-i18n] ' + msg);
          if (err) {
              console.warn(err.stack);
          }
      }
  }
  let _globalThis;
  const getGlobalThis = () => {
      return (_globalThis ||
          (_globalThis =
              typeof globalThis !== 'undefined'
                  ? globalThis
                  : typeof self !== 'undefined'
                      ? self
                      : typeof window !== 'undefined'
                          ? window
                          : typeof global !== 'undefined'
                              ? global
                              : {}));
  };
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isBoolean = (val) => typeof val === 'boolean';
  const isObject = (val) => val !== null && typeof val === 'object';
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  const toDisplayString = (val) => {
      return val == null
          ? ''
          : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
              ? JSON.stringify(val, null, 2)
              : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
      const lines = source.split(/\r?\n/);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
          count += lines[i].length + 1;
          if (count >= start) {
              for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                  if (j < 0 || j >= lines.length)
                      continue;
                  const line = j + 1;
                  res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                  const lineLength = lines[j].length;
                  if (j === i) {
                      const pad = start - (count - lineLength) + 1;
                      const length = Math.max(1, end > count ? lineLength - pad : end - start);
                      res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                  }
                  else if (j > i) {
                      if (end > count) {
                          const length = Math.max(Math.min(end - count, lineLength), 1);
                          res.push(`   |  ` + '^'.repeat(length));
                      }
                      count += lineLength + 1;
                  }
              }
              break;
          }
      }
      return res.join('\n');
  }

  let devtools;
  function setDevtoolsHook(hook) {
      devtools = hook;
  }
  function devtoolsRegisterI18n(i18n, version) {
      if (!devtools) {
          return;
      }
      devtools.emit("intlify:register", i18n, version);
  }

  const VERSION = "9.0.0-beta.1";
  function initDev() {
      const target = getGlobalThis();
      target.__INTLIFY__ = true;
      setDevtoolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
      {
          console.info(`You are running a development build of Vue.\n` +
              `Make sure to use the production build (*.prod.js) when deploying for production.`);
      }
  }

  function createPosition(line, column, offset) {
      return { line, column, offset };
  }
  function createLocation(start, end, source) {
      const loc = { start, end };
      if (source != null) {
          loc.source = source;
      }
      return loc;
  }

  const errorMessages = {
      [0]: `Expected token: '{0}'`,
      [1]: `Invalid token in placeholder: '{0}'`,
      [2]: `Unterminated single quote in placeholder`,
      [3]: `Unknown escape sequence: \\{0}`,
      [4]: `Invalid unicode escape sequence: {0}`,
      [5]: `Unbalanced closing brace`,
      [6]: `Unterminated closing brace`,
      [7]: `Empty placeholder`,
      [8]: `Not allowed nest placeholder`,
      [9]: `Invalid linked format`,
      [10]: `Plural must have messages`,
      [11]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, optinos = {}) {
      const { domain, messages, args } = optinos;
      const msg =  format((messages || errorMessages)[code] || '', ...(args || []))
          ;
      const error = new SyntaxError(String(msg));
      error.code = code;
      if (loc) {
          error.location = loc;
      }
      error.domain = domain;
      return error;
  }
  function defaultOnError(error) {
      throw error;
  }

  const CHAR_SP = ' ';
  const CHAR_CR = '\r';
  const CHAR_LF = '\n';
  const CHAR_LS = String.fromCharCode(0x2028);
  const CHAR_PS = String.fromCharCode(0x2029);
  function createScanner(str) {
      const _buf = str;
      let _index = 0;
      let _line = 1;
      let _column = 1;
      let _peekOffset = 0;
      const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
      const isLF = (index) => _buf[index] === CHAR_LF;
      const isPS = (index) => _buf[index] === CHAR_PS;
      const isLS = (index) => _buf[index] === CHAR_LS;
      const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
      const index = () => _index;
      const line = () => _line;
      const column = () => _column;
      const peekOffset = () => _peekOffset;
      const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
      const currentChar = () => charAt(_index);
      const currentPeek = () => charAt(_index + _peekOffset);
      function next() {
          _peekOffset = 0;
          if (isLineEnd(_index)) {
              _line++;
              _column = 0;
          }
          if (isCRLF(_index)) {
              _index++;
          }
          _index++;
          _column++;
          return _buf[_index];
      }
      function peek() {
          if (isCRLF(_index + _peekOffset)) {
              _peekOffset++;
          }
          _peekOffset++;
          return _buf[_index + _peekOffset];
      }
      function reset() {
          _index = 0;
          _line = 1;
          _column = 1;
          _peekOffset = 0;
      }
      function resetPeek(offset = 0) {
          _peekOffset = offset;
      }
      function skipToPeek() {
          const target = _index + _peekOffset;
          while (target !== _index) {
              next();
          }
          _peekOffset = 0;
      }
      return {
          index,
          line,
          column,
          peekOffset,
          charAt,
          currentChar,
          currentPeek,
          next,
          peek,
          reset,
          resetPeek,
          skipToPeek
      };
  }

  const EOF = undefined;
  const LITERAL_DELIMITER = "'";
  const ERROR_DOMAIN = 'tokenizer';
  function createTokenizer(source, options = {}) {
      const location = !options.location;
      const _scnr = createScanner(source);
      const currentOffset = () => _scnr.index();
      const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
      const _initLoc = currentPosition();
      const _initOffset = currentOffset();
      const _context = {
          currentType: 14,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 14,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: false,
          text: ''
      };
      const context = () => _context;
      const { onError } = options;
      function emitError(code, pos, offset, ...args) {
          const ctx = context();
          pos.column += offset;
          pos.offset += offset;
          if (onError) {
              const loc = createLocation(ctx.startLoc, pos);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN,
                  args
              });
              onError(err);
          }
      }
      function getToken(context, type, value) {
          context.endLoc = currentPosition();
          context.currentType = type;
          const token = { type };
          if (location) {
              token.loc = createLocation(context.startLoc, context.endLoc);
          }
          if (value != null) {
              token.value = value;
          }
          return token;
      }
      const getEndToken = (context) => getToken(context, 14);
      function eat(scnr, ch) {
          if (scnr.currentChar() === ch) {
              scnr.next();
              return ch;
          }
          else {
              emitError(0, currentPosition(), 0, ch);
              return '';
          }
      }
      function peekSpaces(scnr) {
          let buf = '';
          while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
              buf += scnr.currentPeek();
              scnr.peek();
          }
          return buf;
      }
      function skipSpaces(scnr) {
          const buf = peekSpaces(scnr);
          scnr.skipToPeek();
          return buf;
      }
      function isIdentifierStart(ch) {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return ((cc >= 97 && cc <= 122) ||
              (cc >= 65 && cc <= 90));
      }
      function isNumberStart(ch) {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57;
      }
      function isNamedIdentifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      }
      function isListIdentifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2) {
              return false;
          }
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
          const ret = isNumberStart(ch);
          scnr.resetPeek();
          return ret;
      }
      function isLiteralStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          scnr.resetPeek();
          return ret;
      }
      function isLinkedDotStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 8) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ".";
          scnr.resetPeek();
          return ret;
      }
      function isLinkedModifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 9) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      }
      function isLinkedDelimiterStart(scnr, context) {
          const { currentType } = context;
          if (!(currentType === 8 ||
              currentType === 12)) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":";
          scnr.resetPeek();
          return ret;
      }
      function isLinkedReferStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 10) {
              return false;
          }
          const fn = () => {
              const ch = scnr.currentPeek();
              if (ch === "{") {
                  return isIdentifierStart(scnr.peek());
              }
              else if (ch === "@" ||
                  ch === "%" ||
                  ch === "|" ||
                  ch === ":" ||
                  ch === "." ||
                  ch === CHAR_SP ||
                  !ch) {
                  return false;
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn();
              }
              else {
                  return isIdentifierStart(ch);
              }
          };
          const ret = fn();
          scnr.resetPeek();
          return ret;
      }
      function isPluralStart(scnr) {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|";
          scnr.resetPeek();
          return ret;
      }
      function isTextStart(scnr, reset = true) {
          const fn = (hasSpace = false, prev = '', detectModulo = false) => {
              const ch = scnr.currentPeek();
              if (ch === "{") {
                  return prev === "%" ? false : hasSpace;
              }
              else if (ch === "@" || !ch) {
                  return prev === "%" ? true : hasSpace;
              }
              else if (ch === "%") {
                  scnr.peek();
                  return fn(hasSpace, "%", true);
              }
              else if (ch === "|") {
                  return prev === "%" || detectModulo
                      ? true
                      : !(prev === CHAR_SP || prev === CHAR_LF);
              }
              else if (ch === CHAR_SP) {
                  scnr.peek();
                  return fn(true, CHAR_SP, detectModulo);
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn(true, CHAR_LF, detectModulo);
              }
              else {
                  return true;
              }
          };
          const ret = fn();
          reset && scnr.resetPeek();
          return ret;
      }
      function takeChar(scnr, fn) {
          const ch = scnr.currentChar();
          if (ch === EOF) {
              return EOF;
          }
          if (fn(ch)) {
              scnr.next();
              return ch;
          }
          return null;
      }
      function takeIdentifierChar(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 97 && cc <= 122) ||
                  (cc >= 65 && cc <= 90) ||
                  (cc >= 48 && cc <= 57) ||
                  cc === 95 ||
                  cc === 36);
          };
          return takeChar(scnr, closure);
      }
      function takeDigit(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return cc >= 48 && cc <= 57;
          };
          return takeChar(scnr, closure);
      }
      function takeHexDigit(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 48 && cc <= 57) ||
                  (cc >= 65 && cc <= 70) ||
                  (cc >= 97 && cc <= 102));
          };
          return takeChar(scnr, closure);
      }
      function getDigits(scnr) {
          let ch = '';
          let num = '';
          while ((ch = takeDigit(scnr))) {
              num += ch;
          }
          return num;
      }
      function readText(scnr) {
          const fn = (buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" ||
                  ch === "}" ||
                  ch === "@" ||
                  !ch) {
                  return buf;
              }
              else if (ch === "%") {
                  if (isTextStart(scnr)) {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
                  else {
                      return buf;
                  }
              }
              else if (ch === "|") {
                  return buf;
              }
              else if (ch === CHAR_SP || ch === CHAR_LF) {
                  if (isTextStart(scnr)) {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
                  else if (isPluralStart(scnr)) {
                      return buf;
                  }
                  else {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(buf);
              }
          };
          return fn('');
      }
      function readNamedIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          if (scnr.currentChar() === EOF) {
              emitError(6, currentPosition(), 0);
          }
          return name;
      }
      function readListIdentifier(scnr) {
          skipSpaces(scnr);
          let value = '';
          if (scnr.currentChar() === '-') {
              scnr.next();
              value += `-${getDigits(scnr)}`;
          }
          else {
              value += getDigits(scnr);
          }
          if (scnr.currentChar() === EOF) {
              emitError(6, currentPosition(), 0);
          }
          return value;
      }
      function readLiteral(scnr) {
          skipSpaces(scnr);
          eat(scnr, `\'`);
          let ch = '';
          let literal = '';
          const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
          while ((ch = takeChar(scnr, fn))) {
              if (ch === '\\') {
                  literal += readEscapeSequence(scnr);
              }
              else {
                  literal += ch;
              }
          }
          const current = scnr.currentChar();
          if (current === CHAR_LF || current === EOF) {
              emitError(2, currentPosition(), 0);
              if (current === CHAR_LF) {
                  scnr.next();
                  eat(scnr, `\'`);
              }
              return literal;
          }
          eat(scnr, `\'`);
          return literal;
      }
      function readEscapeSequence(scnr) {
          const ch = scnr.currentChar();
          switch (ch) {
              case '\\':
              case `\'`:
                  scnr.next();
                  return `\\${ch}`;
              case 'u':
                  return readUnicodeEscapeSequence(scnr, ch, 4);
              case 'U':
                  return readUnicodeEscapeSequence(scnr, ch, 6);
              default:
                  emitError(3, currentPosition(), 0, ch);
                  return '';
          }
      }
      function readUnicodeEscapeSequence(scnr, unicode, digits) {
          eat(scnr, unicode);
          let sequence = '';
          for (let i = 0; i < digits; i++) {
              const ch = takeHexDigit(scnr);
              if (!ch) {
                  emitError(4, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
                  break;
              }
              sequence += ch;
          }
          return `\\${unicode}${sequence}`;
      }
      function readInvalidIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = '';
          let identifiers = '';
          const closure = (ch) => ch !== "{" &&
              ch !== "}" &&
              ch !== CHAR_SP &&
              ch !== CHAR_LF;
          while ((ch = takeChar(scnr, closure))) {
              identifiers += ch;
          }
          return identifiers;
      }
      function readLinkedModifier(scnr) {
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          return name;
      }
      function readLinkedRefer(scnr) {
          const fn = (detect = false, buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" ||
                  ch === "%" ||
                  ch === "@" ||
                  ch === "|" ||
                  !ch) {
                  return buf;
              }
              else if (ch === CHAR_SP) {
                  return buf;
              }
              else if (ch === CHAR_LF) {
                  buf += ch;
                  scnr.next();
                  return fn(detect, buf);
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(true, buf);
              }
          };
          return fn(false, '');
      }
      function readPlural(scnr) {
          skipSpaces(scnr);
          const plural = eat(scnr, "|");
          skipSpaces(scnr);
          return plural;
      }
      function readTokenInPlaceholder(scnr, context) {
          let token = null;
          const ch = scnr.currentChar();
          switch (ch) {
              case "{":
                  if (context.braceNest >= 1) {
                      emitError(8, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 2, "{");
                  skipSpaces(scnr);
                  context.braceNest++;
                  return token;
              case "}":
                  if (context.braceNest > 0 &&
                      context.currentType === 2) {
                      emitError(7, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 3, "}");
                  context.braceNest--;
                  context.braceNest > 0 && skipSpaces(scnr);
                  if (context.inLinked && context.braceNest === 0) {
                      context.inLinked = false;
                  }
                  return token;
              case "@":
                  if (context.braceNest > 0) {
                      emitError(6, currentPosition(), 0);
                  }
                  token = readTokenInLinked(scnr, context) || getEndToken(context);
                  context.braceNest = 0;
                  return token;
              default:
                  let validNamedIdentifier = true;
                  let validListIdentifier = true;
                  let validLeteral = true;
                  if (isPluralStart(scnr)) {
                      if (context.braceNest > 0) {
                          emitError(6, currentPosition(), 0);
                      }
                      token = getToken(context, 1, readPlural(scnr));
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (context.braceNest > 0 &&
                      (context.currentType === 5 ||
                          context.currentType === 6 ||
                          context.currentType === 7)) {
                      emitError(6, currentPosition(), 0);
                      context.braceNest = 0;
                      return readToken(scnr, context);
                  }
                  if ((validNamedIdentifier = isNamedIdentifierStart(scnr, context))) {
                      token = getToken(context, 5, readNamedIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validListIdentifier = isListIdentifierStart(scnr, context))) {
                      token = getToken(context, 6, readListIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validLeteral = isLiteralStart(scnr, context))) {
                      token = getToken(context, 7, readLiteral(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if (!validNamedIdentifier && !validListIdentifier && !validLeteral) {
                      token = getToken(context, 13, readInvalidIdentifier(scnr));
                      emitError(1, currentPosition(), 0, token.value);
                      skipSpaces(scnr);
                      return token;
                  }
                  break;
          }
          return token;
      }
      function readTokenInLinked(scnr, context) {
          const { currentType } = context;
          let token = null;
          const ch = scnr.currentChar();
          if ((currentType === 8 ||
              currentType === 9 ||
              currentType === 12 ||
              currentType === 10) &&
              (ch === CHAR_LF || ch === CHAR_SP)) {
              emitError(9, currentPosition(), 0);
          }
          switch (ch) {
              case "@":
                  scnr.next();
                  token = getToken(context, 8, "@");
                  context.inLinked = true;
                  return token;
              case ".":
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 9, ".");
              case ":":
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 10, ":");
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1, readPlural(scnr));
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isLinkedDotStart(scnr, context) ||
                      isLinkedDelimiterStart(scnr, context)) {
                      skipSpaces(scnr);
                      return readTokenInLinked(scnr, context);
                  }
                  if (isLinkedModifierStart(scnr, context)) {
                      skipSpaces(scnr);
                      return getToken(context, 12, readLinkedModifier(scnr));
                  }
                  if (isLinkedReferStart(scnr, context)) {
                      skipSpaces(scnr);
                      if (ch === "{") {
                          return readTokenInPlaceholder(scnr, context) || token;
                      }
                      else {
                          return getToken(context, 11, readLinkedRefer(scnr));
                      }
                  }
                  if (currentType === 8) {
                      emitError(9, currentPosition(), 0);
                  }
                  context.braceNest = 0;
                  context.inLinked = false;
                  return readToken(scnr, context);
          }
      }
      function readToken(scnr, context) {
          let token = { type: 14 };
          if (context.braceNest > 0) {
              return readTokenInPlaceholder(scnr, context) || getEndToken(context);
          }
          if (context.inLinked) {
              return readTokenInLinked(scnr, context) || getEndToken(context);
          }
          const ch = scnr.currentChar();
          switch (ch) {
              case "{":
                  return readTokenInPlaceholder(scnr, context) || getEndToken(context);
              case "}":
                  emitError(5, currentPosition(), 0);
                  scnr.next();
                  return getToken(context, 3, "}");
              case "@":
                  return readTokenInLinked(scnr, context) || getEndToken(context);
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1, readPlural(scnr));
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isTextStart(scnr)) {
                      return getToken(context, 0, readText(scnr));
                  }
                  if (ch === "%") {
                      scnr.next();
                      return getToken(context, 4, "%");
                  }
                  break;
          }
          return token;
      }
      function nextToken() {
          const { currentType, offset, startLoc, endLoc } = _context;
          _context.lastType = currentType;
          _context.lastOffset = offset;
          _context.lastStartLoc = startLoc;
          _context.lastEndLoc = endLoc;
          _context.offset = currentOffset();
          _context.startLoc = currentPosition();
          if (_scnr.currentChar() === EOF) {
              return getToken(_context, 14);
          }
          return readToken(_scnr, _context);
      }
      return {
          nextToken,
          currentOffset,
          currentPosition,
          context
      };
  }

  const ERROR_DOMAIN$1 = 'parser';
  const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
  function fromEscapeSequence(match, codePoint4, codePoint6) {
      switch (match) {
          case `\\\\`:
              return `\\`;
          case `\\\'`:
              return `\'`;
          default: {
              const codePoint = parseInt(codePoint4 || codePoint6, 16);
              if (codePoint <= 0xd7ff || codePoint >= 0xe000) {
                  return String.fromCodePoint(codePoint);
              }
              return '�';
          }
      }
  }
  function createParser(options = {}) {
      const location = !options.location;
      const { onError } = options;
      function emitError(tokenzer, code, start, offset, ...args) {
          const end = tokenzer.currentPosition();
          end.offset += offset;
          end.column += offset;
          if (onError) {
              const loc = createLocation(start, end);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN$1,
                  args
              });
              onError(err);
          }
      }
      function startNode(type, offset, loc) {
          const node = {
              type,
              start: offset,
              end: offset
          };
          if (location) {
              node.loc = { start: loc, end: loc };
          }
          return node;
      }
      function endNode(node, offset, pos, type) {
          node.end = offset;
          if (type) {
              node.type = type;
          }
          if (location && node.loc) {
              node.loc.end = pos;
          }
      }
      function parseText(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(3, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseList(tokenizer, index) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(5, offset, loc);
          node.index = parseInt(index, 10);
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseNamed(tokenizer, key) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(4, offset, loc);
          node.key = key;
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLiteral(tokenizer, value) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(9, offset, loc);
          node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLinkedModifier(tokenizer) {
          const token = tokenizer.nextToken();
          const context = tokenizer.context();
          if (token.value == null) {
              emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
          }
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(8, offset, loc);
          node.value = token.value || '';
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLinkedKey(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(7, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLinked(tokenizer) {
          const context = tokenizer.context();
          const linkedNode = startNode(6, context.offset, context.startLoc);
          let token = tokenizer.nextToken();
          if (token.type === 9) {
              linkedNode.modifier = parseLinkedModifier(tokenizer);
              token = tokenizer.nextToken();
          }
          if (token.type !== 10) {
              emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
          }
          token = tokenizer.nextToken();
          if (token.type === 2) {
              token = tokenizer.nextToken();
          }
          switch (token.type) {
              case 11:
                  if (token.value == null) {
                      emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                  }
                  linkedNode.key = parseLinkedKey(tokenizer, token.value || '');
                  break;
              case 5:
                  if (token.value == null) {
                      emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                  }
                  linkedNode.key = parseNamed(tokenizer, token.value || '');
                  break;
              case 6:
                  if (token.value == null) {
                      emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                  }
                  linkedNode.key = parseList(tokenizer, token.value || '');
                  break;
              case 7:
                  if (token.value == null) {
                      emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                  }
                  linkedNode.key = parseLiteral(tokenizer, token.value || '');
                  break;
          }
          endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
          return linkedNode;
      }
      function parseMessage(tokenizer) {
          const context = tokenizer.context();
          const startOffset = context.currentType === 1
              ? tokenizer.currentOffset()
              : context.offset;
          const startLoc = context.currentType === 1
              ? context.endLoc
              : context.startLoc;
          const node = startNode(2, startOffset, startLoc);
          node.items = [];
          do {
              const token = tokenizer.nextToken();
              switch (token.type) {
                  case 0:
                      if (token.value == null) {
                          emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                      }
                      node.items.push(parseText(tokenizer, token.value || ''));
                      break;
                  case 6:
                      if (token.value == null) {
                          emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                      }
                      node.items.push(parseList(tokenizer, token.value || ''));
                      break;
                  case 5:
                      if (token.value == null) {
                          emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                      }
                      node.items.push(parseNamed(tokenizer, token.value || ''));
                      break;
                  case 7:
                      if (token.value == null) {
                          emitError(tokenizer, 11, context.lastStartLoc, 0, token.type);
                      }
                      node.items.push(parseLiteral(tokenizer, token.value || ''));
                      break;
                  case 8:
                      node.items.push(parseLinked(tokenizer));
                      break;
              }
          } while (context.currentType !== 14 &&
              context.currentType !== 1);
          const endOffset = context.currentType === 1
              ? context.lastOffset
              : tokenizer.currentOffset();
          const endLoc = context.currentType === 1
              ? context.lastEndLoc
              : tokenizer.currentPosition();
          endNode(node, endOffset, endLoc);
          return node;
      }
      function parsePlural(tokenizer, offset, loc, msgNode) {
          const context = tokenizer.context();
          let hasEmptyMessage = msgNode.items.length === 0;
          const node = startNode(1, offset, loc);
          node.cases = [];
          node.cases.push(msgNode);
          do {
              const msg = parseMessage(tokenizer);
              if (!hasEmptyMessage) {
                  hasEmptyMessage = msg.items.length === 0;
              }
              node.cases.push(msg);
          } while (context.currentType !== 14);
          if (hasEmptyMessage) {
              emitError(tokenizer, 10, loc, 0);
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseResource(tokenizer) {
          const context = tokenizer.context();
          const { offset, startLoc } = context;
          const msgNode = parseMessage(tokenizer);
          if (context.currentType === 14) {
              return msgNode;
          }
          else {
              return parsePlural(tokenizer, offset, startLoc, msgNode);
          }
      }
      function parse(source) {
          const tokenizer = createTokenizer(source, { ...options });
          const context = tokenizer.context();
          const node = startNode(0, context.offset, context.startLoc);
          node.body = parseResource(tokenizer);
          if (context.currentType !== 14) {
              emitError(tokenizer, 11, context.lastStartLoc, 0, context.currentType);
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      return { parse };
  }

  function createTransformer(ast, options = {}) {
      const _context = {
          ast,
          helpers: new Set()
      };
      const context = () => _context;
      const helper = (name) => {
          _context.helpers.add(name);
          return name;
      };
      return { context, helper };
  }
  function traverseNodes(nodes, transformer) {
      for (let i = 0; i < nodes.length; i++) {
          traverseNode(nodes[i], transformer);
      }
  }
  function traverseNode(node, transformer) {
      switch (node.type) {
          case 1:
              traverseNodes(node.cases, transformer);
              transformer.helper("pluralIndex");
              transformer.helper("pluralRule");
              transformer.helper("orgPluralRule");
              break;
          case 2:
              traverseNodes(node.items, transformer);
              break;
          case 6:
              const linked = node;
              if (linked.modifier) {
                  traverseNode(linked.modifier, transformer);
                  transformer.helper("modifier");
                  transformer.helper("type");
              }
              traverseNode(linked.key, transformer);
              transformer.helper("message");
              break;
          case 5:
              transformer.helper("interpolate");
              transformer.helper("list");
              break;
          case 4:
              transformer.helper("interpolate");
              transformer.helper("named");
              break;
      }
  }
  function transform(ast, options = {}) {
      const transformer = createTransformer(ast);
      transformer.helper("normalize");
      ast.body && traverseNode(ast.body, transformer);
      const context = transformer.context();
      ast.helpers = [...context.helpers];
  }

  function createCodeGenerator(source) {
      const _context = {
          source,
          code: '',
          indentLevel: 0
      };
      const context = () => _context;
      function push(code) {
          _context.code += code;
      }
      function _newline(n) {
          push('\n' + `  `.repeat(n));
      }
      function indent() {
          _newline(++_context.indentLevel);
      }
      function deindent(withoutNewLine) {
          if (withoutNewLine) {
              --_context.indentLevel;
          }
          else {
              _newline(--_context.indentLevel);
          }
      }
      function newline() {
          _newline(_context.indentLevel);
      }
      const helper = (key) => `_${key}`;
      return {
          context,
          push,
          indent,
          deindent,
          newline,
          helper
      };
  }
  function generateLinkedNode(generator, node) {
      const { helper } = generator;
      if (node.modifier) {
          generator.push(`${helper("modifier")}(`);
          generateNode(generator, node.modifier);
          generator.push(')(');
      }
      generator.push(`${helper("message")}(`);
      generateNode(generator, node.key);
      generator.push(')(ctx)');
      if (node.modifier) {
          generator.push(`, ${helper("type")})`);
      }
  }
  function generateMessageNode(generator, node) {
      const { helper } = generator;
      generator.push(`${helper("normalize")}([`);
      generator.indent();
      const length = node.items.length;
      for (let i = 0; i < length; i++) {
          generateNode(generator, node.items[i]);
          if (i === length - 1) {
              break;
          }
          generator.push(', ');
      }
      generator.deindent();
      generator.push('])');
  }
  function generatePluralNode(generator, node) {
      const { helper } = generator;
      if (node.cases.length > 1) {
          generator.push('[');
          generator.indent();
          const length = node.cases.length;
          for (let i = 0; i < length; i++) {
              generateNode(generator, node.cases[i]);
              if (i === length - 1) {
                  break;
              }
              generator.push(', ');
          }
          generator.deindent();
          generator.push(`][${helper("pluralRule")}(${helper("pluralIndex")}, ${length}, ${helper("orgPluralRule")})]`);
      }
  }
  function generateResource(generator, node) {
      if (node.body) {
          generateNode(generator, node.body);
      }
      else {
          generator.push('null');
      }
  }
  function generateNode(generator, node) {
      const { helper } = generator;
      switch (node.type) {
          case 0:
              generateResource(generator, node);
              break;
          case 1:
              generatePluralNode(generator, node);
              break;
          case 2:
              generateMessageNode(generator, node);
              break;
          case 6:
              generateLinkedNode(generator, node);
              break;
          case 8:
              generator.push(JSON.stringify(node.value));
              break;
          case 7:
              generator.push(JSON.stringify(node.value));
              break;
          case 5:
              generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`);
              break;
          case 4:
              generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`);
              break;
          case 9:
              generator.push(JSON.stringify(node.value));
              break;
          case 3:
              generator.push(JSON.stringify(node.value));
              break;
          default:
              {
                  throw new Error(`unhandled codegen node type: ${node.type}`);
              }
      }
  }
  const generate = (ast, options = {}) => {
      const mode = isString(options.mode) ? options.mode : 'normal';
      const helpers = ast.helpers || [];
      const generator = createCodeGenerator(ast.loc && ast.loc.source);
      generator.push(mode === 'normal' ? `function __msg__ (ctx) {` : `(ctx) => {`);
      generator.indent();
      if (helpers.length > 0) {
          generator.push(`const { ${helpers.map(s => `${s}: _${s}`).join(', ')} } = ctx`);
          generator.newline();
      }
      generator.push(`return `);
      generateNode(generator, ast);
      generator.deindent();
      generator.push(`}`);
      return generator.context().code;
  };

  const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
  const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
  function checkHtmlMessage(source, options) {
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      if (warnHtmlMessage && RE_HTML_TAG.test(source)) {
          warn(format(WARN_MESSAGE, { source }));
      }
  }
  const defaultOnCacheKey = (source) => source;
  let compileCache = Object.create(null);
  function clearCompileCache() {
      compileCache = Object.create(null);
  }
  function baseCompile(source, options = {}) {
      const parser = createParser({ ...options });
      const ast = parser.parse(source);
      transform(ast, { ...options });
      const code = generate(ast, { ...options });
      return { ast, code };
  }
  function compile(source, options = {}) {
       checkHtmlMessage(source, options);
      const onCacheKey = options.onCacheKey || defaultOnCacheKey;
      const key = onCacheKey(source);
      const cached = compileCache[key];
      if (cached) {
          return cached;
      }
      let occured = false;
      const onError = options.onError || defaultOnError;
      options.onError = (err) => {
          occured = true;
          onError(err);
      };
      const { code } = baseCompile(source, options);
      const msg = new Function(`return ${code}`)();
      return !occured ? (compileCache[key] = msg) : msg;
  }

  const warnMessages = {
      [0]: `Not found '{key}' key in '{locale}' locale messages.`,
      [1]: `Fall back to translate '{key}' key with '{target}' locale.`,
      [2]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
      [3]: `Fall back to number format '{key}' key with '{target}' locale.`,
      [4]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
      [5]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage(code, ...args) {
      return format(warnMessages[code], ...args);
  }

  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = '';
  function getDefaultLinkedModifiers() {
      return {
          upper: (val) => (isString(val) ? val.toUpperCase() : val),
          lower: (val) => (isString(val) ? val.toLowerCase() : val),
          capitalize: (val) => (isString(val)
              ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
              : val)
      };
  }
  function createRuntimeContext(options = {}) {
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          isString(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const messages = isPlainObject(options.messages)
          ? options.messages
          : { [locale]: {} };
      const datetimeFormats = isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [locale]: {} };
      const numberFormats = isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [locale]: {} };
      const modifiers = Object.assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
      const pluralRules = options.pluralRules || {};
      const missing = isFunction(options.missing) ? options.missing : null;
      const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
          ? options.missingWarn
          : true;
      const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
          ? options.fallbackWarn
          : true;
      const fallbackFormat = !!options.fallbackFormat;
      const unresolving = !!options.unresolving;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      const processor = isPlainObject(options.processor) ? options.processor : null;
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      const messageCompiler = isFunction(options.messageCompiler)
          ? options.messageCompiler
          : compile;
      const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
      const internalOptions = options;
      const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters)
          ? internalOptions.__datetimeFormatters
          : new Map();
      const __numberFormatters = isObject(internalOptions.__numberFormatters)
          ? internalOptions.__numberFormatters
          : new Map();
      const context = {
          locale,
          fallbackLocale,
          messages,
          datetimeFormats,
          numberFormats,
          modifiers,
          pluralRules,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackFormat,
          unresolving,
          postTranslation,
          processor,
          warnHtmlMessage,
          messageCompiler,
          onWarn,
          __datetimeFormatters,
          __numberFormatters
      };
      return context;
  }
  function isTrarnslateFallbackWarn(fallback, key) {
      return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
      return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
      const { missing, onWarn } = context;
      if (missing !== null) {
          const ret = missing(context, locale, key, type);
          return isString(ret) ? ret : key;
      }
      else {
          if ( isTranslateMissingWarn(missingWarn, key)) {
              onWarn(getWarnMessage(0, { key, locale }));
          }
          return key;
      }
  }
  function getLocaleChain(ctx, fallback, start = '') {
      const context = ctx;
      if (start === '') {
          return [];
      }
      if (!context.__localeChainCache) {
          context.__localeChainCache = new Map();
      }
      let chain = context.__localeChainCache.get(start);
      if (!chain) {
          chain = [];
          let block = [start];
          while (isArray(block)) {
              block = appendBlockToChain(chain, block, fallback);
          }
          const defaults = isArray(fallback)
              ? fallback
              : isPlainObject(fallback)
                  ? fallback['default']
                      ? fallback['default']
                      : null
                  : fallback;
          block = isString(defaults) ? [defaults] : defaults;
          if (isArray(block)) {
              appendBlockToChain(chain, block, false);
          }
          context.__localeChainCache.set(start, chain);
      }
      return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
      let follow = true;
      for (let i = 0; i < block.length && isBoolean(follow); i++) {
          const locale = block[i];
          if (isString(locale)) {
              follow = appendLocaleToChain(chain, block[i], blocks);
          }
      }
      return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
      let follow;
      const tokens = locale.split('-');
      do {
          const target = tokens.join('-');
          follow = appendItemToChain(chain, target, blocks);
          tokens.splice(-1, 1);
      } while (tokens.length && follow === true);
      return follow;
  }
  function appendItemToChain(chain, target, blocks) {
      let follow = false;
      if (!chain.includes(target)) {
          follow = true;
          if (target) {
              follow = target[target.length - 1] !== '!';
              const locale = target.replace(/!/g, '');
              chain.push(locale);
              if ((isArray(blocks) || isPlainObject(blocks)) &&
                  blocks[locale]) {
                  follow = blocks[locale];
              }
          }
      }
      return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
      const context = ctx;
      context.__localeChainCache = new Map();
      getLocaleChain(ctx, fallback, locale);
  }

  const pathStateMachine = [];
  pathStateMachine[0] = {
      ["w"]: [0],
      ["i"]: [3, 0],
      ["["]: [4],
      ["o"]: [7]
  };
  pathStateMachine[1] = {
      ["w"]: [1],
      ["."]: [2],
      ["["]: [4],
      ["o"]: [7]
  };
  pathStateMachine[2] = {
      ["w"]: [2],
      ["i"]: [3, 0],
      ["0"]: [3, 0]
  };
  pathStateMachine[3] = {
      ["i"]: [3, 0],
      ["0"]: [3, 0],
      ["w"]: [1, 1],
      ["."]: [2, 1],
      ["["]: [4, 1],
      ["o"]: [7, 1]
  };
  pathStateMachine[4] = {
      ["'"]: [5, 0],
      ["\""]: [6, 0],
      ["["]: [
          4,
          2
      ],
      ["]"]: [1, 3],
      ["o"]: 8,
      ["l"]: [4, 0]
  };
  pathStateMachine[5] = {
      ["'"]: [4, 0],
      ["o"]: 8,
      ["l"]: [5, 0]
  };
  pathStateMachine[6] = {
      ["\""]: [4, 0],
      ["o"]: 8,
      ["l"]: [6, 0]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
      return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
      const a = str.charCodeAt(0);
      const b = str.charCodeAt(str.length - 1);
      return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
      if (ch === undefined || ch === null) {
          return "o";
      }
      const code = ch.charCodeAt(0);
      switch (code) {
          case 0x5b:
          case 0x5d:
          case 0x2e:
          case 0x22:
          case 0x27:
              return ch;
          case 0x5f:
          case 0x24:
          case 0x2d:
              return "i";
          case 0x09:
          case 0x0a:
          case 0x0d:
          case 0xa0:
          case 0xfeff:
          case 0x2028:
          case 0x2029:
              return "w";
      }
      return "i";
  }
  function formatSubPath(path) {
      const trimmed = path.trim();
      if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
          return false;
      }
      return isLiteral(trimmed)
          ? stripQuotes(trimmed)
          : "*" + trimmed;
  }
  function parse(path) {
      const keys = [];
      let index = -1;
      let mode = 0;
      let subPathDepth = 0;
      let c;
      let key;
      let newChar;
      let type;
      let transition;
      let action;
      let typeMap;
      const actions = [];
      actions[0] = () => {
          if (key === undefined) {
              key = newChar;
          }
          else {
              key += newChar;
          }
      };
      actions[1] = () => {
          if (key !== undefined) {
              keys.push(key);
              key = undefined;
          }
      };
      actions[2] = () => {
          actions[0]();
          subPathDepth++;
      };
      actions[3] = () => {
          if (subPathDepth > 0) {
              subPathDepth--;
              mode = 4;
              actions[0]();
          }
          else {
              subPathDepth = 0;
              if (key === undefined) {
                  return false;
              }
              key = formatSubPath(key);
              if (key === false) {
                  return false;
              }
              else {
                  actions[1]();
              }
          }
      };
      function maybeUnescapeQuote() {
          const nextChar = path[index + 1];
          if ((mode === 5 &&
              nextChar === "'") ||
              (mode === 6 &&
                  nextChar === "\"")) {
              index++;
              newChar = '\\' + nextChar;
              actions[0]();
              return true;
          }
      }
      while (mode !== null) {
          index++;
          c = path[index];
          if (c === '\\' && maybeUnescapeQuote()) {
              continue;
          }
          type = getPathCharType(c);
          typeMap = pathStateMachine[mode];
          transition = typeMap[type] || typeMap["l"] || 8;
          if (transition === 8) {
              return;
          }
          mode = transition[0];
          if (transition[1] !== undefined) {
              action = actions[transition[1]];
              if (action) {
                  newChar = c;
                  if (action() === false) {
                      return;
                  }
              }
          }
          if (mode === 7) {
              return keys;
          }
      }
  }
  const cache = new Map();
  function resolveValue(obj, path) {
      if (!isObject(obj)) {
          return null;
      }
      let hit = cache.get(path);
      if (!hit) {
          hit = parse(path);
          if (hit) {
              cache.set(path, hit);
          }
      }
      if (!hit) {
          return null;
      }
      const len = hit.length;
      let last = obj;
      let i = 0;
      while (i < len) {
          const val = last[hit[i]];
          if (val === undefined) {
              return null;
          }
          last = val;
          i++;
      }
      return last;
  }

  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => '';
  const DEFAULT_MESSAGE_DATA_TYPE = 'text';
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : values.join('');
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
      choice = Math.abs(choice);
      if (choicesLength === 2) {
          return choice
              ? choice > 1
                  ? 1
                  : 0
              : 1;
      }
      return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
      const index = isNumber(options.pluralIndex)
          ? options.pluralIndex
          : -1;
      return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
          ? isNumber(options.named.count)
              ? options.named.count
              : isNumber(options.named.n)
                  ? options.named.n
                  : index
          : index;
  }
  function normalizeNamed(pluralIndex, props) {
      if (!props.count) {
          props.count = pluralIndex;
      }
      if (!props.n) {
          props.n = pluralIndex;
      }
  }
  function createMessageContext(options = {}) {
      const locale = options.locale;
      const pluralIndex = getPluralIndex(options);
      const pluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? options.pluralRules[locale]
          : pluralDefault;
      const orgPluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? pluralDefault
          : undefined;
      const _list = options.list || [];
      const list = (index) => _list[index];
      const _named = options.named || {};
      isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
      const named = (key) => _named[key];
      const modifier = (name) => options.modifiers
          ? options.modifiers[name]
          : DEFAULT_MODIFIER;
      function message(name) {
          const msg = isFunction(options.messages)
              ? options.messages(name)
              : isObject(options.messages)
                  ? options.messages[name]
                  : false;
          return !msg
              ? options.parent
                  ? options.parent.message(name)
                  : DEFAULT_MESSAGE
              : msg;
      }
      const type = isPlainObject(options.processor) && isString(options.processor.type)
          ? options.processor.type
          : DEFAULT_MESSAGE_DATA_TYPE;
      const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize)
          ? options.processor.normalize
          : DEFAULT_NORMALIZE;
      const interpolate = isPlainObject(options.processor) &&
          isFunction(options.processor.interpolate)
          ? options.processor.interpolate
          : DEFAULT_INTERPOLATE;
      return {
          ["list"]: list,
          ["named"]: named,
          ["pluralIndex"]: pluralIndex,
          ["pluralRule"]: pluralRule,
          ["orgPluralRule"]: orgPluralRule,
          ["modifier"]: modifier,
          ["message"]: message,
          ["type"]: type,
          ["interpolate"]: interpolate,
          ["normalize"]: normalize
      };
  }

  function createCoreError(code) {
      return createCompileError(code, null,  { messages: errorMessages$1 } );
  }
  const errorMessages$1 = {
      [12]: 'Invalid arguments'
  };

  const NOOP_MESSAGE_FUNCTION = () => '';
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
      const { messages, fallbackFormat, postTranslation, unresolving, fallbackLocale, warnHtmlMessage, messageCompiler, onWarn } = context;
      const [key, options] = parseTranslateArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const defaultMsgOrKey = isString(options.default) || isBoolean(options.default)
          ? !isBoolean(options.default)
              ? options.default
              : key
          : fallbackFormat
              ? key
              : '';
      const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      let message = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage(1, {
                  key,
                  target: targetLocale
              }));
          }
          message =
              messages[targetLocale] || {};
          if ((format = resolveValue(message, key)) === null) {
              format = message[key];
          }
          if (isString(format) || isFunction(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'translate');
      }
      let cacheBaseKey = key;
      if (!(isString(format) || isMessageFunction(format))) {
          if (enableDefaultMsg) {
              format = defaultMsgOrKey;
              cacheBaseKey = format;
          }
      }
      if (!(isString(format) || isMessageFunction(format)) ||
          !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let occured = false;
      const errorDetector = () => {
          occured = true;
      };
      let msg;
      if (!isMessageFunction(format)) {
          msg = messageCompiler(format, getCompileOptions(targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
          msg.locale = targetLocale;
          msg.key = key;
          msg.source = format;
      }
      else {
          msg = format;
          msg.locale = msg.locale || targetLocale;
          msg.key = msg.key || key;
      }
      if (occured) {
          return format;
      }
      const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
      const msgContext = createMessageContext(ctxOptions);
      const messaged = msg(msgContext);
      return postTranslation ? postTranslation(messaged) : messaged;
  }
  function parseTranslateArgs(...args) {
      const [arg1, arg2, arg3] = args;
      const options = {};
      if (!isString(arg1)) {
          throw createCoreError(12);
      }
      const key = arg1;
      if (isNumber(arg2)) {
          options.plural = arg2;
      }
      else if (isString(arg2)) {
          options.default = arg2;
      }
      else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
          options.named = arg2;
      }
      else if (isArray(arg2)) {
          options.list = arg2;
      }
      if (isNumber(arg3)) {
          options.plural = arg3;
      }
      else if (isString(arg3)) {
          options.default = arg3;
      }
      else if (isPlainObject(arg3)) {
          Object.assign(options, arg3);
      }
      return [key, options];
  }
  function getCompileOptions(locale, key, source, warnHtmlMessage, errorDetector) {
      return {
          warnHtmlMessage,
          onError: (err) => {
              errorDetector && errorDetector(err);
              {
                  const message = `Message compilation error: ${err.message}`;
                  const codeFrame = err.location &&
                      generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
                  console.error(codeFrame ? `${message}\n${codeFrame}` : message);
              }
          },
          onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
      };
  }
  function getMessageContextOptions(context, locale, message, options) {
      const { modifiers, pluralRules, messageCompiler } = context;
      const resolveMessage = (key) => {
          const val = resolveValue(message, key);
          if (isString(val)) {
              let occured = false;
              const errorDetector = () => {
                  occured = true;
              };
              const msg = messageCompiler(val, getCompileOptions(locale, key, val, context.warnHtmlMessage, errorDetector));
              return !occured
                  ? msg
                  : NOOP_MESSAGE_FUNCTION;
          }
          else if (isMessageFunction(val)) {
              return val;
          }
          else {
              return NOOP_MESSAGE_FUNCTION;
          }
      };
      const ctxOptions = {
          locale,
          modifiers,
          pluralRules,
          messages: resolveMessage
      };
      if (context.processor) {
          ctxOptions.processor = context.processor;
      }
      if (options.list) {
          ctxOptions.list = options.list;
      }
      if (options.named) {
          ctxOptions.named = options.named;
      }
      if (isNumber(options.plural)) {
          ctxOptions.pluralIndex = options.plural;
      }
      return ctxOptions;
  }

  const intlDefined = typeof Intl !== 'undefined';
  const Availabilities = {
      dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
      numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
  };

  function datetime(context, ...args) {
      const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
      const { __datetimeFormatters } = context;
      if ( !Availabilities.dateTimeFormat) {
          onWarn(getWarnMessage(4));
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, orverrides] = parseDateTimeArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.DateTimeFormat(locale).format(value);
      }
      let datetimeFormat = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage(5, {
                  key,
                  target: targetLocale
              }));
          }
          datetimeFormat =
              datetimeFormats[targetLocale] || {};
          format = datetimeFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'datetime');
      }
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(orverrides)) {
          id = `${id}__${JSON.stringify(orverrides)}`;
      }
      let formatter = __datetimeFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.DateTimeFormat(targetLocale, Object.assign({}, format, orverrides));
          __datetimeFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let orverrides = {};
      if (!(isNumber(arg1) || isDate(arg1))) {
          throw createCoreError(12);
      }
      const value = arg1;
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          orverrides = arg3;
      }
      if (isPlainObject(arg4)) {
          orverrides = arg4;
      }
      return [options.key || '', value, options, orverrides];
  }
  function clearDateTimeFormat(ctx, locale, format) {
      const context = ctx;
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context.__datetimeFormatters.has(id)) {
              continue;
          }
          context.__datetimeFormatters.delete(id);
      }
  }

  function number(context, ...args) {
      const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
      const { __numberFormatters } = context;
      if ( !Availabilities.numberFormat) {
          onWarn(getWarnMessage(2));
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, orverrides] = parseNumberArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.NumberFormat(locale).format(value);
      }
      let numberFormat = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage(3, {
                  key,
                  target: targetLocale
              }));
          }
          numberFormat =
              numberFormats[targetLocale] || {};
          format = numberFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'number');
      }
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(orverrides)) {
          id = `${id}__${JSON.stringify(orverrides)}`;
      }
      let formatter = __numberFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.NumberFormat(targetLocale, Object.assign({}, format, orverrides));
          __numberFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let orverrides = {};
      if (!isNumber(arg1)) {
          throw createCoreError(12);
      }
      const value = arg1;
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          orverrides = arg3;
      }
      if (isPlainObject(arg4)) {
          orverrides = arg4;
      }
      return [options.key || '', value, options, orverrides];
  }
  function clearNumberFormat(ctx, locale, format) {
      const context = ctx;
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context.__numberFormatters.has(id)) {
              continue;
          }
          context.__numberFormatters.delete(id);
      }
  }

  const warnMessages$1 = {
      [6]: `Fall back to {type} '{key}' with root locale.`,
      [7]: `Not supportted 'preserve'.`,
      [8]: `Not supportted 'formatter'.`,
      [9]: `Not supportted 'preserveDirectiveContent'.`,
      [10]: `Not supportted 'getChoiceIndex'.`,
      [11]: `Component name legacy compatible: '{name}' -> 'i18n'`,
      [12]: `Not found parent composer. use the global composer.`
  };
  function getWarnMessage$1(code, ...args) {
      return format(warnMessages$1[code], ...args);
  }

  function createI18nError(code, ...args) {
      return createCompileError(code, null,  { messages: errorMessages$2, args } );
  }
  const errorMessages$2 = {
      [12]: 'Unexpected return type in composer',
      [13]: 'Invalid argument',
      [14]: 'Need to install with use function',
      [15]: 'Unexpeced error',
      [16]: 'Not available in legacy mode',
      [17]: `Required in value: {0}`,
      [18]: `Invalid value`,
      [19]: `Not found Composer`
  };

  let composerID = 0;
  function defineRuntimeMissingHandler(missing) {
      return ((ctx, locale, key, type) => {
          return missing(locale, key, vue.getCurrentInstance() || undefined, type);
      });
  }
  function getLocaleMessages(options, locale) {
      const { messages, __i18n } = options;
      let ret = isPlainObject(messages)
          ? messages
          : isArray(__i18n)
              ? {}
              : { [locale]: {} };
      if (isArray(__i18n)) {
          __i18n.forEach(raw => {
              ret = Object.assign(ret, isString(raw) ? JSON.parse(raw) : raw);
          });
          return ret;
      }
      if (isFunction(__i18n)) {
          const { functions } = __i18n();
          addPreCompileMessages(ret, functions);
      }
      return ret;
  }
  function addPreCompileMessages(messages, functions) {
      const keys = Object.keys(functions);
      keys.forEach(key => {
          const compiled = functions[key];
          const { l, k } = JSON.parse(key);
          if (!messages[l]) {
              messages[l] = {};
          }
          const targetLocaleMessage = messages[l];
          const paths = parse(k);
          if (paths != null) {
              const len = paths.length;
              let last = targetLocaleMessage;
              let i = 0;
              while (i < len) {
                  const path = paths[i];
                  if (i === len - 1) {
                      last[path] = compiled;
                      break;
                  }
                  else {
                      let val = last[path];
                      if (!val) {
                          last[path] = val = {};
                      }
                      last = val;
                      i++;
                  }
              }
          }
      });
  }
  function createComposer(options = {}) {
      const { __root } = options;
      const _isGlobal = __root === undefined;
      let _inheritLocale = isBoolean(options.inheritLocale)
          ? options.inheritLocale
          : true;
      const _locale = vue.ref(__root && _inheritLocale
          ? __root.locale.value
          : isString(options.locale)
              ? options.locale
              : 'en-US');
      const _fallbackLocale = vue.ref(__root && _inheritLocale
          ? __root.fallbackLocale.value
          : isString(options.fallbackLocale) ||
              isArray(options.fallbackLocale) ||
              isPlainObject(options.fallbackLocale) ||
              options.fallbackLocale === false
              ? options.fallbackLocale
              : _locale.value);
      const _messages = vue.ref(getLocaleMessages(options, _locale.value));
      const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [_locale.value]: {} });
      const _numberFormats = vue.ref(isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [_locale.value]: {} });
      let _missingWarn = __root
          ? __root.missingWarn
          : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
              ? options.missingWarn
              : true;
      let _fallbackWarn = __root
          ? __root.fallbackWarn
          : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
              ? options.fallbackWarn
              : true;
      let _fallbackRoot = isBoolean(options.fallbackRoot)
          ? options.fallbackRoot
          : true;
      let _fallbackFormat = !!options.fallbackFormat;
      let _missing = isFunction(options.missing) ? options.missing : null;
      let _runtimeMissing = isFunction(options.missing)
          ? defineRuntimeMissingHandler(options.missing)
          : null;
      let _postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      let _warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      const _modifiers = __root
          ? __root.modifiers
          : isPlainObject(options.modifiers)
              ? options.modifiers
              : {};
      const _pluralRules = options.pluralRules;
      let _context;
      function getRuntimeContext() {
          return createRuntimeContext({
              locale: _locale.value,
              fallbackLocale: _fallbackLocale.value,
              messages: _messages.value,
              datetimeFormats: _datetimeFormats.value,
              numberFormats: _numberFormats.value,
              modifiers: _modifiers,
              pluralRules: _pluralRules,
              missing: _runtimeMissing === null ? undefined : _runtimeMissing,
              missingWarn: _missingWarn,
              fallbackWarn: _fallbackWarn,
              fallbackFormat: _fallbackFormat,
              unresolving: true,
              postTranslation: _postTranslation === null ? undefined : _postTranslation,
              warnHtmlMessage: _warnHtmlMessage,
              __datetimeFormatters: isPlainObject(_context)
                  ? _context.__datetimeFormatters
                  : undefined,
              __numberFormatters: isPlainObject(_context)
                  ? _context.__numberFormatters
                  : undefined
          });
      }
      _context = getRuntimeContext();
      updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      const locale = vue.computed({
          get: () => _locale.value,
          set: val => {
              _locale.value = val;
              _context.locale = _locale.value;
          }
      });
      const fallbackLocale = vue.computed({
          get: () => _fallbackLocale.value,
          set: val => {
              _fallbackLocale.value = val;
              _context.fallbackLocale = _fallbackLocale.value;
              updateFallbackLocale(_context, _locale.value, val);
          }
      });
      const messages = vue.computed(() => _messages.value);
      const datetimeFormats = vue.computed(() => _datetimeFormats.value);
      const numberFormats = vue.computed(() => _numberFormats.value);
      function getPostTranslationHandler() {
          return isFunction(_postTranslation) ? _postTranslation : null;
      }
      function setPostTranslationHandler(handler) {
          _postTranslation = handler;
          _context.postTranslation = handler;
      }
      function getMissingHandler() {
          return _missing;
      }
      function setMissingHandler(handler) {
          if (handler !== null) {
              _runtimeMissing = defineRuntimeMissingHandler(handler);
          }
          _missing = handler;
          _context.missing = _runtimeMissing;
      }
      function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
          const ret = fn(getRuntimeContext());
          if (isNumber(ret) && ret === NOT_REOSLVED) {
              const key = argumentParser();
              if ( _fallbackRoot && __root) {
                  warn(getWarnMessage$1(6, {
                      key,
                      type: warnType
                  }));
              }
              return _fallbackRoot && __root
                  ? fallbackSuccess(__root)
                  : fallbackFail(key);
          }
          else if (successCondition(ret)) {
              return ret;
          }
          else {
              throw createI18nError(12);
          }
      }
      function t(...args) {
          return wrapWithDeps(context => translate(context, ...args), () => parseTranslateArgs(...args)[0], 'translate', root => root.t(...args), key => key, val => isString(val));
      }
      function d(...args) {
          return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', root => root.d(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
      }
      function n(...args) {
          return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', root => root.n(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
      }
      function normalize(values) {
          return values.map(val => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
      }
      const interpolate = (val) => val;
      const processor = {
          normalize,
          interpolate
      };
      function __transrateVNode(...args) {
          return wrapWithDeps(context => {
              let ret;
              try {
                  const _context = context;
                  _context.processor = processor;
                  ret = translate(_context, ...args);
              }
              finally {
                  _context.processor = null;
              }
              return ret;
          }, () => parseTranslateArgs(...args)[0], 'translate', root => root.__transrateVNode(...args), key => [vue.createVNode(vue.Text, null, key, 0)], val => isArray(val));
      }
      function __numberParts(...args) {
          return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', root => root.__numberParts(...args), () => [], val => isString(val) || isArray(val));
      }
      function __datetimeParts(...args) {
          return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', root => root.__datetimeParts(...args), () => [], val => isString(val) || isArray(val));
      }
      function tm(key) {
          const messages = _messages.value[_locale.value] || {};
          const target = resolveValue(messages, key);
          return target != null
              ? target
              : __root
                  ? __root.tm(key) || {}
                  : {};
      }
      function getLocaleMessage(locale) {
          return (_messages.value[locale] || {});
      }
      function setLocaleMessage(locale, message) {
          _messages.value[locale] = message;
          _context.messages = _messages.value;
      }
      function mergeLocaleMessage(locale, message) {
          _messages.value[locale] = Object.assign(_messages.value[locale] || {}, message);
          _context.messages = _messages.value;
      }
      function getDateTimeFormat(locale) {
          return _datetimeFormats.value[locale] || {};
      }
      function setDateTimeFormat(locale, format) {
          _datetimeFormats.value[locale] = format;
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      }
      function mergeDateTimeFormat(locale, format) {
          _datetimeFormats.value[locale] = Object.assign(_datetimeFormats.value[locale] || {}, format);
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      }
      function getNumberFormat(locale) {
          return _numberFormats.value[locale] || {};
      }
      function setNumberFormat(locale, format) {
          _numberFormats.value[locale] = format;
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      }
      function mergeNumberFormat(locale, format) {
          _numberFormats.value[locale] = Object.assign(_numberFormats.value[locale] || {}, format);
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      }
      composerID++;
      if (__root) {
          vue.watch(__root.locale, (val) => {
              if (_inheritLocale) {
                  _locale.value = val;
                  _context.locale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
          vue.watch(__root.fallbackLocale, (val) => {
              if (_inheritLocale) {
                  _fallbackLocale.value = val;
                  _context.fallbackLocale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
      }
      const composer = {
          locale,
          fallbackLocale,
          get inheritLocale() {
              return _inheritLocale;
          },
          set inheritLocale(val) {
              _inheritLocale = val;
              if (val && __root) {
                  _locale.value = __root.locale.value;
                  _fallbackLocale.value = __root.fallbackLocale.value;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          },
          get availableLocales() {
              return Object.keys(_messages.value).sort();
          },
          messages,
          datetimeFormats,
          numberFormats,
          get modifiers() {
              return _modifiers;
          },
          get pluralRules() {
              return _pluralRules;
          },
          get isGlobal() {
              return _isGlobal;
          },
          get missingWarn() {
              return _missingWarn;
          },
          set missingWarn(val) {
              _missingWarn = val;
              _context.missingWarn = _missingWarn;
          },
          get fallbackWarn() {
              return _fallbackWarn;
          },
          set fallbackWarn(val) {
              _fallbackWarn = val;
              _context.fallbackWarn = _fallbackWarn;
          },
          get fallbackRoot() {
              return _fallbackRoot;
          },
          set fallbackRoot(val) {
              _fallbackRoot = val;
          },
          get fallbackFormat() {
              return _fallbackFormat;
          },
          set fallbackFormat(val) {
              _fallbackFormat = val;
              _context.fallbackFormat = _fallbackFormat;
          },
          get warnHtmlMessage() {
              return _warnHtmlMessage;
          },
          set warnHtmlMessage(val) {
              _warnHtmlMessage = val;
              _context.warnHtmlMessage = val;
          },
          __id: composerID,
          t,
          d,
          n,
          tm,
          getLocaleMessage,
          setLocaleMessage,
          mergeLocaleMessage,
          getDateTimeFormat,
          setDateTimeFormat,
          mergeDateTimeFormat,
          getNumberFormat,
          setNumberFormat,
          mergeNumberFormat,
          getPostTranslationHandler,
          setPostTranslationHandler,
          getMissingHandler,
          setMissingHandler,
          __transrateVNode,
          __numberParts,
          __datetimeParts
      };
      return composer;
  }

  function convertComposerOptions(options) {
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isString(options.fallbackLocale) ||
          isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const missing = isFunction(options.missing) ? options.missing : undefined;
      const missingWarn = isBoolean(options.silentTranslationWarn) ||
          isRegExp(options.silentTranslationWarn)
          ? !options.silentTranslationWarn
          : true;
      const fallbackWarn = isBoolean(options.silentFallbackWarn) ||
          isRegExp(options.silentFallbackWarn)
          ? !options.silentFallbackWarn
          : true;
      const fallbackRoot = isBoolean(options.fallbackRoot)
          ? options.fallbackRoot
          : true;
      const fallbackFormat = !!options.formatFallbackMessages;
      const pluralizationRules = options.pluralizationRules;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : undefined;
      const warnHtmlMessage = isString(options.warnHtmlInMessage)
          ? options.warnHtmlInMessage !== 'off'
          : true;
      const inheritLocale = isBoolean(options.sync) ? options.sync : true;
      if ( options.formatter) {
          warn(getWarnMessage$1(8));
      }
      if ( options.preserveDirectiveContent) {
          warn(getWarnMessage$1(9));
      }
      let messages = options.messages;
      if (isPlainObject(options.sharedMessages)) {
          const sharedMessages = options.sharedMessages;
          const locales = Object.keys(sharedMessages);
          messages = locales.reduce((messages, locale) => {
              const message = messages[locale] || (messages[locale] = {});
              Object.assign(message, sharedMessages[locale]);
              return messages;
          }, (messages || {}));
      }
      const { __i18n, __root } = options;
      const datetimeFormats = options.datetimeFormats;
      const numberFormats = options.numberFormats;
      return {
          locale,
          fallbackLocale,
          messages,
          datetimeFormats,
          numberFormats,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackRoot,
          fallbackFormat,
          pluralRules: pluralizationRules,
          postTranslation,
          warnHtmlMessage,
          inheritLocale,
          __i18n,
          __root
      };
  }
  function createVueI18n(options = {}) {
      const composer = createComposer(convertComposerOptions(options));
      const vueI18n = {
          get locale() {
              return composer.locale.value;
          },
          set locale(val) {
              composer.locale.value = val;
          },
          get fallbackLocale() {
              return composer.fallbackLocale.value;
          },
          set fallbackLocale(val) {
              composer.fallbackLocale.value = val;
          },
          get messages() {
              return composer.messages.value;
          },
          get datetimeFormats() {
              return composer.datetimeFormats.value;
          },
          get numberFormats() {
              return composer.numberFormats.value;
          },
          get availableLocales() {
              return composer.availableLocales;
          },
          get formatter() {
               warn(getWarnMessage$1(8));
              return {
                  interpolate() {
                      return [];
                  }
              };
          },
          set formatter(val) {
               warn(getWarnMessage$1(8));
          },
          get missing() {
              return composer.getMissingHandler();
          },
          set missing(handler) {
              composer.setMissingHandler(handler);
          },
          get silentTranslationWarn() {
              return isBoolean(composer.missingWarn)
                  ? !composer.missingWarn
                  : composer.missingWarn;
          },
          set silentTranslationWarn(val) {
              composer.missingWarn = isBoolean(val) ? !val : val;
          },
          get silentFallbackWarn() {
              return isBoolean(composer.fallbackWarn)
                  ? !composer.fallbackWarn
                  : composer.fallbackWarn;
          },
          set silentFallbackWarn(val) {
              composer.fallbackWarn = isBoolean(val) ? !val : val;
          },
          get formatFallbackMessages() {
              return composer.fallbackFormat;
          },
          set formatFallbackMessages(val) {
              composer.fallbackFormat = val;
          },
          get postTranslation() {
              return composer.getPostTranslationHandler();
          },
          set postTranslation(handler) {
              composer.setPostTranslationHandler(handler);
          },
          get sync() {
              return composer.inheritLocale;
          },
          set sync(val) {
              composer.inheritLocale = val;
          },
          get warnHtmlInMessage() {
              return composer.warnHtmlMessage ? 'warn' : 'off';
          },
          set warnHtmlInMessage(val) {
              composer.warnHtmlMessage = val !== 'off';
          },
          get preserveDirectiveContent() {
              
                  warn(getWarnMessage$1(9));
              return true;
          },
          set preserveDirectiveContent(val) {
              
                  warn(getWarnMessage$1(9));
          },
          __id: composer.__id,
          __composer: composer,
          t(...args) {
              const [arg1, arg2, arg3] = args;
              const options = {};
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw createI18nError(13);
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          tc(...args) {
              const [arg1, arg2, arg3] = args;
              const options = { plural: 1 };
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw createI18nError(13);
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isNumber(arg2)) {
                  options.plural = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isString(arg3)) {
                  options.locale = arg3;
              }
              else if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          te(key, locale) {
              const targetLocale = isString(locale) ? locale : composer.locale.value;
              const message = composer.getLocaleMessage(targetLocale);
              return resolveValue(message, key) !== null;
          },
          tm(key) {
              return composer.tm(key);
          },
          getLocaleMessage(locale) {
              return composer.getLocaleMessage(locale);
          },
          setLocaleMessage(locale, message) {
              composer.setLocaleMessage(locale, message);
          },
          mergeLocaleMessage(locale, message) {
              composer.mergeLocaleMessage(locale, message);
          },
          d(...args) {
              return composer.d(...args);
          },
          getDateTimeFormat(locale) {
              return composer.getDateTimeFormat(locale);
          },
          setDateTimeFormat(locale, format) {
              composer.setDateTimeFormat(locale, format);
          },
          mergeDateTimeFormat(locale, format) {
              composer.mergeDateTimeFormat(locale, format);
          },
          n(...args) {
              return composer.n(...args);
          },
          getNumberFormat(locale) {
              return composer.getNumberFormat(locale);
          },
          setNumberFormat(locale, format) {
              composer.setNumberFormat(locale, format);
          },
          mergeNumberFormat(locale, format) {
              composer.mergeNumberFormat(locale, format);
          },
          getChoiceIndex(choice, choicesLength) {
              
                  warn(getWarnMessage$1(10));
              return -1;
          },
          __onComponentInstanceCreated(target) {
              const { componentInstanceCreatedListener } = options;
              if (componentInstanceCreatedListener) {
                  componentInstanceCreatedListener(target, vueI18n);
              }
          }
      };
      return vueI18n;
  }

  const baseFormatProps = {
      tag: {
          type: [String, Object]
      },
      locale: {
          type: String
      },
      scope: {
          type: String,
          validator: (val) => val === 'parent' || val === 'global',
          default: 'parent'
      }
  };

  const Translation = {
      name: 'i18n-t',
      props: {
          ...baseFormatProps,
          keypath: {
              type: String,
              required: true
          },
          plural: {
              type: [Number, String],
              validator: (val) => isNumber(val) || !isNaN(val)
          }
      },
      setup(props, context) {
          const { slots, attrs } = context;
          const i18n = useI18n({ useScope: props.scope });
          const keys = Object.keys(slots).filter(key => key !== '_');
          return () => {
              const options = {};
              if (props.locale) {
                  options.locale = props.locale;
              }
              if (props.plural !== undefined) {
                  options.plural = isString(props.plural) ? +props.plural : props.plural;
              }
              const arg = getInterpolateArg(context, keys);
              const children = i18n.__transrateVNode(props.keypath, arg, options);
              return isString(props.tag)
                  ? vue.h(props.tag, { ...attrs }, children)
                  : isObject(props.tag)
                      ? vue.h(props.tag, { ...attrs }, children)
                      : vue.h(vue.Fragment, { ...attrs }, children);
          };
      }
  };
  function getInterpolateArg({ slots }, keys) {
      if (keys.length === 1 && keys[0] === 'default') {
          return slots.default ? slots.default() : [];
      }
      else {
          return keys.reduce((arg, key) => {
              const slot = slots[key];
              if (slot) {
                  arg[key] = slot();
              }
              return arg;
          }, {});
      }
  }

  function renderFormatter(props, context, slotKeys, partFormatter) {
      const { slots, attrs } = context;
      return () => {
          const options = { part: true };
          let orverrides = {};
          if (props.locale) {
              options.locale = props.locale;
          }
          if (isString(props.format)) {
              options.key = props.format;
          }
          else if (isObject(props.format)) {
              if (isString(props.format.key)) {
                  options.key = props.format.key;
              }
              orverrides = Object.keys(props.format).reduce((options, prop) => {
                  return slotKeys.includes(prop)
                      ? Object.assign({}, options, { [prop]: props.format[prop] })
                      : options;
              }, {});
          }
          const parts = partFormatter(...[props.value, options, orverrides]);
          let children = [options.key];
          if (isArray(parts)) {
              children = parts.map((part, index) => {
                  const slot = slots[part.type];
                  return slot
                      ? slot({ [part.type]: part.value, index, parts })
                      : [part.value];
              });
          }
          else if (isString(parts)) {
              children = [parts];
          }
          return isString(props.tag)
              ? vue.h(props.tag, { ...attrs }, children)
              : isObject(props.tag)
                  ? vue.h(props.tag, { ...attrs }, children)
                  : vue.h(vue.Fragment, { ...attrs }, children);
      };
  }

  const NUMBER_FORMAT_KEYS = [
      'localeMatcher',
      'style',
      'unit',
      'unitDisplay',
      'currency',
      'currencyDisplay',
      'useGrouping',
      'numberingSystem',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits',
      'notation',
      'formatMatcher'
  ];
  const NumberFormat = {
      name: 'i18n-n',
      props: {
          ...baseFormatProps,
          value: {
              type: Number,
              required: true
          },
          format: {
              type: [String, Object]
          }
      },
      setup(props, context) {
          const i18n = useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n.__numberParts(...args));
      }
  };

  const DATETIME_FORMAT_KEYS = [
      'dateStyle',
      'timeStyle',
      'fractionalSecondDigits',
      'calendar',
      'dayPeriod',
      'numberingSystem',
      'localeMatcher',
      'timeZone',
      'hour12',
      'hourCycle',
      'formatMatcher',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'timeZoneName'
  ];
  const DatetimeFormat = {
      name: 'i18n-d',
      props: {
          ...baseFormatProps,
          value: {
              type: [Number, Date],
              required: true
          },
          format: {
              type: [String, Object]
          }
      },
      setup(props, context) {
          const i18n = useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n.__datetimeParts(...args));
      }
  };

  function getComposer(i18n, instance) {
      const i18nInternal = i18n;
      if (i18n.mode === 'composable') {
          return (i18nInternal.__getInstance(instance) || i18n.global);
      }
      else {
          const vueI18n = i18nInternal.__getInstance(instance);
          return (vueI18n != null
              ? vueI18n.__composer
              : i18n.global);
      }
  }
  function vTDirective(i18n) {
      const bind = (el, { instance, value, modifiers }) => {
          if (!instance || !instance.$) {
              throw createI18nError(15);
          }
          const composer = getComposer(i18n, instance.$);
          if (!composer) {
              throw createI18nError(19);
          }
          if ( modifiers.preserve) {
              warn(getWarnMessage$1(7));
          }
          const parsedValue = parseValue(value);
          el.textContent = composer.t(...makeParams(parsedValue));
      };
      return {
          beforeMount: bind,
          beforeUpdate: bind
      };
  }
  function parseValue(value) {
      if (isString(value)) {
          return { path: value };
      }
      else if (isPlainObject(value)) {
          if (!('path' in value)) {
              throw createI18nError(17, 'path');
          }
          return value;
      }
      else {
          throw createI18nError(18);
      }
  }
  function makeParams(value) {
      const { path, locale, args, choice, plural } = value;
      const options = {};
      const named = args || {};
      if (isString(locale)) {
          options.locale = locale;
      }
      if (isNumber(choice)) {
          options.plural = choice;
      }
      if (isNumber(plural)) {
          options.plural = plural;
      }
      return [path, named, options];
  }

  function apply(app, i18n, ...options) {
      const pluginOptions = isPlainObject(options[0])
          ? options[0]
          : {};
      const useI18nComponentName = !!pluginOptions.useI18nComponentName;
      const globalInstall = isBoolean(pluginOptions.globalInstall)
          ? pluginOptions.globalInstall
          : true;
      if ( globalInstall && useI18nComponentName) {
          warn(getWarnMessage$1(11, {
              name: Translation.name
          }));
      }
      if (globalInstall) {
          app.component(!useI18nComponentName ? Translation.name : 'i18n', Translation);
          app.component(NumberFormat.name, NumberFormat);
          app.component(DatetimeFormat.name, DatetimeFormat);
      }
      app.directive('t', vTDirective(i18n));
      if (!app.__VUE_I18N_SYMBOL__) {
          throw createI18nError(15);
      }
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
  }

  function defineMixin(vuei18n, composer, i18n) {
      const legacy = vuei18n;
      return {
          beforeCreate() {
              const instance = vue.getCurrentInstance();
              if (!instance) {
                  throw createI18nError(15);
              }
              const options = this.$options;
              if (options.i18n) {
                  const optionsI18n = options.i18n;
                  if (options.__i18n) {
                      optionsI18n.__i18n = options.__i18n;
                  }
                  optionsI18n.__root = composer;
                  this.$i18n = createVueI18n(optionsI18n);
                  legacy.__onComponentInstanceCreated(this.$i18n);
                  i18n.__setInstance(instance, this.$i18n);
              }
              else if (options.__i18n) {
                  this.$i18n = createVueI18n({
                      __i18n: options.__i18n,
                      __root: composer
                  });
                  legacy.__onComponentInstanceCreated(this.$i18n);
                  i18n.__setInstance(instance, this.$i18n);
              }
              else {
                  this.$i18n = legacy;
              }
              this.$t = (...args) => this.$i18n.t(...args);
              this.$tc = (...args) => this.$i18n.tc(...args);
              this.$te = (key, locale) => this.$i18n.te(key, locale);
              this.$d = (...args) => this.$i18n.d(...args);
              this.$n = (...args) => this.$i18n.n(...args);
              this.$tm = (key) => this.$i18n.tm(key);
          },
          mounted() {
              {
                  this.$el.__INTLIFY__ = this.$i18n.__composer;
              }
          },
          beforeDestroy() {
              const instance = vue.getCurrentInstance();
              if (!instance) {
                  throw createI18nError(15);
              }
              {
                  delete this.$el.__INTLIFY__;
              }
              delete this.$t;
              delete this.$tc;
              delete this.$te;
              delete this.$d;
              delete this.$n;
              delete this.$tm;
              i18n.__deleteInstance(instance);
              delete this.$i18n;
          }
      };
  }

  function createI18n(options = {}) {
      const __legacyMode = !!options.legacy;
      const __instances = new Map();
      const __global = __legacyMode
          ? createVueI18n(options)
          : createComposer(options);
      const symbol = Symbol( 'vue-i18n' );
      const i18n = {
          get mode() {
              return __legacyMode ? 'legacy' : 'composable';
          },
          install(app, ...options) {
              {
                  app.__VUE_I18N__ = i18n;
              }
              app.__VUE_I18N_SYMBOL__ = symbol;
              apply(app, i18n, ...options);
              if (__legacyMode) {
                  app.mixin(defineMixin(__global, __global.__composer, i18n));
              }
          },
          get global() {
              return __legacyMode
                  ? __global.__composer
                  : __global;
          },
          __instances,
          __getInstance(component) {
              return __instances.get(component) || null;
          },
          __setInstance(component, instance) {
              __instances.set(component, instance);
          },
          __deleteInstance(component) {
              __instances.delete(component);
          }
      };
      {
          devtoolsRegisterI18n(i18n, VERSION);
      }
      return i18n;
  }
  function useI18n(options = {}) {
      const instance = vue.getCurrentInstance();
      if (instance == null || !instance.appContext.app.__VUE_I18N_SYMBOL__) {
          throw createI18nError(15);
      }
      const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
      if (!i18n) {
          throw createI18nError(14);
      }
      const global = i18n.global;
      const scope = isEmptyObject(options)
          ? 'global'
          : !options.useScope
              ? 'local'
              : options.useScope;
      if (scope === 'global') {
          return global;
      }
      if (scope === 'parent') {
          let composer = getComposer$1(i18n, instance);
          if (composer == null) {
              {
                  warn(getWarnMessage$1(12));
              }
              composer = global;
          }
          return composer;
      }
      if (i18n.mode === 'legacy') {
          throw createI18nError(16);
      }
      const i18nInternal = i18n;
      let composer = i18nInternal.__getInstance(instance);
      if (composer == null) {
          const type = instance.type;
          const composerOptions = {
              ...options
          };
          if (type.__i18n) {
              composerOptions.__i18n = type.__i18n;
          }
          if (global) {
              composerOptions.__root = global;
          }
          composer = createComposer(composerOptions);
          setupLifeCycle(i18nInternal, instance, composer);
          i18nInternal.__setInstance(instance, composer);
      }
      return composer;
  }
  function getComposer$1(i18n, target) {
      let composer = null;
      const root = target.root;
      let current = target.parent;
      while (current != null) {
          const i18nInternal = i18n;
          if (i18n.mode === 'composable') {
              composer = i18nInternal.__getInstance(current);
          }
          else {
              const vueI18n = i18nInternal.__getInstance(current);
              if (vueI18n != null) {
                  composer = vueI18n
                      .__composer;
              }
          }
          if (composer != null) {
              break;
          }
          if (root === current) {
              break;
          }
          current = current.parent;
      }
      return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
      vue.onMounted(() => {
          if ( target.vnode.el) {
              target.vnode.el.__INTLIFY__ = composer;
          }
      }, target);
      vue.onUnmounted(() => {
          if (
              target.vnode.el &&
              target.vnode.el.__INTLIFY__) {
              delete target.vnode.el.__INTLIFY__;
          }
          i18n.__deleteInstance(target);
      }, target);
  }

  initDev();

  exports.DatetimeFormat = DatetimeFormat;
  exports.MISSING_RESOLVE_VALUE = MISSING_RESOLVE_VALUE;
  exports.NOT_REOSLVED = NOT_REOSLVED;
  exports.NumberFormat = NumberFormat;
  exports.Translation = Translation;
  exports.VERSION = VERSION;
  exports.baseCompile = baseCompile;
  exports.clearCompileCache = clearCompileCache;
  exports.clearDateTimeFormat = clearDateTimeFormat;
  exports.clearNumberFormat = clearNumberFormat;
  exports.compile = compile;
  exports.createI18n = createI18n;
  exports.createParser = createParser;
  exports.createRuntimeContext = createRuntimeContext;
  exports.datetime = datetime;
  exports.friendlyJSONstringify = friendlyJSONstringify;
  exports.generateFormatCacheKey = generateFormatCacheKey;
  exports.getLocaleChain = getLocaleChain;
  exports.handleMissing = handleMissing;
  exports.isTranslateMissingWarn = isTranslateMissingWarn;
  exports.isTrarnslateFallbackWarn = isTrarnslateFallbackWarn;
  exports.number = number;
  exports.parseDateTimeArgs = parseDateTimeArgs;
  exports.parseNumberArgs = parseNumberArgs;
  exports.parseTranslateArgs = parseTranslateArgs;
  exports.translate = translate;
  exports.updateFallbackLocale = updateFallbackLocale;
  exports.useI18n = useI18n;

  return exports;

}({}, Vue));
