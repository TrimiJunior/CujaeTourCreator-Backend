import { MapService } from './map.service';
import { CreateMapDTO, UpdateMapDTO } from './dto/map.dto';
import { MarkerDTO, UpdateMarkerDTO } from './dto/marker.dto';
export declare class MapController {
    private readonly mapService;
    constructor(mapService: MapService);
    create(dto: CreateMapDTO): Promise<import("../common/interfaces/map.interface").IMap>;
    findByProject(projectId: string): Promise<import("../common/interfaces/map.interface").IMap[]>;
    findOne(id: string): Promise<import("../common/interfaces/map.interface").IMap>;
    update(payload: {
        id: string;
        dto: UpdateMapDTO;
    }): Promise<import("../common/interfaces/map.interface").IMap>;
    delete(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        msg: string;
    }>;
    addMarker(payload: {
        mapId: string;
        marker: MarkerDTO;
    }): Promise<import("../common/interfaces/map.interface").IMap>;
    updateMarker(payload: {
        mapId: string;
        markerId: string;
        marker: UpdateMarkerDTO;
    }): Promise<import("../common/interfaces/map.interface").IMap>;
    deleteMarker(payload: {
        mapId: string;
        markerId: string;
    }): Promise<import("../common/interfaces/map.interface").IMap>;
}
