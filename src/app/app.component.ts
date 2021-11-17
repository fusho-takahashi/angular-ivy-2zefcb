import { Component, VERSION } from '@angular/core';
import { CounterStoreService } from './counter-store.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  state$ = this.store.getState$();

  constructor(private store: CounterStoreService) {}

  increment(): void {
    this.store.incrementCount();
  }

  decrement(): void {
    this.store.decrementCount();
  }
}
