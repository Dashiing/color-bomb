import { createReducer, on } from '@ngrx/store';
import { IBomb } from '../../models';
import * as fromDragBomb from '../actions/drag-bomb.actions';

export const dragBombFeatureKey = 'dragBomb';

export interface State {
  bomb: IBomb;
  dropped: boolean;
}

export const initialState: State = {
  bomb: undefined,
  dropped: false
};

export const reducer = createReducer(
  initialState,
  on(fromDragBomb.draggingBomb, (state, { bomb }) => ({ ...state, bomb, dropped: false })),
);

