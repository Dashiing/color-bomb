import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBombs from '../reducers/bombs.reducer';

const selectFeature = createFeatureSelector<fromBombs.State>(
  fromBombs.bombsFeatureKey
);

export const selectBombs = createSelector(
  selectFeature,
  (state: fromBombs.State) => state.bombs
);
