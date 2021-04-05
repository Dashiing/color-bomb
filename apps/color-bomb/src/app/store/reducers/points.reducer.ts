import { createReducer, on } from '@ngrx/store';
import * as fromPoints from '../actions/points.actions';

export const pointsFeatureKey = 'points';

export interface State {
  points: number;
}

export const initialState: State = {
  points: 0
};


export const reducer = createReducer(
  initialState,
  on(fromPoints.loadPoints, state => state),
  on(fromPoints.incrementPoints, state => ({ ...state, points: state.points + 1 })),
  on(fromPoints.decrementPoints, state => ({ ...state, points: state.points - 1 }))
);

