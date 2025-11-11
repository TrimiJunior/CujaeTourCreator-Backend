"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const map_service_1 = require("./map.service");
const constants_1 = require("../common/constants");
const map_dto_1 = require("./dto/map.dto");
let MapController = class MapController {
    constructor(mapService) {
        this.mapService = mapService;
    }
    create(dto) {
        return this.mapService.create(dto);
    }
    findByProject(projectId) {
        return this.mapService.findByProject(projectId);
    }
    findOne(id) {
        return this.mapService.findOne(id);
    }
    update(payload) {
        return this.mapService.update(payload.id, payload.dto);
    }
    delete(id) {
        return this.mapService.delete(id);
    }
    addMarker(payload) {
        return this.mapService.addMarker(payload.mapId, payload.marker);
    }
    updateMarker(payload) {
        return this.mapService.updateMarker(payload.mapId, payload.markerId, payload.marker);
    }
    deleteMarker(payload) {
        return this.mapService.deleteMarker(payload.mapId, payload.markerId);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [map_dto_1.CreateMapDTO]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.FIND_BY_PROJECT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "findByProject", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.FIND_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.ADD_MARKER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "addMarker", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.UPDATE_MARKER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "updateMarker", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.MapMSG.DELETE_MARKER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "deleteMarker", null);
MapController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [map_service_1.MapService])
], MapController);
exports.MapController = MapController;
//# sourceMappingURL=map.controller.js.map