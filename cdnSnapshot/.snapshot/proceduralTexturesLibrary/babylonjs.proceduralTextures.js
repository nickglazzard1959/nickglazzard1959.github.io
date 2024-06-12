(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-procedural-textures", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-procedural-textures"] = factory(require("babylonjs"));
	else
		root["PROCEDURALTEXTURES"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   brickProceduralTexturePixelShader: () => (/* binding */ brickProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "brickProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float numberOfBricksHeight;uniform float numberOfBricksWidth;uniform vec3 brickColor;uniform vec3 jointColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\nfloat roundF(float number){return sign(number)*floor(abs(number)+0.5);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void)\n{float brickW=1.0/numberOfBricksWidth;float brickH=1.0/numberOfBricksHeight;float jointWPercentage=0.01;float jointHPercentage=0.05;vec3 color=brickColor;float yi=vUV.y/brickH;float nyi=roundF(yi);float xi=vUV.x/brickW;if (mod(floor(yi),2.0)==0.0){xi=xi-0.5;}\nfloat nxi=roundF(xi);vec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/ brickW);if (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){color=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){color=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);}\nelse {float brickColorSwitch=mod(floor(yi)+floor(xi),3.0);if (brickColorSwitch==0.0)\ncolor=mix(color,vec3(0.33,0.33,0.33),0.3);else if (brickColorSwitch==2.0)\ncolor=mix(color,vec3(0.11,0.11,0.11),0.3);}\ngl_FragColor=vec4(color,1.0);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var brickProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* binding */ BrickProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _brickProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./brickProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.fragment.ts");







var BrickProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(BrickProceduralTexture, _super);
    function BrickProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "brickProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._numberOfBricksHeight = 15;
        _this._numberOfBricksWidth = 5;
        _this._jointColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.72, 0.72, 0.72);
        _this._brickColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.77, 0.47, 0.4);
        _this.updateShaderUniforms();
        return _this;
    }
    BrickProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("numberOfBricksHeight", this._numberOfBricksHeight);
        this.setFloat("numberOfBricksWidth", this._numberOfBricksWidth);
        this.setColor3("brickColor", this._brickColor);
        this.setColor3("jointColor", this._jointColor);
    };
    Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksHeight", {
        get: function () {
            return this._numberOfBricksHeight;
        },
        set: function (value) {
            this._numberOfBricksHeight = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksWidth", {
        get: function () {
            return this._numberOfBricksWidth;
        },
        set: function (value) {
            this._numberOfBricksWidth = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "jointColor", {
        get: function () {
            return this._jointColor;
        },
        set: function (value) {
            this._jointColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrickProceduralTexture.prototype, "brickColor", {
        get: function () {
            return this._brickColor;
        },
        set: function (value) {
            this._brickColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this brick procedural texture
     * @returns a serialized brick procedural texture object
     */
    BrickProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.BrickProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Brick Procedural Texture from parsed brick procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing brick procedural texture information
     * @returns a parsed Brick Procedural Texture
     */
    BrickProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new BrickProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], BrickProceduralTexture.prototype, "numberOfBricksHeight", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], BrickProceduralTexture.prototype, "numberOfBricksWidth", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], BrickProceduralTexture.prototype, "jointColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], BrickProceduralTexture.prototype, "brickColor", null);
    return BrickProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.BrickProceduralTexture", BrickProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/brick/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/brick/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ _brickProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture)
/* harmony export */ });
/* harmony import */ var _brickProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brickProceduralTexture */ "../../../dev/proceduralTextures/src/brick/brickProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloudProceduralTexturePixelShader: () => (/* binding */ cloudProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "cloudProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vUV;uniform vec4 skyColor;uniform vec4 cloudColor;uniform float amplitude;uniform int numOctaves;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,ampl=amplitude;\n#ifdef WEBGL2\nfor (int i=0; i<numOctaves; i++) {\n#else\nfor (int i=0; i<4; i++) {\n#endif\ntotal+=noise(n)*ampl;n+=n;ampl*=0.5;}\nreturn total;}\nvoid main() {vec2 p=vUV*12.0;vec4 c=mix(skyColor,cloudColor,fbm(p));gl_FragColor=c;}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var cloudProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudProceduralTexture: () => (/* binding */ CloudProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cloudProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloudProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.fragment.ts");







var CloudProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(CloudProceduralTexture, _super);
    function CloudProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "cloudProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._skyColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color4(0.15, 0.68, 1.0, 1.0);
        _this._cloudColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color4(1, 1, 1, 1.0);
        _this._amplitude = 1;
        _this._numOctaves = 4;
        _this.updateShaderUniforms();
        return _this;
    }
    CloudProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor4("skyColor", this._skyColor);
        this.setColor4("cloudColor", this._cloudColor);
        this.setFloat("amplitude", this._amplitude);
        this.setInt("numOctaves", this._numOctaves);
    };
    Object.defineProperty(CloudProceduralTexture.prototype, "skyColor", {
        get: function () {
            return this._skyColor;
        },
        set: function (value) {
            this._skyColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "cloudColor", {
        get: function () {
            return this._cloudColor;
        },
        set: function (value) {
            this._cloudColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (value) {
            this._amplitude = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudProceduralTexture.prototype, "numOctaves", {
        get: function () {
            return this._numOctaves;
        },
        set: function (value) {
            this._numOctaves = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this cloud procedural texture
     * @returns a serialized cloud procedural texture object
     */
    CloudProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.CloudProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Cloud Procedural Texture from parsed cloud procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing cloud procedural texture information
     * @returns a parsed Cloud Procedural Texture
     */
    CloudProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new CloudProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor4)()
    ], CloudProceduralTexture.prototype, "skyColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor4)()
    ], CloudProceduralTexture.prototype, "cloudColor", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], CloudProceduralTexture.prototype, "amplitude", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], CloudProceduralTexture.prototype, "numOctaves", null);
    return CloudProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.CloudProceduralTexture", CloudProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/cloud/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/cloud/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ _cloudProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.CloudProceduralTexture)
/* harmony export */ });
/* harmony import */ var _cloudProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cloudProceduralTexture */ "../../../dev/proceduralTextures/src/cloud/cloudProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fireProceduralTexturePixelShader: () => (/* binding */ fireProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "fireProceduralTexturePixelShader";
var shader = "precision highp float;uniform float time;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;uniform vec3 c4;uniform vec3 c5;uniform vec3 c6;uniform vec2 speed;uniform float shift;uniform float alphaThreshold;varying vec2 vUV;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\nvoid main() {vec2 p=vUV*8.0;float q=fbm(p-time*0.1);vec2 r=vec2(fbm(p+q+time*speed.x-p.x-p.y),fbm(p+q-time*speed.y));vec3 c=mix(c1,c2,fbm(p+r))+mix(c3,c4,r.x)-mix(c5,c6,r.y);vec3 color=c*cos(shift*vUV.y);float luminance=dot(color.rgb,vec3(0.3,0.59,0.11));gl_FragColor=vec4(color,luminance*alphaThreshold+(1.0-alphaThreshold));}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var fireProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FireProceduralTexture: () => (/* binding */ FireProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fireProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fireProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.fragment.ts");








var FireProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(FireProceduralTexture, _super);
    function FireProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "fireProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._time = 0.0;
        _this._speed = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector2(0.5, 0.3);
        _this._autoGenerateTime = true;
        _this._alphaThreshold = 0.5;
        _this._fireColors = FireProceduralTexture.RedFireColors;
        _this.updateShaderUniforms();
        return _this;
    }
    FireProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("time", this._time);
        this.setVector2("speed", this._speed);
        this.setColor3("c1", this._fireColors[0]);
        this.setColor3("c2", this._fireColors[1]);
        this.setColor3("c3", this._fireColors[2]);
        this.setColor3("c4", this._fireColors[3]);
        this.setColor3("c5", this._fireColors[4]);
        this.setColor3("c6", this._fireColors[5]);
        this.setFloat("alphaThreshold", this._alphaThreshold);
    };
    FireProceduralTexture.prototype.render = function (useCameraPostProcess) {
        var scene = this.getScene();
        if (this._autoGenerateTime && scene) {
            this._time += scene.getAnimationRatio() * 0.03;
            this.updateShaderUniforms();
        }
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    Object.defineProperty(FireProceduralTexture, "PurpleFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1.0, 0.9, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.1, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.9, 1.0)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "GreenFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.3, 0.4, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 1.0, 0.0)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "RedFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.5, 0.0, 0.1), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.0, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1.0, 0.9, 0.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.1, 0.1), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.9, 0.9)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture, "BlueFireColors", {
        get: function () {
            return [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.0, 0.5), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.0, 0.5), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.0, 0.2), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.0, 1.0), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.2, 0.3), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.0, 0.2, 0.9)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "autoGenerateTime", {
        get: function () {
            return this._autoGenerateTime;
        },
        set: function (value) {
            this._autoGenerateTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "fireColors", {
        get: function () {
            return this._fireColors;
        },
        set: function (value) {
            this._fireColors = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireProceduralTexture.prototype, "alphaThreshold", {
        get: function () {
            return this._alphaThreshold;
        },
        set: function (value) {
            this._alphaThreshold = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this fire procedural texture
     * @returns a serialized fire procedural texture object
     */
    FireProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.FireProceduralTexture";
        serializationObject.fireColors = [];
        for (var i = 0; i < this._fireColors.length; i++) {
            serializationObject.fireColors.push(this._fireColors[i].asArray());
        }
        return serializationObject;
    };
    /**
     * Creates a Fire Procedural Texture from parsed fire procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing fire procedural texture information
     * @returns a parsed Fire Procedural Texture
     */
    FireProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new FireProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        var colors = [];
        for (var i = 0; i < parsedTexture.fireColors.length; i++) {
            colors.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(parsedTexture.fireColors[i]));
        }
        texture.fireColors = colors;
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "autoGenerateTime", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "time", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsVector2)()
    ], FireProceduralTexture.prototype, "speed", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FireProceduralTexture.prototype, "alphaThreshold", null);
    return FireProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.FireProceduralTexture", FireProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/fire/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/fire/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ _fireProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.FireProceduralTexture)
/* harmony export */ });
/* harmony import */ var _fireProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fireProceduralTexture */ "../../../dev/proceduralTextures/src/fire/fireProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   grassProceduralTexturePixelShader: () => (/* binding */ grassProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "grassProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform vec3 herb1Color;uniform vec3 herb2Color;uniform vec3 herb3Color;uniform vec3 groundColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nvec3 color=mix(groundColor,herb1Color,rand(gl_FragCoord.xy*4.0));color=mix(color,herb2Color,rand(gl_FragCoord.xy*8.0));color=mix(color,herb3Color,rand(gl_FragCoord.xy));color=mix(color,herb1Color,fbm(gl_FragCoord.xy*16.0));gl_FragColor=vec4(color,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var grassProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrassProceduralTexture: () => (/* binding */ GrassProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grassProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grassProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.fragment.ts");







var GrassProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(GrassProceduralTexture, _super);
    function GrassProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "grassProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._groundColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 1, 1);
        _this._grassColors = [new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.29, 0.38, 0.02), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.36, 0.49, 0.09), new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.51, 0.6, 0.28)];
        _this.updateShaderUniforms();
        return _this;
    }
    GrassProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor3("herb1Color", this._grassColors[0]);
        this.setColor3("herb2Color", this._grassColors[1]);
        this.setColor3("herb3Color", this._grassColors[2]);
        this.setColor3("groundColor", this._groundColor);
    };
    Object.defineProperty(GrassProceduralTexture.prototype, "grassColors", {
        get: function () {
            return this._grassColors;
        },
        set: function (value) {
            this._grassColors = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GrassProceduralTexture.prototype, "groundColor", {
        get: function () {
            return this._groundColor;
        },
        set: function (value) {
            this._groundColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this grass procedural texture
     * @returns a serialized grass procedural texture object
     */
    GrassProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.GrassProceduralTexture";
        serializationObject.grassColors = [];
        for (var i = 0; i < this._grassColors.length; i++) {
            serializationObject.grassColors.push(this._grassColors[i].asArray());
        }
        return serializationObject;
    };
    /**
     * Creates a Grass Procedural Texture from parsed grass procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing grass procedural texture information
     * @returns a parsed Grass Procedural Texture
     */
    GrassProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new GrassProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        var colors = [];
        for (var i = 0; i < parsedTexture.grassColors.length; i++) {
            colors.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(parsedTexture.grassColors[i]));
        }
        texture.grassColors = colors;
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], GrassProceduralTexture.prototype, "groundColor", null);
    return GrassProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.GrassProceduralTexture", GrassProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/grass/index.ts":
/*!**********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/grass/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ _grassProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.GrassProceduralTexture)
/* harmony export */ });
/* harmony import */ var _grassProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grassProceduralTexture */ "../../../dev/proceduralTextures/src/grass/grassProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/index.ts":
/*!****************************************************!*\
  !*** ../../../dev/proceduralTextures/src/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ _brick_index__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture),
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ _cloud_index__WEBPACK_IMPORTED_MODULE_1__.CloudProceduralTexture),
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ _fire_index__WEBPACK_IMPORTED_MODULE_2__.FireProceduralTexture),
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ _grass_index__WEBPACK_IMPORTED_MODULE_3__.GrassProceduralTexture),
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ _marble_index__WEBPACK_IMPORTED_MODULE_4__.MarbleProceduralTexture),
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ _normalMap_index__WEBPACK_IMPORTED_MODULE_5__.NormalMapProceduralTexture),
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ _perlinNoise_index__WEBPACK_IMPORTED_MODULE_6__.PerlinNoiseProceduralTexture),
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ _road_index__WEBPACK_IMPORTED_MODULE_7__.RoadProceduralTexture),
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ _starfield_index__WEBPACK_IMPORTED_MODULE_8__.StarfieldProceduralTexture),
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ _wood_index__WEBPACK_IMPORTED_MODULE_9__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var _brick_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick/index */ "../../../dev/proceduralTextures/src/brick/index.ts");
/* harmony import */ var _cloud_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloud/index */ "../../../dev/proceduralTextures/src/cloud/index.ts");
/* harmony import */ var _fire_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fire/index */ "../../../dev/proceduralTextures/src/fire/index.ts");
/* harmony import */ var _grass_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grass/index */ "../../../dev/proceduralTextures/src/grass/index.ts");
/* harmony import */ var _marble_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./marble/index */ "../../../dev/proceduralTextures/src/marble/index.ts");
/* harmony import */ var _normalMap_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./normalMap/index */ "../../../dev/proceduralTextures/src/normalMap/index.ts");
/* harmony import */ var _perlinNoise_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./perlinNoise/index */ "../../../dev/proceduralTextures/src/perlinNoise/index.ts");
/* harmony import */ var _road_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./road/index */ "../../../dev/proceduralTextures/src/road/index.ts");
/* harmony import */ var _starfield_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./starfield/index */ "../../../dev/proceduralTextures/src/starfield/index.ts");
/* harmony import */ var _wood_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./wood/index */ "../../../dev/proceduralTextures/src/wood/index.ts");
/* eslint-disable import/no-internal-modules */












/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/index.ts":
/*!***********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ _marbleProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.MarbleProceduralTexture)
/* harmony export */ });
/* harmony import */ var _marbleProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./marbleProceduralTexture */ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts":
/*!**************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   marbleProceduralTexturePixelShader: () => (/* binding */ marbleProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "marbleProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float numberOfTilesHeight;uniform float numberOfTilesWidth;uniform float amplitude;uniform vec3 marbleColor;uniform vec3 jointColor;const vec3 tileSize=vec3(1.1,1.0,1.1);const vec3 tilePct=vec3(0.98,1.0,0.98);float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat turbulence(vec2 P)\n{float val=0.0;float freq=1.0;for (int i=0; i<4; i++)\n{val+=abs(noise(P*freq)/freq);freq*=2.07;}\nreturn val;}\nfloat roundF(float number){return sign(number)*floor(abs(number)+0.5);}\nvec3 marble_color(float x)\n{vec3 col;x=0.5*(x+1.);x=sqrt(x); \nx=sqrt(x);x=sqrt(x);col=vec3(.2+.75*x); \ncol.b*=0.95; \nreturn col;}\nvoid main()\n{float brickW=1.0/numberOfTilesWidth;float brickH=1.0/numberOfTilesHeight;float jointWPercentage=0.01;float jointHPercentage=0.01;vec3 color=marbleColor;float yi=vUV.y/brickH;float nyi=roundF(yi);float xi=vUV.x/brickW;if (mod(floor(yi),2.0)==0.0){xi=xi-0.5;}\nfloat nxi=roundF(xi);vec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);if (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){color=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){color=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);}\nelse {float t=6.28*brickvUV.x/(tileSize.x+noise(vec2(vUV)*6.0));t+=amplitude*turbulence(brickvUV.xy);t=sin(t);color=marble_color(t);}\ngl_FragColor=vec4(color,0.0);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var marbleProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarbleProceduralTexture: () => (/* binding */ MarbleProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _marbleProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./marbleProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/marble/marbleProceduralTexture.fragment.ts");







var MarbleProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(MarbleProceduralTexture, _super);
    function MarbleProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "marbleProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._numberOfTilesHeight = 3;
        _this._numberOfTilesWidth = 3;
        _this._amplitude = 9.0;
        _this._jointColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.72, 0.72, 0.72);
        _this.updateShaderUniforms();
        return _this;
    }
    MarbleProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("numberOfTilesHeight", this._numberOfTilesHeight);
        this.setFloat("numberOfTilesWidth", this._numberOfTilesWidth);
        this.setFloat("amplitude", this._amplitude);
        this.setColor3("jointColor", this._jointColor);
    };
    Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesHeight", {
        get: function () {
            return this._numberOfTilesHeight;
        },
        set: function (value) {
            this._numberOfTilesHeight = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (value) {
            this._amplitude = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesWidth", {
        get: function () {
            return this._numberOfTilesWidth;
        },
        set: function (value) {
            this._numberOfTilesWidth = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarbleProceduralTexture.prototype, "jointColor", {
        get: function () {
            return this._jointColor;
        },
        set: function (value) {
            this._jointColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this marble procedural texture
     * @returns a serialized marble procedural texture object
     */
    MarbleProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.MarbleProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Marble Procedural Texture from parsed marble procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing marble procedural texture information
     * @returns a parsed Marble Procedural Texture
     */
    MarbleProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new MarbleProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "numberOfTilesHeight", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "amplitude", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "numberOfTilesWidth", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], MarbleProceduralTexture.prototype, "jointColor", null);
    return MarbleProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.MarbleProceduralTexture", MarbleProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/index.ts":
/*!**************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ _normalMapProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.NormalMapProceduralTexture)
/* harmony export */ });
/* harmony import */ var _normalMapProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalMapProceduralTexture */ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts":
/*!********************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalMapProceduralTexturePixelShader: () => (/* binding */ normalMapProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "normalMapProceduralTexturePixelShader";
var shader = "precision highp float;uniform sampler2D baseSampler;uniform float size;varying vec2 vUV;const vec3 LUMA_COEFFICIENT=vec3(0.2126,0.7152,0.0722);float lumaAtCoord(vec2 coord)\n{vec3 pixel=texture2D(baseSampler,coord).rgb;float luma=dot(pixel,LUMA_COEFFICIENT);return luma;}\nvoid main()\n{float lumaU0=lumaAtCoord(vUV+vec2(-1.0, 0.0)/size);float lumaU1=lumaAtCoord(vUV+vec2( 1.0, 0.0)/size);float lumaV0=lumaAtCoord(vUV+vec2( 0.0,-1.0)/size);float lumaV1=lumaAtCoord(vUV+vec2( 0.0, 1.0)/size);vec2 slope=(vec2(lumaU0-lumaU1,lumaV0-lumaV1)+1.0)*0.5;gl_FragColor=vec4(slope,1.0,1.0);}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var normalMapProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NormalMapProceduralTexture: () => (/* binding */ NormalMapProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _normalMapProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalMapProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/normalMap/normalMapProceduralTexture.fragment.ts");






var NormalMapProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(NormalMapProceduralTexture, _super);
    function NormalMapProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "normalMapProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this.updateShaderUniforms();
        return _this;
    }
    NormalMapProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setTexture("baseSampler", this._baseTexture);
        this.setFloat("size", this.getRenderSize());
    };
    NormalMapProceduralTexture.prototype.render = function (useCameraPostProcess) {
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    NormalMapProceduralTexture.prototype.resize = function (size, generateMipMaps) {
        _super.prototype.resize.call(this, size, generateMipMaps);
        // We need to update the "size" uniform
        this.updateShaderUniforms();
    };
    NormalMapProceduralTexture.prototype.isReady = function () {
        if (!this._baseTexture || !this._baseTexture.isReady()) {
            return false;
        }
        return _super.prototype.isReady.call(this);
    };
    Object.defineProperty(NormalMapProceduralTexture.prototype, "baseTexture", {
        get: function () {
            return this._baseTexture;
        },
        set: function (texture) {
            this._baseTexture = texture;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this normal map procedural texture
     * @returns a serialized normal map procedural texture object
     */
    NormalMapProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.NormalMapProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Normal Map Procedural Texture from parsed normal map procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing normal map procedural texture information
     * @returns a parsed Normal Map Procedural Texture
     */
    NormalMapProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new NormalMapProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)()
    ], NormalMapProceduralTexture.prototype, "baseTexture", null);
    return NormalMapProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.NormalMapProceduralTexture", NormalMapProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/index.ts":
/*!****************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/index.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ _perlinNoiseProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.PerlinNoiseProceduralTexture)
/* harmony export */ });
/* harmony import */ var _perlinNoiseProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perlinNoiseProceduralTexture */ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts":
/*!************************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   perlinNoiseProceduralTexturePixelShader: () => (/* binding */ perlinNoiseProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "perlinNoiseProceduralTexturePixelShader";
var shader = "precision highp float;uniform float size;uniform float time;uniform float translationSpeed;varying vec2 vUV;float r(float n)\n{return fract(cos(n*89.42)*343.42);}\nvec2 r(vec2 n)\n{return vec2(r(n.x*23.62-300.0+n.y*34.35),r(n.x*45.13+256.0+n.y*38.89)); }\nfloat worley(vec2 n,float s)\n{float dis=1.0;for(int x=-1; x<=1; x++)\n{for(int y=-1; y<=1; y++)\n{vec2 p=floor(n/s)+vec2(x,y);float d=length(r(p)+vec2(x,y)-fract(n/s));if (dis>d)\ndis=d;}}\nreturn 1.0-dis;}\nvec3 hash33(vec3 p3)\n{p3=fract(p3*vec3(0.1031,0.11369,0.13787));p3+=dot(p3,p3.yxz+19.19);return -1.0+2.0*fract(vec3((p3.x+p3.y)*p3.z,(p3.x+p3.z)*p3.y,(p3.y+p3.z)*p3.x));}\nfloat perlinNoise(vec3 p)\n{vec3 pi=floor(p);vec3 pf=p-pi;vec3 w=pf*pf*(3.0-2.0*pf);return mix(\nmix(\nmix(\ndot(pf-vec3(0,0,0),hash33(pi+vec3(0,0,0))),\ndot(pf-vec3(1,0,0),hash33(pi+vec3(1,0,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,0,1),hash33(pi+vec3(0,0,1))),\ndot(pf-vec3(1,0,1),hash33(pi+vec3(1,0,1))),\nw.x\n),\nw.z\n),\nmix(\nmix(\ndot(pf-vec3(0,1,0),hash33(pi+vec3(0,1,0))),\ndot(pf-vec3(1,1,0),hash33(pi+vec3(1,1,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,1,1),hash33(pi+vec3(0,1,1))),\ndot(pf-vec3(1,1,1),hash33(pi+vec3(1,1,1))),\nw.x\n),\nw.z\n),\nw.y\n);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void)\n{vec2 uv=gl_FragCoord.xy+translationSpeed;float dis=(\n1.0+perlinNoise(vec3(uv/vec2(size,size),time*0.05)*8.0))\n* (1.0+(worley(uv,32.0)+ 0.5*worley(2.0*uv,32.0)+0.25*worley(4.0*uv,32.0))\n);gl_FragColor=vec4(vec3(dis/4.0),1.0);}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var perlinNoiseProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts":
/*!***************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* binding */ PerlinNoiseProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _perlinNoiseProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perlinNoiseProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/perlinNoise/perlinNoiseProceduralTexture.fragment.ts");






var PerlinNoiseProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(PerlinNoiseProceduralTexture, _super);
    function PerlinNoiseProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "perlinNoiseProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this.time = 0.0;
        _this.timeScale = 1.0;
        _this.translationSpeed = 1.0;
        _this._currentTranslation = 0;
        _this.updateShaderUniforms();
        return _this;
    }
    PerlinNoiseProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("size", this.getRenderSize());
        var scene = this.getScene();
        if (!scene) {
            return;
        }
        var deltaTime = scene.getEngine().getDeltaTime();
        this.time += deltaTime;
        this.setFloat("time", (this.time * this.timeScale) / 1000);
        this._currentTranslation += (deltaTime * this.translationSpeed) / 1000.0;
        this.setFloat("translationSpeed", this._currentTranslation);
    };
    PerlinNoiseProceduralTexture.prototype.render = function (useCameraPostProcess) {
        this.updateShaderUniforms();
        _super.prototype.render.call(this, useCameraPostProcess);
    };
    PerlinNoiseProceduralTexture.prototype.resize = function (size, generateMipMaps) {
        _super.prototype.resize.call(this, size, generateMipMaps);
    };
    /**
     * Serializes this perlin noise procedural texture
     * @returns a serialized perlin noise procedural texture object
     */
    PerlinNoiseProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.PerlinNoiseProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Perlin Noise Procedural Texture from parsed perlin noise procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing perlin noise procedural texture information
     * @returns a parsed Perlin Noise Procedural Texture
     */
    PerlinNoiseProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new PerlinNoiseProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "time", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "timeScale", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], PerlinNoiseProceduralTexture.prototype, "translationSpeed", void 0);
    return PerlinNoiseProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.PerlinNoiseProceduralTexture", PerlinNoiseProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ _roadProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.RoadProceduralTexture)
/* harmony export */ });
/* harmony import */ var _roadProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roadProceduralTexture */ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   roadProceduralTexturePixelShader: () => (/* binding */ roadProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "roadProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vUV; \nuniform vec3 roadColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat ratioy=mod(gl_FragCoord.y*100.0 ,fbm(vUV*2.0));vec3 color=roadColor*ratioy;gl_FragColor=vec4(color,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var roadProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/road/roadProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoadProceduralTexture: () => (/* binding */ RoadProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _roadProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roadProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/road/roadProceduralTexture.fragment.ts");







var RoadProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(RoadProceduralTexture, _super);
    function RoadProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "roadProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._roadColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.53, 0.53, 0.53);
        _this.updateShaderUniforms();
        return _this;
    }
    RoadProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setColor3("roadColor", this._roadColor);
    };
    Object.defineProperty(RoadProceduralTexture.prototype, "roadColor", {
        get: function () {
            return this._roadColor;
        },
        set: function (value) {
            this._roadColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this road procedural texture
     * @returns a serialized road procedural texture object
     */
    RoadProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.RoadProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Road Procedural Texture from parsed road procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing road procedural texture information
     * @returns a parsed Road Procedural Texture
     */
    RoadProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new RoadProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], RoadProceduralTexture.prototype, "roadColor", null);
    return RoadProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.RoadProceduralTexture", RoadProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/index.ts":
/*!**************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ _starfieldProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.StarfieldProceduralTexture)
/* harmony export */ });
/* harmony import */ var _starfieldProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./starfieldProceduralTexture */ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts":
/*!********************************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   starfieldProceduralTexturePixelShader: () => (/* binding */ starfieldProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "starfieldProceduralTexturePixelShader";
var shader = "precision highp float;\n#define volsteps 20\n#define iterations 15\nvarying vec2 vPosition;varying vec2 vUV;uniform float time;uniform float alpha;uniform float beta;uniform float zoom;uniform float formuparam;uniform float stepsize;uniform float tile;uniform float brightness;uniform float darkmatter;uniform float distfading;uniform float saturation;void main()\n{vec3 dir=vec3(vUV*zoom,1.);float localTime=time*0.0001;mat2 rot1=mat2(cos(alpha),sin(alpha),-sin(alpha),cos(alpha));mat2 rot2=mat2(cos(beta),sin(beta),-sin(beta),cos(beta));dir.xz*=rot1;dir.xy*=rot2;vec3 from_=vec3(1.,.5,0.5);from_+=vec3(-2.,localTime*2.,localTime);from_.xz*=rot1;from_.xy*=rot2;float s=0.1,fade=1.;vec3 v=vec3(0.);for (int r=0; r<volsteps; r++) {vec3 p=from_+s*dir*.5;p=abs(vec3(tile)-mod(p,vec3(tile*2.))); \nfloat pa,a=pa=0.;for (int i=0; i<iterations; i++) {p=abs(p)/dot(p,p)-formuparam; \na+=abs(length(p)-pa); \npa=length(p);}\nfloat dm=max(0.,darkmatter-a*a*.001); \na*=a*a; \nif (r>6) fade*=1.-dm; \nv+=fade;v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; \nfade*=distfading; \ns+=stepsize;}\nv=mix(vec3(length(v)),v,saturation); \ngl_FragColor=vec4(v*.01,1.);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var starfieldProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StarfieldProceduralTexture: () => (/* binding */ StarfieldProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _starfieldProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./starfieldProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/starfield/starfieldProceduralTexture.fragment.ts");






var StarfieldProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(StarfieldProceduralTexture, _super);
    function StarfieldProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "starfieldProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._time = 1;
        _this._alpha = 0.5;
        _this._beta = 0.8;
        _this._zoom = 0.8;
        _this._formuparam = 0.53;
        _this._stepsize = 0.1;
        _this._tile = 0.85;
        _this._brightness = 0.0015;
        _this._darkmatter = 0.4;
        _this._distfading = 0.73;
        _this._saturation = 0.85;
        _this.updateShaderUniforms();
        return _this;
    }
    StarfieldProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("time", this._time);
        this.setFloat("alpha", this._alpha);
        this.setFloat("beta", this._beta);
        this.setFloat("zoom", this._zoom);
        this.setFloat("formuparam", this._formuparam);
        this.setFloat("stepsize", this._stepsize);
        this.setFloat("tile", this._tile);
        this.setFloat("brightness", this._brightness);
        this.setFloat("darkmatter", this._darkmatter);
        this.setFloat("distfading", this._distfading);
        this.setFloat("saturation", this._saturation);
    };
    Object.defineProperty(StarfieldProceduralTexture.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this._alpha = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "beta", {
        get: function () {
            return this._beta;
        },
        set: function (value) {
            this._beta = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "formuparam", {
        get: function () {
            return this._formuparam;
        },
        set: function (value) {
            this._formuparam = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "stepsize", {
        get: function () {
            return this._stepsize;
        },
        set: function (value) {
            this._stepsize = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (value) {
            this._zoom = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "tile", {
        get: function () {
            return this._tile;
        },
        set: function (value) {
            this._tile = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "brightness", {
        get: function () {
            return this._brightness;
        },
        set: function (value) {
            this._brightness = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "darkmatter", {
        get: function () {
            return this._darkmatter;
        },
        set: function (value) {
            this._darkmatter = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "distfading", {
        get: function () {
            return this._distfading;
        },
        set: function (value) {
            this._distfading = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StarfieldProceduralTexture.prototype, "saturation", {
        get: function () {
            return this._saturation;
        },
        set: function (value) {
            this._saturation = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this starfield procedural texture
     * @returns a serialized starfield procedural texture object
     */
    StarfieldProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.StarfieldProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Starfield Procedural Texture from parsed startfield procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing startfield procedural texture information
     * @returns a parsed Starfield Procedural Texture
     */
    StarfieldProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new StarfieldProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "time", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "alpha", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "beta", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "formuparam", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "stepsize", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "zoom", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "tile", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "brightness", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "darkmatter", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "distfading", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], StarfieldProceduralTexture.prototype, "saturation", null);
    return StarfieldProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.StarfieldProceduralTexture", StarfieldProceduralTexture);


/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/index.ts":
/*!*********************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ _woodProceduralTexture__WEBPACK_IMPORTED_MODULE_0__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var _woodProceduralTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./woodProceduralTexture */ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts");



/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   woodProceduralTexturePixelShader: () => (/* binding */ woodProceduralTexturePixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "woodProceduralTexturePixelShader";
var shader = "precision highp float;varying vec2 vPosition;varying vec2 vUV;uniform float ampScale;uniform vec3 woodColor;float rand(vec2 n) {return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n) {const vec2 d=vec2(0.0,1.0);vec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n) {float total=0.0,amplitude=1.0;for (int i=0; i<4; i++) {total+=noise(n)*amplitude;n+=n;amplitude*=0.5;}\nreturn total;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat ratioy=mod(vUV.x*ampScale,2.0+fbm(vUV*0.8));vec3 wood=woodColor*ratioy;gl_FragColor=vec4(wood,1.0);\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var woodProceduralTexturePixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/proceduralTextures/src/wood/woodProceduralTexture.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WoodProceduralTexture: () => (/* binding */ WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/typeStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _woodProceduralTexture_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./woodProceduralTexture.fragment */ "../../../dev/proceduralTextures/src/wood/woodProceduralTexture.fragment.ts");







var WoodProceduralTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(WoodProceduralTexture, _super);
    function WoodProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, size, "woodProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
        _this._ampScale = 100.0;
        _this._woodColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.32, 0.17, 0.09);
        _this.updateShaderUniforms();
        return _this;
    }
    WoodProceduralTexture.prototype.updateShaderUniforms = function () {
        this.setFloat("ampScale", this._ampScale);
        this.setColor3("woodColor", this._woodColor);
    };
    Object.defineProperty(WoodProceduralTexture.prototype, "ampScale", {
        get: function () {
            return this._ampScale;
        },
        set: function (value) {
            this._ampScale = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WoodProceduralTexture.prototype, "woodColor", {
        get: function () {
            return this._woodColor;
        },
        set: function (value) {
            this._woodColor = value;
            this.updateShaderUniforms();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serializes this wood procedural texture
     * @returns a serialized wood procedural texture object
     */
    WoodProceduralTexture.prototype.serialize = function () {
        var serializationObject = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Serialize(this, _super.prototype.serialize.call(this));
        serializationObject.customType = "BABYLON.WoodProceduralTexture";
        return serializationObject;
    };
    /**
     * Creates a Wood Procedural Texture from parsed wood procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing wood procedural texture information
     * @returns a parsed Wood Procedural Texture
     */
    WoodProceduralTexture.Parse = function (parsedTexture, scene, rootUrl) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new WoodProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps); }, parsedTexture, scene, rootUrl);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], WoodProceduralTexture.prototype, "ampScale", null);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], WoodProceduralTexture.prototype, "woodColor", null);
    return WoodProceduralTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.ProceduralTexture));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.WoodProceduralTexture", WoodProceduralTexture);


/***/ }),

/***/ "../../../lts/proceduralTextures/src/legacy/legacy.ts":
/*!************************************************************!*\
  !*** ../../../lts/proceduralTextures/src/legacy/legacy.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrickProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.BrickProceduralTexture),
/* harmony export */   CloudProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.CloudProceduralTexture),
/* harmony export */   FireProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.FireProceduralTexture),
/* harmony export */   GrassProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.GrassProceduralTexture),
/* harmony export */   MarbleProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.MarbleProceduralTexture),
/* harmony export */   NormalMapProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.NormalMapProceduralTexture),
/* harmony export */   PerlinNoiseProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.PerlinNoiseProceduralTexture),
/* harmony export */   RoadProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.RoadProceduralTexture),
/* harmony export */   StarfieldProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.StarfieldProceduralTexture),
/* harmony export */   WoodProceduralTexture: () => (/* reexport safe */ procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__.WoodProceduralTexture)
/* harmony export */ });
/* harmony import */ var procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! procedural-textures/index */ "../../../dev/proceduralTextures/src/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * Legacy support, defining window.BABYLON.GridMaterial... (global variable).
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var mat in procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[mat] = procedural_textures_index__WEBPACK_IMPORTED_MODULE_0__[mat];
    }
}



/***/ }),

/***/ "babylonjs/Misc/decorators":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   proceduralTextures: () => (/* reexport module object */ _lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/procedural-textures/legacy/legacy */ "../../../lts/proceduralTextures/src/legacy/legacy.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_procedural_textures_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLnByb2NlZHVyYWxUZXh0dXJlcy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQWxFQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFHQTtBQUVBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFsRUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBbUNBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU9BO0FBQUE7QUFBQTtBQU5BO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUpBO0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUF0RkE7QUFEQTtBQUdBO0FBZ0JBO0FBREE7QUFHQTtBQVFBO0FBREE7QUFHQTtBQVFBO0FBREE7QUFHQTtBQStDQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFoREE7QUFEQTtBQUdBO0FBK0NBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNGQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7QUFDQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBRUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQWxFQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBT0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBcENBO0FBREE7QUFHQTtBQW1DQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFpREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUFBO0FBWUE7QUFBQTtBQUFBO0FBVkE7QUFHQTtBQUdBO0FBRUE7QUFJQTs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBcEVBO0FBREE7QUFDQTtBQUdBO0FBREE7QUFDQTtBQUdBO0FBREE7QUFDQTtBQStEQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUZBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQXBDQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOURBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQWFBO0FBQUE7QUFBQTtBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFMQTtBQU9BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQXhJQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFRQTtBQURBO0FBR0E7QUFtQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckxBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBSUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUE5Q0E7QUFEQTtBQUdBO0FBUUE7QUFEQTtBQUdBO0FBbUNBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvYnJpY2svYnJpY2tQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvYnJpY2svYnJpY2tQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvYnJpY2svaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2Nsb3VkL2Nsb3VkUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2Nsb3VkL2Nsb3VkUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2Nsb3VkL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9maXJlL2ZpcmVQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvZmlyZS9maXJlUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2ZpcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2dyYXNzL2dyYXNzUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2dyYXNzL2dyYXNzUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL2dyYXNzL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvbWFyYmxlL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9tYXJibGUvbWFyYmxlUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL21hcmJsZS9tYXJibGVQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvbm9ybWFsTWFwL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9ub3JtYWxNYXAvbm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL25vcm1hbE1hcC9ub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvcGVybGluTm9pc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3Blcmxpbk5vaXNlL3Blcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3Blcmxpbk5vaXNlL3Blcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3JvYWQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3JvYWQvcm9hZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9yb2FkL3JvYWRQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvc3RhcmZpZWxkL2luZGV4LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9kZXYvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9zdGFyZmllbGQvc3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3N0YXJmaWVsZC9zdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZS50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvd29vZC9pbmRleC50cyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvLi4vLi4vLi4vZGV2L3Byb2NlZHVyYWxUZXh0dXJlcy9zcmMvd29vZC93b29kUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4uLy4uLy4uL2Rldi9wcm9jZWR1cmFsVGV4dHVyZXMvc3JjL3dvb2Qvd29vZFByb2NlZHVyYWxUZXh0dXJlLnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi9sdHMvcHJvY2VkdXJhbFRleHR1cmVzL3NyYy9sZWdhY3kvbGVnYWN5LnRzIiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly9QUk9DRURVUkFMVEVYVFVSRVMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BST0NFRFVSQUxURVhUVVJFUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUFJPQ0VEVVJBTFRFWFRVUkVTLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1wcm9jZWR1cmFsLXRleHR1cmVzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtcHJvY2VkdXJhbC10ZXh0dXJlc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUFJPQ0VEVVJBTFRFWFRVUkVTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY19kZWNvcmF0b3JzX18pID0+IHtcbnJldHVybiAiLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJicmlja1Byb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZQb3NpdGlvbjt2YXJ5aW5nIHZlYzIgdlVWO3VuaWZvcm0gZmxvYXQgbnVtYmVyT2ZCcmlja3NIZWlnaHQ7dW5pZm9ybSBmbG9hdCBudW1iZXJPZkJyaWNrc1dpZHRoO3VuaWZvcm0gdmVjMyBicmlja0NvbG9yO3VuaWZvcm0gdmVjMyBqb2ludENvbG9yO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgZmJtKHZlYzIgbikge2Zsb2F0IHRvdGFsPTAuMCxhbXBsaXR1ZGU9MS4wO2ZvciAoaW50IGk9MDsgaTw0OyBpKyspIHt0b3RhbCs9bm9pc2UobikqYW1wbGl0dWRlO24rPW47YW1wbGl0dWRlKj0wLjU7fVxucmV0dXJuIHRvdGFsO31cbmZsb2F0IHJvdW5kRihmbG9hdCBudW1iZXIpe3JldHVybiBzaWduKG51bWJlcikqZmxvb3IoYWJzKG51bWJlcikrMC41KTt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpXG57ZmxvYXQgYnJpY2tXPTEuMC9udW1iZXJPZkJyaWNrc1dpZHRoO2Zsb2F0IGJyaWNrSD0xLjAvbnVtYmVyT2ZCcmlja3NIZWlnaHQ7ZmxvYXQgam9pbnRXUGVyY2VudGFnZT0wLjAxO2Zsb2F0IGpvaW50SFBlcmNlbnRhZ2U9MC4wNTt2ZWMzIGNvbG9yPWJyaWNrQ29sb3I7ZmxvYXQgeWk9dlVWLnkvYnJpY2tIO2Zsb2F0IG55aT1yb3VuZEYoeWkpO2Zsb2F0IHhpPXZVVi54L2JyaWNrVztpZiAobW9kKGZsb29yKHlpKSwyLjApPT0wLjApe3hpPXhpLTAuNTt9XG5mbG9hdCBueGk9cm91bmRGKHhpKTt2ZWMyIGJyaWNrdlVWPXZlYzIoKHhpLWZsb29yKHhpKSkvYnJpY2tILCh5aS1mbG9vcih5aSkpLyBicmlja1cpO2lmICh5aTxueWkram9pbnRIUGVyY2VudGFnZSAmJiB5aT5ueWktam9pbnRIUGVyY2VudGFnZSl7Y29sb3I9bWl4KGpvaW50Q29sb3IsdmVjMygwLjM3LDAuMjUsMC4yNSksKHlpLW55aSkvam9pbnRIUGVyY2VudGFnZSswLjIpO31cbmVsc2UgaWYgKHhpPG54aStqb2ludFdQZXJjZW50YWdlICYmIHhpPm54aS1qb2ludFdQZXJjZW50YWdlKXtjb2xvcj1taXgoam9pbnRDb2xvcix2ZWMzKDAuNDQsMC40NCwwLjQ0KSwoeGktbnhpKS9qb2ludFdQZXJjZW50YWdlKzAuMik7fVxuZWxzZSB7ZmxvYXQgYnJpY2tDb2xvclN3aXRjaD1tb2QoZmxvb3IoeWkpK2Zsb29yKHhpKSwzLjApO2lmIChicmlja0NvbG9yU3dpdGNoPT0wLjApXG5jb2xvcj1taXgoY29sb3IsdmVjMygwLjMzLDAuMzMsMC4zMyksMC4zKTtlbHNlIGlmIChicmlja0NvbG9yU3dpdGNoPT0yLjApXG5jb2xvcj1taXgoY29sb3IsdmVjMygwLjExLDAuMTEsMC4xMSksMC4zKTt9XG5nbF9GcmFnQ29sb3I9dmVjNChjb2xvciwxLjApO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGJyaWNrUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemUsIHNlcmlhbGl6ZUFzQ29sb3IzIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgXCIuL2JyaWNrUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCcmlja1Byb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZCcmlja3NIZWlnaHQ6IG51bWJlciA9IDE1O1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZCcmlja3NXaWR0aDogbnVtYmVyID0gNTtcclxuICAgIHByaXZhdGUgX2pvaW50Q29sb3IgPSBuZXcgQ29sb3IzKDAuNzIsIDAuNzIsIDAuNzIpO1xyXG4gICAgcHJpdmF0ZSBfYnJpY2tDb2xvciA9IG5ldyBDb2xvcjMoMC43NywgMC40NywgMC40KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcImJyaWNrUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJudW1iZXJPZkJyaWNrc0hlaWdodFwiLCB0aGlzLl9udW1iZXJPZkJyaWNrc0hlaWdodCk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcIm51bWJlck9mQnJpY2tzV2lkdGhcIiwgdGhpcy5fbnVtYmVyT2ZCcmlja3NXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJicmlja0NvbG9yXCIsIHRoaXMuX2JyaWNrQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiam9pbnRDb2xvclwiLCB0aGlzLl9qb2ludENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgbnVtYmVyT2ZCcmlja3NIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCcmlja3NIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBudW1iZXJPZkJyaWNrc0hlaWdodCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZCcmlja3NIZWlnaHQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IG51bWJlck9mQnJpY2tzV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCcmlja3NXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IG51bWJlck9mQnJpY2tzV2lkdGgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mQnJpY2tzV2lkdGggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBnZXQgam9pbnRDb2xvcigpOiBDb2xvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9qb2ludENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgam9pbnRDb2xvcih2YWx1ZTogQ29sb3IzKSB7XHJcbiAgICAgICAgdGhpcy5fam9pbnRDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGdldCBicmlja0NvbG9yKCk6IENvbG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JyaWNrQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBicmlja0NvbG9yKHZhbHVlOiBDb2xvcjMpIHtcclxuICAgICAgICB0aGlzLl9icmlja0NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIGJyaWNrIHByb2NlZHVyYWwgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgYSBzZXJpYWxpemVkIGJyaWNrIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLkJyaWNrUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQnJpY2sgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIGJyaWNrIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIGJyaWNrIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgQnJpY2sgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IEJyaWNrUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgQnJpY2tQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLkJyaWNrUHJvY2VkdXJhbFRleHR1cmVcIiwgQnJpY2tQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2JyaWNrUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwiY2xvdWRQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O3ZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSB2ZWM0IHNreUNvbG9yO3VuaWZvcm0gdmVjNCBjbG91ZENvbG9yO3VuaWZvcm0gZmxvYXQgYW1wbGl0dWRlO3VuaWZvcm0gaW50IG51bU9jdGF2ZXM7ZmxvYXQgcmFuZCh2ZWMyIG4pIHtyZXR1cm4gZnJhY3QoY29zKGRvdChuLHZlYzIoMTIuOTg5OCw0LjE0MTQpKSkqNDM3NTguNTQ1Myk7fVxuZmxvYXQgbm9pc2UodmVjMiBuKSB7Y29uc3QgdmVjMiBkPXZlYzIoMC4wLDEuMCk7dmVjMiBiPWZsb29yKG4pLGY9c21vb3Roc3RlcCh2ZWMyKDAuMCksdmVjMigxLjApLGZyYWN0KG4pKTtyZXR1cm4gbWl4KG1peChyYW5kKGIpLHJhbmQoYitkLnl4KSxmLngpLG1peChyYW5kKGIrZC54eSkscmFuZChiK2QueXkpLGYueCksZi55KTt9XG5mbG9hdCBmYm0odmVjMiBuKSB7ZmxvYXQgdG90YWw9MC4wLGFtcGw9YW1wbGl0dWRlO1xuI2lmZGVmIFdFQkdMMlxuZm9yIChpbnQgaT0wOyBpPG51bU9jdGF2ZXM7IGkrKykge1xuI2Vsc2VcbmZvciAoaW50IGk9MDsgaTw0OyBpKyspIHtcbiNlbmRpZlxudG90YWwrPW5vaXNlKG4pKmFtcGw7bis9bjthbXBsKj0wLjU7fVxucmV0dXJuIHRvdGFsO31cbnZvaWQgbWFpbigpIHt2ZWMyIHA9dlVWKjEyLjA7dmVjNCBjPW1peChza3lDb2xvcixjbG91ZENvbG9yLGZibShwKSk7Z2xfRnJhZ0NvbG9yPWM7fVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBjbG91ZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplLCBzZXJpYWxpemVBc0NvbG9yNCB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3I0IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuaW1wb3J0IFwiLi9jbG91ZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xvdWRQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX3NreUNvbG9yID0gbmV3IENvbG9yNCgwLjE1LCAwLjY4LCAxLjAsIDEuMCk7XHJcbiAgICBwcml2YXRlIF9jbG91ZENvbG9yID0gbmV3IENvbG9yNCgxLCAxLCAxLCAxLjApO1xyXG4gICAgcHJpdmF0ZSBfYW1wbGl0dWRlID0gMTtcclxuICAgIHByaXZhdGUgX251bU9jdGF2ZXMgPSA0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCwgZmFsbGJhY2tUZXh0dXJlPzogVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNpemUsIFwiY2xvdWRQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjQoXCJza3lDb2xvclwiLCB0aGlzLl9za3lDb2xvcik7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjQoXCJjbG91ZENvbG9yXCIsIHRoaXMuX2Nsb3VkQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJhbXBsaXR1ZGVcIiwgdGhpcy5fYW1wbGl0dWRlKTtcclxuICAgICAgICB0aGlzLnNldEludChcIm51bU9jdGF2ZXNcIiwgdGhpcy5fbnVtT2N0YXZlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3I0KClcclxuICAgIHB1YmxpYyBnZXQgc2t5Q29sb3IoKTogQ29sb3I0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2t5Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBza3lDb2xvcih2YWx1ZTogQ29sb3I0KSB7XHJcbiAgICAgICAgdGhpcy5fc2t5Q29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3I0KClcclxuICAgIHB1YmxpYyBnZXQgY2xvdWRDb2xvcigpOiBDb2xvcjQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jbG91ZENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xvdWRDb2xvcih2YWx1ZTogQ29sb3I0KSB7XHJcbiAgICAgICAgdGhpcy5fY2xvdWRDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYW1wbGl0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtcGxpdHVkZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFtcGxpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYW1wbGl0dWRlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBudW1PY3RhdmVzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bU9jdGF2ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBudW1PY3RhdmVzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9udW1PY3RhdmVzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIGNsb3VkIHByb2NlZHVyYWwgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgYSBzZXJpYWxpemVkIGNsb3VkIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLkNsb3VkUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQ2xvdWQgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIGNsb3VkIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIGNsb3VkIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgQ2xvdWQgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IENsb3VkUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgQ2xvdWRQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLkNsb3VkUHJvY2VkdXJhbFRleHR1cmVcIiwgQ2xvdWRQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2Nsb3VkUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwiZmlyZVByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dW5pZm9ybSBmbG9hdCB0aW1lO3VuaWZvcm0gdmVjMyBjMTt1bmlmb3JtIHZlYzMgYzI7dW5pZm9ybSB2ZWMzIGMzO3VuaWZvcm0gdmVjMyBjNDt1bmlmb3JtIHZlYzMgYzU7dW5pZm9ybSB2ZWMzIGM2O3VuaWZvcm0gdmVjMiBzcGVlZDt1bmlmb3JtIGZsb2F0IHNoaWZ0O3VuaWZvcm0gZmxvYXQgYWxwaGFUaHJlc2hvbGQ7dmFyeWluZyB2ZWMyIHZVVjtmbG9hdCByYW5kKHZlYzIgbikge3JldHVybiBmcmFjdChjb3MoZG90KG4sdmVjMigxMi45ODk4LDQuMTQxNCkpKSo0Mzc1OC41NDUzKTt9XG5mbG9hdCBub2lzZSh2ZWMyIG4pIHtjb25zdCB2ZWMyIGQ9dmVjMigwLjAsMS4wKTt2ZWMyIGI9Zmxvb3IobiksZj1zbW9vdGhzdGVwKHZlYzIoMC4wKSx2ZWMyKDEuMCksZnJhY3QobikpO3JldHVybiBtaXgobWl4KHJhbmQoYikscmFuZChiK2QueXgpLGYueCksbWl4KHJhbmQoYitkLnh5KSxyYW5kKGIrZC55eSksZi54KSxmLnkpO31cbmZsb2F0IGZibSh2ZWMyIG4pIHtmbG9hdCB0b3RhbD0wLjAsYW1wbGl0dWRlPTEuMDtmb3IgKGludCBpPTA7IGk8NDsgaSsrKSB7dG90YWwrPW5vaXNlKG4pKmFtcGxpdHVkZTtuKz1uO2FtcGxpdHVkZSo9MC41O31cbnJldHVybiB0b3RhbDt9XG52b2lkIG1haW4oKSB7dmVjMiBwPXZVVio4LjA7ZmxvYXQgcT1mYm0ocC10aW1lKjAuMSk7dmVjMiByPXZlYzIoZmJtKHArcSt0aW1lKnNwZWVkLngtcC54LXAueSksZmJtKHArcS10aW1lKnNwZWVkLnkpKTt2ZWMzIGM9bWl4KGMxLGMyLGZibShwK3IpKSttaXgoYzMsYzQsci54KS1taXgoYzUsYzYsci55KTt2ZWMzIGNvbG9yPWMqY29zKHNoaWZ0KnZVVi55KTtmbG9hdCBsdW1pbmFuY2U9ZG90KGNvbG9yLnJnYix2ZWMzKDAuMywwLjU5LDAuMTEpKTtnbF9GcmFnQ29sb3I9dmVjNChjb2xvcixsdW1pbmFuY2UqYWxwaGFUaHJlc2hvbGQrKDEuMC1hbHBoYVRocmVzaG9sZCkpO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGZpcmVQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZSwgc2VyaWFsaXplQXNWZWN0b3IyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuaW1wb3J0IFwiLi9maXJlUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXJlUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBwcml2YXRlIF90aW1lOiBudW1iZXIgPSAwLjA7XHJcbiAgICBwcml2YXRlIF9zcGVlZCA9IG5ldyBWZWN0b3IyKDAuNSwgMC4zKTtcclxuICAgIHByaXZhdGUgX2F1dG9HZW5lcmF0ZVRpbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfZmlyZUNvbG9yczogQ29sb3IzW107XHJcbiAgICBwcml2YXRlIF9hbHBoYVRocmVzaG9sZDogbnVtYmVyID0gMC41O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCwgZmFsbGJhY2tUZXh0dXJlPzogVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNpemUsIFwiZmlyZVByb2NlZHVyYWxUZXh0dXJlXCIsIHNjZW5lLCBmYWxsYmFja1RleHR1cmUsIGdlbmVyYXRlTWlwTWFwcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZUNvbG9ycyA9IEZpcmVQcm9jZWR1cmFsVGV4dHVyZS5SZWRGaXJlQ29sb3JzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInRpbWVcIiwgdGhpcy5fdGltZSk7XHJcbiAgICAgICAgdGhpcy5zZXRWZWN0b3IyKFwic3BlZWRcIiwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiYzFcIiwgdGhpcy5fZmlyZUNvbG9yc1swXSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJjMlwiLCB0aGlzLl9maXJlQ29sb3JzWzFdKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImMzXCIsIHRoaXMuX2ZpcmVDb2xvcnNbMl0pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiYzRcIiwgdGhpcy5fZmlyZUNvbG9yc1szXSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJjNVwiLCB0aGlzLl9maXJlQ29sb3JzWzRdKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImM2XCIsIHRoaXMuX2ZpcmVDb2xvcnNbNV0pO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJhbHBoYVRocmVzaG9sZFwiLCB0aGlzLl9hbHBoYVRocmVzaG9sZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIHJlbmRlcih1c2VDYW1lcmFQb3N0UHJvY2Vzcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuICAgICAgICBpZiAodGhpcy5fYXV0b0dlbmVyYXRlVGltZSAmJiBzY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lICs9IHNjZW5lLmdldEFuaW1hdGlvblJhdGlvKCkgKiAwLjAzO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnJlbmRlcih1c2VDYW1lcmFQb3N0UHJvY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgUHVycGxlRmlyZUNvbG9ycygpOiBDb2xvcjNbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtuZXcgQ29sb3IzKDAuNSwgMC4wLCAxLjApLCBuZXcgQ29sb3IzKDAuOSwgMC4wLCAxLjApLCBuZXcgQ29sb3IzKDAuMiwgMC4wLCAxLjApLCBuZXcgQ29sb3IzKDEuMCwgMC45LCAxLjApLCBuZXcgQ29sb3IzKDAuMSwgMC4xLCAxLjApLCBuZXcgQ29sb3IzKDAuOSwgMC45LCAxLjApXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBHcmVlbkZpcmVDb2xvcnMoKTogQ29sb3IzW10ge1xyXG4gICAgICAgIHJldHVybiBbbmV3IENvbG9yMygwLjUsIDEuMCwgMC4wKSwgbmV3IENvbG9yMygwLjUsIDEuMCwgMC4wKSwgbmV3IENvbG9yMygwLjMsIDAuNCwgMC4wKSwgbmV3IENvbG9yMygwLjUsIDEuMCwgMC4wKSwgbmV3IENvbG9yMygwLjIsIDAuMCwgMC4wKSwgbmV3IENvbG9yMygwLjUsIDEuMCwgMC4wKV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgUmVkRmlyZUNvbG9ycygpOiBDb2xvcjNbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtuZXcgQ29sb3IzKDAuNSwgMC4wLCAwLjEpLCBuZXcgQ29sb3IzKDAuOSwgMC4wLCAwLjApLCBuZXcgQ29sb3IzKDAuMiwgMC4wLCAwLjApLCBuZXcgQ29sb3IzKDEuMCwgMC45LCAwLjApLCBuZXcgQ29sb3IzKDAuMSwgMC4xLCAwLjEpLCBuZXcgQ29sb3IzKDAuOSwgMC45LCAwLjkpXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBCbHVlRmlyZUNvbG9ycygpOiBDb2xvcjNbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtuZXcgQ29sb3IzKDAuMSwgMC4wLCAwLjUpLCBuZXcgQ29sb3IzKDAuMCwgMC4wLCAwLjUpLCBuZXcgQ29sb3IzKDAuMSwgMC4wLCAwLjIpLCBuZXcgQ29sb3IzKDAuMCwgMC4wLCAxLjApLCBuZXcgQ29sb3IzKDAuMSwgMC4yLCAwLjMpLCBuZXcgQ29sb3IzKDAuMCwgMC4yLCAwLjkpXTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYXV0b0dlbmVyYXRlVGltZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0dlbmVyYXRlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGF1dG9HZW5lcmF0ZVRpbWUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hdXRvR2VuZXJhdGVUaW1lID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmaXJlQ29sb3JzKCk6IENvbG9yM1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyZUNvbG9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZpcmVDb2xvcnModmFsdWU6IENvbG9yM1tdKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZUNvbG9ycyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgdGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNWZWN0b3IyKClcclxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsdWU6IFZlY3RvcjIpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYWxwaGFUaHJlc2hvbGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxwaGFUaHJlc2hvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbHBoYVRocmVzaG9sZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWxwaGFUaHJlc2hvbGQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgZmlyZSBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBmaXJlIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLkZpcmVQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICBzZXJpYWxpemF0aW9uT2JqZWN0LmZpcmVDb2xvcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ZpcmVDb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5maXJlQ29sb3JzLnB1c2godGhpcy5fZmlyZUNvbG9yc1tpXS5hc0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgRmlyZSBQcm9jZWR1cmFsIFRleHR1cmUgZnJvbSBwYXJzZWQgZmlyZSBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyBmaXJlIHByb2NlZHVyYWwgdGV4dHVyZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybnMgYSBwYXJzZWQgRmlyZSBQcm9jZWR1cmFsIFRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShwYXJzZWRUZXh0dXJlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogRmlyZVByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IEZpcmVQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29sb3JzOiBDb2xvcjNbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2VkVGV4dHVyZS5maXJlQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKENvbG9yMy5Gcm9tQXJyYXkocGFyc2VkVGV4dHVyZS5maXJlQ29sb3JzW2ldKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlLmZpcmVDb2xvcnMgPSBjb2xvcnM7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5GaXJlUHJvY2VkdXJhbFRleHR1cmVcIiwgRmlyZVByb2NlZHVyYWxUZXh0dXJlKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vZmlyZVByb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcImdyYXNzUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt2YXJ5aW5nIHZlYzIgdlBvc2l0aW9uO3ZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSB2ZWMzIGhlcmIxQ29sb3I7dW5pZm9ybSB2ZWMzIGhlcmIyQ29sb3I7dW5pZm9ybSB2ZWMzIGhlcmIzQ29sb3I7dW5pZm9ybSB2ZWMzIGdyb3VuZENvbG9yO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgZmJtKHZlYzIgbikge2Zsb2F0IHRvdGFsPTAuMCxhbXBsaXR1ZGU9MS4wO2ZvciAoaW50IGk9MDsgaTw0OyBpKyspIHt0b3RhbCs9bm9pc2UobikqYW1wbGl0dWRlO24rPW47YW1wbGl0dWRlKj0wLjU7fVxucmV0dXJuIHRvdGFsO31cbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9CRUdJTlxudmVjMyBjb2xvcj1taXgoZ3JvdW5kQ29sb3IsaGVyYjFDb2xvcixyYW5kKGdsX0ZyYWdDb29yZC54eSo0LjApKTtjb2xvcj1taXgoY29sb3IsaGVyYjJDb2xvcixyYW5kKGdsX0ZyYWdDb29yZC54eSo4LjApKTtjb2xvcj1taXgoY29sb3IsaGVyYjNDb2xvcixyYW5kKGdsX0ZyYWdDb29yZC54eSkpO2NvbG9yPW1peChjb2xvcixoZXJiMUNvbG9yLGZibShnbF9GcmFnQ29vcmQueHkqMTYuMCkpO2dsX0ZyYWdDb2xvcj12ZWM0KGNvbG9yLDEuMCk7XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORFxufWA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgZ3Jhc3NQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZUFzQ29sb3IzIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgXCIuL2dyYXNzUHJvY2VkdXJhbFRleHR1cmUuZnJhZ21lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFzc1Byb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfZ3Jhc3NDb2xvcnM6IENvbG9yM1tdO1xyXG4gICAgcHJpdmF0ZSBfZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IzKDEsIDEsIDEpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gbnVsbCwgZmFsbGJhY2tUZXh0dXJlPzogVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNpemUsIFwiZ3Jhc3NQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG5cclxuICAgICAgICB0aGlzLl9ncmFzc0NvbG9ycyA9IFtuZXcgQ29sb3IzKDAuMjksIDAuMzgsIDAuMDIpLCBuZXcgQ29sb3IzKDAuMzYsIDAuNDksIDAuMDkpLCBuZXcgQ29sb3IzKDAuNTEsIDAuNiwgMC4yOCldO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiaGVyYjFDb2xvclwiLCB0aGlzLl9ncmFzc0NvbG9yc1swXSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJoZXJiMkNvbG9yXCIsIHRoaXMuX2dyYXNzQ29sb3JzWzFdKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcImhlcmIzQ29sb3JcIiwgdGhpcy5fZ3Jhc3NDb2xvcnNbMl0pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiZ3JvdW5kQ29sb3JcIiwgdGhpcy5fZ3JvdW5kQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZ3Jhc3NDb2xvcnMoKTogQ29sb3IzW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ncmFzc0NvbG9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGdyYXNzQ29sb3JzKHZhbHVlOiBDb2xvcjNbXSkge1xyXG4gICAgICAgIHRoaXMuX2dyYXNzQ29sb3JzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemVBc0NvbG9yMygpXHJcbiAgICBwdWJsaWMgZ2V0IGdyb3VuZENvbG9yKCk6IENvbG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZ3JvdW5kQ29sb3IodmFsdWU6IENvbG9yMykge1xyXG4gICAgICAgIHRoaXMuX2dyb3VuZENvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIGdyYXNzIHByb2NlZHVyYWwgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgYSBzZXJpYWxpemVkIGdyYXNzIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLkdyYXNzUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuXHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5ncmFzc0NvbG9ycyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ3Jhc3NDb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5ncmFzc0NvbG9ycy5wdXNoKHRoaXMuX2dyYXNzQ29sb3JzW2ldLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBHcmFzcyBQcm9jZWR1cmFsIFRleHR1cmUgZnJvbSBwYXJzZWQgZ3Jhc3MgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgZ3Jhc3MgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBHcmFzcyBQcm9jZWR1cmFsIFRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShwYXJzZWRUZXh0dXJlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogR3Jhc3NQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoXHJcbiAgICAgICAgICAgICgpID0+IG5ldyBHcmFzc1Byb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBjb2xvcnM6IENvbG9yM1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRUZXh0dXJlLmdyYXNzQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKENvbG9yMy5Gcm9tQXJyYXkocGFyc2VkVGV4dHVyZS5ncmFzc0NvbG9yc1tpXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZS5ncmFzc0NvbG9ycyA9IGNvbG9ycztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLkdyYXNzUHJvY2VkdXJhbFRleHR1cmVcIiwgR3Jhc3NQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2dyYXNzUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuZXhwb3J0ICogZnJvbSBcIi4vYnJpY2svaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY2xvdWQvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZmlyZS9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ncmFzcy9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9tYXJibGUvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbm9ybWFsTWFwL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Blcmxpbk5vaXNlL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3JvYWQvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc3RhcmZpZWxkL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dvb2QvaW5kZXhcIjtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vbWFyYmxlUHJvY2VkdXJhbFRleHR1cmVcIjtcclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwibWFyYmxlUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt2YXJ5aW5nIHZlYzIgdlBvc2l0aW9uO3ZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSBmbG9hdCBudW1iZXJPZlRpbGVzSGVpZ2h0O3VuaWZvcm0gZmxvYXQgbnVtYmVyT2ZUaWxlc1dpZHRoO3VuaWZvcm0gZmxvYXQgYW1wbGl0dWRlO3VuaWZvcm0gdmVjMyBtYXJibGVDb2xvcjt1bmlmb3JtIHZlYzMgam9pbnRDb2xvcjtjb25zdCB2ZWMzIHRpbGVTaXplPXZlYzMoMS4xLDEuMCwxLjEpO2NvbnN0IHZlYzMgdGlsZVBjdD12ZWMzKDAuOTgsMS4wLDAuOTgpO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgdHVyYnVsZW5jZSh2ZWMyIFApXG57ZmxvYXQgdmFsPTAuMDtmbG9hdCBmcmVxPTEuMDtmb3IgKGludCBpPTA7IGk8NDsgaSsrKVxue3ZhbCs9YWJzKG5vaXNlKFAqZnJlcSkvZnJlcSk7ZnJlcSo9Mi4wNzt9XG5yZXR1cm4gdmFsO31cbmZsb2F0IHJvdW5kRihmbG9hdCBudW1iZXIpe3JldHVybiBzaWduKG51bWJlcikqZmxvb3IoYWJzKG51bWJlcikrMC41KTt9XG52ZWMzIG1hcmJsZV9jb2xvcihmbG9hdCB4KVxue3ZlYzMgY29sO3g9MC41Kih4KzEuKTt4PXNxcnQoeCk7IFxueD1zcXJ0KHgpO3g9c3FydCh4KTtjb2w9dmVjMyguMisuNzUqeCk7IFxuY29sLmIqPTAuOTU7IFxucmV0dXJuIGNvbDt9XG52b2lkIG1haW4oKVxue2Zsb2F0IGJyaWNrVz0xLjAvbnVtYmVyT2ZUaWxlc1dpZHRoO2Zsb2F0IGJyaWNrSD0xLjAvbnVtYmVyT2ZUaWxlc0hlaWdodDtmbG9hdCBqb2ludFdQZXJjZW50YWdlPTAuMDE7ZmxvYXQgam9pbnRIUGVyY2VudGFnZT0wLjAxO3ZlYzMgY29sb3I9bWFyYmxlQ29sb3I7ZmxvYXQgeWk9dlVWLnkvYnJpY2tIO2Zsb2F0IG55aT1yb3VuZEYoeWkpO2Zsb2F0IHhpPXZVVi54L2JyaWNrVztpZiAobW9kKGZsb29yKHlpKSwyLjApPT0wLjApe3hpPXhpLTAuNTt9XG5mbG9hdCBueGk9cm91bmRGKHhpKTt2ZWMyIGJyaWNrdlVWPXZlYzIoKHhpLWZsb29yKHhpKSkvYnJpY2tILCh5aS1mbG9vcih5aSkpL2JyaWNrVyk7aWYgKHlpPG55aStqb2ludEhQZXJjZW50YWdlICYmIHlpPm55aS1qb2ludEhQZXJjZW50YWdlKXtjb2xvcj1taXgoam9pbnRDb2xvcix2ZWMzKDAuMzcsMC4yNSwwLjI1KSwoeWktbnlpKS9qb2ludEhQZXJjZW50YWdlKzAuMik7fVxuZWxzZSBpZiAoeGk8bnhpK2pvaW50V1BlcmNlbnRhZ2UgJiYgeGk+bnhpLWpvaW50V1BlcmNlbnRhZ2Upe2NvbG9yPW1peChqb2ludENvbG9yLHZlYzMoMC40NCwwLjQ0LDAuNDQpLCh4aS1ueGkpL2pvaW50V1BlcmNlbnRhZ2UrMC4yKTt9XG5lbHNlIHtmbG9hdCB0PTYuMjgqYnJpY2t2VVYueC8odGlsZVNpemUueCtub2lzZSh2ZWMyKHZVVikqNi4wKSk7dCs9YW1wbGl0dWRlKnR1cmJ1bGVuY2UoYnJpY2t2VVYueHkpO3Q9c2luKHQpO2NvbG9yPW1hcmJsZV9jb2xvcih0KTt9XG5nbF9GcmFnQ29sb3I9dmVjNChjb2xvciwwLjApO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IG1hcmJsZVByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgXCIuL21hcmJsZVByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFyYmxlUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBwcml2YXRlIF9udW1iZXJPZlRpbGVzSGVpZ2h0OiBudW1iZXIgPSAzO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZUaWxlc1dpZHRoOiBudW1iZXIgPSAzO1xyXG4gICAgcHJpdmF0ZSBfYW1wbGl0dWRlOiBudW1iZXIgPSA5LjA7XHJcbiAgICBwcml2YXRlIF9qb2ludENvbG9yID0gbmV3IENvbG9yMygwLjcyLCAwLjcyLCAwLjcyKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcIm1hcmJsZVByb2NlZHVyYWxUZXh0dXJlXCIsIHNjZW5lLCBmYWxsYmFja1RleHR1cmUsIGdlbmVyYXRlTWlwTWFwcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaGFkZXJVbmlmb3JtcygpIHtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwibnVtYmVyT2ZUaWxlc0hlaWdodFwiLCB0aGlzLl9udW1iZXJPZlRpbGVzSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwibnVtYmVyT2ZUaWxlc1dpZHRoXCIsIHRoaXMuX251bWJlck9mVGlsZXNXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcImFtcGxpdHVkZVwiLCB0aGlzLl9hbXBsaXR1ZGUpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IzKFwiam9pbnRDb2xvclwiLCB0aGlzLl9qb2ludENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgbnVtYmVyT2ZUaWxlc0hlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1iZXJPZlRpbGVzSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbnVtYmVyT2ZUaWxlc0hlaWdodCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZUaWxlc0hlaWdodCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYW1wbGl0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtcGxpdHVkZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFtcGxpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYW1wbGl0dWRlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBudW1iZXJPZlRpbGVzV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZUaWxlc1dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbnVtYmVyT2ZUaWxlc1dpZHRoKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlRpbGVzV2lkdGggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGpvaW50Q29sb3IoKTogQ29sb3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fam9pbnRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGpvaW50Q29sb3IodmFsdWU6IENvbG9yMykge1xyXG4gICAgICAgIHRoaXMuX2pvaW50Q29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgbWFyYmxlIHByb2NlZHVyYWwgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgYSBzZXJpYWxpemVkIG1hcmJsZSBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5NYXJibGVQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBNYXJibGUgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIG1hcmJsZSBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyBtYXJibGUgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBNYXJibGUgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IE1hcmJsZVByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IE1hcmJsZVByb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uTWFyYmxlUHJvY2VkdXJhbFRleHR1cmVcIiwgTWFyYmxlUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9ub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O3VuaWZvcm0gc2FtcGxlcjJEIGJhc2VTYW1wbGVyO3VuaWZvcm0gZmxvYXQgc2l6ZTt2YXJ5aW5nIHZlYzIgdlVWO2NvbnN0IHZlYzMgTFVNQV9DT0VGRklDSUVOVD12ZWMzKDAuMjEyNiwwLjcxNTIsMC4wNzIyKTtmbG9hdCBsdW1hQXRDb29yZCh2ZWMyIGNvb3JkKVxue3ZlYzMgcGl4ZWw9dGV4dHVyZTJEKGJhc2VTYW1wbGVyLGNvb3JkKS5yZ2I7ZmxvYXQgbHVtYT1kb3QocGl4ZWwsTFVNQV9DT0VGRklDSUVOVCk7cmV0dXJuIGx1bWE7fVxudm9pZCBtYWluKClcbntmbG9hdCBsdW1hVTA9bHVtYUF0Q29vcmQodlVWK3ZlYzIoLTEuMCwgMC4wKS9zaXplKTtmbG9hdCBsdW1hVTE9bHVtYUF0Q29vcmQodlVWK3ZlYzIoIDEuMCwgMC4wKS9zaXplKTtmbG9hdCBsdW1hVjA9bHVtYUF0Q29vcmQodlVWK3ZlYzIoIDAuMCwtMS4wKS9zaXplKTtmbG9hdCBsdW1hVjE9bHVtYUF0Q29vcmQodlVWK3ZlYzIoIDAuMCwgMS4wKS9zaXplKTt2ZWMyIHNsb3BlPSh2ZWMyKGx1bWFVMC1sdW1hVTEsbHVtYVYwLWx1bWFWMSkrMS4wKSowLjU7Z2xfRnJhZ0NvbG9yPXZlYzQoc2xvcGUsMS4wLDEuMCk7fVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZUFzVGV4dHVyZSB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUHJvY2VkdXJhbFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvUHJvY2VkdXJhbHMvcHJvY2VkdXJhbFRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IFwiLi9ub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfYmFzZVRleHR1cmU6IFRleHR1cmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJub3JtYWxNYXBQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFwiYmFzZVNhbXBsZXJcIiwgdGhpcy5fYmFzZVRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJzaXplXCIsIHRoaXMuZ2V0UmVuZGVyU2l6ZSgpIGFzIG51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIHJlbmRlcih1c2VDYW1lcmFQb3N0UHJvY2Vzcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlci5yZW5kZXIodXNlQ2FtZXJhUG9zdFByb2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSByZXNpemUoc2l6ZTogYW55LCBnZW5lcmF0ZU1pcE1hcHM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZShzaXplLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG5cclxuICAgICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSB0aGUgXCJzaXplXCIgdW5pZm9ybVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgaXNSZWFkeSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Jhc2VUZXh0dXJlIHx8ICF0aGlzLl9iYXNlVGV4dHVyZS5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmlzUmVhZHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKClcclxuICAgIHB1YmxpYyBnZXQgYmFzZVRleHR1cmUoKTogVGV4dHVyZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhc2VUZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmFzZVRleHR1cmUodGV4dHVyZTogVGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX2Jhc2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgbm9ybWFsIG1hcCBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBub3JtYWwgbWFwIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLk5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpYWxpemF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIE5vcm1hbCBNYXAgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIG5vcm1hbCBtYXAgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgbm9ybWFsIG1hcCBwcm9jZWR1cmFsIHRleHR1cmUgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIGEgcGFyc2VkIE5vcm1hbCBNYXAgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IE5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZShcclxuICAgICAgICAgICAgKCkgPT4gbmV3IE5vcm1hbE1hcFByb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uTm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmVcIiwgTm9ybWFsTWFwUHJvY2VkdXJhbFRleHR1cmUpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9wZXJsaW5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcInBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt1bmlmb3JtIGZsb2F0IHNpemU7dW5pZm9ybSBmbG9hdCB0aW1lO3VuaWZvcm0gZmxvYXQgdHJhbnNsYXRpb25TcGVlZDt2YXJ5aW5nIHZlYzIgdlVWO2Zsb2F0IHIoZmxvYXQgbilcbntyZXR1cm4gZnJhY3QoY29zKG4qODkuNDIpKjM0My40Mik7fVxudmVjMiByKHZlYzIgbilcbntyZXR1cm4gdmVjMihyKG4ueCoyMy42Mi0zMDAuMCtuLnkqMzQuMzUpLHIobi54KjQ1LjEzKzI1Ni4wK24ueSozOC44OSkpOyB9XG5mbG9hdCB3b3JsZXkodmVjMiBuLGZsb2F0IHMpXG57ZmxvYXQgZGlzPTEuMDtmb3IoaW50IHg9LTE7IHg8PTE7IHgrKylcbntmb3IoaW50IHk9LTE7IHk8PTE7IHkrKylcbnt2ZWMyIHA9Zmxvb3Iobi9zKSt2ZWMyKHgseSk7ZmxvYXQgZD1sZW5ndGgocihwKSt2ZWMyKHgseSktZnJhY3Qobi9zKSk7aWYgKGRpcz5kKVxuZGlzPWQ7fX1cbnJldHVybiAxLjAtZGlzO31cbnZlYzMgaGFzaDMzKHZlYzMgcDMpXG57cDM9ZnJhY3QocDMqdmVjMygwLjEwMzEsMC4xMTM2OSwwLjEzNzg3KSk7cDMrPWRvdChwMyxwMy55eHorMTkuMTkpO3JldHVybiAtMS4wKzIuMCpmcmFjdCh2ZWMzKChwMy54K3AzLnkpKnAzLnosKHAzLngrcDMueikqcDMueSwocDMueStwMy56KSpwMy54KSk7fVxuZmxvYXQgcGVybGluTm9pc2UodmVjMyBwKVxue3ZlYzMgcGk9Zmxvb3IocCk7dmVjMyBwZj1wLXBpO3ZlYzMgdz1wZipwZiooMy4wLTIuMCpwZik7cmV0dXJuIG1peChcbm1peChcbm1peChcbmRvdChwZi12ZWMzKDAsMCwwKSxoYXNoMzMocGkrdmVjMygwLDAsMCkpKSxcbmRvdChwZi12ZWMzKDEsMCwwKSxoYXNoMzMocGkrdmVjMygxLDAsMCkpKSxcbncueFxuKSxcbm1peChcbmRvdChwZi12ZWMzKDAsMCwxKSxoYXNoMzMocGkrdmVjMygwLDAsMSkpKSxcbmRvdChwZi12ZWMzKDEsMCwxKSxoYXNoMzMocGkrdmVjMygxLDAsMSkpKSxcbncueFxuKSxcbncuelxuKSxcbm1peChcbm1peChcbmRvdChwZi12ZWMzKDAsMSwwKSxoYXNoMzMocGkrdmVjMygwLDEsMCkpKSxcbmRvdChwZi12ZWMzKDEsMSwwKSxoYXNoMzMocGkrdmVjMygxLDEsMCkpKSxcbncueFxuKSxcbm1peChcbmRvdChwZi12ZWMzKDAsMSwxKSxoYXNoMzMocGkrdmVjMygwLDEsMSkpKSxcbmRvdChwZi12ZWMzKDEsMSwxKSxoYXNoMzMocGkrdmVjMygxLDEsMSkpKSxcbncueFxuKSxcbncuelxuKSxcbncueVxuKTt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpXG57dmVjMiB1dj1nbF9GcmFnQ29vcmQueHkrdHJhbnNsYXRpb25TcGVlZDtmbG9hdCBkaXM9KFxuMS4wK3Blcmxpbk5vaXNlKHZlYzModXYvdmVjMihzaXplLHNpemUpLHRpbWUqMC4wNSkqOC4wKSlcbiogKDEuMCsod29ybGV5KHV2LDMyLjApKyAwLjUqd29ybGV5KDIuMCp1diwzMi4wKSswLjI1KndvcmxleSg0LjAqdXYsMzIuMCkpXG4pO2dsX0ZyYWdDb2xvcj12ZWM0KHZlYzMoZGlzLzQuMCksMS4wKTt9XG5gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IHBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCBcIi4vcGVybGluTm9pc2VQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyB0aW1lOiBudW1iZXIgPSAwLjA7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgdGltZVNjYWxlOiBudW1iZXIgPSAxLjA7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgdHJhbnNsYXRpb25TcGVlZDogbnVtYmVyID0gMS4wO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnJlbnRUcmFuc2xhdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcInBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmVcIiwgc2NlbmUsIGZhbGxiYWNrVGV4dHVyZSwgZ2VuZXJhdGVNaXBNYXBzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlclVuaWZvcm1zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJzaXplXCIsIHRoaXMuZ2V0UmVuZGVyU2l6ZSgpIGFzIG51bWJlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IHNjZW5lID0gdGhpcy5nZXRTY2VuZSgpO1xyXG5cclxuICAgICAgICBpZiAoIXNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gc2NlbmUuZ2V0RW5naW5lKCkuZ2V0RGVsdGFUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInRpbWVcIiwgKHRoaXMudGltZSAqIHRoaXMudGltZVNjYWxlKSAvIDEwMDApO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50VHJhbnNsYXRpb24gKz0gKGRlbHRhVGltZSAqIHRoaXMudHJhbnNsYXRpb25TcGVlZCkgLyAxMDAwLjA7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInRyYW5zbGF0aW9uU3BlZWRcIiwgdGhpcy5fY3VycmVudFRyYW5zbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKHVzZUNhbWVyYVBvc3RQcm9jZXNzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgICAgICBzdXBlci5yZW5kZXIodXNlQ2FtZXJhUG9zdFByb2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSByZXNpemUoc2l6ZTogYW55LCBnZW5lcmF0ZU1pcE1hcHM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZShzaXplLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplcyB0aGlzIHBlcmxpbiBub2lzZSBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCBwZXJsaW4gbm9pc2UgcHJvY2VkdXJhbCB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IFNlcmlhbGl6YXRpb25IZWxwZXIuU2VyaWFsaXplKHRoaXMsIHN1cGVyLnNlcmlhbGl6ZSgpKTtcclxuICAgICAgICBzZXJpYWxpemF0aW9uT2JqZWN0LmN1c3RvbVR5cGUgPSBcIkJBQllMT04uUGVybGluTm9pc2VQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBQZXJsaW4gTm9pc2UgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIHBlcmxpbiBub2lzZSBwcm9jZWR1cmFsIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHBhcnNlZFRleHR1cmUgZGVmaW5lcyBwYXJzZWQgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgY3VycmVudCBzY2VuZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdCBVUkwgY29udGFpbmluZyBwZXJsaW4gbm9pc2UgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBQZXJsaW4gTm9pc2UgUHJvY2VkdXJhbCBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3ZlcnJpZGUgUGFyc2UocGFyc2VkVGV4dHVyZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IFBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgUGVybGluTm9pc2VQcm9jZWR1cmFsVGV4dHVyZShwYXJzZWRUZXh0dXJlLm5hbWUsIHBhcnNlZFRleHR1cmUuX3NpemUsIHNjZW5lLCB1bmRlZmluZWQsIHBhcnNlZFRleHR1cmUuX2dlbmVyYXRlTWlwTWFwcyksXHJcbiAgICAgICAgICAgIHBhcnNlZFRleHR1cmUsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICByb290VXJsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLlBlcmxpbk5vaXNlUHJvY2VkdXJhbFRleHR1cmVcIiwgUGVybGluTm9pc2VQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3JvYWRQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJyb2FkUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt2YXJ5aW5nIHZlYzIgdlVWOyBcbnVuaWZvcm0gdmVjMyByb2FkQ29sb3I7ZmxvYXQgcmFuZCh2ZWMyIG4pIHtyZXR1cm4gZnJhY3QoY29zKGRvdChuLHZlYzIoMTIuOTg5OCw0LjE0MTQpKSkqNDM3NTguNTQ1Myk7fVxuZmxvYXQgbm9pc2UodmVjMiBuKSB7Y29uc3QgdmVjMiBkPXZlYzIoMC4wLDEuMCk7dmVjMiBiPWZsb29yKG4pLGY9c21vb3Roc3RlcCh2ZWMyKDAuMCksdmVjMigxLjApLGZyYWN0KG4pKTtyZXR1cm4gbWl4KG1peChyYW5kKGIpLHJhbmQoYitkLnl4KSxmLngpLG1peChyYW5kKGIrZC54eSkscmFuZChiK2QueXkpLGYueCksZi55KTt9XG5mbG9hdCBmYm0odmVjMiBuKSB7ZmxvYXQgdG90YWw9MC4wLGFtcGxpdHVkZT0xLjA7Zm9yIChpbnQgaT0wOyBpPDQ7IGkrKykge3RvdGFsKz1ub2lzZShuKSphbXBsaXR1ZGU7bis9bjthbXBsaXR1ZGUqPTAuNTt9XG5yZXR1cm4gdG90YWw7fVxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKSB7XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0JFR0lOXG5mbG9hdCByYXRpb3k9bW9kKGdsX0ZyYWdDb29yZC55KjEwMC4wICxmYm0odlVWKjIuMCkpO3ZlYzMgY29sb3I9cm9hZENvbG9yKnJhdGlveTtnbF9GcmFnQ29sb3I9dmVjNChjb2xvciwxLjApO1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9FTkRcbn1gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IHJvYWRQcm9jZWR1cmFsVGV4dHVyZVBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsImltcG9ydCB7IHNlcmlhbGl6ZUFzQ29sb3IzIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFByb2NlZHVyYWxUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL1Byb2NlZHVyYWxzL3Byb2NlZHVyYWxUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCBcIi4vcm9hZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9hZFByb2NlZHVyYWxUZXh0dXJlIGV4dGVuZHMgUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgcHJpdmF0ZSBfcm9hZENvbG9yID0gbmV3IENvbG9yMygwLjUzLCAwLjUzLCAwLjUzKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcInJvYWRQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcjMoXCJyb2FkQ29sb3JcIiwgdGhpcy5fcm9hZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGdldCByb2FkQ29sb3IoKTogQ29sb3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9hZENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcm9hZENvbG9yKHZhbHVlOiBDb2xvcjMpIHtcclxuICAgICAgICB0aGlzLl9yb2FkQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgcm9hZCBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCByb2FkIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLlJvYWRQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBSb2FkIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCByb2FkIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIHJvYWQgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBSb2FkIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBSb2FkUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgUm9hZFByb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uUm9hZFByb2NlZHVyYWxUZXh0dXJlXCIsIFJvYWRQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3N0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlXCI7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5cbmNvbnN0IG5hbWUgPSBcInN0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4jZGVmaW5lIHZvbHN0ZXBzIDIwXG4jZGVmaW5lIGl0ZXJhdGlvbnMgMTVcbnZhcnlpbmcgdmVjMiB2UG9zaXRpb247dmFyeWluZyB2ZWMyIHZVVjt1bmlmb3JtIGZsb2F0IHRpbWU7dW5pZm9ybSBmbG9hdCBhbHBoYTt1bmlmb3JtIGZsb2F0IGJldGE7dW5pZm9ybSBmbG9hdCB6b29tO3VuaWZvcm0gZmxvYXQgZm9ybXVwYXJhbTt1bmlmb3JtIGZsb2F0IHN0ZXBzaXplO3VuaWZvcm0gZmxvYXQgdGlsZTt1bmlmb3JtIGZsb2F0IGJyaWdodG5lc3M7dW5pZm9ybSBmbG9hdCBkYXJrbWF0dGVyO3VuaWZvcm0gZmxvYXQgZGlzdGZhZGluZzt1bmlmb3JtIGZsb2F0IHNhdHVyYXRpb247dm9pZCBtYWluKClcbnt2ZWMzIGRpcj12ZWMzKHZVVip6b29tLDEuKTtmbG9hdCBsb2NhbFRpbWU9dGltZSowLjAwMDE7bWF0MiByb3QxPW1hdDIoY29zKGFscGhhKSxzaW4oYWxwaGEpLC1zaW4oYWxwaGEpLGNvcyhhbHBoYSkpO21hdDIgcm90Mj1tYXQyKGNvcyhiZXRhKSxzaW4oYmV0YSksLXNpbihiZXRhKSxjb3MoYmV0YSkpO2Rpci54eio9cm90MTtkaXIueHkqPXJvdDI7dmVjMyBmcm9tXz12ZWMzKDEuLC41LDAuNSk7ZnJvbV8rPXZlYzMoLTIuLGxvY2FsVGltZSoyLixsb2NhbFRpbWUpO2Zyb21fLnh6Kj1yb3QxO2Zyb21fLnh5Kj1yb3QyO2Zsb2F0IHM9MC4xLGZhZGU9MS47dmVjMyB2PXZlYzMoMC4pO2ZvciAoaW50IHI9MDsgcjx2b2xzdGVwczsgcisrKSB7dmVjMyBwPWZyb21fK3MqZGlyKi41O3A9YWJzKHZlYzModGlsZSktbW9kKHAsdmVjMyh0aWxlKjIuKSkpOyBcbmZsb2F0IHBhLGE9cGE9MC47Zm9yIChpbnQgaT0wOyBpPGl0ZXJhdGlvbnM7IGkrKykge3A9YWJzKHApL2RvdChwLHApLWZvcm11cGFyYW07IFxuYSs9YWJzKGxlbmd0aChwKS1wYSk7IFxucGE9bGVuZ3RoKHApO31cbmZsb2F0IGRtPW1heCgwLixkYXJrbWF0dGVyLWEqYSouMDAxKTsgXG5hKj1hKmE7IFxuaWYgKHI+NikgZmFkZSo9MS4tZG07IFxudis9ZmFkZTt2Kz12ZWMzKHMscypzLHMqcypzKnMpKmEqYnJpZ2h0bmVzcypmYWRlOyBcbmZhZGUqPWRpc3RmYWRpbmc7IFxucys9c3RlcHNpemU7fVxudj1taXgodmVjMyhsZW5ndGgodikpLHYsc2F0dXJhdGlvbik7IFxuZ2xfRnJhZ0NvbG9yPXZlYzQodiouMDEsMS4pO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IHN0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgXCIuL3N0YXJmaWVsZFByb2NlZHVyYWxUZXh0dXJlLmZyYWdtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUgZXh0ZW5kcyBQcm9jZWR1cmFsVGV4dHVyZSB7XHJcbiAgICBwcml2YXRlIF90aW1lID0gMTtcclxuICAgIHByaXZhdGUgX2FscGhhID0gMC41O1xyXG4gICAgcHJpdmF0ZSBfYmV0YSA9IDAuODtcclxuICAgIHByaXZhdGUgX3pvb20gPSAwLjg7XHJcbiAgICBwcml2YXRlIF9mb3JtdXBhcmFtID0gMC41MztcclxuICAgIHByaXZhdGUgX3N0ZXBzaXplID0gMC4xO1xyXG4gICAgcHJpdmF0ZSBfdGlsZSA9IDAuODU7XHJcbiAgICBwcml2YXRlIF9icmlnaHRuZXNzID0gMC4wMDE1O1xyXG4gICAgcHJpdmF0ZSBfZGFya21hdHRlciA9IDAuNDtcclxuICAgIHByaXZhdGUgX2Rpc3RmYWRpbmcgPSAwLjczO1xyXG4gICAgcHJpdmF0ZSBfc2F0dXJhdGlvbiA9IDAuODU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsLCBmYWxsYmFja1RleHR1cmU/OiBUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2l6ZSwgXCJzdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcInRpbWVcIiwgdGhpcy5fdGltZSk7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcImFscGhhXCIsIHRoaXMuX2FscGhhKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiYmV0YVwiLCB0aGlzLl9iZXRhKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiem9vbVwiLCB0aGlzLl96b29tKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwiZm9ybXVwYXJhbVwiLCB0aGlzLl9mb3JtdXBhcmFtKTtcclxuICAgICAgICB0aGlzLnNldEZsb2F0KFwic3RlcHNpemVcIiwgdGhpcy5fc3RlcHNpemUpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJ0aWxlXCIsIHRoaXMuX3RpbGUpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJicmlnaHRuZXNzXCIsIHRoaXMuX2JyaWdodG5lc3MpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJkYXJrbWF0dGVyXCIsIHRoaXMuX2RhcmttYXR0ZXIpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJkaXN0ZmFkaW5nXCIsIHRoaXMuX2Rpc3RmYWRpbmcpO1xyXG4gICAgICAgIHRoaXMuc2V0RmxvYXQoXCJzYXR1cmF0aW9uXCIsIHRoaXMuX3NhdHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCB0aW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90aW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJVbmlmb3JtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBhbHBoYSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbHBoYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFscGhhKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hbHBoYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYmV0YSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmV0YSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmV0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgZm9ybXVwYXJhbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtdXBhcmFtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZm9ybXVwYXJhbSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybXVwYXJhbSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgc3RlcHNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdGVwc2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3RlcHNpemUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHpvb20oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fem9vbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHpvb20odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3pvb20gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHRpbGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpbGUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3RpbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGJyaWdodG5lc3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnJpZ2h0bmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGJyaWdodG5lc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2JyaWdodG5lc3MgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGRhcmttYXR0ZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGFya21hdHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhcmttYXR0ZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2RhcmttYXR0ZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3RmYWRpbmcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzdGZhZGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3RmYWRpbmcodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Rpc3RmYWRpbmcgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHNhdHVyYXRpb24oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2F0dXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNhdHVyYXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NhdHVyYXRpb24gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgc3RhcmZpZWxkIHByb2NlZHVyYWwgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgYSBzZXJpYWxpemVkIHN0YXJmaWVsZCBwcm9jZWR1cmFsIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gU2VyaWFsaXphdGlvbkhlbHBlci5TZXJpYWxpemUodGhpcywgc3VwZXIuc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5TdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBTdGFyZmllbGQgUHJvY2VkdXJhbCBUZXh0dXJlIGZyb20gcGFyc2VkIHN0YXJ0ZmllbGQgcHJvY2VkdXJhbCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBwYXJzZWRUZXh0dXJlIGRlZmluZXMgcGFyc2VkIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGN1cnJlbnQgc2NlbmVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3QgVVJMIGNvbnRhaW5pbmcgc3RhcnRmaWVsZCBwcm9jZWR1cmFsIHRleHR1cmUgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIGEgcGFyc2VkIFN0YXJmaWVsZCBQcm9jZWR1cmFsIFRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShwYXJzZWRUZXh0dXJlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgU3RhcmZpZWxkUHJvY2VkdXJhbFRleHR1cmUocGFyc2VkVGV4dHVyZS5uYW1lLCBwYXJzZWRUZXh0dXJlLl9zaXplLCBzY2VuZSwgdW5kZWZpbmVkLCBwYXJzZWRUZXh0dXJlLl9nZW5lcmF0ZU1pcE1hcHMpLFxyXG4gICAgICAgICAgICBwYXJzZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5TdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZVwiLCBTdGFyZmllbGRQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3dvb2RQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJ3b29kUHJvY2VkdXJhbFRleHR1cmVQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt2YXJ5aW5nIHZlYzIgdlBvc2l0aW9uO3ZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSBmbG9hdCBhbXBTY2FsZTt1bmlmb3JtIHZlYzMgd29vZENvbG9yO2Zsb2F0IHJhbmQodmVjMiBuKSB7cmV0dXJuIGZyYWN0KGNvcyhkb3Qobix2ZWMyKDEyLjk4OTgsNC4xNDE0KSkpKjQzNzU4LjU0NTMpO31cbmZsb2F0IG5vaXNlKHZlYzIgbikge2NvbnN0IHZlYzIgZD12ZWMyKDAuMCwxLjApO3ZlYzIgYj1mbG9vcihuKSxmPXNtb290aHN0ZXAodmVjMigwLjApLHZlYzIoMS4wKSxmcmFjdChuKSk7cmV0dXJuIG1peChtaXgocmFuZChiKSxyYW5kKGIrZC55eCksZi54KSxtaXgocmFuZChiK2QueHkpLHJhbmQoYitkLnl5KSxmLngpLGYueSk7fVxuZmxvYXQgZmJtKHZlYzIgbikge2Zsb2F0IHRvdGFsPTAuMCxhbXBsaXR1ZGU9MS4wO2ZvciAoaW50IGk9MDsgaTw0OyBpKyspIHt0b3RhbCs9bm9pc2UobikqYW1wbGl0dWRlO24rPW47YW1wbGl0dWRlKj0wLjU7fVxucmV0dXJuIHRvdGFsO31cbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9CRUdJTlxuZmxvYXQgcmF0aW95PW1vZCh2VVYueCphbXBTY2FsZSwyLjArZmJtKHZVViowLjgpKTt2ZWMzIHdvb2Q9d29vZENvbG9yKnJhdGlveTtnbF9GcmFnQ29sb3I9dmVjNCh3b29kLDEuMCk7XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORFxufWA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3Qgd29vZFByb2NlZHVyYWxUZXh0dXJlUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiaW1wb3J0IHsgc2VyaWFsaXplLCBzZXJpYWxpemVBc0NvbG9yMyB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBQcm9jZWR1cmFsVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9Qcm9jZWR1cmFscy9wcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgXCIuL3dvb2RQcm9jZWR1cmFsVGV4dHVyZS5mcmFnbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvb2RQcm9jZWR1cmFsVGV4dHVyZSBleHRlbmRzIFByb2NlZHVyYWxUZXh0dXJlIHtcclxuICAgIHByaXZhdGUgX2FtcFNjYWxlOiBudW1iZXIgPSAxMDAuMDtcclxuICAgIHByaXZhdGUgX3dvb2RDb2xvcjogQ29sb3IzID0gbmV3IENvbG9yMygwLjMyLCAwLjE3LCAwLjA5KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwsIGZhbGxiYWNrVGV4dHVyZT86IFRleHR1cmUsIGdlbmVyYXRlTWlwTWFwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzaXplLCBcIndvb2RQcm9jZWR1cmFsVGV4dHVyZVwiLCBzY2VuZSwgZmFsbGJhY2tUZXh0dXJlLCBnZW5lcmF0ZU1pcE1hcHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyVW5pZm9ybXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRGbG9hdChcImFtcFNjYWxlXCIsIHRoaXMuX2FtcFNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yMyhcIndvb2RDb2xvclwiLCB0aGlzLl93b29kQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBhbXBTY2FsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbXBTY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFtcFNjYWxlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hbXBTY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyVW5pZm9ybXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGdldCB3b29kQ29sb3IoKTogQ29sb3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29vZENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgd29vZENvbG9yKHZhbHVlOiBDb2xvcjMpIHtcclxuICAgICAgICB0aGlzLl93b29kQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlclVuaWZvcm1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWxpemVzIHRoaXMgd29vZCBwcm9jZWR1cmFsIHRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGEgc2VyaWFsaXplZCB3b29kIHByb2NlZHVyYWwgdGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6YXRpb25PYmplY3QgPSBTZXJpYWxpemF0aW9uSGVscGVyLlNlcmlhbGl6ZSh0aGlzLCBzdXBlci5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLldvb2RQcm9jZWR1cmFsVGV4dHVyZVwiO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBXb29kIFByb2NlZHVyYWwgVGV4dHVyZSBmcm9tIHBhcnNlZCB3b29kIHByb2NlZHVyYWwgdGV4dHVyZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcGFyc2VkVGV4dHVyZSBkZWZpbmVzIHBhcnNlZCB0ZXh0dXJlIGRhdGFcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBjdXJyZW50IHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBkZWZpbmVzIHRoZSByb290IFVSTCBjb250YWluaW5nIHdvb2QgcHJvY2VkdXJhbCB0ZXh0dXJlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBhIHBhcnNlZCBXb29kIFByb2NlZHVyYWwgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHBhcnNlZFRleHR1cmU6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBXb29kUHJvY2VkdXJhbFRleHR1cmUge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKFxyXG4gICAgICAgICAgICAoKSA9PiBuZXcgV29vZFByb2NlZHVyYWxUZXh0dXJlKHBhcnNlZFRleHR1cmUubmFtZSwgcGFyc2VkVGV4dHVyZS5fc2l6ZSwgc2NlbmUsIHVuZGVmaW5lZCwgcGFyc2VkVGV4dHVyZS5fZ2VuZXJhdGVNaXBNYXBzKSxcclxuICAgICAgICAgICAgcGFyc2VkVGV4dHVyZSxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUmVnaXN0ZXJDbGFzcyhcIkJBQllMT04uV29vZFByb2NlZHVyYWxUZXh0dXJlXCIsIFdvb2RQcm9jZWR1cmFsVGV4dHVyZSk7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIFByb2NlZHVyYWxUZXh0dXJlc0xpYiBmcm9tIFwicHJvY2VkdXJhbC10ZXh0dXJlcy9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIExlZ2FjeSBzdXBwb3J0LCBkZWZpbmluZyB3aW5kb3cuQkFCWUxPTi5HcmlkTWF0ZXJpYWwuLi4gKGdsb2JhbCB2YXJpYWJsZSkuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OID0gKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OIHx8IHt9O1xyXG4gICAgZm9yIChjb25zdCBtYXQgaW4gUHJvY2VkdXJhbFRleHR1cmVzTGliKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW21hdF0gPSAoPGFueT5Qcm9jZWR1cmFsVGV4dHVyZXNMaWIpW21hdF07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJwcm9jZWR1cmFsLXRleHR1cmVzL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY19kZWNvcmF0b3JzX187IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xuICAgICAgdmFyIHJlYyA9IGVudi5zdGFjay5wb3AoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWMuZGlzcG9zZSAmJiByZWMuZGlzcG9zZS5jYWxsKHJlYy52YWx1ZSk7XG4gICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgcHJvY2VkdXJhbFRleHR1cmVzIGZyb20gXCJAbHRzL3Byb2NlZHVyYWwtdGV4dHVyZXMvbGVnYWN5L2xlZ2FjeVwiO1xyXG5leHBvcnQgeyBwcm9jZWR1cmFsVGV4dHVyZXMgfTtcclxuZXhwb3J0IGRlZmF1bHQgcHJvY2VkdXJhbFRleHR1cmVzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=