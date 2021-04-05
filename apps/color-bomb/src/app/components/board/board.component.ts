import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval, merge, Observable, Subject } from 'rxjs';
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
  bombs: IBomb[] = [];

  private colors = ['red', 'blue', 'green'];
  private readonly colorSwitchIntervalPeriod = 40;  // seconds
  private removeBombSubject = new Subject();

  constructor(boardService: BoardService, store: Store<AppState>) {
    this.binColors$ = interval(1000)
      .pipe(
        tap(() => store.dispatch(fromCountdown.decrement())),
        filter(number => number !== 0 && number % this.colorSwitchIntervalPeriod === 0),
        tap(() => store.dispatch(fromCountdown.reset())),
        map(() => boardService.shuffle(this.colors)),
        startWith(this.colors)
      );

    const intervalStream$ = interval(5000)
      .pipe(
        map((value) => [
          ...this.bombs,
          {
            id: value,
            x: boardService.getRandomInt(0, 101),
            y: boardService.getRandomInt(0, 101),
            color: this.colors[boardService.getRandomInt(0, 3)],
            lifetime: boardService.getRandomInt(5, 11)
          }])
      );

    const removeBombStream$ = this.removeBombSubject
      .pipe(map(bombId => this.bombs.filter(bomb => bomb.id !== bombId)))

    this.bombs$ = merge(intervalStream$, removeBombStream$)
      .pipe(tap(bombs => this.bombs = bombs))
  }

  trackBombById(_: number, bomb: IBomb) {
    return bomb.id;
  }

  removeBomb(bombId: number) {
    this.removeBombSubject.next(bombId);
  }
}
