import { createReducer, on } from '@ngrx/store';
import { IBomb } from '../../models';
import * as fromBombs from '../actions/bombs.actions';

export const bombsFeatureKey = 'bombs';

export interface State {
  bombs: IBomb[],
  bombsPlaced: number;
}

export const initialState: State = {
  bombs: [],
  bombsPlaced: 0
};


export const reducer = createReducer(
  initialState,
  on(fromBombs.loadBombs, state => state),
  on(fromBombs.createBomb, (state, { bomb }) => ({ ...state, bombs: [...state.bombs, bomb], bombsPlaced: state.bombsPlaced + 1 })),
  on(fromBombs.removeBomb, (state, { id }) => ({ ...state, bombs: [...state.bombs.filter(bomb => bomb.id !== id)] })),
  on(fromBombs.droppedBomb, (state, { id }) => ({ ...state, bombs: [...state.bombs.filter(bomb => bomb.id !== id)] }))
);

