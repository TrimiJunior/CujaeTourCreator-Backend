export interface ILinkHostpot extends Document {
    readonly sceneId: string;
    readonly name: string;
    readonly targetSceneId: string;
    readonly position: Array<number>;
}