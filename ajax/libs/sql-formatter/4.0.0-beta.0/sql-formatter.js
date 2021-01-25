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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







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

    this.cfg = cfg;
    this.indentation = new _Indentation__WEBPACK_IMPORTED_MODULE_1__["default"](this.cfg.indent);
    this.inlineBlock = new _InlineBlock__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.params = new _Params__WEBPACK_IMPORTED_MODULE_3__["default"](this.cfg.params);
    this.previousReservedToken = {};
    this.tokens = [];
    this.index = 0;
  }
  /**
   * SQL Tokenizer for this formatter, provided by subclasses.
   */


  _createClass(Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      throw new Error('tokenizer() not implemented by subclass');
    }
    /**
     * Reprocess and modify a token based on parsed context.
     *
     * @param {Object} token The token to modify
     *  @param {String} token.type
     *  @param {String} token.value
     * @return {Object} new token or the original
     *  @return {String} token.type
     *  @return {String} token.value
     */

  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // subclasses can override this to modify tokens during formatting
      return token;
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
      this.tokens = this.tokenizer().tokenize(query);
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
        token = _this.tokenOverride(token);

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
      return this.addNewline(query + this.show(token));
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
      query = this.addNewline(query) + this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatTopLevelReservedWord",
    value: function formatTopLevelReservedWord(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query);
      this.indentation.increaseTopLevel();
      query += this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatNewlineReservedWord",
    value: function formatNewlineReservedWord(token, query) {
      return this.addNewline(query) + this.equalizeWhitespace(this.show(token)) + ' ';
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
        query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query);
      }

      query += this.show(token);
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
      query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + ' ';

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
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + ' ';
    }
  }, {
    key: "formatWithoutSpaces",
    value: function formatWithoutSpaces(token, query) {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token);
    }
  }, {
    key: "formatWithSpaces",
    value: function formatWithSpaces(token, query) {
      return query + this.show(token) + ' ';
    }
  }, {
    key: "formatQuerySeparator",
    value: function formatQuerySeparator(token, query) {
      this.indentation.resetIndentation();
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + '\n'.repeat(this.cfg.linesBetweenQueries || 1);
    } // Converts token to string (uppercasing it if needed)

  }, {
    key: "show",
    value: function show(_ref) {
      var type = _ref.type,
          value = _ref.value;

      if (this.cfg.uppercase && (type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN)) {
        return value.toUpperCase();
      } else {
        return value;
      }
    }
  }, {
    key: "addNewline",
    value: function addNewline(query) {
      query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query);

      if (!query.endsWith('\n')) {
        query += '\n';
      }

      return query + this.indentation.getIndent();
    }
  }, {
    key: "previousToken",
    value: function previousToken() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index - offset] || {};
    }
  }, {
    key: "tokenLookBehind",
    value: function tokenLookBehind() {
      return this.tokens[this.index - 1];
    }
  }, {
    key: "tokenLookAhead",
    value: function tokenLookAhead() {
      return this.tokens[this.index + 1];
    }
  }]);

  return Formatter;
}();



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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
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
      if (this.indentTypes.length > 0 && Object(_utils__WEBPACK_IMPORTED_MODULE_0__["last"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
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
/* harmony import */ var _regexFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexFactory */ "./src/core/regexFactory.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





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
    this.OPERATOR_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createOperatorRegex"](['!=', '<<', '>>', '<>', '==', '<=', '>=', '!<', '!>', '||/', '|/', '||', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~', ':=', '@']);
    this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/;
    this.LINE_COMMENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createLineCommentRegex"](cfg.lineCommentTypes);
    this.RESERVED_TOP_LEVEL_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedTopLevelWords);
    this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedTopLevelWordsNoIndent);
    this.RESERVED_NEWLINE_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedNewlineWords);
    this.RESERVED_PLAIN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedWords);
    this.WORD_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createWordRegex"](cfg.specialWordChars);
    this.STRING_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createStringRegex"](cfg.stringTypes);
    this.OPEN_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createParenRegex"](cfg.openParens);
    this.CLOSE_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createParenRegex"](cfg.closeParens);
    this.INDEXED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.indexedPlaceholderTypes, '[0-9]*');
    this.IDENT_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
    this.STRING_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.namedPlaceholderTypes, _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createStringPattern"](cfg.stringTypes));
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


  _createClass(Tokenizer, [{
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
      var _this = this;

      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return _this.getEscapedPlaceholderKey({
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
      return key.replace(new RegExp(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["escapeRegExp"])('\\' + quoteChar), 'gu'), quoteChar);
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

/***/ "./src/core/regexFactory.js":
/*!**********************************!*\
  !*** ./src/core/regexFactory.js ***!
  \**********************************/
/*! exports provided: createOperatorRegex, createLineCommentRegex, createReservedWordRegex, createWordRegex, createStringRegex, createStringPattern, createParenRegex, createPlaceholderRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOperatorRegex", function() { return createOperatorRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLineCommentRegex", function() { return createLineCommentRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReservedWordRegex", function() { return createReservedWordRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWordRegex", function() { return createWordRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStringRegex", function() { return createStringRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStringPattern", function() { return createStringPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createParenRegex", function() { return createParenRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlaceholderRegex", function() { return createPlaceholderRegex; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

function createOperatorRegex(multiLetterOperators) {
  return new RegExp("^(".concat(multiLetterOperators.map(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"]).join('|'), "|.)"), 'u');
}
function createLineCommentRegex(lineCommentTypes) {
  return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"])(c);
  }).join('|'), ").*?)(?:\r\n|\r|\n|$)"), 'u');
}
function createReservedWordRegex(reservedWords) {
  if (reservedWords.length === 0) {
    return new RegExp("^\b$", 'u');
  }

  reservedWords = reservedWords.sort(function (a, b) {
    return b.length - a.length || a.localeCompare(b);
  });
  var reservedWordsPattern = reservedWords.join('|').replace(/ /g, '\\s+');
  return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
}
function createWordRegex() {
  var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
}
function createStringRegex(stringTypes) {
  return new RegExp('^(' + createStringPattern(stringTypes) + ')', 'u');
} // This enables the following string patterns:
// 1. backtick quoted string using `` to escape
// 2. square bracket quoted string (SQL Server) using ]] to escape
// 3. double quoted string using "" or \" to escape
// 4. single quoted string using '' or \' to escape
// 5. national character quoted string using N'' or N\' to escape

function createStringPattern(stringTypes) {
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
function createParenRegex(parens) {
  return new RegExp('^(' + parens.map(escapeParen).join('|') + ')', 'iu');
}

function escapeParen(paren) {
  if (paren.length === 1) {
    // A single punctuation character
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"])(paren);
  } else {
    // longer word
    return '\\b' + paren + '\\b';
  }
}

function createPlaceholderRegex(types, pattern) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(types)) {
    return false;
  }

  var typesRegex = types.map(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"]).join('|');
  return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
}

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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



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

  _createClass(Db2Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      });
    }
  }]);

  return Db2Formatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



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

  _createClass(N1qlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``'],
        openParens: ['(', '[', '{'],
        closeParens: [')', ']', '}'],
        namedPlaceholderTypes: ['$'],
        lineCommentTypes: ['#', '--']
      });
    }
  }]);

  return N1qlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



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
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED_TOP_LEVEL && token.value.toUpperCase() === 'SET' && this.previousReservedToken.value.toUpperCase() === 'BY') {
        return {
          type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED,
          value: token.value
        };
      }

      return token;
    }
  }]);

  return PlSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



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

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



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
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // Fix cases where names are ambiguously keywords or functions
      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED_TOP_LEVEL && token.value.toUpperCase() === 'WINDOW') {
        var aheadToken = this.tokenLookAhead();

        if (aheadToken && aheadToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].OPEN_PAREN) {
          // This is a function call, treat it as a reserved word
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].RESERVED,
            value: token.value
          };
        }
      } // Fix cases where names are ambiguously keywords or properties


      if (token.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].CLOSE_PAREN && token.value.toUpperCase() === 'END') {
        var backToken = this.tokenLookBehind();

        if (backToken && backToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].OPERATOR && backToken.value === '.') {
          // This is window().end (or similar) not CASE ... END
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_2__["default"].WORD,
            value: token.value
          };
        }
      }

      return token;
    }
  }]);

  return SparkSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



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

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/sqlFormatter.js":
/*!*****************************!*\
  !*** ./src/sqlFormatter.js ***!
  \*****************************/
/*! exports provided: format, supportedDialects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportedDialects", function() { return supportedDialects; });
/* harmony import */ var _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languages/Db2Formatter */ "./src/languages/Db2Formatter.js");
/* harmony import */ var _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languages/N1qlFormatter */ "./src/languages/N1qlFormatter.js");
/* harmony import */ var _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languages/PlSqlFormatter */ "./src/languages/PlSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var formatters = {
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
    Formatter = formatters[cfg.language];
  }

  if (Formatter === undefined) {
    throw Error("Unsupported SQL dialect: ".concat(cfg.language));
  }

  return new Formatter(cfg).format(query);
};
var supportedDialects = Object.keys(formatters);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: trimSpacesEnd, last, isEmpty, escapeRegExp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimSpacesEnd", function() { return trimSpacesEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return escapeRegExp; });
// Only removes spaces, not newlines
var trimSpacesEnd = function trimSpacesEnd(str) {
  return str.replace(/[\t ]+$/, '');
}; // Last element from array

var last = function last(arr) {
  return arr[arr.length - 1];
}; // True array is empty, or it's not an array at all

var isEmpty = function isEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}; // Escapes regex special chars

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
};

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1JlZHNoaWZ0Rm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3BhcmtTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9TdGFuZGFyZFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvc3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJGb3JtYXR0ZXIiLCJjZmciLCJpbmRlbnRhdGlvbiIsIkluZGVudGF0aW9uIiwiaW5kZW50IiwiaW5saW5lQmxvY2siLCJJbmxpbmVCbG9jayIsInBhcmFtcyIsIlBhcmFtcyIsInByZXZpb3VzUmVzZXJ2ZWRUb2tlbiIsInRva2VucyIsImluZGV4IiwiRXJyb3IiLCJ0b2tlbiIsInF1ZXJ5IiwidG9rZW5pemVyIiwidG9rZW5pemUiLCJmb3JtYXR0ZWRRdWVyeSIsImdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucyIsInRyaW0iLCJmb3JFYWNoIiwidG9rZW5PdmVycmlkZSIsInR5cGUiLCJ0b2tlblR5cGVzIiwiV0hJVEVTUEFDRSIsIkxJTkVfQ09NTUVOVCIsImZvcm1hdExpbmVDb21tZW50IiwiQkxPQ0tfQ09NTUVOVCIsImZvcm1hdEJsb2NrQ29tbWVudCIsIlJFU0VSVkVEX1RPUF9MRVZFTCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FIiwiZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCIsIlJFU0VSVkVEIiwiZm9ybWF0V2l0aFNwYWNlcyIsIk9QRU5fUEFSRU4iLCJmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXMiLCJDTE9TRV9QQVJFTiIsImZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyIsIlBMQUNFSE9MREVSIiwiZm9ybWF0UGxhY2Vob2xkZXIiLCJ2YWx1ZSIsImZvcm1hdENvbW1hIiwiZm9ybWF0V2l0aFNwYWNlQWZ0ZXIiLCJmb3JtYXRXaXRob3V0U3BhY2VzIiwiZm9ybWF0UXVlcnlTZXBhcmF0b3IiLCJhZGROZXdsaW5lIiwic2hvdyIsImluZGVudENvbW1lbnQiLCJjb21tZW50IiwicmVwbGFjZSIsImdldEluZGVudCIsImRlY3JlYXNlVG9wTGV2ZWwiLCJlcXVhbGl6ZVdoaXRlc3BhY2UiLCJpbmNyZWFzZVRvcExldmVsIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJwcmV2aW91c1Rva2VuIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwidGVzdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIm9mZnNldCIsIklOREVOVF9UWVBFX1RPUF9MRVZFTCIsIklOREVOVF9UWVBFX0JMT0NLX0xFVkVMIiwiaW5kZW50VHlwZXMiLCJsZW5ndGgiLCJwdXNoIiwibGFzdCIsInBvcCIsIklOTElORV9NQVhfTEVOR1RIIiwibGV2ZWwiLCJpc0lubGluZUJsb2NrIiwiaSIsImlzRm9yYmlkZGVuVG9rZW4iLCJDT01NRU5UIiwia2V5IiwiVG9rZW5pemVyIiwiV0hJVEVTUEFDRV9SRUdFWCIsIk5VTUJFUl9SRUdFWCIsIk9QRVJBVE9SX1JFR0VYIiwicmVnZXhGYWN0b3J5IiwiQkxPQ0tfQ09NTUVOVF9SRUdFWCIsIkxJTkVfQ09NTUVOVF9SRUdFWCIsImxpbmVDb21tZW50VHlwZXMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgiLCJyZXNlcnZlZFRvcExldmVsV29yZHMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FX1JFR0VYIiwicmVzZXJ2ZWROZXdsaW5lV29yZHMiLCJSRVNFUlZFRF9QTEFJTl9SRUdFWCIsInJlc2VydmVkV29yZHMiLCJXT1JEX1JFR0VYIiwic3BlY2lhbFdvcmRDaGFycyIsIlNUUklOR19SRUdFWCIsInN0cmluZ1R5cGVzIiwiT1BFTl9QQVJFTl9SRUdFWCIsIm9wZW5QYXJlbnMiLCJDTE9TRV9QQVJFTl9SRUdFWCIsImNsb3NlUGFyZW5zIiwiSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCIsImluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIiwiSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJuYW1lZFBsYWNlaG9sZGVyVHlwZXMiLCJTVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbnB1dCIsImdldE5leHRUb2tlbiIsInN1YnN0cmluZyIsImdldFdoaXRlc3BhY2VUb2tlbiIsImdldENvbW1lbnRUb2tlbiIsImdldFN0cmluZ1Rva2VuIiwiZ2V0T3BlblBhcmVuVG9rZW4iLCJnZXRDbG9zZVBhcmVuVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuIiwiZ2V0TnVtYmVyVG9rZW4iLCJnZXRSZXNlcnZlZFdvcmRUb2tlbiIsImdldFdvcmRUb2tlbiIsImdldE9wZXJhdG9yVG9rZW4iLCJnZXRUb2tlbk9uRmlyc3RNYXRjaCIsInJlZ2V4IiwiZ2V0TGluZUNvbW1lbnRUb2tlbiIsImdldEJsb2NrQ29tbWVudFRva2VuIiwiU1RSSU5HIiwiZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5IiwicGFyc2VLZXkiLCJ2Iiwic2xpY2UiLCJnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkiLCJxdW90ZUNoYXIiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJOVU1CRVIiLCJ1bmRlZmluZWQiLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4iLCJnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbiIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50IiwiZ2V0UGxhaW5SZXNlcnZlZFRva2VuIiwiV09SRCIsIm1hdGNoZXMiLCJtYXRjaCIsImNyZWF0ZU9wZXJhdG9yUmVnZXgiLCJtdWx0aUxldHRlck9wZXJhdG9ycyIsIm1hcCIsImpvaW4iLCJjcmVhdGVMaW5lQ29tbWVudFJlZ2V4IiwiYyIsImNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4Iiwic29ydCIsImEiLCJiIiwibG9jYWxlQ29tcGFyZSIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbENoYXJzIiwiY3JlYXRlU3RyaW5nUmVnZXgiLCJjcmVhdGVTdHJpbmdQYXR0ZXJuIiwicGF0dGVybnMiLCJ0IiwiY3JlYXRlUGFyZW5SZWdleCIsInBhcmVucyIsImVzY2FwZVBhcmVuIiwicGFyZW4iLCJjcmVhdGVQbGFjZWhvbGRlclJlZ2V4IiwidHlwZXMiLCJwYXR0ZXJuIiwiaXNFbXB0eSIsInR5cGVzUmVnZXgiLCJEYjJGb3JtYXR0ZXIiLCJOMXFsRm9ybWF0dGVyIiwiUGxTcWxGb3JtYXR0ZXIiLCJTdGFuZGFyZFNxbEZvcm1hdHRlciIsIlNwYXJrU3FsRm9ybWF0dGVyIiwiYWhlYWRUb2tlbiIsInRva2VuTG9va0FoZWFkIiwiYmFja1Rva2VuIiwidG9rZW5Mb29rQmVoaW5kIiwiZm9ybWF0dGVycyIsImRiMiIsIm4xcWwiLCJwbHNxbCIsInJlZHNoaWZ0IiwiUmVkc2hpZnRGb3JtYXR0ZXIiLCJzcGFyayIsInNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFn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ZCxFQUFtQndNLE1BQW5CLENBQTBCM0wsS0FBMUIsQ0FBUDtBQUNELENBYk07QUFlQSxJQUFNNkwsaUJBQWlCLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWixVQUFaLENBQTFCLEM7Ozs7Ozs7Ozs7OztBQzVDUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTyxJQUFNcEksYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDaUosR0FBRDtBQUFBLFNBQVNBLEdBQUcsQ0FBQzFKLE9BQUosQ0FBWSxTQUFaLEVBQXdCLEVBQXhCLENBQVQ7QUFBQSxDQUF0QixDLENBRVA7O0FBQ08sSUFBTTZCLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUM4SCxHQUFEO0FBQUEsU0FBU0EsR0FBRyxDQUFDQSxHQUFHLENBQUNoSSxNQUFKLEdBQWEsQ0FBZCxDQUFaO0FBQUEsQ0FBYixDLENBRVA7O0FBQ08sSUFBTXVHLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUN5QixHQUFEO0FBQUEsU0FBUyxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxDQUFELElBQXVCQSxHQUFHLENBQUNoSSxNQUFKLEtBQWUsQ0FBL0M7QUFBQSxDQUFoQixDLENBRVA7O0FBQ08sSUFBTW9FLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUMxRixNQUFEO0FBQUEsU0FBWUEsTUFBTSxDQUFDTCxPQUFQLENBQWUsMEJBQWYsRUFBdUMsTUFBdkMsQ0FBWjtBQUFBLENBQXJCLEMiLCJmaWxlIjoic3FsLWZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NxbEZvcm1hdHRlci5qc1wiKTtcbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5pbXBvcnQgSW5kZW50YXRpb24gZnJvbSAnLi9JbmRlbnRhdGlvbic7XG5pbXBvcnQgSW5saW5lQmxvY2sgZnJvbSAnLi9JbmxpbmVCbG9jayc7XG5pbXBvcnQgUGFyYW1zIGZyb20gJy4vUGFyYW1zJztcbmltcG9ydCB7IHRyaW1TcGFjZXNFbmQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmxhbmd1YWdlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudFxuICAgKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlXG4gICAqICBAcGFyYW0ge0ludGVnZXJ9IGNmZy5saW5lc0JldHdlZW5RdWVyaWVzXG4gICAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IoY2ZnKSB7XG4gICAgdGhpcy5jZmcgPSBjZmc7XG4gICAgdGhpcy5pbmRlbnRhdGlvbiA9IG5ldyBJbmRlbnRhdGlvbih0aGlzLmNmZy5pbmRlbnQpO1xuICAgIHRoaXMuaW5saW5lQmxvY2sgPSBuZXcgSW5saW5lQmxvY2soKTtcbiAgICB0aGlzLnBhcmFtcyA9IG5ldyBQYXJhbXModGhpcy5jZmcucGFyYW1zKTtcbiAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHt9O1xuICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogU1FMIFRva2VuaXplciBmb3IgdGhpcyBmb3JtYXR0ZXIsIHByb3ZpZGVkIGJ5IHN1YmNsYXNzZXMuXG4gICAqL1xuICB0b2tlbml6ZXIoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0b2tlbml6ZXIoKSBub3QgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByb2Nlc3MgYW5kIG1vZGlmeSBhIHRva2VuIGJhc2VkIG9uIHBhcnNlZCBjb250ZXh0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW4gVGhlIHRva2VuIHRvIG1vZGlmeVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IG5ldyB0b2tlbiBvciB0aGUgb3JpZ2luYWxcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKi9cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIC8vIHN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gbW9kaWZ5IHRva2VucyBkdXJpbmcgZm9ybWF0dGluZ1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXRzIHdoaXRlc3BhY2UgaW4gYSBTUUwgc3RyaW5nIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgU1FMIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBxdWVyeVxuICAgKi9cbiAgZm9ybWF0KHF1ZXJ5KSB7XG4gICAgdGhpcy50b2tlbnMgPSB0aGlzLnRva2VuaXplcigpLnRva2VuaXplKHF1ZXJ5KTtcbiAgICBjb25zdCBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCk7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnkudHJpbSgpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCkge1xuICAgIGxldCBmb3JtYXR0ZWRRdWVyeSA9ICcnO1xuXG4gICAgdGhpcy50b2tlbnMuZm9yRWFjaCgodG9rZW4sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbk92ZXJyaWRlKHRva2VuKTtcblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuV0hJVEVTUEFDRSkge1xuICAgICAgICAvLyBpZ25vcmUgKHdlIGRvIG91ciBvd24gd2hpdGVzcGFjZSBmb3JtYXR0aW5nKVxuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5QTEFDRUhPTERFUikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcsJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q29tbWEodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc6Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnk7XG4gIH1cblxuICBmb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSk7XG4gIH1cblxuICBmb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZSh0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5pbmRlbnRDb21tZW50KHRva2VuLnZhbHVlKSk7XG4gIH1cblxuICBpbmRlbnRDb21tZW50KGNvbW1lbnQpIHtcbiAgICByZXR1cm4gY29tbWVudC5yZXBsYWNlKC9cXG5bIFxcdF0qL2d1LCAnXFxuJyArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCkgKyAnICcpO1xuICB9XG5cbiAgZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcbiAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSArPSB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKSArICcgJztcbiAgfVxuXG4gIC8vIFJlcGxhY2UgYW55IHNlcXVlbmNlIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyB3aXRoIHNpbmdsZSBzcGFjZVxuICBlcXVhbGl6ZVdoaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9cXHMrL2d1LCAnICcpO1xuICB9XG5cbiAgLy8gT3BlbmluZyBwYXJlbnRoZXNlcyBpbmNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsIGFuZCBzdGFydCBhIG5ldyBsaW5lXG4gIGZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICAvLyBUYWtlIG91dCB0aGUgcHJlY2VkaW5nIHNwYWNlIHVubGVzcyB0aGVyZSB3YXMgd2hpdGVzcGFjZSB0aGVyZSBpbiB0aGUgb3JpZ2luYWwgcXVlcnlcbiAgICAvLyBvciBhbm90aGVyIG9wZW5pbmcgcGFyZW5zIG9yIGxpbmUgY29tbWVudFxuICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZUZvciA9IHtcbiAgICAgIFt0b2tlblR5cGVzLldISVRFU1BBQ0VdOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuT1BFTl9QQVJFTl06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlRdOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuT1BFUkFUT1JdOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKCFwcmVzZXJ2ZVdoaXRlc3BhY2VGb3JbdGhpcy5wcmV2aW91c1Rva2VuKCkudHlwZV0pIHtcbiAgICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgfVxuICAgIHF1ZXJ5ICs9IHRoaXMuc2hvdyh0b2tlbik7XG5cbiAgICB0aGlzLmlubGluZUJsb2NrLmJlZ2luSWZQb3NzaWJsZSh0aGlzLnRva2VucywgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgLy8gQ2xvc2luZyBwYXJlbnRoZXNlcyBkZWNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsXG4gIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmlubGluZUJsb2NrLmVuZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHRoaXMuYWRkTmV3bGluZShxdWVyeSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMucGFyYW1zLmdldCh0b2tlbikgKyAnICc7XG4gIH1cblxuICAvLyBDb21tYXMgc3RhcnQgYSBuZXcgbGluZSAodW5sZXNzIHdpdGhpbiBpbmxpbmUgcGFyZW50aGVzZXMgb3IgU1FMIFwiTElNSVRcIiBjbGF1c2UpXG4gIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuXG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSBpZiAoL15MSU1JVCQvaXUudGVzdCh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24ucmVzZXRJbmRlbnRhdGlvbigpO1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnXFxuJy5yZXBlYXQodGhpcy5jZmcubGluZXNCZXR3ZWVuUXVlcmllcyB8fCAxKTtcbiAgfVxuXG4gIC8vIENvbnZlcnRzIHRva2VuIHRvIHN0cmluZyAodXBwZXJjYXNpbmcgaXQgaWYgbmVlZGVkKVxuICBzaG93KHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2ZnLnVwcGVyY2FzZSAmJlxuICAgICAgKHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4gfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTilcbiAgICApIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYWRkTmV3bGluZShxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgaWYgKCFxdWVyeS5lbmRzV2l0aCgnXFxuJykpIHtcbiAgICAgIHF1ZXJ5ICs9ICdcXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpO1xuICB9XG5cbiAgcHJldmlvdXNUb2tlbihvZmZzZXQgPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggLSBvZmZzZXRdIHx8IHt9O1xuICB9XG5cbiAgdG9rZW5Mb29rQmVoaW5kKCkge1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmluZGV4IC0gMV07XG4gIH1cblxuICB0b2tlbkxvb2tBaGVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCArIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBsYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBJTkRFTlRfVFlQRV9UT1BfTEVWRUwgPSAndG9wLWxldmVsJztcbmNvbnN0IElOREVOVF9UWVBFX0JMT0NLX0xFVkVMID0gJ2Jsb2NrLWxldmVsJztcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUF9MRVZFTCB3b3Jkc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRlbnRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaW5kZW50IEluZGVudCB2YWx1ZSwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5kZW50KSB7XG4gICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgJyAgJztcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0SW5kZW50KCkge1xuICAgIHJldHVybiB0aGlzLmluZGVudC5yZXBlYXQodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgdG9wLWxldmVsIGluZGVudC5cbiAgICovXG4gIGluY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX0JMT0NLX0xFVkVMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqIERvZXMgbm90aGluZyB3aGVuIHRoZSBwcmV2aW91cyBpbmRlbnQgaXMgbm90IHRvcC1sZXZlbC5cbiAgICovXG4gIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgaWYgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCAmJiBsYXN0KHRoaXMuaW5kZW50VHlwZXMpID09PSBJTkRFTlRfVFlQRV9UT1BfTEVWRUwpIHtcbiAgICAgIHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKiBJZiB0aGVyZSBhcmUgdG9wLWxldmVsIGluZGVudHMgd2l0aGluIHRoZSBibG9jay1sZXZlbCBpbmRlbnQsXG4gICAqIHRocm93cyBhd2F5IHRoZXNlIGFzIHdlbGwuXG4gICAqL1xuICBkZWNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgd2hpbGUgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgICBpZiAodHlwZSAhPT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SW5kZW50YXRpb24oKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBJTkxJTkVfTUFYX0xFTkdUSCA9IDUwO1xuXG4vKipcbiAqIEJvb2trZWVwZXIgZm9yIGlubGluZSBibG9ja3MuXG4gKlxuICogSW5saW5lIGJsb2NrcyBhcmUgcGFyZW50aGl6ZWQgZXhwcmVzc2lvbnMgdGhhdCBhcmUgc2hvcnRlciB0aGFuIElOTElORV9NQVhfTEVOR1RILlxuICogVGhlc2UgYmxvY2tzIGFyZSBmb3JtYXR0ZWQgb24gYSBzaW5nbGUgbGluZSwgdW5saWtlIGxvbmdlciBwYXJlbnRoaXplZFxuICogZXhwcmVzc2lvbnMgd2hlcmUgb3Blbi1wYXJlbnRoZXNpcyBjYXVzZXMgbmV3bGluZSBhbmQgaW5jcmVhc2Ugb2YgaW5kZW50YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUJsb2NrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sZXZlbCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIGlubGluZSBibG9jayB3aGVuIGxvb2thaGVhZCB0aHJvdWdoIHVwY29taW5nIHRva2VucyBkZXRlcm1pbmVzXG4gICAqIHRoYXQgdGhlIGJsb2NrIHdvdWxkIGJlIHNtYWxsZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAgICogQHBhcmFtICB7T2JqZWN0W119IHRva2VucyBBcnJheSBvZiBhbGwgdG9rZW5zXG4gICAqIEBwYXJhbSAge051bWJlcn0gaW5kZXggQ3VycmVudCB0b2tlbiBwb3NpdGlvblxuICAgKi9cbiAgYmVnaW5JZlBvc3NpYmxlKHRva2VucywgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sZXZlbCA9PT0gMCAmJiB0aGlzLmlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkpIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sZXZlbCA+IDApIHtcbiAgICAgIHRoaXMubGV2ZWwrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIGN1cnJlbnQgaW5saW5lIGJsb2NrLlxuICAgKiBUaGVyZSBtaWdodCBiZSBzZXZlcmFsIG5lc3RlZCBvbmVzLlxuICAgKi9cbiAgZW5kKCkge1xuICAgIHRoaXMubGV2ZWwtLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gaW5zaWRlIGFuIGlubGluZSBibG9ja1xuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV2ZWwgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgYW4gaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIC8vIEV4YW1wbGVzIGFyZSBcIk5PVygpXCIsIFwiQ09VTlQoKilcIiwgXCJpbnQoMTApXCIsIGtleShgc29tZWNvbHVtbmApLCBERUNJTUFMKDcsMilcbiAgaXNJbmxpbmVCbG9jayh0b2tlbnMsIGluZGV4KSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBsZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuXG4gICAgICAvLyBPdmVycmFuIG1heCBsZW5ndGhcbiAgICAgIGlmIChsZW5ndGggPiBJTkxJTkVfTUFYX0xFTkdUSCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwrKztcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBsZXZlbC0tO1xuICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0ZvcmJpZGRlblRva2VuKHRva2VuKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFJlc2VydmVkIHdvcmRzIHRoYXQgY2F1c2UgbmV3bGluZXMsIGNvbW1lbnRzIGFuZCBzZW1pY29sb25zXG4gIC8vIGFyZSBub3QgYWxsb3dlZCBpbnNpZGUgaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIGlzRm9yYmlkZGVuVG9rZW4oeyB0eXBlLCB2YWx1ZSB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQ09NTUVOVCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UIHx8XG4gICAgICB2YWx1ZSA9PT0gJzsnXG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBIYW5kbGVzIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50IHdpdGggZ2l2ZW4gcGFyYW1zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbXMge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBwYXJhbSB2YWx1ZSB0aGF0IG1hdGNoZXMgZ2l2ZW4gcGxhY2Vob2xkZXIgd2l0aCBwYXJhbSBrZXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi5rZXkgUGxhY2Vob2xkZXIga2V5XG4gICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlIFBsYWNlaG9sZGVyIHZhbHVlXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcGFyYW0gb3IgdG9rZW4udmFsdWUgd2hlbiBwYXJhbXMgYXJlIG1pc3NpbmdcbiAgICovXG4gIGdldCh7IGtleSwgdmFsdWUgfSkge1xuICAgIGlmICghdGhpcy5wYXJhbXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhcmFtc1t0aGlzLmluZGV4KytdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0ICogYXMgcmVnZXhGYWN0b3J5IGZyb20gJy4vcmVnZXhGYWN0b3J5JztcbmltcG9ydCB7IGVzY2FwZVJlZ0V4cCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5pemVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFdvcmRzIFJlc2VydmVkIHdvcmRzIGluIFNRTFxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzIFdvcmRzIHRoYXQgYXJlIHNldCB0byBuZXdsaW5lXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgV29yZHMgdGhhdCBhcmUgdG9wIGxldmVsIGJ1dCBoYXZlIG5vIGluZGVudGF0aW9uXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3RyaW5nVHlwZXMgU3RyaW5nIHR5cGVzIHRvIGVuYWJsZTogXCJcIiwgJycsIGBgLCBbXSwgTicnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuY2xvc2VQYXJlbnMgQ2xvc2luZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKSwgXVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBpbmRleGVkIHBsYWNlaG9sZGVycywgbGlrZSA/XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmxpbmVDb21tZW50VHlwZXMgTGluZSBjb21tZW50cyB0byBlbmFibGUsIGxpa2UgIyBhbmQgLS1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5zcGVjaWFsV29yZENoYXJzIFNwZWNpYWwgY2hhcnMgdGhhdCBjYW4gYmUgZm91bmQgaW5zaWRlIG9mIHdvcmRzLCBsaWtlIEAgYW5kICNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuXG4gICAgdGhpcy5PUEVSQVRPUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVPcGVyYXRvclJlZ2V4KFtcbiAgICAgICchPScsXG4gICAgICAnPDwnLFxuICAgICAgJz4+JyxcbiAgICAgICc8PicsXG4gICAgICAnPT0nLFxuICAgICAgJzw9JyxcbiAgICAgICc+PScsXG4gICAgICAnITwnLFxuICAgICAgJyE+JyxcbiAgICAgICd8fC8nLFxuICAgICAgJ3wvJyxcbiAgICAgICd8fCcsXG4gICAgICAnOjonLFxuICAgICAgJy0+PicsXG4gICAgICAnLT4nLFxuICAgICAgJ35+KicsXG4gICAgICAnfn4nLFxuICAgICAgJyF+fionLFxuICAgICAgJyF+ficsXG4gICAgICAnfionLFxuICAgICAgJyF+KicsXG4gICAgICAnIX4nLFxuICAgICAgJzo9JyxcbiAgICAgICdAJyxcbiAgICBdKTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZUxpbmVDb21tZW50UmVnZXgoY2ZnLmxpbmVDb21tZW50VHlwZXMpO1xuXG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFdvcmRzKTtcblxuICAgIHRoaXMuV09SRF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1JlZ2V4KGNmZy5zdHJpbmdUeXBlcyk7XG5cbiAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcub3BlblBhcmVucyk7XG4gICAgdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbMC05XSonXG4gICAgKTtcbiAgICB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1thLXpBLVowLTkuXyRdKydcbiAgICApO1xuICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1BhdHRlcm4oY2ZnLnN0cmluZ1R5cGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBTUUwgc3RyaW5nIGFuZCBicmVha3MgaXQgaW50byB0b2tlbnMuXG4gICAqIEVhY2ggdG9rZW4gaXMgYW4gb2JqZWN0IHdpdGggdHlwZSBhbmQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgU1FMIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gdG9rZW5zIEFuIGFycmF5IG9mIHRva2Vucy5cbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKi9cbiAgdG9rZW5pemUoaW5wdXQpIHtcbiAgICBjb25zdCB0b2tlbnMgPSBbXTtcbiAgICBsZXQgdG9rZW47XG5cbiAgICAvLyBLZWVwIHByb2Nlc3NpbmcgdGhlIHN0cmluZyB1bnRpbCBpdCBpcyBlbXB0eVxuICAgIHdoaWxlIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgIC8vIEdldCB0aGUgbmV4dCB0b2tlbiBhbmQgdGhlIHRva2VuIHR5cGVcbiAgICAgIHRva2VuID0gdGhpcy5nZXROZXh0VG9rZW4oaW5wdXQsIHRva2VuKTtcbiAgICAgIC8vIEFkdmFuY2UgdGhlIHN0cmluZ1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcodG9rZW4udmFsdWUubGVuZ3RoKTtcblxuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZ2V0TmV4dFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0V2hpdGVzcGFjZVRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRDb21tZW50VG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ1Rva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROdW1iZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHx8XG4gICAgICB0aGlzLmdldFdvcmRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlcmF0b3JUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0V2hpdGVzcGFjZVRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLldISVRFU1BBQ0UsXG4gICAgICByZWdleDogdGhpcy5XSElURVNQQUNFX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCk7XG4gIH1cblxuICBnZXRMaW5lQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLkxJTkVfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEJsb2NrQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuU1RSSU5HLFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFTl9QQVJFTixcbiAgICAgIHJlZ2V4OiB0aGlzLk9QRU5fUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbG9zZVBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+XG4gICAgICAgIHRoaXMuZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5KHsga2V5OiB2LnNsaWNlKDIsIC0xKSwgcXVvdGVDaGFyOiB2LnNsaWNlKC0xKSB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoeyBpbnB1dCwgcmVnZXgsIHBhcnNlS2V5IH0pIHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goeyBpbnB1dCwgcmVnZXgsIHR5cGU6IHRva2VuVHlwZXMuUExBQ0VIT0xERVIgfSk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB0b2tlbi5rZXkgPSBwYXJzZUtleSh0b2tlbi52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleSwgcXVvdGVDaGFyIH0pIHtcbiAgICByZXR1cm4ga2V5LnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoJ1xcXFwnICsgcXVvdGVDaGFyKSwgJ2d1JyksIHF1b3RlQ2hhcik7XG4gIH1cblxuICAvLyBEZWNpbWFsLCBiaW5hcnksIG9yIGhleCBudW1iZXJzXG4gIGdldE51bWJlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk5VTUJFUixcbiAgICAgIHJlZ2V4OiB0aGlzLk5VTUJFUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1bmN0dWF0aW9uIGFuZCBzeW1ib2xzXG4gIGdldE9wZXJhdG9yVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFUkFUT1IsXG4gICAgICByZWdleDogdGhpcy5PUEVSQVRPUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgLy8gQSByZXNlcnZlZCB3b3JkIGNhbm5vdCBiZSBwcmVjZWRlZCBieSBhIFwiLlwiXG4gICAgLy8gdGhpcyBtYWtlcyBpdCBzbyBpbiBcIm15dGFibGUuZnJvbVwiLCBcImZyb21cIiBpcyBub3QgY29uc2lkZXJlZCBhIHJlc2VydmVkIHdvcmRcbiAgICBpZiAocHJldmlvdXNUb2tlbiAmJiBwcmV2aW91c1Rva2VuLnZhbHVlICYmIHByZXZpb3VzVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFBsYWluUmVzZXJ2ZWRUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE5ld2xpbmVSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9QTEFJTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5XT1JELFxuICAgICAgcmVnZXg6IHRoaXMuV09SRF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHR5cGUsIHJlZ2V4IH0pIHtcbiAgICBjb25zdCBtYXRjaGVzID0gaW5wdXQubWF0Y2gocmVnZXgpO1xuXG4gICAgcmV0dXJuIG1hdGNoZXMgPyB7IHR5cGUsIHZhbHVlOiBtYXRjaGVzWzFdIH0gOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IGVzY2FwZVJlZ0V4cCwgaXNFbXB0eSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yUmVnZXgobXVsdGlMZXR0ZXJPcGVyYXRvcnMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4oJHttdWx0aUxldHRlck9wZXJhdG9ycy5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8Jyl9fC4pYCwgJ3UnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmVDb21tZW50UmVnZXgobGluZUNvbW1lbnRUeXBlcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXigoPzoke2xpbmVDb21tZW50VHlwZXMubWFwKChjKSA9PiBlc2NhcGVSZWdFeHAoYykpLmpvaW4oJ3wnKX0pLio/KSg/OlxcclxcbnxcXHJ8XFxufCQpYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KHJlc2VydmVkV29yZHMpIHtcbiAgaWYgKHJlc2VydmVkV29yZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYF5cXGIkYCwgJ3UnKTtcbiAgfVxuICByZXNlcnZlZFdvcmRzID0gcmVzZXJ2ZWRXb3Jkcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGggfHwgYS5sb2NhbGVDb21wYXJlKGIpO1xuICB9KTtcbiAgY29uc3QgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSByZXNlcnZlZFdvcmRzLmpvaW4oJ3wnKS5yZXBsYWNlKC8gL2d1LCAnXFxcXHMrJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCR7cmVzZXJ2ZWRXb3Jkc1BhdHRlcm59KVxcXFxiYCwgJ2l1Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkUmVnZXgoc3BlY2lhbENoYXJzID0gW10pIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oW1xcXFxwe0FscGhhYmV0aWN9XFxcXHB7TWFya31cXFxccHtEZWNpbWFsX051bWJlcn1cXFxccHtDb25uZWN0b3JfUHVuY3R1YXRpb259XFxcXHB7Sm9pbl9Db250cm9sfSR7c3BlY2lhbENoYXJzLmpvaW4oXG4gICAgICAnJ1xuICAgICl9XSspYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSArICcpJywgJ3UnKTtcbn1cblxuLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuLy8gMS4gYmFja3RpY2sgcXVvdGVkIHN0cmluZyB1c2luZyBgYCB0byBlc2NhcGVcbi8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuLy8gNC4gc2luZ2xlIHF1b3RlZCBzdHJpbmcgdXNpbmcgJycgb3IgXFwnIHRvIGVzY2FwZVxuLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykge1xuICBjb25zdCBwYXR0ZXJucyA9IHtcbiAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgJ3t9JzogJygoXFxcXHtbXlxcXFx9XSooJHxcXFxcfSkpKyknLFxuICAgICdbXSc6ICcoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKScsXG4gICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiTicnXCI6IFwiKChOJ1teTidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15OJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ1R5cGVzLm1hcCgodCkgPT4gcGF0dGVybnNbdF0pLmpvaW4oJ3wnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBwYXJlbnMubWFwKGVzY2FwZVBhcmVuKS5qb2luKCd8JykgKyAnKScsICdpdScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChwYXJlbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbG9uZ2VyIHdvcmRcbiAgICByZXR1cm4gJ1xcXFxiJyArIHBhcmVuICsgJ1xcXFxiJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXJSZWdleCh0eXBlcywgcGF0dGVybikge1xuICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cChgXigoPzoke3R5cGVzUmVnZXh9KSg/OiR7cGF0dGVybn0pKWAsICd1Jyk7XG59XG4iLCIvKipcbiAqIENvbnN0YW50cyBmb3IgdG9rZW4gdHlwZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBXSElURVNQQUNFOiAnd2hpdGVzcGFjZScsXG4gIFdPUkQ6ICd3b3JkJyxcbiAgU1RSSU5HOiAnc3RyaW5nJyxcbiAgUkVTRVJWRUQ6ICdyZXNlcnZlZCcsXG4gIFJFU0VSVkVEX1RPUF9MRVZFTDogJ3Jlc2VydmVkLXRvcC1sZXZlbCcsXG4gIFJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQ6ICdyZXNlcnZlZC10b3AtbGV2ZWwtbm8taW5kZW50JyxcbiAgUkVTRVJWRURfTkVXTElORTogJ3Jlc2VydmVkLW5ld2xpbmUnLFxuICBPUEVSQVRPUjogJ29wZXJhdG9yJyxcbiAgT1BFTl9QQVJFTjogJ29wZW4tcGFyZW4nLFxuICBDTE9TRV9QQVJFTjogJ2Nsb3NlLXBhcmVuJyxcbiAgTElORV9DT01NRU5UOiAnbGluZS1jb21tZW50JyxcbiAgQkxPQ0tfQ09NTUVOVDogJ2Jsb2NrLWNvbW1lbnQnLFxuICBOVU1CRVI6ICdudW1iZXInLFxuICBQTEFDRUhPTERFUjogJ3BsYWNlaG9sZGVyJyxcbn07XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJTJyxcbiAgJ0FDVElWQVRFJyxcbiAgJ0FMSUFTJyxcbiAgJ0FMTCcsXG4gICdBTExPQ0FURScsXG4gICdBTExPVycsXG4gICdBTFRFUicsXG4gICdBTlknLFxuICAnQVJFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0FTU09DSUFURScsXG4gICdBU1VUSU1FJyxcbiAgJ0FTWU1NRVRSSUMnLFxuICAnQVQnLFxuICAnQVRPTUlDJyxcbiAgJ0FUVFJJQlVURVMnLFxuICAnQVVESVQnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdBVVgnLFxuICAnQVVYSUxJQVJZJyxcbiAgJ0FWRycsXG4gICdCRUZPUkUnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JVRkZFUlBPT0wnLFxuICAnQlknLFxuICAnQ0FDSEUnLFxuICAnQ0FMTCcsXG4gICdDQUxMRUQnLFxuICAnQ0FQVFVSRScsXG4gICdDQVJESU5BTElUWScsXG4gICdDQVNDQURFRCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0NTSUQnLFxuICAnQ0VJTCcsXG4gICdDRUlMSU5HJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJBQ1RFUl9MRU5HVEgnLFxuICAnQ0hBUl9MRU5HVEgnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQicsXG4gICdDTE9ORScsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xMRUNUSU9OJyxcbiAgJ0NPTExJRCcsXG4gICdDT0xVTU4nLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09OQ0FUJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05ORUNUJyxcbiAgJ0NPTk5FQ1RJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NPUlInLFxuICAnQ09SUkVTUE9ORElORycsXG4gICdDT1VOVCcsXG4gICdDT1VOVF9CSUcnLFxuICAnQ09WQVJfUE9QJyxcbiAgJ0NPVkFSX1NBTVAnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfREVGQVVMVF9UUkFOU0ZPUk1fR1JPVVAnLFxuICAnQ1VSUkVOVF9MQ19DVFlQRScsXG4gICdDVVJSRU5UX1BBVEgnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfU0NIRU1BJyxcbiAgJ0NVUlJFTlRfU0VSVkVSJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1RJTUVaT05FJyxcbiAgJ0NVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFUQScsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBUEFSVElUSU9OTkFNRScsXG4gICdEQVRBUEFSVElUSU9OTlVNJyxcbiAgJ0RBVEUnLFxuICAnREFZJyxcbiAgJ0RBWVMnLFxuICAnREIyR0VORVJBTCcsXG4gICdEQjJHRU5STCcsXG4gICdEQjJTUUwnLFxuICAnREJJTkZPJyxcbiAgJ0RCUEFSVElUSU9OTkFNRScsXG4gICdEQlBBUlRJVElPTk5VTScsXG4gICdERUFMTE9DQVRFJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUZBVUxUUycsXG4gICdERUZJTklUSU9OJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRVJBTksnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVJFRicsXG4gICdERVNDUklCRScsXG4gICdERVNDUklQVE9SJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElBR05PU1RJQ1MnLFxuICAnRElTQUJMRScsXG4gICdESVNBTExPVycsXG4gICdESVNDT05ORUNUJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPQ1VNRU5UJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RTU0laRScsXG4gICdEWU5BTUlDJyxcbiAgJ0VBQ0gnLFxuICAnRURJVFBST0MnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVElPTicsXG4gICdFTkQnLFxuICAnRU5ELUVYRUMnLFxuICAnRU5ESU5HJyxcbiAgJ0VSQVNFJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVSWScsXG4gICdFWENFUFRJT04nLFxuICAnRVhDTFVESU5HJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhQJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhURU5ERUQnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRU5DRUQnLFxuICAnRkVUQ0gnLFxuICAnRklFTERQUk9DJyxcbiAgJ0ZJTEUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJTkFMJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT09SJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUUnLFxuICAnRlVMTCcsXG4gICdGVU5DVElPTicsXG4gICdGVVNJT04nLFxuICAnR0VORVJBTCcsXG4gICdHRU5FUkFURUQnLFxuICAnR0VUJyxcbiAgJ0dMT0JBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQVBISUMnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnSEFORExFUicsXG4gICdIQVNIJyxcbiAgJ0hBU0hFRF9WQUxVRScsXG4gICdISU5UJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJREVOVElUWScsXG4gICdJRicsXG4gICdJTU1FRElBVEUnLFxuICAnSU4nLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOQ0xVU0lWRScsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lORElDQVRPUlMnLFxuICAnSU5GJyxcbiAgJ0lORklOSVRZJyxcbiAgJ0lOSEVSSVQnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVHUklUWScsXG4gICdJTlRFUlNFQ1RJT04nLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdJU09CSUQnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0lURVJBVEUnLFxuICAnSkFSJyxcbiAgJ0pBVkEnLFxuICAnS0VFUCcsXG4gICdLRVknLFxuICAnTEFCRUwnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEFURVJBTCcsXG4gICdMQ19DVFlQRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFQVZFJyxcbiAgJ0xFRlQnLFxuICAnTElLRScsXG4gICdMSU5LVFlQRScsXG4gICdMTicsXG4gICdMT0NBTCcsXG4gICdMT0NBTERBVEUnLFxuICAnTE9DQUxFJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NBVE9SJyxcbiAgJ0xPQ0FUT1JTJyxcbiAgJ0xPQ0snLFxuICAnTE9DS01BWCcsXG4gICdMT0NLU0laRScsXG4gICdMT05HJyxcbiAgJ0xPT1AnLFxuICAnTE9XRVInLFxuICAnTUFJTlRBSU5FRCcsXG4gICdNQVRDSCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUFYJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNRVRIT0QnLFxuICAnTUlDUk9TRUNPTkQnLFxuICAnTUlDUk9TRUNPTkRTJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUlOVVRFUycsXG4gICdNSU5WQUxVRScsXG4gICdNT0QnLFxuICAnTU9ERScsXG4gICdNT0RJRklFUycsXG4gICdNT0RVTEUnLFxuICAnTU9OVEgnLFxuICAnTU9OVEhTJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BTicsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05DTE9CJyxcbiAgJ05FVycsXG4gICdORVdfVEFCTEUnLFxuICAnTkVYVFZBTCcsXG4gICdOTycsXG4gICdOT0NBQ0hFJyxcbiAgJ05PQ1lDTEUnLFxuICAnTk9ERU5BTUUnLFxuICAnTk9ERU5VTUJFUicsXG4gICdOT01BWFZBTFVFJyxcbiAgJ05PTUlOVkFMVUUnLFxuICAnTk9ORScsXG4gICdOT09SREVSJyxcbiAgJ05PUk1BTElaRScsXG4gICdOT1JNQUxJWkVEJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVUxMUycsXG4gICdOVU1FUklDJyxcbiAgJ05VTVBBUlRTJyxcbiAgJ09CSUQnLFxuICAnT0NURVRfTEVOR1RIJyxcbiAgJ09GJyxcbiAgJ09GRlNFVCcsXG4gICdPTEQnLFxuICAnT0xEX1RBQkxFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUFRJTUlaQVRJT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBRERFRCcsXG4gICdQQUdFU0laRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSVCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFSVElUSU9ORUQnLFxuICAnUEFSVElUSU9OSU5HJyxcbiAgJ1BBUlRJVElPTlMnLFxuICAnUEFTU1dPUkQnLFxuICAnUEFUSCcsXG4gICdQRVJDRU5USUxFX0NPTlQnLFxuICAnUEVSQ0VOVElMRV9ESVNDJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQSUVDRVNJWkUnLFxuICAnUExBTicsXG4gICdQT1NJVElPTicsXG4gICdQT1dFUicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUkVWVkFMJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJUVRZJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0dSQU0nLFxuICAnUFNJRCcsXG4gICdQVUJMSUMnLFxuICAnUVVFUlknLFxuICAnUVVFUllOTycsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBTCcsXG4gICdSRUNPVkVSWScsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVGRVJFTkNJTkcnLFxuICAnUkVGUkVTSCcsXG4gICdSRUdSX0FWR1gnLFxuICAnUkVHUl9BVkdZJyxcbiAgJ1JFR1JfQ09VTlQnLFxuICAnUkVHUl9JTlRFUkNFUFQnLFxuICAnUkVHUl9SMicsXG4gICdSRUdSX1NMT1BFJyxcbiAgJ1JFR1JfU1hYJyxcbiAgJ1JFR1JfU1hZJyxcbiAgJ1JFR1JfU1lZJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVNFVCcsXG4gICdSRVNJR05BTCcsXG4gICdSRVNUQVJUJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFU1VMVCcsXG4gICdSRVNVTFRfU0VUX0xPQ0FUT1InLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9MTFVQJyxcbiAgJ1JPVU5EX0NFSUxJTkcnLFxuICAnUk9VTkRfRE9XTicsXG4gICdST1VORF9GTE9PUicsXG4gICdST1VORF9IQUxGX0RPV04nLFxuICAnUk9VTkRfSEFMRl9FVkVOJyxcbiAgJ1JPVU5EX0hBTEZfVVAnLFxuICAnUk9VTkRfVVAnLFxuICAnUk9VVElORScsXG4gICdST1cnLFxuICAnUk9XTlVNQkVSJyxcbiAgJ1JPV1MnLFxuICAnUk9XU0VUJyxcbiAgJ1JPV19OVU1CRVInLFxuICAnUlJOJyxcbiAgJ1JVTicsXG4gICdTQVZFUE9JTlQnLFxuICAnU0NIRU1BJyxcbiAgJ1NDT1BFJyxcbiAgJ1NDUkFUQ0hQQUQnLFxuICAnU0NST0xMJyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VDT05EUycsXG4gICdTRUNRVFknLFxuICAnU0VDVVJJVFknLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFU1NJT04nLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NJR05BTCcsXG4gICdTSU1JTEFSJyxcbiAgJ1NJTVBMRScsXG4gICdTTUFMTElOVCcsXG4gICdTTkFOJyxcbiAgJ1NPTUUnLFxuICAnU09VUkNFJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NQRUNJRklDVFlQRScsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTElEJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FSVCcsXG4gICdTVEFDS0VEJyxcbiAgJ1NUQU5EQVJEJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUQVRFTUVOVCcsXG4gICdTVEFUSUMnLFxuICAnU1RBVE1FTlQnLFxuICAnU1RBWScsXG4gICdTVERERVZfUE9QJyxcbiAgJ1NURERFVl9TQU1QJyxcbiAgJ1NUT0dST1VQJyxcbiAgJ1NUT1JFUycsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VNJyxcbiAgJ1NVTU1BUlknLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTRlVOJyxcbiAgJ1NZU0lCTScsXG4gICdTWVNQUk9DJyxcbiAgJ1NZU1RFTScsXG4gICdTWVNURU1fVVNFUicsXG4gICdUQUJMRScsXG4gICdUQUJMRVNBTVBMRScsXG4gICdUQUJMRVNQQUNFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNMQVRFJyxcbiAgJ1RSQU5TTEFUSU9OJyxcbiAgJ1RSRUFUJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJJTScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVUVTQ0FQRScsXG4gICdVTkRPJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVTlRJTCcsXG4gICdVUFBFUicsXG4gICdVU0FHRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEUFJPQycsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTlQnLFxuICAnVkFSWUlORycsXG4gICdWQVJfUE9QJyxcbiAgJ1ZBUl9TQU1QJyxcbiAgJ1ZDQVQnLFxuICAnVkVSU0lPTicsXG4gICdWSUVXJyxcbiAgJ1ZPTEFUSUxFJyxcbiAgJ1ZPTFVNRVMnLFxuICAnV0hFTicsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSURUSF9CVUNLRVQnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dJVEhPVVQnLFxuICAnV0xNJyxcbiAgJ1dSSVRFJyxcbiAgJ1hNTEVMRU1FTlQnLFxuICAnWE1MRVhJU1RTJyxcbiAgJ1hNTE5BTUVTUEFDRVMnLFxuICAnWUVBUicsXG4gICdZRUFSUycsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0dPJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlRFUlNFQ1QnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYjJGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKSddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnIycsICdAJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJTkFSWScsXG4gICdCT09MRUFOJyxcbiAgJ0JSRUFLJyxcbiAgJ0JVQ0tFVCcsXG4gICdCVUlMRCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDTFVTVEVSJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVElPTicsXG4gICdDT01NSVQnLFxuICAnQ09OTkVDVCcsXG4gICdDT05USU5VRScsXG4gICdDT1JSRUxBVEUnLFxuICAnQ09WRVInLFxuICAnQ1JFQVRFJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFTRVQnLFxuICAnREFUQVNUT1JFJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVDUkVNRU5UJyxcbiAgJ0RFTEVURScsXG4gICdERVJJVkVEJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSVJTVCcsXG4gICdGTEFUVEVOJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0dTSScsXG4gICdIQVZJTkcnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVREUnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lORkVSJyxcbiAgJ0lOTElORScsXG4gICdJTk5FUicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLRVlTUEFDRScsXG4gICdLTk9XTicsXG4gICdMQVNUJyxcbiAgJ0xFRlQnLFxuICAnTEVUJyxcbiAgJ0xFVFRJTkcnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMU00nLFxuICAnTUFQJyxcbiAgJ01BUFBJTkcnLFxuICAnTUFUQ0hFRCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUVSR0UnLFxuICAnTUlTU0lORycsXG4gICdOQU1FU1BBQ0UnLFxuICAnTkVTVCcsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09GRlNFVCcsXG4gICdPTicsXG4gICdPUFRJT04nLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdQQVJTRScsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTU1dPUkQnLFxuICAnUEFUSCcsXG4gICdQT09MJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJJTUFSWScsXG4gICdQUklWQVRFJyxcbiAgJ1BSSVZJTEVHRScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBVycsXG4gICdSRUFMTScsXG4gICdSRURVQ0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnU0FUSVNGSUVTJyxcbiAgJ1NDSEVNQScsXG4gICdTRUxFQ1QnLFxuICAnU0VMRicsXG4gICdTRU1JJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NPTUUnLFxuICAnU1RBUlQnLFxuICAnU1RBVElTVElDUycsXG4gICdTVFJJTkcnLFxuICAnU1lTVEVNJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVTlNFVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBTFVFRCcsXG4gICdWQUxVRVMnLFxuICAnVklBJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXT1JLJyxcbiAgJ1hPUicsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWFBMQUlOIERFTEVURSBGUk9NJyxcbiAgJ0VYUExBSU4gVVBEQVRFJyxcbiAgJ0VYUExBSU4gVVBTRVJUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lORkVSJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0xFVCcsXG4gICdMSU1JVCcsXG4gICdNRVJHRScsXG4gICdORVNUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1BSRVBBUkUnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTk5FU1QnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UgS0VZUycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTjFxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ1snLCAneyddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICddJywgJ30nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBJyxcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUdFTlQnLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FUJyxcbiAgJ0FUVFJJQlVURScsXG4gICdBVVRISUQnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQkZJTEVfQkFTRScsXG4gICdCSU5BUllfSU5URUdFUicsXG4gICdCSU5BUlknLFxuICAnQkxPQl9CQVNFJyxcbiAgJ0JMT0NLJyxcbiAgJ0JPRFknLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JPVU5EJyxcbiAgJ0JSRUFEVEgnLFxuICAnQlVMSycsXG4gICdCWScsXG4gICdCWVRFJyxcbiAgJ0MnLFxuICAnQ0FMTCcsXG4gICdDQUxMSU5HJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFSX0JBU0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUlNFVCcsXG4gICdDSEFSU0VURk9STScsXG4gICdDSEFSU0VUSUQnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQl9CQVNFJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ0xVU1RFUlMnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MQVVUSCcsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTVBJTEVEJyxcbiAgJ0NPTVBSRVNTJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OU1RBTlQnLFxuICAnQ09OU1RSVUNUT1InLFxuICAnQ09OVEVYVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NSQVNIJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUlZBTCcsXG4gICdDVVJTT1InLFxuICAnQ1VTVE9NREFUVU0nLFxuICAnREFOR0xJTkcnLFxuICAnREFUQScsXG4gICdEQVRFX0JBU0UnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVDSU1BTCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRklORScsXG4gICdERUxFVEUnLFxuICAnREVQVEgnLFxuICAnREVTQycsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJUkVDVE9SWScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVVJBVElPTicsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0lGJyxcbiAgJ0VNUFRZJyxcbiAgJ0VORCcsXG4gICdFU0NBUEUnLFxuICAnRVhDRVBUSU9OUycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFRFTkRTJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxPQVQnLFxuICAnRk9SJyxcbiAgJ0ZPUkFMTCcsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dFTkVSQUwnLFxuICAnR09UTycsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdIQVNIJyxcbiAgJ0hFQVAnLFxuICAnSElEREVOJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJRklFRCcsXG4gICdJRicsXG4gICdJTU1FRElBVEUnLFxuICAnSU4nLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lORElDRVMnLFxuICAnSU5GSU5JVEUnLFxuICAnSU5TVEFOVElBQkxFJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSRkFDRScsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVkFMSURBVEUnLFxuICAnSVMnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0pBVkEnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEVBRElORycsXG4gICdMRU5HVEgnLFxuICAnTEVWRUwnLFxuICAnTElCUkFSWScsXG4gICdMSUtFJyxcbiAgJ0xJS0UyJyxcbiAgJ0xJS0U0JyxcbiAgJ0xJS0VDJyxcbiAgJ0xJTUlURUQnLFxuICAnTE9DQUwnLFxuICAnTE9DSycsXG4gICdMT05HJyxcbiAgJ01BUCcsXG4gICdNQVgnLFxuICAnTUFYTEVOJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFJyxcbiAgJ01MU0xBQkVMJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BTUUnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVElWRScsXG4gICdOQVRVUkFMJyxcbiAgJ05BVFVSQUxOJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUVkFMJyxcbiAgJ05PQ09NUFJFU1MnLFxuICAnTk9DT1BZJyxcbiAgJ05PVCcsXG4gICdOT1dBSVQnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVNQkVSX0JBU0UnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPQ0lDT0xMJyxcbiAgJ09DSURBVEUnLFxuICAnT0NJREFURVRJTUUnLFxuICAnT0NJRFVSQVRJT04nLFxuICAnT0NJSU5URVJWQUwnLFxuICAnT0NJTE9CTE9DQVRPUicsXG4gICdPQ0lOVU1CRVInLFxuICAnT0NJUkFXJyxcbiAgJ09DSVJFRicsXG4gICdPQ0lSRUZDVVJTT1InLFxuICAnT0NJUk9XSUQnLFxuICAnT0NJU1RSSU5HJyxcbiAgJ09DSVRZUEUnLFxuICAnT0YnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BBUVVFJyxcbiAgJ09QRU4nLFxuICAnT1BFUkFUT1InLFxuICAnT1BUSU9OJyxcbiAgJ09SQUNMRScsXG4gICdPUkFEQVRBJyxcbiAgJ09SREVSJyxcbiAgJ09SR0FOSVpBVElPTicsXG4gICdPUkxBTlknLFxuICAnT1JMVkFSWScsXG4gICdPVEhFUlMnLFxuICAnT1VUJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnUEFDS0FHRScsXG4gICdQQVJBTExFTF9FTkFCTEUnLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUkFNRVRFUlMnLFxuICAnUEFSRU5UJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNDQUwnLFxuICAnUENURlJFRScsXG4gICdQSVBFJyxcbiAgJ1BJUEVMSU5FRCcsXG4gICdQTFNfSU5URUdFUicsXG4gICdQTFVHR0FCTEUnLFxuICAnUE9TSVRJVkUnLFxuICAnUE9TSVRJVkVOJyxcbiAgJ1BSQUdNQScsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJT1InLFxuICAnUFJJVkFURScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBSVNFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBVycsXG4gICdSRUFEJyxcbiAgJ1JFQUwnLFxuICAnUkVDT1JEJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0UnLFxuICAnUkVMRUFTRScsXG4gICdSRUxJRVNfT04nLFxuICAnUkVNJyxcbiAgJ1JFTUFJTkRFUicsXG4gICdSRU5BTUUnLFxuICAnUkVTT1VSQ0UnLFxuICAnUkVTVUxUX0NBQ0hFJyxcbiAgJ1JFU1VMVCcsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVkVSU0UnLFxuICAnUkVWT0tFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPVycsXG4gICdST1dJRCcsXG4gICdST1dOVU0nLFxuICAnUk9XVFlQRScsXG4gICdTQU1QTEUnLFxuICAnU0FWRScsXG4gICdTQVZFUE9JTlQnLFxuICAnU0IxJyxcbiAgJ1NCMicsXG4gICdTQjQnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUdNRU5UJyxcbiAgJ1NFTEYnLFxuICAnU0VQQVJBVEUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1JUJyxcbiAgJ1NJWkVfVCcsXG4gICdTSVpFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NPTUUnLFxuICAnU1BBQ0UnLFxuICAnU1BBUlNFJyxcbiAgJ1NRTCcsXG4gICdTUUxDT0RFJyxcbiAgJ1NRTERBVEEnLFxuICAnU1FMRVJSTScsXG4gICdTUUxOQU1FJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NUQU5EQVJEJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJQycsXG4gICdTVERERVYnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklORycsXG4gICdTVFJVQ1QnLFxuICAnU1RZTEUnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCUEFSVElUSU9OJyxcbiAgJ1NVQlNUSVRVVEFCTEUnLFxuICAnU1VCVFlQRScsXG4gICdTVUNDRVNTRlVMJyxcbiAgJ1NVTScsXG4gICdTWU5PTllNJyxcbiAgJ1NZU0RBVEUnLFxuICAnVEFCQVVUSCcsXG4gICdUQUJMRScsXG4gICdURE8nLFxuICAnVEhFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfQUJCUicsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUSU1FWk9ORV9SRUdJT04nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1VCMScsXG4gICdVQjInLFxuICAnVUI0JyxcbiAgJ1VJRCcsXG4gICdVTkRFUicsXG4gICdVTklRVUUnLFxuICAnVU5QTFVHJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VOVFJVU1RFRCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxJU1QnLFxuICAnVkFMVUUnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSMicsXG4gICdWQVJJQUJMRScsXG4gICdWQVJJQU5DRScsXG4gICdWQVJSQVknLFxuICAnVkFSWUlORycsXG4gICdWSUVXJyxcbiAgJ1ZJRVdTJyxcbiAgJ1ZPSUQnLFxuICAnV0hFTkVWRVInLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSQVBQRUQnLFxuICAnV1JJVEUnLFxuICAnWUVBUicsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQkVHSU4nLFxuICAnQ09OTkVDVCBCWScsXG4gICdERUNMQVJFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RFTEVURScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnTE9PUCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdTVEFSVCBXSVRIJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyc6J10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ18nLCAnJCcsICcjJywgJy4nLCAnQCddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIGlmIChcbiAgICAgIHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMICYmXG4gICAgICB0b2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnU0VUJyAmJlxuICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4udmFsdWUudG9VcHBlckNhc2UoKSA9PT0gJ0JZJ1xuICAgICkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FFUzEyOCcsXG4gICdBRVMyNTYnLFxuICAnQUxMT1dPVkVSV1JJVEUnLFxuICAnQU5BTFlTRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdCQUNLVVAnLFxuICAnQklOQVJZJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCT1RIJyxcbiAgJ0JZVEVESUNUJyxcbiAgJ0JaSVAyJyxcbiAgJ0NBU1QnLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSUkVOVF9VU0VSX0lEJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZMQVRFJyxcbiAgJ0RFRlJBRycsXG4gICdERUxUQScsXG4gICdERUxUQTMySycsXG4gICdERVNDJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRUxTRScsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RFJyxcbiAgJ0VOQ1JZUFQnLFxuICAnRU5DUllQVElPTicsXG4gICdFTkQnLFxuICAnRVhQTElDSVQnLFxuICAnRkFMU0UnLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRVpFJyxcbiAgJ0ZVTEwnLFxuICAnR0xPQkFMRElDVDI1NicsXG4gICdHTE9CQUxESUNUNjRLJyxcbiAgJ0dSQU5UJyxcbiAgJ0daSVAnLFxuICAnSURFTlRJVFknLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOSVRJQUxMWScsXG4gICdJTlRPJyxcbiAgJ0xFQURJTkcnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xVTicsXG4gICdMVU5TJyxcbiAgJ0xaTycsXG4gICdMWk9QJyxcbiAgJ01JTlVTJyxcbiAgJ01PU1RMWTEzJyxcbiAgJ01PU1RMWTMyJyxcbiAgJ01PU1RMWTgnLFxuICAnTkFUVVJBTCcsXG4gICdORVcnLFxuICAnTlVMTFMnLFxuICAnT0ZGJyxcbiAgJ09GRkxJTkUnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1JERVInLFxuICAnT1ZFUkxBUFMnLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BFUkNFTlQnLFxuICAnUEVSTUlTU0lPTlMnLFxuICAnUExBQ0lORycsXG4gICdQUklNQVJZJyxcbiAgJ1JBVycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVDT1ZFUicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFSkVDVExPRycsXG4gICdSRVNPUlQnLFxuICAnUkVTVE9SRScsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lNSUxBUicsXG4gICdTWVNEQVRFJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUcnLFxuICAnVERFUycsXG4gICdURVhUMjU1JyxcbiAgJ1RFWFQzMksnLFxuICAnVEhFTicsXG4gICdUSU1FU1RBTVAnLFxuICAnVE8nLFxuICAnVE9QJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ1VOSVFVRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZFUkJPU0UnLFxuICAnV0FMTEVUJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdXSVRIT1VUJyxcbiAgJ1BSRURJQ0FURScsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBSRVNTSU9OJyxcbiAgJ0NPUFknLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdFVkVOJyxcbiAgJ0FMTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1RPUCcsXG4gICdMSU1JVCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKSddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJ0AnLCAnIycsICckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUlJBWV9aSVAnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExFQ1RfTElTVCcsXG4gICdDT0xMRUNUX1NFVCcsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCBST1cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVRFX0FERCcsXG4gICdEQVRFX1NVQicsXG4gICdEQVRFX1RSVU5DJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdERUNPREUnLFxuICAnREVGQVVMVCcsXG4gICdERUxFVEUnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdEUk9QJyxcbiAgJ0VMU0UnLFxuICAnRU5DT0RFJyxcbiAgJ0VORCcsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBMT0RFX09VVEVSJyxcbiAgJ0VYUExPREUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUX1ZBTFVFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZST01fVU5JWFRJTUUnLFxuICAnRlVMTCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSU4nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnTEFHJyxcbiAgJ0xBU1RfVkFMVUUnLFxuICAnTEFTVCcsXG4gICdMRUFEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBU1QnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdNQVgnLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTUlOVVRFJyxcbiAgJ01PTlRIJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05USUxFJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BUSU1JWkUnLFxuICAnT1ZFUicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTkFNRScsXG4gICdSTElLRScsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdTRUNPTkQnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NJWkUnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdUSEVOJyxcbiAgJ1RPX0RBVEUnLFxuICAnVE9fSlNPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5JWF9USU1FU1RBTVAnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBUklBQkxFUycsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdZRUFSX01PTlRIJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgREFUQUJBU0UnLFxuICAnQUxURVIgU0NIRU1BJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NMVVNURVIgQlknLFxuICAnQ0xVU1RFUkVEIEJZJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RJU1RSSUJVVEUgQlknLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09QVElPTlMnLFxuICAnT1JERVIgQlknLFxuICAnUEFSVElUSU9OIEJZJyxcbiAgJ1BBUlRJVElPTkVEIEJZJyxcbiAgJ1JBTkdFJyxcbiAgJ1JPV1MnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdUQkxQUk9QRVJUSUVTJyxcbiAgJ1VQREFURScsXG4gICdVU0lORycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnV0lORE9XJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW1xuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0FOVEkgSk9JTicsXG4gICdDUkVBVEUgT1InLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xBVEVSQUwgVklFVycsXG4gICdMRUZUIEFOVEkgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ0xFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgQU5USSBKT0lOJyxcbiAgJ05BVFVSQUwgRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgSU5ORVIgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBTRU1JIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgU0VNSSBKT0lOJyxcbiAgJ1NFTUkgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFya1NxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICd7fSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgZnVuY3Rpb25zXG4gICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMICYmIHRva2VuLnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdXSU5ET1cnKSB7XG4gICAgICBjb25zdCBhaGVhZFRva2VuID0gdGhpcy50b2tlbkxvb2tBaGVhZCgpO1xuICAgICAgaWYgKGFoZWFkVG9rZW4gJiYgYWhlYWRUb2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIGNhbGwsIHRyZWF0IGl0IGFzIGEgcmVzZXJ2ZWQgd29yZFxuICAgICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIHByb3BlcnRpZXNcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTiAmJiB0b2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnRU5EJykge1xuICAgICAgY29uc3QgYmFja1Rva2VuID0gdGhpcy50b2tlbkxvb2tCZWhpbmQoKTtcbiAgICAgIGlmIChiYWNrVG9rZW4gJiYgYmFja1Rva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFUkFUT1IgJiYgYmFja1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB3aW5kb3coKS5lbmQgKG9yIHNpbWlsYXIpIG5vdCBDQVNFIC4uLiBFTkRcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5XT1JELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FDVElPTicsXG4gICdBR0FJTlNUJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEdPUklUSE0nLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUT0NPTU1JVCcsXG4gICdBVVRPX0lOQ1JFTUVOVCcsXG4gICdCQUNLVVAnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5MT0cnLFxuICAnQk9USCcsXG4gICdDQVNDQURFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFOR0VEJyxcbiAgJ0NIQVJBQ1RFUiBTRVQnLFxuICAnQ0hBUlNFVCcsXG4gICdDSEVDSycsXG4gICdDSEVDS1NVTScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUFJFU1NFRCcsXG4gICdDT05DVVJSRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWScsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVGQVVMVCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdEVU1QRklMRScsXG4gICdEVVBMSUNBVEUnLFxuICAnRFlOQU1JQycsXG4gICdFTFNFJyxcbiAgJ0VOQ0xPU0VEJyxcbiAgJ0VOR0lORScsXG4gICdFTkdJTkVTJyxcbiAgJ0VOR0lORV9UWVBFJyxcbiAgJ0VTQ0FQRScsXG4gICdFU0NBUEVEJyxcbiAgJ0VWRU5UUycsXG4gICdFWEVDJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhURU5ERUQnLFxuICAnRkFTVCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFMnLFxuICAnRklMRScsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTFVTSCcsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGVUxMJyxcbiAgJ0ZVTExURVhUJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dMT0JBTCcsXG4gICdHUkFOVCcsXG4gICdHUkFOVFMnLFxuICAnR1JPVVBfQ09OQ0FUJyxcbiAgJ0hFQVAnLFxuICAnSElHSF9QUklPUklUWScsXG4gICdIT1NUUycsXG4gICdIT1VSJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0lERU5USUZJRUQnLFxuICAnSUYnLFxuICAnSUZOVUxMJyxcbiAgJ0lHTk9SRScsXG4gICdJTicsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lORklMRScsXG4gICdJTlNFUlQnLFxuICAnSU5TRVJUX0lEJyxcbiAgJ0lOU0VSVF9NRVRIT0QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZPS0VSJyxcbiAgJ0lTJyxcbiAgJ0lTT0xBVElPTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xBU1RfSU5TRVJUX0lEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdMSU5FQVInLFxuICAnTElORVMnLFxuICAnTE9BRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPQ0tTJyxcbiAgJ0xPR1MnLFxuICAnTE9XX1BSSU9SSVRZJyxcbiAgJ01BUklBJyxcbiAgJ01BU1RFUicsXG4gICdNQVNURVJfQ09OTkVDVF9SRVRSWScsXG4gICdNQVNURVJfSE9TVCcsXG4gICdNQVNURVJfTE9HX0ZJTEUnLFxuICAnTUFUQ0gnLFxuICAnTUFYX0NPTk5FQ1RJT05TX1BFUl9IT1VSJyxcbiAgJ01BWF9RVUVSSUVTX1BFUl9IT1VSJyxcbiAgJ01BWF9ST1dTJyxcbiAgJ01BWF9VUERBVEVTX1BFUl9IT1VSJyxcbiAgJ01BWF9VU0VSX0NPTk5FQ1RJT05TJyxcbiAgJ01FRElVTScsXG4gICdNRVJHRScsXG4gICdNSU5VVEUnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5fUk9XUycsXG4gICdNT0RFJyxcbiAgJ01PRElGWScsXG4gICdNT05USCcsXG4gICdNUkdfTVlJU0FNJyxcbiAgJ01ZSVNBTScsXG4gICdOQU1FUycsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT1coKScsXG4gICdOVUxMJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OQUxMWScsXG4gICdPVVRGSUxFJyxcbiAgJ1BBQ0tfS0VZUycsXG4gICdQQUdFJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBUlRJVElPTlMnLFxuICAnUEFTU1dPUkQnLFxuICAnUFJJTUFSWScsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRVNTJyxcbiAgJ1BST0NFU1NMSVNUJyxcbiAgJ1BVUkdFJyxcbiAgJ1FVSUNLJyxcbiAgJ1JBSUQwJyxcbiAgJ1JBSURfQ0hVTktTJyxcbiAgJ1JBSURfQ0hVTktTSVpFJyxcbiAgJ1JBSURfVFlQRScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQURfT05MWScsXG4gICdSRUFEX1dSSVRFJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTE9BRCcsXG4gICdSRU5BTUUnLFxuICAnUkVQQUlSJyxcbiAgJ1JFUEVBVEFCTEUnLFxuICAnUkVQTEFDRScsXG4gICdSRVBMSUNBVElPTicsXG4gICdSRVNFVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSTElLRScsXG4gICdST0xMQkFDSycsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdST1dfRk9STUFUJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNVUklUWScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFU1NJT04nLFxuICAnU0hBUkUnLFxuICAnU0hPVycsXG4gICdTSFVURE9XTicsXG4gICdTTEFWRScsXG4gICdTT05BTUUnLFxuICAnU09VTkRTJyxcbiAgJ1NRTCcsXG4gICdTUUxfQVVUT19JU19OVUxMJyxcbiAgJ1NRTF9CSUdfUkVTVUxUJyxcbiAgJ1NRTF9CSUdfU0VMRUNUUycsXG4gICdTUUxfQklHX1RBQkxFUycsXG4gICdTUUxfQlVGRkVSX1JFU1VMVCcsXG4gICdTUUxfQ0FDSEUnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfTE9HX0JJTicsXG4gICdTUUxfTE9HX09GRicsXG4gICdTUUxfTE9HX1VQREFURScsXG4gICdTUUxfTE9XX1BSSU9SSVRZX1VQREFURVMnLFxuICAnU1FMX01BWF9KT0lOX1NJWkUnLFxuICAnU1FMX05PX0NBQ0hFJyxcbiAgJ1NRTF9RVU9URV9TSE9XX0NSRUFURScsXG4gICdTUUxfU0FGRV9VUERBVEVTJyxcbiAgJ1NRTF9TRUxFQ1RfTElNSVQnLFxuICAnU1FMX1NMQVZFX1NLSVBfQ09VTlRFUicsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NRTF9XQVJOSU5HUycsXG4gICdTVEFSVCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUVVMnLFxuICAnU1RPUCcsXG4gICdTVE9SQUdFJyxcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnU1RSSU5HJyxcbiAgJ1NUUklQRUQnLFxuICAnU1VQRVInLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5DT01NSVRURUQnLFxuICAnVU5JUVVFJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSSVRFJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdHTycsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJ0AnLCAnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWycjJywgJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEYjJGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyJztcbmltcG9ydCBOMXFsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBsU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyJztcbmltcG9ydCBSZWRzaGlmdEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlcic7XG5pbXBvcnQgU3BhcmtTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3BhcmtTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFN0YW5kYXJkU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1N0YW5kYXJkU3FsRm9ybWF0dGVyJztcblxuY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgZGIyOiBEYjJGb3JtYXR0ZXIsXG4gIG4xcWw6IE4xcWxGb3JtYXR0ZXIsXG4gICdwbC9zcWwnOiBQbFNxbEZvcm1hdHRlcixcbiAgcGxzcWw6IFBsU3FsRm9ybWF0dGVyLFxuICByZWRzaGlmdDogUmVkc2hpZnRGb3JtYXR0ZXIsXG4gIHNwYXJrOiBTcGFya1NxbEZvcm1hdHRlcixcbiAgc3FsOiBTdGFuZGFyZFNxbEZvcm1hdHRlcixcbn07XG5cbi8qKlxuICogRm9ybWF0IHdoaXRlc3BhY2UgaW4gYSBxdWVyeSB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICogIEBwYXJhbSB7U3RyaW5nfSBjZmcubGFuZ3VhZ2UgUXVlcnkgbGFuZ3VhZ2UsIGRlZmF1bHQgaXMgU3RhbmRhcmQgU1FMXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnQgQ2hhcmFjdGVycyB1c2VkIGZvciBpbmRlbnRhdGlvbiwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICogIEBwYXJhbSB7Qm9vbGVhbn0gY2ZnLnVwcGVyY2FzZSBDb252ZXJ0cyBrZXl3b3JkcyB0byB1cHBlcmNhc2VcbiAqICBAcGFyYW0ge0ludGVnZXJ9IGNmZy5saW5lc0JldHdlZW5RdWVyaWVzIEhvdyBtYW55IGxpbmUgYnJlYWtzIGJldHdlZW4gcXVlcmllc1xuICogIEBwYXJhbSB7T2JqZWN0fSBjZmcucGFyYW1zIENvbGxlY3Rpb24gb2YgcGFyYW1zIGZvciBwbGFjZWhvbGRlciByZXBsYWNlbWVudFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0ID0gKHF1ZXJ5LCBjZmcgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIHF1ZXJ5ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBxdWVyeSBhcmd1bWVudC4gRXh0ZWN0ZWQgc3RyaW5nLCBpbnN0ZWFkIGdvdCAnICsgdHlwZW9mIHF1ZXJ5KTtcbiAgfVxuXG4gIGxldCBGb3JtYXR0ZXIgPSBTdGFuZGFyZFNxbEZvcm1hdHRlcjtcbiAgaWYgKGNmZy5sYW5ndWFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgRm9ybWF0dGVyID0gZm9ybWF0dGVyc1tjZmcubGFuZ3VhZ2VdO1xuICB9XG4gIGlmIChGb3JtYXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IEVycm9yKGBVbnN1cHBvcnRlZCBTUUwgZGlhbGVjdDogJHtjZmcubGFuZ3VhZ2V9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBGb3JtYXR0ZXIoY2ZnKS5mb3JtYXQocXVlcnkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZERpYWxlY3RzID0gT2JqZWN0LmtleXMoZm9ybWF0dGVycyk7XG4iLCIvLyBPbmx5IHJlbW92ZXMgc3BhY2VzLCBub3QgbmV3bGluZXNcbmV4cG9ydCBjb25zdCB0cmltU3BhY2VzRW5kID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoL1sgXFx0XSskL3UsICcnKTtcblxuLy8gTGFzdCBlbGVtZW50IGZyb20gYXJyYXlcbmV4cG9ydCBjb25zdCBsYXN0ID0gKGFycikgPT4gYXJyW2Fyci5sZW5ndGggLSAxXTtcblxuLy8gVHJ1ZSBhcnJheSBpcyBlbXB0eSwgb3IgaXQncyBub3QgYW4gYXJyYXkgYXQgYWxsXG5leHBvcnQgY29uc3QgaXNFbXB0eSA9IChhcnIpID0+ICFBcnJheS5pc0FycmF5KGFycikgfHwgYXJyLmxlbmd0aCA9PT0gMDtcblxuLy8gRXNjYXBlcyByZWdleCBzcGVjaWFsIGNoYXJzXG5leHBvcnQgY29uc3QgZXNjYXBlUmVnRXhwID0gKHN0cmluZykgPT4gc3RyaW5nLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9ndSwgJ1xcXFwkJicpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==