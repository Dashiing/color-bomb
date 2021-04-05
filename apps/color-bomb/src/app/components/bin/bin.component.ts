import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ColorType } from '../../models';
import * as fromStore from '../../store';

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

  constructor(private store: Store<fromStore.AppState>, private cdr: ChangeDetectorRef) {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.lighterShade = false;
    this.scale = false;

    this.store.select(fromStore.selectDraggingBomb)
      .pipe(take(1))
      .subscribe(draggingBomb => {
        if (draggingBomb.color === this.color) {
          this.store.dispatch(fromStore.incrementPoints())
        } else {
          this.store.dispatch(fromStore.decrementPoints())
        }
        this.store.dispatch(fromStore.droppedBomb({ id: draggingBomb.id }));
      });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.store.select(fromStore.selectDraggingBomb)
      .pipe(take(1))
      .subscribe(draggingBomb => {
        this.lighterShade = draggingBomb.color === this.color;
        this.scale = draggingBomb.color === this.color;
        this.cdr.markForCheck();
      });
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.lighterShade = false;
    this.scale = false;
  }
}
