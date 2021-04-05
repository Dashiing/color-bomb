import { createAction, props } from '@ngrx/store';
import { IBomb } from '../../models';

export const draggingBomb = createAction(
  '[Drag Bomb] Dragging',
  props<{ bomb: IBomb }>()
);
