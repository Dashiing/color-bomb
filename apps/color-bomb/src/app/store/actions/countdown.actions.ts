import { createAction } from '@ngrx/store';

export const decrementCountdown = createAction('[Countdown] decrement');
export const resetCountdown = createAction('[Countdown] reset');