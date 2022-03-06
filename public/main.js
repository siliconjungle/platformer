/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://game-server/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/controller.mjs":
/*!****************************!*\
  !*** ./src/controller.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addActionDownListener\": () => (/* binding */ addActionDownListener),\n/* harmony export */   \"addActionUpListener\": () => (/* binding */ addActionUpListener),\n/* harmony export */   \"getActionState\": () => (/* binding */ getActionState),\n/* harmony export */   \"handleKeyDown\": () => (/* binding */ handleKeyDown),\n/* harmony export */   \"handleKeyUp\": () => (/* binding */ handleKeyUp),\n/* harmony export */   \"registerActions\": () => (/* binding */ registerActions),\n/* harmony export */   \"removeActionDownListener\": () => (/* binding */ removeActionDownListener),\n/* harmony export */   \"removeActionUpListener\": () => (/* binding */ removeActionUpListener)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n\n\nconst actionDownEmitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter()\nconst actionUpEmitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter()\n\n// Stores the state of each action as a true or false value\n// e.g. forward: true\nconst actionStates = {}\n// Stores the mapping between keys and actions\n// e.g. 47: 'forward'\nconst keyMapping = {}\n\n// As part of init, all of the actions being listened for should be registered.\nconst registerActions = actions => {\n  actions.forEach(({ name, keycode }) => {\n    keyMapping[keycode] = name\n    actionStates[name] = false\n  })\n}\n\nconst getActionState = name => {\n  return actionStates[name] || false\n}\n\nconst handleKeyDown = e => {\n  const actionName = keyMapping[e.which]\n  if (actionName) {\n    const prevState = actionStates[actionName]\n    if (!prevState) {\n      actionDownEmitter.emit(actionName)\n    }\n    actionStates[actionName] = true\n  }\n}\n\nconst handleKeyUp = e => {\n  const actionName = keyMapping[e.which]\n  if (actionName) {\n    actionStates[actionName] = false\n    actionUpEmitter.emit(actionName)\n  }\n}\n\nconst addActionDownListener = (actionName, callback) => {\n  actionDownEmitter.addListener(actionName, callback)\n}\n\nconst addActionUpListener = (actionName, callback) => {\n  actionUpEmitter.addListener(actionName, callback)\n}\n\nconst removeActionDownListener = (actionName, callback) => {\n  actionDownEmitter.removeListener(actionName, callback)\n}\n\nconst removeActionUpListener = (actionName, callback) => {\n  actionUpEmitter.removeListener(actionName, callback)\n}\n\n\n//# sourceURL=webpack://game-server/./src/controller.mjs?");

/***/ }),

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.mjs */ \"./src/controller.mjs\");\n\n\nconst $ = (id) => document.getElementById(id)\n\nconst startButton = $('start-btn')\n\nconst canvas = $('game')\nconst ctx = canvas.getContext('2d')\nctx.fillStyle = 'rgb(33, 35, 47)'\n\nctx.mozImageSmoothingEnabled = false;\nctx.webkitImageSmoothingEnabled = false;\nctx.msImageSmoothingEnabled = false;\nctx.imageSmoothingEnabled = false;\n\n// This is frail and if an image fails to load will load forever.\nconst loadImages = async (imagesData) =>\n  new Promise((resolve, reject) => {\n    const images = {}\n    imagesData.forEach(imageData => {\n      const image = new Image()\n      image.src = imageData.src\n      image.onload = () => {\n        images[imageData.name] = image\n        if (Object.keys(images).length === imagesData.length) {\n          resolve(images)\n        }\n      }\n    })\n  })\n\n// Does not work on Heroku\n// const loadSounds = async (soundsData) =>\n//   new Promise((resolve, reject) => {\n//     const sounds = {}\n//     soundsData.forEach(soundData => {\n//       const sound = new Audio(soundData.src)\n//       sounds[soundData.name] = sound\n//       if (Object.keys(sounds).length === soundsData.length) {\n//         resolve(sounds)\n//       }\n//     })\n//   })\n\nconst imagesData = [\n  {\n    src: 'move.png',\n    name: 'running',\n  },\n  {\n    src: 'jump.png',\n    name: 'jump',\n  },\n  {\n    src: 'fall.png',\n    name: 'fall',\n  },\n  {\n    src: 'land.png',\n    name: 'land',\n  },\n  {\n    src: 'ground.png',\n    name: 'ground',\n  },\n  {\n    src: 'background.png',\n    name: 'background',\n  },\n  {\n    src: 'avatar.png',\n    name: 'avatar',\n  },\n  {\n    src: 'boss.png',\n    name: 'boss',\n  },\n]\n\nconst soundsData = [\n  {\n    src: 'music.wav',\n    name: 'music',\n  },\n]\n\nlet running = false\nlet images = null\nlet sounds = null\n\nconst PLAYER_WIDTH = 32\nconst PLAYER_HEIGHT = 50\nconst AVATAR_WIDTH = 40\nconst AVATAR_HEIGHT = 40\nconst FRAMES = 8\n\nconst FRAMES_AVATAR = 15\n\nconst GRAVITY = 35\n\nlet lastTime = (new Date()).getTime()\nlet currentTime = 0\nlet dt = 0\n\nconst START_Y = canvas.height - PLAYER_HEIGHT * 2 - 145\nconst MAX_Y_SPEED = 60\nconst INITIAL_JUMP_SPEED = -10\n\nconst player = {\n  x: PLAYER_WIDTH * 2,\n  y: START_Y,\n  ySpeed: 0,\n  frame: 0,\n  accumulator: 0,\n  fps: 8,\n  frameAvatar: 0,\n  accumulatorAvatar: 0,\n  fpsAvatar: 8,\n  grounded: false,\n  sprite: 'running',\n}\n\ndocument.addEventListener('keydown', (e) => {\n  ;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.handleKeyDown)(e)\n}, false)\n\ndocument.addEventListener('keyup', e => {\n  ;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.handleKeyUp)(e)\n}, false)\n\n;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.registerActions)([\n  {\n    name: 'jump',\n    keycode: '32',\n  },\n])\n\n;(0,_controller_mjs__WEBPACK_IMPORTED_MODULE_0__.addActionDownListener)('jump', () => {\n  if (player.grounded) {\n    player.ySpeed = INITIAL_JUMP_SPEED\n    player.grounded = false\n    player.sprite = 'jump'\n    player.frame = 0\n    player.accumulator = 0\n    player.fps = 8\n  }\n})\n\nconst getImageByName = name => images?.[name] || null\n\n// const getSoundByName = name => sounds?.[name] || null\n\nconst init = async () => {\n  images = await loadImages(imagesData)\n  // sounds = await loadSounds(soundsData)\n\n  // const music = getSoundByName('music')\n  //\n  // music.addEventListener('ended', function () {\n  //   this.currentTime = 0\n  //   this.play()\n  // }, false)\n  // music.play()\n\n  window.requestAnimationFrame(update)\n}\n\nconst update = () => {\n  window.requestAnimationFrame(update)\n\n  currentTime = (new Date()).getTime()\n  dt = (currentTime - lastTime) / 1000\n\n  player.accumulator += dt\n  while (player.accumulator >= (1 / player.fps)) {\n    player.accumulator -= (1 / player.fps)\n    player.frame++\n  }\n  if (player.sprite === 'running') {\n    player.frame = player.frame % FRAMES\n  } else if (player.sprite === 'land' && player.frame > 1) {\n    player.sprite = 'running'\n    player.accumulator = 0\n    player.frame = 0\n    player.fps = 8\n  } else if (player.frame > 1) {\n    player.frame = 1\n  }\n\n  player.accumulatorAvatar += dt\n  while (player.accumulatorAvatar >= (1 / player.fpsAvatar)) {\n    player.accumulatorAvatar -= (1 / player.fpsAvatar)\n    player.frameAvatar++\n  }\n  player.frameAvatar = player.frameAvatar % FRAMES_AVATAR\n\n  player.ySpeed += GRAVITY * dt\n  player.ySpeed = Math.min(player.ySpeed, MAX_Y_SPEED)\n\n  player.y += player.ySpeed\n\n  if (player.y >= START_Y) {\n    player.ySpeed = 0\n    player.y = START_Y\n    player.grounded = true\n    if (player.sprite === 'jump' || player.sprite === 'fall') {\n      player.sprite = 'land'\n      player.frame = 0\n      player.accumulator = 0\n      player.fps = 16\n    }\n  }\n\n  if (player.ySpeed > 0 && player.sprite !== 'fall') {\n    player.sprite = 'fall'\n    player.frame = 0\n    player.accumulator = 0\n  }\n\n  render()\n\n  lastTime = currentTime\n}\n\nconst render = () => {\n  const character = getImageByName(player.sprite)\n  const ground = getImageByName('ground')\n  const background = getImageByName('background')\n  const avatar = getImageByName('avatar')\n  const boss = getImageByName('boss')\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillRect(0, 0, canvas.width, canvas.height)\n\n  ctx.drawImage(\n    background,\n    0,\n    0,\n    canvas.width,\n    canvas.height * 0.75,\n  )\n\n  ctx.drawImage(\n    avatar,\n    player.frameAvatar * AVATAR_WIDTH,\n    0,\n    AVATAR_WIDTH,\n    AVATAR_HEIGHT,\n    8,\n    8,\n    AVATAR_WIDTH * 2,\n    AVATAR_HEIGHT * 2,\n  )\n\n  if (player.sprite === 'running' || player.sprite === 'fall') {\n    ctx.drawImage(\n      character,\n      player.frame * PLAYER_WIDTH,\n      0,\n      PLAYER_WIDTH,\n      PLAYER_HEIGHT,\n      player.x,\n      player.y,\n      PLAYER_WIDTH * 2,\n      PLAYER_HEIGHT * 2,\n    )\n  } else {\n    ctx.drawImage(\n      character,\n      player.x,\n      player.y,\n      PLAYER_WIDTH * 2,\n      PLAYER_HEIGHT * 2,\n    )\n  }\n\n  ctx.drawImage(\n    ground,\n    0,\n    canvas.height - ground.height * 2,\n    ground.width * 2,\n    ground.height * 2,\n  )\n\n  ctx.drawImage(\n    boss,\n    canvas.width - boss.width * 2,\n    canvas.height - ground.height * 2 - boss.height * 2,\n    boss.width * 2,\n    boss.height * 2,\n  )\n}\n\nstartButton.onclick = async () => {\n  if (!running) {\n    running = true\n    await init()\n  }\n}\n\n\n//# sourceURL=webpack://game-server/./src/index.mjs?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.mjs");
/******/ 	
/******/ })()
;