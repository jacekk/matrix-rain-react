export const COL_SIZE: number = 14;
export const ROW_SIZE: number = 18;
export const STEP_INTV_IN_MS: number = 1e2; // 100
export const COLOR_SMOOTHNESS: number = 5;

export enum TransformationsTypes {
    None = 'none',
    Rotate = 'rotate',
    FlipHor = 'flip-hor',
    FlipVer = 'flip-ver',
}

export const TRANSFORMATIONS = [
    TransformationsTypes.None,
    TransformationsTypes.None,
    TransformationsTypes.None,
    TransformationsTypes.Rotate,
    TransformationsTypes.FlipHor,
    TransformationsTypes.FlipVer,
];
