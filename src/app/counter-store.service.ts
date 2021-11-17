import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface State {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class CounterStoreService {
  readonly _counterState$ = new BehaviorSubject<State>({ count: 0 });

  /**
   * 全部返すとき
   */
  get state$(): Observable<State> {
    return this._counterState$.asObservable();
  }

  /**
   * 特定のプロパティだけほしいとき
   */
  get count$(): Observable<number> {
    return this._counterState$.asObservable().pipe(map((state) => state.count));
  }

  /**
   * 同期的に値がほしいとき
   */
  get countValu(): number {
    return this._counterState$.getValue().count;
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
