import { ActionReducerMap } from '@ngrx/store';
import * as fromCountdown from './countdown.reducer';
import * as fromDragBomb from './drag-bomb.reducer';
import * as fromBombs from './bombs.reducer';

export interface AppState {
  [fromCountdown.countdownFeatureKey]: fromCountdown.State;
  [fromDragBomb.dragBombFeatureKey]: fromDragBomb.State;
  [fromBombs.bombsFeatureKey]: fromBombs.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountdown.countdownFeatureKey]: fromCountdown.reducer,
  [fromDragBomb.dragBombFeatureKey]: fromDragBomb.reducer,
  [fromBombs.bombsFeatureKey]: fromBombs.reducer,
};
