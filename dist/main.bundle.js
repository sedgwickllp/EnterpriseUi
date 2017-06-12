var ac_main =
webpackJsonpac__name_([3],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return decorateModuleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ENV_PROVIDERS; });
// Angular 2
// rc2 workaround


// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    enableProdMode();
    // Production
    _decorateModuleRef = function (modRef) {
        disableDebugTools();
        return modRef;
    };
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* ApplicationRef */]);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* enableDebugTools */])(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
var decorateModuleRef = _decorateModuleRef;
var ENV_PROVIDERS = PROVIDERS.slice();


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(10);
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(34);
var subscribeToResult_1 = __webpack_require__(35);
/* tslint:enable:max-line-length */
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}
exports.withLatestFrom = withLatestFrom;
var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WithLatestFromSubscriber = (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=withLatestFrom.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppState; });

var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    return AppState;
}());
AppState = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AppState);



/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorComponent; });


var ErrorComponent = (function () {
    function ErrorComponent(router) {
        this.router = router;
    }
    ErrorComponent.prototype.searchResult = function () {
        this.router.navigate(['/app', 'dashboard']);
    };
    return ErrorComponent;
}());
ErrorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'error',
        styles: [__webpack_require__(400)],
        template: __webpack_require__(402),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ViewEncapsulation */].None,
        host: {
            class: 'error-page app'
        },
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
], ErrorComponent);



/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STORE_DEVTOOLS_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return INITIAL_OPTIONS; });

var STORE_DEVTOOLS_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('@ngrx/devtools Options');
var INITIAL_OPTIONS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('@ngrx/devtools Initial Config');
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_merge__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_observeOn__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_observeOn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_observeOn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__extension__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__reducer__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__actions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config__ = __webpack_require__(127);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DevtoolsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreDevtools; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();















var DevtoolsDispatcher = (function (_super) {
    __extends(DevtoolsDispatcher, _super);
    function DevtoolsDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DevtoolsDispatcher;
}(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["d" /* Dispatcher */]));

DevtoolsDispatcher.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */] },
];
/** @nocollapse */
DevtoolsDispatcher.ctorParameters = function () { return []; };
var StoreDevtools = (function () {
    function StoreDevtools(dispatcher, actions$, reducers$, extension, initialState, config) {
        var liftedInitialState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__reducer__["a" /* liftInitialState */])(initialState, config.monitor);
        var liftReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__reducer__["b" /* liftReducerWith */])(initialState, liftedInitialState, config.monitor, {
            maxAge: config.maxAge
        });
        var liftedAction$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils__["a" /* applyOperators */])(actions$, [
            [__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__["skip"], 1],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_merge__["merge"], extension.actions$],
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__["map"], __WEBPACK_IMPORTED_MODULE_11__utils__["b" /* liftAction */]],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_merge__["merge"], dispatcher, extension.liftedActions$],
            [__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_observeOn__["observeOn"], __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__["queue"]]
        ]);
        var liftedReducer$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__["map"].call(reducers$, liftReducer);
        var liftedStateSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](1);
        var liftedStateSubscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils__["a" /* applyOperators */])(liftedAction$, [
            [__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__["withLatestFrom"], liftedReducer$],
            [__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__["scan"], function (liftedState, _a) {
                    var action = _a[0], reducer = _a[1];
                    var nextState = reducer(liftedState, action);
                    extension.notify(action, nextState);
                    return nextState;
                }, liftedInitialState]
        ]).subscribe(liftedStateSubject);
        var liftedState$ = liftedStateSubject.asObservable();
        var state$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__["map"].call(liftedState$, __WEBPACK_IMPORTED_MODULE_11__utils__["c" /* unliftState */]);
        this.stateSubscription = liftedStateSubscription;
        this.dispatcher = dispatcher;
        this.liftedState = liftedState$;
        this.state = state$;
    }
    StoreDevtools.prototype.dispatch = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.next = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.error = function (error) { };
    StoreDevtools.prototype.complete = function () { };
    StoreDevtools.prototype.performAction = function (action) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].performAction(action));
    };
    StoreDevtools.prototype.reset = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].reset());
    };
    StoreDevtools.prototype.rollback = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].rollback());
    };
    StoreDevtools.prototype.commit = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].commit());
    };
    StoreDevtools.prototype.sweep = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].sweep());
    };
    StoreDevtools.prototype.toggleAction = function (id) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].toggleAction(id));
    };
    StoreDevtools.prototype.jumpToState = function (index) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].jumpToState(index));
    };
    StoreDevtools.prototype.importState = function (nextLiftedState) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].importState(nextLiftedState));
    };
    return StoreDevtools;
}());

StoreDevtools.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */] },
];
/** @nocollapse */
StoreDevtools.ctorParameters = function () { return [
    { type: DevtoolsDispatcher, },
    { type: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["d" /* Dispatcher */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */], },
    { type: __WEBPACK_IMPORTED_MODULE_10__extension__["a" /* DevtoolsExtension */], },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["f" /* INITIAL_STATE */],] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_14__config__["a" /* STORE_DEVTOOLS_CONFIG */],] },] },
]; };
//# sourceMappingURL=devtools.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(90);
/* unused harmony export ExtensionActionTypes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return REDUX_DEVTOOLS_EXTENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevtoolsExtension; });









var ExtensionActionTypes = {
    START: 'START',
    DISPATCH: 'DISPATCH',
    STOP: 'STOP',
    ACTION: 'ACTION'
};
var REDUX_DEVTOOLS_EXTENSION = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('Redux Devtools Extension');
var DevtoolsExtension = (function () {
    function DevtoolsExtension(devtoolsExtension) {
        this.instanceId = "ngrx-store-" + Date.now();
        this.devtoolsExtension = devtoolsExtension;
        this.createActionStreams();
    }
    DevtoolsExtension.prototype.notify = function (action, state) {
        if (!this.devtoolsExtension) {
            return;
        }
        this.devtoolsExtension.send(null, state, false, this.instanceId);
    };
    DevtoolsExtension.prototype.createChangesObservable = function () {
        var _this = this;
        if (!this.devtoolsExtension) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__["empty"])();
        }
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (subscriber) {
            var connection = _this.devtoolsExtension.connect({ instanceId: _this.instanceId });
            connection.subscribe(function (change) { return subscriber.next(change); });
            return connection.unsubscribe;
        });
    };
    DevtoolsExtension.prototype.createActionStreams = function () {
        var _this = this;
        // Listens to all changes based on our instanceId
        var changes$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__["share"].call(this.createChangesObservable());
        // Listen for the start action
        var start$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(changes$, function (change) { return change.type === ExtensionActionTypes.START; });
        // Listen for the stop action
        var stop$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(changes$, function (change) { return change.type === ExtensionActionTypes.STOP; });
        // Listen for lifted actions
        var liftedActions$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* applyOperators */])(changes$, [
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"], function (change) { return change.type === ExtensionActionTypes.DISPATCH; }],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"], function (change) { return _this.unwrapAction(change.payload); }]
        ]);
        // Listen for unlifted actions
        var actions$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* applyOperators */])(changes$, [
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"], function (change) { return change.type === ExtensionActionTypes.ACTION; }],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"], function (change) { return _this.unwrapAction(change.payload); }]
        ]);
        var actionsUntilStop$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__["takeUntil"].call(actions$, stop$);
        var liftedUntilStop$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__["takeUntil"].call(liftedActions$, stop$);
        // Only take the action sources between the start/stop events
        this.actions$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__["switchMap"].call(start$, function () { return actionsUntilStop$; });
        this.liftedActions$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__["switchMap"].call(start$, function () { return liftedUntilStop$; });
    };
    DevtoolsExtension.prototype.unwrapAction = function (action) {
        return typeof action === 'string' ? eval("(" + action + ")") : action;
    };
    return DevtoolsExtension;
}());

DevtoolsExtension.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */] },
];
/** @nocollapse */
DevtoolsExtension.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */], args: [REDUX_DEVTOOLS_EXTENSION,] },] },
]; };
//# sourceMappingURL=extension.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dispatcher; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        _super.call(this, { type: Dispatcher.INIT });
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    Dispatcher.prototype.complete = function () {
        // noop
    };
    Dispatcher.INIT = '@ngrx/store/init';
    return Dispatcher;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=dispatcher.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reducer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Reducer = (function (_super) {
    __extends(Reducer, _super);
    function Reducer(_dispatcher, initialReducer) {
        _super.call(this, initialReducer);
        this._dispatcher = _dispatcher;
    }
    Reducer.prototype.replaceReducer = function (reducer) {
        this.next(reducer);
    };
    Reducer.prototype.next = function (reducer) {
        _super.prototype.next.call(this, reducer);
        this._dispatcher.dispatch({ type: Reducer.REPLACE });
    };
    Reducer.REPLACE = '@ngrx/store/replace-reducer';
    return Reducer;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=reducer.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return State; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





var State = (function (_super) {
    __extends(State, _super);
    function State(_initialState, action$, reducer$) {
        var _this = this;
        _super.call(this, _initialState);
        var actionInQueue$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__["observeOn"].call(action$, __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__["queue"]);
        var actionAndReducer$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__["withLatestFrom"].call(actionInQueue$, reducer$);
        var state$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__["scan"].call(actionAndReducer$, function (state, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(state, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
    }
    return State;
}(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=state.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Store; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var Store = (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        _super.call(this);
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.select = __WEBPACK_IMPORTED_MODULE_0__ngrx_core__["a" /* select */].bind(this);
        this.source = state$;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]));
//# sourceMappingURL=store.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(4);
var switchMap_1 = __webpack_require__(175);
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(34);
var subscribeToResult_1 = __webpack_require__(35);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_module__ = __webpack_require__(234);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_module__["a"]; });
// App



/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });

var AppConfig = (function () {
    function AppConfig() {
        this.config = {
            name: 'RocketFuel',
            title: 'IT Enterprise App',
            version: '0.0.0',
            /**
             * Whether to print and alert some log information
             */
            debug: true,
            /**
             * In-app constants
             */
            settings: {
                colors: {
                    'white': '#fff',
                    'black': '#000',
                    'gray-light': '#999',
                    'gray-lighter': '#eee',
                    'gray': '#666',
                    'gray-dark': '#343434',
                    'gray-darker': '#222',
                    'gray-semi-light': '#777',
                    'gray-semi-lighter': '#ddd',
                    'brand-primary': '#5d8fc2',
                    'brand-success': '#64bd63',
                    'brand-warning': '#f0b518',
                    'brand-danger': '#dd5826',
                    'brand-info': '#5dc4bf'
                },
                screens: {
                    'xs-max': 543,
                    'sm-min': 544,
                    'sm-max': 767,
                    'md-min': 768,
                    'md-max': 991,
                    'lg-min': 992,
                    'lg-max': 1199,
                    'xl-min': 1200
                },
                navCollapseTimeout: 2500
            },
            /**
             * Application state. May be changed when using.
             * Synced to Local Storage
             */
            state: {
                /**
                 * whether navigation is static (prevent automatic collapsing)
                 */
                'nav-static': false
            }
        };
        this._resizeCallbacks = [];
        this._screenSizeCallbacks = {
            xs: { enter: [], exit: [] },
            sm: { enter: [], exit: [] },
            md: { enter: [], exit: [] },
            lg: { enter: [], exit: [] },
            xl: { enter: [], exit: [] }
        };
        this._initResizeEvent();
        this._initOnScreenSizeCallbacks();
    }
    AppConfig.prototype.isScreen = function (size) {
        var screenPx = window.innerWidth;
        return (screenPx >= this.config.settings.screens[size + '-min'] || size === 'xs')
            && (screenPx <= this.config.settings.screens[size + '-max'] || size === 'xl');
    };
    AppConfig.prototype.getScreenSize = function () {
        var screenPx = window.innerWidth;
        if (screenPx <= this.config.settings.screens['xs-max']) {
            return 'xs';
        }
        if ((screenPx >= this.config.settings.screens['sm-min'])
            && (screenPx <= this.config.settings.screens['sm-max'])) {
            return 'sm';
        }
        if ((screenPx >= this.config.settings.screens['md-min'])
            && (screenPx <= this.config.settings.screens['md-max'])) {
            return 'md';
        }
        if ((screenPx >= this.config.settings.screens['lg-min'])
            && (screenPx <= this.config.settings.screens['lg-max'])) {
            return 'lg';
        }
        if (screenPx >= this.config.settings.screens['xl-min']) {
            return 'xl';
        }
    };
    AppConfig.prototype.onScreenSize = function (size, fn, /* Boolean= */ onEnter) {
        onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
        if (typeof size === 'object') {
            for (var i = 0; i < size.length; i++) {
                this._screenSizeCallbacks[size[i]][onEnter ? 'enter' : 'exit'].push(fn);
            }
        }
        else {
            this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn);
        }
    };
    AppConfig.prototype.changeColor = function (color, ratio, darker) {
        var pad = function (num, totalChars) {
            var padVal = '0';
            num = num + '';
            while (num.length < totalChars) {
                num = padVal + num;
            }
            return num;
        };
        // Trim trailing/leading whitespace
        color = color.replace(/^\s*|\s*$/, '');
        // Expand three-digit hex
        color = color.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');
        // Calculate ratio
        var difference = Math.round(ratio * 256) * (darker ? -1 : 1), 
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$', 'i')), alpha = !!rgb && rgb[4] !== null ? rgb[4] : null, 
        // Convert hex to decimal
        decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i, function () {
            return parseInt(arguments[1], 16) + ',' +
                parseInt(arguments[2], 16) + ',' +
                parseInt(arguments[3], 16);
        }).split(/,/);
        // Return RGB(A)
        return !!rgb ?
            'rgb' + (alpha !== null ? 'a' : '') + '(' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[0], 10) + difference, darker ? 0 : 255) + ', ' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[1], 10) + difference, darker ? 0 : 255) + ', ' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[2], 10) + difference, darker ? 0 : 255) +
                (alpha !== null ? ', ' + alpha : '') +
                ')' :
            // Return hex
            [
                '#',
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[0], 10) + difference, darker ? 0 : 255).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[1], 10) + difference, darker ? 0 : 255).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[2], 10) + difference, darker ? 0 : 255).toString(16), 2)
            ].join('');
    };
    AppConfig.prototype.lightenColor = function (color, ratio) {
        return this.changeColor(color, ratio, false);
    };
    AppConfig.prototype.darkenColor = function (color, ratio) {
        return this.changeColor(color, ratio, true);
    };
    AppConfig.prototype.max = function (array) {
        return Math.max.apply(null, array);
    };
    AppConfig.prototype.min = function (array) {
        return Math.min.apply(null, array);
    };
    AppConfig.prototype._initResizeEvent = function () {
        var resizeTimeout;
        jQuery(window).on('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                jQuery(window).trigger('sn:resize');
            }, 100);
        });
    };
    AppConfig.prototype._initOnScreenSizeCallbacks = function () {
        var _this = this;
        var resizeTimeout, prevSize = this.getScreenSize();
        jQuery(window).resize(function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                var size = _this.getScreenSize();
                if (size !== prevSize) {
                    // run exit callbacks first
                    _this._screenSizeCallbacks[prevSize].exit.forEach(function (fn) {
                        fn(size, prevSize);
                    });
                    // run enter callbacks then
                    _this._screenSizeCallbacks[size].enter.forEach(function (fn) {
                        fn(size, prevSize);
                    });
                    console.log('screen changed. new: ' + size + ', old: ' + prevSize);
                }
                prevSize = size;
            }, 100);
        });
    };
    AppConfig.prototype.getConfig = function () {
        return this.config;
    };
    return AppConfig;
}());
AppConfig = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AppConfig);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(49)))

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(27);
var Action_1 = __webpack_require__(408);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(404);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypecodesActions; });

var TypecodesActions = TypecodesActions_1 = (function () {
    function TypecodesActions() {
    }
    TypecodesActions.prototype.getAllTypecodes = function () {
        return {
            type: TypecodesActions_1.LOAD_ALL_TYPECODES
        };
    };
    TypecodesActions.prototype.loadTypecodesSuccess = function (typecodes) {
        return {
            type: TypecodesActions_1.ALL_TYPECODES_LOAD_SUCCESS,
            payload: typecodes
        };
    };
    return TypecodesActions;
}());
TypecodesActions.LOAD_ALL_TYPECODES = '[AllTypecodes] Load';
TypecodesActions.ALL_TYPECODES_LOAD_SUCCESS = '[AllTypecodes] Load Success';
TypecodesActions = TypecodesActions_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])()
], TypecodesActions);

var TypecodesActions_1;


/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketActions; });

var TicketActions = TicketActions_1 = (function () {
    function TicketActions() {
    }
    TicketActions.prototype.getTicketById = function (id) {
        return {
            type: TicketActions_1.GET_TICKET_BY_ID,
            payload: id
        };
    };
    TicketActions.prototype.getTicket = function (ticket) {
        return {
            type: TicketActions_1.GET_TICKET_SUCCESS,
            payload: ticket
        };
    };
    TicketActions.prototype.postComment = function (newComment) {
        return {
            type: TicketActions_1.POST_COMMENT,
            payload: newComment
        };
    };
    return TicketActions;
}());
TicketActions.GET_TICKET_BY_ID = '[Ticket] Get Ticket By Id';
TicketActions.GET_TICKET_SUCCESS = '[Ticket] Get Ticket Success';
TicketActions.POST_COMMENT = '[Ticket] Post Comment';
TicketActions.POST_COMMENT_SUCCESS = '[Ticket] Post Comment Success';
TicketActions = TicketActions_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])()
], TicketActions);

var TicketActions_1;


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(44);
var queue_1 = __webpack_require__(85);
var Subscription_1 = __webpack_require__(45);
var observeOn_1 = __webpack_require__(62);
var ObjectUnsubscribedError_1 = __webpack_require__(88);
var SubjectSubscription_1 = __webpack_require__(171);
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(10);
var tryCatch_1 = __webpack_require__(114);
var errorObject_1 = __webpack_require__(77);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(4);
var of_1 = __webpack_require__(174);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var EmptyObservable_1 = __webpack_require__(60);
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var map_1 = __webpack_require__(36);
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} A new Observable of property values from the source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
function plucker(props, length) {
    var mapper = function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(10);
/**
 * Returns an Observable that skips the first `count` items emitted by the source Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
 * @return {Observable} An Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(count) {
    return this.lift(new SkipOperator(count));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skip.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(34);
var subscribeToResult_1 = __webpack_require__(35);
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/*
 * Angular 2 decorators and services
 */


/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App(appState) {
        this.appState = appState;
    }
    App.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
    };
    return App;
}());
App = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'app',
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ViewEncapsulation */].None,
        styles: [
            __webpack_require__(401)
        ],
        template: "<router-outlet></router-outlet>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppState */]])
], App);



/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store_devtools__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angularclass_hmr__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environment__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routes__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_resolver__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_config__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__error_error_component__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__application_state__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_tickets_ticket_store_ticket_reducer__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__core_typecodes_typecodes_reducer__ = __webpack_require__(238);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });








/*
 * Platform and Environment providers/directives/pipes
 */


// App is our top level component








// Application wide providers
var APP_PROVIDERS = __WEBPACK_IMPORTED_MODULE_11__app_resolver__["a" /* APP_RESOLVER_PROVIDERS */].concat([
    __WEBPACK_IMPORTED_MODULE_12__app_service__["a" /* AppState */],
    __WEBPACK_IMPORTED_MODULE_13__app_config__["a" /* AppConfig */],
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angularclass_hmr__["createNewHosts"])(cmpLocation);
        // save input values
        store.restoreInputValues = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angularclass_hmr__["createInputTransfer"])();
        // remove styles
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angularclass_hmr__["removeNgStyles"])();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["w" /* NgModule */])({
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* App */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_14__error_error_component__["a" /* ErrorComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* StoreModule */].provideStore(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* combineReducers */])({ ticketStoreData: __WEBPACK_IMPORTED_MODULE_16_app_tickets_ticket_store_ticket_reducer__["a" /* ticketStoreData */], typecodesStoreData: __WEBPACK_IMPORTED_MODULE_17__core_typecodes_typecodes_reducer__["a" /* typecodesStoreData */] }), __WEBPACK_IMPORTED_MODULE_15__application_state__["a" /* INITIAL_APPLICATION_STATE */]),
            __WEBPACK_IMPORTED_MODULE_0__ngrx_store_devtools__["a" /* StoreDevtoolsModule */].instrumentOnlyWithExtension(),
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_routes__["a" /* ROUTES */], { useHash: true })
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__environment__["b" /* ENV_PROVIDERS */],
            APP_PROVIDERS
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* ApplicationRef */], __WEBPACK_IMPORTED_MODULE_12__app_service__["a" /* AppState */]])
], AppModule);



/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* unused harmony export DataResolver */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_RESOLVER_PROVIDERS; });



var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({ res: 'I am data' });
    };
    return DataResolver;
}());
DataResolver = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DataResolver);

// an array of services to resolve routes with data
var APP_RESOLVER_PROVIDERS = [
    DataResolver
];


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_error_component__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTES; });

var ROUTES = [{
        path: '', redirectTo: 'app', pathMatch: 'full'
    },
    {
        path: 'app', loadChildren: function () { return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 412)).then(function (module) { return module['LayoutModule']; }); }
    },
    {
        path: 'login', loadChildren: function () { return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 413)).then(function (module) { return module['LoginModule']; }); }
    },
    {
        path: 'error', component: __WEBPACK_IMPORTED_MODULE_0__error_error_component__["a" /* ErrorComponent */]
    },
    {
        path: '**', component: __WEBPACK_IMPORTED_MODULE_0__error_error_component__["a" /* ErrorComponent */]
    }
];


/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_store_data__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_state__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tickets_ticket_store_ticket_store_data__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_store_data__ = __webpack_require__(240);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_APPLICATION_STATE; });




var INITIAL_APPLICATION_STATE = {
    uiState: __WEBPACK_IMPORTED_MODULE_1__ui_state__["a" /* INITIAL_UI_STATE */],
    ticketStoreData: __WEBPACK_IMPORTED_MODULE_2__tickets_ticket_store_ticket_store_data__["a" /* INITIAL_TICKET_STORE_DATA */],
    typecodesStoreData: __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_store_data__["a" /* INITIAL_TYPECODES_STORE_DATA */],
    LoginStoreData: __WEBPACK_IMPORTED_MODULE_3__login_login_store_data__["a" /* INITIAL_LOGIN_STORE_DATA */]
};


/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typecodes_actions__ = __webpack_require__(209);
/* harmony export (immutable) */ __webpack_exports__["a"] = typecodesStoreData;

function typecodesStoreData(state, action) {
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__typecodes_actions__["a" /* TypecodesActions */].ALL_TYPECODES_LOAD_SUCCESS:
            return {
                components: action.payload.itComponentTypes,
                priorities: action.payload.priorityTypes,
                requests: action.payload.requestTypes,
                sources: action.payload.sourceTypes,
                statuses: action.payload.statusTypes,
                subComponents: action.payload.subComponentTypes
            };
        default:
            return state;
    }
}


/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_TYPECODES_STORE_DATA; });
var INITIAL_TYPECODES_STORE_DATA = {
    components: [],
    priorities: [],
    requests: [],
    sources: [],
    statuses: [],
    subComponents: []
    // typecodes: {}
};


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_LOGIN_STORE_DATA; });
var INITIAL_LOGIN_STORE_DATA = {
    user: { userName: "",
        userId: "" }
};


/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ticket_actions__ = __webpack_require__(210);
/* harmony export (immutable) */ __webpack_exports__["a"] = ticketStoreData;

function ticketStoreData(state, action) {
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__ticket_actions__["a" /* TicketActions */].GET_TICKET_SUCCESS:
            return {
                ticketDetail: action.payload.ticketDetail,
                ticketRequester: action.payload.ticketRequester,
                ticketActivity: action.payload.ticketActivity,
                ticketComments: action.payload.ticketComments
            };
        case __WEBPACK_IMPORTED_MODULE_0__ticket_actions__["a" /* TicketActions */].POST_COMMENT:
            return handleNewCommentReceivedAction(state, action);
        default:
            return state;
    }
}
function handleNewCommentReceivedAction(state, action) {
    var newStoreData = {
        ticketDetail: state.ticketDetail,
        ticketRequester: state.ticketRequester,
        ticketActivity: state.ticketActivity,
        ticketComments: state.ticketComments
    };
    var newComment = {
        userName: "Princess Leia",
        //createdDateTime: moment().format('MM/DD/YY'),
        comment: action.payload.comment,
        isVisible: action.payload.isVisible
    };
    newStoreData.ticketComments.push(newComment);
    return newStoreData;
}


/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_TICKET_STORE_DATA; });
var INITIAL_TICKET_STORE_DATA = {
    ticketDetail: {},
    ticketRequester: {},
    ticketActivity: [],
    ticketComments: []
};


/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_UI_STATE; });
var INITIAL_UI_STATE = {
    userId: undefined,
    ticketId: undefined
};


/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony export (immutable) */ __webpack_exports__["main"] = main;
/*
 * Angular bootstraping
 */



/*
 * App Module
 * our top level module that holds all of our components
 */



/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])()
        .bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app__["a" /* AppModule */]).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(__WEBPACK_IMPORTED_MODULE_1__app_environment__["a" /* decorateModuleRef */])
        .catch(function (err) { return console.error(err); });
}
// needed for hmr
// in prod this is replace for document ready
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__["bootloader"])(main);


/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_operator_enterZone__ = __webpack_require__(250);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_operator_leaveZone__ = __webpack_require__(251);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_operator_select__ = __webpack_require__(252);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_operator_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_compose__ = __webpack_require__(249);
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compose */
var compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};
//# sourceMappingURL=compose.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
/* unused harmony export enterZone */
/* unused harmony export EnterZoneOperator */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function enterZone(zone) {
    return this.lift(new EnterZoneOperator(zone));
}
var EnterZoneOperator = (function () {
    function EnterZoneOperator(_zone) {
        this._zone = _zone;
    }
    EnterZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
    };
    return EnterZoneOperator;
}());
var EnterZoneSubscriber = (function (_super) {
    __extends(EnterZoneSubscriber, _super);
    function EnterZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    EnterZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.run(function () { return _this.destination.next(value); });
    };
    return EnterZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=enterZone.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
/* unused harmony export leaveZone */
/* unused harmony export LeaveZoneOperator */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function leaveZone(zone) {
    return this.lift(new LeaveZoneOperator(zone));
}
var LeaveZoneOperator = (function () {
    function LeaveZoneOperator(_zone) {
        this._zone = _zone;
    }
    LeaveZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new LeaveZoneSubscriber(subscriber, this._zone));
    };
    return LeaveZoneOperator;
}());
var LeaveZoneSubscriber = (function (_super) {
    __extends(LeaveZoneSubscriber, _super);
    function LeaveZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    LeaveZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.runOutsideAngular(function () { return _this.destination.next(value); });
    };
    return LeaveZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=leaveZone.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__);
/* harmony export (immutable) */ __webpack_exports__["a"] = select;



function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"].call.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"], [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__["map"].call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__["distinctUntilChanged"].call(mapped$);
}
//# sourceMappingURL=select.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_instrument__ = __webpack_require__(254);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_instrument__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_devtools__ = __webpack_require__(128);
/* unused harmony reexport StoreDevtools */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__devtools__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extension__ = __webpack_require__(129);
/* unused harmony export _createReduxDevtoolsExtension */
/* unused harmony export _createState */
/* unused harmony export _createReducer */
/* unused harmony export _createStateIfExtension */
/* unused harmony export _createReducerIfExtension */
/* unused harmony export noMonitor */
/* unused harmony export _createOptions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreDevtoolsModule; });





function _createReduxDevtoolsExtension() {
    var legacyExtensionKey = 'devToolsExtension';
    var extensionKey = '__REDUX_DEVTOOLS_EXTENSION__';
    if (typeof window === 'object' && typeof window[legacyExtensionKey] !== 'undefined') {
        return window[legacyExtensionKey];
    }
    else if (typeof window === 'object' && typeof window[extensionKey] !== 'undefined') {
        return window[extensionKey];
    }
    else {
        return null;
    }
}
function _createState(devtools) {
    return devtools.state;
}
function _createReducer(dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */](dispatcher, reducer);
}
function _createStateIfExtension(extension, injector, initialState) {
    if (!!extension) {
        var devtools = injector.get(__WEBPACK_IMPORTED_MODULE_2__devtools__["a" /* StoreDevtools */]);
        return _createState(devtools);
    }
    else {
        var dispatcher = injector.get(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["d" /* Dispatcher */]);
        var reducer = injector.get(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */]);
        return new __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* State */](initialState, dispatcher, reducer);
    }
}
function _createReducerIfExtension(extension, injector, reducer) {
    if (!!extension) {
        var devtoolsDispatcher = injector.get(__WEBPACK_IMPORTED_MODULE_2__devtools__["b" /* DevtoolsDispatcher */]);
        return _createReducer(devtoolsDispatcher, reducer);
    }
    else {
        var dispatcher = injector.get(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["d" /* Dispatcher */]);
        return new __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */](dispatcher, reducer);
    }
}
function noMonitor() {
    return null;
}
function _createOptions(_options) {
    var DEFAULT_OPTIONS = { monitor: noMonitor };
    var options = typeof _options === 'function' ? _options() : _options;
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    if (options.maxAge && options.maxAge < 2) {
        throw new Error("Devtools 'maxAge' cannot be less than 2, got " + options.maxAge);
    }
    return options;
}
var StoreDevtoolsModule = (function () {
    function StoreDevtoolsModule() {
    }
    StoreDevtoolsModule.instrumentStore = function (_options) {
        if (_options === void 0) { _options = {}; }
        return {
            ngModule: StoreDevtoolsModule,
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* State */],
                    deps: [__WEBPACK_IMPORTED_MODULE_2__devtools__["a" /* StoreDevtools */]],
                    useFactory: _createState
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__config__["b" /* INITIAL_OPTIONS */],
                    useValue: _options
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */],
                    deps: [__WEBPACK_IMPORTED_MODULE_2__devtools__["b" /* DevtoolsDispatcher */], __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* INITIAL_REDUCER */]],
                    useFactory: _createReducer
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* STORE_DEVTOOLS_CONFIG */],
                    deps: [__WEBPACK_IMPORTED_MODULE_3__config__["b" /* INITIAL_OPTIONS */]],
                    useFactory: _createOptions
                }
            ]
        };
    };
    StoreDevtoolsModule.instrumentOnlyWithExtension = function (_options) {
        if (_options === void 0) { _options = {}; }
        return {
            ngModule: StoreDevtoolsModule,
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* State */],
                    deps: [__WEBPACK_IMPORTED_MODULE_4__extension__["b" /* REDUX_DEVTOOLS_EXTENSION */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Injector */], __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["f" /* INITIAL_STATE */]],
                    useFactory: _createStateIfExtension
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["e" /* Reducer */],
                    deps: [__WEBPACK_IMPORTED_MODULE_4__extension__["b" /* REDUX_DEVTOOLS_EXTENSION */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Injector */], __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* INITIAL_REDUCER */]],
                    useFactory: _createReducerIfExtension
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__config__["b" /* INITIAL_OPTIONS */],
                    useValue: _options
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* STORE_DEVTOOLS_CONFIG */],
                    deps: [__WEBPACK_IMPORTED_MODULE_3__config__["b" /* INITIAL_OPTIONS */]],
                    useFactory: _createOptions
                }
            ]
        };
    };
    return StoreDevtoolsModule;
}());

StoreDevtoolsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* NgModule */], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* StoreModule */]
                ],
                providers: [
                    __WEBPACK_IMPORTED_MODULE_4__extension__["a" /* DevtoolsExtension */],
                    __WEBPACK_IMPORTED_MODULE_2__devtools__["b" /* DevtoolsDispatcher */],
                    __WEBPACK_IMPORTED_MODULE_2__devtools__["a" /* StoreDevtools */],
                    {
                        provide: __WEBPACK_IMPORTED_MODULE_4__extension__["b" /* REDUX_DEVTOOLS_EXTENSION */],
                        useFactory: _createReduxDevtoolsExtension
                    }
                ]
            },] },
];
/** @nocollapse */
StoreDevtoolsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=instrument.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(89);
/* unused harmony export INIT_ACTION */
/* harmony export (immutable) */ __webpack_exports__["a"] = liftInitialState;
/* harmony export (immutable) */ __webpack_exports__["b"] = liftReducerWith;



var INIT_ACTION = { type: __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["d" /* Dispatcher */].INIT };
/**
* Computes the next entry in the log by applying an action.
*/
function computeNextEntry(reducer, action, state, error) {
    if (error) {
        return {
            state: state,
            error: 'Interrupted by an error up the chain'
        };
    }
    var nextState = state;
    var nextError;
    try {
        nextState = reducer(state, action);
    }
    catch (err) {
        nextError = err.toString();
        console.error(err.stack || err);
    }
    return {
        state: nextState,
        error: nextError
    };
}
/**
* Runs the reducer on invalidated actions to get a fresh computation log.
*/
function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds) {
    // Optimization: exit early and return the same reference
    // if we know nothing could have changed.
    if (minInvalidatedStateIndex >= computedStates.length &&
        computedStates.length === stagedActionIds.length) {
        return computedStates;
    }
    var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
    for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
        var actionId = stagedActionIds[i];
        var action = actionsById[actionId].action;
        var previousEntry = nextComputedStates[i - 1];
        var previousState = previousEntry ? previousEntry.state : committedState;
        var previousError = previousEntry ? previousEntry.error : undefined;
        var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
        var entry = shouldSkip ?
            previousEntry :
            computeNextEntry(reducer, action, previousState, previousError);
        nextComputedStates.push(entry);
    }
    return nextComputedStates;
}
function liftInitialState(initialCommittedState, monitorReducer) {
    return {
        monitorState: monitorReducer(undefined, {}),
        nextActionId: 1,
        actionsById: { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* liftAction */])(INIT_ACTION) },
        stagedActionIds: [0],
        skippedActionIds: [],
        committedState: initialCommittedState,
        currentStateIndex: 0,
        computedStates: []
    };
}
/**
* Creates a history state reducer from an app's reducer.
*/
function liftReducerWith(initialCommittedState, initialLiftedState, monitorReducer, options) {
    if (options === void 0) { options = {}; }
    /**
    * Manages how the history actions modify the history state.
    */
    return function (reducer) { return function (liftedState, liftedAction) {
        var _a = liftedState || initialLiftedState, monitorState = _a.monitorState, actionsById = _a.actionsById, nextActionId = _a.nextActionId, stagedActionIds = _a.stagedActionIds, skippedActionIds = _a.skippedActionIds, committedState = _a.committedState, currentStateIndex = _a.currentStateIndex, computedStates = _a.computedStates;
        if (!liftedState) {
            // Prevent mutating initialLiftedState
            actionsById = Object.create(actionsById);
        }
        function commitExcessActions(n) {
            // Auto-commits n-number of excess actions.
            var excess = n;
            var idsToDelete = stagedActionIds.slice(1, excess + 1);
            for (var i = 0; i < idsToDelete.length; i++) {
                if (computedStates[i + 1].error) {
                    // Stop if error is found. Commit actions up to error.
                    excess = i;
                    idsToDelete = stagedActionIds.slice(1, excess + 1);
                    break;
                }
                else {
                    delete actionsById[idsToDelete[i]];
                }
            }
            skippedActionIds = skippedActionIds.filter(function (id) { return idsToDelete.indexOf(id) === -1; });
            stagedActionIds = [0].concat(stagedActionIds.slice(excess + 1));
            committedState = computedStates[excess].state;
            computedStates = computedStates.slice(excess);
            currentStateIndex = currentStateIndex > excess
                ? currentStateIndex - excess
                : 0;
        }
        // By default, agressively recompute every state whatever happens.
        // This has O(n) performance, so we'll override this to a sensible
        // value whenever we feel like we don't have to recompute the states.
        var minInvalidatedStateIndex = 0;
        switch (liftedAction.type) {
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].RESET: {
                // Get back to the state the store was created with.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                committedState = initialCommittedState;
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].COMMIT: {
                // Consider the last committed state the new starting point.
                // Squash any staged actions into a single committed state.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                committedState = computedStates[currentStateIndex].state;
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].ROLLBACK: {
                // Forget about any staged actions.
                // Start again from the last committed state.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].TOGGLE_ACTION: {
                // Toggle whether an action with given ID is skipped.
                // Being skipped means it is a no-op during the computation.
                var actionId_1 = liftedAction.id;
                var index = skippedActionIds.indexOf(actionId_1);
                if (index === -1) {
                    skippedActionIds = [actionId_1].concat(skippedActionIds);
                }
                else {
                    skippedActionIds = skippedActionIds.filter(function (id) { return id !== actionId_1; });
                }
                // Optimization: we know history before this action hasn't changed
                minInvalidatedStateIndex = stagedActionIds.indexOf(actionId_1);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].SET_ACTIONS_ACTIVE: {
                // Toggle whether an action with given ID is skipped.
                // Being skipped means it is a no-op during the computation.
                var start = liftedAction.start, end = liftedAction.end, active = liftedAction.active;
                var actionIds = [];
                for (var i = start; i < end; i++)
                    actionIds.push(i);
                if (active) {
                    skippedActionIds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* difference */])(skippedActionIds, actionIds);
                }
                else {
                    skippedActionIds = skippedActionIds.concat(actionIds);
                }
                // Optimization: we know history before this action hasn't changed
                minInvalidatedStateIndex = stagedActionIds.indexOf(start);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].JUMP_TO_STATE: {
                // Without recomputing anything, move the pointer that tell us
                // which state is considered the current one. Useful for sliders.
                currentStateIndex = liftedAction.index;
                // Optimization: we know the history has not changed.
                minInvalidatedStateIndex = Infinity;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].SWEEP: {
                // Forget any actions that are currently being skipped.
                stagedActionIds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* difference */])(stagedActionIds, skippedActionIds);
                skippedActionIds = [];
                currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].PERFORM_ACTION: {
                // Auto-commit as new actions come in.
                if (options.maxAge && stagedActionIds.length === options.maxAge) {
                    commitExcessActions(1);
                }
                if (currentStateIndex === stagedActionIds.length - 1) {
                    currentStateIndex++;
                }
                var actionId = nextActionId++;
                // Mutation! This is the hottest path, and we optimize on purpose.
                // It is safe because we set a new key in a cache dictionary.
                actionsById[actionId] = liftedAction;
                stagedActionIds = stagedActionIds.concat([actionId]);
                // Optimization: we know that only the new action needs computing.
                minInvalidatedStateIndex = stagedActionIds.length - 1;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].IMPORT_STATE: {
                // Completely replace everything.
                (_b = liftedAction.nextLiftedState, monitorState = _b.monitorState, actionsById = _b.actionsById, nextActionId = _b.nextActionId, stagedActionIds = _b.stagedActionIds, skippedActionIds = _b.skippedActionIds, committedState = _b.committedState, currentStateIndex = _b.currentStateIndex, computedStates = _b.computedStates);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* Reducer */].REPLACE:
            case __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["d" /* Dispatcher */].INIT: {
                // Always recompute states on hot reload and init.
                minInvalidatedStateIndex = 0;
                if (options.maxAge && stagedActionIds.length > options.maxAge) {
                    // States must be recomputed before committing excess.
                    computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
                    commitExcessActions(stagedActionIds.length - options.maxAge);
                    // Avoid double computation.
                    minInvalidatedStateIndex = Infinity;
                }
                break;
            }
            default: {
                // If the action is not recognized, it's a monitor action.
                // Optimization: a monitor action can't change history.
                minInvalidatedStateIndex = Infinity;
                break;
            }
        }
        computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
        monitorState = monitorReducer(monitorState, liftedAction);
        return {
            monitorState: monitorState,
            actionsById: actionsById,
            nextActionId: nextActionId,
            stagedActionIds: stagedActionIds,
            skippedActionIds: skippedActionIds,
            committedState: committedState,
            currentStateIndex: currentStateIndex,
            computedStates: computedStates
        };
        var _b;
    }; };
}
//# sourceMappingURL=reducer.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dispatcher__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(134);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return INITIAL_REDUCER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return INITIAL_STATE; });
/* unused harmony export _INITIAL_REDUCER */
/* unused harmony export _INITIAL_STATE */
/* unused harmony export _initialReducerFactory */
/* unused harmony export _initialStateFactory */
/* unused harmony export _storeFactory */
/* unused harmony export _stateFactory */
/* unused harmony export _reducerFactory */
/* unused harmony export provideStore */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreModule; });






var INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('Token ngrx/store/reducer');
var INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('Token ngrx/store/initial-state');
var _INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('Token _ngrx/store/reducer');
var _INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* combineReducers */])(reducer);
}
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */].INIT });
    }
    return initialState;
}
function _storeFactory(dispatcher, reducer, state$) {
    return new __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */](dispatcher, reducer, state$);
}
function _stateFactory(initialState, dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */](initialState, dispatcher, reducer);
}
function _reducerFactory(dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */](dispatcher, reducer);
}
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */],
        { provide: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */], useFactory: _storeFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */]] },
        { provide: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], useFactory: _reducerFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], INITIAL_REDUCER] },
        { provide: __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */], useFactory: _stateFactory, deps: [INITIAL_STATE, __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */]] },
        { provide: INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [_INITIAL_REDUCER] },
        { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE, INITIAL_REDUCER] },
        { provide: _INITIAL_STATE, useValue: _initialState },
        { provide: _INITIAL_REDUCER, useValue: _reducer }
    ];
}
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    StoreModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* NgModule */], args: [{},] },
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = [];
    return StoreModule;
}());
//# sourceMappingURL=ng2.js.map

/***/ }),

/***/ 400:
/***/ (function(module, exports) {

module.exports = "/***********************************/\n/**          ERROR PAGE           **/\n/***********************************/\n.error-page {\n  background-color: #ddd; }\n\n.error-container {\n  padding-top: 5%;\n  text-align: center; }\n  .error-container > .btn {\n    padding-left: 35px;\n    padding-right: 35px; }\n\n.error-code {\n  margin: 20px;\n  font-size: 80px;\n  font-weight: 400;\n  color: #373a3c; }\n  @media (min-width: 768px) {\n    .error-code {\n      font-size: 180px; } }\n\n.error-info {\n  font-size: 20px;\n  color: #373a3c; }\n\n.error-help {\n  font-size: 14px; }\n\n.error-page .page-footer {\n  position: absolute;\n  bottom: 30px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n"

/***/ }),

/***/ 401:
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n/*!\r\n * Bootstrap v4.0.0-alpha.5 (https://getbootstrap.com)\r\n * Copyright 2011-2016 The Bootstrap Authors\r\n * Copyright 2011-2016 Twitter, Inc.\r\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\r\n */\n/*! normalize.css v4.2.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nprogress {\n  vertical-align: baseline; }\n\ntemplate,\n[hidden] {\n  display: none; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit;\n  margin: 0; }\n\noptgroup {\n  font-weight: bold; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  *::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important; }\n  .tag {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  font-size: 14px;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #343434;\n  background-color: #eee; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #999999; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #218BC3;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #165c82;\n    text-decoration: underline; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: none; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #999999;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fdf7e6; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eeeeee; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #999999; }\n  .blockquote-footer::before {\n    content: \"\\2014 \\00A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eeeeee;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\00A0 \\2014\"; }\n\n.img-fluid, .carousel-inner > .carousel-item > img,\n.carousel-inner > .carousel-item > a > img {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all .2s ease-in-out;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #999999; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f9f2f4;\n  border-radius: 0.25rem; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 0.2rem;\n  box-shadow: inset 0 -0.1rem 0 rgba(0, 0, 0, 0.25); }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold;\n    box-shadow: none; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #343434; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n  position: relative;\n  min-height: 1px;\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col-xs {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.col-xs-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-xs-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-xs-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-xs-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-xs-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-xs-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-xs-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-xs-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-xs-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-xs-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-xs-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-xs-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-xs-0 {\n  right: auto; }\n\n.pull-xs-1 {\n  right: 8.33333%; }\n\n.pull-xs-2 {\n  right: 16.66667%; }\n\n.pull-xs-3 {\n  right: 25%; }\n\n.pull-xs-4 {\n  right: 33.33333%; }\n\n.pull-xs-5 {\n  right: 41.66667%; }\n\n.pull-xs-6 {\n  right: 50%; }\n\n.pull-xs-7 {\n  right: 58.33333%; }\n\n.pull-xs-8 {\n  right: 66.66667%; }\n\n.pull-xs-9 {\n  right: 75%; }\n\n.pull-xs-10 {\n  right: 83.33333%; }\n\n.pull-xs-11 {\n  right: 91.66667%; }\n\n.pull-xs-12 {\n  right: 100%; }\n\n.push-xs-0 {\n  left: auto; }\n\n.push-xs-1 {\n  left: 8.33333%; }\n\n.push-xs-2 {\n  left: 16.66667%; }\n\n.push-xs-3 {\n  left: 25%; }\n\n.push-xs-4 {\n  left: 33.33333%; }\n\n.push-xs-5 {\n  left: 41.66667%; }\n\n.push-xs-6 {\n  left: 50%; }\n\n.push-xs-7 {\n  left: 58.33333%; }\n\n.push-xs-8 {\n  left: 66.66667%; }\n\n.push-xs-9 {\n  left: 75%; }\n\n.push-xs-10 {\n  left: 83.33333%; }\n\n.push-xs-11 {\n  left: 91.66667%; }\n\n.push-xs-12 {\n  left: 100%; }\n\n.offset-xs-1 {\n  margin-left: 8.33333%; }\n\n.offset-xs-2 {\n  margin-left: 16.66667%; }\n\n.offset-xs-3 {\n  margin-left: 25%; }\n\n.offset-xs-4 {\n  margin-left: 33.33333%; }\n\n.offset-xs-5 {\n  margin-left: 41.66667%; }\n\n.offset-xs-6 {\n  margin-left: 50%; }\n\n.offset-xs-7 {\n  margin-left: 58.33333%; }\n\n.offset-xs-8 {\n  margin-left: 66.66667%; }\n\n.offset-xs-9 {\n  margin-left: 75%; }\n\n.offset-xs-10 {\n  margin-left: 83.33333%; }\n\n.offset-xs-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-md-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #ddd; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #ddd; }\n  .table tbody + tbody {\n    border-top: 2px solid #ddd; }\n  .table .table {\n    background-color: #eee; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #ddd; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: #f3f3f3; }\n\n.table-hover tbody tr:hover {\n  background-color: #eeeeee; }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: #eeeeee; }\n\n.table-hover .table-active:hover {\n  background-color: #e2e2e2; }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: #e2e2e2; }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #ecfaec; }\n\n.table-hover .table-success:hover {\n  background-color: #d8f5d8; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d8f5d8; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #f2fafa; }\n\n.table-hover .table-info:hover {\n  background-color: #e0f3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #e0f3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fdf7e6; }\n\n.table-hover .table-warning:hover {\n  background-color: #fcefce; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #fcefce; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #fff2ef; }\n\n.table-hover .table-danger:hover {\n  background-color: #ffddd6; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ffddd6; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #343434; }\n\n.thead-default th {\n  color: #555555;\n  background-color: #eeeeee; }\n\n.table-inverse {\n  color: #eeeeee;\n  background-color: #343434; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #555555; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  min-height: 0%;\n  overflow-x: auto; }\n\n.table-reflow thead {\n  float: left; }\n\n.table-reflow tbody {\n  display: block;\n  white-space: nowrap; }\n\n.table-reflow th,\n.table-reflow td {\n  border-top: 1px solid #ddd;\n  border-left: 1px solid #ddd; }\n  .table-reflow th:last-child,\n  .table-reflow td:last-child {\n    border-right: 1px solid #ddd; }\n\n.table-reflow thead:last-child tr:last-child th,\n.table-reflow thead:last-child tr:last-child td,\n.table-reflow tbody:last-child tr:last-child th,\n.table-reflow tbody:last-child tr:last-child td,\n.table-reflow tfoot:last-child tr:last-child th,\n.table-reflow tfoot:last-child tr:last-child td {\n  border-bottom: 1px solid #ddd; }\n\n.table-reflow tr {\n  float: left; }\n  .table-reflow tr th,\n  .table-reflow tr td {\n    display: block !important;\n    border: 1px solid #ddd; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #555555;\n    background-color: #fff;\n    border-color: #4D90FE;\n    outline: none;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); }\n  .form-control::placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eeeeee;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.5rem - 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #555555;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  line-height: 1.5;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem; }\n  .form-check + .form-check {\n    margin-top: -.25rem; }\n  .form-check.disabled .form-check-label {\n    color: #999999;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: .25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  vertical-align: middle;\n  cursor: pointer; }\n  .form-check-inline + .form-check-inline {\n    margin-left: .75rem; }\n  .form-check-inline.disabled {\n    color: #999999;\n    cursor: not-allowed; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.625rem;\n  background-size: 1.25rem 1.25rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .form-check-label,\n.has-success .form-check-inline,\n.has-success .custom-control {\n  color: #64bd63; }\n\n.has-success .form-control {\n  border-color: #64bd63; }\n  .has-success .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #abdbab; }\n\n.has-success .input-group-addon {\n  color: #64bd63;\n  border-color: #64bd63;\n  background-color: #f2faf2; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#64bd63' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .form-check-label,\n.has-warning .form-check-inline,\n.has-warning .custom-control {\n  color: #f0b518; }\n\n.has-warning .form-control {\n  border-color: #f0b518; }\n  .has-warning .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #f6d478; }\n\n.has-warning .input-group-addon {\n  color: #f0b518;\n  border-color: #f0b518;\n  background-color: #fcf2d8; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#f0b518' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .form-check-label,\n.has-danger .form-check-inline,\n.has-danger .custom-control {\n  color: #dd5826; }\n\n.has-danger .form-control {\n  border-color: #dd5826; }\n  .has-danger .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #eb9c7e; }\n\n.has-danger .input-group-addon {\n  color: #dd5826;\n  border-color: #dd5826;\n  background-color: #f9e0d6; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#dd5826' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n@media (min-width: 576px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    width: auto;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .form-control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-check {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-check-label {\n    padding-left: 0; }\n  .form-inline .form-check-input {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.5;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.375rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn.focus {\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    background-image: none;\n    outline: 0;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65;\n    box-shadow: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #5d8fc2;\n  border-color: #5d8fc2;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #4175ab;\n    border-color: #3e70a4; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #4175ab;\n    border-color: #3e70a4; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #4175ab;\n    border-color: #3e70a4;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #376492;\n      border-color: #2c4f74; }\n  .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary:disabled:focus, .btn-primary:disabled.focus {\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n  .btn-primary.disabled:hover, .btn-primary:disabled:hover {\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n\n.btn-secondary {\n  color: #343434;\n  background-color: #f8f8f8;\n  border-color: #ccc;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-secondary:hover {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad; }\n  .btn-secondary:active, .btn-secondary.active,\n  .open > .btn-secondary.dropdown-toggle {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-secondary:active:hover, .btn-secondary:active:focus, .btn-secondary:active.focus, .btn-secondary.active:hover, .btn-secondary.active:focus, .btn-secondary.active.focus,\n    .open > .btn-secondary.dropdown-toggle:hover,\n    .open > .btn-secondary.dropdown-toggle:focus,\n    .open > .btn-secondary.dropdown-toggle.focus {\n      color: #343434;\n      background-color: #cdcdcd;\n      border-color: #8c8c8c; }\n  .btn-secondary.disabled:focus, .btn-secondary.disabled.focus, .btn-secondary:disabled:focus, .btn-secondary:disabled.focus {\n    background-color: #f8f8f8;\n    border-color: #ccc; }\n  .btn-secondary.disabled:hover, .btn-secondary:disabled:hover {\n    background-color: #f8f8f8;\n    border-color: #ccc; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5dc4bf;\n  border-color: #5dc4bf;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #40aea9;\n    border-color: #3da7a2; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #40aea9;\n    border-color: #3da7a2; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #40aea9;\n    border-color: #3da7a2;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #369490;\n      border-color: #2b7673; }\n  .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info:disabled:focus, .btn-info:disabled.focus {\n    background-color: #5dc4bf;\n    border-color: #5dc4bf; }\n  .btn-info.disabled:hover, .btn-info:disabled:hover {\n    background-color: #5dc4bf;\n    border-color: #5dc4bf; }\n\n.btn-success {\n  color: #fff;\n  background-color: #64bd63;\n  border-color: #64bd63;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #48a746;\n    border-color: #449f43; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #48a746;\n    border-color: #449f43; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #48a746;\n    border-color: #449f43;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #3d8d3c;\n      border-color: #307130; }\n  .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success:disabled:focus, .btn-success:disabled.focus {\n    background-color: #64bd63;\n    border-color: #64bd63; }\n  .btn-success.disabled:hover, .btn-success:disabled:hover {\n    background-color: #64bd63;\n    border-color: #64bd63; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0b518;\n  border-color: #f0b518;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #c8950d;\n    border-color: #be8e0c; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #c8950d;\n    border-color: #be8e0c; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #c8950d;\n    border-color: #be8e0c;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #a67c0b;\n      border-color: #805f08; }\n  .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning:disabled:focus, .btn-warning:disabled.focus {\n    background-color: #f0b518;\n    border-color: #f0b518; }\n  .btn-warning.disabled:hover, .btn-warning:disabled:hover {\n    background-color: #f0b518;\n    border-color: #f0b518; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #dd5826;\n  border-color: #dd5826;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #b4461c;\n    border-color: #ab421b; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #b4461c;\n    border-color: #ab421b; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #b4461c;\n    border-color: #ab421b;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #953a17;\n      border-color: #722c12; }\n  .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger:disabled:focus, .btn-danger:disabled.focus {\n    background-color: #dd5826;\n    border-color: #dd5826; }\n  .btn-danger.disabled:hover, .btn-danger:disabled:hover {\n    background-color: #dd5826;\n    border-color: #dd5826; }\n\n.btn-outline-primary {\n  color: #5d8fc2;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5d8fc2; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    color: #fff;\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .open > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n    .btn-outline-primary:active:hover, .btn-outline-primary:active:focus, .btn-outline-primary:active.focus, .btn-outline-primary.active:hover, .btn-outline-primary.active:focus, .btn-outline-primary.active.focus,\n    .open > .btn-outline-primary.dropdown-toggle:hover,\n    .open > .btn-outline-primary.dropdown-toggle:focus,\n    .open > .btn-outline-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #376492;\n      border-color: #2c4f74; }\n  .btn-outline-primary.disabled:focus, .btn-outline-primary.disabled.focus, .btn-outline-primary:disabled:focus, .btn-outline-primary:disabled.focus {\n    border-color: #a7c2de; }\n  .btn-outline-primary.disabled:hover, .btn-outline-primary:disabled:hover {\n    border-color: #a7c2de; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .open > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n    .btn-outline-secondary:active:hover, .btn-outline-secondary:active:focus, .btn-outline-secondary:active.focus, .btn-outline-secondary.active:hover, .btn-outline-secondary.active:focus, .btn-outline-secondary.active.focus,\n    .open > .btn-outline-secondary.dropdown-toggle:hover,\n    .open > .btn-outline-secondary.dropdown-toggle:focus,\n    .open > .btn-outline-secondary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #a1a1a1;\n      border-color: #8c8c8c; }\n  .btn-outline-secondary.disabled:focus, .btn-outline-secondary.disabled.focus, .btn-outline-secondary:disabled:focus, .btn-outline-secondary:disabled.focus {\n    border-color: white; }\n  .btn-outline-secondary.disabled:hover, .btn-outline-secondary:disabled:hover {\n    border-color: white; }\n\n.btn-outline-info {\n  color: #5dc4bf;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5dc4bf; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5dc4bf;\n    border-color: #5dc4bf; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    color: #fff;\n    background-color: #5dc4bf;\n    border-color: #5dc4bf; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .open > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5dc4bf;\n    border-color: #5dc4bf; }\n    .btn-outline-info:active:hover, .btn-outline-info:active:focus, .btn-outline-info:active.focus, .btn-outline-info.active:hover, .btn-outline-info.active:focus, .btn-outline-info.active.focus,\n    .open > .btn-outline-info.dropdown-toggle:hover,\n    .open > .btn-outline-info.dropdown-toggle:focus,\n    .open > .btn-outline-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #369490;\n      border-color: #2b7673; }\n  .btn-outline-info.disabled:focus, .btn-outline-info.disabled.focus, .btn-outline-info:disabled:focus, .btn-outline-info:disabled.focus {\n    border-color: #a8dfdd; }\n  .btn-outline-info.disabled:hover, .btn-outline-info:disabled:hover {\n    border-color: #a8dfdd; }\n\n.btn-outline-success {\n  color: #64bd63;\n  background-image: none;\n  background-color: transparent;\n  border-color: #64bd63; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #64bd63;\n    border-color: #64bd63; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    color: #fff;\n    background-color: #64bd63;\n    border-color: #64bd63; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .open > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #64bd63;\n    border-color: #64bd63; }\n    .btn-outline-success:active:hover, .btn-outline-success:active:focus, .btn-outline-success:active.focus, .btn-outline-success.active:hover, .btn-outline-success.active:focus, .btn-outline-success.active.focus,\n    .open > .btn-outline-success.dropdown-toggle:hover,\n    .open > .btn-outline-success.dropdown-toggle:focus,\n    .open > .btn-outline-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #3d8d3c;\n      border-color: #307130; }\n  .btn-outline-success.disabled:focus, .btn-outline-success.disabled.focus, .btn-outline-success:disabled:focus, .btn-outline-success:disabled.focus {\n    border-color: #abdbab; }\n  .btn-outline-success.disabled:hover, .btn-outline-success:disabled:hover {\n    border-color: #abdbab; }\n\n.btn-outline-warning {\n  color: #f0b518;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0b518; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0b518;\n    border-color: #f0b518; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    color: #fff;\n    background-color: #f0b518;\n    border-color: #f0b518; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .open > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0b518;\n    border-color: #f0b518; }\n    .btn-outline-warning:active:hover, .btn-outline-warning:active:focus, .btn-outline-warning:active.focus, .btn-outline-warning.active:hover, .btn-outline-warning.active:focus, .btn-outline-warning.active.focus,\n    .open > .btn-outline-warning.dropdown-toggle:hover,\n    .open > .btn-outline-warning.dropdown-toggle:focus,\n    .open > .btn-outline-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #a67c0b;\n      border-color: #805f08; }\n  .btn-outline-warning.disabled:focus, .btn-outline-warning.disabled.focus, .btn-outline-warning:disabled:focus, .btn-outline-warning:disabled.focus {\n    border-color: #f6d478; }\n  .btn-outline-warning.disabled:hover, .btn-outline-warning:disabled:hover {\n    border-color: #f6d478; }\n\n.btn-outline-danger {\n  color: #dd5826;\n  background-image: none;\n  background-color: transparent;\n  border-color: #dd5826; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #dd5826;\n    border-color: #dd5826; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    color: #fff;\n    background-color: #dd5826;\n    border-color: #dd5826; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .open > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #dd5826;\n    border-color: #dd5826; }\n    .btn-outline-danger:active:hover, .btn-outline-danger:active:focus, .btn-outline-danger:active.focus, .btn-outline-danger.active:hover, .btn-outline-danger.active:focus, .btn-outline-danger.active.focus,\n    .open > .btn-outline-danger.dropdown-toggle:hover,\n    .open > .btn-outline-danger.dropdown-toggle:focus,\n    .open > .btn-outline-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #953a17;\n      border-color: #722c12; }\n  .btn-outline-danger.disabled:focus, .btn-outline-danger.disabled.focus, .btn-outline-danger:disabled:focus, .btn-outline-danger:disabled.focus {\n    border-color: #eb9c7e; }\n  .btn-outline-danger.disabled:hover, .btn-outline-danger:disabled:hover {\n    border-color: #eb9c7e; }\n\n.btn-link {\n  font-weight: normal;\n  color: #218BC3;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent;\n    box-shadow: none; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #165c82;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled:focus, .btn-link:disabled:hover {\n    color: #999999;\n    text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity .15s linear; }\n  .fade.in {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.in {\n    display: block; }\n\ntr.collapse.in {\n  display: table-row; }\n\ntbody.collapse.in {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition-timing-function: ease;\n  transition-duration: .35s;\n  transition-property: height; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #343434;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175); }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #e5e5e5; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #555555;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #272727;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n  .dropdown-item.active, .dropdown-item.active:focus, .dropdown-item.active:hover {\n    color: #fff;\n    text-decoration: none;\n    background-color: #5d8fc2;\n    outline: 0; }\n  .dropdown-item.disabled, .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    color: #999999; }\n  .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    text-decoration: none;\n    cursor: not-allowed;\n    background-color: transparent;\n    background-image: none;\n    filter: \"progid:DXImageTransform.Microsoft.gradient(enabled = false)\"; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.open > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #999999;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  content: \"\";\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    float: left;\n    margin-bottom: 0; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px; }\n\n.btn-toolbar {\n  margin-left: -0.5rem; }\n  .btn-toolbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .btn-toolbar .btn-group,\n  .btn-toolbar .input-group {\n    float: left; }\n  .btn-toolbar > .btn,\n  .btn-toolbar > .btn-group,\n  .btn-toolbar > .input-group {\n    margin-left: 0.5rem; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group.open .dropdown-toggle {\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn-group.open .dropdown-toggle.btn-link {\n    box-shadow: none; }\n\n.btn .caret {\n  margin-left: 0; }\n\n.btn-lg .caret, .btn-group-lg > .btn .caret {\n  border-width: 0.3em 0.3em 0;\n  border-bottom-width: 0; }\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\n  border-width: 0 0.3em 0.3em; }\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%; }\n\n.btn-group-vertical > .btn-group::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none; }\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  width: 100%;\n  display: flex; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    flex: 1;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: inline-block;\n  padding-left: 1.5rem;\n  cursor: pointer; }\n  .custom-control + .custom-control {\n    margin-left: 1rem; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0074d9;\n    box-shadow: none; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.2rem #0074d9; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #84c6ff;\n    box-shadow: none; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eee; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #767676;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: .25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%;\n  box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1); }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0074d9;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='#fff' d='M0 2h4'/%3E%3C/svg%3E\");\n  box-shadow: none; }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='#fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked .custom-control {\n  float: left;\n  clear: left; }\n  .custom-controls-stacked .custom-control + .custom-control {\n    margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.5rem - 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  padding-right: 0.75rem \\9;\n  color: #555555;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='#333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-image: none \\9;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #51a7e8;\n    outline: none;\n    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(81, 167, 232, 0.5); }\n    .custom-select:focus::-ms-value {\n      color: #555555;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #999999;\n    cursor: not-allowed;\n    background-color: #eeeeee; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n  .custom-file-input:focus ~ .custom-file-control {\n    box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.2rem #0074d9; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #555;\n  user-select: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05); }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #555;\n    background-color: #eee;\n    border: 1px solid #ddd;\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: inline-block; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #999999; }\n    .nav-link.disabled, .nav-link.disabled:focus, .nav-link.disabled:hover {\n      color: #999999;\n      cursor: not-allowed;\n      background-color: transparent; }\n\n.nav-inline .nav-item {\n  display: inline-block; }\n\n.nav-inline .nav-item + .nav-item,\n.nav-inline .nav-link + .nav-link {\n  margin-left: 1rem; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .nav-tabs .nav-item {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs .nav-item + .nav-item {\n      margin-left: 0.2rem; }\n  .nav-tabs .nav-link {\n    display: block;\n    padding: 0.5em 1em;\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eeeeee #eeeeee #ddd; }\n    .nav-tabs .nav-link.disabled, .nav-tabs .nav-link.disabled:focus, .nav-tabs .nav-link.disabled:hover {\n      color: #999999;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active, .nav-tabs .nav-link.active:focus, .nav-tabs .nav-link.active:hover,\n  .nav-tabs .nav-item.open .nav-link,\n  .nav-tabs .nav-item.open .nav-link:focus,\n  .nav-tabs .nav-item.open .nav-link:hover {\n    color: #555555;\n    background-color: #fff;\n    border-color: #ddd #ddd transparent; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.nav-pills .nav-item {\n  float: left; }\n  .nav-pills .nav-item + .nav-item {\n    margin-left: 0.2rem; }\n\n.nav-pills .nav-link {\n  display: block;\n  padding: 0.5em 1em;\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active, .nav-pills .nav-link.active:focus, .nav-pills .nav-link.active:hover,\n.nav-pills .nav-item.open .nav-link,\n.nav-pills .nav-item.open .nav-link:focus,\n.nav-pills .nav-item.open .nav-link:hover {\n  color: #fff;\n  cursor: default;\n  background-color: #5d8fc2; }\n\n.nav-stacked .nav-item {\n  display: block;\n  float: none; }\n  .nav-stacked .nav-item + .nav-item {\n    margin-top: 0.2rem;\n    margin-left: 0; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  padding: 0.5rem 1rem; }\n  .navbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 576px) {\n    .navbar {\n      border-radius: 0; } }\n\n.navbar-full {\n  z-index: 1000; }\n  @media (min-width: 576px) {\n    .navbar-full {\n      border-radius: 0; } }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n  @media (min-width: 576px) {\n    .navbar-fixed-top,\n    .navbar-fixed-bottom {\n      border-radius: 0; } }\n\n.navbar-fixed-top {\n  top: 0; }\n\n.navbar-fixed-bottom {\n  bottom: 0; }\n\n.navbar-sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1030;\n  width: 100%; }\n  @media (min-width: 576px) {\n    .navbar-sticky-top {\n      border-radius: 0; } }\n\n.navbar-brand {\n  float: left;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-divider {\n  float: left;\n  width: 1px;\n  padding-top: 0.425rem;\n  padding-bottom: 0.425rem;\n  margin-right: 1rem;\n  margin-left: 1rem;\n  overflow: hidden; }\n  .navbar-divider::before {\n    content: \"\\00a0\"; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  width: 2.5em;\n  height: 2em;\n  padding: 0.5rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent no-repeat center center;\n  background-size: 24px 24px;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggleable-xs::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable-xs .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-xs .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-xs .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable-xs {\n    display: block; } }\n\n.navbar-toggleable-sm::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-sm .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    display: block; } }\n\n.navbar-toggleable-md::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-md .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-md .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    display: block; } }\n\n.navbar-toggleable-lg::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-lg .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    display: block; } }\n\n.navbar-toggleable-xl {\n  display: block; }\n  .navbar-toggleable-xl::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .navbar-toggleable-xl .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; }\n\n.navbar-nav .nav-item {\n  float: left; }\n\n.navbar-nav .nav-link {\n  display: block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n  .navbar-nav .nav-link + .nav-link {\n    margin-left: 1rem; }\n\n.navbar-nav .nav-item + .nav-item {\n  margin-left: 1rem; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n\n.navbar-light .navbar-nav .open > .nav-link, .navbar-light .navbar-nav .open > .nav-link:focus, .navbar-light .navbar-nav .open > .nav-link:hover,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link:focus,\n.navbar-light .navbar-nav .active > .nav-link:hover,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.open:focus,\n.navbar-light .navbar-nav .nav-link.open:hover,\n.navbar-light .navbar-nav .nav-link.active,\n.navbar-light .navbar-nav .nav-link.active:focus,\n.navbar-light .navbar-nav .nav-link.active:hover {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-divider {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.navbar-dark .navbar-brand,\n.navbar-dark .navbar-toggler {\n  color: white; }\n  .navbar-dark .navbar-brand:focus, .navbar-dark .navbar-brand:hover,\n  .navbar-dark .navbar-toggler:focus,\n  .navbar-dark .navbar-toggler:hover {\n    color: white; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n\n.navbar-dark .navbar-nav .open > .nav-link, .navbar-dark .navbar-nav .open > .nav-link:focus, .navbar-dark .navbar-nav .open > .nav-link:hover,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link:focus,\n.navbar-dark .navbar-nav .active > .nav-link:hover,\n.navbar-dark .navbar-nav .nav-link.open,\n.navbar-dark .navbar-nav .nav-link.open:focus,\n.navbar-dark .navbar-nav .nav-link.open:hover,\n.navbar-dark .navbar-nav .nav-link.active,\n.navbar-dark .navbar-nav .nav-link.active:focus,\n.navbar-dark .navbar-nav .nav-link.active:hover {\n  color: white; }\n\n.navbar-dark .navbar-toggler {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-dark .navbar-divider {\n  background-color: rgba(255, 255, 255, 0.075); }\n\n.navbar-toggleable-xs::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable-xs .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable-xs {\n    display: block !important; } }\n\n.navbar-toggleable-sm::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    display: block !important; } }\n\n.navbar-toggleable-md::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    display: block !important; } }\n\n.card {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem;\n  background-color: transparent;\n  border-radius: 0.25rem;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n\n.card-block {\n  padding: 1.25rem; }\n  .card-block::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f5f5f5;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #5d8fc2;\n  border-color: #5d8fc2; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #64bd63;\n  border-color: #64bd63; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5dc4bf;\n  border-color: #5dc4bf; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0b518;\n  border-color: #f0b518; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #dd5826;\n  border-color: #dd5826; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #5d8fc2; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5dc4bf; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #64bd63; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0b518; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #dd5826; }\n\n.card-inverse .card-header,\n.card-inverse .card-footer {\n  border-color: rgba(255, 255, 255, 0.2); }\n\n.card-inverse .card-header,\n.card-inverse .card-footer,\n.card-inverse .card-title,\n.card-inverse .card-blockquote {\n  color: #fff; }\n\n.card-inverse .card-link,\n.card-inverse .card-text,\n.card-inverse .card-subtitle,\n.card-inverse .card-blockquote .blockquote-footer {\n  color: rgba(255, 255, 255, 0.65); }\n\n.card-inverse .card-link:focus, .card-inverse .card-link:hover {\n  color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: flex;\n    flex-flow: row wrap;\n    margin-right: -0.625rem;\n    margin-bottom: 0.75rem;\n    margin-left: -0.625rem; }\n    .card-deck .card {\n      flex: 1 0 0;\n      margin-right: 0.625rem;\n      margin-bottom: 0;\n      margin-left: 0.625rem; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-group .card {\n      flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: transparent;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #999999;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #555555; }\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 0.25rem; }\n\n.page-item {\n  display: inline; }\n  .page-item:first-child .page-link {\n    margin-left: 0;\n    border-bottom-left-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .page-item:last-child .page-link {\n    border-bottom-right-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {\n    z-index: 2;\n    color: #555555;\n    cursor: default;\n    background-color: #eeeeee;\n    border-color: transparent; }\n  .page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {\n    color: #999999;\n    pointer-events: none;\n    cursor: not-allowed;\n    background-color: #fff;\n    border-color: transparent; }\n\n.page-link {\n  position: relative;\n  float: left;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  color: #777;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #555555;\n    background-color: #eeeeee;\n    border-color: transparent; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.275rem 0.75rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.tag {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 600;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .tag:empty {\n    display: none; }\n\n.btn .tag {\n  position: relative;\n  top: -1px; }\n\na.tag:focus, a.tag:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.tag-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.tag-default {\n  background-color: #999999; }\n  .tag-default[href]:focus, .tag-default[href]:hover {\n    background-color: gray; }\n\n.tag-primary {\n  background-color: #5d8fc2; }\n  .tag-primary[href]:focus, .tag-primary[href]:hover {\n    background-color: #4175ab; }\n\n.tag-success {\n  background-color: #64bd63; }\n  .tag-success[href]:focus, .tag-success[href]:hover {\n    background-color: #48a746; }\n\n.tag-info {\n  background-color: #5dc4bf; }\n  .tag-info[href]:focus, .tag-info[href]:hover {\n    background-color: #40aea9; }\n\n.tag-warning {\n  background-color: #f0b518; }\n  .tag-warning[href]:focus, .tag-warning[href]:hover {\n    background-color: #c8950d; }\n\n.tag-danger {\n  background-color: #dd5826; }\n  .tag-danger[href]:focus, .tag-danger[href]:hover {\n    background-color: #b4461c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eeeeee;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d5d5d5; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible {\n  padding-right: 2.5rem; }\n  .alert-dismissible .close {\n    position: relative;\n    top: -.125rem;\n    right: -1.25rem;\n    color: inherit; }\n\n.alert-success {\n  background-color: #ecfaec;\n  border-color: #d8f5d8;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c4efc4; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #f2fafa;\n  border-color: #d8f0f0;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #c6e9e9; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fdf7e6;\n  border-color: #fcefce;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #fae8b6; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #fff2ef;\n  border-color: #ffddd6;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #ffc9bc; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: block;\n  width: 100%;\n  height: 1rem;\n  margin-bottom: 1rem; }\n\n.progress[value] {\n  background-color: #eeeeee;\n  border: 0;\n  appearance: none;\n  border-radius: 0.25rem; }\n\n.progress[value]::-ms-fill {\n  background-color: #0074d9;\n  border: 0; }\n\n.progress[value]::-moz-progress-bar {\n  background-color: #0074d9;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.progress[value]::-webkit-progress-value {\n  background-color: #0074d9;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.progress[value=\"100\"]::-moz-progress-bar {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.progress[value=\"100\"]::-webkit-progress-value {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.progress[value]::-webkit-progress-bar {\n  background-color: #eeeeee;\n  border-radius: 0.25rem;\n  box-shadow: inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1); }\n\nbase::-moz-progress-bar,\n.progress[value] {\n  background-color: #eeeeee;\n  border-radius: 0.25rem;\n  box-shadow: inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1); }\n\n@media screen and (min-width: 0\\0) {\n  .progress {\n    background-color: #eeeeee;\n    border-radius: 0.25rem;\n    box-shadow: inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1); }\n  .progress-bar {\n    display: inline-block;\n    height: 1rem;\n    text-indent: -999rem;\n    background-color: #0074d9;\n    border-bottom-left-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .progress[width=\"100%\"] {\n    border-bottom-right-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; } }\n\n.progress-striped[value]::-webkit-progress-value {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-striped[value]::-moz-progress-bar {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-striped[value]::-ms-fill {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-bar-striped {\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-size: 1rem 1rem; } }\n\n.progress-animated[value]::-webkit-progress-value {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-animated[value]::-moz-progress-bar {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-animated .progress-bar-striped {\n    animation: progress-bar-stripes 2s linear infinite; } }\n\n.progress-success[value]::-webkit-progress-value {\n  background-color: #64bd63; }\n\n.progress-success[value]::-moz-progress-bar {\n  background-color: #64bd63; }\n\n.progress-success[value]::-ms-fill {\n  background-color: #64bd63; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-success .progress-bar {\n    background-color: #64bd63; } }\n\n.progress-info[value]::-webkit-progress-value {\n  background-color: #5dc4bf; }\n\n.progress-info[value]::-moz-progress-bar {\n  background-color: #5dc4bf; }\n\n.progress-info[value]::-ms-fill {\n  background-color: #5dc4bf; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-info .progress-bar {\n    background-color: #5dc4bf; } }\n\n.progress-warning[value]::-webkit-progress-value {\n  background-color: #f0b518; }\n\n.progress-warning[value]::-moz-progress-bar {\n  background-color: #f0b518; }\n\n.progress-warning[value]::-ms-fill {\n  background-color: #f0b518; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-warning .progress-bar {\n    background-color: #f0b518; } }\n\n.progress-danger[value]::-webkit-progress-value {\n  background-color: #dd5826; }\n\n.progress-danger[value]::-moz-progress-bar {\n  background-color: #dd5826; }\n\n.progress-danger[value]::-ms-fill {\n  background-color: #dd5826; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-danger .progress-bar {\n    background-color: #dd5826; } }\n\n.media {\n  display: flex; }\n\n.media-body {\n  flex: 1; }\n\n.media-middle {\n  align-self: center; }\n\n.media-bottom {\n  align-self: flex-end; }\n\n.media-object {\n  display: block; }\n  .media-object.img-thumbnail {\n    max-width: none; }\n\n.media-right {\n  padding-left: 10px; }\n\n.media-left {\n  padding-right: 10px; }\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.media-list {\n  padding-left: 0;\n  list-style: none; }\n\n.list-group {\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item.disabled, .list-group-item.disabled:focus, .list-group-item.disabled:hover {\n    color: #999999;\n    cursor: not-allowed;\n    background-color: #eeeeee; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text {\n      color: #999999; }\n  .list-group-item.active, .list-group-item.active:focus, .list-group-item.active:hover {\n    z-index: 2;\n    color: #fff;\n    text-decoration: none;\n    background-color: #5d8fc2;\n    border-color: #5d8fc2; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n    .list-group-item.active:focus .list-group-item-heading > small,\n    .list-group-item.active:focus .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n    .list-group-item.active:hover .list-group-item-heading > small,\n    .list-group-item.active:hover .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text, .list-group-item.active:focus .list-group-item-text, .list-group-item.active:hover .list-group-item-text {\n      color: #f1f5fa; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #555;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #333; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #555;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #ecfaec; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d8f5d8; }\n  a.list-group-item-success.active, a.list-group-item-success.active:focus, a.list-group-item-success.active:hover,\n  button.list-group-item-success.active,\n  button.list-group-item-success.active:focus,\n  button.list-group-item-success.active:hover {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #f2fafa; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #e0f3f3; }\n  a.list-group-item-info.active, a.list-group-item-info.active:focus, a.list-group-item-info.active:hover,\n  button.list-group-item-info.active,\n  button.list-group-item-info.active:focus,\n  button.list-group-item-info.active:hover {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fdf7e6; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #fcefce; }\n  a.list-group-item-warning.active, a.list-group-item-warning.active:focus, a.list-group-item-warning.active:hover,\n  button.list-group-item-warning.active,\n  button.list-group-item-warning.active:focus,\n  button.list-group-item-warning.active:hover {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #fff2ef; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ffddd6; }\n  a.list-group-item-danger.active, a.list-group-item-danger.active:focus, a.list-group-item-danger.active:hover,\n  button.list-group-item-danger.active,\n  button.list-group-item-danger.active:focus,\n  button.list-group-item-danger.active:hover {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9 {\n  padding-bottom: 42.85714%; }\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%; }\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%; }\n\n.embed-responsive-1by1 {\n  padding-bottom: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .2; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .5; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: transform .3s ease-out;\n    transform: translate(0, -25%); }\n  .modal.in .modal-dialog {\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.in {\n    opacity: 0.5; }\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5; }\n  .modal-header::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.modal-header .close {\n  margin-top: -2px; }\n\n.modal-title {\n  margin: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  padding: 15px; }\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5; }\n  .modal-footer::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 600px;\n    margin: 30px auto; }\n  .modal-content {\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 900px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Open Sans\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.in {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: rgba(0, 0, 0, 0.85); }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: rgba(0, 0, 0, 0.85); }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: rgba(0, 0, 0, 0.85); }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: rgba(0, 0, 0, 0.85); }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.85);\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Open Sans\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #ebeff1;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: #ebeff1; }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #ebeff1; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: #ebeff1; }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #ebeff1; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: #ebeff1; }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #e2e8eb; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #e2e8eb; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: #ebeff1; }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #ebeff1; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 1rem;\n  background-color: #e2e8eb;\n  border-bottom: 1px solid #d3dce0;\n  border-radius: 0.22857rem 0.22857rem 0 0; }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .carousel-inner > .carousel-item {\n    position: relative;\n    display: none;\n    transition: .6s ease-in-out left; }\n    .carousel-inner > .carousel-item > img,\n    .carousel-inner > .carousel-item > a > img {\n      line-height: 1; }\n    @media all and (transform-3d), (-webkit-transform-3d) {\n      .carousel-inner > .carousel-item {\n        transition: transform .6s ease-in-out;\n        backface-visibility: hidden;\n        perspective: 1000px; }\n        .carousel-inner > .carousel-item.next, .carousel-inner > .carousel-item.active.right {\n          left: 0;\n          transform: translate3d(100%, 0, 0); }\n        .carousel-inner > .carousel-item.prev, .carousel-inner > .carousel-item.active.left {\n          left: 0;\n          transform: translate3d(-100%, 0, 0); }\n        .carousel-inner > .carousel-item.next.left, .carousel-inner > .carousel-item.prev.right, .carousel-inner > .carousel-item.active {\n          left: 0;\n          transform: translate3d(0, 0, 0); } }\n  .carousel-inner > .active,\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    display: block; }\n  .carousel-inner > .active {\n    left: 0; }\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .carousel-inner > .next {\n    left: 100%; }\n  .carousel-inner > .prev {\n    left: -100%; }\n  .carousel-inner > .next.left,\n  .carousel-inner > .prev.right {\n    left: 0; }\n  .carousel-inner > .active.left {\n    left: -100%; }\n  .carousel-inner > .active.right {\n    left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 15%;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  opacity: 0.5; }\n  .carousel-control.left {\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\n  .carousel-control.right {\n    right: 0;\n    left: auto;\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\n  .carousel-control:focus, .carousel-control:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    position: absolute;\n    top: 50%;\n    z-index: 5;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    margin-top: -10px;\n    font-family: serif;\n    line-height: 1; }\n  .carousel-control .icon-prev {\n    left: 50%;\n    margin-left: -10px; }\n  .carousel-control .icon-next {\n    right: 50%;\n    margin-right: -10px; }\n  .carousel-control .icon-prev::before {\n    content: \"\\2039\"; }\n  .carousel-control .icon-next::before {\n    content: \"\\203a\"; }\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  padding-left: 0;\n  margin-left: -30%;\n  text-align: center;\n  list-style: none; }\n  .carousel-indicators li {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 1px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: transparent;\n    border: 1px solid #fff;\n    border-radius: 10px; }\n  .carousel-indicators .active {\n    width: 12px;\n    height: 12px;\n    margin: 0;\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n  .carousel-caption .btn {\n    text-shadow: none; }\n\n@media (min-width: 576px) {\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px; }\n  .carousel-control .icon-prev {\n    margin-left: -15px; }\n  .carousel-control .icon-next {\n    margin-right: -15px; }\n  .carousel-caption {\n    right: 20%;\n    left: 20%;\n    padding-bottom: 30px; }\n  .carousel-indicators {\n    bottom: 20px; } }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f9; }\n\n.bg-primary {\n  background-color: #5d8fc2 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #4175ab !important; }\n\n.bg-success {\n  background-color: #64bd63 !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #48a746 !important; }\n\n.bg-info {\n  background-color: #5dc4bf !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #40aea9 !important; }\n\n.bg-warning {\n  background-color: #f0b518 !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #c8950d !important; }\n\n.bg-danger {\n  background-color: #dd5826 !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #b4461c !important; }\n\n.bg-inverse {\n  background-color: #343434 !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #1b1b1b !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.clearfix::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.d-block {\n  display: block !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.flex-xs-first {\n  order: -1; }\n\n.flex-xs-last {\n  order: 1; }\n\n.flex-xs-unordered {\n  order: 0; }\n\n.flex-items-xs-top {\n  align-items: flex-start; }\n\n.flex-items-xs-middle {\n  align-items: center; }\n\n.flex-items-xs-bottom {\n  align-items: flex-end; }\n\n.flex-xs-top {\n  align-self: flex-start; }\n\n.flex-xs-middle {\n  align-self: center; }\n\n.flex-xs-bottom {\n  align-self: flex-end; }\n\n.flex-items-xs-left {\n  justify-content: flex-start; }\n\n.flex-items-xs-center {\n  justify-content: center; }\n\n.flex-items-xs-right {\n  justify-content: flex-end; }\n\n.flex-items-xs-around {\n  justify-content: space-around; }\n\n.flex-items-xs-between {\n  justify-content: space-between; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    order: -1; }\n  .flex-sm-last {\n    order: 1; }\n  .flex-sm-unordered {\n    order: 0; } }\n\n@media (min-width: 576px) {\n  .flex-items-sm-top {\n    align-items: flex-start; }\n  .flex-items-sm-middle {\n    align-items: center; }\n  .flex-items-sm-bottom {\n    align-items: flex-end; } }\n\n@media (min-width: 576px) {\n  .flex-sm-top {\n    align-self: flex-start; }\n  .flex-sm-middle {\n    align-self: center; }\n  .flex-sm-bottom {\n    align-self: flex-end; } }\n\n@media (min-width: 576px) {\n  .flex-items-sm-left {\n    justify-content: flex-start; }\n  .flex-items-sm-center {\n    justify-content: center; }\n  .flex-items-sm-right {\n    justify-content: flex-end; }\n  .flex-items-sm-around {\n    justify-content: space-around; }\n  .flex-items-sm-between {\n    justify-content: space-between; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    order: -1; }\n  .flex-md-last {\n    order: 1; }\n  .flex-md-unordered {\n    order: 0; } }\n\n@media (min-width: 768px) {\n  .flex-items-md-top {\n    align-items: flex-start; }\n  .flex-items-md-middle {\n    align-items: center; }\n  .flex-items-md-bottom {\n    align-items: flex-end; } }\n\n@media (min-width: 768px) {\n  .flex-md-top {\n    align-self: flex-start; }\n  .flex-md-middle {\n    align-self: center; }\n  .flex-md-bottom {\n    align-self: flex-end; } }\n\n@media (min-width: 768px) {\n  .flex-items-md-left {\n    justify-content: flex-start; }\n  .flex-items-md-center {\n    justify-content: center; }\n  .flex-items-md-right {\n    justify-content: flex-end; }\n  .flex-items-md-around {\n    justify-content: space-around; }\n  .flex-items-md-between {\n    justify-content: space-between; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    order: -1; }\n  .flex-lg-last {\n    order: 1; }\n  .flex-lg-unordered {\n    order: 0; } }\n\n@media (min-width: 992px) {\n  .flex-items-lg-top {\n    align-items: flex-start; }\n  .flex-items-lg-middle {\n    align-items: center; }\n  .flex-items-lg-bottom {\n    align-items: flex-end; } }\n\n@media (min-width: 992px) {\n  .flex-lg-top {\n    align-self: flex-start; }\n  .flex-lg-middle {\n    align-self: center; }\n  .flex-lg-bottom {\n    align-self: flex-end; } }\n\n@media (min-width: 992px) {\n  .flex-items-lg-left {\n    justify-content: flex-start; }\n  .flex-items-lg-center {\n    justify-content: center; }\n  .flex-items-lg-right {\n    justify-content: flex-end; }\n  .flex-items-lg-around {\n    justify-content: space-around; }\n  .flex-items-lg-between {\n    justify-content: space-between; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    order: -1; }\n  .flex-xl-last {\n    order: 1; }\n  .flex-xl-unordered {\n    order: 0; } }\n\n@media (min-width: 1200px) {\n  .flex-items-xl-top {\n    align-items: flex-start; }\n  .flex-items-xl-middle {\n    align-items: center; }\n  .flex-items-xl-bottom {\n    align-items: flex-end; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-top {\n    align-self: flex-start; }\n  .flex-xl-middle {\n    align-self: center; }\n  .flex-xl-bottom {\n    align-self: flex-end; } }\n\n@media (min-width: 1200px) {\n  .flex-items-xl-left {\n    justify-content: flex-start; }\n  .flex-items-xl-center {\n    justify-content: center; }\n  .flex-items-xl-right {\n    justify-content: flex-end; }\n  .flex-items-xl-around {\n    justify-content: space-around; }\n  .flex-items-xl-between {\n    justify-content: space-between; } }\n\n.float-xs-left {\n  float: left !important; }\n\n.float-xs-right {\n  float: right !important; }\n\n.float-xs-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 1rem 1rem !important; }\n\n.mt-1 {\n  margin-top: 1rem !important; }\n\n.mr-1 {\n  margin-right: 1rem !important; }\n\n.mb-1 {\n  margin-bottom: 1rem !important; }\n\n.ml-1 {\n  margin-left: 1rem !important; }\n\n.mx-1 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-1 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-2 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-2 {\n  margin-top: 1.5rem !important; }\n\n.mr-2 {\n  margin-right: 1.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-2 {\n  margin-left: 1.5rem !important; }\n\n.mx-2 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-2 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-3 {\n  margin: 3rem 3rem !important; }\n\n.mt-3 {\n  margin-top: 3rem !important; }\n\n.mr-3 {\n  margin-right: 3rem !important; }\n\n.mb-3 {\n  margin-bottom: 3rem !important; }\n\n.ml-3 {\n  margin-left: 3rem !important; }\n\n.mx-3 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-3 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 1rem 1rem !important; }\n\n.pt-1 {\n  padding-top: 1rem !important; }\n\n.pr-1 {\n  padding-right: 1rem !important; }\n\n.pb-1 {\n  padding-bottom: 1rem !important; }\n\n.pl-1 {\n  padding-left: 1rem !important; }\n\n.px-1 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-1 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-2 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-2 {\n  padding-top: 1.5rem !important; }\n\n.pr-2 {\n  padding-right: 1.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-2 {\n  padding-left: 1.5rem !important; }\n\n.px-2 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-2 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-3 {\n  padding: 3rem 3rem !important; }\n\n.pt-3 {\n  padding-top: 3rem !important; }\n\n.pr-3 {\n  padding-right: 3rem !important; }\n\n.pb-3 {\n  padding-bottom: 3rem !important; }\n\n.pl-3 {\n  padding-left: 3rem !important; }\n\n.px-3 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-3 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.pos-f-t {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-xs-left {\n  text-align: left !important; }\n\n.text-xs-right {\n  text-align: right !important; }\n\n.text-xs-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #999999 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: gray !important; }\n\n.text-primary {\n  color: #5d8fc2 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #4175ab !important; }\n\n.text-success {\n  color: #64bd63 !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #48a746 !important; }\n\n.text-info {\n  color: #5dc4bf !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #40aea9 !important; }\n\n.text-warning {\n  color: #f0b518 !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #c8950d !important; }\n\n.text-danger {\n  color: #dd5826 !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #b4461c !important; }\n\n.text-gray-dark {\n  color: #343434 !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #1b1b1b !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n/*!\r\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\r\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\r\n */\n/* FONT PATH\r\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(\"assets/fonts/font-awesome/fontawesome-webfont.eot?v=4.7.0\");\n  src: url(\"assets/fonts/font-awesome/fontawesome-webfont.eot?#iefix&v=4.7.0\") format(\"embedded-opentype\"), url(\"assets/fonts/font-awesome/fontawesome-webfont.woff2?v=4.7.0\") format(\"woff2\"), url(\"assets/fonts/font-awesome/fontawesome-webfont.woff?v=4.7.0\") format(\"woff\"), url(\"assets/fonts/font-awesome/fontawesome-webfont.ttf?v=4.7.0\") format(\"truetype\"), url(\"assets/fonts/font-awesome/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -15%; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-fw {\n  width: 1.28571em;\n  text-align: center; }\n\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14286em;\n  list-style-type: none; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  position: absolute;\n  left: -2.14286em;\n  width: 2.14286em;\n  top: 0.14286em;\n  text-align: center; }\n  .fa-li.fa-lg {\n    left: -1.85714em; }\n\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right {\n  margin-left: .3em; }\n\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right; }\n\n.pull-left {\n  float: left; }\n\n.fa.pull-left {\n  margin-right: .3em; }\n\n.fa.pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none; }\n\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle; }\n\n.fa-stack-1x, .fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center; }\n\n.fa-stack-1x {\n  line-height: inherit; }\n\n.fa-stack-2x {\n  font-size: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\r\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\"; }\n\n.fa-music:before {\n  content: \"\"; }\n\n.fa-search:before {\n  content: \"\"; }\n\n.fa-envelope-o:before {\n  content: \"\"; }\n\n.fa-heart:before {\n  content: \"\"; }\n\n.fa-star:before {\n  content: \"\"; }\n\n.fa-star-o:before {\n  content: \"\"; }\n\n.fa-user:before {\n  content: \"\"; }\n\n.fa-film:before {\n  content: \"\"; }\n\n.fa-th-large:before {\n  content: \"\"; }\n\n.fa-th:before {\n  content: \"\"; }\n\n.fa-th-list:before {\n  content: \"\"; }\n\n.fa-check:before {\n  content: \"\"; }\n\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\"; }\n\n.fa-search-plus:before {\n  content: \"\"; }\n\n.fa-search-minus:before {\n  content: \"\"; }\n\n.fa-power-off:before {\n  content: \"\"; }\n\n.fa-signal:before {\n  content: \"\"; }\n\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\"; }\n\n.fa-trash-o:before {\n  content: \"\"; }\n\n.fa-home:before {\n  content: \"\"; }\n\n.fa-file-o:before {\n  content: \"\"; }\n\n.fa-clock-o:before {\n  content: \"\"; }\n\n.fa-road:before {\n  content: \"\"; }\n\n.fa-download:before {\n  content: \"\"; }\n\n.fa-arrow-circle-o-down:before {\n  content: \"\"; }\n\n.fa-arrow-circle-o-up:before {\n  content: \"\"; }\n\n.fa-inbox:before {\n  content: \"\"; }\n\n.fa-play-circle-o:before {\n  content: \"\"; }\n\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\"; }\n\n.fa-refresh:before {\n  content: \"\"; }\n\n.fa-list-alt:before {\n  content: \"\"; }\n\n.fa-lock:before {\n  content: \"\"; }\n\n.fa-flag:before {\n  content: \"\"; }\n\n.fa-headphones:before {\n  content: \"\"; }\n\n.fa-volume-off:before {\n  content: \"\"; }\n\n.fa-volume-down:before {\n  content: \"\"; }\n\n.fa-volume-up:before {\n  content: \"\"; }\n\n.fa-qrcode:before {\n  content: \"\"; }\n\n.fa-barcode:before {\n  content: \"\"; }\n\n.fa-tag:before {\n  content: \"\"; }\n\n.fa-tags:before {\n  content: \"\"; }\n\n.fa-book:before {\n  content: \"\"; }\n\n.fa-bookmark:before {\n  content: \"\"; }\n\n.fa-print:before {\n  content: \"\"; }\n\n.fa-camera:before {\n  content: \"\"; }\n\n.fa-font:before {\n  content: \"\"; }\n\n.fa-bold:before {\n  content: \"\"; }\n\n.fa-italic:before {\n  content: \"\"; }\n\n.fa-text-height:before {\n  content: \"\"; }\n\n.fa-text-width:before {\n  content: \"\"; }\n\n.fa-align-left:before {\n  content: \"\"; }\n\n.fa-align-center:before {\n  content: \"\"; }\n\n.fa-align-right:before {\n  content: \"\"; }\n\n.fa-align-justify:before {\n  content: \"\"; }\n\n.fa-list:before {\n  content: \"\"; }\n\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\"; }\n\n.fa-indent:before {\n  content: \"\"; }\n\n.fa-video-camera:before {\n  content: \"\"; }\n\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\"; }\n\n.fa-pencil:before {\n  content: \"\"; }\n\n.fa-map-marker:before {\n  content: \"\"; }\n\n.fa-adjust:before {\n  content: \"\"; }\n\n.fa-tint:before {\n  content: \"\"; }\n\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\"; }\n\n.fa-share-square-o:before {\n  content: \"\"; }\n\n.fa-check-square-o:before {\n  content: \"\"; }\n\n.fa-arrows:before {\n  content: \"\"; }\n\n.fa-step-backward:before {\n  content: \"\"; }\n\n.fa-fast-backward:before {\n  content: \"\"; }\n\n.fa-backward:before {\n  content: \"\"; }\n\n.fa-play:before {\n  content: \"\"; }\n\n.fa-pause:before {\n  content: \"\"; }\n\n.fa-stop:before {\n  content: \"\"; }\n\n.fa-forward:before {\n  content: \"\"; }\n\n.fa-fast-forward:before {\n  content: \"\"; }\n\n.fa-step-forward:before {\n  content: \"\"; }\n\n.fa-eject:before {\n  content: \"\"; }\n\n.fa-chevron-left:before {\n  content: \"\"; }\n\n.fa-chevron-right:before {\n  content: \"\"; }\n\n.fa-plus-circle:before {\n  content: \"\"; }\n\n.fa-minus-circle:before {\n  content: \"\"; }\n\n.fa-times-circle:before {\n  content: \"\"; }\n\n.fa-check-circle:before {\n  content: \"\"; }\n\n.fa-question-circle:before {\n  content: \"\"; }\n\n.fa-info-circle:before {\n  content: \"\"; }\n\n.fa-crosshairs:before {\n  content: \"\"; }\n\n.fa-times-circle-o:before {\n  content: \"\"; }\n\n.fa-check-circle-o:before {\n  content: \"\"; }\n\n.fa-ban:before {\n  content: \"\"; }\n\n.fa-arrow-left:before {\n  content: \"\"; }\n\n.fa-arrow-right:before {\n  content: \"\"; }\n\n.fa-arrow-up:before {\n  content: \"\"; }\n\n.fa-arrow-down:before {\n  content: \"\"; }\n\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\"; }\n\n.fa-expand:before {\n  content: \"\"; }\n\n.fa-compress:before {\n  content: \"\"; }\n\n.fa-plus:before {\n  content: \"\"; }\n\n.fa-minus:before {\n  content: \"\"; }\n\n.fa-asterisk:before {\n  content: \"\"; }\n\n.fa-exclamation-circle:before {\n  content: \"\"; }\n\n.fa-gift:before {\n  content: \"\"; }\n\n.fa-leaf:before {\n  content: \"\"; }\n\n.fa-fire:before {\n  content: \"\"; }\n\n.fa-eye:before {\n  content: \"\"; }\n\n.fa-eye-slash:before {\n  content: \"\"; }\n\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\"; }\n\n.fa-plane:before {\n  content: \"\"; }\n\n.fa-calendar:before {\n  content: \"\"; }\n\n.fa-random:before {\n  content: \"\"; }\n\n.fa-comment:before {\n  content: \"\"; }\n\n.fa-magnet:before {\n  content: \"\"; }\n\n.fa-chevron-up:before {\n  content: \"\"; }\n\n.fa-chevron-down:before {\n  content: \"\"; }\n\n.fa-retweet:before {\n  content: \"\"; }\n\n.fa-shopping-cart:before {\n  content: \"\"; }\n\n.fa-folder:before {\n  content: \"\"; }\n\n.fa-folder-open:before {\n  content: \"\"; }\n\n.fa-arrows-v:before {\n  content: \"\"; }\n\n.fa-arrows-h:before {\n  content: \"\"; }\n\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\"; }\n\n.fa-twitter-square:before {\n  content: \"\"; }\n\n.fa-facebook-square:before {\n  content: \"\"; }\n\n.fa-camera-retro:before {\n  content: \"\"; }\n\n.fa-key:before {\n  content: \"\"; }\n\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\"; }\n\n.fa-comments:before {\n  content: \"\"; }\n\n.fa-thumbs-o-up:before {\n  content: \"\"; }\n\n.fa-thumbs-o-down:before {\n  content: \"\"; }\n\n.fa-star-half:before {\n  content: \"\"; }\n\n.fa-heart-o:before {\n  content: \"\"; }\n\n.fa-sign-out:before {\n  content: \"\"; }\n\n.fa-linkedin-square:before {\n  content: \"\"; }\n\n.fa-thumb-tack:before {\n  content: \"\"; }\n\n.fa-external-link:before {\n  content: \"\"; }\n\n.fa-sign-in:before {\n  content: \"\"; }\n\n.fa-trophy:before {\n  content: \"\"; }\n\n.fa-github-square:before {\n  content: \"\"; }\n\n.fa-upload:before {\n  content: \"\"; }\n\n.fa-lemon-o:before {\n  content: \"\"; }\n\n.fa-phone:before {\n  content: \"\"; }\n\n.fa-square-o:before {\n  content: \"\"; }\n\n.fa-bookmark-o:before {\n  content: \"\"; }\n\n.fa-phone-square:before {\n  content: \"\"; }\n\n.fa-twitter:before {\n  content: \"\"; }\n\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\"; }\n\n.fa-github:before {\n  content: \"\"; }\n\n.fa-unlock:before {\n  content: \"\"; }\n\n.fa-credit-card:before {\n  content: \"\"; }\n\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\"; }\n\n.fa-hdd-o:before {\n  content: \"\"; }\n\n.fa-bullhorn:before {\n  content: \"\"; }\n\n.fa-bell:before {\n  content: \"\"; }\n\n.fa-certificate:before {\n  content: \"\"; }\n\n.fa-hand-o-right:before {\n  content: \"\"; }\n\n.fa-hand-o-left:before {\n  content: \"\"; }\n\n.fa-hand-o-up:before {\n  content: \"\"; }\n\n.fa-hand-o-down:before {\n  content: \"\"; }\n\n.fa-arrow-circle-left:before {\n  content: \"\"; }\n\n.fa-arrow-circle-right:before {\n  content: \"\"; }\n\n.fa-arrow-circle-up:before {\n  content: \"\"; }\n\n.fa-arrow-circle-down:before {\n  content: \"\"; }\n\n.fa-globe:before {\n  content: \"\"; }\n\n.fa-wrench:before {\n  content: \"\"; }\n\n.fa-tasks:before {\n  content: \"\"; }\n\n.fa-filter:before {\n  content: \"\"; }\n\n.fa-briefcase:before {\n  content: \"\"; }\n\n.fa-arrows-alt:before {\n  content: \"\"; }\n\n.fa-group:before,\n.fa-users:before {\n  content: \"\"; }\n\n.fa-chain:before,\n.fa-link:before {\n  content: \"\"; }\n\n.fa-cloud:before {\n  content: \"\"; }\n\n.fa-flask:before {\n  content: \"\"; }\n\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\"; }\n\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\"; }\n\n.fa-paperclip:before {\n  content: \"\"; }\n\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\"; }\n\n.fa-square:before {\n  content: \"\"; }\n\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\"; }\n\n.fa-list-ul:before {\n  content: \"\"; }\n\n.fa-list-ol:before {\n  content: \"\"; }\n\n.fa-strikethrough:before {\n  content: \"\"; }\n\n.fa-underline:before {\n  content: \"\"; }\n\n.fa-table:before {\n  content: \"\"; }\n\n.fa-magic:before {\n  content: \"\"; }\n\n.fa-truck:before {\n  content: \"\"; }\n\n.fa-pinterest:before {\n  content: \"\"; }\n\n.fa-pinterest-square:before {\n  content: \"\"; }\n\n.fa-google-plus-square:before {\n  content: \"\"; }\n\n.fa-google-plus:before {\n  content: \"\"; }\n\n.fa-money:before {\n  content: \"\"; }\n\n.fa-caret-down:before {\n  content: \"\"; }\n\n.fa-caret-up:before {\n  content: \"\"; }\n\n.fa-caret-left:before {\n  content: \"\"; }\n\n.fa-caret-right:before {\n  content: \"\"; }\n\n.fa-columns:before {\n  content: \"\"; }\n\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\"; }\n\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\"; }\n\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\"; }\n\n.fa-envelope:before {\n  content: \"\"; }\n\n.fa-linkedin:before {\n  content: \"\"; }\n\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\"; }\n\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\"; }\n\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\"; }\n\n.fa-comment-o:before {\n  content: \"\"; }\n\n.fa-comments-o:before {\n  content: \"\"; }\n\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\"; }\n\n.fa-sitemap:before {\n  content: \"\"; }\n\n.fa-umbrella:before {\n  content: \"\"; }\n\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\"; }\n\n.fa-lightbulb-o:before {\n  content: \"\"; }\n\n.fa-exchange:before {\n  content: \"\"; }\n\n.fa-cloud-download:before {\n  content: \"\"; }\n\n.fa-cloud-upload:before {\n  content: \"\"; }\n\n.fa-user-md:before {\n  content: \"\"; }\n\n.fa-stethoscope:before {\n  content: \"\"; }\n\n.fa-suitcase:before {\n  content: \"\"; }\n\n.fa-bell-o:before {\n  content: \"\"; }\n\n.fa-coffee:before {\n  content: \"\"; }\n\n.fa-cutlery:before {\n  content: \"\"; }\n\n.fa-file-text-o:before {\n  content: \"\"; }\n\n.fa-building-o:before {\n  content: \"\"; }\n\n.fa-hospital-o:before {\n  content: \"\"; }\n\n.fa-ambulance:before {\n  content: \"\"; }\n\n.fa-medkit:before {\n  content: \"\"; }\n\n.fa-fighter-jet:before {\n  content: \"\"; }\n\n.fa-beer:before {\n  content: \"\"; }\n\n.fa-h-square:before {\n  content: \"\"; }\n\n.fa-plus-square:before {\n  content: \"\"; }\n\n.fa-angle-double-left:before {\n  content: \"\"; }\n\n.fa-angle-double-right:before {\n  content: \"\"; }\n\n.fa-angle-double-up:before {\n  content: \"\"; }\n\n.fa-angle-double-down:before {\n  content: \"\"; }\n\n.fa-angle-left:before {\n  content: \"\"; }\n\n.fa-angle-right:before {\n  content: \"\"; }\n\n.fa-angle-up:before {\n  content: \"\"; }\n\n.fa-angle-down:before {\n  content: \"\"; }\n\n.fa-desktop:before {\n  content: \"\"; }\n\n.fa-laptop:before {\n  content: \"\"; }\n\n.fa-tablet:before {\n  content: \"\"; }\n\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\"; }\n\n.fa-circle-o:before {\n  content: \"\"; }\n\n.fa-quote-left:before {\n  content: \"\"; }\n\n.fa-quote-right:before {\n  content: \"\"; }\n\n.fa-spinner:before {\n  content: \"\"; }\n\n.fa-circle:before {\n  content: \"\"; }\n\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\"; }\n\n.fa-github-alt:before {\n  content: \"\"; }\n\n.fa-folder-o:before {\n  content: \"\"; }\n\n.fa-folder-open-o:before {\n  content: \"\"; }\n\n.fa-smile-o:before {\n  content: \"\"; }\n\n.fa-frown-o:before {\n  content: \"\"; }\n\n.fa-meh-o:before {\n  content: \"\"; }\n\n.fa-gamepad:before {\n  content: \"\"; }\n\n.fa-keyboard-o:before {\n  content: \"\"; }\n\n.fa-flag-o:before {\n  content: \"\"; }\n\n.fa-flag-checkered:before {\n  content: \"\"; }\n\n.fa-terminal:before {\n  content: \"\"; }\n\n.fa-code:before {\n  content: \"\"; }\n\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\"; }\n\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\"; }\n\n.fa-location-arrow:before {\n  content: \"\"; }\n\n.fa-crop:before {\n  content: \"\"; }\n\n.fa-code-fork:before {\n  content: \"\"; }\n\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\"; }\n\n.fa-question:before {\n  content: \"\"; }\n\n.fa-info:before {\n  content: \"\"; }\n\n.fa-exclamation:before {\n  content: \"\"; }\n\n.fa-superscript:before {\n  content: \"\"; }\n\n.fa-subscript:before {\n  content: \"\"; }\n\n.fa-eraser:before {\n  content: \"\"; }\n\n.fa-puzzle-piece:before {\n  content: \"\"; }\n\n.fa-microphone:before {\n  content: \"\"; }\n\n.fa-microphone-slash:before {\n  content: \"\"; }\n\n.fa-shield:before {\n  content: \"\"; }\n\n.fa-calendar-o:before {\n  content: \"\"; }\n\n.fa-fire-extinguisher:before {\n  content: \"\"; }\n\n.fa-rocket:before {\n  content: \"\"; }\n\n.fa-maxcdn:before {\n  content: \"\"; }\n\n.fa-chevron-circle-left:before {\n  content: \"\"; }\n\n.fa-chevron-circle-right:before {\n  content: \"\"; }\n\n.fa-chevron-circle-up:before {\n  content: \"\"; }\n\n.fa-chevron-circle-down:before {\n  content: \"\"; }\n\n.fa-html5:before {\n  content: \"\"; }\n\n.fa-css3:before {\n  content: \"\"; }\n\n.fa-anchor:before {\n  content: \"\"; }\n\n.fa-unlock-alt:before {\n  content: \"\"; }\n\n.fa-bullseye:before {\n  content: \"\"; }\n\n.fa-ellipsis-h:before {\n  content: \"\"; }\n\n.fa-ellipsis-v:before {\n  content: \"\"; }\n\n.fa-rss-square:before {\n  content: \"\"; }\n\n.fa-play-circle:before {\n  content: \"\"; }\n\n.fa-ticket:before {\n  content: \"\"; }\n\n.fa-minus-square:before {\n  content: \"\"; }\n\n.fa-minus-square-o:before {\n  content: \"\"; }\n\n.fa-level-up:before {\n  content: \"\"; }\n\n.fa-level-down:before {\n  content: \"\"; }\n\n.fa-check-square:before {\n  content: \"\"; }\n\n.fa-pencil-square:before {\n  content: \"\"; }\n\n.fa-external-link-square:before {\n  content: \"\"; }\n\n.fa-share-square:before {\n  content: \"\"; }\n\n.fa-compass:before {\n  content: \"\"; }\n\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\"; }\n\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\"; }\n\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\"; }\n\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\"; }\n\n.fa-gbp:before {\n  content: \"\"; }\n\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\"; }\n\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\"; }\n\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\"; }\n\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\"; }\n\n.fa-won:before,\n.fa-krw:before {\n  content: \"\"; }\n\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\"; }\n\n.fa-file:before {\n  content: \"\"; }\n\n.fa-file-text:before {\n  content: \"\"; }\n\n.fa-sort-alpha-asc:before {\n  content: \"\"; }\n\n.fa-sort-alpha-desc:before {\n  content: \"\"; }\n\n.fa-sort-amount-asc:before {\n  content: \"\"; }\n\n.fa-sort-amount-desc:before {\n  content: \"\"; }\n\n.fa-sort-numeric-asc:before {\n  content: \"\"; }\n\n.fa-sort-numeric-desc:before {\n  content: \"\"; }\n\n.fa-thumbs-up:before {\n  content: \"\"; }\n\n.fa-thumbs-down:before {\n  content: \"\"; }\n\n.fa-youtube-square:before {\n  content: \"\"; }\n\n.fa-youtube:before {\n  content: \"\"; }\n\n.fa-xing:before {\n  content: \"\"; }\n\n.fa-xing-square:before {\n  content: \"\"; }\n\n.fa-youtube-play:before {\n  content: \"\"; }\n\n.fa-dropbox:before {\n  content: \"\"; }\n\n.fa-stack-overflow:before {\n  content: \"\"; }\n\n.fa-instagram:before {\n  content: \"\"; }\n\n.fa-flickr:before {\n  content: \"\"; }\n\n.fa-adn:before {\n  content: \"\"; }\n\n.fa-bitbucket:before {\n  content: \"\"; }\n\n.fa-bitbucket-square:before {\n  content: \"\"; }\n\n.fa-tumblr:before {\n  content: \"\"; }\n\n.fa-tumblr-square:before {\n  content: \"\"; }\n\n.fa-long-arrow-down:before {\n  content: \"\"; }\n\n.fa-long-arrow-up:before {\n  content: \"\"; }\n\n.fa-long-arrow-left:before {\n  content: \"\"; }\n\n.fa-long-arrow-right:before {\n  content: \"\"; }\n\n.fa-apple:before {\n  content: \"\"; }\n\n.fa-windows:before {\n  content: \"\"; }\n\n.fa-android:before {\n  content: \"\"; }\n\n.fa-linux:before {\n  content: \"\"; }\n\n.fa-dribbble:before {\n  content: \"\"; }\n\n.fa-skype:before {\n  content: \"\"; }\n\n.fa-foursquare:before {\n  content: \"\"; }\n\n.fa-trello:before {\n  content: \"\"; }\n\n.fa-female:before {\n  content: \"\"; }\n\n.fa-male:before {\n  content: \"\"; }\n\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\"; }\n\n.fa-sun-o:before {\n  content: \"\"; }\n\n.fa-moon-o:before {\n  content: \"\"; }\n\n.fa-archive:before {\n  content: \"\"; }\n\n.fa-bug:before {\n  content: \"\"; }\n\n.fa-vk:before {\n  content: \"\"; }\n\n.fa-weibo:before {\n  content: \"\"; }\n\n.fa-renren:before {\n  content: \"\"; }\n\n.fa-pagelines:before {\n  content: \"\"; }\n\n.fa-stack-exchange:before {\n  content: \"\"; }\n\n.fa-arrow-circle-o-right:before {\n  content: \"\"; }\n\n.fa-arrow-circle-o-left:before {\n  content: \"\"; }\n\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\"; }\n\n.fa-dot-circle-o:before {\n  content: \"\"; }\n\n.fa-wheelchair:before {\n  content: \"\"; }\n\n.fa-vimeo-square:before {\n  content: \"\"; }\n\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\"; }\n\n.fa-plus-square-o:before {\n  content: \"\"; }\n\n.fa-space-shuttle:before {\n  content: \"\"; }\n\n.fa-slack:before {\n  content: \"\"; }\n\n.fa-envelope-square:before {\n  content: \"\"; }\n\n.fa-wordpress:before {\n  content: \"\"; }\n\n.fa-openid:before {\n  content: \"\"; }\n\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\"; }\n\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\"; }\n\n.fa-yahoo:before {\n  content: \"\"; }\n\n.fa-google:before {\n  content: \"\"; }\n\n.fa-reddit:before {\n  content: \"\"; }\n\n.fa-reddit-square:before {\n  content: \"\"; }\n\n.fa-stumbleupon-circle:before {\n  content: \"\"; }\n\n.fa-stumbleupon:before {\n  content: \"\"; }\n\n.fa-delicious:before {\n  content: \"\"; }\n\n.fa-digg:before {\n  content: \"\"; }\n\n.fa-pied-piper-pp:before {\n  content: \"\"; }\n\n.fa-pied-piper-alt:before {\n  content: \"\"; }\n\n.fa-drupal:before {\n  content: \"\"; }\n\n.fa-joomla:before {\n  content: \"\"; }\n\n.fa-language:before {\n  content: \"\"; }\n\n.fa-fax:before {\n  content: \"\"; }\n\n.fa-building:before {\n  content: \"\"; }\n\n.fa-child:before {\n  content: \"\"; }\n\n.fa-paw:before {\n  content: \"\"; }\n\n.fa-spoon:before {\n  content: \"\"; }\n\n.fa-cube:before {\n  content: \"\"; }\n\n.fa-cubes:before {\n  content: \"\"; }\n\n.fa-behance:before {\n  content: \"\"; }\n\n.fa-behance-square:before {\n  content: \"\"; }\n\n.fa-steam:before {\n  content: \"\"; }\n\n.fa-steam-square:before {\n  content: \"\"; }\n\n.fa-recycle:before {\n  content: \"\"; }\n\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\"; }\n\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\"; }\n\n.fa-tree:before {\n  content: \"\"; }\n\n.fa-spotify:before {\n  content: \"\"; }\n\n.fa-deviantart:before {\n  content: \"\"; }\n\n.fa-soundcloud:before {\n  content: \"\"; }\n\n.fa-database:before {\n  content: \"\"; }\n\n.fa-file-pdf-o:before {\n  content: \"\"; }\n\n.fa-file-word-o:before {\n  content: \"\"; }\n\n.fa-file-excel-o:before {\n  content: \"\"; }\n\n.fa-file-powerpoint-o:before {\n  content: \"\"; }\n\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\"; }\n\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\"; }\n\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\"; }\n\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\"; }\n\n.fa-file-code-o:before {\n  content: \"\"; }\n\n.fa-vine:before {\n  content: \"\"; }\n\n.fa-codepen:before {\n  content: \"\"; }\n\n.fa-jsfiddle:before {\n  content: \"\"; }\n\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\"; }\n\n.fa-circle-o-notch:before {\n  content: \"\"; }\n\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\"; }\n\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\"; }\n\n.fa-git-square:before {\n  content: \"\"; }\n\n.fa-git:before {\n  content: \"\"; }\n\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\"; }\n\n.fa-tencent-weibo:before {\n  content: \"\"; }\n\n.fa-qq:before {\n  content: \"\"; }\n\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\"; }\n\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\"; }\n\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\"; }\n\n.fa-history:before {\n  content: \"\"; }\n\n.fa-circle-thin:before {\n  content: \"\"; }\n\n.fa-header:before {\n  content: \"\"; }\n\n.fa-paragraph:before {\n  content: \"\"; }\n\n.fa-sliders:before {\n  content: \"\"; }\n\n.fa-share-alt:before {\n  content: \"\"; }\n\n.fa-share-alt-square:before {\n  content: \"\"; }\n\n.fa-bomb:before {\n  content: \"\"; }\n\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\"; }\n\n.fa-tty:before {\n  content: \"\"; }\n\n.fa-binoculars:before {\n  content: \"\"; }\n\n.fa-plug:before {\n  content: \"\"; }\n\n.fa-slideshare:before {\n  content: \"\"; }\n\n.fa-twitch:before {\n  content: \"\"; }\n\n.fa-yelp:before {\n  content: \"\"; }\n\n.fa-newspaper-o:before {\n  content: \"\"; }\n\n.fa-wifi:before {\n  content: \"\"; }\n\n.fa-calculator:before {\n  content: \"\"; }\n\n.fa-paypal:before {\n  content: \"\"; }\n\n.fa-google-wallet:before {\n  content: \"\"; }\n\n.fa-cc-visa:before {\n  content: \"\"; }\n\n.fa-cc-mastercard:before {\n  content: \"\"; }\n\n.fa-cc-discover:before {\n  content: \"\"; }\n\n.fa-cc-amex:before {\n  content: \"\"; }\n\n.fa-cc-paypal:before {\n  content: \"\"; }\n\n.fa-cc-stripe:before {\n  content: \"\"; }\n\n.fa-bell-slash:before {\n  content: \"\"; }\n\n.fa-bell-slash-o:before {\n  content: \"\"; }\n\n.fa-trash:before {\n  content: \"\"; }\n\n.fa-copyright:before {\n  content: \"\"; }\n\n.fa-at:before {\n  content: \"\"; }\n\n.fa-eyedropper:before {\n  content: \"\"; }\n\n.fa-paint-brush:before {\n  content: \"\"; }\n\n.fa-birthday-cake:before {\n  content: \"\"; }\n\n.fa-area-chart:before {\n  content: \"\"; }\n\n.fa-pie-chart:before {\n  content: \"\"; }\n\n.fa-line-chart:before {\n  content: \"\"; }\n\n.fa-lastfm:before {\n  content: \"\"; }\n\n.fa-lastfm-square:before {\n  content: \"\"; }\n\n.fa-toggle-off:before {\n  content: \"\"; }\n\n.fa-toggle-on:before {\n  content: \"\"; }\n\n.fa-bicycle:before {\n  content: \"\"; }\n\n.fa-bus:before {\n  content: \"\"; }\n\n.fa-ioxhost:before {\n  content: \"\"; }\n\n.fa-angellist:before {\n  content: \"\"; }\n\n.fa-cc:before {\n  content: \"\"; }\n\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\"; }\n\n.fa-meanpath:before {\n  content: \"\"; }\n\n.fa-buysellads:before {\n  content: \"\"; }\n\n.fa-connectdevelop:before {\n  content: \"\"; }\n\n.fa-dashcube:before {\n  content: \"\"; }\n\n.fa-forumbee:before {\n  content: \"\"; }\n\n.fa-leanpub:before {\n  content: \"\"; }\n\n.fa-sellsy:before {\n  content: \"\"; }\n\n.fa-shirtsinbulk:before {\n  content: \"\"; }\n\n.fa-simplybuilt:before {\n  content: \"\"; }\n\n.fa-skyatlas:before {\n  content: \"\"; }\n\n.fa-cart-plus:before {\n  content: \"\"; }\n\n.fa-cart-arrow-down:before {\n  content: \"\"; }\n\n.fa-diamond:before {\n  content: \"\"; }\n\n.fa-ship:before {\n  content: \"\"; }\n\n.fa-user-secret:before {\n  content: \"\"; }\n\n.fa-motorcycle:before {\n  content: \"\"; }\n\n.fa-street-view:before {\n  content: \"\"; }\n\n.fa-heartbeat:before {\n  content: \"\"; }\n\n.fa-venus:before {\n  content: \"\"; }\n\n.fa-mars:before {\n  content: \"\"; }\n\n.fa-mercury:before {\n  content: \"\"; }\n\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\"; }\n\n.fa-transgender-alt:before {\n  content: \"\"; }\n\n.fa-venus-double:before {\n  content: \"\"; }\n\n.fa-mars-double:before {\n  content: \"\"; }\n\n.fa-venus-mars:before {\n  content: \"\"; }\n\n.fa-mars-stroke:before {\n  content: \"\"; }\n\n.fa-mars-stroke-v:before {\n  content: \"\"; }\n\n.fa-mars-stroke-h:before {\n  content: \"\"; }\n\n.fa-neuter:before {\n  content: \"\"; }\n\n.fa-genderless:before {\n  content: \"\"; }\n\n.fa-facebook-official:before {\n  content: \"\"; }\n\n.fa-pinterest-p:before {\n  content: \"\"; }\n\n.fa-whatsapp:before {\n  content: \"\"; }\n\n.fa-server:before {\n  content: \"\"; }\n\n.fa-user-plus:before {\n  content: \"\"; }\n\n.fa-user-times:before {\n  content: \"\"; }\n\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\"; }\n\n.fa-viacoin:before {\n  content: \"\"; }\n\n.fa-train:before {\n  content: \"\"; }\n\n.fa-subway:before {\n  content: \"\"; }\n\n.fa-medium:before {\n  content: \"\"; }\n\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\"; }\n\n.fa-optin-monster:before {\n  content: \"\"; }\n\n.fa-opencart:before {\n  content: \"\"; }\n\n.fa-expeditedssl:before {\n  content: \"\"; }\n\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\"; }\n\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\"; }\n\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\"; }\n\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\"; }\n\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\"; }\n\n.fa-mouse-pointer:before {\n  content: \"\"; }\n\n.fa-i-cursor:before {\n  content: \"\"; }\n\n.fa-object-group:before {\n  content: \"\"; }\n\n.fa-object-ungroup:before {\n  content: \"\"; }\n\n.fa-sticky-note:before {\n  content: \"\"; }\n\n.fa-sticky-note-o:before {\n  content: \"\"; }\n\n.fa-cc-jcb:before {\n  content: \"\"; }\n\n.fa-cc-diners-club:before {\n  content: \"\"; }\n\n.fa-clone:before {\n  content: \"\"; }\n\n.fa-balance-scale:before {\n  content: \"\"; }\n\n.fa-hourglass-o:before {\n  content: \"\"; }\n\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\"; }\n\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\"; }\n\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\"; }\n\n.fa-hourglass:before {\n  content: \"\"; }\n\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\"; }\n\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\"; }\n\n.fa-hand-scissors-o:before {\n  content: \"\"; }\n\n.fa-hand-lizard-o:before {\n  content: \"\"; }\n\n.fa-hand-spock-o:before {\n  content: \"\"; }\n\n.fa-hand-pointer-o:before {\n  content: \"\"; }\n\n.fa-hand-peace-o:before {\n  content: \"\"; }\n\n.fa-trademark:before {\n  content: \"\"; }\n\n.fa-registered:before {\n  content: \"\"; }\n\n.fa-creative-commons:before {\n  content: \"\"; }\n\n.fa-gg:before {\n  content: \"\"; }\n\n.fa-gg-circle:before {\n  content: \"\"; }\n\n.fa-tripadvisor:before {\n  content: \"\"; }\n\n.fa-odnoklassniki:before {\n  content: \"\"; }\n\n.fa-odnoklassniki-square:before {\n  content: \"\"; }\n\n.fa-get-pocket:before {\n  content: \"\"; }\n\n.fa-wikipedia-w:before {\n  content: \"\"; }\n\n.fa-safari:before {\n  content: \"\"; }\n\n.fa-chrome:before {\n  content: \"\"; }\n\n.fa-firefox:before {\n  content: \"\"; }\n\n.fa-opera:before {\n  content: \"\"; }\n\n.fa-internet-explorer:before {\n  content: \"\"; }\n\n.fa-tv:before,\n.fa-television:before {\n  content: \"\"; }\n\n.fa-contao:before {\n  content: \"\"; }\n\n.fa-500px:before {\n  content: \"\"; }\n\n.fa-amazon:before {\n  content: \"\"; }\n\n.fa-calendar-plus-o:before {\n  content: \"\"; }\n\n.fa-calendar-minus-o:before {\n  content: \"\"; }\n\n.fa-calendar-times-o:before {\n  content: \"\"; }\n\n.fa-calendar-check-o:before {\n  content: \"\"; }\n\n.fa-industry:before {\n  content: \"\"; }\n\n.fa-map-pin:before {\n  content: \"\"; }\n\n.fa-map-signs:before {\n  content: \"\"; }\n\n.fa-map-o:before {\n  content: \"\"; }\n\n.fa-map:before {\n  content: \"\"; }\n\n.fa-commenting:before {\n  content: \"\"; }\n\n.fa-commenting-o:before {\n  content: \"\"; }\n\n.fa-houzz:before {\n  content: \"\"; }\n\n.fa-vimeo:before {\n  content: \"\"; }\n\n.fa-black-tie:before {\n  content: \"\"; }\n\n.fa-fonticons:before {\n  content: \"\"; }\n\n.fa-reddit-alien:before {\n  content: \"\"; }\n\n.fa-edge:before {\n  content: \"\"; }\n\n.fa-credit-card-alt:before {\n  content: \"\"; }\n\n.fa-codiepie:before {\n  content: \"\"; }\n\n.fa-modx:before {\n  content: \"\"; }\n\n.fa-fort-awesome:before {\n  content: \"\"; }\n\n.fa-usb:before {\n  content: \"\"; }\n\n.fa-product-hunt:before {\n  content: \"\"; }\n\n.fa-mixcloud:before {\n  content: \"\"; }\n\n.fa-scribd:before {\n  content: \"\"; }\n\n.fa-pause-circle:before {\n  content: \"\"; }\n\n.fa-pause-circle-o:before {\n  content: \"\"; }\n\n.fa-stop-circle:before {\n  content: \"\"; }\n\n.fa-stop-circle-o:before {\n  content: \"\"; }\n\n.fa-shopping-bag:before {\n  content: \"\"; }\n\n.fa-shopping-basket:before {\n  content: \"\"; }\n\n.fa-hashtag:before {\n  content: \"\"; }\n\n.fa-bluetooth:before {\n  content: \"\"; }\n\n.fa-bluetooth-b:before {\n  content: \"\"; }\n\n.fa-percent:before {\n  content: \"\"; }\n\n.fa-gitlab:before {\n  content: \"\"; }\n\n.fa-wpbeginner:before {\n  content: \"\"; }\n\n.fa-wpforms:before {\n  content: \"\"; }\n\n.fa-envira:before {\n  content: \"\"; }\n\n.fa-universal-access:before {\n  content: \"\"; }\n\n.fa-wheelchair-alt:before {\n  content: \"\"; }\n\n.fa-question-circle-o:before {\n  content: \"\"; }\n\n.fa-blind:before {\n  content: \"\"; }\n\n.fa-audio-description:before {\n  content: \"\"; }\n\n.fa-volume-control-phone:before {\n  content: \"\"; }\n\n.fa-braille:before {\n  content: \"\"; }\n\n.fa-assistive-listening-systems:before {\n  content: \"\"; }\n\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\"; }\n\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\"; }\n\n.fa-glide:before {\n  content: \"\"; }\n\n.fa-glide-g:before {\n  content: \"\"; }\n\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\"; }\n\n.fa-low-vision:before {\n  content: \"\"; }\n\n.fa-viadeo:before {\n  content: \"\"; }\n\n.fa-viadeo-square:before {\n  content: \"\"; }\n\n.fa-snapchat:before {\n  content: \"\"; }\n\n.fa-snapchat-ghost:before {\n  content: \"\"; }\n\n.fa-snapchat-square:before {\n  content: \"\"; }\n\n.fa-pied-piper:before {\n  content: \"\"; }\n\n.fa-first-order:before {\n  content: \"\"; }\n\n.fa-yoast:before {\n  content: \"\"; }\n\n.fa-themeisle:before {\n  content: \"\"; }\n\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\"; }\n\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\"; }\n\n.fa-handshake-o:before {\n  content: \"\"; }\n\n.fa-envelope-open:before {\n  content: \"\"; }\n\n.fa-envelope-open-o:before {\n  content: \"\"; }\n\n.fa-linode:before {\n  content: \"\"; }\n\n.fa-address-book:before {\n  content: \"\"; }\n\n.fa-address-book-o:before {\n  content: \"\"; }\n\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\"; }\n\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\"; }\n\n.fa-user-circle:before {\n  content: \"\"; }\n\n.fa-user-circle-o:before {\n  content: \"\"; }\n\n.fa-user-o:before {\n  content: \"\"; }\n\n.fa-id-badge:before {\n  content: \"\"; }\n\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\"; }\n\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\"; }\n\n.fa-quora:before {\n  content: \"\"; }\n\n.fa-free-code-camp:before {\n  content: \"\"; }\n\n.fa-telegram:before {\n  content: \"\"; }\n\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\"; }\n\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\"; }\n\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\"; }\n\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\"; }\n\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\"; }\n\n.fa-shower:before {\n  content: \"\"; }\n\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\"; }\n\n.fa-podcast:before {\n  content: \"\"; }\n\n.fa-window-maximize:before {\n  content: \"\"; }\n\n.fa-window-minimize:before {\n  content: \"\"; }\n\n.fa-window-restore:before {\n  content: \"\"; }\n\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\"; }\n\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\"; }\n\n.fa-bandcamp:before {\n  content: \"\"; }\n\n.fa-grav:before {\n  content: \"\"; }\n\n.fa-etsy:before {\n  content: \"\"; }\n\n.fa-imdb:before {\n  content: \"\"; }\n\n.fa-ravelry:before {\n  content: \"\"; }\n\n.fa-eercast:before {\n  content: \"\"; }\n\n.fa-microchip:before {\n  content: \"\"; }\n\n.fa-snowflake-o:before {\n  content: \"\"; }\n\n.fa-superpowers:before {\n  content: \"\"; }\n\n.fa-wpexplorer:before {\n  content: \"\"; }\n\n.fa-meetup:before {\n  content: \"\"; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n/*\r\n * Glyphicons Halflings\r\n */\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(\"../fonts/glyphicons-halflings-regular.eot\");\n  src: url(\"../fonts/glyphicons-halflings-regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/glyphicons-halflings-regular.woff2\") format(\"woff2\"), url(\"../fonts/glyphicons-halflings-regular.woff\") format(\"woff\"), url(\"../fonts/glyphicons-halflings-regular.ttf\") format(\"truetype\"), url(\"../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular\") format(\"svg\"); }\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  vertical-align: top;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n  .glyphicon.x05 {\n    font-size: 6px; }\n  .glyphicon.x2 {\n    font-size: 24px; }\n  .glyphicon.x3 {\n    font-size: 36px; }\n  .glyphicon.x4 {\n    font-size: 48px; }\n  .glyphicon.x5 {\n    font-size: 60px; }\n  .glyphicon.x6 {\n    font-size: 72px; }\n  .glyphicon.x7 {\n    font-size: 84px; }\n  .glyphicon.x8 {\n    font-size: 96px; }\n  .glyphicon.light:before {\n    color: #f2f2f2; }\n  .glyphicon.drop:before {\n    text-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3); }\n  .glyphicon.flip {\n    -moz-transform: scaleX(-1);\n    -o-transform: scaleX(-1);\n    -webkit-transform: scaleX(-1);\n    transform: scaleX(-1);\n    filter: FlipH;\n    -ms-filter: \"FlipH\"; }\n  .glyphicon.flipv {\n    -moz-transform: scaleY(-1);\n    -o-transform: scaleY(-1);\n    -webkit-transform: scaleY(-1);\n    transform: scaleY(-1);\n    filter: FlipV;\n    -ms-filter: \"FlipV\"; }\n  .glyphicon.rotate90 {\n    -webkit-transform: rotate(90deg);\n    -moz-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg); }\n  .glyphicon.rotate180 {\n    -webkit-transform: rotate(180deg);\n    -moz-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  .glyphicon.rotate270 {\n    -webkit-transform: rotate(270deg);\n    -moz-transform: rotate(270deg);\n    -ms-transform: rotate(270deg);\n    transform: rotate(270deg); }\n\n.glyphicon-glass:before {\n  content: \"\\E001\"; }\n\n.glyphicon-music:before {\n  content: \"\\E002\"; }\n\n.glyphicon-search:before {\n  content: \"\\E003\"; }\n\n.glyphicon-envelope:before {\n  content: \"\\2709\"; }\n\n.glyphicon-heart:before {\n  content: \"\\E005\"; }\n\n.glyphicon-star:before {\n  content: \"\\E006\"; }\n\n.glyphicon-star-empty:before {\n  content: \"\\E007\"; }\n\n.glyphicon-user:before {\n  content: \"\\E008\"; }\n\n.glyphicon-film:before {\n  content: \"\\E009\"; }\n\n.glyphicon-th-large:before {\n  content: \"\\E010\"; }\n\n.glyphicon-th:before {\n  content: \"\\E011\"; }\n\n.glyphicon-th-list:before {\n  content: \"\\E012\"; }\n\n.glyphicon-ok:before {\n  content: \"\\E013\"; }\n\n.glyphicon-remove:before {\n  content: \"\\E014\"; }\n\n.glyphicon-zoom-in:before {\n  content: \"\\E015\"; }\n\n.glyphicon-zoom-out:before {\n  content: \"\\E016\"; }\n\n.glyphicon-off:before {\n  content: \"\\E017\"; }\n\n.glyphicon-signal:before {\n  content: \"\\E018\"; }\n\n.glyphicon-cog:before {\n  content: \"\\E019\"; }\n\n.glyphicon-trash:before {\n  content: \"\\E020\"; }\n\n.glyphicon-home:before {\n  content: \"\\E021\"; }\n\n.glyphicon-file:before {\n  content: \"\\E022\"; }\n\n.glyphicon-time:before {\n  content: \"\\E023\"; }\n\n.glyphicon-road:before {\n  content: \"\\E024\"; }\n\n.glyphicon-download-alt:before {\n  content: \"\\E025\"; }\n\n.glyphicon-download:before {\n  content: \"\\E026\"; }\n\n.glyphicon-upload:before {\n  content: \"\\E027\"; }\n\n.glyphicon-inbox:before {\n  content: \"\\E028\"; }\n\n.glyphicon-play-circle:before {\n  content: \"\\E029\"; }\n\n.glyphicon-repeat:before {\n  content: \"\\E030\"; }\n\n.glyphicon-refresh:before {\n  content: \"\\E031\"; }\n\n.glyphicon-list-alt:before {\n  content: \"\\E032\"; }\n\n.glyphicon-glyph-lock:before {\n  content: \"\\E033\"; }\n\n.glyphicon-flag:before {\n  content: \"\\E034\"; }\n\n.glyphicon-headphones:before {\n  content: \"\\E035\"; }\n\n.glyphicon-volume-off:before {\n  content: \"\\E036\"; }\n\n.glyphicon-volume-down:before {\n  content: \"\\E037\"; }\n\n.glyphicon-volume-up:before {\n  content: \"\\E038\"; }\n\n.glyphicon-qrcode:before {\n  content: \"\\E039\"; }\n\n.glyphicon-barcode:before {\n  content: \"\\E040\"; }\n\n.glyphicon-tag:before {\n  content: \"\\E041\"; }\n\n.glyphicon-tags:before {\n  content: \"\\E042\"; }\n\n.glyphicon-book:before {\n  content: \"\\E043\"; }\n\n.glyphicon-glyph-bookmark:before {\n  content: \"\\E044\"; }\n\n.glyphicon-print:before {\n  content: \"\\E045\"; }\n\n.glyphicon-glyph-camera:before {\n  content: \"\\E046\"; }\n\n.glyphicon-font:before {\n  content: \"\\E047\"; }\n\n.glyphicon-bold:before {\n  content: \"\\E048\"; }\n\n.glyphicon-italic:before {\n  content: \"\\E049\"; }\n\n.glyphicon-text-height:before {\n  content: \"\\E050\"; }\n\n.glyphicon-text-width:before {\n  content: \"\\E051\"; }\n\n.glyphicon-align-left:before {\n  content: \"\\E052\"; }\n\n.glyphicon-align-center:before {\n  content: \"\\E053\"; }\n\n.glyphicon-align-right:before {\n  content: \"\\E054\"; }\n\n.glyphicon-align-justify:before {\n  content: \"\\E055\"; }\n\n.glyphicon-list:before {\n  content: \"\\E056\"; }\n\n.glyphicon-indent-left:before {\n  content: \"\\E057\"; }\n\n.glyphicon-indent-right:before {\n  content: \"\\E058\"; }\n\n.glyphicon-facetime-video:before {\n  content: \"\\E059\"; }\n\n.glyphicon-picture:before {\n  content: \"\\E060\"; }\n\n.glyphicon-pencil:before {\n  content: \"\\270F\"; }\n\n.glyphicon-map-marker:before {\n  content: \"\\E062\"; }\n\n.glyphicon-adjust:before {\n  content: \"\\E063\"; }\n\n.glyphicon-tint:before {\n  content: \"\\E064\"; }\n\n.glyphicon-edit:before {\n  content: \"\\E065\"; }\n\n.glyphicon-share:before {\n  content: \"\\E066\"; }\n\n.glyphicon-check:before {\n  content: \"\\E067\"; }\n\n.glyphicon-move:before {\n  content: \"\\E068\"; }\n\n.glyphicon-step-backward:before {\n  content: \"\\E069\"; }\n\n.glyphicon-fast-backward:before {\n  content: \"\\E070\"; }\n\n.glyphicon-backward:before {\n  content: \"\\E071\"; }\n\n.glyphicon-play:before {\n  content: \"\\E072\"; }\n\n.glyphicon-pause:before {\n  content: \"\\E073\"; }\n\n.glyphicon-stop:before {\n  content: \"\\E074\"; }\n\n.glyphicon-forward:before {\n  content: \"\\E075\"; }\n\n.glyphicon-fast-forward:before {\n  content: \"\\E076\"; }\n\n.glyphicon-step-forward:before {\n  content: \"\\E077\"; }\n\n.glyphicon-eject:before {\n  content: \"\\E078\"; }\n\n.glyphicon-chevron-left:before {\n  content: \"\\E079\"; }\n\n.glyphicon-chevron-right:before {\n  content: \"\\E080\"; }\n\n.glyphicon-plus-sign:before {\n  content: \"\\E081\"; }\n\n.glyphicon-minus-sign:before {\n  content: \"\\E082\"; }\n\n.glyphicon-remove-sign:before {\n  content: \"\\E083\"; }\n\n.glyphicon-ok-sign:before {\n  content: \"\\E084\"; }\n\n.glyphicon-question-sign:before {\n  content: \"\\E085\"; }\n\n.glyphicon-info-sign:before {\n  content: \"\\E086\"; }\n\n.glyphicon-screenshot:before {\n  content: \"\\E087\"; }\n\n.glyphicon-remove-circle:before {\n  content: \"\\E088\"; }\n\n.glyphicon-ok-circle:before {\n  content: \"\\E089\"; }\n\n.glyphicon-ban-circle:before {\n  content: \"\\E090\"; }\n\n.glyphicon-arrow-left:before {\n  content: \"\\E091\"; }\n\n.glyphicon-arrow-right:before {\n  content: \"\\E092\"; }\n\n.glyphicon-arrow-up:before {\n  content: \"\\E093\"; }\n\n.glyphicon-arrow-down:before {\n  content: \"\\E094\"; }\n\n.glyphicon-share-alt:before {\n  content: \"\\E095\"; }\n\n.glyphicon-resize-full:before {\n  content: \"\\E096\"; }\n\n.glyphicon-resize-small:before {\n  content: \"\\E097\"; }\n\n.glyphicon-plus:before {\n  content: \"\\002B\"; }\n\n.glyphicon-minus:before {\n  content: \"\\2212\"; }\n\n.glyphicon-asterisk:before {\n  content: \"\\002A\"; }\n\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\"; }\n\n.glyphicon-gift:before {\n  content: \"\\E102\"; }\n\n.glyphicon-leaf:before {\n  content: \"\\E103\"; }\n\n.glyphicon-glyph-fire:before {\n  content: \"\\E104\"; }\n\n.glyphicon-eye-open:before {\n  content: \"\\E105\"; }\n\n.glyphicon-eye-close:before {\n  content: \"\\E106\"; }\n\n.glyphicon-warning-sign:before {\n  content: \"\\E107\"; }\n\n.glyphicon-plane:before {\n  content: \"\\E108\"; }\n\n.glyphicon-glyph-calendar:before {\n  content: \"\\E109\"; }\n\n.glyphicon-random:before {\n  content: \"\\E110\"; }\n\n.glyphicon-comments:before {\n  content: \"\\E111\"; }\n\n.glyphicon-magnet:before {\n  content: \"\\E112\"; }\n\n.glyphicon-chevron-up:before {\n  content: \"\\E113\"; }\n\n.glyphicon-chevron-down:before {\n  content: \"\\E114\"; }\n\n.glyphicon-retweet:before {\n  content: \"\\E115\"; }\n\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\"; }\n\n.glyphicon-folder-close:before {\n  content: \"\\E117\"; }\n\n.glyphicon-folder-open:before {\n  content: \"\\E118\"; }\n\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\"; }\n\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\"; }\n\n.glyphicon-hdd:before {\n  content: \"\\E121\"; }\n\n.glyphicon-bullhorn:before {\n  content: \"\\E122\"; }\n\n.glyphicon-glyph-bell:before {\n  content: \"\\E123\"; }\n\n.glyphicon-certificate:before {\n  content: \"\\E124\"; }\n\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\"; }\n\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\"; }\n\n.glyphicon-hand-right:before {\n  content: \"\\E127\"; }\n\n.glyphicon-hand-left:before {\n  content: \"\\E128\"; }\n\n.glyphicon-hand-top:before {\n  content: \"\\E129\"; }\n\n.glyphicon-hand-down:before {\n  content: \"\\E130\"; }\n\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\"; }\n\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\"; }\n\n.glyphicon-circle-arrow-top:before {\n  content: \"\\E133\"; }\n\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\"; }\n\n.glyphicon-globe:before {\n  content: \"\\E135\"; }\n\n.glyphicon-glyph-wrench:before {\n  content: \"\\E136\"; }\n\n.glyphicon-tasks:before {\n  content: \"\\E137\"; }\n\n.glyphicon-filter:before {\n  content: \"\\E138\"; }\n\n.glyphicon-glyph-briefcase:before {\n  content: \"\\E139\"; }\n\n.glyphicon-fullscreen:before {\n  content: \"\\E140\"; }\n\n.glyphicon-dashboard:before {\n  content: \"\\E141\"; }\n\n.glyphicon-glyph-paperclip:before {\n  content: \"\\E142\"; }\n\n.glyphicon-heart-empty:before {\n  content: \"\\E143\"; }\n\n.glyphicon-link:before {\n  content: \"\\E144\"; }\n\n.glyphicon-phone:before {\n  content: \"\\E145\"; }\n\n.glyphicon-glyph-pushpin:before {\n  content: \"\\E146\"; }\n\n.glyphicon-euro:before {\n  content: \"\\20AC\"; }\n\n.glyphicon-usd:before {\n  content: \"\\E148\"; }\n\n.glyphicon-gbp:before {\n  content: \"\\E149\"; }\n\n.glyphicon-sort:before {\n  content: \"\\E150\"; }\n\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\"; }\n\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\"; }\n\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\"; }\n\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\"; }\n\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\"; }\n\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\"; }\n\n.glyphicon-unchecked:before {\n  content: \"\\E157\"; }\n\n.glyphicon-expand:before {\n  content: \"\\E158\"; }\n\n.glyphicon-collapse:before {\n  content: \"\\E159\"; }\n\n.glyphicon-collapse-top:before {\n  content: \"\\E160\"; }\n\n.glyphicon-log-in:before {\n  content: \"\\E161\"; }\n\n.glyphicon-flash:before {\n  content: \"\\E162\"; }\n\n.glyphicon-log-out:before {\n  content: \"\\E163\"; }\n\n.glyphicon-new-window:before {\n  content: \"\\E164\"; }\n\n.glyphicon-record:before {\n  content: \"\\E165\"; }\n\n.glyphicon-save:before {\n  content: \"\\E166\"; }\n\n.glyphicon-open:before {\n  content: \"\\E167\"; }\n\n.glyphicon-saved:before {\n  content: \"\\E168\"; }\n\n.glyphicon-import:before {\n  content: \"\\E169\"; }\n\n.glyphicon-export:before {\n  content: \"\\E170\"; }\n\n.glyphicon-send:before {\n  content: \"\\E171\"; }\n\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\"; }\n\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\"; }\n\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\"; }\n\n.glyphicon-floppy-save:before {\n  content: \"\\E175\"; }\n\n.glyphicon-floppy-open:before {\n  content: \"\\E176\"; }\n\n.glyphicon-credit-card:before {\n  content: \"\\E177\"; }\n\n.glyphicon-transfer:before {\n  content: \"\\E178\"; }\n\n.glyphicon-cutlery:before {\n  content: \"\\E179\"; }\n\n.glyphicon-header:before {\n  content: \"\\E180\"; }\n\n.glyphicon-compressed:before {\n  content: \"\\E181\"; }\n\n.glyphicon-earphone:before {\n  content: \"\\E182\"; }\n\n.glyphicon-phone-alt:before {\n  content: \"\\E183\"; }\n\n.glyphicon-tower:before {\n  content: \"\\E184\"; }\n\n.glyphicon-stats:before {\n  content: \"\\E185\"; }\n\n.glyphicon-sd-video:before {\n  content: \"\\E186\"; }\n\n.glyphicon-hd-video:before {\n  content: \"\\E187\"; }\n\n.glyphicon-subtitles:before {\n  content: \"\\E188\"; }\n\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\"; }\n\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\"; }\n\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\"; }\n\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\"; }\n\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\"; }\n\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\"; }\n\n.glyphicon-registration-mark:before {\n  content: \"\\E195\"; }\n\n.glyphicon-cloud:before {\n  content: \"\\2601\"; }\n\n.glyphicon-cloud-download:before {\n  content: \"\\E197\"; }\n\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\"; }\n\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\"; }\n\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\"; }\n\n.glyphicon-cd:before {\n  content: \"\\E201\"; }\n\n.glyphicon-save-file:before {\n  content: \"\\E202\"; }\n\n.glyphicon-open-file:before {\n  content: \"\\E203\"; }\n\n.glyphicon-level-up:before {\n  content: \"\\E204\"; }\n\n.glyphicon-copy:before {\n  content: \"\\E205\"; }\n\n.glyphicon-paste:before {\n  content: \"\\E206\"; }\n\n.glyphicon-door:before {\n  content: \"\\1F6AA\"; }\n\n.glyphicon-key:before {\n  content: \"\\1F511\"; }\n\n.glyphicon-alert:before {\n  content: \"\\E209\"; }\n\n.glyphicon-equalizer:before {\n  content: \"\\E210\"; }\n\n.glyphicon-king:before {\n  content: \"\\E211\"; }\n\n.glyphicon-queen:before {\n  content: \"\\E212\"; }\n\n.glyphicon-pawn:before {\n  content: \"\\E213\"; }\n\n.glyphicon-bishop:before {\n  content: \"\\E214\"; }\n\n.glyphicon-knight:before {\n  content: \"\\E215\"; }\n\n.glyphicon-baby-formula:before {\n  content: \"\\E216\"; }\n\n.glyphicon-tent:before {\n  content: \"\\26FA\"; }\n\n.glyphicon-blackboard:before {\n  content: \"\\E218\"; }\n\n.glyphicon-bed:before {\n  content: \"\\E219\"; }\n\n.glyphicon-apple:before {\n  content: \"\\F8FF\"; }\n\n.glyphicon-erase:before {\n  content: \"\\E221\"; }\n\n.glyphicon-hourglass:before {\n  content: \"\\231B\"; }\n\n.glyphicon-lamp:before {\n  content: \"\\E223\"; }\n\n.glyphicon-duplicate:before {\n  content: \"\\E224\"; }\n\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\"; }\n\n.glyphicon-scissors:before {\n  content: \"\\E226\"; }\n\n.glyphicon-bitcoin:before {\n  content: \"\\E227\"; }\n\n.glyphicon-yen:before {\n  content: \"\\00A5\"; }\n\n.glyphicon-ruble:before {\n  content: \"\\20BD\"; }\n\n.glyphicon-scale:before {\n  content: \"\\E230\"; }\n\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\"; }\n\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\"; }\n\n.glyphicon-education:before {\n  content: \"\\E233\"; }\n\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\"; }\n\n.glyphicon-option-vertical:before {\n  content: \"\\E235\"; }\n\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\"; }\n\n.glyphicon-modal-window:before {\n  content: \"\\E237\"; }\n\n.glyphicon-oil:before {\n  content: \"\\E238\"; }\n\n.glyphicon-grain:before {\n  content: \"\\E239\"; }\n\n.glyphicon-sunglasses:before {\n  content: \"\\E240\"; }\n\n.glyphicon-text-size:before {\n  content: \"\\E241\"; }\n\n.glyphicon-text-color:before {\n  content: \"\\E242\"; }\n\n.glyphicon-text-background:before {\n  content: \"\\E243\"; }\n\n.glyphicon-object-align-top:before {\n  content: \"\\E244\"; }\n\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\"; }\n\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\"; }\n\n.glyphicon-object-align-left:before {\n  content: \"\\E247\"; }\n\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\"; }\n\n.glyphicon-object-align-right:before {\n  content: \"\\E249\"; }\n\n.glyphicon-triangle-right:before {\n  content: \"\\E250\"; }\n\n.glyphicon-triangle-left:before {\n  content: \"\\E251\"; }\n\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\"; }\n\n.glyphicon-triangle-top:before {\n  content: \"\\E253\"; }\n\n.glyphicon-terminal:before {\n  content: \"\\E254\"; }\n\n.glyphicon-superscript:before {\n  content: \"\\E255\"; }\n\n.glyphicon-subscript:before {\n  content: \"\\E256\"; }\n\n.glyphicon-menu-left:before {\n  content: \"\\E257\"; }\n\n.glyphicon-menu-right:before {\n  content: \"\\E258\"; }\n\n.glyphicon-menu-down:before {\n  content: \"\\E259\"; }\n\n.glyphicon-menu-up:before {\n  content: \"\\E260\"; }\n\n/* \r\n* \r\n* THIS IS A SMALL BONUS FOR ALL CURIOUS PEOPLE :) \r\n* Just add class .animated and .pulse, .rotateIn, .bounce, .swing or .tada to you HTML element with icons. You may find other great css animations here: http://coveloping.com/tools/css-animation-generator \r\n* \r\n*/\n/*!\r\n * animate.css -http://daneden.me/animate\r\n * Version - 3.5.1\r\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\r\n *\r\n * Copyright (c) 2016 Daniel Eden\r\n */\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both; }\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite; }\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s; }\n\n.animated.flipOutX,\n.animated.flipOutY,\n.animated.bounceIn,\n.animated.bounceOut {\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s; }\n\n@-webkit-keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n@keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom; }\n\n@-webkit-keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n@keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse; }\n\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand; }\n\n@-webkit-keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n@keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake; }\n\n@-webkit-keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n.headShake {\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-name: headShake;\n  animation-name: headShake; }\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n.swing {\n  -webkit-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing; }\n\n@-webkit-keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble; }\n\n@-webkit-keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39063deg) skewY(0.39063deg);\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n@keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39063deg) skewY(0.39063deg);\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n.jello {\n  -webkit-animation-name: jello;\n  animation-name: jello;\n  -webkit-transform-origin: center;\n  transform-origin: center; }\n\n@-webkit-keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn; }\n\n@-webkit-keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown; }\n\n@-webkit-keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft; }\n\n@-webkit-keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight; }\n\n@-webkit-keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp; }\n\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut; }\n\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown; }\n\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft; }\n\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight; }\n\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp; }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn; }\n\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown; }\n\n@-webkit-keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig; }\n\n@-webkit-keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft; }\n\n@-webkit-keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig; }\n\n@-webkit-keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight; }\n\n@-webkit-keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp; }\n\n@-webkit-keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig; }\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut; }\n\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown; }\n\n@-webkit-keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig; }\n\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft; }\n\n@-webkit-keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig; }\n\n@-webkit-keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight; }\n\n@-webkit-keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig; }\n\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp; }\n\n@-webkit-keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig; }\n\n@-webkit-keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n@keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip; }\n\n@-webkit-keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX; }\n\n@-webkit-keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY; }\n\n@-webkit-keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important; }\n\n@-webkit-keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY; }\n\n@-webkit-keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out; }\n\n@-webkit-keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in; }\n\n@-webkit-keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn; }\n\n@-webkit-keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft; }\n\n@-webkit-keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight; }\n\n@-webkit-keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft; }\n\n@-webkit-keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight; }\n\n@-webkit-keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n@keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut; }\n\n@-webkit-keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft; }\n\n@-webkit-keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight; }\n\n@-webkit-keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft; }\n\n@-webkit-keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight; }\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n@keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n@keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut; }\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n.zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn; }\n\n@-webkit-keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown; }\n\n@-webkit-keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft; }\n\n@-webkit-keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight; }\n\n@-webkit-keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp; }\n\n@-webkit-keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n@keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n.zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut; }\n\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown; }\n\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n.zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft; }\n\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n.zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight; }\n\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp; }\n\n@-webkit-keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown; }\n\n@-webkit-keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft; }\n\n@-webkit-keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight; }\n\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInUp {\n  -webkit-animation-name: slideInUp;\n  animation-name: slideInUp; }\n\n@-webkit-keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.slideOutDown {\n  -webkit-animation-name: slideOutDown;\n  animation-name: slideOutDown; }\n\n@-webkit-keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft; }\n\n@-webkit-keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight; }\n\n@-webkit-keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp; }\n\n.abc-checkbox {\n  cursor: default;\n  padding-left: 4px; }\n  .abc-checkbox label {\n    cursor: pointer;\n    display: inline;\n    vertical-align: top;\n    position: relative;\n    padding-left: 5px; }\n    .abc-checkbox label::before {\n      cursor: pointer;\n      content: \"\";\n      display: inline-block;\n      position: absolute;\n      width: 17px;\n      height: 17px;\n      top: 2px;\n      left: 0;\n      margin-left: -20px;\n      border: 1px solid rgba(0, 0, 0, 0.15);\n      border-radius: 3px;\n      background-color: #fff;\n      transition: border 0.15s ease-in-out, color 0.15s ease-in-out; }\n    .abc-checkbox label::after {\n      cursor: pointer;\n      display: inline-block;\n      position: absolute;\n      width: 16px;\n      height: 16px;\n      left: 0;\n      top: 2px;\n      margin-left: -20px;\n      padding-left: 3px;\n      padding-top: 1px;\n      font-size: 11px;\n      color: #555555; }\n  .abc-checkbox input[type=\"checkbox\"],\n  .abc-checkbox input[type=\"radio\"] {\n    cursor: pointer;\n    opacity: 0;\n    z-index: 1; }\n    .abc-checkbox input[type=\"checkbox\"]:focus + label::before,\n    .abc-checkbox input[type=\"radio\"]:focus + label::before {\n      outline: thin dotted;\n      outline: 5px auto -webkit-focus-ring-color;\n      outline-offset: -2px; }\n    .abc-checkbox input[type=\"checkbox\"]:checked + label::after,\n    .abc-checkbox input[type=\"radio\"]:checked + label::after {\n      font-family: \"FontAwesome\";\n      content: \"\"; }\n    .abc-checkbox input[type=\"checkbox\"]:indeterminate + label::after,\n    .abc-checkbox input[type=\"radio\"]:indeterminate + label::after {\n      display: block;\n      content: \"\";\n      width: 10px;\n      height: 3px;\n      background-color: #555555;\n      border-radius: 2px;\n      margin-left: -16.5px;\n      margin-top: 7px; }\n    .abc-checkbox input[type=\"checkbox\"]:disabled + label,\n    .abc-checkbox input[type=\"radio\"]:disabled + label {\n      opacity: 0.65; }\n      .abc-checkbox input[type=\"checkbox\"]:disabled + label::before,\n      .abc-checkbox input[type=\"radio\"]:disabled + label::before {\n        background-color: #eeeeee;\n        cursor: not-allowed; }\n      .abc-checkbox input[type=\"checkbox\"]:disabled + label::after,\n      .abc-checkbox input[type=\"radio\"]:disabled + label::after {\n        cursor: not-allowed; }\n  .abc-checkbox.abc-checkbox-circle label::before {\n    border-radius: 50%; }\n  .abc-checkbox.checkbox-inline {\n    margin-top: 0; }\n\n.abc-checkbox-primary input[type=\"checkbox\"]:checked + label::before,\n.abc-checkbox-primary input[type=\"radio\"]:checked + label::before {\n  background-color: #5d8fc2;\n  border-color: #5d8fc2; }\n\n.abc-checkbox-primary input[type=\"checkbox\"]:checked + label::after,\n.abc-checkbox-primary input[type=\"radio\"]:checked + label::after {\n  color: #fff; }\n\n.abc-checkbox-danger input[type=\"checkbox\"]:checked + label::before,\n.abc-checkbox-danger input[type=\"radio\"]:checked + label::before {\n  background-color: #dd5826;\n  border-color: #dd5826; }\n\n.abc-checkbox-danger input[type=\"checkbox\"]:checked + label::after,\n.abc-checkbox-danger input[type=\"radio\"]:checked + label::after {\n  color: #fff; }\n\n.abc-checkbox-info input[type=\"checkbox\"]:checked + label::before,\n.abc-checkbox-info input[type=\"radio\"]:checked + label::before {\n  background-color: #5dc4bf;\n  border-color: #5dc4bf; }\n\n.abc-checkbox-info input[type=\"checkbox\"]:checked + label::after,\n.abc-checkbox-info input[type=\"radio\"]:checked + label::after {\n  color: #fff; }\n\n.abc-checkbox-warning input[type=\"checkbox\"]:checked + label::before,\n.abc-checkbox-warning input[type=\"radio\"]:checked + label::before {\n  background-color: #f0b518;\n  border-color: #f0b518; }\n\n.abc-checkbox-warning input[type=\"checkbox\"]:checked + label::after,\n.abc-checkbox-warning input[type=\"radio\"]:checked + label::after {\n  color: #fff; }\n\n.abc-checkbox-success input[type=\"checkbox\"]:checked + label::before,\n.abc-checkbox-success input[type=\"radio\"]:checked + label::before {\n  background-color: #64bd63;\n  border-color: #64bd63; }\n\n.abc-checkbox-success input[type=\"checkbox\"]:checked + label::after,\n.abc-checkbox-success input[type=\"radio\"]:checked + label::after {\n  color: #fff; }\n\n.abc-checkbox-primary input[type=\"checkbox\"]:indeterminate + label::before,\n.abc-checkbox-primary input[type=\"radio\"]:indeterminate + label::before {\n  background-color: #5d8fc2;\n  border-color: #5d8fc2; }\n\n.abc-checkbox-primary input[type=\"checkbox\"]:indeterminate + label::after,\n.abc-checkbox-primary input[type=\"radio\"]:indeterminate + label::after {\n  background-color: #fff; }\n\n.abc-checkbox-danger input[type=\"checkbox\"]:indeterminate + label::before,\n.abc-checkbox-danger input[type=\"radio\"]:indeterminate + label::before {\n  background-color: #dd5826;\n  border-color: #dd5826; }\n\n.abc-checkbox-danger input[type=\"checkbox\"]:indeterminate + label::after,\n.abc-checkbox-danger input[type=\"radio\"]:indeterminate + label::after {\n  background-color: #fff; }\n\n.abc-checkbox-info input[type=\"checkbox\"]:indeterminate + label::before,\n.abc-checkbox-info input[type=\"radio\"]:indeterminate + label::before {\n  background-color: #5dc4bf;\n  border-color: #5dc4bf; }\n\n.abc-checkbox-info input[type=\"checkbox\"]:indeterminate + label::after,\n.abc-checkbox-info input[type=\"radio\"]:indeterminate + label::after {\n  background-color: #fff; }\n\n.abc-checkbox-warning input[type=\"checkbox\"]:indeterminate + label::before,\n.abc-checkbox-warning input[type=\"radio\"]:indeterminate + label::before {\n  background-color: #f0b518;\n  border-color: #f0b518; }\n\n.abc-checkbox-warning input[type=\"checkbox\"]:indeterminate + label::after,\n.abc-checkbox-warning input[type=\"radio\"]:indeterminate + label::after {\n  background-color: #fff; }\n\n.abc-checkbox-success input[type=\"checkbox\"]:indeterminate + label::before,\n.abc-checkbox-success input[type=\"radio\"]:indeterminate + label::before {\n  background-color: #64bd63;\n  border-color: #64bd63; }\n\n.abc-checkbox-success input[type=\"checkbox\"]:indeterminate + label::after,\n.abc-checkbox-success input[type=\"radio\"]:indeterminate + label::after {\n  background-color: #fff; }\n\n.abc-radio {\n  cursor: default;\n  padding-left: 4px; }\n  .abc-radio label {\n    cursor: pointer;\n    display: inline;\n    vertical-align: top;\n    position: relative;\n    padding-left: 5px; }\n    .abc-radio label::before {\n      cursor: pointer;\n      content: \"\";\n      display: inline-block;\n      position: absolute;\n      width: 17px;\n      height: 17px;\n      top: 2px;\n      left: 0;\n      margin-left: -20px;\n      border: 1px solid rgba(0, 0, 0, 0.15);\n      border-radius: 50%;\n      background-color: #fff;\n      transition: border 0.15s ease-in-out; }\n    .abc-radio label::after {\n      cursor: pointer;\n      display: inline-block;\n      position: absolute;\n      content: \" \";\n      width: 11px;\n      height: 11px;\n      left: 3px;\n      top: 5px;\n      margin-left: -20px;\n      border-radius: 50%;\n      background-color: #555555;\n      transform: scale(0, 0);\n      transition: transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33); }\n  .abc-radio input[type=\"radio\"] {\n    cursor: pointer;\n    opacity: 0;\n    z-index: 1; }\n    .abc-radio input[type=\"radio\"]:focus + label::before {\n      outline: thin dotted;\n      outline: 5px auto -webkit-focus-ring-color;\n      outline-offset: -2px; }\n    .abc-radio input[type=\"radio\"]:checked + label::after {\n      transform: scale(1, 1); }\n    .abc-radio input[type=\"radio\"]:disabled + label {\n      opacity: 0.65; }\n      .abc-radio input[type=\"radio\"]:disabled + label::before {\n        cursor: not-allowed; }\n      .abc-radio input[type=\"radio\"]:disabled + label::after {\n        cursor: not-allowed; }\n  .abc-radio.radio-inline {\n    margin-top: 0; }\n\n.abc-radio-primary input[type=\"radio\"] + label::after {\n  background-color: #5d8fc2; }\n\n.abc-radio-primary input[type=\"radio\"]:checked + label::before {\n  border-color: #5d8fc2; }\n\n.abc-radio-primary input[type=\"radio\"]:checked + label::after {\n  background-color: #5d8fc2; }\n\n.abc-radio-danger input[type=\"radio\"] + label::after {\n  background-color: #dd5826; }\n\n.abc-radio-danger input[type=\"radio\"]:checked + label::before {\n  border-color: #dd5826; }\n\n.abc-radio-danger input[type=\"radio\"]:checked + label::after {\n  background-color: #dd5826; }\n\n.abc-radio-info input[type=\"radio\"] + label::after {\n  background-color: #5dc4bf; }\n\n.abc-radio-info input[type=\"radio\"]:checked + label::before {\n  border-color: #5dc4bf; }\n\n.abc-radio-info input[type=\"radio\"]:checked + label::after {\n  background-color: #5dc4bf; }\n\n.abc-radio-warning input[type=\"radio\"] + label::after {\n  background-color: #f0b518; }\n\n.abc-radio-warning input[type=\"radio\"]:checked + label::before {\n  border-color: #f0b518; }\n\n.abc-radio-warning input[type=\"radio\"]:checked + label::after {\n  background-color: #f0b518; }\n\n.abc-radio-success input[type=\"radio\"] + label::after {\n  background-color: #64bd63; }\n\n.abc-radio-success input[type=\"radio\"]:checked + label::before {\n  border-color: #64bd63; }\n\n.abc-radio-success input[type=\"radio\"]:checked + label::after {\n  background-color: #64bd63; }\n\ninput[type=\"checkbox\"].styled:checked + label:after,\ninput[type=\"radio\"].styled:checked + label:after {\n  font-family: \"FontAwesome\";\n  content: \"\"; }\n\ninput[type=\"checkbox\"] .styled:checked + label::before,\ninput[type=\"radio\"] .styled:checked + label::before {\n  color: #fff; }\n\ninput[type=\"checkbox\"] .styled:checked + label::after,\ninput[type=\"radio\"] .styled:checked + label::after {\n  color: #fff; }\n\n.has-danger .abc-checkbox label:before, .has-danger .abc-radio label:before {\n  border-color: #dd5826; }\n\n.blockquote-sm {\n  padding: 3px 15px;\n  font-size: 1rem; }\n\nblockquote {\n  font-size: 1.25rem; }\n  blockquote footer {\n    font-size: 80%; }\n    blockquote footer:after {\n      content: '\\00A0 \\2014'; }\n\nh1 small,\nh1 .small, h2 small,\nh2 .small, h3 small,\nh3 .small, h4 small,\nh4 .small, h5 small,\nh5 .small, h6 small,\nh6 .small,\n.h1 small,\n.h1 .small, .h2 small,\n.h2 .small, .h3 small,\n.h3 .small, .h4 small,\n.h4 .small, .h5 small,\n.h5 .small, .h6 small,\n.h6 .small {\n  font-weight: 300;\n  font-size: 75%;\n  color: #999999; }\n\n.card {\n  margin-bottom: 1rem;\n  background-color: transparent;\n  border: none; }\n\n.card-body {\n  padding: 15px; }\n  .card-body::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.card-header {\n  padding: 13px 15px;\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n  .card-header > .dropdown .dropdown-toggle {\n    color: inherit; }\n  .card-header + .list-group .list-group-item:first-child {\n    border-top-width: 0; }\n\naccordion-group .card-title a.accordion-toggle i {\n  transform: rotate(180deg);\n  transition: transform 0.35s ease; }\n\naccordion-group.card-open .card-title a.accordion-toggle i {\n  transform: rotate(0deg);\n  transition: transform 0.35s ease; }\n\n.card-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 1rem;\n  color: inherit; }\n  .card-title > a,\n  .card-title > small,\n  .card-title > .small,\n  .card-title > small > a,\n  .card-title > .small > a {\n    color: inherit;\n    display: block; }\n  .card-title > a:focus {\n    outline: none; }\n\nsmall, .small {\n  font-size: 85%; }\n\n.card-group {\n  margin-bottom: 1rem; }\n  .card-group .card {\n    margin-bottom: 0;\n    border-radius: 0.25rem; }\n  .card-group accordion-group.card-open .card-title a,\n  .card-group accordion-group.card-open .card-title a i {\n    opacity: 1; }\n  .card-group accordion-group .card-title a,\n  .card-group accordion-group .card-title a i {\n    opacity: 0.6; }\n  .card-group accordion-group .card-title a:hover,\n  .card-group accordion-group .card-title a:hover i {\n    opacity: 1; }\n  .card-group accordion-group + accordion-group .card {\n    margin-top: 5px; }\n  .card-group .card-header {\n    border-bottom: 0; }\n    .card-group .card-header + .card-collapse > .card-body,\n    .card-group .card-header + .card-collapse > .list-group {\n      border-top: 1px solid #ddd; }\n\n.card-default {\n  background-color: #ddd;\n  border-color: transparent; }\n  .card-default .card-header,\n  .card-default .card-footer {\n    background-color: transparent; }\n\n.form-control {\n  font-weight: 400;\n  padding: 6px 12px;\n  box-shadow: none; }\n  .form-control:focus {\n    box-shadow: none; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 10px 16px; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 5px 10px; }\n\n.input-group-btn > .btn {\n  padding-top: 6px;\n  padding-bottom: 6px; }\n\n.btn-group.bootstrap-select > .btn {\n  padding-top: 6px;\n  padding-bottom: 6px; }\n\n.btn-lg, .btn-group-lg > .btn, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem !important; }\n\nlabel {\n  font-weight: 400; }\n\n.help-block {\n  margin-top: 5px;\n  font-size: 85%;\n  color: #999999;\n  display: block; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 1rem;\n  line-height: inherit;\n  color: #7c7c7c;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n  font-size: 15px;\n  font-weight: 400; }\n\n.form-group {\n  margin-bottom: 1rem; }\n  .form-group .input-group-addon {\n    line-height: inherit; }\n\n.input-group-addon.bg-primary {\n  border-color: #4175ab; }\n\n.input-group-addon.bg-success {\n  border-color: #c4efc4; }\n\n.input-group-addon.bg-info {\n  border-color: #cdecec; }\n\n.input-group-addon.bg-warning {\n  border-color: #fae8b6; }\n\n.input-group-addon.bg-danger {\n  border-color: #ffc9bc; }\n\n@media (min-width: 768px) {\n  .form-horizontal.form-label-left .control-label {\n    text-align: left; } }\n\n.form-inline .input-group-addon {\n  display: table-cell; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .form-check-label,\n.has-success .form-check-inline,\n.has-success .custom-control {\n  color: #64bd63; }\n\n.has-success .form-control {\n  border-color: #64bd63; }\n  .has-success .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #abdbab; }\n\n.has-success .input-group-addon {\n  color: #64bd63;\n  border-color: #64bd63;\n  background-color: #f2faf2; }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .form-check-label,\n.has-warning .form-check-inline,\n.has-warning .custom-control {\n  color: #f0b518; }\n\n.has-warning .form-control {\n  border-color: #f0b518; }\n  .has-warning .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #f6d478; }\n\n.has-warning .input-group-addon {\n  color: #f0b518;\n  border-color: #f0b518;\n  background-color: #fcf2d8; }\n\n.has-error .form-control-feedback,\n.has-error .form-control-label,\n.has-error .form-check-label,\n.has-error .form-check-inline,\n.has-error .custom-control {\n  color: #dd5826; }\n\n.has-error .form-control {\n  border-color: #dd5826; }\n  .has-error .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #eb9c7e; }\n\n.has-error .input-group-addon {\n  color: #dd5826;\n  border-color: #dd5826;\n  background-color: #f9e0d6; }\n\n.has-success .form-control:focus,\n.has-warning .form-control:focus,\n.has-error .form-control:focus {\n  box-shadow: none; }\n\n.input-rounded {\n  border-radius: 0.25rem; }\n\n.radio,\n.checkbox {\n  padding-left: 20px; }\n  .radio label,\n  .checkbox label {\n    margin-bottom: 5px;\n    min-height: 0; }\n\n.table td > .abc-checkbox,\n.table th > .abc-checkbox {\n  position: relative;\n  top: -8px;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: -16px; }\n\n.table > thead > tr > th {\n  border-top: none; }\n\n.table > thead > tr > th {\n  font-weight: 600;\n  text-transform: uppercase;\n  border-bottom-width: 1px; }\n\n.table-bordered th {\n  background-color: #eeeeee; }\n\n.table-lg > thead > tr > th,\n.table-lg > thead > tr > td,\n.table-lg > tbody > tr > th,\n.table-lg > tbody > tr > td,\n.table-lg > tfoot > tr > th,\n.table-lg > tfoot > tr > td {\n  padding: 10px; }\n\n.table-sm > thead > tr > th,\n.table-sm > thead > tr > td,\n.table-sm > tbody > tr > th,\n.table-sm > tbody > tr > td,\n.table-sm > tfoot > tr > th,\n.table-sm > tfoot > tr > td {\n  padding: 6px; }\n\n.table-hover > tbody > tr:hover .progress {\n  background-color: #fff; }\n\n.table th, .table td {\n  padding: 0.55rem; }\n\n.dropdown-toggle:after {\n  content: none; }\n\n.dropdown-menu {\n  font-size: 13px; }\n  .dropdown-menu > li > a {\n    padding-top: 5px;\n    padding-bottom: 5px; }\n  .dropdown-menu > .card {\n    margin-top: -5px;\n    margin-bottom: -5px; }\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent; }\n\n.nav-item .nav-link {\n  position: relative;\n  cursor: pointer; }\n\n.navbar {\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  min-height: 50px;\n  margin-bottom: 0;\n  padding: 0; }\n  .navbar h5 {\n    font-size: 13px; }\n  .navbar .deemphasize {\n    font-size: 0.875rem; }\n\n.navbar-form .form-control {\n  font-size: 13px;\n  padding: 0.6rem 0.85rem; }\n\n.navbar-form .input-group {\n  width: 245px; }\n\n.navbar-form .input-group-addon {\n  color: #666; }\n\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-header,\n  .container-fluid > .navbar-collapse {\n    margin-right: -1rem;\n    margin-left: -1rem; } }\n\n.navbar-header > .navbar-nav {\n  float: left;\n  margin-left: calc(1rem + 10px);\n  margin-right: 1rem; }\n  .navbar-header > .navbar-nav.navbar-right {\n    float: right; }\n    @media (max-width: 767px) {\n      .navbar-header > .navbar-nav.navbar-right > li > a {\n        padding-right: 0; } }\n  @media (max-width: 767px) {\n    .navbar-header > .navbar-nav {\n      margin-left: 0.5rem; }\n      .navbar-header > .navbar-nav + .navbar-brand {\n        height: 60px;\n        line-height: 30px; } }\n  .navbar-header > .navbar-nav > li {\n    float: left; }\n    .navbar-header > .navbar-nav > li > a {\n      padding: 16px 0.5rem 1rem 0.5rem; }\n  .navbar-header > .navbar-nav li:nth-child(3) {\n    margin-left: 0; }\n\n@media (min-width: 768px) {\n  .navbar-nav.navbar-right:last-child {\n    margin-right: 0; } }\n\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 1rem;\n  padding-left: 1rem;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1); }\n  .navbar-collapse::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .navbar-collapse.in {\n    overflow-y: auto; }\n  @media (min-width: 768px) {\n    .navbar-collapse {\n      width: auto;\n      border-top: 0;\n      box-shadow: none; }\n      .navbar-collapse.collapse {\n        display: block !important;\n        height: auto !important;\n        padding-bottom: 0;\n        overflow: visible !important; }\n      .navbar-collapse.in {\n        overflow-y: visible; }\n      .navbar-fixed-top .navbar-collapse,\n      .navbar-static-top .navbar-collapse,\n      .navbar-fixed-bottom .navbar-collapse {\n        padding-left: 0;\n        padding-right: 0; } }\n  .navbar-collapse .nav.navbar-nav > li {\n    margin-left: 0; }\n  .navbar-collapse .nav.navbar-nav > li > a {\n    padding: 17px 14px 14px 14px; }\n  .navbar-collapse .nav.navbar-nav > li:first-child .dropdown-toggle .circle {\n    margin: -1px 0; }\n  .navbar-collapse .nav.navbar-nav li:nth-child(2) > a:after {\n    content: none; }\n  .navbar-collapse .nav.navbar-nav a[data-toggle=\"chat-sidebar\"] {\n    position: relative; }\n\n.navbar-nav .nav-item .nav-link {\n  margin-left: 0; }\n\n.breadcrumb {\n  color: #999999;\n  margin-bottom: 1.5rem; }\n  .breadcrumb > .active {\n    font-weight: 600; }\n  .content .breadcrumb {\n    padding-top: 0;\n    padding-bottom: 0; }\n\n.breadcrumb > li + li::before {\n  content: \">\"; }\n\n.btn .glyphicon {\n  top: 3px; }\n\n.btn:not(.active), .btn-inverse:not(.active), .btn-gray:not(.active) {\n  box-shadow: none !important; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding-top: .35rem;\n  padding-bottom: .35rem; }\n\n.btn-rounded {\n  border-radius: 6px; }\n\n.btn-gray {\n  color: #555555;\n  background-color: #ddd;\n  border-color: #d0d0d0;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-gray:hover {\n    color: #555555;\n    background-color: #c4c4c4;\n    border-color: #b2b2b2; }\n  .btn-gray:focus, .btn-gray.focus {\n    color: #555555;\n    background-color: #c4c4c4;\n    border-color: #b2b2b2; }\n  .btn-gray:active, .btn-gray.active,\n  .open > .btn-gray.dropdown-toggle {\n    color: #555555;\n    background-color: #c4c4c4;\n    border-color: #b2b2b2;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-gray:active:hover, .btn-gray:active:focus, .btn-gray:active.focus, .btn-gray.active:hover, .btn-gray.active:focus, .btn-gray.active.focus,\n    .open > .btn-gray.dropdown-toggle:hover,\n    .open > .btn-gray.dropdown-toggle:focus,\n    .open > .btn-gray.dropdown-toggle.focus {\n      color: #555555;\n      background-color: #b2b2b2;\n      border-color: #919191; }\n  .btn-gray.disabled:focus, .btn-gray.disabled.focus, .btn-gray:disabled:focus, .btn-gray:disabled.focus {\n    background-color: #ddd;\n    border-color: #d0d0d0; }\n  .btn-gray.disabled:hover, .btn-gray:disabled:hover {\n    background-color: #ddd;\n    border-color: #d0d0d0; }\n\n.btn-outline {\n  color: #fff;\n  background-color: transparent;\n  border-color: #fff;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-outline:hover {\n    color: #fff;\n    background-color: transparent;\n    border-color: #e0e0e0; }\n  .btn-outline:focus, .btn-outline.focus {\n    color: #fff;\n    background-color: transparent;\n    border-color: #e0e0e0; }\n  .btn-outline:active, .btn-outline.active,\n  .open > .btn-outline.dropdown-toggle {\n    color: #fff;\n    background-color: transparent;\n    border-color: #e0e0e0;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-outline:active:hover, .btn-outline:active:focus, .btn-outline:active.focus, .btn-outline.active:hover, .btn-outline.active:focus, .btn-outline.active.focus,\n    .open > .btn-outline.dropdown-toggle:hover,\n    .open > .btn-outline.dropdown-toggle:focus,\n    .open > .btn-outline.dropdown-toggle.focus {\n      color: #fff;\n      background-color: transparent;\n      border-color: #bfbfbf; }\n  .btn-outline.disabled:focus, .btn-outline.disabled.focus, .btn-outline:disabled:focus, .btn-outline:disabled.focus {\n    background-color: transparent;\n    border-color: #fff; }\n  .btn-outline.disabled:hover, .btn-outline:disabled:hover {\n    background-color: transparent;\n    border-color: #fff; }\n  .btn-outline:hover, .btn-outline:focus {\n    background-color: rgba(255, 255, 255, 0.1); }\n\n.btn-link:focus,\n.btn-link:active:focus,\n.btn-link.active:focus {\n  outline: 0; }\n\n.input-group > .input-group-btn:last-child > .btn[data-toggle=\"dropdown\"] {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.btn-group > .btn[data-toggle=\"dropdown\"][data-original-title][title] {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n  .btn-group > .btn[data-toggle=\"dropdown\"][data-original-title][title]:focus, .btn-group > .btn[data-toggle=\"dropdown\"][data-original-title][title]:active {\n    outline: none !important; }\n\n.tag {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 6px; }\n\n.help-block {\n  margin-top: 5px;\n  font-size: 85%;\n  color: #999999;\n  display: block; }\n\n.btn-toolbar {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem; }\n\n.js-progress-animate {\n  transition: width 0.6s ease; }\n\n.progress {\n  box-shadow: none;\n  transition: width 0.6s ease;\n  height: 1.3rem; }\n\n.progress-bar {\n  border-radius: 0.25rem;\n  box-shadow: none; }\n\n.progress-sm {\n  height: 10px;\n  margin-bottom: 0.5rem; }\n\n.progress-xs {\n  height: 5px;\n  margin-bottom: 0.5rem; }\n\n.progress-bar-gray[value]::-webkit-progress-value {\n  background-color: #555555; }\n\n.progress-bar-gray[value]::-moz-progress-bar {\n  background-color: #555555; }\n\n.progress-bar-gray[value]::-ms-fill {\n  background-color: #555555; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-bar-gray .progress-bar {\n    background-color: #555555; } }\n\n.progress-bar-gray-light[value]::-webkit-progress-value {\n  background-color: #999999; }\n\n.progress-bar-gray-light[value]::-moz-progress-bar {\n  background-color: #999999; }\n\n.progress-bar-gray-light[value]::-ms-fill {\n  background-color: #999999; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-bar-gray-light .progress-bar {\n    background-color: #999999; } }\n\n.progress-primary[value]::-webkit-progress-value {\n  background-color: #5d8fc2; }\n\n.progress-primary[value]::-moz-progress-bar {\n  background-color: #5d8fc2; }\n\n.progress-primary[value]::-ms-fill {\n  background-color: #5d8fc2; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-primary .progress-bar {\n    background-color: #5d8fc2; } }\n\n.card {\n  margin-bottom: 0;\n  border: none; }\n\n.card-footer {\n  border-top: none; }\n\n.card > .list-group > .list-group-item {\n  border-width: 1px 0; }\n  .card > .list-group > .list-group-item:first-child {\n    border-radius: 0; }\n\n.widget-body.no-padding > .list-group {\n  margin: 0; }\n  .widget-body.no-padding > .list-group .list-group-item {\n    border-width: 1px 0; }\n\n.list-group-lg .list-group-item {\n  padding: 15px 15px; }\n\n.list-group:last-of-type .list-group-item:last-child {\n  border-bottom: 0; }\n\n.tooltip-inner {\n  border-radius: 3px; }\n\n.alert-sm {\n  padding: 10px 12px;\n  font-size: 13px; }\n  .alert-sm .close {\n    font-size: 18px; }\n\n.alert-dismissible .close {\n  position: static;\n  color: #000; }\n\n.popover {\n  border: none;\n  box-shadow: none; }\n\n.popover-content {\n  padding: 20px; }\n\n.modal-open .content-wrap, .modal-open.nav-collapsed .content-wrap, .modal-open.nav-static .content-wrap {\n  -webkit-transform: none;\n  -ms-transform: none;\n  transform: none;\n  position: static; }\n\n.modal-open .sidebar, .modal-open.nav-collapsed .sidebar, .modal-open.nav-static .sidebar {\n  z-index: -1; }\n\n.pagination {\n  font-weight: 400; }\n  .pagination > .page-item {\n    display: inline; }\n    .pagination > .page-item > .page-link,\n    .pagination > .page-item > span {\n      border-radius: 0.25rem;\n      margin: 0 2px; }\n    .pagination > .page-item > .page-link {\n      text-decoration: none;\n      border: none; }\n\n.pagination {\n  font-weight: 400; }\n  .pagination > li {\n    display: inline; }\n    .pagination > li > a,\n    .pagination > li > span {\n      border-radius: 0.25rem;\n      margin: 0 2px; }\n    .pagination > li > a {\n      text-decoration: none;\n      border: none; }\n\n@media (min-width: 768px) {\n  .jumbotron {\n    padding-left: 2rem;\n    padding-right: 2rem; } }\n\n.navbar-form {\n  padding: 6px 0 6px 1rem; }\n  .navbar-form .form-group {\n    margin-bottom: 0; }\n  @media (min-width: 768px) {\n    .navbar-form {\n      width: auto;\n      border: 0;\n      margin-left: 0;\n      margin-right: 0; } }\n\n.navbar-dashboard {\n  background-color: #fff;\n  border-color: #eeeeee; }\n  .navbar-dashboard .navbar-brand {\n    color: #666;\n    margin-right: 0;\n    padding-top: 10px;\n    font-size: 1.25rem; }\n    .navbar-dashboard .navbar-brand:hover, .navbar-dashboard .navbar-brand:focus {\n      color: #4d4d4d;\n      background-color: transparent; }\n  .navbar-dashboard .navbar-text {\n    color: #777; }\n  .navbar-dashboard .navbar-nav > li > a {\n    color: #666; }\n    .navbar-dashboard .navbar-nav > li > a:hover, .navbar-dashboard .navbar-nav > li > a:focus {\n      color: #333;\n      background-color: transparent; }\n  .navbar-dashboard .navbar-nav > .active > a, .navbar-dashboard .navbar-nav > .active > a:hover, .navbar-dashboard .navbar-nav > .active > a:focus {\n    color: #555;\n    background-color: #eeeeee; }\n  .navbar-dashboard .navbar-nav > .disabled > a, .navbar-dashboard .navbar-nav > .disabled > a:hover, .navbar-dashboard .navbar-nav > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent; }\n  .navbar-dashboard .navbar-nav > .open > a, .navbar-dashboard .navbar-nav > .open > a:hover, .navbar-dashboard .navbar-nav > .open > a:focus {\n    background-color: #eeeeee;\n    color: #555; }\n  @media (max-width: 767px) {\n    .navbar-dashboard .navbar-nav .open .dropdown-menu > li > a {\n      color: #666; }\n      .navbar-dashboard .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-dashboard .navbar-nav .open .dropdown-menu > li > a:focus {\n        color: #333;\n        background-color: transparent; }\n    .navbar-dashboard .navbar-nav .open .dropdown-menu > .active > a, .navbar-dashboard .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-dashboard .navbar-nav .open .dropdown-menu > .active > a:focus {\n      color: #555;\n      background-color: #eeeeee; }\n    .navbar-dashboard .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-dashboard .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-dashboard .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n      color: #ccc;\n      background-color: transparent; } }\n  .navbar-dashboard .btn-link {\n    color: #666; }\n    .navbar-dashboard .btn-link:hover, .navbar-dashboard .btn-link:focus {\n      color: #333;\n      outline: none;\n      text-decoration: none; }\n    .navbar-dashboard .btn-link[disabled]:hover, .navbar-dashboard .btn-link[disabled]:focus,\n    fieldset[disabled] .navbar-dashboard .btn-link:hover,\n    fieldset[disabled] .navbar-dashboard .btn-link:focus {\n      color: #ccc; }\n\npre {\n  display: block;\n  padding: 6.5px;\n  margin: 0 0 0.5rem;\n  font-size: 13px;\n  line-height: 1rem;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #343434;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 0.25rem; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    white-space: pre-wrap;\n    background-color: transparent;\n    border-radius: 0; }\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #fff;\n  line-height: 1;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #555555;\n  border-radius: 100px; }\n  .badge:empty {\n    display: none; }\n  .btn .badge {\n    position: relative;\n    top: -1px; }\n  .btn-xs .badge,\n  .btn-group-xs > .btn .badge {\n    top: 0;\n    padding: 1px 5px; }\n  .list-group-item > .badge {\n    float: right; }\n  .list-group-item > .badge + .badge {\n    margin-right: 5px; }\n  .nav-pills > li > a > .badge {\n    margin-left: 3px; }\n\n/*\r\n * Font Awesome 2x spin\r\n */\n.fa-spin-fast {\n  -webkit-animation: fa-spin 1s infinite linear;\n  -moz-animation: fa-spin 1s infinite linear;\n  -o-animation: fa-spin 1s infinite linear;\n  animation: fa-spin 1s infinite linear; }\n\n.fa-lg {\n  vertical-align: -15%; }\n\n/**\r\n * Animate.css\r\n */\n.animated {\n  animation-duration: .5s; }\n\n/**\r\n * Pace\r\n */\n.pace .pace-progress {\n  background: #5d8fc2;\n  position: absolute;\n  top: 50px; }\n\n.pace .pace-activity {\n  position: absolute;\n  top: 65px;\n  border-width: 1px;\n  left: 15px;\n  right: auto;\n  width: 18px;\n  height: 18px;\n  border-top-color: #5d8fc2;\n  border-left-color: #5d8fc2; }\n\n.pace .pace-progress-inner {\n  right: -10px;\n  width: 10px; }\n\n/***********************/\n/*glyphicons-halflings */\n/***********************/\n.glyphicon-comment:before {\n  content: \"\\E111\"; }\n\n.glyphicon-chevron-up {\n  top: 2px; }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 300;\n  src: local(\"Open Sans Light\"), local(\"OpenSans-Light\"), url(assets/fonts/google/open-sans-light.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Open Sans\"), local(\"OpenSans\"), url(assets/fonts/google/open-sans.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Open Sans Semibold\"), local(\"OpenSans-Semibold\"), url(assets/fonts/google/open-sans-semibold.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Open Sans Bold\"), local(\"OpenSans-Bold\"), url(assets/fonts/google/open-sans-bold.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: italic;\n  font-weight: 300;\n  src: local(\"Open Sans Light Italic\"), local(\"OpenSansLight-Italic\"), url(assets/fonts/google/open-sans-light-italic.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: italic;\n  font-weight: 400;\n  src: local(\"Open Sans Italic\"), local(\"OpenSans-Italic\"), url(assets/fonts/google/open-sans-italic.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: italic;\n  font-weight: 600;\n  src: local(\"Open Sans Semibold Italic\"), local(\"OpenSans-SemiboldItalic\"), url(assets/fonts/google/open-sans-semibold-italic.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: italic;\n  font-weight: 700;\n  src: local(\"Open Sans Bold Italic\"), local(\"OpenSans-BoldItalic\"), url(assets/fonts/google/open-sans-bold-italic.woff) format(\"woff\"); }\n\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.eot\");\n  src: url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.woff2\") format(\"woff2\"), url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.woff\") format(\"woff\"), url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.ttf\") format(\"truetype\"), url(\"assets/fonts/glyphicons/glyphicons-halflings-regular.svg#glyphicons_halflingsregular\") format(\"svg\"); }\n\n/**\r\n* if set to device-width ie10 built-in scrollbar overflows content. Fix it as of here\r\n* http://stackoverflow.com/questions/17045132/scrollbar-overlay-in-ie10-how-do-you-stop-that-might-be-bootstrap\r\n*/\n@-ms-viewport {\n  width: auto; }\n\nhtml, body {\n  height: 100%; }\n\nbody {\n  font-weight: 300;\n  overflow-x: hidden; }\n\nth {\n  font-weight: 600; }\n\na {\n  cursor: pointer; }\n\nsvg {\n  width: 100%; }\n\nstrong, b {\n  font-weight: bold; }\n\nabbr[title] {\n  text-decoration: none; }\n\na {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out; }\n\n.btn {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; }\n\n.form-control {\n  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out; }\n\n/***********************/\n/*        Layout       */\n/***********************/\napp, .app {\n  height: 100%;\n  display: block; }\n\n.chat-sidebar-container {\n  color: #555555; }\n\n.sidebar {\n  position: fixed;\n  z-index: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 204px;\n  background-color: #242424;\n  color: #aaa; }\n  .sidebar .slimScrollBar {\n    border-radius: 0 !important;\n    background-color: #aaa !important; }\n\n.page-controls, .content-wrap, .loader-wrap {\n  left: 204px;\n  transition: left 0.3s ease-in-out; }\n  @media (min-width: 768px) {\n    .page-controls, .content-wrap, .loader-wrap {\n      margin-left: 50px;\n      left: 154px; } }\n  .nav-collapsed .page-controls, .nav-collapsed .content-wrap, .nav-collapsed .loader-wrap {\n    left: 0; }\n  @media (min-width: 992px) {\n    .nav-static .page-controls, .nav-static .content-wrap, .nav-static .loader-wrap {\n      transition: none;\n      left: 0;\n      margin-left: 204px; } }\n\n.page-controls .dropdown-toggle-notifications .rounded-circle {\n  margin-top: -1px; }\n\n.page-controls .dropdown-toggle-notifications .circle {\n  width: 1.5rem;\n  height: 1.5rem;\n  line-height: 1.5rem; }\n\n.page-controls {\n  transition: left 0.3s ease-in-out, right 0.3s ease-in-out;\n  right: -204px; }\n  .nav-collapsed .page-controls {\n    right: 0; }\n  @media (min-width: 992px) {\n    .nav-static .page-controls {\n      right: 0; } }\n\n.page-controls {\n  position: absolute;\n  z-index: 1;\n  height: 50px; }\n  @media (max-width: 767px) {\n    .page-controls {\n      font-size: 16px; }\n      .page-controls .navbar-brand {\n        position: absolute;\n        left: 0;\n        right: 0;\n        font-weight: 700;\n        text-align: center; }\n        .page-controls .navbar-brand > .fa-circle {\n          font-size: 10px; }\n      .page-controls .navbar-nav {\n        position: relative;\n        z-index: 1; } }\n  .page-controls .avatar {\n    width: 30px;\n    margin-top: -5px; }\n    .page-controls .avatar.float-xs-left, .page-controls .avatar.pull-left {\n      margin-right: 5px; }\n    .page-controls .avatar.float-xs-right, .page-controls .avatar.pull-right {\n      margin-left: 5px; }\n  .page-controls .navbar-nav > li > a .rounded.rounded-lg,\n  .page-controls .navbar-nav > li > a .circle.circle.lg {\n    margin: -7px -7px -8px; }\n  @media (min-width: 768px) {\n    .page-controls .navbar-form.navbar-left {\n      padding-right: 0; } }\n  @media (max-width: 991px) {\n    .page-controls .navbar-form.navbar-left {\n      padding-right: 0; } }\n  .page-controls .navbar-nav .fa-times {\n    font-size: 20px;\n    vertical-align: -2px; }\n  .page-controls .navbar-form .input-group-addon {\n    line-height: 1.5; }\n    .page-controls .navbar-form .input-group-addon .fa {\n      vertical-align: -1px; }\n  .page-controls .navbar-form .form-control {\n    line-height: 1.7; }\n\n/* ff icons valign fix */\n@-moz-document url-prefix() {\n  .page-controls .navbar-nav > li > a > .rounded-lg > i {\n    vertical-align: -8%; } }\n\n.content-wrap {\n  position: relative;\n  z-index: 0;\n  height: 100%; }\n\n.content {\n  min-height: 100%;\n  padding: 92px 40px 42px;\n  background-color: #eee; }\n  @media (max-width: 767px) {\n    .content {\n      padding-left: 20px;\n      padding-right: 20px; } }\n\n.logo {\n  margin: 11px 0 19px;\n  height: 50px;\n  width: 100%;\n  line-height: 50px;\n  text-align: center;\n  vertical-align: middle;\n  font-weight: 700;\n  font-size: 18px;\n  transition: width 0.3s ease-in-out; }\n  .logo a {\n    color: #fff;\n    text-decoration: none; }\n  .nav-collapsed .logo {\n    width: 50px; }\n  @media (min-width: 992px) {\n    .nav-static .logo {\n      width: 100%;\n      transition: none; } }\n\n.sidebar-nav {\n  padding: 10px 0;\n  font-size: 14px;\n  /*\r\n   * Sub menus\r\n   */\n  /*\r\n  First sub-menu\r\n   */ }\n  @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n    .sidebar-nav {\n      font-size: 16px; } }\n  .sidebar-nav li a {\n    display: block;\n    color: #aaa;\n    text-decoration: none; }\n    .sidebar-nav li a .toggle {\n      float: right;\n      line-height: 18px;\n      margin-right: 15px;\n      transition: transform .35s ease; }\n    .sidebar-nav li a.collapsed .toggle {\n      transform: rotate(90deg); }\n    .sidebar-nav li a .tag {\n      float: right;\n      line-height: 8px;\n      margin-top: 7px;\n      margin-right: 15px;\n      padding: 7px;\n      border-radius: 0.2rem; }\n      @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n        .sidebar-nav li a .tag {\n          margin-top: 11px; } }\n  .sidebar-nav > li > a {\n    position: relative;\n    border-top: 1px solid #2d2d2d;\n    padding-left: 50px;\n    line-height: 35px; }\n    .sidebar-nav > li > a:hover {\n      background-color: #111; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      .sidebar-nav > li > a {\n        line-height: 44px; } }\n    .sidebar-nav > li > a .icon {\n      display: block;\n      position: absolute;\n      top: 3px;\n      left: 11px;\n      width: 28px;\n      height: 28px;\n      line-height: 28px;\n      text-align: center; }\n      @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n        .sidebar-nav > li > a .icon {\n          top: 8px; } }\n      .sidebar-nav > li > a .icon .fa, .sidebar-nav > li > a .icon .glyphicon {\n        font-size: 16px;\n        color: rgba(170, 170, 170, 0.7); }\n      .sidebar-nav > li > a .icon .fa {\n        position: relative;\n        top: 1px; }\n      .sidebar-nav > li > a .icon .glyphicon {\n        left: -1px;\n        top: 6px; }\n      .sidebar-nav > li > a .icon .glyphicon-th {\n        left: 0; }\n      .sidebar-nav > li > a .icon .glyphicon-tree-conifer {\n        left: 0; }\n      .sidebar-nav > li > a .icon .glyphicon-map-marker {\n        top: 6px; }\n      .sidebar-nav > li > a .icon .fa-envelope {\n        top: 0; }\n      @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n        .sidebar-nav > li > a .icon .glyphicon {\n          top: 6px; }\n        .sidebar-nav > li > a .icon .glyphicon-map-marker {\n          top: 7px; }\n        .sidebar-nav > li > a .icon .fa {\n          top: 0; } }\n    .sidebar-nav > li > a .toggle {\n      line-height: 35px; }\n      @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n        .sidebar-nav > li > a .toggle {\n          line-height: 44px; } }\n  .sidebar-nav > .open > a {\n    background-color: #161616; }\n  .sidebar-nav > li:last-child > a {\n    border-bottom: 1px solid #2d2d2d; }\n  .sidebar-nav > .active > a {\n    color: #F2BE35;\n    background-color: #242424; }\n    .sidebar-nav > .active > a .icon {\n      border-radius: 50%;\n      background-color: #F2BE35; }\n      .sidebar-nav > .active > a .icon .fa, .sidebar-nav > .active > a .icon .glyphicon {\n        color: #242424; }\n  .sidebar-nav > li ul {\n    padding: 0;\n    font-size: 13px;\n    background-color: #313131;\n    list-style: none; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      .sidebar-nav > li ul {\n        font-size: 14px; } }\n    .sidebar-nav > li ul > li {\n      /* third submenu */ }\n      .sidebar-nav > li ul > li > a {\n        padding: 5px 0 5px 40px; }\n        .sidebar-nav > li ul > li > a:hover {\n          background-color: #1e1e1e; }\n      .sidebar-nav > li ul > li.active > a {\n        font-weight: normal;\n        color: #fff; }\n      .sidebar-nav > li ul > li ul > li > a {\n        padding-left: 55px; }\n  .sidebar-nav > li > ul {\n    /* simulate padding */ }\n    .sidebar-nav > li > ul:before {\n      content: \"\";\n      display: block;\n      padding-top: 0.5rem; }\n    .sidebar-nav > li > ul:after {\n      content: \"\";\n      display: block;\n      padding-bottom: 0.5rem; }\n\n.sidebar-nav-title {\n  margin: 35px 0 5px 11px;\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 1;\n  transition: opacity 0.3s ease-in-out; }\n  .sidebar-nav-title .action-link {\n    color: #aaa;\n    float: right;\n    margin-right: 15px;\n    margin-top: -1px; }\n    .sidebar-nav-title .action-link .fa, .sidebar-nav-title .action-link .glyphicon {\n      font-size: 9px; }\n    .sidebar-nav-title .action-link .glyphicon {\n      top: 5px; }\n  .nav-collapsed .sidebar-nav-title {\n    opacity: 0; }\n  @media (min-width: 992px) {\n    .nav-static .sidebar-nav-title {\n      opacity: 1;\n      transition: none; } }\n\n.sidebar-status {\n  position: relative;\n  margin: 10px 0 20px;\n  padding: 0 15px 0 11px;\n  /* fix notifications dropdown when there is no enough vertical space*/ }\n  .sidebar-status > a {\n    display: block;\n    line-height: 40px;\n    color: #eeeeee;\n    text-decoration: none; }\n  .sidebar-status .dropdown-menu {\n    position: fixed;\n    top: 57px;\n    left: 0;\n    margin: 0 20px;\n    width: 320px;\n    color: #555555; }\n    @media (max-width: 380px) {\n      .sidebar-status .dropdown-menu {\n        margin: 0;\n        width: 100%; } }\n  @media (max-height: 500px) {\n    .sidebar-status .dropdown-menu {\n      bottom: 20px; }\n    .sidebar-status .notifications .card-header {\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0; }\n    .sidebar-status .notifications .list-group {\n      position: absolute;\n      top: 85px;\n      left: 0;\n      right: 0;\n      bottom: 43px;\n      height: auto; }\n    .sidebar-status .notifications .card-footer {\n      position: absolute;\n      bottom: -5px;\n      left: 0;\n      right: 0; } }\n\n.sidebar-labels {\n  list-style: none;\n  padding: 11px;\n  padding-right: 15px;\n  font-size: 13px; }\n  .sidebar-labels > li > a {\n    color: #eeeeee;\n    text-decoration: none;\n    font-weight: normal; }\n    .sidebar-labels > li > a .circle,\n    .sidebar-labels > li > a .circle-o {\n      position: relative;\n      top: -2px;\n      font-size: 9px;\n      height: 12px;\n      width: 12px;\n      line-height: 12px;\n      transition: margin-left 0.3s ease-in-out; }\n    .sidebar-labels > li > a .fa-circle {\n      font-size: 11px;\n      vertical-align: 1px;\n      transition: margin-left 0.3s ease-in-out; }\n    .sidebar-labels > li > a .circle-o {\n      top: 1px;\n      left: 1px; }\n    .sidebar-labels > li > a .label-name {\n      opacity: 1;\n      transition: opacity 0.3s ease-in-out; }\n    .nav-collapsed .sidebar-labels > li > a .circle,\n    .nav-collapsed .sidebar-labels > li > a .circle-o,\n    .nav-collapsed .sidebar-labels > li > a .fa-circle {\n      margin-left: 8px; }\n    .nav-collapsed .sidebar-labels > li > a .label-name {\n      opacity: 0; }\n    @media (min-width: 992px) {\n      .nav-static .sidebar-labels > li > a .circle,\n      .nav-static .sidebar-labels > li > a .circle-o,\n      .nav-static .sidebar-labels > li > a .fa-circle {\n        transition: none;\n        margin-left: 0; }\n      .nav-static .sidebar-labels > li > a .label-name {\n        transition: none;\n        opacity: 1; } }\n  .sidebar-labels > li + li {\n    margin-top: 0.5rem; }\n\n.sidebar-alerts {\n  font-size: 13px;\n  transition: opacity 0.3s ease-in-out;\n  opacity: 1; }\n  .nav-collapsed .sidebar-alerts {\n    opacity: 0; }\n  @media (min-width: 992px) {\n    .nav-static .sidebar-alerts {\n      opacity: 1;\n      transition: none; } }\n  .sidebar-alerts .alert {\n    margin-bottom: 0;\n    padding: 0.5rem 11px;\n    padding-right: 15px; }\n    .sidebar-alerts .alert .close {\n      font-size: 16px;\n      text-shadow: none;\n      opacity: 1;\n      color: #aaa; }\n  .sidebar-alerts .progress {\n    background-color: #3e3e3e; }\n\n.chat-sidebar {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: -254px;\n  width: 254px;\n  background-color: #242424;\n  transition: right 0.3s ease-in-out; }\n\n/* body tag is given this class */\n.chat-sidebar-container {\n  position: relative; }\n  .chat-sidebar-container, .chat-sidebar-container .sidebar {\n    left: 0;\n    transition: left 0.3s ease-in-out; }\n  .chat-sidebar-container.chat-sidebar-opened, .chat-sidebar-container.chat-sidebar-opened .sidebar {\n    left: -254px; }\n  .chat-sidebar-container.chat-sidebar-opened .chat-sidebar {\n    right: 0; }\n\n.chat-sidebar-header {\n  width: 100%;\n  position: absolute;\n  top: 0;\n  padding: 10px;\n  z-index: 3;\n  background-color: #242424; }\n  .chat-sidebar-header .form-control {\n    padding: 0.6rem 0.85rem; }\n\n.chat-sidebar-content {\n  color: #aaa; }\n\n.chat-sidebar-contacts {\n  padding: 20px 0;\n  left: -100%;\n  transition: left 0.4s ease-in-out; }\n  .chat-sidebar-contacts.open {\n    left: 0; }\n  .chat-sidebar-contacts .sidebar-nav-title {\n    margin-left: 20px;\n    margin-right: 10px; }\n    .chat-sidebar-contacts .sidebar-nav-title:first-child {\n      margin-top: 0; }\n    .nav-collapsed .chat-sidebar-contacts .sidebar-nav-title {\n      opacity: 1; }\n\n.chat-sidebar-chat {\n  right: -100%;\n  padding-bottom: 54px;\n  /*footer height*/\n  background-color: #242424;\n  transition: right 0.2s ease-in-out; }\n  .chat-sidebar-chat.open {\n    right: 0; }\n  .chat-sidebar-chat .title {\n    margin-bottom: 0; }\n    .chat-sidebar-chat .title > a {\n      display: block;\n      padding: 10px 16px;\n      background-color: rgba(255, 255, 255, 0.1);\n      color: #eeeeee;\n      text-decoration: none; }\n    .chat-sidebar-chat .title:hover {\n      cursor: pointer; }\n  .chat-sidebar-chat .message-list {\n    list-style: none;\n    padding-left: 0;\n    padding-top: 0.5rem; }\n  .chat-sidebar-chat .message {\n    padding: 10px 20px; }\n    .chat-sidebar-chat .message::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .chat-sidebar-chat .message > .thumb-sm {\n      float: left; }\n    .chat-sidebar-chat .message.from-me > .thumb-sm {\n      float: right; }\n\n.chat-sidebar-chat .message-body {\n  position: relative;\n  margin-left: 50px;\n  padding: 10px;\n  font-size: 13px;\n  font-weight: 400;\n  background-color: #eeeeee;\n  color: #555555;\n  border-radius: 0.25rem; }\n  .chat-sidebar-chat .message-body:before {\n    right: 100%;\n    top: 8px;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    border: 10px solid transparent;\n    border-right-color: #eeeeee; }\n\n.chat-sidebar-chat .message.from-me .message-body {\n  margin-left: 0;\n  margin-right: 50px;\n  background-color: #f0b518;\n  color: #343434; }\n  .chat-sidebar-chat .message.from-me .message-body:before {\n    right: auto;\n    left: 100%;\n    border-right-color: transparent;\n    border-left-color: #f0b518; }\n\n.chat-sidebar-panel {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  padding-top: 100px; }\n\n.chat-sidebar-title {\n  margin: 10px;\n  text-transform: uppercase;\n  font-size: 15px;\n  font-weight: 400; }\n\n.chat-sidebar-user-group {\n  margin-top: 10px; }\n  .chat-sidebar-user-group .list-group-item {\n    background-color: transparent;\n    margin-bottom: 0;\n    padding: 10px 20px;\n    border: 0;\n    color: #eeeeee;\n    border-radius: 0; }\n    .chat-sidebar-user-group .list-group-item:hover {\n      cursor: pointer; }\n    .chat-sidebar-user-group .list-group-item.active, .chat-sidebar-user-group .list-group-item.active:focus, .chat-sidebar-user-group .list-group-item.active:hover {\n      background-color: rgba(255, 255, 255, 0.1);\n      color: #f0b518; }\n    .chat-sidebar-user-group .list-group-item.active .badge {\n      background-color: #dd5826;\n      color: #fff; }\n    .chat-sidebar-user-group .list-group-item.active .message-sender {\n      font-weight: 600; }\n    .chat-sidebar-user-group .list-group-item .circle-o {\n      margin-top: 13px;\n      font-size: 8px; }\n    .chat-sidebar-user-group .list-group-item .fa-circle {\n      font-size: 11px;\n      line-height: 37px; }\n    .chat-sidebar-user-group .list-group-item .badge {\n      margin-top: 9px;\n      margin-right: 6px;\n      padding: 3px 5px; }\n  .chat-sidebar-user-group .thumb .status,\n  .chat-sidebar-user-group .thumb-sm .status {\n    border-color: #242424; }\n  .chat-sidebar-user-group a.list-group-item:hover {\n    color: #eeeeee;\n    background-color: rgba(0, 0, 0, 0.15); }\n  .chat-sidebar-user-group .message-preview {\n    margin: 0;\n    width: 100px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 85%;\n    color: #999999; }\n  .chat-sidebar-user-group .message-sender {\n    margin: 0 0 5px; }\n\n.chat-sidebar-footer {\n  position: absolute;\n  bottom: 0;\n  right: -100%;\n  width: 100%;\n  margin-bottom: 0;\n  padding: 10px;\n  background-color: #3a3a3a;\n  transition: right 0.2s ease-in-out; }\n  .chat-sidebar-footer.open {\n    right: 0; }\n\n.chat-notification {\n  position: absolute;\n  right: 12px;\n  top: 35px;\n  z-index: 20;\n  margin-top: 3px;\n  padding: 5px 0;\n  cursor: pointer; }\n  .chat-notification:before {\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 18px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #343434; }\n\n.chat-notification-inner {\n  min-width: 120px;\n  padding: 8px;\n  font-size: 12px;\n  border-radius: 0.25rem;\n  text-decoration: none;\n  background-color: #343434;\n  color: #fff; }\n  .chat-notification-inner .title {\n    margin: 0;\n    font-weight: 600;\n    line-height: 28px;\n    font-size: 0.875rem; }\n    .chat-notification-inner .title .thumb-xs {\n      vertical-align: -9px;\n      margin-right: 5px; }\n  .chat-notification-inner .text {\n    margin-top: 5px;\n    margin-bottom: 0;\n    color: #999999; }\n\n.chat-notification-sing {\n  position: absolute;\n  top: 16px;\n  left: 10px;\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #dd5826; }\n\n.page-title {\n  margin: 0 0 calc(1rem + 6px); }\n\n.notifications {\n  height: 100%; }\n  @media (min-width: 768px) {\n    .notifications {\n      width: 333px; } }\n  .notifications .card-header {\n    background-color: #fff; }\n    .notifications .card-header .btn-group-justified {\n      display: flex; }\n      .notifications .card-header .btn-group-justified label {\n        flex: 1;\n        padding-top: 5px;\n        padding-bottom: 5px; }\n  .notifications .list-group {\n    height: 320px;\n    overflow-y: scroll; }\n  .notifications .list-group-item {\n    transition: background-color 0.15s ease-in-out; }\n    .notifications .list-group-item:hover {\n      background-color: #f5f5f5; }\n      .notifications .list-group-item:hover .progress-bar {\n        background-color: #fff !important; }\n    .notifications .list-group-item .progress {\n      transition: background-color 0.15s ease-in-out; }\n  .notifications a.list-group-item {\n    text-decoration: none;\n    color: #555555; }\n  .notifications .btn-notifications-reload {\n    color: #666; }\n\n/***********************/\n/*        Loader       */\n/***********************/\n.loader-wrap {\n  position: fixed;\n  z-index: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  text-align: center;\n  background-color: #eee;\n  opacity: 1;\n  transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, opacity 0.2s ease-out, background-color 0.2s ease-out; }\n  .loader-wrap.hiding {\n    opacity: 0;\n    background-color: transparent; }\n  .loader-wrap .fa {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    line-height: 30px;\n    margin-top: -15px;\n    margin-left: -10px;\n    font-size: 20px;\n    vertical-align: middle; }\n  @media (min-width: 992px) {\n    .nav-static .loader-wrap {\n      transition: opacity 0.2s ease-out, background-color 0.2s ease-out;\n      transform: translate(0, 0);\n      margin-left: 204px; } }\n\n/***********************/\n/*       Widget        */\n/***********************/\n.widget {\n  position: relative;\n  margin-bottom: 30px;\n  padding: 15px 20px;\n  background: #fff;\n  border-radius: 0.2rem; }\n  .widget > header {\n    margin: -15px -20px;\n    padding: 15px 20px; }\n    .widget > header h1, .widget > header h2, .widget > header h3, .widget > header h4, .widget > header h5, .widget > header h6 {\n      margin: 0; }\n    .widget > header + .widget-body,\n    .widget > header + .widget-body.no-padding {\n      margin-top: 15px; }\n  .widget > .widget-body.no-padding {\n    margin: -15px -20px; }\n    .widget > .widget-body.no-padding + footer {\n      margin-top: 15px; }\n  .widget > footer {\n    margin: 0 -20px -15px;\n    padding: 15px 20px; }\n  .widget:hover .widget-controls-hover {\n    opacity: 1; }\n  .widget .loader {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .widget .loader .spinner {\n      position: absolute;\n      top: 50%;\n      width: 100%;\n      margin-top: -10px;\n      font-size: 20px;\n      text-align: center; }\n  .widget .widget-top-overflow,\n  .widget .widget-middle-overflow {\n    position: relative;\n    margin: 0 -20px; }\n    .widget .widget-top-overflow > img,\n    .widget .widget-middle-overflow > img {\n      max-width: 100%; }\n  .widget .widget-top-overflow {\n    margin-top: -15px;\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem;\n    overflow: hidden; }\n    .widget .widget-top-overflow > img {\n      border-top-left-radius: 0.25rem;\n      border-top-right-radius: 0.25rem; }\n    .widget .widget-top-overflow > .btn-toolbar {\n      position: absolute;\n      top: 0;\n      right: 0;\n      z-index: 1;\n      margin-right: 20px; }\n      @media (min-width: 768px) {\n        .widget .widget-top-overflow > .btn-toolbar {\n          top: auto;\n          bottom: 0; } }\n  .widget .widget-table-overflow {\n    margin: 0 -20px -15px; }\n    .widget .widget-table-overflow th:first-child,\n    .widget .widget-table-overflow td:first-child {\n      padding-left: 20px; }\n    .widget .widget-table-overflow th:last-child,\n    .widget .widget-table-overflow td:last-child {\n      padding-right: 20px; }\n\n.widget-controls {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  padding: 14px;\n  font-size: 0.875rem; }\n  .widget-controls.left {\n    left: 0;\n    right: auto; }\n  .widget-controls.widget-controls-hover {\n    opacity: 0;\n    transition: opacity 0.15s; }\n  .widget-controls > a {\n    padding: 1px 4px;\n    border-radius: 4px;\n    color: rgba(0, 0, 0, 0.4);\n    transition: color 0.15s ease-in-out; }\n    .widget-controls > a:hover {\n      color: rgba(0, 0, 0, 0.1);\n      text-decoration: none; }\n    .widget-controls > a > .glyphicon {\n      vertical-align: 0;\n      font-size: 12px; }\n    .widget-controls > a > .fa {\n      vertical-align: 1px; }\n  .widget-controls > .btn-group {\n    vertical-align: baseline; }\n\n/***********************/\n/*       Buttons       */\n/***********************/\n.btn-inverse {\n  color: #fff;\n  background-color: #555555;\n  border-color: #3c3c3c;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-inverse:hover {\n    color: #fff;\n    background-color: #3c3c3c;\n    border-color: #1d1d1d; }\n  .btn-inverse:focus, .btn-inverse.focus {\n    color: #fff;\n    background-color: #3c3c3c;\n    border-color: #1d1d1d; }\n  .btn-inverse:active, .btn-inverse.active,\n  .open > .btn-inverse.dropdown-toggle {\n    color: #fff;\n    background-color: #3c3c3c;\n    border-color: #1d1d1d;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-inverse:active:hover, .btn-inverse:active:focus, .btn-inverse:active.focus, .btn-inverse.active:hover, .btn-inverse.active:focus, .btn-inverse.active.focus,\n    .open > .btn-inverse.dropdown-toggle:hover,\n    .open > .btn-inverse.dropdown-toggle:focus,\n    .open > .btn-inverse.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #2a2a2a;\n      border-color: black; }\n  .btn-inverse.disabled:focus, .btn-inverse.disabled.focus, .btn-inverse:disabled:focus, .btn-inverse:disabled.focus {\n    background-color: #555555;\n    border-color: #3c3c3c; }\n  .btn-inverse.disabled:hover, .btn-inverse:disabled:hover {\n    background-color: #555555;\n    border-color: #3c3c3c; }\n\n.btn-xs {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n/***********************************/\n/**            UTILS              **/\n/***********************************/\n.nav-justified {\n  width: 100%;\n  border-bottom: 0; }\n  .nav-justified .nav-item {\n    float: none; }\n  .nav-justified .nav-link {\n    text-align: center;\n    margin-bottom: 5px; }\n  .nav-justified > .dropdown .dropdown-menu {\n    top: auto;\n    left: auto; }\n  @media (min-width: 768px) {\n    .nav-justified .nav-item {\n      display: table-cell;\n      width: 1%; }\n    .nav-justified .nav-link {\n      margin-bottom: 0; } }\n  .nav-justified .nav-link {\n    margin-right: 0; }\n\n.transition-height {\n  transition: height 0.15s ease-in-out; }\n\n.btn-default {\n  color: #343434;\n  background-color: #f8f8f8;\n  border-color: #ccc;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .btn-default:hover {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad; }\n  .btn-default:focus, .btn-default.focus {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    color: #343434;\n    background-color: #dfdfdf;\n    border-color: #adadad;\n    background-image: none;\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus,\n    .open > .btn-default.dropdown-toggle:hover,\n    .open > .btn-default.dropdown-toggle:focus,\n    .open > .btn-default.dropdown-toggle.focus {\n      color: #343434;\n      background-color: #cdcdcd;\n      border-color: #8c8c8c; }\n  .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default:disabled:focus, .btn-default:disabled.focus {\n    background-color: #f8f8f8;\n    border-color: #ccc; }\n  .btn-default.disabled:hover, .btn-default:disabled:hover {\n    background-color: #f8f8f8;\n    border-color: #ccc; }\n\n.tag-white {\n  background-color: #fff; }\n  .tag-white[href]:focus, .tag-white[href]:hover {\n    background-color: #e6e6e6; }\n\n.display-flex {\n  display: flex; }\n\n.flex-nowrap {\n  flex-wrap: nowrap; }\n\n/**\r\n * .circle & .rounded are pretty cool way to add a bit of beauty to raw data.\r\n * should be used with bg-* and text-* classes for colors.\r\n */\n.circle, .rounded, .circle-o {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  line-height: 1.5em;\n  text-align: center; }\n\n.circle, .circle-o {\n  border-radius: 50%; }\n\n.rounded {\n  border-radius: 5px; }\n\n.circle-lg, .rounded-lg {\n  width: 2.2em;\n  height: 2.2em;\n  line-height: 2.2em; }\n\n.circle-o {\n  border: 0.3em solid transparent; }\n  .circle-o.circle-o-danger {\n    border-color: #dd5826; }\n  .circle-o.circle-o-warning {\n    border-color: #f0b518; }\n  .circle-o.circle-o-success {\n    border-color: #64bd63; }\n  .circle-o.circle-o-info {\n    border-color: #5dc4bf; }\n  .circle-o.circle-o-primary {\n    border-color: #5d8fc2; }\n  .circle-o.circle-o-black {\n    border-color: #000; }\n  .circle-o.circle-o-gray-darker {\n    border-color: #222222; }\n  .circle-o.circle-o-gray-dark {\n    border-color: #343434; }\n  .circle-o.circle-o-gray {\n    border-color: #555555; }\n  .circle-o.circle-o-gray-light {\n    border-color: #999999; }\n  .circle-o.circle-o-gray-lighter {\n    border-color: #eeeeee; }\n  .circle-o.circle-o-white {\n    border-color: #fff; }\n\n.thumb-xlg {\n  width: 100px; }\n  .thumb-xlg > .glyphicon,\n  .thumb-xlg > .fa {\n    line-height: 100px; }\n\n.thumb-lg {\n  width: 60px; }\n  .thumb-lg > .glyphicon,\n  .thumb-lg > .fa {\n    line-height: 60px; }\n\n.thumb {\n  width: 48px; }\n  .thumb > .glyphicon,\n  .thumb > .fa {\n    line-height: 48px; }\n\n.thumb-sm {\n  width: 34px; }\n  .thumb-sm > .glyphicon,\n  .thumb-sm > .fa {\n    line-height: 34px; }\n\n.thumb-xs {\n  width: 28px; }\n  .thumb-xs > .glyphicon,\n  .thumb-xs > .fa {\n    line-height: 28px; }\n\n.thumb-xs,\n.thumb-sm,\n.thumb-lg,\n.thumb-xlg,\n.thumb {\n  position: relative;\n  display: inline-block;\n  text-align: center; }\n  .thumb-xs img,\n  .thumb-sm img,\n  .thumb-lg img,\n  .thumb-xlg img,\n  .thumb img {\n    height: auto;\n    max-width: 100%;\n    vertical-align: middle; }\n  .thumb-xs .status,\n  .thumb-sm .status,\n  .thumb-lg .status,\n  .thumb-xlg .status,\n  .thumb .status {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 0.7em;\n    height: 0.7em;\n    border: 0.15em solid #fff;\n    border-radius: 50%; }\n    .thumb-xs .status.status-bottom,\n    .thumb-sm .status.status-bottom,\n    .thumb-lg .status.status-bottom,\n    .thumb-xlg .status.status-bottom,\n    .thumb .status.status-bottom {\n      top: auto;\n      left: auto;\n      bottom: 0;\n      right: 0; }\n\n.text-ellipsis {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.input-dark {\n  background-color: rgba(0, 0, 0, 0.4);\n  border: 0;\n  color: #555555; }\n  .input-dark:focus {\n    background-color: #eeeeee; }\n\n.input-group-dark .input-group-addon,\n.input-group-dark .form-control {\n  background-color: rgba(0, 0, 0, 0.4);\n  border: 0;\n  color: #555555;\n  transition: background-color 0.15s ease-in-out; }\n\n.input-group-dark .form-control:focus,\n.input-group-dark .form-control:focus + .input-group-addon,\n.input-group-dark.focus .input-group-addon {\n  background-color: #eeeeee; }\n\n.input-group-transparent .form-control:first-child, .input-group-no-border .form-control:first-child,\n.input-group-transparent .input-group-addon:first-child, .input-group-no-border .input-group-addon:first-child,\n.input-group-transparent .input-group-btn:first-child > .btn, .input-group-no-border .input-group-btn:first-child > .btn,\n.input-group-transparent .input-group-btn:first-child > .btn-group > .btn, .input-group-no-border .input-group-btn:first-child > .btn-group > .btn,\n.input-group-transparent .input-group-btn:first-child > .dropdown-toggle, .input-group-no-border .input-group-btn:first-child > .dropdown-toggle,\n.input-group-transparent .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle), .input-group-no-border .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-transparent .input-group-btn:last-child > .btn-group:not(:last-child) > .btn, .input-group-no-border .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-right: none; }\n\n.input-group-transparent .form-control:last-child, .input-group-no-border .form-control:last-child,\n.input-group-transparent .input-group-addon:last-child, .input-group-no-border .input-group-addon:last-child,\n.input-group-transparent .input-group-btn:last-child > .btn, .input-group-no-border .input-group-btn:last-child > .btn,\n.input-group-transparent .input-group-btn:last-child > .btn-group > .btn, .input-group-no-border .input-group-btn:last-child > .btn-group > .btn,\n.input-group-transparent .input-group-btn:last-child > .dropdown-toggle, .input-group-no-border .input-group-btn:last-child > .dropdown-toggle,\n.input-group-transparent .input-group-btn:first-child > .btn:not(:first-child), .input-group-no-border .input-group-btn:first-child > .btn:not(:first-child),\n.input-group-transparent .input-group-btn:first-child > .btn-group:not(:first-child) > .btn, .input-group-no-border .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-left: none;\n  padding-left: 0; }\n\n.input-group-transparent .input-group-addon, .input-group-no-border .input-group-addon {\n  background-color: #fff;\n  transition: border-color ease-in-out 0.15s; }\n\n.input-group-transparent .form-control:focus + .input-group-addon, .input-group-no-border .form-control:focus + .input-group-addon,\n.input-group-transparent.focus .input-group-addon, .focus.input-group-no-border .input-group-addon {\n  border-color: #4D90FE; }\n\n.input-no-border, .input-group-no-border .form-control,\n.input-group-no-border .input-group-addon {\n  border: none;\n  transition: background-color ease-in-out 0.15s; }\n  .input-no-border:focus, .input-group-no-border .form-control:focus,\n  .input-group-no-border .input-group-addon:focus,\n  .input-group-no-border .form-control:focus + .input-group-addon,\n  .input-group-no-border.focus .input-group-addon {\n    background-color: #f1f1f1; }\n\n.input-group-rounded .form-control:first-child,\n.input-group-rounded .input-group-addon:first-child,\n.input-group-rounded .input-group-btn:first-child > .btn,\n.input-group-rounded .input-group-btn:first-child > .btn-group > .btn,\n.input-group-rounded .input-group-btn:first-child > .dropdown-toggle,\n.input-group-rounded .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-rounded .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.input-group-rounded .form-control:last-child,\n.input-group-rounded .input-group-addon:last-child,\n.input-group-rounded .input-group-btn:last-child > .btn,\n.input-group-rounded .input-group-btn:last-child > .btn-group > .btn,\n.input-group-rounded .input-group-btn:last-child > .dropdown-toggle,\n.input-group-rounded .input-group-btn:first-child > .btn:not(:first-child),\n.input-group-rounded .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n.chart-overflow-bottom {\n  margin: 0 -20px -15px; }\n\n.globe {\n  font-size: 64px; }\n  .globe > i {\n    position: relative; }\n    .globe > i > i {\n      position: absolute;\n      left: 0; }\n\n.thin-scroll::-webkit-scrollbar {\n  height: 8px;\n  width: 8px; }\n\n.thin-scroll::-webkit-scrollbar:hover {\n  background-color: #e9e9e9;\n  border: none; }\n\n.thin-scroll::-webkit-scrollbar-thumb {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.2);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n\n.thin-scroll::-webkit-scrollbar-thumb:hover {\n  background-color: #999999; }\n\n@-webkit-keyframes bg-attention {\n  0% {\n    background-color: #fdf7e6; }\n  5% {\n    background-color: #fae8b6; }\n  0% {\n    background-color: transparent; } }\n\n@keyframes bg-attention {\n  0% {\n    background-color: #fdf7e6; }\n  5% {\n    background-color: #fae8b6; }\n  0% {\n    background-color: transparent; } }\n\n.bg-attention {\n  animation: bg-attention 10s; }\n\n/* .h* + .fw-bold */\n.value0 {\n  margin: 0;\n  font-size: 54px;\n  font-weight: 600; }\n\n.value1 {\n  margin: 0;\n  font-size: 2.5rem;\n  font-weight: 600; }\n\n.value2 {\n  margin: 0;\n  font-size: 2rem;\n  font-weight: 600; }\n\n.value3 {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 600; }\n\n.value4 {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 600; }\n\n.value5 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600; }\n\n.value6 {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600; }\n\n.help {\n  font-size: 85%;\n  color: #999999; }\n\n.no-margin {\n  margin: 0; }\n\n.mt-xlg {\n  margin-top: 40px; }\n\n.mt-n-xlg {\n  margin-top: -40px; }\n\n.mt-lg {\n  margin-top: 1.5rem; }\n\n.mt-n-lg {\n  margin-top: -1.5rem; }\n\n.mt {\n  margin-top: 1rem; }\n\n.mt-n {\n  margin-top: 1rem; }\n\n.mt-md {\n  margin-top: 1rem; }\n\n.mt-n-md {\n  margin-top: -1rem; }\n\n.mt-sm {\n  margin-top: 0.5rem; }\n\n.mt-n-sm {\n  margin-top: -0.5rem; }\n\n.mt-xs {\n  margin-top: 0.25rem; }\n\n.mt-n-xs {\n  margin-top: -0.25rem; }\n\n.mt-0 {\n  margin-top: 0; }\n\n.mt-n-0 {\n  margin-top: 0; }\n\n.mb-xlg {\n  margin-bottom: 40px; }\n\n.mb-n-xlg {\n  margin-bottom: -40px; }\n\n.mb-lg {\n  margin-bottom: 1.5rem; }\n\n.mb-n-lg {\n  margin-bottom: -1.5rem; }\n\n.mb {\n  margin-bottom: 1rem; }\n\n.mb-n {\n  margin-bottom: 1rem; }\n\n.mb-md {\n  margin-bottom: 1rem; }\n\n.mb-n-md {\n  margin-bottom: -1rem; }\n\n.mb-sm {\n  margin-bottom: 0.5rem; }\n\n.mb-n-sm {\n  margin-bottom: -0.5rem; }\n\n.mb-xs {\n  margin-bottom: 0.25rem; }\n\n.mb-n-xs {\n  margin-bottom: -0.25rem; }\n\n.mb-0 {\n  margin-bottom: 0; }\n\n.mb-n-0 {\n  margin-bottom: 0; }\n\n.ml-lg {\n  margin-left: 20px; }\n\n.ml-n-lg {\n  margin-left: -20px; }\n\n.ml {\n  margin-left: 15px; }\n\n.ml-n {\n  margin-left: 15px; }\n\n.ml-md {\n  margin-left: 15px; }\n\n.ml-n-md {\n  margin-left: -15px; }\n\n.ml-sm {\n  margin-left: 10px; }\n\n.ml-n-sm {\n  margin-left: -10px; }\n\n.ml-xs {\n  margin-left: 5px; }\n\n.ml-n-xs {\n  margin-left: -5px; }\n\n.ml-0 {\n  margin-left: 0; }\n\n.ml-n-0 {\n  margin-left: 0; }\n\n.mr-lg {\n  margin-right: 20px; }\n\n.mr-n-lg {\n  margin-right: -20px; }\n\n.mr {\n  margin-right: 15px; }\n\n.mr-n {\n  margin-right: 15px; }\n\n.mr-md {\n  margin-right: 15px; }\n\n.mr-n-md {\n  margin-right: -15px; }\n\n.mr-sm {\n  margin-right: 10px; }\n\n.mr-n-sm {\n  margin-right: -10px; }\n\n.mr-xs {\n  margin-right: 5px; }\n\n.mr-n-xs {\n  margin-right: -5px; }\n\n.mr-0 {\n  margin-right: 0; }\n\n.mr-n-0 {\n  margin-right: 0; }\n\n.no-padding {\n  padding: 0; }\n\n.display-inline {\n  display: inline; }\n\n.display-n-inline {\n  display: -inline; }\n\n.display-inline-block {\n  display: inline-block; }\n\n.display-n-inline-block {\n  display: -inline; }\n\n.display-block {\n  display: block; }\n\n.display-n-block {\n  display: -inline; }\n\n.width-50 {\n  width: 50px; }\n\n.width-n-50 {\n  width: -inline; }\n\n.width-100 {\n  width: 100px; }\n\n.width-n-100 {\n  width: -inline; }\n\n.width-150 {\n  width: 150px; }\n\n.width-n-150 {\n  width: -inline; }\n\n.width-200 {\n  width: 200px; }\n\n.width-n-200 {\n  width: -inline; }\n\n.height-50 {\n  height: 50px; }\n\n.height-n-50 {\n  height: -inline; }\n\n.height-100 {\n  height: 100px; }\n\n.height-n-100 {\n  height: -inline; }\n\n.height-150 {\n  height: 150px; }\n\n.height-n-150 {\n  height: -inline; }\n\n.height-200 {\n  height: 200px; }\n\n.height-n-200 {\n  height: -inline; }\n\n.height-250 {\n  height: 250px; }\n\n.height-n-250 {\n  height: -inline; }\n\n.max-height-50 {\n  max-height: 50px; }\n\n.max-height-n-50 {\n  max-height: -inline; }\n\n.max-height-100 {\n  max-height: 100px; }\n\n.max-height-n-100 {\n  max-height: -inline; }\n\n.max-height-150 {\n  max-height: 150px; }\n\n.max-height-n-150 {\n  max-height: -inline; }\n\n.max-height-200 {\n  max-height: 200px; }\n\n.max-height-n-200 {\n  max-height: -inline; }\n\n.max-height-250 {\n  max-height: 250px; }\n\n.max-height-n-250 {\n  max-height: -inline; }\n\n.opacity-10 {\n  opacity: 0.1; }\n\n.opacity-n-10 {\n  opacity: -inline; }\n\n.opacity-20 {\n  opacity: 0.2; }\n\n.opacity-n-20 {\n  opacity: -inline; }\n\n.opacity-30 {\n  opacity: 0.3; }\n\n.opacity-n-30 {\n  opacity: -inline; }\n\n.opacity-40 {\n  opacity: 0.4; }\n\n.opacity-n-40 {\n  opacity: -inline; }\n\n.opacity-50 {\n  opacity: 0.5; }\n\n.opacity-n-50 {\n  opacity: -inline; }\n\n.opacity-60 {\n  opacity: 0.6; }\n\n.opacity-n-60 {\n  opacity: -inline; }\n\n.opacity-70 {\n  opacity: 0.7; }\n\n.opacity-n-70 {\n  opacity: -inline; }\n\n.opacity-80 {\n  opacity: 0.8; }\n\n.opacity-n-80 {\n  opacity: -inline; }\n\n.opacity-90 {\n  opacity: 0.9; }\n\n.opacity-n-90 {\n  opacity: -inline; }\n\n.z-index-more {\n  z-index: 1; }\n\n.z-index-n-more {\n  z-index: -inline; }\n\n.z-index-less {\n  z-index: -1; }\n\n.z-index-n-less {\n  z-index: -inline; }\n\n.z-index-10 {\n  z-index: 10; }\n\n.z-index-n-10 {\n  z-index: -inline; }\n\n.z-index--10 {\n  z-index: -10; }\n\n.z-index-n--10 {\n  z-index: -inline; }\n\n.no-border {\n  border: none; }\n\n.bt {\n  border-top: 1px solid #ddd; }\n\n.br {\n  border-right: 1px solid #ddd; }\n\n.bb {\n  border-bottom: 1px solid #ddd; }\n\n.bl {\n  border-left: 1px solid #ddd; }\n\n.overflow-hidden {\n  overflow: hidden; }\n\n.fw-semi-bold {\n  font-weight: 600; }\n\n.fw-normal {\n  font-weight: 400; }\n\n.fw-bold {\n  font-weight: 700; }\n\n.fw-thin {\n  font-weight: 300; }\n\n.rotate-45 {\n  transform: rotate(45deg); }\n\n.rotate-135 {\n  transform: rotate(135deg); }\n\n.rotate-225 {\n  transform: rotate(225deg); }\n\n.rotate-315 {\n  transform: rotate(315deg); }\n\n/* small + .text-muted*/\n.deemphasize {\n  font-size: 85%;\n  color: #999999; }\n\n.bg-primary {\n  background-color: #5d8fc2 !important;\n  color: #555555 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #4175ab; }\n\n.bg-success {\n  background-color: #64bd63 !important;\n  color: #555555 !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #48a746; }\n\n.bg-info {\n  background-color: #5dc4bf !important;\n  color: #555555 !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #40aea9; }\n\n.bg-warning {\n  background-color: #f0b518 !important;\n  color: #555555 !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #c8950d; }\n\n.bg-danger {\n  background-color: #dd5826 !important;\n  color: #555555 !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #b4461c; }\n\n.bg-primary-light {\n  background-color: #dee4ee !important;\n  color: #555555 !important; }\n\na.bg-primary-light:focus, a.bg-primary-light:hover {\n  background-color: #bcc8dd; }\n\n.bg-success-light {\n  background-color: #ecfaec !important;\n  color: #555555 !important; }\n\na.bg-success-light:focus, a.bg-success-light:hover {\n  background-color: #c4efc4; }\n\n.bg-info-light {\n  background-color: #f2fafa !important;\n  color: #555555 !important; }\n\na.bg-info-light:focus, a.bg-info-light:hover {\n  background-color: #cdecec; }\n\n.bg-warning-light {\n  background-color: #fdf7e6 !important;\n  color: #555555 !important; }\n\na.bg-warning-light:focus, a.bg-warning-light:hover {\n  background-color: #fae8b6; }\n\n.bg-danger-light {\n  background-color: #fff2ef !important;\n  color: #555555 !important; }\n\na.bg-danger-light:focus, a.bg-danger-light:hover {\n  background-color: #ffc9bc; }\n\n.bg-body {\n  background-color: #eee !important;\n  color: #555555 !important; }\n\na.bg-body:focus, a.bg-body:hover {\n  background-color: #d5d5d5; }\n\n.bg-body-light {\n  background-color: #f6f6f6 !important;\n  color: #555555 !important; }\n\na.bg-body-light:focus, a.bg-body-light:hover {\n  background-color: gainsboro; }\n\n.bg-gray {\n  background-color: #555555 !important;\n  color: #555555 !important; }\n\na.bg-gray:focus, a.bg-gray:hover {\n  background-color: #3c3c3c; }\n\n.bg-gray-transparent {\n  background-color: rgba(85, 85, 85, 0.6) !important;\n  color: #555555 !important; }\n\na.bg-gray-transparent:focus, a.bg-gray-transparent:hover {\n  background-color: rgba(60, 60, 60, 0.6); }\n\n.bg-gray-dark {\n  background-color: #343434 !important;\n  color: #555555 !important; }\n\na.bg-gray-dark:focus, a.bg-gray-dark:hover {\n  background-color: #1b1b1b; }\n\n.bg-black {\n  background-color: #000 !important;\n  color: #555555 !important; }\n\na.bg-black:focus, a.bg-black:hover {\n  background-color: black; }\n\n.bg-gray-light {\n  background-color: #999999 !important;\n  color: #555555 !important; }\n\na.bg-gray-light:focus, a.bg-gray-light:hover {\n  background-color: gray; }\n\n.bg-gray-lighter {\n  background-color: #eeeeee !important;\n  color: #555555 !important; }\n\na.bg-gray-lighter:focus, a.bg-gray-lighter:hover {\n  background-color: #d5d5d5; }\n\n.bg-transparent {\n  background-color: transparent !important;\n  color: #555555 !important; }\n\na.bg-transparent:focus, a.bg-transparent:hover {\n  background-color: transparent; }\n\n.bg-white {\n  background-color: #fff !important;\n  color: #555555 !important; }\n\na.bg-white:focus, a.bg-white:hover {\n  background-color: #e6e6e6; }\n\n.bg-sidebar {\n  background-color: #242424 !important;\n  color: #555555 !important; }\n\na.bg-sidebar:focus, a.bg-sidebar:hover {\n  background-color: #0b0b0b; }\n\n.bg-body, .bg-body-light, .bg-gray, .bg-gray-transparent, .bg-transparent,\n.bg-primary, .bg-success, .bg-warning, .bg-danger, .bg-info {\n  transition: background-color 0.15s ease-in-out; }\n\n.text-primary {\n  color: #5d8fc2 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #4175ab !important; }\n\n.text-success {\n  color: #64bd63 !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #48a746 !important; }\n\n.text-info {\n  color: #5dc4bf !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #40aea9 !important; }\n\n.text-warning {\n  color: #f0b518 !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #c8950d !important; }\n\n.text-danger {\n  color: #dd5826 !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #b4461c !important; }\n\n.text-link {\n  color: #218BC3 !important; }\n\na.text-link:focus, a.text-link:hover {\n  color: #1a6c97 !important; }\n\n.text-white {\n  color: #fff !important; }\n\na.text-white:focus, a.text-white:hover {\n  color: #e6e6e6 !important; }\n\n.text-gray {\n  color: #555555 !important; }\n\na.text-gray:focus, a.text-gray:hover {\n  color: #3c3c3c !important; }\n\n.text-gray-dark {\n  color: #343434 !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #1b1b1b !important; }\n\n.text-gray-light {\n  color: #999999 !important; }\n\na.text-gray-light:focus, a.text-gray-light:hover {\n  color: gray !important; }\n\n.text-semi-muted {\n  color: #777 !important; }\n\na.text-semi-muted:focus, a.text-semi-muted:hover {\n  color: #5e5e5e !important; }\n\n.text-gray-darker {\n  color: #222222 !important; }\n\na.text-gray-darker:focus, a.text-gray-darker:hover {\n  color: #090909 !important; }\n\n.text-gray-lighter {\n  color: #eeeeee !important; }\n\na.text-gray-lighter:focus, a.text-gray-lighter:hover {\n  color: #d5d5d5 !important; }\n\n.text-bg-sidebar {\n  color: #242424 !important; }\n\na.text-bg-sidebar:focus, a.text-bg-sidebar:hover {\n  color: #0b0b0b !important; }\n\n.text-light {\n  opacity: .8; }\n\n.fs-mini {\n  font-size: 13px; }\n\n.fs-smaller {\n  font-size: 85%; }\n\n.fs-sm {\n  font-size: 0.875rem; }\n\n.fs-larger {\n  font-size: 15px; }\n\n.btlr {\n  border-top-left-radius: 0.25rem; }\n\n.btrr {\n  border-top-right-radius: 0.25rem; }\n\n.bblr {\n  border-bottom-left-radius: 0.25rem; }\n\n.bbrr {\n  border-bottom-right-radius: 0.25rem; }\n\n.hide {\n  display: none !important; }\n\n.show {\n  display: block !important; }\n\n.fade-up.ng-enter {\n  animation: fadeInUp 0.5s; }\n\n.fade-up.ng-leave {\n  animation: fadeOutUp 0.5s; }\n"

/***/ }),

/***/ 402:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"error-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n        <div class=\"error-container\">\r\n          <h1 class=\"error-code\">404</h1>\r\n          <p class=\"error-info\">\r\n            Opps, it seems that this page does not exist.\r\n          </p>\r\n          <p class=\"error-help mb\">\r\n            If you are sure it should, search for it.\r\n          </p>\r\n          <form (ngSubmit)=\"searchResult()\" method=\"get\">\r\n            <div class=\"form-group\">\r\n              <input class=\"form-control input-no-border\" type=\"text\" placeholder=\"Search Pages\">\r\n            </div>\r\n            <button type=\"submit\"  class=\"btn btn-inverse\">\r\n              Search <i class=\"fa fa-search text-warning ml-xs\"></i>\r\n            </button>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </main>\r\n\r\n  <footer class=\"page-footer\">\r\n    Sedgwick Law\r\n  </footer>\r\n</div>\r\n"

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(45);
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__(207);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__(208);
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__ = __webpack_require__(130);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ng2__ = __webpack_require__(256);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_reducer__ = __webpack_require__(131);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__src_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state__ = __webpack_require__(132);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__src_state__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_store__ = __webpack_require__(133);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__src_store__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils__ = __webpack_require__(134);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var QueueAction_1 = __webpack_require__(409);
var QueueScheduler_1 = __webpack_require__(410);
/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=queue.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreDevtoolActions; });
var ActionTypes = {
    PERFORM_ACTION: 'PERFORM_ACTION',
    RESET: 'RESET',
    ROLLBACK: 'ROLLBACK',
    COMMIT: 'COMMIT',
    SWEEP: 'SWEEP',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    SET_ACTIONS_ACTIVE: 'SET_ACTIONS_ACTIVE',
    JUMP_TO_STATE: 'JUMP_TO_STATE',
    IMPORT_STATE: 'IMPORT_STATE'
};
/**
* Action creators to change the History state.
*/
var StoreDevtoolActions = {
    performAction: function (action) {
        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?');
        }
        return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
    },
    reset: function () {
        return { type: ActionTypes.RESET, timestamp: Date.now() };
    },
    rollback: function () {
        return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
    },
    commit: function () {
        return { type: ActionTypes.COMMIT, timestamp: Date.now() };
    },
    sweep: function () {
        return { type: ActionTypes.SWEEP };
    },
    toggleAction: function (id) {
        return { type: ActionTypes.TOGGLE_ACTION, id: id };
    },
    setActionsActive: function (start, end, active) {
        if (active === void 0) { active = true; }
        return { type: ActionTypes.SET_ACTIONS_ACTIVE, start: start, end: end, active: active };
    },
    jumpToState: function (index) {
        return { type: ActionTypes.JUMP_TO_STATE, index: index };
    },
    importState: function (nextLiftedState) {
        return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState };
    }
};
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(89);
/* harmony export (immutable) */ __webpack_exports__["d"] = difference;
/* harmony export (immutable) */ __webpack_exports__["c"] = unliftState;
/* unused harmony export unliftAction */
/* harmony export (immutable) */ __webpack_exports__["b"] = liftAction;
/* harmony export (immutable) */ __webpack_exports__["a"] = applyOperators;

function difference(first, second) {
    return first.filter(function (item) { return second.indexOf(item) < 0; });
}
/**
 * Provides an app's view into the state of the lifted store.
 */
function unliftState(liftedState) {
    var computedStates = liftedState.computedStates, currentStateIndex = liftedState.currentStateIndex;
    var state = computedStates[currentStateIndex].state;
    return state;
}
function unliftAction(liftedState) {
    return liftedState.actionsById[liftedState.nextActionId - 1];
}
/**
* Lifts an app's action into an action on the lifted store.
*/
function liftAction(action) {
    return __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* StoreDevtoolActions */].performAction(action);
}
function applyOperators(input$, operators) {
    return operators.reduce(function (source$, _a) {
        var operator = _a[0], args = _a.slice(1);
        return operator.apply(source$, args);
    }, input$);
}
//# sourceMappingURL=utils.js.map

/***/ })

},[244]);
//# sourceMappingURL=main.map