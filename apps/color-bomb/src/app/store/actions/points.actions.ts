import { createAction } from '@ngrx/store';

export const loadPoints = createAction('[Points] Load Points');
export const incrementPoints = createAction('[Points] Increment Points');
export const decrementPoints = createAction('[Points] Decrement Points');