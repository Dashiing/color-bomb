import { createReducer, on } from '@ngrx/store';
import { ColorType } from '../../models';
import * as DragBombActions from '../actions/drag-bomb.actions';

export const dragBombFeatureKey = 'dragBomb';

export interface State {
  color: ColorType;
}

export const initialState: State = {
  color: undefined
};

export const reducer = createReducer(
  initialState,
  on(DragBombActions.dragging, (state, { color }) => ({ ...state, color }))
);

