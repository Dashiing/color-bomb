import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ColorType } from '../../models';

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
  filter = '';
  colorClass: string;
  lighterShade = false;
  scale = false;

  onDrop(event: DragEvent) {
    const bomb = JSON.parse(event.dataTransfer.getData('text/plain'));
    this.lighterShade = false;
    this.scale = false;
  }

  onDragOver() {
    this.lighterShade = true;
    this.scale = true;
  }

  onDragLeave() {
    this.lighterShade = false;
    this.scale = false;
  }
}
