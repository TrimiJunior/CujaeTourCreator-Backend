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
exports.MapService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../common/models/models");
let MapService = class MapService {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        const created = new this.model(Object.assign(Object.assign({}, dto), { markers: dto.markers || [] }));
        return created.save();
    }
    async findByProject(projectId) {
        return this.model.find({ projectId });
    }
    async findOne(id) {
        return this.model.findById(id);
    }
    async update(id, dto) {
        return this.model.findByIdAndUpdate(id, dto, { new: true });
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id);
        return { status: common_1.HttpStatus.OK, msg: 'Deleted' };
    }
    async addMarker(mapId, marker) {
        return this.model.findByIdAndUpdate(mapId, { $push: { markers: marker } }, { new: true });
    }
    async updateMarker(mapId, markerId, marker) {
        return this.model.findOneAndUpdate({ _id: mapId, 'markers._id': markerId }, {
            $set: {
                'markers.$.sceneId': marker.sceneId,
                'markers.$.x': marker.x,
                'markers.$.y': marker.y,
                'markers.$.description': marker.description,
            },
        }, { new: true });
    }
    async deleteMarker(mapId, markerId) {
        return this.model.findByIdAndUpdate(mapId, { $pull: { markers: { _id: markerId } } }, { new: true });
    }
};
MapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.MAP.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MapService);
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map