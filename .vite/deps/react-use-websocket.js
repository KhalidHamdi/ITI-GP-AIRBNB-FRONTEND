import {
  require_react_dom
} from "./chunk-UHINIFCJ.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-use-websocket/dist/lib/constants.js
var require_constants = __commonJS({
  "node_modules/react-use-websocket/dist/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEventSourceSupported = exports.isReactNative = exports.ReadyState = exports.DEFAULT_HEARTBEAT = exports.UNPARSABLE_JSON_OBJECT = exports.DEFAULT_RECONNECT_INTERVAL_MS = exports.DEFAULT_RECONNECT_LIMIT = exports.SOCKET_IO_PING_CODE = exports.SOCKET_IO_PATH = exports.SOCKET_IO_PING_INTERVAL = exports.DEFAULT_EVENT_SOURCE_OPTIONS = exports.EMPTY_EVENT_HANDLERS = exports.DEFAULT_OPTIONS = void 0;
    var MILLISECONDS = 1;
    var SECONDS = 1e3 * MILLISECONDS;
    exports.DEFAULT_OPTIONS = {};
    exports.EMPTY_EVENT_HANDLERS = {};
    exports.DEFAULT_EVENT_SOURCE_OPTIONS = {
      withCredentials: false,
      events: exports.EMPTY_EVENT_HANDLERS
    };
    exports.SOCKET_IO_PING_INTERVAL = 25 * SECONDS;
    exports.SOCKET_IO_PATH = "/socket.io/?EIO=3&transport=websocket";
    exports.SOCKET_IO_PING_CODE = "2";
    exports.DEFAULT_RECONNECT_LIMIT = 20;
    exports.DEFAULT_RECONNECT_INTERVAL_MS = 5e3;
    exports.UNPARSABLE_JSON_OBJECT = {};
    exports.DEFAULT_HEARTBEAT = {
      message: "ping",
      timeout: 6e4,
      interval: 25e3
    };
    var ReadyState;
    (function(ReadyState2) {
      ReadyState2[ReadyState2["UNINSTANTIATED"] = -1] = "UNINSTANTIATED";
      ReadyState2[ReadyState2["CONNECTING"] = 0] = "CONNECTING";
      ReadyState2[ReadyState2["OPEN"] = 1] = "OPEN";
      ReadyState2[ReadyState2["CLOSING"] = 2] = "CLOSING";
      ReadyState2[ReadyState2["CLOSED"] = 3] = "CLOSED";
    })(ReadyState = exports.ReadyState || (exports.ReadyState = {}));
    var eventSourceSupported = function() {
      try {
        return "EventSource" in globalThis;
      } catch (e) {
        return false;
      }
    };
    exports.isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
    exports.isEventSourceSupported = !exports.isReactNative && eventSourceSupported();
  }
});

// node_modules/react-use-websocket/dist/lib/globals.js
var require_globals = __commonJS({
  "node_modules/react-use-websocket/dist/lib/globals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetWebSockets = exports.sharedWebSockets = void 0;
    exports.sharedWebSockets = {};
    var resetWebSockets = function(url) {
      if (url && exports.sharedWebSockets.hasOwnProperty(url)) {
        delete exports.sharedWebSockets[url];
      } else {
        for (var url_1 in exports.sharedWebSockets) {
          if (exports.sharedWebSockets.hasOwnProperty(url_1)) {
            delete exports.sharedWebSockets[url_1];
          }
        }
      }
    };
    exports.resetWebSockets = resetWebSockets;
  }
});

// node_modules/react-use-websocket/dist/lib/socket-io.js
var require_socket_io = __commonJS({
  "node_modules/react-use-websocket/dist/lib/socket-io.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setUpSocketIOPing = exports.appendQueryParams = exports.parseSocketIOUrl = void 0;
    var constants_1 = require_constants();
    var parseSocketIOUrl = function(url) {
      if (url) {
        var isSecure = /^https|wss/.test(url);
        var strippedProtocol = url.replace(/^(https?|wss?)(:\/\/)?/, "");
        var removedFinalBackSlack = strippedProtocol.replace(/\/$/, "");
        var protocol = isSecure ? "wss" : "ws";
        return "".concat(protocol, "://").concat(removedFinalBackSlack).concat(constants_1.SOCKET_IO_PATH);
      } else if (url === "") {
        var isSecure = /^https/.test(window.location.protocol);
        var protocol = isSecure ? "wss" : "ws";
        var port = window.location.port ? ":".concat(window.location.port) : "";
        return "".concat(protocol, "://").concat(window.location.hostname).concat(port).concat(constants_1.SOCKET_IO_PATH);
      }
      return url;
    };
    exports.parseSocketIOUrl = parseSocketIOUrl;
    var appendQueryParams = function(url, params) {
      if (params === void 0) {
        params = {};
      }
      var hasParamsRegex = /\?([\w]+=[\w]+)/;
      var alreadyHasParams = hasParamsRegex.test(url);
      var stringified = "".concat(Object.entries(params).reduce(function(next, _a) {
        var key = _a[0], value = _a[1];
        return next + "".concat(key, "=").concat(value, "&");
      }, "").slice(0, -1));
      return "".concat(url).concat(alreadyHasParams ? "&" : "?").concat(stringified);
    };
    exports.appendQueryParams = appendQueryParams;
    var setUpSocketIOPing = function(sendMessage, interval) {
      if (interval === void 0) {
        interval = constants_1.SOCKET_IO_PING_INTERVAL;
      }
      var ping = function() {
        return sendMessage(constants_1.SOCKET_IO_PING_CODE);
      };
      return window.setInterval(ping, interval);
    };
    exports.setUpSocketIOPing = setUpSocketIOPing;
  }
});

// node_modules/react-use-websocket/dist/lib/heartbeat.js
var require_heartbeat = __commonJS({
  "node_modules/react-use-websocket/dist/lib/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.heartbeat = void 0;
    var constants_1 = require_constants();
    function heartbeat(ws, options) {
      var _a = options || {}, _b = _a.interval, interval = _b === void 0 ? constants_1.DEFAULT_HEARTBEAT.interval : _b, _c = _a.timeout, timeout = _c === void 0 ? constants_1.DEFAULT_HEARTBEAT.timeout : _c, _d = _a.message, message = _d === void 0 ? constants_1.DEFAULT_HEARTBEAT.message : _d;
      var messageAccepted = false;
      var pingTimer = setInterval(function() {
        try {
          if (typeof message === "function") {
            ws.send(message());
          } else {
            ws.send(message);
          }
        } catch (error) {
        }
      }, interval);
      var timeoutTimer = setInterval(function() {
        if (!messageAccepted) {
          ws.close();
        } else {
          messageAccepted = false;
        }
      }, timeout);
      ws.addEventListener("close", function() {
        clearInterval(pingTimer);
        clearInterval(timeoutTimer);
      });
      return function() {
        messageAccepted = true;
      };
    }
    exports.heartbeat = heartbeat;
  }
});

// node_modules/react-use-websocket/dist/lib/manage-subscribers.js
var require_manage_subscribers = __commonJS({
  "node_modules/react-use-websocket/dist/lib/manage-subscribers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetSubscribers = exports.removeSubscriber = exports.addSubscriber = exports.hasSubscribers = exports.getSubscribers = void 0;
    var subscribers = {};
    var EMPTY_LIST = [];
    var getSubscribers = function(url) {
      if ((0, exports.hasSubscribers)(url)) {
        return Array.from(subscribers[url]);
      }
      return EMPTY_LIST;
    };
    exports.getSubscribers = getSubscribers;
    var hasSubscribers = function(url) {
      var _a;
      return ((_a = subscribers[url]) === null || _a === void 0 ? void 0 : _a.size) > 0;
    };
    exports.hasSubscribers = hasSubscribers;
    var addSubscriber = function(url, subscriber) {
      subscribers[url] = subscribers[url] || /* @__PURE__ */ new Set();
      subscribers[url].add(subscriber);
    };
    exports.addSubscriber = addSubscriber;
    var removeSubscriber = function(url, subscriber) {
      subscribers[url].delete(subscriber);
    };
    exports.removeSubscriber = removeSubscriber;
    var resetSubscribers = function(url) {
      if (url && subscribers.hasOwnProperty(url)) {
        delete subscribers[url];
      } else {
        for (var url_1 in subscribers) {
          if (subscribers.hasOwnProperty(url_1)) {
            delete subscribers[url_1];
          }
        }
      }
    };
    exports.resetSubscribers = resetSubscribers;
  }
});

// node_modules/react-use-websocket/dist/lib/util.js
var require_util = __commonJS({
  "node_modules/react-use-websocket/dist/lib/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetGlobalState = exports.assertIsWebSocket = void 0;
    var globals_1 = require_globals();
    var manage_subscribers_1 = require_manage_subscribers();
    function assertIsWebSocket(webSocketInstance, skip) {
      if (!skip && webSocketInstance instanceof WebSocket === false)
        throw new Error("");
    }
    exports.assertIsWebSocket = assertIsWebSocket;
    function resetGlobalState(url) {
      (0, manage_subscribers_1.resetSubscribers)(url);
      (0, globals_1.resetWebSockets)(url);
    }
    exports.resetGlobalState = resetGlobalState;
  }
});

// node_modules/react-use-websocket/dist/lib/attach-listener.js
var require_attach_listener = __commonJS({
  "node_modules/react-use-websocket/dist/lib/attach-listener.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.attachListeners = void 0;
    var socket_io_1 = require_socket_io();
    var heartbeat_1 = require_heartbeat();
    var constants_1 = require_constants();
    var util_1 = require_util();
    var bindMessageHandler = function(webSocketInstance, optionsRef, setLastMessage) {
      var heartbeatCb;
      if (optionsRef.current.heartbeat && webSocketInstance instanceof WebSocket) {
        var heartbeatOptions = typeof optionsRef.current.heartbeat === "boolean" ? void 0 : optionsRef.current.heartbeat;
        heartbeatCb = (0, heartbeat_1.heartbeat)(webSocketInstance, heartbeatOptions);
      }
      webSocketInstance.onmessage = function(message) {
        var _a;
        heartbeatCb === null || heartbeatCb === void 0 ? void 0 : heartbeatCb();
        optionsRef.current.onMessage && optionsRef.current.onMessage(message);
        if (typeof optionsRef.current.filter === "function" && optionsRef.current.filter(message) !== true) {
          return;
        }
        if (optionsRef.current.heartbeat && typeof optionsRef.current.heartbeat !== "boolean" && ((_a = optionsRef.current.heartbeat) === null || _a === void 0 ? void 0 : _a.returnMessage) === message.data)
          return;
        setLastMessage(message);
      };
    };
    var bindOpenHandler = function(webSocketInstance, optionsRef, setReadyState, reconnectCount) {
      webSocketInstance.onopen = function(event) {
        optionsRef.current.onOpen && optionsRef.current.onOpen(event);
        reconnectCount.current = 0;
        setReadyState(constants_1.ReadyState.OPEN);
      };
    };
    var bindCloseHandler = function(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount) {
      if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
        return function() {
        };
      }
      (0, util_1.assertIsWebSocket)(webSocketInstance, optionsRef.current.skipAssert);
      var reconnectTimeout;
      webSocketInstance.onclose = function(event) {
        var _a;
        optionsRef.current.onClose && optionsRef.current.onClose(event);
        setReadyState(constants_1.ReadyState.CLOSED);
        if (optionsRef.current.shouldReconnect && optionsRef.current.shouldReconnect(event)) {
          var reconnectAttempts = (_a = optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT;
          if (reconnectCount.current < reconnectAttempts) {
            var nextReconnectInterval = typeof optionsRef.current.reconnectInterval === "function" ? optionsRef.current.reconnectInterval(reconnectCount.current) : optionsRef.current.reconnectInterval;
            reconnectTimeout = window.setTimeout(function() {
              reconnectCount.current++;
              reconnect();
            }, nextReconnectInterval !== null && nextReconnectInterval !== void 0 ? nextReconnectInterval : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
          } else {
            optionsRef.current.onReconnectStop && optionsRef.current.onReconnectStop(reconnectAttempts);
            console.warn("Max reconnect attempts of ".concat(reconnectAttempts, " exceeded"));
          }
        }
      };
      return function() {
        return reconnectTimeout && window.clearTimeout(reconnectTimeout);
      };
    };
    var bindErrorHandler = function(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount) {
      var reconnectTimeout;
      webSocketInstance.onerror = function(error) {
        var _a;
        optionsRef.current.onError && optionsRef.current.onError(error);
        if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
          optionsRef.current.onClose && optionsRef.current.onClose(__assign(__assign({}, error), { code: 1006, reason: "An error occurred with the EventSource: ".concat(error), wasClean: false }));
          setReadyState(constants_1.ReadyState.CLOSED);
          webSocketInstance.close();
        }
        if (optionsRef.current.retryOnError) {
          if (reconnectCount.current < ((_a = optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT)) {
            var nextReconnectInterval = typeof optionsRef.current.reconnectInterval === "function" ? optionsRef.current.reconnectInterval(reconnectCount.current) : optionsRef.current.reconnectInterval;
            reconnectTimeout = window.setTimeout(function() {
              reconnectCount.current++;
              reconnect();
            }, nextReconnectInterval !== null && nextReconnectInterval !== void 0 ? nextReconnectInterval : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
          } else {
            optionsRef.current.onReconnectStop && optionsRef.current.onReconnectStop(optionsRef.current.reconnectAttempts);
            console.warn("Max reconnect attempts of ".concat(optionsRef.current.reconnectAttempts, " exceeded"));
          }
        }
      };
      return function() {
        return reconnectTimeout && window.clearTimeout(reconnectTimeout);
      };
    };
    var attachListeners = function(webSocketInstance, setters, optionsRef, reconnect, reconnectCount, sendMessage) {
      var setLastMessage = setters.setLastMessage, setReadyState = setters.setReadyState;
      var interval;
      var cancelReconnectOnClose;
      var cancelReconnectOnError;
      if (optionsRef.current.fromSocketIO) {
        interval = (0, socket_io_1.setUpSocketIOPing)(sendMessage);
      }
      bindMessageHandler(webSocketInstance, optionsRef, setLastMessage);
      bindOpenHandler(webSocketInstance, optionsRef, setReadyState, reconnectCount);
      cancelReconnectOnClose = bindCloseHandler(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount);
      cancelReconnectOnError = bindErrorHandler(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount);
      return function() {
        setReadyState(constants_1.ReadyState.CLOSING);
        cancelReconnectOnClose();
        cancelReconnectOnError();
        webSocketInstance.close();
        if (interval)
          clearInterval(interval);
      };
    };
    exports.attachListeners = attachListeners;
  }
});

// node_modules/react-use-websocket/dist/lib/attach-shared-listeners.js
var require_attach_shared_listeners = __commonJS({
  "node_modules/react-use-websocket/dist/lib/attach-shared-listeners.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.attachSharedListeners = void 0;
    var globals_1 = require_globals();
    var constants_1 = require_constants();
    var manage_subscribers_1 = require_manage_subscribers();
    var socket_io_1 = require_socket_io();
    var heartbeat_1 = require_heartbeat();
    var bindMessageHandler = function(webSocketInstance, url, heartbeatOptions) {
      var onMessageCb;
      if (heartbeatOptions && webSocketInstance instanceof WebSocket) {
        onMessageCb = (0, heartbeat_1.heartbeat)(webSocketInstance, typeof heartbeatOptions === "boolean" ? void 0 : heartbeatOptions);
      }
      webSocketInstance.onmessage = function(message) {
        onMessageCb === null || onMessageCb === void 0 ? void 0 : onMessageCb();
        (0, manage_subscribers_1.getSubscribers)(url).forEach(function(subscriber) {
          if (subscriber.optionsRef.current.onMessage) {
            subscriber.optionsRef.current.onMessage(message);
          }
          if (typeof subscriber.optionsRef.current.filter === "function" && subscriber.optionsRef.current.filter(message) !== true) {
            return;
          }
          if (heartbeatOptions && typeof heartbeatOptions !== "boolean" && (heartbeatOptions === null || heartbeatOptions === void 0 ? void 0 : heartbeatOptions.returnMessage) === message.data)
            return;
          subscriber.setLastMessage(message);
        });
      };
    };
    var bindOpenHandler = function(webSocketInstance, url) {
      webSocketInstance.onopen = function(event) {
        (0, manage_subscribers_1.getSubscribers)(url).forEach(function(subscriber) {
          subscriber.reconnectCount.current = 0;
          if (subscriber.optionsRef.current.onOpen) {
            subscriber.optionsRef.current.onOpen(event);
          }
          subscriber.setReadyState(constants_1.ReadyState.OPEN);
        });
      };
    };
    var bindCloseHandler = function(webSocketInstance, url) {
      if (webSocketInstance instanceof WebSocket) {
        webSocketInstance.onclose = function(event) {
          (0, manage_subscribers_1.getSubscribers)(url).forEach(function(subscriber) {
            if (subscriber.optionsRef.current.onClose) {
              subscriber.optionsRef.current.onClose(event);
            }
            subscriber.setReadyState(constants_1.ReadyState.CLOSED);
          });
          delete globals_1.sharedWebSockets[url];
          (0, manage_subscribers_1.getSubscribers)(url).forEach(function(subscriber) {
            var _a;
            if (subscriber.optionsRef.current.shouldReconnect && subscriber.optionsRef.current.shouldReconnect(event)) {
              var reconnectAttempts = (_a = subscriber.optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT;
              if (subscriber.reconnectCount.current < reconnectAttempts) {
                var nextReconnectInterval = typeof subscriber.optionsRef.current.reconnectInterval === "function" ? subscriber.optionsRef.current.reconnectInterval(subscriber.reconnectCount.current) : subscriber.optionsRef.current.reconnectInterval;
                setTimeout(function() {
                  subscriber.reconnectCount.current++;
                  subscriber.reconnect.current();
                }, nextReconnectInterval !== null && nextReconnectInterval !== void 0 ? nextReconnectInterval : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
              } else {
                subscriber.optionsRef.current.onReconnectStop && subscriber.optionsRef.current.onReconnectStop(subscriber.optionsRef.current.reconnectAttempts);
                console.warn("Max reconnect attempts of ".concat(reconnectAttempts, " exceeded"));
              }
            }
          });
        };
      }
    };
    var bindErrorHandler = function(webSocketInstance, url) {
      webSocketInstance.onerror = function(error) {
        (0, manage_subscribers_1.getSubscribers)(url).forEach(function(subscriber) {
          if (subscriber.optionsRef.current.onError) {
            subscriber.optionsRef.current.onError(error);
          }
          if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
            subscriber.optionsRef.current.onClose && subscriber.optionsRef.current.onClose(__assign(__assign({}, error), { code: 1006, reason: "An error occurred with the EventSource: ".concat(error), wasClean: false }));
            subscriber.setReadyState(constants_1.ReadyState.CLOSED);
          }
        });
        if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
          webSocketInstance.close();
        }
      };
    };
    var attachSharedListeners = function(webSocketInstance, url, optionsRef, sendMessage) {
      var interval;
      if (optionsRef.current.fromSocketIO) {
        interval = (0, socket_io_1.setUpSocketIOPing)(sendMessage);
      }
      bindMessageHandler(webSocketInstance, url, optionsRef.current.heartbeat);
      bindCloseHandler(webSocketInstance, url);
      bindOpenHandler(webSocketInstance, url);
      bindErrorHandler(webSocketInstance, url);
      return function() {
        if (interval)
          clearInterval(interval);
      };
    };
    exports.attachSharedListeners = attachSharedListeners;
  }
});

// node_modules/react-use-websocket/dist/lib/create-or-join.js
var require_create_or_join = __commonJS({
  "node_modules/react-use-websocket/dist/lib/create-or-join.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOrJoinSocket = void 0;
    var globals_1 = require_globals();
    var constants_1 = require_constants();
    var attach_listener_1 = require_attach_listener();
    var attach_shared_listeners_1 = require_attach_shared_listeners();
    var manage_subscribers_1 = require_manage_subscribers();
    var cleanSubscribers = function(url, subscriber, optionsRef, setReadyState, clearSocketIoPingInterval) {
      return function() {
        (0, manage_subscribers_1.removeSubscriber)(url, subscriber);
        if (!(0, manage_subscribers_1.hasSubscribers)(url)) {
          try {
            var socketLike = globals_1.sharedWebSockets[url];
            if (socketLike instanceof WebSocket) {
              socketLike.onclose = function(event) {
                if (optionsRef.current.onClose) {
                  optionsRef.current.onClose(event);
                }
                setReadyState(constants_1.ReadyState.CLOSED);
              };
            }
            socketLike.close();
          } catch (e) {
          }
          if (clearSocketIoPingInterval)
            clearSocketIoPingInterval();
          delete globals_1.sharedWebSockets[url];
        }
      };
    };
    var createOrJoinSocket = function(webSocketRef, url, setReadyState, optionsRef, setLastMessage, startRef, reconnectCount, sendMessage) {
      if (!constants_1.isEventSourceSupported && optionsRef.current.eventSourceOptions) {
        if (constants_1.isReactNative) {
          throw new Error("EventSource is not supported in ReactNative");
        } else {
          throw new Error("EventSource is not supported");
        }
      }
      if (optionsRef.current.share) {
        var clearSocketIoPingInterval = null;
        if (globals_1.sharedWebSockets[url] === void 0) {
          globals_1.sharedWebSockets[url] = optionsRef.current.eventSourceOptions ? new EventSource(url, optionsRef.current.eventSourceOptions) : new WebSocket(url, optionsRef.current.protocols);
          webSocketRef.current = globals_1.sharedWebSockets[url];
          setReadyState(constants_1.ReadyState.CONNECTING);
          clearSocketIoPingInterval = (0, attach_shared_listeners_1.attachSharedListeners)(globals_1.sharedWebSockets[url], url, optionsRef, sendMessage);
        } else {
          webSocketRef.current = globals_1.sharedWebSockets[url];
          setReadyState(globals_1.sharedWebSockets[url].readyState);
        }
        var subscriber = {
          setLastMessage,
          setReadyState,
          optionsRef,
          reconnectCount,
          reconnect: startRef
        };
        (0, manage_subscribers_1.addSubscriber)(url, subscriber);
        return cleanSubscribers(url, subscriber, optionsRef, setReadyState, clearSocketIoPingInterval);
      } else {
        webSocketRef.current = optionsRef.current.eventSourceOptions ? new EventSource(url, optionsRef.current.eventSourceOptions) : new WebSocket(url, optionsRef.current.protocols);
        setReadyState(constants_1.ReadyState.CONNECTING);
        if (!webSocketRef.current) {
          throw new Error("WebSocket failed to be created");
        }
        return (0, attach_listener_1.attachListeners)(webSocketRef.current, {
          setLastMessage,
          setReadyState
        }, optionsRef, startRef.current, reconnectCount, sendMessage);
      }
    };
    exports.createOrJoinSocket = createOrJoinSocket;
  }
});

// node_modules/react-use-websocket/dist/lib/get-url.js
var require_get_url = __commonJS({
  "node_modules/react-use-websocket/dist/lib/get-url.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUrl = void 0;
    var socket_io_1 = require_socket_io();
    var constants_1 = require_constants();
    var waitFor = function(duration) {
      return new Promise(function(resolve) {
        return window.setTimeout(resolve, duration);
      });
    };
    var getUrl = function(url, optionsRef, retriedAttempts) {
      if (retriedAttempts === void 0) {
        retriedAttempts = 0;
      }
      return __awaiter(void 0, void 0, void 0, function() {
        var convertedUrl, e_1, reconnectLimit, nextReconnectInterval, parsedUrl, parsedWithQueryParams;
        var _a, _b, _c;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              if (!(typeof url === "function")) return [3, 10];
              _d.label = 1;
            case 1:
              _d.trys.push([1, 3, , 9]);
              return [4, url()];
            case 2:
              convertedUrl = _d.sent();
              return [3, 9];
            case 3:
              e_1 = _d.sent();
              if (!optionsRef.current.retryOnError) return [3, 7];
              reconnectLimit = (_a = optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT;
              if (!(retriedAttempts < reconnectLimit)) return [3, 5];
              nextReconnectInterval = typeof optionsRef.current.reconnectInterval === "function" ? optionsRef.current.reconnectInterval(retriedAttempts) : optionsRef.current.reconnectInterval;
              return [4, waitFor(nextReconnectInterval !== null && nextReconnectInterval !== void 0 ? nextReconnectInterval : constants_1.DEFAULT_RECONNECT_INTERVAL_MS)];
            case 4:
              _d.sent();
              return [2, (0, exports.getUrl)(url, optionsRef, retriedAttempts + 1)];
            case 5:
              (_c = (_b = optionsRef.current).onReconnectStop) === null || _c === void 0 ? void 0 : _c.call(_b, retriedAttempts);
              return [2, null];
            case 6:
              return [3, 8];
            case 7:
              return [2, null];
            case 8:
              return [3, 9];
            case 9:
              return [3, 11];
            case 10:
              convertedUrl = url;
              _d.label = 11;
            case 11:
              parsedUrl = optionsRef.current.fromSocketIO ? (0, socket_io_1.parseSocketIOUrl)(convertedUrl) : convertedUrl;
              parsedWithQueryParams = optionsRef.current.queryParams ? (0, socket_io_1.appendQueryParams)(parsedUrl, optionsRef.current.queryParams) : parsedUrl;
              return [2, parsedWithQueryParams];
          }
        });
      });
    };
    exports.getUrl = getUrl;
  }
});

// node_modules/react-use-websocket/dist/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/react-use-websocket/dist/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.websocketWrapper = void 0;
    var websocketWrapper = function(webSocket, start) {
      return new Proxy(webSocket, {
        get: function(obj, key) {
          var val = obj[key];
          if (key === "reconnect")
            return start;
          if (typeof val === "function") {
            console.error("Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket.");
            return function() {
            };
          } else {
            return val;
          }
        },
        set: function(obj, key, val) {
          if (/^on/.test(key)) {
            console.warn("The websocket's event handlers should be defined through the options object passed into useWebSocket.");
            return false;
          } else {
            obj[key] = val;
            return true;
          }
        }
      });
    };
    exports.websocketWrapper = websocketWrapper;
    exports.default = exports.websocketWrapper;
  }
});

// node_modules/react-use-websocket/dist/lib/use-websocket.js
var require_use_websocket = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-websocket.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWebSocket = void 0;
    var react_1 = require_react();
    var react_dom_1 = require_react_dom();
    var constants_1 = require_constants();
    var create_or_join_1 = require_create_or_join();
    var get_url_1 = require_get_url();
    var proxy_1 = __importDefault(require_proxy());
    var util_1 = require_util();
    var useWebSocket = function(url, options, connect) {
      if (options === void 0) {
        options = constants_1.DEFAULT_OPTIONS;
      }
      if (connect === void 0) {
        connect = true;
      }
      var _a = (0, react_1.useState)(null), lastMessage = _a[0], setLastMessage = _a[1];
      var _b = (0, react_1.useState)({}), readyState = _b[0], setReadyState = _b[1];
      var lastJsonMessage = (0, react_1.useMemo)(function() {
        if (lastMessage) {
          try {
            return JSON.parse(lastMessage.data);
          } catch (e) {
            return constants_1.UNPARSABLE_JSON_OBJECT;
          }
        }
        return null;
      }, [lastMessage]);
      var convertedUrl = (0, react_1.useRef)(null);
      var webSocketRef = (0, react_1.useRef)(null);
      var startRef = (0, react_1.useRef)(function() {
        return void 0;
      });
      var reconnectCount = (0, react_1.useRef)(0);
      var messageQueue = (0, react_1.useRef)([]);
      var webSocketProxy = (0, react_1.useRef)(null);
      var optionsCache = (0, react_1.useRef)(options);
      optionsCache.current = options;
      var readyStateFromUrl = convertedUrl.current && readyState[convertedUrl.current] !== void 0 ? readyState[convertedUrl.current] : url !== null && connect === true ? constants_1.ReadyState.CONNECTING : constants_1.ReadyState.UNINSTANTIATED;
      var stringifiedQueryParams = options.queryParams ? JSON.stringify(options.queryParams) : null;
      var sendMessage = (0, react_1.useCallback)(function(message, keep) {
        var _a2;
        if (keep === void 0) {
          keep = true;
        }
        if (constants_1.isEventSourceSupported && webSocketRef.current instanceof EventSource) {
          console.warn("Unable to send a message from an eventSource");
          return;
        }
        if (((_a2 = webSocketRef.current) === null || _a2 === void 0 ? void 0 : _a2.readyState) === constants_1.ReadyState.OPEN) {
          (0, util_1.assertIsWebSocket)(webSocketRef.current, optionsCache.current.skipAssert);
          webSocketRef.current.send(message);
        } else if (keep) {
          messageQueue.current.push(message);
        }
      }, []);
      var sendJsonMessage = (0, react_1.useCallback)(function(message, keep) {
        if (keep === void 0) {
          keep = true;
        }
        sendMessage(JSON.stringify(message), keep);
      }, [sendMessage]);
      var getWebSocket = (0, react_1.useCallback)(function() {
        if (optionsCache.current.share !== true || constants_1.isEventSourceSupported && webSocketRef.current instanceof EventSource) {
          return webSocketRef.current;
        }
        if (webSocketProxy.current === null && webSocketRef.current) {
          (0, util_1.assertIsWebSocket)(webSocketRef.current, optionsCache.current.skipAssert);
          webSocketProxy.current = (0, proxy_1.default)(webSocketRef.current, startRef);
        }
        return webSocketProxy.current;
      }, []);
      (0, react_1.useEffect)(function() {
        if (url !== null && connect === true) {
          var removeListeners_1;
          var expectClose_1 = false;
          var createOrJoin_1 = true;
          var start_1 = function() {
            return __awaiter(void 0, void 0, void 0, function() {
              var _a2, protectedSetLastMessage, protectedSetReadyState;
              return __generator(this, function(_b2) {
                switch (_b2.label) {
                  case 0:
                    _a2 = convertedUrl;
                    return [4, (0, get_url_1.getUrl)(url, optionsCache)];
                  case 1:
                    _a2.current = _b2.sent();
                    if (convertedUrl.current === null) {
                      console.error("Failed to get a valid URL. WebSocket connection aborted.");
                      convertedUrl.current = "ABORTED";
                      (0, react_dom_1.flushSync)(function() {
                        return setReadyState(function(prev) {
                          return __assign(__assign({}, prev), { ABORTED: constants_1.ReadyState.CLOSED });
                        });
                      });
                      return [
                        2
                        /*return*/
                      ];
                    }
                    protectedSetLastMessage = function(message) {
                      if (!expectClose_1) {
                        (0, react_dom_1.flushSync)(function() {
                          return setLastMessage(message);
                        });
                      }
                    };
                    protectedSetReadyState = function(state) {
                      if (!expectClose_1) {
                        (0, react_dom_1.flushSync)(function() {
                          return setReadyState(function(prev) {
                            var _a3;
                            return __assign(__assign({}, prev), convertedUrl.current && (_a3 = {}, _a3[convertedUrl.current] = state, _a3));
                          });
                        });
                      }
                    };
                    if (createOrJoin_1) {
                      removeListeners_1 = (0, create_or_join_1.createOrJoinSocket)(webSocketRef, convertedUrl.current, protectedSetReadyState, optionsCache, protectedSetLastMessage, startRef, reconnectCount, sendMessage);
                    }
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          startRef.current = function() {
            if (!expectClose_1) {
              if (webSocketProxy.current)
                webSocketProxy.current = null;
              removeListeners_1 === null || removeListeners_1 === void 0 ? void 0 : removeListeners_1();
              start_1();
            }
          };
          start_1();
          return function() {
            expectClose_1 = true;
            createOrJoin_1 = false;
            if (webSocketProxy.current)
              webSocketProxy.current = null;
            removeListeners_1 === null || removeListeners_1 === void 0 ? void 0 : removeListeners_1();
            setLastMessage(null);
          };
        } else if (url === null || connect === false) {
          reconnectCount.current = 0;
          setReadyState(function(prev) {
            var _a2;
            return __assign(__assign({}, prev), convertedUrl.current && (_a2 = {}, _a2[convertedUrl.current] = constants_1.ReadyState.CLOSED, _a2));
          });
        }
      }, [url, connect, stringifiedQueryParams, sendMessage]);
      (0, react_1.useEffect)(function() {
        if (readyStateFromUrl === constants_1.ReadyState.OPEN) {
          messageQueue.current.splice(0).forEach(function(message) {
            sendMessage(message);
          });
        }
      }, [readyStateFromUrl]);
      return {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState: readyStateFromUrl,
        getWebSocket
      };
    };
    exports.useWebSocket = useWebSocket;
  }
});

// node_modules/react-use-websocket/dist/lib/use-socket-io.js
var require_use_socket_io = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-socket-io.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSocketIO = void 0;
    var react_1 = require_react();
    var use_websocket_1 = require_use_websocket();
    var constants_1 = require_constants();
    var emptyEvent = {
      type: "empty",
      payload: null
    };
    var getSocketData = function(event) {
      if (!event || !event.data) {
        return emptyEvent;
      }
      var match = event.data.match(/\[.*]/);
      if (!match) {
        return emptyEvent;
      }
      var data = JSON.parse(match);
      if (!Array.isArray(data) || !data[1]) {
        return emptyEvent;
      }
      return {
        type: data[0],
        payload: data[1]
      };
    };
    var useSocketIO = function(url, options, connect) {
      if (options === void 0) {
        options = constants_1.DEFAULT_OPTIONS;
      }
      if (connect === void 0) {
        connect = true;
      }
      var optionsWithSocketIO = (0, react_1.useMemo)(function() {
        return __assign(__assign({}, options), { fromSocketIO: true });
      }, []);
      var _a = (0, use_websocket_1.useWebSocket)(url, optionsWithSocketIO, connect), sendMessage = _a.sendMessage, sendJsonMessage = _a.sendJsonMessage, lastMessage = _a.lastMessage, readyState = _a.readyState, getWebSocket = _a.getWebSocket;
      var socketIOLastMessage = (0, react_1.useMemo)(function() {
        return getSocketData(lastMessage);
      }, [lastMessage]);
      return {
        sendMessage,
        sendJsonMessage,
        lastMessage: socketIOLastMessage,
        lastJsonMessage: socketIOLastMessage,
        readyState,
        getWebSocket
      };
    };
    exports.useSocketIO = useSocketIO;
  }
});

// node_modules/react-use-websocket/dist/lib/use-event-source.js
var require_use_event_source = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-event-source.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEventSource = void 0;
    var react_1 = require_react();
    var use_websocket_1 = require_use_websocket();
    var constants_1 = require_constants();
    var useEventSource = function(url, _a, connect) {
      if (_a === void 0) {
        _a = constants_1.DEFAULT_EVENT_SOURCE_OPTIONS;
      }
      var withCredentials = _a.withCredentials, events = _a.events, options = __rest(_a, ["withCredentials", "events"]);
      if (connect === void 0) {
        connect = true;
      }
      var optionsWithEventSource = __assign(__assign({}, options), { eventSourceOptions: {
        withCredentials
      } });
      var eventsRef = (0, react_1.useRef)(constants_1.EMPTY_EVENT_HANDLERS);
      if (events) {
        eventsRef.current = events;
      }
      var _b = (0, use_websocket_1.useWebSocket)(url, optionsWithEventSource, connect), lastMessage = _b.lastMessage, readyState = _b.readyState, getWebSocket = _b.getWebSocket;
      (0, react_1.useEffect)(function() {
        if (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.type) {
          Object.entries(eventsRef.current).forEach(function(_a2) {
            var type = _a2[0], handler = _a2[1];
            if (type === lastMessage.type) {
              handler(lastMessage);
            }
          });
        }
      }, [lastMessage]);
      return {
        lastEvent: lastMessage,
        readyState,
        getEventSource: getWebSocket
      };
    };
    exports.useEventSource = useEventSource;
  }
});

// node_modules/react-use-websocket/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-use-websocket/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetGlobalState = exports.useEventSource = exports.ReadyState = exports.useSocketIO = exports.default = void 0;
    var use_websocket_1 = require_use_websocket();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return use_websocket_1.useWebSocket;
    } });
    var use_socket_io_1 = require_use_socket_io();
    Object.defineProperty(exports, "useSocketIO", { enumerable: true, get: function() {
      return use_socket_io_1.useSocketIO;
    } });
    var constants_1 = require_constants();
    Object.defineProperty(exports, "ReadyState", { enumerable: true, get: function() {
      return constants_1.ReadyState;
    } });
    var use_event_source_1 = require_use_event_source();
    Object.defineProperty(exports, "useEventSource", { enumerable: true, get: function() {
      return use_event_source_1.useEventSource;
    } });
    var util_1 = require_util();
    Object.defineProperty(exports, "resetGlobalState", { enumerable: true, get: function() {
      return util_1.resetGlobalState;
    } });
  }
});
export default require_dist();
//# sourceMappingURL=react-use-websocket.js.map
