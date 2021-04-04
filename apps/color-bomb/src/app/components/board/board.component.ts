import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BoardService } from './board.service';

@Component({
  selector: 'cb-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  binColors$: Observable<string[]>;
  colors = ['red', 'blue', 'green'];

  colorSwitchIntervalPeriod = 40000;  // milliseconds

  constructor(boardService: BoardService) {
    this.binColors$ = interval(this.colorSwitchIntervalPeriod)
      .pipe(
        map(() => boardService.shuffle(this.colors)),
        startWith(this.colors)
      )
  }
}
