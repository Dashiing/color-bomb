import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDragBomb from '../reducers/drag-bomb.reducer';

export const selectFeature = createFeatureSelector<fromDragBomb.State>(
  fromDragBomb.dragBombFeatureKey
);

export const selectDraggingBombColor = createSelector(
  selectFeature,
  (state: fromDragBomb.State) => state.color
);