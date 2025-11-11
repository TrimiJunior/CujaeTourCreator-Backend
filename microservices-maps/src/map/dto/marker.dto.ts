export class MarkerDTO {
  readonly sceneId: string;
  readonly x: number;
  readonly y: number;
  readonly description?: string;
}

export class UpdateMarkerDTO {
  readonly sceneId?: string;
  readonly x?: number;
  readonly y?: number;
  readonly description?: string;
}
