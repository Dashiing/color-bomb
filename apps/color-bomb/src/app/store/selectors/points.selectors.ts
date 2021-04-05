import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPoints from '../reducers/points.reducer';

export const selectFeature = createFeatureSelector<fromPoints.State>(
  fromPoints.pointsFeatureKey
);

export const selectPoints = createSelector(
  selectFeature,
  (state: fromPoints.State) => state.points
);