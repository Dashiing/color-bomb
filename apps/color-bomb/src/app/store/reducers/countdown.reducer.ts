import { createReducer, on } from '@ngrx/store';
import * as fromCountdown from '../actions/countdown.actions';

export const countdownFeatureKey = 'countdown';

export interface State {
  count: number
}

export const initialState: State = {
  count: 40
};

export const reducer = createReducer(
  initialState,
  on(
    fromCountdown.decrementCountdown,
    state => ({ ...state, count: state.count - 1 }
    )
  ),
  on(
    fromCountdown.resetCountdown,
    () => ({ ...initialState })
  )
);

