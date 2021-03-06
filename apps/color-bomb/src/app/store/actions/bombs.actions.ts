import { createAction, props } from '@ngrx/store';
import { IBomb } from '../../models';

export const loadBombs = createAction('[Bombs] Load Bombs');
export const createBomb = createAction(
  '[Bombs] Create Bomb',
  props<{ bomb: IBomb }>()
);
export const removeBomb = createAction(
  '[Bombs] Remove Bomb',
  props<{ id: number }>()
);
export const droppedBomb = createAction(
  '[Bombs] Dropped Bomb',
  props<{ id: number }>());
