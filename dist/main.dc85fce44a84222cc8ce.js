/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([16,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixHelper = exports.FileTransfer = exports.ImageLoader = void 0;
const ImageLoader = __webpack_require__(38);
exports.ImageLoader = ImageLoader;
const FileTransfer = __webpack_require__(14);
exports.FileTransfer = FileTransfer;
const MatrixHelper = __webpack_require__(39);
exports.MatrixHelper = MatrixHelper;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(43);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dataURLToImage = exports.imageToDataURL = exports.canvasToBlob = exports.BlobToCanvas = exports.imageToBlob = exports.blobToImage = exports.dataURLToBlob = exports.fileOrBlobToDataURL = exports.canvasToImage = exports.imageToCanvas = exports.dataURLToCanvas = exports.canvasToDataURL = void 0;
const canvasToDataURL = (canvas, format, quality) => {
    return canvas.toDataURL(format || 'image/jpeg', quality || 1.0);
};
exports.canvasToDataURL = canvasToDataURL;
const dataURLToCanvas = (dataUrl) => {
    return new Promise((resolve, reject) => {
        if (!dataUrl) {
            reject(new Error('dataUrl length error'));
        }
        const element = document.createElement('CANVAS');
        const canvas = element;
        const ctx = canvas.getContext('2d');
        exports.dataURLToImage(dataUrl).then((res) => {
            canvas.width = res.width;
            canvas.height = res.height;
            ctx.drawImage(res, 0, 0);
            resolve(canvas);
        }).catch(reject);
    });
};
exports.dataURLToCanvas = dataURLToCanvas;
const imageToCanvas = (src) => {
    return new Promise((resolve, reject) => {
        if (!src) {
            reject(new Error('dataUrl length error'));
        }
        const element = document.createElement('CANVAS');
        const canvas = element;
        const ctx = canvas.getContext('2d');
        exports.dataURLToImage(src).then((res) => {
            canvas.width = res.width;
            canvas.height = res.height;
            ctx.drawImage(res, 0, 0);
            resolve(canvas);
        }).catch(reject);
    });
};
exports.imageToCanvas = imageToCanvas;
const canvasToImage = (canvas) => {
    return exports.dataURLToImage(canvas.toDataURL('image/jpeg', 1.0));
};
exports.canvasToImage = canvasToImage;
const fileOrBlobToDataURL = (obj) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        fileReader.onerror = (e) => {
            reject(e);
        };
        fileReader.readAsDataURL(obj);
    });
};
exports.fileOrBlobToDataURL = fileOrBlobToDataURL;
const dataURLToBlob = (dataUrl) => {
    var arr = dataUrl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
exports.dataURLToBlob = dataURLToBlob;
const blobToImage = (blob, cb) => {
    return new Promise((resolve, reject) => {
        exports.fileOrBlobToDataURL(blob).then((res) => {
            exports.dataURLToImage(res).then(resolve).catch(reject);
        }).catch(reject);
    });
};
exports.blobToImage = blobToImage;
const imageToBlob = (src, cb) => {
    return new Promise((resolve, reject) => {
        exports.imageToCanvas(src).then((canvas) => {
            resolve(exports.dataURLToBlob(exports.canvasToDataURL(canvas)));
        }).catch(reject);
    });
};
exports.imageToBlob = imageToBlob;
const BlobToCanvas = (blob, cb) => {
    return new Promise((resolve, reject) => {
        exports.fileOrBlobToDataURL(blob).then((res) => {
            exports.dataURLToCanvas(res).then(resolve).catch(reject);
        }).catch(reject);
    });
};
exports.BlobToCanvas = BlobToCanvas;
const canvasToBlob = (canvas) => {
    return exports.dataURLToBlob(exports.canvasToDataURL(canvas));
};
exports.canvasToBlob = canvasToBlob;
const imageToDataURL = (src) => {
    return new Promise((resolve, reject) => {
        exports.imageToCanvas(src).then((canvas) => {
            resolve(exports.canvasToDataURL(canvas));
        }).catch(reject);
    });
};
exports.imageToDataURL = imageToDataURL;
const dataURLToImage = (dataUrl) => {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = dataUrl;
    });
};
exports.dataURLToImage = dataURLToImage;


/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const ReactDOM = __webpack_require__(18);
__webpack_require__(22);
const MainRoute_1 = __webpack_require__(24);
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(MainRoute_1.default, null)), document.getElementById('root'));


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(23);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const react_router_dom_1 = __webpack_require__(9);
const AppRouter_1 = __webpack_require__(32);
const SvgRouter_1 = __webpack_require__(53);
__webpack_require__(57);
const Router = (props) => {
    return (React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { path: "/app", render: () => React.createElement(AppRouter_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/svg", render: () => React.createElement(SvgRouter_1.default, null) }))));
};
exports.default = Router;


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const react_router_dom_1 = __webpack_require__(9);
const App_1 = __webpack_require__(33);
const CanvasExport_1 = __webpack_require__(37);
const Translate_1 = __webpack_require__(42);
const Translate_2 = __webpack_require__(44);
const MouseTranslate_1 = __webpack_require__(45);
const Image_1 = __webpack_require__(46);
const TextAnimation_1 = __webpack_require__(49);
const AppRouter = (props) => {
    return (React.createElement(react_router_dom_1.Switch, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/imageExport", render: () => React.createElement(CanvasExport_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/translate", render: () => React.createElement(Translate_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/TranslateMatrix", render: () => React.createElement(Translate_2.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/MouseTranslate", render: () => React.createElement(MouseTranslate_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/image", render: () => React.createElement(Image_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app/text", render: () => React.createElement(TextAnimation_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/app", render: () => React.createElement(App_1.default, null) })));
};
exports.default = AppRouter;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const classnames_1 = __webpack_require__(34);
__webpack_require__(35);
const App = (props) => {
    const [animation, setAnimation] = React.useState(false);
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { className: classnames_1.default('transformBox', { animation }), onClick: () => setAnimation(!animation) }),
        React.createElement("canvas", null)));
};
exports.default = App;


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(36);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".App{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}.App canvas{width:100%;height:100%}.App .transformBox{padding:50px;position:absolute;background-color:red;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.App .animation{-webkit-animation:rotate;animation:rotate;-webkit-animation-duration:4s;animation-duration:4s;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const helper_1 = __webpack_require__(5);
__webpack_require__(40);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.onPickFile = (event) => {
            const files = event.target.files;
            if (files.length) {
                helper_1.ImageLoader.loader(files[0]).then((image) => {
                    var _a;
                    const { width, height } = image;
                    (_a = this.canvasRef.current) === null || _a === void 0 ? void 0 : _a.getContext('2d').drawImage(image, 0, 0, width, height);
                }).catch((error) => {
                    console.log(error);
                });
            }
        };
        this.state = {
            accept: [
                'image/jpeg',
                'image/png',
                'image/webp'
            ]
        };
    }
    render() {
        const { accept } = this.state;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("canvas", { ref: this.canvasRef }),
            React.createElement("div", { className: "image-picker" },
                React.createElement("input", { type: "file", accept: accept.join(','), onChange: this.onPickFile }))));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
const FileTransfer_1 = __webpack_require__(14);
const loader = (imgOpt) => {
    return new Promise((resolve, reject) => {
        if (!imgOpt) {
            reject(new Error('not a image url'));
        }
        if (typeof imgOpt === 'string') {
            FileTransfer_1.dataURLToImage(imgOpt).then(resolve).catch(reject);
        }
        else {
            FileTransfer_1.fileOrBlobToDataURL(imgOpt).then((res) => {
                FileTransfer_1.dataURLToImage(res).then(resolve).catch(reject);
            }).catch(reject);
        }
    });
};
exports.loader = loader;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.translate3d = exports.translate2d = exports.scale3d = exports.scale2d = exports.multipleMatrix = exports.matrixArrayToCssMatrix = exports.getTransformMatrix = void 0;
const getTransformMatrix = (transform) => {
    var $div = document.createElement('div');
    $div.style.visibility = 'hidden';
    $div.style.position = 'fixed';
    var transformProperty = 'transform';
    if ('transform' in $div.style) {
        transformProperty = 'transform';
    }
    else if ('WebkitTransform' in $div.style) {
        transformProperty = 'webkitTransform';
    }
    else if ('MozTransform' in $div.style) {
        transformProperty = 'MozTransform';
    }
    else if ('OTransform' in $div.style) {
        transformProperty = 'OTransform';
    }
    $div.style[transformProperty] = transform;
    document.body.appendChild($div);
    var style = window.getComputedStyle($div);
    var matrix = style[transformProperty];
    document.body.removeChild($div);
    return matrix;
};
exports.getTransformMatrix = getTransformMatrix;
const matrixArrayToCssMatrix = (array) => {
    return "matrix3d(" + array.join(',') + ")";
};
exports.matrixArrayToCssMatrix = matrixArrayToCssMatrix;
const multipleMatrix = (matrixA, matrixB) => {
    let res = [];
    let b = 0;
    for (let k = 0; k < 16; k++) {
        let a = Math.floor(k / 4);
        let n = 0;
        for (let j = 0; j < 16; j += 4) {
            n += matrixA[a + j] * matrixB[b + j];
        }
        b++;
        if (b == 4)
            b = 0;
        res.push(n);
    }
    return res;
};
exports.multipleMatrix = multipleMatrix;
const translation = (tx, ty, tz) => {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
    ];
};
const scale = (tx, ty, tz) => {
    return [
        tx, 0, 0, 0,
        0, ty, 0, 0,
        0, 0, tz, 0,
        0, 0, 0, 1
    ];
};
const scale2d = (tx, ty, matrix = scale(1, 1, 1)) => {
    return exports.multipleMatrix(matrix, scale(tx, ty, 1));
};
exports.scale2d = scale2d;
const scale3d = (tx, ty, tz, matrix = scale(1, 1, 1)) => {
    return exports.multipleMatrix(matrix, scale(tx, ty, tz));
};
exports.scale3d = scale3d;
const translate2d = (x = 0, y = 0, matrix = translation(0, 0, 0)) => {
    return exports.multipleMatrix(matrix, translation(x, y, 0));
};
exports.translate2d = translate2d;
const translate3d = (x = 0, y = 0, z = 0, matrix = translation(0, 0, 0)) => {
    return exports.multipleMatrix(matrix, translation(x, y, z));
};
exports.translate3d = translate3d;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(41);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas-export-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
__webpack_require__(8);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.h = 100;
        this.w = 40;
        this.line = 10;
        this.startX = 10;
        this.startY = 10;
        this.max = window.innerHeight - 300;
        this.animationCount = 0;
        this.clear = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        };
        this.initConfig = () => {
            cancelAnimationFrame(this.animationCount);
            if (this.canvasRef.current) {
                this.canvasRef.current.width = window.innerWidth;
                this.canvasRef.current.height = window.innerHeight;
                this.ctx = this.canvasRef.current.getContext('2d');
                this.animation();
            }
            else {
                this.animationCount = requestAnimationFrame(this.initConfig);
            }
        };
        this.drawSymbol = () => {
            const { x, y } = this.state;
            this.ctx.lineWidth = this.line;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + this.h);
            this.ctx.lineTo(x + this.w, y + this.h);
            this.ctx.strokeStyle = "#fff";
            this.ctx.stroke();
            const { width, height } = this.ctx.canvas;
            this.ctx.beginPath();
            this.ctx.moveTo(0, height / 2);
            this.ctx.lineTo(width, height / 2);
            this.ctx.moveTo(width / 2, 0);
            this.ctx.lineTo(width / 2, height);
            this.ctx.strokeStyle = "orange";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        };
        this.animation = () => {
            cancelAnimationFrame(this.animationCount);
            this.clear();
            this.drawSymbol();
            this.renderTranslate();
            this.animationCount = requestAnimationFrame(this.animation);
        };
        this.renderTranslate = () => {
            const { start, x, y } = this.state;
            if (start) {
                this.setState({
                    x: x + 1,
                    y: y + 1,
                });
                if (x + 1 > this.max) {
                    this.setState({
                        start: false
                    });
                }
            }
            else {
                this.setState({
                    x: x - 1,
                    y: y - 1,
                });
                if (x - 1 < this.startX) {
                    this.setState({
                        start: true
                    });
                }
            }
        };
        this.state = {
            x: 10,
            y: 10,
            start: true,
        };
    }
    componentDidMount() {
        this.animationCount = requestAnimationFrame(this.initConfig);
    }
    render() {
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("canvas", { ref: this.canvasRef })));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas-export-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const helper_1 = __webpack_require__(5);
__webpack_require__(8);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.divRef = React.createRef();
        this.h = 100;
        this.w = 40;
        this.line = 10;
        this.startX = 10;
        this.max = window.innerHeight - 300;
        this.animationCount = 0;
        this.move = 0;
        this.baseMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 201, 201, 0, 1];
        this.initConfig = () => {
            cancelAnimationFrame(this.animationCount);
            if (this.canvasRef.current) {
                this.canvasRef.current.width = window.innerWidth;
                this.canvasRef.current.height = window.innerHeight;
                this.ctx = this.canvasRef.current.getContext('2d');
                this.animation();
            }
            else {
                this.animationCount = requestAnimationFrame(this.initConfig);
            }
        };
        this.clear = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        };
        this.drawSymbol = () => {
            const { width, height } = this.ctx.canvas;
            this.ctx.beginPath();
            this.ctx.moveTo(0, height / 2);
            this.ctx.lineTo(width, height / 2);
            this.ctx.moveTo(width / 2, 0);
            this.ctx.lineTo(width / 2, height);
            this.ctx.strokeStyle = "orange";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            const matrix = helper_1.MatrixHelper.translate3d(this.move, this.move, 0);
            this.setState({
                matrix,
            });
        };
        this.animation = () => {
            cancelAnimationFrame(this.animationCount);
            this.clear();
            this.drawSymbol();
            this.renderTranslate();
            this.animationCount = requestAnimationFrame(this.animation);
        };
        this.renderTranslate = () => {
            const { start } = this.state;
            if (start) {
                this.move += 1;
                if (this.move > this.max) {
                    this.setState({
                        start: false
                    });
                }
            }
            else {
                this.move -= 1;
                if (this.move < this.startX) {
                    this.setState({
                        start: true
                    });
                }
            }
        };
        this.state = {
            x: 10,
            y: 10,
            start: true,
            matrix: []
        };
    }
    componentDidMount() {
        this.animationCount = requestAnimationFrame(this.initConfig);
    }
    render() {
        const { x, y, matrix } = this.state;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("div", { style: { position: 'absolute', left: x, top: y, padding: 100, background: 'red', transform: `matrix3d(${matrix.join(',')})` }, ref: this.divRef }),
            React.createElement("canvas", { ref: this.canvasRef })));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const helper_1 = __webpack_require__(5);
__webpack_require__(8);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.divRef = React.createRef();
        this.h = 100;
        this.w = 40;
        this.line = 10;
        this.startX = 10;
        this.max = window.innerHeight - 300;
        this.animationCount = 0;
        this.animationDivCount = 0;
        this.scale = 1;
        this.scaleStep = 0.1;
        this.move = { x: 0, y: 0 };
        this.temp = { x: 0, y: 0 };
        this.catch = { move: { x: 0, y: 0 }, scale: { x: 0, y: 0 } };
        this.baseMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 201, 201, 0, 1];
        this.initDivCONFIG = () => {
            cancelAnimationFrame(this.animationDivCount);
            if (this.divRef.current) {
                this.divRef.current.addEventListener('mousewheel', this.onWheel, { passive: false });
            }
            else {
                this.animationDivCount = requestAnimationFrame(this.initDivCONFIG);
            }
        };
        this.initConfig = () => {
            cancelAnimationFrame(this.animationCount);
            if (this.canvasRef.current) {
                this.canvasRef.current.width = window.innerWidth;
                this.canvasRef.current.height = window.innerHeight;
                this.ctx = this.canvasRef.current.getContext('2d');
                this.animation();
            }
            else {
                this.animationCount = requestAnimationFrame(this.initConfig);
            }
        };
        this.clear = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        };
        this.drawSymbol = () => {
            const { width, height } = this.ctx.canvas;
            this.ctx.beginPath();
            this.ctx.moveTo(0, height / 2);
            this.ctx.lineTo(width, height / 2);
            this.ctx.moveTo(width / 2, 0);
            this.ctx.lineTo(width / 2, height);
            this.ctx.strokeStyle = "orange";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        };
        this.animation = () => {
            cancelAnimationFrame(this.animationCount);
            this.clear();
            this.drawSymbol();
        };
        this.onMouseUp = (e) => {
            this.temp = {
                x: e.clientX,
                y: e.clientY
            };
            this.move = {
                x: e.clientX,
                y: e.clientY
            };
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        };
        this.onMouseMove = (e) => {
            this.move = {
                x: e.clientX,
                y: e.clientY
            };
            const x = e.clientX - this.temp.x;
            const y = e.clientY - this.temp.y;
            const moveMatrix = helper_1.MatrixHelper.translate3d(x, y, 0);
            if (this.catch.move) {
                moveMatrix.splice(12, 1, this.catch.move.x + moveMatrix[12]);
                moveMatrix.splice(13, 1, this.catch.move.y + moveMatrix[13]);
            }
            this.setState({
                moveMatrix,
            });
        };
        this.onWheel = (e) => {
            const { deltaY } = e;
            e.preventDefault();
            const { scaleMatrix: scale, moveMatrix } = this.state;
            if (deltaY > 0) {
                this.scale -= this.scaleStep;
            }
            else {
                this.scale += this.scaleStep;
            }
            console.log(deltaY, scale);
            const scaleMatrix = helper_1.MatrixHelper.scale3d(this.scale, this.scale, 1);
            this.setState({
                scaleMatrix,
            });
        };
        this.onMouseDown = (e) => {
            this.move = {
                x: e.clientX,
                y: e.clientY
            };
            this.temp = {
                x: e.clientX,
                y: e.clientY
            };
            const { moveMatrix } = this.state;
            if (moveMatrix.length) {
                this.catch = {
                    move: {
                        x: moveMatrix[12],
                        y: moveMatrix[13]
                    },
                    scale: {
                        x: 0,
                        y: 0
                    }
                };
            }
            else {
                this.catch = {
                    move: {
                        x: 0,
                        y: 0
                    },
                    scale: {
                        x: 0,
                        y: 0
                    }
                };
            }
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        };
        this.state = {
            x: 10,
            y: 10,
            start: true,
            moveMatrix: [],
            scaleMatrix: [],
        };
    }
    componentDidMount() {
        this.animationCount = requestAnimationFrame(this.initConfig);
        this.animationDivCount = requestAnimationFrame(this.initDivCONFIG);
    }
    render() {
        const { x, y, moveMatrix, scaleMatrix } = this.state;
        const matrix = moveMatrix.length && scaleMatrix.length ?
            helper_1.MatrixHelper.multipleMatrix(moveMatrix, scaleMatrix) :
            moveMatrix.length ? moveMatrix :
                scaleMatrix;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: x,
                    top: y,
                    padding: 100,
                    background: 'red',
                    transform: `matrix3d(${matrix.join(',')})`
                }, ref: this.divRef, onMouseDown: this.onMouseDown }, "123"),
            React.createElement("canvas", { ref: this.canvasRef })));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const helper_1 = __webpack_require__(5);
__webpack_require__(47);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.onPickFile = (event) => {
            const files = event.target.files;
            if (files.length) {
                helper_1.ImageLoader.loader(files[0]).then((image) => {
                    var _a;
                    this.image = image;
                    const { width, height } = image;
                    (_a = this.canvasRef.current) === null || _a === void 0 ? void 0 : _a.getContext('2d').drawImage(image, 0, 0, width, height);
                }).catch((error) => {
                    console.log(error);
                });
            }
            this.setState({
                show: false
            });
        };
        this.rotate = (rotate) => {
            this.ctx.translate(-this.image.width / 2, -this.image.height / 2);
            this.ctx.rotate(rotate * Math.PI / 180);
        };
        this.scale = (scale) => {
            this.ctx.scale(scale, scale);
        };
        this.offset = (offset, type) => {
            const { offsetX, offsetY } = this.state;
            switch (type) {
                case 'x':
                    this.ctx.translate(offset, offsetY);
                    break;
                default:
                    this.ctx.translate(offsetX, offset);
                    break;
            }
        };
        this.waterFollow = () => {
            this.ctx.font = "20px serif";
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.ctx.fillText("这是水印", 0, 20);
        };
        this.draw = () => {
            var _a;
            console.log(100);
            const { rotate, scale, offsetX, waterFollow, lv } = this.state;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.beginPath();
            this.ctx.save();
            this.offset(offsetX, 'x');
            this.rotate(rotate);
            this.scale(scale);
            (_a = this.canvasRef.current) === null || _a === void 0 ? void 0 : _a.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);
            if (waterFollow) {
                this.waterFollow();
            }
            if (lv) {
                this.lj();
            }
            this.ctx.restore();
        };
        this.onRotate = (e) => {
            const rotate = Number(e.target.value);
            this.setState({
                rotate,
            });
        };
        this.lj = () => {
            var imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            var pxData = imageData.data;
            for (var i = 0; i < 1000 * 667; i++) {
                var r = pxData[4 * i];
                var g = pxData[4 * i + 1];
                var b = pxData[4 * i + 2];
                var grey = r * 0.3 + g * 0.59 + b * 0.11;
                pxData[4 * i] = grey;
                pxData[4 * i + 1] = grey;
                pxData[4 * i + 2] = grey;
            }
            this.ctx.putImageData(imageData, 0, 0, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        };
        this.onScale = (e) => {
            const scale = Number(e.target.value);
            this.setState({
                scale,
            });
        };
        this.onOffset = (e, type) => {
            const offset = Number(e.target.value);
            switch (type) {
                case 'x':
                    this.setState({
                        offsetX: offset,
                    });
                    break;
                default:
                    this.setState({
                        offsetY: offset,
                    });
                    break;
            }
        };
        this.people = () => {
        };
        this.state = {
            waterFollow: false,
            show: true,
            lv: false,
            rotate: 0,
            drawCircle: false,
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            accept: [
                'image/jpeg',
                'image/png',
                'image/webp'
            ]
        };
    }
    componentDidMount() {
        if (this.canvasRef.current) {
            this.canvasRef.current.width = window.innerWidth;
            this.canvasRef.current.height = window.innerHeight;
            this.ctx = this.canvasRef.current.getContext('2d');
        }
    }
    componentDidUpdate(preProps, preState) {
        const { rotate, scale, offsetX, offsetY } = this.state;
        if (preState.rotate !== rotate ||
            preState.scale !== scale ||
            preState.offsetX !== offsetX ||
            preState.offsetY !== offsetY ||
            preState.rotate !== rotate) {
            this.draw();
        }
    }
    render() {
        const { accept, show, waterFollow, lv } = this.state;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("canvas", { id: "canvas" }),
            React.createElement("canvas", { ref: this.canvasRef }),
            show && React.createElement("div", { className: "image-picker" },
                React.createElement("input", { type: "file", accept: accept.join(','), onChange: this.onPickFile })),
            !show && React.createElement("div", { style: { position: 'absolute', right: 0, top: 0 } },
                React.createElement("div", null,
                    "\u65CB\u8F6C",
                    React.createElement("input", { type: "range", max: 360, onChange: this.onRotate })),
                React.createElement("div", null,
                    "\u5E73\u79FBX",
                    React.createElement("input", { type: "range", max: window.innerWidth, onChange: (e) => {
                            this.onOffset(e, 'x');
                        } })),
                React.createElement("div", null,
                    "\u5E73\u79FBY",
                    React.createElement("input", { type: "range", max: window.innerHeight, onChange: (e) => {
                            this.onOffset(e, 'y');
                        } })),
                React.createElement("div", null,
                    "\u7F29\u653E",
                    React.createElement("input", { type: "range", max: 3, step: 0.1, onChange: this.onScale })),
                React.createElement("div", null,
                    React.createElement("button", { onClick: () => {
                            this.setState({
                                waterFollow: !waterFollow
                            }, this.draw);
                        } }, "\u6C34\u5370")),
                React.createElement("div", null,
                    React.createElement("button", { onClick: () => {
                            this.setState({
                                lv: !lv
                            }, this.draw);
                        } }, "\u6EE4\u955C")),
                React.createElement("div", null,
                    React.createElement("button", { onClick: () => {
                            this.setState({
                                drawCircle: true
                            }, this.draw);
                        } }, "\u5706\u5F62")))));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(48);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas-export-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}.canvas-export-container .image-picker{position:absolute}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const helper_1 = __webpack_require__(5);
const GIF = __webpack_require__(50);
__webpack_require__(51);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.area = React.createRef();
        this.animationCount = 0;
        this.minFont = 40;
        this.randomFont = 40;
        this.fallSpeed = 2;
        this.randomSpeed = 4;
        this.count = 0;
        this.maxFrame = 100;
        this.text = [
            '0101010101',
            'WSDASDW',
            'SADWD',
            '0101110011',
            '1111100001010',
            '10101',
            '0010',
            '11',
            'XCSW',
            'LYDXJ',
            'LHXSXS',
            'JWWDWDW',
            'XAZSX',
            'LUKKKK',
            '01001',
            '1110101',
            '010',
            '0001',
            '111',
            '01010101010111',
            '1100110011',
        ];
        this.animation = () => {
            cancelAnimationFrame(this.animationCount);
            this.draw();
            requestAnimationFrame(this.animation);
        };
        this.drawText = (size) => {
            const textStr = size.txt.split('');
            this.ctx.beginPath();
            this.ctx.font = size.font + 'px normal';
            this.ctx.moveTo(size.x, size.y);
            textStr.forEach((txt, index) => {
                this.ctx.fillStyle = `rgba(0,225,0,${(textStr.length - index) / textStr.length})`;
                this.ctx.fillText(txt, size.x, size.y - index * size.font);
            });
        };
        this.addFrame = () => {
            if (this.count > this.maxFrame || !this.gif) {
                return;
            }
            this.gif.addFrame(this.ctx.canvas, { copy: true, delay: 1 });
            if (this.count >= this.maxFrame) {
                this.gif.render();
            }
            this.count += 1;
        };
        this.draw = () => {
            const { valueOpt } = this.state;
            const copy = [...valueOpt];
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            if (this.header) {
                const { width, height } = this.header;
                this.ctx.drawImage(this.header, (window.innerWidth - width) / 2, (window.innerHeight - height) / 2, width, height);
            }
            copy.forEach(value => {
                const len = value.txt.split('').length * value.font;
                value.y = value.y + value.fallSpeed > window.innerHeight + len ? -Math.round(Math.random() * window.innerHeight / 2) : value.y + value.fallSpeed;
                this.drawText(value);
            });
            this.setState({
                valueOpt: copy
            });
            if (this.state.doGIF) {
                this.addFrame();
            }
        };
        this.onPickFile = (event) => {
            const files = event.target.files;
            if (files.length) {
                helper_1.ImageLoader.loader(files[0]).then((image) => {
                    this.header = image;
                }).catch((error) => {
                    console.log(error);
                });
            }
        };
        this.state = {
            accept: [
                'image/jpeg',
                'image/png',
                'image/webp'
            ],
            doGIF: false,
            valueOpt: this.text.map((txt) => {
                return {
                    txt,
                    font: Math.round(Math.random() * this.randomFont) + this.minFont,
                    y: -Math.round(Math.random() * window.innerHeight / 2),
                    x: Math.round(Math.random() * window.innerWidth),
                    fallSpeed: Math.round(Math.random() * this.randomSpeed) + this.fallSpeed,
                };
            }),
            value: this.text.join('\n'),
        };
    }
    componentDidMount() {
        if (this.canvasRef.current) {
            this.canvasRef.current.width = window.innerWidth;
            this.canvasRef.current.height = window.innerHeight;
            this.ctx = this.canvasRef.current.getContext('2d');
        }
        this.animation();
        this.gif = new GIF({
            workerScript: './gif.worker.js',
            workers: 2,
            quality: 10
        });
        this.gif.on('finished', function (blob) {
            window.open(URL.createObjectURL(blob));
        });
    }
    render() {
        const { value, accept } = this.state;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("canvas", { ref: this.canvasRef }),
            React.createElement("textarea", { style: { height: 'auto', position: 'absolute', right: 0, top: 0 }, rows: 10, ref: this.area, value: value, onChange: (e) => {
                    this.setState({
                        valueOpt: e.target.value.trim().split('\n').map((txt) => {
                            return {
                                txt,
                                font: Math.round(Math.random() * this.randomFont) + this.minFont,
                                y: -Math.round(Math.random() * window.innerHeight / 2),
                                x: Math.round(Math.random() * window.innerWidth),
                                fallSpeed: Math.round(Math.random() * this.randomSpeed) + this.fallSpeed,
                            };
                        }),
                        value: e.target.value,
                    }, this.draw);
                } }),
            React.createElement("button", { style: { position: 'absolute', right: 0, top: 160 }, onClick: () => {
                    this.setState({
                        doGIF: true
                    });
                } }, "gif"),
            !this.header && React.createElement("div", { className: "image-picker" },
                React.createElement("input", { type: "file", accept: accept.join(','), onChange: this.onPickFile }))));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(52);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas-export-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const react_router_dom_1 = __webpack_require__(9);
const Color_1 = __webpack_require__(54);
const AppRouter = (props) => {
    return (React.createElement(react_router_dom_1.Switch, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/svg/color", render: () => React.createElement(Color_1.default, null) })));
};
exports.default = AppRouter;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
__webpack_require__(55);
class CanvasExport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: `
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 1 0
      `,
            value: [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0,
            ]
        };
    }
    componentDidUpdate(preProps, preState) {
        const { matrix } = this.state;
        if (matrix !== preState.matrix) {
            const value = matrix.split(' ').filter(value => value.trim() !== '').map(o => Number(o));
            if (value.length === 20)
                this.setState({
                    value
                });
        }
    }
    render() {
        const { matrix, value } = this.state;
        return (React.createElement("div", { className: "canvas-export-container" },
            React.createElement("textarea", { rows: 10, cols: 20, value: matrix, onChange: e => {
                    this.setState({
                        matrix: e.target.value
                    });
                } }),
            React.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 150 120", preserveAspectRatio: "xMidYMid meet" },
                React.createElement("filter", { id: "colorMatrix" },
                    React.createElement("feColorMatrix", { in: "SourceGraphic", type: "matrix", values: value.join(' ') })),
                React.createElement("g", { filter: "" },
                    React.createElement("circle", { cx: "30", cy: "30", r: "20", fill: "red", "fill-opacity": "0.5" })),
                React.createElement("g", { filter: "url(#colorMatrix)" },
                    React.createElement("circle", { cx: "80", cy: "30", r: "20", fill: "red", "fill-opacity": "0.5" })))));
    }
}
exports.default = CanvasExport;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(56);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas-export-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:white;text-align:center;background-color:#282c34;height:100%}.canvas-export-container textarea{resize:none}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(58);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "html,body,#root{width:100%;height:100%}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })
/******/ ]);