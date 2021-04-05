import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers';
import * as fromStore from '../../store';

@Component({
  selector: 'cb-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
  countdown$: Observable<number>;

  constructor(store: Store<AppState>) {
    this.countdown$ = store.select(fromStore.selectCountdown);
  }
}
