export interface IMarker {
  _id?: string;
  sceneId: string; // referencia a escena
  x: number;
  y: number;
  description?: string;
}

export interface IMap {
  _id?: string;
  projectId: string; // referencia al proyecto
  baseImagePath: string; // ruta al PNG base
  markers: IMarker[];
  createdAt?: Date;
  updatedAt?: Date;
}
