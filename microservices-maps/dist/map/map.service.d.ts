import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMap } from '../common/interfaces/map.interface';
import { CreateMapDTO, UpdateMapDTO } from './dto/map.dto';
import { MarkerDTO, UpdateMarkerDTO } from './dto/marker.dto';
export declare class MapService {
    private readonly model;
    constructor(model: Model<IMap>);
    create(dto: CreateMapDTO): Promise<IMap>;
    findByProject(projectId: string): Promise<IMap[]>;
    findOne(id: string): Promise<IMap>;
    update(id: string, dto: UpdateMapDTO): Promise<IMap>;
    delete(id: string): Promise<{
        status: HttpStatus;
        msg: string;
    }>;
    addMarker(mapId: string, marker: MarkerDTO): Promise<IMap>;
    updateMarker(mapId: string, markerId: string, marker: UpdateMarkerDTO): Promise<IMap>;
    deleteMarker(mapId: string, markerId: string): Promise<IMap>;
}
