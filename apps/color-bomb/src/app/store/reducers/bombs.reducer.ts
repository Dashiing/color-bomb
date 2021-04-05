import { createReducer, on } from '@ngrx/store';
import { IBomb } from '../../models';
import * as fromBombs from '../actions/bombs.actions';

export const bombsFeatureKey = 'bombs';

export interface State {
  bombs: IBomb[]
}

export const initialState: State = {
  bombs: []
};


export const reducer = createReducer(
  initialState,
  on(fromBombs.loadBombs, state => state),
  on(fromBombs.createBomb, (state, { bomb }) => ({ ...state, bombs: [...state.bombs, bomb] })),
  on(fromBombs.removeBomb, (state, { id }) => ({ ...state, bombs: [...state.bombs.filter(bomb => bomb.id !== id)] })),
  on(fromBombs.droppedSuitableBomb, (state, { id }) => ({ ...state, bombs: [...state.bombs.filter(bomb => bomb.id !== id)] }))
);

