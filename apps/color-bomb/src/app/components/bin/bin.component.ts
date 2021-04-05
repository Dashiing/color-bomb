import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ColorType } from '../../models';
import { AppState } from '../../store/reducers';
import * as fromDragBomb from '../../store/selectors/drag-bomb.selectors';

@Component({
  selector: 'cb-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinComponent {
  @Input() color: ColorType;
  width = 125;
  height = 125;
  lighterShade = false;
  scale = false;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  onDrop() {
    this.lighterShade = false;
    this.scale = false;
  }

  onDragOver() {
    this.store.select(fromDragBomb.selectDraggingBombColor)
      .pipe(take(1))
      .subscribe(draggingBombColor => {
        this.lighterShade = draggingBombColor === this.color;
        this.scale = draggingBombColor === this.color;
        this.cdr.markForCheck();
      });
  }

  onDragLeave() {
    this.lighterShade = false;
    this.scale = false;
  }
}
