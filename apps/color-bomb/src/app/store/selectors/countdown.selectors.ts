import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromCountdown from '../reducers/countdown.reducer';

const selectFeature = createFeatureSelector<AppState, fromCountdown.State>(fromCountdown.countdownFeatureKey);

export const selectCountdown = createSelector(
    selectFeature,
    (state: fromCountdown.State) => state.count
);
