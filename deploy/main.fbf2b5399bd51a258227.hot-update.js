exports.id = "main";
exports.modules = {

/***/ "./src/components/ui/Aside/index.js":
/*!******************************************!*\
  !*** ./src/components/ui/Aside/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/leroywagner/Desktop/Projects/react/nesspkg/ness-app/src/components/ui/Aside/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function Aside(_ref) {
  let {
    children
  } = _ref;
  const childrenWithProps = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child);
    }

    return child;
  });
  return __jsx("aside", {
    className: "bg-slate-100 rounded-lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 12
    }
  }, childrenWithProps);
}

/* harmony default export */ __webpack_exports__["default"] = (Aside);

/***/ }),

/***/ "./src/components/ui/Navbar/index.js":
/*!*******************************************!*\
  !*** ./src/components/ui/Navbar/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/leroywagner/Desktop/Projects/react/nesspkg/ness-app/src/components/ui/Navbar/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function Navbar(_ref) {
  let {
    children
  } = _ref;
  const childrenWithProps = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child);
    }

    return child;
  });
  return __jsx("nav", {
    className: "navbar",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 12
    }
  }, childrenWithProps);
}

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./src/pages/Home.js":
/*!***************************!*\
  !*** ./src/pages/Home.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nessapp/next/ui */ "nessapp/next/ui");
/* harmony import */ var nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ui/Header */ "./src/components/ui/Header/index.js");
/* harmony import */ var _components_ui_Container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui/Container */ "./src/components/ui/Container/index.js");
/* harmony import */ var _components_ui_Aside__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/Aside */ "./src/components/ui/Aside/index.js");
/* harmony import */ var _components_ui_Navbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui/Navbar */ "./src/components/ui/Navbar/index.js");
/* harmony import */ var _styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/Home.module.scss */ "./src/styles/Home.module.scss");
/* harmony import */ var _styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/leroywagner/Desktop/Projects/react/nesspkg/ness-app/src/pages/Home.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

 // layout

 // components




 // Home module stylesheet



function Home(props) {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  return __jsx(nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2__["Page"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 5
    }
  }, __jsx(nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2__["Head"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }, __jsx(react_helmet__WEBPACK_IMPORTED_MODULE_1__["Helmet"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx("title", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, "Welcome to NessApp"), __jsx("meta", {
    name: "description",
    content: "Thanks for installing this application!",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 11
    }
  }))), __jsx(nessapp_next_ui__WEBPACK_IMPORTED_MODULE_2__["Layout"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, __jsx(_components_ui_Header__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }), __jsx(_components_ui_Container__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, __jsx(_components_ui_Navbar__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }), __jsx(_components_ui_Aside__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 11
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  }, "Welcome to Ness.js")))));
}

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

};
//# sourceMappingURL=main.fbf2b5399bd51a258227.hot-update.js.map