import { ActionReducerMap } from '@ngrx/store';
import * as fromCountdown from '../../store/reducers/countdown.reducer';

export interface AppState {
  [fromCountdown.countdownFeatureKey]: fromCountdown.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountdown.countdownFeatureKey]: fromCountdown.reducer,
};
