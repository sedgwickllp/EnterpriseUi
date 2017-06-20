webpackJsonpac__name_([5],{

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dashboard; });

var Dashboard = (function () {
    function Dashboard() {
    }
    return Dashboard;
}());
Dashboard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Component */])({
        selector: 'dashboard',
        template: __webpack_require__(948)
    })
], Dashboard);



/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_component_ts__ = __webpack_require__(898);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout_widget_widget_directive__ = __webpack_require__(907);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });





var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_component_ts__["a" /* Dashboard */], pathMatch: 'full' }
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule.routes = routes;
DashboardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes)],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__dashboard_component_ts__["a" /* Dashboard */], __WEBPACK_IMPORTED_MODULE_4__layout_widget_widget_directive__["a" /* Widget */]]
    })
], DashboardModule);



/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Widget; });

var Widget = (function () {
    function Widget(el) {
        this.$el = jQuery(el.nativeElement);
        jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
        /*
         When widget is closed remove its parent if it is .col-*
         */
        jQuery(document).on('close.widgster', function (e) {
            var $colWrap = jQuery(e.target)
                .closest('.content > .row > [class*="col-"]:not(.widget-container)');
            // remove colWrap only if there are no more widgets inside
            if (!$colWrap.find('.widget').not(e.target).length) {
                $colWrap.remove();
            }
        });
    }
    Widget.prototype.ngOnInit = function () {
        this.$el.widgster();
    };
    return Widget;
}());
Widget = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Directive */])({
        selector: '[widget]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* ElementRef */]])
], Widget);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(60)))

/***/ }),

/***/ 948:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-title\">Dashboard <small><small>Sedgwick EICM</small></small></h1>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-6\">\r\n    <section widget class=\"widget\">\r\n      <header>\r\n        <h4>\r\n          Example <span class=\"fw-semi-bold\">Widget</span>\r\n        </h4>\r\n        <div class=\"widget-controls\">\r\n          <a data-widgster=\"expand\" title=\"Expand\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n          <a data-widgster=\"collapse\" title=\"Collapse\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <img class=\"pull-left mr-sm\" src=\"assets/img/a2.png\" alt=\"Angular 2.0\" width=\"100\">\r\n        <p class=\"lead\">You are looking at a completely new version of Sing App built\r\n          with brand new <strong>Angular <em>2.0</em> Final Release</strong></p>\r\n        <p class=\"fs-mini\">Made by <a href=\"http://flatlogic.com\" target=\"_blank\">Flatlogic</a>.</p>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=5.map