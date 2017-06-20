webpackJsonpac__name_([0],{

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__(909);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });





var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* Login */], pathMatch: 'full' }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule.routes = routes;
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["w" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* Login */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forChild(routes),
        ]
    })
], LoginModule);



/***/ }),

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginActions; });

var LoginActions = LoginActions_1 = (function () {
    function LoginActions() {
    }
    LoginActions.prototype.loginUser = function () {
        return {
            type: LoginActions_1.LOGIN_USER
        };
    };
    LoginActions.prototype.loginUserSuccess = function (user) {
        return {
            type: LoginActions_1.LOGIN_USER_SUCCESS,
            payload: user
        };
    };
    return LoginActions;
}());
LoginActions.LOGIN_USER = '[USER] Login';
LoginActions.LOGIN_USER_SUCCESS = '[USER] Login Success';
LoginActions = LoginActions_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])()
], LoginActions);

var LoginActions_1;


/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_actions__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });



var Login = (function () {
    function Login(store, loginActions) {
        this.store = store;
        this.loginActions = loginActions;
        this.user$ = store.select(this.userSelector);
    }
    Login.prototype.ngOnInit = function () {
        this.store.dispatch(this.loginActions.loginUser());
    };
    Login.prototype.userSelector = function (state) {
        if (state.loginStoreData) {
            return state.loginStoreData.user;
        }
    };
    return Login;
}());
Login = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'login',
        styles: [__webpack_require__(944)],
        template: __webpack_require__(953),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ViewEncapsulation */].None,
        host: {
            class: 'login-page app'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["c" /* Store */], __WEBPACK_IMPORTED_MODULE_1__login_actions__["a" /* LoginActions */]])
], Login);



/***/ }),

/***/ 944:
/***/ (function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #ddd; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  background-color: #eceeef; }\n  .login-form .form-control:focus {\n    background-color: #ddd; }\n"

/***/ }),

/***/ 953:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-title\">Dashboard <small><small>Sedgwick EICM</small></small></h1>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <section widget class=\"widget\">\n      <header>\n        <h4>\n          Logging in....\n        </h4>\n        <div class=\"widget-controls\">\n          <a data-widgster=\"expand\" title=\"Expand\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\n          <a data-widgster=\"collapse\" title=\"Collapse\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\n        </div>\n      </header>\n      <div class=\"widget-body\">\n      \n        <p class=\"lead\">Please wait while you are being auto logged in.\n        <p class=\"fs-mini\"></p>\n      </div>\n    </section>\n  </div>\n</div>"

/***/ })

});
//# sourceMappingURL=0.map