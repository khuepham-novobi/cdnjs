(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sqlFormatter"] = factory();
	else
		root["sqlFormatter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sqlFormatter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Formatter.js":
/*!*******************************!*\
  !*** ./src/core/Formatter.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Formatter; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
/* harmony import */ var _Indentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Indentation */ "./src/core/Indentation.js");
/* harmony import */ var _InlineBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InlineBlock */ "./src/core/InlineBlock.js");
/* harmony import */ var _Params__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Params */ "./src/core/Params.js");
/* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer */ "./src/core/Tokenizer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var trimSpacesEnd = function trimSpacesEnd(str) {
  return str.replace(/[\t ]+$/, '');
};

var Formatter = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String} cfg.language
   *  @param {String} cfg.indent
   *  @param {Boolean} cfg.uppercase
   *  @param {Integer} cfg.linesBetweenQueries
   *  @param {Object} cfg.params
   */
  function Formatter(cfg) {
    _classCallCheck(this, Formatter);

    this.cfg = cfg || {};
    this.indentation = new _Indentation__WEBPACK_IMPORTED_MODULE_1__["default"](this.cfg.indent);
    this.inlineBlock = new _InlineBlock__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.params = new _Params__WEBPACK_IMPORTED_MODULE_3__["default"](this.cfg.params);
    this.previousReservedToken = {};
    this.tokens = [];
    this.index = 0;
  }
  /**
   * SQL Tokenizer for this formatter, typically overriden by subclasses.
   */


  _createClass(Formatter, [{
    key: "tokenOverride",

    /**
     * Reprocess and modify a token based on parsed context.
     *
     * @param {Object} token The token to modify
     *  @param {String} token.type
     *  @param {String} token.value
     * @return {?Object} modified token
     *  @return {String} token.type
     *  @return {String} token.value
     */
    value: function tokenOverride() {// do nothing
      // subclasses can override this to modify tokens during formatting
    }
    /**
     * Formats whitespace in a SQL string to make it easier to read.
     *
     * @param {String} query The SQL query string
     * @return {String} formatted query
     */

  }, {
    key: "format",
    value: function format(query) {
      this.tokens = this.constructor.tokenizer.tokenize(query);
      var formattedQuery = this.getFormattedQueryFromTokens();
      return formattedQuery.trim();
    }
  }, {
    key: "getFormattedQueryFromTokens",
    value: function getFormattedQueryFromTokens() {
      var _this = this;

      var formattedQuery = '';
      this.tokens.forEach(function (token, index) {
        _this.index = index;
        token = _this.tokenOverride(token) || token;

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WHITESPACE) {// ignore (we do our own whitespace formatting)
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT) {
          formattedQuery = _this.formatLineComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT) {
          formattedQuery = _this.formatBlockComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL) {
          formattedQuery = _this.formatTopLevelReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT) {
          formattedQuery = _this.formatTopLevelReservedWordNoIndent(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE) {
          formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED) {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER) {
          formattedQuery = _this.formatPlaceholder(token, formattedQuery);
        } else if (token.value === ',') {
          formattedQuery = _this.formatComma(token, formattedQuery);
        } else if (token.value === ':') {
          formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
        } else if (token.value === '.') {
          formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
        } else if (token.value === ';') {
          formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
        } else {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
        }
      });
      return formattedQuery;
    }
  }, {
    key: "formatLineComment",
    value: function formatLineComment(token, query) {
      return this.addNewline(query + token.value);
    }
  }, {
    key: "formatBlockComment",
    value: function formatBlockComment(token, query) {
      return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
    }
  }, {
    key: "indentComment",
    value: function indentComment(comment) {
      return comment.replace(/\n[\t ]*/g, '\n' + this.indentation.getIndent() + ' ');
    }
  }, {
    key: "formatTopLevelReservedWordNoIndent",
    value: function formatTopLevelReservedWordNoIndent(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query) + this.equalizeWhitespace(this.formatReservedWord(token.value));
      return this.addNewline(query);
    }
  }, {
    key: "formatTopLevelReservedWord",
    value: function formatTopLevelReservedWord(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query);
      this.indentation.increaseTopLevel();
      query += this.equalizeWhitespace(this.formatReservedWord(token.value));
      return this.addNewline(query);
    }
  }, {
    key: "formatNewlineReservedWord",
    value: function formatNewlineReservedWord(token, query) {
      return this.addNewline(query) + this.equalizeWhitespace(this.formatReservedWord(token.value)) + ' ';
    } // Replace any sequence of whitespace characters with single space

  }, {
    key: "equalizeWhitespace",
    value: function equalizeWhitespace(string) {
      return string.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');
    } // Opening parentheses increase the block indent level and start a new line

  }, {
    key: "formatOpeningParentheses",
    value: function formatOpeningParentheses(token, query) {
      var _preserveWhitespaceFo;

      // Take out the preceding space unless there was whitespace there in the original query
      // or another opening parens or line comment
      var preserveWhitespaceFor = (_preserveWhitespaceFo = {}, _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WHITESPACE, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR, true), _preserveWhitespaceFo);

      if (!preserveWhitespaceFor[this.previousToken().type]) {
        query = trimSpacesEnd(query);
      }

      query += this.cfg.uppercase ? token.value.toUpperCase() : token.value;
      this.inlineBlock.beginIfPossible(this.tokens, this.index);

      if (!this.inlineBlock.isActive()) {
        this.indentation.increaseBlockLevel();
        query = this.addNewline(query);
      }

      return query;
    } // Closing parentheses decrease the block indent level

  }, {
    key: "formatClosingParentheses",
    value: function formatClosingParentheses(token, query) {
      token.value = this.cfg.uppercase ? token.value.toUpperCase() : token.value;

      if (this.inlineBlock.isActive()) {
        this.inlineBlock.end();
        return this.formatWithSpaceAfter(token, query);
      } else {
        this.indentation.decreaseBlockLevel();
        return this.formatWithSpaces(token, this.addNewline(query));
      }
    }
  }, {
    key: "formatPlaceholder",
    value: function formatPlaceholder(token, query) {
      return query + this.params.get(token) + ' ';
    } // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)

  }, {
    key: "formatComma",
    value: function formatComma(token, query) {
      query = trimSpacesEnd(query) + token.value + ' ';

      if (this.inlineBlock.isActive()) {
        return query;
      } else if (/^LIMIT$/i.test(this.previousReservedToken.value)) {
        return query;
      } else {
        return this.addNewline(query);
      }
    }
  }, {
    key: "formatWithSpaceAfter",
    value: function formatWithSpaceAfter(token, query) {
      return trimSpacesEnd(query) + token.value + ' ';
    }
  }, {
    key: "formatWithoutSpaces",
    value: function formatWithoutSpaces(token, query) {
      return trimSpacesEnd(query) + token.value;
    }
  }, {
    key: "formatWithSpaces",
    value: function formatWithSpaces(token, query) {
      var value = token.type === 'reserved' ? this.formatReservedWord(token.value) : token.value;
      return query + value + ' ';
    }
  }, {
    key: "formatReservedWord",
    value: function formatReservedWord(value) {
      return this.cfg.uppercase ? value.toUpperCase() : value;
    }
  }, {
    key: "formatQuerySeparator",
    value: function formatQuerySeparator(token, query) {
      this.indentation.resetIndentation();
      return trimSpacesEnd(query) + token.value + '\n'.repeat(this.cfg.linesBetweenQueries || 1);
    }
  }, {
    key: "addNewline",
    value: function addNewline(query) {
      query = trimSpacesEnd(query);
      if (!query.endsWith('\n')) query += '\n';
      return query + this.indentation.getIndent();
    }
  }, {
    key: "previousToken",
    value: function previousToken() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index - offset] || {};
    }
  }, {
    key: "tokenLookBack",
    value: function tokenLookBack() {
      var maxBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      var start = Math.max(0, this.index - maxBack);
      var end = this.index;
      return this.tokens.slice(start, end).reverse();
    }
  }, {
    key: "tokenLookAhead",
    value: function tokenLookAhead() {
      var maxAhead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      var start = this.index + 1;
      var end = this.index + maxAhead + 1;
      return this.tokens.slice(start, end);
    }
  }]);

  return Formatter;
}();

_defineProperty(Formatter, "tokenizer", new _Tokenizer__WEBPACK_IMPORTED_MODULE_4__["default"]({
  reservedWords: [],
  reservedTopLevelWords: [],
  reservedNewlineWords: [],
  reservedTopLevelWordsNoIndent: [],
  stringTypes: [],
  openParens: [],
  closeParens: [],
  indexedPlaceholderTypes: [],
  namedPlaceholderTypes: [],
  lineCommentTypes: [],
  specialWordChars: []
}));



/***/ }),

/***/ "./src/core/Indentation.js":
/*!*********************************!*\
  !*** ./src/core/Indentation.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Indentation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
 */

var Indentation = /*#__PURE__*/function () {
  /**
   * @param {String} indent Indent value, default is "  " (2 spaces)
   */
  function Indentation(indent) {
    _classCallCheck(this, Indentation);

    this.indent = indent || '  ';
    this.indentTypes = [];
  }
  /**
   * Returns current indentation string.
   * @return {String}
   */


  _createClass(Indentation, [{
    key: "getIndent",
    value: function getIndent() {
      return this.indent.repeat(this.indentTypes.length);
    }
    /**
     * Increases indentation by one top-level indent.
     */

  }, {
    key: "increaseTopLevel",
    value: function increaseTopLevel() {
      this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }
    /**
     * Increases indentation by one block-level indent.
     */

  }, {
    key: "increaseBlockLevel",
    value: function increaseBlockLevel() {
      this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }
    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */

  }, {
    key: "decreaseTopLevel",
    value: function decreaseTopLevel() {
      if (this.indentTypes.length > 0 && this.indentTypes[this.indentTypes.length - 1] === INDENT_TYPE_TOP_LEVEL) {
        this.indentTypes.pop();
      }
    }
    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */

  }, {
    key: "decreaseBlockLevel",
    value: function decreaseBlockLevel() {
      while (this.indentTypes.length > 0) {
        var type = this.indentTypes.pop();

        if (type !== INDENT_TYPE_TOP_LEVEL) {
          break;
        }
      }
    }
  }, {
    key: "resetIndentation",
    value: function resetIndentation() {
      this.indentTypes = [];
    }
  }]);

  return Indentation;
}();



/***/ }),

/***/ "./src/core/InlineBlock.js":
/*!*********************************!*\
  !*** ./src/core/InlineBlock.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InlineBlock; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var INLINE_MAX_LENGTH = 50;
/**
 * Bookkeeper for inline blocks.
 *
 * Inline blocks are parenthized expressions that are shorter than INLINE_MAX_LENGTH.
 * These blocks are formatted on a single line, unlike longer parenthized
 * expressions where open-parenthesis causes newline and increase of indentation.
 */

var InlineBlock = /*#__PURE__*/function () {
  function InlineBlock() {
    _classCallCheck(this, InlineBlock);

    this.level = 0;
  }
  /**
   * Begins inline block when lookahead through upcoming tokens determines
   * that the block would be smaller than INLINE_MAX_LENGTH.
   * @param  {Object[]} tokens Array of all tokens
   * @param  {Number} index Current token position
   */


  _createClass(InlineBlock, [{
    key: "beginIfPossible",
    value: function beginIfPossible(tokens, index) {
      if (this.level === 0 && this.isInlineBlock(tokens, index)) {
        this.level = 1;
      } else if (this.level > 0) {
        this.level++;
      } else {
        this.level = 0;
      }
    }
    /**
     * Finishes current inline block.
     * There might be several nested ones.
     */

  }, {
    key: "end",
    value: function end() {
      this.level--;
    }
    /**
     * True when inside an inline block
     * @return {Boolean}
     */

  }, {
    key: "isActive",
    value: function isActive() {
      return this.level > 0;
    } // Check if this should be an inline parentheses block
    // Examples are "NOW()", "COUNT(*)", "int(10)", key(`somecolumn`), DECIMAL(7,2)

  }, {
    key: "isInlineBlock",
    value: function isInlineBlock(tokens, index) {
      var length = 0;
      var level = 0;

      for (var i = index; i < tokens.length; i++) {
        var token = tokens[i];
        length += token.value.length; // Overran max length

        if (length > INLINE_MAX_LENGTH) {
          return false;
        }

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          level++;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          level--;

          if (level === 0) {
            return true;
          }
        }

        if (this.isForbiddenToken(token)) {
          return false;
        }
      }

      return false;
    } // Reserved words that cause newlines, comments and semicolons
    // are not allowed inside inline parentheses block

  }, {
    key: "isForbiddenToken",
    value: function isForbiddenToken(_ref) {
      var type = _ref.type,
          value = _ref.value;
      return type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].COMMENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT || value === ';';
    }
  }]);

  return InlineBlock;
}();



/***/ }),

/***/ "./src/core/Params.js":
/*!****************************!*\
  !*** ./src/core/Params.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Params; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Handles placeholder replacement with given params.
 */
var Params = /*#__PURE__*/function () {
  /**
   * @param {Object} params
   */
  function Params(params) {
    _classCallCheck(this, Params);

    this.params = params;
    this.index = 0;
  }
  /**
   * Returns param value that matches given placeholder with param key.
   * @param {Object} token
   *   @param {String} token.key Placeholder key
   *   @param {String} token.value Placeholder value
   * @return {String} param or token.value when params are missing
   */


  _createClass(Params, [{
    key: "get",
    value: function get(_ref) {
      var key = _ref.key,
          value = _ref.value;

      if (!this.params) {
        return value;
      }

      if (key) {
        return this.params[key];
      }

      return this.params[this.index++];
    }
  }]);

  return Params;
}();



/***/ }),

/***/ "./src/core/Tokenizer.js":
/*!*******************************!*\
  !*** ./src/core/Tokenizer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tokenizer; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function isEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}

function escapeRegExp(string) {
  return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
}

var Tokenizer = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String[]} cfg.reservedWords Reserved words in SQL
   *  @param {String[]} cfg.reservedTopLevelWords Words that are set to new line separately
   *  @param {String[]} cfg.reservedNewlineWords Words that are set to newline
   *  @param {String[]} cfg.reservedTopLevelWordsNoIndent Words that are top level but have no indentation
   *  @param {String[]} cfg.stringTypes String types to enable: "", '', ``, [], N''
   *  @param {String[]} cfg.openParens Opening parentheses to enable, like (, [
   *  @param {String[]} cfg.closeParens Closing parentheses to enable, like ), ]
   *  @param {String[]} cfg.indexedPlaceholderTypes Prefixes for indexed placeholders, like ?
   *  @param {String[]} cfg.namedPlaceholderTypes Prefixes for named placeholders, like @ and :
   *  @param {String[]} cfg.lineCommentTypes Line comments to enable, like # and --
   *  @param {String[]} cfg.specialWordChars Special chars that can be found inside of words, like @ and #
   */
  function Tokenizer(cfg) {
    _classCallCheck(this, Tokenizer);

    this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
    this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/;
    this.OPERATOR_REGEX = /^(!=|<<|>>|<>|==|<=|>=|!<|!>|\|\|\/|\|\/|\|\||::|\x2D>>|\x2D>|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|@|:=|(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/;
    this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/;
    this.LINE_COMMENT_REGEX = this.createLineCommentRegex(cfg.lineCommentTypes);
    this.RESERVED_TOP_LEVEL_REGEX = this.createReservedWordRegex(cfg.reservedTopLevelWords);
    this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = this.createReservedWordRegex(cfg.reservedTopLevelWordsNoIndent);
    this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(cfg.reservedNewlineWords);
    this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(cfg.reservedWords);
    this.WORD_REGEX = this.createWordRegex(cfg.specialWordChars);
    this.STRING_REGEX = this.createStringRegex(cfg.stringTypes);
    this.OPEN_PAREN_REGEX = this.createParenRegex(cfg.openParens);
    this.CLOSE_PAREN_REGEX = this.createParenRegex(cfg.closeParens);
    this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.indexedPlaceholderTypes, '[0-9]*');
    this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
    this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, this.createStringPattern(cfg.stringTypes));
  }

  _createClass(Tokenizer, [{
    key: "createLineCommentRegex",
    value: function createLineCommentRegex(lineCommentTypes) {
      return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) {
        return escapeRegExp(c);
      }).join('|'), ").*?(?:\r\n|\r|\n|$))"), 'u');
    }
  }, {
    key: "createReservedWordRegex",
    value: function createReservedWordRegex(reservedWords) {
      if (reservedWords.length === 0) return new RegExp("^\b$", 'u');
      reservedWords = reservedWords.sort(function (a, b) {
        return b.length - a.length || a.localeCompare(b);
      });
      var reservedWordsPattern = reservedWords.join('|').replace(/ /g, '\\s+');
      return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
    }
  }, {
    key: "createWordRegex",
    value: function createWordRegex() {
      var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
    }
  }, {
    key: "createStringRegex",
    value: function createStringRegex(stringTypes) {
      return new RegExp('^(' + this.createStringPattern(stringTypes) + ')', 'u');
    } // This enables the following string patterns:
    // 1. backtick quoted string using `` to escape
    // 2. square bracket quoted string (SQL Server) using ]] to escape
    // 3. double quoted string using "" or \" to escape
    // 4. single quoted string using '' or \' to escape
    // 5. national character quoted string using N'' or N\' to escape

  }, {
    key: "createStringPattern",
    value: function createStringPattern(stringTypes) {
      var patterns = {
        '``': '((`[^`]*($|`))+)',
        '{}': '((\\{[^\\}]*($|\\}))+)',
        '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
        '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
        "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
        "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)"
      };
      return stringTypes.map(function (t) {
        return patterns[t];
      }).join('|');
    }
  }, {
    key: "createParenRegex",
    value: function createParenRegex(parens) {
      var _this = this;

      return new RegExp('^(' + parens.map(function (p) {
        return _this.escapeParen(p);
      }).join('|') + ')', 'iu');
    }
  }, {
    key: "escapeParen",
    value: function escapeParen(paren) {
      if (paren.length === 1) {
        // A single punctuation character
        return escapeRegExp(paren);
      } else {
        // longer word
        return '\\b' + paren + '\\b';
      }
    }
  }, {
    key: "createPlaceholderRegex",
    value: function createPlaceholderRegex(types, pattern) {
      if (isEmpty(types)) {
        return false;
      }

      var typesRegex = types.map(escapeRegExp).join('|');
      return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
    }
    /**
     * Takes a SQL string and breaks it into tokens.
     * Each token is an object with type and value.
     *
     * @param {String} input The SQL string
     * @return {Object[]} tokens An array of tokens.
     *  @return {String} token.type
     *  @return {String} token.value
     */

  }, {
    key: "tokenize",
    value: function tokenize(input) {
      var tokens = [];
      var token; // Keep processing the string until it is empty

      while (input.length) {
        // Get the next token and the token type
        token = this.getNextToken(input, token); // Advance the string

        input = input.substring(token.value.length);
        tokens.push(token);
      }

      return tokens;
    }
  }, {
    key: "getNextToken",
    value: function getNextToken(input, previousToken) {
      return this.getWhitespaceToken(input) || this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
    }
  }, {
    key: "getWhitespaceToken",
    value: function getWhitespaceToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WHITESPACE,
        regex: this.WHITESPACE_REGEX
      });
    }
  }, {
    key: "getCommentToken",
    value: function getCommentToken(input) {
      return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
    }
  }, {
    key: "getLineCommentToken",
    value: function getLineCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT,
        regex: this.LINE_COMMENT_REGEX
      });
    }
  }, {
    key: "getBlockCommentToken",
    value: function getBlockCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT,
        regex: this.BLOCK_COMMENT_REGEX
      });
    }
  }, {
    key: "getStringToken",
    value: function getStringToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].STRING,
        regex: this.STRING_REGEX
      });
    }
  }, {
    key: "getOpenParenToken",
    value: function getOpenParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN,
        regex: this.OPEN_PAREN_REGEX
      });
    }
  }, {
    key: "getCloseParenToken",
    value: function getCloseParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN,
        regex: this.CLOSE_PAREN_REGEX
      });
    }
  }, {
    key: "getPlaceholderToken",
    value: function getPlaceholderToken(input) {
      return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
    }
  }, {
    key: "getIdentNamedPlaceholderToken",
    value: function getIdentNamedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getStringNamedPlaceholderToken",
    value: function getStringNamedPlaceholderToken(input) {
      var _this2 = this;

      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return _this2.getEscapedPlaceholderKey({
            key: v.slice(2, -1),
            quoteChar: v.slice(-1)
          });
        }
      });
    }
  }, {
    key: "getIndexedPlaceholderToken",
    value: function getIndexedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.INDEXED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getPlaceholderTokenWithKey",
    value: function getPlaceholderTokenWithKey(_ref) {
      var input = _ref.input,
          regex = _ref.regex,
          parseKey = _ref.parseKey;
      var token = this.getTokenOnFirstMatch({
        input: input,
        regex: regex,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER
      });

      if (token) {
        token.key = parseKey(token.value);
      }

      return token;
    }
  }, {
    key: "getEscapedPlaceholderKey",
    value: function getEscapedPlaceholderKey(_ref2) {
      var key = _ref2.key,
          quoteChar = _ref2.quoteChar;
      return key.replace(new RegExp(escapeRegExp('\\' + quoteChar), 'gu'), quoteChar);
    } // Decimal, binary, or hex numbers

  }, {
    key: "getNumberToken",
    value: function getNumberToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].NUMBER,
        regex: this.NUMBER_REGEX
      });
    } // Punctuation and symbols

  }, {
    key: "getOperatorToken",
    value: function getOperatorToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR,
        regex: this.OPERATOR_REGEX
      });
    }
  }, {
    key: "getReservedWordToken",
    value: function getReservedWordToken(input, previousToken) {
      // A reserved word cannot be preceded by a "."
      // this makes it so in "mytable.from", "from" is not considered a reserved word
      if (previousToken && previousToken.value && previousToken.value === '.') {
        return undefined;
      }

      return this.getTopLevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getTopLevelReservedTokenNoIndent(input) || this.getPlainReservedToken(input);
    }
  }, {
    key: "getTopLevelReservedToken",
    value: function getTopLevelReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL,
        regex: this.RESERVED_TOP_LEVEL_REGEX
      });
    }
  }, {
    key: "getNewlineReservedToken",
    value: function getNewlineReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE,
        regex: this.RESERVED_NEWLINE_REGEX
      });
    }
  }, {
    key: "getTopLevelReservedTokenNoIndent",
    value: function getTopLevelReservedTokenNoIndent(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT,
        regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
      });
    }
  }, {
    key: "getPlainReservedToken",
    value: function getPlainReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED,
        regex: this.RESERVED_PLAIN_REGEX
      });
    }
  }, {
    key: "getWordToken",
    value: function getWordToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WORD,
        regex: this.WORD_REGEX
      });
    }
  }, {
    key: "getTokenOnFirstMatch",
    value: function getTokenOnFirstMatch(_ref3) {
      var input = _ref3.input,
          type = _ref3.type,
          regex = _ref3.regex;
      var matches = input.match(regex);
      return matches ? {
        type: type,
        value: matches[1]
      } : undefined;
    }
  }]);

  return Tokenizer;
}();



/***/ }),

/***/ "./src/core/tokenTypes.js":
/*!********************************!*\
  !*** ./src/core/tokenTypes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Constants for token types
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  WHITESPACE: 'whitespace',
  WORD: 'word',
  STRING: 'string',
  RESERVED: 'reserved',
  RESERVED_TOP_LEVEL: 'reserved-top-level',
  RESERVED_TOP_LEVEL_NO_INDENT: 'reserved-top-level-no-indent',
  RESERVED_NEWLINE: 'reserved-newline',
  OPERATOR: 'operator',
  OPEN_PAREN: 'open-paren',
  CLOSE_PAREN: 'close-paren',
  LINE_COMMENT: 'line-comment',
  BLOCK_COMMENT: 'block-comment',
  NUMBER: 'number',
  PLACEHOLDER: 'placeholder'
});

/***/ }),

/***/ "./src/languages/Db2Formatter.js":
/*!***************************************!*\
  !*** ./src/languages/Db2Formatter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Db2Formatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reservedWords = ['ABS', 'ACTIVATE', 'ALIAS', 'ALL', 'ALLOCATE', 'ALLOW', 'ALTER', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASC', 'ASENSITIVE', 'ASSOCIATE', 'ASUTIME', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTES', 'AUDIT', 'AUTHORIZATION', 'AUX', 'AUXILIARY', 'AVG', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BUFFERPOOL', 'BY', 'CACHE', 'CALL', 'CALLED', 'CAPTURE', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CCSID', 'CEIL', 'CEILING', 'CHAR', 'CHARACTER', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHECK', 'CLOB', 'CLONE', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLECT', 'COLLECTION', 'COLLID', 'COLUMN', 'COMMENT', 'COMMIT', 'CONCAT', 'CONDITION', 'CONNECT', 'CONNECTION', 'CONSTRAINT', 'CONTAINS', 'CONTINUE', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COUNT_BIG', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_LC_CTYPE', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_SERVER', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DATAPARTITIONNAME', 'DATAPARTITIONNUM', 'DATE', 'DAY', 'DAYS', 'DB2GENERAL', 'DB2GENRL', 'DB2SQL', 'DBINFO', 'DBPARTITIONNAME', 'DBPARTITIONNUM', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFINITION', 'DELETE', 'DENSERANK', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DISABLE', 'DISALLOW', 'DISCONNECT', 'DISTINCT', 'DO', 'DOCUMENT', 'DOUBLE', 'DROP', 'DSSIZE', 'DYNAMIC', 'EACH', 'EDITPROC', 'ELEMENT', 'ELSE', 'ELSEIF', 'ENABLE', 'ENCODING', 'ENCRYPTION', 'END', 'END-EXEC', 'ENDING', 'ERASE', 'ESCAPE', 'EVERY', 'EXCEPTION', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXIT', 'EXP', 'EXPLAIN', 'EXTENDED', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FENCED', 'FETCH', 'FIELDPROC', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FULL', 'FUNCTION', 'FUSION', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GOTO', 'GRANT', 'GRAPHIC', 'GROUP', 'GROUPING', 'HANDLER', 'HASH', 'HASHED_VALUE', 'HINT', 'HOLD', 'HOUR', 'HOURS', 'IDENTITY', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INCLUSIVE', 'INCREMENT', 'INDEX', 'INDICATOR', 'INDICATORS', 'INF', 'INFINITY', 'INHERIT', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'ISOBID', 'ISOLATION', 'ITERATE', 'JAR', 'JAVA', 'KEEP', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LATERAL', 'LC_CTYPE', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LINKTYPE', 'LN', 'LOCAL', 'LOCALDATE', 'LOCALE', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATOR', 'LOCATORS', 'LOCK', 'LOCKMAX', 'LOCKSIZE', 'LONG', 'LOOP', 'LOWER', 'MAINTAINED', 'MATCH', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MEMBER', 'MERGE', 'METHOD', 'MICROSECOND', 'MICROSECONDS', 'MIN', 'MINUTE', 'MINUTES', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MONTHS', 'MULTISET', 'NAN', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NEW_TABLE', 'NEXTVAL', 'NO', 'NOCACHE', 'NOCYCLE', 'NODENAME', 'NODENUMBER', 'NOMAXVALUE', 'NOMINVALUE', 'NONE', 'NOORDER', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'NUMPARTS', 'OBID', 'OCTET_LENGTH', 'OF', 'OFFSET', 'OLD', 'OLD_TABLE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZATION', 'OPTIMIZE', 'OPTION', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'PACKAGE', 'PADDED', 'PAGESIZE', 'PARAMETER', 'PART', 'PARTITION', 'PARTITIONED', 'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PATH', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PIECESIZE', 'PLAN', 'POSITION', 'POWER', 'PRECISION', 'PREPARE', 'PREVVAL', 'PRIMARY', 'PRIQTY', 'PRIVILEGES', 'PROCEDURE', 'PROGRAM', 'PSID', 'PUBLIC', 'QUERY', 'QUERYNO', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RENAME', 'REPEAT', 'RESET', 'RESIGNAL', 'RESTART', 'RESTRICT', 'RESULT', 'RESULT_SET_LOCATOR', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUND_CEILING', 'ROUND_DOWN', 'ROUND_FLOOR', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_UP', 'ROUND_UP', 'ROUTINE', 'ROW', 'ROWNUMBER', 'ROWS', 'ROWSET', 'ROW_NUMBER', 'RRN', 'RUN', 'SAVEPOINT', 'SCHEMA', 'SCOPE', 'SCRATCHPAD', 'SCROLL', 'SEARCH', 'SECOND', 'SECONDS', 'SECQTY', 'SECURITY', 'SENSITIVE', 'SEQUENCE', 'SESSION', 'SESSION_USER', 'SIGNAL', 'SIMILAR', 'SIMPLE', 'SMALLINT', 'SNAN', 'SOME', 'SOURCE', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLID', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STACKED', 'STANDARD', 'START', 'STARTING', 'STATEMENT', 'STATIC', 'STATMENT', 'STAY', 'STDDEV_POP', 'STDDEV_SAMP', 'STOGROUP', 'STORES', 'STYLE', 'SUBMULTISET', 'SUBSTRING', 'SUM', 'SUMMARY', 'SYMMETRIC', 'SYNONYM', 'SYSFUN', 'SYSIBM', 'SYSPROC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'TABLESPACE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSLATE', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TYPE', 'UESCAPE', 'UNDO', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNTIL', 'UPPER', 'USAGE', 'USER', 'USING', 'VALIDPROC', 'VALUE', 'VARCHAR', 'VARIABLE', 'VARIANT', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VCAT', 'VERSION', 'VIEW', 'VOLATILE', 'VOLUMES', 'WHEN', 'WHENEVER', 'WHILE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WLM', 'WRITE', 'XMLELEMENT', 'XMLEXISTS', 'XMLNAMESPACES', 'YEAR', 'YEARS'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INTERSECT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN'];

var Db2Formatter = /*#__PURE__*/function (_Formatter) {
  _inherits(Db2Formatter, _Formatter);

  var _super = _createSuper(Db2Formatter);

  function Db2Formatter() {
    _classCallCheck(this, Db2Formatter);

    return _super.apply(this, arguments);
  }

  return Db2Formatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(Db2Formatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "''", '``', '[]'],
  openParens: ['('],
  closeParens: [')'],
  indexedPlaceholderTypes: ['?'],
  namedPlaceholderTypes: [':'],
  lineCommentTypes: ['--'],
  specialWordChars: ['#', '@']
}));



/***/ }),

/***/ "./src/languages/N1qlFormatter.js":
/*!****************************************!*\
  !*** ./src/languages/N1qlFormatter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return N1qlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reservedWords = ['ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'BEGIN', 'BETWEEN', 'BINARY', 'BOOLEAN', 'BREAK', 'BUCKET', 'BUILD', 'BY', 'CALL', 'CASE', 'CAST', 'CLUSTER', 'COLLATE', 'COLLECTION', 'COMMIT', 'CONNECT', 'CONTINUE', 'CORRELATE', 'COVER', 'CREATE', 'DATABASE', 'DATASET', 'DATASTORE', 'DECLARE', 'DECREMENT', 'DELETE', 'DERIVED', 'DESC', 'DESCRIBE', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELEMENT', 'ELSE', 'END', 'EVERY', 'EXCEPT', 'EXCLUDE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST', 'FLATTEN', 'FOR', 'FORCE', 'FROM', 'FUNCTION', 'GRANT', 'GROUP', 'GSI', 'HAVING', 'IF', 'IGNORE', 'ILIKE', 'IN', 'INCLUDE', 'INCREMENT', 'INDEX', 'INFER', 'INLINE', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'KEY', 'KEYS', 'KEYSPACE', 'KNOWN', 'LAST', 'LEFT', 'LET', 'LETTING', 'LIKE', 'LIMIT', 'LSM', 'MAP', 'MAPPING', 'MATCHED', 'MATERIALIZED', 'MERGE', 'MISSING', 'NAMESPACE', 'NEST', 'NOT', 'NULL', 'NUMBER', 'OBJECT', 'OFFSET', 'ON', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OVER', 'PARSE', 'PARTITION', 'PASSWORD', 'PATH', 'POOL', 'PREPARE', 'PRIMARY', 'PRIVATE', 'PRIVILEGE', 'PROCEDURE', 'PUBLIC', 'RAW', 'REALM', 'REDUCE', 'RENAME', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'SATISFIES', 'SCHEMA', 'SELECT', 'SELF', 'SEMI', 'SET', 'SHOW', 'SOME', 'START', 'STATISTICS', 'STRING', 'SYSTEM', 'THEN', 'TO', 'TRANSACTION', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNDER', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNSET', 'UPDATE', 'UPSERT', 'USE', 'USER', 'USING', 'VALIDATE', 'VALUE', 'VALUED', 'VALUES', 'VIA', 'VIEW', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WITHIN', 'WORK', 'XOR'];
var reservedTopLevelWords = ['DELETE FROM', 'EXCEPT ALL', 'EXCEPT', 'EXPLAIN DELETE FROM', 'EXPLAIN UPDATE', 'EXPLAIN UPSERT', 'FROM', 'GROUP BY', 'HAVING', 'INFER', 'INSERT INTO', 'LET', 'LIMIT', 'MERGE', 'NEST', 'ORDER BY', 'PREPARE', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNNEST', 'UPDATE', 'UPSERT', 'USE KEYS', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'XOR'];

var N1qlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(N1qlFormatter, _Formatter);

  var _super = _createSuper(N1qlFormatter);

  function N1qlFormatter() {
    _classCallCheck(this, N1qlFormatter);

    return _super.apply(this, arguments);
  }

  return N1qlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(N1qlFormatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "''", '``'],
  openParens: ['(', '[', '{'],
  closeParens: [')', ']', '}'],
  namedPlaceholderTypes: ['$'],
  lineCommentTypes: ['#', '--']
}));



/***/ }),

/***/ "./src/languages/PlSqlFormatter.js":
/*!*****************************************!*\
  !*** ./src/languages/PlSqlFormatter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var reservedWords = ['A', 'ACCESSIBLE', 'AGENT', 'AGGREGATE', 'ALL', 'ALTER', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'ATTRIBUTE', 'AUTHID', 'AVG', 'BETWEEN', 'BFILE_BASE', 'BINARY_INTEGER', 'BINARY', 'BLOB_BASE', 'BLOCK', 'BODY', 'BOOLEAN', 'BOTH', 'BOUND', 'BREADTH', 'BULK', 'BY', 'BYTE', 'C', 'CALL', 'CALLING', 'CASCADE', 'CASE', 'CHAR_BASE', 'CHAR', 'CHARACTER', 'CHARSET', 'CHARSETFORM', 'CHARSETID', 'CHECK', 'CLOB_BASE', 'CLONE', 'CLOSE', 'CLUSTER', 'CLUSTERS', 'COALESCE', 'COLAUTH', 'COLLECT', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPILED', 'COMPRESS', 'CONNECT', 'CONSTANT', 'CONSTRUCTOR', 'CONTEXT', 'CONTINUE', 'CONVERT', 'COUNT', 'CRASH', 'CREATE', 'CREDENTIAL', 'CURRENT', 'CURRVAL', 'CURSOR', 'CUSTOMDATUM', 'DANGLING', 'DATA', 'DATE_BASE', 'DATE', 'DAY', 'DECIMAL', 'DEFAULT', 'DEFINE', 'DELETE', 'DEPTH', 'DESC', 'DETERMINISTIC', 'DIRECTORY', 'DISTINCT', 'DO', 'DOUBLE', 'DROP', 'DURATION', 'ELEMENT', 'ELSIF', 'EMPTY', 'END', 'ESCAPE', 'EXCEPTIONS', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTENDS', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FINAL', 'FIRST', 'FIXED', 'FLOAT', 'FOR', 'FORALL', 'FORCE', 'FROM', 'FUNCTION', 'GENERAL', 'GOTO', 'GRANT', 'GROUP', 'HASH', 'HEAP', 'HIDDEN', 'HOUR', 'IDENTIFIED', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INDEX', 'INDEXES', 'INDICATOR', 'INDICES', 'INFINITE', 'INSTANTIABLE', 'INT', 'INTEGER', 'INTERFACE', 'INTERVAL', 'INTO', 'INVALIDATE', 'IS', 'ISOLATION', 'JAVA', 'LANGUAGE', 'LARGE', 'LEADING', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE2', 'LIKE4', 'LIKEC', 'LIMITED', 'LOCAL', 'LOCK', 'LONG', 'MAP', 'MAX', 'MAXLEN', 'MEMBER', 'MERGE', 'MIN', 'MINUTE', 'MLSLABEL', 'MOD', 'MODE', 'MONTH', 'MULTISET', 'NAME', 'NAN', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALN', 'NCHAR', 'NEW', 'NEXTVAL', 'NOCOMPRESS', 'NOCOPY', 'NOT', 'NOWAIT', 'NULL', 'NULLIF', 'NUMBER_BASE', 'NUMBER', 'OBJECT', 'OCICOLL', 'OCIDATE', 'OCIDATETIME', 'OCIDURATION', 'OCIINTERVAL', 'OCILOBLOCATOR', 'OCINUMBER', 'OCIRAW', 'OCIREF', 'OCIREFCURSOR', 'OCIROWID', 'OCISTRING', 'OCITYPE', 'OF', 'OLD', 'ON', 'ONLY', 'OPAQUE', 'OPEN', 'OPERATOR', 'OPTION', 'ORACLE', 'ORADATA', 'ORDER', 'ORGANIZATION', 'ORLANY', 'ORLVARY', 'OTHERS', 'OUT', 'OVERLAPS', 'OVERRIDING', 'PACKAGE', 'PARALLEL_ENABLE', 'PARAMETER', 'PARAMETERS', 'PARENT', 'PARTITION', 'PASCAL', 'PCTFREE', 'PIPE', 'PIPELINED', 'PLS_INTEGER', 'PLUGGABLE', 'POSITIVE', 'POSITIVEN', 'PRAGMA', 'PRECISION', 'PRIOR', 'PRIVATE', 'PROCEDURE', 'PUBLIC', 'RAISE', 'RANGE', 'RAW', 'READ', 'REAL', 'RECORD', 'REF', 'REFERENCE', 'RELEASE', 'RELIES_ON', 'REM', 'REMAINDER', 'RENAME', 'RESOURCE', 'RESULT_CACHE', 'RESULT', 'RETURN', 'RETURNING', 'REVERSE', 'REVOKE', 'ROLLBACK', 'ROW', 'ROWID', 'ROWNUM', 'ROWTYPE', 'SAMPLE', 'SAVE', 'SAVEPOINT', 'SB1', 'SB2', 'SB4', 'SEARCH', 'SECOND', 'SEGMENT', 'SELF', 'SEPARATE', 'SEQUENCE', 'SERIALIZABLE', 'SHARE', 'SHORT', 'SIZE_T', 'SIZE', 'SMALLINT', 'SOME', 'SPACE', 'SPARSE', 'SQL', 'SQLCODE', 'SQLDATA', 'SQLERRM', 'SQLNAME', 'SQLSTATE', 'STANDARD', 'START', 'STATIC', 'STDDEV', 'STORED', 'STRING', 'STRUCT', 'STYLE', 'SUBMULTISET', 'SUBPARTITION', 'SUBSTITUTABLE', 'SUBTYPE', 'SUCCESSFUL', 'SUM', 'SYNONYM', 'SYSDATE', 'TABAUTH', 'TABLE', 'TDO', 'THE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_ABBR', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TIMEZONE_REGION', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSACTIONAL', 'TRIGGER', 'TRUE', 'TRUSTED', 'TYPE', 'UB1', 'UB2', 'UB4', 'UID', 'UNDER', 'UNIQUE', 'UNPLUG', 'UNSIGNED', 'UNTRUSTED', 'USE', 'USER', 'USING', 'VALIDATE', 'VALIST', 'VALUE', 'VARCHAR', 'VARCHAR2', 'VARIABLE', 'VARIANCE', 'VARRAY', 'VARYING', 'VIEW', 'VIEWS', 'VOID', 'WHENEVER', 'WHILE', 'WITH', 'WORK', 'WRAPPED', 'WRITE', 'YEAR', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'BEGIN', 'CONNECT BY', 'DECLARE', 'DELETE FROM', 'DELETE', 'END', 'EXCEPT', 'EXCEPTION', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'LOOP', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'START WITH', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'CROSS JOIN', 'ELSE', 'END', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'XOR'];

var PlSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PlSqlFormatter, _Formatter);

  var _super = _createSuper(PlSqlFormatter);

  function PlSqlFormatter() {
    _classCallCheck(this, PlSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PlSqlFormatter, [{
    key: "tokenOverride",
    value: function tokenOverride(token) {
      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED_TOP_LEVEL && token.value.toUpperCase() === 'SET' && this.previousReservedToken.value.toUpperCase() === 'BY') {
        token.type = _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED;
        return token;
      }

      return undefined;
    }
  }]);

  return PlSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(PlSqlFormatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "N''", "''", '``'],
  openParens: ['(', 'CASE'],
  closeParens: [')', 'END'],
  indexedPlaceholderTypes: ['?'],
  namedPlaceholderTypes: [':'],
  lineCommentTypes: ['--'],
  specialWordChars: ['_', '$', '#', '.', '@']
}));



/***/ }),

/***/ "./src/languages/RedshiftFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/RedshiftFormatter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reservedWords = ['AES128', 'AES256', 'ALLOWOVERWRITE', 'ANALYSE', 'ARRAY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BINARY', 'BLANKSASNULL', 'BOTH', 'BYTEDICT', 'BZIP2', 'CAST', 'CHECK', 'COLLATE', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CREDENTIALS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURRENT_USER_ID', 'DEFAULT', 'DEFERRABLE', 'DEFLATE', 'DEFRAG', 'DELTA', 'DELTA32K', 'DESC', 'DISABLE', 'DISTINCT', 'DO', 'ELSE', 'EMPTYASNULL', 'ENABLE', 'ENCODE', 'ENCRYPT', 'ENCRYPTION', 'END', 'EXPLICIT', 'FALSE', 'FOR', 'FOREIGN', 'FREEZE', 'FULL', 'GLOBALDICT256', 'GLOBALDICT64K', 'GRANT', 'GZIP', 'IDENTITY', 'IGNORE', 'ILIKE', 'INITIALLY', 'INTO', 'LEADING', 'LOCALTIME', 'LOCALTIMESTAMP', 'LUN', 'LUNS', 'LZO', 'LZOP', 'MINUS', 'MOSTLY13', 'MOSTLY32', 'MOSTLY8', 'NATURAL', 'NEW', 'NULLS', 'OFF', 'OFFLINE', 'OFFSET', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OVERLAPS', 'PARALLEL', 'PARTITION', 'PERCENT', 'PERMISSIONS', 'PLACING', 'PRIMARY', 'RAW', 'READRATIO', 'RECOVER', 'REFERENCES', 'REJECTLOG', 'RESORT', 'RESTORE', 'SESSION_USER', 'SIMILAR', 'SYSDATE', 'SYSTEM', 'TABLE', 'TAG', 'TDES', 'TEXT255', 'TEXT32K', 'THEN', 'TIMESTAMP', 'TO', 'TOP', 'TRAILING', 'TRUE', 'TRUNCATECOLUMNS', 'UNIQUE', 'USER', 'USING', 'VERBOSE', 'WALLET', 'WHEN', 'WITH', 'WITHOUT', 'PREDICATE', 'COLUMNS', 'COMPROWS', 'COMPRESSION', 'COPY', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE', 'VACUUM', 'COPY', 'UNLOAD', 'EVEN', 'ALL'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'INTERSECT', 'TOP', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNION ALL', 'UNION', 'UPDATE', 'VALUES', 'WHERE', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE'];
var reservedTopLevelWordsNoIndent = [];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED'];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(StandardSqlFormatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "''", '``'],
  openParens: ['('],
  closeParens: [')'],
  indexedPlaceholderTypes: ['?'],
  namedPlaceholderTypes: ['@', '#', '$'],
  lineCommentTypes: ['--']
}));



/***/ }),

/***/ "./src/languages/SparkSqlFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/SparkSqlFormatter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SparkSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var reservedWords = ['ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'ARRAY_ZIP', 'ARRAY', 'AS', 'ASC', 'AVG', 'BETWEEN', 'CASCADE', 'CASE', 'CAST', 'COALESCE', 'COLLECT_LIST', 'COLLECT_SET', 'COLUMN', 'COLUMNS', 'COMMENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'COUNT', 'CUME_DIST', 'CURRENT ROW', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DATE_ADD', 'DATE_SUB', 'DATE_TRUNC', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DAY', 'DAYS', 'DECODE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DROP', 'ELSE', 'ENCODE', 'END', 'EXISTS', 'EXPLAIN', 'EXPLODE_OUTER', 'EXPLODE', 'FILTER', 'FIRST_VALUE', 'FIRST', 'FIXED', 'FLATTEN', 'FOLLOWING', 'FROM_UNIXTIME', 'FULL', 'GREATEST', 'GROUP_CONCAT', 'HOUR_MINUTE', 'HOUR_SECOND', 'HOUR', 'HOURS', 'IF', 'IFNULL', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS', 'LAG', 'LAST_VALUE', 'LAST', 'LEAD', 'LEADING', 'LEAST', 'LEVEL', 'LIKE', 'MAX', 'MERGE', 'MIN', 'MINUTE_SECOND', 'MINUTE', 'MONTH', 'NATURAL', 'NOT', 'NOW()', 'NTILE', 'NULL', 'NULLIF', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPTIMIZE', 'OVER', 'PERCENT_RANK', 'PRECEDING', 'RANGE', 'RANK', 'REGEXP', 'RENAME', 'RLIKE', 'ROW', 'ROWS', 'SECOND', 'SEPARATOR', 'SEQUENCE', 'SIZE', 'STRING', 'STRUCT', 'SUM', 'TABLE', 'TABLES', 'TEMPORARY', 'THEN', 'TO_DATE', 'TO_JSON', 'TO', 'TRAILING', 'TRANSFORM', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNIQUE', 'UNIX_TIMESTAMP', 'UNLOCK', 'UNSIGNED', 'USING', 'VARIABLES', 'VIEW', 'WHEN', 'WITH', 'YEAR_MONTH'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER DATABASE', 'ALTER SCHEMA', 'ALTER TABLE', 'CLUSTER BY', 'CLUSTERED BY', 'DELETE FROM', 'DISTRIBUTE BY', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'OPTIONS', 'ORDER BY', 'PARTITION BY', 'PARTITIONED BY', 'RANGE', 'ROWS', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'TBLPROPERTIES', 'UPDATE', 'USING', 'VALUES', 'WHERE', 'WINDOW'];
var reservedTopLevelWordsNoIndent = ['EXCEPT ALL', 'EXCEPT', 'INTERSECT ALL', 'INTERSECT', 'UNION ALL', 'UNION'];
var reservedNewlineWords = ['AND', 'ANTI JOIN', 'CREATE OR', 'CREATE', 'CROSS JOIN', 'ELSE', 'FULL OUTER JOIN', 'INNER JOIN', 'JOIN', 'LATERAL VIEW', 'LEFT ANTI JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'LEFT SEMI JOIN', 'NATURAL ANTI JOIN', 'NATURAL FULL OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL JOIN', 'NATURAL LEFT ANTI JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL LEFT SEMI JOIN', 'NATURAL OUTER JOIN', 'NATURAL RIGHT OUTER JOIN', 'NATURAL RIGHT SEMI JOIN', 'NATURAL SEMI JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'RIGHT SEMI JOIN', 'SEMI JOIN', 'WHEN', 'XOR'];

var SparkSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SparkSqlFormatter, _Formatter);

  var _super = _createSuper(SparkSqlFormatter);

  function SparkSqlFormatter() {
    _classCallCheck(this, SparkSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SparkSqlFormatter, [{
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // Fix cases where names are ambiguously keywords or functions
      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED_TOP_LEVEL && token.value.toUpperCase() === 'WINDOW') {
        var lookAhead = this.tokenLookAhead();

        for (var i = 0; i < lookAhead.length; i++) {
          var aheadToken = lookAhead[i];

          if (aheadToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].OPEN_PAREN) {
            // This is a function call, treat it as a reserved word
            token.type = _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED;
          }

          return token;
        }
      } // Fix cases where names are ambiguously keywords or properties


      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].CLOSE_PAREN && token.value.toUpperCase() === 'END') {
        var lookBack = this.tokenLookBack();

        for (var _i = 0; _i < lookBack.length; _i++) {
          var backToken = lookBack[_i];

          if (backToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].OPERATOR && backToken.value === '.') {
            // This is window().end (or similar) not CASE ... END
            token.type = _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].WORD;
          }

          return token;
        }
      }

      return undefined;
    }
  }]);

  return SparkSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(SparkSqlFormatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "''", '``', '{}'],
  openParens: ['(', 'CASE'],
  closeParens: [')', 'END'],
  indexedPlaceholderTypes: ['?'],
  namedPlaceholderTypes: ['$'],
  lineCommentTypes: ['--']
}));



/***/ }),

/***/ "./src/languages/StandardSqlFormatter.js":
/*!***********************************************!*\
  !*** ./src/languages/StandardSqlFormatter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reservedWords = ['ACCESSIBLE', 'ACTION', 'AGAINST', 'AGGREGATE', 'ALGORITHM', 'ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'AS', 'ASC', 'AUTOCOMMIT', 'AUTO_INCREMENT', 'BACKUP', 'BEGIN', 'BETWEEN', 'BINLOG', 'BOTH', 'CASCADE', 'CHANGE', 'CHANGED', 'CHARACTER SET', 'CHARSET', 'CHECK', 'CHECKSUM', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPRESSED', 'CONCURRENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DAY', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DEFAULT', 'DEFINER', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO', 'DROP', 'DUMPFILE', 'DUPLICATE', 'DYNAMIC', 'ELSE', 'ENCLOSED', 'ENGINE', 'ENGINES', 'ENGINE_TYPE', 'ESCAPE', 'ESCAPED', 'EVENTS', 'EXEC', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXTENDED', 'FAST', 'FETCH', 'FIELDS', 'FILE', 'FIRST', 'FIXED', 'FLUSH', 'FOR', 'FORCE', 'FOREIGN', 'FULL', 'FULLTEXT', 'FUNCTION', 'GLOBAL', 'GRANT', 'GRANTS', 'GROUP_CONCAT', 'HEAP', 'HIGH_PRIORITY', 'HOSTS', 'HOUR', 'HOUR_MINUTE', 'HOUR_SECOND', 'IDENTIFIED', 'IF', 'IFNULL', 'IGNORE', 'IN', 'INDEX', 'INDEXES', 'INFILE', 'INSERT', 'INSERT_ID', 'INSERT_METHOD', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISOLATION', 'KEY', 'KEYS', 'KILL', 'LAST_INSERT_ID', 'LEADING', 'LEVEL', 'LIKE', 'LINEAR', 'LINES', 'LOAD', 'LOCAL', 'LOCK', 'LOCKS', 'LOGS', 'LOW_PRIORITY', 'MARIA', 'MASTER', 'MASTER_CONNECT_RETRY', 'MASTER_HOST', 'MASTER_LOG_FILE', 'MATCH', 'MAX_CONNECTIONS_PER_HOUR', 'MAX_QUERIES_PER_HOUR', 'MAX_ROWS', 'MAX_UPDATES_PER_HOUR', 'MAX_USER_CONNECTIONS', 'MEDIUM', 'MERGE', 'MINUTE', 'MINUTE_SECOND', 'MIN_ROWS', 'MODE', 'MODIFY', 'MONTH', 'MRG_MYISAM', 'MYISAM', 'NAMES', 'NATURAL', 'NOT', 'NOW()', 'NULL', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OUTFILE', 'PACK_KEYS', 'PAGE', 'PARTIAL', 'PARTITION', 'PARTITIONS', 'PASSWORD', 'PRIMARY', 'PRIVILEGES', 'PROCEDURE', 'PROCESS', 'PROCESSLIST', 'PURGE', 'QUICK', 'RAID0', 'RAID_CHUNKS', 'RAID_CHUNKSIZE', 'RAID_TYPE', 'RANGE', 'READ', 'READ_ONLY', 'READ_WRITE', 'REFERENCES', 'REGEXP', 'RELOAD', 'RENAME', 'REPAIR', 'REPEATABLE', 'REPLACE', 'REPLICATION', 'RESET', 'RESTORE', 'RESTRICT', 'RETURN', 'RETURNS', 'REVOKE', 'RLIKE', 'ROLLBACK', 'ROW', 'ROWS', 'ROW_FORMAT', 'SECOND', 'SECURITY', 'SEPARATOR', 'SERIALIZABLE', 'SESSION', 'SHARE', 'SHOW', 'SHUTDOWN', 'SLAVE', 'SONAME', 'SOUNDS', 'SQL', 'SQL_AUTO_IS_NULL', 'SQL_BIG_RESULT', 'SQL_BIG_SELECTS', 'SQL_BIG_TABLES', 'SQL_BUFFER_RESULT', 'SQL_CACHE', 'SQL_CALC_FOUND_ROWS', 'SQL_LOG_BIN', 'SQL_LOG_OFF', 'SQL_LOG_UPDATE', 'SQL_LOW_PRIORITY_UPDATES', 'SQL_MAX_JOIN_SIZE', 'SQL_NO_CACHE', 'SQL_QUOTE_SHOW_CREATE', 'SQL_SAFE_UPDATES', 'SQL_SELECT_LIMIT', 'SQL_SLAVE_SKIP_COUNTER', 'SQL_SMALL_RESULT', 'SQL_WARNINGS', 'START', 'STARTING', 'STATUS', 'STOP', 'STORAGE', 'STRAIGHT_JOIN', 'STRING', 'STRIPED', 'SUPER', 'TABLE', 'TABLES', 'TEMPORARY', 'TERMINATED', 'THEN', 'TO', 'TRAILING', 'TRANSACTIONAL', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNCOMMITTED', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'USAGE', 'USE', 'USING', 'VARIABLES', 'VIEW', 'WITH', 'WORK', 'WRITE', 'YEAR_MONTH'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'XOR'];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(StandardSqlFormatter, "tokenizer", new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
  reservedWords: reservedWords,
  reservedTopLevelWords: reservedTopLevelWords,
  reservedNewlineWords: reservedNewlineWords,
  reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
  stringTypes: ["\"\"", "N''", "''", '``', '[]'],
  openParens: ['(', 'CASE'],
  closeParens: [')', 'END'],
  indexedPlaceholderTypes: ['?'],
  namedPlaceholderTypes: ['@', ':'],
  lineCommentTypes: ['#', '--']
}));



/***/ }),

/***/ "./src/sqlFormatter.js":
/*!*****************************!*\
  !*** ./src/sqlFormatter.js ***!
  \*****************************/
/*! exports provided: FORMATTERS, format, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMATTERS", function() { return FORMATTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony import */ var _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languages/Db2Formatter */ "./src/languages/Db2Formatter.js");
/* harmony import */ var _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languages/N1qlFormatter */ "./src/languages/N1qlFormatter.js");
/* harmony import */ var _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languages/PlSqlFormatter */ "./src/languages/PlSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var FORMATTERS = {
  db2: _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__["default"],
  n1ql: _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_1__["default"],
  'pl/sql': _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  plsql: _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  redshift: _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  spark: _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  sql: _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/**
 * Format whitespace in a query to make it easier to read.
 *
 * @param {String} query
 * @param {Object} cfg
 *  @param {String} cfg.language Query language, default is Standard SQL
 *  @param {String} cfg.indent Characters used for indentation, default is "  " (2 spaces)
 *  @param {Boolean} cfg.uppercase Converts keywords to uppercase
 *  @param {Integer} cfg.linesBetweenQueries How many line breaks between queries
 *  @param {Object} cfg.params Collection of params for placeholder replacement
 * @return {String}
 */

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof query !== 'string') {
    throw new Error('Invalid query argument. Extected string, instead got ' + _typeof(query));
  }

  var Formatter = _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_5__["default"];

  if (cfg.language !== undefined) {
    Formatter = FORMATTERS[cfg.language];
  }

  if (Formatter === undefined) {
    throw Error("Unsupported SQL dialect: ".concat(cfg.language));
  }

  return new Formatter(cfg).format(query);
};
/* harmony default export */ __webpack_exports__["default"] = ({
  format: format,
  FORMATTERS: FORMATTERS
});

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS90b2tlblR5cGVzLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvTjFxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvUmVkc2hpZnRGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1N0YW5kYXJkU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9zcWxGb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsidHJpbVNwYWNlc0VuZCIsInN0ciIsInJlcGxhY2UiLCJGb3JtYXR0ZXIiLCJjZmciLCJpbmRlbnRhdGlvbiIsIkluZGVudGF0aW9uIiwiaW5kZW50IiwiaW5saW5lQmxvY2siLCJJbmxpbmVCbG9jayIsInBhcmFtcyIsIlBhcmFtcyIsInByZXZpb3VzUmVzZXJ2ZWRUb2tlbiIsInRva2VucyIsImluZGV4IiwicXVlcnkiLCJjb25zdHJ1Y3RvciIsInRva2VuaXplciIsInRva2VuaXplIiwiZm9ybWF0dGVkUXVlcnkiLCJnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMiLCJ0cmltIiwiZm9yRWFjaCIsInRva2VuIiwidG9rZW5PdmVycmlkZSIsInR5cGUiLCJ0b2tlblR5cGVzIiwiV0hJVEVTUEFDRSIsIkxJTkVfQ09NTUVOVCIsImZvcm1hdExpbmVDb21tZW50IiwiQkxPQ0tfQ09NTUVOVCIsImZvcm1hdEJsb2NrQ29tbWVudCIsIlJFU0VSVkVEX1RPUF9MRVZFTCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FIiwiZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCIsIlJFU0VSVkVEIiwiZm9ybWF0V2l0aFNwYWNlcyIsIk9QRU5fUEFSRU4iLCJmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXMiLCJDTE9TRV9QQVJFTiIsImZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyIsIlBMQUNFSE9MREVSIiwiZm9ybWF0UGxhY2Vob2xkZXIiLCJ2YWx1ZSIsImZvcm1hdENvbW1hIiwiZm9ybWF0V2l0aFNwYWNlQWZ0ZXIiLCJmb3JtYXRXaXRob3V0U3BhY2VzIiwiZm9ybWF0UXVlcnlTZXBhcmF0b3IiLCJhZGROZXdsaW5lIiwiaW5kZW50Q29tbWVudCIsImNvbW1lbnQiLCJnZXRJbmRlbnQiLCJkZWNyZWFzZVRvcExldmVsIiwiZXF1YWxpemVXaGl0ZXNwYWNlIiwiZm9ybWF0UmVzZXJ2ZWRXb3JkIiwiaW5jcmVhc2VUb3BMZXZlbCIsInN0cmluZyIsInByZXNlcnZlV2hpdGVzcGFjZUZvciIsIk9QRVJBVE9SIiwicHJldmlvdXNUb2tlbiIsInVwcGVyY2FzZSIsInRvVXBwZXJDYXNlIiwiYmVnaW5JZlBvc3NpYmxlIiwiaXNBY3RpdmUiLCJpbmNyZWFzZUJsb2NrTGV2ZWwiLCJlbmQiLCJkZWNyZWFzZUJsb2NrTGV2ZWwiLCJnZXQiLCJ0ZXN0IiwicmVzZXRJbmRlbnRhdGlvbiIsInJlcGVhdCIsImxpbmVzQmV0d2VlblF1ZXJpZXMiLCJlbmRzV2l0aCIsIm9mZnNldCIsIm1heEJhY2siLCJzdGFydCIsIk1hdGgiLCJtYXgiLCJzbGljZSIsInJldmVyc2UiLCJtYXhBaGVhZCIsIlRva2VuaXplciIsInJlc2VydmVkV29yZHMiLCJyZXNlcnZlZFRvcExldmVsV29yZHMiLCJyZXNlcnZlZE5ld2xpbmVXb3JkcyIsInJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50Iiwic3RyaW5nVHlwZXMiLCJvcGVuUGFyZW5zIiwiY2xvc2VQYXJlbnMiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIm5hbWVkUGxhY2Vob2xkZXJUeXBlcyIsImxpbmVDb21tZW50VHlwZXMiLCJzcGVjaWFsV29yZENoYXJzIiwiSU5ERU5UX1RZUEVfVE9QX0xFVkVMIiwiSU5ERU5UX1RZUEVfQkxPQ0tfTEVWRUwiLCJpbmRlbnRUeXBlcyIsImxlbmd0aCIsInB1c2giLCJwb3AiLCJJTkxJTkVfTUFYX0xFTkdUSCIsImxldmVsIiwiaXNJbmxpbmVCbG9jayIsImkiLCJpc0ZvcmJpZGRlblRva2VuIiwiQ09NTUVOVCIsImtleSIsImlzRW1wdHkiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJlc2NhcGVSZWdFeHAiLCJXSElURVNQQUNFX1JFR0VYIiwiTlVNQkVSX1JFR0VYIiwiT1BFUkFUT1JfUkVHRVgiLCJCTE9DS19DT01NRU5UX1JFR0VYIiwiTElORV9DT01NRU5UX1JFR0VYIiwiY3JlYXRlTGluZUNvbW1lbnRSZWdleCIsIlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCIsImNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4IiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCIsIlJFU0VSVkVEX05FV0xJTkVfUkVHRVgiLCJSRVNFUlZFRF9QTEFJTl9SRUdFWCIsIldPUkRfUkVHRVgiLCJjcmVhdGVXb3JkUmVnZXgiLCJTVFJJTkdfUkVHRVgiLCJjcmVhdGVTdHJpbmdSZWdleCIsIk9QRU5fUEFSRU5fUkVHRVgiLCJjcmVhdGVQYXJlblJlZ2V4IiwiQ0xPU0VfUEFSRU5fUkVHRVgiLCJJTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYIiwiY3JlYXRlUGxhY2Vob2xkZXJSZWdleCIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiY3JlYXRlU3RyaW5nUGF0dGVybiIsIlJlZ0V4cCIsIm1hcCIsImMiLCJqb2luIiwic29ydCIsImEiLCJiIiwibG9jYWxlQ29tcGFyZSIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwic3BlY2lhbENoYXJzIiwicGF0dGVybnMiLCJ0IiwicGFyZW5zIiwicCIsImVzY2FwZVBhcmVuIiwicGFyZW4iLCJ0eXBlcyIsInBhdHRlcm4iLCJ0eXBlc1JlZ2V4IiwiaW5wdXQiLCJnZXROZXh0VG9rZW4iLCJzdWJzdHJpbmciLCJnZXRXaGl0ZXNwYWNlVG9rZW4iLCJnZXRDb21tZW50VG9rZW4iLCJnZXRTdHJpbmdUb2tlbiIsImdldE9wZW5QYXJlblRva2VuIiwiZ2V0Q2xvc2VQYXJlblRva2VuIiwiZ2V0UGxhY2Vob2xkZXJUb2tlbiIsImdldE51bWJlclRva2VuIiwiZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4iLCJnZXRXb3JkVG9rZW4iLCJnZXRPcGVyYXRvclRva2VuIiwiZ2V0VG9rZW5PbkZpcnN0TWF0Y2giLCJyZWdleCIsImdldExpbmVDb21tZW50VG9rZW4iLCJnZXRCbG9ja0NvbW1lbnRUb2tlbiIsIlNUUklORyIsImdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSIsInBhcnNlS2V5IiwidiIsImdldEVzY2FwZWRQbGFjZWhvbGRlcktleSIsInF1b3RlQ2hhciIsIk5VTUJFUiIsInVuZGVmaW5lZCIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbiIsImdldE5ld2xpbmVSZXNlcnZlZFRva2VuIiwiZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQiLCJnZXRQbGFpblJlc2VydmVkVG9rZW4iLCJXT1JEIiwibWF0Y2hlcyIsIm1hdGNoIiwiRGIyRm9ybWF0dGVyIiwiTjFxbEZvcm1hdHRlciIsIlBsU3FsRm9ybWF0dGVyIiwiU3RhbmRhcmRTcWxGb3JtYXR0ZXIiLCJTcGFya1NxbEZvcm1hdHRlciIsImxvb2tBaGVhZCIsInRva2VuTG9va0FoZWFkIiwiYWhlYWRUb2tlbiIsImxvb2tCYWNrIiwidG9rZW5Mb29rQmFjayIsImJhY2tUb2tlbiIsIkZPUk1BVFRFUlMiLCJkYjIiLCJuMXFsIiwicGxzcWwiLCJyZWRzaGlmdCIsIlJlZHNoaWZ0Rm9ybWF0dGVyIiwic3BhcmsiLCJzcWwiLCJmb3JtYXQiLCJFcnJvciIsImxhbmd1YWdlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FB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QUErQjtBQUM3QixVQUFNLElBQUlvTSxLQUFKLENBQVUsa0VBQWlFcE0sS0FBakUsQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBSVosU0FBUyxHQUFHK0wsdUVBQWhCOztBQUNBLE1BQUk5TCxHQUFHLENBQUNnTixRQUFKLEtBQWlCN0IsU0FBckIsRUFBZ0M7QUFDOUJwTCxhQUFTLEdBQUd1TSxVQUFVLENBQUN0TSxHQUFHLENBQUNnTixRQUFMLENBQXRCO0FBQ0Q7O0FBQ0QsTUFBSWpOLFNBQVMsS0FBS29MLFNBQWxCLEVBQTZCO0FBQzNCLFVBQU00QixLQUFLLG9DQUE2Qi9NLEdBQUcsQ0FBQ2dOLFFBQWpDLEVBQVg7QUFDRDs7QUFDRCxTQUFPLElBQUlqTixTQUFKLENBQWNDLEdBQWQsRUFBbUI4TSxNQUFuQixDQUEwQm5NLEtBQTFCLENBQVA7QUFDRCxDQWJNO0FBZVE7QUFBRW1NLFFBQU0sRUFBTkEsTUFBRjtBQUFVUixZQUFVLEVBQVZBO0FBQVYsQ0FBZixFIiwiZmlsZSI6InNxbC1mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zcWxGb3JtYXR0ZXIuanNcIik7XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0IEluZGVudGF0aW9uIGZyb20gJy4vSW5kZW50YXRpb24nO1xuaW1wb3J0IElubGluZUJsb2NrIGZyb20gJy4vSW5saW5lQmxvY2snO1xuaW1wb3J0IFBhcmFtcyBmcm9tICcuL1BhcmFtcyc7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4vVG9rZW5pemVyJztcblxuY29uc3QgdHJpbVNwYWNlc0VuZCA9IChzdHIpID0+IHN0ci5yZXBsYWNlKC9bIFxcdF0rJC91LCAnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmxhbmd1YWdlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudFxuICAgKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlXG4gICAqICBAcGFyYW0ge0ludGVnZXJ9IGNmZy5saW5lc0JldHdlZW5RdWVyaWVzXG4gICAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IoY2ZnKSB7XG4gICAgdGhpcy5jZmcgPSBjZmcgfHwge307XG4gICAgdGhpcy5pbmRlbnRhdGlvbiA9IG5ldyBJbmRlbnRhdGlvbih0aGlzLmNmZy5pbmRlbnQpO1xuICAgIHRoaXMuaW5saW5lQmxvY2sgPSBuZXcgSW5saW5lQmxvY2soKTtcbiAgICB0aGlzLnBhcmFtcyA9IG5ldyBQYXJhbXModGhpcy5jZmcucGFyYW1zKTtcbiAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHt9O1xuICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogU1FMIFRva2VuaXplciBmb3IgdGhpcyBmb3JtYXR0ZXIsIHR5cGljYWxseSBvdmVycmlkZW4gYnkgc3ViY2xhc3Nlcy5cbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHtcbiAgICByZXNlcnZlZFdvcmRzOiBbXSxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHM6IFtdLFxuICAgIHJlc2VydmVkTmV3bGluZVdvcmRzOiBbXSxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudDogW10sXG4gICAgc3RyaW5nVHlwZXM6IFtdLFxuICAgIG9wZW5QYXJlbnM6IFtdLFxuICAgIGNsb3NlUGFyZW5zOiBbXSxcbiAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbXSxcbiAgICBzcGVjaWFsV29yZENoYXJzOiBbXSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlcHJvY2VzcyBhbmQgbW9kaWZ5IGEgdG9rZW4gYmFzZWQgb24gcGFyc2VkIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbiBUaGUgdG9rZW4gdG8gbW9kaWZ5XG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqIEByZXR1cm4gez9PYmplY3R9IG1vZGlmaWVkIHRva2VuXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICovXG4gIHRva2VuT3ZlcnJpZGUoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICAgIC8vIHN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gbW9kaWZ5IHRva2VucyBkdXJpbmcgZm9ybWF0dGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgd2hpdGVzcGFjZSBpbiBhIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTUUwgcXVlcnkgc3RyaW5nXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHF1ZXJ5XG4gICAqL1xuICBmb3JtYXQocXVlcnkpIHtcbiAgICB0aGlzLnRva2VucyA9IHRoaXMuY29uc3RydWN0b3IudG9rZW5pemVyLnRva2VuaXplKHF1ZXJ5KTtcbiAgICBjb25zdCBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCk7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnkudHJpbSgpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCkge1xuICAgIGxldCBmb3JtYXR0ZWRRdWVyeSA9ICcnO1xuXG4gICAgdGhpcy50b2tlbnMuZm9yRWFjaCgodG9rZW4sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbk92ZXJyaWRlKHRva2VuKSB8fCB0b2tlbjtcblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuV0hJVEVTUEFDRSkge1xuICAgICAgICAvLyBpZ25vcmUgKHdlIGRvIG91ciBvd24gd2hpdGVzcGFjZSBmb3JtYXR0aW5nKVxuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5QTEFDRUhPTERFUikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcsJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q29tbWEodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc6Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnk7XG4gIH1cblxuICBmb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5ICsgdG9rZW4udmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUodGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuaW5kZW50Q29tbWVudCh0b2tlbi52YWx1ZSkpO1xuICB9XG5cbiAgaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgcmV0dXJuIGNvbW1lbnQucmVwbGFjZSgvXFxuWyBcXHRdKi9ndSwgJ1xcbicgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpICsgJyAnKTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5mb3JtYXRSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSArPSB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLmZvcm1hdFJlc2VydmVkV29yZCh0b2tlbi52YWx1ZSkpO1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICB9XG5cbiAgZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuZm9ybWF0UmVzZXJ2ZWRXb3JkKHRva2VuLnZhbHVlKSkgKyAnICdcbiAgICApO1xuICB9XG5cbiAgLy8gUmVwbGFjZSBhbnkgc2VxdWVuY2Ugb2Ygd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHdpdGggc2luZ2xlIHNwYWNlXG4gIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xccysvZ3UsICcgJyk7XG4gIH1cblxuICAvLyBPcGVuaW5nIHBhcmVudGhlc2VzIGluY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWwgYW5kIHN0YXJ0IGEgbmV3IGxpbmVcbiAgZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIC8vIFRha2Ugb3V0IHRoZSBwcmVjZWRpbmcgc3BhY2UgdW5sZXNzIHRoZXJlIHdhcyB3aGl0ZXNwYWNlIHRoZXJlIGluIHRoZSBvcmlnaW5hbCBxdWVyeVxuICAgIC8vIG9yIGFub3RoZXIgb3BlbmluZyBwYXJlbnMgb3IgbGluZSBjb21tZW50XG4gICAgY29uc3QgcHJlc2VydmVXaGl0ZXNwYWNlRm9yID0ge1xuICAgICAgW3Rva2VuVHlwZXMuV0hJVEVTUEFDRV06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5PUEVOX1BBUkVOXTogdHJ1ZSxcbiAgICAgIFt0b2tlblR5cGVzLkxJTkVfQ09NTUVOVF06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5PUEVSQVRPUl06IHRydWUsXG4gICAgfTtcbiAgICBpZiAoIXByZXNlcnZlV2hpdGVzcGFjZUZvclt0aGlzLnByZXZpb3VzVG9rZW4oKS50eXBlXSkge1xuICAgICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICB9XG4gICAgcXVlcnkgKz0gdGhpcy5jZmcudXBwZXJjYXNlID8gdG9rZW4udmFsdWUudG9VcHBlckNhc2UoKSA6IHRva2VuLnZhbHVlO1xuXG4gICAgdGhpcy5pbmxpbmVCbG9jay5iZWdpbklmUG9zc2libGUodGhpcy50b2tlbnMsIHRoaXMuaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIENsb3NpbmcgcGFyZW50aGVzZXMgZGVjcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbFxuICBmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgdG9rZW4udmFsdWUgPSB0aGlzLmNmZy51cHBlcmNhc2UgPyB0b2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpIDogdG9rZW4udmFsdWU7XG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmxpbmVCbG9jay5lbmQoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCB0aGlzLmFkZE5ld2xpbmUocXVlcnkpKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRQbGFjZWhvbGRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnBhcmFtcy5nZXQodG9rZW4pICsgJyAnO1xuICB9XG5cbiAgLy8gQ29tbWFzIHN0YXJ0IGEgbmV3IGxpbmUgKHVubGVzcyB3aXRoaW4gaW5saW5lIHBhcmVudGhlc2VzIG9yIFNRTCBcIkxJTUlUXCIgY2xhdXNlKVxuICBmb3JtYXRDb21tYSh0b2tlbiwgcXVlcnkpIHtcbiAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdG9rZW4udmFsdWUgKyAnICc7XG5cbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfSBlbHNlIGlmICgvXkxJTUlUJC9pdS50ZXN0KHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuLnZhbHVlKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0b2tlbi52YWx1ZSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdG9rZW4udmFsdWU7XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgIGNvbnN0IHZhbHVlID0gdG9rZW4udHlwZSA9PT0gJ3Jlc2VydmVkJyA/IHRoaXMuZm9ybWF0UmVzZXJ2ZWRXb3JkKHRva2VuLnZhbHVlKSA6IHRva2VuLnZhbHVlO1xuICAgIHJldHVybiBxdWVyeSArIHZhbHVlICsgJyAnO1xuICB9XG5cbiAgZm9ybWF0UmVzZXJ2ZWRXb3JkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2ZnLnVwcGVyY2FzZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiB2YWx1ZTtcbiAgfVxuXG4gIGZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24ucmVzZXRJbmRlbnRhdGlvbigpO1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRva2VuLnZhbHVlICsgJ1xcbicucmVwZWF0KHRoaXMuY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgfHwgMSk7XG4gIH1cblxuICBhZGROZXdsaW5lKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICBpZiAoIXF1ZXJ5LmVuZHNXaXRoKCdcXG4nKSkgcXVlcnkgKz0gJ1xcbic7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKTtcbiAgfVxuXG4gIHByZXZpb3VzVG9rZW4ob2Zmc2V0ID0gMSkge1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmluZGV4IC0gb2Zmc2V0XSB8fCB7fTtcbiAgfVxuXG4gIHRva2VuTG9va0JhY2sobWF4QmFjayA9IDUpIHtcbiAgICBjb25zdCBzdGFydCA9IE1hdGgubWF4KDAsIHRoaXMuaW5kZXggLSBtYXhCYWNrKTtcbiAgICBjb25zdCBlbmQgPSB0aGlzLmluZGV4O1xuICAgIHJldHVybiB0aGlzLnRva2Vucy5zbGljZShzdGFydCwgZW5kKS5yZXZlcnNlKCk7XG4gIH1cblxuICB0b2tlbkxvb2tBaGVhZChtYXhBaGVhZCA9IDUpIHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXggKyAxO1xuICAgIGNvbnN0IGVuZCA9IHRoaXMuaW5kZXggKyBtYXhBaGVhZCArIDE7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG59XG4iLCJjb25zdCBJTkRFTlRfVFlQRV9UT1BfTEVWRUwgPSAndG9wLWxldmVsJztcbmNvbnN0IElOREVOVF9UWVBFX0JMT0NLX0xFVkVMID0gJ2Jsb2NrLWxldmVsJztcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUF9MRVZFTCB3b3Jkc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRlbnRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaW5kZW50IEluZGVudCB2YWx1ZSwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5kZW50KSB7XG4gICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgJyAgJztcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0SW5kZW50KCkge1xuICAgIHJldHVybiB0aGlzLmluZGVudC5yZXBlYXQodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgdG9wLWxldmVsIGluZGVudC5cbiAgICovXG4gIGluY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX0JMT0NLX0xFVkVMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqIERvZXMgbm90aGluZyB3aGVuIHRoZSBwcmV2aW91cyBpbmRlbnQgaXMgbm90IHRvcC1sZXZlbC5cbiAgICovXG4gIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pbmRlbnRUeXBlcy5sZW5ndGggPiAwICYmXG4gICAgICB0aGlzLmluZGVudFR5cGVzW3RoaXMuaW5kZW50VHlwZXMubGVuZ3RoIC0gMV0gPT09IElOREVOVF9UWVBFX1RPUF9MRVZFTFxuICAgICkge1xuICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqIElmIHRoZXJlIGFyZSB0b3AtbGV2ZWwgaW5kZW50cyB3aXRoaW4gdGhlIGJsb2NrLWxldmVsIGluZGVudCxcbiAgICogdGhyb3dzIGF3YXkgdGhlc2UgYXMgd2VsbC5cbiAgICovXG4gIGRlY3JlYXNlQmxvY2tMZXZlbCgpIHtcbiAgICB3aGlsZSAodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICAgIGlmICh0eXBlICE9PSBJTkRFTlRfVFlQRV9UT1BfTEVWRUwpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRJbmRlbnRhdGlvbigpIHtcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cbn1cbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5cbmNvbnN0IElOTElORV9NQVhfTEVOR1RIID0gNTA7XG5cbi8qKlxuICogQm9va2tlZXBlciBmb3IgaW5saW5lIGJsb2Nrcy5cbiAqXG4gKiBJbmxpbmUgYmxvY2tzIGFyZSBwYXJlbnRoaXplZCBleHByZXNzaW9ucyB0aGF0IGFyZSBzaG9ydGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gKiBUaGVzZSBibG9ja3MgYXJlIGZvcm1hdHRlZCBvbiBhIHNpbmdsZSBsaW5lLCB1bmxpa2UgbG9uZ2VyIHBhcmVudGhpemVkXG4gKiBleHByZXNzaW9ucyB3aGVyZSBvcGVuLXBhcmVudGhlc2lzIGNhdXNlcyBuZXdsaW5lIGFuZCBpbmNyZWFzZSBvZiBpbmRlbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lQmxvY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxldmVsID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgaW5saW5lIGJsb2NrIHdoZW4gbG9va2FoZWFkIHRocm91Z2ggdXBjb21pbmcgdG9rZW5zIGRldGVybWluZXNcbiAgICogdGhhdCB0aGUgYmxvY2sgd291bGQgYmUgc21hbGxlciB0aGFuIElOTElORV9NQVhfTEVOR1RILlxuICAgKiBAcGFyYW0gIHtPYmplY3RbXX0gdG9rZW5zIEFycmF5IG9mIGFsbCB0b2tlbnNcbiAgICogQHBhcmFtICB7TnVtYmVyfSBpbmRleCBDdXJyZW50IHRva2VuIHBvc2l0aW9uXG4gICAqL1xuICBiZWdpbklmUG9zc2libGUodG9rZW5zLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmxldmVsID09PSAwICYmIHRoaXMuaXNJbmxpbmVCbG9jayh0b2tlbnMsIGluZGV4KSkge1xuICAgICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxldmVsID4gMCkge1xuICAgICAgdGhpcy5sZXZlbCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxldmVsID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoZXMgY3VycmVudCBpbmxpbmUgYmxvY2suXG4gICAqIFRoZXJlIG1pZ2h0IGJlIHNldmVyYWwgbmVzdGVkIG9uZXMuXG4gICAqL1xuICBlbmQoKSB7XG4gICAgdGhpcy5sZXZlbC0tO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgd2hlbiBpbnNpZGUgYW4gaW5saW5lIGJsb2NrXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sZXZlbCA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGlzIHNob3VsZCBiZSBhbiBpbmxpbmUgcGFyZW50aGVzZXMgYmxvY2tcbiAgLy8gRXhhbXBsZXMgYXJlIFwiTk9XKClcIiwgXCJDT1VOVCgqKVwiLCBcImludCgxMClcIiwga2V5KGBzb21lY29sdW1uYCksIERFQ0lNQUwoNywyKVxuICBpc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIGxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG5cbiAgICAgIC8vIE92ZXJyYW4gbWF4IGxlbmd0aFxuICAgICAgaWYgKGxlbmd0aCA+IElOTElORV9NQVhfTEVOR1RIKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICBsZXZlbCsrO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGxldmVsLS07XG4gICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzRm9yYmlkZGVuVG9rZW4odG9rZW4pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUmVzZXJ2ZWQgd29yZHMgdGhhdCBjYXVzZSBuZXdsaW5lcywgY29tbWVudHMgYW5kIHNlbWljb2xvbnNcbiAgLy8gYXJlIG5vdCBhbGxvd2VkIGluc2lkZSBpbmxpbmUgcGFyZW50aGVzZXMgYmxvY2tcbiAgaXNGb3JiaWRkZW5Ub2tlbih7IHR5cGUsIHZhbHVlIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DT01NRU5UIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQgfHxcbiAgICAgIHZhbHVlID09PSAnOydcbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIEhhbmRsZXMgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnQgd2l0aCBnaXZlbiBwYXJhbXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFtcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHBhcmFtIHZhbHVlIHRoYXQgbWF0Y2hlcyBnaXZlbiBwbGFjZWhvbGRlciB3aXRoIHBhcmFtIGtleS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLmtleSBQbGFjZWhvbGRlciBrZXlcbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udmFsdWUgUGxhY2Vob2xkZXIgdmFsdWVcbiAgICogQHJldHVybiB7U3RyaW5nfSBwYXJhbSBvciB0b2tlbi52YWx1ZSB3aGVuIHBhcmFtcyBhcmUgbWlzc2luZ1xuICAgKi9cbiAgZ2V0KHsga2V5LCB2YWx1ZSB9KSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJhbXNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zW3RoaXMuaW5kZXgrK107XG4gIH1cbn1cbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5cbmZ1bmN0aW9uIGlzRW1wdHkoYXJyKSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheShhcnIpIHx8IGFyci5sZW5ndGggPT09IDA7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ3UsICdcXFxcJCYnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5pemVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFdvcmRzIFJlc2VydmVkIHdvcmRzIGluIFNRTFxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzIFdvcmRzIHRoYXQgYXJlIHNldCB0byBuZXdsaW5lXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgV29yZHMgdGhhdCBhcmUgdG9wIGxldmVsIGJ1dCBoYXZlIG5vIGluZGVudGF0aW9uXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3RyaW5nVHlwZXMgU3RyaW5nIHR5cGVzIHRvIGVuYWJsZTogXCJcIiwgJycsIGBgLCBbXSwgTicnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuY2xvc2VQYXJlbnMgQ2xvc2luZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKSwgXVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBpbmRleGVkIHBsYWNlaG9sZGVycywgbGlrZSA/XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmxpbmVDb21tZW50VHlwZXMgTGluZSBjb21tZW50cyB0byBlbmFibGUsIGxpa2UgIyBhbmQgLS1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5zcGVjaWFsV29yZENoYXJzIFNwZWNpYWwgY2hhcnMgdGhhdCBjYW4gYmUgZm91bmQgaW5zaWRlIG9mIHdvcmRzLCBsaWtlIEAgYW5kICNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuICAgIHRoaXMuT1BFUkFUT1JfUkVHRVggPSAvXighPXw8PHw+Pnw8Pnw9PXw8PXw+PXwhPHwhPnxcXHxcXHxcXC98XFx8XFwvfFxcfFxcfHw6OnwtPj58LT58fn5cXCp8fn58IX5+XFwqfCF+fnx+XFwqfCF+XFwqfCF+fEB8Oj18LikvdTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gdGhpcy5jcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGNmZy5saW5lQ29tbWVudFR5cGVzKTtcblxuICAgIHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVggPSB0aGlzLmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSB0aGlzLmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZE5ld2xpbmVXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9QTEFJTl9SRUdFWCA9IHRoaXMuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkV29yZHMpO1xuXG4gICAgdGhpcy5XT1JEX1JFR0VYID0gdGhpcy5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gdGhpcy5jcmVhdGVTdHJpbmdSZWdleChjZmcuc3RyaW5nVHlwZXMpO1xuXG4gICAgdGhpcy5PUEVOX1BBUkVOX1JFR0VYID0gdGhpcy5jcmVhdGVQYXJlblJlZ2V4KGNmZy5vcGVuUGFyZW5zKTtcbiAgICB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYID0gdGhpcy5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSB0aGlzLmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcuaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICAnWzAtOV0qJ1xuICAgICk7XG4gICAgdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCA9IHRoaXMuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICAnW2EtekEtWjAtOS5fJF0rJ1xuICAgICk7XG4gICAgdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSB0aGlzLmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgdGhpcy5jcmVhdGVTdHJpbmdQYXR0ZXJuKGNmZy5zdHJpbmdUeXBlcylcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlTGluZUNvbW1lbnRSZWdleChsaW5lQ29tbWVudFR5cGVzKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICBgXigoPzoke2xpbmVDb21tZW50VHlwZXMubWFwKChjKSA9PiBlc2NhcGVSZWdFeHAoYykpLmpvaW4oJ3wnKX0pLio/KD86XFxyXFxufFxccnxcXG58JCkpYCxcbiAgICAgICd1J1xuICAgICk7XG4gIH1cblxuICBjcmVhdGVSZXNlcnZlZFdvcmRSZWdleChyZXNlcnZlZFdvcmRzKSB7XG4gICAgaWYgKHJlc2VydmVkV29yZHMubGVuZ3RoID09PSAwKSByZXR1cm4gbmV3IFJlZ0V4cChgXlxcYiRgLCAndScpO1xuICAgIHJlc2VydmVkV29yZHMgPSByZXNlcnZlZFdvcmRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoIHx8IGEubG9jYWxlQ29tcGFyZShiKTtcbiAgICB9KTtcbiAgICBjb25zdCByZXNlcnZlZFdvcmRzUGF0dGVybiA9IHJlc2VydmVkV29yZHMuam9pbignfCcpLnJlcGxhY2UoLyAvZ3UsICdcXFxccysnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChgXigke3Jlc2VydmVkV29yZHNQYXR0ZXJufSlcXFxcYmAsICdpdScpO1xuICB9XG5cbiAgY3JlYXRlV29yZFJlZ2V4KHNwZWNpYWxDaGFycyA9IFtdKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICBgXihbXFxcXHB7QWxwaGFiZXRpY31cXFxccHtNYXJrfVxcXFxwe0RlY2ltYWxfTnVtYmVyfVxcXFxwe0Nvbm5lY3Rvcl9QdW5jdHVhdGlvbn1cXFxccHtKb2luX0NvbnRyb2x9JHtzcGVjaWFsQ2hhcnMuam9pbihcbiAgICAgICAgJydcbiAgICAgICl9XSspYCxcbiAgICAgICd1J1xuICAgICk7XG4gIH1cblxuICBjcmVhdGVTdHJpbmdSZWdleChzdHJpbmdUeXBlcykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyB0aGlzLmNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpICsgJyknLCAndScpO1xuICB9XG5cbiAgLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuICAvLyAxLiBiYWNrdGljayBxdW90ZWQgc3RyaW5nIHVzaW5nIGBgIHRvIGVzY2FwZVxuICAvLyAyLiBzcXVhcmUgYnJhY2tldCBxdW90ZWQgc3RyaW5nIChTUUwgU2VydmVyKSB1c2luZyBdXSB0byBlc2NhcGVcbiAgLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuICAvLyA0LiBzaW5nbGUgcXVvdGVkIHN0cmluZyB1c2luZyAnJyBvciBcXCcgdG8gZXNjYXBlXG4gIC8vIDUuIG5hdGlvbmFsIGNoYXJhY3RlciBxdW90ZWQgc3RyaW5nIHVzaW5nIE4nJyBvciBOXFwnIHRvIGVzY2FwZVxuICBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSB7XG4gICAgY29uc3QgcGF0dGVybnMgPSB7XG4gICAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgICAne30nOiAnKChcXFxce1teXFxcXH1dKigkfFxcXFx9KSkrKScsXG4gICAgICAnW10nOiAnKChcXFxcW1teXFxcXF1dKigkfFxcXFxdKSkoXFxcXF1bXlxcXFxdXSooJHxcXFxcXSkpKiknLFxuICAgICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgICBcIicnXCI6IFwiKCgnW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgICBcIk4nJ1wiOiBcIigoTidbXk4nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteTidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIH07XG5cbiAgICByZXR1cm4gc3RyaW5nVHlwZXMubWFwKCh0KSA9PiBwYXR0ZXJuc1t0XSkuam9pbignfCcpO1xuICB9XG5cbiAgY3JlYXRlUGFyZW5SZWdleChwYXJlbnMpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXignICsgcGFyZW5zLm1hcCgocCkgPT4gdGhpcy5lc2NhcGVQYXJlbihwKSkuam9pbignfCcpICsgJyknLCAnaXUnKTtcbiAgfVxuXG4gIGVzY2FwZVBhcmVuKHBhcmVuKSB7XG4gICAgaWYgKHBhcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKHBhcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9uZ2VyIHdvcmRcbiAgICAgIHJldHVybiAnXFxcXGInICsgcGFyZW4gKyAnXFxcXGInO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgodHlwZXMsIHBhdHRlcm4pIHtcbiAgICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeKCg/OiR7dHlwZXNSZWdleH0pKD86JHtwYXR0ZXJufSkpYCwgJ3UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIFNRTCBzdHJpbmcgYW5kIGJyZWFrcyBpdCBpbnRvIHRva2Vucy5cbiAgICogRWFjaCB0b2tlbiBpcyBhbiBvYmplY3Qgd2l0aCB0eXBlIGFuZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBTUUwgc3RyaW5nXG4gICAqIEByZXR1cm4ge09iamVjdFtdfSB0b2tlbnMgQW4gYXJyYXkgb2YgdG9rZW5zLlxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqL1xuICB0b2tlbml6ZShpbnB1dCkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCB0b2tlbjtcblxuICAgIC8vIEtlZXAgcHJvY2Vzc2luZyB0aGUgc3RyaW5nIHVudGlsIGl0IGlzIGVtcHR5XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgLy8gR2V0IHRoZSBuZXh0IHRva2VuIGFuZCB0aGUgdG9rZW4gdHlwZVxuICAgICAgdG9rZW4gPSB0aGlzLmdldE5leHRUb2tlbihpbnB1dCwgdG9rZW4pO1xuICAgICAgLy8gQWR2YW5jZSB0aGUgc3RyaW5nXG4gICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZyh0b2tlbi52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBnZXROZXh0VG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldENvbW1lbnRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZW5QYXJlblRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRDbG9zZVBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE51bWJlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikgfHxcbiAgICAgIHRoaXMuZ2V0V29yZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRPcGVyYXRvclRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuV0hJVEVTUEFDRSxcbiAgICAgIHJlZ2V4OiB0aGlzLldISVRFU1BBQ0VfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMaW5lQ29tbWVudFRva2VuKGlucHV0KSB8fCB0aGlzLmdldEJsb2NrQ29tbWVudFRva2VuKGlucHV0KTtcbiAgfVxuXG4gIGdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuTElORV9DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuTElORV9DT01NRU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLkJMT0NLX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRTdHJpbmdUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5TVFJJTkcsXG4gICAgICByZWdleDogdGhpcy5TVFJJTkdfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5PUEVOX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFTl9QQVJFTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5DTE9TRV9QQVJFTixcbiAgICAgIHJlZ2V4OiB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+IHYuc2xpY2UoMSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT5cbiAgICAgICAgdGhpcy5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXk6IHYuc2xpY2UoMiwgLTEpLCBxdW90ZUNoYXI6IHYuc2xpY2UoLTEpIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+IHYuc2xpY2UoMSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7IGlucHV0LCByZWdleCwgcGFyc2VLZXkgfSkge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCByZWdleCwgdHlwZTogdG9rZW5UeXBlcy5QTEFDRUhPTERFUiB9KTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHRva2VuLmtleSA9IHBhcnNlS2V5KHRva2VuLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5KHsga2V5LCBxdW90ZUNoYXIgfSkge1xuICAgIHJldHVybiBrZXkucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCgnXFxcXCcgKyBxdW90ZUNoYXIpLCAnZ3UnKSwgcXVvdGVDaGFyKTtcbiAgfVxuXG4gIC8vIERlY2ltYWwsIGJpbmFyeSwgb3IgaGV4IG51bWJlcnNcbiAgZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuTlVNQkVSLFxuICAgICAgcmVnZXg6IHRoaXMuTlVNQkVSX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUHVuY3R1YXRpb24gYW5kIHN5bWJvbHNcbiAgZ2V0T3BlcmF0b3JUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5PUEVSQVRPUixcbiAgICAgIHJlZ2V4OiB0aGlzLk9QRVJBVE9SX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICAvLyBBIHJlc2VydmVkIHdvcmQgY2Fubm90IGJlIHByZWNlZGVkIGJ5IGEgXCIuXCJcbiAgICAvLyB0aGlzIG1ha2VzIGl0IHNvIGluIFwibXl0YWJsZS5mcm9tXCIsIFwiZnJvbVwiIGlzIG5vdCBjb25zaWRlcmVkIGEgcmVzZXJ2ZWQgd29yZFxuICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4udmFsdWUgJiYgcHJldmlvdXNUb2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE5ld2xpbmVSZXNlcnZlZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRUb3BMZXZlbFJlc2VydmVkVG9rZW5Ob0luZGVudChpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW5Ob0luZGVudChpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5ULFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWluUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0V29yZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLldPUkQsXG4gICAgICByZWdleDogdGhpcy5XT1JEX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9rZW5PbkZpcnN0TWF0Y2goeyBpbnB1dCwgdHlwZSwgcmVnZXggfSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cbiAgICByZXR1cm4gbWF0Y2hlcyA/IHsgdHlwZSwgdmFsdWU6IG1hdGNoZXNbMV0gfSA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV0hJVEVTUEFDRTogJ3doaXRlc3BhY2UnLFxuICBXT1JEOiAnd29yZCcsXG4gIFNUUklORzogJ3N0cmluZycsXG4gIFJFU0VSVkVEOiAncmVzZXJ2ZWQnLFxuICBSRVNFUlZFRF9UT1BfTEVWRUw6ICdyZXNlcnZlZC10b3AtbGV2ZWwnLFxuICBSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UOiAncmVzZXJ2ZWQtdG9wLWxldmVsLW5vLWluZGVudCcsXG4gIFJFU0VSVkVEX05FV0xJTkU6ICdyZXNlcnZlZC1uZXdsaW5lJyxcbiAgT1BFUkFUT1I6ICdvcGVyYXRvcicsXG4gIE9QRU5fUEFSRU46ICdvcGVuLXBhcmVuJyxcbiAgQ0xPU0VfUEFSRU46ICdjbG9zZS1wYXJlbicsXG4gIExJTkVfQ09NTUVOVDogJ2xpbmUtY29tbWVudCcsXG4gIEJMT0NLX0NPTU1FTlQ6ICdibG9jay1jb21tZW50JyxcbiAgTlVNQkVSOiAnbnVtYmVyJyxcbiAgUExBQ0VIT0xERVI6ICdwbGFjZWhvbGRlcicsXG59O1xuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FCUycsXG4gICdBQ1RJVkFURScsXG4gICdBTElBUycsXG4gICdBTEwnLFxuICAnQUxMT0NBVEUnLFxuICAnQUxMT1cnLFxuICAnQUxURVInLFxuICAnQU5ZJyxcbiAgJ0FSRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdBU1NPQ0lBVEUnLFxuICAnQVNVVElNRScsXG4gICdBU1lNTUVUUklDJyxcbiAgJ0FUJyxcbiAgJ0FUT01JQycsXG4gICdBVFRSSUJVVEVTJyxcbiAgJ0FVRElUJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQVVYJyxcbiAgJ0FVWElMSUFSWScsXG4gICdBVkcnLFxuICAnQkVGT1JFJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCVUZGRVJQT09MJyxcbiAgJ0JZJyxcbiAgJ0NBQ0hFJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBUFRVUkUnLFxuICAnQ0FSRElOQUxJVFknLFxuICAnQ0FTQ0FERUQnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NDU0lEJyxcbiAgJ0NFSUwnLFxuICAnQ0VJTElORycsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSQUNURVJfTEVOR1RIJyxcbiAgJ0NIQVJfTEVOR1RIJyxcbiAgJ0NIRUNLJyxcbiAgJ0NMT0InLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MTEVDVElPTicsXG4gICdDT0xMSUQnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTkNBVCcsXG4gICdDT05ESVRJT04nLFxuICAnQ09OTkVDVCcsXG4gICdDT05ORUNUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDT1JSJyxcbiAgJ0NPUlJFU1BPTkRJTkcnLFxuICAnQ09VTlQnLFxuICAnQ09VTlRfQklHJyxcbiAgJ0NPVkFSX1BPUCcsXG4gICdDT1ZBUl9TQU1QJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVUJFJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQJyxcbiAgJ0NVUlJFTlRfTENfQ1RZUEUnLFxuICAnQ1VSUkVOVF9QQVRIJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1NDSEVNQScsXG4gICdDVVJSRU5UX1NFUlZFUicsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9USU1FWk9ORScsXG4gICdDVVJSRU5UX1RSQU5TRk9STV9HUk9VUF9GT1JfVFlQRScsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0NZQ0xFJyxcbiAgJ0RBVEEnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQVBBUlRJVElPTk5BTUUnLFxuICAnREFUQVBBUlRJVElPTk5VTScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RCMkdFTkVSQUwnLFxuICAnREIyR0VOUkwnLFxuICAnREIyU1FMJyxcbiAgJ0RCSU5GTycsXG4gICdEQlBBUlRJVElPTk5BTUUnLFxuICAnREJQQVJUSVRJT05OVU0nLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGQVVMVFMnLFxuICAnREVGSU5JVElPTicsXG4gICdERUxFVEUnLFxuICAnREVOU0VSQU5LJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVSRUYnLFxuICAnREVTQ1JJQkUnLFxuICAnREVTQ1JJUFRPUicsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJQUdOT1NUSUNTJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTQUxMT1cnLFxuICAnRElTQ09OTkVDVCcsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET0NVTUVOVCcsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEU1NJWkUnLFxuICAnRFlOQU1JQycsXG4gICdFQUNIJyxcbiAgJ0VESVRQUk9DJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTRScsXG4gICdFTFNFSUYnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRJT04nLFxuICAnRU5EJyxcbiAgJ0VORC1FWEVDJyxcbiAgJ0VORElORycsXG4gICdFUkFTRScsXG4gICdFU0NBUEUnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0VYQ0xVRElORycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYUCcsXG4gICdFWFBMQUlOJyxcbiAgJ0VYVEVOREVEJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVOQ0VEJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJRUxEUFJPQycsXG4gICdGSUxFJyxcbiAgJ0ZJTFRFUicsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGTE9BVCcsXG4gICdGTE9PUicsXG4gICdGT1InLFxuICAnRk9SRUlHTicsXG4gICdGUkVFJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVTSU9OJyxcbiAgJ0dFTkVSQUwnLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dFVCcsXG4gICdHTE9CQUwnLFxuICAnR09UTycsXG4gICdHUkFOVCcsXG4gICdHUkFQSElDJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0hBTkRMRVInLFxuICAnSEFTSCcsXG4gICdIQVNIRURfVkFMVUUnLFxuICAnSElOVCcsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSE9VUlMnLFxuICAnSURFTlRJVFknLFxuICAnSUYnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkNMVVNJVkUnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lORElDQVRPUicsXG4gICdJTkRJQ0FUT1JTJyxcbiAgJ0lORicsXG4gICdJTkZJTklUWScsXG4gICdJTkhFUklUJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFR1JJVFknLFxuICAnSU5URVJTRUNUSU9OJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSVNPQklEJyxcbiAgJ0lTT0xBVElPTicsXG4gICdJVEVSQVRFJyxcbiAgJ0pBUicsXG4gICdKQVZBJyxcbiAgJ0tFRVAnLFxuICAnS0VZJyxcbiAgJ0xBQkVMJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTENfQ1RZUEUnLFxuICAnTEVBRElORycsXG4gICdMRUFWRScsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElOS1RZUEUnLFxuICAnTE4nLFxuICAnTE9DQUwnLFxuICAnTE9DQUxEQVRFJyxcbiAgJ0xPQ0FMRScsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DQVRPUicsXG4gICdMT0NBVE9SUycsXG4gICdMT0NLJyxcbiAgJ0xPQ0tNQVgnLFxuICAnTE9DS1NJWkUnLFxuICAnTE9ORycsXG4gICdMT09QJyxcbiAgJ0xPV0VSJyxcbiAgJ01BSU5UQUlORUQnLFxuICAnTUFUQ0gnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01BWCcsXG4gICdNQVhWQUxVRScsXG4gICdNRU1CRVInLFxuICAnTUVSR0UnLFxuICAnTUVUSE9EJyxcbiAgJ01JQ1JPU0VDT05EJyxcbiAgJ01JQ1JPU0VDT05EUycsXG4gICdNSU4nLFxuICAnTUlOVVRFJyxcbiAgJ01JTlVURVMnLFxuICAnTUlOVkFMVUUnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9ESUZJRVMnLFxuICAnTU9EVUxFJyxcbiAgJ01PTlRIJyxcbiAgJ01PTlRIUycsXG4gICdNVUxUSVNFVCcsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUVVJBTCcsXG4gICdOQ0hBUicsXG4gICdOQ0xPQicsXG4gICdORVcnLFxuICAnTkVXX1RBQkxFJyxcbiAgJ05FWFRWQUwnLFxuICAnTk8nLFxuICAnTk9DQUNIRScsXG4gICdOT0NZQ0xFJyxcbiAgJ05PREVOQU1FJyxcbiAgJ05PREVOVU1CRVInLFxuICAnTk9NQVhWQUxVRScsXG4gICdOT01JTlZBTFVFJyxcbiAgJ05PTkUnLFxuICAnTk9PUkRFUicsXG4gICdOT1JNQUxJWkUnLFxuICAnTk9STUFMSVpFRCcsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVMTFMnLFxuICAnTlVNRVJJQycsXG4gICdOVU1QQVJUUycsXG4gICdPQklEJyxcbiAgJ09DVEVUX0xFTkdUSCcsXG4gICdPRicsXG4gICdPRkZTRVQnLFxuICAnT0xEJyxcbiAgJ09MRF9UQUJMRScsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1BUSU1JWkFUSU9OJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElPTicsXG4gICdPUkRFUicsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnUEFDS0FHRScsXG4gICdQQURERUQnLFxuICAnUEFHRVNJWkUnLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBUlRJVElPTkVEJyxcbiAgJ1BBUlRJVElPTklORycsXG4gICdQQVJUSVRJT05TJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BBVEgnLFxuICAnUEVSQ0VOVElMRV9DT05UJyxcbiAgJ1BFUkNFTlRJTEVfRElTQycsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUElFQ0VTSVpFJyxcbiAgJ1BMQU4nLFxuICAnUE9TSVRJT04nLFxuICAnUE9XRVInLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJFVlZBTCcsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVFUWScsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9HUkFNJyxcbiAgJ1BTSUQnLFxuICAnUFVCTElDJyxcbiAgJ1FVRVJZJyxcbiAgJ1FVRVJZTk8nLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUFEJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQUwnLFxuICAnUkVDT1ZFUlknLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFRlJFU0gnLFxuICAnUkVHUl9BVkdYJyxcbiAgJ1JFR1JfQVZHWScsXG4gICdSRUdSX0NPVU5UJyxcbiAgJ1JFR1JfSU5URVJDRVBUJyxcbiAgJ1JFR1JfUjInLFxuICAnUkVHUl9TTE9QRScsXG4gICdSRUdSX1NYWCcsXG4gICdSRUdSX1NYWScsXG4gICdSRUdSX1NZWScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVQnLFxuICAnUkVTRVQnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVEFSVCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVNVTFQnLFxuICAnUkVTVUxUX1NFVF9MT0NBVE9SJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1VORF9DRUlMSU5HJyxcbiAgJ1JPVU5EX0RPV04nLFxuICAnUk9VTkRfRkxPT1InLFxuICAnUk9VTkRfSEFMRl9ET1dOJyxcbiAgJ1JPVU5EX0hBTEZfRVZFTicsXG4gICdST1VORF9IQUxGX1VQJyxcbiAgJ1JPVU5EX1VQJyxcbiAgJ1JPVVRJTkUnLFxuICAnUk9XJyxcbiAgJ1JPV05VTUJFUicsXG4gICdST1dTJyxcbiAgJ1JPV1NFVCcsXG4gICdST1dfTlVNQkVSJyxcbiAgJ1JSTicsXG4gICdSVU4nLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NDSEVNQScsXG4gICdTQ09QRScsXG4gICdTQ1JBVENIUEFEJyxcbiAgJ1NDUk9MTCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ09ORFMnLFxuICAnU0VDUVRZJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVFVRU5DRScsXG4gICdTRVNTSU9OJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTSUdOQUwnLFxuICAnU0lNSUxBUicsXG4gICdTSU1QTEUnLFxuICAnU01BTExJTlQnLFxuICAnU05BTicsXG4gICdTT01FJyxcbiAgJ1NPVVJDRScsXG4gICdTUEVDSUZJQycsXG4gICdTUEVDSUZJQ1RZUEUnLFxuICAnU1FMJyxcbiAgJ1NRTEVYQ0VQVElPTicsXG4gICdTUUxJRCcsXG4gICdTUUxTVEFURScsXG4gICdTUUxXQVJOSU5HJyxcbiAgJ1NRUlQnLFxuICAnU1RBQ0tFRCcsXG4gICdTVEFOREFSRCcsXG4gICdTVEFSVCcsXG4gICdTVEFSVElORycsXG4gICdTVEFURU1FTlQnLFxuICAnU1RBVElDJyxcbiAgJ1NUQVRNRU5UJyxcbiAgJ1NUQVknLFxuICAnU1REREVWX1BPUCcsXG4gICdTVERERVZfU0FNUCcsXG4gICdTVE9HUk9VUCcsXG4gICdTVE9SRVMnLFxuICAnU1RZTEUnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVTScsXG4gICdTVU1NQVJZJyxcbiAgJ1NZTU1FVFJJQycsXG4gICdTWU5PTllNJyxcbiAgJ1NZU0ZVTicsXG4gICdTWVNJQk0nLFxuICAnU1lTUFJPQycsXG4gICdTWVNURU0nLFxuICAnU1lTVEVNX1VTRVInLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnVEFCTEVTUEFDRScsXG4gICdUSEVOJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TTEFURScsXG4gICdUUkFOU0xBVElPTicsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1VFU0NBUEUnLFxuICAnVU5ETycsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVU5USUwnLFxuICAnVVBQRVInLFxuICAnVVNBR0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJRFBST0MnLFxuICAnVkFMVUUnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJJQUJMRScsXG4gICdWQVJJQU5UJyxcbiAgJ1ZBUllJTkcnLFxuICAnVkFSX1BPUCcsXG4gICdWQVJfU0FNUCcsXG4gICdWQ0FUJyxcbiAgJ1ZFUlNJT04nLFxuICAnVklFVycsXG4gICdWT0xBVElMRScsXG4gICdWT0xVTUVTJyxcbiAgJ1dIRU4nLFxuICAnV0hFTkVWRVInLFxuICAnV0hJTEUnLFxuICAnV0lEVEhfQlVDS0VUJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1dMTScsXG4gICdXUklURScsXG4gICdYTUxFTEVNRU5UJyxcbiAgJ1hNTEVYSVNUUycsXG4gICdYTUxOQU1FU1BBQ0VTJyxcbiAgJ1lFQVInLFxuICAnWUVBUlMnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdHTycsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5URVJTRUNUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGIyRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgc3RhdGljIHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoe1xuICAgIHJlc2VydmVkV29yZHMsXG4gICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgIG9wZW5QYXJlbnM6IFsnKCddLFxuICAgIGNsb3NlUGFyZW5zOiBbJyknXSxcbiAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5BUlknLFxuICAnQk9PTEVBTicsXG4gICdCUkVBSycsXG4gICdCVUNLRVQnLFxuICAnQlVJTEQnLFxuICAnQlknLFxuICAnQ0FMTCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0xVU1RFUicsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OVElOVUUnLFxuICAnQ09SUkVMQVRFJyxcbiAgJ0NPVkVSJyxcbiAgJ0NSRUFURScsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBU0VUJyxcbiAgJ0RBVEFTVE9SRScsXG4gICdERUNMQVJFJyxcbiAgJ0RFQ1JFTUVOVCcsXG4gICdERUxFVEUnLFxuICAnREVSSVZFRCcsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RST1AnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENMVURFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklSU1QnLFxuICAnRkxBVFRFTicsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRlJPTScsXG4gICdGVU5DVElPTicsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdHU0knLFxuICAnSEFWSU5HJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTicsXG4gICdJTkNMVURFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkZFUicsXG4gICdJTkxJTkUnLFxuICAnSU5ORVInLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0VZU1BBQ0UnLFxuICAnS05PV04nLFxuICAnTEFTVCcsXG4gICdMRUZUJyxcbiAgJ0xFVCcsXG4gICdMRVRUSU5HJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTFNNJyxcbiAgJ01BUCcsXG4gICdNQVBQSU5HJyxcbiAgJ01BVENIRUQnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01FUkdFJyxcbiAgJ01JU1NJTkcnLFxuICAnTkFNRVNQQUNFJyxcbiAgJ05FU1QnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPRkZTRVQnLFxuICAnT04nLFxuICAnT1BUSU9OJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnUEFSU0UnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BBVEgnLFxuICAnUE9PTCcsXG4gICdQUkVQQVJFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJVkFURScsXG4gICdQUklWSUxFR0UnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVQkxJQycsXG4gICdSQVcnLFxuICAnUkVBTE0nLFxuICAnUkVEVUNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1NBVElTRklFUycsXG4gICdTQ0hFTUEnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTEYnLFxuICAnU0VNSScsXG4gICdTRVQnLFxuICAnU0hPVycsXG4gICdTT01FJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RSSU5HJyxcbiAgJ1NZU1RFTScsXG4gICdUSEVOJyxcbiAgJ1RPJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdVTkRFUicsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVU5TRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxVRScsXG4gICdWQUxVRUQnLFxuICAnVkFMVUVTJyxcbiAgJ1ZJQScsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV09SSycsXG4gICdYT1InLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnRVhQTEFJTiBERUxFVEUgRlJPTScsXG4gICdFWFBMQUlOIFVQREFURScsXG4gICdFWFBMQUlOIFVQU0VSVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTkZFUicsXG4gICdJTlNFUlQgSU5UTycsXG4gICdMRVQnLFxuICAnTElNSVQnLFxuICAnTUVSR0UnLFxuICAnTkVTVCcsXG4gICdPUkRFUiBCWScsXG4gICdQUkVQQVJFJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5ORVNUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFIEtFWVMnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE4xcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICBzdGF0aWMgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih7XG4gICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgb3BlblBhcmVuczogWycoJywgJ1snLCAneyddLFxuICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnXScsICd9J10sXG4gICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi4vY29yZS90b2tlblR5cGVzJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0EnLFxuICAnQUNDRVNTSUJMRScsXG4gICdBR0VOVCcsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVQnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhJRCcsXG4gICdBVkcnLFxuICAnQkVUV0VFTicsXG4gICdCRklMRV9CQVNFJyxcbiAgJ0JJTkFSWV9JTlRFR0VSJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CX0JBU0UnLFxuICAnQkxPQ0snLFxuICAnQk9EWScsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQk9VTkQnLFxuICAnQlJFQURUSCcsXG4gICdCVUxLJyxcbiAgJ0JZJyxcbiAgJ0JZVEUnLFxuICAnQycsXG4gICdDQUxMJyxcbiAgJ0NBTExJTkcnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQVJfQkFTRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSU0VUJyxcbiAgJ0NIQVJTRVRGT1JNJyxcbiAgJ0NIQVJTRVRJRCcsXG4gICdDSEVDSycsXG4gICdDTE9CX0JBU0UnLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDTFVTVEVSUycsXG4gICdDT0FMRVNDRScsXG4gICdDT0xBVVRIJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUElMRUQnLFxuICAnQ09NUFJFU1MnLFxuICAnQ09OTkVDVCcsXG4gICdDT05TVEFOVCcsXG4gICdDT05TVFJVQ1RPUicsXG4gICdDT05URVhUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09VTlQnLFxuICAnQ1JBU0gnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUwnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSVkFMJyxcbiAgJ0NVUlNPUicsXG4gICdDVVNUT01EQVRVTScsXG4gICdEQU5HTElORycsXG4gICdEQVRBJyxcbiAgJ0RBVEVfQkFTRScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdERUNJTUFMJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGSU5FJyxcbiAgJ0RFTEVURScsXG4gICdERVBUSCcsXG4gICdERVNDJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElSRUNUT1JZJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVUkFUSU9OJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTSUYnLFxuICAnRU1QVFknLFxuICAnRU5EJyxcbiAgJ0VTQ0FQRScsXG4gICdFWENFUFRJT05TJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYVEVORFMnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTE9BVCcsXG4gICdGT1InLFxuICAnRk9SQUxMJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBU0gnLFxuICAnSEVBUCcsXG4gICdISURERU4nLFxuICAnSE9VUicsXG4gICdJREVOVElGSUVEJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNFUycsXG4gICdJTkZJTklURScsXG4gICdJTlNUQU5USUFCTEUnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJGQUNFJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WQUxJREFURScsXG4gICdJUycsXG4gICdJU09MQVRJT04nLFxuICAnSkFWQScsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFTkdUSCcsXG4gICdMRVZFTCcsXG4gICdMSUJSQVJZJyxcbiAgJ0xJS0UnLFxuICAnTElLRTInLFxuICAnTElLRTQnLFxuICAnTElLRUMnLFxuICAnTElNSVRFRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTUFQJyxcbiAgJ01BWCcsXG4gICdNQVhMRU4nLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUxTTEFCRUwnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTVVMVElTRVQnLFxuICAnTkFNRScsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUSVZFJyxcbiAgJ05BVFVSQUwnLFxuICAnTkFUVVJBTE4nLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFRWQUwnLFxuICAnTk9DT01QUkVTUycsXG4gICdOT0NPUFknLFxuICAnTk9UJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1CRVJfQkFTRScsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09DSUNPTEwnLFxuICAnT0NJREFURScsXG4gICdPQ0lEQVRFVElNRScsXG4gICdPQ0lEVVJBVElPTicsXG4gICdPQ0lJTlRFUlZBTCcsXG4gICdPQ0lMT0JMT0NBVE9SJyxcbiAgJ09DSU5VTUJFUicsXG4gICdPQ0lSQVcnLFxuICAnT0NJUkVGJyxcbiAgJ09DSVJFRkNVUlNPUicsXG4gICdPQ0lST1dJRCcsXG4gICdPQ0lTVFJJTkcnLFxuICAnT0NJVFlQRScsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEFRVUUnLFxuICAnT1BFTicsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1JBQ0xFJyxcbiAgJ09SQURBVEEnLFxuICAnT1JERVInLFxuICAnT1JHQU5JWkFUSU9OJyxcbiAgJ09STEFOWScsXG4gICdPUkxWQVJZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBUkFMTEVMX0VOQUJMRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSQU1FVEVSUycsXG4gICdQQVJFTlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU0NBTCcsXG4gICdQQ1RGUkVFJyxcbiAgJ1BJUEUnLFxuICAnUElQRUxJTkVEJyxcbiAgJ1BMU19JTlRFR0VSJyxcbiAgJ1BMVUdHQUJMRScsXG4gICdQT1NJVElWRScsXG4gICdQT1NJVElWRU4nLFxuICAnUFJBR01BJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklPUicsXG4gICdQUklWQVRFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFJU0UnLFxuICAnUkFOR0UnLFxuICAnUkFXJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUNPUkQnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTElFU19PTicsXG4gICdSRU0nLFxuICAnUkVNQUlOREVSJyxcbiAgJ1JFTkFNRScsXG4gICdSRVNPVVJDRScsXG4gICdSRVNVTFRfQ0FDSEUnLFxuICAnUkVTVUxUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWRVJTRScsXG4gICdSRVZPS0UnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9XJyxcbiAgJ1JPV0lEJyxcbiAgJ1JPV05VTScsXG4gICdST1dUWVBFJyxcbiAgJ1NBTVBMRScsXG4gICdTQVZFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQjEnLFxuICAnU0IyJyxcbiAgJ1NCNCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFR01FTlQnLFxuICAnU0VMRicsXG4gICdTRVBBUkFURScsXG4gICdTRVFVRU5DRScsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0hBUkUnLFxuICAnU0hPUlQnLFxuICAnU0laRV9UJyxcbiAgJ1NJWkUnLFxuICAnU01BTExJTlQnLFxuICAnU09NRScsXG4gICdTUEFDRScsXG4gICdTUEFSU0UnLFxuICAnU1FMJyxcbiAgJ1NRTENPREUnLFxuICAnU1FMREFUQScsXG4gICdTUUxFUlJNJyxcbiAgJ1NRTE5BTUUnLFxuICAnU1FMU1RBVEUnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBVElDJyxcbiAgJ1NURERFVicsXG4gICdTVE9SRUQnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJQQVJUSVRJT04nLFxuICAnU1VCU1RJVFVUQUJMRScsXG4gICdTVUJUWVBFJyxcbiAgJ1NVQ0NFU1NGVUwnLFxuICAnU1VNJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTREFURScsXG4gICdUQUJBVVRIJyxcbiAgJ1RBQkxFJyxcbiAgJ1RETycsXG4gICdUSEUnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9BQkJSJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RJTUVaT05FX1JFR0lPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVUIxJyxcbiAgJ1VCMicsXG4gICdVQjQnLFxuICAnVUlEJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSVFVRScsXG4gICdVTlBMVUcnLFxuICAnVU5TSUdORUQnLFxuICAnVU5UUlVTVEVEJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElTVCcsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVIyJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTkNFJyxcbiAgJ1ZBUlJBWScsXG4gICdWQVJZSU5HJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9JRCcsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFRCcsXG4gICdXUklURScsXG4gICdZRUFSJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdCRUdJTicsXG4gICdDT05ORUNUIEJZJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVMRVRFIEZST00nLFxuICAnREVMRVRFJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdMT09QJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1NUQVJUIFdJVEgnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICBzdGF0aWMgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih7XG4gICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ2BgJ10sXG4gICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICBzcGVjaWFsV29yZENoYXJzOiBbJ18nLCAnJCcsICcjJywgJy4nLCAnQCddLFxuICB9KTtcblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgaWYgKFxuICAgICAgdG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgJiZcbiAgICAgIHRva2VuLnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdTRVQnICYmXG4gICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnQlknXG4gICAgKSB7XG4gICAgICB0b2tlbi50eXBlID0gdG9rZW5UeXBlcy5SRVNFUlZFRDtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FFUzEyOCcsXG4gICdBRVMyNTYnLFxuICAnQUxMT1dPVkVSV1JJVEUnLFxuICAnQU5BTFlTRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdCQUNLVVAnLFxuICAnQklOQVJZJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCT1RIJyxcbiAgJ0JZVEVESUNUJyxcbiAgJ0JaSVAyJyxcbiAgJ0NBU1QnLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSUkVOVF9VU0VSX0lEJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZMQVRFJyxcbiAgJ0RFRlJBRycsXG4gICdERUxUQScsXG4gICdERUxUQTMySycsXG4gICdERVNDJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRUxTRScsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RFJyxcbiAgJ0VOQ1JZUFQnLFxuICAnRU5DUllQVElPTicsXG4gICdFTkQnLFxuICAnRVhQTElDSVQnLFxuICAnRkFMU0UnLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRVpFJyxcbiAgJ0ZVTEwnLFxuICAnR0xPQkFMRElDVDI1NicsXG4gICdHTE9CQUxESUNUNjRLJyxcbiAgJ0dSQU5UJyxcbiAgJ0daSVAnLFxuICAnSURFTlRJVFknLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOSVRJQUxMWScsXG4gICdJTlRPJyxcbiAgJ0xFQURJTkcnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xVTicsXG4gICdMVU5TJyxcbiAgJ0xaTycsXG4gICdMWk9QJyxcbiAgJ01JTlVTJyxcbiAgJ01PU1RMWTEzJyxcbiAgJ01PU1RMWTMyJyxcbiAgJ01PU1RMWTgnLFxuICAnTkFUVVJBTCcsXG4gICdORVcnLFxuICAnTlVMTFMnLFxuICAnT0ZGJyxcbiAgJ09GRkxJTkUnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1JERVInLFxuICAnT1ZFUkxBUFMnLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BFUkNFTlQnLFxuICAnUEVSTUlTU0lPTlMnLFxuICAnUExBQ0lORycsXG4gICdQUklNQVJZJyxcbiAgJ1JBVycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVDT1ZFUicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFSkVDVExPRycsXG4gICdSRVNPUlQnLFxuICAnUkVTVE9SRScsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lNSUxBUicsXG4gICdTWVNEQVRFJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUcnLFxuICAnVERFUycsXG4gICdURVhUMjU1JyxcbiAgJ1RFWFQzMksnLFxuICAnVEhFTicsXG4gICdUSU1FU1RBTVAnLFxuICAnVE8nLFxuICAnVE9QJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ1VOSVFVRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZFUkJPU0UnLFxuICAnV0FMTEVUJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdXSVRIT1VUJyxcbiAgJ1BSRURJQ0FURScsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBSRVNTSU9OJyxcbiAgJ0NPUFknLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdFVkVOJyxcbiAgJ0FMTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1RPUCcsXG4gICdMSU1JVCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICBzdGF0aWMgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih7XG4gICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgY2xvc2VQYXJlbnM6IFsnKSddLFxuICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCcsICcjJywgJyQnXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gIH0pO1xufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FSUkFZX1pJUCcsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEVDVF9MSVNUJyxcbiAgJ0NPTExFQ1RfU0VUJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UIFJPVycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBVEVfQUREJyxcbiAgJ0RBVEVfU1VCJyxcbiAgJ0RBVEVfVFJVTkMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RFQ09ERScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RST1AnLFxuICAnRUxTRScsXG4gICdFTkNPREUnLFxuICAnRU5EJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUExPREVfT1VURVInLFxuICAnRVhQTE9ERScsXG4gICdGSUxURVInLFxuICAnRklSU1RfVkFMVUUnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxBVFRFTicsXG4gICdGT0xMT1dJTkcnLFxuICAnRlJPTV9VTklYVElNRScsXG4gICdGVUxMJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQX0NPTkNBVCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lGJyxcbiAgJ0lGTlVMTCcsXG4gICdJTicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVNUJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFTVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ01BWCcsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5VVEUnLFxuICAnTU9OVEgnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9XKCknLFxuICAnTlRJTEUnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUFRJTUlaRScsXG4gICdPVkVSJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDRURJTkcnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUdFWFAnLFxuICAnUkVOQU1FJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1NFQ09ORCcsXG4gICdTRVBBUkFUT1InLFxuICAnU0VRVUVOQ0UnLFxuICAnU0laRScsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NVTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RIRU4nLFxuICAnVE9fREFURScsXG4gICdUT19KU09OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOSVFVRScsXG4gICdVTklYX1RJTUVTVEFNUCcsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBEQVRBQkFTRScsXG4gICdBTFRFUiBTQ0hFTUEnLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0xVU1RFUiBCWScsXG4gICdDTFVTVEVSRUQgQlknLFxuICAnREVMRVRFIEZST00nLFxuICAnRElTVFJJQlVURSBCWScsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1BUSU9OUycsXG4gICdPUkRFUiBCWScsXG4gICdQQVJUSVRJT04gQlknLFxuICAnUEFSVElUSU9ORUQgQlknLFxuICAnUkFOR0UnLFxuICAnUk9XUycsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1RCTFBST1BFUlRJRVMnLFxuICAnVVBEQVRFJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdXSU5ET1cnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdJTlRFUlNFQ1QgQUxMJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQU5USSBKT0lOJyxcbiAgJ0NSRUFURSBPUicsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEFURVJBTCBWSUVXJyxcbiAgJ0xFRlQgQU5USSBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnTEVGVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBBTlRJIEpPSU4nLFxuICAnTkFUVVJBTCBGVUxMIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBJTk5FUiBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgQU5USSBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIFNFTUkgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBTRU1JIEpPSU4nLFxuICAnU0VNSSBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYXJrU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgc3RhdGljIHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoe1xuICAgIHJlc2VydmVkV29yZHMsXG4gICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICd7fSddLFxuICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gIH0pO1xuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIGZ1bmN0aW9uc1xuICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCAmJiB0b2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnV0lORE9XJykge1xuICAgICAgY29uc3QgbG9va0FoZWFkID0gdGhpcy50b2tlbkxvb2tBaGVhZCgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29rQWhlYWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYWhlYWRUb2tlbiA9IGxvb2tBaGVhZFtpXTtcbiAgICAgICAgaWYgKGFoZWFkVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIGNhbGwsIHRyZWF0IGl0IGFzIGEgcmVzZXJ2ZWQgd29yZFxuICAgICAgICAgIHRva2VuLnR5cGUgPSB0b2tlblR5cGVzLlJFU0VSVkVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIHByb3BlcnRpZXNcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTiAmJiB0b2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnRU5EJykge1xuICAgICAgY29uc3QgbG9va0JhY2sgPSB0aGlzLnRva2VuTG9va0JhY2soKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9va0JhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYmFja1Rva2VuID0gbG9va0JhY2tbaV07XG4gICAgICAgIGlmIChiYWNrVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVSQVRPUiAmJiBiYWNrVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICAgIC8vIFRoaXMgaXMgd2luZG93KCkuZW5kIChvciBzaW1pbGFyKSBub3QgQ0FTRSAuLi4gRU5EXG4gICAgICAgICAgdG9rZW4udHlwZSA9IHRva2VuVHlwZXMuV09SRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUNUSU9OJyxcbiAgJ0FHQUlOU1QnLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMR09SSVRITScsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVVRPQ09NTUlUJyxcbiAgJ0FVVE9fSU5DUkVNRU5UJyxcbiAgJ0JBQ0tVUCcsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJTkxPRycsXG4gICdCT1RIJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0hBTkdFJyxcbiAgJ0NIQU5HRUQnLFxuICAnQ0hBUkFDVEVSIFNFVCcsXG4gICdDSEFSU0VUJyxcbiAgJ0NIRUNLJyxcbiAgJ0NIRUNLU1VNJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEFUSU9OJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT01QUkVTU0VEJyxcbiAgJ0NPTkNVUlJFTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRklORVInLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdETycsXG4gICdEUk9QJyxcbiAgJ0RVTVBGSUxFJyxcbiAgJ0RVUExJQ0FURScsXG4gICdEWU5BTUlDJyxcbiAgJ0VMU0UnLFxuICAnRU5DTE9TRUQnLFxuICAnRU5HSU5FJyxcbiAgJ0VOR0lORVMnLFxuICAnRU5HSU5FX1RZUEUnLFxuICAnRVNDQVBFJyxcbiAgJ0VTQ0FQRUQnLFxuICAnRVZFTlRTJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdGQVNUJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJRUxEUycsXG4gICdGSUxFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMVVNIJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZVTEwnLFxuICAnRlVMTFRFWFQnLFxuICAnRlVOQ1RJT04nLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQU5UUycsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSEVBUCcsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPU1RTJyxcbiAgJ0hPVVInLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSURFTlRJRklFRCcsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSUdOT1JFJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5GSUxFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlNFUlRfSUQnLFxuICAnSU5TRVJUX01FVEhPRCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVk9LRVInLFxuICAnSVMnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tJTEwnLFxuICAnTEFTVF9JTlNFUlRfSUQnLFxuICAnTEVBRElORycsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0snLFxuICAnTE9DS1MnLFxuICAnTE9HUycsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFSSUEnLFxuICAnTUFTVEVSJyxcbiAgJ01BU1RFUl9DT05ORUNUX1JFVFJZJyxcbiAgJ01BU1RFUl9IT1NUJyxcbiAgJ01BU1RFUl9MT0dfRklMRScsXG4gICdNQVRDSCcsXG4gICdNQVhfQ09OTkVDVElPTlNfUEVSX0hPVVInLFxuICAnTUFYX1FVRVJJRVNfUEVSX0hPVVInLFxuICAnTUFYX1JPV1MnLFxuICAnTUFYX1VQREFURVNfUEVSX0hPVVInLFxuICAnTUFYX1VTRVJfQ09OTkVDVElPTlMnLFxuICAnTUVESVVNJyxcbiAgJ01FUkdFJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVfU0VDT05EJyxcbiAgJ01JTl9ST1dTJyxcbiAgJ01PREUnLFxuICAnTU9ESUZZJyxcbiAgJ01PTlRIJyxcbiAgJ01SR19NWUlTQU0nLFxuICAnTVlJU0FNJyxcbiAgJ05BTUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05VTEwnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05BTExZJyxcbiAgJ09VVEZJTEUnLFxuICAnUEFDS19LRVlTJyxcbiAgJ1BBR0UnLFxuICAnUEFSVElBTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0NFU1MnLFxuICAnUFJPQ0VTU0xJU1QnLFxuICAnUFVSR0UnLFxuICAnUVVJQ0snLFxuICAnUkFJRDAnLFxuICAnUkFJRF9DSFVOS1MnLFxuICAnUkFJRF9DSFVOS1NJWkUnLFxuICAnUkFJRF9UWVBFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBRF9PTkxZJyxcbiAgJ1JFQURfV1JJVEUnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUdFWFAnLFxuICAnUkVMT0FEJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBBSVInLFxuICAnUkVQRUFUQUJMRScsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUExJQ0FUSU9OJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU1RPUkUnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JPV19GT1JNQVQnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFUEFSQVRPUicsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0VTU0lPTicsXG4gICdTSEFSRScsXG4gICdTSE9XJyxcbiAgJ1NIVVRET1dOJyxcbiAgJ1NMQVZFJyxcbiAgJ1NPTkFNRScsXG4gICdTT1VORFMnLFxuICAnU1FMJyxcbiAgJ1NRTF9BVVRPX0lTX05VTEwnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0JJR19TRUxFQ1RTJyxcbiAgJ1NRTF9CSUdfVEFCTEVTJyxcbiAgJ1NRTF9CVUZGRVJfUkVTVUxUJyxcbiAgJ1NRTF9DQUNIRScsXG4gICdTUUxfQ0FMQ19GT1VORF9ST1dTJyxcbiAgJ1NRTF9MT0dfQklOJyxcbiAgJ1NRTF9MT0dfT0ZGJyxcbiAgJ1NRTF9MT0dfVVBEQVRFJyxcbiAgJ1NRTF9MT1dfUFJJT1JJVFlfVVBEQVRFUycsXG4gICdTUUxfTUFYX0pPSU5fU0laRScsXG4gICdTUUxfTk9fQ0FDSEUnLFxuICAnU1FMX1FVT1RFX1NIT1dfQ1JFQVRFJyxcbiAgJ1NRTF9TQUZFX1VQREFURVMnLFxuICAnU1FMX1NFTEVDVF9MSU1JVCcsXG4gICdTUUxfU0xBVkVfU0tJUF9DT1VOVEVSJyxcbiAgJ1NRTF9TTUFMTF9SRVNVTFQnLFxuICAnU1FMX1dBUk5JTkdTJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUQVRVUycsXG4gICdTVE9QJyxcbiAgJ1NUT1JBR0UnLFxuICAnU1RSQUlHSFRfSk9JTicsXG4gICdTVFJJTkcnLFxuICAnU1RSSVBFRCcsXG4gICdTVVBFUicsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdUWVBFUycsXG4gICdVTkNPTU1JVFRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdWQVJJQUJMRVMnLFxuICAnVklFVycsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JJVEUnLFxuICAnWUVBUl9NT05USCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0dPJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGFyZFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHN0YXRpYyB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHtcbiAgICByZXNlcnZlZFdvcmRzLFxuICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJywgJzonXSxcbiAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgRGIyRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlcic7XG5pbXBvcnQgTjFxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9OMXFsRm9ybWF0dGVyJztcbmltcG9ydCBQbFNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlcic7XG5pbXBvcnQgUmVkc2hpZnRGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvUmVkc2hpZnRGb3JtYXR0ZXInO1xuaW1wb3J0IFNwYXJrU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyJztcbmltcG9ydCBTdGFuZGFyZFNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TdGFuZGFyZFNxbEZvcm1hdHRlcic7XG5cbmV4cG9ydCBjb25zdCBGT1JNQVRURVJTID0ge1xuICBkYjI6IERiMkZvcm1hdHRlcixcbiAgbjFxbDogTjFxbEZvcm1hdHRlcixcbiAgJ3BsL3NxbCc6IFBsU3FsRm9ybWF0dGVyLFxuICBwbHNxbDogUGxTcWxGb3JtYXR0ZXIsXG4gIHJlZHNoaWZ0OiBSZWRzaGlmdEZvcm1hdHRlcixcbiAgc3Bhcms6IFNwYXJrU3FsRm9ybWF0dGVyLFxuICBzcWw6IFN0YW5kYXJkU3FsRm9ybWF0dGVyLFxufTtcblxuLyoqXG4gKiBGb3JtYXQgd2hpdGVzcGFjZSBpbiBhIHF1ZXJ5IHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudCBDaGFyYWN0ZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlIENvbnZlcnRzIGtleXdvcmRzIHRvIHVwcGVyY2FzZVxuICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgSG93IG1hbnkgbGluZSBicmVha3MgYmV0d2VlbiBxdWVyaWVzXG4gKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXMgQ29sbGVjdGlvbiBvZiBwYXJhbXMgZm9yIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSAocXVlcnksIGNmZyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1ZXJ5IGFyZ3VtZW50LiBFeHRlY3RlZCBzdHJpbmcsIGluc3RlYWQgZ290ICcgKyB0eXBlb2YgcXVlcnkpO1xuICB9XG5cbiAgbGV0IEZvcm1hdHRlciA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xuICBpZiAoY2ZnLmxhbmd1YWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBGb3JtYXR0ZXIgPSBGT1JNQVRURVJTW2NmZy5sYW5ndWFnZV07XG4gIH1cbiAgaWYgKEZvcm1hdHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIFNRTCBkaWFsZWN0OiAke2NmZy5sYW5ndWFnZX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEZvcm1hdHRlcihjZmcpLmZvcm1hdChxdWVyeSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGZvcm1hdCwgRk9STUFUVEVSUyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==