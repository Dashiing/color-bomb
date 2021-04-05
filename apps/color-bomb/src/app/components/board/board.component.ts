import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BoardService } from './board.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/';
import { ColorType, IBomb } from '../../models';

@Component({
  selector: 'cb-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnDestroy {
  binColors$: Observable<ColorType[]>;
  bombs$: Observable<IBomb[]>;
  points$: Observable<number>;

  private colors: ColorType[] = ['red', 'blue', 'green'];
  private readonly colorSwitchIntervalPeriod = 40;  // seconds
  private readonly initialSpawnPeriod = 5000;
  private readonly increaseFrequencyPeriod = 12000;
  private readonly gameTimeoutPeriod = 120000;
  private unsubscribe = new Subject();

  constructor(boardService: BoardService, store: Store<AppState>) {
    this.bombs$ = store.select(fromStore.selectBombs);

    this.binColors$ = interval(1000)
      .pipe(
        tap(() => store.dispatch(fromStore.decrementCountdown())),
        filter(number => number !== 0 && number % this.colorSwitchIntervalPeriod === 0),
        tap(() => store.dispatch(fromStore.resetCountdown())),
        map(() => boardService.shuffle<ColorType>(this.colors)),
        startWith(this.colors),
        takeUntil(this.unsubscribe)
      );

    this.points$ = store.select(fromStore.selectPoints);

    interval(this.increaseFrequencyPeriod)
      .pipe(
        startWith(-1),
        switchMap(value => interval(this.getSpawnPeriod(value))),
        map((value) => store.dispatch(fromStore.createBomb({
          bomb: {
            id: value,
            x: boardService.getRandomInt(0, 101),
            y: boardService.getRandomInt(0, 101),
            color: this.colors[boardService.getRandomInt(0, 3)],
            lifetime: boardService.getRandomInt(5, 11)
          }
        }))),
        takeUntil(this.unsubscribe)
      ).subscribe();

    store.select(fromStore.selectBombsPlaced)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(bombsPlaced => {
        if (bombsPlaced >= 120) {
          this.ngOnDestroy();
        }
      });

    interval(this.gameTimeoutPeriod)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.ngOnDestroy);
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackBombById(_: number, bomb: IBomb) {
    return bomb.id;
  }

  private getSpawnPeriod(value: number) {
    const spawnPeriod = this.initialSpawnPeriod - ((value + 1) * 500);

    return spawnPeriod < 500 ? 500 : spawnPeriod;
  }
}
