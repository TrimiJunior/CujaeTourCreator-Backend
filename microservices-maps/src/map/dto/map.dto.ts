import { MarkerDTO, UpdateMarkerDTO } from './marker.dto';

export class CreateMapDTO {
  readonly projectId: string;
  readonly baseImagePath: string; // ruta relativa en el gateway (p.ej. /uploads/maps/xxx.png)
  readonly markers?: MarkerDTO[];
}

export class UpdateMapDTO {
  readonly projectId?: string;
  readonly baseImagePath?: string;
  readonly markers?: UpdateMarkerDTO[];
}
