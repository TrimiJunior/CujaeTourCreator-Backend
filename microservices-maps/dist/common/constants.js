"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapMSG = exports.RabbitMQ = void 0;
var RabbitMQ;
(function (RabbitMQ) {
    RabbitMQ["MapQueue"] = "maps";
})(RabbitMQ = exports.RabbitMQ || (exports.RabbitMQ = {}));
var MapMSG;
(function (MapMSG) {
    MapMSG["CREATE"] = "CREATE_MAP";
    MapMSG["FIND_BY_PROJECT"] = "FIND_MAPS_BY_PROJECT";
    MapMSG["FIND_ONE"] = "FIND_MAP";
    MapMSG["UPDATE"] = "UPDATE_MAP";
    MapMSG["DELETE"] = "DELETE_MAP";
    MapMSG["ADD_MARKER"] = "ADD_MARKER";
    MapMSG["UPDATE_MARKER"] = "UPDATE_MARKER";
    MapMSG["DELETE_MARKER"] = "DELETE_MARKER";
})(MapMSG = exports.MapMSG || (exports.MapMSG = {}));
//# sourceMappingURL=constants.js.map