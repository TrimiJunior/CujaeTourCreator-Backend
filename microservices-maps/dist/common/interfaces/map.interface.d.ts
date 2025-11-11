export interface IMarker {
    _id?: string;
    sceneId: string;
    x: number;
    y: number;
    description?: string;
}
export interface IMap {
    _id?: string;
    projectId: string;
    baseImagePath: string;
    markers: IMarker[];
    createdAt?: Date;
    updatedAt?: Date;
}
