(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-serializers", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-serializers"] = factory(require("babylonjs"));
	else
		root["SERIALIZERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/serializers/src/OBJ/index.ts":
/*!*************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ _objSerializer__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var _objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objSerializer */ "../../../dev/serializers/src/OBJ/objSerializer.ts");



/***/ }),

/***/ "../../../dev/serializers/src/OBJ/objSerializer.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/objSerializer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* binding */ OBJExport)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/material */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class for generating OBJ data from a Babylon scene.
 */
var OBJExport = /** @class */ (function () {
    function OBJExport() {
    }
    /**
     * Exports the geometry of a Mesh array in .OBJ file format (text)
     * @param meshes defines the list of meshes to serialize
     * @param materials defines if materials should be exported
     * @param matlibname defines the name of the associated mtl file
     * @param globalposition defines if the exported positions are globals or local to the exported mesh
     * @returns the OBJ content
     */
    OBJExport.OBJ = function (meshes, materials, matlibname, globalposition) {
        var _a, _b, _c;
        var output = [];
        var v = 1;
        // keep track of uv index in case mixed meshes are passed in
        var textureV = 1;
        if (materials) {
            if (!matlibname) {
                matlibname = "mat";
            }
            output.push("mtllib " + matlibname + ".mtl");
        }
        for (var j = 0; j < meshes.length; j++) {
            var mesh = meshes[j];
            var objectName = mesh.name || "mesh".concat(j, "}");
            output.push("o ".concat(objectName));
            //Uses the position of the item in the scene, to the file (this back to normal in the end)
            var inverseTransform = null;
            if (globalposition) {
                var transform = mesh.computeWorldMatrix(true);
                inverseTransform = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix();
                transform.invertToRef(inverseTransform);
                mesh.bakeTransformIntoVertices(transform);
            }
            //TODO: submeshes (groups)
            //TODO: smoothing groups (s 1, s off);
            if (materials) {
                var mat = mesh.material;
                if (mat) {
                    output.push("usemtl " + mat.id);
                }
            }
            var g = mesh.geometry;
            if (!g) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("No geometry is present on the mesh");
                continue;
            }
            var trunkVerts = g.getVerticesData("position");
            var trunkNormals = g.getVerticesData("normal");
            var trunkUV = g.getVerticesData("uv");
            var trunkFaces = g.getIndices();
            var currentV = 0;
            var currentTextureV = 0;
            if (!trunkVerts || !trunkFaces) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("There are no position vertices or indices on the mesh!");
                continue;
            }
            var useRightHandedSystem = meshes[0].getScene().useRightHandedSystem;
            var handednessSign = useRightHandedSystem ? 1 : -1;
            for (var i = 0; i < trunkVerts.length; i += 3) {
                output.push("v " + trunkVerts[i] * handednessSign + " " + trunkVerts[i + 1] + " " + trunkVerts[i + 2]);
                currentV++;
            }
            if (trunkNormals != null) {
                for (var i = 0; i < trunkNormals.length; i += 3) {
                    output.push("vn " + trunkNormals[i] * handednessSign + " " + trunkNormals[i + 1] + " " + trunkNormals[i + 2]);
                }
            }
            if (trunkUV != null) {
                for (var i = 0; i < trunkUV.length; i += 2) {
                    output.push("vt " + trunkUV[i] + " " + trunkUV[i + 1]);
                    currentTextureV++;
                }
            }
            var blanks = ["", "", ""];
            var sideOrientation = (_c = (_a = mesh.overrideMaterialSideOrientation) !== null && _a !== void 0 ? _a : (_b = mesh.material) === null || _b === void 0 ? void 0 : _b.sideOrientation) !== null && _c !== void 0 ? _c : mesh.getScene().defaultMaterial.sideOrientation;
            var _d = sideOrientation === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation ? [2, 1] : [1, 2], offset1 = _d[0], offset2 = _d[1];
            for (var i = 0; i < trunkFaces.length; i += 3) {
                var indices = [String(trunkFaces[i] + v), String(trunkFaces[i + offset1] + v), String(trunkFaces[i + offset2] + v)];
                var textureIndices = [String(trunkFaces[i] + textureV), String(trunkFaces[i + offset1] + textureV), String(trunkFaces[i + offset2] + textureV)];
                var facePositions = indices;
                var faceUVs = trunkUV != null ? textureIndices : blanks;
                var faceNormals = trunkNormals != null ? indices : blanks;
                output.push("f " +
                    facePositions[0] +
                    "/" +
                    faceUVs[0] +
                    "/" +
                    faceNormals[0] +
                    " " +
                    facePositions[1] +
                    "/" +
                    faceUVs[1] +
                    "/" +
                    faceNormals[1] +
                    " " +
                    facePositions[2] +
                    "/" +
                    faceUVs[2] +
                    "/" +
                    faceNormals[2]);
            }
            //back de previous matrix, to not change the original mesh in the scene
            if (globalposition && inverseTransform) {
                mesh.bakeTransformIntoVertices(inverseTransform);
            }
            v += currentV;
            textureV += currentTextureV;
        }
        var text = output.join("\n");
        return text;
    };
    /**
     * Exports the material(s) of a mesh in .MTL file format (text)
     * @param mesh defines the mesh to extract the material from
     * @returns the mtl content
     */
    //TODO: Export the materials of mesh array
    OBJExport.MTL = function (mesh) {
        var output = [];
        var m = mesh.material;
        output.push("newmtl mat1");
        output.push("  Ns " + m.specularPower.toFixed(4));
        output.push("  Ni 1.5000");
        output.push("  d " + m.alpha.toFixed(4));
        output.push("  Tr 0.0000");
        output.push("  Tf 1.0000 1.0000 1.0000");
        output.push("  illum 2");
        output.push("  Ka " + m.ambientColor.r.toFixed(4) + " " + m.ambientColor.g.toFixed(4) + " " + m.ambientColor.b.toFixed(4));
        output.push("  Kd " + m.diffuseColor.r.toFixed(4) + " " + m.diffuseColor.g.toFixed(4) + " " + m.diffuseColor.b.toFixed(4));
        output.push("  Ks " + m.specularColor.r.toFixed(4) + " " + m.specularColor.g.toFixed(4) + " " + m.specularColor.b.toFixed(4));
        output.push("  Ke " + m.emissiveColor.r.toFixed(4) + " " + m.emissiveColor.g.toFixed(4) + " " + m.emissiveColor.b.toFixed(4));
        //TODO: uv scale, offset, wrap
        //TODO: UV mirrored in Blender? second UV channel? lightMap? reflection textures?
        var uvscale = "";
        if (m.ambientTexture) {
            output.push("  map_Ka " + uvscale + m.ambientTexture.name);
        }
        if (m.diffuseTexture) {
            output.push("  map_Kd " + uvscale + m.diffuseTexture.name);
            //TODO: alpha testing, opacity in diffuse texture alpha channel (diffuseTexture.hasAlpha -> map_d)
        }
        if (m.specularTexture) {
            output.push("  map_Ks " + uvscale + m.specularTexture.name);
            /* TODO: glossiness = specular highlight component is in alpha channel of specularTexture. (???)
            if (m.useGlossinessFromSpecularMapAlpha)  {
                output.push("  map_Ns "+uvscale + m.specularTexture.name);
            }
            */
        }
        /* TODO: emissive texture not in .MAT format (???)
        if (m.emissiveTexture) {
            output.push("  map_d "+uvscale+m.emissiveTexture.name);
        }
        */
        if (m.bumpTexture) {
            output.push("  map_bump -imfchan z " + uvscale + m.bumpTexture.name);
        }
        if (m.opacityTexture) {
            output.push("  map_d " + uvscale + m.opacityTexture.name);
        }
        var text = output.join("\n");
        return text;
    };
    return OBJExport;
}());



/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts":
/*!*******************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-objSerializer.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/OBJ/index */ "../../../dev/serializers/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



/***/ }),

/***/ "babylonjs/Maths/math.vector":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/obj.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-objSerializer */ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpTZXJpYWxpemVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFJQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQTRMQTtBQTNMQTs7Ozs7OztBQU9BO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdk1BO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNkQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvT0JKL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvT0JKL29ialNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LW9ialNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi9zcmMvb2JqLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1zZXJpYWxpemVyc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLXNlcmlhbGl6ZXJzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTRVJJQUxJWkVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGhzX21hdGhfdmVjdG9yX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgKiBmcm9tIFwiLi9vYmpTZXJpYWxpemVyXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciBnZW5lcmF0aW5nIE9CSiBkYXRhIGZyb20gYSBCYWJ5bG9uIHNjZW5lLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9CSkV4cG9ydCB7XHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGdlb21ldHJ5IG9mIGEgTWVzaCBhcnJheSBpbiAuT0JKIGZpbGUgZm9ybWF0ICh0ZXh0KVxyXG4gICAgICogQHBhcmFtIG1lc2hlcyBkZWZpbmVzIHRoZSBsaXN0IG9mIG1lc2hlcyB0byBzZXJpYWxpemVcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHMgZGVmaW5lcyBpZiBtYXRlcmlhbHMgc2hvdWxkIGJlIGV4cG9ydGVkXHJcbiAgICAgKiBAcGFyYW0gbWF0bGlibmFtZSBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBhc3NvY2lhdGVkIG10bCBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZ2xvYmFscG9zaXRpb24gZGVmaW5lcyBpZiB0aGUgZXhwb3J0ZWQgcG9zaXRpb25zIGFyZSBnbG9iYWxzIG9yIGxvY2FsIHRvIHRoZSBleHBvcnRlZCBtZXNoXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgT0JKIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPQkoobWVzaGVzOiBNZXNoW10sIG1hdGVyaWFscz86IGJvb2xlYW4sIG1hdGxpYm5hbWU/OiBzdHJpbmcsIGdsb2JhbHBvc2l0aW9uPzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGxldCB2ID0gMTtcclxuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHV2IGluZGV4IGluIGNhc2UgbWl4ZWQgbWVzaGVzIGFyZSBwYXNzZWQgaW5cclxuICAgICAgICBsZXQgdGV4dHVyZVYgPSAxO1xyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgIGlmICghbWF0bGlibmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0bGlibmFtZSA9IFwibWF0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJtdGxsaWIgXCIgKyBtYXRsaWJuYW1lICsgXCIubXRsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lc2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbWVzaGVzW2pdO1xyXG4gICAgICAgICAgICBjb25zdCBvYmplY3ROYW1lID0gbWVzaC5uYW1lIHx8IGBtZXNoJHtqfX1gO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChgbyAke29iamVjdE5hbWV9YCk7XHJcblxyXG4gICAgICAgICAgICAvL1VzZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBzY2VuZSwgdG8gdGhlIGZpbGUgKHRoaXMgYmFjayB0byBub3JtYWwgaW4gdGhlIGVuZClcclxuICAgICAgICAgICAgbGV0IGludmVyc2VUcmFuc2Zvcm06IE51bGxhYmxlPE1hdHJpeD4gPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFscG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW52ZXJzZVRyYW5zZm9ybSA9IG5ldyBNYXRyaXgoKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5pbnZlcnRUb1JlZihpbnZlcnNlVHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNoLmJha2VUcmFuc2Zvcm1JbnRvVmVydGljZXModHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBzdWJtZXNoZXMgKGdyb3VwcylcclxuICAgICAgICAgICAgLy9UT0RPOiBzbW9vdGhpbmcgZ3JvdXBzIChzIDEsIHMgb2ZmKTtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbWVzaC5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ1c2VtdGwgXCIgKyBtYXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGc6IE51bGxhYmxlPEdlb21ldHJ5PiA9IG1lc2guZ2VvbWV0cnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWcpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJObyBnZW9tZXRyeSBpcyBwcmVzZW50IG9uIHRoZSBtZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rVmVydHMgPSBnLmdldFZlcnRpY2VzRGF0YShcInBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0cnVua05vcm1hbHMgPSBnLmdldFZlcnRpY2VzRGF0YShcIm5vcm1hbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgdHJ1bmtVViA9IGcuZ2V0VmVydGljZXNEYXRhKFwidXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rRmFjZXMgPSBnLmdldEluZGljZXMoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRWID0gMDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUZXh0dXJlViA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRydW5rVmVydHMgfHwgIXRydW5rRmFjZXMpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJUaGVyZSBhcmUgbm8gcG9zaXRpb24gdmVydGljZXMgb3IgaW5kaWNlcyBvbiB0aGUgbWVzaCFcIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlUmlnaHRIYW5kZWRTeXN0ZW0gPSBtZXNoZXNbMF0uZ2V0U2NlbmUoKS51c2VSaWdodEhhbmRlZFN5c3RlbTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGVkbmVzc1NpZ24gPSB1c2VSaWdodEhhbmRlZFN5c3RlbSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJ1bmtWZXJ0cy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2IFwiICsgdHJ1bmtWZXJ0c1tpXSAqIGhhbmRlZG5lc3NTaWduICsgXCIgXCIgKyB0cnVua1ZlcnRzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtWZXJ0c1tpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFYrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRydW5rTm9ybWFscyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRydW5rTm9ybWFscy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidm4gXCIgKyB0cnVua05vcm1hbHNbaV0gKiBoYW5kZWRuZXNzU2lnbiArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRydW5rVVYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua1VWLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2dCBcIiArIHRydW5rVVZbaV0gKyBcIiBcIiArIHRydW5rVVZbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZVYrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYmxhbmtzOiBzdHJpbmdbXSA9IFtcIlwiLCBcIlwiLCBcIlwiXTtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZU9yaWVudGF0aW9uID0gbWVzaC5vdmVycmlkZU1hdGVyaWFsU2lkZU9yaWVudGF0aW9uID8/IG1lc2gubWF0ZXJpYWw/LnNpZGVPcmllbnRhdGlvbiA/PyBtZXNoLmdldFNjZW5lKCkuZGVmYXVsdE1hdGVyaWFsLnNpZGVPcmllbnRhdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgW29mZnNldDEsIG9mZnNldDJdID0gc2lkZU9yaWVudGF0aW9uID09PSBNYXRlcmlhbC5DbG9ja1dpc2VTaWRlT3JpZW50YXRpb24gPyBbMiwgMV0gOiBbMSwgMl07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRydW5rRmFjZXMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSBbU3RyaW5nKHRydW5rRmFjZXNbaV0gKyB2KSwgU3RyaW5nKHRydW5rRmFjZXNbaSArIG9mZnNldDFdICsgdiksIFN0cmluZyh0cnVua0ZhY2VzW2kgKyBvZmZzZXQyXSArIHYpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVJbmRpY2VzID0gW1N0cmluZyh0cnVua0ZhY2VzW2ldICsgdGV4dHVyZVYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0MV0gKyB0ZXh0dXJlViksIFN0cmluZyh0cnVua0ZhY2VzW2kgKyBvZmZzZXQyXSArIHRleHR1cmVWKV07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZVBvc2l0aW9ucyA9IGluZGljZXM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNlVVZzID0gdHJ1bmtVViAhPSBudWxsID8gdGV4dHVyZUluZGljZXMgOiBibGFua3M7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNlTm9ybWFscyA9IHRydW5rTm9ybWFscyAhPSBudWxsID8gaW5kaWNlcyA6IGJsYW5rcztcclxuXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBcImYgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlUG9zaXRpb25zWzBdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlVVZzWzBdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsc1swXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVBvc2l0aW9uc1sxXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVVWc1sxXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZU5vcm1hbHNbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VQb3NpdGlvbnNbMl0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VVVnNbMl0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VOb3JtYWxzWzJdXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vYmFjayBkZSBwcmV2aW91cyBtYXRyaXgsIHRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIG1lc2ggaW4gdGhlIHNjZW5lXHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxwb3NpdGlvbiAmJiBpbnZlcnNlVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNoLmJha2VUcmFuc2Zvcm1JbnRvVmVydGljZXMoaW52ZXJzZVRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdiArPSBjdXJyZW50VjtcclxuICAgICAgICAgICAgdGV4dHVyZVYgKz0gY3VycmVudFRleHR1cmVWO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBvdXRwdXQuam9pbihcIlxcblwiKTtcclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIG1hdGVyaWFsKHMpIG9mIGEgbWVzaCBpbiAuTVRMIGZpbGUgZm9ybWF0ICh0ZXh0KVxyXG4gICAgICogQHBhcmFtIG1lc2ggZGVmaW5lcyB0aGUgbWVzaCB0byBleHRyYWN0IHRoZSBtYXRlcmlhbCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbXRsIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgLy9UT0RPOiBFeHBvcnQgdGhlIG1hdGVyaWFscyBvZiBtZXNoIGFycmF5XHJcbiAgICBwdWJsaWMgc3RhdGljIE1UTChtZXNoOiBNZXNoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBvdXRwdXQgPSBbXTtcclxuICAgICAgICBjb25zdCBtID0gPFN0YW5kYXJkTWF0ZXJpYWw+bWVzaC5tYXRlcmlhbDtcclxuICAgICAgICBvdXRwdXQucHVzaChcIm5ld210bCBtYXQxXCIpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBOcyBcIiArIG0uc3BlY3VsYXJQb3dlci50b0ZpeGVkKDQpKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgTmkgMS41MDAwXCIpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBkIFwiICsgbS5hbHBoYS50b0ZpeGVkKDQpKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgVHIgMC4wMDAwXCIpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBUZiAxLjAwMDAgMS4wMDAwIDEuMDAwMFwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgaWxsdW0gMlwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgS2EgXCIgKyBtLmFtYmllbnRDb2xvci5yLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uYW1iaWVudENvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5hbWJpZW50Q29sb3IuYi50b0ZpeGVkKDQpKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgS2QgXCIgKyBtLmRpZmZ1c2VDb2xvci5yLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uZGlmZnVzZUNvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5kaWZmdXNlQ29sb3IuYi50b0ZpeGVkKDQpKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgS3MgXCIgKyBtLnNwZWN1bGFyQ29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLnNwZWN1bGFyQ29sb3IuZy50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLnNwZWN1bGFyQ29sb3IuYi50b0ZpeGVkKDQpKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgS2UgXCIgKyBtLmVtaXNzaXZlQ29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmVtaXNzaXZlQ29sb3IuZy50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmVtaXNzaXZlQ29sb3IuYi50b0ZpeGVkKDQpKTtcclxuXHJcbiAgICAgICAgLy9UT0RPOiB1diBzY2FsZSwgb2Zmc2V0LCB3cmFwXHJcbiAgICAgICAgLy9UT0RPOiBVViBtaXJyb3JlZCBpbiBCbGVuZGVyPyBzZWNvbmQgVVYgY2hhbm5lbD8gbGlnaHRNYXA/IHJlZmxlY3Rpb24gdGV4dHVyZXM/XHJcbiAgICAgICAgY29uc3QgdXZzY2FsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmIChtLmFtYmllbnRUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfS2EgXCIgKyB1dnNjYWxlICsgbS5hbWJpZW50VGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtLmRpZmZ1c2VUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfS2QgXCIgKyB1dnNjYWxlICsgbS5kaWZmdXNlVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICAgICAgLy9UT0RPOiBhbHBoYSB0ZXN0aW5nLCBvcGFjaXR5IGluIGRpZmZ1c2UgdGV4dHVyZSBhbHBoYSBjaGFubmVsIChkaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSAtPiBtYXBfZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtLnNwZWN1bGFyVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX0tzIFwiICsgdXZzY2FsZSArIG0uc3BlY3VsYXJUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgICAgICAvKiBUT0RPOiBnbG9zc2luZXNzID0gc3BlY3VsYXIgaGlnaGxpZ2h0IGNvbXBvbmVudCBpcyBpbiBhbHBoYSBjaGFubmVsIG9mIHNwZWN1bGFyVGV4dHVyZS4gKD8/PylcclxuICAgICAgICAgICAgaWYgKG0udXNlR2xvc3NpbmVzc0Zyb21TcGVjdWxhck1hcEFscGhhKSAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9OcyBcIit1dnNjYWxlICsgbS5zcGVjdWxhclRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIFRPRE86IGVtaXNzaXZlIHRleHR1cmUgbm90IGluIC5NQVQgZm9ybWF0ICg/Pz8pXHJcbiAgICAgICAgaWYgKG0uZW1pc3NpdmVUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfZCBcIit1dnNjYWxlK20uZW1pc3NpdmVUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICBpZiAobS5idW1wVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX2J1bXAgLWltZmNoYW4geiBcIiArIHV2c2NhbGUgKyBtLmJ1bXBUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG0ub3BhY2l0eVRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9kIFwiICsgdXZzY2FsZSArIG0ub3BhY2l0eVRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0ZXh0ID0gb3V0cHV0LmpvaW4oXCJcXG5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgU2VyaWFsaXplcnMgZnJvbSBcInNlcmlhbGl6ZXJzL09CSi9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBzZXJpYWxpemVyIGluIFNlcmlhbGl6ZXJzKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW3NlcmlhbGl6ZXJdID0gKDxhbnk+U2VyaWFsaXplcnMpW3NlcmlhbGl6ZXJdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwic2VyaWFsaXplcnMvT0JKL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0aHNfbWF0aF92ZWN0b3JfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBzZXJpYWxpemVycyBmcm9tIFwiQGx0cy9zZXJpYWxpemVycy9sZWdhY3kvbGVnYWN5LW9ialNlcmlhbGl6ZXJcIjtcclxuZXhwb3J0IHsgc2VyaWFsaXplcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplcnM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==