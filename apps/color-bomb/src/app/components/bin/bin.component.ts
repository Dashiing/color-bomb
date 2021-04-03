import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cb-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinComponent {
  @Input() color: string;
  width = 125;
  height = 125;
}
