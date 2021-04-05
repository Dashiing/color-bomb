import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { BoardService } from './board.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromCountdown from '../../store/actions/countdown.actions';
import { IBomb } from '../../models';

@Component({
  selector: 'cb-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  binColors$: Observable<string[]>;
  bombs$: Observable<IBomb[]>;

  private bombs = [];
  private colors = ['red', 'blue', 'green'];
  private readonly colorSwitchIntervalPeriod = 40;  // seconds

  constructor(boardService: BoardService, store: Store<AppState>) {
    this.binColors$ = interval(1000)
      .pipe(
        tap(() => store.dispatch(fromCountdown.decrement())),
        filter(number => number !== 0 && number % this.colorSwitchIntervalPeriod === 0),
        tap(() => store.dispatch(fromCountdown.reset())),
        map(() => boardService.shuffle(this.colors)),
        startWith(this.colors)
      );

    this.bombs$ = interval(5000)
      .pipe(
        tap(value => this.bombs = [
          ...this.bombs,
          {
            id: value,
            x: boardService.getRandomInt(100) + 1,
            y: boardService.getRandomInt(100) + 1,
            color: this.colors[boardService.getRandomInt(3)]
          }]),
        map(() => this.bombs));
  }

  trackBombById(_, bomb: IBomb) {
    return bomb.id;
  }
}
