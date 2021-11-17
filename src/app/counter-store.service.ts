import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface State {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class CounterStoreService {
  readonly _counterState$ = new BehaviorSubject<State>({ count: 0 });

  getState$(): Observable<State> {
    return this._counterState$.asObservable();
  }

  incrementCount(): void {
    const currentValue = this._counterState$.getValue();
    this._counterState$.next({
      ...currentValue,
      count: currentValue.count + 1,
    });
  }

  decrementCount(): void {
    const currentValue = this._counterState$.getValue();
    if (currentValue.count < 1) return;
    this._counterState$.next({
      ...currentValue,
      count: currentValue.count - 1,
    });
  }
}
