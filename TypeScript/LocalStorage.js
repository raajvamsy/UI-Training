"use strict";
exports.__esModule = true;
exports.LocalStorageMock = void 0;
var LocalStorageMock = /** @class */ (function () {
    function LocalStorageMock() {
        this.store = {};
    }
    LocalStorageMock.prototype.clear = function () {
        this.store = {};
    };
    LocalStorageMock.prototype.getItem = function (key) {
        return this.store[key] || null;
    };
    LocalStorageMock.prototype.setItem = function (key, value) {
        this.store[key] = JSON.stringify(value);
    };
    LocalStorageMock.prototype.removeItem = function (key) {
        delete this.store[key];
    };
    return LocalStorageMock;
}());
exports.LocalStorageMock = LocalStorageMock;
