"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkgame_server"] = self["webpackChunkgame_server"] || []).push([["src_levels_leap-of-faith_mjs"],{

/***/ "./src/levels/leap-of-faith.mjs":
/*!**************************************!*\
  !*** ./src/levels/leap-of-faith.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller.mjs */ \"./src/controller.mjs\");\n/* harmony import */ var _textures_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../textures.mjs */ \"./src/textures.mjs\");\n/* harmony import */ var _entities_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities.mjs */ \"./src/entities.mjs\");\n/* harmony import */ var _player_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../player.mjs */ \"./src/player.mjs\");\n/* harmony import */ var _texture_data_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../texture-data.mjs */ \"./src/texture-data.mjs\");\n/* harmony import */ var _collision_map_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../collision-map.mjs */ \"./src/collision-map.mjs\");\n\n\n\n\n\n\n\nconst $ = (id) => document.getElementById(id)\n\nconst canvas = $('game')\nconst ctx = canvas.getContext('2d')\nctx.fillStyle = 'rgb(33, 35, 47)'\n\nctx.mozImageSmoothingEnabled = false;\nctx.webkitImageSmoothingEnabled = false;\nctx.msImageSmoothingEnabled = false;\nctx.imageSmoothingEnabled = false;\n\nconst texturesData = [\n  ..._texture_data_mjs__WEBPACK_IMPORTED_MODULE_4__.playerTextures,\n  {\n    src: 'ground4.png',\n    name: 'ground4',\n  },\n  {\n    src: 'background.png',\n    name: 'background',\n  },\n  {\n    src: 'collision-map-leap-of-faith.png',\n    name: 'collision-map',\n  },\n]\n\nlet lastTime = (new Date()).getTime()\nlet currentTime = 0\nlet dt = 0\n\nconst player = (0,_player_mjs__WEBPACK_IMPORTED_MODULE_3__.createPlayer)(64, canvas.height - 400)\n;(0,_entities_mjs__WEBPACK_IMPORTED_MODULE_2__.addEntity)(player)\n\ndocument.addEventListener('keydown', (e) => {\n  ;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.handleKeyDown)(e)\n}, false)\n\ndocument.addEventListener('keyup', e => {\n  ;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.handleKeyUp)(e)\n}, false)\n\n;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.registerActions)([\n  {\n    name: 'jump',\n    keycode: '32',\n  },\n  {\n    name: 'left',\n    keycode: '74',\n  },\n  {\n    name: 'right',\n    keycode: '76',\n  },\n  {\n    name: 'down',\n    keycode: '75',\n  },\n  {\n    name: 'restart',\n    keycode: '82',\n  },\n])\n\n;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.addActionDownListener)('jump', () => {\n  player.jump()\n})\n\n;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.addActionDownListener)(('restart'), () => {\n  player.respawn()\n})\n\nconst init = async () => {\n  await (0,_textures_mjs__WEBPACK_IMPORTED_MODULE_1__.loadTextures)(texturesData)\n  ;(0,_collision_map_mjs__WEBPACK_IMPORTED_MODULE_5__.setCollisionMap)((0,_textures_mjs__WEBPACK_IMPORTED_MODULE_1__.getTextureByName)('collision-map'))\n\n  // Just know that any lag will make the player fall through the floor.\n  lastTime = (new Date()).getTime()\n  currentTime = 0\n  dt = 0\n\n  window.requestAnimationFrame(update)\n}\n\nconst update = () => {\n  window.requestAnimationFrame(update)\n\n  currentTime = (new Date()).getTime()\n  dt = (currentTime - lastTime) / 1000\n\n  ;(0,_entities_mjs__WEBPACK_IMPORTED_MODULE_2__.updateEntities)(dt)\n\n  render()\n\n  lastTime = currentTime\n}\n\nconst render = () => {\n  const ground4 = (0,_textures_mjs__WEBPACK_IMPORTED_MODULE_1__.getTextureByName)('ground4')\n  const background = (0,_textures_mjs__WEBPACK_IMPORTED_MODULE_1__.getTextureByName)('background')\n\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillRect(0, 0, canvas.width, canvas.height)\n\n  ctx.drawImage(\n    background,\n    0,\n    0,\n    canvas.width,\n    canvas.height * 0.75,\n  )\n\n  ;(0,_entities_mjs__WEBPACK_IMPORTED_MODULE_2__.renderEntities)(ctx, canvas)\n\n  ctx.drawImage(\n    ground4,\n    0,\n    canvas.height - ground4.height * 2,\n    ground4.width * 2,\n    ground4.height * 2,\n  )\n\n  ctx.drawImage(\n    ground4,\n    canvas.width - ground4.width * 2,\n    canvas.height - ground4.height * 2,\n    ground4.width * 2,\n    ground4.height * 2,\n  )\n}\n\ninit().then(() => {\n\n}).catch(() => {\n\n})\n\n\n//# sourceURL=webpack://game-server/./src/levels/leap-of-faith.mjs?");

/***/ })

}]);