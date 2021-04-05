import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval, merge, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BoardService } from './board.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromCountdown from '../../store/actions/countdown.actions';
import { ColorType, IBomb } from '../../models';

@Component({
  selector: 'cb-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  binColors$: Observable<ColorType[]>;

  bombs$: Observable<IBomb[]>;
  bombs: IBomb[] = [];

  private colors: ColorType[] = ['red', 'blue', 'green'];
  private readonly colorSwitchIntervalPeriod = 40;  // seconds
  private removeBombSubject = new Subject();
  private initialSpawnPeriod = 5000;
  private increaseFrequencyPeriod = 12000;

  constructor(boardService: BoardService, store: Store<AppState>) {
    this.binColors$ = interval(1000)
      .pipe(
        tap(() => store.dispatch(fromCountdown.decrement())),
        filter(number => number !== 0 && number % this.colorSwitchIntervalPeriod === 0),
        tap(() => store.dispatch(fromCountdown.reset())),
        map(() => boardService.shuffle<ColorType>(this.colors)),
        startWith(this.colors)
      );

    const intervalStream$ = interval(this.increaseFrequencyPeriod)
      .pipe(
        startWith(-1),
        switchMap(value => interval(this.getSpawnPeriod(value))),
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

  private getSpawnPeriod(value: number) {
    const spawnPeriod = this.initialSpawnPeriod - ((value + 1) * 500);

    return spawnPeriod < 500 ? 500 : spawnPeriod;
  }
}
