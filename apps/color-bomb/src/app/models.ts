export type ColorType = 'red' | 'blue' | 'green';

export interface IBomb {
    id: number;
    x: number;
    y: number;
    color: ColorType;
    lifetime: number;
}