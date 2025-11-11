import { MarkerDTO, UpdateMarkerDTO } from './marker.dto';
export declare class CreateMapDTO {
    readonly projectId: string;
    readonly baseImagePath: string;
    readonly markers?: MarkerDTO[];
}
export declare class UpdateMapDTO {
    readonly projectId?: string;
    readonly baseImagePath?: string;
    readonly markers?: UpdateMarkerDTO[];
}
