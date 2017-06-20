webpackJsonpac__name_([4],{

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_effects__ = __webpack_require__(842);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__src_effects__["a"]; });
/* unused harmony reexport mergeEffects */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_actions__ = __webpack_require__(839);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__src_actions__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_effects_module__ = __webpack_require__(919);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_effects_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_effects_subscription__ = __webpack_require__(841);
/* unused harmony reexport EffectsSubscription */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_util__ = __webpack_require__(920);
/* unused harmony reexport toPayload */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_bootstrap_listener__ = __webpack_require__(840);
/* unused harmony reexport runAfterBootstrapEffects */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypecodesService; });


var TypecodesService = (function () {
    function TypecodesService(http) {
        this.http = http;
    }
    TypecodesService.prototype.getTypecodes = function () {
        return this.http.get('http://10.31.201.176:60497/api/typecodes')
            .map(function (res) { return res.json(); });
    };
    return TypecodesService;
}());
TypecodesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], TypecodesService);



/***/ }),

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketService; });


var TicketService = (function () {
    function TicketService(http) {
        this.http = http;
    }
    // api calls go here
    TicketService.prototype.getTickets = function () {
        return this.http.get('http://10.31.201.176:60497/api/tickets')
            .map(function (x) { return x.json(); }); // creates the  "payload" on the next line
        //.map(payload => ({type: 'ADD_TICKET_LIST', payload: payload})) // creates the "action"
        //.subscribe(action => this._store.dispatch(action)); // dispatches the action
    };
    TicketService.prototype.getTicketDetailById = function (id) {
        return this.http.get('http://10.31.201.176:60497/api/tickets/' + id)
            .map(function (res) { return res.json(); });
    };
    TicketService.prototype.postTicketComment = function (comment) {
        return this.http.post('http://10.31.201.176:60497/api/ticketComments', comment)
            .map(function (res) { return res.json(); });
    };
    TicketService.prototype.getTicketById = function (id) {
        return {
            requestorName: 'Danielle',
            ticketId: 1,
            component: { id: 1, text: 'Software' },
            subcomponent: { id: 1, text: 'Outlook' },
            category: { id: 1, text: 'Password Reset' },
            priority: { id: 1, text: 'High' },
            status: { id: 2, text: 'Open' },
            description: 'say need to set password but do not know old one',
            createdDate: '03/17/2017',
            updatedDate: '',
            source: { id: 1, text: 'email' }
        };
    };
    TicketService.prototype.addTicket = function (ticket) {
        return this.http.post('http://10.31.201.176:60497/api/tickets', ticket)
            .map(function (res) { return res.json(); });
    };
    TicketService.prototype.putTicket = function (ticket) {
        return this.http.put('http://10.31.201.176:60497/api/tickets/' + ticket.TicketId, ticket)
            .map(function (res) { return res.json(); });
    };
    return TicketService;
}());
TicketService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], TicketService);



/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tab; });

var Tab = (function () {
    function Tab() {
        this.active = false;
    }
    return Tab;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", String)
], Tab.prototype, "tabTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], Tab.prototype, "active", void 0);
Tab = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'tab',
        styles: [".pane { padding: 1em; }"],
        template: "\n    <div [hidden]=\"!active\" role=\"tabpanel\" class=\"tab-pane\">\n      <ng-content></ng-content>\n    </div>\n  "
    })
], Tab);



/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Actions; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// TODO: This is a copy of this: https://github.com/redux-observable/redux-observable/blob/master/src/ActionsObservable.js
// Remove after this is resolved: https://github.com/redux-observable/redux-observable/issues/95




var Actions = Actions_1 = (function (_super) {
    __extends(Actions, _super);
    function Actions(actionsSubject) {
        var _this = _super.call(this) || this;
        _this.source = actionsSubject;
        return _this;
    }
    Actions.prototype.lift = function (operator) {
        var observable = new Actions_1(this);
        observable.operator = operator;
        return observable;
    };
    Actions.prototype.ofType = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(this, function (_a) {
            var type = _a.type;
            var len = keys.length;
            if (len === 1) {
                return type === keys[0];
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (keys[i] === type) {
                        return true;
                    }
                }
            }
            return false;
        });
    };
    return Actions;
}(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]));
Actions = Actions_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["d" /* Dispatcher */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]])
], Actions);

var Actions_1;
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return afterBootstrapEffects; });
/* harmony export (immutable) */ __webpack_exports__["b"] = runAfterBootstrapEffects;

var afterBootstrapEffects = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('ngrx:effects: Bootstrap Effects');
function runAfterBootstrapEffects(injector, subscription) {
    return function () {
        var effectInstances = injector.get(afterBootstrapEffects, false);
        if (effectInstances) {
            subscription.addEffects(effectInstances);
        }
    };
}
//# sourceMappingURL=bootstrap-listener.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__effects__ = __webpack_require__(842);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return effects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EffectsSubscription; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var effects = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* OpaqueToken */]('ngrx/effects: Effects');
var EffectsSubscription = (function (_super) {
    __extends(EffectsSubscription, _super);
    function EffectsSubscription(store, parent, effectInstances) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.parent = parent;
        if (Boolean(parent)) {
            parent.add(_this);
        }
        if (Boolean(effectInstances)) {
            _this.addEffects(effectInstances);
        }
        return _this;
    }
    EffectsSubscription.prototype.addEffects = function (effectInstances) {
        var sources = effectInstances.map(__WEBPACK_IMPORTED_MODULE_4__effects__["b" /* mergeEffects */]);
        var merged = __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__["merge"].apply(void 0, sources);
        this.add(merged.subscribe(this.store));
    };
    EffectsSubscription.prototype.ngOnDestroy = function () {
        if (!this.closed) {
            this.unsubscribe();
        }
    };
    return EffectsSubscription;
}(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["Subscription"]));
EffectsSubscription = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["c" /* Store */])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Optional */])()), __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* SkipSelf */])()),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Optional */])()), __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(effects)),
    __metadata("design:paramtypes", [Object, EffectsSubscription, Array])
], EffectsSubscription);

//# sourceMappingURL=effects-subscription.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__);
/* harmony export (immutable) */ __webpack_exports__["a"] = Effect;
/* unused harmony export getEffectsMetadata */
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeEffects;


var METADATA_KEY = '@ngrx/effects';
function Effect(_a) {
    var dispatch = (_a === void 0 ? { dispatch: true } : _a).dispatch;
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, [], target);
        }
        var effects = Reflect.getOwnMetadata(METADATA_KEY, target);
        var metadata = { propertyName: propertyName, dispatch: dispatch };
        Reflect.defineMetadata(METADATA_KEY, effects.concat([metadata]), target);
    };
}
function getEffectsMetadata(instance) {
    var target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(METADATA_KEY, target);
}
function mergeEffects(instance) {
    var observables = getEffectsMetadata(instance).map(function (_a) {
        var propertyName = _a.propertyName, dispatch = _a.dispatch;
        var observable = typeof instance[propertyName] === 'function' ?
            instance[propertyName]() : instance[propertyName];
        if (dispatch === false) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__["ignoreElements"].call(observable);
        }
        return observable;
    });
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__["merge"].apply(void 0, observables);
}
//# sourceMappingURL=effects.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typecodes_typecodes_actions__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typecodes_typecodes_effect__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_effects__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__typecodes_typecodes_service__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });






var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["w" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["c" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngrx_effects__["a" /* EffectsModule */].run(__WEBPACK_IMPORTED_MODULE_1__typecodes_typecodes_effect__["a" /* TypecodesEffects */])],
        declarations: [],
        providers: [__WEBPACK_IMPORTED_MODULE_3__typecodes_typecodes_service__["a" /* TypecodesService */], __WEBPACK_IMPORTED_MODULE_0__typecodes_typecodes_actions__["a" /* TypecodesActions */]]
    })
], CoreModule);



/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typecodes_service__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__typecodes_actions__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_effects__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypecodesEffects; });





var TypecodesEffects = (function () {
    function TypecodesEffects(actions$, typecodesService, typecodesActions) {
        var _this = this;
        this.actions$ = actions$;
        this.typecodesService = typecodesService;
        this.typecodesActions = typecodesActions;
        this.loadTypecodes$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_2__typecodes_actions__["a" /* TypecodesActions */].LOAD_ALL_TYPECODES)
            .switchMap(function (action) { return _this.typecodesService.getTypecodes(); })
            .map(function (typecodes) { return _this.typecodesActions.loadTypecodesSuccess(typecodes); });
    }
    return TypecodesEffects;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"])
], TypecodesEffects.prototype, "loadTypecodes$", void 0);
TypecodesEffects = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngrx_effects__["c" /* Actions */],
        __WEBPACK_IMPORTED_MODULE_0__typecodes_service__["a" /* TypecodesService */],
        __WEBPACK_IMPORTED_MODULE_2__typecodes_actions__["a" /* TypecodesActions */]])
], TypecodesEffects);



/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab_component__ = __webpack_require__(838);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tabs; });


var Tabs = (function () {
    function Tabs() {
    }
    // contentChildren are set
    Tabs.prototype.ngAfterContentInit = function () {
        // get all active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    Tabs.prototype.selectTab = function (tab) {
        // deactivate all tabs
        this.tabs.toArray().forEach(function (t) { return t.active = false; });
        // activate the tab the user has clicked on.
        tab.active = true;
    };
    return Tabs;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_1__tab_component__["a" /* Tab */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* QueryList */])
], Tabs.prototype, "tabs", void 0);
Tabs = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'tabs',
        template: "\n    <ul class=\"nav nav-tabs\" id=\"requesterTabs\" role=\"tablist\">\n      <li *ngFor=\"let tab of tabs\" [class.active]=\"tab.active\" class=\"nav-item\">\n        <a class=\"nav-link\" (click)=\"selectTab(tab)\">{{tab.tabTitle}}</a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n  "
    })
], Tabs);



/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketActivity; });

var TicketActivity = (function () {
    function TicketActivity() {
    }
    TicketActivity.prototype.ngOnInit = function () {
    };
    return TicketActivity;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", Array)
], TicketActivity.prototype, "activity", void 0);
TicketActivity = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'ticket-activity',
        template: __webpack_require__(954),
        styles: [__webpack_require__(945)]
    })
], TicketActivity);



/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_actions__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_core_typecodes_typecodes_service__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketAdd; });





var TicketAdd = (function () {
    function TicketAdd(typecodeService, typecodesActions, ticketActions, store) {
        this.typecodeService = typecodeService;
        this.typecodesActions = typecodesActions;
        this.ticketActions = ticketActions;
        this.store = store;
        this.addTicket = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["C" /* EventEmitter */]();
        this.typecodes$ = store.select(this.typecodesSelector);
    }
    TicketAdd.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(this.typecodesActions.getAllTypecodes());
        console.log("newTicket", this.newTicket);
        this.newTicket = {
            summary: "",
            requesterId: null,
            ownerId: null,
            causeId: 3,
            statusId: 1,
            priorityId: 3,
            originId: null,
            categoryId: null,
            subcategoryId: null,
            isConfidential: false
        };
        this.typecodes$.subscribe(function (x) { return _this.typecodes = x; });
        this.users = [
            { 'name': 'Aaron Gaspard', 'id': 1 },
            { 'name': 'Adam Behrendt', 'id': 3 },
            { 'name': 'Adam Nagorski', 'id': 4 },
            { 'name': 'Afigo Fadahunsi', 'id': 5 },
            { 'name': 'Agelo Reppas', 'id': 6 },
            { 'name': 'Akin Alabi', 'id': 7 },
            { 'name': 'Akinwale Collins', 'id': 8 },
            { 'name': 'Alan Clements', 'id': 9 },
            { 'name': 'Alan Vickery', 'id': 10 },
            { 'name': 'Alex Espinoza', 'id': 11 },
            { 'name': 'Alex Harrell', 'id': 12 },
            { 'name': 'Alex Potente', 'id': 13 },
            { 'name': 'Alex Potts', 'id': 14 },
            { 'name': 'Alex Shilliday', 'id': 15 },
            { 'name': 'Alexandra Block', 'id': 17 },
            { 'name': 'Alfred Warrington', 'id': 18 },
            { 'name': 'Alice Estipona', 'id': 19 },
            { 'name': 'Alice Serko', 'id': 20 },
            { 'name': 'Alisha Vance', 'id': 21 },
            { 'name': 'Alison Beanum', 'id': 22 },
            { 'name': 'Alison Thompson', 'id': 23 },
            { 'name': 'Amanda Henderson', 'id': 25 },
            { 'name': 'Amee Mikacich', 'id': 26 },
            { 'name': 'Ammanual Luba', 'id': 27 },
            { 'name': 'Amy Beecham', 'id': 28 },
            { 'name': 'Amy Brittain', 'id': 29 },
            { 'name': 'Andre Graf', 'id': 30 },
            { 'name': 'Andrea Gaspard', 'id': 31 },
            { 'name': 'Andrew Milne', 'id': 32 },
            { 'name': 'Andrew Port', 'id': 33 },
            { 'name': 'Andrew Sutherlin', 'id': 34 },
            { 'name': 'Andromeda Butler', 'id': 35 },
            { 'name': 'Angel Santiago', 'id': 36 },
            { 'name': 'Angela Dunn', 'id': 37 },
            { 'name': 'Angela Lansford', 'id': 38 },
            { 'name': 'Angie Buchanan', 'id': 39 },
            { 'name': 'Angie Liberty', 'id': 40 },
            { 'name': 'Anjuli Cargain', 'id': 42 },
            { 'name': 'Ann Bolen', 'id': 43 },
            { 'name': 'Ann-Marie Tidwell', 'id': 44 },
            { 'name': 'Anna Shimko', 'id': 45 },
            { 'name': 'Anna M. Perez', 'id': 46 },
            { 'name': 'Anne-Marie Rutledge', 'id': 47 },
            { 'name': 'Annie Tualla', 'id': 48 },
            { 'name': 'Anthony Anscombe', 'id': 49 },
            { 'name': 'Anthony Varnado', 'id': 50 },
            { 'name': 'Anurita Varma', 'id': 51 },
            { 'name': 'Arameh O\'Boyle', 'id': 52 },
            { 'name': 'Arthur Yee', 'id': 53 },
            { 'name': 'Asha Mathai', 'id': 54 },
            { 'name': 'Ashley Milnes', 'id': 55 },
            { 'name': 'Azra Dracic', 'id': 57 },
            { 'name': 'Barbara Chaney', 'id': 58 },
            { 'name': 'Barbara Chasty', 'id': 59 },
            { 'name': 'Barbara Dezelle', 'id': 60 },
            { 'name': 'Barbara Fergerson', 'id': 61 },
            { 'name': 'Barbara Miller', 'id': 62 },
            { 'name': 'Barbara Riedel-O\'Leary', 'id': 63 },
            { 'name': 'Barbara Werther', 'id': 64 },
            { 'name': 'Barry Mesher', 'id': 65 },
            { 'name': 'Beach Kuhl', 'id': 66 },
            { 'name': 'Ben Walberg', 'id': 67 },
            { 'name': 'Bernadette Lawson', 'id': 68 },
            { 'name': 'Berridge Marsh', 'id': 69 },
            { 'name': 'Beth Dressel', 'id': 70 },
            { 'name': 'Beth Yoffie', 'id': 71 },
            { 'name': 'Bethann Brandecker', 'id': 72 },
            { 'name': 'Betsy Doyle', 'id': 73 },
            { 'name': 'Blane Olmos', 'id': 74 },
            { 'name': 'Bob Beyer', 'id': 75 },
            { 'name': 'Bob Meyers', 'id': 76 },
            { 'name': 'Brad Buchanan', 'id': 77 },
            { 'name': 'Brandon Summers', 'id': 78 },
            { 'name': 'Brenda Barham', 'id': 79 },
            { 'name': 'Brenda Jansen', 'id': 80 },
            { 'name': 'Brian Bakale', 'id': 81 },
            { 'name': 'Brian Harrison', 'id': 83 },
            { 'name': 'Brian Lowe', 'id': 84 },
            { 'name': 'Brian Monroe', 'id': 85 },
            { 'name': 'Brian Murphy', 'id': 86 },
            { 'name': 'Brian Zeringer', 'id': 87 },
            { 'name': 'Brittney Johnson', 'id': 88 },
            { 'name': 'Bruce Celebrezze', 'id': 89 },
            { 'name': 'Bruce McLeod', 'id': 90 },
            { 'name': 'Bruce Wold', 'id': 91 },
            { 'name': 'Byron Cantuna', 'id': 92 },
            { 'name': 'Caitlin Conyers', 'id': 93 },
            { 'name': 'Cameron Hill', 'id': 94 },
            { 'name': 'Cameron Lue Sang', 'id': 95 },
            { 'name': 'Cara Vecchione', 'id': 96 },
            { 'name': 'Caran Smith', 'id': 97 },
            { 'name': 'Carlos Lang', 'id': 98 },
            { 'name': 'Carol Brophy', 'id': 99 },
            { 'name': 'Carol Gerner', 'id': 100 },
            { 'name': 'Carolina Espinoza', 'id': 101 },
            { 'name': 'Caroline Mankey', 'id': 102 },
            { 'name': 'Carrie Scott', 'id': 103 },
            { 'name': 'Casey Schiano', 'id': 104 },
            { 'name': 'Catherine Robb', 'id': 105 },
            { 'name': 'Cathy Sugayan', 'id': 106 },
            { 'name': 'Celeste Zamudio', 'id': 107 },
            { 'name': 'Celina Curry', 'id': 108 },
            { 'name': 'Cerwin Arcilla', 'id': 109 },
            { 'name': 'Charles Brewster', 'id': 110 },
            { 'name': 'Charles Davant', 'id': 111 },
            { 'name': 'Charles Hurst', 'id': 113 },
            { 'name': 'Charlotte Cook', 'id': 114 },
            { 'name': 'Chelsea Trotter', 'id': 115 },
            { 'name': 'Cheri While', 'id': 116 },
            { 'name': 'Cherie Helton', 'id': 117 },
            { 'name': 'Cherie L. Zeier', 'id': 118 },
            { 'name': 'Cheryl Morris', 'id': 119 },
            { 'name': 'Cheryl Slaughter', 'id': 120 },
            { 'name': 'Chip Davis', 'id': 121 },
            { 'name': 'Chris Burton', 'id': 122 },
            { 'name': 'Chris Marks', 'id': 123 },
            { 'name': 'Chris Morris', 'id': 124 },
            { 'name': 'Chris Weldon', 'id': 125 },
            { 'name': 'Christie Kirchenbauer', 'id': 126 },
            { 'name': 'Christina Vargas', 'id': 127 },
            { 'name': 'Christine Johnson', 'id': 128 },
            { 'name': 'Christine Shores', 'id': 129 },
            { 'name': 'Christopher Collings', 'id': 130 },
            { 'name': 'Christopher Hall', 'id': 131 },
            { 'name': 'Christopher Keale', 'id': 132 },
            { 'name': 'Christopher Losquadro', 'id': 133 },
            { 'name': 'Christopher Norton', 'id': 135 },
            { 'name': 'Christopher Novak', 'id': 136 },
            { 'name': 'Christopher R. Farnsworth', 'id': 137 },
            { 'name': 'Cindy Akehurst', 'id': 138 },
            { 'name': 'Cinthia Motley', 'id': 139 },
            { 'name': 'Claire Cortner', 'id': 140 },
            { 'name': 'Clay Abernathy', 'id': 141 },
            { 'name': 'Clinton Van Dyke', 'id': 142 },
            { 'name': 'Colin Nguyen', 'id': 143 },
            { 'name': 'Conor Foley', 'id': 144 },
            { 'name': 'Cori Steinmann', 'id': 146 },
            { 'name': 'Craig Barnes', 'id': 147 },
            { 'name': 'Craig Peterson', 'id': 148 },
            { 'name': 'Crystal Landes', 'id': 149 },
            { 'name': 'Curtis Parvin', 'id': 150 },
            { 'name': 'Cynthia Alm', 'id': 151 },
            { 'name': 'Cynthia Cho', 'id': 152 },
            { 'name': 'Cynthia Plevin', 'id': 153 },
            { 'name': 'Cynthia Smith', 'id': 154 },
            { 'name': 'DaNeisha Goode', 'id': 155 },
            { 'name': 'Daniel Bryer', 'id': 156 },
            { 'name': 'Daniel Lu', 'id': 157 },
            { 'name': 'Daniel Pole', 'id': 158 },
            { 'name': 'Daniel Salerno', 'id': 159 },
            { 'name': 'Daniel D. Pole', 'id': 160 },
            { 'name': 'Danielle Nelson', 'id': 161 },
            { 'name': 'Danya Ahmed', 'id': 163 },
            { 'name': 'Darlene Alt', 'id': 164 },
            { 'name': 'David Allen', 'id': 165 },
            { 'name': 'David Blow', 'id': 166 },
            { 'name': 'David Brown', 'id': 167 },
            { 'name': 'David Collins', 'id': 168 },
            { 'name': 'David Covey', 'id': 169 },
            { 'name': 'David DeBusschere', 'id': 170 },
            { 'name': 'David Dorsen', 'id': 171 },
            { 'name': 'David Humiston', 'id': 172 },
            { 'name': 'David Kent', 'id': 173 },
            { 'name': 'David Mancini', 'id': 174 },
            { 'name': 'David Mesa', 'id': 175 },
            { 'name': 'David Rhodes', 'id': 177 },
            { 'name': 'Dawn Klein', 'id': 179 },
            { 'name': 'Dawn Lyons', 'id': 180 },
            { 'name': 'Dawn McCord', 'id': 181 },
            { 'name': 'DCOS Reception', 'id': 182 },
            { 'name': 'Dean McElroy', 'id': 183 },
            { 'name': 'Dean Smith', 'id': 184 },
            { 'name': 'Deborah Cohen', 'id': 186 },
            { 'name': 'Deborah O\'Connor', 'id': 187 },
            { 'name': 'Debra Beatty', 'id': 188 },
            { 'name': 'Debra Lambdin', 'id': 189 },
            { 'name': 'Dejanette Newsome', 'id': 190 },
            { 'name': 'Delia Isvoranu', 'id': 191 },
            { 'name': 'Dennis Murphy', 'id': 193 },
            { 'name': 'Dennis Rolstad', 'id': 194 },
            { 'name': 'Dennis Vega', 'id': 195 },
            { 'name': 'Diana Karnes', 'id': 196 },
            { 'name': 'Diana Lynn', 'id': 197 },
            { 'name': 'Diane Janner', 'id': 198 },
            { 'name': 'Diane Reinhard', 'id': 199 },
            { 'name': 'Diane Williams', 'id': 200 },
            { 'name': 'Diane Woolsey', 'id': 201 },
            { 'name': 'Diane S. Clark', 'id': 202 },
            { 'name': 'DiAnna Thimjon', 'id': 203 },
            { 'name': 'Dirk Haarhoff', 'id': 204 },
            { 'name': 'Doris Hammond', 'id': 205 },
            { 'name': 'Doris LaBarca', 'id': 206 },
            { 'name': 'Dorothy Williams', 'id': 207 },
            { 'name': 'Douglas Collodel', 'id': 208 },
            { 'name': 'Douglas MacPhail', 'id': 209 },
            { 'name': 'DTI Dallas Office', 'id': 210 },
            { 'name': 'Duncan Strachan', 'id': 211 },
            { 'name': 'Earl Hagstrom', 'id': 212 },
            { 'name': 'Eddie Pulido', 'id': 213 },
            { 'name': 'Edward Smerdon', 'id': 214 },
            { 'name': 'Edward Stumpp', 'id': 215 },
            { 'name': 'Eileen McKillop', 'id': 216 },
            { 'name': 'Eileen San Diego', 'id': 217 },
            { 'name': 'Ekaterina Levy', 'id': 218 },
            { 'name': 'Eliza Rodrigues', 'id': 219 },
            { 'name': 'Elizabeth Brett', 'id': 220 },
            { 'name': 'Elizabeth Pina', 'id': 221 },
            { 'name': 'Elizabeth Sitcharungsi', 'id': 222 },
            { 'name': 'Elizabeth Stack', 'id': 223 },
            { 'name': 'Elizabeth Trittipo', 'id': 224 },
            { 'name': 'Elizabeth Verano', 'id': 225 },
            { 'name': 'Ellen Beach', 'id': 226 },
            { 'name': 'Elliott Olson', 'id': 227 },
            { 'name': 'Elsa Colon', 'id': 228 },
            { 'name': 'Elsa Cruz', 'id': 229 },
            { 'name': 'Elsa Jimenez', 'id': 230 },
            { 'name': 'Emily Pattison', 'id': 231 },
            { 'name': 'Emily Weissenberger', 'id': 232 },
            { 'name': 'Emmett Carey', 'id': 233 },
            { 'name': 'Eric Danoff', 'id': 234 },
            { 'name': 'Eric Scheiner', 'id': 235 },
            { 'name': 'Erica Lewis', 'id': 237 },
            { 'name': 'Erica Smith', 'id': 238 },
            { 'name': 'Erin Dardis', 'id': 239 },
            { 'name': 'Erin Fraser', 'id': 240 },
            { 'name': 'Erin Lehnherr', 'id': 241 },
            { 'name': 'Eryk Gettell', 'id': 242 },
            { 'name': 'Eugene Brown Jr.', 'id': 243 },
            { 'name': 'Eugene Elsbree', 'id': 244 },
            { 'name': 'Evelyn De Jesus', 'id': 245 },
            { 'name': 'Frank Gaddy', 'id': 247 },
            { 'name': 'Fred Smith', 'id': 248 },
            { 'name': 'Frederick Baker', 'id': 249 },
            { 'name': 'Gary Sheppard', 'id': 250 },
            { 'name': 'George Frank', 'id': 251 },
            { 'name': 'George McCall', 'id': 252 },
            { 'name': 'Gerald Duffy', 'id': 253 },
            { 'name': 'Gilbert Lee', 'id': 254 },
            { 'name': 'Gina Araya', 'id': 255 },
            { 'name': 'Ginger Dicke', 'id': 256 },
            { 'name': 'Glenn Nevils', 'id': 257 },
            { 'name': 'Gloria Zwibel', 'id': 258 },
            { 'name': 'Gregg Dulik', 'id': 259 },
            { 'name': 'Gregory Halliday', 'id': 260 },
            { 'name': 'Gregory Lahr', 'id': 261 },
            { 'name': 'Gregory Read', 'id': 262 },
            { 'name': 'Guy Cabral', 'id': 264 },
            { 'name': 'Hall Marston', 'id': 265 },
            { 'name': 'Heather Davis', 'id': 266 },
            { 'name': 'Heather Hartkopp', 'id': 267 },
            { 'name': 'Heather Zacharia', 'id': 268 },
            { 'name': 'Hedwig Bachler', 'id': 269 },
            { 'name': 'Hilary Rowen', 'id': 270 },
            { 'name': 'Hollie McDaniel', 'id': 271 },
            { 'name': 'Holly Tamisiea', 'id': 272 },
            { 'name': 'Ileana Castellon', 'id': 273 },
            { 'name': 'Ivan Terranova', 'id': 274 },
            { 'name': 'Jaime Vallejo', 'id': 275 },
            { 'name': 'James Baffa', 'id': 276 },
            { 'name': 'James Brown', 'id': 277 },
            { 'name': 'James Cagney', 'id': 278 },
            { 'name': 'James Fang', 'id': 280 },
            { 'name': 'James Gault', 'id': 281 },
            { 'name': 'James Keale', 'id': 282 },
            { 'name': 'James Kopacka', 'id': 283 },
            { 'name': 'James Kuhne', 'id': 284 },
            { 'name': 'James Marissen', 'id': 285 },
            { 'name': 'James Mink', 'id': 286 },
            { 'name': 'James Tamulski', 'id': 290 },
            { 'name': 'James Wangelin', 'id': 291 },
            { 'name': 'James J.S. Holmes', 'id': 292 },
            { 'name': 'James M. Steere', 'id': 293 },
            { 'name': 'Janet Proudfoot', 'id': 295 },
            { 'name': 'Janezza Febrero', 'id': 296 },
            { 'name': 'Jara Stewart', 'id': 297 },
            { 'name': 'Jared Victoria', 'id': 298 },
            { 'name': 'Jason Chorley', 'id': 299 },
            { 'name': 'Jason Vento', 'id': 300 },
            { 'name': 'Javier Hernandez', 'id': 301 },
            { 'name': 'Jean Ann Underwood', 'id': 302 },
            { 'name': 'Jeannine C. Jacobson', 'id': 303 },
            { 'name': 'Jeff Hudgens', 'id': 304 },
            { 'name': 'Jeffrey Bake', 'id': 305 },
            { 'name': 'Jeffrey Castillo', 'id': 306 },
            { 'name': 'Jemma Dunn', 'id': 307 },
            { 'name': 'Jenna Nguyen', 'id': 308 },
            { 'name': 'Jenni Katzer', 'id': 309 },
            { 'name': 'Jennifer Broda', 'id': 310 },
            { 'name': 'Jennifer Greenaway', 'id': 311 },
            { 'name': 'Jennifer Moulder', 'id': 312 },
            { 'name': 'Jennifer Teran', 'id': 313 },
            { 'name': 'Jennifer Walker O\'Sullivan', 'id': 314 },
            { 'name': 'Jerald Prater', 'id': 315 },
            { 'name': 'Jini Anderson', 'id': 316 },
            { 'name': 'JoAnn Dalrymple', 'id': 317 },
            { 'name': 'Joanne Heffron Jones', 'id': 318 },
            { 'name': 'JoAnne Tracey', 'id': 319 },
            { 'name': 'Joel Kane', 'id': 320 },
            { 'name': 'John Blancett', 'id': 322 },
            { 'name': 'John Gherini', 'id': 323 },
            { 'name': 'John McGinty', 'id': 324 },
            { 'name': 'John Stephens', 'id': 325 },
            { 'name': 'Johnny Wong', 'id': 326 },
            { 'name': 'Jon Arneson', 'id': 327 },
            { 'name': 'Jonathan Geremia', 'id': 328 },
            { 'name': 'Jonathan Hayes', 'id': 329 },
            { 'name': 'Jonathan Rodriguez', 'id': 330 },
            { 'name': 'Joneis Phan', 'id': 331 },
            { 'name': 'Jordan Rothman', 'id': 332 },
            { 'name': 'Joseph Cardenas', 'id': 333 },
            { 'name': 'Joseph Falgiani', 'id': 334 },
            { 'name': 'Joseph Fanning', 'id': 335 },
            { 'name': 'Joseph Larsen', 'id': 336 },
            { 'name': 'Joseph Pastino', 'id': 337 },
            { 'name': 'Joseph Powers', 'id': 338 },
            { 'name': 'Joshua Clark', 'id': 340 },
            { 'name': 'Joshua Lance', 'id': 341 },
            { 'name': 'Jovana Vujovic', 'id': 342 },
            { 'name': 'Juan Torres', 'id': 343 },
            { 'name': 'Jude Hickland', 'id': 344 },
            { 'name': 'Judith Hendrickson', 'id': 345 },
            { 'name': 'June Hughes', 'id': 346 },
            { 'name': 'Justin Levy', 'id': 347 },
            { 'name': 'Kanika Corley', 'id': 348 },
            { 'name': 'Kara DiBiasio', 'id': 349 },
            { 'name': 'Karen Griffith', 'id': 350 },
            { 'name': 'Karen Maupin', 'id': 351 },
            { 'name': 'Karen Morrish', 'id': 352 },
            { 'name': 'Karen Nellor', 'id': 353 },
            { 'name': 'Karen Snead', 'id': 354 },
            { 'name': 'Karen Stewart', 'id': 355 },
            { 'name': 'Karolina Dilaveri', 'id': 357 },
            { 'name': 'Katelin O\'Rourke Gorman', 'id': 358 },
            { 'name': 'Katharine Essick', 'id': 359 },
            { 'name': 'Kathleen Whang', 'id': 360 },
            { 'name': 'Kathryn Richter', 'id': 361 },
            { 'name': 'Kathy Kubat', 'id': 362 },
            { 'name': 'Kathy Noga', 'id': 363 },
            { 'name': 'Kathy Rollins', 'id': 364 },
            { 'name': 'Kayleigh Stout', 'id': 365 },
            { 'name': 'Kecia Barrett-Callahan', 'id': 366 },
            { 'name': 'Kelly Belnick', 'id': 368 },
            { 'name': 'Kelly Green', 'id': 369 },
            { 'name': 'Kelly Olson', 'id': 370 },
            { 'name': 'Kendra Canape', 'id': 371 },
            { 'name': 'Kenneth Jones', 'id': 372 },
            { 'name': 'Keri Wood', 'id': 373 },
            { 'name': 'Kevin Dunne', 'id': 374 },
            { 'name': 'Kevin Gilliland', 'id': 375 },
            { 'name': 'Kevin Lashley', 'id': 376 },
            { 'name': 'Khadir Phar', 'id': 377 },
            { 'name': 'Kim Christenson', 'id': 378 },
            { 'name': 'Kim Hendrix', 'id': 379 },
            { 'name': 'Kim Wlodarczak', 'id': 380 },
            { 'name': 'Kimberly Campbell', 'id': 381 },
            { 'name': 'Kimberly Cook', 'id': 382 },
            { 'name': 'Kimberly Forrester', 'id': 383 },
            { 'name': 'Kimberly Rice', 'id': 384 },
            { 'name': 'Kimberly Steele', 'id': 385 },
            { 'name': 'Kinnier Lastimosa', 'id': 386 },
            { 'name': 'Kirk Jenkins', 'id': 387 },
            { 'name': 'Krista Gutierrez', 'id': 389 },
            { 'name': 'Kristen Gutierrez', 'id': 390 },
            { 'name': 'Kristen Johnson', 'id': 391 },
            { 'name': 'Kristie Wyble', 'id': 392 },
            { 'name': 'LA Office Services', 'id': 393 },
            { 'name': 'Ladd Cogan', 'id': 394 },
            { 'name': 'Laura Flood', 'id': 396 },
            { 'name': 'Laura Goodman', 'id': 397 },
            { 'name': 'Laura Stephan', 'id': 398 },
            { 'name': 'Laura Lee Prather', 'id': 399 },
            { 'name': 'Laurie Kamaiko', 'id': 400 },
            { 'name': 'Lavella Garner', 'id': 401 },
            { 'name': 'Lawrence Klein', 'id': 402 },
            { 'name': 'Lenell McCallum', 'id': 403 },
            { 'name': 'Leo Ponseca', 'id': 404 },
            { 'name': 'LeQuita Hodge', 'id': 405 },
            { 'name': 'Lesa Lewis', 'id': 406 },
            { 'name': 'Letisha Parker-Arroyo', 'id': 407 },
            { 'name': 'Levon Sanossian', 'id': 409 },
            { 'name': 'Lillian Stenfeldt', 'id': 411 },
            { 'name': 'Linda Corbett', 'id': 412 },
            { 'name': 'Linda Ehrhart', 'id': 413 },
            { 'name': 'Linda Robinson', 'id': 414 },
            { 'name': 'Linda Scavo', 'id': 415 },
            { 'name': 'Linda Sturtevant', 'id': 416 },
            { 'name': 'Lisa Caplan', 'id': 417 },
            { 'name': 'Lisa Carroll', 'id': 418 },
            { 'name': 'Lisa Goldberg', 'id': 419 },
            { 'name': 'Lisa Henderson', 'id': 420 },
            { 'name': 'Lisa Ramirez', 'id': 421 },
            { 'name': 'Liz Hagerman', 'id': 424 },
            { 'name': 'Liz Ruelas', 'id': 425 },
            { 'name': 'Lois Johnson', 'id': 426 },
            { 'name': 'Lori Chapin', 'id': 427 },
            { 'name': 'Lori Gong', 'id': 428 },
            { 'name': 'Lorna Moore', 'id': 429 },
            { 'name': 'Lorraine Gallo', 'id': 430 },
            { 'name': 'Lucy Dyson', 'id': 431 },
            { 'name': 'Lucy Spencer', 'id': 432 },
            { 'name': 'Luisa Pineda', 'id': 433 },
            { 'name': 'Lynn Curry', 'id': 434 },
            { 'name': 'Magaly Burgos', 'id': 435 },
            { 'name': 'Maggie Watkins', 'id': 436 },
            { 'name': 'Mahsa Soheil', 'id': 437 },
            { 'name': 'Mara Hsiung', 'id': 438 },
            { 'name': 'Marc Haas', 'id': 439 },
            { 'name': 'Marc Koonin', 'id': 440 },
            { 'name': 'Marcos Cancio', 'id': 441 },
            { 'name': 'Margaret Arenas', 'id': 442 },
            { 'name': 'Margaret Holm', 'id': 443 },
            { 'name': 'Margaret Morasca', 'id': 444 },
            { 'name': 'Margaret M. Masters', 'id': 445 },
            { 'name': 'Maria Giardina', 'id': 446 },
            { 'name': 'Maria Jardeleza', 'id': 447 },
            { 'name': 'Maria Karos', 'id': 448 },
            { 'name': 'Maria Tiegen', 'id': 449 },
            { 'name': 'Marian Tighe-Krushinsky', 'id': 450 },
            { 'name': 'Maricel Renigen', 'id': 451 },
            { 'name': 'Marilyn Klinger', 'id': 452 },
            { 'name': 'Marina Freyre', 'id': 453 },
            { 'name': 'Mario Horwitz', 'id': 455 },
            { 'name': 'Mario Marcelle', 'id': 456 },
            { 'name': 'Mario Reyes', 'id': 457 },
            { 'name': 'Marion Tate', 'id': 458 },
            { 'name': 'Mark Anderson', 'id': 459 },
            { 'name': 'Mark Chudleigh', 'id': 460 },
            { 'name': 'Mark Hudson', 'id': 462 },
            { 'name': 'Mark Kendall', 'id': 463 },
            { 'name': 'Mark Killingsworth', 'id': 464 },
            { 'name': 'Mark Miller', 'id': 465 },
            { 'name': 'Mark Mitobe', 'id': 466 },
            { 'name': 'Mark Nordike', 'id': 467 },
            { 'name': 'Mark Schlemmer', 'id': 468 },
            { 'name': 'Mark Smylie', 'id': 469 },
            { 'name': 'Mark Wasef', 'id': 471 },
            { 'name': 'Marlene Adelman', 'id': 472 },
            { 'name': 'Marta Correa', 'id': 473 },
            { 'name': 'Martin Healy', 'id': 475 },
            { 'name': 'Martin O\'Leary', 'id': 476 },
            { 'name': 'Mary Buckley', 'id': 478 },
            { 'name': 'Mary Melle', 'id': 479 },
            { 'name': 'Mary Jo Stringer', 'id': 480 },
            { 'name': 'Maryam Meseha', 'id': 481 },
            { 'name': 'Matt Knoth', 'id': 482 },
            { 'name': 'Matthew Ferguson', 'id': 483 },
            { 'name': 'Matthew Mazzola', 'id': 485 },
            { 'name': 'Mayra Montalvo', 'id': 487 },
            { 'name': 'Meegan Brooks', 'id': 488 },
            { 'name': 'Meg Daday', 'id': 489 },
            { 'name': 'Megan Molinaro', 'id': 490 },
            { 'name': 'Melanie Gigliotti', 'id': 491 },
            { 'name': 'Melinda Axel', 'id': 492 },
            { 'name': 'Melissa Olive', 'id': 493 },
            { 'name': 'Melodi Johnson', 'id': 494 },
            { 'name': 'Meredith Philipp', 'id': 495 },
            { 'name': 'Michael Bernick', 'id': 496 },
            { 'name': 'Michael Bernstein', 'id': 497 },
            { 'name': 'Michael Healy', 'id': 498 },
            { 'name': 'Michael McKenzie', 'id': 500 },
            { 'name': 'Michael Ruiz', 'id': 501 },
            { 'name': 'Michael Sabino', 'id': 502 },
            { 'name': 'Michael Satz', 'id': 503 },
            { 'name': 'Michael Tanenbaum', 'id': 504 },
            { 'name': 'Michael Topp', 'id': 505 },
            { 'name': 'Michael Yim', 'id': 507 },
            { 'name': 'Michael "Angelo" McCabe', 'id': 508 },
            { 'name': 'Michael L. Fox', 'id': 509 },
            { 'name': 'Michele Blay', 'id': 510 },
            { 'name': 'Michelle Allred', 'id': 511 },
            { 'name': 'Michelle Hood', 'id': 512 },
            { 'name': 'Michelle Watson', 'id': 513 },
            { 'name': 'Mike Dispensa', 'id': 514 },
            { 'name': 'Mike Pipkin', 'id': 515 },
            { 'name': 'Mirali Vazirinejad', 'id': 517 },
            { 'name': 'Moises Melendez', 'id': 518 },
            { 'name': 'Monica Mondragon', 'id': 519 },
            { 'name': 'Nancy Zlateff', 'id': 521 },
            { 'name': 'Naomi Vary', 'id': 522 },
            { 'name': 'Natasha Fisher', 'id': 523 },
            { 'name': 'Nathan Jones', 'id': 524 },
            { 'name': 'Nathan Stewart', 'id': 525 },
            { 'name': 'Nathaniel Mina', 'id': 526 },
            { 'name': 'Neil Ramos', 'id': 527 },
            { 'name': 'Neil Thomson', 'id': 528 },
            { 'name': 'Nicholas Heldt', 'id': 531 },
            { 'name': 'Nicholas Tucker', 'id': 532 },
            { 'name': 'Nicholas Weiss', 'id': 533 },
            { 'name': 'Nick Corte', 'id': 534 },
            { 'name': 'Nick Miles', 'id': 535 },
            { 'name': 'Nicole Born', 'id': 536 },
            { 'name': 'Nicole Nielson-Pachkofsky', 'id': 537 },
            { 'name': 'Nikki Ihnatiuk', 'id': 538 },
            { 'name': 'Nora Wetzel', 'id': 539 },
            { 'name': 'Norman Hopper', 'id': 540 },
            { 'name': 'Norman Lau', 'id': 541 },
            { 'name': 'Octavia Green', 'id': 543 },
            { 'name': 'Oliver Rebollido', 'id': 546 },
            { 'name': 'Oluoma Kas-Osoka', 'id': 547 },
            { 'name': 'Pam Brogoto', 'id': 548 },
            { 'name': 'Pamela Martin', 'id': 549 },
            { 'name': 'Parisa Nikamalfard', 'id': 550 },
            { 'name': 'Patricia Daza-Luu', 'id': 551 },
            { 'name': 'Patricia Williamson', 'id': 552 },
            { 'name': 'Patrick Kenney, Jr.', 'id': 553 },
            { 'name': 'Patti Hosford', 'id': 554 },
            { 'name': 'Paul Davidson', 'id': 555 },
            { 'name': 'Paul Garverick', 'id': 556 },
            { 'name': 'Paul Lahaderne', 'id': 557 },
            { 'name': 'Paulina Borges', 'id': 560 },
            { 'name': 'Peter Fabiankovic', 'id': 562 },
            { 'name': 'Peter Horst', 'id': 563 },
            { 'name': 'Phillip Jackson', 'id': 565 },
            { 'name': 'Phyllis Flynn', 'id': 566 },
            { 'name': 'Rachel Burd', 'id': 567 },
            { 'name': 'Rachel Reynolds', 'id': 568 },
            { 'name': 'Rachel Weitzman', 'id': 569 },
            { 'name': 'Ralph Campillo', 'id': 570 },
            { 'name': 'Ralph Feliciano', 'id': 571 },
            { 'name': 'Ralph Guirgis', 'id': 572 },
            { 'name': 'Ramón Abadin', 'id': 573 },
            { 'name': 'Ramona Dorsey-Wade', 'id': 574 },
            { 'name': 'Randall Block', 'id': 575 },
            { 'name': 'Randall Wilson', 'id': 576 },
            { 'name': 'Randy Mangubat', 'id': 577 },
            { 'name': 'Raquel Navarroza', 'id': 578 },
            { 'name': 'Raquel Negron', 'id': 579 },
            { 'name': 'Raul Garcia', 'id': 580 },
            { 'name': 'Raygine Francois', 'id': 581 },
            { 'name': 'Raymond Friede', 'id': 582 },
            { 'name': 'Rebecca Baumgartner', 'id': 583 },
            { 'name': 'Rebecca Hull', 'id': 584 },
            { 'name': 'Reena Khetani', 'id': 585 },
            { 'name': 'Renga Thiagarajah', 'id': 586 },
            { 'name': 'Rhamie Glade', 'id': 587 },
            { 'name': 'Rhonda Gillis', 'id': 588 },
            { 'name': 'Ricardo Small', 'id': 589 },
            { 'name': 'Richard Booth', 'id': 590 },
            { 'name': 'Richard Geddes', 'id': 591 },
            { 'name': 'Robert Bohner', 'id': 593 },
            { 'name': 'Robert Budelman', 'id': 594 },
            { 'name': 'Robert Cain', 'id': 595 },
            { 'name': 'Robert Eassa', 'id': 596 },
            { 'name': 'Robert Gebhard', 'id': 597 },
            { 'name': 'Robert Helfing', 'id': 598 },
            { 'name': 'Robert Kum', 'id': 599 },
            { 'name': 'Robert Towey', 'id': 600 },
            { 'name': 'Robert Willis', 'id': 602 },
            { 'name': 'Robert Zermeno, Jr.', 'id': 603 },
            { 'name': 'Roberta J. Benson', 'id': 604 },
            { 'name': 'Roger Gonzalez', 'id': 606 },
            { 'name': 'Roger Sleight', 'id': 607 },
            { 'name': 'Ron Gersten', 'id': 608 },
            { 'name': 'Rosaisela Zarate', 'id': 609 },
            { 'name': 'Rose DeLeon Carter', 'id': 610 },
            { 'name': 'Rosemary Pereda', 'id': 611 },
            { 'name': 'Roussy Brizuela', 'id': 612 },
            { 'name': 'Ryan Arroyo', 'id': 614 },
            { 'name': 'Ryan Harrison', 'id': 616 },
            { 'name': 'Ryan McCord', 'id': 617 },
            { 'name': 'Ryan Ortuno', 'id': 618 },
            { 'name': 'Ryan Taylor', 'id': 619 },
            { 'name': 'Ryan G. Kercher', 'id': 620 },
            { 'name': 'Rynicia Wilson', 'id': 621 },
            { 'name': 'Sabrina Smith', 'id': 622 },
            { 'name': 'Sakina Murray', 'id': 623 },
            { 'name': 'Salvatore Lento', 'id': 624 },
            { 'name': 'Sandra Johnson', 'id': 625 },
            { 'name': 'Sandra Ozuna', 'id': 626 },
            { 'name': 'Sara Inman', 'id': 627 },
            { 'name': 'Sara Robison', 'id': 628 },
            { 'name': 'Sarah Bramlett', 'id': 629 },
            { 'name': 'Sarah Gover', 'id': 630 },
            { 'name': 'Sarah Hennessy', 'id': 631 },
            { 'name': 'Sarah Owens', 'id': 632 },
            { 'name': 'Sarah Rixson', 'id': 633 },
            { 'name': 'Sarah Sepe', 'id': 634 },
            { 'name': 'Savanna Darby', 'id': 635 },
            { 'name': 'Scott Downes', 'id': 636 },
            { 'name': 'Scott Gronseth', 'id': 637 },
            { 'name': 'Scott Mroz', 'id': 638 },
            { 'name': 'Sean Patterson', 'id': 639 },
            { 'name': 'Sean Rawls', 'id': 640 },
            { 'name': 'Sean Simpson', 'id': 641 },
            { 'name': 'Server SF-INTRANET-T1', 'id': 642 },
            { 'name': 'Server SF-MONITOR-01', 'id': 643 },
            { 'name': 'Seth McCauley', 'id': 644 },
            { 'name': 'SF Copy Center', 'id': 645 },
            { 'name': 'SF Mail Room', 'id': 646 },
            { 'name': 'Shane Wesley', 'id': 647 },
            { 'name': 'Sharon O\'Connell', 'id': 648 },
            { 'name': 'Sharon Reinhart', 'id': 649 },
            { 'name': 'Sharra McIntosh', 'id': 650 },
            { 'name': 'Shaudee Navid', 'id': 651 },
            { 'name': 'Shaun Bean', 'id': 652 },
            { 'name': 'Shawn Martin', 'id': 653 },
            { 'name': 'Shawna Harkins', 'id': 654 },
            { 'name': 'Shayla Taulbee', 'id': 655 },
            { 'name': 'Sheila Howell', 'id': 656 },
            { 'name': 'Sheila Searcy', 'id': 657 },
            { 'name': 'Shelby Reams', 'id': 658 },
            { 'name': 'Sheryl Rosenberg', 'id': 659 },
            { 'name': 'Shweta Maheshwari', 'id': 660 },
            { 'name': 'Sidney Dowell', 'id': 661 },
            { 'name': 'Silvia Alioto', 'id': 662 },
            { 'name': 'Sindy Fleeger', 'id': 663 },
            { 'name': 'Sondra Sylva', 'id': 664 },
            { 'name': 'Sonja Di Mondi', 'id': 665 },
            { 'name': 'Soo Kim', 'id': 666 },
            { 'name': 'Stacey Phillips', 'id': 667 },
            { 'name': 'Stephanie DeClue', 'id': 668 },
            { 'name': 'Stephanie Manjarrez', 'id': 669 },
            { 'name': 'Stephanie Moynihan', 'id': 670 },
            { 'name': 'Stephanie Perkins', 'id': 671 },
            { 'name': 'Stephanie Sheridan', 'id': 672 },
            { 'name': 'Stephanie Stephens', 'id': 673 },
            { 'name': 'Stephen Green', 'id': 674 },
            { 'name': 'Stephen Jones', 'id': 675 },
            { 'name': 'Stephen Shaw', 'id': 676 },
            { 'name': 'Steve Burke', 'id': 677 },
            { 'name': 'Steven Di Saia', 'id': 678 },
            { 'name': 'Steven Roland', 'id': 679 },
            { 'name': 'Steven Wasserman', 'id': 680 },
            { 'name': 'Sunny Shapiro', 'id': 681 },
            { 'name': 'Susan Forsthoff', 'id': 682 },
            { 'name': 'Susan Sullivan', 'id': 683 },
            { 'name': 'Susan Vargas', 'id': 684 },
            { 'name': 'Susan V. Watson', 'id': 685 },
            { 'name': 'Sushu Wang', 'id': 686 },
            { 'name': 'Suzanne Horn', 'id': 687 },
            { 'name': 'Suzaye Junod', 'id': 688 },
            { 'name': 'T.J. Quick', 'id': 689 },
            { 'name': 'Tahamina Martin', 'id': 690 },
            { 'name': 'Talicia Smith', 'id': 691 },
            { 'name': 'Tanya Garrett', 'id': 692 },
            { 'name': 'Tanya Palmer', 'id': 693 },
            { 'name': 'Tara Clancy', 'id': 694 },
            { 'name': 'Tasha Martin', 'id': 695 },
            { 'name': 'Teresa Walters', 'id': 696 },
            { 'name': 'Thomas Blaber', 'id': 697 },
            { 'name': 'Thomas Jennings', 'id': 698 },
            { 'name': 'Thomas Lord', 'id': 699 },
            { 'name': 'Thomas McGinty', 'id': 700 },
            { 'name': 'Thomas Orofino', 'id': 701 },
            { 'name': 'Thomas Robertson', 'id': 702 },
            { 'name': 'Tiffany Alexander', 'id': 703 },
            { 'name': 'Tiffany Gaines', 'id': 704 },
            { 'name': 'Tiffiney Rogers', 'id': 705 },
            { 'name': 'Tim Lozensky', 'id': 706 },
            { 'name': 'Timothy Freeman', 'id': 707 },
            { 'name': 'Timothy Kevane', 'id': 708 },
            { 'name': 'Tina Sanders', 'id': 709 },
            { 'name': 'Tom Everitt', 'id': 710 },
            { 'name': 'Tomasz Grodzki', 'id': 711 },
            { 'name': 'Tony Antico', 'id': 712 },
            { 'name': 'Traci Ribeiro', 'id': 714 },
            { 'name': 'Traci Wright', 'id': 715 },
            { 'name': 'Travis Goodsell', 'id': 716 },
            { 'name': 'Travis Martinez', 'id': 717 },
            { 'name': 'Trish Stevens-Marwedel', 'id': 718 },
            { 'name': 'Tristan Hall', 'id': 719 },
            { 'name': 'Troy McMahan', 'id': 720 },
            { 'name': 'Valerie Acevedo-Luna', 'id': 721 },
            { 'name': 'Valerie Hosek', 'id': 722 },
            { 'name': 'Valerie Shea', 'id': 723 },
            { 'name': 'Vance Wittie', 'id': 724 },
            { 'name': 'Veena Mitchell', 'id': 725 },
            { 'name': 'Veronica Goodwin', 'id': 726 },
            { 'name': 'Veronica Zavala', 'id': 727 },
            { 'name': 'Vicki Bailey', 'id': 728 },
            { 'name': 'Victor Pellicia', 'id': 729 },
            { 'name': 'Victoria Brown', 'id': 730 },
            { 'name': 'Vincent Page', 'id': 732 },
            { 'name': 'Virus Notification', 'id': 733 },
            { 'name': 'Virus Notifications', 'id': 734 },
            { 'name': 'Vivian Borroto', 'id': 735 },
            { 'name': 'Vivian Louden', 'id': 736 },
            { 'name': 'W. Bruce Wold', 'id': 737 },
            { 'name': 'W. Neil Rambin', 'id': 738 },
            { 'name': 'Walter Owens', 'id': 739 },
            { 'name': 'Wanda Adams', 'id': 740 },
            { 'name': 'Warren Krauss', 'id': 741 },
            { 'name': 'Wayne Wolff', 'id': 742 },
            { 'name': 'Wayne B. Mason', 'id': 743 },
            { 'name': 'Wendi Pearce', 'id': 744 },
            { 'name': 'William Brennan', 'id': 745 },
            { 'name': 'William Judge', 'id': 746 },
            { 'name': 'William Liu', 'id': 747 },
            { 'name': 'William Miedel', 'id': 748 },
            { 'name': 'Yenisey Gonzalez', 'id': 749 },
            { 'name': 'Yogen Joshi', 'id': 750 }
        ];
    };
    TicketAdd.prototype.typecodesSelector = function (state) {
        if (state.typecodesStoreData) {
            return {
                categoryTypes: state.typecodesStoreData.categories,
                priorityTypes: state.typecodesStoreData.priorities,
                originTypes: state.typecodesStoreData.origins,
                causeTypes: state.typecodesStoreData.causes,
                statusTypes: state.typecodesStoreData.statuses,
                subcategoryTypes: state.typecodesStoreData.subcategories
            };
        }
    };
    TicketAdd.prototype.postTicket = function (newTicket) {
        console.log("newTicket=", newTicket);
        this.addTicket.next(newTicket);
        this.store.dispatch(this.ticketActions.addTicket(newTicket));
        this.newTicket = {
            summary: "",
            requesterId: null,
            ownerId: null,
            causeId: 3,
            statusId: 1,
            priorityId: 3,
            originId: null,
            categoryId: null,
            subcategoryId: null,
            isConfidential: false
        };
    };
    return TicketAdd;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], TicketAdd.prototype, "typecodes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Z" /* Output */])(),
    __metadata("design:type", Object)
], TicketAdd.prototype, "newTicket", void 0);
TicketAdd = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["X" /* Component */])({
        selector: 'ticket-add',
        template: __webpack_require__(955)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_core_typecodes_typecodes_service__["a" /* TypecodesService */],
        __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_actions__["a" /* TypecodesActions */],
        __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__["a" /* TicketActions */],
        __WEBPACK_IMPORTED_MODULE_4__ngrx_store__["c" /* Store */]])
], TicketAdd);



/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketComments; });

var TicketComments = (function () {
    function TicketComments() {
        this.postComment = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* EventEmitter */]();
    }
    TicketComments.prototype.ngOnInit = function () {
        // this.comments = [
        //     { userName: 'Tina Sanders',
        //         createdDateTime: 'February 22, 2014 at 01:59 PM', 
        //         comment: 'comment for the comments'},
        //        { userName: 'John Doe',
        //         createdDateTime: 'March 14, 2017 at 10:22 PM', 
        //         comment: 'another comment for the comments'}
        //         ];
    };
    TicketComments.prototype.postCommentInternally = function (newComment) {
        var comment = {
            UserName: "user 1",
            //createdDateTime: moment().format('MM/DD/YY'),
            Comment: newComment,
            IsVisible: false
        };
        this.postComment.next(comment);
        this.newComment = "";
    };
    TicketComments.prototype.postCommentAll = function (newComment) {
        var comment = {
            UserName: "user 1",
            //createdDateTime: moment().format('MM/DD/YY'),
            Comment: newComment,
            IsVisible: true
        };
        this.postComment.next(comment);
        this.newComment = "";
    };
    return TicketComments;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", Array)
], TicketComments.prototype, "comments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Output */])(),
    __metadata("design:type", Object)
], TicketComments.prototype, "postComment", void 0);
TicketComments = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'ticket-comments',
        template: __webpack_require__(956)
    })
], TicketComments);



/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ticket_service__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketDetail; });


var TicketDetail = (function () {
    function TicketDetail(ticketService) {
        this.ticketService = ticketService;
    }
    TicketDetail.prototype.ngOnInit = function () {
        // this.typecodeService.getTypecodes()
        // .map(x => this.test = x)
        // .subscribe(value => console.log(value));
        //console.log(this.test);
        // this.statusTypes = this.getStatusTypeList();
        // console.log(this.statusTypes);
    };
    // getStatusTypeList(){
    //   return types.statusType;
    // }
    TicketDetail.prototype.save = function () {
        this.ticketService.putTicket(this.ticket).subscribe();
        this.submitted = true;
        console.log(this.ticket);
        alert('Ticket was updated!');
    };
    return TicketDetail;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], TicketDetail.prototype, "ticket", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], TicketDetail.prototype, "typecodes", void 0);
TicketDetail = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["X" /* Component */])({
        selector: 'ticket-detail',
        template: __webpack_require__(957)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ticket_service__["a" /* TicketService */]])
], TicketDetail);



/***/ }),

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketProgress; });

var TicketProgress = (function () {
    function TicketProgress() {
    }
    return TicketProgress;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], TicketProgress.prototype, "ticket", void 0);
TicketProgress = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'ticket-progress',
        template: __webpack_require__(958),
        styles: [__webpack_require__(946)]
    })
], TicketProgress);



/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketRequester; });

var TicketRequester = (function () {
    function TicketRequester() {
    }
    TicketRequester.prototype.ngOnInit = function () {
        var test = this.requester.firstName;
        // this.requester = {
        //     firstName: 'Tina',
        //     lastName: 'Sanders',
        //     email: 'tina.sanders@sedgwicklaw.com',
        //     phone: '111.111.1111',
        //     location: 'Kansas City'
        // };
    };
    return TicketRequester;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(),
    __metadata("design:type", Object)
], TicketRequester.prototype, "requester", void 0);
TicketRequester = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'ticket-requester',
        template: __webpack_require__(959),
        styles: [__webpack_require__(947)]
    })
], TicketRequester);



/***/ }),

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ticket_service__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_effects__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ticket_actions__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketEffects; });





var TicketEffects = (function () {
    function TicketEffects(actions$, ticketService, ticketActions) {
        var _this = this;
        this.actions$ = actions$;
        this.ticketService = ticketService;
        this.ticketActions = ticketActions;
        this.getTicket$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__ticket_actions__["a" /* TicketActions */].GET_TICKET_BY_ID)
            .switchMap(function (action) { return _this.ticketService.getTicketDetailById(action.payload); })
            .map(function (ticket) { return _this.ticketActions.getTicket(ticket); });
        this.postComment$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__ticket_actions__["a" /* TicketActions */].POST_COMMENT)
            .switchMap(function (action) { return _this.ticketService.postTicketComment(action.payload); });
        //    .map(comment => this.ticketActions.postComment(comment));
        this.addTicket$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__ticket_actions__["a" /* TicketActions */].ADD_TICKET)
            .switchMap(function (action) { return _this.ticketService.addTicket(action.payload); });
    }
    return TicketEffects;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"])
], TicketEffects.prototype, "getTicket$", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"])
], TicketEffects.prototype, "postComment$", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"])
], TicketEffects.prototype, "addTicket$", void 0);
TicketEffects = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngrx_effects__["c" /* Actions */],
        __WEBPACK_IMPORTED_MODULE_0__ticket_service__["a" /* TicketService */],
        __WEBPACK_IMPORTED_MODULE_3__ticket_actions__["a" /* TicketActions */]])
], TicketEffects);



/***/ }),

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_actions__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ticket; });




var Ticket = (function () {
    function Ticket(store, ticketActions, typecodesActions) {
        this.store = store;
        this.ticketActions = ticketActions;
        this.typecodesActions = typecodesActions;
        this.ticketId = 1;
        this.ticketComments$ = store.select(this.ticketCommentsSelector);
        this.ticketActivity$ = store.select(this.ticketActivitySelector);
        this.ticketRequester$ = store.select(this.ticketRequesterSelector);
        this.ticketDetail$ = store.select(this.ticketDetailSelector);
        this.ticketProgress$ = store.select(this.ticketProgressSelector);
        this.typecodes$ = store.select(this.typecodesSelector);
    }
    Ticket.prototype.ngOnInit = function () {
        this.store.dispatch(this.ticketActions.getTicketById(this.ticketId));
        this.store.dispatch(this.typecodesActions.getAllTypecodes());
    };
    Ticket.prototype.typecodesSelector = function (state) {
        if (state.typecodesStoreData) {
            return {
                categoryTypes: state.typecodesStoreData.categories,
                priorityTypes: state.typecodesStoreData.priorities,
                originTypes: state.typecodesStoreData.origins,
                causeTypes: state.typecodesStoreData.causes,
                statusTypes: state.typecodesStoreData.statuses,
                subcategoryTypes: state.typecodesStoreData.subcategories
            };
        }
    };
    Ticket.prototype.ticketCommentsSelector = function (state) {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketComments;
        }
        return [];
    };
    Ticket.prototype.ticketDetailSelector = function (state) {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketDetail;
        }
        return {};
    };
    Ticket.prototype.ticketActivitySelector = function (state) {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketActivity;
        }
        return [];
    };
    Ticket.prototype.ticketRequesterSelector = function (state) {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketRequester;
        }
        return {};
    };
    Ticket.prototype.ticketProgressSelector = function (state) {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketProgress;
        }
        return {};
    };
    Ticket.prototype.onPostComment = function (newComment) {
        this.store.dispatch(this.ticketActions.postComment({ ticketId: this.ticketId, comment: newComment.Comment, isVisible: newComment.IsVisible }));
    };
    return Ticket;
}());
Ticket = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["X" /* Component */])({
        selector: 'ticket',
        template: __webpack_require__(960)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngrx_store__["c" /* Store */],
        __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__["a" /* TicketActions */], __WEBPACK_IMPORTED_MODULE_0__core_typecodes_typecodes_actions__["a" /* TypecodesActions */]])
], Ticket);



/***/ }),

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_core_module__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticket_requester_ticket_requester_component__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ticket_service__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ticket_detail_ticket_detail_component__ = __webpack_require__(913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ticket_component__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__layout_tabs_tab_component__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__layout_tabs_tabs_component__ = __webpack_require__(906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ticket_comments_ticket_comments_component__ = __webpack_require__(912);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ticket_activity_ticket_activity_component__ = __webpack_require__(910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngrx_effects__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ticket_store_ticket_effects__ = __webpack_require__(916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ticket_progress_ticket_progress_component_ts__ = __webpack_require__(914);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ticket_add_ticket_add_component__ = __webpack_require__(911);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketsModule", function() { return TicketsModule; });


















var routes = [
    { path: '', redirectTo: 'ticket', pathMatch: 'full' },
    { path: 'ticket', component: __WEBPACK_IMPORTED_MODULE_9__ticket_component__["a" /* Ticket */] },
    { path: 'ticket-detail', component: __WEBPACK_IMPORTED_MODULE_8__ticket_detail_ticket_detail_component__["a" /* TicketDetail */] },
    { path: 'ticket-add', component: __WEBPACK_IMPORTED_MODULE_17__ticket_add_ticket_add_component__["a" /* TicketAdd */] }
];
var TicketsModule = (function () {
    function TicketsModule() {
    }
    return TicketsModule;
}());
TicketsModule.routes = routes;
TicketsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["w" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_0__core_core_module__["a" /* CoreModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_14__ngrx_effects__["a" /* EffectsModule */].run(__WEBPACK_IMPORTED_MODULE_15__ticket_store_ticket_effects__["a" /* TicketEffects */]),
            __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* RouterModule */].forChild(routes)
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_8__ticket_detail_ticket_detail_component__["a" /* TicketDetail */],
            __WEBPACK_IMPORTED_MODULE_9__ticket_component__["a" /* Ticket */],
            __WEBPACK_IMPORTED_MODULE_12__ticket_comments_ticket_comments_component__["a" /* TicketComments */],
            __WEBPACK_IMPORTED_MODULE_13__ticket_activity_ticket_activity_component__["a" /* TicketActivity */],
            __WEBPACK_IMPORTED_MODULE_2__ticket_requester_ticket_requester_component__["a" /* TicketRequester */],
            __WEBPACK_IMPORTED_MODULE_16__ticket_progress_ticket_progress_component_ts__["a" /* TicketProgress */],
            __WEBPACK_IMPORTED_MODULE_17__ticket_add_ticket_add_component__["a" /* TicketAdd */],
            __WEBPACK_IMPORTED_MODULE_10__layout_tabs_tab_component__["a" /* Tab */],
            __WEBPACK_IMPORTED_MODULE_11__layout_tabs_tabs_component__["a" /* Tabs */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__ticket_service__["a" /* TicketService */], __WEBPACK_IMPORTED_MODULE_1__ticket_store_ticket_actions__["a" /* TicketActions */]]
    })
], TicketsModule);



/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects_subscription__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__ = __webpack_require__(840);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EffectsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EffectsModule = EffectsModule_1 = (function () {
    function EffectsModule(effectsSubscription) {
        this.effectsSubscription = effectsSubscription;
    }
    EffectsModule.run = function (type) {
        return {
            ngModule: EffectsModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */],
                type,
                { provide: __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["b" /* effects */], useExisting: type, multi: true }
            ]
        };
    };
    EffectsModule.runAfterBootstrap = function (type) {
        return {
            ngModule: EffectsModule_1,
            providers: [
                type,
                { provide: __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__["a" /* afterBootstrapEffects */], useExisting: type, multi: true }
            ]
        };
    };
    return EffectsModule;
}());
EffectsModule = EffectsModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* NgModule */])({
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* Actions */],
            __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* APP_BOOTSTRAP_LISTENER */],
                multi: true,
                deps: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Injector */], __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */]],
                useFactory: __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__["b" /* runAfterBootstrapEffects */]
            }
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */]])
], EffectsModule);

var EffectsModule_1;
//# sourceMappingURL=effects.module.js.map

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toPayload */
function toPayload(action) {
    return action.payload;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 945:
/***/ (function(module, exports) {

module.exports = "/***********************************/\n/**          NEWS LIST           **/\n/**********************************/\n.news-list {\n  margin-bottom: 0;\n  padding-left: 0; }\n  .news-list li {\n    list-style: none;\n    box-sizing: content-box;\n    border-top: 1px solid #eeeeee;\n    padding: 12px;\n    cursor: pointer;\n    transition: background-color 0.2s ease-out; }\n    .news-list li:hover {\n      background: #f6f6f6; }\n    .news-list li:last-child {\n      margin-bottom: -10px; }\n  .news-list img,\n  .news-list .icon {\n    float: left;\n    height: 30px;\n    width: 30px; }\n  .news-list .icon {\n    line-height: 30px;\n    border-radius: 50%;\n    text-align: center;\n    font-size: 18px; }\n  .news-list .news-item-info {\n    margin-left: 62px;\n    /*50 + 12px padding*/ }\n  .news-list .name {\n    text-transform: uppercase; }\n    .news-list .name a {\n      text-decoration: none; }\n      .news-list .name a:hover {\n        color: #218BC3; }\n"

/***/ }),

/***/ 946:
/***/ (function(module, exports) {

module.exports = "div.progressUi ul li {\n  display: inline;\n  list-style-type: none;\n  padding: 10px;\n  margin: 10px; }\n"

/***/ }),

/***/ 947:
/***/ (function(module, exports) {

module.exports = ".contacts {\n  display: block;\n  margin-top: 25px;\n  margin-left: -10px;\n  margin-right: -10px;\n  padding-left: 0;\n  text-align: center;\n  position: relative; }\n  .contacts > li {\n    display: inline-block;\n    line-height: 2.2;\n    list-style: none;\n    text-align: left;\n    margin: 0 10px; }\n    @media (min-width: 992px) {\n      .contacts > li {\n        width: 150px;\n        white-space: nowrap; } }\n\n.test {\n  list-style-type: none;\n  margin-top: 25px;\n  margin-left: -10px;\n  margin-right: -10px;\n  padding-left: 0; }\n"

/***/ }),

/***/ 954:
/***/ (function(module, exports) {

module.exports = "<section class=\"widget\">\r\n    <div class=\"widget-body no-padding\">\r\n        <ul *ngFor=\"let act of activity\" class=\"news-list stretchable\">\r\n            <li>\r\n                <span class=\"icon text-white\" [class.bg-danger]=\"act.isComment\" [class.bg-info]=\"act.isAssigned\" [class.bg-success]=\"act.isCreated\">\r\n                                    <i class=\"fa\" [class.fa-comment]=\"act.isComment\" [class.fa-user]=\"act.isAssigned\" [class.fa-pencil-square]=\"act.isCreated\"></i>\r\n                                </span>\r\n                <div class=\"news-item-info\">\r\n                    <h5 class=\"name no-margin mb-xs\"><a href=\"#\">{{act.UserName}}</a></h5>\r\n                    <p class=\"fs-mini\">\r\n                        {{act.Activity}}\r\n                    </p>\r\n                    <time class=\"help-block\">{{act.CreatedDate}}</time>\r\n                </div>\r\n            </li>\r\n            <!--<li>\r\n                <span class=\"icon bg-info text-white\">\r\n                                    <i class=\"fa fa-user\"></i>\r\n                                </span>\r\n                <div class=\"news-item-info\">\r\n                    <h5 class=\"name no-margin mb-xs\"><a href=\"#\">Help Desk assigned to John Doe</a></h5>\r\n                    <p class=\"fs-mini\">\r\n                        Lorem ipsum dolor sit amet\r\n                    </p>\r\n                    <time class=\"help-block\">Sep 25, 11:59</time>\r\n                </div>\r\n            </li>\r\n            <li>\r\n                <span class=\"icon bg-success text-white\">\r\n                                    <i class=\"fa fa-pencil-square\"></i>\r\n                                </span>\r\n                <div class=\"news-item-info\">\r\n                    <h5 class=\"name no-margin mb-xs\"><a href=\"#\">Help Desk created a ticket for Tina Sanders</a></h5>\r\n                    <p class=\"fs-mini\">\r\n                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\n                    </p>\r\n                    <time class=\"help-block\">Mar 20, 18:46</time>\r\n                </div>\r\n            </li>-->\r\n        </ul>\r\n    </div>\r\n</section>"

/***/ }),

/***/ 955:
/***/ (function(module, exports) {

module.exports = "<section class=\"widget\">\r\n    <div class=\"widget-body\">\r\n        <h3>Add New Ticket</h3>\r\n        <form >\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-4\">\r\n\r\n                    <div class=\"form-group\">\r\n\r\n                        <label for=\"requesterSelector\">Requested By</label>\r\n                        \r\n                        <select id=\"requesterSelector\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.requesterId\" name=\"requesterSelector\" [disabled]=false>\r\n                            <option *ngFor=\"let user of users\" [ngValue]=\"user.id\">{{user.name}}</option>\r\n                        </select>\r\n\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"ownerSelector\">Owner</label>                       \r\n                        <select id=\"ownerSelector\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.ownerId\" name=\"ownerSelector\" [disabled]=false>\r\n                            <option *ngFor=\"let user of users\" [ngValue]=\"user.id\">{{user.name}}</option>\r\n                        </select>\r\n\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"origin\" class=\"\">Origin</label>\r\n                        <select id=\"origin\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.originId\" name=\"origin\" [disabled]=false>\r\n                            <option *ngFor=\"let origin of typecodes.originTypes\" [ngValue]=\"origin.Id\">{{origin.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"cause\" class=\"\">Cause</label>\r\n                        <select id=\"cause\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.causeId\" name=\"cause\" [disabled]=false>\r\n                            <option *ngFor=\"let cause of typecodes.causeTypes\" [ngValue]=\"cause.Id\">{{cause.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"status\" class=\"\">Status</label>\r\n                        <select id=\"status\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.statusId\" name=\"status\" [disabled]=false>\r\n                            <option *ngFor=\"let status of typecodes.statusTypes\" [ngValue]=\"status.Id\">{{status.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"priority\" class=\"\">Priority</label>\r\n                        <select id=\"priority\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.priorityId\" name=\"priority\" [disabled]=false>\r\n                            <option *ngFor=\"let priority of typecodes.priorityTypes\" [ngValue]=\"priority.Id\">{{priority.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"category\" class=\"\">Category</label>\r\n                        <select id=\"category\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.categoryId\" name=\"category\" [disabled]=false>\r\n                            <option *ngFor=\"let category of typecodes.categoryTypes\" [ngValue]=\"category.Id\">{{category.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"category\" class=\"\">Subcategory</label>\r\n                        <select id=\"category\" class=\"form-control input-group-sm\" [(ngModel)]=\"newTicket.subcategoryId\" name=\"category\" [disabled]=false>\r\n                            <option *ngFor=\"let subcategory of typecodes.subcategoryTypes\" [ngValue]=\"subcategory.Id\">{{subcategory.Name}}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\">     \r\n                    <div class=\"form-group\">\r\n                        <label for=\"summary\" class=\"\">Summary</label>\r\n                         <textarea class=\"form-control\" id=\"summary\" placeholder=\"Summary of issue...\" rows=\"3\" [(ngModel)]=\"newTicket.summary\" name=\"summary\"></textarea>\r\n\r\n                           \r\n                        <!--<input type=\"text\" class=\"form-control input-group-sm input-no-border\" id=\"category\" [(ngModel)]=\"ticket.category\" name=\"category\">-->\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"confidential\" class=\"\">Confidential?</label>\r\n                        <input type=\"checkbox\" id=\"confidential\" [(ngModel)]=\"newTicket.isConfidential\" name=\"confidential\" >\r\n                        <!--<input type=\"text\" class=\"form-control input-group-sm input-no-border\" id=\"category\" [(ngModel)]=\"ticket.category\" name=\"category\">-->\r\n                    </div>\r\n                    <!--<div class=\"form-group\">\r\n              <label for=\"category\" class=\"\">Category</label>\r\n              \r\n            </div>-->\r\n                </div>\r\n                \r\n\r\n                \r\n            </div>\r\n            <div class=\"form-actions\">\r\n                <div class=\"row\">\r\n                    <div class=\"offset-md-4 col-md-7\">\r\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"postTicket(newTicket)\">Add Ticket</button>\r\n                        <button type=\"button\" class=\"btn btn-inverse\">Cancel</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</section>"

/***/ }),

/***/ 956:
/***/ (function(module, exports) {

module.exports = "<section class=\"widget\" id=\"ticketComments\">\r\n<div class=\"widget-body no-padding\">\r\n    <div class=\"list-group list-group-sm\">\r\n        <div *ngFor=\"let comment of comments\" class=\"list-group-item\"> \r\n        <h6 class=\"event-heading fw-normal\">{{comment.UserName}}</h6>\r\n        <p class=\"text-muted\"><i class=\"bt fa\" [class.fa-lock]=\"!comment.IsVisible\" [class.text-danger]=\"!comment.IsVisible\" [class.fa-group]=\"comment.IsVisible\" [class.text-primary]=\"comment.IsVisible\"></i> {{comment.CreatedDateTime}}</p>\r\n        <p class=\"fs-mini\">\r\n          {{comment.Comment}}\r\n        </p>\r\n        </div>\r\n    </div>\r\n    </div> \r\n    <form class=\"mt-2\">\r\n        <div class=\"form-group\">\r\n        <label class=\"sr-only\" for=\"newComment\">Comment</label>\r\n        <textarea class=\"form-control\" id=\"newComment\" placeholder=\"post comment...\" rows=\"3\" [(ngModel)]=\"newComment\" name=\"newComment\"></textarea>\r\n        </div>\r\n        <div class=\"btn-toolbar\">\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"postCommentAll(newComment)\">Share With Requester</button>\r\n          <button type=\"button\" class=\"btn btn-danger btn-sm pull-right\" (click)=\"postCommentInternally(newComment)\">Post Internally</button>\r\n        </div>\r\n    </form>\r\n</section>"

/***/ }),

/***/ 957:
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"col-xs-12\">-->\r\n<section class=\"widget\">\r\n  <div class=\"widget-body\">\r\n    <h3>Ticket Detail</h3>\r\n    <form (ngSubmit)=\"save()\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n          <div class=\"form-group\">\r\n            <label for=\"priority\" class=\"\">Priority</label>\r\n            <select id=\"priority\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.Priority\" name=\"priority\" [disabled]=false>\r\n        <option *ngFor=\"let priority of typecodes.priorityTypes\" [ngValue]=\"priority.Name\">{{priority.Name}}</option>\r\n      </select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"status\" class=\"\">Status</label>\r\n            <select id=\"status\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.Status\" name=\"status\" [disabled]=false>\r\n        <option *ngFor=\"let status of typecodes.statusTypes\" [ngValue]=\"status.Name\">{{status.Name}}</option>\r\n      </select>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-4\">\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"category\" class=\"\">Category</label>\r\n            <select id=\"category\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.Category\" name=\"category\" [disabled]=false>\r\n              <option *ngIf=\"!ticket.Category\" value=\"null\">Select Option</option>\r\n        <option *ngFor=\"let category of typecodes.categoryTypes\" [ngValue]=\"category.Name\">{{category.Name}}</option>\r\n      </select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"subcategory\" class=\"\">SubCategory</label>\r\n            <select id=\"subcategory\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.SubCategory\" name=\"subcategory\" [disabled]=false>\r\n              <option *ngIf=\"!ticket.SubCategory\" value=\"null\">Select Option</option>\r\n        <option *ngFor=\"let subcategory of typecodes.subcategoryTypes\" [ngValue]=\"subcategory.Name\">{{subcategory.Name}}</option>\r\n      </select>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-4\">\r\n          <!--<div class=\"form-group\">\r\n              <label for=\"source\" class=\"\">Source</label>\r\n              <input type=\"text\" class=\"form-control input-group-sm input-no-border\" id=\"priority\" [(ngModel)]=\"ticket.source\" name=\"source\">\r\n            </div>-->\r\n          <div class=\"form-group\">\r\n            <label for=\"origin\" class=\"\">Origin</label>\r\n            <select id=\"origin\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.Origin\" name=\"origin\" [disabled]=false>\r\n              <option *ngIf=\"!ticket.Origin\" value=\"null\">Select Option</option>\r\n        <option *ngFor=\"let origin of typecodes.originTypes\" [ngValue]=\"origin.Name\">{{origin.Name}}</option>\r\n      </select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"cause\" class=\"\">Cause</label>\r\n            <select id=\"cause\" class=\"form-control input-group-sm\" [(ngModel)]=\"ticket.Cause\" name=\"cause\" [disabled]=false>\r\n              <option *ngIf=\"!ticket.Cause\" value=\"null\">Select Option</option>\r\n        <option *ngFor=\"let cause of typecodes.causeTypes\" [ngValue]=\"cause.Name\">{{cause.Name}}</option>\r\n      </select>\r\n          </div>\r\n          <!--<div class=\"form-group\">\r\n            <label for=\"createdDateTime\" class=\"\">Date Reported</label>\r\n            <input type=\"text\" class=\"form-control input-group-sm input-no-border\" id=\"createdDateTime\" [(ngModel)]=\"ticket.createdDateTime\"\r\n              name=\"createdDateTime\">\r\n          </div>-->\r\n\r\n        </div>\r\n\r\n        <div class=\"col-xs-12\">\r\n          <div class=\"form-group\">\r\n            <label for=\"summary\" class=\"\">Summary</label>\r\n            <input type=\"text\" class=\"form-control input-group-sm input-no-border\" id=\"summary\" [(ngModel)]=\"ticket.Summary\" name=\"summary\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n          <div class=\"offset-md-4 col-md-7\">\r\n            <button type=\"submit\" class=\"btn btn-primary\">Save Changes</button>\r\n            <button type=\"button\" class=\"btn btn-inverse\">Cancel</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</section>\r\n<!--</div>-->"

/***/ }),

/***/ 958:
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"row\">-->\r\n    <div >\r\n        <section class=\"widget\">\r\n            <div class=\"widget-body\">\r\n                <div class=\"progressUi\">\r\n<ul>\r\n    <li>\r\n                <!--<h5 class=\"\">{{ticket.ownerFirstName}} <span class=\"fw-semi-bold\">{{requester.LastName}}</span></h5>-->\r\n                <label>Ticket Owner</label>\r\n                <span class=\"thumb-sm avatar\">\r\n                    <img class=\"rounded-circle\" src=\"assets/img/people/leia_headshot.jpg\" alt=\"...\">\r\n                </span>\r\n          &nbsp;\r\n          Princess <strong>Leia</strong>&nbsp;\r\n    </li>\r\n    <li>\r\n        <label>SLA Expected</label>\r\n        <span>1 day</span>\r\n    </li>\r\n    <li></li>\r\n</ul>\r\n                </div>\r\n            </div>\r\n        </section>\r\n    </div>\r\n<!--</div>-->"

/***/ }),

/***/ 959:
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"row\">-->\r\n    <div >\r\n        <section class=\"widget\">\r\n            <div class=\"widget-body\">\r\n\r\n                <h5 class=\"fw-normal\">{{requester.FirstName}} <span class=\"fw-semi-bold\">{{requester.LastName}}</span></h5>\r\n                <p>UI/UX designer</p>\r\n                <ul class=\"test\">\r\n                    <li><i class=\"fa fa-phone fa-fw mr-xs\"></i>{{requester.Phone}}</li>\r\n                    <li><i class=\"fa fa-envelope fa-fw mr-xs\"></i><a href=\"#\">{{requester.Email}}</a></li>\r\n                    <li><i class=\"fa fa-map-marker fa-fw mr-xs\"></i>{{requester.Location}}</li>\r\n                </ul>\r\n\r\n            </div>\r\n        </section>\r\n    </div>\r\n<!--</div>-->"

/***/ }),

/***/ 960:
/***/ (function(module, exports) {

module.exports = "<!--<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"breadcrumb-item active\">Ticket Detail</li>\r\n</ol>\r\n<h1 class=\"page-title\">Ticket Detail</h1>-->\r\n<div class=\"row\">\r\n  <div class=\"col-md-12\">\r\n    <ticket-progress [ticket]=\"ticketProgress$ | async\"></ticket-progress>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n <div class=\"col-md-6\">\r\n   <tabs>\r\n     <tab tabTitle=\"Comments\"><ticket-comments [comments]=\"ticketComments$ | async\" (postComment)=\"onPostComment($event)\"></ticket-comments></tab>\r\n    <tab tabTitle=\"Activity\"><ticket-activity [activity]=\"ticketActivity$ | async\"></ticket-activity></tab>\r\n   </tabs>\r\n </div>\r\n<div class=\"col-md-6\">\r\n  <tabs>\r\n    <tab tabTitle=\"Requester\"><ticket-requester [requester]=\"ticketRequester$ | async\"></ticket-requester></tab>\r\n    <tab tabTitle=\"Requester Assets\"><section class=\"widget\" widget style=\"min-height: 200px\">coming soon</section></tab>\r\n  </tabs>\r\n  <ticket-detail [ticket]=\"ticketDetail$ | async\" [typecodes]=\"typecodes$ | async\"></ticket-detail>\r\n</div>\r\n</div>"

/***/ })

});
//# sourceMappingURL=4.map