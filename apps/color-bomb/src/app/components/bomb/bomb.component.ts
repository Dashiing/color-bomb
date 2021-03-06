import { Component, ChangeDetectionStrategy, Input, HostBinding, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { IBomb } from '../../models';
import { AppState } from '../../store/reducers';
import * as fromStore from '../../store';

@Component({
  selector: 'cb-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BombComponent implements OnInit {
  @Input() bomb: IBomb;

  @HostBinding('style.background') background: string;
  @HostBinding('attr.draggable') draggable = true;
  @HostBinding('style.top') top: string;
  @HostBinding('style.left') left: string;

  lifetime$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.background = this.bomb.color;
    this.top = `${this.bomb.y}%`;
    this.left = `${this.bomb.x}%`;

    this.lifetime$ = interval(1000)
      .pipe(
        startWith(-1),
        withLatestFrom(of(this.bomb.lifetime)),
        map(([intervalValue, lifetime]) => lifetime - intervalValue + 1),
        tap(value => {
          if (value === 0) {
            this.store.dispatch(fromStore.removeBomb({ id: this.bomb.id }));
            this.store.dispatch(fromStore.decrementPoints());
          }
        })
      );
  }

  @HostListener('dragstart')
  onDragStart() {
    this.store.dispatch(fromStore.draggingBomb({ bomb: this.bomb }));
  }
}
