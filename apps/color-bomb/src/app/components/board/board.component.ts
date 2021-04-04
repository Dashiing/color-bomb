import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { BoardService } from './board.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromCountdown from '../../store/actions/countdown.actions';

@Component({
  selector: 'cb-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  binColors$: Observable<string[]>;
  colors = ['red', 'blue', 'green'];

  private readonly colorSwitchIntervalPeriod = 40;  // seconds

  constructor(boardService: BoardService, store: Store<AppState>) {
    this.binColors$ = interval(1000)
      .pipe(
        tap(() => store.dispatch(fromCountdown.decrement())),
        filter(number => number !== 0 && number % this.colorSwitchIntervalPeriod === 0),
        tap(() => store.dispatch(fromCountdown.reset())),
        map(() => boardService.shuffle(this.colors)),
        startWith(this.colors)
      )
  }
}
