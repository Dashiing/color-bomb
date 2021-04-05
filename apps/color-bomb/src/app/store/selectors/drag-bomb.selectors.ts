import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDragBomb from '../reducers/drag-bomb.reducer';

const selectFeature = createFeatureSelector<fromDragBomb.State>(
  fromDragBomb.dragBombFeatureKey
);

export const selectDraggingBomb = createSelector(
  selectFeature,
  (state: fromDragBomb.State) => state.bomb
);

export const selectDropped = createSelector(
  selectFeature,
  (state: fromDragBomb.State) => state.dropped
)