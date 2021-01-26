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
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token */ "./src/core/token.js");
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
      if (Object(_token__WEBPACK_IMPORTED_MODULE_5__["isAnd"])(token) && Object(_token__WEBPACK_IMPORTED_MODULE_5__["isBetween"])(this.tokenLookBehind(2))) {
        return this.formatWithSpaces(token, query);
      }

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
      } else if (Object(_token__WEBPACK_IMPORTED_MODULE_5__["isLimit"])(this.previousReservedToken)) {
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
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index - n];
    }
  }, {
    key: "tokenLookAhead",
    value: function tokenLookAhead() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index + n];
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
    $$: '((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))'
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

/***/ "./src/core/token.js":
/*!***************************!*\
  !*** ./src/core/token.js ***!
  \***************************/
/*! exports provided: isAnd, isBetween, isLimit, isSet, isBy, isWindow, isEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAnd", function() { return isAnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBetween", function() { return isBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLimit", function() { return isLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSet", function() { return isSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBy", function() { return isBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnd", function() { return isEnd; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");


var isToken = function isToken(type, regex) {
  return function (token) {
    return (token === null || token === void 0 ? void 0 : token.type) === type && regex.test(token === null || token === void 0 ? void 0 : token.value);
  };
};

var isAnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE, /^AND$/i);
var isBetween = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BETWEEN$/i);
var isLimit = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^LIMIT$/i);
var isSet = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^[S\u017F]ET$/i);
var isBy = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BY$/i);
var isWindow = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^WINDOW$/i);
var isEnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN, /^END$/i);

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
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
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
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isSet"])(token) && Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isBy"])(this.previousReservedToken)) {
        return {
          type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
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
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
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
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isWindow"])(token)) {
        var aheadToken = this.tokenLookAhead();

        if (aheadToken && aheadToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPEN_PAREN) {
          // This is a function call, treat it as a reserved word
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
            value: token.value
          };
        }
      } // Fix cases where names are ambiguously keywords or properties


      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isEnd"])(token)) {
        var backToken = this.tokenLookBehind();

        if (backToken && backToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPERATOR && backToken.value === '.') {
          // This is window().end (or similar) not CASE ... END
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].WORD,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3NxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiRm9ybWF0dGVyIiwiY2ZnIiwiaW5kZW50YXRpb24iLCJJbmRlbnRhdGlvbiIsImluZGVudCIsImlubGluZUJsb2NrIiwiSW5saW5lQmxvY2siLCJwYXJhbXMiLCJQYXJhbXMiLCJwcmV2aW91c1Jlc2VydmVkVG9rZW4iLCJ0b2tlbnMiLCJpbmRleCIsIkVycm9yIiwidG9rZW4iLCJxdWVyeSIsInRva2VuaXplciIsInRva2VuaXplIiwiZm9ybWF0dGVkUXVlcnkiLCJnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMiLCJ0cmltIiwiZm9yRWFjaCIsInRva2VuT3ZlcnJpZGUiLCJ0eXBlIiwidG9rZW5UeXBlcyIsIkxJTkVfQ09NTUVOVCIsImZvcm1hdExpbmVDb21tZW50IiwiQkxPQ0tfQ09NTUVOVCIsImZvcm1hdEJsb2NrQ29tbWVudCIsIlJFU0VSVkVEX1RPUF9MRVZFTCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FIiwiZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCIsIlJFU0VSVkVEIiwiZm9ybWF0V2l0aFNwYWNlcyIsIk9QRU5fUEFSRU4iLCJmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXMiLCJDTE9TRV9QQVJFTiIsImZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyIsIlBMQUNFSE9MREVSIiwiZm9ybWF0UGxhY2Vob2xkZXIiLCJ2YWx1ZSIsImZvcm1hdENvbW1hIiwiZm9ybWF0V2l0aFNwYWNlQWZ0ZXIiLCJmb3JtYXRXaXRob3V0U3BhY2VzIiwiZm9ybWF0UXVlcnlTZXBhcmF0b3IiLCJhZGROZXdsaW5lIiwic2hvdyIsImluZGVudENvbW1lbnQiLCJjb21tZW50IiwicmVwbGFjZSIsImdldEluZGVudCIsImRlY3JlYXNlVG9wTGV2ZWwiLCJlcXVhbGl6ZVdoaXRlc3BhY2UiLCJpbmNyZWFzZVRvcExldmVsIiwiaXNBbmQiLCJpc0JldHdlZW4iLCJ0b2tlbkxvb2tCZWhpbmQiLCJzdHJpbmciLCJwcmVzZXJ2ZVdoaXRlc3BhY2VGb3IiLCJPUEVSQVRPUiIsIndoaXRlc3BhY2VCZWZvcmUiLCJsZW5ndGgiLCJ0cmltU3BhY2VzRW5kIiwiYmVnaW5JZlBvc3NpYmxlIiwiaXNBY3RpdmUiLCJpbmNyZWFzZUJsb2NrTGV2ZWwiLCJlbmQiLCJkZWNyZWFzZUJsb2NrTGV2ZWwiLCJnZXQiLCJpc0xpbWl0IiwicmVzZXRJbmRlbnRhdGlvbiIsInJlcGVhdCIsImxpbmVzQmV0d2VlblF1ZXJpZXMiLCJ1cHBlcmNhc2UiLCJ0b1VwcGVyQ2FzZSIsImVuZHNXaXRoIiwibiIsIklOREVOVF9UWVBFX1RPUF9MRVZFTCIsIklOREVOVF9UWVBFX0JMT0NLX0xFVkVMIiwiaW5kZW50VHlwZXMiLCJwdXNoIiwibGFzdCIsInBvcCIsIklOTElORV9NQVhfTEVOR1RIIiwibGV2ZWwiLCJpc0lubGluZUJsb2NrIiwiaSIsImlzRm9yYmlkZGVuVG9rZW4iLCJDT01NRU5UIiwia2V5IiwiVG9rZW5pemVyIiwiV0hJVEVTUEFDRV9SRUdFWCIsIk5VTUJFUl9SRUdFWCIsIk9QRVJBVE9SX1JFR0VYIiwicmVnZXhGYWN0b3J5Iiwib3BlcmF0b3JzIiwiQkxPQ0tfQ09NTUVOVF9SRUdFWCIsIkxJTkVfQ09NTUVOVF9SRUdFWCIsImxpbmVDb21tZW50VHlwZXMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgiLCJyZXNlcnZlZFRvcExldmVsV29yZHMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FX1JFR0VYIiwicmVzZXJ2ZWROZXdsaW5lV29yZHMiLCJSRVNFUlZFRF9QTEFJTl9SRUdFWCIsInJlc2VydmVkV29yZHMiLCJXT1JEX1JFR0VYIiwic3BlY2lhbFdvcmRDaGFycyIsIlNUUklOR19SRUdFWCIsInN0cmluZ1R5cGVzIiwiT1BFTl9QQVJFTl9SRUdFWCIsIm9wZW5QYXJlbnMiLCJDTE9TRV9QQVJFTl9SRUdFWCIsImNsb3NlUGFyZW5zIiwiSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCIsImluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIiwiSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJuYW1lZFBsYWNlaG9sZGVyVHlwZXMiLCJTVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbnB1dCIsImdldFdoaXRlc3BhY2UiLCJzdWJzdHJpbmciLCJnZXROZXh0VG9rZW4iLCJtYXRjaGVzIiwibWF0Y2giLCJwcmV2aW91c1Rva2VuIiwiZ2V0Q29tbWVudFRva2VuIiwiZ2V0U3RyaW5nVG9rZW4iLCJnZXRPcGVuUGFyZW5Ub2tlbiIsImdldENsb3NlUGFyZW5Ub2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW4iLCJnZXROdW1iZXJUb2tlbiIsImdldFJlc2VydmVkV29yZFRva2VuIiwiZ2V0V29yZFRva2VuIiwiZ2V0T3BlcmF0b3JUb2tlbiIsImdldExpbmVDb21tZW50VG9rZW4iLCJnZXRCbG9ja0NvbW1lbnRUb2tlbiIsImdldFRva2VuT25GaXJzdE1hdGNoIiwicmVnZXgiLCJTVFJJTkciLCJnZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbiIsImdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkiLCJwYXJzZUtleSIsInYiLCJzbGljZSIsImdldEVzY2FwZWRQbGFjZWhvbGRlcktleSIsInF1b3RlQ2hhciIsIlJlZ0V4cCIsImVzY2FwZVJlZ0V4cCIsIk5VTUJFUiIsInVuZGVmaW5lZCIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbiIsImdldE5ld2xpbmVSZXNlcnZlZFRva2VuIiwiZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQiLCJnZXRQbGFpblJlc2VydmVkVG9rZW4iLCJXT1JEIiwiY3JlYXRlT3BlcmF0b3JSZWdleCIsIm11bHRpTGV0dGVyT3BlcmF0b3JzIiwic29ydEJ5TGVuZ3RoRGVzYyIsIm1hcCIsImpvaW4iLCJjcmVhdGVMaW5lQ29tbWVudFJlZ2V4IiwiYyIsImNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4IiwicmVzZXJ2ZWRXb3Jkc1BhdHRlcm4iLCJjcmVhdGVXb3JkUmVnZXgiLCJzcGVjaWFsQ2hhcnMiLCJjcmVhdGVTdHJpbmdSZWdleCIsImNyZWF0ZVN0cmluZ1BhdHRlcm4iLCJwYXR0ZXJucyIsIiQkIiwidCIsImNyZWF0ZVBhcmVuUmVnZXgiLCJwYXJlbnMiLCJlc2NhcGVQYXJlbiIsInBhcmVuIiwiY3JlYXRlUGxhY2Vob2xkZXJSZWdleCIsInR5cGVzIiwicGF0dGVybiIsImlzRW1wdHkiLCJ0eXBlc1JlZ2V4IiwiaXNUb2tlbiIsInRlc3QiLCJpc1NldCIsImlzQnkiLCJpc1dpbmRvdyIsImlzRW5kIiwiRGIyRm9ybWF0dGVyIiwiTjFxbEZvcm1hdHRlciIsIlBsU3FsRm9ybWF0dGVyIiwiUG9zdGdyZVNxbEZvcm1hdHRlciIsIlN0YW5kYXJkU3FsRm9ybWF0dGVyIiwiU3BhcmtTcWxGb3JtYXR0ZXIiLCJhaGVhZFRva2VuIiwidG9rZW5Mb29rQWhlYWQiLCJiYWNrVG9rZW4iLCJmb3JtYXR0ZXJzIiwiZGIyIiwibjFxbCIsInBsc3FsIiwicG9zdGdyZXNxbCIsInJlZHNoaWZ0IiwiUmVkc2hpZnRGb3JtYXR0ZXIiLCJzcGFyayIsInNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUNmLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosQ0FBZ0IsS0FBS0YsR0FBTCxDQUFTRyxNQUF6QixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosRUFBbkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsK0NBQUosQ0FBVyxLQUFLUCxHQUFMLENBQVNNLE1BQXBCLENBQWQ7QUFDQSxTQUFLRSxxQkFBTCxHQUE2QixFQUE3QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozs7Z0NBQ2M7QUFDVixZQUFNLElBQUlDLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDZ0JDLEssRUFBTztBQUNuQjtBQUNBLGFBQU9BLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0MsSyxFQUFPO0FBQ1osV0FBS0osTUFBTCxHQUFjLEtBQUtLLFNBQUwsR0FBaUJDLFFBQWpCLENBQTBCRixLQUExQixDQUFkO0FBQ0EsVUFBTUcsY0FBYyxHQUFHLEtBQUtDLDJCQUFMLEVBQXZCO0FBRUEsYUFBT0QsY0FBYyxDQUFDRSxJQUFmLEVBQVA7QUFDRDs7O2tEQUU2QjtBQUFBOztBQUM1QixVQUFJRixjQUFjLEdBQUcsRUFBckI7QUFFQSxXQUFLUCxNQUFMLENBQVlVLE9BQVosQ0FBb0IsVUFBQ1AsS0FBRCxFQUFRRixLQUFSLEVBQWtCO0FBQ3BDLGFBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBRUFFLGFBQUssR0FBRyxLQUFJLENBQUNRLGFBQUwsQ0FBbUJSLEtBQW5CLENBQVI7O0FBRUEsWUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNDLFlBQTlCLEVBQTRDO0FBQzFDUCx3QkFBYyxHQUFHLEtBQUksQ0FBQ1EsaUJBQUwsQ0FBdUJaLEtBQXZCLEVBQThCSSxjQUE5QixDQUFqQjtBQUNELFNBRkQsTUFFTyxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ0csYUFBOUIsRUFBNkM7QUFDbERULHdCQUFjLEdBQUcsS0FBSSxDQUFDVSxrQkFBTCxDQUF3QmQsS0FBeEIsRUFBK0JJLGNBQS9CLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDSyxrQkFBOUIsRUFBa0Q7QUFDdkRYLHdCQUFjLEdBQUcsS0FBSSxDQUFDWSwwQkFBTCxDQUFnQ2hCLEtBQWhDLEVBQXVDSSxjQUF2QyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDTyw0QkFBOUIsRUFBNEQ7QUFDakViLHdCQUFjLEdBQUcsS0FBSSxDQUFDYyxrQ0FBTCxDQUF3Q2xCLEtBQXhDLEVBQStDSSxjQUEvQyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDUyxnQkFBOUIsRUFBZ0Q7QUFDckRmLHdCQUFjLEdBQUcsS0FBSSxDQUFDZ0IseUJBQUwsQ0FBK0JwQixLQUEvQixFQUFzQ0ksY0FBdEMsQ0FBakI7QUFDQSxlQUFJLENBQUNSLHFCQUFMLEdBQTZCSSxLQUE3QjtBQUNELFNBSE0sTUFHQSxJQUFJQSxLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ1csUUFBOUIsRUFBd0M7QUFDN0NqQix3QkFBYyxHQUFHLEtBQUksQ0FBQ2tCLGdCQUFMLENBQXNCdEIsS0FBdEIsRUFBNkJJLGNBQTdCLENBQWpCO0FBQ0EsZUFBSSxDQUFDUixxQkFBTCxHQUE2QkksS0FBN0I7QUFDRCxTQUhNLE1BR0EsSUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNhLFVBQTlCLEVBQTBDO0FBQy9DbkIsd0JBQWMsR0FBRyxLQUFJLENBQUNvQix3QkFBTCxDQUE4QnhCLEtBQTlCLEVBQXFDSSxjQUFyQyxDQUFqQjtBQUNELFNBRk0sTUFFQSxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ2UsV0FBOUIsRUFBMkM7QUFDaERyQix3QkFBYyxHQUFHLEtBQUksQ0FBQ3NCLHdCQUFMLENBQThCMUIsS0FBOUIsRUFBcUNJLGNBQXJDLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDaUIsV0FBOUIsRUFBMkM7QUFDaER2Qix3QkFBYyxHQUFHLEtBQUksQ0FBQ3dCLGlCQUFMLENBQXVCNUIsS0FBdkIsRUFBOEJJLGNBQTlCLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQzZCLEtBQU4sS0FBZ0IsR0FBcEIsRUFBeUI7QUFDOUJ6Qix3QkFBYyxHQUFHLEtBQUksQ0FBQzBCLFdBQUwsQ0FBaUI5QixLQUFqQixFQUF3QkksY0FBeEIsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDMkIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNEIsbUJBQUwsQ0FBeUJoQyxLQUF6QixFQUFnQ0ksY0FBaEMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNkIsb0JBQUwsQ0FBMEJqQyxLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUE7QUFDTEEsd0JBQWMsR0FBRyxLQUFJLENBQUNrQixnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCSSxjQUE3QixDQUFqQjtBQUNEO0FBQ0YsT0F0Q0Q7QUF1Q0EsYUFBT0EsY0FBUDtBQUNEOzs7c0NBRWlCSixLLEVBQU9DLEssRUFBTztBQUM5QixhQUFPLEtBQUtpQyxVQUFMLENBQWdCakMsS0FBSyxHQUFHLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQXhCLENBQVA7QUFDRDs7O3VDQUVrQkEsSyxFQUFPQyxLLEVBQU87QUFDL0IsYUFBTyxLQUFLaUMsVUFBTCxDQUFnQixLQUFLQSxVQUFMLENBQWdCakMsS0FBaEIsSUFBeUIsS0FBS21DLGFBQUwsQ0FBbUJwQyxLQUFLLENBQUM2QixLQUF6QixDQUF6QyxDQUFQO0FBQ0Q7OztrQ0FFYVEsTyxFQUFTO0FBQ3JCLGFBQU9BLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixXQUFoQixFQUE4QixPQUFPLEtBQUtqRCxXQUFMLENBQWlCa0QsU0FBakIsRUFBUCxHQUFzQyxHQUFwRSxDQUFQO0FBQ0Q7Ozt1REFFa0N2QyxLLEVBQU9DLEssRUFBTztBQUMvQyxXQUFLWixXQUFMLENBQWlCbUQsZ0JBQWpCO0FBQ0F2QyxXQUFLLEdBQUcsS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUFqQztBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7OzsrQ0FFMEJELEssRUFBT0MsSyxFQUFPO0FBQ3ZDLFdBQUtaLFdBQUwsQ0FBaUJtRCxnQkFBakI7QUFFQXZDLFdBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFFQSxXQUFLWixXQUFMLENBQWlCcUQsZ0JBQWpCO0FBRUF6QyxXQUFLLElBQUksS0FBS3dDLGtCQUFMLENBQXdCLEtBQUtOLElBQUwsQ0FBVW5DLEtBQVYsQ0FBeEIsQ0FBVDtBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7Ozs4Q0FFeUJELEssRUFBT0MsSyxFQUFPO0FBQ3RDLFVBQUkwQyxvREFBSyxDQUFDM0MsS0FBRCxDQUFMLElBQWdCNEMsd0RBQVMsQ0FBQyxLQUFLQyxlQUFMLENBQXFCLENBQXJCLENBQUQsQ0FBN0IsRUFBd0Q7QUFDdEQsZUFBTyxLQUFLdkIsZ0JBQUwsQ0FBc0J0QixLQUF0QixFQUE2QkMsS0FBN0IsQ0FBUDtBQUNEOztBQUNELGFBQU8sS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUF6QixHQUFxRSxHQUE1RTtBQUNELEssQ0FFRDs7Ozt1Q0FDbUI4QyxNLEVBQVE7QUFDekIsYUFBT0EsTUFBTSxDQUFDUixPQUFQLENBQWUsdUVBQWYsRUFBd0IsR0FBeEIsQ0FBUDtBQUNELEssQ0FFRDs7Ozs2Q0FDeUJ0QyxLLEVBQU9DLEssRUFBTztBQUFBOztBQUNyQztBQUNBO0FBQ0EsVUFBTThDLHFCQUFxQix1RUFDeEJyQyxtREFBVSxDQUFDYSxVQURhLEVBQ0EsSUFEQSwwQ0FFeEJiLG1EQUFVLENBQUNDLFlBRmEsRUFFRSxJQUZGLDBDQUd4QkQsbURBQVUsQ0FBQ3NDLFFBSGEsRUFHRixJQUhFLHlCQUEzQjs7QUFLQSxVQUNFaEQsS0FBSyxDQUFDaUQsZ0JBQU4sQ0FBdUJDLE1BQXZCLEtBQWtDLENBQWxDLElBQ0EsQ0FBQ0gscUJBQXFCLDBCQUFDLEtBQUtGLGVBQUwsRUFBRCwwREFBQyxzQkFBd0JwQyxJQUF6QixDQUZ4QixFQUdFO0FBQ0FSLGFBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQXJCO0FBQ0Q7O0FBQ0RBLFdBQUssSUFBSSxLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUFUO0FBRUEsV0FBS1IsV0FBTCxDQUFpQjRELGVBQWpCLENBQWlDLEtBQUt2RCxNQUF0QyxFQUE4QyxLQUFLQyxLQUFuRDs7QUFFQSxVQUFJLENBQUMsS0FBS04sV0FBTCxDQUFpQjZELFFBQWpCLEVBQUwsRUFBa0M7QUFDaEMsYUFBS2hFLFdBQUwsQ0FBaUJpRSxrQkFBakI7QUFDQXJELGFBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFDRDs7QUFDRCxhQUFPQSxLQUFQO0FBQ0QsSyxDQUVEOzs7OzZDQUN5QkQsSyxFQUFPQyxLLEVBQU87QUFDckMsVUFBSSxLQUFLVCxXQUFMLENBQWlCNkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixhQUFLN0QsV0FBTCxDQUFpQitELEdBQWpCO0FBQ0EsZUFBTyxLQUFLeEIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0MsS0FBakMsQ0FBUDtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtaLFdBQUwsQ0FBaUJtRSxrQkFBakI7QUFDQSxlQUFPLEtBQUtsQyxnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCLEtBQUtrQyxVQUFMLENBQWdCakMsS0FBaEIsQ0FBN0IsQ0FBUDtBQUNEO0FBQ0Y7OztzQ0FFaUJELEssRUFBT0MsSyxFQUFPO0FBQzlCLGFBQU9BLEtBQUssR0FBRyxLQUFLUCxNQUFMLENBQVkrRCxHQUFaLENBQWdCekQsS0FBaEIsQ0FBUixHQUFpQyxHQUF4QztBQUNELEssQ0FFRDs7OztnQ0FDWUEsSyxFQUFPQyxLLEVBQU87QUFDeEJBLFdBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQWIsR0FBdUIsS0FBS2tDLElBQUwsQ0FBVW5DLEtBQVYsQ0FBdkIsR0FBMEMsR0FBbEQ7O0FBRUEsVUFBSSxLQUFLUixXQUFMLENBQWlCNkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixlQUFPcEQsS0FBUDtBQUNELE9BRkQsTUFFTyxJQUFJeUQsc0RBQU8sQ0FBQyxLQUFLOUQscUJBQU4sQ0FBWCxFQUF5QztBQUM5QyxlQUFPSyxLQUFQO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsZUFBTyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVA7QUFDRDtBQUNGOzs7eUNBRW9CRCxLLEVBQU9DLEssRUFBTztBQUNqQyxhQUFPa0QsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUF2QixHQUEwQyxHQUFqRDtBQUNEOzs7d0NBRW1CQSxLLEVBQU9DLEssRUFBTztBQUNoQyxhQUFPa0QsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUE5QjtBQUNEOzs7cUNBRWdCQSxLLEVBQU9DLEssRUFBTztBQUM3QixhQUFPQSxLQUFLLEdBQUcsS0FBS2tDLElBQUwsQ0FBVW5DLEtBQVYsQ0FBUixHQUEyQixHQUFsQztBQUNEOzs7eUNBRW9CQSxLLEVBQU9DLEssRUFBTztBQUNqQyxXQUFLWixXQUFMLENBQWlCc0UsZ0JBQWpCO0FBQ0EsYUFBT1IsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUF2QixHQUEwQyxLQUFLNEQsTUFBTCxDQUFZLEtBQUt4RSxHQUFMLENBQVN5RSxtQkFBVCxJQUFnQyxDQUE1QyxDQUFqRDtBQUNELEssQ0FFRDs7OzsrQkFDc0I7QUFBQSxVQUFmcEQsSUFBZSxRQUFmQSxJQUFlO0FBQUEsVUFBVG9CLEtBQVMsUUFBVEEsS0FBUzs7QUFDcEIsVUFDRSxLQUFLekMsR0FBTCxDQUFTMEUsU0FBVCxLQUNDckQsSUFBSSxLQUFLQyxtREFBVSxDQUFDVyxRQUFwQixJQUNDWixJQUFJLEtBQUtDLG1EQUFVLENBQUNLLGtCQURyQixJQUVDTixJQUFJLEtBQUtDLG1EQUFVLENBQUNPLDRCQUZyQixJQUdDUixJQUFJLEtBQUtDLG1EQUFVLENBQUNTLGdCQUhyQixJQUlDVixJQUFJLEtBQUtDLG1EQUFVLENBQUNhLFVBSnJCLElBS0NkLElBQUksS0FBS0MsbURBQVUsQ0FBQ2UsV0FOdEIsQ0FERixFQVFFO0FBQ0EsZUFBT0ksS0FBSyxDQUFDa0MsV0FBTixFQUFQO0FBQ0QsT0FWRCxNQVVPO0FBQ0wsZUFBT2xDLEtBQVA7QUFDRDtBQUNGOzs7K0JBRVU1QixLLEVBQU87QUFDaEJBLFdBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQXJCOztBQUNBLFVBQUksQ0FBQ0EsS0FBSyxDQUFDK0QsUUFBTixDQUFlLElBQWYsQ0FBTCxFQUEyQjtBQUN6Qi9ELGFBQUssSUFBSSxJQUFUO0FBQ0Q7O0FBQ0QsYUFBT0EsS0FBSyxHQUFHLEtBQUtaLFdBQUwsQ0FBaUJrRCxTQUFqQixFQUFmO0FBQ0Q7OztzQ0FFc0I7QUFBQSxVQUFQMEIsQ0FBTyx1RUFBSCxDQUFHO0FBQ3JCLGFBQU8sS0FBS3BFLE1BQUwsQ0FBWSxLQUFLQyxLQUFMLEdBQWFtRSxDQUF6QixDQUFQO0FBQ0Q7OztxQ0FFcUI7QUFBQSxVQUFQQSxDQUFPLHVFQUFILENBQUc7QUFDcEIsYUFBTyxLQUFLcEUsTUFBTCxDQUFZLEtBQUtDLEtBQUwsR0FBYW1FLENBQXpCLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelBIO0FBRUEsSUFBTUMscUJBQXFCLEdBQUcsV0FBOUI7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyxhQUFoQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCN0UsVztBQUNuQjtBQUNGO0FBQ0E7QUFDRSx1QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQU0sSUFBSSxJQUF4QjtBQUNBLFNBQUs2RSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7Z0NBQ2M7QUFDVixhQUFPLEtBQUs3RSxNQUFMLENBQVlxRSxNQUFaLENBQW1CLEtBQUtRLFdBQUwsQ0FBaUJsQixNQUFwQyxDQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7dUNBQ3FCO0FBQ2pCLFdBQUtrQixXQUFMLENBQWlCQyxJQUFqQixDQUFzQkgscUJBQXRCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7eUNBQ3VCO0FBQ25CLFdBQUtFLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCRix1QkFBdEI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O3VDQUNxQjtBQUNqQixVQUFJLEtBQUtDLFdBQUwsQ0FBaUJsQixNQUFqQixHQUEwQixDQUExQixJQUErQm9CLG1EQUFJLENBQUMsS0FBS0YsV0FBTixDQUFKLEtBQTJCRixxQkFBOUQsRUFBcUY7QUFDbkYsYUFBS0UsV0FBTCxDQUFpQkcsR0FBakI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozt5Q0FDdUI7QUFDbkIsYUFBTyxLQUFLSCxXQUFMLENBQWlCbEIsTUFBakIsR0FBMEIsQ0FBakMsRUFBb0M7QUFDbEMsWUFBTXpDLElBQUksR0FBRyxLQUFLMkQsV0FBTCxDQUFpQkcsR0FBakIsRUFBYjs7QUFDQSxZQUFJOUQsSUFBSSxLQUFLeUQscUJBQWIsRUFBb0M7QUFDbEM7QUFDRDtBQUNGO0FBQ0Y7Ozt1Q0FFa0I7QUFDakIsV0FBS0UsV0FBTCxHQUFtQixFQUFuQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RUg7QUFFQSxJQUFNSSxpQkFBaUIsR0FBRyxFQUExQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNxQi9FLFc7QUFDbkIseUJBQWM7QUFBQTs7QUFDWixTQUFLZ0YsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7b0NBQ2tCNUUsTSxFQUFRQyxLLEVBQU87QUFDN0IsVUFBSSxLQUFLMkUsS0FBTCxLQUFlLENBQWYsSUFBb0IsS0FBS0MsYUFBTCxDQUFtQjdFLE1BQW5CLEVBQTJCQyxLQUEzQixDQUF4QixFQUEyRDtBQUN6RCxhQUFLMkUsS0FBTCxHQUFhLENBQWI7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLQSxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDekIsYUFBS0EsS0FBTDtBQUNELE9BRk0sTUFFQTtBQUNMLGFBQUtBLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OzBCQUNRO0FBQ0osV0FBS0EsS0FBTDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7K0JBQ2E7QUFDVCxhQUFPLEtBQUtBLEtBQUwsR0FBYSxDQUFwQjtBQUNELEssQ0FFRDtBQUNBOzs7O2tDQUNjNUUsTSxFQUFRQyxLLEVBQU87QUFDM0IsVUFBSW9ELE1BQU0sR0FBRyxDQUFiO0FBQ0EsVUFBSXVCLEtBQUssR0FBRyxDQUFaOztBQUVBLFdBQUssSUFBSUUsQ0FBQyxHQUFHN0UsS0FBYixFQUFvQjZFLENBQUMsR0FBRzlFLE1BQU0sQ0FBQ3FELE1BQS9CLEVBQXVDeUIsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxZQUFNM0UsS0FBSyxHQUFHSCxNQUFNLENBQUM4RSxDQUFELENBQXBCO0FBQ0F6QixjQUFNLElBQUlsRCxLQUFLLENBQUM2QixLQUFOLENBQVlxQixNQUF0QixDQUYwQyxDQUkxQzs7QUFDQSxZQUFJQSxNQUFNLEdBQUdzQixpQkFBYixFQUFnQztBQUM5QixpQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsWUFBSXhFLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDYSxVQUE5QixFQUEwQztBQUN4Q2tELGVBQUs7QUFDTixTQUZELE1BRU8sSUFBSXpFLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDZSxXQUE5QixFQUEyQztBQUNoRGdELGVBQUs7O0FBQ0wsY0FBSUEsS0FBSyxLQUFLLENBQWQsRUFBaUI7QUFDZixtQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJLEtBQUtHLGdCQUFMLENBQXNCNUUsS0FBdEIsQ0FBSixFQUFrQztBQUNoQyxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPLEtBQVA7QUFDRCxLLENBRUQ7QUFDQTs7OzsyQ0FDa0M7QUFBQSxVQUFmUyxJQUFlLFFBQWZBLElBQWU7QUFBQSxVQUFUb0IsS0FBUyxRQUFUQSxLQUFTO0FBQ2hDLGFBQ0VwQixJQUFJLEtBQUtDLG1EQUFVLENBQUNLLGtCQUFwQixJQUNBTixJQUFJLEtBQUtDLG1EQUFVLENBQUNTLGdCQURwQixJQUVBVixJQUFJLEtBQUtDLG1EQUFVLENBQUNtRSxPQUZwQixJQUdBcEUsSUFBSSxLQUFLQyxtREFBVSxDQUFDRyxhQUhwQixJQUlBZ0IsS0FBSyxLQUFLLEdBTFo7QUFPRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Rkg7QUFDQTtBQUNBO0lBQ3FCbEMsTTtBQUNuQjtBQUNGO0FBQ0E7QUFDRSxrQkFBWUQsTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLSSxLQUFMLEdBQWEsQ0FBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzhCQUNzQjtBQUFBLFVBQWRnRixHQUFjLFFBQWRBLEdBQWM7QUFBQSxVQUFUakQsS0FBUyxRQUFUQSxLQUFTOztBQUNsQixVQUFJLENBQUMsS0FBS25DLE1BQVYsRUFBa0I7QUFDaEIsZUFBT21DLEtBQVA7QUFDRDs7QUFDRCxVQUFJaUQsR0FBSixFQUFTO0FBQ1AsZUFBTyxLQUFLcEYsTUFBTCxDQUFZb0YsR0FBWixDQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFLcEYsTUFBTCxDQUFZLEtBQUtJLEtBQUwsRUFBWixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JIO0FBQ0E7QUFDQTs7SUFFcUJpRixTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZM0YsR0FBWixFQUFpQjtBQUFBOztBQUNmLFNBQUs0RixnQkFBTCxHQUF3Qix5RUFBeEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLHVKQUFwQjtBQUVBLFNBQUtDLGNBQUwsR0FBc0JDLGlFQUFBLDhCQUNoQi9GLEdBQUcsQ0FBQ2dHLFNBQUosSUFBaUIsRUFERCxJQUVwQixJQUZvQixFQUdwQixJQUhvQixFQUlwQixJQUpvQixFQUtwQixJQUxvQixFQU1wQixJQU5vQixFQU9wQixJQVBvQixFQVFwQixJQVJvQixFQVNwQixJQVRvQixFQVVwQixJQVZvQixHQUF0QjtBQWFBLFNBQUtDLG1CQUFMLEdBQTJCLHFDQUEzQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCSCxvRUFBQSxDQUFvQy9GLEdBQUcsQ0FBQ21HLGdCQUF4QyxDQUExQjtBQUVBLFNBQUtDLHdCQUFMLEdBQWdDTCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQ3FHLHFCQUF6QyxDQUFoQztBQUNBLFNBQUtDLGtDQUFMLEdBQTBDUCxxRUFBQSxDQUN4Qy9GLEdBQUcsQ0FBQ3VHLDZCQURvQyxDQUExQztBQUdBLFNBQUtDLHNCQUFMLEdBQThCVCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQ3lHLG9CQUF6QyxDQUE5QjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCWCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQzJHLGFBQXpDLENBQTVCO0FBRUEsU0FBS0MsVUFBTCxHQUFrQmIsNkRBQUEsQ0FBNkIvRixHQUFHLENBQUM2RyxnQkFBakMsQ0FBbEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CZiwrREFBQSxDQUErQi9GLEdBQUcsQ0FBQytHLFdBQW5DLENBQXBCO0FBRUEsU0FBS0MsZ0JBQUwsR0FBd0JqQiw4REFBQSxDQUE4Qi9GLEdBQUcsQ0FBQ2lILFVBQWxDLENBQXhCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJuQiw4REFBQSxDQUE4Qi9GLEdBQUcsQ0FBQ21ILFdBQWxDLENBQXpCO0FBRUEsU0FBS0MseUJBQUwsR0FBaUNyQixvRUFBQSxDQUMvQi9GLEdBQUcsQ0FBQ3FILHVCQUQyQixFQUUvQixRQUYrQixDQUFqQztBQUlBLFNBQUtDLDZCQUFMLEdBQXFDdkIsb0VBQUEsQ0FDbkMvRixHQUFHLENBQUN1SCxxQkFEK0IsRUFFbkMsaUJBRm1DLENBQXJDO0FBSUEsU0FBS0MsOEJBQUwsR0FBc0N6QixvRUFBQSxDQUNwQy9GLEdBQUcsQ0FBQ3VILHFCQURnQyxFQUVwQ3hCLGlFQUFBLENBQWlDL0YsR0FBRyxDQUFDK0csV0FBckMsQ0FGb0MsQ0FBdEM7QUFJRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs2QkFDV1UsSyxFQUFPO0FBQ2QsVUFBTWhILE1BQU0sR0FBRyxFQUFmO0FBQ0EsVUFBSUcsS0FBSixDQUZjLENBSWQ7O0FBQ0EsYUFBTzZHLEtBQUssQ0FBQzNELE1BQWIsRUFBcUI7QUFDbkI7QUFDQSxZQUFNRCxnQkFBZ0IsR0FBRyxLQUFLNkQsYUFBTCxDQUFtQkQsS0FBbkIsQ0FBekI7QUFDQUEsYUFBSyxHQUFHQSxLQUFLLENBQUNFLFNBQU4sQ0FBZ0I5RCxnQkFBZ0IsQ0FBQ0MsTUFBakMsQ0FBUjs7QUFFQSxZQUFJMkQsS0FBSyxDQUFDM0QsTUFBVixFQUFrQjtBQUNoQjtBQUNBbEQsZUFBSyxHQUFHLEtBQUtnSCxZQUFMLENBQWtCSCxLQUFsQixFQUF5QjdHLEtBQXpCLENBQVIsQ0FGZ0IsQ0FHaEI7O0FBQ0E2RyxlQUFLLEdBQUdBLEtBQUssQ0FBQ0UsU0FBTixDQUFnQi9HLEtBQUssQ0FBQzZCLEtBQU4sQ0FBWXFCLE1BQTVCLENBQVI7QUFFQXJELGdCQUFNLENBQUN3RSxJQUFQLGlDQUFpQnJFLEtBQWpCO0FBQXdCaUQsNEJBQWdCLEVBQWhCQTtBQUF4QjtBQUNEO0FBQ0Y7O0FBQ0QsYUFBT3BELE1BQVA7QUFDRDs7O2tDQUVhZ0gsSyxFQUFPO0FBQ25CLFVBQU1JLE9BQU8sR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVksS0FBS2xDLGdCQUFqQixDQUFoQjtBQUNBLGFBQU9pQyxPQUFPLEdBQUdBLE9BQU8sQ0FBQyxDQUFELENBQVYsR0FBZ0IsRUFBOUI7QUFDRDs7O2lDQUVZSixLLEVBQU9NLGEsRUFBZTtBQUNqQyxhQUNFLEtBQUtDLGVBQUwsQ0FBcUJQLEtBQXJCLEtBQ0EsS0FBS1EsY0FBTCxDQUFvQlIsS0FBcEIsQ0FEQSxJQUVBLEtBQUtTLGlCQUFMLENBQXVCVCxLQUF2QixDQUZBLElBR0EsS0FBS1Usa0JBQUwsQ0FBd0JWLEtBQXhCLENBSEEsSUFJQSxLQUFLVyxtQkFBTCxDQUF5QlgsS0FBekIsQ0FKQSxJQUtBLEtBQUtZLGNBQUwsQ0FBb0JaLEtBQXBCLENBTEEsSUFNQSxLQUFLYSxvQkFBTCxDQUEwQmIsS0FBMUIsRUFBaUNNLGFBQWpDLENBTkEsSUFPQSxLQUFLUSxZQUFMLENBQWtCZCxLQUFsQixDQVBBLElBUUEsS0FBS2UsZ0JBQUwsQ0FBc0JmLEtBQXRCLENBVEY7QUFXRDs7O29DQUVlQSxLLEVBQU87QUFDckIsYUFBTyxLQUFLZ0IsbUJBQUwsQ0FBeUJoQixLQUF6QixLQUFtQyxLQUFLaUIsb0JBQUwsQ0FBMEJqQixLQUExQixDQUExQztBQUNEOzs7d0NBRW1CQSxLLEVBQU87QUFDekIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDQyxZQUZjO0FBRy9CcUgsYUFBSyxFQUFFLEtBQUsxQztBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozt5Q0FFb0J1QixLLEVBQU87QUFDMUIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDRyxhQUZjO0FBRy9CbUgsYUFBSyxFQUFFLEtBQUszQztBQUhtQixPQUExQixDQUFQO0FBS0Q7OzttQ0FFY3dCLEssRUFBTztBQUNwQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUN1SCxNQUZjO0FBRy9CRCxhQUFLLEVBQUUsS0FBSzlCO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3NDQUVpQlcsSyxFQUFPO0FBQ3ZCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ2EsVUFGYztBQUcvQnlHLGFBQUssRUFBRSxLQUFLNUI7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7dUNBRWtCUyxLLEVBQU87QUFDeEIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDZSxXQUZjO0FBRy9CdUcsYUFBSyxFQUFFLEtBQUsxQjtBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozt3Q0FFbUJPLEssRUFBTztBQUN6QixhQUNFLEtBQUtxQiw2QkFBTCxDQUFtQ3JCLEtBQW5DLEtBQ0EsS0FBS3NCLDhCQUFMLENBQW9DdEIsS0FBcEMsQ0FEQSxJQUVBLEtBQUt1QiwwQkFBTCxDQUFnQ3ZCLEtBQWhDLENBSEY7QUFLRDs7O2tEQUU2QkEsSyxFQUFPO0FBQ25DLGFBQU8sS0FBS3dCLDBCQUFMLENBQWdDO0FBQ3JDeEIsYUFBSyxFQUFMQSxLQURxQztBQUVyQ21CLGFBQUssRUFBRSxLQUFLdEIsNkJBRnlCO0FBR3JDNEIsZ0JBQVEsRUFBRSxrQkFBQ0MsQ0FBRDtBQUFBLGlCQUFPQSxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFSLENBQVA7QUFBQTtBQUgyQixPQUFoQyxDQUFQO0FBS0Q7OzttREFFOEIzQixLLEVBQU87QUFBQTs7QUFDcEMsYUFBTyxLQUFLd0IsMEJBQUwsQ0FBZ0M7QUFDckN4QixhQUFLLEVBQUxBLEtBRHFDO0FBRXJDbUIsYUFBSyxFQUFFLEtBQUtwQiw4QkFGeUI7QUFHckMwQixnQkFBUSxFQUFFLGtCQUFDQyxDQUFEO0FBQUEsaUJBQ1IsS0FBSSxDQUFDRSx3QkFBTCxDQUE4QjtBQUFFM0QsZUFBRyxFQUFFeUQsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBUixFQUFXLENBQUMsQ0FBWixDQUFQO0FBQXVCRSxxQkFBUyxFQUFFSCxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDLENBQVQ7QUFBbEMsV0FBOUIsQ0FEUTtBQUFBO0FBSDJCLE9BQWhDLENBQVA7QUFNRDs7OytDQUUwQjNCLEssRUFBTztBQUNoQyxhQUFPLEtBQUt3QiwwQkFBTCxDQUFnQztBQUNyQ3hCLGFBQUssRUFBTEEsS0FEcUM7QUFFckNtQixhQUFLLEVBQUUsS0FBS3hCLHlCQUZ5QjtBQUdyQzhCLGdCQUFRLEVBQUUsa0JBQUNDLENBQUQ7QUFBQSxpQkFBT0EsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBUixDQUFQO0FBQUE7QUFIMkIsT0FBaEMsQ0FBUDtBQUtEOzs7cURBRXNEO0FBQUEsVUFBMUIzQixLQUEwQixRQUExQkEsS0FBMEI7QUFBQSxVQUFuQm1CLEtBQW1CLFFBQW5CQSxLQUFtQjtBQUFBLFVBQVpNLFFBQVksUUFBWkEsUUFBWTtBQUNyRCxVQUFNdEksS0FBSyxHQUFHLEtBQUsrSCxvQkFBTCxDQUEwQjtBQUFFbEIsYUFBSyxFQUFMQSxLQUFGO0FBQVNtQixhQUFLLEVBQUxBLEtBQVQ7QUFBZ0J2SCxZQUFJLEVBQUVDLG1EQUFVLENBQUNpQjtBQUFqQyxPQUExQixDQUFkOztBQUNBLFVBQUkzQixLQUFKLEVBQVc7QUFDVEEsYUFBSyxDQUFDOEUsR0FBTixHQUFZd0QsUUFBUSxDQUFDdEksS0FBSyxDQUFDNkIsS0FBUCxDQUFwQjtBQUNEOztBQUNELGFBQU83QixLQUFQO0FBQ0Q7OztvREFFNEM7QUFBQSxVQUFsQjhFLEdBQWtCLFNBQWxCQSxHQUFrQjtBQUFBLFVBQWI0RCxTQUFhLFNBQWJBLFNBQWE7QUFDM0MsYUFBTzVELEdBQUcsQ0FBQ3hDLE9BQUosQ0FBWSxJQUFJcUcsTUFBSixDQUFXQywyREFBWSxDQUFDLE9BQU9GLFNBQVIsQ0FBdkIsRUFBMkMsSUFBM0MsQ0FBWixFQUE4REEsU0FBOUQsQ0FBUDtBQUNELEssQ0FFRDs7OzttQ0FDZTdCLEssRUFBTztBQUNwQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNtSSxNQUZjO0FBRy9CYixhQUFLLEVBQUUsS0FBSy9DO0FBSG1CLE9BQTFCLENBQVA7QUFLRCxLLENBRUQ7Ozs7cUNBQ2lCNEIsSyxFQUFPO0FBQ3RCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ3NDLFFBRmM7QUFHL0JnRixhQUFLLEVBQUUsS0FBSzlDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3lDQUVvQjJCLEssRUFBT00sYSxFQUFlO0FBQ3pDO0FBQ0E7QUFDQSxVQUFJQSxhQUFhLElBQUlBLGFBQWEsQ0FBQ3RGLEtBQS9CLElBQXdDc0YsYUFBYSxDQUFDdEYsS0FBZCxLQUF3QixHQUFwRSxFQUF5RTtBQUN2RSxlQUFPaUgsU0FBUDtBQUNEOztBQUNELGFBQ0UsS0FBS0Msd0JBQUwsQ0FBOEJsQyxLQUE5QixLQUNBLEtBQUttQyx1QkFBTCxDQUE2Qm5DLEtBQTdCLENBREEsSUFFQSxLQUFLb0MsZ0NBQUwsQ0FBc0NwQyxLQUF0QyxDQUZBLElBR0EsS0FBS3FDLHFCQUFMLENBQTJCckMsS0FBM0IsQ0FKRjtBQU1EOzs7NkNBRXdCQSxLLEVBQU87QUFDOUIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDSyxrQkFGYztBQUcvQmlILGFBQUssRUFBRSxLQUFLeEM7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7NENBRXVCcUIsSyxFQUFPO0FBQzdCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ1MsZ0JBRmM7QUFHL0I2RyxhQUFLLEVBQUUsS0FBS3BDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3FEQUVnQ2lCLEssRUFBTztBQUN0QyxhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNPLDRCQUZjO0FBRy9CK0csYUFBSyxFQUFFLEtBQUt0QztBQUhtQixPQUExQixDQUFQO0FBS0Q7OzswQ0FFcUJtQixLLEVBQU87QUFDM0IsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDVyxRQUZjO0FBRy9CMkcsYUFBSyxFQUFFLEtBQUtsQztBQUhtQixPQUExQixDQUFQO0FBS0Q7OztpQ0FFWWUsSyxFQUFPO0FBQ2xCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ3lJLElBRmM7QUFHL0JuQixhQUFLLEVBQUUsS0FBS2hDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O2dEQUU0QztBQUFBLFVBQXRCYSxLQUFzQixTQUF0QkEsS0FBc0I7QUFBQSxVQUFmcEcsSUFBZSxTQUFmQSxJQUFlO0FBQUEsVUFBVHVILEtBQVMsU0FBVEEsS0FBUztBQUMzQyxVQUFNZixPQUFPLEdBQUdKLEtBQUssQ0FBQ0ssS0FBTixDQUFZYyxLQUFaLENBQWhCO0FBRUEsYUFBT2YsT0FBTyxHQUFHO0FBQUV4RyxZQUFJLEVBQUpBLElBQUY7QUFBUW9CLGFBQUssRUFBRW9GLE9BQU8sQ0FBQyxDQUFEO0FBQXRCLE9BQUgsR0FBaUM2QixTQUEvQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzUkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLFNBQVNNLG1CQUFULENBQTZCQyxvQkFBN0IsRUFBbUQ7QUFDeEQsU0FBTyxJQUFJVixNQUFKLGFBQ0FXLCtEQUFnQixDQUFDRCxvQkFBRCxDQUFoQixDQUF1Q0UsR0FBdkMsQ0FBMkNYLG1EQUEzQyxFQUF5RFksSUFBekQsQ0FBOEQsR0FBOUQsQ0FEQSxVQUVMLEdBRkssQ0FBUDtBQUlEO0FBRU0sU0FBU0Msc0JBQVQsQ0FBZ0NsRSxnQkFBaEMsRUFBa0Q7QUFDdkQsU0FBTyxJQUFJb0QsTUFBSixnQkFDR3BELGdCQUFnQixDQUFDZ0UsR0FBakIsQ0FBcUIsVUFBQ0csQ0FBRDtBQUFBLFdBQU9kLDJEQUFZLENBQUNjLENBQUQsQ0FBbkI7QUFBQSxHQUFyQixFQUE2Q0YsSUFBN0MsQ0FBa0QsR0FBbEQsQ0FESCw0QkFFTCxHQUZLLENBQVA7QUFJRDtBQUVNLFNBQVNHLHVCQUFULENBQWlDNUQsYUFBakMsRUFBZ0Q7QUFDckQsTUFBSUEsYUFBYSxDQUFDN0MsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM5QixXQUFPLElBQUl5RixNQUFKLFNBQW1CLEdBQW5CLENBQVA7QUFDRDs7QUFDRCxNQUFNaUIsb0JBQW9CLEdBQUdOLCtEQUFnQixDQUFDdkQsYUFBRCxDQUFoQixDQUFnQ3lELElBQWhDLENBQXFDLEdBQXJDLEVBQTBDbEgsT0FBMUMsQ0FBa0QsSUFBbEQsRUFBeUQsTUFBekQsQ0FBN0I7QUFDQSxTQUFPLElBQUlxRyxNQUFKLGFBQWdCaUIsb0JBQWhCLFdBQTRDLElBQTVDLENBQVA7QUFDRDtBQUVNLFNBQVNDLGVBQVQsR0FBNEM7QUFBQSxNQUFuQkMsWUFBbUIsdUVBQUosRUFBSTtBQUNqRCxTQUFPLElBQUluQixNQUFKLG9HQUN1Rm1CLFlBQVksQ0FBQ04sSUFBYixDQUMxRixFQUQwRixDQUR2RixVQUlMLEdBSkssQ0FBUDtBQU1EO0FBRU0sU0FBU08saUJBQVQsQ0FBMkI1RCxXQUEzQixFQUF3QztBQUM3QyxTQUFPLElBQUl3QyxNQUFKLENBQVcsT0FBT3FCLG1CQUFtQixDQUFDN0QsV0FBRCxDQUExQixHQUEwQyxHQUFyRCxFQUEwRCxHQUExRCxDQUFQO0FBQ0QsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxTQUFTNkQsbUJBQVQsQ0FBNkI3RCxXQUE3QixFQUEwQztBQUMvQyxNQUFNOEQsUUFBUSxHQUFHO0FBQ2YsVUFBTSxrQkFEUztBQUVmLFVBQU0sd0JBRlM7QUFHZixVQUFNLDJDQUhTO0FBSWYsVUFBTSx5Q0FKUztBQUtmLFVBQU0seUNBTFM7QUFNZixXQUFPLDRDQU5RO0FBT2YsWUFBUSwyQ0FQTztBQVFmLFlBQVEsMkNBUk87QUFTZkMsTUFBRSxFQUFFO0FBVFcsR0FBakI7QUFZQSxTQUFPL0QsV0FBVyxDQUFDb0QsR0FBWixDQUFnQixVQUFDWSxDQUFEO0FBQUEsV0FBT0YsUUFBUSxDQUFDRSxDQUFELENBQWY7QUFBQSxHQUFoQixFQUFvQ1gsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBUDtBQUNEO0FBRU0sU0FBU1ksZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQ3ZDLFNBQU8sSUFBSTFCLE1BQUosQ0FBVyxPQUFPMEIsTUFBTSxDQUFDZCxHQUFQLENBQVdlLFdBQVgsRUFBd0JkLElBQXhCLENBQTZCLEdBQTdCLENBQVAsR0FBMkMsR0FBdEQsRUFBMkQsSUFBM0QsQ0FBUDtBQUNEOztBQUVELFNBQVNjLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQUlBLEtBQUssQ0FBQ3JILE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEI7QUFDQSxXQUFPMEYsMkRBQVksQ0FBQzJCLEtBQUQsQ0FBbkI7QUFDRCxHQUhELE1BR087QUFDTDtBQUNBLFdBQU8sUUFBUUEsS0FBUixHQUFnQixLQUF2QjtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0Msc0JBQVQsQ0FBZ0NDLEtBQWhDLEVBQXVDQyxPQUF2QyxFQUFnRDtBQUNyRCxNQUFJQyxzREFBTyxDQUFDRixLQUFELENBQVgsRUFBb0I7QUFDbEIsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsTUFBTUcsVUFBVSxHQUFHSCxLQUFLLENBQUNsQixHQUFOLENBQVVYLG1EQUFWLEVBQXdCWSxJQUF4QixDQUE2QixHQUE3QixDQUFuQjtBQUVBLFNBQU8sSUFBSWIsTUFBSixnQkFBbUJpQyxVQUFuQixpQkFBb0NGLE9BQXBDLFNBQWlELEdBQWpELENBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNuRkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsSUFBTUcsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ3BLLElBQUQsRUFBT3VILEtBQVA7QUFBQSxTQUFpQixVQUFDaEksS0FBRDtBQUFBLFdBQVcsQ0FBQUEsS0FBSyxTQUFMLElBQUFBLEtBQUssV0FBTCxZQUFBQSxLQUFLLENBQUVTLElBQVAsTUFBZ0JBLElBQWhCLElBQXdCdUgsS0FBSyxDQUFDOEMsSUFBTixDQUFXOUssS0FBWCxhQUFXQSxLQUFYLHVCQUFXQSxLQUFLLENBQUU2QixLQUFsQixDQUFuQztBQUFBLEdBQWpCO0FBQUEsQ0FBaEI7O0FBRU8sSUFBTWMsS0FBSyxHQUFHa0ksT0FBTyxDQUFDbkssbURBQVUsQ0FBQ1MsZ0JBQVosRUFBOEIsUUFBOUIsQ0FBckI7QUFFQSxJQUFNeUIsU0FBUyxHQUFHaUksT0FBTyxDQUFDbkssbURBQVUsQ0FBQ1csUUFBWixFQUFzQixZQUF0QixDQUF6QjtBQUVBLElBQU1xQyxPQUFPLEdBQUdtSCxPQUFPLENBQUNuSyxtREFBVSxDQUFDSyxrQkFBWixFQUFnQyxVQUFoQyxDQUF2QjtBQUVBLElBQU1nSyxLQUFLLEdBQUdGLE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNLLGtCQUFaLEVBQWdDLGdCQUFoQyxDQUFyQjtBQUVBLElBQU1pSyxJQUFJLEdBQUdILE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNXLFFBQVosRUFBc0IsT0FBdEIsQ0FBcEI7QUFFQSxJQUFNNEosUUFBUSxHQUFHSixPQUFPLENBQUNuSyxtREFBVSxDQUFDSyxrQkFBWixFQUFnQyxXQUFoQyxDQUF4QjtBQUVBLElBQU1tSyxLQUFLLEdBQUdMLE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNlLFdBQVosRUFBeUIsUUFBekIsQ0FBckIsQzs7Ozs7Ozs7Ozs7O0FDaEJQO0FBQUE7QUFDQTtBQUNBO0FBQ2U7QUFDYjBILE1BQUksRUFBRSxNQURPO0FBRWJsQixRQUFNLEVBQUUsUUFGSztBQUdiNUcsVUFBUSxFQUFFLFVBSEc7QUFJYk4sb0JBQWtCLEVBQUUsb0JBSlA7QUFLYkUsOEJBQTRCLEVBQUUsOEJBTGpCO0FBTWJFLGtCQUFnQixFQUFFLGtCQU5MO0FBT2I2QixVQUFRLEVBQUUsVUFQRztBQVFiekIsWUFBVSxFQUFFLFlBUkM7QUFTYkUsYUFBVyxFQUFFLGFBVEE7QUFVYmQsY0FBWSxFQUFFLGNBVkQ7QUFXYkUsZUFBYSxFQUFFLGVBWEY7QUFZYmdJLFFBQU0sRUFBRSxRQVpLO0FBYWJsSCxhQUFXLEVBQUU7QUFiQSxDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBLElBQU1vRSxhQUFhLEdBQUcsQ0FDcEIsS0FEb0IsRUFFcEIsVUFGb0IsRUFHcEIsT0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsVUFMb0IsRUFNcEIsT0FOb0IsRUFPcEIsT0FQb0IsRUFRcEIsS0FSb0IsRUFTcEIsS0FUb0IsRUFVcEIsT0FWb0IsRUFXcEIsSUFYb0IsRUFZcEIsS0Fab0IsRUFhcEIsWUFib0IsRUFjcEIsV0Fkb0IsRUFlcEIsU0Fmb0IsRUFnQnBCLFlBaEJvQixFQWlCcEIsSUFqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFlBbkJvQixFQW9CcEIsT0FwQm9CLEVBcUJwQixlQXJCb0IsRUFzQnBCLEtBdEJvQixFQXVCcEIsV0F2Qm9CLEVBd0JwQixLQXhCb0IsRUF5QnBCLFFBekJvQixFQTBCcEIsT0ExQm9CLEVBMkJwQixTQTNCb0IsRUE0QnBCLFFBNUJvQixFQTZCcEIsUUE3Qm9CLEVBOEJwQixNQTlCb0IsRUErQnBCLFNBL0JvQixFQWdDcEIsTUFoQ29CLEVBaUNwQixZQWpDb0IsRUFrQ3BCLElBbENvQixFQW1DcEIsT0FuQ29CLEVBb0NwQixNQXBDb0IsRUFxQ3BCLFFBckNvQixFQXNDcEIsU0F0Q29CLEVBdUNwQixhQXZDb0IsRUF3Q3BCLFVBeENvQixFQXlDcEIsTUF6Q29CLEVBMENwQixNQTFDb0IsRUEyQ3BCLE9BM0NvQixFQTRDcEIsTUE1Q29CLEVBNkNwQixTQTdDb0IsRUE4Q3BCLE1BOUNvQixFQStDcEIsV0EvQ29CLEVBZ0RwQixrQkFoRG9CLEVBaURwQixhQWpEb0IsRUFrRHBCLE9BbERvQixFQW1EcEIsTUFuRG9CLEVBb0RwQixPQXBEb0IsRUFxRHBCLE9BckRvQixFQXNEcEIsU0F0RG9CLEVBdURwQixVQXZEb0IsRUF3RHBCLFNBeERvQixFQXlEcEIsU0F6RG9CLEVBMERwQixZQTFEb0IsRUEyRHBCLFFBM0RvQixFQTREcEIsUUE1RG9CLEVBNkRwQixTQTdEb0IsRUE4RHBCLFFBOURvQixFQStEcEIsUUEvRG9CLEVBZ0VwQixXQWhFb0IsRUFpRXBCLFNBakVvQixFQWtFcEIsWUFsRW9CLEVBbUVwQixZQW5Fb0IsRUFvRXBCLFVBcEVvQixFQXFFcEIsVUFyRW9CLEVBc0VwQixTQXRFb0IsRUF1RXBCLE1BdkVvQixFQXdFcEIsZUF4RW9CLEVBeUVwQixPQXpFb0IsRUEwRXBCLFdBMUVvQixFQTJFcEIsV0EzRW9CLEVBNEVwQixZQTVFb0IsRUE2RXBCLFFBN0VvQixFQThFcEIsT0E5RW9CLEVBK0VwQixNQS9Fb0IsRUFnRnBCLFdBaEZvQixFQWlGcEIsU0FqRm9CLEVBa0ZwQixjQWxGb0IsRUFtRnBCLGlDQW5Gb0IsRUFvRnBCLGtCQXBGb0IsRUFxRnBCLGNBckZvQixFQXNGcEIsY0F0Rm9CLEVBdUZwQixnQkF2Rm9CLEVBd0ZwQixnQkF4Rm9CLEVBeUZwQixjQXpGb0IsRUEwRnBCLG1CQTFGb0IsRUEyRnBCLGtCQTNGb0IsRUE0RnBCLGtDQTVGb0IsRUE2RnBCLGNBN0ZvQixFQThGcEIsUUE5Rm9CLEVBK0ZwQixPQS9Gb0IsRUFnR3BCLE1BaEdvQixFQWlHcEIsVUFqR29CLEVBa0dwQixtQkFsR29CLEVBbUdwQixrQkFuR29CLEVBb0dwQixNQXBHb0IsRUFxR3BCLEtBckdvQixFQXNHcEIsTUF0R29CLEVBdUdwQixZQXZHb0IsRUF3R3BCLFVBeEdvQixFQXlHcEIsUUF6R29CLEVBMEdwQixRQTFHb0IsRUEyR3BCLGlCQTNHb0IsRUE0R3BCLGdCQTVHb0IsRUE2R3BCLFlBN0dvQixFQThHcEIsS0E5R29CLEVBK0dwQixTQS9Hb0IsRUFnSHBCLFNBaEhvQixFQWlIcEIsU0FqSG9CLEVBa0hwQixVQWxIb0IsRUFtSHBCLFlBbkhvQixFQW9IcEIsUUFwSG9CLEVBcUhwQixXQXJIb0IsRUFzSHBCLFlBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixVQXhIb0IsRUF5SHBCLFlBekhvQixFQTBIcEIsZUExSG9CLEVBMkhwQixhQTNIb0IsRUE0SHBCLFNBNUhvQixFQTZIcEIsVUE3SG9CLEVBOEhwQixZQTlIb0IsRUErSHBCLFVBL0hvQixFQWdJcEIsSUFoSW9CLEVBaUlwQixVQWpJb0IsRUFrSXBCLFFBbElvQixFQW1JcEIsTUFuSW9CLEVBb0lwQixRQXBJb0IsRUFxSXBCLFNBcklvQixFQXNJcEIsTUF0SW9CLEVBdUlwQixVQXZJb0IsRUF3SXBCLFNBeElvQixFQXlJcEIsTUF6SW9CLEVBMElwQixRQTFJb0IsRUEySXBCLFFBM0lvQixFQTRJcEIsVUE1SW9CLEVBNklwQixZQTdJb0IsRUE4SXBCLEtBOUlvQixFQStJcEIsVUEvSW9CLEVBZ0pwQixRQWhKb0IsRUFpSnBCLE9BakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLFdBcEpvQixFQXFKcEIsV0FySm9CLEVBc0pwQixXQXRKb0IsRUF1SnBCLE1BdkpvQixFQXdKcEIsU0F4Sm9CLEVBeUpwQixRQXpKb0IsRUEwSnBCLE1BMUpvQixFQTJKcEIsS0EzSm9CLEVBNEpwQixTQTVKb0IsRUE2SnBCLFVBN0pvQixFQThKcEIsVUE5Sm9CLEVBK0pwQixTQS9Kb0IsRUFnS3BCLE9BaEtvQixFQWlLcEIsUUFqS29CLEVBa0twQixPQWxLb0IsRUFtS3BCLFdBbktvQixFQW9LcEIsTUFwS29CLEVBcUtwQixRQXJLb0IsRUFzS3BCLE9BdEtvQixFQXVLcEIsT0F2S29CLEVBd0twQixPQXhLb0IsRUF5S3BCLE9BektvQixFQTBLcEIsS0ExS29CLEVBMktwQixTQTNLb0IsRUE0S3BCLE1BNUtvQixFQTZLcEIsTUE3S29CLEVBOEtwQixVQTlLb0IsRUErS3BCLFFBL0tvQixFQWdMcEIsU0FoTG9CLEVBaUxwQixXQWpMb0IsRUFrTHBCLEtBbExvQixFQW1McEIsUUFuTG9CLEVBb0xwQixNQXBMb0IsRUFxTHBCLE9BckxvQixFQXNMcEIsU0F0TG9CLEVBdUxwQixPQXZMb0IsRUF3THBCLFVBeExvQixFQXlMcEIsU0F6TG9CLEVBMExwQixNQTFMb0IsRUEyTHBCLGNBM0xvQixFQTRMcEIsTUE1TG9CLEVBNkxwQixNQTdMb0IsRUE4THBCLE1BOUxvQixFQStMcEIsT0EvTG9CLEVBZ01wQixVQWhNb0IsRUFpTXBCLElBak1vQixFQWtNcEIsV0FsTW9CLEVBbU1wQixJQW5Nb0IsRUFvTXBCLFdBcE1vQixFQXFNcEIsV0FyTW9CLEVBc01wQixXQXRNb0IsRUF1TXBCLE9Bdk1vQixFQXdNcEIsV0F4TW9CLEVBeU1wQixZQXpNb0IsRUEwTXBCLEtBMU1vQixFQTJNcEIsVUEzTW9CLEVBNE1wQixTQTVNb0IsRUE2TXBCLE9BN01vQixFQThNcEIsT0E5TW9CLEVBK01wQixhQS9Nb0IsRUFnTnBCLFFBaE5vQixFQWlOcEIsS0FqTm9CLEVBa05wQixTQWxOb0IsRUFtTnBCLFdBbk5vQixFQW9OcEIsY0FwTm9CLEVBcU5wQixVQXJOb0IsRUFzTnBCLE1BdE5vQixFQXVOcEIsSUF2Tm9CLEVBd05wQixRQXhOb0IsRUF5TnBCLFdBek5vQixFQTBOcEIsU0ExTm9CLEVBMk5wQixLQTNOb0IsRUE0TnBCLE1BNU5vQixFQTZOcEIsTUE3Tm9CLEVBOE5wQixLQTlOb0IsRUErTnBCLE9BL05vQixFQWdPcEIsVUFoT29CLEVBaU9wQixPQWpPb0IsRUFrT3BCLFNBbE9vQixFQW1PcEIsVUFuT29CLEVBb09wQixTQXBPb0IsRUFxT3BCLE9Bck9vQixFQXNPcEIsTUF0T29CLEVBdU9wQixNQXZPb0IsRUF3T3BCLFVBeE9vQixFQXlPcEIsSUF6T29CLEVBME9wQixPQTFPb0IsRUEyT3BCLFdBM09vQixFQTRPcEIsUUE1T29CLEVBNk9wQixXQTdPb0IsRUE4T3BCLGdCQTlPb0IsRUErT3BCLFNBL09vQixFQWdQcEIsVUFoUG9CLEVBaVBwQixNQWpQb0IsRUFrUHBCLFNBbFBvQixFQW1QcEIsVUFuUG9CLEVBb1BwQixNQXBQb0IsRUFxUHBCLE1BclBvQixFQXNQcEIsT0F0UG9CLEVBdVBwQixZQXZQb0IsRUF3UHBCLE9BeFBvQixFQXlQcEIsY0F6UG9CLEVBMFBwQixLQTFQb0IsRUEyUHBCLFVBM1BvQixFQTRQcEIsUUE1UG9CLEVBNlBwQixPQTdQb0IsRUE4UHBCLFFBOVBvQixFQStQcEIsYUEvUG9CLEVBZ1FwQixjQWhRb0IsRUFpUXBCLEtBalFvQixFQWtRcEIsUUFsUW9CLEVBbVFwQixTQW5Rb0IsRUFvUXBCLFVBcFFvQixFQXFRcEIsS0FyUW9CLEVBc1FwQixNQXRRb0IsRUF1UXBCLFVBdlFvQixFQXdRcEIsUUF4UW9CLEVBeVFwQixPQXpRb0IsRUEwUXBCLFFBMVFvQixFQTJRcEIsVUEzUW9CLEVBNFFwQixLQTVRb0IsRUE2UXBCLFVBN1FvQixFQThRcEIsU0E5UW9CLEVBK1FwQixPQS9Rb0IsRUFnUnBCLE9BaFJvQixFQWlScEIsS0FqUm9CLEVBa1JwQixXQWxSb0IsRUFtUnBCLFNBblJvQixFQW9ScEIsSUFwUm9CLEVBcVJwQixTQXJSb0IsRUFzUnBCLFNBdFJvQixFQXVScEIsVUF2Um9CLEVBd1JwQixZQXhSb0IsRUF5UnBCLFlBelJvQixFQTBScEIsWUExUm9CLEVBMlJwQixNQTNSb0IsRUE0UnBCLFNBNVJvQixFQTZScEIsV0E3Um9CLEVBOFJwQixZQTlSb0IsRUErUnBCLEtBL1JvQixFQWdTcEIsTUFoU29CLEVBaVNwQixRQWpTb0IsRUFrU3BCLE9BbFNvQixFQW1TcEIsU0FuU29CLEVBb1NwQixVQXBTb0IsRUFxU3BCLE1BclNvQixFQXNTcEIsY0F0U29CLEVBdVNwQixJQXZTb0IsRUF3U3BCLFFBeFNvQixFQXlTcEIsS0F6U29CLEVBMFNwQixXQTFTb0IsRUEyU3BCLElBM1NvQixFQTRTcEIsTUE1U29CLEVBNlNwQixNQTdTb0IsRUE4U3BCLGNBOVNvQixFQStTcEIsVUEvU29CLEVBZ1RwQixRQWhUb0IsRUFpVHBCLE9BalRvQixFQWtUcEIsS0FsVG9CLEVBbVRwQixPQW5Ub0IsRUFvVHBCLE1BcFRvQixFQXFUcEIsVUFyVG9CLEVBc1RwQixTQXRUb0IsRUF1VHBCLFlBdlRvQixFQXdUcEIsU0F4VG9CLEVBeVRwQixRQXpUb0IsRUEwVHBCLFVBMVRvQixFQTJUcEIsV0EzVG9CLEVBNFRwQixNQTVUb0IsRUE2VHBCLFdBN1RvQixFQThUcEIsYUE5VG9CLEVBK1RwQixjQS9Ub0IsRUFnVXBCLFlBaFVvQixFQWlVcEIsVUFqVW9CLEVBa1VwQixNQWxVb0IsRUFtVXBCLGlCQW5Vb0IsRUFvVXBCLGlCQXBVb0IsRUFxVXBCLGNBclVvQixFQXNVcEIsV0F0VW9CLEVBdVVwQixNQXZVb0IsRUF3VXBCLFVBeFVvQixFQXlVcEIsT0F6VW9CLEVBMFVwQixXQTFVb0IsRUEyVXBCLFNBM1VvQixFQTRVcEIsU0E1VW9CLEVBNlVwQixTQTdVb0IsRUE4VXBCLFFBOVVvQixFQStVcEIsWUEvVW9CLEVBZ1ZwQixXQWhWb0IsRUFpVnBCLFNBalZvQixFQWtWcEIsTUFsVm9CLEVBbVZwQixRQW5Wb0IsRUFvVnBCLE9BcFZvQixFQXFWcEIsU0FyVm9CLEVBc1ZwQixPQXRWb0IsRUF1VnBCLE1BdlZvQixFQXdWcEIsTUF4Vm9CLEVBeVZwQixPQXpWb0IsRUEwVnBCLE1BMVZvQixFQTJWcEIsVUEzVm9CLEVBNFZwQixXQTVWb0IsRUE2VnBCLEtBN1ZvQixFQThWcEIsWUE5Vm9CLEVBK1ZwQixhQS9Wb0IsRUFnV3BCLFNBaFdvQixFQWlXcEIsV0FqV29CLEVBa1dwQixXQWxXb0IsRUFtV3BCLFlBbldvQixFQW9XcEIsZ0JBcFdvQixFQXFXcEIsU0FyV29CLEVBc1dwQixZQXRXb0IsRUF1V3BCLFVBdldvQixFQXdXcEIsVUF4V29CLEVBeVdwQixVQXpXb0IsRUEwV3BCLFNBMVdvQixFQTJXcEIsUUEzV29CLEVBNFdwQixRQTVXb0IsRUE2V3BCLE9BN1dvQixFQThXcEIsVUE5V29CLEVBK1dwQixTQS9Xb0IsRUFnWHBCLFVBaFhvQixFQWlYcEIsUUFqWG9CLEVBa1hwQixvQkFsWG9CLEVBbVhwQixRQW5Yb0IsRUFvWHBCLFNBcFhvQixFQXFYcEIsUUFyWG9CLEVBc1hwQixPQXRYb0IsRUF1WHBCLE1BdlhvQixFQXdYcEIsVUF4WG9CLEVBeVhwQixRQXpYb0IsRUEwWHBCLGVBMVhvQixFQTJYcEIsWUEzWG9CLEVBNFhwQixhQTVYb0IsRUE2WHBCLGlCQTdYb0IsRUE4WHBCLGlCQTlYb0IsRUErWHBCLGVBL1hvQixFQWdZcEIsVUFoWW9CLEVBaVlwQixTQWpZb0IsRUFrWXBCLEtBbFlvQixFQW1ZcEIsV0FuWW9CLEVBb1lwQixNQXBZb0IsRUFxWXBCLFFBcllvQixFQXNZcEIsWUF0WW9CLEVBdVlwQixLQXZZb0IsRUF3WXBCLEtBeFlvQixFQXlZcEIsV0F6WW9CLEVBMFlwQixRQTFZb0IsRUEyWXBCLE9BM1lvQixFQTRZcEIsWUE1WW9CLEVBNllwQixRQTdZb0IsRUE4WXBCLFFBOVlvQixFQStZcEIsUUEvWW9CLEVBZ1pwQixTQWhab0IsRUFpWnBCLFFBalpvQixFQWtacEIsVUFsWm9CLEVBbVpwQixXQW5ab0IsRUFvWnBCLFVBcFpvQixFQXFacEIsU0FyWm9CLEVBc1pwQixjQXRab0IsRUF1WnBCLFFBdlpvQixFQXdacEIsU0F4Wm9CLEVBeVpwQixRQXpab0IsRUEwWnBCLFVBMVpvQixFQTJacEIsTUEzWm9CLEVBNFpwQixNQTVab0IsRUE2WnBCLFFBN1pvQixFQThacEIsVUE5Wm9CLEVBK1pwQixjQS9ab0IsRUFnYXBCLEtBaGFvQixFQWlhcEIsY0FqYW9CLEVBa2FwQixPQWxhb0IsRUFtYXBCLFVBbmFvQixFQW9hcEIsWUFwYW9CLEVBcWFwQixNQXJhb0IsRUFzYXBCLFNBdGFvQixFQXVhcEIsVUF2YW9CLEVBd2FwQixPQXhhb0IsRUF5YXBCLFVBemFvQixFQTBhcEIsV0ExYW9CLEVBMmFwQixRQTNhb0IsRUE0YXBCLFVBNWFvQixFQTZhcEIsTUE3YW9CLEVBOGFwQixZQTlhb0IsRUErYXBCLGFBL2FvQixFQWdicEIsVUFoYm9CLEVBaWJwQixRQWpib0IsRUFrYnBCLE9BbGJvQixFQW1icEIsYUFuYm9CLEVBb2JwQixXQXBib0IsRUFxYnBCLEtBcmJvQixFQXNicEIsU0F0Ym9CLEVBdWJwQixXQXZib0IsRUF3YnBCLFNBeGJvQixFQXlicEIsUUF6Ym9CLEVBMGJwQixRQTFib0IsRUEyYnBCLFNBM2JvQixFQTRicEIsUUE1Ym9CLEVBNmJwQixhQTdib0IsRUE4YnBCLE9BOWJvQixFQSticEIsYUEvYm9CLEVBZ2NwQixZQWhjb0IsRUFpY3BCLE1BamNvQixFQWtjcEIsTUFsY29CLEVBbWNwQixXQW5jb0IsRUFvY3BCLGVBcGNvQixFQXFjcEIsaUJBcmNvQixFQXNjcEIsSUF0Y29CLEVBdWNwQixVQXZjb0IsRUF3Y3BCLGFBeGNvQixFQXljcEIsV0F6Y29CLEVBMGNwQixhQTFjb0IsRUEyY3BCLE9BM2NvQixFQTRjcEIsU0E1Y29CLEVBNmNwQixNQTdjb0IsRUE4Y3BCLE1BOWNvQixFQStjcEIsVUEvY29CLEVBZ2RwQixNQWhkb0IsRUFpZHBCLFNBamRvQixFQWtkcEIsTUFsZG9CLEVBbWRwQixRQW5kb0IsRUFvZHBCLFNBcGRvQixFQXFkcEIsUUFyZG9CLEVBc2RwQixPQXRkb0IsRUF1ZHBCLE9BdmRvQixFQXdkcEIsT0F4ZG9CLEVBeWRwQixNQXpkb0IsRUEwZHBCLE9BMWRvQixFQTJkcEIsV0EzZG9CLEVBNGRwQixPQTVkb0IsRUE2ZHBCLFNBN2RvQixFQThkcEIsVUE5ZG9CLEVBK2RwQixTQS9kb0IsRUFnZXBCLFNBaGVvQixFQWllcEIsU0FqZW9CLEVBa2VwQixVQWxlb0IsRUFtZXBCLE1BbmVvQixFQW9lcEIsU0FwZW9CLEVBcWVwQixNQXJlb0IsRUFzZXBCLFVBdGVvQixFQXVlcEIsU0F2ZW9CLEVBd2VwQixNQXhlb0IsRUF5ZXBCLFVBemVvQixFQTBlcEIsT0ExZW9CLEVBMmVwQixjQTNlb0IsRUE0ZXBCLFFBNWVvQixFQTZlcEIsTUE3ZW9CLEVBOGVwQixRQTllb0IsRUErZXBCLFNBL2VvQixFQWdmcEIsS0FoZm9CLEVBaWZwQixPQWpmb0IsRUFrZnBCLFlBbGZvQixFQW1mcEIsV0FuZm9CLEVBb2ZwQixlQXBmb0IsRUFxZnBCLE1BcmZvQixFQXNmcEIsT0F0Zm9CLENBQXRCO0FBeWZBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLGFBTDRCLEVBTTVCLFFBTjRCLEVBTzVCLGFBUDRCLEVBUTVCLE1BUjRCLEVBUzVCLFVBVDRCLEVBVTVCLElBVjRCLEVBVzVCLFFBWDRCLEVBWTVCLGFBWjRCLEVBYTVCLFdBYjRCLEVBYzVCLE9BZDRCLEVBZTVCLFVBZjRCLEVBZ0I1QixRQWhCNEIsRUFpQjVCLG9CQWpCNEIsRUFrQjVCLFlBbEI0QixFQW1CNUIsS0FuQjRCLEVBb0I1QixRQXBCNEIsRUFxQjVCLFFBckI0QixFQXNCNUIsT0F0QjRCLENBQTlCO0FBeUJBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixZQUgyQixFQUkzQixNQUoyQixFQUszQixXQUwyQixFQU0zQixpQkFOMkIsRUFPM0IsSUFQMkIsRUFRM0IsWUFSMkIsRUFTM0IsWUFUMkIsRUFVM0Isa0JBVjJCLENBQTdCOztJQWFxQnNGLFk7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUlwRyx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkJRLG1CQUFXLEVBQUUsU0FBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUxNO0FBTW5CRSxrQkFBVSxFQUFFLENBQUMsR0FBRCxDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FWQztBQVduQlUsd0JBQWdCLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTjtBQVhDLE9BQWQsQ0FBUDtBQWFEOzs7O0VBZnVDOUcsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwaUIxQztBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixLQURvQixFQUVwQixPQUZvQixFQUdwQixTQUhvQixFQUlwQixLQUpvQixFQUtwQixLQUxvQixFQU1wQixPQU5vQixFQU9wQixJQVBvQixFQVFwQixLQVJvQixFQVNwQixPQVRvQixFQVVwQixTQVZvQixFQVdwQixRQVhvQixFQVlwQixTQVpvQixFQWFwQixPQWJvQixFQWNwQixRQWRvQixFQWVwQixPQWZvQixFQWdCcEIsSUFoQm9CLEVBaUJwQixNQWpCb0IsRUFrQnBCLE1BbEJvQixFQW1CcEIsTUFuQm9CLEVBb0JwQixTQXBCb0IsRUFxQnBCLFNBckJvQixFQXNCcEIsWUF0Qm9CLEVBdUJwQixRQXZCb0IsRUF3QnBCLFNBeEJvQixFQXlCcEIsVUF6Qm9CLEVBMEJwQixXQTFCb0IsRUEyQnBCLE9BM0JvQixFQTRCcEIsUUE1Qm9CLEVBNkJwQixVQTdCb0IsRUE4QnBCLFNBOUJvQixFQStCcEIsV0EvQm9CLEVBZ0NwQixTQWhDb0IsRUFpQ3BCLFdBakNvQixFQWtDcEIsUUFsQ29CLEVBbUNwQixTQW5Db0IsRUFvQ3BCLE1BcENvQixFQXFDcEIsVUFyQ29CLEVBc0NwQixVQXRDb0IsRUF1Q3BCLElBdkNvQixFQXdDcEIsTUF4Q29CLEVBeUNwQixNQXpDb0IsRUEwQ3BCLFNBMUNvQixFQTJDcEIsTUEzQ29CLEVBNENwQixLQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsUUE5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFNBaERvQixFQWlEcEIsUUFqRG9CLEVBa0RwQixTQWxEb0IsRUFtRHBCLE9BbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixPQXJEb0IsRUFzRHBCLFNBdERvQixFQXVEcEIsS0F2RG9CLEVBd0RwQixPQXhEb0IsRUF5RHBCLE1BekRvQixFQTBEcEIsVUExRG9CLEVBMkRwQixPQTNEb0IsRUE0RHBCLE9BNURvQixFQTZEcEIsS0E3RG9CLEVBOERwQixRQTlEb0IsRUErRHBCLElBL0RvQixFQWdFcEIsUUFoRW9CLEVBaUVwQixPQWpFb0IsRUFrRXBCLElBbEVvQixFQW1FcEIsU0FuRW9CLEVBb0VwQixXQXBFb0IsRUFxRXBCLE9BckVvQixFQXNFcEIsT0F0RW9CLEVBdUVwQixRQXZFb0IsRUF3RXBCLE9BeEVvQixFQXlFcEIsUUF6RW9CLEVBMEVwQixXQTFFb0IsRUEyRXBCLE1BM0VvQixFQTRFcEIsSUE1RW9CLEVBNkVwQixNQTdFb0IsRUE4RXBCLEtBOUVvQixFQStFcEIsTUEvRW9CLEVBZ0ZwQixVQWhGb0IsRUFpRnBCLE9BakZvQixFQWtGcEIsTUFsRm9CLEVBbUZwQixNQW5Gb0IsRUFvRnBCLEtBcEZvQixFQXFGcEIsU0FyRm9CLEVBc0ZwQixNQXRGb0IsRUF1RnBCLE9BdkZvQixFQXdGcEIsS0F4Rm9CLEVBeUZwQixLQXpGb0IsRUEwRnBCLFNBMUZvQixFQTJGcEIsU0EzRm9CLEVBNEZwQixjQTVGb0IsRUE2RnBCLE9BN0ZvQixFQThGcEIsU0E5Rm9CLEVBK0ZwQixXQS9Gb0IsRUFnR3BCLE1BaEdvQixFQWlHcEIsS0FqR29CLEVBa0dwQixNQWxHb0IsRUFtR3BCLFFBbkdvQixFQW9HcEIsUUFwR29CLEVBcUdwQixRQXJHb0IsRUFzR3BCLElBdEdvQixFQXVHcEIsUUF2R29CLEVBd0dwQixJQXhHb0IsRUF5R3BCLE9BekdvQixFQTBHcEIsT0ExR29CLEVBMkdwQixNQTNHb0IsRUE0R3BCLE9BNUdvQixFQTZHcEIsV0E3R29CLEVBOEdwQixVQTlHb0IsRUErR3BCLE1BL0dvQixFQWdIcEIsTUFoSG9CLEVBaUhwQixTQWpIb0IsRUFrSHBCLFNBbEhvQixFQW1IcEIsU0FuSG9CLEVBb0hwQixXQXBIb0IsRUFxSHBCLFdBckhvQixFQXNIcEIsUUF0SG9CLEVBdUhwQixLQXZIb0IsRUF3SHBCLE9BeEhvQixFQXlIcEIsUUF6SG9CLEVBMEhwQixRQTFIb0IsRUEySHBCLFFBM0hvQixFQTRIcEIsV0E1SG9CLEVBNkhwQixRQTdIb0IsRUE4SHBCLE9BOUhvQixFQStIcEIsTUEvSG9CLEVBZ0lwQixVQWhJb0IsRUFpSXBCLFdBaklvQixFQWtJcEIsUUFsSW9CLEVBbUlwQixRQW5Jb0IsRUFvSXBCLE1BcElvQixFQXFJcEIsTUFySW9CLEVBc0lwQixLQXRJb0IsRUF1SXBCLE1BdklvQixFQXdJcEIsTUF4SW9CLEVBeUlwQixPQXpJb0IsRUEwSXBCLFlBMUlvQixFQTJJcEIsUUEzSW9CLEVBNElwQixRQTVJb0IsRUE2SXBCLE1BN0lvQixFQThJcEIsSUE5SW9CLEVBK0lwQixhQS9Jb0IsRUFnSnBCLFNBaEpvQixFQWlKcEIsTUFqSm9CLEVBa0pwQixVQWxKb0IsRUFtSnBCLE9BbkpvQixFQW9KcEIsT0FwSm9CLEVBcUpwQixRQXJKb0IsRUFzSnBCLFNBdEpvQixFQXVKcEIsUUF2Sm9CLEVBd0pwQixPQXhKb0IsRUF5SnBCLFFBekpvQixFQTBKcEIsUUExSm9CLEVBMkpwQixLQTNKb0IsRUE0SnBCLE1BNUpvQixFQTZKcEIsT0E3Sm9CLEVBOEpwQixVQTlKb0IsRUErSnBCLE9BL0pvQixFQWdLcEIsUUFoS29CLEVBaUtwQixRQWpLb0IsRUFrS3BCLEtBbEtvQixFQW1LcEIsTUFuS29CLEVBb0twQixNQXBLb0IsRUFxS3BCLE9BcktvQixFQXNLcEIsT0F0S29CLEVBdUtwQixNQXZLb0IsRUF3S3BCLFFBeEtvQixFQXlLcEIsTUF6S29CLEVBMEtwQixLQTFLb0IsQ0FBdEI7QUE2S0EsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsYUFENEIsRUFFNUIsWUFGNEIsRUFHNUIsUUFINEIsRUFJNUIscUJBSjRCLEVBSzVCLGdCQUw0QixFQU01QixnQkFONEIsRUFPNUIsTUFQNEIsRUFRNUIsVUFSNEIsRUFTNUIsUUFUNEIsRUFVNUIsT0FWNEIsRUFXNUIsYUFYNEIsRUFZNUIsS0FaNEIsRUFhNUIsT0FiNEIsRUFjNUIsT0FkNEIsRUFlNUIsTUFmNEIsRUFnQjVCLFVBaEI0QixFQWlCNUIsU0FqQjRCLEVBa0I1QixRQWxCNEIsRUFtQjVCLG9CQW5CNEIsRUFvQjVCLFlBcEI0QixFQXFCNUIsS0FyQjRCLEVBc0I1QixRQXRCNEIsRUF1QjVCLFFBdkI0QixFQXdCNUIsUUF4QjRCLEVBeUI1QixVQXpCNEIsRUEwQjVCLFFBMUI0QixFQTJCNUIsT0EzQjRCLENBQTlCO0FBOEJBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixNQUgyQixFQUkzQixXQUoyQixFQUszQixpQkFMMkIsRUFNM0IsSUFOMkIsRUFPM0IsWUFQMkIsRUFRM0IsWUFSMkIsRUFTM0Isa0JBVDJCLEVBVTNCLEtBVjJCLENBQTdCOztJQWFxQnVGLGE7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUlyRyx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkJRLG1CQUFXLEVBQUUsU0FBTyxJQUFQLEVBQWEsSUFBYixDQUxNO0FBTW5CRSxrQkFBVSxFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FQTTtBQVFuQkksNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBUko7QUFTbkJwQix3QkFBZ0IsRUFBRSxDQUFDLEdBQUQsRUFBTSxJQUFOO0FBVEMsT0FBZCxDQUFQO0FBV0Q7Ozs7RUFid0NwRyx1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN04zQztBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU00RyxhQUFhLEdBQUcsQ0FDcEIsR0FEb0IsRUFFcEIsWUFGb0IsRUFHcEIsT0FIb0IsRUFJcEIsV0FKb0IsRUFLcEIsS0FMb0IsRUFNcEIsT0FOb0IsRUFPcEIsS0FQb0IsRUFRcEIsT0FSb0IsRUFTcEIsSUFUb0IsRUFVcEIsS0FWb0IsRUFXcEIsSUFYb0IsRUFZcEIsV0Fab0IsRUFhcEIsUUFib0IsRUFjcEIsS0Fkb0IsRUFlcEIsU0Fmb0IsRUFnQnBCLFlBaEJvQixFQWlCcEIsZ0JBakJvQixFQWtCcEIsUUFsQm9CLEVBbUJwQixXQW5Cb0IsRUFvQnBCLE9BcEJvQixFQXFCcEIsTUFyQm9CLEVBc0JwQixTQXRCb0IsRUF1QnBCLE1BdkJvQixFQXdCcEIsT0F4Qm9CLEVBeUJwQixTQXpCb0IsRUEwQnBCLE1BMUJvQixFQTJCcEIsSUEzQm9CLEVBNEJwQixNQTVCb0IsRUE2QnBCLEdBN0JvQixFQThCcEIsTUE5Qm9CLEVBK0JwQixTQS9Cb0IsRUFnQ3BCLFNBaENvQixFQWlDcEIsTUFqQ29CLEVBa0NwQixXQWxDb0IsRUFtQ3BCLE1BbkNvQixFQW9DcEIsV0FwQ29CLEVBcUNwQixTQXJDb0IsRUFzQ3BCLGFBdENvQixFQXVDcEIsV0F2Q29CLEVBd0NwQixPQXhDb0IsRUF5Q3BCLFdBekNvQixFQTBDcEIsT0ExQ29CLEVBMkNwQixPQTNDb0IsRUE0Q3BCLFNBNUNvQixFQTZDcEIsVUE3Q29CLEVBOENwQixVQTlDb0IsRUErQ3BCLFNBL0NvQixFQWdEcEIsU0FoRG9CLEVBaURwQixTQWpEb0IsRUFrRHBCLFNBbERvQixFQW1EcEIsUUFuRG9CLEVBb0RwQixXQXBEb0IsRUFxRHBCLFVBckRvQixFQXNEcEIsVUF0RG9CLEVBdURwQixTQXZEb0IsRUF3RHBCLFVBeERvQixFQXlEcEIsYUF6RG9CLEVBMERwQixTQTFEb0IsRUEyRHBCLFVBM0RvQixFQTREcEIsU0E1RG9CLEVBNkRwQixPQTdEb0IsRUE4RHBCLE9BOURvQixFQStEcEIsUUEvRG9CLEVBZ0VwQixZQWhFb0IsRUFpRXBCLFNBakVvQixFQWtFcEIsU0FsRW9CLEVBbUVwQixRQW5Fb0IsRUFvRXBCLGFBcEVvQixFQXFFcEIsVUFyRW9CLEVBc0VwQixNQXRFb0IsRUF1RXBCLFdBdkVvQixFQXdFcEIsTUF4RW9CLEVBeUVwQixLQXpFb0IsRUEwRXBCLFNBMUVvQixFQTJFcEIsU0EzRW9CLEVBNEVwQixRQTVFb0IsRUE2RXBCLFFBN0VvQixFQThFcEIsT0E5RW9CLEVBK0VwQixNQS9Fb0IsRUFnRnBCLGVBaEZvQixFQWlGcEIsV0FqRm9CLEVBa0ZwQixVQWxGb0IsRUFtRnBCLElBbkZvQixFQW9GcEIsUUFwRm9CLEVBcUZwQixNQXJGb0IsRUFzRnBCLFVBdEZvQixFQXVGcEIsU0F2Rm9CLEVBd0ZwQixPQXhGb0IsRUF5RnBCLE9BekZvQixFQTBGcEIsS0ExRm9CLEVBMkZwQixRQTNGb0IsRUE0RnBCLFlBNUZvQixFQTZGcEIsV0E3Rm9CLEVBOEZwQixTQTlGb0IsRUErRnBCLFFBL0ZvQixFQWdHcEIsTUFoR29CLEVBaUdwQixTQWpHb0IsRUFrR3BCLFVBbEdvQixFQW1HcEIsU0FuR29CLEVBb0dwQixPQXBHb0IsRUFxR3BCLE9BckdvQixFQXNHcEIsT0F0R29CLEVBdUdwQixPQXZHb0IsRUF3R3BCLE9BeEdvQixFQXlHcEIsT0F6R29CLEVBMEdwQixLQTFHb0IsRUEyR3BCLFFBM0dvQixFQTRHcEIsT0E1R29CLEVBNkdwQixNQTdHb0IsRUE4R3BCLFVBOUdvQixFQStHcEIsU0EvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLE9BakhvQixFQWtIcEIsT0FsSG9CLEVBbUhwQixNQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsUUFySG9CLEVBc0hwQixNQXRIb0IsRUF1SHBCLFlBdkhvQixFQXdIcEIsSUF4SG9CLEVBeUhwQixXQXpIb0IsRUEwSHBCLElBMUhvQixFQTJIcEIsV0EzSG9CLEVBNEhwQixPQTVIb0IsRUE2SHBCLFNBN0hvQixFQThIcEIsV0E5SG9CLEVBK0hwQixTQS9Ib0IsRUFnSXBCLFVBaElvQixFQWlJcEIsY0FqSW9CLEVBa0lwQixLQWxJb0IsRUFtSXBCLFNBbklvQixFQW9JcEIsV0FwSW9CLEVBcUlwQixVQXJJb0IsRUFzSXBCLE1BdElvQixFQXVJcEIsWUF2SW9CLEVBd0lwQixJQXhJb0IsRUF5SXBCLFdBeklvQixFQTBJcEIsTUExSW9CLEVBMklwQixVQTNJb0IsRUE0SXBCLE9BNUlvQixFQTZJcEIsU0E3SW9CLEVBOElwQixRQTlJb0IsRUErSXBCLE9BL0lvQixFQWdKcEIsU0FoSm9CLEVBaUpwQixNQWpKb0IsRUFrSnBCLE9BbEpvQixFQW1KcEIsT0FuSm9CLEVBb0pwQixPQXBKb0IsRUFxSnBCLFNBckpvQixFQXNKcEIsT0F0Sm9CLEVBdUpwQixNQXZKb0IsRUF3SnBCLE1BeEpvQixFQXlKcEIsS0F6Sm9CLEVBMEpwQixLQTFKb0IsRUEySnBCLFFBM0pvQixFQTRKcEIsUUE1Sm9CLEVBNkpwQixPQTdKb0IsRUE4SnBCLEtBOUpvQixFQStKcEIsUUEvSm9CLEVBZ0twQixVQWhLb0IsRUFpS3BCLEtBaktvQixFQWtLcEIsTUFsS29CLEVBbUtwQixPQW5Lb0IsRUFvS3BCLFVBcEtvQixFQXFLcEIsTUFyS29CLEVBc0twQixLQXRLb0IsRUF1S3BCLFVBdktvQixFQXdLcEIsUUF4S29CLEVBeUtwQixTQXpLb0IsRUEwS3BCLFVBMUtvQixFQTJLcEIsT0EzS29CLEVBNEtwQixLQTVLb0IsRUE2S3BCLFNBN0tvQixFQThLcEIsWUE5S29CLEVBK0twQixRQS9Lb0IsRUFnTHBCLEtBaExvQixFQWlMcEIsUUFqTG9CLEVBa0xwQixNQWxMb0IsRUFtTHBCLFFBbkxvQixFQW9McEIsYUFwTG9CLEVBcUxwQixRQXJMb0IsRUFzTHBCLFFBdExvQixFQXVMcEIsU0F2TG9CLEVBd0xwQixTQXhMb0IsRUF5THBCLGFBekxvQixFQTBMcEIsYUExTG9CLEVBMkxwQixhQTNMb0IsRUE0THBCLGVBNUxvQixFQTZMcEIsV0E3TG9CLEVBOExwQixRQTlMb0IsRUErTHBCLFFBL0xvQixFQWdNcEIsY0FoTW9CLEVBaU1wQixVQWpNb0IsRUFrTXBCLFdBbE1vQixFQW1NcEIsU0FuTW9CLEVBb01wQixJQXBNb0IsRUFxTXBCLEtBck1vQixFQXNNcEIsSUF0TW9CLEVBdU1wQixNQXZNb0IsRUF3TXBCLFFBeE1vQixFQXlNcEIsTUF6TW9CLEVBME1wQixVQTFNb0IsRUEyTXBCLFFBM01vQixFQTRNcEIsUUE1TW9CLEVBNk1wQixTQTdNb0IsRUE4TXBCLE9BOU1vQixFQStNcEIsY0EvTW9CLEVBZ05wQixRQWhOb0IsRUFpTnBCLFNBak5vQixFQWtOcEIsUUFsTm9CLEVBbU5wQixLQW5Ob0IsRUFvTnBCLFVBcE5vQixFQXFOcEIsWUFyTm9CLEVBc05wQixTQXROb0IsRUF1TnBCLGlCQXZOb0IsRUF3TnBCLFdBeE5vQixFQXlOcEIsWUF6Tm9CLEVBME5wQixRQTFOb0IsRUEyTnBCLFdBM05vQixFQTROcEIsUUE1Tm9CLEVBNk5wQixTQTdOb0IsRUE4TnBCLE1BOU5vQixFQStOcEIsV0EvTm9CLEVBZ09wQixhQWhPb0IsRUFpT3BCLFdBak9vQixFQWtPcEIsVUFsT29CLEVBbU9wQixXQW5Pb0IsRUFvT3BCLFFBcE9vQixFQXFPcEIsV0FyT29CLEVBc09wQixPQXRPb0IsRUF1T3BCLFNBdk9vQixFQXdPcEIsV0F4T29CLEVBeU9wQixRQXpPb0IsRUEwT3BCLE9BMU9vQixFQTJPcEIsT0EzT29CLEVBNE9wQixLQTVPb0IsRUE2T3BCLE1BN09vQixFQThPcEIsTUE5T29CLEVBK09wQixRQS9Pb0IsRUFnUHBCLEtBaFBvQixFQWlQcEIsV0FqUG9CLEVBa1BwQixTQWxQb0IsRUFtUHBCLFdBblBvQixFQW9QcEIsS0FwUG9CLEVBcVBwQixXQXJQb0IsRUFzUHBCLFFBdFBvQixFQXVQcEIsVUF2UG9CLEVBd1BwQixjQXhQb0IsRUF5UHBCLFFBelBvQixFQTBQcEIsUUExUG9CLEVBMlBwQixXQTNQb0IsRUE0UHBCLFNBNVBvQixFQTZQcEIsUUE3UG9CLEVBOFBwQixVQTlQb0IsRUErUHBCLEtBL1BvQixFQWdRcEIsT0FoUW9CLEVBaVFwQixRQWpRb0IsRUFrUXBCLFNBbFFvQixFQW1RcEIsUUFuUW9CLEVBb1FwQixNQXBRb0IsRUFxUXBCLFdBclFvQixFQXNRcEIsS0F0UW9CLEVBdVFwQixLQXZRb0IsRUF3UXBCLEtBeFFvQixFQXlRcEIsUUF6UW9CLEVBMFFwQixRQTFRb0IsRUEyUXBCLFNBM1FvQixFQTRRcEIsTUE1UW9CLEVBNlFwQixVQTdRb0IsRUE4UXBCLFVBOVFvQixFQStRcEIsY0EvUW9CLEVBZ1JwQixPQWhSb0IsRUFpUnBCLE9BalJvQixFQWtScEIsUUFsUm9CLEVBbVJwQixNQW5Sb0IsRUFvUnBCLFVBcFJvQixFQXFScEIsTUFyUm9CLEVBc1JwQixPQXRSb0IsRUF1UnBCLFFBdlJvQixFQXdScEIsS0F4Um9CLEVBeVJwQixTQXpSb0IsRUEwUnBCLFNBMVJvQixFQTJScEIsU0EzUm9CLEVBNFJwQixTQTVSb0IsRUE2UnBCLFVBN1JvQixFQThScEIsVUE5Um9CLEVBK1JwQixPQS9Sb0IsRUFnU3BCLFFBaFNvQixFQWlTcEIsUUFqU29CLEVBa1NwQixRQWxTb0IsRUFtU3BCLFFBblNvQixFQW9TcEIsUUFwU29CLEVBcVNwQixPQXJTb0IsRUFzU3BCLGFBdFNvQixFQXVTcEIsY0F2U29CLEVBd1NwQixlQXhTb0IsRUF5U3BCLFNBelNvQixFQTBTcEIsWUExU29CLEVBMlNwQixLQTNTb0IsRUE0U3BCLFNBNVNvQixFQTZTcEIsU0E3U29CLEVBOFNwQixTQTlTb0IsRUErU3BCLE9BL1NvQixFQWdUcEIsS0FoVG9CLEVBaVRwQixLQWpUb0IsRUFrVHBCLE1BbFRvQixFQW1UcEIsTUFuVG9CLEVBb1RwQixXQXBUb0IsRUFxVHBCLGVBclRvQixFQXNUcEIsZUF0VG9CLEVBdVRwQixpQkF2VG9CLEVBd1RwQixpQkF4VG9CLEVBeVRwQixJQXpUb0IsRUEwVHBCLFVBMVRvQixFQTJUcEIsYUEzVG9CLEVBNFRwQixlQTVUb0IsRUE2VHBCLFNBN1RvQixFQThUcEIsTUE5VG9CLEVBK1RwQixTQS9Ub0IsRUFnVXBCLE1BaFVvQixFQWlVcEIsS0FqVW9CLEVBa1VwQixLQWxVb0IsRUFtVXBCLEtBblVvQixFQW9VcEIsS0FwVW9CLEVBcVVwQixPQXJVb0IsRUFzVXBCLFFBdFVvQixFQXVVcEIsUUF2VW9CLEVBd1VwQixVQXhVb0IsRUF5VXBCLFdBelVvQixFQTBVcEIsS0ExVW9CLEVBMlVwQixNQTNVb0IsRUE0VXBCLE9BNVVvQixFQTZVcEIsVUE3VW9CLEVBOFVwQixRQTlVb0IsRUErVXBCLE9BL1VvQixFQWdWcEIsU0FoVm9CLEVBaVZwQixVQWpWb0IsRUFrVnBCLFVBbFZvQixFQW1WcEIsVUFuVm9CLEVBb1ZwQixRQXBWb0IsRUFxVnBCLFNBclZvQixFQXNWcEIsTUF0Vm9CLEVBdVZwQixPQXZWb0IsRUF3VnBCLE1BeFZvQixFQXlWcEIsVUF6Vm9CLEVBMFZwQixPQTFWb0IsRUEyVnBCLE1BM1ZvQixFQTRWcEIsTUE1Vm9CLEVBNlZwQixTQTdWb0IsRUE4VnBCLE9BOVZvQixFQStWcEIsTUEvVm9CLEVBZ1dwQixNQWhXb0IsQ0FBdEI7QUFtV0EsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsY0FGNEIsRUFHNUIsYUFINEIsRUFJNUIsT0FKNEIsRUFLNUIsWUFMNEIsRUFNNUIsU0FONEIsRUFPNUIsYUFQNEIsRUFRNUIsUUFSNEIsRUFTNUIsS0FUNEIsRUFVNUIsUUFWNEIsRUFXNUIsV0FYNEIsRUFZNUIsYUFaNEIsRUFhNUIsTUFiNEIsRUFjNUIsVUFkNEIsRUFlNUIsUUFmNEIsRUFnQjVCLGFBaEI0QixFQWlCNUIsUUFqQjRCLEVBa0I1QixPQWxCNEIsRUFtQjVCLE1BbkI0QixFQW9CNUIsUUFwQjRCLEVBcUI1QixVQXJCNEIsRUFzQjVCLFFBdEI0QixFQXVCNUIsb0JBdkI0QixFQXdCNUIsWUF4QjRCLEVBeUI1QixLQXpCNEIsRUEwQjVCLFlBMUI0QixFQTJCNUIsUUEzQjRCLEVBNEI1QixRQTVCNEIsRUE2QjVCLE9BN0I0QixDQUE5QjtBQWdDQSxJQUFNRSw2QkFBNkIsR0FBRyxDQUFDLFdBQUQsRUFBYyxlQUFkLEVBQStCLE9BQS9CLEVBQXdDLE9BQXhDLEVBQWlELFdBQWpELENBQXRDO0FBRUEsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsYUFGMkIsRUFHM0IsWUFIMkIsRUFJM0IsTUFKMkIsRUFLM0IsS0FMMkIsRUFNM0IsWUFOMkIsRUFPM0IsTUFQMkIsRUFRM0IsV0FSMkIsRUFTM0IsaUJBVDJCLEVBVTNCLElBVjJCLEVBVzNCLGFBWDJCLEVBWTNCLFlBWjJCLEVBYTNCLFlBYjJCLEVBYzNCLGtCQWQyQixFQWUzQixNQWYyQixFQWdCM0IsS0FoQjJCLENBQTdCOztJQW1CcUJ3RixjOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJdEcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sS0FBUCxFQUFjLElBQWQsRUFBb0IsSUFBcEIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sS0FBTixDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FWQztBQVduQlUsd0JBQWdCLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckI7QUFYQyxPQUFkLENBQVA7QUFhRDs7O2tDQUVhakcsSyxFQUFPO0FBQ25CLFVBQUkrSyx5REFBSyxDQUFDL0ssS0FBRCxDQUFMLElBQWdCZ0wsd0RBQUksQ0FBQyxLQUFLcEwscUJBQU4sQ0FBeEIsRUFBc0Q7QUFDcEQsZUFBTztBQUFFYSxjQUFJLEVBQUVDLHdEQUFVLENBQUNXLFFBQW5CO0FBQTZCUSxlQUFLLEVBQUU3QixLQUFLLENBQUM2QjtBQUExQyxTQUFQO0FBQ0Q7O0FBQ0QsYUFBTzdCLEtBQVA7QUFDRDs7OztFQXRCeUNiLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1o1QztBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixRQUhvQixFQUlwQixRQUpvQixFQUtwQixLQUxvQixFQU1wQixPQU5vQixFQU9wQixPQVBvQixFQVFwQixXQVJvQixFQVNwQixLQVRvQixFQVVwQixNQVZvQixFQVdwQixPQVhvQixFQVlwQixRQVpvQixFQWFwQixTQWJvQixFQWNwQixTQWRvQixFQWVwQixLQWZvQixFQWdCcEIsS0FoQm9CLEVBaUJwQixPQWpCb0IsRUFrQnBCLElBbEJvQixFQW1CcEIsS0FuQm9CLEVBb0JwQixXQXBCb0IsRUFxQnBCLFlBckJvQixFQXNCcEIsWUF0Qm9CLEVBdUJwQixJQXZCb0IsRUF3QnBCLFFBeEJvQixFQXlCcEIsV0F6Qm9CLEVBMEJwQixlQTFCb0IsRUEyQnBCLFVBM0JvQixFQTRCcEIsUUE1Qm9CLEVBNkJwQixPQTdCb0IsRUE4QnBCLFNBOUJvQixFQStCcEIsUUEvQm9CLEVBZ0NwQixRQWhDb0IsRUFpQ3BCLEtBakNvQixFQWtDcEIsU0FsQ29CLEVBbUNwQixNQW5Db0IsRUFvQ3BCLElBcENvQixFQXFDcEIsT0FyQ29CLEVBc0NwQixNQXRDb0IsRUF1Q3BCLFFBdkNvQixFQXdDcEIsU0F4Q29CLEVBeUNwQixVQXpDb0IsRUEwQ3BCLE1BMUNvQixFQTJDcEIsTUEzQ29CLEVBNENwQixTQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsTUE5Q29CLEVBK0NwQixXQS9Db0IsRUFnRHBCLGlCQWhEb0IsRUFpRHBCLE9BakRvQixFQWtEcEIsWUFsRG9CLEVBbURwQixPQW5Eb0IsRUFvRHBCLE9BcERvQixFQXFEcEIsU0FyRG9CLEVBc0RwQixVQXREb0IsRUF1RHBCLFNBdkRvQixFQXdEcEIsV0F4RG9CLEVBeURwQixRQXpEb0IsRUEwRHBCLFNBMURvQixFQTJEcEIsU0EzRG9CLEVBNERwQixVQTVEb0IsRUE2RHBCLFFBN0RvQixFQThEcEIsV0E5RG9CLEVBK0RwQixjQS9Eb0IsRUFnRXBCLGVBaEVvQixFQWlFcEIsVUFqRW9CLEVBa0VwQixZQWxFb0IsRUFtRXBCLFlBbkVvQixFQW9FcEIsYUFwRW9CLEVBcUVwQixTQXJFb0IsRUFzRXBCLFVBdEVvQixFQXVFcEIsWUF2RW9CLEVBd0VwQixNQXhFb0IsRUF5RXBCLE1BekVvQixFQTBFcEIsUUExRW9CLEVBMkVwQixPQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsTUE3RW9CLEVBOEVwQixTQTlFb0IsRUErRXBCLGlCQS9Fb0IsRUFnRnBCLGNBaEZvQixFQWlGcEIsY0FqRm9CLEVBa0ZwQixnQkFsRm9CLEVBbUZwQixjQW5Gb0IsRUFvRnBCLG1CQXBGb0IsRUFxRnBCLGNBckZvQixFQXNGcEIsUUF0Rm9CLEVBdUZwQixPQXZGb0IsRUF3RnBCLE1BeEZvQixFQXlGcEIsVUF6Rm9CLEVBMEZwQixLQTFGb0IsRUEyRnBCLFlBM0ZvQixFQTRGcEIsS0E1Rm9CLEVBNkZwQixTQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsU0EvRm9CLEVBZ0dwQixVQWhHb0IsRUFpR3BCLFlBakdvQixFQWtHcEIsVUFsR29CLEVBbUdwQixTQW5Hb0IsRUFvR3BCLFFBcEdvQixFQXFHcEIsV0FyR29CLEVBc0dwQixZQXRHb0IsRUF1R3BCLFNBdkdvQixFQXdHcEIsTUF4R29CLEVBeUdwQixRQXpHb0IsRUEwR3BCLFlBMUdvQixFQTJHcEIsU0EzR29CLEVBNEdwQixTQTVHb0IsRUE2R3BCLFVBN0dvQixFQThHcEIsSUE5R29CLEVBK0dwQixVQS9Hb0IsRUFnSHBCLFFBaEhvQixFQWlIcEIsUUFqSG9CLEVBa0hwQixNQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsTUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLFVBdEhvQixFQXVIcEIsV0F2SG9CLEVBd0hwQixLQXhIb0IsRUF5SHBCLE1BekhvQixFQTBIcEIsUUExSG9CLEVBMkhwQixPQTNIb0IsRUE0SHBCLFFBNUhvQixFQTZIcEIsU0E3SG9CLEVBOEhwQixXQTlIb0IsRUErSHBCLFdBL0hvQixFQWdJcEIsU0FoSW9CLEVBaUlwQixRQWpJb0IsRUFrSXBCLFNBbElvQixFQW1JcEIsWUFuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFVBcklvQixFQXNJcEIsU0F0SW9CLEVBdUlwQixPQXZJb0IsRUF3SXBCLFFBeElvQixFQXlJcEIsT0F6SW9CLEVBMElwQixRQTFJb0IsRUEySXBCLE9BM0lvQixFQTRJcEIsT0E1SW9CLEVBNklwQixXQTdJb0IsRUE4SXBCLEtBOUlvQixFQStJcEIsT0EvSW9CLEVBZ0pwQixTQWhKb0IsRUFpSnBCLFNBakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixNQW5Kb0IsRUFvSnBCLE1BcEpvQixFQXFKcEIsVUFySm9CLEVBc0pwQixXQXRKb0IsRUF1SnBCLFdBdkpvQixFQXdKcEIsUUF4Sm9CLEVBeUpwQixPQXpKb0IsRUEwSnBCLFNBMUpvQixFQTJKcEIsVUEzSm9CLEVBNEpwQixPQTVKb0IsRUE2SnBCLFVBN0pvQixFQThKcEIsUUE5Sm9CLEVBK0pwQixTQS9Kb0IsRUFnS3BCLFFBaEtvQixFQWlLcEIsUUFqS29CLEVBa0twQixNQWxLb0IsRUFtS3BCLE1BbktvQixFQW9LcEIsVUFwS29CLEVBcUtwQixJQXJLb0IsRUFzS3BCLE9BdEtvQixFQXVLcEIsV0F2S29CLEVBd0twQixXQXhLb0IsRUF5S3BCLFVBektvQixFQTBLcEIsUUExS29CLEVBMktwQixJQTNLb0IsRUE0S3BCLFNBNUtvQixFQTZLcEIsV0E3S29CLEVBOEtwQixXQTlLb0IsRUErS3BCLE9BL0tvQixFQWdMcEIsU0FoTG9CLEVBaUxwQixTQWpMb0IsRUFrTHBCLFVBbExvQixFQW1McEIsV0FuTG9CLEVBb0xwQixRQXBMb0IsRUFxTHBCLE9BckxvQixFQXNMcEIsT0F0TG9CLEVBdUxwQixPQXZMb0IsRUF3THBCLGFBeExvQixFQXlMcEIsUUF6TG9CLEVBMExwQixTQTFMb0IsRUEyTHBCLEtBM0xvQixFQTRMcEIsU0E1TG9CLEVBNkxwQixXQTdMb0IsRUE4THBCLFVBOUxvQixFQStMcEIsTUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLElBak1vQixFQWtNcEIsUUFsTW9CLEVBbU1wQixXQW5Nb0IsRUFvTXBCLE1BcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixPQXRNb0IsRUF1TXBCLFVBdk1vQixFQXdNcEIsT0F4TW9CLEVBeU1wQixNQXpNb0IsRUEwTXBCLFNBMU1vQixFQTJNcEIsU0EzTW9CLEVBNE1wQixXQTVNb0IsRUE2TXBCLE9BN01vQixFQThNcEIsTUE5TW9CLEVBK01wQixPQS9Nb0IsRUFnTnBCLE1BaE5vQixFQWlOcEIsT0FqTm9CLEVBa05wQixRQWxOb0IsRUFtTnBCLE1Bbk5vQixFQW9OcEIsT0FwTm9CLEVBcU5wQixXQXJOb0IsRUFzTnBCLGdCQXROb0IsRUF1TnBCLFVBdk5vQixFQXdOcEIsTUF4Tm9CLEVBeU5wQixRQXpOb0IsRUEwTnBCLFFBMU5vQixFQTJOcEIsU0EzTm9CLEVBNE5wQixPQTVOb0IsRUE2TnBCLGNBN05vQixFQThOcEIsVUE5Tm9CLEVBK05wQixRQS9Ob0IsRUFnT3BCLFFBaE9vQixFQWlPcEIsVUFqT29CLEVBa09wQixNQWxPb0IsRUFtT3BCLE9Bbk9vQixFQW9PcEIsTUFwT29CLEVBcU9wQixNQXJPb0IsRUFzT3BCLE9BdE9vQixFQXVPcEIsVUF2T29CLEVBd09wQixTQXhPb0IsRUF5T3BCLE9Bek9vQixFQTBPcEIsS0ExT29CLEVBMk9wQixNQTNPb0IsRUE0T3BCLEtBNU9vQixFQTZPcEIsS0E3T29CLEVBOE9wQixNQTlPb0IsRUErT3BCLE1BL09vQixFQWdQcEIsSUFoUG9CLEVBaVBwQixNQWpQb0IsRUFrUHBCLFdBbFBvQixFQW1QcEIsWUFuUG9CLEVBb1BwQixLQXBQb0IsRUFxUHBCLFNBclBvQixFQXNQcEIsUUF0UG9CLEVBdVBwQixTQXZQb0IsRUF3UHBCLFFBeFBvQixFQXlQcEIsTUF6UG9CLEVBMFBwQixRQTFQb0IsRUEyUHBCLE9BM1BvQixFQTRQcEIsU0E1UG9CLEVBNlBwQixRQTdQb0IsRUE4UHBCLElBOVBvQixFQStQcEIsS0EvUG9CLEVBZ1FwQixRQWhRb0IsRUFpUXBCLE1BalFvQixFQWtRcEIsS0FsUW9CLEVBbVFwQixJQW5Rb0IsRUFvUXBCLE1BcFFvQixFQXFRcEIsVUFyUW9CLEVBc1FwQixRQXRRb0IsRUF1UXBCLFNBdlFvQixFQXdRcEIsSUF4UW9CLEVBeVFwQixPQXpRb0IsRUEwUXBCLFlBMVFvQixFQTJRcEIsUUEzUW9CLEVBNFFwQixLQTVRb0IsRUE2UXBCLE9BN1FvQixFQThRcEIsTUE5UW9CLEVBK1FwQixVQS9Rb0IsRUFnUnBCLFNBaFJvQixFQWlScEIsWUFqUm9CLEVBa1JwQixPQWxSb0IsRUFtUnBCLE9BblJvQixFQW9ScEIsVUFwUm9CLEVBcVJwQixRQXJSb0IsRUFzUnBCLFNBdFJvQixFQXVScEIsV0F2Um9CLEVBd1JwQixTQXhSb0IsRUF5UnBCLFVBelJvQixFQTBScEIsU0ExUm9CLEVBMlJwQixPQTNSb0IsRUE0UnBCLFFBNVJvQixFQTZScEIsVUE3Um9CLEVBOFJwQixXQTlSb0IsRUErUnBCLFdBL1JvQixFQWdTcEIsU0FoU29CLEVBaVNwQixVQWpTb0IsRUFrU3BCLFVBbFNvQixFQW1TcEIsU0FuU29CLEVBb1NwQixPQXBTb0IsRUFxU3BCLFlBclNvQixFQXNTcEIsWUF0U29CLEVBdVNwQixXQXZTb0IsRUF3U3BCLFlBeFNvQixFQXlTcEIsU0F6U29CLEVBMFNwQixhQTFTb0IsRUEyU3BCLE9BM1NvQixFQTRTcEIsT0E1U29CLEVBNlNwQixNQTdTb0IsRUE4U3BCLE1BOVNvQixFQStTcEIsVUEvU29CLEVBZ1RwQixTQWhUb0IsRUFpVHBCLFdBalRvQixFQWtUcEIsS0FsVG9CLEVBbVRwQixZQW5Ub0IsRUFvVHBCLGFBcFRvQixFQXFUcEIsU0FyVG9CLEVBc1RwQixTQXRUb0IsRUF1VHBCLFVBdlRvQixFQXdUcEIsU0F4VG9CLEVBeVRwQixRQXpUb0IsRUEwVHBCLFlBMVRvQixFQTJUcEIsU0EzVG9CLEVBNFRwQixTQTVUb0IsRUE2VHBCLE9BN1RvQixFQThUcEIsU0E5VG9CLEVBK1RwQixVQS9Ub0IsRUFnVXBCLFdBaFVvQixFQWlVcEIsU0FqVW9CLEVBa1VwQixRQWxVb0IsRUFtVXBCLE9BblVvQixFQW9VcEIsTUFwVW9CLEVBcVVwQixVQXJVb0IsRUFzVXBCLFFBdFVvQixFQXVVcEIsU0F2VW9CLEVBd1VwQixVQXhVb0IsRUF5VXBCLEtBelVvQixFQTBVcEIsTUExVW9CLEVBMlVwQixNQTNVb0IsRUE0VXBCLFdBNVVvQixFQTZVcEIsUUE3VW9CLEVBOFVwQixTQTlVb0IsRUErVXBCLFFBL1VvQixFQWdWcEIsUUFoVm9CLEVBaVZwQixRQWpWb0IsRUFrVnBCLFVBbFZvQixFQW1WcEIsUUFuVm9CLEVBb1ZwQixVQXBWb0IsRUFxVnBCLFdBclZvQixFQXNWcEIsY0F0Vm9CLEVBdVZwQixRQXZWb0IsRUF3VnBCLFNBeFZvQixFQXlWcEIsY0F6Vm9CLEVBMFZwQixLQTFWb0IsRUEyVnBCLE9BM1ZvQixFQTRWcEIsTUE1Vm9CLEVBNlZwQixPQTdWb0IsRUE4VnBCLE1BOVZvQixFQStWcEIsU0EvVm9CLEVBZ1dwQixRQWhXb0IsRUFpV3BCLE1BaldvQixFQWtXcEIsVUFsV29CLEVBbVdwQixVQW5Xb0IsRUFvV3BCLE1BcFdvQixFQXFXcEIsS0FyV29CLEVBc1dwQixRQXRXb0IsRUF1V3BCLFlBdldvQixFQXdXcEIsT0F4V29CLEVBeVdwQixXQXpXb0IsRUEwV3BCLFlBMVdvQixFQTJXcEIsT0EzV29CLEVBNFdwQixRQTVXb0IsRUE2V3BCLFNBN1dvQixFQThXcEIsUUE5V29CLEVBK1dwQixRQS9Xb0IsRUFnWHBCLE9BaFhvQixFQWlYcEIsY0FqWG9CLEVBa1hwQixXQWxYb0IsRUFtWHBCLFNBblhvQixFQW9YcEIsV0FwWG9CLEVBcVhwQixPQXJYb0IsRUFzWHBCLFFBdFhvQixFQXVYcEIsT0F2WG9CLEVBd1hwQixRQXhYb0IsRUF5WHBCLGFBelhvQixFQTBYcEIsWUExWG9CLEVBMlhwQixNQTNYb0IsRUE0WHBCLFVBNVhvQixFQTZYcEIsV0E3WG9CLEVBOFhwQixNQTlYb0IsRUErWHBCLE1BL1hvQixFQWdZcEIsTUFoWW9CLEVBaVlwQixNQWpZb0IsRUFrWXBCLFdBbFlvQixFQW1ZcEIsSUFuWW9CLEVBb1lwQixVQXBZb0IsRUFxWXBCLGFBcllvQixFQXNZcEIsV0F0WW9CLEVBdVlwQixPQXZZb0IsRUF3WXBCLFNBeFlvQixFQXlZcEIsTUF6WW9CLEVBMFlwQixNQTFZb0IsRUEyWXBCLFVBM1lvQixFQTRZcEIsU0E1WW9CLEVBNllwQixNQTdZb0IsRUE4WXBCLE9BOVlvQixFQStZcEIsU0EvWW9CLEVBZ1pwQixXQWhab0IsRUFpWnBCLGFBalpvQixFQWtacEIsYUFsWm9CLEVBbVpwQixPQW5ab0IsRUFvWnBCLFFBcFpvQixFQXFacEIsU0FyWm9CLEVBc1pwQixVQXRab0IsRUF1WnBCLFVBdlpvQixFQXdacEIsT0F4Wm9CLEVBeVpwQixRQXpab0IsRUEwWnBCLE1BMVpvQixFQTJacEIsT0EzWm9CLEVBNFpwQixRQTVab0IsRUE2WnBCLE9BN1pvQixFQThacEIsVUE5Wm9CLEVBK1pwQixXQS9ab0IsRUFnYXBCLE9BaGFvQixFQWlhcEIsUUFqYW9CLEVBa2FwQixTQWxhb0IsRUFtYXBCLFVBbmFvQixFQW9hcEIsU0FwYW9CLEVBcWFwQixTQXJhb0IsRUFzYXBCLFNBdGFvQixFQXVhcEIsTUF2YW9CLEVBd2FwQixPQXhhb0IsRUF5YXBCLFVBemFvQixFQTBhcEIsTUExYW9CLEVBMmFwQixPQTNhb0IsRUE0YXBCLFlBNWFvQixFQTZhcEIsUUE3YW9CLEVBOGFwQixNQTlhb0IsRUErYXBCLFFBL2FvQixFQWdicEIsU0FoYm9CLEVBaWJwQixNQWpib0IsRUFrYnBCLFNBbGJvQixFQW1icEIsT0FuYm9CLEVBb2JwQixLQXBib0IsRUFxYnBCLGVBcmJvQixFQXNicEIsV0F0Ym9CLEVBdWJwQixZQXZib0IsRUF3YnBCLFdBeGJvQixFQXlicEIsV0F6Ym9CLEVBMGJwQixlQTFib0IsRUEyYnBCLFVBM2JvQixFQTRicEIsT0E1Ym9CLEVBNmJwQixTQTdib0IsRUE4YnBCLGNBOWJvQixFQSticEIsVUEvYm9CLEVBZ2NwQixNQWhjb0IsRUFpY3BCLEtBamNvQixFQWtjcEIsTUFsY29CLENBQXRCO0FBcWNBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLE1BTDRCLEVBTTVCLGFBTjRCLEVBTzVCLEtBUDRCLEVBUTVCLFFBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLE1BVjRCLEVBVzVCLFVBWDRCLEVBWTVCLFFBWjRCLEVBYTVCLGFBYjRCLEVBYzVCLFFBZDRCLEVBZTVCLE9BZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsb0JBbEI0QixFQW1CNUIsWUFuQjRCLEVBb0I1QixLQXBCNEIsRUFxQjVCLFFBckI0QixFQXNCNUIsUUF0QjRCLEVBdUI1QixPQXZCNEIsQ0FBOUI7QUEwQkEsSUFBTUUsNkJBQTZCLEdBQUcsQ0FBQyxXQUFELEVBQWMsZUFBZCxFQUErQixPQUEvQixFQUF3QyxXQUF4QyxDQUF0QztBQUVBLElBQU1FLG9CQUFvQixHQUFHLENBQzNCLEtBRDJCLEVBRTNCLFlBRjJCLEVBRzNCLE1BSDJCLEVBSTNCLFlBSjJCLEVBSzNCLE1BTDJCLEVBTTNCLFdBTjJCLEVBTzNCLGlCQVAyQixFQVEzQixJQVIyQixFQVMzQixZQVQyQixFQVUzQixZQVYyQixFQVczQixrQkFYMkIsRUFZM0IsTUFaMkIsQ0FBN0I7O0lBZXFCeUYsbUI7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUl2Ryx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkI7QUFDQVEsbUJBQVcsRUFBRSxTQUFPLElBQVAsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLElBQTdCLENBTk07QUFPbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQVBPO0FBUW5CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FSTTtBQVNuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBVE47QUFVbkJFLDZCQUFxQixFQUFFLEVBVko7QUFXbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FYQztBQVluQkgsaUJBQVMsRUFBRSxDQUNULElBRFMsRUFFVCxJQUZTLEVBR1QsS0FIUyxFQUlULElBSlMsRUFLVCxJQUxTLEVBTVQsS0FOUyxFQU9ULElBUFMsRUFRVCxLQVJTLEVBU1QsSUFUUyxFQVVULE1BVlMsRUFXVCxLQVhTLEVBWVQsSUFaUyxFQWFULEtBYlMsRUFjVCxJQWRTO0FBWlEsT0FBZCxDQUFQO0FBNkJEOzs7O0VBL0I4Q2pHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmZqRDtBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixRQURvQixFQUVwQixRQUZvQixFQUdwQixnQkFIb0IsRUFJcEIsU0FKb0IsRUFLcEIsT0FMb0IsRUFNcEIsSUFOb0IsRUFPcEIsS0FQb0IsRUFRcEIsZUFSb0IsRUFTcEIsUUFUb0IsRUFVcEIsUUFWb0IsRUFXcEIsY0FYb0IsRUFZcEIsTUFab0IsRUFhcEIsVUFib0IsRUFjcEIsT0Fkb0IsRUFlcEIsTUFmb0IsRUFnQnBCLE9BaEJvQixFQWlCcEIsU0FqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFlBbkJvQixFQW9CcEIsUUFwQm9CLEVBcUJwQixhQXJCb0IsRUFzQnBCLGNBdEJvQixFQXVCcEIsY0F2Qm9CLEVBd0JwQixtQkF4Qm9CLEVBeUJwQixjQXpCb0IsRUEwQnBCLGlCQTFCb0IsRUEyQnBCLFNBM0JvQixFQTRCcEIsWUE1Qm9CLEVBNkJwQixTQTdCb0IsRUE4QnBCLFFBOUJvQixFQStCcEIsT0EvQm9CLEVBZ0NwQixVQWhDb0IsRUFpQ3BCLE1BakNvQixFQWtDcEIsU0FsQ29CLEVBbUNwQixVQW5Db0IsRUFvQ3BCLElBcENvQixFQXFDcEIsTUFyQ29CLEVBc0NwQixhQXRDb0IsRUF1Q3BCLFFBdkNvQixFQXdDcEIsUUF4Q29CLEVBeUNwQixTQXpDb0IsRUEwQ3BCLFlBMUNvQixFQTJDcEIsS0EzQ29CLEVBNENwQixVQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsS0E5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFFBaERvQixFQWlEcEIsTUFqRG9CLEVBa0RwQixlQWxEb0IsRUFtRHBCLGVBbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixNQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsUUF2RG9CLEVBd0RwQixPQXhEb0IsRUF5RHBCLFdBekRvQixFQTBEcEIsTUExRG9CLEVBMkRwQixTQTNEb0IsRUE0RHBCLFdBNURvQixFQTZEcEIsZ0JBN0RvQixFQThEcEIsS0E5RG9CLEVBK0RwQixNQS9Eb0IsRUFnRXBCLEtBaEVvQixFQWlFcEIsTUFqRW9CLEVBa0VwQixPQWxFb0IsRUFtRXBCLFVBbkVvQixFQW9FcEIsVUFwRW9CLEVBcUVwQixTQXJFb0IsRUFzRXBCLFNBdEVvQixFQXVFcEIsS0F2RW9CLEVBd0VwQixPQXhFb0IsRUF5RXBCLEtBekVvQixFQTBFcEIsU0ExRW9CLEVBMkVwQixRQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsSUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsT0FoRm9CLEVBaUZwQixVQWpGb0IsRUFrRnBCLFVBbEZvQixFQW1GcEIsV0FuRm9CLEVBb0ZwQixTQXBGb0IsRUFxRnBCLGFBckZvQixFQXNGcEIsU0F0Rm9CLEVBdUZwQixTQXZGb0IsRUF3RnBCLEtBeEZvQixFQXlGcEIsV0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLFlBM0ZvQixFQTRGcEIsV0E1Rm9CLEVBNkZwQixRQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsY0EvRm9CLEVBZ0dwQixTQWhHb0IsRUFpR3BCLFNBakdvQixFQWtHcEIsUUFsR29CLEVBbUdwQixPQW5Hb0IsRUFvR3BCLEtBcEdvQixFQXFHcEIsTUFyR29CLEVBc0dwQixTQXRHb0IsRUF1R3BCLFNBdkdvQixFQXdHcEIsTUF4R29CLEVBeUdwQixXQXpHb0IsRUEwR3BCLElBMUdvQixFQTJHcEIsS0EzR29CLEVBNEdwQixVQTVHb0IsRUE2R3BCLE1BN0dvQixFQThHcEIsaUJBOUdvQixFQStHcEIsUUEvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLE9BakhvQixFQWtIcEIsU0FsSG9CLEVBbUhwQixRQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsTUFySG9CLEVBc0hwQixTQXRIb0IsRUF1SHBCLFdBdkhvQixFQXdIcEIsU0F4SG9CLEVBeUhwQixVQXpIb0IsRUEwSHBCLGFBMUhvQixFQTJIcEIsTUEzSG9CLEVBNEhwQixRQTVIb0IsRUE2SHBCLFdBN0hvQixFQThIcEIsWUE5SG9CLEVBK0hwQixNQS9Ib0IsRUFnSXBCLE1BaElvQixFQWlJcEIsV0FqSW9CLEVBa0lwQixPQWxJb0IsRUFtSXBCLE1BbklvQixFQW9JcEIsTUFwSW9CLEVBcUlwQixTQXJJb0IsRUFzSXBCLEtBdElvQixFQXVJcEIsZUF2SW9CLEVBd0lwQixnQkF4SW9CLEVBeUlwQixjQXpJb0IsRUEwSXBCLFlBMUlvQixFQTJJcEIsYUEzSW9CLEVBNElwQixVQTVJb0IsRUE2SXBCLFFBN0lvQixFQThJcEIsY0E5SW9CLEVBK0lwQixZQS9Jb0IsRUFnSnBCLGtCQWhKb0IsRUFpSnBCLGNBakpvQixFQWtKcEIsU0FsSm9CLEVBbUpwQixjQW5Kb0IsRUFvSnBCLFNBcEpvQixFQXFKcEIsWUFySm9CLEVBc0pwQixZQXRKb0IsRUF1SnBCLGlCQXZKb0IsRUF3SnBCLFVBeEpvQixFQXlKcEIsWUF6Sm9CLEVBMEpwQixVQTFKb0IsRUEySnBCLFFBM0pvQixFQTRKcEIsWUE1Sm9CLEVBNkpwQixVQTdKb0IsRUE4SnBCLFFBOUpvQixFQStKcEIsVUEvSm9CLEVBZ0twQixzQkFoS29CLEVBaUtwQixLQWpLb0IsRUFrS3BCLGVBbEtvQixFQW1LcEIsZ0JBbktvQixFQW9LcEIsZUFwS29CLEVBcUtwQixtQkFyS29CLEVBc0twQixNQXRLb0IsRUF1S3BCLGNBdktvQixFQXdLcEIsT0F4S29CLEVBeUtwQixVQXpLb0IsRUEwS3BCLFlBMUtvQixFQTJLcEIsYUEzS29CLEVBNEtwQixZQTVLb0IsRUE2S3BCLFdBN0tvQixFQThLcEIsYUE5S29CLEVBK0twQixVQS9Lb0IsRUFnTHBCLFdBaExvQixFQWlMcEIsUUFqTG9CLEVBa0xwQixjQWxMb0IsRUFtTHBCLFlBbkxvQixFQW9McEIsWUFwTG9CLEVBcUxwQixRQXJMb0IsRUFzTHBCLFVBdExvQixFQXVMcEIsTUF2TG9CLEVBd0xwQixrQkF4TG9CLEVBeUxwQixjQXpMb0IsRUEwTHBCLE1BMUxvQixFQTJMcEIsTUEzTG9CLEVBNExwQixVQTVMb0IsRUE2THBCLHNCQTdMb0IsRUE4THBCLFVBOUxvQixFQStMcEIsUUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLFdBak1vQixFQWtNcEIsUUFsTW9CLEVBbU1wQixjQW5Nb0IsRUFvTXBCLFNBcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixZQXRNb0IsRUF1TXBCLFlBdk1vQixFQXdNcEIsZUF4TW9CLEVBeU1wQixZQXpNb0IsRUEwTXBCLGlCQTFNb0IsRUEyTXBCLFVBM01vQixFQTRNcEIsY0E1TW9CLEVBNk1wQixnQkE3TW9CLEVBOE1wQixjQTlNb0IsRUErTXBCLFFBL01vQixFQWdOcEIsTUFoTm9CLEVBaU5wQixRQWpOb0IsRUFrTnBCLE1BbE5vQixFQW1OcEIsS0FuTm9CLENBQXRCO0FBc05BLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLGFBTDRCLEVBTTVCLFFBTjRCLEVBTzVCLE1BUDRCLEVBUTVCLFVBUjRCLEVBUzVCLFFBVDRCLEVBVTVCLGFBVjRCLEVBVzVCLFFBWDRCLEVBWTVCLFdBWjRCLEVBYTVCLEtBYjRCLEVBYzVCLE9BZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsb0JBbEI0QixFQW1CNUIsWUFuQjRCLEVBb0I1QixLQXBCNEIsRUFxQjVCLFdBckI0QixFQXNCNUIsT0F0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsT0F6QjRCLEVBMEI1QixRQTFCNEIsRUEyQjVCLE1BM0I0QixFQTRCNUIsUUE1QjRCLEVBNkI1QixTQTdCNEIsRUE4QjVCLFNBOUI0QixFQStCNUIsU0EvQjRCLEVBZ0M1QixTQWhDNEIsRUFpQzVCLFVBakM0QixFQWtDNUIsYUFsQzRCLEVBbUM1QixRQW5DNEIsRUFvQzVCLFdBcEM0QixFQXFDNUIsWUFyQzRCLEVBc0M1QixNQXRDNEIsRUF1QzVCLE1BdkM0QixFQXdDNUIsV0F4QzRCLEVBeUM1QixPQXpDNEIsRUEwQzVCLE1BMUM0QixFQTJDNUIsTUEzQzRCLEVBNEM1QixTQTVDNEIsRUE2QzVCLEtBN0M0QixFQThDNUIsZUE5QzRCLEVBK0M1QixnQkEvQzRCLEVBZ0Q1QixjQWhENEIsRUFpRDVCLFlBakQ0QixFQWtENUIsYUFsRDRCLEVBbUQ1QixVQW5ENEIsRUFvRDVCLFFBcEQ0QixFQXFENUIsY0FyRDRCLEVBc0Q1QixZQXRENEIsRUF1RDVCLGtCQXZENEIsRUF3RDVCLGNBeEQ0QixFQXlENUIsU0F6RDRCLEVBMEQ1QixjQTFENEIsRUEyRDVCLFNBM0Q0QixFQTRENUIsWUE1RDRCLEVBNkQ1QixZQTdENEIsRUE4RDVCLGlCQTlENEIsRUErRDVCLFVBL0Q0QixFQWdFNUIsWUFoRTRCLEVBaUU1QixVQWpFNEIsRUFrRTVCLFFBbEU0QixFQW1FNUIsWUFuRTRCLEVBb0U1QixVQXBFNEIsRUFxRTVCLFFBckU0QixFQXNFNUIsVUF0RTRCLEVBdUU1QixzQkF2RTRCLEVBd0U1QixLQXhFNEIsRUF5RTVCLGVBekU0QixFQTBFNUIsZ0JBMUU0QixFQTJFNUIsZUEzRTRCLEVBNEU1QixtQkE1RTRCLEVBNkU1QixNQTdFNEIsRUE4RTVCLGNBOUU0QixFQStFNUIsT0EvRTRCLEVBZ0Y1QixVQWhGNEIsRUFpRjVCLFlBakY0QixFQWtGNUIsYUFsRjRCLEVBbUY1QixZQW5GNEIsRUFvRjVCLFdBcEY0QixFQXFGNUIsYUFyRjRCLEVBc0Y1QixVQXRGNEIsRUF1RjVCLFdBdkY0QixFQXdGNUIsUUF4RjRCLEVBeUY1QixjQXpGNEIsRUEwRjVCLFlBMUY0QixFQTJGNUIsWUEzRjRCLEVBNEY1QixRQTVGNEIsRUE2RjVCLFVBN0Y0QixFQThGNUIsTUE5RjRCLEVBK0Y1QixrQkEvRjRCLEVBZ0c1QixjQWhHNEIsRUFpRzVCLE1Bakc0QixFQWtHNUIsTUFsRzRCLEVBbUc1QixVQW5HNEIsRUFvRzVCLHNCQXBHNEIsRUFxRzVCLFVBckc0QixFQXNHNUIsUUF0RzRCLEVBdUc1QixTQXZHNEIsRUF3RzVCLFdBeEc0QixFQXlHNUIsUUF6RzRCLEVBMEc1QixjQTFHNEIsRUEyRzVCLFNBM0c0QixFQTRHNUIsS0E1RzRCLEVBNkc1QixZQTdHNEIsRUE4RzVCLFlBOUc0QixFQStHNUIsZUEvRzRCLEVBZ0g1QixZQWhINEIsRUFpSDVCLGlCQWpINEIsRUFrSDVCLFVBbEg0QixFQW1INUIsY0FuSDRCLEVBb0g1QixnQkFwSDRCLEVBcUg1QixjQXJINEIsQ0FBOUI7QUF3SEEsSUFBTUUsNkJBQTZCLEdBQUcsRUFBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixNQUgyQixFQUkzQixZQUoyQixFQUszQixNQUwyQixFQU0zQixXQU4yQixFQU8zQixpQkFQMkIsRUFRM0IsSUFSMkIsRUFTM0IsYUFUMkIsRUFVM0IsWUFWMkIsRUFXM0IsWUFYMkIsRUFZM0Isa0JBWjJCLEVBYTNCLE1BYjJCLEVBYzNCLFFBZDJCLEVBZTNCLE1BZjJCLEVBZ0IzQixRQWhCMkIsRUFpQjNCLFNBakIyQixFQWtCM0IsU0FsQjJCLEVBbUIzQixTQW5CMkIsRUFvQjNCLFNBcEIyQixFQXFCM0IsVUFyQjJCLEVBc0IzQixhQXRCMkIsQ0FBN0I7O0lBeUJxQjBGLG9COzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJeEcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7OztFQWQrQ3BHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1V2xEO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixLQURvQixFQUVwQixPQUZvQixFQUdwQixTQUhvQixFQUlwQixTQUpvQixFQUtwQixXQUxvQixFQU1wQixPQU5vQixFQU9wQixJQVBvQixFQVFwQixLQVJvQixFQVNwQixLQVRvQixFQVVwQixTQVZvQixFQVdwQixTQVhvQixFQVlwQixNQVpvQixFQWFwQixNQWJvQixFQWNwQixVQWRvQixFQWVwQixjQWZvQixFQWdCcEIsYUFoQm9CLEVBaUJwQixRQWpCb0IsRUFrQnBCLFNBbEJvQixFQW1CcEIsU0FuQm9CLEVBb0JwQixZQXBCb0IsRUFxQnBCLFVBckJvQixFQXNCcEIsU0F0Qm9CLEVBdUJwQixPQXZCb0IsRUF3QnBCLFdBeEJvQixFQXlCcEIsYUF6Qm9CLEVBMEJwQixjQTFCb0IsRUEyQnBCLG1CQTNCb0IsRUE0QnBCLFVBNUJvQixFQTZCcEIsV0E3Qm9CLEVBOEJwQixVQTlCb0IsRUErQnBCLFVBL0JvQixFQWdDcEIsWUFoQ29CLEVBaUNwQixVQWpDb0IsRUFrQ3BCLFlBbENvQixFQW1DcEIsWUFuQ29CLEVBb0NwQixLQXBDb0IsRUFxQ3BCLE1BckNvQixFQXNDcEIsUUF0Q29CLEVBdUNwQixTQXZDb0IsRUF3Q3BCLFFBeENvQixFQXlDcEIsWUF6Q29CLEVBMENwQixNQTFDb0IsRUEyQ3BCLFVBM0NvQixFQTRDcEIsVUE1Q29CLEVBNkNwQixhQTdDb0IsRUE4Q3BCLEtBOUNvQixFQStDcEIsTUEvQ29CLEVBZ0RwQixNQWhEb0IsRUFpRHBCLFFBakRvQixFQWtEcEIsS0FsRG9CLEVBbURwQixRQW5Eb0IsRUFvRHBCLFNBcERvQixFQXFEcEIsZUFyRG9CLEVBc0RwQixTQXREb0IsRUF1RHBCLFFBdkRvQixFQXdEcEIsYUF4RG9CLEVBeURwQixPQXpEb0IsRUEwRHBCLE9BMURvQixFQTJEcEIsU0EzRG9CLEVBNERwQixXQTVEb0IsRUE2RHBCLGVBN0RvQixFQThEcEIsTUE5RG9CLEVBK0RwQixVQS9Eb0IsRUFnRXBCLGNBaEVvQixFQWlFcEIsYUFqRW9CLEVBa0VwQixhQWxFb0IsRUFtRXBCLE1BbkVvQixFQW9FcEIsT0FwRW9CLEVBcUVwQixJQXJFb0IsRUFzRXBCLFFBdEVvQixFQXVFcEIsSUF2RW9CLEVBd0VwQixRQXhFb0IsRUF5RXBCLFVBekVvQixFQTBFcEIsTUExRW9CLEVBMkVwQixJQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsWUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsU0FoRm9CLEVBaUZwQixPQWpGb0IsRUFrRnBCLE9BbEZvQixFQW1GcEIsTUFuRm9CLEVBb0ZwQixLQXBGb0IsRUFxRnBCLE9BckZvQixFQXNGcEIsS0F0Rm9CLEVBdUZwQixlQXZGb0IsRUF3RnBCLFFBeEZvQixFQXlGcEIsT0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLEtBM0ZvQixFQTRGcEIsT0E1Rm9CLEVBNkZwQixPQTdGb0IsRUE4RnBCLE1BOUZvQixFQStGcEIsUUEvRm9CLEVBZ0dwQixRQWhHb0IsRUFpR3BCLFdBakdvQixFQWtHcEIsV0FsR29CLEVBbUdwQixJQW5Hb0IsRUFvR3BCLE1BcEdvQixFQXFHcEIsVUFyR29CLEVBc0dwQixNQXRHb0IsRUF1R3BCLGNBdkdvQixFQXdHcEIsV0F4R29CLEVBeUdwQixPQXpHb0IsRUEwR3BCLE1BMUdvQixFQTJHcEIsUUEzR29CLEVBNEdwQixRQTVHb0IsRUE2R3BCLE9BN0dvQixFQThHcEIsS0E5R29CLEVBK0dwQixNQS9Hb0IsRUFnSHBCLFFBaEhvQixFQWlIcEIsV0FqSG9CLEVBa0hwQixVQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsUUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLEtBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixRQXhIb0IsRUF5SHBCLFdBekhvQixFQTBIcEIsTUExSG9CLEVBMkhwQixTQTNIb0IsRUE0SHBCLFNBNUhvQixFQTZIcEIsSUE3SG9CLEVBOEhwQixVQTlIb0IsRUErSHBCLFdBL0hvQixFQWdJcEIsTUFoSW9CLEVBaUlwQixVQWpJb0IsRUFrSXBCLE1BbElvQixFQW1JcEIsT0FuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFFBcklvQixFQXNJcEIsZ0JBdElvQixFQXVJcEIsUUF2SW9CLEVBd0lwQixVQXhJb0IsRUF5SXBCLE9BeklvQixFQTBJcEIsV0ExSW9CLEVBMklwQixNQTNJb0IsRUE0SXBCLE1BNUlvQixFQTZJcEIsTUE3SW9CLEVBOElwQixZQTlJb0IsQ0FBdEI7QUFpSkEsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsT0FGNEIsRUFHNUIsY0FINEIsRUFJNUIsZ0JBSjRCLEVBSzVCLGNBTDRCLEVBTTVCLGFBTjRCLEVBTzVCLFlBUDRCLEVBUTVCLGNBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLGVBVjRCLEVBVzVCLE1BWDRCLEVBWTVCLFVBWjRCLEVBYTVCLFFBYjRCLEVBYzVCLGFBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixPQWhCNEIsRUFpQjVCLFNBakI0QixFQWtCNUIsVUFsQjRCLEVBbUI1QixjQW5CNEIsRUFvQjVCLGdCQXBCNEIsRUFxQjVCLE9BckI0QixFQXNCNUIsTUF0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLG9CQXhCNEIsRUF5QjVCLFlBekI0QixFQTBCNUIsS0ExQjRCLEVBMkI1QixlQTNCNEIsRUE0QjVCLFFBNUI0QixFQTZCNUIsT0E3QjRCLEVBOEI1QixRQTlCNEIsRUErQjVCLE9BL0I0QixFQWdDNUIsUUFoQzRCLENBQTlCO0FBbUNBLElBQU1FLDZCQUE2QixHQUFHLENBQ3BDLFlBRG9DLEVBRXBDLFFBRm9DLEVBR3BDLGVBSG9DLEVBSXBDLFdBSm9DLEVBS3BDLFdBTG9DLEVBTXBDLE9BTm9DLENBQXRDO0FBU0EsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsV0FGMkIsRUFHM0IsV0FIMkIsRUFJM0IsUUFKMkIsRUFLM0IsWUFMMkIsRUFNM0IsTUFOMkIsRUFPM0IsaUJBUDJCLEVBUTNCLFlBUjJCLEVBUzNCLE1BVDJCLEVBVTNCLGNBVjJCLEVBVzNCLGdCQVgyQixFQVkzQixXQVoyQixFQWEzQixpQkFiMkIsRUFjM0IsZ0JBZDJCLEVBZTNCLG1CQWYyQixFQWdCM0IseUJBaEIyQixFQWlCM0Isb0JBakIyQixFQWtCM0IsY0FsQjJCLEVBbUIzQix3QkFuQjJCLEVBb0IzQix5QkFwQjJCLEVBcUIzQix3QkFyQjJCLEVBc0IzQixvQkF0QjJCLEVBdUIzQiwwQkF2QjJCLEVBd0IzQix5QkF4QjJCLEVBeUIzQixtQkF6QjJCLEVBMEIzQixJQTFCMkIsRUEyQjNCLGFBM0IyQixFQTRCM0IsWUE1QjJCLEVBNkIzQixZQTdCMkIsRUE4QjNCLGtCQTlCMkIsRUErQjNCLGlCQS9CMkIsRUFnQzNCLFdBaEMyQixFQWlDM0IsTUFqQzJCLEVBa0MzQixLQWxDMkIsQ0FBN0I7O0lBcUNxQjJGLGlCOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJekcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sS0FBTixDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7O2tDQUVhdkYsSyxFQUFPO0FBQ25CO0FBQ0EsVUFBSWlMLDREQUFRLENBQUNqTCxLQUFELENBQVosRUFBcUI7QUFDbkIsWUFBTXlMLFVBQVUsR0FBRyxLQUFLQyxjQUFMLEVBQW5COztBQUNBLFlBQUlELFVBQVUsSUFBSUEsVUFBVSxDQUFDaEwsSUFBWCxLQUFvQkMsd0RBQVUsQ0FBQ2EsVUFBakQsRUFBNkQ7QUFDM0Q7QUFDQSxpQkFBTztBQUFFZCxnQkFBSSxFQUFFQyx3REFBVSxDQUFDVyxRQUFuQjtBQUE2QlEsaUJBQUssRUFBRTdCLEtBQUssQ0FBQzZCO0FBQTFDLFdBQVA7QUFDRDtBQUNGLE9BUmtCLENBVW5COzs7QUFDQSxVQUFJcUoseURBQUssQ0FBQ2xMLEtBQUQsQ0FBVCxFQUFrQjtBQUNoQixZQUFNMkwsU0FBUyxHQUFHLEtBQUs5SSxlQUFMLEVBQWxCOztBQUNBLFlBQUk4SSxTQUFTLElBQUlBLFNBQVMsQ0FBQ2xMLElBQVYsS0FBbUJDLHdEQUFVLENBQUNzQyxRQUEzQyxJQUF1RDJJLFNBQVMsQ0FBQzlKLEtBQVYsS0FBb0IsR0FBL0UsRUFBb0Y7QUFDbEY7QUFDQSxpQkFBTztBQUFFcEIsZ0JBQUksRUFBRUMsd0RBQVUsQ0FBQ3lJLElBQW5CO0FBQXlCdEgsaUJBQUssRUFBRTdCLEtBQUssQ0FBQzZCO0FBQXRDLFdBQVA7QUFDRDtBQUNGOztBQUVELGFBQU83QixLQUFQO0FBQ0Q7Ozs7RUFwQzRDYix1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZPL0M7QUFDQTtBQUVBLElBQU00RyxhQUFhLEdBQUcsQ0FDcEIsWUFEb0IsRUFFcEIsUUFGb0IsRUFHcEIsU0FIb0IsRUFJcEIsV0FKb0IsRUFLcEIsV0FMb0IsRUFNcEIsS0FOb0IsRUFPcEIsT0FQb0IsRUFRcEIsU0FSb0IsRUFTcEIsU0FUb0IsRUFVcEIsSUFWb0IsRUFXcEIsS0FYb0IsRUFZcEIsWUFab0IsRUFhcEIsZ0JBYm9CLEVBY3BCLFFBZG9CLEVBZXBCLE9BZm9CLEVBZ0JwQixTQWhCb0IsRUFpQnBCLFFBakJvQixFQWtCcEIsTUFsQm9CLEVBbUJwQixTQW5Cb0IsRUFvQnBCLFFBcEJvQixFQXFCcEIsU0FyQm9CLEVBc0JwQixlQXRCb0IsRUF1QnBCLFNBdkJvQixFQXdCcEIsT0F4Qm9CLEVBeUJwQixVQXpCb0IsRUEwQnBCLFNBMUJvQixFQTJCcEIsV0EzQm9CLEVBNEJwQixRQTVCb0IsRUE2QnBCLFNBN0JvQixFQThCcEIsU0E5Qm9CLEVBK0JwQixRQS9Cb0IsRUFnQ3BCLFdBaENvQixFQWlDcEIsWUFqQ29CLEVBa0NwQixZQWxDb0IsRUFtQ3BCLFlBbkNvQixFQW9DcEIsVUFwQ29CLEVBcUNwQixTQXJDb0IsRUFzQ3BCLFFBdENvQixFQXVDcEIsT0F2Q29CLEVBd0NwQixtQkF4Q29CLEVBeUNwQixVQXpDb0IsRUEwQ3BCLFdBMUNvQixFQTJDcEIsS0EzQ29CLEVBNENwQixVQTVDb0IsRUE2Q3BCLFlBN0NvQixFQThDcEIsWUE5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFNBaERvQixFQWlEcEIsU0FqRG9CLEVBa0RwQixRQWxEb0IsRUFtRHBCLE1BbkRvQixFQW9EcEIsVUFwRG9CLEVBcURwQixlQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsYUF2RG9CLEVBd0RwQixLQXhEb0IsRUF5RHBCLElBekRvQixFQTBEcEIsTUExRG9CLEVBMkRwQixVQTNEb0IsRUE0RHBCLFdBNURvQixFQTZEcEIsU0E3RG9CLEVBOERwQixNQTlEb0IsRUErRHBCLFVBL0RvQixFQWdFcEIsUUFoRW9CLEVBaUVwQixTQWpFb0IsRUFrRXBCLGFBbEVvQixFQW1FcEIsUUFuRW9CLEVBb0VwQixTQXBFb0IsRUFxRXBCLFFBckVvQixFQXNFcEIsTUF0RW9CLEVBdUVwQixTQXZFb0IsRUF3RXBCLFFBeEVvQixFQXlFcEIsU0F6RW9CLEVBMEVwQixVQTFFb0IsRUEyRXBCLE1BM0VvQixFQTRFcEIsT0E1RW9CLEVBNkVwQixRQTdFb0IsRUE4RXBCLE1BOUVvQixFQStFcEIsT0EvRW9CLEVBZ0ZwQixPQWhGb0IsRUFpRnBCLE9BakZvQixFQWtGcEIsS0FsRm9CLEVBbUZwQixPQW5Gb0IsRUFvRnBCLFNBcEZvQixFQXFGcEIsTUFyRm9CLEVBc0ZwQixVQXRGb0IsRUF1RnBCLFVBdkZvQixFQXdGcEIsUUF4Rm9CLEVBeUZwQixPQXpGb0IsRUEwRnBCLFFBMUZvQixFQTJGcEIsY0EzRm9CLEVBNEZwQixNQTVGb0IsRUE2RnBCLGVBN0ZvQixFQThGcEIsT0E5Rm9CLEVBK0ZwQixNQS9Gb0IsRUFnR3BCLGFBaEdvQixFQWlHcEIsYUFqR29CLEVBa0dwQixZQWxHb0IsRUFtR3BCLElBbkdvQixFQW9HcEIsUUFwR29CLEVBcUdwQixRQXJHb0IsRUFzR3BCLElBdEdvQixFQXVHcEIsT0F2R29CLEVBd0dwQixTQXhHb0IsRUF5R3BCLFFBekdvQixFQTBHcEIsUUExR29CLEVBMkdwQixXQTNHb0IsRUE0R3BCLGVBNUdvQixFQTZHcEIsVUE3R29CLEVBOEdwQixNQTlHb0IsRUErR3BCLFNBL0dvQixFQWdIcEIsSUFoSG9CLEVBaUhwQixXQWpIb0IsRUFrSHBCLEtBbEhvQixFQW1IcEIsTUFuSG9CLEVBb0hwQixNQXBIb0IsRUFxSHBCLGdCQXJIb0IsRUFzSHBCLFNBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixNQXhIb0IsRUF5SHBCLFFBekhvQixFQTBIcEIsT0ExSG9CLEVBMkhwQixNQTNIb0IsRUE0SHBCLE9BNUhvQixFQTZIcEIsTUE3SG9CLEVBOEhwQixPQTlIb0IsRUErSHBCLE1BL0hvQixFQWdJcEIsY0FoSW9CLEVBaUlwQixPQWpJb0IsRUFrSXBCLFFBbElvQixFQW1JcEIsc0JBbklvQixFQW9JcEIsYUFwSW9CLEVBcUlwQixpQkFySW9CLEVBc0lwQixPQXRJb0IsRUF1SXBCLDBCQXZJb0IsRUF3SXBCLHNCQXhJb0IsRUF5SXBCLFVBeklvQixFQTBJcEIsc0JBMUlvQixFQTJJcEIsc0JBM0lvQixFQTRJcEIsUUE1SW9CLEVBNklwQixPQTdJb0IsRUE4SXBCLFFBOUlvQixFQStJcEIsZUEvSW9CLEVBZ0pwQixVQWhKb0IsRUFpSnBCLE1BakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLFlBcEpvQixFQXFKcEIsUUFySm9CLEVBc0pwQixPQXRKb0IsRUF1SnBCLFNBdkpvQixFQXdKcEIsS0F4Sm9CLEVBeUpwQixPQXpKb0IsRUEwSnBCLE1BMUpvQixFQTJKcEIsUUEzSm9CLEVBNEpwQixXQTVKb0IsRUE2SnBCLFdBN0pvQixFQThKcEIsSUE5Sm9CLEVBK0pwQixNQS9Kb0IsRUFnS3BCLE1BaEtvQixFQWlLcEIsVUFqS29CLEVBa0twQixRQWxLb0IsRUFtS3BCLFlBbktvQixFQW9LcEIsU0FwS29CLEVBcUtwQixXQXJLb0IsRUFzS3BCLE1BdEtvQixFQXVLcEIsU0F2S29CLEVBd0twQixXQXhLb0IsRUF5S3BCLFlBektvQixFQTBLcEIsVUExS29CLEVBMktwQixTQTNLb0IsRUE0S3BCLFlBNUtvQixFQTZLcEIsV0E3S29CLEVBOEtwQixTQTlLb0IsRUErS3BCLGFBL0tvQixFQWdMcEIsT0FoTG9CLEVBaUxwQixPQWpMb0IsRUFrTHBCLE9BbExvQixFQW1McEIsYUFuTG9CLEVBb0xwQixnQkFwTG9CLEVBcUxwQixXQXJMb0IsRUFzTHBCLE9BdExvQixFQXVMcEIsTUF2TG9CLEVBd0xwQixXQXhMb0IsRUF5THBCLFlBekxvQixFQTBMcEIsWUExTG9CLEVBMkxwQixRQTNMb0IsRUE0THBCLFFBNUxvQixFQTZMcEIsUUE3TG9CLEVBOExwQixRQTlMb0IsRUErTHBCLFlBL0xvQixFQWdNcEIsU0FoTW9CLEVBaU1wQixhQWpNb0IsRUFrTXBCLE9BbE1vQixFQW1NcEIsU0FuTW9CLEVBb01wQixVQXBNb0IsRUFxTXBCLFFBck1vQixFQXNNcEIsU0F0TW9CLEVBdU1wQixRQXZNb0IsRUF3TXBCLE9BeE1vQixFQXlNcEIsVUF6TW9CLEVBME1wQixLQTFNb0IsRUEyTXBCLE1BM01vQixFQTRNcEIsWUE1TW9CLEVBNk1wQixRQTdNb0IsRUE4TXBCLFVBOU1vQixFQStNcEIsV0EvTW9CLEVBZ05wQixjQWhOb0IsRUFpTnBCLFNBak5vQixFQWtOcEIsT0FsTm9CLEVBbU5wQixNQW5Ob0IsRUFvTnBCLFVBcE5vQixFQXFOcEIsT0FyTm9CLEVBc05wQixRQXROb0IsRUF1TnBCLFFBdk5vQixFQXdOcEIsS0F4Tm9CLEVBeU5wQixrQkF6Tm9CLEVBME5wQixnQkExTm9CLEVBMk5wQixpQkEzTm9CLEVBNE5wQixnQkE1Tm9CLEVBNk5wQixtQkE3Tm9CLEVBOE5wQixXQTlOb0IsRUErTnBCLHFCQS9Ob0IsRUFnT3BCLGFBaE9vQixFQWlPcEIsYUFqT29CLEVBa09wQixnQkFsT29CLEVBbU9wQiwwQkFuT29CLEVBb09wQixtQkFwT29CLEVBcU9wQixjQXJPb0IsRUFzT3BCLHVCQXRPb0IsRUF1T3BCLGtCQXZPb0IsRUF3T3BCLGtCQXhPb0IsRUF5T3BCLHdCQXpPb0IsRUEwT3BCLGtCQTFPb0IsRUEyT3BCLGNBM09vQixFQTRPcEIsT0E1T29CLEVBNk9wQixVQTdPb0IsRUE4T3BCLFFBOU9vQixFQStPcEIsTUEvT29CLEVBZ1BwQixTQWhQb0IsRUFpUHBCLGVBalBvQixFQWtQcEIsUUFsUG9CLEVBbVBwQixTQW5Qb0IsRUFvUHBCLE9BcFBvQixFQXFQcEIsT0FyUG9CLEVBc1BwQixRQXRQb0IsRUF1UHBCLFdBdlBvQixFQXdQcEIsWUF4UG9CLEVBeVBwQixNQXpQb0IsRUEwUHBCLElBMVBvQixFQTJQcEIsVUEzUG9CLEVBNFBwQixlQTVQb0IsRUE2UHBCLE1BN1BvQixFQThQcEIsVUE5UG9CLEVBK1BwQixNQS9Qb0IsRUFnUXBCLE9BaFFvQixFQWlRcEIsYUFqUW9CLEVBa1FwQixRQWxRb0IsRUFtUXBCLFFBblFvQixFQW9RcEIsVUFwUW9CLEVBcVFwQixPQXJRb0IsRUFzUXBCLEtBdFFvQixFQXVRcEIsT0F2UW9CLEVBd1FwQixXQXhRb0IsRUF5UXBCLE1BelFvQixFQTBRcEIsTUExUW9CLEVBMlFwQixNQTNRb0IsRUE0UXBCLE9BNVFvQixFQTZRcEIsWUE3UW9CLENBQXRCO0FBZ1JBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLE1BTDRCLEVBTTVCLGFBTjRCLEVBTzVCLEtBUDRCLEVBUTVCLFFBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLE1BVjRCLEVBVzVCLFVBWDRCLEVBWTVCLElBWjRCLEVBYTVCLFFBYjRCLEVBYzVCLGFBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixPQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsVUFsQjRCLEVBbUI1QixRQW5CNEIsRUFvQjVCLG9CQXBCNEIsRUFxQjVCLFlBckI0QixFQXNCNUIsS0F0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsT0F6QjRCLENBQTlCO0FBNEJBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixhQUYyQixFQUczQixZQUgyQixFQUkzQixNQUoyQixFQUszQixZQUwyQixFQU0zQixNQU4yQixFQU8zQixXQVAyQixFQVEzQixpQkFSMkIsRUFTM0IsSUFUMkIsRUFVM0IsYUFWMkIsRUFXM0IsWUFYMkIsRUFZM0IsWUFaMkIsRUFhM0Isa0JBYjJCLEVBYzNCLE1BZDJCLEVBZTNCLEtBZjJCLENBQTdCOztJQWtCcUIwRixvQjs7Ozs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sSUFBSXhHLHVEQUFKLENBQWM7QUFDbkJnQixxQkFBYSxFQUFiQSxhQURtQjtBQUVuQk4sNkJBQXFCLEVBQXJCQSxxQkFGbUI7QUFHbkJJLDRCQUFvQixFQUFwQkEsb0JBSG1CO0FBSW5CRixxQ0FBNkIsRUFBN0JBLDZCQUptQjtBQUtuQlEsbUJBQVcsRUFBRSxTQUFPLEtBQVAsRUFBYyxJQUFkLEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FUSjtBQVVuQnBCLHdCQUFnQixFQUFFLENBQUMsR0FBRCxFQUFNLElBQU47QUFWQyxPQUFkLENBQVA7QUFZRDs7OztFQWQrQ3BHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25VbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNeU0sVUFBVSxHQUFHO0FBQ2pCQyxLQUFHLEVBQUVWLCtEQURZO0FBRWpCVyxNQUFJLEVBQUVWLGdFQUZXO0FBR2pCLFlBQVVDLGlFQUhPO0FBSWpCVSxPQUFLLEVBQUVWLGlFQUpVO0FBS2pCVyxZQUFVLEVBQUVWLHNFQUxLO0FBTWpCVyxVQUFRLEVBQUVDLG9FQU5PO0FBT2pCQyxPQUFLLEVBQUVYLG9FQVBVO0FBUWpCWSxLQUFHLEVBQUViLHVFQUFvQkE7QUFSUixDQUFuQjtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxJQUFNYyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDcE0sS0FBRCxFQUFxQjtBQUFBLE1BQWJiLEdBQWEsdUVBQVAsRUFBTzs7QUFDekMsTUFBSSxPQUFPYSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLFVBQU0sSUFBSUYsS0FBSixDQUFVLGtFQUFpRUUsS0FBakUsQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBSWQsU0FBUyxHQUFHb00sdUVBQWhCOztBQUNBLE1BQUluTSxHQUFHLENBQUNrTixRQUFKLEtBQWlCeEQsU0FBckIsRUFBZ0M7QUFDOUIzSixhQUFTLEdBQUd5TSxVQUFVLENBQUN4TSxHQUFHLENBQUNrTixRQUFMLENBQXRCO0FBQ0Q7O0FBQ0QsTUFBSW5OLFNBQVMsS0FBSzJKLFNBQWxCLEVBQTZCO0FBQzNCLFVBQU0vSSxLQUFLLG9DQUE2QlgsR0FBRyxDQUFDa04sUUFBakMsRUFBWDtBQUNEOztBQUNELFNBQU8sSUFBSW5OLFNBQUosQ0FBY0MsR0FBZCxFQUFtQmlOLE1BQW5CLENBQTBCcE0sS0FBMUIsQ0FBUDtBQUNELENBYk07QUFlQSxJQUFNc00saUJBQWlCLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZYixVQUFaLENBQTFCLEM7Ozs7Ozs7Ozs7OztBQzlDUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNPLElBQU16SSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUN1SixHQUFEO0FBQUEsU0FBU0EsR0FBRyxDQUFDcEssT0FBSixDQUFZLFNBQVosRUFBd0IsRUFBeEIsQ0FBVDtBQUFBLENBQXRCLEMsQ0FFUDs7QUFDTyxJQUFNZ0MsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ3FJLEdBQUQ7QUFBQSxTQUFTQSxHQUFHLENBQUNBLEdBQUcsQ0FBQ3pKLE1BQUosR0FBYSxDQUFkLENBQVo7QUFBQSxDQUFiLEMsQ0FFUDs7QUFDTyxJQUFNeUgsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ2dDLEdBQUQ7QUFBQSxTQUFTLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUQsSUFBdUJBLEdBQUcsQ0FBQ3pKLE1BQUosS0FBZSxDQUEvQztBQUFBLENBQWhCLEMsQ0FFUDs7QUFDTyxJQUFNMEYsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQzlGLE1BQUQ7QUFBQSxTQUFZQSxNQUFNLENBQUNSLE9BQVAsQ0FBZSwwQkFBZixFQUF1QyxNQUF2QyxDQUFaO0FBQUEsQ0FBckIsQyxDQUVQO0FBQ0E7O0FBQ08sSUFBTWdILGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ3dELE9BQUQ7QUFBQSxTQUM5QkEsT0FBTyxDQUFDQyxJQUFSLENBQWEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDckIsV0FBT0EsQ0FBQyxDQUFDL0osTUFBRixHQUFXOEosQ0FBQyxDQUFDOUosTUFBYixJQUF1QjhKLENBQUMsQ0FBQ0UsYUFBRixDQUFnQkQsQ0FBaEIsQ0FBOUI7QUFDRCxHQUZELENBRDhCO0FBQUEsQ0FBekIsQyIsImZpbGUiOiJzcWwtZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3FsRm9ybWF0dGVyLmpzXCIpO1xuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCBJbmRlbnRhdGlvbiBmcm9tICcuL0luZGVudGF0aW9uJztcbmltcG9ydCBJbmxpbmVCbG9jayBmcm9tICcuL0lubGluZUJsb2NrJztcbmltcG9ydCBQYXJhbXMgZnJvbSAnLi9QYXJhbXMnO1xuaW1wb3J0IHsgdHJpbVNwYWNlc0VuZCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGlzQW5kLCBpc0JldHdlZW4sIGlzTGltaXQgfSBmcm9tICcuL3Rva2VuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcubGFuZ3VhZ2VcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcuaW5kZW50XG4gICAqICBAcGFyYW0ge0Jvb2xlYW59IGNmZy51cHBlcmNhc2VcbiAgICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXNcbiAgICogIEBwYXJhbSB7T2JqZWN0fSBjZmcucGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZmcpIHtcbiAgICB0aGlzLmNmZyA9IGNmZztcbiAgICB0aGlzLmluZGVudGF0aW9uID0gbmV3IEluZGVudGF0aW9uKHRoaXMuY2ZnLmluZGVudCk7XG4gICAgdGhpcy5pbmxpbmVCbG9jayA9IG5ldyBJbmxpbmVCbG9jaygpO1xuICAgIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtcyh0aGlzLmNmZy5wYXJhbXMpO1xuICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0ge307XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTUUwgVG9rZW5pemVyIGZvciB0aGlzIGZvcm1hdHRlciwgcHJvdmlkZWQgYnkgc3ViY2xhc3Nlcy5cbiAgICovXG4gIHRva2VuaXplcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rva2VuaXplcigpIG5vdCBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJvY2VzcyBhbmQgbW9kaWZ5IGEgdG9rZW4gYmFzZWQgb24gcGFyc2VkIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbiBUaGUgdG9rZW4gdG8gbW9kaWZ5XG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqIEByZXR1cm4ge09iamVjdH0gbmV3IHRva2VuIG9yIHRoZSBvcmlnaW5hbFxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqL1xuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgLy8gc3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBtb2RpZnkgdG9rZW5zIGR1cmluZyBmb3JtYXR0aW5nXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgd2hpdGVzcGFjZSBpbiBhIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTUUwgcXVlcnkgc3RyaW5nXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHF1ZXJ5XG4gICAqL1xuICBmb3JtYXQocXVlcnkpIHtcbiAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5pemVyKCkudG9rZW5pemUocXVlcnkpO1xuICAgIGNvbnN0IGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5nZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRRdWVyeS50cmltKCk7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKSB7XG4gICAgbGV0IGZvcm1hdHRlZFF1ZXJ5ID0gJyc7XG5cbiAgICB0aGlzLnRva2Vucy5mb3JFYWNoKCh0b2tlbiwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcblxuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuT3ZlcnJpZGUodG9rZW4pO1xuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdExpbmVDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRPcGVuaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q2xvc2luZ1BhcmVudGhlc2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUExBQ0VIT0xERVIpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLCcpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdENvbW1hKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnOicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc7Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5O1xuICB9XG5cbiAgZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSArIHRoaXMuc2hvdyh0b2tlbikpO1xuICB9XG5cbiAgZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUodGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuaW5kZW50Q29tbWVudCh0b2tlbi52YWx1ZSkpO1xuICB9XG5cbiAgaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgcmV0dXJuIGNvbW1lbnQucmVwbGFjZSgvXFxuWyBcXHRdKi9ndSwgJ1xcbicgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpICsgJyAnKTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcblxuICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcblxuICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgKz0gdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIGlmIChpc0FuZCh0b2tlbikgJiYgaXNCZXR3ZWVuKHRoaXMudG9rZW5Mb29rQmVoaW5kKDIpKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgcXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuc2hvdyh0b2tlbikpICsgJyAnO1xuICB9XG5cbiAgLy8gUmVwbGFjZSBhbnkgc2VxdWVuY2Ugb2Ygd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHdpdGggc2luZ2xlIHNwYWNlXG4gIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xccysvZ3UsICcgJyk7XG4gIH1cblxuICAvLyBPcGVuaW5nIHBhcmVudGhlc2VzIGluY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWwgYW5kIHN0YXJ0IGEgbmV3IGxpbmVcbiAgZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIC8vIFRha2Ugb3V0IHRoZSBwcmVjZWRpbmcgc3BhY2UgdW5sZXNzIHRoZXJlIHdhcyB3aGl0ZXNwYWNlIHRoZXJlIGluIHRoZSBvcmlnaW5hbCBxdWVyeVxuICAgIC8vIG9yIGFub3RoZXIgb3BlbmluZyBwYXJlbnMgb3IgbGluZSBjb21tZW50XG4gICAgY29uc3QgcHJlc2VydmVXaGl0ZXNwYWNlRm9yID0ge1xuICAgICAgW3Rva2VuVHlwZXMuT1BFTl9QQVJFTl06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlRdOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuT1BFUkFUT1JdOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKFxuICAgICAgdG9rZW4ud2hpdGVzcGFjZUJlZm9yZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICFwcmVzZXJ2ZVdoaXRlc3BhY2VGb3JbdGhpcy50b2tlbkxvb2tCZWhpbmQoKT8udHlwZV1cbiAgICApIHtcbiAgICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgfVxuICAgIHF1ZXJ5ICs9IHRoaXMuc2hvdyh0b2tlbik7XG5cbiAgICB0aGlzLmlubGluZUJsb2NrLmJlZ2luSWZQb3NzaWJsZSh0aGlzLnRva2VucywgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgLy8gQ2xvc2luZyBwYXJlbnRoZXNlcyBkZWNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsXG4gIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmlubGluZUJsb2NrLmVuZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHRoaXMuYWRkTmV3bGluZShxdWVyeSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMucGFyYW1zLmdldCh0b2tlbikgKyAnICc7XG4gIH1cblxuICAvLyBDb21tYXMgc3RhcnQgYSBuZXcgbGluZSAodW5sZXNzIHdpdGhpbiBpbmxpbmUgcGFyZW50aGVzZXMgb3IgU1FMIFwiTElNSVRcIiBjbGF1c2UpXG4gIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuXG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSBpZiAoaXNMaW1pdCh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbikpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24ucmVzZXRJbmRlbnRhdGlvbigpO1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnXFxuJy5yZXBlYXQodGhpcy5jZmcubGluZXNCZXR3ZWVuUXVlcmllcyB8fCAxKTtcbiAgfVxuXG4gIC8vIENvbnZlcnRzIHRva2VuIHRvIHN0cmluZyAodXBwZXJjYXNpbmcgaXQgaWYgbmVlZGVkKVxuICBzaG93KHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2ZnLnVwcGVyY2FzZSAmJlxuICAgICAgKHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4gfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTilcbiAgICApIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYWRkTmV3bGluZShxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgaWYgKCFxdWVyeS5lbmRzV2l0aCgnXFxuJykpIHtcbiAgICAgIHF1ZXJ5ICs9ICdcXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpO1xuICB9XG5cbiAgdG9rZW5Mb29rQmVoaW5kKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggLSBuXTtcbiAgfVxuXG4gIHRva2VuTG9va0FoZWFkKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggKyBuXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGFzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gJ3RvcC1sZXZlbCc7XG5jb25zdCBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9ICdibG9jay1sZXZlbCc7XG5cbi8qKlxuICogTWFuYWdlcyBpbmRlbnRhdGlvbiBsZXZlbHMuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBpbmRlbnRhdGlvbiBsZXZlbHM6XG4gKlxuICogLSBCTE9DS19MRVZFTCA6IGluY3JlYXNlZCBieSBvcGVuLXBhcmVudGhlc2lzXG4gKiAtIFRPUF9MRVZFTCA6IGluY3JlYXNlZCBieSBSRVNFUlZFRF9UT1BfTEVWRUwgd29yZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZW50YXRpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGluZGVudCBJbmRlbnQgdmFsdWUsIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZGVudCkge1xuICAgIHRoaXMuaW5kZW50ID0gaW5kZW50IHx8ICcgICc7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBpbmRlbnRhdGlvbiBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdldEluZGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRlbnQucmVwZWF0KHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZVRvcExldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9UT1BfTEVWRUwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKi9cbiAgaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSB0b3AtbGV2ZWwgaW5kZW50LlxuICAgKiBEb2VzIG5vdGhpbmcgd2hlbiB0aGUgcHJldmlvdXMgaW5kZW50IGlzIG5vdCB0b3AtbGV2ZWwuXG4gICAqL1xuICBkZWNyZWFzZVRvcExldmVsKCkge1xuICAgIGlmICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDAgJiYgbGFzdCh0aGlzLmluZGVudFR5cGVzKSA9PT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICogSWYgdGhlcmUgYXJlIHRvcC1sZXZlbCBpbmRlbnRzIHdpdGhpbiB0aGUgYmxvY2stbGV2ZWwgaW5kZW50LFxuICAgKiB0aHJvd3MgYXdheSB0aGVzZSBhcyB3ZWxsLlxuICAgKi9cbiAgZGVjcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHdoaWxlICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEluZGVudGF0aW9uKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcblxuY29uc3QgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVCbG9jayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGV2ZWwgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyBpbmxpbmUgYmxvY2sgd2hlbiBsb29rYWhlYWQgdGhyb3VnaCB1cGNvbWluZyB0b2tlbnMgZGV0ZXJtaW5lc1xuICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAqIEBwYXJhbSAge09iamVjdFtdfSB0b2tlbnMgQXJyYXkgb2YgYWxsIHRva2Vuc1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4IEN1cnJlbnQgdG9rZW4gcG9zaXRpb25cbiAgICovXG4gIGJlZ2luSWZQb3NzaWJsZSh0b2tlbnMsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgdGhpcy5pc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpKSB7XG4gICAgICB0aGlzLmxldmVsID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICB0aGlzLmxldmVsKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICogVGhlcmUgbWlnaHQgYmUgc2V2ZXJhbCBuZXN0ZWQgb25lcy5cbiAgICovXG4gIGVuZCgpIHtcbiAgICB0aGlzLmxldmVsLS07XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSB3aGVuIGluc2lkZSBhbiBpbmxpbmUgYmxvY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgc2hvdWxkIGJlIGFuIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICAvLyBFeGFtcGxlcyBhcmUgXCJOT1coKVwiLCBcIkNPVU5UKCopXCIsIFwiaW50KDEwKVwiLCBrZXkoYHNvbWVjb2x1bW5gKSwgREVDSU1BTCg3LDIpXG4gIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgbGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcblxuICAgICAgLy8gT3ZlcnJhbiBtYXggbGVuZ3RoXG4gICAgICBpZiAobGVuZ3RoID4gSU5MSU5FX01BWF9MRU5HVEgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGxldmVsKys7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAvLyBhcmUgbm90IGFsbG93ZWQgaW5zaWRlIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICBpc0ZvcmJpZGRlblRva2VuKHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNPTU1FTlQgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCB8fFxuICAgICAgdmFsdWUgPT09ICc7J1xuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYW1zIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcGFyYW0gdmFsdWUgdGhhdCBtYXRjaGVzIGdpdmVuIHBsYWNlaG9sZGVyIHdpdGggcGFyYW0ga2V5LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZSBQbGFjZWhvbGRlciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHBhcmFtIG9yIHRva2VuLnZhbHVlIHdoZW4gcGFyYW1zIGFyZSBtaXNzaW5nXG4gICAqL1xuICBnZXQoeyBrZXksIHZhbHVlIH0pIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJhbXNbdGhpcy5pbmRleCsrXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCAqIGFzIHJlZ2V4RmFjdG9yeSBmcm9tICcuL3JlZ2V4RmFjdG9yeSc7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuaXplciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ldyBsaW5lIHNlcGFyYXRlbHlcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZE5ld2xpbmVXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3bGluZVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IFdvcmRzIHRoYXQgYXJlIHRvcCBsZXZlbCBidXQgaGF2ZSBubyBpbmRlbnRhdGlvblxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm9wZW5QYXJlbnMgT3BlbmluZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKCwgW1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmNsb3NlUGFyZW5zIENsb3NpbmcgcGFyZW50aGVzZXMgdG8gZW5hYmxlLCBsaWtlICksIF1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgbmFtZWQgcGxhY2Vob2xkZXJzLCBsaWtlIEAgYW5kIDpcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5saW5lQ29tbWVudFR5cGVzIExpbmUgY29tbWVudHMgdG8gZW5hYmxlLCBsaWtlICMgYW5kIC0tXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBbY2ZnLm9wZXJhdG9yXSBBZGRpdGlvbmFsIG9wZXJhdG9ycyB0byByZWNvZ25pemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuXG4gICAgdGhpcy5PUEVSQVRPUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVPcGVyYXRvclJlZ2V4KFtcbiAgICAgIC4uLihjZmcub3BlcmF0b3JzIHx8IFtdKSxcbiAgICAgICchPScsXG4gICAgICAnPD4nLFxuICAgICAgJz09JyxcbiAgICAgICc8PScsXG4gICAgICAnPj0nLFxuICAgICAgJyE8JyxcbiAgICAgICchPicsXG4gICAgICAnfHwnLFxuICAgICAgJzo9JyxcbiAgICBdKTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZUxpbmVDb21tZW50UmVnZXgoY2ZnLmxpbmVDb21tZW50VHlwZXMpO1xuXG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFdvcmRzKTtcblxuICAgIHRoaXMuV09SRF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1JlZ2V4KGNmZy5zdHJpbmdUeXBlcyk7XG5cbiAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcub3BlblBhcmVucyk7XG4gICAgdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbMC05XSonXG4gICAgKTtcbiAgICB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1thLXpBLVowLTkuXyRdKydcbiAgICApO1xuICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1BhdHRlcm4oY2ZnLnN0cmluZ1R5cGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBTUUwgc3RyaW5nIGFuZCBicmVha3MgaXQgaW50byB0b2tlbnMuXG4gICAqIEVhY2ggdG9rZW4gaXMgYW4gb2JqZWN0IHdpdGggdHlwZSBhbmQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgU1FMIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gdG9rZW5zIEFuIGFycmF5IG9mIHRva2Vucy5cbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlIFByZWNlZGluZyB3aGl0ZXNwYWNlXG4gICAqL1xuICB0b2tlbml6ZShpbnB1dCkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCB0b2tlbjtcblxuICAgIC8vIEtlZXAgcHJvY2Vzc2luZyB0aGUgc3RyaW5nIHVudGlsIGl0IGlzIGVtcHR5XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgLy8gZ3JhYiBhbnkgcHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICAgIGNvbnN0IHdoaXRlc3BhY2VCZWZvcmUgPSB0aGlzLmdldFdoaXRlc3BhY2UoaW5wdXQpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcod2hpdGVzcGFjZUJlZm9yZS5sZW5ndGgpO1xuXG4gICAgICBpZiAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbmV4dCB0b2tlbiBhbmQgdGhlIHRva2VuIHR5cGVcbiAgICAgICAgdG9rZW4gPSB0aGlzLmdldE5leHRUb2tlbihpbnB1dCwgdG9rZW4pO1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcodG9rZW4udmFsdWUubGVuZ3RoKTtcblxuICAgICAgICB0b2tlbnMucHVzaCh7IC4uLnRva2VuLCB3aGl0ZXNwYWNlQmVmb3JlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZ2V0V2hpdGVzcGFjZShpbnB1dCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaCh0aGlzLldISVRFU1BBQ0VfUkVHRVgpO1xuICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnO1xuICB9XG5cbiAgZ2V0TmV4dFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fFxuICAgICAgdGhpcy5nZXRXb3JkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZXJhdG9yVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldENvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpO1xuICB9XG5cbiAgZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5CTE9DS19DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ1Rva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlNUUklORyxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9wZW5QYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRU5fUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkNMT1NFX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PlxuICAgICAgICB0aGlzLmdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleTogdi5zbGljZSgyLCAtMSksIHF1b3RlQ2hhcjogdi5zbGljZSgtMSkgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHsgaW5wdXQsIHJlZ2V4LCBwYXJzZUtleSB9KSB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHJlZ2V4LCB0eXBlOiB0b2tlblR5cGVzLlBMQUNFSE9MREVSIH0pO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXksIHF1b3RlQ2hhciB9KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKCdcXFxcJyArIHF1b3RlQ2hhciksICdndScpLCBxdW90ZUNoYXIpO1xuICB9XG5cbiAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuICBnZXROdW1iZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5OVU1CRVIsXG4gICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICAvLyBQdW5jdHVhdGlvbiBhbmQgc3ltYm9sc1xuICBnZXRPcGVyYXRvclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRVJBVE9SLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFUkFUT1JfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgIC8vIEEgcmVzZXJ2ZWQgd29yZCBjYW5ub3QgYmUgcHJlY2VkZWQgYnkgYSBcIi5cIlxuICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgcHJldmlvdXNUb2tlbi52YWx1ZSAmJiBwcmV2aW91c1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRXb3JkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuV09SRCxcbiAgICAgIHJlZ2V4OiB0aGlzLldPUkRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCB0eXBlLCByZWdleCB9KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHJlZ2V4KTtcblxuICAgIHJldHVybiBtYXRjaGVzID8geyB0eXBlLCB2YWx1ZTogbWF0Y2hlc1sxXSB9IDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVSZWdFeHAsIGlzRW1wdHksIHNvcnRCeUxlbmd0aERlc2MgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcGVyYXRvclJlZ2V4KG11bHRpTGV0dGVyT3BlcmF0b3JzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKCR7c29ydEJ5TGVuZ3RoRGVzYyhtdWx0aUxldHRlck9wZXJhdG9ycykubWFwKGVzY2FwZVJlZ0V4cCkuam9pbignfCcpfXwuKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oKD86JHtsaW5lQ29tbWVudFR5cGVzLm1hcCgoYykgPT4gZXNjYXBlUmVnRXhwKGMpKS5qb2luKCd8Jyl9KS4qPykoPzpcXHJcXG58XFxyfFxcbnwkKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNlcnZlZFdvcmRSZWdleChyZXNlcnZlZFdvcmRzKSB7XG4gIGlmIChyZXNlcnZlZFdvcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeXFxiJGAsICd1Jyk7XG4gIH1cbiAgY29uc3QgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSBzb3J0QnlMZW5ndGhEZXNjKHJlc2VydmVkV29yZHMpLmpvaW4oJ3wnKS5yZXBsYWNlKC8gL2d1LCAnXFxcXHMrJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCR7cmVzZXJ2ZWRXb3Jkc1BhdHRlcm59KVxcXFxiYCwgJ2l1Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkUmVnZXgoc3BlY2lhbENoYXJzID0gW10pIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oW1xcXFxwe0FscGhhYmV0aWN9XFxcXHB7TWFya31cXFxccHtEZWNpbWFsX051bWJlcn1cXFxccHtDb25uZWN0b3JfUHVuY3R1YXRpb259XFxcXHB7Sm9pbl9Db250cm9sfSR7c3BlY2lhbENoYXJzLmpvaW4oXG4gICAgICAnJ1xuICAgICl9XSspYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSArICcpJywgJ3UnKTtcbn1cblxuLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuLy8gMS4gYmFja3RpY2sgcXVvdGVkIHN0cmluZyB1c2luZyBgYCB0byBlc2NhcGVcbi8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuLy8gNC4gc2luZ2xlIHF1b3RlZCBzdHJpbmcgdXNpbmcgJycgb3IgXFwnIHRvIGVzY2FwZVxuLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG4vLyA2LiBVbmljb2RlIHNpbmdsZS1xdW90ZWQgc3RyaW5nIHVzaW5nIFxcJyB0byBlc2NhcGVcbi8vIDcuIFVuaWNvZGUgZG91YmxlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFxcIiB0byBlc2NhcGVcbi8vIDguIFBvc3RncmVTUUwgZG9sbGFyLXF1b3RlZCBzdHJpbmdzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykge1xuICBjb25zdCBwYXR0ZXJucyA9IHtcbiAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgJ3t9JzogJygoXFxcXHtbXlxcXFx9XSooJHxcXFxcfSkpKyknLFxuICAgICdbXSc6ICcoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKScsXG4gICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiTicnXCI6IFwiKChOJ1teTidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15OJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJVJicnXCI6IFwiKChVJidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICAnVSZcIlwiJzogJygoVSZcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgJCQ6ICcoKD88dGFnPlxcXFwkXFxcXHcqXFxcXCQpW1xcXFxzXFxcXFNdKj8oPzpcXFxcazx0YWc+fCQpKScsXG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ1R5cGVzLm1hcCgodCkgPT4gcGF0dGVybnNbdF0pLmpvaW4oJ3wnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBwYXJlbnMubWFwKGVzY2FwZVBhcmVuKS5qb2luKCd8JykgKyAnKScsICdpdScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChwYXJlbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbG9uZ2VyIHdvcmRcbiAgICByZXR1cm4gJ1xcXFxiJyArIHBhcmVuICsgJ1xcXFxiJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXJSZWdleCh0eXBlcywgcGF0dGVybikge1xuICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cChgXigoPzoke3R5cGVzUmVnZXh9KSg/OiR7cGF0dGVybn0pKWAsICd1Jyk7XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBpc1Rva2VuID0gKHR5cGUsIHJlZ2V4KSA9PiAodG9rZW4pID0+IHRva2VuPy50eXBlID09PSB0eXBlICYmIHJlZ2V4LnRlc3QodG9rZW4/LnZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGlzQW5kID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsIC9eQU5EJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0JldHdlZW4gPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQkVUV0VFTiQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNMaW1pdCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eTElNSVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzU2V0ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15TRVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzQnkgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQlkkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzV2luZG93ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15XSU5ET1ckL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzRW5kID0gaXNUb2tlbih0b2tlblR5cGVzLkNMT1NFX1BBUkVOLCAvXkVORCQvaXUpO1xuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV09SRDogJ3dvcmQnLFxuICBTVFJJTkc6ICdzdHJpbmcnLFxuICBSRVNFUlZFRDogJ3Jlc2VydmVkJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMOiAncmVzZXJ2ZWQtdG9wLWxldmVsJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVDogJ3Jlc2VydmVkLXRvcC1sZXZlbC1uby1pbmRlbnQnLFxuICBSRVNFUlZFRF9ORVdMSU5FOiAncmVzZXJ2ZWQtbmV3bGluZScsXG4gIE9QRVJBVE9SOiAnb3BlcmF0b3InLFxuICBPUEVOX1BBUkVOOiAnb3Blbi1wYXJlbicsXG4gIENMT1NFX1BBUkVOOiAnY2xvc2UtcGFyZW4nLFxuICBMSU5FX0NPTU1FTlQ6ICdsaW5lLWNvbW1lbnQnLFxuICBCTE9DS19DT01NRU5UOiAnYmxvY2stY29tbWVudCcsXG4gIE5VTUJFUjogJ251bWJlcicsXG4gIFBMQUNFSE9MREVSOiAncGxhY2Vob2xkZXInLFxufTtcbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUNUSVZBVEUnLFxuICAnQUxJQVMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMTE9XJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUkUnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNTT0NJQVRFJyxcbiAgJ0FTVVRJTUUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVRUUklCVVRFUycsXG4gICdBVURJVCcsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0FVWCcsXG4gICdBVVhJTElBUlknLFxuICAnQVZHJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlVGRkVSUE9PTCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVBUVVJFJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQ1NJRCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09MTElEJyxcbiAgJ0NPTFVNTicsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05DQVQnLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVU5UX0JJRycsXG4gICdDT1ZBUl9QT1AnLFxuICAnQ09WQVJfU0FNUCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX0xDX0NUWVBFJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9TRVJWRVInLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVElNRVpPTkUnLFxuICAnQ1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEUnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFQQVJUSVRJT05OQU1FJyxcbiAgJ0RBVEFQQVJUSVRJT05OVU0nLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdEQjJHRU5FUkFMJyxcbiAgJ0RCMkdFTlJMJyxcbiAgJ0RCMlNRTCcsXG4gICdEQklORk8nLFxuICAnREJQQVJUSVRJT05OQU1FJyxcbiAgJ0RCUEFSVElUSU9OTlVNJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRklOSVRJT04nLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFUkFOSycsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFU0NSSVBUT1InLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESUFHTk9TVElDUycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0FMTE9XJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFNTSVpFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFRElUUFJPQycsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFTkRJTkcnLFxuICAnRVJBU0UnLFxuICAnRVNDQVBFJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFAnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFTkNFRCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFBST0MnLFxuICAnRklMRScsXG4gICdGSUxURVInLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JBUEhJQycsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBU0gnLFxuICAnSEFTSEVEX1ZBTFVFJyxcbiAgJ0hJTlQnLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DTFVTSVZFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNBVE9SUycsXG4gICdJTkYnLFxuICAnSU5GSU5JVFknLFxuICAnSU5IRVJJVCcsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URUdSSVRZJyxcbiAgJ0lOVEVSU0VDVElPTicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lTT0JJRCcsXG4gICdJU09MQVRJT04nLFxuICAnSVRFUkFURScsXG4gICdKQVInLFxuICAnSkFWQScsXG4gICdLRUVQJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xDX0NUWVBFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTktUWVBFJyxcbiAgJ0xOJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMREFURScsXG4gICdMT0NBTEUnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUT1InLFxuICAnTE9DQVRPUlMnLFxuICAnTE9DSycsXG4gICdMT0NLTUFYJyxcbiAgJ0xPQ0tTSVpFJyxcbiAgJ0xPTkcnLFxuICAnTE9PUCcsXG4gICdMT1dFUicsXG4gICdNQUlOVEFJTkVEJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVgnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01FVEhPRCcsXG4gICdNSUNST1NFQ09ORCcsXG4gICdNSUNST1NFQ09ORFMnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVTJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNT05USFMnLFxuICAnTVVMVElTRVQnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05FV19UQUJMRScsXG4gICdORVhUVkFMJyxcbiAgJ05PJyxcbiAgJ05PQ0FDSEUnLFxuICAnTk9DWUNMRScsXG4gICdOT0RFTkFNRScsXG4gICdOT0RFTlVNQkVSJyxcbiAgJ05PTUFYVkFMVUUnLFxuICAnTk9NSU5WQUxVRScsXG4gICdOT05FJyxcbiAgJ05PT1JERVInLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnTlVNUEFSVFMnLFxuICAnT0JJRCcsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0YnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTERfVEFCTEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpBVElPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFEREVEJyxcbiAgJ1BBR0VTSVpFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05FRCcsXG4gICdQQVJUSVRJT05JTkcnLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BJRUNFU0laRScsXG4gICdQTEFOJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BPV0VSJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVZWQUwnLFxuICAnUFJJTUFSWScsXG4gICdQUklRVFknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPR1JBTScsXG4gICdQU0lEJyxcbiAgJ1BVQkxJQycsXG4gICdRVUVSWScsXG4gICdRVUVSWU5PJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ09WRVJZJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVTVUxUJyxcbiAgJ1JFU1VMVF9TRVRfTE9DQVRPUicsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VTkRfQ0VJTElORycsXG4gICdST1VORF9ET1dOJyxcbiAgJ1JPVU5EX0ZMT09SJyxcbiAgJ1JPVU5EX0hBTEZfRE9XTicsXG4gICdST1VORF9IQUxGX0VWRU4nLFxuICAnUk9VTkRfSEFMRl9VUCcsXG4gICdST1VORF9VUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVycsXG4gICdST1dOVU1CRVInLFxuICAnUk9XUycsXG4gICdST1dTRVQnLFxuICAnUk9XX05VTUJFUicsXG4gICdSUk4nLFxuICAnUlVOJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NPUEUnLFxuICAnU0NSQVRDSFBBRCcsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNPTkRTJyxcbiAgJ1NFQ1FUWScsXG4gICdTRUNVUklUWScsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lHTkFMJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQU4nLFxuICAnU09NRScsXG4gICdTT1VSQ0UnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1BFQ0lGSUNUWVBFJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMSUQnLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUVJUJyxcbiAgJ1NUQUNLRUQnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJQycsXG4gICdTVEFUTUVOVCcsXG4gICdTVEFZJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1RPR1JPVVAnLFxuICAnU1RPUkVTJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVU0nLFxuICAnU1VNTUFSWScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lOT05ZTScsXG4gICdTWVNGVU4nLFxuICAnU1lTSUJNJyxcbiAgJ1NZU1BST0MnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0xBVEUnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VORE8nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOVElMJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURQUk9DJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOVCcsXG4gICdWQVJZSU5HJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkNBVCcsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVk9MQVRJTEUnLFxuICAnVk9MVU1FUycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXTE0nLFxuICAnV1JJVEUnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdZRUFSJyxcbiAgJ1lFQVJTJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERiMkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklOQVJZJyxcbiAgJ0JPT0xFQU4nLFxuICAnQlJFQUsnLFxuICAnQlVDS0VUJyxcbiAgJ0JVSUxEJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NMVVNURVInLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUSU9OJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPUlJFTEFURScsXG4gICdDT1ZFUicsXG4gICdDUkVBVEUnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQVNFVCcsXG4gICdEQVRBU1RPUkUnLFxuICAnREVDTEFSRScsXG4gICdERUNSRU1FTlQnLFxuICAnREVMRVRFJyxcbiAgJ0RFUklWRUQnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdEUk9QJyxcbiAgJ0VBQ0gnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhDTFVERScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1NJJyxcbiAgJ0hBVklORycsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5GRVInLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tFWVNQQUNFJyxcbiAgJ0tOT1dOJyxcbiAgJ0xBU1QnLFxuICAnTEVGVCcsXG4gICdMRVQnLFxuICAnTEVUVElORycsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xTTScsXG4gICdNQVAnLFxuICAnTUFQUElORycsXG4gICdNQVRDSEVEJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNRVJHRScsXG4gICdNSVNTSU5HJyxcbiAgJ05BTUVTUEFDRScsXG4gICdORVNUJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTUJFUicsXG4gICdPQkpFQ1QnLFxuICAnT0ZGU0VUJyxcbiAgJ09OJyxcbiAgJ09QVElPTicsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ1BBUlNFJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BPT0wnLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVZBVEUnLFxuICAnUFJJVklMRUdFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFXJyxcbiAgJ1JFQUxNJyxcbiAgJ1JFRFVDRScsXG4gICdSRU5BTUUnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdTQVRJU0ZJRVMnLFxuICAnU0NIRU1BJyxcbiAgJ1NFTEVDVCcsXG4gICdTRUxGJyxcbiAgJ1NFTUknLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU09NRScsXG4gICdTVEFSVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ1NUUklORycsXG4gICdTWVNURU0nLFxuICAnVEhFTicsXG4gICdUTycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVU5ERVInLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOU0VUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMVUUnLFxuICAnVkFMVUVEJyxcbiAgJ1ZBTFVFUycsXG4gICdWSUEnLFxuICAnVklFVycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dPUksnLFxuICAnWE9SJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCBBTEwnLFxuICAnRVhDRVBUJyxcbiAgJ0VYUExBSU4gREVMRVRFIEZST00nLFxuICAnRVhQTEFJTiBVUERBVEUnLFxuICAnRVhQTEFJTiBVUFNFUlQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5GRVInLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTEVUJyxcbiAgJ0xJTUlUJyxcbiAgJ01FUkdFJyxcbiAgJ05FU1QnLFxuICAnT1JERVIgQlknLFxuICAnUFJFUEFSRScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRSBLRVlTJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOMXFsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnWycsICd7J10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ10nLCAnfSddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnIycsICctLSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCB7IGlzQnksIGlzU2V0IH0gZnJvbSAnLi4vY29yZS90b2tlbic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBJyxcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUdFTlQnLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FUJyxcbiAgJ0FUVFJJQlVURScsXG4gICdBVVRISUQnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQkZJTEVfQkFTRScsXG4gICdCSU5BUllfSU5URUdFUicsXG4gICdCSU5BUlknLFxuICAnQkxPQl9CQVNFJyxcbiAgJ0JMT0NLJyxcbiAgJ0JPRFknLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JPVU5EJyxcbiAgJ0JSRUFEVEgnLFxuICAnQlVMSycsXG4gICdCWScsXG4gICdCWVRFJyxcbiAgJ0MnLFxuICAnQ0FMTCcsXG4gICdDQUxMSU5HJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFSX0JBU0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUlNFVCcsXG4gICdDSEFSU0VURk9STScsXG4gICdDSEFSU0VUSUQnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQl9CQVNFJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ0xVU1RFUlMnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MQVVUSCcsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTVBJTEVEJyxcbiAgJ0NPTVBSRVNTJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OU1RBTlQnLFxuICAnQ09OU1RSVUNUT1InLFxuICAnQ09OVEVYVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NSQVNIJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUlZBTCcsXG4gICdDVVJTT1InLFxuICAnQ1VTVE9NREFUVU0nLFxuICAnREFOR0xJTkcnLFxuICAnREFUQScsXG4gICdEQVRFX0JBU0UnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVDSU1BTCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRklORScsXG4gICdERUxFVEUnLFxuICAnREVQVEgnLFxuICAnREVTQycsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJUkVDVE9SWScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVVJBVElPTicsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0lGJyxcbiAgJ0VNUFRZJyxcbiAgJ0VORCcsXG4gICdFU0NBUEUnLFxuICAnRVhDRVBUSU9OUycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFRFTkRTJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxPQVQnLFxuICAnRk9SJyxcbiAgJ0ZPUkFMTCcsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dFTkVSQUwnLFxuICAnR09UTycsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdIQVNIJyxcbiAgJ0hFQVAnLFxuICAnSElEREVOJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJRklFRCcsXG4gICdJRicsXG4gICdJTU1FRElBVEUnLFxuICAnSU4nLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lORElDRVMnLFxuICAnSU5GSU5JVEUnLFxuICAnSU5TVEFOVElBQkxFJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSRkFDRScsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVkFMSURBVEUnLFxuICAnSVMnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0pBVkEnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEVBRElORycsXG4gICdMRU5HVEgnLFxuICAnTEVWRUwnLFxuICAnTElCUkFSWScsXG4gICdMSUtFJyxcbiAgJ0xJS0UyJyxcbiAgJ0xJS0U0JyxcbiAgJ0xJS0VDJyxcbiAgJ0xJTUlURUQnLFxuICAnTE9DQUwnLFxuICAnTE9DSycsXG4gICdMT05HJyxcbiAgJ01BUCcsXG4gICdNQVgnLFxuICAnTUFYTEVOJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFJyxcbiAgJ01MU0xBQkVMJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BTUUnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVElWRScsXG4gICdOQVRVUkFMJyxcbiAgJ05BVFVSQUxOJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUVkFMJyxcbiAgJ05PQ09NUFJFU1MnLFxuICAnTk9DT1BZJyxcbiAgJ05PVCcsXG4gICdOT1dBSVQnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVNQkVSX0JBU0UnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPQ0lDT0xMJyxcbiAgJ09DSURBVEUnLFxuICAnT0NJREFURVRJTUUnLFxuICAnT0NJRFVSQVRJT04nLFxuICAnT0NJSU5URVJWQUwnLFxuICAnT0NJTE9CTE9DQVRPUicsXG4gICdPQ0lOVU1CRVInLFxuICAnT0NJUkFXJyxcbiAgJ09DSVJFRicsXG4gICdPQ0lSRUZDVVJTT1InLFxuICAnT0NJUk9XSUQnLFxuICAnT0NJU1RSSU5HJyxcbiAgJ09DSVRZUEUnLFxuICAnT0YnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BBUVVFJyxcbiAgJ09QRU4nLFxuICAnT1BFUkFUT1InLFxuICAnT1BUSU9OJyxcbiAgJ09SQUNMRScsXG4gICdPUkFEQVRBJyxcbiAgJ09SREVSJyxcbiAgJ09SR0FOSVpBVElPTicsXG4gICdPUkxBTlknLFxuICAnT1JMVkFSWScsXG4gICdPVEhFUlMnLFxuICAnT1VUJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnUEFDS0FHRScsXG4gICdQQVJBTExFTF9FTkFCTEUnLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUkFNRVRFUlMnLFxuICAnUEFSRU5UJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNDQUwnLFxuICAnUENURlJFRScsXG4gICdQSVBFJyxcbiAgJ1BJUEVMSU5FRCcsXG4gICdQTFNfSU5URUdFUicsXG4gICdQTFVHR0FCTEUnLFxuICAnUE9TSVRJVkUnLFxuICAnUE9TSVRJVkVOJyxcbiAgJ1BSQUdNQScsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJT1InLFxuICAnUFJJVkFURScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBSVNFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBVycsXG4gICdSRUFEJyxcbiAgJ1JFQUwnLFxuICAnUkVDT1JEJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0UnLFxuICAnUkVMRUFTRScsXG4gICdSRUxJRVNfT04nLFxuICAnUkVNJyxcbiAgJ1JFTUFJTkRFUicsXG4gICdSRU5BTUUnLFxuICAnUkVTT1VSQ0UnLFxuICAnUkVTVUxUX0NBQ0hFJyxcbiAgJ1JFU1VMVCcsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVkVSU0UnLFxuICAnUkVWT0tFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPVycsXG4gICdST1dJRCcsXG4gICdST1dOVU0nLFxuICAnUk9XVFlQRScsXG4gICdTQU1QTEUnLFxuICAnU0FWRScsXG4gICdTQVZFUE9JTlQnLFxuICAnU0IxJyxcbiAgJ1NCMicsXG4gICdTQjQnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUdNRU5UJyxcbiAgJ1NFTEYnLFxuICAnU0VQQVJBVEUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1JUJyxcbiAgJ1NJWkVfVCcsXG4gICdTSVpFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NPTUUnLFxuICAnU1BBQ0UnLFxuICAnU1BBUlNFJyxcbiAgJ1NRTCcsXG4gICdTUUxDT0RFJyxcbiAgJ1NRTERBVEEnLFxuICAnU1FMRVJSTScsXG4gICdTUUxOQU1FJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NUQU5EQVJEJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJQycsXG4gICdTVERERVYnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklORycsXG4gICdTVFJVQ1QnLFxuICAnU1RZTEUnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCUEFSVElUSU9OJyxcbiAgJ1NVQlNUSVRVVEFCTEUnLFxuICAnU1VCVFlQRScsXG4gICdTVUNDRVNTRlVMJyxcbiAgJ1NVTScsXG4gICdTWU5PTllNJyxcbiAgJ1NZU0RBVEUnLFxuICAnVEFCQVVUSCcsXG4gICdUQUJMRScsXG4gICdURE8nLFxuICAnVEhFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfQUJCUicsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUSU1FWk9ORV9SRUdJT04nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1VCMScsXG4gICdVQjInLFxuICAnVUI0JyxcbiAgJ1VJRCcsXG4gICdVTkRFUicsXG4gICdVTklRVUUnLFxuICAnVU5QTFVHJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VOVFJVU1RFRCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxJU1QnLFxuICAnVkFMVUUnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSMicsXG4gICdWQVJJQUJMRScsXG4gICdWQVJJQU5DRScsXG4gICdWQVJSQVknLFxuICAnVkFSWUlORycsXG4gICdWSUVXJyxcbiAgJ1ZJRVdTJyxcbiAgJ1ZPSUQnLFxuICAnV0hFTkVWRVInLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSQVBQRUQnLFxuICAnV1JJVEUnLFxuICAnWUVBUicsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQkVHSU4nLFxuICAnQ09OTkVDVCBCWScsXG4gICdERUNMQVJFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RFTEVURScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnTE9PUCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdTVEFSVCBXSVRIJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyc6J10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ18nLCAnJCcsICcjJywgJy4nLCAnQCddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIGlmIChpc1NldCh0b2tlbikgJiYgaXNCeSh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbikpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQk9SVCcsXG4gICdBQlNPTFVURScsXG4gICdBQ0NFU1MnLFxuICAnQUNUSU9OJyxcbiAgJ0FERCcsXG4gICdBRE1JTicsXG4gICdBRlRFUicsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMU08nLFxuICAnQUxURVInLFxuICAnQUxXQVlTJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU1NFUlRJT04nLFxuICAnQVNTSUdOTUVOVCcsXG4gICdBU1lNTUVUUklDJyxcbiAgJ0FUJyxcbiAgJ0FUVEFDSCcsXG4gICdBVFRSSUJVVEUnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdCQUNLV0FSRCcsXG4gICdCRUZPUkUnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JJVCcsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlknLFxuICAnQ0FDSEUnLFxuICAnQ0FMTCcsXG4gICdDQUxMRUQnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNDQURFRCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0FUQUxPRycsXG4gICdDSEFJTicsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSQUNURVJJU1RJQ1MnLFxuICAnQ0hFQ0snLFxuICAnQ0hFQ0tQT0lOVCcsXG4gICdDTEFTUycsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEFUSU9OJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUVOVFMnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT05DVVJSRU5UTFknLFxuICAnQ09ORklHVVJBVElPTicsXG4gICdDT05GTElDVCcsXG4gICdDT05ORUNUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OU1RSQUlOVFMnLFxuICAnQ09OVEVOVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJTSU9OJyxcbiAgJ0NPUFknLFxuICAnQ09TVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1NWJyxcbiAgJ0NVQkUnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0NBVEFMT0cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1NDSEVNQScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBWScsXG4gICdERUFMTE9DQVRFJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUZBVUxUUycsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkVSUkVEJyxcbiAgJ0RFRklORVInLFxuICAnREVMRVRFJyxcbiAgJ0RFTElNSVRFUicsXG4gICdERUxJTUlURVJTJyxcbiAgJ0RFUEVORFMnLFxuICAnREVTQycsXG4gICdERVRBQ0gnLFxuICAnRElDVElPTkFSWScsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0NBUkQnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9NQUlOJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0VBQ0gnLFxuICAnRUxTRScsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VORCcsXG4gICdFTlVNJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVOVCcsXG4gICdFWENFUFQnLFxuICAnRVhDTFVERScsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhQUkVTU0lPTicsXG4gICdFWFRFTlNJT04nLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGQU1JTFknLFxuICAnRkVUQ0gnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZPTExPV0lORycsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGT1JXQVJEJyxcbiAgJ0ZSRUVaRScsXG4gICdGUk9NJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVOQ1RJT05TJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JBTlRFRCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdHUk9VUFMnLFxuICAnSEFORExFUicsXG4gICdIQVZJTkcnLFxuICAnSEVBREVSJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdJREVOVElUWScsXG4gICdJRicsXG4gICdJTElLRScsXG4gICdJTU1FRElBVEUnLFxuICAnSU1NVVRBQkxFJyxcbiAgJ0lNUExJQ0lUJyxcbiAgJ0lNUE9SVCcsXG4gICdJTicsXG4gICdJTkNMVURFJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkhFUklUJyxcbiAgJ0lOSEVSSVRTJyxcbiAgJ0lOSVRJQUxMWScsXG4gICdJTkxJTkUnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5QVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOU1RFQUQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WT0tFUicsXG4gICdJUycsXG4gICdJU05VTEwnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0xBQkVMJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBU1QnLFxuICAnTEFURVJBTCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFQUtQUk9PRicsXG4gICdMRUFTVCcsXG4gICdMRUZUJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTElTVEVOJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUwnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUSU9OJyxcbiAgJ0xPQ0snLFxuICAnTE9DS0VEJyxcbiAgJ0xPR0dFRCcsXG4gICdNQVBQSU5HJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVhWQUxVRScsXG4gICdNRVRIT0QnLFxuICAnTUlOVVRFJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTU9WRScsXG4gICdOQU1FJyxcbiAgJ05BTUVTJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFQnLFxuICAnTkZDJyxcbiAgJ05GRCcsXG4gICdORktDJyxcbiAgJ05GS0QnLFxuICAnTk8nLFxuICAnTk9ORScsXG4gICdOT1JNQUxJWkUnLFxuICAnTk9STUFMSVpFRCcsXG4gICdOT1QnLFxuICAnTk9USElORycsXG4gICdOT1RJRlknLFxuICAnTk9UTlVMTCcsXG4gICdOT1dBSVQnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVMTFMnLFxuICAnTlVNRVJJQycsXG4gICdPQkpFQ1QnLFxuICAnT0YnLFxuICAnT0ZGJyxcbiAgJ09GRlNFVCcsXG4gICdPSURTJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRVJBVE9SJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05TJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09SRElOQUxJVFknLFxuICAnT1RIRVJTJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnT1ZFUlJJRElORycsXG4gICdPV05FRCcsXG4gICdPV05FUicsXG4gICdQQVJBTExFTCcsXG4gICdQQVJTRVInLFxuICAnUEFSVElBTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTU0lORycsXG4gICdQQVNTV09SRCcsXG4gICdQTEFDSU5HJyxcbiAgJ1BMQU5TJyxcbiAgJ1BPTElDWScsXG4gICdQT1NJVElPTicsXG4gICdQUkVDRURJTkcnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJFUEFSRUQnLFxuICAnUFJFU0VSVkUnLFxuICAnUFJJTUFSWScsXG4gICdQUklPUicsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSQUwnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0NFRFVSRVMnLFxuICAnUFJPR1JBTScsXG4gICdQVUJMSUNBVElPTicsXG4gICdRVU9URScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQUwnLFxuICAnUkVBU1NJR04nLFxuICAnUkVDSEVDSycsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVGRVJFTkNJTkcnLFxuICAnUkVGUkVTSCcsXG4gICdSRUlOREVYJyxcbiAgJ1JFTEFUSVZFJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVEFCTEUnLFxuICAnUkVQTEFDRScsXG4gICdSRVBMSUNBJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9MTFVQJyxcbiAgJ1JPVVRJTkUnLFxuICAnUk9VVElORVMnLFxuICAnUk9XJyxcbiAgJ1JPV1MnLFxuICAnUlVMRScsXG4gICdTQVZFUE9JTlQnLFxuICAnU0NIRU1BJyxcbiAgJ1NDSEVNQVMnLFxuICAnU0NST0xMJyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VDVVJJVFknLFxuICAnU0VMRUNUJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFUVVFTkNFUycsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0VSVkVSJyxcbiAgJ1NFU1NJT04nLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NFVCcsXG4gICdTRVRPRicsXG4gICdTRVRTJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1cnLFxuICAnU0lNSUxBUicsXG4gICdTSU1QTEUnLFxuICAnU0tJUCcsXG4gICdTTUFMTElOVCcsXG4gICdTTkFQU0hPVCcsXG4gICdTT01FJyxcbiAgJ1NRTCcsXG4gICdTVEFCTEUnLFxuICAnU1RBTkRBTE9ORScsXG4gICdTVEFSVCcsXG4gICdTVEFURU1FTlQnLFxuICAnU1RBVElTVElDUycsXG4gICdTVERJTicsXG4gICdTVERPVVQnLFxuICAnU1RPUkFHRScsXG4gICdTVE9SRUQnLFxuICAnU1RSSUNUJyxcbiAgJ1NUUklQJyxcbiAgJ1NVQlNDUklQVElPTicsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VQUE9SVCcsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lTSUQnLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFUycsXG4gICdUQUJMRVNBTVBMRScsXG4gICdUQUJMRVNQQUNFJyxcbiAgJ1RFTVAnLFxuICAnVEVNUExBVEUnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RFWFQnLFxuICAnVEhFTicsXG4gICdUSUVTJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVUVTQ0FQRScsXG4gICdVTkJPVU5ERUQnLFxuICAnVU5DT01NSVRURUQnLFxuICAnVU5FTkNSWVBURUQnLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5MSVNURU4nLFxuICAnVU5MT0dHRUQnLFxuICAnVU5USUwnLFxuICAnVVBEQVRFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFDVVVNJyxcbiAgJ1ZBTElEJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElEQVRPUicsXG4gICdWQUxVRScsXG4gICdWQUxVRVMnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJJQURJQycsXG4gICdWQVJZSU5HJyxcbiAgJ1ZFUkJPU0UnLFxuICAnVkVSU0lPTicsXG4gICdWSUVXJyxcbiAgJ1ZJRVdTJyxcbiAgJ1ZPTEFUSUxFJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJVEVTUEFDRScsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXT1JLJyxcbiAgJ1dSQVBQRVInLFxuICAnV1JJVEUnLFxuICAnWE1MJyxcbiAgJ1hNTEFUVFJJQlVURVMnLFxuICAnWE1MQ09OQ0FUJyxcbiAgJ1hNTEVMRU1FTlQnLFxuICAnWE1MRVhJU1RTJyxcbiAgJ1hNTEZPUkVTVCcsXG4gICdYTUxOQU1FU1BBQ0VTJyxcbiAgJ1hNTFBBUlNFJyxcbiAgJ1hNTFBJJyxcbiAgJ1hNTFJPT1QnLFxuICAnWE1MU0VSSUFMSVpFJyxcbiAgJ1hNTFRBQkxFJyxcbiAgJ1lFQVInLFxuICAnWUVTJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RncmVTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICAvLyBUT0RPOiBzdXBwb3J0ICQkIGRvbGxhci1xdW90ZWQgc3RyaW5ncyAkJFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgXCJVJicnXCIsICdVJlwiXCInLCAnJCQnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnPDwnLFxuICAgICAgICAnPj4nLFxuICAgICAgICAnfHwvJyxcbiAgICAgICAgJ3wvJyxcbiAgICAgICAgJzo6JyxcbiAgICAgICAgJy0+PicsXG4gICAgICAgICctPicsXG4gICAgICAgICd+fionLFxuICAgICAgICAnfn4nLFxuICAgICAgICAnIX5+KicsXG4gICAgICAgICchfn4nLFxuICAgICAgICAnfionLFxuICAgICAgICAnIX4qJyxcbiAgICAgICAgJyF+JyxcbiAgICAgIF0sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBRVMxMjgnLFxuICAnQUVTMjU2JyxcbiAgJ0FMTE9XT1ZFUldSSVRFJyxcbiAgJ0FOQUxZU0UnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1VQJyxcbiAgJ0JJTkFSWScsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQk9USCcsXG4gICdCWVRFRElDVCcsXG4gICdCWklQMicsXG4gICdDQVNUJyxcbiAgJ0NIRUNLJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlJFTlRfVVNFUl9JRCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkVSUkFCTEUnLFxuICAnREVGTEFURScsXG4gICdERUZSQUcnLFxuICAnREVMVEEnLFxuICAnREVMVEEzMksnLFxuICAnREVTQycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0VMU0UnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ERScsXG4gICdFTkNSWVBUJyxcbiAgJ0VOQ1JZUFRJT04nLFxuICAnRU5EJyxcbiAgJ0VYUExJQ0lUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUVaRScsXG4gICdGVUxMJyxcbiAgJ0dMT0JBTERJQ1QyNTYnLFxuICAnR0xPQkFMRElDVDY0SycsXG4gICdHUkFOVCcsXG4gICdHWklQJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTklUSUFMTFknLFxuICAnSU5UTycsXG4gICdMRUFESU5HJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMVU4nLFxuICAnTFVOUycsXG4gICdMWk8nLFxuICAnTFpPUCcsXG4gICdNSU5VUycsXG4gICdNT1NUTFkxMycsXG4gICdNT1NUTFkzMicsXG4gICdNT1NUTFk4JyxcbiAgJ05BVFVSQUwnLFxuICAnTkVXJyxcbiAgJ05VTExTJyxcbiAgJ09GRicsXG4gICdPRkZMSU5FJyxcbiAgJ09GRlNFVCcsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SREVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ1BBUkFMTEVMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UJyxcbiAgJ1BFUk1JU1NJT05TJyxcbiAgJ1BMQUNJTkcnLFxuICAnUFJJTUFSWScsXG4gICdSQVcnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFQ09WRVInLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUpFQ1RMT0cnLFxuICAnUkVTT1JUJyxcbiAgJ1JFU1RPUkUnLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NJTUlMQVInLFxuICAnU1lTREFURScsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEFHJyxcbiAgJ1RERVMnLFxuICAnVEVYVDI1NScsXG4gICdURVhUMzJLJyxcbiAgJ1RIRU4nLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RPJyxcbiAgJ1RPUCcsXG4gICdUUkFJTElORycsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdVTklRVUUnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWRVJCT1NFJyxcbiAgJ1dBTExFVCcsXG4gICdXSEVOJyxcbiAgJ1dJVEgnLFxuICAnV0lUSE9VVCcsXG4gICdQUkVESUNBVEUnLFxuICAnQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QUkVTU0lPTicsXG4gICdDT1BZJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnRVZFTicsXG4gICdBTEwnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdUT1AnLFxuICAnTElNSVQnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kYXJkU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJywgJyMnLCAnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCB7IGlzRW5kLCBpc1dpbmRvdyB9IGZyb20gJy4uL2NvcmUvdG9rZW4nO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUlJBWV9aSVAnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExFQ1RfTElTVCcsXG4gICdDT0xMRUNUX1NFVCcsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCBST1cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVRFX0FERCcsXG4gICdEQVRFX1NVQicsXG4gICdEQVRFX1RSVU5DJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdERUNPREUnLFxuICAnREVGQVVMVCcsXG4gICdERUxFVEUnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdEUk9QJyxcbiAgJ0VMU0UnLFxuICAnRU5DT0RFJyxcbiAgJ0VORCcsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBMT0RFX09VVEVSJyxcbiAgJ0VYUExPREUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUX1ZBTFVFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZST01fVU5JWFRJTUUnLFxuICAnRlVMTCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSU4nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnTEFHJyxcbiAgJ0xBU1RfVkFMVUUnLFxuICAnTEFTVCcsXG4gICdMRUFEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBU1QnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdNQVgnLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTUlOVVRFJyxcbiAgJ01PTlRIJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05USUxFJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BUSU1JWkUnLFxuICAnT1ZFUicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTkFNRScsXG4gICdSTElLRScsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdTRUNPTkQnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NJWkUnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdUSEVOJyxcbiAgJ1RPX0RBVEUnLFxuICAnVE9fSlNPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5JWF9USU1FU1RBTVAnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBUklBQkxFUycsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdZRUFSX01PTlRIJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgREFUQUJBU0UnLFxuICAnQUxURVIgU0NIRU1BJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NMVVNURVIgQlknLFxuICAnQ0xVU1RFUkVEIEJZJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RJU1RSSUJVVEUgQlknLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09QVElPTlMnLFxuICAnT1JERVIgQlknLFxuICAnUEFSVElUSU9OIEJZJyxcbiAgJ1BBUlRJVElPTkVEIEJZJyxcbiAgJ1JBTkdFJyxcbiAgJ1JPV1MnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdUQkxQUk9QRVJUSUVTJyxcbiAgJ1VQREFURScsXG4gICdVU0lORycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnV0lORE9XJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW1xuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0FOVEkgSk9JTicsXG4gICdDUkVBVEUgT1InLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xBVEVSQUwgVklFVycsXG4gICdMRUZUIEFOVEkgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ0xFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgQU5USSBKT0lOJyxcbiAgJ05BVFVSQUwgRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgSU5ORVIgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBTRU1JIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgU0VNSSBKT0lOJyxcbiAgJ1NFTUkgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFya1NxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICd7fSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgZnVuY3Rpb25zXG4gICAgaWYgKGlzV2luZG93KHRva2VuKSkge1xuICAgICAgY29uc3QgYWhlYWRUb2tlbiA9IHRoaXMudG9rZW5Mb29rQWhlYWQoKTtcbiAgICAgIGlmIChhaGVhZFRva2VuICYmIGFoZWFkVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBmdW5jdGlvbiBjYWxsLCB0cmVhdCBpdCBhcyBhIHJlc2VydmVkIHdvcmRcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4IGNhc2VzIHdoZXJlIG5hbWVzIGFyZSBhbWJpZ3VvdXNseSBrZXl3b3JkcyBvciBwcm9wZXJ0aWVzXG4gICAgaWYgKGlzRW5kKHRva2VuKSkge1xuICAgICAgY29uc3QgYmFja1Rva2VuID0gdGhpcy50b2tlbkxvb2tCZWhpbmQoKTtcbiAgICAgIGlmIChiYWNrVG9rZW4gJiYgYmFja1Rva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFUkFUT1IgJiYgYmFja1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB3aW5kb3coKS5lbmQgKG9yIHNpbWlsYXIpIG5vdCBDQVNFIC4uLiBFTkRcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5XT1JELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FDVElPTicsXG4gICdBR0FJTlNUJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEdPUklUSE0nLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUT0NPTU1JVCcsXG4gICdBVVRPX0lOQ1JFTUVOVCcsXG4gICdCQUNLVVAnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5MT0cnLFxuICAnQk9USCcsXG4gICdDQVNDQURFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFOR0VEJyxcbiAgJ0NIQVJBQ1RFUiBTRVQnLFxuICAnQ0hBUlNFVCcsXG4gICdDSEVDSycsXG4gICdDSEVDS1NVTScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUFJFU1NFRCcsXG4gICdDT05DVVJSRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWScsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVGQVVMVCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdEVU1QRklMRScsXG4gICdEVVBMSUNBVEUnLFxuICAnRFlOQU1JQycsXG4gICdFTFNFJyxcbiAgJ0VOQ0xPU0VEJyxcbiAgJ0VOR0lORScsXG4gICdFTkdJTkVTJyxcbiAgJ0VOR0lORV9UWVBFJyxcbiAgJ0VTQ0FQRScsXG4gICdFU0NBUEVEJyxcbiAgJ0VWRU5UUycsXG4gICdFWEVDJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhURU5ERUQnLFxuICAnRkFTVCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFMnLFxuICAnRklMRScsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTFVTSCcsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGVUxMJyxcbiAgJ0ZVTExURVhUJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dMT0JBTCcsXG4gICdHUkFOVCcsXG4gICdHUkFOVFMnLFxuICAnR1JPVVBfQ09OQ0FUJyxcbiAgJ0hFQVAnLFxuICAnSElHSF9QUklPUklUWScsXG4gICdIT1NUUycsXG4gICdIT1VSJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0lERU5USUZJRUQnLFxuICAnSUYnLFxuICAnSUZOVUxMJyxcbiAgJ0lHTk9SRScsXG4gICdJTicsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lORklMRScsXG4gICdJTlNFUlQnLFxuICAnSU5TRVJUX0lEJyxcbiAgJ0lOU0VSVF9NRVRIT0QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZPS0VSJyxcbiAgJ0lTJyxcbiAgJ0lTT0xBVElPTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xBU1RfSU5TRVJUX0lEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdMSU5FQVInLFxuICAnTElORVMnLFxuICAnTE9BRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPQ0tTJyxcbiAgJ0xPR1MnLFxuICAnTE9XX1BSSU9SSVRZJyxcbiAgJ01BUklBJyxcbiAgJ01BU1RFUicsXG4gICdNQVNURVJfQ09OTkVDVF9SRVRSWScsXG4gICdNQVNURVJfSE9TVCcsXG4gICdNQVNURVJfTE9HX0ZJTEUnLFxuICAnTUFUQ0gnLFxuICAnTUFYX0NPTk5FQ1RJT05TX1BFUl9IT1VSJyxcbiAgJ01BWF9RVUVSSUVTX1BFUl9IT1VSJyxcbiAgJ01BWF9ST1dTJyxcbiAgJ01BWF9VUERBVEVTX1BFUl9IT1VSJyxcbiAgJ01BWF9VU0VSX0NPTk5FQ1RJT05TJyxcbiAgJ01FRElVTScsXG4gICdNRVJHRScsXG4gICdNSU5VVEUnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5fUk9XUycsXG4gICdNT0RFJyxcbiAgJ01PRElGWScsXG4gICdNT05USCcsXG4gICdNUkdfTVlJU0FNJyxcbiAgJ01ZSVNBTScsXG4gICdOQU1FUycsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT1coKScsXG4gICdOVUxMJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OQUxMWScsXG4gICdPVVRGSUxFJyxcbiAgJ1BBQ0tfS0VZUycsXG4gICdQQUdFJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBUlRJVElPTlMnLFxuICAnUEFTU1dPUkQnLFxuICAnUFJJTUFSWScsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRVNTJyxcbiAgJ1BST0NFU1NMSVNUJyxcbiAgJ1BVUkdFJyxcbiAgJ1FVSUNLJyxcbiAgJ1JBSUQwJyxcbiAgJ1JBSURfQ0hVTktTJyxcbiAgJ1JBSURfQ0hVTktTSVpFJyxcbiAgJ1JBSURfVFlQRScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQURfT05MWScsXG4gICdSRUFEX1dSSVRFJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTE9BRCcsXG4gICdSRU5BTUUnLFxuICAnUkVQQUlSJyxcbiAgJ1JFUEVBVEFCTEUnLFxuICAnUkVQTEFDRScsXG4gICdSRVBMSUNBVElPTicsXG4gICdSRVNFVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSTElLRScsXG4gICdST0xMQkFDSycsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdST1dfRk9STUFUJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNVUklUWScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFU1NJT04nLFxuICAnU0hBUkUnLFxuICAnU0hPVycsXG4gICdTSFVURE9XTicsXG4gICdTTEFWRScsXG4gICdTT05BTUUnLFxuICAnU09VTkRTJyxcbiAgJ1NRTCcsXG4gICdTUUxfQVVUT19JU19OVUxMJyxcbiAgJ1NRTF9CSUdfUkVTVUxUJyxcbiAgJ1NRTF9CSUdfU0VMRUNUUycsXG4gICdTUUxfQklHX1RBQkxFUycsXG4gICdTUUxfQlVGRkVSX1JFU1VMVCcsXG4gICdTUUxfQ0FDSEUnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfTE9HX0JJTicsXG4gICdTUUxfTE9HX09GRicsXG4gICdTUUxfTE9HX1VQREFURScsXG4gICdTUUxfTE9XX1BSSU9SSVRZX1VQREFURVMnLFxuICAnU1FMX01BWF9KT0lOX1NJWkUnLFxuICAnU1FMX05PX0NBQ0hFJyxcbiAgJ1NRTF9RVU9URV9TSE9XX0NSRUFURScsXG4gICdTUUxfU0FGRV9VUERBVEVTJyxcbiAgJ1NRTF9TRUxFQ1RfTElNSVQnLFxuICAnU1FMX1NMQVZFX1NLSVBfQ09VTlRFUicsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NRTF9XQVJOSU5HUycsXG4gICdTVEFSVCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUVVMnLFxuICAnU1RPUCcsXG4gICdTVE9SQUdFJyxcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnU1RSSU5HJyxcbiAgJ1NUUklQRUQnLFxuICAnU1VQRVInLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5DT01NSVRURUQnLFxuICAnVU5JUVVFJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSSVRFJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdHTycsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJ0AnLCAnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWycjJywgJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEYjJGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyJztcbmltcG9ydCBOMXFsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBsU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyJztcbmltcG9ydCBQb3N0Z3JlU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFJlZHNoaWZ0Rm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1JlZHNoaWZ0Rm9ybWF0dGVyJztcbmltcG9ydCBTcGFya1NxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlcic7XG5pbXBvcnQgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXInO1xuXG5jb25zdCBmb3JtYXR0ZXJzID0ge1xuICBkYjI6IERiMkZvcm1hdHRlcixcbiAgbjFxbDogTjFxbEZvcm1hdHRlcixcbiAgJ3BsL3NxbCc6IFBsU3FsRm9ybWF0dGVyLFxuICBwbHNxbDogUGxTcWxGb3JtYXR0ZXIsXG4gIHBvc3RncmVzcWw6IFBvc3RncmVTcWxGb3JtYXR0ZXIsXG4gIHJlZHNoaWZ0OiBSZWRzaGlmdEZvcm1hdHRlcixcbiAgc3Bhcms6IFNwYXJrU3FsRm9ybWF0dGVyLFxuICBzcWw6IFN0YW5kYXJkU3FsRm9ybWF0dGVyLFxufTtcblxuLyoqXG4gKiBGb3JtYXQgd2hpdGVzcGFjZSBpbiBhIHF1ZXJ5IHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudCBDaGFyYWN0ZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlIENvbnZlcnRzIGtleXdvcmRzIHRvIHVwcGVyY2FzZVxuICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgSG93IG1hbnkgbGluZSBicmVha3MgYmV0d2VlbiBxdWVyaWVzXG4gKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXMgQ29sbGVjdGlvbiBvZiBwYXJhbXMgZm9yIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSAocXVlcnksIGNmZyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1ZXJ5IGFyZ3VtZW50LiBFeHRlY3RlZCBzdHJpbmcsIGluc3RlYWQgZ290ICcgKyB0eXBlb2YgcXVlcnkpO1xuICB9XG5cbiAgbGV0IEZvcm1hdHRlciA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xuICBpZiAoY2ZnLmxhbmd1YWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBGb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2NmZy5sYW5ndWFnZV07XG4gIH1cbiAgaWYgKEZvcm1hdHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIFNRTCBkaWFsZWN0OiAke2NmZy5sYW5ndWFnZX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEZvcm1hdHRlcihjZmcpLmZvcm1hdChxdWVyeSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRGlhbGVjdHMgPSBPYmplY3Qua2V5cyhmb3JtYXR0ZXJzKTtcbiIsIi8vIE9ubHkgcmVtb3ZlcyBzcGFjZXMsIG5vdCBuZXdsaW5lc1xuZXhwb3J0IGNvbnN0IHRyaW1TcGFjZXNFbmQgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvWyBcXHRdKyQvdSwgJycpO1xuXG4vLyBMYXN0IGVsZW1lbnQgZnJvbSBhcnJheVxuZXhwb3J0IGNvbnN0IGxhc3QgPSAoYXJyKSA9PiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuXG4vLyBUcnVlIGFycmF5IGlzIGVtcHR5LCBvciBpdCdzIG5vdCBhbiBhcnJheSBhdCBhbGxcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gKGFycikgPT4gIUFycmF5LmlzQXJyYXkoYXJyKSB8fCBhcnIubGVuZ3RoID09PSAwO1xuXG4vLyBFc2NhcGVzIHJlZ2V4IHNwZWNpYWwgY2hhcnNcbmV4cG9ydCBjb25zdCBlc2NhcGVSZWdFeHAgPSAoc3RyaW5nKSA9PiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2d1LCAnXFxcXCQmJyk7XG5cbi8vIFNvcnRzIHN0cmluZ3MgYnkgbGVuZ3RoLCBzbyB0aGF0IGxvbmdlciBvbmVzIGFyZSBmaXJzdFxuLy8gQWxzbyBzb3J0cyBhbHBoYWJldGljYWxseSBhZnRlciBzb3J0aW5nIGJ5IGxlbmd0aC5cbmV4cG9ydCBjb25zdCBzb3J0QnlMZW5ndGhEZXNjID0gKHN0cmluZ3MpID0+XG4gIHN0cmluZ3Muc29ydCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoIHx8IGEubG9jYWxlQ29tcGFyZShiKTtcbiAgfSk7XG4iXSwic291cmNlUm9vdCI6IiJ9