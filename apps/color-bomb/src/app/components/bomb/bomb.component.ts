import { Component, ChangeDetectionStrategy, Input, HostBinding, OnInit, HostListener } from '@angular/core';
import { IBomb } from '../../models';

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

  ngOnInit(): void {
    this.background = this.bomb.color;
    this.top = `${this.bomb.y}%`;
    this.left = `${this.bomb.x}%`;
  }

  @HostListener('dragstart')
  onDragStart(event: Event) {
    console.log(event);
  }
}
