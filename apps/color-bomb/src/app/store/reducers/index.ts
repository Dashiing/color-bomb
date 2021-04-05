import { ActionReducerMap } from '@ngrx/store';
import * as fromCountdown from '../../store/reducers/countdown.reducer';
import * as fromDragBomb from '../../store/reducers/drag-bomb.reducer';

export interface AppState {
  [fromCountdown.countdownFeatureKey]: fromCountdown.State;
  [fromDragBomb.dragBombFeatureKey]: fromDragBomb.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountdown.countdownFeatureKey]: fromCountdown.reducer,
  [fromDragBomb.dragBombFeatureKey]: fromDragBomb.reducer,
};
