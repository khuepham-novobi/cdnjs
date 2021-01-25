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

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT) {
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
      var _preserveWhitespaceFo, _this$tokenLookBehind;

      // Take out the preceding space unless there was whitespace there in the original query
      // or another opening parens or line comment
      var preserveWhitespaceFor = (_preserveWhitespaceFo = {}, _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR, true), _preserveWhitespaceFo);

      if (token.whitespaceBefore.length === 0 && !preserveWhitespaceFor[(_this$tokenLookBehind = this.tokenLookBehind()) === null || _this$tokenLookBehind === void 0 ? void 0 : _this$tokenLookBehind.type]) {
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
   *  @param {String[]} [cfg.operator] Additional operators to recognize
   */
  function Tokenizer(cfg) {
    _classCallCheck(this, Tokenizer);

    this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
    this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/;
    this.OPERATOR_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createOperatorRegex"]([].concat(_toConsumableArray(cfg.operators || []), ['!=', '<>', '==', '<=', '>=', '!<', '!>', '||', ':=']));
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
   *  @return {String} token.whitespaceBefore Preceding whitespace
   */


  _createClass(Tokenizer, [{
    key: "tokenize",
    value: function tokenize(input) {
      var tokens = [];
      var token; // Keep processing the string until it is empty

      while (input.length) {
        // grab any preceding whitespace
        var whitespaceBefore = this.getWhitespace(input);
        input = input.substring(whitespaceBefore.length);

        if (input.length) {
          // Get the next token and the token type
          token = this.getNextToken(input, token); // Advance the string

          input = input.substring(token.value.length);
          tokens.push(_objectSpread(_objectSpread({}, token), {}, {
            whitespaceBefore: whitespaceBefore
          }));
        }
      }

      return tokens;
    }
  }, {
    key: "getWhitespace",
    value: function getWhitespace(input) {
      var matches = input.match(this.WHITESPACE_REGEX);
      return matches ? matches[1] : '';
    }
  }, {
    key: "getNextToken",
    value: function getNextToken(input, previousToken) {
      return this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
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
  return new RegExp("^(".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortByLengthDesc"])(multiLetterOperators).map(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"]).join('|'), "|.)"), 'u');
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

  var reservedWordsPattern = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortByLengthDesc"])(reservedWords).join('|').replace(/ /g, '\\s+');
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
// 6. Unicode single-quoted string using \' to escape
// 7. Unicode double-quoted string using \" to escape
// 8. PostgreSQL dollar-quoted strings

function createStringPattern(stringTypes) {
  var patterns = {
    '``': '((`[^`]*($|`))+)',
    '{}': '((\\{[^\\}]*($|\\}))+)',
    '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
    '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)",
    "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    $$: '((?<tag>\\$\\w*\\$).*?(?:\\k<tag>|$))'
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

/***/ "./src/languages/PostgreSqlFormatter.js":
/*!**********************************************!*\
  !*** ./src/languages/PostgreSqlFormatter.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgreSqlFormatter; });
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



var reservedWords = ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', 'BACKWARD', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BOOLEAN', 'BOTH', 'BY', 'CACHE', 'CALL', 'CALLED', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONFIGURATION', 'CONFLICT', 'CONNECTION', 'CONSTRAINT', 'CONSTRAINTS', 'CONTENT', 'CONTINUE', 'CONVERSION', 'COPY', 'COST', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINER', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DEPENDS', 'DESC', 'DETACH', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISTINCT', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'EACH', 'ELSE', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'ENUM', 'ESCAPE', 'EVENT', 'EXCEPT', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILTER', 'FIRST', 'FLOAT', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORWARD', 'FREEZE', 'FROM', 'FULL', 'FUNCTION', 'FUNCTIONS', 'GENERATED', 'GLOBAL', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HOLD', 'HOUR', 'IDENTITY', 'IF', 'ILIKE', 'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDE', 'INCLUDING', 'INCREMENT', 'INDEX', 'INDEXES', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTEAD', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LAST', 'LATERAL', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LEVEL', 'LIKE', 'LIMIT', 'LISTEN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCK', 'LOCKED', 'LOGGED', 'MAPPING', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'METHOD', 'MINUTE', 'MINVALUE', 'MODE', 'MONTH', 'MOVE', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'OBJECT', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'PARALLEL', 'PARSER', 'PARTIAL', 'PARTITION', 'PASSING', 'PASSWORD', 'PLACING', 'PLANS', 'POLICY', 'POSITION', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROGRAM', 'PUBLICATION', 'QUOTE', 'RANGE', 'READ', 'REAL', 'REASSIGN', 'RECHECK', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'RESET', 'RESTART', 'RESTRICT', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINES', 'ROW', 'ROWS', 'RULE', 'SAVEPOINT', 'SCHEMA', 'SCHEMAS', 'SCROLL', 'SEARCH', 'SECOND', 'SECURITY', 'SELECT', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SQL', 'STABLE', 'STANDALONE', 'START', 'STATEMENT', 'STATISTICS', 'STDIN', 'STDOUT', 'STORAGE', 'STORED', 'STRICT', 'STRIP', 'SUBSCRIPTION', 'SUBSTRING', 'SUPPORT', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSFORM', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLISTEN', 'UNLOGGED', 'UNTIL', 'UPDATE', 'USER', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VARCHAR', 'VARIADIC', 'VARYING', 'VERBOSE', 'VERSION', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHERE', 'WHITESPACE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLATTRIBUTES', 'XMLCONCAT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLROOT', 'XMLSERIALIZE', 'XMLTABLE', 'YEAR', 'YES', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN'];

var PostgreSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PostgreSqlFormatter, _Formatter);

  var _super = _createSuper(PostgreSqlFormatter);

  function PostgreSqlFormatter() {
    _classCallCheck(this, PostgreSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PostgreSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        // TODO: support $$ dollar-quoted strings $$
        stringTypes: ["\"\"", "''", "U&''", 'U&""', '$$'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['$'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--'],
        operators: ['<<', '>>', '||/', '|/', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~']
      });
    }
  }]);

  return PostgreSqlFormatter;
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
/* harmony import */ var _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/PostgreSqlFormatter */ "./src/languages/PostgreSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var formatters = {
  db2: _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__["default"],
  n1ql: _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_1__["default"],
  'pl/sql': _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  plsql: _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  postgresql: _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  redshift: _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  spark: _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_5__["default"],
  sql: _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_6__["default"]
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

  var Formatter = _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_6__["default"];

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
/*! exports provided: trimSpacesEnd, last, isEmpty, escapeRegExp, sortByLengthDesc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimSpacesEnd", function() { return trimSpacesEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return escapeRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByLengthDesc", function() { return sortByLengthDesc; });
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
}; // Sorts strings by length, so that longer ones are first
// Also sorts alphabetically after sorting by length.

var sortByLengthDesc = function sortByLengthDesc(strings) {
  return strings.sort(function (a, b) {
    return b.length - a.length || a.localeCompare(b);
  });
};

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3NxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiRm9ybWF0dGVyIiwiY2ZnIiwiaW5kZW50YXRpb24iLCJJbmRlbnRhdGlvbiIsImluZGVudCIsImlubGluZUJsb2NrIiwiSW5saW5lQmxvY2siLCJwYXJhbXMiLCJQYXJhbXMiLCJwcmV2aW91c1Jlc2VydmVkVG9rZW4iLCJ0b2tlbnMiLCJpbmRleCIsIkVycm9yIiwidG9rZW4iLCJxdWVyeSIsInRva2VuaXplciIsInRva2VuaXplIiwiZm9ybWF0dGVkUXVlcnkiLCJnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMiLCJ0cmltIiwiZm9yRWFjaCIsInRva2VuT3ZlcnJpZGUiLCJ0eXBlIiwidG9rZW5UeXBlcyIsIkxJTkVfQ09NTUVOVCIsImZvcm1hdExpbmVDb21tZW50IiwiQkxPQ0tfQ09NTUVOVCIsImZvcm1hdEJsb2NrQ29tbWVudCIsIlJFU0VSVkVEX1RPUF9MRVZFTCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FIiwiZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCIsIlJFU0VSVkVEIiwiZm9ybWF0V2l0aFNwYWNlcyIsIk9QRU5fUEFSRU4iLCJmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXMiLCJDTE9TRV9QQVJFTiIsImZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyIsIlBMQUNFSE9MREVSIiwiZm9ybWF0UGxhY2Vob2xkZXIiLCJ2YWx1ZSIsImZvcm1hdENvbW1hIiwiZm9ybWF0V2l0aFNwYWNlQWZ0ZXIiLCJmb3JtYXRXaXRob3V0U3BhY2VzIiwiZm9ybWF0UXVlcnlTZXBhcmF0b3IiLCJhZGROZXdsaW5lIiwic2hvdyIsImluZGVudENvbW1lbnQiLCJjb21tZW50IiwicmVwbGFjZSIsImdldEluZGVudCIsImRlY3JlYXNlVG9wTGV2ZWwiLCJlcXVhbGl6ZVdoaXRlc3BhY2UiLCJpbmNyZWFzZVRvcExldmVsIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwidG9rZW5Mb29rQmVoaW5kIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwidGVzdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIklOREVOVF9UWVBFX1RPUF9MRVZFTCIsIklOREVOVF9UWVBFX0JMT0NLX0xFVkVMIiwiaW5kZW50VHlwZXMiLCJwdXNoIiwibGFzdCIsInBvcCIsIklOTElORV9NQVhfTEVOR1RIIiwibGV2ZWwiLCJpc0lubGluZUJsb2NrIiwiaSIsImlzRm9yYmlkZGVuVG9rZW4iLCJDT01NRU5UIiwia2V5IiwiVG9rZW5pemVyIiwiV0hJVEVTUEFDRV9SRUdFWCIsIk5VTUJFUl9SRUdFWCIsIk9QRVJBVE9SX1JFR0VYIiwicmVnZXhGYWN0b3J5Iiwib3BlcmF0b3JzIiwiQkxPQ0tfQ09NTUVOVF9SRUdFWCIsIkxJTkVfQ09NTUVOVF9SRUdFWCIsImxpbmVDb21tZW50VHlwZXMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgiLCJyZXNlcnZlZFRvcExldmVsV29yZHMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FX1JFR0VYIiwicmVzZXJ2ZWROZXdsaW5lV29yZHMiLCJSRVNFUlZFRF9QTEFJTl9SRUdFWCIsInJlc2VydmVkV29yZHMiLCJXT1JEX1JFR0VYIiwic3BlY2lhbFdvcmRDaGFycyIsIlNUUklOR19SRUdFWCIsInN0cmluZ1R5cGVzIiwiT1BFTl9QQVJFTl9SRUdFWCIsIm9wZW5QYXJlbnMiLCJDTE9TRV9QQVJFTl9SRUdFWCIsImNsb3NlUGFyZW5zIiwiSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCIsImluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIiwiSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJuYW1lZFBsYWNlaG9sZGVyVHlwZXMiLCJTVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbnB1dCIsImdldFdoaXRlc3BhY2UiLCJzdWJzdHJpbmciLCJnZXROZXh0VG9rZW4iLCJtYXRjaGVzIiwibWF0Y2giLCJwcmV2aW91c1Rva2VuIiwiZ2V0Q29tbWVudFRva2VuIiwiZ2V0U3RyaW5nVG9rZW4iLCJnZXRPcGVuUGFyZW5Ub2tlbiIsImdldENsb3NlUGFyZW5Ub2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW4iLCJnZXROdW1iZXJUb2tlbiIsImdldFJlc2VydmVkV29yZFRva2VuIiwiZ2V0V29yZFRva2VuIiwiZ2V0T3BlcmF0b3JUb2tlbiIsImdldExpbmVDb21tZW50VG9rZW4iLCJnZXRCbG9ja0NvbW1lbnRUb2tlbiIsImdldFRva2VuT25GaXJzdE1hdGNoIiwicmVnZXgiLCJTVFJJTkciLCJnZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbiIsImdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkiLCJwYXJzZUtleSIsInYiLCJzbGljZSIsImdldEVzY2FwZWRQbGFjZWhvbGRlcktleSIsInF1b3RlQ2hhciIsIlJlZ0V4cCIsImVzY2FwZVJlZ0V4cCIsIk5VTUJFUiIsInVuZGVmaW5lZCIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbiIsImdldE5ld2xpbmVSZXNlcnZlZFRva2VuIiwiZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQiLCJnZXRQbGFpblJlc2VydmVkVG9rZW4iLCJXT1JEIiwiY3JlYXRlT3BlcmF0b3JSZWdleCIsIm11bHRpTGV0dGVyT3BlcmF0b3JzIiwic29ydEJ5TGVuZ3RoRGVzYyIsIm1hcCIsImpvaW4iLCJjcmVhdGVMaW5lQ29tbWVudFJlZ2V4IiwiYyIsImNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4IiwicmVzZXJ2ZWRXb3Jkc1BhdHRlcm4iLCJjcmVhdGVXb3JkUmVnZXgiLCJzcGVjaWFsQ2hhcnMiLCJjcmVhdGVTdHJpbmdSZWdleCIsImNyZWF0ZVN0cmluZ1BhdHRlcm4iLCJwYXR0ZXJucyIsIiQkIiwidCIsImNyZWF0ZVBhcmVuUmVnZXgiLCJwYXJlbnMiLCJlc2NhcGVQYXJlbiIsInBhcmVuIiwiY3JlYXRlUGxhY2Vob2xkZXJSZWdleCIsInR5cGVzIiwicGF0dGVybiIsImlzRW1wdHkiLCJ0eXBlc1JlZ2V4IiwiRGIyRm9ybWF0dGVyIiwiTjFxbEZvcm1hdHRlciIsIlBsU3FsRm9ybWF0dGVyIiwiUG9zdGdyZVNxbEZvcm1hdHRlciIsIlN0YW5kYXJkU3FsRm9ybWF0dGVyIiwiU3BhcmtTcWxGb3JtYXR0ZXIiLCJhaGVhZFRva2VuIiwidG9rZW5Mb29rQWhlYWQiLCJiYWNrVG9rZW4iLCJmb3JtYXR0ZXJzIiwiZGIyIiwibjFxbCIsInBsc3FsIiwicG9zdGdyZXNxbCIsInJlZHNoaWZ0IiwiUmVkc2hpZnRGb3JtYXR0ZXIiLCJzcGFyayIsInNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUNmLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosQ0FBZ0IsS0FBS0YsR0FBTCxDQUFTRyxNQUF6QixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosRUFBbkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsK0NBQUosQ0FBVyxLQUFLUCxHQUFMLENBQVNNLE1BQXBCLENBQWQ7QUFDQSxTQUFLRSxxQkFBTCxHQUE2QixFQUE3QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozs7Z0NBQ2M7QUFDVixZQUFNLElBQUlDLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDZ0JDLEssRUFBTztBQUNuQjtBQUNBLGFBQU9BLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0MsSyxFQUFPO0FBQ1osV0FBS0osTUFBTCxHQUFjLEtBQUtLLFNBQUwsR0FBaUJDLFFBQWpCLENBQTBCRixLQUExQixDQUFkO0FBQ0EsVUFBTUcsY0FBYyxHQUFHLEtBQUtDLDJCQUFMLEVBQXZCO0FBRUEsYUFBT0QsY0FBYyxDQUFDRSxJQUFmLEVBQVA7QUFDRDs7O2tEQUU2QjtBQUFBOztBQUM1QixVQUFJRixjQUFjLEdBQUcsRUFBckI7QUFFQSxXQUFLUCxNQUFMLENBQVlVLE9BQVosQ0FBb0IsVUFBQ1AsS0FBRCxFQUFRRixLQUFSLEVBQWtCO0FBQ3BDLGFBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBRUFFLGFBQUssR0FBRyxLQUFJLENBQUNRLGFBQUwsQ0FBbUJSLEtBQW5CLENBQVI7O0FBRUEsWUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNDLFlBQTlCLEVBQTRDO0FBQzFDUCx3QkFBYyxHQUFHLEtBQUksQ0FBQ1EsaUJBQUwsQ0FBdUJaLEtBQXZCLEVBQThCSSxjQUE5QixDQUFqQjtBQUNELFNBRkQsTUFFTyxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ0csYUFBOUIsRUFBNkM7QUFDbERULHdCQUFjLEdBQUcsS0FBSSxDQUFDVSxrQkFBTCxDQUF3QmQsS0FBeEIsRUFBK0JJLGNBQS9CLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDSyxrQkFBOUIsRUFBa0Q7QUFDdkRYLHdCQUFjLEdBQUcsS0FBSSxDQUFDWSwwQkFBTCxDQUFnQ2hCLEtBQWhDLEVBQXVDSSxjQUF2QyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDTyw0QkFBOUIsRUFBNEQ7QUFDakViLHdCQUFjLEdBQUcsS0FBSSxDQUFDYyxrQ0FBTCxDQUF3Q2xCLEtBQXhDLEVBQStDSSxjQUEvQyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDUyxnQkFBOUIsRUFBZ0Q7QUFDckRmLHdCQUFjLEdBQUcsS0FBSSxDQUFDZ0IseUJBQUwsQ0FBK0JwQixLQUEvQixFQUFzQ0ksY0FBdEMsQ0FBakI7QUFDQSxlQUFJLENBQUNSLHFCQUFMLEdBQTZCSSxLQUE3QjtBQUNELFNBSE0sTUFHQSxJQUFJQSxLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ1csUUFBOUIsRUFBd0M7QUFDN0NqQix3QkFBYyxHQUFHLEtBQUksQ0FBQ2tCLGdCQUFMLENBQXNCdEIsS0FBdEIsRUFBNkJJLGNBQTdCLENBQWpCO0FBQ0EsZUFBSSxDQUFDUixxQkFBTCxHQUE2QkksS0FBN0I7QUFDRCxTQUhNLE1BR0EsSUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNhLFVBQTlCLEVBQTBDO0FBQy9DbkIsd0JBQWMsR0FBRyxLQUFJLENBQUNvQix3QkFBTCxDQUE4QnhCLEtBQTlCLEVBQXFDSSxjQUFyQyxDQUFqQjtBQUNELFNBRk0sTUFFQSxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ2UsV0FBOUIsRUFBMkM7QUFDaERyQix3QkFBYyxHQUFHLEtBQUksQ0FBQ3NCLHdCQUFMLENBQThCMUIsS0FBOUIsRUFBcUNJLGNBQXJDLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDaUIsV0FBOUIsRUFBMkM7QUFDaER2Qix3QkFBYyxHQUFHLEtBQUksQ0FBQ3dCLGlCQUFMLENBQXVCNUIsS0FBdkIsRUFBOEJJLGNBQTlCLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQzZCLEtBQU4sS0FBZ0IsR0FBcEIsRUFBeUI7QUFDOUJ6Qix3QkFBYyxHQUFHLEtBQUksQ0FBQzBCLFdBQUwsQ0FBaUI5QixLQUFqQixFQUF3QkksY0FBeEIsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDMkIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNEIsbUJBQUwsQ0FBeUJoQyxLQUF6QixFQUFnQ0ksY0FBaEMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNkIsb0JBQUwsQ0FBMEJqQyxLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUE7QUFDTEEsd0JBQWMsR0FBRyxLQUFJLENBQUNrQixnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCSSxjQUE3QixDQUFqQjtBQUNEO0FBQ0YsT0F0Q0Q7QUF1Q0EsYUFBT0EsY0FBUDtBQUNEOzs7c0NBRWlCSixLLEVBQU9DLEssRUFBTztBQUM5QixhQUFPLEtBQUtpQyxVQUFMLENBQWdCakMsS0FBSyxHQUFHLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQXhCLENBQVA7QUFDRDs7O3VDQUVrQkEsSyxFQUFPQyxLLEVBQU87QUFDL0IsYUFBTyxLQUFLaUMsVUFBTCxDQUFnQixLQUFLQSxVQUFMLENBQWdCakMsS0FBaEIsSUFBeUIsS0FBS21DLGFBQUwsQ0FBbUJwQyxLQUFLLENBQUM2QixLQUF6QixDQUF6QyxDQUFQO0FBQ0Q7OztrQ0FFYVEsTyxFQUFTO0FBQ3JCLGFBQU9BLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixXQUFoQixFQUE4QixPQUFPLEtBQUtqRCxXQUFMLENBQWlCa0QsU0FBakIsRUFBUCxHQUFzQyxHQUFwRSxDQUFQO0FBQ0Q7Ozt1REFFa0N2QyxLLEVBQU9DLEssRUFBTztBQUMvQyxXQUFLWixXQUFMLENBQWlCbUQsZ0JBQWpCO0FBQ0F2QyxXQUFLLEdBQUcsS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUFqQztBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7OzsrQ0FFMEJELEssRUFBT0MsSyxFQUFPO0FBQ3ZDLFdBQUtaLFdBQUwsQ0FBaUJtRCxnQkFBakI7QUFFQXZDLFdBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFFQSxXQUFLWixXQUFMLENBQWlCcUQsZ0JBQWpCO0FBRUF6QyxXQUFLLElBQUksS0FBS3dDLGtCQUFMLENBQXdCLEtBQUtOLElBQUwsQ0FBVW5DLEtBQVYsQ0FBeEIsQ0FBVDtBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7Ozs4Q0FFeUJELEssRUFBT0MsSyxFQUFPO0FBQ3RDLGFBQU8sS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUF6QixHQUFxRSxHQUE1RTtBQUNELEssQ0FFRDs7Ozt1Q0FDbUIyQyxNLEVBQVE7QUFDekIsYUFBT0EsTUFBTSxDQUFDTCxPQUFQLENBQWUsdUVBQWYsRUFBd0IsR0FBeEIsQ0FBUDtBQUNELEssQ0FFRDs7Ozs2Q0FDeUJ0QyxLLEVBQU9DLEssRUFBTztBQUFBOztBQUNyQztBQUNBO0FBQ0EsVUFBTTJDLHFCQUFxQix1RUFDeEJsQyxtREFBVSxDQUFDYSxVQURhLEVBQ0EsSUFEQSwwQ0FFeEJiLG1EQUFVLENBQUNDLFlBRmEsRUFFRSxJQUZGLDBDQUd4QkQsbURBQVUsQ0FBQ21DLFFBSGEsRUFHRixJQUhFLHlCQUEzQjs7QUFLQSxVQUNFN0MsS0FBSyxDQUFDOEMsZ0JBQU4sQ0FBdUJDLE1BQXZCLEtBQWtDLENBQWxDLElBQ0EsQ0FBQ0gscUJBQXFCLDBCQUFDLEtBQUtJLGVBQUwsRUFBRCwwREFBQyxzQkFBd0J2QyxJQUF6QixDQUZ4QixFQUdFO0FBQ0FSLGFBQUssR0FBR2dELDREQUFhLENBQUNoRCxLQUFELENBQXJCO0FBQ0Q7O0FBQ0RBLFdBQUssSUFBSSxLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUFUO0FBRUEsV0FBS1IsV0FBTCxDQUFpQjBELGVBQWpCLENBQWlDLEtBQUtyRCxNQUF0QyxFQUE4QyxLQUFLQyxLQUFuRDs7QUFFQSxVQUFJLENBQUMsS0FBS04sV0FBTCxDQUFpQjJELFFBQWpCLEVBQUwsRUFBa0M7QUFDaEMsYUFBSzlELFdBQUwsQ0FBaUIrRCxrQkFBakI7QUFDQW5ELGFBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFDRDs7QUFDRCxhQUFPQSxLQUFQO0FBQ0QsSyxDQUVEOzs7OzZDQUN5QkQsSyxFQUFPQyxLLEVBQU87QUFDckMsVUFBSSxLQUFLVCxXQUFMLENBQWlCMkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixhQUFLM0QsV0FBTCxDQUFpQjZELEdBQWpCO0FBQ0EsZUFBTyxLQUFLdEIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0MsS0FBakMsQ0FBUDtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtaLFdBQUwsQ0FBaUJpRSxrQkFBakI7QUFDQSxlQUFPLEtBQUtoQyxnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCLEtBQUtrQyxVQUFMLENBQWdCakMsS0FBaEIsQ0FBN0IsQ0FBUDtBQUNEO0FBQ0Y7OztzQ0FFaUJELEssRUFBT0MsSyxFQUFPO0FBQzlCLGFBQU9BLEtBQUssR0FBRyxLQUFLUCxNQUFMLENBQVk2RCxHQUFaLENBQWdCdkQsS0FBaEIsQ0FBUixHQUFpQyxHQUF4QztBQUNELEssQ0FFRDs7OztnQ0FDWUEsSyxFQUFPQyxLLEVBQU87QUFDeEJBLFdBQUssR0FBR2dELDREQUFhLENBQUNoRCxLQUFELENBQWIsR0FBdUIsS0FBS2tDLElBQUwsQ0FBVW5DLEtBQVYsQ0FBdkIsR0FBMEMsR0FBbEQ7O0FBRUEsVUFBSSxLQUFLUixXQUFMLENBQWlCMkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixlQUFPbEQsS0FBUDtBQUNELE9BRkQsTUFFTyxJQUFJLFdBQVl1RCxJQUFaLENBQWlCLEtBQUs1RCxxQkFBTCxDQUEyQmlDLEtBQTVDLENBQUosRUFBd0Q7QUFDN0QsZUFBTzVCLEtBQVA7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPLEtBQUtpQyxVQUFMLENBQWdCakMsS0FBaEIsQ0FBUDtBQUNEO0FBQ0Y7Ozt5Q0FFb0JELEssRUFBT0MsSyxFQUFPO0FBQ2pDLGFBQU9nRCw0REFBYSxDQUFDaEQsS0FBRCxDQUFiLEdBQXVCLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQXZCLEdBQTBDLEdBQWpEO0FBQ0Q7Ozt3Q0FFbUJBLEssRUFBT0MsSyxFQUFPO0FBQ2hDLGFBQU9nRCw0REFBYSxDQUFDaEQsS0FBRCxDQUFiLEdBQXVCLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQTlCO0FBQ0Q7OztxQ0FFZ0JBLEssRUFBT0MsSyxFQUFPO0FBQzdCLGFBQU9BLEtBQUssR0FBRyxLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUFSLEdBQTJCLEdBQWxDO0FBQ0Q7Ozt5Q0FFb0JBLEssRUFBT0MsSyxFQUFPO0FBQ2pDLFdBQUtaLFdBQUwsQ0FBaUJvRSxnQkFBakI7QUFDQSxhQUFPUiw0REFBYSxDQUFDaEQsS0FBRCxDQUFiLEdBQXVCLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQXZCLEdBQTBDLEtBQUswRCxNQUFMLENBQVksS0FBS3RFLEdBQUwsQ0FBU3VFLG1CQUFULElBQWdDLENBQTVDLENBQWpEO0FBQ0QsSyxDQUVEOzs7OytCQUNzQjtBQUFBLFVBQWZsRCxJQUFlLFFBQWZBLElBQWU7QUFBQSxVQUFUb0IsS0FBUyxRQUFUQSxLQUFTOztBQUNwQixVQUNFLEtBQUt6QyxHQUFMLENBQVN3RSxTQUFULEtBQ0NuRCxJQUFJLEtBQUtDLG1EQUFVLENBQUNXLFFBQXBCLElBQ0NaLElBQUksS0FBS0MsbURBQVUsQ0FBQ0ssa0JBRHJCLElBRUNOLElBQUksS0FBS0MsbURBQVUsQ0FBQ08sNEJBRnJCLElBR0NSLElBQUksS0FBS0MsbURBQVUsQ0FBQ1MsZ0JBSHJCLElBSUNWLElBQUksS0FBS0MsbURBQVUsQ0FBQ2EsVUFKckIsSUFLQ2QsSUFBSSxLQUFLQyxtREFBVSxDQUFDZSxXQU50QixDQURGLEVBUUU7QUFDQSxlQUFPSSxLQUFLLENBQUNnQyxXQUFOLEVBQVA7QUFDRCxPQVZELE1BVU87QUFDTCxlQUFPaEMsS0FBUDtBQUNEO0FBQ0Y7OzsrQkFFVTVCLEssRUFBTztBQUNoQkEsV0FBSyxHQUFHZ0QsNERBQWEsQ0FBQ2hELEtBQUQsQ0FBckI7O0FBQ0EsVUFBSSxDQUFDQSxLQUFLLENBQUM2RCxRQUFOLENBQWUsSUFBZixDQUFMLEVBQTJCO0FBQ3pCN0QsYUFBSyxJQUFJLElBQVQ7QUFDRDs7QUFDRCxhQUFPQSxLQUFLLEdBQUcsS0FBS1osV0FBTCxDQUFpQmtELFNBQWpCLEVBQWY7QUFDRDs7O3NDQUVpQjtBQUNoQixhQUFPLEtBQUsxQyxNQUFMLENBQVksS0FBS0MsS0FBTCxHQUFhLENBQXpCLENBQVA7QUFDRDs7O3FDQUVnQjtBQUNmLGFBQU8sS0FBS0QsTUFBTCxDQUFZLEtBQUtDLEtBQUwsR0FBYSxDQUF6QixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JQSDtBQUVBLElBQU1pRSxxQkFBcUIsR0FBRyxXQUE5QjtBQUNBLElBQU1DLHVCQUF1QixHQUFHLGFBQWhDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDcUIxRSxXO0FBQ25CO0FBQ0Y7QUFDQTtBQUNFLHVCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUtBLE1BQUwsR0FBY0EsTUFBTSxJQUFJLElBQXhCO0FBQ0EsU0FBSzBFLFdBQUwsR0FBbUIsRUFBbkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OztnQ0FDYztBQUNWLGFBQU8sS0FBSzFFLE1BQUwsQ0FBWW1FLE1BQVosQ0FBbUIsS0FBS08sV0FBTCxDQUFpQmxCLE1BQXBDLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozt1Q0FDcUI7QUFDakIsV0FBS2tCLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCSCxxQkFBdEI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozt5Q0FDdUI7QUFDbkIsV0FBS0UsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0JGLHVCQUF0QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7dUNBQ3FCO0FBQ2pCLFVBQUksS0FBS0MsV0FBTCxDQUFpQmxCLE1BQWpCLEdBQTBCLENBQTFCLElBQStCb0IsbURBQUksQ0FBQyxLQUFLRixXQUFOLENBQUosS0FBMkJGLHFCQUE5RCxFQUFxRjtBQUNuRixhQUFLRSxXQUFMLENBQWlCRyxHQUFqQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O3lDQUN1QjtBQUNuQixhQUFPLEtBQUtILFdBQUwsQ0FBaUJsQixNQUFqQixHQUEwQixDQUFqQyxFQUFvQztBQUNsQyxZQUFNdEMsSUFBSSxHQUFHLEtBQUt3RCxXQUFMLENBQWlCRyxHQUFqQixFQUFiOztBQUNBLFlBQUkzRCxJQUFJLEtBQUtzRCxxQkFBYixFQUFvQztBQUNsQztBQUNEO0FBQ0Y7QUFDRjs7O3VDQUVrQjtBQUNqQixXQUFLRSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFSDtBQUVBLElBQU1JLGlCQUFpQixHQUFHLEVBQTFCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCNUUsVztBQUNuQix5QkFBYztBQUFBOztBQUNaLFNBQUs2RSxLQUFMLEdBQWEsQ0FBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztvQ0FDa0J6RSxNLEVBQVFDLEssRUFBTztBQUM3QixVQUFJLEtBQUt3RSxLQUFMLEtBQWUsQ0FBZixJQUFvQixLQUFLQyxhQUFMLENBQW1CMUUsTUFBbkIsRUFBMkJDLEtBQTNCLENBQXhCLEVBQTJEO0FBQ3pELGFBQUt3RSxLQUFMLEdBQWEsQ0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUtBLEtBQUwsR0FBYSxDQUFqQixFQUFvQjtBQUN6QixhQUFLQSxLQUFMO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsYUFBS0EsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7MEJBQ1E7QUFDSixXQUFLQSxLQUFMO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7OzsrQkFDYTtBQUNULGFBQU8sS0FBS0EsS0FBTCxHQUFhLENBQXBCO0FBQ0QsSyxDQUVEO0FBQ0E7Ozs7a0NBQ2N6RSxNLEVBQVFDLEssRUFBTztBQUMzQixVQUFJaUQsTUFBTSxHQUFHLENBQWI7QUFDQSxVQUFJdUIsS0FBSyxHQUFHLENBQVo7O0FBRUEsV0FBSyxJQUFJRSxDQUFDLEdBQUcxRSxLQUFiLEVBQW9CMEUsQ0FBQyxHQUFHM0UsTUFBTSxDQUFDa0QsTUFBL0IsRUFBdUN5QixDQUFDLEVBQXhDLEVBQTRDO0FBQzFDLFlBQU14RSxLQUFLLEdBQUdILE1BQU0sQ0FBQzJFLENBQUQsQ0FBcEI7QUFDQXpCLGNBQU0sSUFBSS9DLEtBQUssQ0FBQzZCLEtBQU4sQ0FBWWtCLE1BQXRCLENBRjBDLENBSTFDOztBQUNBLFlBQUlBLE1BQU0sR0FBR3NCLGlCQUFiLEVBQWdDO0FBQzlCLGlCQUFPLEtBQVA7QUFDRDs7QUFFRCxZQUFJckUsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNhLFVBQTlCLEVBQTBDO0FBQ3hDK0MsZUFBSztBQUNOLFNBRkQsTUFFTyxJQUFJdEUsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNlLFdBQTlCLEVBQTJDO0FBQ2hENkMsZUFBSzs7QUFDTCxjQUFJQSxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNmLG1CQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELFlBQUksS0FBS0csZ0JBQUwsQ0FBc0J6RSxLQUF0QixDQUFKLEVBQWtDO0FBQ2hDLGlCQUFPLEtBQVA7QUFDRDtBQUNGOztBQUNELGFBQU8sS0FBUDtBQUNELEssQ0FFRDtBQUNBOzs7OzJDQUNrQztBQUFBLFVBQWZTLElBQWUsUUFBZkEsSUFBZTtBQUFBLFVBQVRvQixLQUFTLFFBQVRBLEtBQVM7QUFDaEMsYUFDRXBCLElBQUksS0FBS0MsbURBQVUsQ0FBQ0ssa0JBQXBCLElBQ0FOLElBQUksS0FBS0MsbURBQVUsQ0FBQ1MsZ0JBRHBCLElBRUFWLElBQUksS0FBS0MsbURBQVUsQ0FBQ2dFLE9BRnBCLElBR0FqRSxJQUFJLEtBQUtDLG1EQUFVLENBQUNHLGFBSHBCLElBSUFnQixLQUFLLEtBQUssR0FMWjtBQU9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGSDtBQUNBO0FBQ0E7SUFDcUJsQyxNO0FBQ25CO0FBQ0Y7QUFDQTtBQUNFLGtCQUFZRCxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtJLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OEJBQ3NCO0FBQUEsVUFBZDZFLEdBQWMsUUFBZEEsR0FBYztBQUFBLFVBQVQ5QyxLQUFTLFFBQVRBLEtBQVM7O0FBQ2xCLFVBQUksQ0FBQyxLQUFLbkMsTUFBVixFQUFrQjtBQUNoQixlQUFPbUMsS0FBUDtBQUNEOztBQUNELFVBQUk4QyxHQUFKLEVBQVM7QUFDUCxlQUFPLEtBQUtqRixNQUFMLENBQVlpRixHQUFaLENBQVA7QUFDRDs7QUFDRCxhQUFPLEtBQUtqRixNQUFMLENBQVksS0FBS0ksS0FBTCxFQUFaLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkg7QUFDQTtBQUNBOztJQUVxQjhFLFM7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UscUJBQVl4RixHQUFaLEVBQWlCO0FBQUE7O0FBQ2YsU0FBS3lGLGdCQUFMLEdBQXdCLHlFQUF4QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsdUpBQXBCO0FBRUEsU0FBS0MsY0FBTCxHQUFzQkMsaUVBQUEsOEJBQ2hCNUYsR0FBRyxDQUFDNkYsU0FBSixJQUFpQixFQURELElBRXBCLElBRm9CLEVBR3BCLElBSG9CLEVBSXBCLElBSm9CLEVBS3BCLElBTG9CLEVBTXBCLElBTm9CLEVBT3BCLElBUG9CLEVBUXBCLElBUm9CLEVBU3BCLElBVG9CLEVBVXBCLElBVm9CLEdBQXRCO0FBYUEsU0FBS0MsbUJBQUwsR0FBMkIscUNBQTNCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJILG9FQUFBLENBQW9DNUYsR0FBRyxDQUFDZ0csZ0JBQXhDLENBQTFCO0FBRUEsU0FBS0Msd0JBQUwsR0FBZ0NMLHFFQUFBLENBQXFDNUYsR0FBRyxDQUFDa0cscUJBQXpDLENBQWhDO0FBQ0EsU0FBS0Msa0NBQUwsR0FBMENQLHFFQUFBLENBQ3hDNUYsR0FBRyxDQUFDb0csNkJBRG9DLENBQTFDO0FBR0EsU0FBS0Msc0JBQUwsR0FBOEJULHFFQUFBLENBQXFDNUYsR0FBRyxDQUFDc0csb0JBQXpDLENBQTlCO0FBQ0EsU0FBS0Msb0JBQUwsR0FBNEJYLHFFQUFBLENBQXFDNUYsR0FBRyxDQUFDd0csYUFBekMsQ0FBNUI7QUFFQSxTQUFLQyxVQUFMLEdBQWtCYiw2REFBQSxDQUE2QjVGLEdBQUcsQ0FBQzBHLGdCQUFqQyxDQUFsQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JmLCtEQUFBLENBQStCNUYsR0FBRyxDQUFDNEcsV0FBbkMsQ0FBcEI7QUFFQSxTQUFLQyxnQkFBTCxHQUF3QmpCLDhEQUFBLENBQThCNUYsR0FBRyxDQUFDOEcsVUFBbEMsQ0FBeEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5Qm5CLDhEQUFBLENBQThCNUYsR0FBRyxDQUFDZ0gsV0FBbEMsQ0FBekI7QUFFQSxTQUFLQyx5QkFBTCxHQUFpQ3JCLG9FQUFBLENBQy9CNUYsR0FBRyxDQUFDa0gsdUJBRDJCLEVBRS9CLFFBRitCLENBQWpDO0FBSUEsU0FBS0MsNkJBQUwsR0FBcUN2QixvRUFBQSxDQUNuQzVGLEdBQUcsQ0FBQ29ILHFCQUQrQixFQUVuQyxpQkFGbUMsQ0FBckM7QUFJQSxTQUFLQyw4QkFBTCxHQUFzQ3pCLG9FQUFBLENBQ3BDNUYsR0FBRyxDQUFDb0gscUJBRGdDLEVBRXBDeEIsaUVBQUEsQ0FBaUM1RixHQUFHLENBQUM0RyxXQUFyQyxDQUZvQyxDQUF0QztBQUlEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzZCQUNXVSxLLEVBQU87QUFDZCxVQUFNN0csTUFBTSxHQUFHLEVBQWY7QUFDQSxVQUFJRyxLQUFKLENBRmMsQ0FJZDs7QUFDQSxhQUFPMEcsS0FBSyxDQUFDM0QsTUFBYixFQUFxQjtBQUNuQjtBQUNBLFlBQU1ELGdCQUFnQixHQUFHLEtBQUs2RCxhQUFMLENBQW1CRCxLQUFuQixDQUF6QjtBQUNBQSxhQUFLLEdBQUdBLEtBQUssQ0FBQ0UsU0FBTixDQUFnQjlELGdCQUFnQixDQUFDQyxNQUFqQyxDQUFSOztBQUVBLFlBQUkyRCxLQUFLLENBQUMzRCxNQUFWLEVBQWtCO0FBQ2hCO0FBQ0EvQyxlQUFLLEdBQUcsS0FBSzZHLFlBQUwsQ0FBa0JILEtBQWxCLEVBQXlCMUcsS0FBekIsQ0FBUixDQUZnQixDQUdoQjs7QUFDQTBHLGVBQUssR0FBR0EsS0FBSyxDQUFDRSxTQUFOLENBQWdCNUcsS0FBSyxDQUFDNkIsS0FBTixDQUFZa0IsTUFBNUIsQ0FBUjtBQUVBbEQsZ0JBQU0sQ0FBQ3FFLElBQVAsaUNBQWlCbEUsS0FBakI7QUFBd0I4Qyw0QkFBZ0IsRUFBaEJBO0FBQXhCO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPakQsTUFBUDtBQUNEOzs7a0NBRWE2RyxLLEVBQU87QUFDbkIsVUFBTUksT0FBTyxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWSxLQUFLbEMsZ0JBQWpCLENBQWhCO0FBQ0EsYUFBT2lDLE9BQU8sR0FBR0EsT0FBTyxDQUFDLENBQUQsQ0FBVixHQUFnQixFQUE5QjtBQUNEOzs7aUNBRVlKLEssRUFBT00sYSxFQUFlO0FBQ2pDLGFBQ0UsS0FBS0MsZUFBTCxDQUFxQlAsS0FBckIsS0FDQSxLQUFLUSxjQUFMLENBQW9CUixLQUFwQixDQURBLElBRUEsS0FBS1MsaUJBQUwsQ0FBdUJULEtBQXZCLENBRkEsSUFHQSxLQUFLVSxrQkFBTCxDQUF3QlYsS0FBeEIsQ0FIQSxJQUlBLEtBQUtXLG1CQUFMLENBQXlCWCxLQUF6QixDQUpBLElBS0EsS0FBS1ksY0FBTCxDQUFvQlosS0FBcEIsQ0FMQSxJQU1BLEtBQUthLG9CQUFMLENBQTBCYixLQUExQixFQUFpQ00sYUFBakMsQ0FOQSxJQU9BLEtBQUtRLFlBQUwsQ0FBa0JkLEtBQWxCLENBUEEsSUFRQSxLQUFLZSxnQkFBTCxDQUFzQmYsS0FBdEIsQ0FURjtBQVdEOzs7b0NBRWVBLEssRUFBTztBQUNyQixhQUFPLEtBQUtnQixtQkFBTCxDQUF5QmhCLEtBQXpCLEtBQW1DLEtBQUtpQixvQkFBTCxDQUEwQmpCLEtBQTFCLENBQTFDO0FBQ0Q7Ozt3Q0FFbUJBLEssRUFBTztBQUN6QixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JqRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNDLFlBRmM7QUFHL0JrSCxhQUFLLEVBQUUsS0FBSzFDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3lDQUVvQnVCLEssRUFBTztBQUMxQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JqRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNHLGFBRmM7QUFHL0JnSCxhQUFLLEVBQUUsS0FBSzNDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O21DQUVjd0IsSyxFQUFPO0FBQ3BCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQmpHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ29ILE1BRmM7QUFHL0JELGFBQUssRUFBRSxLQUFLOUI7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7c0NBRWlCVyxLLEVBQU87QUFDdkIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CakcsWUFBSSxFQUFFQyxtREFBVSxDQUFDYSxVQUZjO0FBRy9Cc0csYUFBSyxFQUFFLEtBQUs1QjtBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozt1Q0FFa0JTLEssRUFBTztBQUN4QixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JqRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNlLFdBRmM7QUFHL0JvRyxhQUFLLEVBQUUsS0FBSzFCO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3dDQUVtQk8sSyxFQUFPO0FBQ3pCLGFBQ0UsS0FBS3FCLDZCQUFMLENBQW1DckIsS0FBbkMsS0FDQSxLQUFLc0IsOEJBQUwsQ0FBb0N0QixLQUFwQyxDQURBLElBRUEsS0FBS3VCLDBCQUFMLENBQWdDdkIsS0FBaEMsQ0FIRjtBQUtEOzs7a0RBRTZCQSxLLEVBQU87QUFDbkMsYUFBTyxLQUFLd0IsMEJBQUwsQ0FBZ0M7QUFDckN4QixhQUFLLEVBQUxBLEtBRHFDO0FBRXJDbUIsYUFBSyxFQUFFLEtBQUt0Qiw2QkFGeUI7QUFHckM0QixnQkFBUSxFQUFFLGtCQUFDQyxDQUFEO0FBQUEsaUJBQU9BLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQVIsQ0FBUDtBQUFBO0FBSDJCLE9BQWhDLENBQVA7QUFLRDs7O21EQUU4QjNCLEssRUFBTztBQUFBOztBQUNwQyxhQUFPLEtBQUt3QiwwQkFBTCxDQUFnQztBQUNyQ3hCLGFBQUssRUFBTEEsS0FEcUM7QUFFckNtQixhQUFLLEVBQUUsS0FBS3BCLDhCQUZ5QjtBQUdyQzBCLGdCQUFRLEVBQUUsa0JBQUNDLENBQUQ7QUFBQSxpQkFDUixLQUFJLENBQUNFLHdCQUFMLENBQThCO0FBQUUzRCxlQUFHLEVBQUV5RCxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFSLEVBQVcsQ0FBQyxDQUFaLENBQVA7QUFBdUJFLHFCQUFTLEVBQUVILENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUMsQ0FBVDtBQUFsQyxXQUE5QixDQURRO0FBQUE7QUFIMkIsT0FBaEMsQ0FBUDtBQU1EOzs7K0NBRTBCM0IsSyxFQUFPO0FBQ2hDLGFBQU8sS0FBS3dCLDBCQUFMLENBQWdDO0FBQ3JDeEIsYUFBSyxFQUFMQSxLQURxQztBQUVyQ21CLGFBQUssRUFBRSxLQUFLeEIseUJBRnlCO0FBR3JDOEIsZ0JBQVEsRUFBRSxrQkFBQ0MsQ0FBRDtBQUFBLGlCQUFPQSxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFSLENBQVA7QUFBQTtBQUgyQixPQUFoQyxDQUFQO0FBS0Q7OztxREFFc0Q7QUFBQSxVQUExQjNCLEtBQTBCLFFBQTFCQSxLQUEwQjtBQUFBLFVBQW5CbUIsS0FBbUIsUUFBbkJBLEtBQW1CO0FBQUEsVUFBWk0sUUFBWSxRQUFaQSxRQUFZO0FBQ3JELFVBQU1uSSxLQUFLLEdBQUcsS0FBSzRILG9CQUFMLENBQTBCO0FBQUVsQixhQUFLLEVBQUxBLEtBQUY7QUFBU21CLGFBQUssRUFBTEEsS0FBVDtBQUFnQnBILFlBQUksRUFBRUMsbURBQVUsQ0FBQ2lCO0FBQWpDLE9BQTFCLENBQWQ7O0FBQ0EsVUFBSTNCLEtBQUosRUFBVztBQUNUQSxhQUFLLENBQUMyRSxHQUFOLEdBQVl3RCxRQUFRLENBQUNuSSxLQUFLLENBQUM2QixLQUFQLENBQXBCO0FBQ0Q7O0FBQ0QsYUFBTzdCLEtBQVA7QUFDRDs7O29EQUU0QztBQUFBLFVBQWxCMkUsR0FBa0IsU0FBbEJBLEdBQWtCO0FBQUEsVUFBYjRELFNBQWEsU0FBYkEsU0FBYTtBQUMzQyxhQUFPNUQsR0FBRyxDQUFDckMsT0FBSixDQUFZLElBQUlrRyxNQUFKLENBQVdDLDJEQUFZLENBQUMsT0FBT0YsU0FBUixDQUF2QixFQUEyQyxJQUEzQyxDQUFaLEVBQThEQSxTQUE5RCxDQUFQO0FBQ0QsSyxDQUVEOzs7O21DQUNlN0IsSyxFQUFPO0FBQ3BCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQmpHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ2dJLE1BRmM7QUFHL0JiLGFBQUssRUFBRSxLQUFLL0M7QUFIbUIsT0FBMUIsQ0FBUDtBQUtELEssQ0FFRDs7OztxQ0FDaUI0QixLLEVBQU87QUFDdEIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CakcsWUFBSSxFQUFFQyxtREFBVSxDQUFDbUMsUUFGYztBQUcvQmdGLGFBQUssRUFBRSxLQUFLOUM7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7eUNBRW9CMkIsSyxFQUFPTSxhLEVBQWU7QUFDekM7QUFDQTtBQUNBLFVBQUlBLGFBQWEsSUFBSUEsYUFBYSxDQUFDbkYsS0FBL0IsSUFBd0NtRixhQUFhLENBQUNuRixLQUFkLEtBQXdCLEdBQXBFLEVBQXlFO0FBQ3ZFLGVBQU84RyxTQUFQO0FBQ0Q7O0FBQ0QsYUFDRSxLQUFLQyx3QkFBTCxDQUE4QmxDLEtBQTlCLEtBQ0EsS0FBS21DLHVCQUFMLENBQTZCbkMsS0FBN0IsQ0FEQSxJQUVBLEtBQUtvQyxnQ0FBTCxDQUFzQ3BDLEtBQXRDLENBRkEsSUFHQSxLQUFLcUMscUJBQUwsQ0FBMkJyQyxLQUEzQixDQUpGO0FBTUQ7Ozs2Q0FFd0JBLEssRUFBTztBQUM5QixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JqRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNLLGtCQUZjO0FBRy9COEcsYUFBSyxFQUFFLEtBQUt4QztBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozs0Q0FFdUJxQixLLEVBQU87QUFDN0IsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CakcsWUFBSSxFQUFFQyxtREFBVSxDQUFDUyxnQkFGYztBQUcvQjBHLGFBQUssRUFBRSxLQUFLcEM7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7cURBRWdDaUIsSyxFQUFPO0FBQ3RDLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQmpHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ08sNEJBRmM7QUFHL0I0RyxhQUFLLEVBQUUsS0FBS3RDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7OzBDQUVxQm1CLEssRUFBTztBQUMzQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JqRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNXLFFBRmM7QUFHL0J3RyxhQUFLLEVBQUUsS0FBS2xDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O2lDQUVZZSxLLEVBQU87QUFDbEIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CakcsWUFBSSxFQUFFQyxtREFBVSxDQUFDc0ksSUFGYztBQUcvQm5CLGFBQUssRUFBRSxLQUFLaEM7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7Z0RBRTRDO0FBQUEsVUFBdEJhLEtBQXNCLFNBQXRCQSxLQUFzQjtBQUFBLFVBQWZqRyxJQUFlLFNBQWZBLElBQWU7QUFBQSxVQUFUb0gsS0FBUyxTQUFUQSxLQUFTO0FBQzNDLFVBQU1mLE9BQU8sR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVljLEtBQVosQ0FBaEI7QUFFQSxhQUFPZixPQUFPLEdBQUc7QUFBRXJHLFlBQUksRUFBSkEsSUFBRjtBQUFRb0IsYUFBSyxFQUFFaUYsT0FBTyxDQUFDLENBQUQ7QUFBdEIsT0FBSCxHQUFpQzZCLFNBQS9DO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNSSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sU0FBU00sbUJBQVQsQ0FBNkJDLG9CQUE3QixFQUFtRDtBQUN4RCxTQUFPLElBQUlWLE1BQUosYUFDQVcsK0RBQWdCLENBQUNELG9CQUFELENBQWhCLENBQXVDRSxHQUF2QyxDQUEyQ1gsbURBQTNDLEVBQXlEWSxJQUF6RCxDQUE4RCxHQUE5RCxDQURBLFVBRUwsR0FGSyxDQUFQO0FBSUQ7QUFFTSxTQUFTQyxzQkFBVCxDQUFnQ2xFLGdCQUFoQyxFQUFrRDtBQUN2RCxTQUFPLElBQUlvRCxNQUFKLGdCQUNHcEQsZ0JBQWdCLENBQUNnRSxHQUFqQixDQUFxQixVQUFDRyxDQUFEO0FBQUEsV0FBT2QsMkRBQVksQ0FBQ2MsQ0FBRCxDQUFuQjtBQUFBLEdBQXJCLEVBQTZDRixJQUE3QyxDQUFrRCxHQUFsRCxDQURILDRCQUVMLEdBRkssQ0FBUDtBQUlEO0FBRU0sU0FBU0csdUJBQVQsQ0FBaUM1RCxhQUFqQyxFQUFnRDtBQUNyRCxNQUFJQSxhQUFhLENBQUM3QyxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCLFdBQU8sSUFBSXlGLE1BQUosU0FBbUIsR0FBbkIsQ0FBUDtBQUNEOztBQUNELE1BQU1pQixvQkFBb0IsR0FBR04sK0RBQWdCLENBQUN2RCxhQUFELENBQWhCLENBQWdDeUQsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMvRyxPQUExQyxDQUFrRCxJQUFsRCxFQUF5RCxNQUF6RCxDQUE3QjtBQUNBLFNBQU8sSUFBSWtHLE1BQUosYUFBZ0JpQixvQkFBaEIsV0FBNEMsSUFBNUMsQ0FBUDtBQUNEO0FBRU0sU0FBU0MsZUFBVCxHQUE0QztBQUFBLE1BQW5CQyxZQUFtQix1RUFBSixFQUFJO0FBQ2pELFNBQU8sSUFBSW5CLE1BQUosb0dBQ3VGbUIsWUFBWSxDQUFDTixJQUFiLENBQzFGLEVBRDBGLENBRHZGLFVBSUwsR0FKSyxDQUFQO0FBTUQ7QUFFTSxTQUFTTyxpQkFBVCxDQUEyQjVELFdBQTNCLEVBQXdDO0FBQzdDLFNBQU8sSUFBSXdDLE1BQUosQ0FBVyxPQUFPcUIsbUJBQW1CLENBQUM3RCxXQUFELENBQTFCLEdBQTBDLEdBQXJELEVBQTBELEdBQTFELENBQVA7QUFDRCxDLENBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLFNBQVM2RCxtQkFBVCxDQUE2QjdELFdBQTdCLEVBQTBDO0FBQy9DLE1BQU04RCxRQUFRLEdBQUc7QUFDZixVQUFNLGtCQURTO0FBRWYsVUFBTSx3QkFGUztBQUdmLFVBQU0sMkNBSFM7QUFJZixVQUFNLHlDQUpTO0FBS2YsVUFBTSx5Q0FMUztBQU1mLFdBQU8sNENBTlE7QUFPZixZQUFRLDJDQVBPO0FBUWYsWUFBUSwyQ0FSTztBQVNmQyxNQUFFLEVBQUU7QUFUVyxHQUFqQjtBQVlBLFNBQU8vRCxXQUFXLENBQUNvRCxHQUFaLENBQWdCLFVBQUNZLENBQUQ7QUFBQSxXQUFPRixRQUFRLENBQUNFLENBQUQsQ0FBZjtBQUFBLEdBQWhCLEVBQW9DWCxJQUFwQyxDQUF5QyxHQUF6QyxDQUFQO0FBQ0Q7QUFFTSxTQUFTWSxnQkFBVCxDQUEwQkMsTUFBMUIsRUFBa0M7QUFDdkMsU0FBTyxJQUFJMUIsTUFBSixDQUFXLE9BQU8wQixNQUFNLENBQUNkLEdBQVAsQ0FBV2UsV0FBWCxFQUF3QmQsSUFBeEIsQ0FBNkIsR0FBN0IsQ0FBUCxHQUEyQyxHQUF0RCxFQUEyRCxJQUEzRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU2MsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDMUIsTUFBSUEsS0FBSyxDQUFDckgsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QjtBQUNBLFdBQU8wRiwyREFBWSxDQUFDMkIsS0FBRCxDQUFuQjtBQUNELEdBSEQsTUFHTztBQUNMO0FBQ0EsV0FBTyxRQUFRQSxLQUFSLEdBQWdCLEtBQXZCO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTQyxzQkFBVCxDQUFnQ0MsS0FBaEMsRUFBdUNDLE9BQXZDLEVBQWdEO0FBQ3JELE1BQUlDLHNEQUFPLENBQUNGLEtBQUQsQ0FBWCxFQUFvQjtBQUNsQixXQUFPLEtBQVA7QUFDRDs7QUFDRCxNQUFNRyxVQUFVLEdBQUdILEtBQUssQ0FBQ2xCLEdBQU4sQ0FBVVgsbURBQVYsRUFBd0JZLElBQXhCLENBQTZCLEdBQTdCLENBQW5CO0FBRUEsU0FBTyxJQUFJYixNQUFKLGdCQUFtQmlDLFVBQW5CLGlCQUFvQ0YsT0FBcEMsU0FBaUQsR0FBakQsQ0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ25GRDtBQUFBO0FBQ0E7QUFDQTtBQUNlO0FBQ2J2QixNQUFJLEVBQUUsTUFETztBQUVibEIsUUFBTSxFQUFFLFFBRks7QUFHYnpHLFVBQVEsRUFBRSxVQUhHO0FBSWJOLG9CQUFrQixFQUFFLG9CQUpQO0FBS2JFLDhCQUE0QixFQUFFLDhCQUxqQjtBQU1iRSxrQkFBZ0IsRUFBRSxrQkFOTDtBQU9iMEIsVUFBUSxFQUFFLFVBUEc7QUFRYnRCLFlBQVUsRUFBRSxZQVJDO0FBU2JFLGFBQVcsRUFBRSxhQVRBO0FBVWJkLGNBQVksRUFBRSxjQVZEO0FBV2JFLGVBQWEsRUFBRSxlQVhGO0FBWWI2SCxRQUFNLEVBQUUsUUFaSztBQWFiL0csYUFBVyxFQUFFO0FBYkEsQ0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFFQSxJQUFNaUUsYUFBYSxHQUFHLENBQ3BCLEtBRG9CLEVBRXBCLFVBRm9CLEVBR3BCLE9BSG9CLEVBSXBCLEtBSm9CLEVBS3BCLFVBTG9CLEVBTXBCLE9BTm9CLEVBT3BCLE9BUG9CLEVBUXBCLEtBUm9CLEVBU3BCLEtBVG9CLEVBVXBCLE9BVm9CLEVBV3BCLElBWG9CLEVBWXBCLEtBWm9CLEVBYXBCLFlBYm9CLEVBY3BCLFdBZG9CLEVBZXBCLFNBZm9CLEVBZ0JwQixZQWhCb0IsRUFpQnBCLElBakJvQixFQWtCcEIsUUFsQm9CLEVBbUJwQixZQW5Cb0IsRUFvQnBCLE9BcEJvQixFQXFCcEIsZUFyQm9CLEVBc0JwQixLQXRCb0IsRUF1QnBCLFdBdkJvQixFQXdCcEIsS0F4Qm9CLEVBeUJwQixRQXpCb0IsRUEwQnBCLE9BMUJvQixFQTJCcEIsU0EzQm9CLEVBNEJwQixRQTVCb0IsRUE2QnBCLFFBN0JvQixFQThCcEIsTUE5Qm9CLEVBK0JwQixTQS9Cb0IsRUFnQ3BCLE1BaENvQixFQWlDcEIsWUFqQ29CLEVBa0NwQixJQWxDb0IsRUFtQ3BCLE9BbkNvQixFQW9DcEIsTUFwQ29CLEVBcUNwQixRQXJDb0IsRUFzQ3BCLFNBdENvQixFQXVDcEIsYUF2Q29CLEVBd0NwQixVQXhDb0IsRUF5Q3BCLE1BekNvQixFQTBDcEIsTUExQ29CLEVBMkNwQixPQTNDb0IsRUE0Q3BCLE1BNUNvQixFQTZDcEIsU0E3Q29CLEVBOENwQixNQTlDb0IsRUErQ3BCLFdBL0NvQixFQWdEcEIsa0JBaERvQixFQWlEcEIsYUFqRG9CLEVBa0RwQixPQWxEb0IsRUFtRHBCLE1BbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixPQXJEb0IsRUFzRHBCLFNBdERvQixFQXVEcEIsVUF2RG9CLEVBd0RwQixTQXhEb0IsRUF5RHBCLFNBekRvQixFQTBEcEIsWUExRG9CLEVBMkRwQixRQTNEb0IsRUE0RHBCLFFBNURvQixFQTZEcEIsU0E3RG9CLEVBOERwQixRQTlEb0IsRUErRHBCLFFBL0RvQixFQWdFcEIsV0FoRW9CLEVBaUVwQixTQWpFb0IsRUFrRXBCLFlBbEVvQixFQW1FcEIsWUFuRW9CLEVBb0VwQixVQXBFb0IsRUFxRXBCLFVBckVvQixFQXNFcEIsU0F0RW9CLEVBdUVwQixNQXZFb0IsRUF3RXBCLGVBeEVvQixFQXlFcEIsT0F6RW9CLEVBMEVwQixXQTFFb0IsRUEyRXBCLFdBM0VvQixFQTRFcEIsWUE1RW9CLEVBNkVwQixRQTdFb0IsRUE4RXBCLE9BOUVvQixFQStFcEIsTUEvRW9CLEVBZ0ZwQixXQWhGb0IsRUFpRnBCLFNBakZvQixFQWtGcEIsY0FsRm9CLEVBbUZwQixpQ0FuRm9CLEVBb0ZwQixrQkFwRm9CLEVBcUZwQixjQXJGb0IsRUFzRnBCLGNBdEZvQixFQXVGcEIsZ0JBdkZvQixFQXdGcEIsZ0JBeEZvQixFQXlGcEIsY0F6Rm9CLEVBMEZwQixtQkExRm9CLEVBMkZwQixrQkEzRm9CLEVBNEZwQixrQ0E1Rm9CLEVBNkZwQixjQTdGb0IsRUE4RnBCLFFBOUZvQixFQStGcEIsT0EvRm9CLEVBZ0dwQixNQWhHb0IsRUFpR3BCLFVBakdvQixFQWtHcEIsbUJBbEdvQixFQW1HcEIsa0JBbkdvQixFQW9HcEIsTUFwR29CLEVBcUdwQixLQXJHb0IsRUFzR3BCLE1BdEdvQixFQXVHcEIsWUF2R29CLEVBd0dwQixVQXhHb0IsRUF5R3BCLFFBekdvQixFQTBHcEIsUUExR29CLEVBMkdwQixpQkEzR29CLEVBNEdwQixnQkE1R29CLEVBNkdwQixZQTdHb0IsRUE4R3BCLEtBOUdvQixFQStHcEIsU0EvR29CLEVBZ0hwQixTQWhIb0IsRUFpSHBCLFNBakhvQixFQWtIcEIsVUFsSG9CLEVBbUhwQixZQW5Ib0IsRUFvSHBCLFFBcEhvQixFQXFIcEIsV0FySG9CLEVBc0hwQixZQXRIb0IsRUF1SHBCLE9BdkhvQixFQXdIcEIsVUF4SG9CLEVBeUhwQixZQXpIb0IsRUEwSHBCLGVBMUhvQixFQTJIcEIsYUEzSG9CLEVBNEhwQixTQTVIb0IsRUE2SHBCLFVBN0hvQixFQThIcEIsWUE5SG9CLEVBK0hwQixVQS9Ib0IsRUFnSXBCLElBaElvQixFQWlJcEIsVUFqSW9CLEVBa0lwQixRQWxJb0IsRUFtSXBCLE1BbklvQixFQW9JcEIsUUFwSW9CLEVBcUlwQixTQXJJb0IsRUFzSXBCLE1BdElvQixFQXVJcEIsVUF2SW9CLEVBd0lwQixTQXhJb0IsRUF5SXBCLE1BeklvQixFQTBJcEIsUUExSW9CLEVBMklwQixRQTNJb0IsRUE0SXBCLFVBNUlvQixFQTZJcEIsWUE3SW9CLEVBOElwQixLQTlJb0IsRUErSXBCLFVBL0lvQixFQWdKcEIsUUFoSm9CLEVBaUpwQixPQWpKb0IsRUFrSnBCLFFBbEpvQixFQW1KcEIsT0FuSm9CLEVBb0pwQixXQXBKb0IsRUFxSnBCLFdBckpvQixFQXNKcEIsV0F0Sm9CLEVBdUpwQixNQXZKb0IsRUF3SnBCLFNBeEpvQixFQXlKcEIsUUF6Sm9CLEVBMEpwQixNQTFKb0IsRUEySnBCLEtBM0pvQixFQTRKcEIsU0E1Sm9CLEVBNkpwQixVQTdKb0IsRUE4SnBCLFVBOUpvQixFQStKcEIsU0EvSm9CLEVBZ0twQixPQWhLb0IsRUFpS3BCLFFBaktvQixFQWtLcEIsT0FsS29CLEVBbUtwQixXQW5Lb0IsRUFvS3BCLE1BcEtvQixFQXFLcEIsUUFyS29CLEVBc0twQixPQXRLb0IsRUF1S3BCLE9BdktvQixFQXdLcEIsT0F4S29CLEVBeUtwQixPQXpLb0IsRUEwS3BCLEtBMUtvQixFQTJLcEIsU0EzS29CLEVBNEtwQixNQTVLb0IsRUE2S3BCLE1BN0tvQixFQThLcEIsVUE5S29CLEVBK0twQixRQS9Lb0IsRUFnTHBCLFNBaExvQixFQWlMcEIsV0FqTG9CLEVBa0xwQixLQWxMb0IsRUFtTHBCLFFBbkxvQixFQW9McEIsTUFwTG9CLEVBcUxwQixPQXJMb0IsRUFzTHBCLFNBdExvQixFQXVMcEIsT0F2TG9CLEVBd0xwQixVQXhMb0IsRUF5THBCLFNBekxvQixFQTBMcEIsTUExTG9CLEVBMkxwQixjQTNMb0IsRUE0THBCLE1BNUxvQixFQTZMcEIsTUE3TG9CLEVBOExwQixNQTlMb0IsRUErTHBCLE9BL0xvQixFQWdNcEIsVUFoTW9CLEVBaU1wQixJQWpNb0IsRUFrTXBCLFdBbE1vQixFQW1NcEIsSUFuTW9CLEVBb01wQixXQXBNb0IsRUFxTXBCLFdBck1vQixFQXNNcEIsV0F0TW9CLEVBdU1wQixPQXZNb0IsRUF3TXBCLFdBeE1vQixFQXlNcEIsWUF6TW9CLEVBME1wQixLQTFNb0IsRUEyTXBCLFVBM01vQixFQTRNcEIsU0E1TW9CLEVBNk1wQixPQTdNb0IsRUE4TXBCLE9BOU1vQixFQStNcEIsYUEvTW9CLEVBZ05wQixRQWhOb0IsRUFpTnBCLEtBak5vQixFQWtOcEIsU0FsTm9CLEVBbU5wQixXQW5Ob0IsRUFvTnBCLGNBcE5vQixFQXFOcEIsVUFyTm9CLEVBc05wQixNQXROb0IsRUF1TnBCLElBdk5vQixFQXdOcEIsUUF4Tm9CLEVBeU5wQixXQXpOb0IsRUEwTnBCLFNBMU5vQixFQTJOcEIsS0EzTm9CLEVBNE5wQixNQTVOb0IsRUE2TnBCLE1BN05vQixFQThOcEIsS0E5Tm9CLEVBK05wQixPQS9Ob0IsRUFnT3BCLFVBaE9vQixFQWlPcEIsT0FqT29CLEVBa09wQixTQWxPb0IsRUFtT3BCLFVBbk9vQixFQW9PcEIsU0FwT29CLEVBcU9wQixPQXJPb0IsRUFzT3BCLE1BdE9vQixFQXVPcEIsTUF2T29CLEVBd09wQixVQXhPb0IsRUF5T3BCLElBek9vQixFQTBPcEIsT0ExT29CLEVBMk9wQixXQTNPb0IsRUE0T3BCLFFBNU9vQixFQTZPcEIsV0E3T29CLEVBOE9wQixnQkE5T29CLEVBK09wQixTQS9Pb0IsRUFnUHBCLFVBaFBvQixFQWlQcEIsTUFqUG9CLEVBa1BwQixTQWxQb0IsRUFtUHBCLFVBblBvQixFQW9QcEIsTUFwUG9CLEVBcVBwQixNQXJQb0IsRUFzUHBCLE9BdFBvQixFQXVQcEIsWUF2UG9CLEVBd1BwQixPQXhQb0IsRUF5UHBCLGNBelBvQixFQTBQcEIsS0ExUG9CLEVBMlBwQixVQTNQb0IsRUE0UHBCLFFBNVBvQixFQTZQcEIsT0E3UG9CLEVBOFBwQixRQTlQb0IsRUErUHBCLGFBL1BvQixFQWdRcEIsY0FoUW9CLEVBaVFwQixLQWpRb0IsRUFrUXBCLFFBbFFvQixFQW1RcEIsU0FuUW9CLEVBb1FwQixVQXBRb0IsRUFxUXBCLEtBclFvQixFQXNRcEIsTUF0UW9CLEVBdVFwQixVQXZRb0IsRUF3UXBCLFFBeFFvQixFQXlRcEIsT0F6UW9CLEVBMFFwQixRQTFRb0IsRUEyUXBCLFVBM1FvQixFQTRRcEIsS0E1UW9CLEVBNlFwQixVQTdRb0IsRUE4UXBCLFNBOVFvQixFQStRcEIsT0EvUW9CLEVBZ1JwQixPQWhSb0IsRUFpUnBCLEtBalJvQixFQWtScEIsV0FsUm9CLEVBbVJwQixTQW5Sb0IsRUFvUnBCLElBcFJvQixFQXFScEIsU0FyUm9CLEVBc1JwQixTQXRSb0IsRUF1UnBCLFVBdlJvQixFQXdScEIsWUF4Um9CLEVBeVJwQixZQXpSb0IsRUEwUnBCLFlBMVJvQixFQTJScEIsTUEzUm9CLEVBNFJwQixTQTVSb0IsRUE2UnBCLFdBN1JvQixFQThScEIsWUE5Um9CLEVBK1JwQixLQS9Sb0IsRUFnU3BCLE1BaFNvQixFQWlTcEIsUUFqU29CLEVBa1NwQixPQWxTb0IsRUFtU3BCLFNBblNvQixFQW9TcEIsVUFwU29CLEVBcVNwQixNQXJTb0IsRUFzU3BCLGNBdFNvQixFQXVTcEIsSUF2U29CLEVBd1NwQixRQXhTb0IsRUF5U3BCLEtBelNvQixFQTBTcEIsV0ExU29CLEVBMlNwQixJQTNTb0IsRUE0U3BCLE1BNVNvQixFQTZTcEIsTUE3U29CLEVBOFNwQixjQTlTb0IsRUErU3BCLFVBL1NvQixFQWdUcEIsUUFoVG9CLEVBaVRwQixPQWpUb0IsRUFrVHBCLEtBbFRvQixFQW1UcEIsT0FuVG9CLEVBb1RwQixNQXBUb0IsRUFxVHBCLFVBclRvQixFQXNUcEIsU0F0VG9CLEVBdVRwQixZQXZUb0IsRUF3VHBCLFNBeFRvQixFQXlUcEIsUUF6VG9CLEVBMFRwQixVQTFUb0IsRUEyVHBCLFdBM1RvQixFQTRUcEIsTUE1VG9CLEVBNlRwQixXQTdUb0IsRUE4VHBCLGFBOVRvQixFQStUcEIsY0EvVG9CLEVBZ1VwQixZQWhVb0IsRUFpVXBCLFVBalVvQixFQWtVcEIsTUFsVW9CLEVBbVVwQixpQkFuVW9CLEVBb1VwQixpQkFwVW9CLEVBcVVwQixjQXJVb0IsRUFzVXBCLFdBdFVvQixFQXVVcEIsTUF2VW9CLEVBd1VwQixVQXhVb0IsRUF5VXBCLE9BelVvQixFQTBVcEIsV0ExVW9CLEVBMlVwQixTQTNVb0IsRUE0VXBCLFNBNVVvQixFQTZVcEIsU0E3VW9CLEVBOFVwQixRQTlVb0IsRUErVXBCLFlBL1VvQixFQWdWcEIsV0FoVm9CLEVBaVZwQixTQWpWb0IsRUFrVnBCLE1BbFZvQixFQW1WcEIsUUFuVm9CLEVBb1ZwQixPQXBWb0IsRUFxVnBCLFNBclZvQixFQXNWcEIsT0F0Vm9CLEVBdVZwQixNQXZWb0IsRUF3VnBCLE1BeFZvQixFQXlWcEIsT0F6Vm9CLEVBMFZwQixNQTFWb0IsRUEyVnBCLFVBM1ZvQixFQTRWcEIsV0E1Vm9CLEVBNlZwQixLQTdWb0IsRUE4VnBCLFlBOVZvQixFQStWcEIsYUEvVm9CLEVBZ1dwQixTQWhXb0IsRUFpV3BCLFdBaldvQixFQWtXcEIsV0FsV29CLEVBbVdwQixZQW5Xb0IsRUFvV3BCLGdCQXBXb0IsRUFxV3BCLFNBcldvQixFQXNXcEIsWUF0V29CLEVBdVdwQixVQXZXb0IsRUF3V3BCLFVBeFdvQixFQXlXcEIsVUF6V29CLEVBMFdwQixTQTFXb0IsRUEyV3BCLFFBM1dvQixFQTRXcEIsUUE1V29CLEVBNldwQixPQTdXb0IsRUE4V3BCLFVBOVdvQixFQStXcEIsU0EvV29CLEVBZ1hwQixVQWhYb0IsRUFpWHBCLFFBalhvQixFQWtYcEIsb0JBbFhvQixFQW1YcEIsUUFuWG9CLEVBb1hwQixTQXBYb0IsRUFxWHBCLFFBclhvQixFQXNYcEIsT0F0WG9CLEVBdVhwQixNQXZYb0IsRUF3WHBCLFVBeFhvQixFQXlYcEIsUUF6WG9CLEVBMFhwQixlQTFYb0IsRUEyWHBCLFlBM1hvQixFQTRYcEIsYUE1WG9CLEVBNlhwQixpQkE3WG9CLEVBOFhwQixpQkE5WG9CLEVBK1hwQixlQS9Yb0IsRUFnWXBCLFVBaFlvQixFQWlZcEIsU0FqWW9CLEVBa1lwQixLQWxZb0IsRUFtWXBCLFdBbllvQixFQW9ZcEIsTUFwWW9CLEVBcVlwQixRQXJZb0IsRUFzWXBCLFlBdFlvQixFQXVZcEIsS0F2WW9CLEVBd1lwQixLQXhZb0IsRUF5WXBCLFdBellvQixFQTBZcEIsUUExWW9CLEVBMllwQixPQTNZb0IsRUE0WXBCLFlBNVlvQixFQTZZcEIsUUE3WW9CLEVBOFlwQixRQTlZb0IsRUErWXBCLFFBL1lvQixFQWdacEIsU0FoWm9CLEVBaVpwQixRQWpab0IsRUFrWnBCLFVBbFpvQixFQW1acEIsV0FuWm9CLEVBb1pwQixVQXBab0IsRUFxWnBCLFNBclpvQixFQXNacEIsY0F0Wm9CLEVBdVpwQixRQXZab0IsRUF3WnBCLFNBeFpvQixFQXlacEIsUUF6Wm9CLEVBMFpwQixVQTFab0IsRUEyWnBCLE1BM1pvQixFQTRacEIsTUE1Wm9CLEVBNlpwQixRQTdab0IsRUE4WnBCLFVBOVpvQixFQStacEIsY0EvWm9CLEVBZ2FwQixLQWhhb0IsRUFpYXBCLGNBamFvQixFQWthcEIsT0FsYW9CLEVBbWFwQixVQW5hb0IsRUFvYXBCLFlBcGFvQixFQXFhcEIsTUFyYW9CLEVBc2FwQixTQXRhb0IsRUF1YXBCLFVBdmFvQixFQXdhcEIsT0F4YW9CLEVBeWFwQixVQXphb0IsRUEwYXBCLFdBMWFvQixFQTJhcEIsUUEzYW9CLEVBNGFwQixVQTVhb0IsRUE2YXBCLE1BN2FvQixFQThhcEIsWUE5YW9CLEVBK2FwQixhQS9hb0IsRUFnYnBCLFVBaGJvQixFQWlicEIsUUFqYm9CLEVBa2JwQixPQWxib0IsRUFtYnBCLGFBbmJvQixFQW9icEIsV0FwYm9CLEVBcWJwQixLQXJib0IsRUFzYnBCLFNBdGJvQixFQXVicEIsV0F2Ym9CLEVBd2JwQixTQXhib0IsRUF5YnBCLFFBemJvQixFQTBicEIsUUExYm9CLEVBMmJwQixTQTNib0IsRUE0YnBCLFFBNWJvQixFQTZicEIsYUE3Ym9CLEVBOGJwQixPQTlib0IsRUErYnBCLGFBL2JvQixFQWdjcEIsWUFoY29CLEVBaWNwQixNQWpjb0IsRUFrY3BCLE1BbGNvQixFQW1jcEIsV0FuY29CLEVBb2NwQixlQXBjb0IsRUFxY3BCLGlCQXJjb0IsRUFzY3BCLElBdGNvQixFQXVjcEIsVUF2Y29CLEVBd2NwQixhQXhjb0IsRUF5Y3BCLFdBemNvQixFQTBjcEIsYUExY29CLEVBMmNwQixPQTNjb0IsRUE0Y3BCLFNBNWNvQixFQTZjcEIsTUE3Y29CLEVBOGNwQixNQTljb0IsRUErY3BCLFVBL2NvQixFQWdkcEIsTUFoZG9CLEVBaWRwQixTQWpkb0IsRUFrZHBCLE1BbGRvQixFQW1kcEIsUUFuZG9CLEVBb2RwQixTQXBkb0IsRUFxZHBCLFFBcmRvQixFQXNkcEIsT0F0ZG9CLEVBdWRwQixPQXZkb0IsRUF3ZHBCLE9BeGRvQixFQXlkcEIsTUF6ZG9CLEVBMGRwQixPQTFkb0IsRUEyZHBCLFdBM2RvQixFQTRkcEIsT0E1ZG9CLEVBNmRwQixTQTdkb0IsRUE4ZHBCLFVBOWRvQixFQStkcEIsU0EvZG9CLEVBZ2VwQixTQWhlb0IsRUFpZXBCLFNBamVvQixFQWtlcEIsVUFsZW9CLEVBbWVwQixNQW5lb0IsRUFvZXBCLFNBcGVvQixFQXFlcEIsTUFyZW9CLEVBc2VwQixVQXRlb0IsRUF1ZXBCLFNBdmVvQixFQXdlcEIsTUF4ZW9CLEVBeWVwQixVQXplb0IsRUEwZXBCLE9BMWVvQixFQTJlcEIsY0EzZW9CLEVBNGVwQixRQTVlb0IsRUE2ZXBCLE1BN2VvQixFQThlcEIsUUE5ZW9CLEVBK2VwQixTQS9lb0IsRUFnZnBCLEtBaGZvQixFQWlmcEIsT0FqZm9CLEVBa2ZwQixZQWxmb0IsRUFtZnBCLFdBbmZvQixFQW9mcEIsZUFwZm9CLEVBcWZwQixNQXJmb0IsRUFzZnBCLE9BdGZvQixDQUF0QjtBQXlmQSxJQUFNTixxQkFBcUIsR0FBRyxDQUM1QixLQUQ0QixFQUU1QixPQUY0QixFQUc1QixjQUg0QixFQUk1QixhQUo0QixFQUs1QixhQUw0QixFQU01QixRQU40QixFQU81QixhQVA0QixFQVE1QixNQVI0QixFQVM1QixVQVQ0QixFQVU1QixJQVY0QixFQVc1QixRQVg0QixFQVk1QixhQVo0QixFQWE1QixXQWI0QixFQWM1QixPQWQ0QixFQWU1QixVQWY0QixFQWdCNUIsUUFoQjRCLEVBaUI1QixvQkFqQjRCLEVBa0I1QixZQWxCNEIsRUFtQjVCLEtBbkI0QixFQW9CNUIsUUFwQjRCLEVBcUI1QixRQXJCNEIsRUFzQjVCLE9BdEI0QixDQUE5QjtBQXlCQSxJQUFNRSw2QkFBNkIsR0FBRyxDQUFDLFdBQUQsRUFBYyxlQUFkLEVBQStCLE9BQS9CLEVBQXdDLE9BQXhDLEVBQWlELFdBQWpELENBQXRDO0FBRUEsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsWUFGMkIsRUFHM0IsWUFIMkIsRUFJM0IsTUFKMkIsRUFLM0IsV0FMMkIsRUFNM0IsaUJBTjJCLEVBTzNCLElBUDJCLEVBUTNCLFlBUjJCLEVBUzNCLFlBVDJCLEVBVTNCLGtCQVYyQixDQUE3Qjs7SUFhcUJnRixZOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJOUYsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxDQVRKO0FBVW5CcEIsd0JBQWdCLEVBQUUsQ0FBQyxJQUFELENBVkM7QUFXbkJVLHdCQUFnQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU47QUFYQyxPQUFkLENBQVA7QUFhRDs7OztFQWZ1QzNHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcGlCMUM7QUFDQTtBQUVBLElBQU15RyxhQUFhLEdBQUcsQ0FDcEIsS0FEb0IsRUFFcEIsT0FGb0IsRUFHcEIsU0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsS0FMb0IsRUFNcEIsT0FOb0IsRUFPcEIsSUFQb0IsRUFRcEIsS0FSb0IsRUFTcEIsT0FUb0IsRUFVcEIsU0FWb0IsRUFXcEIsUUFYb0IsRUFZcEIsU0Fab0IsRUFhcEIsT0Fib0IsRUFjcEIsUUFkb0IsRUFlcEIsT0Fmb0IsRUFnQnBCLElBaEJvQixFQWlCcEIsTUFqQm9CLEVBa0JwQixNQWxCb0IsRUFtQnBCLE1BbkJvQixFQW9CcEIsU0FwQm9CLEVBcUJwQixTQXJCb0IsRUFzQnBCLFlBdEJvQixFQXVCcEIsUUF2Qm9CLEVBd0JwQixTQXhCb0IsRUF5QnBCLFVBekJvQixFQTBCcEIsV0ExQm9CLEVBMkJwQixPQTNCb0IsRUE0QnBCLFFBNUJvQixFQTZCcEIsVUE3Qm9CLEVBOEJwQixTQTlCb0IsRUErQnBCLFdBL0JvQixFQWdDcEIsU0FoQ29CLEVBaUNwQixXQWpDb0IsRUFrQ3BCLFFBbENvQixFQW1DcEIsU0FuQ29CLEVBb0NwQixNQXBDb0IsRUFxQ3BCLFVBckNvQixFQXNDcEIsVUF0Q29CLEVBdUNwQixJQXZDb0IsRUF3Q3BCLE1BeENvQixFQXlDcEIsTUF6Q29CLEVBMENwQixTQTFDb0IsRUEyQ3BCLE1BM0NvQixFQTRDcEIsS0E1Q29CLEVBNkNwQixPQTdDb0IsRUE4Q3BCLFFBOUNvQixFQStDcEIsU0EvQ29CLEVBZ0RwQixTQWhEb0IsRUFpRHBCLFFBakRvQixFQWtEcEIsU0FsRG9CLEVBbURwQixPQW5Eb0IsRUFvRHBCLE9BcERvQixFQXFEcEIsT0FyRG9CLEVBc0RwQixTQXREb0IsRUF1RHBCLEtBdkRvQixFQXdEcEIsT0F4RG9CLEVBeURwQixNQXpEb0IsRUEwRHBCLFVBMURvQixFQTJEcEIsT0EzRG9CLEVBNERwQixPQTVEb0IsRUE2RHBCLEtBN0RvQixFQThEcEIsUUE5RG9CLEVBK0RwQixJQS9Eb0IsRUFnRXBCLFFBaEVvQixFQWlFcEIsT0FqRW9CLEVBa0VwQixJQWxFb0IsRUFtRXBCLFNBbkVvQixFQW9FcEIsV0FwRW9CLEVBcUVwQixPQXJFb0IsRUFzRXBCLE9BdEVvQixFQXVFcEIsUUF2RW9CLEVBd0VwQixPQXhFb0IsRUF5RXBCLFFBekVvQixFQTBFcEIsV0ExRW9CLEVBMkVwQixNQTNFb0IsRUE0RXBCLElBNUVvQixFQTZFcEIsTUE3RW9CLEVBOEVwQixLQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsVUFoRm9CLEVBaUZwQixPQWpGb0IsRUFrRnBCLE1BbEZvQixFQW1GcEIsTUFuRm9CLEVBb0ZwQixLQXBGb0IsRUFxRnBCLFNBckZvQixFQXNGcEIsTUF0Rm9CLEVBdUZwQixPQXZGb0IsRUF3RnBCLEtBeEZvQixFQXlGcEIsS0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLFNBM0ZvQixFQTRGcEIsY0E1Rm9CLEVBNkZwQixPQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsV0EvRm9CLEVBZ0dwQixNQWhHb0IsRUFpR3BCLEtBakdvQixFQWtHcEIsTUFsR29CLEVBbUdwQixRQW5Hb0IsRUFvR3BCLFFBcEdvQixFQXFHcEIsUUFyR29CLEVBc0dwQixJQXRHb0IsRUF1R3BCLFFBdkdvQixFQXdHcEIsSUF4R29CLEVBeUdwQixPQXpHb0IsRUEwR3BCLE9BMUdvQixFQTJHcEIsTUEzR29CLEVBNEdwQixPQTVHb0IsRUE2R3BCLFdBN0dvQixFQThHcEIsVUE5R29CLEVBK0dwQixNQS9Hb0IsRUFnSHBCLE1BaEhvQixFQWlIcEIsU0FqSG9CLEVBa0hwQixTQWxIb0IsRUFtSHBCLFNBbkhvQixFQW9IcEIsV0FwSG9CLEVBcUhwQixXQXJIb0IsRUFzSHBCLFFBdEhvQixFQXVIcEIsS0F2SG9CLEVBd0hwQixPQXhIb0IsRUF5SHBCLFFBekhvQixFQTBIcEIsUUExSG9CLEVBMkhwQixRQTNIb0IsRUE0SHBCLFdBNUhvQixFQTZIcEIsUUE3SG9CLEVBOEhwQixPQTlIb0IsRUErSHBCLE1BL0hvQixFQWdJcEIsVUFoSW9CLEVBaUlwQixXQWpJb0IsRUFrSXBCLFFBbElvQixFQW1JcEIsUUFuSW9CLEVBb0lwQixNQXBJb0IsRUFxSXBCLE1BcklvQixFQXNJcEIsS0F0SW9CLEVBdUlwQixNQXZJb0IsRUF3SXBCLE1BeElvQixFQXlJcEIsT0F6SW9CLEVBMElwQixZQTFJb0IsRUEySXBCLFFBM0lvQixFQTRJcEIsUUE1SW9CLEVBNklwQixNQTdJb0IsRUE4SXBCLElBOUlvQixFQStJcEIsYUEvSW9CLEVBZ0pwQixTQWhKb0IsRUFpSnBCLE1BakpvQixFQWtKcEIsVUFsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLE9BcEpvQixFQXFKcEIsUUFySm9CLEVBc0pwQixTQXRKb0IsRUF1SnBCLFFBdkpvQixFQXdKcEIsT0F4Sm9CLEVBeUpwQixRQXpKb0IsRUEwSnBCLFFBMUpvQixFQTJKcEIsS0EzSm9CLEVBNEpwQixNQTVKb0IsRUE2SnBCLE9BN0pvQixFQThKcEIsVUE5Sm9CLEVBK0pwQixPQS9Kb0IsRUFnS3BCLFFBaEtvQixFQWlLcEIsUUFqS29CLEVBa0twQixLQWxLb0IsRUFtS3BCLE1BbktvQixFQW9LcEIsTUFwS29CLEVBcUtwQixPQXJLb0IsRUFzS3BCLE9BdEtvQixFQXVLcEIsTUF2S29CLEVBd0twQixRQXhLb0IsRUF5S3BCLE1BektvQixFQTBLcEIsS0ExS29CLENBQXRCO0FBNktBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLGFBRDRCLEVBRTVCLFlBRjRCLEVBRzVCLFFBSDRCLEVBSTVCLHFCQUo0QixFQUs1QixnQkFMNEIsRUFNNUIsZ0JBTjRCLEVBTzVCLE1BUDRCLEVBUTVCLFVBUjRCLEVBUzVCLFFBVDRCLEVBVTVCLE9BVjRCLEVBVzVCLGFBWDRCLEVBWTVCLEtBWjRCLEVBYTVCLE9BYjRCLEVBYzVCLE9BZDRCLEVBZTVCLE1BZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFNBakI0QixFQWtCNUIsUUFsQjRCLEVBbUI1QixvQkFuQjRCLEVBb0I1QixZQXBCNEIsRUFxQjVCLEtBckI0QixFQXNCNUIsUUF0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsVUF6QjRCLEVBMEI1QixRQTFCNEIsRUEyQjVCLE9BM0I0QixDQUE5QjtBQThCQSxJQUFNRSw2QkFBNkIsR0FBRyxDQUFDLFdBQUQsRUFBYyxlQUFkLEVBQStCLE9BQS9CLEVBQXdDLE9BQXhDLEVBQWlELFdBQWpELENBQXRDO0FBRUEsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsWUFGMkIsRUFHM0IsTUFIMkIsRUFJM0IsV0FKMkIsRUFLM0IsaUJBTDJCLEVBTTNCLElBTjJCLEVBTzNCLFlBUDJCLEVBUTNCLFlBUjJCLEVBUzNCLGtCQVQyQixFQVUzQixLQVYyQixDQUE3Qjs7SUFhcUJpRixhOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJL0YsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBUE07QUFRbkJJLDZCQUFxQixFQUFFLENBQUMsR0FBRCxDQVJKO0FBU25CcEIsd0JBQWdCLEVBQUUsQ0FBQyxHQUFELEVBQU0sSUFBTjtBQVRDLE9BQWQsQ0FBUDtBQVdEOzs7O0VBYndDakcsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN04zQztBQUNBO0FBQ0E7QUFFQSxJQUFNeUcsYUFBYSxHQUFHLENBQ3BCLEdBRG9CLEVBRXBCLFlBRm9CLEVBR3BCLE9BSG9CLEVBSXBCLFdBSm9CLEVBS3BCLEtBTG9CLEVBTXBCLE9BTm9CLEVBT3BCLEtBUG9CLEVBUXBCLE9BUm9CLEVBU3BCLElBVG9CLEVBVXBCLEtBVm9CLEVBV3BCLElBWG9CLEVBWXBCLFdBWm9CLEVBYXBCLFFBYm9CLEVBY3BCLEtBZG9CLEVBZXBCLFNBZm9CLEVBZ0JwQixZQWhCb0IsRUFpQnBCLGdCQWpCb0IsRUFrQnBCLFFBbEJvQixFQW1CcEIsV0FuQm9CLEVBb0JwQixPQXBCb0IsRUFxQnBCLE1BckJvQixFQXNCcEIsU0F0Qm9CLEVBdUJwQixNQXZCb0IsRUF3QnBCLE9BeEJvQixFQXlCcEIsU0F6Qm9CLEVBMEJwQixNQTFCb0IsRUEyQnBCLElBM0JvQixFQTRCcEIsTUE1Qm9CLEVBNkJwQixHQTdCb0IsRUE4QnBCLE1BOUJvQixFQStCcEIsU0EvQm9CLEVBZ0NwQixTQWhDb0IsRUFpQ3BCLE1BakNvQixFQWtDcEIsV0FsQ29CLEVBbUNwQixNQW5Db0IsRUFvQ3BCLFdBcENvQixFQXFDcEIsU0FyQ29CLEVBc0NwQixhQXRDb0IsRUF1Q3BCLFdBdkNvQixFQXdDcEIsT0F4Q29CLEVBeUNwQixXQXpDb0IsRUEwQ3BCLE9BMUNvQixFQTJDcEIsT0EzQ29CLEVBNENwQixTQTVDb0IsRUE2Q3BCLFVBN0NvQixFQThDcEIsVUE5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFNBaERvQixFQWlEcEIsU0FqRG9CLEVBa0RwQixTQWxEb0IsRUFtRHBCLFFBbkRvQixFQW9EcEIsV0FwRG9CLEVBcURwQixVQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsU0F2RG9CLEVBd0RwQixVQXhEb0IsRUF5RHBCLGFBekRvQixFQTBEcEIsU0ExRG9CLEVBMkRwQixVQTNEb0IsRUE0RHBCLFNBNURvQixFQTZEcEIsT0E3RG9CLEVBOERwQixPQTlEb0IsRUErRHBCLFFBL0RvQixFQWdFcEIsWUFoRW9CLEVBaUVwQixTQWpFb0IsRUFrRXBCLFNBbEVvQixFQW1FcEIsUUFuRW9CLEVBb0VwQixhQXBFb0IsRUFxRXBCLFVBckVvQixFQXNFcEIsTUF0RW9CLEVBdUVwQixXQXZFb0IsRUF3RXBCLE1BeEVvQixFQXlFcEIsS0F6RW9CLEVBMEVwQixTQTFFb0IsRUEyRXBCLFNBM0VvQixFQTRFcEIsUUE1RW9CLEVBNkVwQixRQTdFb0IsRUE4RXBCLE9BOUVvQixFQStFcEIsTUEvRW9CLEVBZ0ZwQixlQWhGb0IsRUFpRnBCLFdBakZvQixFQWtGcEIsVUFsRm9CLEVBbUZwQixJQW5Gb0IsRUFvRnBCLFFBcEZvQixFQXFGcEIsTUFyRm9CLEVBc0ZwQixVQXRGb0IsRUF1RnBCLFNBdkZvQixFQXdGcEIsT0F4Rm9CLEVBeUZwQixPQXpGb0IsRUEwRnBCLEtBMUZvQixFQTJGcEIsUUEzRm9CLEVBNEZwQixZQTVGb0IsRUE2RnBCLFdBN0ZvQixFQThGcEIsU0E5Rm9CLEVBK0ZwQixRQS9Gb0IsRUFnR3BCLE1BaEdvQixFQWlHcEIsU0FqR29CLEVBa0dwQixVQWxHb0IsRUFtR3BCLFNBbkdvQixFQW9HcEIsT0FwR29CLEVBcUdwQixPQXJHb0IsRUFzR3BCLE9BdEdvQixFQXVHcEIsT0F2R29CLEVBd0dwQixPQXhHb0IsRUF5R3BCLE9BekdvQixFQTBHcEIsS0ExR29CLEVBMkdwQixRQTNHb0IsRUE0R3BCLE9BNUdvQixFQTZHcEIsTUE3R29CLEVBOEdwQixVQTlHb0IsRUErR3BCLFNBL0dvQixFQWdIcEIsTUFoSG9CLEVBaUhwQixPQWpIb0IsRUFrSHBCLE9BbEhvQixFQW1IcEIsTUFuSG9CLEVBb0hwQixNQXBIb0IsRUFxSHBCLFFBckhvQixFQXNIcEIsTUF0SG9CLEVBdUhwQixZQXZIb0IsRUF3SHBCLElBeEhvQixFQXlIcEIsV0F6SG9CLEVBMEhwQixJQTFIb0IsRUEySHBCLFdBM0hvQixFQTRIcEIsT0E1SG9CLEVBNkhwQixTQTdIb0IsRUE4SHBCLFdBOUhvQixFQStIcEIsU0EvSG9CLEVBZ0lwQixVQWhJb0IsRUFpSXBCLGNBaklvQixFQWtJcEIsS0FsSW9CLEVBbUlwQixTQW5Jb0IsRUFvSXBCLFdBcElvQixFQXFJcEIsVUFySW9CLEVBc0lwQixNQXRJb0IsRUF1SXBCLFlBdklvQixFQXdJcEIsSUF4SW9CLEVBeUlwQixXQXpJb0IsRUEwSXBCLE1BMUlvQixFQTJJcEIsVUEzSW9CLEVBNElwQixPQTVJb0IsRUE2SXBCLFNBN0lvQixFQThJcEIsUUE5SW9CLEVBK0lwQixPQS9Jb0IsRUFnSnBCLFNBaEpvQixFQWlKcEIsTUFqSm9CLEVBa0pwQixPQWxKb0IsRUFtSnBCLE9BbkpvQixFQW9KcEIsT0FwSm9CLEVBcUpwQixTQXJKb0IsRUFzSnBCLE9BdEpvQixFQXVKcEIsTUF2Sm9CLEVBd0pwQixNQXhKb0IsRUF5SnBCLEtBekpvQixFQTBKcEIsS0ExSm9CLEVBMkpwQixRQTNKb0IsRUE0SnBCLFFBNUpvQixFQTZKcEIsT0E3Sm9CLEVBOEpwQixLQTlKb0IsRUErSnBCLFFBL0pvQixFQWdLcEIsVUFoS29CLEVBaUtwQixLQWpLb0IsRUFrS3BCLE1BbEtvQixFQW1LcEIsT0FuS29CLEVBb0twQixVQXBLb0IsRUFxS3BCLE1BcktvQixFQXNLcEIsS0F0S29CLEVBdUtwQixVQXZLb0IsRUF3S3BCLFFBeEtvQixFQXlLcEIsU0F6S29CLEVBMEtwQixVQTFLb0IsRUEyS3BCLE9BM0tvQixFQTRLcEIsS0E1S29CLEVBNktwQixTQTdLb0IsRUE4S3BCLFlBOUtvQixFQStLcEIsUUEvS29CLEVBZ0xwQixLQWhMb0IsRUFpTHBCLFFBakxvQixFQWtMcEIsTUFsTG9CLEVBbUxwQixRQW5Mb0IsRUFvTHBCLGFBcExvQixFQXFMcEIsUUFyTG9CLEVBc0xwQixRQXRMb0IsRUF1THBCLFNBdkxvQixFQXdMcEIsU0F4TG9CLEVBeUxwQixhQXpMb0IsRUEwTHBCLGFBMUxvQixFQTJMcEIsYUEzTG9CLEVBNExwQixlQTVMb0IsRUE2THBCLFdBN0xvQixFQThMcEIsUUE5TG9CLEVBK0xwQixRQS9Mb0IsRUFnTXBCLGNBaE1vQixFQWlNcEIsVUFqTW9CLEVBa01wQixXQWxNb0IsRUFtTXBCLFNBbk1vQixFQW9NcEIsSUFwTW9CLEVBcU1wQixLQXJNb0IsRUFzTXBCLElBdE1vQixFQXVNcEIsTUF2TW9CLEVBd01wQixRQXhNb0IsRUF5TXBCLE1Bek1vQixFQTBNcEIsVUExTW9CLEVBMk1wQixRQTNNb0IsRUE0TXBCLFFBNU1vQixFQTZNcEIsU0E3TW9CLEVBOE1wQixPQTlNb0IsRUErTXBCLGNBL01vQixFQWdOcEIsUUFoTm9CLEVBaU5wQixTQWpOb0IsRUFrTnBCLFFBbE5vQixFQW1OcEIsS0FuTm9CLEVBb05wQixVQXBOb0IsRUFxTnBCLFlBck5vQixFQXNOcEIsU0F0Tm9CLEVBdU5wQixpQkF2Tm9CLEVBd05wQixXQXhOb0IsRUF5TnBCLFlBek5vQixFQTBOcEIsUUExTm9CLEVBMk5wQixXQTNOb0IsRUE0TnBCLFFBNU5vQixFQTZOcEIsU0E3Tm9CLEVBOE5wQixNQTlOb0IsRUErTnBCLFdBL05vQixFQWdPcEIsYUFoT29CLEVBaU9wQixXQWpPb0IsRUFrT3BCLFVBbE9vQixFQW1PcEIsV0FuT29CLEVBb09wQixRQXBPb0IsRUFxT3BCLFdBck9vQixFQXNPcEIsT0F0T29CLEVBdU9wQixTQXZPb0IsRUF3T3BCLFdBeE9vQixFQXlPcEIsUUF6T29CLEVBME9wQixPQTFPb0IsRUEyT3BCLE9BM09vQixFQTRPcEIsS0E1T29CLEVBNk9wQixNQTdPb0IsRUE4T3BCLE1BOU9vQixFQStPcEIsUUEvT29CLEVBZ1BwQixLQWhQb0IsRUFpUHBCLFdBalBvQixFQWtQcEIsU0FsUG9CLEVBbVBwQixXQW5Qb0IsRUFvUHBCLEtBcFBvQixFQXFQcEIsV0FyUG9CLEVBc1BwQixRQXRQb0IsRUF1UHBCLFVBdlBvQixFQXdQcEIsY0F4UG9CLEVBeVBwQixRQXpQb0IsRUEwUHBCLFFBMVBvQixFQTJQcEIsV0EzUG9CLEVBNFBwQixTQTVQb0IsRUE2UHBCLFFBN1BvQixFQThQcEIsVUE5UG9CLEVBK1BwQixLQS9Qb0IsRUFnUXBCLE9BaFFvQixFQWlRcEIsUUFqUW9CLEVBa1FwQixTQWxRb0IsRUFtUXBCLFFBblFvQixFQW9RcEIsTUFwUW9CLEVBcVFwQixXQXJRb0IsRUFzUXBCLEtBdFFvQixFQXVRcEIsS0F2UW9CLEVBd1FwQixLQXhRb0IsRUF5UXBCLFFBelFvQixFQTBRcEIsUUExUW9CLEVBMlFwQixTQTNRb0IsRUE0UXBCLE1BNVFvQixFQTZRcEIsVUE3UW9CLEVBOFFwQixVQTlRb0IsRUErUXBCLGNBL1FvQixFQWdScEIsT0FoUm9CLEVBaVJwQixPQWpSb0IsRUFrUnBCLFFBbFJvQixFQW1ScEIsTUFuUm9CLEVBb1JwQixVQXBSb0IsRUFxUnBCLE1BclJvQixFQXNScEIsT0F0Um9CLEVBdVJwQixRQXZSb0IsRUF3UnBCLEtBeFJvQixFQXlScEIsU0F6Um9CLEVBMFJwQixTQTFSb0IsRUEyUnBCLFNBM1JvQixFQTRScEIsU0E1Um9CLEVBNlJwQixVQTdSb0IsRUE4UnBCLFVBOVJvQixFQStScEIsT0EvUm9CLEVBZ1NwQixRQWhTb0IsRUFpU3BCLFFBalNvQixFQWtTcEIsUUFsU29CLEVBbVNwQixRQW5Tb0IsRUFvU3BCLFFBcFNvQixFQXFTcEIsT0FyU29CLEVBc1NwQixhQXRTb0IsRUF1U3BCLGNBdlNvQixFQXdTcEIsZUF4U29CLEVBeVNwQixTQXpTb0IsRUEwU3BCLFlBMVNvQixFQTJTcEIsS0EzU29CLEVBNFNwQixTQTVTb0IsRUE2U3BCLFNBN1NvQixFQThTcEIsU0E5U29CLEVBK1NwQixPQS9Tb0IsRUFnVHBCLEtBaFRvQixFQWlUcEIsS0FqVG9CLEVBa1RwQixNQWxUb0IsRUFtVHBCLE1BblRvQixFQW9UcEIsV0FwVG9CLEVBcVRwQixlQXJUb0IsRUFzVHBCLGVBdFRvQixFQXVUcEIsaUJBdlRvQixFQXdUcEIsaUJBeFRvQixFQXlUcEIsSUF6VG9CLEVBMFRwQixVQTFUb0IsRUEyVHBCLGFBM1RvQixFQTRUcEIsZUE1VG9CLEVBNlRwQixTQTdUb0IsRUE4VHBCLE1BOVRvQixFQStUcEIsU0EvVG9CLEVBZ1VwQixNQWhVb0IsRUFpVXBCLEtBalVvQixFQWtVcEIsS0FsVW9CLEVBbVVwQixLQW5Vb0IsRUFvVXBCLEtBcFVvQixFQXFVcEIsT0FyVW9CLEVBc1VwQixRQXRVb0IsRUF1VXBCLFFBdlVvQixFQXdVcEIsVUF4VW9CLEVBeVVwQixXQXpVb0IsRUEwVXBCLEtBMVVvQixFQTJVcEIsTUEzVW9CLEVBNFVwQixPQTVVb0IsRUE2VXBCLFVBN1VvQixFQThVcEIsUUE5VW9CLEVBK1VwQixPQS9Vb0IsRUFnVnBCLFNBaFZvQixFQWlWcEIsVUFqVm9CLEVBa1ZwQixVQWxWb0IsRUFtVnBCLFVBblZvQixFQW9WcEIsUUFwVm9CLEVBcVZwQixTQXJWb0IsRUFzVnBCLE1BdFZvQixFQXVWcEIsT0F2Vm9CLEVBd1ZwQixNQXhWb0IsRUF5VnBCLFVBelZvQixFQTBWcEIsT0ExVm9CLEVBMlZwQixNQTNWb0IsRUE0VnBCLE1BNVZvQixFQTZWcEIsU0E3Vm9CLEVBOFZwQixPQTlWb0IsRUErVnBCLE1BL1ZvQixFQWdXcEIsTUFoV29CLENBQXRCO0FBbVdBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLGNBRjRCLEVBRzVCLGFBSDRCLEVBSTVCLE9BSjRCLEVBSzVCLFlBTDRCLEVBTTVCLFNBTjRCLEVBTzVCLGFBUDRCLEVBUTVCLFFBUjRCLEVBUzVCLEtBVDRCLEVBVTVCLFFBVjRCLEVBVzVCLFdBWDRCLEVBWTVCLGFBWjRCLEVBYTVCLE1BYjRCLEVBYzVCLFVBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixhQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsT0FsQjRCLEVBbUI1QixNQW5CNEIsRUFvQjVCLFFBcEI0QixFQXFCNUIsVUFyQjRCLEVBc0I1QixRQXRCNEIsRUF1QjVCLG9CQXZCNEIsRUF3QjVCLFlBeEI0QixFQXlCNUIsS0F6QjRCLEVBMEI1QixZQTFCNEIsRUEyQjVCLFFBM0I0QixFQTRCNUIsUUE1QjRCLEVBNkI1QixPQTdCNEIsQ0FBOUI7QUFnQ0EsSUFBTUUsNkJBQTZCLEdBQUcsQ0FBQyxXQUFELEVBQWMsZUFBZCxFQUErQixPQUEvQixFQUF3QyxPQUF4QyxFQUFpRCxXQUFqRCxDQUF0QztBQUVBLElBQU1FLG9CQUFvQixHQUFHLENBQzNCLEtBRDJCLEVBRTNCLGFBRjJCLEVBRzNCLFlBSDJCLEVBSTNCLE1BSjJCLEVBSzNCLEtBTDJCLEVBTTNCLFlBTjJCLEVBTzNCLE1BUDJCLEVBUTNCLFdBUjJCLEVBUzNCLGlCQVQyQixFQVUzQixJQVYyQixFQVczQixhQVgyQixFQVkzQixZQVoyQixFQWEzQixZQWIyQixFQWMzQixrQkFkMkIsRUFlM0IsTUFmMkIsRUFnQjNCLEtBaEIyQixDQUE3Qjs7SUFtQnFCa0YsYzs7Ozs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sSUFBSWhHLHVEQUFKLENBQWM7QUFDbkJnQixxQkFBYSxFQUFiQSxhQURtQjtBQUVuQk4sNkJBQXFCLEVBQXJCQSxxQkFGbUI7QUFHbkJJLDRCQUFvQixFQUFwQkEsb0JBSG1CO0FBSW5CRixxQ0FBNkIsRUFBN0JBLDZCQUptQjtBQUtuQlEsbUJBQVcsRUFBRSxTQUFPLEtBQVAsRUFBYyxJQUFkLEVBQW9CLElBQXBCLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxDQVRKO0FBVW5CcEIsd0JBQWdCLEVBQUUsQ0FBQyxJQUFELENBVkM7QUFXbkJVLHdCQUFnQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCO0FBWEMsT0FBZCxDQUFQO0FBYUQ7OztrQ0FFYTlGLEssRUFBTztBQUNuQixVQUNFQSxLQUFLLENBQUNTLElBQU4sS0FBZUMsd0RBQVUsQ0FBQ0ssa0JBQTFCLElBQ0FmLEtBQUssQ0FBQzZCLEtBQU4sQ0FBWWdDLFdBQVosT0FBOEIsS0FEOUIsSUFFQSxLQUFLakUscUJBQUwsQ0FBMkJpQyxLQUEzQixDQUFpQ2dDLFdBQWpDLE9BQW1ELElBSHJELEVBSUU7QUFDQSxlQUFPO0FBQUVwRCxjQUFJLEVBQUVDLHdEQUFVLENBQUNXLFFBQW5CO0FBQTZCUSxlQUFLLEVBQUU3QixLQUFLLENBQUM2QjtBQUExQyxTQUFQO0FBQ0Q7O0FBQ0QsYUFBTzdCLEtBQVA7QUFDRDs7OztFQTFCeUNiLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVo1QztBQUNBO0FBRUEsSUFBTXlHLGFBQWEsR0FBRyxDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixRQUhvQixFQUlwQixRQUpvQixFQUtwQixLQUxvQixFQU1wQixPQU5vQixFQU9wQixPQVBvQixFQVFwQixXQVJvQixFQVNwQixLQVRvQixFQVVwQixNQVZvQixFQVdwQixPQVhvQixFQVlwQixRQVpvQixFQWFwQixTQWJvQixFQWNwQixTQWRvQixFQWVwQixLQWZvQixFQWdCcEIsS0FoQm9CLEVBaUJwQixPQWpCb0IsRUFrQnBCLElBbEJvQixFQW1CcEIsS0FuQm9CLEVBb0JwQixXQXBCb0IsRUFxQnBCLFlBckJvQixFQXNCcEIsWUF0Qm9CLEVBdUJwQixJQXZCb0IsRUF3QnBCLFFBeEJvQixFQXlCcEIsV0F6Qm9CLEVBMEJwQixlQTFCb0IsRUEyQnBCLFVBM0JvQixFQTRCcEIsUUE1Qm9CLEVBNkJwQixPQTdCb0IsRUE4QnBCLFNBOUJvQixFQStCcEIsUUEvQm9CLEVBZ0NwQixRQWhDb0IsRUFpQ3BCLEtBakNvQixFQWtDcEIsU0FsQ29CLEVBbUNwQixNQW5Db0IsRUFvQ3BCLElBcENvQixFQXFDcEIsT0FyQ29CLEVBc0NwQixNQXRDb0IsRUF1Q3BCLFFBdkNvQixFQXdDcEIsU0F4Q29CLEVBeUNwQixVQXpDb0IsRUEwQ3BCLE1BMUNvQixFQTJDcEIsTUEzQ29CLEVBNENwQixTQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsTUE5Q29CLEVBK0NwQixXQS9Db0IsRUFnRHBCLGlCQWhEb0IsRUFpRHBCLE9BakRvQixFQWtEcEIsWUFsRG9CLEVBbURwQixPQW5Eb0IsRUFvRHBCLE9BcERvQixFQXFEcEIsU0FyRG9CLEVBc0RwQixVQXREb0IsRUF1RHBCLFNBdkRvQixFQXdEcEIsV0F4RG9CLEVBeURwQixRQXpEb0IsRUEwRHBCLFNBMURvQixFQTJEcEIsU0EzRG9CLEVBNERwQixVQTVEb0IsRUE2RHBCLFFBN0RvQixFQThEcEIsV0E5RG9CLEVBK0RwQixjQS9Eb0IsRUFnRXBCLGVBaEVvQixFQWlFcEIsVUFqRW9CLEVBa0VwQixZQWxFb0IsRUFtRXBCLFlBbkVvQixFQW9FcEIsYUFwRW9CLEVBcUVwQixTQXJFb0IsRUFzRXBCLFVBdEVvQixFQXVFcEIsWUF2RW9CLEVBd0VwQixNQXhFb0IsRUF5RXBCLE1BekVvQixFQTBFcEIsUUExRW9CLEVBMkVwQixPQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsTUE3RW9CLEVBOEVwQixTQTlFb0IsRUErRXBCLGlCQS9Fb0IsRUFnRnBCLGNBaEZvQixFQWlGcEIsY0FqRm9CLEVBa0ZwQixnQkFsRm9CLEVBbUZwQixjQW5Gb0IsRUFvRnBCLG1CQXBGb0IsRUFxRnBCLGNBckZvQixFQXNGcEIsUUF0Rm9CLEVBdUZwQixPQXZGb0IsRUF3RnBCLE1BeEZvQixFQXlGcEIsVUF6Rm9CLEVBMEZwQixLQTFGb0IsRUEyRnBCLFlBM0ZvQixFQTRGcEIsS0E1Rm9CLEVBNkZwQixTQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsU0EvRm9CLEVBZ0dwQixVQWhHb0IsRUFpR3BCLFlBakdvQixFQWtHcEIsVUFsR29CLEVBbUdwQixTQW5Hb0IsRUFvR3BCLFFBcEdvQixFQXFHcEIsV0FyR29CLEVBc0dwQixZQXRHb0IsRUF1R3BCLFNBdkdvQixFQXdHcEIsTUF4R29CLEVBeUdwQixRQXpHb0IsRUEwR3BCLFlBMUdvQixFQTJHcEIsU0EzR29CLEVBNEdwQixTQTVHb0IsRUE2R3BCLFVBN0dvQixFQThHcEIsSUE5R29CLEVBK0dwQixVQS9Hb0IsRUFnSHBCLFFBaEhvQixFQWlIcEIsUUFqSG9CLEVBa0hwQixNQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsTUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLFVBdEhvQixFQXVIcEIsV0F2SG9CLEVBd0hwQixLQXhIb0IsRUF5SHBCLE1BekhvQixFQTBIcEIsUUExSG9CLEVBMkhwQixPQTNIb0IsRUE0SHBCLFFBNUhvQixFQTZIcEIsU0E3SG9CLEVBOEhwQixXQTlIb0IsRUErSHBCLFdBL0hvQixFQWdJcEIsU0FoSW9CLEVBaUlwQixRQWpJb0IsRUFrSXBCLFNBbElvQixFQW1JcEIsWUFuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFVBcklvQixFQXNJcEIsU0F0SW9CLEVBdUlwQixPQXZJb0IsRUF3SXBCLFFBeElvQixFQXlJcEIsT0F6SW9CLEVBMElwQixRQTFJb0IsRUEySXBCLE9BM0lvQixFQTRJcEIsT0E1SW9CLEVBNklwQixXQTdJb0IsRUE4SXBCLEtBOUlvQixFQStJcEIsT0EvSW9CLEVBZ0pwQixTQWhKb0IsRUFpSnBCLFNBakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixNQW5Kb0IsRUFvSnBCLE1BcEpvQixFQXFKcEIsVUFySm9CLEVBc0pwQixXQXRKb0IsRUF1SnBCLFdBdkpvQixFQXdKcEIsUUF4Sm9CLEVBeUpwQixPQXpKb0IsRUEwSnBCLFNBMUpvQixFQTJKcEIsVUEzSm9CLEVBNEpwQixPQTVKb0IsRUE2SnBCLFVBN0pvQixFQThKcEIsUUE5Sm9CLEVBK0pwQixTQS9Kb0IsRUFnS3BCLFFBaEtvQixFQWlLcEIsUUFqS29CLEVBa0twQixNQWxLb0IsRUFtS3BCLE1BbktvQixFQW9LcEIsVUFwS29CLEVBcUtwQixJQXJLb0IsRUFzS3BCLE9BdEtvQixFQXVLcEIsV0F2S29CLEVBd0twQixXQXhLb0IsRUF5S3BCLFVBektvQixFQTBLcEIsUUExS29CLEVBMktwQixJQTNLb0IsRUE0S3BCLFNBNUtvQixFQTZLcEIsV0E3S29CLEVBOEtwQixXQTlLb0IsRUErS3BCLE9BL0tvQixFQWdMcEIsU0FoTG9CLEVBaUxwQixTQWpMb0IsRUFrTHBCLFVBbExvQixFQW1McEIsV0FuTG9CLEVBb0xwQixRQXBMb0IsRUFxTHBCLE9BckxvQixFQXNMcEIsT0F0TG9CLEVBdUxwQixPQXZMb0IsRUF3THBCLGFBeExvQixFQXlMcEIsUUF6TG9CLEVBMExwQixTQTFMb0IsRUEyTHBCLEtBM0xvQixFQTRMcEIsU0E1TG9CLEVBNkxwQixXQTdMb0IsRUE4THBCLFVBOUxvQixFQStMcEIsTUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLElBak1vQixFQWtNcEIsUUFsTW9CLEVBbU1wQixXQW5Nb0IsRUFvTXBCLE1BcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixPQXRNb0IsRUF1TXBCLFVBdk1vQixFQXdNcEIsT0F4TW9CLEVBeU1wQixNQXpNb0IsRUEwTXBCLFNBMU1vQixFQTJNcEIsU0EzTW9CLEVBNE1wQixXQTVNb0IsRUE2TXBCLE9BN01vQixFQThNcEIsTUE5TW9CLEVBK01wQixPQS9Nb0IsRUFnTnBCLE1BaE5vQixFQWlOcEIsT0FqTm9CLEVBa05wQixRQWxOb0IsRUFtTnBCLE1Bbk5vQixFQW9OcEIsT0FwTm9CLEVBcU5wQixXQXJOb0IsRUFzTnBCLGdCQXROb0IsRUF1TnBCLFVBdk5vQixFQXdOcEIsTUF4Tm9CLEVBeU5wQixRQXpOb0IsRUEwTnBCLFFBMU5vQixFQTJOcEIsU0EzTm9CLEVBNE5wQixPQTVOb0IsRUE2TnBCLGNBN05vQixFQThOcEIsVUE5Tm9CLEVBK05wQixRQS9Ob0IsRUFnT3BCLFFBaE9vQixFQWlPcEIsVUFqT29CLEVBa09wQixNQWxPb0IsRUFtT3BCLE9Bbk9vQixFQW9PcEIsTUFwT29CLEVBcU9wQixNQXJPb0IsRUFzT3BCLE9BdE9vQixFQXVPcEIsVUF2T29CLEVBd09wQixTQXhPb0IsRUF5T3BCLE9Bek9vQixFQTBPcEIsS0ExT29CLEVBMk9wQixNQTNPb0IsRUE0T3BCLEtBNU9vQixFQTZPcEIsS0E3T29CLEVBOE9wQixNQTlPb0IsRUErT3BCLE1BL09vQixFQWdQcEIsSUFoUG9CLEVBaVBwQixNQWpQb0IsRUFrUHBCLFdBbFBvQixFQW1QcEIsWUFuUG9CLEVBb1BwQixLQXBQb0IsRUFxUHBCLFNBclBvQixFQXNQcEIsUUF0UG9CLEVBdVBwQixTQXZQb0IsRUF3UHBCLFFBeFBvQixFQXlQcEIsTUF6UG9CLEVBMFBwQixRQTFQb0IsRUEyUHBCLE9BM1BvQixFQTRQcEIsU0E1UG9CLEVBNlBwQixRQTdQb0IsRUE4UHBCLElBOVBvQixFQStQcEIsS0EvUG9CLEVBZ1FwQixRQWhRb0IsRUFpUXBCLE1BalFvQixFQWtRcEIsS0FsUW9CLEVBbVFwQixJQW5Rb0IsRUFvUXBCLE1BcFFvQixFQXFRcEIsVUFyUW9CLEVBc1FwQixRQXRRb0IsRUF1UXBCLFNBdlFvQixFQXdRcEIsSUF4UW9CLEVBeVFwQixPQXpRb0IsRUEwUXBCLFlBMVFvQixFQTJRcEIsUUEzUW9CLEVBNFFwQixLQTVRb0IsRUE2UXBCLE9BN1FvQixFQThRcEIsTUE5UW9CLEVBK1FwQixVQS9Rb0IsRUFnUnBCLFNBaFJvQixFQWlScEIsWUFqUm9CLEVBa1JwQixPQWxSb0IsRUFtUnBCLE9BblJvQixFQW9ScEIsVUFwUm9CLEVBcVJwQixRQXJSb0IsRUFzUnBCLFNBdFJvQixFQXVScEIsV0F2Um9CLEVBd1JwQixTQXhSb0IsRUF5UnBCLFVBelJvQixFQTBScEIsU0ExUm9CLEVBMlJwQixPQTNSb0IsRUE0UnBCLFFBNVJvQixFQTZScEIsVUE3Um9CLEVBOFJwQixXQTlSb0IsRUErUnBCLFdBL1JvQixFQWdTcEIsU0FoU29CLEVBaVNwQixVQWpTb0IsRUFrU3BCLFVBbFNvQixFQW1TcEIsU0FuU29CLEVBb1NwQixPQXBTb0IsRUFxU3BCLFlBclNvQixFQXNTcEIsWUF0U29CLEVBdVNwQixXQXZTb0IsRUF3U3BCLFlBeFNvQixFQXlTcEIsU0F6U29CLEVBMFNwQixhQTFTb0IsRUEyU3BCLE9BM1NvQixFQTRTcEIsT0E1U29CLEVBNlNwQixNQTdTb0IsRUE4U3BCLE1BOVNvQixFQStTcEIsVUEvU29CLEVBZ1RwQixTQWhUb0IsRUFpVHBCLFdBalRvQixFQWtUcEIsS0FsVG9CLEVBbVRwQixZQW5Ub0IsRUFvVHBCLGFBcFRvQixFQXFUcEIsU0FyVG9CLEVBc1RwQixTQXRUb0IsRUF1VHBCLFVBdlRvQixFQXdUcEIsU0F4VG9CLEVBeVRwQixRQXpUb0IsRUEwVHBCLFlBMVRvQixFQTJUcEIsU0EzVG9CLEVBNFRwQixTQTVUb0IsRUE2VHBCLE9BN1RvQixFQThUcEIsU0E5VG9CLEVBK1RwQixVQS9Ub0IsRUFnVXBCLFdBaFVvQixFQWlVcEIsU0FqVW9CLEVBa1VwQixRQWxVb0IsRUFtVXBCLE9BblVvQixFQW9VcEIsTUFwVW9CLEVBcVVwQixVQXJVb0IsRUFzVXBCLFFBdFVvQixFQXVVcEIsU0F2VW9CLEVBd1VwQixVQXhVb0IsRUF5VXBCLEtBelVvQixFQTBVcEIsTUExVW9CLEVBMlVwQixNQTNVb0IsRUE0VXBCLFdBNVVvQixFQTZVcEIsUUE3VW9CLEVBOFVwQixTQTlVb0IsRUErVXBCLFFBL1VvQixFQWdWcEIsUUFoVm9CLEVBaVZwQixRQWpWb0IsRUFrVnBCLFVBbFZvQixFQW1WcEIsUUFuVm9CLEVBb1ZwQixVQXBWb0IsRUFxVnBCLFdBclZvQixFQXNWcEIsY0F0Vm9CLEVBdVZwQixRQXZWb0IsRUF3VnBCLFNBeFZvQixFQXlWcEIsY0F6Vm9CLEVBMFZwQixLQTFWb0IsRUEyVnBCLE9BM1ZvQixFQTRWcEIsTUE1Vm9CLEVBNlZwQixPQTdWb0IsRUE4VnBCLE1BOVZvQixFQStWcEIsU0EvVm9CLEVBZ1dwQixRQWhXb0IsRUFpV3BCLE1BaldvQixFQWtXcEIsVUFsV29CLEVBbVdwQixVQW5Xb0IsRUFvV3BCLE1BcFdvQixFQXFXcEIsS0FyV29CLEVBc1dwQixRQXRXb0IsRUF1V3BCLFlBdldvQixFQXdXcEIsT0F4V29CLEVBeVdwQixXQXpXb0IsRUEwV3BCLFlBMVdvQixFQTJXcEIsT0EzV29CLEVBNFdwQixRQTVXb0IsRUE2V3BCLFNBN1dvQixFQThXcEIsUUE5V29CLEVBK1dwQixRQS9Xb0IsRUFnWHBCLE9BaFhvQixFQWlYcEIsY0FqWG9CLEVBa1hwQixXQWxYb0IsRUFtWHBCLFNBblhvQixFQW9YcEIsV0FwWG9CLEVBcVhwQixPQXJYb0IsRUFzWHBCLFFBdFhvQixFQXVYcEIsT0F2WG9CLEVBd1hwQixRQXhYb0IsRUF5WHBCLGFBelhvQixFQTBYcEIsWUExWG9CLEVBMlhwQixNQTNYb0IsRUE0WHBCLFVBNVhvQixFQTZYcEIsV0E3WG9CLEVBOFhwQixNQTlYb0IsRUErWHBCLE1BL1hvQixFQWdZcEIsTUFoWW9CLEVBaVlwQixNQWpZb0IsRUFrWXBCLFdBbFlvQixFQW1ZcEIsSUFuWW9CLEVBb1lwQixVQXBZb0IsRUFxWXBCLGFBcllvQixFQXNZcEIsV0F0WW9CLEVBdVlwQixPQXZZb0IsRUF3WXBCLFNBeFlvQixFQXlZcEIsTUF6WW9CLEVBMFlwQixNQTFZb0IsRUEyWXBCLFVBM1lvQixFQTRZcEIsU0E1WW9CLEVBNllwQixNQTdZb0IsRUE4WXBCLE9BOVlvQixFQStZcEIsU0EvWW9CLEVBZ1pwQixXQWhab0IsRUFpWnBCLGFBalpvQixFQWtacEIsYUFsWm9CLEVBbVpwQixPQW5ab0IsRUFvWnBCLFFBcFpvQixFQXFacEIsU0FyWm9CLEVBc1pwQixVQXRab0IsRUF1WnBCLFVBdlpvQixFQXdacEIsT0F4Wm9CLEVBeVpwQixRQXpab0IsRUEwWnBCLE1BMVpvQixFQTJacEIsT0EzWm9CLEVBNFpwQixRQTVab0IsRUE2WnBCLE9BN1pvQixFQThacEIsVUE5Wm9CLEVBK1pwQixXQS9ab0IsRUFnYXBCLE9BaGFvQixFQWlhcEIsUUFqYW9CLEVBa2FwQixTQWxhb0IsRUFtYXBCLFVBbmFvQixFQW9hcEIsU0FwYW9CLEVBcWFwQixTQXJhb0IsRUFzYXBCLFNBdGFvQixFQXVhcEIsTUF2YW9CLEVBd2FwQixPQXhhb0IsRUF5YXBCLFVBemFvQixFQTBhcEIsTUExYW9CLEVBMmFwQixPQTNhb0IsRUE0YXBCLFlBNWFvQixFQTZhcEIsUUE3YW9CLEVBOGFwQixNQTlhb0IsRUErYXBCLFFBL2FvQixFQWdicEIsU0FoYm9CLEVBaWJwQixNQWpib0IsRUFrYnBCLFNBbGJvQixFQW1icEIsT0FuYm9CLEVBb2JwQixLQXBib0IsRUFxYnBCLGVBcmJvQixFQXNicEIsV0F0Ym9CLEVBdWJwQixZQXZib0IsRUF3YnBCLFdBeGJvQixFQXlicEIsV0F6Ym9CLEVBMGJwQixlQTFib0IsRUEyYnBCLFVBM2JvQixFQTRicEIsT0E1Ym9CLEVBNmJwQixTQTdib0IsRUE4YnBCLGNBOWJvQixFQSticEIsVUEvYm9CLEVBZ2NwQixNQWhjb0IsRUFpY3BCLEtBamNvQixFQWtjcEIsTUFsY29CLENBQXRCO0FBcWNBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLE1BTDRCLEVBTTVCLGFBTjRCLEVBTzVCLEtBUDRCLEVBUTVCLFFBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLE1BVjRCLEVBVzVCLFVBWDRCLEVBWTVCLFFBWjRCLEVBYTVCLGFBYjRCLEVBYzVCLFFBZDRCLEVBZTVCLE9BZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsb0JBbEI0QixFQW1CNUIsWUFuQjRCLEVBb0I1QixLQXBCNEIsRUFxQjVCLFFBckI0QixFQXNCNUIsUUF0QjRCLEVBdUI1QixPQXZCNEIsQ0FBOUI7QUEwQkEsSUFBTUUsNkJBQTZCLEdBQUcsQ0FBQyxXQUFELEVBQWMsZUFBZCxFQUErQixPQUEvQixFQUF3QyxXQUF4QyxDQUF0QztBQUVBLElBQU1FLG9CQUFvQixHQUFHLENBQzNCLEtBRDJCLEVBRTNCLFlBRjJCLEVBRzNCLE1BSDJCLEVBSTNCLFlBSjJCLEVBSzNCLE1BTDJCLEVBTTNCLFdBTjJCLEVBTzNCLGlCQVAyQixFQVEzQixJQVIyQixFQVMzQixZQVQyQixFQVUzQixZQVYyQixFQVczQixrQkFYMkIsRUFZM0IsTUFaMkIsQ0FBN0I7O0lBZXFCbUYsbUI7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUlqRyx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkI7QUFDQVEsbUJBQVcsRUFBRSxTQUFPLElBQVAsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLElBQTdCLENBTk07QUFPbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQVBPO0FBUW5CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FSTTtBQVNuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBVE47QUFVbkJFLDZCQUFxQixFQUFFLEVBVko7QUFXbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FYQztBQVluQkgsaUJBQVMsRUFBRSxDQUNULElBRFMsRUFFVCxJQUZTLEVBR1QsS0FIUyxFQUlULElBSlMsRUFLVCxJQUxTLEVBTVQsS0FOUyxFQU9ULElBUFMsRUFRVCxLQVJTLEVBU1QsSUFUUyxFQVVULE1BVlMsRUFXVCxLQVhTLEVBWVQsSUFaUyxFQWFULEtBYlMsRUFjVCxJQWRTO0FBWlEsT0FBZCxDQUFQO0FBNkJEOzs7O0VBL0I4QzlGLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmZqRDtBQUNBO0FBRUEsSUFBTXlHLGFBQWEsR0FBRyxDQUNwQixRQURvQixFQUVwQixRQUZvQixFQUdwQixnQkFIb0IsRUFJcEIsU0FKb0IsRUFLcEIsT0FMb0IsRUFNcEIsSUFOb0IsRUFPcEIsS0FQb0IsRUFRcEIsZUFSb0IsRUFTcEIsUUFUb0IsRUFVcEIsUUFWb0IsRUFXcEIsY0FYb0IsRUFZcEIsTUFab0IsRUFhcEIsVUFib0IsRUFjcEIsT0Fkb0IsRUFlcEIsTUFmb0IsRUFnQnBCLE9BaEJvQixFQWlCcEIsU0FqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFlBbkJvQixFQW9CcEIsUUFwQm9CLEVBcUJwQixhQXJCb0IsRUFzQnBCLGNBdEJvQixFQXVCcEIsY0F2Qm9CLEVBd0JwQixtQkF4Qm9CLEVBeUJwQixjQXpCb0IsRUEwQnBCLGlCQTFCb0IsRUEyQnBCLFNBM0JvQixFQTRCcEIsWUE1Qm9CLEVBNkJwQixTQTdCb0IsRUE4QnBCLFFBOUJvQixFQStCcEIsT0EvQm9CLEVBZ0NwQixVQWhDb0IsRUFpQ3BCLE1BakNvQixFQWtDcEIsU0FsQ29CLEVBbUNwQixVQW5Db0IsRUFvQ3BCLElBcENvQixFQXFDcEIsTUFyQ29CLEVBc0NwQixhQXRDb0IsRUF1Q3BCLFFBdkNvQixFQXdDcEIsUUF4Q29CLEVBeUNwQixTQXpDb0IsRUEwQ3BCLFlBMUNvQixFQTJDcEIsS0EzQ29CLEVBNENwQixVQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsS0E5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFFBaERvQixFQWlEcEIsTUFqRG9CLEVBa0RwQixlQWxEb0IsRUFtRHBCLGVBbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixNQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsUUF2RG9CLEVBd0RwQixPQXhEb0IsRUF5RHBCLFdBekRvQixFQTBEcEIsTUExRG9CLEVBMkRwQixTQTNEb0IsRUE0RHBCLFdBNURvQixFQTZEcEIsZ0JBN0RvQixFQThEcEIsS0E5RG9CLEVBK0RwQixNQS9Eb0IsRUFnRXBCLEtBaEVvQixFQWlFcEIsTUFqRW9CLEVBa0VwQixPQWxFb0IsRUFtRXBCLFVBbkVvQixFQW9FcEIsVUFwRW9CLEVBcUVwQixTQXJFb0IsRUFzRXBCLFNBdEVvQixFQXVFcEIsS0F2RW9CLEVBd0VwQixPQXhFb0IsRUF5RXBCLEtBekVvQixFQTBFcEIsU0ExRW9CLEVBMkVwQixRQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsSUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsT0FoRm9CLEVBaUZwQixVQWpGb0IsRUFrRnBCLFVBbEZvQixFQW1GcEIsV0FuRm9CLEVBb0ZwQixTQXBGb0IsRUFxRnBCLGFBckZvQixFQXNGcEIsU0F0Rm9CLEVBdUZwQixTQXZGb0IsRUF3RnBCLEtBeEZvQixFQXlGcEIsV0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLFlBM0ZvQixFQTRGcEIsV0E1Rm9CLEVBNkZwQixRQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsY0EvRm9CLEVBZ0dwQixTQWhHb0IsRUFpR3BCLFNBakdvQixFQWtHcEIsUUFsR29CLEVBbUdwQixPQW5Hb0IsRUFvR3BCLEtBcEdvQixFQXFHcEIsTUFyR29CLEVBc0dwQixTQXRHb0IsRUF1R3BCLFNBdkdvQixFQXdHcEIsTUF4R29CLEVBeUdwQixXQXpHb0IsRUEwR3BCLElBMUdvQixFQTJHcEIsS0EzR29CLEVBNEdwQixVQTVHb0IsRUE2R3BCLE1BN0dvQixFQThHcEIsaUJBOUdvQixFQStHcEIsUUEvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLE9BakhvQixFQWtIcEIsU0FsSG9CLEVBbUhwQixRQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsTUFySG9CLEVBc0hwQixTQXRIb0IsRUF1SHBCLFdBdkhvQixFQXdIcEIsU0F4SG9CLEVBeUhwQixVQXpIb0IsRUEwSHBCLGFBMUhvQixFQTJIcEIsTUEzSG9CLEVBNEhwQixRQTVIb0IsRUE2SHBCLFdBN0hvQixFQThIcEIsWUE5SG9CLEVBK0hwQixNQS9Ib0IsRUFnSXBCLE1BaElvQixFQWlJcEIsV0FqSW9CLEVBa0lwQixPQWxJb0IsRUFtSXBCLE1BbklvQixFQW9JcEIsTUFwSW9CLEVBcUlwQixTQXJJb0IsRUFzSXBCLEtBdElvQixFQXVJcEIsZUF2SW9CLEVBd0lwQixnQkF4SW9CLEVBeUlwQixjQXpJb0IsRUEwSXBCLFlBMUlvQixFQTJJcEIsYUEzSW9CLEVBNElwQixVQTVJb0IsRUE2SXBCLFFBN0lvQixFQThJcEIsY0E5SW9CLEVBK0lwQixZQS9Jb0IsRUFnSnBCLGtCQWhKb0IsRUFpSnBCLGNBakpvQixFQWtKcEIsU0FsSm9CLEVBbUpwQixjQW5Kb0IsRUFvSnBCLFNBcEpvQixFQXFKcEIsWUFySm9CLEVBc0pwQixZQXRKb0IsRUF1SnBCLGlCQXZKb0IsRUF3SnBCLFVBeEpvQixFQXlKcEIsWUF6Sm9CLEVBMEpwQixVQTFKb0IsRUEySnBCLFFBM0pvQixFQTRKcEIsWUE1Sm9CLEVBNkpwQixVQTdKb0IsRUE4SnBCLFFBOUpvQixFQStKcEIsVUEvSm9CLEVBZ0twQixzQkFoS29CLEVBaUtwQixLQWpLb0IsRUFrS3BCLGVBbEtvQixFQW1LcEIsZ0JBbktvQixFQW9LcEIsZUFwS29CLEVBcUtwQixtQkFyS29CLEVBc0twQixNQXRLb0IsRUF1S3BCLGNBdktvQixFQXdLcEIsT0F4S29CLEVBeUtwQixVQXpLb0IsRUEwS3BCLFlBMUtvQixFQTJLcEIsYUEzS29CLEVBNEtwQixZQTVLb0IsRUE2S3BCLFdBN0tvQixFQThLcEIsYUE5S29CLEVBK0twQixVQS9Lb0IsRUFnTHBCLFdBaExvQixFQWlMcEIsUUFqTG9CLEVBa0xwQixjQWxMb0IsRUFtTHBCLFlBbkxvQixFQW9McEIsWUFwTG9CLEVBcUxwQixRQXJMb0IsRUFzTHBCLFVBdExvQixFQXVMcEIsTUF2TG9CLEVBd0xwQixrQkF4TG9CLEVBeUxwQixjQXpMb0IsRUEwTHBCLE1BMUxvQixFQTJMcEIsTUEzTG9CLEVBNExwQixVQTVMb0IsRUE2THBCLHNCQTdMb0IsRUE4THBCLFVBOUxvQixFQStMcEIsUUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLFdBak1vQixFQWtNcEIsUUFsTW9CLEVBbU1wQixjQW5Nb0IsRUFvTXBCLFNBcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixZQXRNb0IsRUF1TXBCLFlBdk1vQixFQXdNcEIsZUF4TW9CLEVBeU1wQixZQXpNb0IsRUEwTXBCLGlCQTFNb0IsRUEyTXBCLFVBM01vQixFQTRNcEIsY0E1TW9CLEVBNk1wQixnQkE3TW9CLEVBOE1wQixjQTlNb0IsRUErTXBCLFFBL01vQixFQWdOcEIsTUFoTm9CLEVBaU5wQixRQWpOb0IsRUFrTnBCLE1BbE5vQixFQW1OcEIsS0FuTm9CLENBQXRCO0FBc05BLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLGFBTDRCLEVBTTVCLFFBTjRCLEVBTzVCLE1BUDRCLEVBUTVCLFVBUjRCLEVBUzVCLFFBVDRCLEVBVTVCLGFBVjRCLEVBVzVCLFFBWDRCLEVBWTVCLFdBWjRCLEVBYTVCLEtBYjRCLEVBYzVCLE9BZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsb0JBbEI0QixFQW1CNUIsWUFuQjRCLEVBb0I1QixLQXBCNEIsRUFxQjVCLFdBckI0QixFQXNCNUIsT0F0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsT0F6QjRCLEVBMEI1QixRQTFCNEIsRUEyQjVCLE1BM0I0QixFQTRCNUIsUUE1QjRCLEVBNkI1QixTQTdCNEIsRUE4QjVCLFNBOUI0QixFQStCNUIsU0EvQjRCLEVBZ0M1QixTQWhDNEIsRUFpQzVCLFVBakM0QixFQWtDNUIsYUFsQzRCLEVBbUM1QixRQW5DNEIsRUFvQzVCLFdBcEM0QixFQXFDNUIsWUFyQzRCLEVBc0M1QixNQXRDNEIsRUF1QzVCLE1BdkM0QixFQXdDNUIsV0F4QzRCLEVBeUM1QixPQXpDNEIsRUEwQzVCLE1BMUM0QixFQTJDNUIsTUEzQzRCLEVBNEM1QixTQTVDNEIsRUE2QzVCLEtBN0M0QixFQThDNUIsZUE5QzRCLEVBK0M1QixnQkEvQzRCLEVBZ0Q1QixjQWhENEIsRUFpRDVCLFlBakQ0QixFQWtENUIsYUFsRDRCLEVBbUQ1QixVQW5ENEIsRUFvRDVCLFFBcEQ0QixFQXFENUIsY0FyRDRCLEVBc0Q1QixZQXRENEIsRUF1RDVCLGtCQXZENEIsRUF3RDVCLGNBeEQ0QixFQXlENUIsU0F6RDRCLEVBMEQ1QixjQTFENEIsRUEyRDVCLFNBM0Q0QixFQTRENUIsWUE1RDRCLEVBNkQ1QixZQTdENEIsRUE4RDVCLGlCQTlENEIsRUErRDVCLFVBL0Q0QixFQWdFNUIsWUFoRTRCLEVBaUU1QixVQWpFNEIsRUFrRTVCLFFBbEU0QixFQW1FNUIsWUFuRTRCLEVBb0U1QixVQXBFNEIsRUFxRTVCLFFBckU0QixFQXNFNUIsVUF0RTRCLEVBdUU1QixzQkF2RTRCLEVBd0U1QixLQXhFNEIsRUF5RTVCLGVBekU0QixFQTBFNUIsZ0JBMUU0QixFQTJFNUIsZUEzRTRCLEVBNEU1QixtQkE1RTRCLEVBNkU1QixNQTdFNEIsRUE4RTVCLGNBOUU0QixFQStFNUIsT0EvRTRCLEVBZ0Y1QixVQWhGNEIsRUFpRjVCLFlBakY0QixFQWtGNUIsYUFsRjRCLEVBbUY1QixZQW5GNEIsRUFvRjVCLFdBcEY0QixFQXFGNUIsYUFyRjRCLEVBc0Y1QixVQXRGNEIsRUF1RjVCLFdBdkY0QixFQXdGNUIsUUF4RjRCLEVBeUY1QixjQXpGNEIsRUEwRjVCLFlBMUY0QixFQTJGNUIsWUEzRjRCLEVBNEY1QixRQTVGNEIsRUE2RjVCLFVBN0Y0QixFQThGNUIsTUE5RjRCLEVBK0Y1QixrQkEvRjRCLEVBZ0c1QixjQWhHNEIsRUFpRzVCLE1Bakc0QixFQWtHNUIsTUFsRzRCLEVBbUc1QixVQW5HNEIsRUFvRzVCLHNCQXBHNEIsRUFxRzVCLFVBckc0QixFQXNHNUIsUUF0RzRCLEVBdUc1QixTQXZHNEIsRUF3RzVCLFdBeEc0QixFQXlHNUIsUUF6RzRCLEVBMEc1QixjQTFHNEIsRUEyRzVCLFNBM0c0QixFQTRHNUIsS0E1RzRCLEVBNkc1QixZQTdHNEIsRUE4RzVCLFlBOUc0QixFQStHNUIsZUEvRzRCLEVBZ0g1QixZQWhINEIsRUFpSDVCLGlCQWpINEIsRUFrSDVCLFVBbEg0QixFQW1INUIsY0FuSDRCLEVBb0g1QixnQkFwSDRCLEVBcUg1QixjQXJINEIsQ0FBOUI7QUF3SEEsSUFBTUUsNkJBQTZCLEdBQUcsRUFBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixNQUgyQixFQUkzQixZQUoyQixFQUszQixNQUwyQixFQU0zQixXQU4yQixFQU8zQixpQkFQMkIsRUFRM0IsSUFSMkIsRUFTM0IsYUFUMkIsRUFVM0IsWUFWMkIsRUFXM0IsWUFYMkIsRUFZM0Isa0JBWjJCLEVBYTNCLE1BYjJCLEVBYzNCLFFBZDJCLEVBZTNCLE1BZjJCLEVBZ0IzQixRQWhCMkIsRUFpQjNCLFNBakIyQixFQWtCM0IsU0FsQjJCLEVBbUIzQixTQW5CMkIsRUFvQjNCLFNBcEIyQixFQXFCM0IsVUFyQjJCLEVBc0IzQixhQXRCMkIsQ0FBN0I7O0lBeUJxQm9GLG9COzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJbEcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7OztFQWQrQ2pHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVXbEQ7QUFDQTtBQUNBO0FBRUEsSUFBTXlHLGFBQWEsR0FBRyxDQUNwQixLQURvQixFQUVwQixPQUZvQixFQUdwQixTQUhvQixFQUlwQixTQUpvQixFQUtwQixXQUxvQixFQU1wQixPQU5vQixFQU9wQixJQVBvQixFQVFwQixLQVJvQixFQVNwQixLQVRvQixFQVVwQixTQVZvQixFQVdwQixTQVhvQixFQVlwQixNQVpvQixFQWFwQixNQWJvQixFQWNwQixVQWRvQixFQWVwQixjQWZvQixFQWdCcEIsYUFoQm9CLEVBaUJwQixRQWpCb0IsRUFrQnBCLFNBbEJvQixFQW1CcEIsU0FuQm9CLEVBb0JwQixZQXBCb0IsRUFxQnBCLFVBckJvQixFQXNCcEIsU0F0Qm9CLEVBdUJwQixPQXZCb0IsRUF3QnBCLFdBeEJvQixFQXlCcEIsYUF6Qm9CLEVBMEJwQixjQTFCb0IsRUEyQnBCLG1CQTNCb0IsRUE0QnBCLFVBNUJvQixFQTZCcEIsV0E3Qm9CLEVBOEJwQixVQTlCb0IsRUErQnBCLFVBL0JvQixFQWdDcEIsWUFoQ29CLEVBaUNwQixVQWpDb0IsRUFrQ3BCLFlBbENvQixFQW1DcEIsWUFuQ29CLEVBb0NwQixLQXBDb0IsRUFxQ3BCLE1BckNvQixFQXNDcEIsUUF0Q29CLEVBdUNwQixTQXZDb0IsRUF3Q3BCLFFBeENvQixFQXlDcEIsWUF6Q29CLEVBMENwQixNQTFDb0IsRUEyQ3BCLFVBM0NvQixFQTRDcEIsVUE1Q29CLEVBNkNwQixhQTdDb0IsRUE4Q3BCLEtBOUNvQixFQStDcEIsTUEvQ29CLEVBZ0RwQixNQWhEb0IsRUFpRHBCLFFBakRvQixFQWtEcEIsS0FsRG9CLEVBbURwQixRQW5Eb0IsRUFvRHBCLFNBcERvQixFQXFEcEIsZUFyRG9CLEVBc0RwQixTQXREb0IsRUF1RHBCLFFBdkRvQixFQXdEcEIsYUF4RG9CLEVBeURwQixPQXpEb0IsRUEwRHBCLE9BMURvQixFQTJEcEIsU0EzRG9CLEVBNERwQixXQTVEb0IsRUE2RHBCLGVBN0RvQixFQThEcEIsTUE5RG9CLEVBK0RwQixVQS9Eb0IsRUFnRXBCLGNBaEVvQixFQWlFcEIsYUFqRW9CLEVBa0VwQixhQWxFb0IsRUFtRXBCLE1BbkVvQixFQW9FcEIsT0FwRW9CLEVBcUVwQixJQXJFb0IsRUFzRXBCLFFBdEVvQixFQXVFcEIsSUF2RW9CLEVBd0VwQixRQXhFb0IsRUF5RXBCLFVBekVvQixFQTBFcEIsTUExRW9CLEVBMkVwQixJQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsWUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsU0FoRm9CLEVBaUZwQixPQWpGb0IsRUFrRnBCLE9BbEZvQixFQW1GcEIsTUFuRm9CLEVBb0ZwQixLQXBGb0IsRUFxRnBCLE9BckZvQixFQXNGcEIsS0F0Rm9CLEVBdUZwQixlQXZGb0IsRUF3RnBCLFFBeEZvQixFQXlGcEIsT0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLEtBM0ZvQixFQTRGcEIsT0E1Rm9CLEVBNkZwQixPQTdGb0IsRUE4RnBCLE1BOUZvQixFQStGcEIsUUEvRm9CLEVBZ0dwQixRQWhHb0IsRUFpR3BCLFdBakdvQixFQWtHcEIsV0FsR29CLEVBbUdwQixJQW5Hb0IsRUFvR3BCLE1BcEdvQixFQXFHcEIsVUFyR29CLEVBc0dwQixNQXRHb0IsRUF1R3BCLGNBdkdvQixFQXdHcEIsV0F4R29CLEVBeUdwQixPQXpHb0IsRUEwR3BCLE1BMUdvQixFQTJHcEIsUUEzR29CLEVBNEdwQixRQTVHb0IsRUE2R3BCLE9BN0dvQixFQThHcEIsS0E5R29CLEVBK0dwQixNQS9Hb0IsRUFnSHBCLFFBaEhvQixFQWlIcEIsV0FqSG9CLEVBa0hwQixVQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsUUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLEtBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixRQXhIb0IsRUF5SHBCLFdBekhvQixFQTBIcEIsTUExSG9CLEVBMkhwQixTQTNIb0IsRUE0SHBCLFNBNUhvQixFQTZIcEIsSUE3SG9CLEVBOEhwQixVQTlIb0IsRUErSHBCLFdBL0hvQixFQWdJcEIsTUFoSW9CLEVBaUlwQixVQWpJb0IsRUFrSXBCLE1BbElvQixFQW1JcEIsT0FuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFFBcklvQixFQXNJcEIsZ0JBdElvQixFQXVJcEIsUUF2SW9CLEVBd0lwQixVQXhJb0IsRUF5SXBCLE9BeklvQixFQTBJcEIsV0ExSW9CLEVBMklwQixNQTNJb0IsRUE0SXBCLE1BNUlvQixFQTZJcEIsTUE3SW9CLEVBOElwQixZQTlJb0IsQ0FBdEI7QUFpSkEsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsT0FGNEIsRUFHNUIsY0FINEIsRUFJNUIsZ0JBSjRCLEVBSzVCLGNBTDRCLEVBTTVCLGFBTjRCLEVBTzVCLFlBUDRCLEVBUTVCLGNBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLGVBVjRCLEVBVzVCLE1BWDRCLEVBWTVCLFVBWjRCLEVBYTVCLFFBYjRCLEVBYzVCLGFBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixPQWhCNEIsRUFpQjVCLFNBakI0QixFQWtCNUIsVUFsQjRCLEVBbUI1QixjQW5CNEIsRUFvQjVCLGdCQXBCNEIsRUFxQjVCLE9BckI0QixFQXNCNUIsTUF0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLG9CQXhCNEIsRUF5QjVCLFlBekI0QixFQTBCNUIsS0ExQjRCLEVBMkI1QixlQTNCNEIsRUE0QjVCLFFBNUI0QixFQTZCNUIsT0E3QjRCLEVBOEI1QixRQTlCNEIsRUErQjVCLE9BL0I0QixFQWdDNUIsUUFoQzRCLENBQTlCO0FBbUNBLElBQU1FLDZCQUE2QixHQUFHLENBQ3BDLFlBRG9DLEVBRXBDLFFBRm9DLEVBR3BDLGVBSG9DLEVBSXBDLFdBSm9DLEVBS3BDLFdBTG9DLEVBTXBDLE9BTm9DLENBQXRDO0FBU0EsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsV0FGMkIsRUFHM0IsV0FIMkIsRUFJM0IsUUFKMkIsRUFLM0IsWUFMMkIsRUFNM0IsTUFOMkIsRUFPM0IsaUJBUDJCLEVBUTNCLFlBUjJCLEVBUzNCLE1BVDJCLEVBVTNCLGNBVjJCLEVBVzNCLGdCQVgyQixFQVkzQixXQVoyQixFQWEzQixpQkFiMkIsRUFjM0IsZ0JBZDJCLEVBZTNCLG1CQWYyQixFQWdCM0IseUJBaEIyQixFQWlCM0Isb0JBakIyQixFQWtCM0IsY0FsQjJCLEVBbUIzQix3QkFuQjJCLEVBb0IzQix5QkFwQjJCLEVBcUIzQix3QkFyQjJCLEVBc0IzQixvQkF0QjJCLEVBdUIzQiwwQkF2QjJCLEVBd0IzQix5QkF4QjJCLEVBeUIzQixtQkF6QjJCLEVBMEIzQixJQTFCMkIsRUEyQjNCLGFBM0IyQixFQTRCM0IsWUE1QjJCLEVBNkIzQixZQTdCMkIsRUE4QjNCLGtCQTlCMkIsRUErQjNCLGlCQS9CMkIsRUFnQzNCLFdBaEMyQixFQWlDM0IsTUFqQzJCLEVBa0MzQixLQWxDMkIsQ0FBN0I7O0lBcUNxQnFGLGlCOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJbkcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sS0FBTixDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7O2tDQUVhcEYsSyxFQUFPO0FBQ25CO0FBQ0EsVUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLHdEQUFVLENBQUNLLGtCQUExQixJQUFnRGYsS0FBSyxDQUFDNkIsS0FBTixDQUFZZ0MsV0FBWixPQUE4QixRQUFsRixFQUE0RjtBQUMxRixZQUFNbUgsVUFBVSxHQUFHLEtBQUtDLGNBQUwsRUFBbkI7O0FBQ0EsWUFBSUQsVUFBVSxJQUFJQSxVQUFVLENBQUN2SyxJQUFYLEtBQW9CQyx3REFBVSxDQUFDYSxVQUFqRCxFQUE2RDtBQUMzRDtBQUNBLGlCQUFPO0FBQUVkLGdCQUFJLEVBQUVDLHdEQUFVLENBQUNXLFFBQW5CO0FBQTZCUSxpQkFBSyxFQUFFN0IsS0FBSyxDQUFDNkI7QUFBMUMsV0FBUDtBQUNEO0FBQ0YsT0FSa0IsQ0FVbkI7OztBQUNBLFVBQUk3QixLQUFLLENBQUNTLElBQU4sS0FBZUMsd0RBQVUsQ0FBQ2UsV0FBMUIsSUFBeUN6QixLQUFLLENBQUM2QixLQUFOLENBQVlnQyxXQUFaLE9BQThCLEtBQTNFLEVBQWtGO0FBQ2hGLFlBQU1xSCxTQUFTLEdBQUcsS0FBS2xJLGVBQUwsRUFBbEI7O0FBQ0EsWUFBSWtJLFNBQVMsSUFBSUEsU0FBUyxDQUFDekssSUFBVixLQUFtQkMsd0RBQVUsQ0FBQ21DLFFBQTNDLElBQXVEcUksU0FBUyxDQUFDckosS0FBVixLQUFvQixHQUEvRSxFQUFvRjtBQUNsRjtBQUNBLGlCQUFPO0FBQUVwQixnQkFBSSxFQUFFQyx3REFBVSxDQUFDc0ksSUFBbkI7QUFBeUJuSCxpQkFBSyxFQUFFN0IsS0FBSyxDQUFDNkI7QUFBdEMsV0FBUDtBQUNEO0FBQ0Y7O0FBRUQsYUFBTzdCLEtBQVA7QUFDRDs7OztFQXBDNENiLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE8vQztBQUNBO0FBRUEsSUFBTXlHLGFBQWEsR0FBRyxDQUNwQixZQURvQixFQUVwQixRQUZvQixFQUdwQixTQUhvQixFQUlwQixXQUpvQixFQUtwQixXQUxvQixFQU1wQixLQU5vQixFQU9wQixPQVBvQixFQVFwQixTQVJvQixFQVNwQixTQVRvQixFQVVwQixJQVZvQixFQVdwQixLQVhvQixFQVlwQixZQVpvQixFQWFwQixnQkFib0IsRUFjcEIsUUFkb0IsRUFlcEIsT0Fmb0IsRUFnQnBCLFNBaEJvQixFQWlCcEIsUUFqQm9CLEVBa0JwQixNQWxCb0IsRUFtQnBCLFNBbkJvQixFQW9CcEIsUUFwQm9CLEVBcUJwQixTQXJCb0IsRUFzQnBCLGVBdEJvQixFQXVCcEIsU0F2Qm9CLEVBd0JwQixPQXhCb0IsRUF5QnBCLFVBekJvQixFQTBCcEIsU0ExQm9CLEVBMkJwQixXQTNCb0IsRUE0QnBCLFFBNUJvQixFQTZCcEIsU0E3Qm9CLEVBOEJwQixTQTlCb0IsRUErQnBCLFFBL0JvQixFQWdDcEIsV0FoQ29CLEVBaUNwQixZQWpDb0IsRUFrQ3BCLFlBbENvQixFQW1DcEIsWUFuQ29CLEVBb0NwQixVQXBDb0IsRUFxQ3BCLFNBckNvQixFQXNDcEIsUUF0Q29CLEVBdUNwQixPQXZDb0IsRUF3Q3BCLG1CQXhDb0IsRUF5Q3BCLFVBekNvQixFQTBDcEIsV0ExQ29CLEVBMkNwQixLQTNDb0IsRUE0Q3BCLFVBNUNvQixFQTZDcEIsWUE3Q29CLEVBOENwQixZQTlDb0IsRUErQ3BCLFNBL0NvQixFQWdEcEIsU0FoRG9CLEVBaURwQixTQWpEb0IsRUFrRHBCLFFBbERvQixFQW1EcEIsTUFuRG9CLEVBb0RwQixVQXBEb0IsRUFxRHBCLGVBckRvQixFQXNEcEIsVUF0RG9CLEVBdURwQixhQXZEb0IsRUF3RHBCLEtBeERvQixFQXlEcEIsSUF6RG9CLEVBMERwQixNQTFEb0IsRUEyRHBCLFVBM0RvQixFQTREcEIsV0E1RG9CLEVBNkRwQixTQTdEb0IsRUE4RHBCLE1BOURvQixFQStEcEIsVUEvRG9CLEVBZ0VwQixRQWhFb0IsRUFpRXBCLFNBakVvQixFQWtFcEIsYUFsRW9CLEVBbUVwQixRQW5Fb0IsRUFvRXBCLFNBcEVvQixFQXFFcEIsUUFyRW9CLEVBc0VwQixNQXRFb0IsRUF1RXBCLFNBdkVvQixFQXdFcEIsUUF4RW9CLEVBeUVwQixTQXpFb0IsRUEwRXBCLFVBMUVvQixFQTJFcEIsTUEzRW9CLEVBNEVwQixPQTVFb0IsRUE2RXBCLFFBN0VvQixFQThFcEIsTUE5RW9CLEVBK0VwQixPQS9Fb0IsRUFnRnBCLE9BaEZvQixFQWlGcEIsT0FqRm9CLEVBa0ZwQixLQWxGb0IsRUFtRnBCLE9BbkZvQixFQW9GcEIsU0FwRm9CLEVBcUZwQixNQXJGb0IsRUFzRnBCLFVBdEZvQixFQXVGcEIsVUF2Rm9CLEVBd0ZwQixRQXhGb0IsRUF5RnBCLE9BekZvQixFQTBGcEIsUUExRm9CLEVBMkZwQixjQTNGb0IsRUE0RnBCLE1BNUZvQixFQTZGcEIsZUE3Rm9CLEVBOEZwQixPQTlGb0IsRUErRnBCLE1BL0ZvQixFQWdHcEIsYUFoR29CLEVBaUdwQixhQWpHb0IsRUFrR3BCLFlBbEdvQixFQW1HcEIsSUFuR29CLEVBb0dwQixRQXBHb0IsRUFxR3BCLFFBckdvQixFQXNHcEIsSUF0R29CLEVBdUdwQixPQXZHb0IsRUF3R3BCLFNBeEdvQixFQXlHcEIsUUF6R29CLEVBMEdwQixRQTFHb0IsRUEyR3BCLFdBM0dvQixFQTRHcEIsZUE1R29CLEVBNkdwQixVQTdHb0IsRUE4R3BCLE1BOUdvQixFQStHcEIsU0EvR29CLEVBZ0hwQixJQWhIb0IsRUFpSHBCLFdBakhvQixFQWtIcEIsS0FsSG9CLEVBbUhwQixNQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsZ0JBckhvQixFQXNIcEIsU0F0SG9CLEVBdUhwQixPQXZIb0IsRUF3SHBCLE1BeEhvQixFQXlIcEIsUUF6SG9CLEVBMEhwQixPQTFIb0IsRUEySHBCLE1BM0hvQixFQTRIcEIsT0E1SG9CLEVBNkhwQixNQTdIb0IsRUE4SHBCLE9BOUhvQixFQStIcEIsTUEvSG9CLEVBZ0lwQixjQWhJb0IsRUFpSXBCLE9BaklvQixFQWtJcEIsUUFsSW9CLEVBbUlwQixzQkFuSW9CLEVBb0lwQixhQXBJb0IsRUFxSXBCLGlCQXJJb0IsRUFzSXBCLE9BdElvQixFQXVJcEIsMEJBdklvQixFQXdJcEIsc0JBeElvQixFQXlJcEIsVUF6SW9CLEVBMElwQixzQkExSW9CLEVBMklwQixzQkEzSW9CLEVBNElwQixRQTVJb0IsRUE2SXBCLE9BN0lvQixFQThJcEIsUUE5SW9CLEVBK0lwQixlQS9Jb0IsRUFnSnBCLFVBaEpvQixFQWlKcEIsTUFqSm9CLEVBa0pwQixRQWxKb0IsRUFtSnBCLE9BbkpvQixFQW9KcEIsWUFwSm9CLEVBcUpwQixRQXJKb0IsRUFzSnBCLE9BdEpvQixFQXVKcEIsU0F2Sm9CLEVBd0pwQixLQXhKb0IsRUF5SnBCLE9BekpvQixFQTBKcEIsTUExSm9CLEVBMkpwQixRQTNKb0IsRUE0SnBCLFdBNUpvQixFQTZKcEIsV0E3Sm9CLEVBOEpwQixJQTlKb0IsRUErSnBCLE1BL0pvQixFQWdLcEIsTUFoS29CLEVBaUtwQixVQWpLb0IsRUFrS3BCLFFBbEtvQixFQW1LcEIsWUFuS29CLEVBb0twQixTQXBLb0IsRUFxS3BCLFdBcktvQixFQXNLcEIsTUF0S29CLEVBdUtwQixTQXZLb0IsRUF3S3BCLFdBeEtvQixFQXlLcEIsWUF6S29CLEVBMEtwQixVQTFLb0IsRUEyS3BCLFNBM0tvQixFQTRLcEIsWUE1S29CLEVBNktwQixXQTdLb0IsRUE4S3BCLFNBOUtvQixFQStLcEIsYUEvS29CLEVBZ0xwQixPQWhMb0IsRUFpTHBCLE9BakxvQixFQWtMcEIsT0FsTG9CLEVBbUxwQixhQW5Mb0IsRUFvTHBCLGdCQXBMb0IsRUFxTHBCLFdBckxvQixFQXNMcEIsT0F0TG9CLEVBdUxwQixNQXZMb0IsRUF3THBCLFdBeExvQixFQXlMcEIsWUF6TG9CLEVBMExwQixZQTFMb0IsRUEyTHBCLFFBM0xvQixFQTRMcEIsUUE1TG9CLEVBNkxwQixRQTdMb0IsRUE4THBCLFFBOUxvQixFQStMcEIsWUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLGFBak1vQixFQWtNcEIsT0FsTW9CLEVBbU1wQixTQW5Nb0IsRUFvTXBCLFVBcE1vQixFQXFNcEIsUUFyTW9CLEVBc01wQixTQXRNb0IsRUF1TXBCLFFBdk1vQixFQXdNcEIsT0F4TW9CLEVBeU1wQixVQXpNb0IsRUEwTXBCLEtBMU1vQixFQTJNcEIsTUEzTW9CLEVBNE1wQixZQTVNb0IsRUE2TXBCLFFBN01vQixFQThNcEIsVUE5TW9CLEVBK01wQixXQS9Nb0IsRUFnTnBCLGNBaE5vQixFQWlOcEIsU0FqTm9CLEVBa05wQixPQWxOb0IsRUFtTnBCLE1Bbk5vQixFQW9OcEIsVUFwTm9CLEVBcU5wQixPQXJOb0IsRUFzTnBCLFFBdE5vQixFQXVOcEIsUUF2Tm9CLEVBd05wQixLQXhOb0IsRUF5TnBCLGtCQXpOb0IsRUEwTnBCLGdCQTFOb0IsRUEyTnBCLGlCQTNOb0IsRUE0TnBCLGdCQTVOb0IsRUE2TnBCLG1CQTdOb0IsRUE4TnBCLFdBOU5vQixFQStOcEIscUJBL05vQixFQWdPcEIsYUFoT29CLEVBaU9wQixhQWpPb0IsRUFrT3BCLGdCQWxPb0IsRUFtT3BCLDBCQW5Pb0IsRUFvT3BCLG1CQXBPb0IsRUFxT3BCLGNBck9vQixFQXNPcEIsdUJBdE9vQixFQXVPcEIsa0JBdk9vQixFQXdPcEIsa0JBeE9vQixFQXlPcEIsd0JBek9vQixFQTBPcEIsa0JBMU9vQixFQTJPcEIsY0EzT29CLEVBNE9wQixPQTVPb0IsRUE2T3BCLFVBN09vQixFQThPcEIsUUE5T29CLEVBK09wQixNQS9Pb0IsRUFnUHBCLFNBaFBvQixFQWlQcEIsZUFqUG9CLEVBa1BwQixRQWxQb0IsRUFtUHBCLFNBblBvQixFQW9QcEIsT0FwUG9CLEVBcVBwQixPQXJQb0IsRUFzUHBCLFFBdFBvQixFQXVQcEIsV0F2UG9CLEVBd1BwQixZQXhQb0IsRUF5UHBCLE1BelBvQixFQTBQcEIsSUExUG9CLEVBMlBwQixVQTNQb0IsRUE0UHBCLGVBNVBvQixFQTZQcEIsTUE3UG9CLEVBOFBwQixVQTlQb0IsRUErUHBCLE1BL1BvQixFQWdRcEIsT0FoUW9CLEVBaVFwQixhQWpRb0IsRUFrUXBCLFFBbFFvQixFQW1RcEIsUUFuUW9CLEVBb1FwQixVQXBRb0IsRUFxUXBCLE9BclFvQixFQXNRcEIsS0F0UW9CLEVBdVFwQixPQXZRb0IsRUF3UXBCLFdBeFFvQixFQXlRcEIsTUF6UW9CLEVBMFFwQixNQTFRb0IsRUEyUXBCLE1BM1FvQixFQTRRcEIsT0E1UW9CLEVBNlFwQixZQTdRb0IsQ0FBdEI7QUFnUkEsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsT0FGNEIsRUFHNUIsY0FINEIsRUFJNUIsYUFKNEIsRUFLNUIsTUFMNEIsRUFNNUIsYUFONEIsRUFPNUIsS0FQNEIsRUFRNUIsUUFSNEIsRUFTNUIsYUFUNEIsRUFVNUIsTUFWNEIsRUFXNUIsVUFYNEIsRUFZNUIsSUFaNEIsRUFhNUIsUUFiNEIsRUFjNUIsYUFkNEIsRUFlNUIsUUFmNEIsRUFnQjVCLE9BaEI0QixFQWlCNUIsUUFqQjRCLEVBa0I1QixVQWxCNEIsRUFtQjVCLFFBbkI0QixFQW9CNUIsb0JBcEI0QixFQXFCNUIsWUFyQjRCLEVBc0I1QixLQXRCNEIsRUF1QjVCLFFBdkI0QixFQXdCNUIsUUF4QjRCLEVBeUI1QixPQXpCNEIsQ0FBOUI7QUE0QkEsSUFBTUUsNkJBQTZCLEdBQUcsQ0FBQyxXQUFELEVBQWMsZUFBZCxFQUErQixPQUEvQixFQUF3QyxPQUF4QyxFQUFpRCxXQUFqRCxDQUF0QztBQUVBLElBQU1FLG9CQUFvQixHQUFHLENBQzNCLEtBRDJCLEVBRTNCLGFBRjJCLEVBRzNCLFlBSDJCLEVBSTNCLE1BSjJCLEVBSzNCLFlBTDJCLEVBTTNCLE1BTjJCLEVBTzNCLFdBUDJCLEVBUTNCLGlCQVIyQixFQVMzQixJQVQyQixFQVUzQixhQVYyQixFQVczQixZQVgyQixFQVkzQixZQVoyQixFQWEzQixrQkFiMkIsRUFjM0IsTUFkMkIsRUFlM0IsS0FmMkIsQ0FBN0I7O0lBa0JxQm9GLG9COzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJbEcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sS0FBUCxFQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sS0FBTixDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixDQVRKO0FBVW5CcEIsd0JBQWdCLEVBQUUsQ0FBQyxHQUFELEVBQU0sSUFBTjtBQVZDLE9BQWQsQ0FBUDtBQVlEOzs7O0VBZCtDakcsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDblVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1nTSxVQUFVLEdBQUc7QUFDakJDLEtBQUcsRUFBRVYsK0RBRFk7QUFFakJXLE1BQUksRUFBRVYsZ0VBRlc7QUFHakIsWUFBVUMsaUVBSE87QUFJakJVLE9BQUssRUFBRVYsaUVBSlU7QUFLakJXLFlBQVUsRUFBRVYsc0VBTEs7QUFNakJXLFVBQVEsRUFBRUMsb0VBTk87QUFPakJDLE9BQUssRUFBRVgsb0VBUFU7QUFRakJZLEtBQUcsRUFBRWIsdUVBQW9CQTtBQVJSLENBQW5CO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLElBQU1jLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUMzTCxLQUFELEVBQXFCO0FBQUEsTUFBYmIsR0FBYSx1RUFBUCxFQUFPOztBQUN6QyxNQUFJLE9BQU9hLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsVUFBTSxJQUFJRixLQUFKLENBQVUsa0VBQWlFRSxLQUFqRSxDQUFWLENBQU47QUFDRDs7QUFFRCxNQUFJZCxTQUFTLEdBQUcyTCx1RUFBaEI7O0FBQ0EsTUFBSTFMLEdBQUcsQ0FBQ3lNLFFBQUosS0FBaUJsRCxTQUFyQixFQUFnQztBQUM5QnhKLGFBQVMsR0FBR2dNLFVBQVUsQ0FBQy9MLEdBQUcsQ0FBQ3lNLFFBQUwsQ0FBdEI7QUFDRDs7QUFDRCxNQUFJMU0sU0FBUyxLQUFLd0osU0FBbEIsRUFBNkI7QUFDM0IsVUFBTTVJLEtBQUssb0NBQTZCWCxHQUFHLENBQUN5TSxRQUFqQyxFQUFYO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFJMU0sU0FBSixDQUFjQyxHQUFkLEVBQW1Cd00sTUFBbkIsQ0FBMEIzTCxLQUExQixDQUFQO0FBQ0QsQ0FiTTtBQWVBLElBQU02TCxpQkFBaUIsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVliLFVBQVosQ0FBMUIsQzs7Ozs7Ozs7Ozs7O0FDOUNQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ08sSUFBTWxJLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2dKLEdBQUQ7QUFBQSxTQUFTQSxHQUFHLENBQUMzSixPQUFKLENBQVksU0FBWixFQUF3QixFQUF4QixDQUFUO0FBQUEsQ0FBdEIsQyxDQUVQOztBQUNPLElBQU02QixJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDK0gsR0FBRDtBQUFBLFNBQVNBLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDbkosTUFBSixHQUFhLENBQWQsQ0FBWjtBQUFBLENBQWIsQyxDQUVQOztBQUNPLElBQU15SCxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDMEIsR0FBRDtBQUFBLFNBQVMsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFOLENBQWNGLEdBQWQsQ0FBRCxJQUF1QkEsR0FBRyxDQUFDbkosTUFBSixLQUFlLENBQS9DO0FBQUEsQ0FBaEIsQyxDQUVQOztBQUNPLElBQU0wRixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDOUYsTUFBRDtBQUFBLFNBQVlBLE1BQU0sQ0FBQ0wsT0FBUCxDQUFlLDBCQUFmLEVBQXVDLE1BQXZDLENBQVo7QUFBQSxDQUFyQixDLENBRVA7QUFDQTs7QUFDTyxJQUFNNkcsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDa0QsT0FBRDtBQUFBLFNBQzlCQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUNyQixXQUFPQSxDQUFDLENBQUN6SixNQUFGLEdBQVd3SixDQUFDLENBQUN4SixNQUFiLElBQXVCd0osQ0FBQyxDQUFDRSxhQUFGLENBQWdCRCxDQUFoQixDQUE5QjtBQUNELEdBRkQsQ0FEOEI7QUFBQSxDQUF6QixDIiwiZmlsZSI6InNxbC1mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zcWxGb3JtYXR0ZXIuanNcIik7XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0IEluZGVudGF0aW9uIGZyb20gJy4vSW5kZW50YXRpb24nO1xuaW1wb3J0IElubGluZUJsb2NrIGZyb20gJy4vSW5saW5lQmxvY2snO1xuaW1wb3J0IFBhcmFtcyBmcm9tICcuL1BhcmFtcyc7XG5pbXBvcnQgeyB0cmltU3BhY2VzRW5kIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXR0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnRcbiAgICogIEBwYXJhbSB7Qm9vbGVhbn0gY2ZnLnVwcGVyY2FzZVxuICAgKiAgQHBhcmFtIHtJbnRlZ2VyfSBjZmcubGluZXNCZXR3ZWVuUXVlcmllc1xuICAgKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIHRoaXMuaW5kZW50YXRpb24gPSBuZXcgSW5kZW50YXRpb24odGhpcy5jZmcuaW5kZW50KTtcbiAgICB0aGlzLmlubGluZUJsb2NrID0gbmV3IElubGluZUJsb2NrKCk7XG4gICAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zKHRoaXMuY2ZnLnBhcmFtcyk7XG4gICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB7fTtcbiAgICB0aGlzLnRva2VucyA9IFtdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNRTCBUb2tlbml6ZXIgZm9yIHRoaXMgZm9ybWF0dGVyLCBwcm92aWRlZCBieSBzdWJjbGFzc2VzLlxuICAgKi9cbiAgdG9rZW5pemVyKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9rZW5pemVyKCkgbm90IGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcm9jZXNzIGFuZCBtb2RpZnkgYSB0b2tlbiBiYXNlZCBvbiBwYXJzZWQgY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuIFRoZSB0b2tlbiB0byBtb2RpZnlcbiAgICogIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICogQHJldHVybiB7T2JqZWN0fSBuZXcgdG9rZW4gb3IgdGhlIG9yaWdpbmFsXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICovXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBzdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIG1vZGlmeSB0b2tlbnMgZHVyaW5nIGZvcm1hdHRpbmdcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyB3aGl0ZXNwYWNlIGluIGEgU1FMIHN0cmluZyB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIFNRTCBxdWVyeSBzdHJpbmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgcXVlcnlcbiAgICovXG4gIGZvcm1hdChxdWVyeSkge1xuICAgIHRoaXMudG9rZW5zID0gdGhpcy50b2tlbml6ZXIoKS50b2tlbml6ZShxdWVyeSk7XG4gICAgY29uc3QgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5LnRyaW0oKTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpIHtcbiAgICBsZXQgZm9ybWF0dGVkUXVlcnkgPSAnJztcblxuICAgIHRoaXMudG9rZW5zLmZvckVhY2goKHRva2VuLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5PdmVycmlkZSh0b2tlbik7XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5QTEFDRUhPTERFUikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcsJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q29tbWEodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc6Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnk7XG4gIH1cblxuICBmb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSk7XG4gIH1cblxuICBmb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZSh0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5pbmRlbnRDb21tZW50KHRva2VuLnZhbHVlKSk7XG4gIH1cblxuICBpbmRlbnRDb21tZW50KGNvbW1lbnQpIHtcbiAgICByZXR1cm4gY29tbWVudC5yZXBsYWNlKC9cXG5bIFxcdF0qL2d1LCAnXFxuJyArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCkgKyAnICcpO1xuICB9XG5cbiAgZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcbiAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSArPSB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKSArICcgJztcbiAgfVxuXG4gIC8vIFJlcGxhY2UgYW55IHNlcXVlbmNlIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyB3aXRoIHNpbmdsZSBzcGFjZVxuICBlcXVhbGl6ZVdoaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9cXHMrL2d1LCAnICcpO1xuICB9XG5cbiAgLy8gT3BlbmluZyBwYXJlbnRoZXNlcyBpbmNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsIGFuZCBzdGFydCBhIG5ldyBsaW5lXG4gIGZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICAvLyBUYWtlIG91dCB0aGUgcHJlY2VkaW5nIHNwYWNlIHVubGVzcyB0aGVyZSB3YXMgd2hpdGVzcGFjZSB0aGVyZSBpbiB0aGUgb3JpZ2luYWwgcXVlcnlcbiAgICAvLyBvciBhbm90aGVyIG9wZW5pbmcgcGFyZW5zIG9yIGxpbmUgY29tbWVudFxuICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZUZvciA9IHtcbiAgICAgIFt0b2tlblR5cGVzLk9QRU5fUEFSRU5dOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuTElORV9DT01NRU5UXTogdHJ1ZSxcbiAgICAgIFt0b2tlblR5cGVzLk9QRVJBVE9SXTogdHJ1ZSxcbiAgICB9O1xuICAgIGlmIChcbiAgICAgIHRva2VuLndoaXRlc3BhY2VCZWZvcmUubGVuZ3RoID09PSAwICYmXG4gICAgICAhcHJlc2VydmVXaGl0ZXNwYWNlRm9yW3RoaXMudG9rZW5Mb29rQmVoaW5kKCk/LnR5cGVdXG4gICAgKSB7XG4gICAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpO1xuICAgIH1cbiAgICBxdWVyeSArPSB0aGlzLnNob3codG9rZW4pO1xuXG4gICAgdGhpcy5pbmxpbmVCbG9jay5iZWdpbklmUG9zc2libGUodGhpcy50b2tlbnMsIHRoaXMuaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIENsb3NpbmcgcGFyZW50aGVzZXMgZGVjcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbFxuICBmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmxpbmVCbG9jay5lbmQoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCB0aGlzLmFkZE5ld2xpbmUocXVlcnkpKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRQbGFjZWhvbGRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnBhcmFtcy5nZXQodG9rZW4pICsgJyAnO1xuICB9XG5cbiAgLy8gQ29tbWFzIHN0YXJ0IGEgbmV3IGxpbmUgKHVubGVzcyB3aXRoaW4gaW5saW5lIHBhcmVudGhlc2VzIG9yIFNRTCBcIkxJTUlUXCIgY2xhdXNlKVxuICBmb3JtYXRDb21tYSh0b2tlbiwgcXVlcnkpIHtcbiAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcblxuICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2UgaWYgKC9eTElNSVQkL2l1LnRlc3QodGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4udmFsdWUpKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG4gIH1cblxuICBmb3JtYXRXaXRob3V0U3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbik7XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG4gIH1cblxuICBmb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLnJlc2V0SW5kZW50YXRpb24oKTtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJ1xcbicucmVwZWF0KHRoaXMuY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgfHwgMSk7XG4gIH1cblxuICAvLyBDb252ZXJ0cyB0b2tlbiB0byBzdHJpbmcgKHVwcGVyY2FzaW5nIGl0IGlmIG5lZWRlZClcbiAgc2hvdyh7IHR5cGUsIHZhbHVlIH0pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNmZy51cHBlcmNhc2UgJiZcbiAgICAgICh0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGFkZE5ld2xpbmUocXVlcnkpIHtcbiAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpO1xuICAgIGlmICghcXVlcnkuZW5kc1dpdGgoJ1xcbicpKSB7XG4gICAgICBxdWVyeSArPSAnXFxuJztcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKTtcbiAgfVxuXG4gIHRva2VuTG9va0JlaGluZCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCAtIDFdO1xuICB9XG5cbiAgdG9rZW5Mb29rQWhlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggKyAxXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGFzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gJ3RvcC1sZXZlbCc7XG5jb25zdCBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9ICdibG9jay1sZXZlbCc7XG5cbi8qKlxuICogTWFuYWdlcyBpbmRlbnRhdGlvbiBsZXZlbHMuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBpbmRlbnRhdGlvbiBsZXZlbHM6XG4gKlxuICogLSBCTE9DS19MRVZFTCA6IGluY3JlYXNlZCBieSBvcGVuLXBhcmVudGhlc2lzXG4gKiAtIFRPUF9MRVZFTCA6IGluY3JlYXNlZCBieSBSRVNFUlZFRF9UT1BfTEVWRUwgd29yZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZW50YXRpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGluZGVudCBJbmRlbnQgdmFsdWUsIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZGVudCkge1xuICAgIHRoaXMuaW5kZW50ID0gaW5kZW50IHx8ICcgICc7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBpbmRlbnRhdGlvbiBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdldEluZGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRlbnQucmVwZWF0KHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZVRvcExldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9UT1BfTEVWRUwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKi9cbiAgaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSB0b3AtbGV2ZWwgaW5kZW50LlxuICAgKiBEb2VzIG5vdGhpbmcgd2hlbiB0aGUgcHJldmlvdXMgaW5kZW50IGlzIG5vdCB0b3AtbGV2ZWwuXG4gICAqL1xuICBkZWNyZWFzZVRvcExldmVsKCkge1xuICAgIGlmICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDAgJiYgbGFzdCh0aGlzLmluZGVudFR5cGVzKSA9PT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICogSWYgdGhlcmUgYXJlIHRvcC1sZXZlbCBpbmRlbnRzIHdpdGhpbiB0aGUgYmxvY2stbGV2ZWwgaW5kZW50LFxuICAgKiB0aHJvd3MgYXdheSB0aGVzZSBhcyB3ZWxsLlxuICAgKi9cbiAgZGVjcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHdoaWxlICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEluZGVudGF0aW9uKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcblxuY29uc3QgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVCbG9jayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGV2ZWwgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyBpbmxpbmUgYmxvY2sgd2hlbiBsb29rYWhlYWQgdGhyb3VnaCB1cGNvbWluZyB0b2tlbnMgZGV0ZXJtaW5lc1xuICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAqIEBwYXJhbSAge09iamVjdFtdfSB0b2tlbnMgQXJyYXkgb2YgYWxsIHRva2Vuc1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4IEN1cnJlbnQgdG9rZW4gcG9zaXRpb25cbiAgICovXG4gIGJlZ2luSWZQb3NzaWJsZSh0b2tlbnMsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgdGhpcy5pc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpKSB7XG4gICAgICB0aGlzLmxldmVsID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICB0aGlzLmxldmVsKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICogVGhlcmUgbWlnaHQgYmUgc2V2ZXJhbCBuZXN0ZWQgb25lcy5cbiAgICovXG4gIGVuZCgpIHtcbiAgICB0aGlzLmxldmVsLS07XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSB3aGVuIGluc2lkZSBhbiBpbmxpbmUgYmxvY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgc2hvdWxkIGJlIGFuIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICAvLyBFeGFtcGxlcyBhcmUgXCJOT1coKVwiLCBcIkNPVU5UKCopXCIsIFwiaW50KDEwKVwiLCBrZXkoYHNvbWVjb2x1bW5gKSwgREVDSU1BTCg3LDIpXG4gIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgbGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcblxuICAgICAgLy8gT3ZlcnJhbiBtYXggbGVuZ3RoXG4gICAgICBpZiAobGVuZ3RoID4gSU5MSU5FX01BWF9MRU5HVEgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGxldmVsKys7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAvLyBhcmUgbm90IGFsbG93ZWQgaW5zaWRlIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICBpc0ZvcmJpZGRlblRva2VuKHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNPTU1FTlQgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCB8fFxuICAgICAgdmFsdWUgPT09ICc7J1xuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYW1zIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcGFyYW0gdmFsdWUgdGhhdCBtYXRjaGVzIGdpdmVuIHBsYWNlaG9sZGVyIHdpdGggcGFyYW0ga2V5LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZSBQbGFjZWhvbGRlciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHBhcmFtIG9yIHRva2VuLnZhbHVlIHdoZW4gcGFyYW1zIGFyZSBtaXNzaW5nXG4gICAqL1xuICBnZXQoeyBrZXksIHZhbHVlIH0pIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJhbXNbdGhpcy5pbmRleCsrXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCAqIGFzIHJlZ2V4RmFjdG9yeSBmcm9tICcuL3JlZ2V4RmFjdG9yeSc7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuaXplciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ldyBsaW5lIHNlcGFyYXRlbHlcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZE5ld2xpbmVXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3bGluZVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IFdvcmRzIHRoYXQgYXJlIHRvcCBsZXZlbCBidXQgaGF2ZSBubyBpbmRlbnRhdGlvblxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm9wZW5QYXJlbnMgT3BlbmluZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKCwgW1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmNsb3NlUGFyZW5zIENsb3NpbmcgcGFyZW50aGVzZXMgdG8gZW5hYmxlLCBsaWtlICksIF1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgbmFtZWQgcGxhY2Vob2xkZXJzLCBsaWtlIEAgYW5kIDpcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5saW5lQ29tbWVudFR5cGVzIExpbmUgY29tbWVudHMgdG8gZW5hYmxlLCBsaWtlICMgYW5kIC0tXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBbY2ZnLm9wZXJhdG9yXSBBZGRpdGlvbmFsIG9wZXJhdG9ycyB0byByZWNvZ25pemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuXG4gICAgdGhpcy5PUEVSQVRPUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVPcGVyYXRvclJlZ2V4KFtcbiAgICAgIC4uLihjZmcub3BlcmF0b3JzIHx8IFtdKSxcbiAgICAgICchPScsXG4gICAgICAnPD4nLFxuICAgICAgJz09JyxcbiAgICAgICc8PScsXG4gICAgICAnPj0nLFxuICAgICAgJyE8JyxcbiAgICAgICchPicsXG4gICAgICAnfHwnLFxuICAgICAgJzo9JyxcbiAgICBdKTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZUxpbmVDb21tZW50UmVnZXgoY2ZnLmxpbmVDb21tZW50VHlwZXMpO1xuXG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFdvcmRzKTtcblxuICAgIHRoaXMuV09SRF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1JlZ2V4KGNmZy5zdHJpbmdUeXBlcyk7XG5cbiAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcub3BlblBhcmVucyk7XG4gICAgdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbMC05XSonXG4gICAgKTtcbiAgICB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1thLXpBLVowLTkuXyRdKydcbiAgICApO1xuICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1BhdHRlcm4oY2ZnLnN0cmluZ1R5cGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBTUUwgc3RyaW5nIGFuZCBicmVha3MgaXQgaW50byB0b2tlbnMuXG4gICAqIEVhY2ggdG9rZW4gaXMgYW4gb2JqZWN0IHdpdGggdHlwZSBhbmQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgU1FMIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gdG9rZW5zIEFuIGFycmF5IG9mIHRva2Vucy5cbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlIFByZWNlZGluZyB3aGl0ZXNwYWNlXG4gICAqL1xuICB0b2tlbml6ZShpbnB1dCkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCB0b2tlbjtcblxuICAgIC8vIEtlZXAgcHJvY2Vzc2luZyB0aGUgc3RyaW5nIHVudGlsIGl0IGlzIGVtcHR5XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgLy8gZ3JhYiBhbnkgcHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICAgIGNvbnN0IHdoaXRlc3BhY2VCZWZvcmUgPSB0aGlzLmdldFdoaXRlc3BhY2UoaW5wdXQpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcod2hpdGVzcGFjZUJlZm9yZS5sZW5ndGgpO1xuXG4gICAgICBpZiAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbmV4dCB0b2tlbiBhbmQgdGhlIHRva2VuIHR5cGVcbiAgICAgICAgdG9rZW4gPSB0aGlzLmdldE5leHRUb2tlbihpbnB1dCwgdG9rZW4pO1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcodG9rZW4udmFsdWUubGVuZ3RoKTtcblxuICAgICAgICB0b2tlbnMucHVzaCh7IC4uLnRva2VuLCB3aGl0ZXNwYWNlQmVmb3JlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZ2V0V2hpdGVzcGFjZShpbnB1dCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaCh0aGlzLldISVRFU1BBQ0VfUkVHRVgpO1xuICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnO1xuICB9XG5cbiAgZ2V0TmV4dFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fFxuICAgICAgdGhpcy5nZXRXb3JkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZXJhdG9yVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldENvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpO1xuICB9XG5cbiAgZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5CTE9DS19DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ1Rva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlNUUklORyxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9wZW5QYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRU5fUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkNMT1NFX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PlxuICAgICAgICB0aGlzLmdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleTogdi5zbGljZSgyLCAtMSksIHF1b3RlQ2hhcjogdi5zbGljZSgtMSkgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHsgaW5wdXQsIHJlZ2V4LCBwYXJzZUtleSB9KSB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHJlZ2V4LCB0eXBlOiB0b2tlblR5cGVzLlBMQUNFSE9MREVSIH0pO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXksIHF1b3RlQ2hhciB9KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKCdcXFxcJyArIHF1b3RlQ2hhciksICdndScpLCBxdW90ZUNoYXIpO1xuICB9XG5cbiAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuICBnZXROdW1iZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5OVU1CRVIsXG4gICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICAvLyBQdW5jdHVhdGlvbiBhbmQgc3ltYm9sc1xuICBnZXRPcGVyYXRvclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRVJBVE9SLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFUkFUT1JfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgIC8vIEEgcmVzZXJ2ZWQgd29yZCBjYW5ub3QgYmUgcHJlY2VkZWQgYnkgYSBcIi5cIlxuICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgcHJldmlvdXNUb2tlbi52YWx1ZSAmJiBwcmV2aW91c1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRXb3JkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuV09SRCxcbiAgICAgIHJlZ2V4OiB0aGlzLldPUkRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCB0eXBlLCByZWdleCB9KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHJlZ2V4KTtcblxuICAgIHJldHVybiBtYXRjaGVzID8geyB0eXBlLCB2YWx1ZTogbWF0Y2hlc1sxXSB9IDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVSZWdFeHAsIGlzRW1wdHksIHNvcnRCeUxlbmd0aERlc2MgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcGVyYXRvclJlZ2V4KG11bHRpTGV0dGVyT3BlcmF0b3JzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKCR7c29ydEJ5TGVuZ3RoRGVzYyhtdWx0aUxldHRlck9wZXJhdG9ycykubWFwKGVzY2FwZVJlZ0V4cCkuam9pbignfCcpfXwuKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oKD86JHtsaW5lQ29tbWVudFR5cGVzLm1hcCgoYykgPT4gZXNjYXBlUmVnRXhwKGMpKS5qb2luKCd8Jyl9KS4qPykoPzpcXHJcXG58XFxyfFxcbnwkKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNlcnZlZFdvcmRSZWdleChyZXNlcnZlZFdvcmRzKSB7XG4gIGlmIChyZXNlcnZlZFdvcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeXFxiJGAsICd1Jyk7XG4gIH1cbiAgY29uc3QgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSBzb3J0QnlMZW5ndGhEZXNjKHJlc2VydmVkV29yZHMpLmpvaW4oJ3wnKS5yZXBsYWNlKC8gL2d1LCAnXFxcXHMrJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCR7cmVzZXJ2ZWRXb3Jkc1BhdHRlcm59KVxcXFxiYCwgJ2l1Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkUmVnZXgoc3BlY2lhbENoYXJzID0gW10pIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oW1xcXFxwe0FscGhhYmV0aWN9XFxcXHB7TWFya31cXFxccHtEZWNpbWFsX051bWJlcn1cXFxccHtDb25uZWN0b3JfUHVuY3R1YXRpb259XFxcXHB7Sm9pbl9Db250cm9sfSR7c3BlY2lhbENoYXJzLmpvaW4oXG4gICAgICAnJ1xuICAgICl9XSspYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSArICcpJywgJ3UnKTtcbn1cblxuLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuLy8gMS4gYmFja3RpY2sgcXVvdGVkIHN0cmluZyB1c2luZyBgYCB0byBlc2NhcGVcbi8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuLy8gNC4gc2luZ2xlIHF1b3RlZCBzdHJpbmcgdXNpbmcgJycgb3IgXFwnIHRvIGVzY2FwZVxuLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG4vLyA2LiBVbmljb2RlIHNpbmdsZS1xdW90ZWQgc3RyaW5nIHVzaW5nIFxcJyB0byBlc2NhcGVcbi8vIDcuIFVuaWNvZGUgZG91YmxlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFxcIiB0byBlc2NhcGVcbi8vIDguIFBvc3RncmVTUUwgZG9sbGFyLXF1b3RlZCBzdHJpbmdzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykge1xuICBjb25zdCBwYXR0ZXJucyA9IHtcbiAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgJ3t9JzogJygoXFxcXHtbXlxcXFx9XSooJHxcXFxcfSkpKyknLFxuICAgICdbXSc6ICcoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKScsXG4gICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiTicnXCI6IFwiKChOJ1teTidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15OJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJVJicnXCI6IFwiKChVJidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICAnVSZcIlwiJzogJygoVSZcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgJCQ6ICcoKD88dGFnPlxcXFwkXFxcXHcqXFxcXCQpLio/KD86XFxcXGs8dGFnPnwkKSknLFxuICB9O1xuXG4gIHJldHVybiBzdHJpbmdUeXBlcy5tYXAoKHQpID0+IHBhdHRlcm5zW3RdKS5qb2luKCd8Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJlblJlZ2V4KHBhcmVucykge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnXignICsgcGFyZW5zLm1hcChlc2NhcGVQYXJlbikuam9pbignfCcpICsgJyknLCAnaXUnKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlUGFyZW4ocGFyZW4pIHtcbiAgaWYgKHBhcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIEEgc2luZ2xlIHB1bmN0dWF0aW9uIGNoYXJhY3RlclxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocGFyZW4pO1xuICB9IGVsc2Uge1xuICAgIC8vIGxvbmdlciB3b3JkXG4gICAgcmV0dXJuICdcXFxcYicgKyBwYXJlbiArICdcXFxcYic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgodHlwZXMsIHBhdHRlcm4pIHtcbiAgaWYgKGlzRW1wdHkodHlwZXMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHR5cGVzUmVnZXggPSB0eXBlcy5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8Jyk7XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4oKD86JHt0eXBlc1JlZ2V4fSkoPzoke3BhdHRlcm59KSlgLCAndScpO1xufVxuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV09SRDogJ3dvcmQnLFxuICBTVFJJTkc6ICdzdHJpbmcnLFxuICBSRVNFUlZFRDogJ3Jlc2VydmVkJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMOiAncmVzZXJ2ZWQtdG9wLWxldmVsJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVDogJ3Jlc2VydmVkLXRvcC1sZXZlbC1uby1pbmRlbnQnLFxuICBSRVNFUlZFRF9ORVdMSU5FOiAncmVzZXJ2ZWQtbmV3bGluZScsXG4gIE9QRVJBVE9SOiAnb3BlcmF0b3InLFxuICBPUEVOX1BBUkVOOiAnb3Blbi1wYXJlbicsXG4gIENMT1NFX1BBUkVOOiAnY2xvc2UtcGFyZW4nLFxuICBMSU5FX0NPTU1FTlQ6ICdsaW5lLWNvbW1lbnQnLFxuICBCTE9DS19DT01NRU5UOiAnYmxvY2stY29tbWVudCcsXG4gIE5VTUJFUjogJ251bWJlcicsXG4gIFBMQUNFSE9MREVSOiAncGxhY2Vob2xkZXInLFxufTtcbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUNUSVZBVEUnLFxuICAnQUxJQVMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMTE9XJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUkUnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNTT0NJQVRFJyxcbiAgJ0FTVVRJTUUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVRUUklCVVRFUycsXG4gICdBVURJVCcsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0FVWCcsXG4gICdBVVhJTElBUlknLFxuICAnQVZHJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlVGRkVSUE9PTCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVBUVVJFJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQ1NJRCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09MTElEJyxcbiAgJ0NPTFVNTicsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05DQVQnLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVU5UX0JJRycsXG4gICdDT1ZBUl9QT1AnLFxuICAnQ09WQVJfU0FNUCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX0xDX0NUWVBFJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9TRVJWRVInLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVElNRVpPTkUnLFxuICAnQ1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEUnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFQQVJUSVRJT05OQU1FJyxcbiAgJ0RBVEFQQVJUSVRJT05OVU0nLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdEQjJHRU5FUkFMJyxcbiAgJ0RCMkdFTlJMJyxcbiAgJ0RCMlNRTCcsXG4gICdEQklORk8nLFxuICAnREJQQVJUSVRJT05OQU1FJyxcbiAgJ0RCUEFSVElUSU9OTlVNJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRklOSVRJT04nLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFUkFOSycsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFU0NSSVBUT1InLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESUFHTk9TVElDUycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0FMTE9XJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFNTSVpFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFRElUUFJPQycsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFTkRJTkcnLFxuICAnRVJBU0UnLFxuICAnRVNDQVBFJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFAnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFTkNFRCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFBST0MnLFxuICAnRklMRScsXG4gICdGSUxURVInLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JBUEhJQycsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBU0gnLFxuICAnSEFTSEVEX1ZBTFVFJyxcbiAgJ0hJTlQnLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DTFVTSVZFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNBVE9SUycsXG4gICdJTkYnLFxuICAnSU5GSU5JVFknLFxuICAnSU5IRVJJVCcsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URUdSSVRZJyxcbiAgJ0lOVEVSU0VDVElPTicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lTT0JJRCcsXG4gICdJU09MQVRJT04nLFxuICAnSVRFUkFURScsXG4gICdKQVInLFxuICAnSkFWQScsXG4gICdLRUVQJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xDX0NUWVBFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTktUWVBFJyxcbiAgJ0xOJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMREFURScsXG4gICdMT0NBTEUnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUT1InLFxuICAnTE9DQVRPUlMnLFxuICAnTE9DSycsXG4gICdMT0NLTUFYJyxcbiAgJ0xPQ0tTSVpFJyxcbiAgJ0xPTkcnLFxuICAnTE9PUCcsXG4gICdMT1dFUicsXG4gICdNQUlOVEFJTkVEJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVgnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01FVEhPRCcsXG4gICdNSUNST1NFQ09ORCcsXG4gICdNSUNST1NFQ09ORFMnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVTJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNT05USFMnLFxuICAnTVVMVElTRVQnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05FV19UQUJMRScsXG4gICdORVhUVkFMJyxcbiAgJ05PJyxcbiAgJ05PQ0FDSEUnLFxuICAnTk9DWUNMRScsXG4gICdOT0RFTkFNRScsXG4gICdOT0RFTlVNQkVSJyxcbiAgJ05PTUFYVkFMVUUnLFxuICAnTk9NSU5WQUxVRScsXG4gICdOT05FJyxcbiAgJ05PT1JERVInLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnTlVNUEFSVFMnLFxuICAnT0JJRCcsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0YnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTERfVEFCTEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpBVElPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFEREVEJyxcbiAgJ1BBR0VTSVpFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05FRCcsXG4gICdQQVJUSVRJT05JTkcnLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BJRUNFU0laRScsXG4gICdQTEFOJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BPV0VSJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVZWQUwnLFxuICAnUFJJTUFSWScsXG4gICdQUklRVFknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPR1JBTScsXG4gICdQU0lEJyxcbiAgJ1BVQkxJQycsXG4gICdRVUVSWScsXG4gICdRVUVSWU5PJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ09WRVJZJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVTVUxUJyxcbiAgJ1JFU1VMVF9TRVRfTE9DQVRPUicsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VTkRfQ0VJTElORycsXG4gICdST1VORF9ET1dOJyxcbiAgJ1JPVU5EX0ZMT09SJyxcbiAgJ1JPVU5EX0hBTEZfRE9XTicsXG4gICdST1VORF9IQUxGX0VWRU4nLFxuICAnUk9VTkRfSEFMRl9VUCcsXG4gICdST1VORF9VUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVycsXG4gICdST1dOVU1CRVInLFxuICAnUk9XUycsXG4gICdST1dTRVQnLFxuICAnUk9XX05VTUJFUicsXG4gICdSUk4nLFxuICAnUlVOJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NPUEUnLFxuICAnU0NSQVRDSFBBRCcsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNPTkRTJyxcbiAgJ1NFQ1FUWScsXG4gICdTRUNVUklUWScsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lHTkFMJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQU4nLFxuICAnU09NRScsXG4gICdTT1VSQ0UnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1BFQ0lGSUNUWVBFJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMSUQnLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUVJUJyxcbiAgJ1NUQUNLRUQnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJQycsXG4gICdTVEFUTUVOVCcsXG4gICdTVEFZJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1RPR1JPVVAnLFxuICAnU1RPUkVTJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVU0nLFxuICAnU1VNTUFSWScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lOT05ZTScsXG4gICdTWVNGVU4nLFxuICAnU1lTSUJNJyxcbiAgJ1NZU1BST0MnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0xBVEUnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VORE8nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOVElMJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURQUk9DJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOVCcsXG4gICdWQVJZSU5HJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkNBVCcsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVk9MQVRJTEUnLFxuICAnVk9MVU1FUycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXTE0nLFxuICAnV1JJVEUnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdZRUFSJyxcbiAgJ1lFQVJTJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERiMkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklOQVJZJyxcbiAgJ0JPT0xFQU4nLFxuICAnQlJFQUsnLFxuICAnQlVDS0VUJyxcbiAgJ0JVSUxEJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NMVVNURVInLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUSU9OJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPUlJFTEFURScsXG4gICdDT1ZFUicsXG4gICdDUkVBVEUnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQVNFVCcsXG4gICdEQVRBU1RPUkUnLFxuICAnREVDTEFSRScsXG4gICdERUNSRU1FTlQnLFxuICAnREVMRVRFJyxcbiAgJ0RFUklWRUQnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdEUk9QJyxcbiAgJ0VBQ0gnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhDTFVERScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1NJJyxcbiAgJ0hBVklORycsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5GRVInLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tFWVNQQUNFJyxcbiAgJ0tOT1dOJyxcbiAgJ0xBU1QnLFxuICAnTEVGVCcsXG4gICdMRVQnLFxuICAnTEVUVElORycsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xTTScsXG4gICdNQVAnLFxuICAnTUFQUElORycsXG4gICdNQVRDSEVEJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNRVJHRScsXG4gICdNSVNTSU5HJyxcbiAgJ05BTUVTUEFDRScsXG4gICdORVNUJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTUJFUicsXG4gICdPQkpFQ1QnLFxuICAnT0ZGU0VUJyxcbiAgJ09OJyxcbiAgJ09QVElPTicsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ1BBUlNFJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BPT0wnLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVZBVEUnLFxuICAnUFJJVklMRUdFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFXJyxcbiAgJ1JFQUxNJyxcbiAgJ1JFRFVDRScsXG4gICdSRU5BTUUnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdTQVRJU0ZJRVMnLFxuICAnU0NIRU1BJyxcbiAgJ1NFTEVDVCcsXG4gICdTRUxGJyxcbiAgJ1NFTUknLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU09NRScsXG4gICdTVEFSVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ1NUUklORycsXG4gICdTWVNURU0nLFxuICAnVEhFTicsXG4gICdUTycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVU5ERVInLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOU0VUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMVUUnLFxuICAnVkFMVUVEJyxcbiAgJ1ZBTFVFUycsXG4gICdWSUEnLFxuICAnVklFVycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dPUksnLFxuICAnWE9SJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCBBTEwnLFxuICAnRVhDRVBUJyxcbiAgJ0VYUExBSU4gREVMRVRFIEZST00nLFxuICAnRVhQTEFJTiBVUERBVEUnLFxuICAnRVhQTEFJTiBVUFNFUlQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5GRVInLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTEVUJyxcbiAgJ0xJTUlUJyxcbiAgJ01FUkdFJyxcbiAgJ05FU1QnLFxuICAnT1JERVIgQlknLFxuICAnUFJFUEFSRScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRSBLRVlTJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOMXFsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnWycsICd7J10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ10nLCAnfSddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnIycsICctLSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi4vY29yZS90b2tlblR5cGVzJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0EnLFxuICAnQUNDRVNTSUJMRScsXG4gICdBR0VOVCcsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVQnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhJRCcsXG4gICdBVkcnLFxuICAnQkVUV0VFTicsXG4gICdCRklMRV9CQVNFJyxcbiAgJ0JJTkFSWV9JTlRFR0VSJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CX0JBU0UnLFxuICAnQkxPQ0snLFxuICAnQk9EWScsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQk9VTkQnLFxuICAnQlJFQURUSCcsXG4gICdCVUxLJyxcbiAgJ0JZJyxcbiAgJ0JZVEUnLFxuICAnQycsXG4gICdDQUxMJyxcbiAgJ0NBTExJTkcnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQVJfQkFTRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSU0VUJyxcbiAgJ0NIQVJTRVRGT1JNJyxcbiAgJ0NIQVJTRVRJRCcsXG4gICdDSEVDSycsXG4gICdDTE9CX0JBU0UnLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDTFVTVEVSUycsXG4gICdDT0FMRVNDRScsXG4gICdDT0xBVVRIJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUElMRUQnLFxuICAnQ09NUFJFU1MnLFxuICAnQ09OTkVDVCcsXG4gICdDT05TVEFOVCcsXG4gICdDT05TVFJVQ1RPUicsXG4gICdDT05URVhUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09VTlQnLFxuICAnQ1JBU0gnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUwnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSVkFMJyxcbiAgJ0NVUlNPUicsXG4gICdDVVNUT01EQVRVTScsXG4gICdEQU5HTElORycsXG4gICdEQVRBJyxcbiAgJ0RBVEVfQkFTRScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdERUNJTUFMJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGSU5FJyxcbiAgJ0RFTEVURScsXG4gICdERVBUSCcsXG4gICdERVNDJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElSRUNUT1JZJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVUkFUSU9OJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTSUYnLFxuICAnRU1QVFknLFxuICAnRU5EJyxcbiAgJ0VTQ0FQRScsXG4gICdFWENFUFRJT05TJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYVEVORFMnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTE9BVCcsXG4gICdGT1InLFxuICAnRk9SQUxMJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBU0gnLFxuICAnSEVBUCcsXG4gICdISURERU4nLFxuICAnSE9VUicsXG4gICdJREVOVElGSUVEJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNFUycsXG4gICdJTkZJTklURScsXG4gICdJTlNUQU5USUFCTEUnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJGQUNFJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WQUxJREFURScsXG4gICdJUycsXG4gICdJU09MQVRJT04nLFxuICAnSkFWQScsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFTkdUSCcsXG4gICdMRVZFTCcsXG4gICdMSUJSQVJZJyxcbiAgJ0xJS0UnLFxuICAnTElLRTInLFxuICAnTElLRTQnLFxuICAnTElLRUMnLFxuICAnTElNSVRFRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTUFQJyxcbiAgJ01BWCcsXG4gICdNQVhMRU4nLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUxTTEFCRUwnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTVVMVElTRVQnLFxuICAnTkFNRScsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUSVZFJyxcbiAgJ05BVFVSQUwnLFxuICAnTkFUVVJBTE4nLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFRWQUwnLFxuICAnTk9DT01QUkVTUycsXG4gICdOT0NPUFknLFxuICAnTk9UJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1CRVJfQkFTRScsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09DSUNPTEwnLFxuICAnT0NJREFURScsXG4gICdPQ0lEQVRFVElNRScsXG4gICdPQ0lEVVJBVElPTicsXG4gICdPQ0lJTlRFUlZBTCcsXG4gICdPQ0lMT0JMT0NBVE9SJyxcbiAgJ09DSU5VTUJFUicsXG4gICdPQ0lSQVcnLFxuICAnT0NJUkVGJyxcbiAgJ09DSVJFRkNVUlNPUicsXG4gICdPQ0lST1dJRCcsXG4gICdPQ0lTVFJJTkcnLFxuICAnT0NJVFlQRScsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEFRVUUnLFxuICAnT1BFTicsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1JBQ0xFJyxcbiAgJ09SQURBVEEnLFxuICAnT1JERVInLFxuICAnT1JHQU5JWkFUSU9OJyxcbiAgJ09STEFOWScsXG4gICdPUkxWQVJZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBUkFMTEVMX0VOQUJMRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSQU1FVEVSUycsXG4gICdQQVJFTlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU0NBTCcsXG4gICdQQ1RGUkVFJyxcbiAgJ1BJUEUnLFxuICAnUElQRUxJTkVEJyxcbiAgJ1BMU19JTlRFR0VSJyxcbiAgJ1BMVUdHQUJMRScsXG4gICdQT1NJVElWRScsXG4gICdQT1NJVElWRU4nLFxuICAnUFJBR01BJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklPUicsXG4gICdQUklWQVRFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFJU0UnLFxuICAnUkFOR0UnLFxuICAnUkFXJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUNPUkQnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTElFU19PTicsXG4gICdSRU0nLFxuICAnUkVNQUlOREVSJyxcbiAgJ1JFTkFNRScsXG4gICdSRVNPVVJDRScsXG4gICdSRVNVTFRfQ0FDSEUnLFxuICAnUkVTVUxUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWRVJTRScsXG4gICdSRVZPS0UnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9XJyxcbiAgJ1JPV0lEJyxcbiAgJ1JPV05VTScsXG4gICdST1dUWVBFJyxcbiAgJ1NBTVBMRScsXG4gICdTQVZFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQjEnLFxuICAnU0IyJyxcbiAgJ1NCNCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFR01FTlQnLFxuICAnU0VMRicsXG4gICdTRVBBUkFURScsXG4gICdTRVFVRU5DRScsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0hBUkUnLFxuICAnU0hPUlQnLFxuICAnU0laRV9UJyxcbiAgJ1NJWkUnLFxuICAnU01BTExJTlQnLFxuICAnU09NRScsXG4gICdTUEFDRScsXG4gICdTUEFSU0UnLFxuICAnU1FMJyxcbiAgJ1NRTENPREUnLFxuICAnU1FMREFUQScsXG4gICdTUUxFUlJNJyxcbiAgJ1NRTE5BTUUnLFxuICAnU1FMU1RBVEUnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBVElDJyxcbiAgJ1NURERFVicsXG4gICdTVE9SRUQnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJQQVJUSVRJT04nLFxuICAnU1VCU1RJVFVUQUJMRScsXG4gICdTVUJUWVBFJyxcbiAgJ1NVQ0NFU1NGVUwnLFxuICAnU1VNJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTREFURScsXG4gICdUQUJBVVRIJyxcbiAgJ1RBQkxFJyxcbiAgJ1RETycsXG4gICdUSEUnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9BQkJSJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RJTUVaT05FX1JFR0lPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVUIxJyxcbiAgJ1VCMicsXG4gICdVQjQnLFxuICAnVUlEJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSVFVRScsXG4gICdVTlBMVUcnLFxuICAnVU5TSUdORUQnLFxuICAnVU5UUlVTVEVEJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElTVCcsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVIyJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTkNFJyxcbiAgJ1ZBUlJBWScsXG4gICdWQVJZSU5HJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9JRCcsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFRCcsXG4gICdXUklURScsXG4gICdZRUFSJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdCRUdJTicsXG4gICdDT05ORUNUIEJZJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVMRVRFIEZST00nLFxuICAnREVMRVRFJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdMT09QJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1NUQVJUIFdJVEgnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnXycsICckJywgJyMnLCAnLicsICdAJ10sXG4gICAgfSk7XG4gIH1cblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgaWYgKFxuICAgICAgdG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgJiZcbiAgICAgIHRva2VuLnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdTRVQnICYmXG4gICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbi52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnQlknXG4gICAgKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJPUlQnLFxuICAnQUJTT0xVVEUnLFxuICAnQUNDRVNTJyxcbiAgJ0FDVElPTicsXG4gICdBREQnLFxuICAnQURNSU4nLFxuICAnQUZURVInLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFNPJyxcbiAgJ0FMVEVSJyxcbiAgJ0FMV0FZUycsXG4gICdBTkFMWVNFJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNTRVJUSU9OJyxcbiAgJ0FTU0lHTk1FTlQnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVFRBQ0gnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1dBUkQnLFxuICAnQkVGT1JFJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCSVQnLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBQ0hFJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTQ0FERUQnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NBVEFMT0cnLFxuICAnQ0hBSU4nLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSSVNUSUNTJyxcbiAgJ0NIRUNLJyxcbiAgJ0NIRUNLUE9JTlQnLFxuICAnQ0xBU1MnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1FTlRTJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09OQ1VSUkVOVExZJyxcbiAgJ0NPTkZJR1VSQVRJT04nLFxuICAnQ09ORkxJQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlNUUkFJTlRTJyxcbiAgJ0NPTlRFTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSU0lPTicsXG4gICdDT1BZJyxcbiAgJ0NPU1QnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NTVicsXG4gICdDVUJFJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFUQScsXG4gICdEQVRBQkFTRScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGQVVMVFMnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZFUlJFRCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEVURScsXG4gICdERUxJTUlURVInLFxuICAnREVMSU1JVEVSUycsXG4gICdERVBFTkRTJyxcbiAgJ0RFU0MnLFxuICAnREVUQUNIJyxcbiAgJ0RJQ1RJT05BUlknLFxuICAnRElTQUJMRScsXG4gICdESVNDQVJEJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPQ1VNRU5UJyxcbiAgJ0RPTUFJTicsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMU0UnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFTkQnLFxuICAnRU5VTScsXG4gICdFU0NBUEUnLFxuICAnRVZFTlQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhDTFVESU5HJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUFJFU1NJT04nLFxuICAnRVhURU5TSU9OJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkFNSUxZJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJTFRFUicsXG4gICdGSVJTVCcsXG4gICdGTE9BVCcsXG4gICdGT0xMT1dJTkcnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRk9SV0FSRCcsXG4gICdGUkVFWkUnLFxuICAnRlJPTScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVTkNUSU9OUycsXG4gICdHRU5FUkFURUQnLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQU5URUQnLFxuICAnR1JFQVRFU1QnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnR1JPVVBTJyxcbiAgJ0hBTkRMRVInLFxuICAnSEFWSU5HJyxcbiAgJ0hFQURFUicsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJVFknLFxuICAnSUYnLFxuICAnSUxJS0UnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lNTVVUQUJMRScsXG4gICdJTVBMSUNJVCcsXG4gICdJTVBPUlQnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5IRVJJVCcsXG4gICdJTkhFUklUUycsXG4gICdJTklUSUFMTFknLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOUFVUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlNURUFEJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVk9LRVInLFxuICAnSVMnLFxuICAnSVNOVUxMJyxcbiAgJ0lTT0xBVElPTicsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVNUJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUFLUFJPT0YnLFxuICAnTEVBU1QnLFxuICAnTEVGVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJU1RFTicsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NBVElPTicsXG4gICdMT0NLJyxcbiAgJ0xPQ0tFRCcsXG4gICdMT0dHRUQnLFxuICAnTUFQUElORycsXG4gICdNQVRDSCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVUSE9EJyxcbiAgJ01JTlVURScsXG4gICdNSU5WQUxVRScsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01PVkUnLFxuICAnTkFNRScsXG4gICdOQU1FUycsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUJyxcbiAgJ05GQycsXG4gICdORkQnLFxuICAnTkZLQycsXG4gICdORktEJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05PVEhJTkcnLFxuICAnTk9USUZZJyxcbiAgJ05PVE5VTEwnLFxuICAnTk9XQUlUJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnT0JKRUNUJyxcbiAgJ09GJyxcbiAgJ09GRicsXG4gICdPRkZTRVQnLFxuICAnT0lEUycsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OUycsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPUkRJTkFMSVRZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnT1dORUQnLFxuICAnT1dORVInLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSU0VSJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NJTkcnLFxuICAnUEFTU1dPUkQnLFxuICAnUExBQ0lORycsXG4gICdQTEFOUycsXG4gICdQT0xJQ1knLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVBBUkVEJyxcbiAgJ1BSRVNFUlZFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJT1InLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkFMJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRURVUkVTJyxcbiAgJ1BST0dSQU0nLFxuICAnUFVCTElDQVRJT04nLFxuICAnUVVPVEUnLFxuICAnUkFOR0UnLFxuICAnUkVBRCcsXG4gICdSRUFMJyxcbiAgJ1JFQVNTSUdOJyxcbiAgJ1JFQ0hFQ0snLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFRlJFU0gnLFxuICAnUkVJTkRFWCcsXG4gICdSRUxBVElWRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVRBQkxFJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVQTElDQScsXG4gICdSRVNFVCcsXG4gICdSRVNUQVJUJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVVRJTkVTJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JVTEUnLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NDSEVNQScsXG4gICdTQ0hFTUFTJyxcbiAgJ1NDUk9MTCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVFVRU5DRScsXG4gICdTRVFVRU5DRVMnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFUlZFUicsXG4gICdTRVNTSU9OJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0VUT0YnLFxuICAnU0VUUycsXG4gICdTSEFSRScsXG4gICdTSE9XJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NLSVAnLFxuICAnU01BTExJTlQnLFxuICAnU05BUFNIT1QnLFxuICAnU09NRScsXG4gICdTUUwnLFxuICAnU1RBQkxFJyxcbiAgJ1NUQU5EQUxPTkUnLFxuICAnU1RBUlQnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RESU4nLFxuICAnU1RET1VUJyxcbiAgJ1NUT1JBR0UnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklDVCcsXG4gICdTVFJJUCcsXG4gICdTVUJTQ1JJUFRJT04nLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVUFBPUlQnLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZU0lEJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnVEFCTEVTUEFDRScsXG4gICdURU1QJyxcbiAgJ1RFTVBMQVRFJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVhUJyxcbiAgJ1RIRU4nLFxuICAnVElFUycsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VFU0NBUEUnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOQ09NTUlUVEVEJyxcbiAgJ1VORU5DUllQVEVEJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTElTVEVOJyxcbiAgJ1VOTE9HR0VEJyxcbiAgJ1VOVElMJyxcbiAgJ1VQREFURScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBQ1VVTScsXG4gICdWQUxJRCcsXG4gICdWQUxJREFURScsXG4gICdWQUxJREFUT1InLFxuICAnVkFMVUUnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFESUMnLFxuICAnVkFSWUlORycsXG4gICdWRVJCT1NFJyxcbiAgJ1ZFUlNJT04nLFxuICAnVklFVycsXG4gICdWSUVXUycsXG4gICdWT0xBVElMRScsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISVRFU1BBQ0UnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dJVEhPVVQnLFxuICAnV09SSycsXG4gICdXUkFQUEVSJyxcbiAgJ1dSSVRFJyxcbiAgJ1hNTCcsXG4gICdYTUxBVFRSSUJVVEVTJyxcbiAgJ1hNTENPTkNBVCcsXG4gICdYTUxFTEVNRU5UJyxcbiAgJ1hNTEVYSVNUUycsXG4gICdYTUxGT1JFU1QnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdYTUxQQVJTRScsXG4gICdYTUxQSScsXG4gICdYTUxST09UJyxcbiAgJ1hNTFNFUklBTElaRScsXG4gICdYTUxUQUJMRScsXG4gICdZRUFSJyxcbiAgJ1lFUycsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0Z3JlU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgLy8gVE9ETzogc3VwcG9ydCAkJCBkb2xsYXItcXVvdGVkIHN0cmluZ3MgJCRcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsIFwiVSYnJ1wiLCAnVSZcIlwiJywgJyQkJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJzw8JyxcbiAgICAgICAgJz4+JyxcbiAgICAgICAgJ3x8LycsXG4gICAgICAgICd8LycsXG4gICAgICAgICc6OicsXG4gICAgICAgICctPj4nLFxuICAgICAgICAnLT4nLFxuICAgICAgICAnfn4qJyxcbiAgICAgICAgJ35+JyxcbiAgICAgICAgJyF+fionLFxuICAgICAgICAnIX5+JyxcbiAgICAgICAgJ34qJyxcbiAgICAgICAgJyF+KicsXG4gICAgICAgICchficsXG4gICAgICBdLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUVTMTI4JyxcbiAgJ0FFUzI1NicsXG4gICdBTExPV09WRVJXUklURScsXG4gICdBTkFMWVNFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0JBQ0tVUCcsXG4gICdCSU5BUlknLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JPVEgnLFxuICAnQllURURJQ1QnLFxuICAnQlpJUDInLFxuICAnQ0FTVCcsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJSRU5UX1VTRVJfSUQnLFxuICAnREVGQVVMVCcsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkxBVEUnLFxuICAnREVGUkFHJyxcbiAgJ0RFTFRBJyxcbiAgJ0RFTFRBMzJLJyxcbiAgJ0RFU0MnLFxuICAnRElTQUJMRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdFTFNFJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPREUnLFxuICAnRU5DUllQVCcsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFWFBMSUNJVCcsXG4gICdGQUxTRScsXG4gICdGT1InLFxuICAnRk9SRUlHTicsXG4gICdGUkVFWkUnLFxuICAnRlVMTCcsXG4gICdHTE9CQUxESUNUMjU2JyxcbiAgJ0dMT0JBTERJQ1Q2NEsnLFxuICAnR1JBTlQnLFxuICAnR1pJUCcsXG4gICdJREVOVElUWScsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU5JVElBTExZJyxcbiAgJ0lOVE8nLFxuICAnTEVBRElORycsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTFVOJyxcbiAgJ0xVTlMnLFxuICAnTFpPJyxcbiAgJ0xaT1AnLFxuICAnTUlOVVMnLFxuICAnTU9TVExZMTMnLFxuICAnTU9TVExZMzInLFxuICAnTU9TVExZOCcsXG4gICdOQVRVUkFMJyxcbiAgJ05FVycsXG4gICdOVUxMUycsXG4gICdPRkYnLFxuICAnT0ZGTElORScsXG4gICdPRkZTRVQnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUkRFUicsXG4gICdPVkVSTEFQUycsXG4gICdQQVJBTExFTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEVSQ0VOVCcsXG4gICdQRVJNSVNTSU9OUycsXG4gICdQTEFDSU5HJyxcbiAgJ1BSSU1BUlknLFxuICAnUkFXJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUNPVkVSJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVKRUNUTE9HJyxcbiAgJ1JFU09SVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTSU1JTEFSJyxcbiAgJ1NZU0RBVEUnLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBRycsXG4gICdUREVTJyxcbiAgJ1RFWFQyNTUnLFxuICAnVEVYVDMySycsXG4gICdUSEVOJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUT1AnLFxuICAnVFJBSUxJTkcnLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnVU5JUVVFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkVSQk9TRScsXG4gICdXQUxMRVQnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1dJVEhPVVQnLFxuICAnUFJFRElDQVRFJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFJFU1NJT04nLFxuICAnQ09QWScsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0VWRU4nLFxuICAnQUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVE9QJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOSU9OIEFMTCcsXG4gICdVTklPTicsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFtdO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGFyZFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCcsICcjJywgJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FSUkFZX1pJUCcsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEVDVF9MSVNUJyxcbiAgJ0NPTExFQ1RfU0VUJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UIFJPVycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBVEVfQUREJyxcbiAgJ0RBVEVfU1VCJyxcbiAgJ0RBVEVfVFJVTkMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RFQ09ERScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RST1AnLFxuICAnRUxTRScsXG4gICdFTkNPREUnLFxuICAnRU5EJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUExPREVfT1VURVInLFxuICAnRVhQTE9ERScsXG4gICdGSUxURVInLFxuICAnRklSU1RfVkFMVUUnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxBVFRFTicsXG4gICdGT0xMT1dJTkcnLFxuICAnRlJPTV9VTklYVElNRScsXG4gICdGVUxMJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQX0NPTkNBVCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lGJyxcbiAgJ0lGTlVMTCcsXG4gICdJTicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVNUJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFTVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ01BWCcsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5VVEUnLFxuICAnTU9OVEgnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9XKCknLFxuICAnTlRJTEUnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUFRJTUlaRScsXG4gICdPVkVSJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDRURJTkcnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUdFWFAnLFxuICAnUkVOQU1FJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1NFQ09ORCcsXG4gICdTRVBBUkFUT1InLFxuICAnU0VRVUVOQ0UnLFxuICAnU0laRScsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NVTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RIRU4nLFxuICAnVE9fREFURScsXG4gICdUT19KU09OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOSVFVRScsXG4gICdVTklYX1RJTUVTVEFNUCcsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBEQVRBQkFTRScsXG4gICdBTFRFUiBTQ0hFTUEnLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0xVU1RFUiBCWScsXG4gICdDTFVTVEVSRUQgQlknLFxuICAnREVMRVRFIEZST00nLFxuICAnRElTVFJJQlVURSBCWScsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1BUSU9OUycsXG4gICdPUkRFUiBCWScsXG4gICdQQVJUSVRJT04gQlknLFxuICAnUEFSVElUSU9ORUQgQlknLFxuICAnUkFOR0UnLFxuICAnUk9XUycsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1RCTFBST1BFUlRJRVMnLFxuICAnVVBEQVRFJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdXSU5ET1cnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdJTlRFUlNFQ1QgQUxMJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQU5USSBKT0lOJyxcbiAgJ0NSRUFURSBPUicsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEFURVJBTCBWSUVXJyxcbiAgJ0xFRlQgQU5USSBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnTEVGVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBBTlRJIEpPSU4nLFxuICAnTkFUVVJBTCBGVUxMIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBJTk5FUiBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgQU5USSBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIFNFTUkgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBTRU1JIEpPSU4nLFxuICAnU0VNSSBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYXJrU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJywgJ3t9J10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgfSk7XG4gIH1cblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgLy8gRml4IGNhc2VzIHdoZXJlIG5hbWVzIGFyZSBhbWJpZ3VvdXNseSBrZXl3b3JkcyBvciBmdW5jdGlvbnNcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgJiYgdG9rZW4udmFsdWUudG9VcHBlckNhc2UoKSA9PT0gJ1dJTkRPVycpIHtcbiAgICAgIGNvbnN0IGFoZWFkVG9rZW4gPSB0aGlzLnRva2VuTG9va0FoZWFkKCk7XG4gICAgICBpZiAoYWhlYWRUb2tlbiAmJiBhaGVhZFRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICAvLyBUaGlzIGlzIGEgZnVuY3Rpb24gY2FsbCwgdHJlYXQgaXQgYXMgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgcHJvcGVydGllc1xuICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOICYmIHRva2VuLnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdFTkQnKSB7XG4gICAgICBjb25zdCBiYWNrVG9rZW4gPSB0aGlzLnRva2VuTG9va0JlaGluZCgpO1xuICAgICAgaWYgKGJhY2tUb2tlbiAmJiBiYWNrVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVSQVRPUiAmJiBiYWNrVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICAvLyBUaGlzIGlzIHdpbmRvdygpLmVuZCAob3Igc2ltaWxhcikgbm90IENBU0UgLi4uIEVORFxuICAgICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLldPUkQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUNUSU9OJyxcbiAgJ0FHQUlOU1QnLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMR09SSVRITScsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVVRPQ09NTUlUJyxcbiAgJ0FVVE9fSU5DUkVNRU5UJyxcbiAgJ0JBQ0tVUCcsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJTkxPRycsXG4gICdCT1RIJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0hBTkdFJyxcbiAgJ0NIQU5HRUQnLFxuICAnQ0hBUkFDVEVSIFNFVCcsXG4gICdDSEFSU0VUJyxcbiAgJ0NIRUNLJyxcbiAgJ0NIRUNLU1VNJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEFUSU9OJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT01QUkVTU0VEJyxcbiAgJ0NPTkNVUlJFTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRklORVInLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdETycsXG4gICdEUk9QJyxcbiAgJ0RVTVBGSUxFJyxcbiAgJ0RVUExJQ0FURScsXG4gICdEWU5BTUlDJyxcbiAgJ0VMU0UnLFxuICAnRU5DTE9TRUQnLFxuICAnRU5HSU5FJyxcbiAgJ0VOR0lORVMnLFxuICAnRU5HSU5FX1RZUEUnLFxuICAnRVNDQVBFJyxcbiAgJ0VTQ0FQRUQnLFxuICAnRVZFTlRTJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdGQVNUJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJRUxEUycsXG4gICdGSUxFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMVVNIJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZVTEwnLFxuICAnRlVMTFRFWFQnLFxuICAnRlVOQ1RJT04nLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQU5UUycsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSEVBUCcsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPU1RTJyxcbiAgJ0hPVVInLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSURFTlRJRklFRCcsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSUdOT1JFJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5GSUxFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlNFUlRfSUQnLFxuICAnSU5TRVJUX01FVEhPRCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVk9LRVInLFxuICAnSVMnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tJTEwnLFxuICAnTEFTVF9JTlNFUlRfSUQnLFxuICAnTEVBRElORycsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0snLFxuICAnTE9DS1MnLFxuICAnTE9HUycsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFSSUEnLFxuICAnTUFTVEVSJyxcbiAgJ01BU1RFUl9DT05ORUNUX1JFVFJZJyxcbiAgJ01BU1RFUl9IT1NUJyxcbiAgJ01BU1RFUl9MT0dfRklMRScsXG4gICdNQVRDSCcsXG4gICdNQVhfQ09OTkVDVElPTlNfUEVSX0hPVVInLFxuICAnTUFYX1FVRVJJRVNfUEVSX0hPVVInLFxuICAnTUFYX1JPV1MnLFxuICAnTUFYX1VQREFURVNfUEVSX0hPVVInLFxuICAnTUFYX1VTRVJfQ09OTkVDVElPTlMnLFxuICAnTUVESVVNJyxcbiAgJ01FUkdFJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVfU0VDT05EJyxcbiAgJ01JTl9ST1dTJyxcbiAgJ01PREUnLFxuICAnTU9ESUZZJyxcbiAgJ01PTlRIJyxcbiAgJ01SR19NWUlTQU0nLFxuICAnTVlJU0FNJyxcbiAgJ05BTUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05VTEwnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05BTExZJyxcbiAgJ09VVEZJTEUnLFxuICAnUEFDS19LRVlTJyxcbiAgJ1BBR0UnLFxuICAnUEFSVElBTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0NFU1MnLFxuICAnUFJPQ0VTU0xJU1QnLFxuICAnUFVSR0UnLFxuICAnUVVJQ0snLFxuICAnUkFJRDAnLFxuICAnUkFJRF9DSFVOS1MnLFxuICAnUkFJRF9DSFVOS1NJWkUnLFxuICAnUkFJRF9UWVBFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBRF9PTkxZJyxcbiAgJ1JFQURfV1JJVEUnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUdFWFAnLFxuICAnUkVMT0FEJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBBSVInLFxuICAnUkVQRUFUQUJMRScsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUExJQ0FUSU9OJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU1RPUkUnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JPV19GT1JNQVQnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFUEFSQVRPUicsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0VTU0lPTicsXG4gICdTSEFSRScsXG4gICdTSE9XJyxcbiAgJ1NIVVRET1dOJyxcbiAgJ1NMQVZFJyxcbiAgJ1NPTkFNRScsXG4gICdTT1VORFMnLFxuICAnU1FMJyxcbiAgJ1NRTF9BVVRPX0lTX05VTEwnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0JJR19TRUxFQ1RTJyxcbiAgJ1NRTF9CSUdfVEFCTEVTJyxcbiAgJ1NRTF9CVUZGRVJfUkVTVUxUJyxcbiAgJ1NRTF9DQUNIRScsXG4gICdTUUxfQ0FMQ19GT1VORF9ST1dTJyxcbiAgJ1NRTF9MT0dfQklOJyxcbiAgJ1NRTF9MT0dfT0ZGJyxcbiAgJ1NRTF9MT0dfVVBEQVRFJyxcbiAgJ1NRTF9MT1dfUFJJT1JJVFlfVVBEQVRFUycsXG4gICdTUUxfTUFYX0pPSU5fU0laRScsXG4gICdTUUxfTk9fQ0FDSEUnLFxuICAnU1FMX1FVT1RFX1NIT1dfQ1JFQVRFJyxcbiAgJ1NRTF9TQUZFX1VQREFURVMnLFxuICAnU1FMX1NFTEVDVF9MSU1JVCcsXG4gICdTUUxfU0xBVkVfU0tJUF9DT1VOVEVSJyxcbiAgJ1NRTF9TTUFMTF9SRVNVTFQnLFxuICAnU1FMX1dBUk5JTkdTJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUQVRVUycsXG4gICdTVE9QJyxcbiAgJ1NUT1JBR0UnLFxuICAnU1RSQUlHSFRfSk9JTicsXG4gICdTVFJJTkcnLFxuICAnU1RSSVBFRCcsXG4gICdTVVBFUicsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdUWVBFUycsXG4gICdVTkNPTU1JVFRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdWQVJJQUJMRVMnLFxuICAnVklFVycsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JJVEUnLFxuICAnWUVBUl9NT05USCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0dPJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGFyZFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIk4nJ1wiLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCcsICc6J10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IERiMkZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9EYjJGb3JtYXR0ZXInO1xuaW1wb3J0IE4xcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvTjFxbEZvcm1hdHRlcic7XG5pbXBvcnQgUGxTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvUGxTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBvc3RncmVTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvUG9zdGdyZVNxbEZvcm1hdHRlcic7XG5pbXBvcnQgUmVkc2hpZnRGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvUmVkc2hpZnRGb3JtYXR0ZXInO1xuaW1wb3J0IFNwYXJrU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyJztcbmltcG9ydCBTdGFuZGFyZFNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TdGFuZGFyZFNxbEZvcm1hdHRlcic7XG5cbmNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gIGRiMjogRGIyRm9ybWF0dGVyLFxuICBuMXFsOiBOMXFsRm9ybWF0dGVyLFxuICAncGwvc3FsJzogUGxTcWxGb3JtYXR0ZXIsXG4gIHBsc3FsOiBQbFNxbEZvcm1hdHRlcixcbiAgcG9zdGdyZXNxbDogUG9zdGdyZVNxbEZvcm1hdHRlcixcbiAgcmVkc2hpZnQ6IFJlZHNoaWZ0Rm9ybWF0dGVyLFxuICBzcGFyazogU3BhcmtTcWxGb3JtYXR0ZXIsXG4gIHNxbDogU3RhbmRhcmRTcWxGb3JtYXR0ZXIsXG59O1xuXG4vKipcbiAqIEZvcm1hdCB3aGl0ZXNwYWNlIGluIGEgcXVlcnkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmxhbmd1YWdlIFF1ZXJ5IGxhbmd1YWdlLCBkZWZhdWx0IGlzIFN0YW5kYXJkIFNRTFxuICogIEBwYXJhbSB7U3RyaW5nfSBjZmcuaW5kZW50IENoYXJhY3RlcnMgdXNlZCBmb3IgaW5kZW50YXRpb24sIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAqICBAcGFyYW0ge0Jvb2xlYW59IGNmZy51cHBlcmNhc2UgQ29udmVydHMga2V5d29yZHMgdG8gdXBwZXJjYXNlXG4gKiAgQHBhcmFtIHtJbnRlZ2VyfSBjZmcubGluZXNCZXR3ZWVuUXVlcmllcyBIb3cgbWFueSBsaW5lIGJyZWFrcyBiZXR3ZWVuIHF1ZXJpZXNcbiAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtcyBDb2xsZWN0aW9uIG9mIHBhcmFtcyBmb3IgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdCA9IChxdWVyeSwgY2ZnID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBxdWVyeSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcXVlcnkgYXJndW1lbnQuIEV4dGVjdGVkIHN0cmluZywgaW5zdGVhZCBnb3QgJyArIHR5cGVvZiBxdWVyeSk7XG4gIH1cblxuICBsZXQgRm9ybWF0dGVyID0gU3RhbmRhcmRTcWxGb3JtYXR0ZXI7XG4gIGlmIChjZmcubGFuZ3VhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIEZvcm1hdHRlciA9IGZvcm1hdHRlcnNbY2ZnLmxhbmd1YWdlXTtcbiAgfVxuICBpZiAoRm9ybWF0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5zdXBwb3J0ZWQgU1FMIGRpYWxlY3Q6ICR7Y2ZnLmxhbmd1YWdlfWApO1xuICB9XG4gIHJldHVybiBuZXcgRm9ybWF0dGVyKGNmZykuZm9ybWF0KHF1ZXJ5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWREaWFsZWN0cyA9IE9iamVjdC5rZXlzKGZvcm1hdHRlcnMpO1xuIiwiLy8gT25seSByZW1vdmVzIHNwYWNlcywgbm90IG5ld2xpbmVzXG5leHBvcnQgY29uc3QgdHJpbVNwYWNlc0VuZCA9IChzdHIpID0+IHN0ci5yZXBsYWNlKC9bIFxcdF0rJC91LCAnJyk7XG5cbi8vIExhc3QgZWxlbWVudCBmcm9tIGFycmF5XG5leHBvcnQgY29uc3QgbGFzdCA9IChhcnIpID0+IGFyclthcnIubGVuZ3RoIC0gMV07XG5cbi8vIFRydWUgYXJyYXkgaXMgZW1wdHksIG9yIGl0J3Mgbm90IGFuIGFycmF5IGF0IGFsbFxuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSAoYXJyKSA9PiAhQXJyYXkuaXNBcnJheShhcnIpIHx8IGFyci5sZW5ndGggPT09IDA7XG5cbi8vIEVzY2FwZXMgcmVnZXggc3BlY2lhbCBjaGFyc1xuZXhwb3J0IGNvbnN0IGVzY2FwZVJlZ0V4cCA9IChzdHJpbmcpID0+IHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ3UsICdcXFxcJCYnKTtcblxuLy8gU29ydHMgc3RyaW5ncyBieSBsZW5ndGgsIHNvIHRoYXQgbG9uZ2VyIG9uZXMgYXJlIGZpcnN0XG4vLyBBbHNvIHNvcnRzIGFscGhhYmV0aWNhbGx5IGFmdGVyIHNvcnRpbmcgYnkgbGVuZ3RoLlxuZXhwb3J0IGNvbnN0IHNvcnRCeUxlbmd0aERlc2MgPSAoc3RyaW5ncykgPT5cbiAgc3RyaW5ncy5zb3J0KChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGggfHwgYS5sb2NhbGVDb21wYXJlKGIpO1xuICB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=