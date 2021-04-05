import { createAction, props } from '@ngrx/store';
import { ColorType } from '../../models';

export const dragging = createAction(
  '[Drag Bomb] Dragging',
  props<{ color: ColorType }>()
);




