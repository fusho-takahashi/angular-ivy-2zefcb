import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

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
    return this.select<State>((state) => state);
  }

  /**
   * 特定のプロパティだけほしいとき
   */
  get count$(): Observable<number> {
    return this.select<number>((state) => state.count);
  }

  /**
   * 同期的に値がほしいとき
   */
  get countValu(): number {
    return this._counterState$.value.count;
  }

  select<T>(selector: (state: State) => T) {
    return this._counterState$.pipe(map(selector), distinctUntilChanged());
  }

  incrementCount(): void {
    const currentValue = this._counterState$.value;
    queueScheduler.schedule(() => {
      this._counterState$.next({
        ...currentValue,
        count: currentValue.count + 1,
      });
    });
  }

  decrementCount(): void {
    const currentValue = this._counterState$.value;
    if (currentValue.count < 1) return;
    queueScheduler.schedule(() => {
      this._counterState$.next({
        ...currentValue,
        count: currentValue.count - 1,
      });
    });
  }
}
